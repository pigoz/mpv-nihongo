import { MecabResult, mfold3 } from './mecab';

function some<T>(a: T[], fn: (el: T) => boolean) {
  for (let i = 0; i < a.length; i++) {
    if (fn(a[i])) {
      return true;
    }
  }
  return false;
}

const t = mp.utils.read_file('~/mpv-blacklist.txt') || '';
const bl = t.trim().split('\n');

export function isNotBlackListed(r: MecabResult): boolean {
  return mfold3(
    r,
    () => true,
    () => true,
    pos => !some(bl, el => el === pos.lemma),
  );
}
