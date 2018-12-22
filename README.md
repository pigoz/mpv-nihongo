# mpv-nihongo

To use git-clone this repo and run `yarn install && yarn build` to compile.
You need to use my fork of mpv to get the current subtitle's text.

## Included scripts

### jplookup.ts

analyzes the current subtitle with mecab, searches lemmas containing Kanji's
in a dictionary, and displays them on the top left corner of the video

<img src="https://0x0.st/s4Dg.png" width="600" title="jplookup">

### sub2srs.ts

exports the current subtitle to an Anki card complete with image and audio,
dictionary lookups, and kanji readings from mecab with the press of a button

<img src="https://0x0.st/sdQ7.png" width="600" title="jplookup">
