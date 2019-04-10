// adds the current subtitle to an anki deck
// needs Anki Connect add-on - https://ankiweb.net/shared/info/2055492159
import { mecab, mfold3, MecabPOS, isKanji } from './mecab';
import { jisho } from './jisho';
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
        x => ` ${x.l}[${toHiragana(x.v[7])}]`,
      ),
    )
    .join('')
    .trim();

  const words: string = analysis
    .filter((x): x is MecabPOS => x.t === 'POS')
    .filter(isKanji)
    .map(
      x =>
        `${x.l}[${toHiragana(x.v[7])}] ${jisho(x.l)
          .replace('[', '(')
          .replace(']', ')')}`,
    )
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

function sub2srs() {
  const text = mp.get_property('sub-text');
  const path = mp.get_property('path');
  const aid = mp.get_property_number('aid') || 1;

  if (!path) {
    mp.msg.warn('no path available');
    return;
  }

  if (!text) {
    mp.msg.warn('no subtitle is focused');
    return;
  }

  const start = mp.get_property_number('sub-start');
  const end = mp.get_property_number('sub-end');

  if (!start || !end) {
    mp.msg.warn('cannot retrieve sub timings');
    return;
  }

  const audio = cutaudio(path, aid, start, end);
  const image = screenshot(path, start, end);

  addtoanki(basename(path), start, audio, image, text.replace(/\n|\r/g, ' '));
}

mp.add_key_binding('b', 'sub2anki', sub2srs);
mp.add_key_binding('GAMEPAD_BACK', 'sub2anki', sub2srs);
