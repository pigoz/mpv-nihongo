type Track = {
  id: number;
  title: string;
  type: string;
  codec: string;
  lang: string;
};

const languages = ['jpn', 'eng'];

function subtoggle() {
  const tl = mp.get_property_native<Track[]>('track-list');
  const sid = mp.get_property_number('sid');

  if (!tl) {
    return;
  }

  const relevant = tl
    .filter(x => x.type === 'sub' && x.codec === 'subrip')
    .filter(x => languages.indexOf(x.lang) > -1)
    .filter(x => !x.title.match(/\[Forced\]/));

  const current = relevant.filter(x => x.id === sid)[0];
  const idx = relevant.indexOf(current) || 0;
  const next: Track | null = relevant[(idx + 1) % relevant.length];

  if (next) {
    if (
      current.lang === languages[0] &&
      mp.get_property_bool('sub-visibility')
    ) {
      mp.osd_message('Subtitle (hidden): ' + current.title);
      mp.set_property_bool('sub-visibility', false);
    } else {
      mp.set_property_bool('sub-visibility', true);
      mp.set_property('sid', next.id);
      if (mp.get_property_bool('pause')) {
        mp.command('frame-step');
        mp.command('frame-back-step');
      }
      mp.osd_message('Subtitle: ' + next.title);
    }
  }
}

mp.add_key_binding('j', 'toggle', subtoggle);
