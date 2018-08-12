// looks up words in the subtitle containing a kanji on a J-E dictionary

const SHELL = '/bin/sh';
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
  return text
    .replace(/（[^（）]*）/, '')
    .replace(/\([^()]*\)/, '')
    .trim();
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

function dict(lemma: string): string {
  const t = mp.utils.subprocess({
    args: ['/usr/local/bin/myougiden', '--color=no', '-t', lemma],
  });

  const result: string = t.stdout.trim().split('\n')[0];

  if (!result) {
    return '–';
  }

  return result.split('\t')[2].split('|')[0];
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
    .map(x => ({ lemma: x.v[6], reading: x.v[7], definition: dict(x.v[6]) }));
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
function testhandler() {
  lookup('小さな約束だった').forEach(x =>
    mp.msg.error(`${x.lemma}: ${x.definition}`),
  );
}
