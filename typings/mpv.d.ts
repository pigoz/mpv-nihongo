declare namespace mp {
  // generic return type for functions that can fail
  type LE<T = void> = undefined | T;
  type Prop = string;
  type Val = string | number | boolean;
  type bytes = number;

  function last_error(): undefined | string;
  function command(cmd: string): LE;
  // function commandv(...args: string[]): LE;
  // mp.command_native(table [,def])`` (LE)
  function get_property<T extends Val>(name: Prop): LE<T>;
  // function get_property_osd(name [,def])`` (LE)
  function get_property_bool(name: Prop): LE<boolean>;
  function get_property_number(name: Prop, def: number): LE<number>;
  function get_property_native<T extends Val>(name: Prop, def: T): LE<T>;
  function set_property<T>(name: Prop, value: T): LE<T>;
  function set_property_bool(name: Prop, value: boolean): LE<boolean>;
  function set_property_number(name: Prop, value: boolean): LE<number>;
  function set_property_native<T extends Val>(name: Prop, value: T): LE<T>;
  function get_time(): number;

  type LogLevel = 'fatal' | 'error' | 'warn' | 'info' | 'verbose' | 'debug';

  // tslint:disable-next-line class-name
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
  // mp.register_event(name, fn)``
  // mp.unregister_event(fn)``

  type PropertyHandler<T> = (prop: Prop, value: T) => void;

  function observe_property(
    name: Prop,
    type: 'string',
    handler: PropertyHandler<string>,
  ): void;

  function observe_property(
    name: Prop,
    type: 'bool',
    handler: PropertyHandler<boolean>,
  ): void;

  function observe_property(
    name: Prop,
    type: 'number',
    handler: PropertyHandler<number>,
  ): void;

  function observe_property(
    name: Prop,
    type: 'native' | 'none',
    handler: PropertyHandler<Val>,
  ): void;

  function unobserve_property(handler: PropertyHandler<any>): void;
  // mp.get_opt(key)``
  function get_script_name(): string;
  function osd_message(text: string, duration?: number): void;
  function set_osd_ass(x: number, y: number, text: string): void;
  // mp.get_wakeup_pipe()``
  function enable_messages(level: LogLevel): void;
  // mp.register_script_message(name, fn)``
  // mp.unregister_script_message(name)``

  // mp.add_hook(type, priority, fn)``

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
    getcwd(): LE<string>;
    readdir(path: string, filter: undefined | string): LE<string[]>;
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
  }

  const utils: Utils;
}
