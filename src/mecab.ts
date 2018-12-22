const SHELL = '/bin/sh';

export type MecabEOS = { readonly t: 'EOS' };
export type MecabPOS = {
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

export function isKanji(x: MecabPOS): boolean {
  return !!x.l.match(/[\u4E00-\u9FAF]/);
}

export function mfold3<T>(
  res: MecabResult,
  ifEos: (eos: MecabEOS) => T,
  ifPos: (pos: MecabPOS) => T,
  ifPosKanji: (pos: MecabPOS) => T,
): T {
  if (res.t === 'EOS') {
    return ifEos(res);
  }

  if (isKanji(res)) {
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
      return l === 'EOS' ? eos : pos(l, v);
    });
}
