declare namespace mp {
  type Property =
    | 'speed'
    | 'audio-speed-correction'
    | 'video-speed-correction'
    | 'display-sync-active'
    | 'filename'
    | 'stream-open-filename'
    | 'file-size'
    | 'path'
    | 'media-title'
    | 'stream-path'
    | 'current-demuxer'
    | 'file-format'
    | 'stream-pos'
    | 'stream-end'
    | 'duration'
    | 'avsync'
    | 'total-avsync-change'
    | 'mistimed-frame-count'
    | 'vsync-ratio'
    | 'decoder-frame-drop-count'
    | 'frame-drop-count'
    | 'vo-delayed-frame-count'
    | 'percent-pos'
    | 'time-start'
    | 'time-pos'
    | 'time-remaining'
    | 'audio-pts'
    | 'playtime-remaining'
    | 'playback-time'
    | 'disc-title'
    | 'chapter'
    | 'edition'
    | 'disc-titles'
    | 'chapters'
    | 'editions'
    | 'angle'
    | 'metadata'
    | 'filtered-metadata'
    | 'chapter-metadata'
    | 'vf-metadata'
    | 'af-metadata'
    | 'pause'
    | 'core-idle'
    | 'eof-reached'
    | 'seeking'
    | 'playback-abort'
    | 'cache-percent'
    | 'cache-free'
    | 'cache-used'
    | 'cache-size'
    | 'cache-idle'
    | 'cache-speed'
    | 'demuxer-cache-duration'
    | 'demuxer-cache-time'
    | 'demuxer-cache-idle'
    | 'demuxer-start-time'
    | 'demuxer-cache-state'
    | 'cache-buffering-state'
    | 'paused-for-cache'
    | 'demuxer-via-network'
    | 'clock'
    | 'seekable'
    | 'partially-seekable'
    | 'idle-active'
    | 'chapter-list'
    | 'track-list'
    | 'edition-list'
    | 'disc-title-list'
    | 'playlist'
    | 'playlist-pos'
    | 'playlist-pos-1'
    | 'playlist-count'
    | 'mixer-active'
    | 'volume'
    | 'mute'
    | 'ao-volume'
    | 'ao-mute'
    | 'audio-delay'
    | 'audio-codec-name'
    | 'audio-codec'
    | 'audio-params'
    | 'audio-out-params'
    | 'aid'
    | 'audio-device'
    | 'audio-device-list'
    | 'current-ao'
    | 'fullscreen'
    | 'taskbar-progress'
    | 'ontop'
    | 'border'
    | 'on-all-workspaces'
    | 'video-out-params'
    | 'video-dec-params'
    | 'video-params'
    | 'video-format'
    | 'video-frame-info'
    | 'video-codec'
    | 'dwidth'
    | 'dheight'
    | 'width'
    | 'height'
    | 'window-scale'
    | 'vo-configured'
    | 'vo-passes'
    | 'current-vo'
    | 'container-fps'
    | 'estimated-vf-fps'
    | 'video-aspect'
    | 'vid'
    | 'program'
    | 'hwdec'
    | 'hwdec-current'
    | 'hwdec-interop'
    | 'estimated-frame-count'
    | 'estimated-frame-number'
    | 'osd-width'
    | 'osd-height'
    | 'osd-par'
    | 'osd-sym-cc'
    | 'osd-ass-cc'
    | 'sid'
    | 'secondary-sid'
    | 'sub-delay'
    | 'sub-speed'
    | 'sub-pos'
    | 'sub-text'
    | 'sub-start'
    | 'sub-end'
    | 'vf'
    | 'af'
    | 'ab-loop-a'
    | 'ab-loop-b'
    | 'packet-video-bitrate'
    | 'packet-audio-bitrate'
    | 'packet-sub-bitrate'
    | 'video-bitrate'
    | 'audio-bitrate'
    | 'sub-bitrate'
    | 'tv-brightness'
    | 'tv-contrast'
    | 'tv-saturation'
    | 'tv-hue'
    | 'tv-freq'
    | 'tv-norm'
    | 'tv-scan'
    | 'tv-channel'
    | 'dvb-channel'
    | 'dvb-channel-name'
    | 'cursor-autohide'
    | 'window-minimized'
    | 'display-names'
    | 'display-fps'
    | 'estimated-display-fps'
    | 'vsync-jitter'
    | 'working-directory'
    | 'record-file'
    | 'protocol-list'
    | 'decoder-list'
    | 'encoder-list'
    | 'demuxer-lavf-list'
    | 'mpv-version'
    | 'mpv-configuration'
    | 'ffmpeg-version'
    | 'options'
    | 'file-local-options'
    | 'option-info'
    | 'property-list'
    | 'profile-list'
    | 'video'
    | 'audio'
    | 'sub'
    | 'colormatrix'
    | 'colormatrix-input-range'
    | 'colormatrix-primaries'
    | 'colormatrix-gamma'
    | 'drop-frame-count'
    | 'vo-drop-frame-count'
    | 'include'
    | 'profile'
    | 'shuffle'
    | 'quiet'
    | 'really-quiet'
    | 'terminal'
    | 'msg-level'
    | 'dump-stats'
    | 'msg-color'
    | 'log-file'
    | 'msg-module'
    | 'msg-time'
    | 'config'
    | 'config-dir'
    | 'reset-on-next-file'
    | 'scripts'
    | 'script-opts'
    | 'load-scripts'
    | 'osc'
    | 'ytdl'
    | 'ytdl-format'
    | 'ytdl-raw-options'
    | 'load-stats-overlay'
    | 'cache'
    | 'cache-default'
    | 'cache-initial'
    | 'cache-seek-min'
    | 'cache-backbuffer'
    | 'cache-file'
    | 'cache-file-size'
    | 'frames'
    | 'start'
    | 'end'
    | 'length'
    | 'rebase-start-time'
    | 'playlist-start'
    | 'keep-open'
    | 'keep-open-pause'
    | 'image-display-duration'
    | 'index'
    | 'alang'
    | 'slang'
    | 'vlang'
    | 'track-auto-selection'
    | 'lavfi-complex'
    | 'audio-display'
    | 'hls-bitrate'
    | 'display-tags'
    | 'audio-files'
    | 'demuxer'
    | 'audio-demuxer'
    | 'sub-demuxer'
    | 'demuxer-thread'
    | 'prefetch-playlist'
    | 'cache-pause'
    | 'cache-pause-initial'
    | 'cache-pause-wait'
    | 'mf-fps'
    | 'mf-type'
    | 'stream-lavf-o'
    | 'http-header-fields'
    | 'user-agent'
    | 'referrer'
    | 'cookies'
    | 'cookies-file'
    | 'tls-verify'
    | 'tls-ca-file'
    | 'tls-cert-file'
    | 'tls-key-file'
    | 'network-timeout'
    | 'http-proxy'
    | 'mc'
    | 'fps'
    | 'audio-samplerate'
    | 'audio-channels'
    | 'audio-format'
    | 'audio-pitch-correction'
    | 'af-defaults'
    | 'vf-defaults'
    | 'deinterlace'
    | 'ad'
    | 'vd'
    | 'audio-spdif'
    | 'hwdec-codecs'
    | 'hwdec-image-format'
    | 'video-aspect-method'
    | 'vd-lavc-fast'
    | 'vd-lavc-show-all'
    | 'vd-lavc-skiploopfilter'
    | 'vd-lavc-skipidct'
    | 'vd-lavc-skipframe'
    | 'vd-lavc-framedrop'
    | 'vd-lavc-threads'
    | 'vd-lavc-bitexact'
    | 'vd-lavc-assume-old-x264'
    | 'vd-lavc-check-hw-profile'
    | 'vd-lavc-software-fallback'
    | 'vd-lavc-o'
    | 'vd-lavc-dr'
    | 'ad-lavc-ac3drc'
    | 'ad-lavc-downmix'
    | 'ad-lavc-threads'
    | 'ad-lavc-o'
    | 'demuxer-lavf-probesize'
    | 'demuxer-lavf-probe-info'
    | 'demuxer-lavf-format'
    | 'demuxer-lavf-analyzeduration'
    | 'demuxer-lavf-buffersize'
    | 'demuxer-lavf-allow-mimetype'
    | 'demuxer-lavf-probescore'
    | 'demuxer-lavf-hacks'
    | 'demuxer-lavf-o'
    | 'sub-codepage'
    | 'rtsp-transport'
    | 'demuxer-rawaudio-channels'
    | 'demuxer-rawaudio-rate'
    | 'demuxer-rawaudio-format'
    | 'demuxer-rawvideo-w'
    | 'demuxer-rawvideo-h'
    | 'demuxer-rawvideo-format'
    | 'demuxer-rawvideo-mp-format'
    | 'demuxer-rawvideo-codec'
    | 'demuxer-rawvideo-fps'
    | 'demuxer-rawvideo-size'
    | 'demuxer-mkv-subtitle-preroll'
    | 'demuxer-mkv-subtitle-preroll-secs'
    | 'demuxer-mkv-subtitle-preroll-secs-index'
    | 'demuxer-mkv-probe-video-duration'
    | 'demuxer-mkv-probe-start-time'
    | 'sub-files'
    | 'sub-file-paths'
    | 'audio-file-paths'
    | 'external-files'
    | 'autoload-files'
    | 'sub-auto'
    | 'audio-file-auto'
    | 'sub-fps'
    | 'sub-visibility'
    | 'sub-forced-only'
    | 'stretch-dvd-subs'
    | 'stretch-image-subs-to-screen'
    | 'image-subs-video-resolution'
    | 'sub-fix-timing'
    | 'sub-gauss'
    | 'sub-gray'
    | 'sub-ass'
    | 'sub-filter-sdh'
    | 'sub-filter-sdh-harder'
    | 'sub-scale'
    | 'sub-ass-line-spacing'
    | 'sub-use-margins'
    | 'sub-ass-force-margins'
    | 'sub-ass-vsfilter-aspect-compat'
    | 'sub-ass-vsfilter-color-compat'
    | 'sub-ass-vsfilter-blur-compat'
    | 'embeddedfonts'
    | 'sub-ass-force-style'
    | 'sub-ass-styles'
    | 'sub-ass-hinting'
    | 'sub-ass-shaper'
    | 'sub-ass-justify'
    | 'sub-ass-override'
    | 'sub-scale-by-window'
    | 'sub-scale-with-window'
    | 'sub-ass-scale-with-window'
    | 'sub-font'
    | 'sub-font-size'
    | 'sub-color'
    | 'sub-border-color'
    | 'sub-shadow-color'
    | 'sub-back-color'
    | 'sub-border-size'
    | 'sub-shadow-offset'
    | 'sub-spacing'
    | 'sub-margin-x'
    | 'sub-margin-y'
    | 'sub-align-x'
    | 'sub-align-y'
    | 'sub-blur'
    | 'sub-bold'
    | 'sub-italic'
    | 'sub-justify'
    | 'sub-clear-on-seek'
    | 'teletext-page'
    | 'osd-bar-align-x'
    | 'osd-bar-align-y'
    | 'osd-bar-w'
    | 'osd-bar-h'
    | 'osd-font'
    | 'osd-font-size'
    | 'osd-color'
    | 'osd-border-color'
    | 'osd-shadow-color'
    | 'osd-back-color'
    | 'osd-border-size'
    | 'osd-shadow-offset'
    | 'osd-spacing'
    | 'osd-margin-x'
    | 'osd-margin-y'
    | 'osd-align-x'
    | 'osd-align-y'
    | 'osd-blur'
    | 'osd-bold'
    | 'osd-italic'
    | 'osd-justify'
    | 'osd-scale'
    | 'osd-scale-by-window'
    | 'force-rgba-osd-rendering'
    | 'osd-bar'
    | 'ao'
    | 'coreaudio-change-physical-format'
    | 'ao-null-untimed'
    | 'ao-null-buffer'
    | 'ao-null-outburst'
    | 'ao-null-speed'
    | 'ao-null-latency'
    | 'ao-null-broken-eof'
    | 'ao-null-broken-delay'
    | 'ao-null-channel-layouts'
    | 'ao-null-format'
    | 'coreaudio-spdif-hack'
    | 'ao-pcm-file'
    | 'ao-pcm-waveheader'
    | 'ao-pcm-append'
    | 'audio-exclusive'
    | 'audio-client-name'
    | 'audio-fallback-to-null'
    | 'audio-stream-silence'
    | 'audio-wait-open'
    | 'force-window'
    | 'volume-max'
    | 'replaygain'
    | 'replaygain-preamp'
    | 'replaygain-clip'
    | 'replaygain-fallback'
    | 'gapless-audio'
    | 'audio-buffer'
    | 'title'
    | 'force-media-title'
    | 'video-rotate'
    | 'cursor-autohide-fs-only'
    | 'stop-screensaver'
    | 'brightness'
    | 'saturation'
    | 'contrast'
    | 'hue'
    | 'gamma'
    | 'video-output-levels'
    | 'use-filedir-conf'
    | 'osd-level'
    | 'osd-on-seek'
    | 'osd-duration'
    | 'osd-fractions'
    | 'sstep'
    | 'framedrop'
    | 'video-latency-hacks'
    | 'untimed'
    | 'stream-dump'
    | 'stop-playback-on-init-failure'
    | 'loop-playlist'
    | 'loop-file'
    | 'loop'
    | 'resume-playback'
    | 'save-position-on-quit'
    | 'write-filename-in-watch-later-config'
    | 'ignore-path-in-watch-later-config'
    | 'watch-later-directory'
    | 'ordered-chapters'
    | 'ordered-chapters-files'
    | 'chapter-merge-threshold'
    | 'chapter-seek-threshold'
    | 'chapters-file'
    | 'load-unsafe-playlists'
    | 'merge-files'
    | 'correct-pts'
    | 'initial-audio-sync'
    | 'video-sync'
    | 'video-sync-max-video-change'
    | 'video-sync-max-audio-change'
    | 'video-sync-adrop-size'
    | 'hr-seek'
    | 'hr-seek-demuxer-offset'
    | 'hr-seek-framedrop'
    | 'autosync'
    | 'term-osd'
    | 'term-osd-bar'
    | 'term-osd-bar-chars'
    | 'term-playing-msg'
    | 'osd-playing-msg'
    | 'term-status-msg'
    | 'osd-status-msg'
    | 'osd-msg1'
    | 'osd-msg2'
    | 'osd-msg3'
    | 'video-osd'
    | 'idle'
    | 'input-terminal'
    | 'input-file'
    | 'input-ipc-server'
    | 'screenshot-format'
    | 'screenshot-jpeg-quality'
    | 'screenshot-jpeg-source-chroma'
    | 'screenshot-png-compression'
    | 'screenshot-png-filter'
    | 'screenshot-high-bit-depth'
    | 'screenshot-tag-colorspace'
    | 'screenshot-template'
    | 'screenshot-directory'
    | 'audio-resample-filter-size'
    | 'audio-resample-phase-shift'
    | 'audio-resample-linear'
    | 'audio-resample-cutoff'
    | 'audio-normalize-downmix'
    | 'audio-resample-max-output-size'
    | 'audio-swresample-o'
    | 'input-conf'
    | 'input-ar-delay'
    | 'input-ar-rate'
    | 'input-default-bindings'
    | 'input-test'
    | 'input-doubleclick-time'
    | 'input-right-alt-gr'
    | 'input-key-fifo-size'
    | 'input-cursor'
    | 'input-vo-keyboard'
    | 'input-media-keys'
    | 'input-appleremote'
    | 'input-gamepad'
    | 'window-dragging'
    | 'input-x11-keyboard'
    | 'vo'
    | 'gpu-context'
    | 'gpu-api'
    | 'gpu-debug'
    | 'gpu-sw'
    | 'swapchain-depth'
    | 'vo-null-fps'
    | 'vo-image-format'
    | 'vo-image-jpeg-quality'
    | 'vo-image-jpeg-source-chroma'
    | 'vo-image-png-compression'
    | 'vo-image-png-filter'
    | 'vo-image-high-bit-depth'
    | 'vo-image-tag-colorspace'
    | 'vo-image-outdir'
    | 'vo-tct-algo'
    | 'vo-tct-width'
    | 'vo-tct-height'
    | 'vo-tct-256'
    | 'sws-scaler'
    | 'sws-lgb'
    | 'sws-cgb'
    | 'sws-cvs'
    | 'sws-chs'
    | 'sws-ls'
    | 'sws-cs'
    | 'snap-window'
    | 'ontop-level'
    | 'fit-border'
    | 'geometry'
    | 'autofit'
    | 'autofit-larger'
    | 'autofit-smaller'
    | 'force-window-position'
    | 'x11-name'
    | 'monitoraspect'
    | 'monitorpixelaspect'
    | 'fs'
    | 'native-keyrepeat'
    | 'panscan'
    | 'video-zoom'
    | 'video-pan-x'
    | 'video-pan-y'
    | 'video-align-x'
    | 'video-align-y'
    | 'video-unscaled'
    | 'wid'
    | 'screen'
    | 'fs-screen'
    | 'keepaspect'
    | 'keepaspect-window'
    | 'hidpi-window-scale'
    | 'native-fs'
    | 'video-timing-offset'
    | 'demuxer-readahead-secs'
    | 'demuxer-max-bytes'
    | 'demuxer-max-back-bytes'
    | 'force-seekable'
    | 'cache-secs'
    | 'access-references'
    | 'demuxer-seekable-cache'
    | 'sub-create-cc-track'
    | 'gpu-dumb-mode'
    | 'gamma-factor'
    | 'gamma-auto'
    | 'target-prim'
    | 'target-trc'
    | 'target-peak'
    | 'tone-mapping'
    | 'hdr-compute-peak'
    | 'tone-mapping-param'
    | 'tone-mapping-desaturate'
    | 'gamut-warning'
    | 'opengl-pbo'
    | 'scale'
    | 'scale-param1'
    | 'scale-param2'
    | 'scale-blur'
    | 'scale-cutoff'
    | 'scale-taper'
    | 'scale-wparam'
    | 'scale-wblur'
    | 'scale-wtaper'
    | 'scale-clamp'
    | 'scale-radius'
    | 'scale-antiring'
    | 'scale-window'
    | 'dscale'
    | 'dscale-param1'
    | 'dscale-param2'
    | 'dscale-blur'
    | 'dscale-cutoff'
    | 'dscale-taper'
    | 'dscale-wparam'
    | 'dscale-wblur'
    | 'dscale-wtaper'
    | 'dscale-clamp'
    | 'dscale-radius'
    | 'dscale-antiring'
    | 'dscale-window'
    | 'cscale'
    | 'cscale-param1'
    | 'cscale-param2'
    | 'cscale-blur'
    | 'cscale-cutoff'
    | 'cscale-taper'
    | 'cscale-wparam'
    | 'cscale-wblur'
    | 'cscale-wtaper'
    | 'cscale-clamp'
    | 'cscale-radius'
    | 'cscale-antiring'
    | 'cscale-window'
    | 'tscale'
    | 'tscale-param1'
    | 'tscale-param2'
    | 'tscale-blur'
    | 'tscale-cutoff'
    | 'tscale-taper'
    | 'tscale-wparam'
    | 'tscale-wblur'
    | 'tscale-wtaper'
    | 'tscale-clamp'
    | 'tscale-radius'
    | 'tscale-antiring'
    | 'tscale-window'
    | 'scaler-lut-size'
    | 'scaler-resizes-only'
    | 'linear-scaling'
    | 'correct-downscaling'
    | 'sigmoid-upscaling'
    | 'sigmoid-center'
    | 'sigmoid-slope'
    | 'fbo-format'
    | 'dither-depth'
    | 'dither'
    | 'dither-size-fruit'
    | 'temporal-dither'
    | 'temporal-dither-period'
    | 'alpha'
    | 'opengl-rectangle-textures'
    | 'background'
    | 'interpolation'
    | 'interpolation-threshold'
    | 'blend-subtitles'
    | 'glsl-shaders'
    | 'deband'
    | 'deband-iterations'
    | 'deband-threshold'
    | 'deband-range'
    | 'deband-grain'
    | 'sharpen'
    | 'gpu-tex-pad-x'
    | 'gpu-tex-pad-y'
    | 'use-embedded-icc-profile'
    | 'icc-profile'
    | 'icc-profile-auto'
    | 'icc-cache-dir'
    | 'icc-intent'
    | 'icc-contrast'
    | 'icc-3dlut-size'
    | '3dlut-size'
    | 'gpu-shader-cache-dir'
    | 'gpu-hwdec-interop'
    | 'opengl-hwdec-interop'
    | 'hwdec-preload'
    | 'hdr-tone-mapping'
    | 'opengl-shaders'
    | 'opengl-shader'
    | 'opengl-shader-cache-dir'
    | 'opengl-tex-pad-x'
    | 'opengl-tex-pad-y'
    | 'opengl-fbo-format'
    | 'opengl-dumb-mode'
    | 'opengl-gamma'
    | 'spirv-compiler'
    | 'opengl-glfinish'
    | 'opengl-waitvsync'
    | 'opengl-swapinterval'
    | 'opengl-check-pattern'
    | 'opengl-restrict'
    | 'opengl-es'
    | 'opengl-early-flush'
    | 'opengl-debug'
    | 'opengl-sw'
    | 'opengl-vsync-fences'
    | 'opengl-backend'
    | 'cocoa-force-dedicated-gpu'
    | 'macos-title-bar-style'
    | 'macos-fs-animation-duration'
    | 'o'
    | 'of'
    | 'ofopts'
    | 'ovc'
    | 'ovcopts'
    | 'oac'
    | 'oacopts'
    | 'ovoffset'
    | 'oaoffset'
    | 'orawts'
    | 'ovfirst'
    | 'oafirst'
    | 'ocopy-metadata'
    | 'oset-metadata'
    | 'oremove-metadata'
    | 'aspect'
    | 'ass'
    | 'audiofile'
    | 'cursor-autohide-delay'
    | 'delay'
    | 'dvdangle'
    | 'endpos'
    | 'font'
    | 'forcedsubsonly'
    | 'format'
    | 'lua'
    | 'lua-opts'
    | 'mouse-movements'
    | 'msgcolor'
    | 'msgmodule'
    | 'name'
    | 'noar'
    | 'noautosub'
    | 'noconsolecontrols'
    | 'nosound'
    | 'osdlevel'
    | 'playing-msg'
    | 'spugauss'
    | 'srate'
    | 'ss'
    | 'stop-xscreensaver'
    | 'sub-fuzziness'
    | 'subcp'
    | 'subdelay'
    | 'subfile'
    | 'subfont-text-scale'
    | 'subfont'
    | 'subfps'
    | 'subpos'
    | 'tvscan'
    | 'media-keys'
    | 'right-alt-gr'
    | 'autosub'
    | 'autosub-match'
    | 'status-msg'
    | 'idx'
    | 'forceidx'
    | 'mkv-subtitle-preroll'
    | 'ass-use-margins'
    | 'input-unix-socket'
    | 'softvol-max'
    | 'sub-text-font'
    | 'sub-text-font-size'
    | 'sub-text-color'
    | 'sub-text-border-color'
    | 'sub-text-shadow-color'
    | 'sub-text-back-color'
    | 'sub-text-border-size'
    | 'sub-text-shadow-offset'
    | 'sub-text-spacing'
    | 'sub-text-margin-x'
    | 'sub-text-margin-y'
    | 'sub-text-align-x'
    | 'sub-text-align-y'
    | 'sub-text-blur'
    | 'sub-text-bold'
    | 'sub-text-italic'
    | 'ass-line-spacing'
    | 'ass-force-margins'
    | 'ass-vsfilter-aspect-compat'
    | 'ass-vsfilter-color-compat'
    | 'ass-vsfilter-blur-compat'
    | 'ass-force-style'
    | 'ass-styles'
    | 'ass-hinting'
    | 'ass-shaper'
    | 'ass-style-override'
    | 'ass-scale-with-window'
    | 'sub-ass-style-override'
    | 'sub-paths';
}
