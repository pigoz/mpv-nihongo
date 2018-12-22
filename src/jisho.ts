export function jishoslow(lemma: string): string {
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

export function jisho(lemma: string): string {
  const t = mp.utils.subprocess({
    args: ['/usr/local/bin/myougiden', '--color=no', '-t', lemma],
  });

  const result: string = t.stdout.trim().split('\n')[0];

  if (!result) {
    return '–';
  }

  return result.split('\t')[2].split('|')[0];
}
