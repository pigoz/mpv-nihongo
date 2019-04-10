const SHELL = '/bin/sh';

export type MecabEOS = { readonly t: 'EOS' };
export type MecabPOSIncomplete = {
  readonly t: 'POSI';
  readonly l: string;
  readonly v: ReadonlyArray<string | undefined>;
};

export type MecabPOSComplete = {
  readonly t: 'POSC';
  readonly l: string;
  readonly v: ReadonlyArray<string | undefined>;
  readonly lemma: string;
  readonly reading: string;
};

type MecabPOS = MecabPOSIncomplete | MecabPOSComplete;
type MecabResult = MecabEOS | MecabPOSIncomplete | MecabPOSComplete;

const eos: MecabEOS = { t: 'EOS' };

const posi = (l: string, v: string[]): MecabPOSIncomplete => ({
  t: 'POSI',
  l,
  v,
});

const posc = (
  l: string,
  v: string[],
  lemma: string,
  reading: string,
): MecabPOS => ({
  t: 'POSC',
  l,
  v,
  lemma,
  reading,
});

export function isKanji(x: MecabPOS): boolean {
  return !!x.l.match(/[\u4E00-\u9FAF]/);
}

export function mfold3<T>(
  res: MecabResult,
  ifEos: (eos: MecabEOS) => T,
  ifPos: (pos: MecabPOS) => T,
  ifPosKanji: (pos: MecabPOSComplete) => T,
): T {
  if (res.t === 'EOS') {
    return ifEos(res);
  }

  if (isKanji(res) && res.t === 'POSC') {
    return ifPosKanji(res);
  }

  return ifPos(res);
}

export function mecab(text: string): MecabResult[] {
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
      const lemma = v[6];
      const reading = v[7];
      return l === 'EOS'
        ? eos
        : lemma && reading
          ? posc(l, v, lemma, reading)
          : posi(l, v);
    });
}
