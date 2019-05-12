declare namespace mp {
  // generic return type for functions that can fail
  type Err<T = void> = undefined | T;

  type Value =
    | string
    | number
    | boolean
    | string[]
    | number[]
    | boolean[]
    | { [x: string]: Value };

  type bytes = number;
  type timestamp = number;

  function last_error(): undefined | string;
  function command(cmd: string): Err;
  function commandv(...args: string[]): Err;
  // mp.command_native(table [,def])`` (LE)

  function get_property<T extends Value>(name: Property): Err<string>;
  function get_property_osd(name: Property): Err<string>;
  function get_property_bool(name: Property): Err<boolean>;
  function get_property_number(name: Property): Err<number>;
  function get_property_native<T extends Value>(name: Property): Err<T>;

  function set_property<T>(name: Property, value: T): Err<T>;
  function set_property_bool(name: Property, value: boolean): Err<boolean>;
  function set_property_number(name: Property, value: boolean): Err<number>;
  function set_property_native<T extends Value>(name: Property): Err<T>;

  function get_time(): number;

  type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug';

  function add_key_binding(
    key: string,
    name: string,
    handler: () => void,
  ): void;

  function add_forced_key_binding(
    key: string,
    name: string,
    handler: () => void,
  ): void;

  function remove_key_binding(name: string): void;

  type Event<X, B = {}> = { event: X } & B;
  type Events = {
    // https://mpv.io/manual/master/#lua-scripting-start-file
    'start-file': Event<'start-file'>;
    'end-file': Event<
      'end-file',
      {
        reason: 'eof' | 'stop' | 'quit' | 'error' | 'redirect' | 'unknown';
      }
    >;
    'file-loaded': Event<'file-loaded'>;
    seek: Event<'seek'>;
    'playback-restart': Event<'playback-restart'>;
    idle: Event<'idle'>;
    tick: Event<'tick'>;
    shutdown: Event<'shutdown'>;
    'log-message': Event<
      'log-message',
      { prefix: string; level: LogLevel; text: string }
    >;
    'video-reconfig': Event<'video-reconfig'>;
    'audio-reconfig': Event<'audio-reconfig'>;
  };

  function register_event<K extends keyof Events>(
    name: K,
    handler: (event: Events[K]) => void,
  ): void;

  // mp.unregister_event(fn)``

  type PropertyHandler<T> = (prop: Property, value: T) => void;

  function observe_property(
    name: Property,
    type: 'string',
    handler: PropertyHandler<string>,
  ): void;

  function observe_property(
    name: Property,
    type: 'bool',
    handler: PropertyHandler<boolean>,
  ): void;

  function observe_property(
    name: Property,
    type: 'number',
    handler: PropertyHandler<number>,
  ): void;

  function observe_property(
    name: Property,
    type: 'native' | 'none',
    handler: PropertyHandler<Value>,
  ): void;

  function unobserve_property(handler: PropertyHandler<any>): void;
  function get_opt(key: string): string;
  function get_script_name(): string;
  function osd_message(text: string, duration?: number): void;
  function set_osd_ass(x: number, y: number, text: string): void;
  function enable_messages(level: LogLevel): void;

  interface Msg {
    log(level: LogLevel, msg: string): void;
    fatal(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
    info(msg: string): void;
    verbose(msg: string): void;
    debug(msg: string): void;
  }

  const msg: Msg;

  interface Utils {
    getcwd(): Err<string>;
    getpid(): Err<number>;

    readdir(
      path: string,
      filter?: 'files' | 'dirs' | 'normal' | 'all',
    ): Err<string[]>;

    file_info(
      path: string,
    ): Err<{
      mode: number;
      size: bytes;
      atime: timestamp;
      mtime: timestamp;
      ctime: timestamp;
      is_file: boolean;
      is_dir: boolean;
    }>;

    split_path(path: string): string[];
    join_path(p1: string, p2: string): string;

    subprocess(t: {
      args: string[];
      cancellable?: boolean;
      max_size?: bytes;
    }): {
      status: number;
      stdout: string;
      error: undefined | string;
      killed_by_us: boolean;
    };

    subprocess_detached(t: string): void;
    read_file(path: string): Err<string>;
  }

  const utils: Utils;

  interface Options {
    read_options(defaults: { [opt: string]: Value }, identifier?: string): void;
  }

  const options: Options;
}
