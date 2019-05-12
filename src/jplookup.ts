// looks up words in the subtitle containing a kanji on a J-E dictionary
import { mecab, MecabPOSComplete, isKanji } from './mecab';
import { isNotBlackListed } from './blacklist';
import { toHiragana } from './kana';
import { jisho } from './jisho';

const showLoading = false;

const defaultOptions = {
  fs: 14,
  border: 1.0,
  color: 'FFFFFF',
  borderColor: '000000',
};

function clearass() {
  mp.set_osd_ass(0, 0, '{}');
}

function ass(message: string, opts: Partial<typeof defaultOptions>) {
  const options = { ...defaultOptions, ...opts };

  const style = [
    `{\\fs${options.fs}}`,
    `{\\1c&H${options.color}&}`,
    `{\\bord${options.border}}`,
    `{\\3c&H${options.borderColor}&}`,
  ].join('');

  mp.set_osd_ass(0, 0, `${style}${message}`);
}

function handler(_prop: string, text: string) {
  if (!text) {
    clearass();
    return;
  }

  if (showLoading) {
    ass('読み込み中・・・', { fs: 10 });
  }

  const result = lookup(text).map(
    x => `${x.lemma} (${x.reading}) - ${x.definition}`,
  );

  if (result.length > 0) {
    ass(`${result.join('\\N')}`, {});
  } else {
    clearass();
  }
}

let active = false;

function removeSpeaker(text: string): string {
  return text
    .replace(/（[^（）]*）/, '')
    .replace(/\([^()]*\)/, '')
    .trim();
}

type LookupResult = {
  lemma: string;
  reading: string;
  definition: string;
};

function lookup(text: string): LookupResult[] {
  return mecab(removeSpeaker(text))
    .filter(isNotBlackListed)
    .filter((x): x is MecabPOSComplete => x.t === 'POSC')
    .filter(isKanji)
    .map(x => ({
      lemma: x.lemma,
      reading: toHiragana(x.reading),
      definition: jisho(x.lemma),
    }));
}

function subanalyze() {
  if (active) {
    mp.unobserve_property(handler);
    clearass();
    active = false;
  } else {
    mp.observe_property('sub-text', 'string', handler);
    active = true;
  }
}

mp.add_key_binding('x', 'toggle', subanalyze);

// call this function for testing the parsing and lookup function
export function testhandler() {
  lookup('小さな約束だった').forEach(x =>
    mp.msg.error(`${x.lemma}: ${x.definition}`),
  );
}
