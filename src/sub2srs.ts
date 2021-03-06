// adds the current subtitle to an anki deck
// needs Anki Connect add-on - https://ankiweb.net/shared/info/2055492159
import { mecab, mfold3, MecabPOSComplete, isKanji } from './mecab';
import { jisho } from './jisho';
import { isNotBlackListed } from './blacklist';
import { toHiragana } from './kana';

const AUDIO_THRESHOLD = 0.25; // 250ms
const IMAGE_WIDTH = 480;
const IMAGE_DELAY_PERCENT = 0.08;
const ANKI_DECK_NAME = 'sub2srs';
const ANKI_NOTE_TYPE = 'Japanese sub2srs';
const ANKI_TAG_NAME = 'sub2srs';
const ANKI_MEDIA_COLLECTION =
  '/Users/pigoz/Library/Application Support/Anki2/User 1/collection.media';
const FFMPEG = 'ffmpeg';
const CURL = 'curl';

type path = string;

function sts(ts: any): string {
  const date = new Date(0);
  date.setSeconds(ts);
  const s = date.toISOString();
  return s.slice(11, 23);
}

function mktemp(extension: string) {
  const t = mp.utils.subprocess({
    args: ['mktemp', '-t', 'sub2srs'],
  });
  return `${t.stdout.trim()}.${extension}`;
}

function cutaudio(path: path, aid: number, start: number, end: number): path {
  const ss = sts(start - AUDIO_THRESHOLD);
  const duration = sts(end - start + AUDIO_THRESHOLD * 2);
  const output = mktemp('mp3');

  const command = [
    FFMPEG,
    '-y',
    '-ss',
    ss,
    '-i',
    path,
    '-t',
    duration,
    '-map',
    `0:a:${aid - 1}`,
    output,
  ];

  const t = mp.utils.subprocess({ args: command });

  if (t.status === 0) {
    return output;
  }

  return '';
}

function screenshot(path: path, start: number, end: number): path {
  const ss = sts(start + (end - start) * IMAGE_DELAY_PERCENT);
  const output = mktemp('jpg');

  const command = [
    FFMPEG,
    '-y',
    '-ss',
    ss,
    '-i',
    path,
    '-vcodec',
    'mjpeg',
    '-vframes',
    '1',
    '-filter:v',
    `scale=${IMAGE_WIDTH}:-1`,
    output,
  ];

  const t = mp.utils.subprocess({ args: command });

  if (t.status === 0) {
    return output;
  }

  return '';
}

type ApiResult = {
  result: undefined | unknown;
  error: undefined | unknown;
};

function ankiapi(method: string, params: { [x: string]: unknown }): ApiResult {
  const hostname = 'http://127.0.0.1:8765';
  const data = JSON.stringify({ action: method, version: 6, params: params });

  const command = [
    CURL,
    hostname,
    '--silent',
    // '--header',
    // JSON.stringify('Content-Type: application/json'),
    '--X',
    'POST',
    '--data',
    data,
  ];

  mp.msg.warn(command.join(' '));
  const t = mp.utils.subprocess({ args: command });
  mp.msg.warn(JSON.stringify(t));
  const reply = JSON.parse(t.stdout);
  return reply;
}

function mv(src: string, dst: string) {
  mp.utils.subprocess({ args: ['mv', src, dst] });
}

function addtoanki(
  source: path,
  start: number,
  audio: path,
  image: path,
  rawline: string,
): void {
  const caudio = mp.utils.join_path(ANKI_MEDIA_COLLECTION, basename(audio));
  const cimage = mp.utils.join_path(ANKI_MEDIA_COLLECTION, basename(image));
  const line = rawline.replace('<', '').replace('>', '');

  const analysis = mecab(line);

  const reading = analysis
    .map(result =>
      mfold3(
        result,
        () => '\n',
        x => x.l,
        x => ` ${x.l}[${toHiragana(x.reading)}]`,
      ),
    )
    .join('')
    .trim();

  const words: string = analysis
    .filter((x): x is MecabPOSComplete => x.t === 'POSC')
    .filter(isKanji)
    .filter(isNotBlackListed)
    .map(x => {
      const jr = jisho(x.l);
      if (!jr) {
        return '';
      }
      const reading = jr.lemmaReading || toHiragana(x.reading);
      const definition = jr.definition.replace('[', '(').replace(']', ')');
      return `${x.l}[${reading}] ${definition}`;
    })
    .join('<br>');

  const fields = {
    Source: source,
    Time: sts(start),
    Sound: `[sound:${basename(audio)}]`,
    Image: `<img src="${basename(image)}" />`,
    Line: line,
    Reading: reading,
    Words: words,
  };

  ankiapi('changeDeck', { cards: [], deck: ANKI_DECK_NAME });
  const res = ankiapi('addNote', {
    note: {
      deckName: ANKI_DECK_NAME,
      modelName: ANKI_NOTE_TYPE,
      fields: fields,
      tags: [ANKI_TAG_NAME],
    },
  });

  const timing = 6;

  // move files to the collection only if we successfully called the AnkiApi
  if (res.result && !res.error) {
    mv(audio, caudio);
    mv(image, cimage);
    mp.osd_message(`added「${line}」to Anki`, timing);
  } else {
    mp.osd_message('error invoking Anki API', timing);
  }
}

function basename(path: string) {
  const x = mp.utils.split_path(path);
  return x[x.length - 1];
}

function sub2srs(n: number) {
  const path = mp.get_property('path');
  const aid = mp.get_property_number('aid') || 1;
  const parts: string[] = [];

  parts.push(mp.get_property('sub-text') || '');
  const start = mp.get_property_number('sub-start');

  function done() {
    message(`done`);

    if (!path) {
      mp.msg.warn('no path available');
      return;
    }

    const end = mp.get_property_number('sub-end');

    if (!start || !end) {
      mp.msg.warn('cannot retrieve sub timings');
      return;
    }

    const audio = cutaudio(path, aid, start, end);
    const image = screenshot(path, start, end);
    const text = parts.join('-');

    addtoanki(basename(path), start, audio, image, text.replace(/\n|\r/g, ' '));
  }

  function loop(cb: () => void) {
    mp.set_property_bool('pause', true);
    mp.commandv('sub-seek', '1');

    setTimeout(() => {
      parts.push(mp.get_property('sub-text') || '');
      cb();
    }, 500);
  }

  let fns = [done];
  for (let i = 1; i < n; i++) {
    fns[i] = () => loop(fns[i - 1]);
  }
  fns[n - 1]();
}

function message(s: string, timing?: number) {
  mp.osd_message('sub2srs: ' + s, timing);
  mp.msg.warn(s);
}

function sub2srsN() {
  message('how many contiguous subs? [0..9]', 9999);

  const name = (n: number) => `sub2srsN${n}`;
  const handler = (n: number) => () => {
    teardown();
    if (n === 0) {
      message(`exiting modal mode`);
      return;
    }
    message(`processing ${n} contiguous subs`);
    sub2srs(n);
  };

  function setup() {
    for (let i = 0; i < 10; i++) {
      mp.add_forced_key_binding(i.toString(), name(i), handler(i));
    }
  }

  function teardown() {
    for (let i = 0; i < 10; i++) {
      mp.remove_key_binding(name(i));
    }
  }

  setup();
}

function sub2srs1() {
  sub2srs(1);
}

mp.add_key_binding('b', 'sub2srs', sub2srsN);
mp.add_key_binding('GAMEPAD_BACK', 'sub2srs1', sub2srs1);
