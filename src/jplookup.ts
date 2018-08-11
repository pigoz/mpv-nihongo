// looks up words in the subtitle containing a kanji on a J-E dictionary

const SHELL = '/bin/sh';

const options = {
  fs: 14,
  border: 1.0,
  color: 'FFFFFF',
  borderColor: '000000',
};

function handler(_prop: string, text: string) {
  const result = lookup(text).map(
    x => `${x.lemma} (${x.reading}) - ${x.definition}`,
  );

  const style = [
    `{\\fs${options.fs}}`,
    `{\\1c&${options.color}&}`,
    `{\\bord${options.border}}`,
    `{\\3c&H${options.borderColor}&}`,
  ].join('');

  if (result.length > 0) {
    mp.set_osd_ass(0, 0, `${style} ${result.join('\\N')}`);
  } else {
    mp.set_osd_ass(0, 0, '{}');
  }
}

let active = false;

type MecabEOS = { readonly t: 'EOS' };
type MecabPOS = {
  readonly t: 'POS';
  readonly l: string;
  readonly v: string[];
};

type MecabResult = MecabEOS | MecabPOS;

const eos: MecabEOS = { t: 'EOS' };
const pos = (l: string, v: string[]): MecabPOS => ({
  t: 'POS',
  l,
  v,
});

function removeSpeaker(text: string): string {
  return text.replace(/（[^（）]*\）/, '').trim();
}

function mecab(text: string): MecabResult[] {
  const t = mp.utils.subprocess({
    args: [SHELL, '-c', `echo '${text}' | mecab`],
  });
  return t.stdout
    .trim()
    .split('\n')
    .map(x => {
      const tuple = x.split('\t');
      const l = tuple[0];
      const v = tuple[1] ? tuple[1].split(',') : [];
      return l === 'EOS' ? eos : pos(l, v);
    });
}

function jisho(lemma: string): string {
  const endpoint = 'https://jisho.org/api/v1/search/words';
  const t = mp.utils.subprocess({
    args: [
      '/usr/bin/curl',
      '-s',
      '-G',
      endpoint,
      '--data-urlencode',
      `keyword=${lemma}`,
    ],
  });
  const result = JSON.parse(t.stdout.trim());
  return result.data[0].senses
    .map((x: any) => x.english_definitions[0] as string)
    .join(' – ');
}

type LookupResult = {
  lemma: string;
  reading: string;
  definition: string;
};

function lookup(text: string): LookupResult[] {
  return mecab(removeSpeaker(text))
    .filter((x): x is MecabPOS => x.t === 'POS')
    .filter(x => !!x.l.match(/[\u4E00-\u9FAF]/))
    .map(x => ({ lemma: x.v[6], reading: x.v[7], definition: jisho(x.v[6]) }));
}

function subanalyze() {
  if (active) {
    mp.unobserve_property(handler);
    active = false;
  } else {
    mp.observe_property('sub-text', 'string', handler);
    active = true;
  }
}

mp.add_key_binding('x', 'TOGGLE_JPLOOKUP', subanalyze);
subanalyze();

// call this function for testing the parsing and lookup function
function testhandler() {
  lookup('小さな約束だった').forEach(x =>
    mp.msg.error(`${x.lemma}: ${x.definition}`),
  );
}
