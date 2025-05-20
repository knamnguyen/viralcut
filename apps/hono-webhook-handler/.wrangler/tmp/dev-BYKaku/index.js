var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// ../../node_modules/unenv/dist/runtime/_internal/utils.mjs
function createNotImplementedError(name2) {
  return new Error(`[unenv] ${name2} is not implemented yet!`);
}
function notImplemented(name2) {
  const fn = /* @__PURE__ */ __name(() => {
    throw createNotImplementedError(name2);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
function notImplementedAsync(name2) {
  const fn = notImplemented(name2);
  fn.__promisify__ = () => notImplemented(name2 + ".__promisify__");
  fn.native = fn;
  return fn;
}
function notImplementedClass(name2) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name2} is not implemented yet!`);
    }
  };
}
var init_utils = __esm({
  "../../node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name(createNotImplementedError, "createNotImplementedError");
    __name(notImplemented, "notImplemented");
    __name(notImplementedAsync, "notImplementedAsync");
    __name(notImplementedClass, "notImplementedClass");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin, _performanceNow, nodeTiming, PerformanceEntry, PerformanceMark, PerformanceMeasure, PerformanceResourceTiming, PerformanceObserverEntryList, Performance, PerformanceObserver, performance;
var init_performance = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
    nodeTiming = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry = class {
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name2, options) {
        this.name = name2;
        this.startTime = options?.startTime || _performanceNow();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    __name(PerformanceEntry, "PerformanceEntry");
    PerformanceMark = /* @__PURE__ */ __name(class PerformanceMark2 extends PerformanceEntry {
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    }, "PerformanceMark");
    PerformanceMeasure = class extends PerformanceEntry {
      entryType = "measure";
    };
    __name(PerformanceMeasure, "PerformanceMeasure");
    PerformanceResourceTiming = class extends PerformanceEntry {
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    __name(PerformanceResourceTiming, "PerformanceResourceTiming");
    PerformanceObserverEntryList = class {
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    __name(PerformanceObserverEntryList, "PerformanceObserverEntryList");
    Performance = class {
      __unenv__ = true;
      timeOrigin = _timeOrigin;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw createNotImplementedError("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin) {
          return _performanceNow();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name2, type) {
        return this._entries.filter((e) => e.name === name2 && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name2, options) {
        const entry = new PerformanceMark(name2, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw createNotImplementedError("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw createNotImplementedError("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    __name(Performance, "Performance");
    PerformanceObserver = class {
      __unenv__ = true;
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw createNotImplementedError("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw createNotImplementedError("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    __name(PerformanceObserver, "PerformanceObserver");
    __publicField(PerformanceObserver, "supportedEntryTypes", []);
    performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
  }
});

// ../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs
var init_perf_hooks = __esm({
  "../../node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
var init_performance2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance;
    globalThis.Performance = Performance;
    globalThis.PerformanceEntry = PerformanceEntry;
    globalThis.PerformanceMark = PerformanceMark;
    globalThis.PerformanceMeasure = PerformanceMeasure;
    globalThis.PerformanceObserver = PerformanceObserver;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
  }
});

// ../../node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default;
var init_noop = __esm({
  "../../node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default = Object.assign(() => {
    }, { __unenv__: true });
  }
});

// ../../node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";
var _console, _ignoreErrors, _stderr, _stdout, log, info, trace, debug, table, error, warn, createTask, clear, count, countReset, dir, dirxml, group, groupEnd, groupCollapsed, profile, profileEnd, time, timeEnd, timeLog, timeStamp, Console, _times, _stdoutErrorHandler, _stderrErrorHandler;
var init_console = __esm({
  "../../node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console = globalThis.console;
    _ignoreErrors = true;
    _stderr = new Writable();
    _stdout = new Writable();
    log = _console?.log ?? noop_default;
    info = _console?.info ?? log;
    trace = _console?.trace ?? info;
    debug = _console?.debug ?? log;
    table = _console?.table ?? log;
    error = _console?.error ?? log;
    warn = _console?.warn ?? error;
    createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
    clear = _console?.clear ?? noop_default;
    count = _console?.count ?? noop_default;
    countReset = _console?.countReset ?? noop_default;
    dir = _console?.dir ?? noop_default;
    dirxml = _console?.dirxml ?? noop_default;
    group = _console?.group ?? noop_default;
    groupEnd = _console?.groupEnd ?? noop_default;
    groupCollapsed = _console?.groupCollapsed ?? noop_default;
    profile = _console?.profile ?? noop_default;
    profileEnd = _console?.profileEnd ?? noop_default;
    time = _console?.time ?? noop_default;
    timeEnd = _console?.timeEnd ?? noop_default;
    timeLog = _console?.timeLog ?? noop_default;
    timeStamp = _console?.timeStamp ?? noop_default;
    Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
    _times = /* @__PURE__ */ new Map();
    _stdoutErrorHandler = noop_default;
    _stderrErrorHandler = noop_default;
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole, assert, clear2, context, count2, countReset2, createTask2, debug2, dir2, dirxml2, error2, group2, groupCollapsed2, groupEnd2, info2, log2, profile2, profileEnd2, table2, time2, timeEnd2, timeLog2, timeStamp2, trace2, warn2, console_default;
var init_console2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole = globalThis["console"];
    ({
      assert,
      clear: clear2,
      context: (
        // @ts-expect-error undocumented public API
        context
      ),
      count: count2,
      countReset: countReset2,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask2
      ),
      debug: debug2,
      dir: dir2,
      dirxml: dirxml2,
      error: error2,
      group: group2,
      groupCollapsed: groupCollapsed2,
      groupEnd: groupEnd2,
      info: info2,
      log: log2,
      profile: profile2,
      profileEnd: profileEnd2,
      table: table2,
      time: time2,
      timeEnd: timeEnd2,
      timeLog: timeLog2,
      timeStamp: timeStamp2,
      trace: trace2,
      warn: warn2
    } = workerdConsole);
    Object.assign(workerdConsole, {
      Console,
      _ignoreErrors,
      _stderr,
      _stderrErrorHandler,
      _stdout,
      _stdoutErrorHandler,
      _times
    });
    console_default = workerdConsole;
  }
});

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime;
var init_hrtime = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
      return BigInt(Date.now() * 1e6);
    }, "bigint") });
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
import { Socket } from "node:net";
var ReadStream;
var init_read_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream = class extends Socket {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      isRaw = false;
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
      isTTY = false;
    };
    __name(ReadStream, "ReadStream");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
import { Socket as Socket2 } from "node:net";
var WriteStream;
var init_write_stream = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream = class extends Socket2 {
      fd;
      constructor(fd) {
        super();
        this.fd = fd;
      }
      clearLine(dir3, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env2) {
        return 1;
      }
      hasColors(count3, env2) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      columns = 80;
      rows = 24;
      isTTY = false;
    };
    __name(WriteStream, "WriteStream");
  }
});

// ../../node_modules/unenv/dist/runtime/node/tty.mjs
var init_tty = __esm({
  "../../node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";
var Process;
var init_process = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    Process = class extends EventEmitter {
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream(2);
      }
      #cwd = "/";
      chdir(cwd2) {
        this.#cwd = cwd2;
      }
      cwd() {
        return this.#cwd;
      }
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return "";
      }
      get versions() {
        return {};
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      ref() {
      }
      unref() {
      }
      umask() {
        throw createNotImplementedError("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw createNotImplementedError("process.getActiveResourcesInfo");
      }
      exit() {
        throw createNotImplementedError("process.exit");
      }
      reallyExit() {
        throw createNotImplementedError("process.reallyExit");
      }
      kill() {
        throw createNotImplementedError("process.kill");
      }
      abort() {
        throw createNotImplementedError("process.abort");
      }
      dlopen() {
        throw createNotImplementedError("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw createNotImplementedError("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw createNotImplementedError("process.loadEnvFile");
      }
      disconnect() {
        throw createNotImplementedError("process.disconnect");
      }
      cpuUsage() {
        throw createNotImplementedError("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw createNotImplementedError("process.initgroups");
      }
      openStdin() {
        throw createNotImplementedError("process.openStdin");
      }
      assert() {
        throw createNotImplementedError("process.assert");
      }
      binding() {
        throw createNotImplementedError("process.binding");
      }
      permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: () => 0 });
      mainModule = void 0;
      domain = void 0;
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
    __name(Process, "Process");
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess, getBuiltinModule, exit, platform, nextTick, unenvProcess, abort, addListener, allowedNodeEnvironmentFlags, hasUncaughtExceptionCaptureCallback, setUncaughtExceptionCaptureCallback, loadEnvFile, sourceMapsEnabled, arch, argv, argv0, chdir, config, connected, constrainedMemory, availableMemory, cpuUsage, cwd, debugPort, dlopen, disconnect, emit, emitWarning, env, eventNames, execArgv, execPath, finalization, features, getActiveResourcesInfo, getMaxListeners, hrtime3, kill, listeners, listenerCount, memoryUsage, on, off, once, pid, ppid, prependListener, prependOnceListener, rawListeners, release, removeAllListeners, removeListener, report, resourceUsage, setMaxListeners, setSourceMapsEnabled, stderr, stdin, stdout, title, throwDeprecation, traceDeprecation, umask, uptime, version, versions, domain, initgroups, moduleLoadList, reallyExit, openStdin, assert2, binding, send, exitCode, channel, getegid, geteuid, getgid, getgroups, getuid, setegid, seteuid, setgid, setgroups, setuid, permission, mainModule, _events, _eventsCount, _exiting, _maxListeners, _debugEnd, _debugProcess, _fatalException, _getActiveHandles, _getActiveRequests, _kill, _preload_modules, _rawDebug, _startProfilerIdleNotifier, _stopProfilerIdleNotifier, _tickCallback, _disconnect, _handleQueue, _pendingMessage, _channel, _send, _linkedBinding, _process, process_default;
var init_process2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess = globalThis["process"];
    getBuiltinModule = globalProcess.getBuiltinModule;
    ({ exit, platform, nextTick } = getBuiltinModule(
      "node:process"
    ));
    unenvProcess = new Process({
      env: globalProcess.env,
      hrtime,
      nextTick
    });
    ({
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      finalization,
      features,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      on,
      off,
      once,
      pid,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    } = unenvProcess);
    _process = {
      abort,
      addListener,
      allowedNodeEnvironmentFlags,
      hasUncaughtExceptionCaptureCallback,
      setUncaughtExceptionCaptureCallback,
      loadEnvFile,
      sourceMapsEnabled,
      arch,
      argv,
      argv0,
      chdir,
      config,
      connected,
      constrainedMemory,
      availableMemory,
      cpuUsage,
      cwd,
      debugPort,
      dlopen,
      disconnect,
      emit,
      emitWarning,
      env,
      eventNames,
      execArgv,
      execPath,
      exit,
      finalization,
      features,
      getBuiltinModule,
      getActiveResourcesInfo,
      getMaxListeners,
      hrtime: hrtime3,
      kill,
      listeners,
      listenerCount,
      memoryUsage,
      nextTick,
      on,
      off,
      once,
      pid,
      platform,
      ppid,
      prependListener,
      prependOnceListener,
      rawListeners,
      release,
      removeAllListeners,
      removeListener,
      report,
      resourceUsage,
      setMaxListeners,
      setSourceMapsEnabled,
      stderr,
      stdin,
      stdout,
      title,
      throwDeprecation,
      traceDeprecation,
      umask,
      uptime,
      version,
      versions,
      // @ts-expect-error old API
      domain,
      initgroups,
      moduleLoadList,
      reallyExit,
      openStdin,
      assert: assert2,
      binding,
      send,
      exitCode,
      channel,
      getegid,
      geteuid,
      getgid,
      getgroups,
      getuid,
      setegid,
      seteuid,
      setgid,
      setgroups,
      setuid,
      permission,
      mainModule,
      _events,
      _eventsCount,
      _exiting,
      _maxListeners,
      _debugEnd,
      _debugProcess,
      _fatalException,
      _getActiveHandles,
      _getActiveRequests,
      _kill,
      _preload_modules,
      _rawDebug,
      _startProfilerIdleNotifier,
      _stopProfilerIdleNotifier,
      _tickCallback,
      _disconnect,
      _handleQueue,
      _pendingMessage,
      _channel,
      _send,
      _linkedBinding
    };
    process_default = _process;
  }
});

// ../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default;
  }
});

// wrangler-modules-watch:wrangler:modules-watch
var init_wrangler_modules_watch = __esm({
  "wrangler-modules-watch:wrangler:modules-watch"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/wrangler/templates/modules-watch-stub.js
var init_modules_watch_stub = __esm({
  "../../node_modules/wrangler/templates/modules-watch-stub.js"() {
    init_wrangler_modules_watch();
  }
});

// ../../node_modules/svix/dist/models/applicationIn.js
var require_applicationIn = __commonJS({
  "../../node_modules/svix/dist/models/applicationIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationInSerializer = void 0;
    exports.ApplicationInSerializer = {
      _fromJsonObject(object) {
        return {
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self2) {
        return {
          metadata: self2.metadata,
          name: self2.name,
          rateLimit: self2.rateLimit,
          uid: self2.uid
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/appPortalAccessIn.js
var require_appPortalAccessIn = __commonJS({
  "../../node_modules/svix/dist/models/appPortalAccessIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppPortalAccessInSerializer = void 0;
    var applicationIn_1 = require_applicationIn();
    exports.AppPortalAccessInSerializer = {
      _fromJsonObject(object) {
        return {
          application: object["application"] ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
          expiry: object["expiry"],
          featureFlags: object["featureFlags"],
          readOnly: object["readOnly"]
        };
      },
      _toJsonObject(self2) {
        return {
          application: self2.application ? applicationIn_1.ApplicationInSerializer._toJsonObject(self2.application) : void 0,
          expiry: self2.expiry,
          featureFlags: self2.featureFlags,
          readOnly: self2.readOnly
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/appPortalAccessOut.js
var require_appPortalAccessOut = __commonJS({
  "../../node_modules/svix/dist/models/appPortalAccessOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppPortalAccessOutSerializer = void 0;
    exports.AppPortalAccessOutSerializer = {
      _fromJsonObject(object) {
        return {
          token: object["token"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          token: self2.token,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/applicationTokenExpireIn.js
var require_applicationTokenExpireIn = __commonJS({
  "../../node_modules/svix/dist/models/applicationTokenExpireIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationTokenExpireInSerializer = void 0;
    exports.ApplicationTokenExpireInSerializer = {
      _fromJsonObject(object) {
        return {
          expiry: object["expiry"]
        };
      },
      _toJsonObject(self2) {
        return {
          expiry: self2.expiry
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/dashboardAccessOut.js
var require_dashboardAccessOut = __commonJS({
  "../../node_modules/svix/dist/models/dashboardAccessOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DashboardAccessOutSerializer = void 0;
    exports.DashboardAccessOutSerializer = {
      _fromJsonObject(object) {
        return {
          token: object["token"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          token: self2.token,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/whatwg-fetch/dist/fetch.umd.js
var require_fetch_umd = __commonJS({
  "../../node_modules/whatwg-fetch/dist/fetch.umd.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : factory(global2.WHATWGFetch = {});
    })(exports, function(exports2) {
      "use strict";
      var g = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || // eslint-disable-next-line no-undef
      typeof global !== "undefined" && global || {};
      var support = {
        searchParams: "URLSearchParams" in g,
        iterable: "Symbol" in g && "iterator" in Symbol,
        blob: "FileReader" in g && "Blob" in g && function() {
          try {
            new Blob();
            return true;
          } catch (e) {
            return false;
          }
        }(),
        formData: "FormData" in g,
        arrayBuffer: "ArrayBuffer" in g
      };
      function isDataView(obj) {
        return obj && DataView.prototype.isPrototypeOf(obj);
      }
      __name(isDataView, "isDataView");
      if (support.arrayBuffer) {
        var viewClasses = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]"
        ];
        var isArrayBufferView = ArrayBuffer.isView || function(obj) {
          return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
        };
      }
      function normalizeName(name2) {
        if (typeof name2 !== "string") {
          name2 = String(name2);
        }
        if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name2) || name2 === "") {
          throw new TypeError('Invalid character in header field name: "' + name2 + '"');
        }
        return name2.toLowerCase();
      }
      __name(normalizeName, "normalizeName");
      function normalizeValue(value) {
        if (typeof value !== "string") {
          value = String(value);
        }
        return value;
      }
      __name(normalizeValue, "normalizeValue");
      function iteratorFor(items) {
        var iterator = {
          next: function() {
            var value = items.shift();
            return { done: value === void 0, value };
          }
        };
        if (support.iterable) {
          iterator[Symbol.iterator] = function() {
            return iterator;
          };
        }
        return iterator;
      }
      __name(iteratorFor, "iteratorFor");
      function Headers2(headers) {
        this.map = {};
        if (headers instanceof Headers2) {
          headers.forEach(function(value, name2) {
            this.append(name2, value);
          }, this);
        } else if (Array.isArray(headers)) {
          headers.forEach(function(header) {
            if (header.length != 2) {
              throw new TypeError("Headers constructor: expected name/value pair to be length 2, found" + header.length);
            }
            this.append(header[0], header[1]);
          }, this);
        } else if (headers) {
          Object.getOwnPropertyNames(headers).forEach(function(name2) {
            this.append(name2, headers[name2]);
          }, this);
        }
      }
      __name(Headers2, "Headers");
      Headers2.prototype.append = function(name2, value) {
        name2 = normalizeName(name2);
        value = normalizeValue(value);
        var oldValue = this.map[name2];
        this.map[name2] = oldValue ? oldValue + ", " + value : value;
      };
      Headers2.prototype["delete"] = function(name2) {
        delete this.map[normalizeName(name2)];
      };
      Headers2.prototype.get = function(name2) {
        name2 = normalizeName(name2);
        return this.has(name2) ? this.map[name2] : null;
      };
      Headers2.prototype.has = function(name2) {
        return this.map.hasOwnProperty(normalizeName(name2));
      };
      Headers2.prototype.set = function(name2, value) {
        this.map[normalizeName(name2)] = normalizeValue(value);
      };
      Headers2.prototype.forEach = function(callback, thisArg) {
        for (var name2 in this.map) {
          if (this.map.hasOwnProperty(name2)) {
            callback.call(thisArg, this.map[name2], name2, this);
          }
        }
      };
      Headers2.prototype.keys = function() {
        var items = [];
        this.forEach(function(value, name2) {
          items.push(name2);
        });
        return iteratorFor(items);
      };
      Headers2.prototype.values = function() {
        var items = [];
        this.forEach(function(value) {
          items.push(value);
        });
        return iteratorFor(items);
      };
      Headers2.prototype.entries = function() {
        var items = [];
        this.forEach(function(value, name2) {
          items.push([name2, value]);
        });
        return iteratorFor(items);
      };
      if (support.iterable) {
        Headers2.prototype[Symbol.iterator] = Headers2.prototype.entries;
      }
      function consumed(body) {
        if (body._noBody)
          return;
        if (body.bodyUsed) {
          return Promise.reject(new TypeError("Already read"));
        }
        body.bodyUsed = true;
      }
      __name(consumed, "consumed");
      function fileReaderReady(reader) {
        return new Promise(function(resolve, reject) {
          reader.onload = function() {
            resolve(reader.result);
          };
          reader.onerror = function() {
            reject(reader.error);
          };
        });
      }
      __name(fileReaderReady, "fileReaderReady");
      function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise;
      }
      __name(readBlobAsArrayBuffer, "readBlobAsArrayBuffer");
      function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        var match = /charset=([A-Za-z0-9_-]+)/.exec(blob.type);
        var encoding = match ? match[1] : "utf-8";
        reader.readAsText(blob, encoding);
        return promise;
      }
      __name(readBlobAsText, "readBlobAsText");
      function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);
        for (var i = 0; i < view.length; i++) {
          chars[i] = String.fromCharCode(view[i]);
        }
        return chars.join("");
      }
      __name(readArrayBufferAsText, "readArrayBufferAsText");
      function bufferClone(buf) {
        if (buf.slice) {
          return buf.slice(0);
        } else {
          var view = new Uint8Array(buf.byteLength);
          view.set(new Uint8Array(buf));
          return view.buffer;
        }
      }
      __name(bufferClone, "bufferClone");
      function Body() {
        this.bodyUsed = false;
        this._initBody = function(body) {
          this.bodyUsed = this.bodyUsed;
          this._bodyInit = body;
          if (!body) {
            this._noBody = true;
            this._bodyText = "";
          } else if (typeof body === "string") {
            this._bodyText = body;
          } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
            this._bodyBlob = body;
          } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
            this._bodyFormData = body;
          } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
            this._bodyText = body.toString();
          } else if (support.arrayBuffer && support.blob && isDataView(body)) {
            this._bodyArrayBuffer = bufferClone(body.buffer);
            this._bodyInit = new Blob([this._bodyArrayBuffer]);
          } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
            this._bodyArrayBuffer = bufferClone(body);
          } else {
            this._bodyText = body = Object.prototype.toString.call(body);
          }
          if (!this.headers.get("content-type")) {
            if (typeof body === "string") {
              this.headers.set("content-type", "text/plain;charset=UTF-8");
            } else if (this._bodyBlob && this._bodyBlob.type) {
              this.headers.set("content-type", this._bodyBlob.type);
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
            }
          }
        };
        if (support.blob) {
          this.blob = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return Promise.resolve(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as blob");
            } else {
              return Promise.resolve(new Blob([this._bodyText]));
            }
          };
        }
        this.arrayBuffer = function() {
          if (this._bodyArrayBuffer) {
            var isConsumed = consumed(this);
            if (isConsumed) {
              return isConsumed;
            } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
              return Promise.resolve(
                this._bodyArrayBuffer.buffer.slice(
                  this._bodyArrayBuffer.byteOffset,
                  this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
                )
              );
            } else {
              return Promise.resolve(this._bodyArrayBuffer);
            }
          } else if (support.blob) {
            return this.blob().then(readBlobAsArrayBuffer);
          } else {
            throw new Error("could not read as ArrayBuffer");
          }
        };
        this.text = function() {
          var rejected = consumed(this);
          if (rejected) {
            return rejected;
          }
          if (this._bodyBlob) {
            return readBlobAsText(this._bodyBlob);
          } else if (this._bodyArrayBuffer) {
            return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
          } else if (this._bodyFormData) {
            throw new Error("could not read FormData body as text");
          } else {
            return Promise.resolve(this._bodyText);
          }
        };
        if (support.formData) {
          this.formData = function() {
            return this.text().then(decode);
          };
        }
        this.json = function() {
          return this.text().then(JSON.parse);
        };
        return this;
      }
      __name(Body, "Body");
      var methods = ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT", "TRACE"];
      function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return methods.indexOf(upcased) > -1 ? upcased : method;
      }
      __name(normalizeMethod, "normalizeMethod");
      function Request2(input, options) {
        if (!(this instanceof Request2)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        options = options || {};
        var body = options.body;
        if (input instanceof Request2) {
          if (input.bodyUsed) {
            throw new TypeError("Already read");
          }
          this.url = input.url;
          this.credentials = input.credentials;
          if (!options.headers) {
            this.headers = new Headers2(input.headers);
          }
          this.method = input.method;
          this.mode = input.mode;
          this.signal = input.signal;
          if (!body && input._bodyInit != null) {
            body = input._bodyInit;
            input.bodyUsed = true;
          }
        } else {
          this.url = String(input);
        }
        this.credentials = options.credentials || this.credentials || "same-origin";
        if (options.headers || !this.headers) {
          this.headers = new Headers2(options.headers);
        }
        this.method = normalizeMethod(options.method || this.method || "GET");
        this.mode = options.mode || this.mode || null;
        this.signal = options.signal || this.signal || function() {
          if ("AbortController" in g) {
            var ctrl = new AbortController();
            return ctrl.signal;
          }
        }();
        this.referrer = null;
        if ((this.method === "GET" || this.method === "HEAD") && body) {
          throw new TypeError("Body not allowed for GET or HEAD requests");
        }
        this._initBody(body);
        if (this.method === "GET" || this.method === "HEAD") {
          if (options.cache === "no-store" || options.cache === "no-cache") {
            var reParamSearch = /([?&])_=[^&]*/;
            if (reParamSearch.test(this.url)) {
              this.url = this.url.replace(reParamSearch, "$1_=" + (/* @__PURE__ */ new Date()).getTime());
            } else {
              var reQueryString = /\?/;
              this.url += (reQueryString.test(this.url) ? "&" : "?") + "_=" + (/* @__PURE__ */ new Date()).getTime();
            }
          }
        }
      }
      __name(Request2, "Request");
      Request2.prototype.clone = function() {
        return new Request2(this, { body: this._bodyInit });
      };
      function decode(body) {
        var form = new FormData();
        body.trim().split("&").forEach(function(bytes) {
          if (bytes) {
            var split = bytes.split("=");
            var name2 = split.shift().replace(/\+/g, " ");
            var value = split.join("=").replace(/\+/g, " ");
            form.append(decodeURIComponent(name2), decodeURIComponent(value));
          }
        });
        return form;
      }
      __name(decode, "decode");
      function parseHeaders(rawHeaders) {
        var headers = new Headers2();
        var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
        preProcessedHeaders.split("\r").map(function(header) {
          return header.indexOf("\n") === 0 ? header.substr(1, header.length) : header;
        }).forEach(function(line) {
          var parts = line.split(":");
          var key = parts.shift().trim();
          if (key) {
            var value = parts.join(":").trim();
            try {
              headers.append(key, value);
            } catch (error3) {
              console.warn("Response " + error3.message);
            }
          }
        });
        return headers;
      }
      __name(parseHeaders, "parseHeaders");
      Body.call(Request2.prototype);
      function Response2(bodyInit, options) {
        if (!(this instanceof Response2)) {
          throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.');
        }
        if (!options) {
          options = {};
        }
        this.type = "default";
        this.status = options.status === void 0 ? 200 : options.status;
        if (this.status < 200 || this.status > 599) {
          throw new RangeError("Failed to construct 'Response': The status provided (0) is outside the range [200, 599].");
        }
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = options.statusText === void 0 ? "" : "" + options.statusText;
        this.headers = new Headers2(options.headers);
        this.url = options.url || "";
        this._initBody(bodyInit);
      }
      __name(Response2, "Response");
      Body.call(Response2.prototype);
      Response2.prototype.clone = function() {
        return new Response2(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new Headers2(this.headers),
          url: this.url
        });
      };
      Response2.error = function() {
        var response = new Response2(null, { status: 200, statusText: "" });
        response.ok = false;
        response.status = 0;
        response.type = "error";
        return response;
      };
      var redirectStatuses = [301, 302, 303, 307, 308];
      Response2.redirect = function(url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
          throw new RangeError("Invalid status code");
        }
        return new Response2(null, { status, headers: { location: url } });
      };
      exports2.DOMException = g.DOMException;
      try {
        new exports2.DOMException();
      } catch (err) {
        exports2.DOMException = function(message, name2) {
          this.message = message;
          this.name = name2;
          var error3 = Error(message);
          this.stack = error3.stack;
        };
        exports2.DOMException.prototype = Object.create(Error.prototype);
        exports2.DOMException.prototype.constructor = exports2.DOMException;
      }
      function fetch2(input, init2) {
        return new Promise(function(resolve, reject) {
          var request = new Request2(input, init2);
          if (request.signal && request.signal.aborted) {
            return reject(new exports2.DOMException("Aborted", "AbortError"));
          }
          var xhr = new XMLHttpRequest();
          function abortXhr() {
            xhr.abort();
          }
          __name(abortXhr, "abortXhr");
          xhr.onload = function() {
            var options = {
              statusText: xhr.statusText,
              headers: parseHeaders(xhr.getAllResponseHeaders() || "")
            };
            if (request.url.indexOf("file://") === 0 && (xhr.status < 200 || xhr.status > 599)) {
              options.status = 200;
            } else {
              options.status = xhr.status;
            }
            options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
            var body = "response" in xhr ? xhr.response : xhr.responseText;
            setTimeout(function() {
              resolve(new Response2(body, options));
            }, 0);
          };
          xhr.onerror = function() {
            setTimeout(function() {
              reject(new TypeError("Network request failed"));
            }, 0);
          };
          xhr.ontimeout = function() {
            setTimeout(function() {
              reject(new TypeError("Network request timed out"));
            }, 0);
          };
          xhr.onabort = function() {
            setTimeout(function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            }, 0);
          };
          function fixUrl(url) {
            try {
              return url === "" && g.location.href ? g.location.href : url;
            } catch (e) {
              return url;
            }
          }
          __name(fixUrl, "fixUrl");
          xhr.open(request.method, fixUrl(request.url), true);
          if (request.credentials === "include") {
            xhr.withCredentials = true;
          } else if (request.credentials === "omit") {
            xhr.withCredentials = false;
          }
          if ("responseType" in xhr) {
            if (support.blob) {
              xhr.responseType = "blob";
            } else if (support.arrayBuffer) {
              xhr.responseType = "arraybuffer";
            }
          }
          if (init2 && typeof init2.headers === "object" && !(init2.headers instanceof Headers2 || g.Headers && init2.headers instanceof g.Headers)) {
            var names = [];
            Object.getOwnPropertyNames(init2.headers).forEach(function(name2) {
              names.push(normalizeName(name2));
              xhr.setRequestHeader(name2, normalizeValue(init2.headers[name2]));
            });
            request.headers.forEach(function(value, name2) {
              if (names.indexOf(name2) === -1) {
                xhr.setRequestHeader(name2, value);
              }
            });
          } else {
            request.headers.forEach(function(value, name2) {
              xhr.setRequestHeader(name2, value);
            });
          }
          if (request.signal) {
            request.signal.addEventListener("abort", abortXhr);
            xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                request.signal.removeEventListener("abort", abortXhr);
              }
            };
          }
          xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
        });
      }
      __name(fetch2, "fetch");
      fetch2.polyfill = true;
      if (!g.fetch) {
        g.fetch = fetch2;
        g.Headers = Headers2;
        g.Request = Request2;
        g.Response = Response2;
      }
      exports2.Headers = Headers2;
      exports2.Request = Request2;
      exports2.Response = Response2;
      exports2.fetch = fetch2;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// ../../node_modules/svix-fetch/fetch-npm-browserify.js
var require_fetch_npm_browserify = __commonJS({
  "../../node_modules/svix-fetch/fetch-npm-browserify.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    require_fetch_umd();
    module.exports = self.fetch.bind(self);
  }
});

// ../../node_modules/svix/dist/util.js
var require_util = __commonJS({
  "../../node_modules/svix/dist/util.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiException = void 0;
    var ApiException = class extends Error {
      constructor(code, body, headers) {
        super(`HTTP-Code: ${code}
Headers: ${JSON.stringify(headers)}`);
        this.code = code;
        this.body = body;
        this.headers = {};
        headers.forEach((value, name2) => {
          this.headers[name2] = value;
        });
      }
    };
    __name(ApiException, "ApiException");
    exports.ApiException = ApiException;
  }
});

// ../../node_modules/svix/dist/request.js
var require_request = __commonJS({
  "../../node_modules/svix/dist/request.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      __name(adopt, "adopt");
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        __name(fulfilled, "fulfilled");
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        __name(rejected, "rejected");
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        __name(step, "step");
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixRequest = exports.HttpMethod = exports.LIB_VERSION = void 0;
    require_fetch_npm_browserify();
    var util_1 = require_util();
    exports.LIB_VERSION = "1.65.0";
    var USER_AGENT = `svix-libs/${exports.LIB_VERSION}/javascript`;
    var HttpMethod;
    (function(HttpMethod2) {
      HttpMethod2["GET"] = "GET";
      HttpMethod2["HEAD"] = "HEAD";
      HttpMethod2["POST"] = "POST";
      HttpMethod2["PUT"] = "PUT";
      HttpMethod2["DELETE"] = "DELETE";
      HttpMethod2["CONNECT"] = "CONNECT";
      HttpMethod2["OPTIONS"] = "OPTIONS";
      HttpMethod2["TRACE"] = "TRACE";
      HttpMethod2["PATCH"] = "PATCH";
    })(HttpMethod = exports.HttpMethod || (exports.HttpMethod = {}));
    var SvixRequest = class {
      constructor(method, path) {
        this.method = method;
        this.path = path;
        this.queryParams = {};
        this.headerParams = {};
      }
      setPathParam(name2, value) {
        const newPath = this.path.replace(`{${name2}}`, encodeURIComponent(value));
        if (this.path === newPath) {
          throw new Error(`path parameter ${name2} not found`);
        }
        this.path = newPath;
      }
      setQueryParam(name2, value) {
        if (value === void 0 || value === null) {
          return;
        }
        if (typeof value === "string") {
          this.queryParams[name2] = value;
        } else if (typeof value === "boolean" || typeof value === "number") {
          this.queryParams[name2] = value.toString();
        } else if (value instanceof Date) {
          this.queryParams[name2] = value.toISOString();
        } else if (value instanceof Array) {
          if (value.length > 0) {
            this.queryParams[name2] = value.join(",");
          }
        } else {
          const _assert_unreachable = value;
          throw new Error(`query parameter ${name2} has unsupported type`);
        }
      }
      setHeaderParam(name2, value) {
        if (value === void 0) {
          return;
        }
        this.headerParams[name2] = value;
      }
      setBody(value) {
        this.body = JSON.stringify(value);
      }
      send(ctx, parseResponseBody) {
        return __awaiter(this, void 0, void 0, function* () {
          const response = yield this.sendInner(ctx);
          if (response.status == 204) {
            return null;
          }
          const responseBody = yield response.text();
          return parseResponseBody(JSON.parse(responseBody));
        });
      }
      sendNoResponseBody(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
          yield this.sendInner(ctx);
        });
      }
      sendInner(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
          const url = new URL(ctx.baseUrl + this.path);
          for (const [name2, value] of Object.entries(this.queryParams)) {
            url.searchParams.set(name2, value);
          }
          const randomId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
          if (this.body != null) {
            this.headerParams["content-type"] = "application/json";
          }
          const isCredentialsSupported = "credentials" in Request.prototype;
          const response = yield sendWithRetry(url, {
            method: this.method.toString(),
            body: this.body,
            headers: Object.assign({ accept: "application/json, */*;q=0.8", authorization: `Bearer ${ctx.token}`, "user-agent": USER_AGENT, "svix-req-id": randomId.toString() }, this.headerParams),
            credentials: isCredentialsSupported ? "same-origin" : void 0,
            signal: ctx.timeout !== void 0 ? AbortSignal.timeout(ctx.timeout) : void 0
          });
          return filterResponseForErrors(response);
        });
      }
    };
    __name(SvixRequest, "SvixRequest");
    exports.SvixRequest = SvixRequest;
    function filterResponseForErrors(response) {
      return __awaiter(this, void 0, void 0, function* () {
        if (response.status < 300) {
          return response;
        }
        const responseBody = yield response.text();
        if (response.status === 422) {
          throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
        }
        if (response.status >= 400 && response.status <= 499) {
          throw new util_1.ApiException(response.status, JSON.parse(responseBody), response.headers);
        }
        throw new util_1.ApiException(response.status, responseBody, response.headers);
      });
    }
    __name(filterResponseForErrors, "filterResponseForErrors");
    function sendWithRetry(url, init2, triesLeft = 2, nextInterval = 50, retryCount = 1) {
      return __awaiter(this, void 0, void 0, function* () {
        const sleep = /* @__PURE__ */ __name((interval) => new Promise((resolve) => setTimeout(resolve, interval)), "sleep");
        try {
          const response = yield fetch(url, init2);
          if (triesLeft <= 0 || response.status < 500) {
            return response;
          }
        } catch (e) {
          if (triesLeft <= 0) {
            throw e;
          }
        }
        yield sleep(nextInterval);
        init2.headers["svix-retry-count"] = retryCount.toString();
        return yield sendWithRetry(url, init2, --triesLeft, nextInterval * 2, ++retryCount);
      });
    }
    __name(sendWithRetry, "sendWithRetry");
  }
});

// ../../node_modules/svix/dist/api/authentication.js
var require_authentication = __commonJS({
  "../../node_modules/svix/dist/api/authentication.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Authentication = void 0;
    var appPortalAccessIn_1 = require_appPortalAccessIn();
    var appPortalAccessOut_1 = require_appPortalAccessOut();
    var applicationTokenExpireIn_1 = require_applicationTokenExpireIn();
    var dashboardAccessOut_1 = require_dashboardAccessOut();
    var request_1 = require_request();
    var Authentication = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      appPortalAccess(appId, appPortalAccessIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app-portal-access/{app_id}");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(appPortalAccessIn_1.AppPortalAccessInSerializer._toJsonObject(appPortalAccessIn));
        return request.send(this.requestCtx, appPortalAccessOut_1.AppPortalAccessOutSerializer._fromJsonObject);
      }
      expireAll(appId, applicationTokenExpireIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/app/{app_id}/expire-all");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationTokenExpireIn_1.ApplicationTokenExpireInSerializer._toJsonObject(applicationTokenExpireIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      dashboardAccess(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/dashboard-access/{app_id}");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
      }
      logout(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/auth/logout");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(Authentication, "Authentication");
    exports.Authentication = Authentication;
  }
});

// ../../node_modules/svix/dist/models/applicationOut.js
var require_applicationOut = __commonJS({
  "../../node_modules/svix/dist/models/applicationOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationOutSerializer = void 0;
    exports.ApplicationOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          id: object["id"],
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self2) {
        return {
          createdAt: self2.createdAt,
          id: self2.id,
          metadata: self2.metadata,
          name: self2.name,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          updatedAt: self2.updatedAt
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/applicationPatch.js
var require_applicationPatch = __commonJS({
  "../../node_modules/svix/dist/models/applicationPatch.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApplicationPatchSerializer = void 0;
    exports.ApplicationPatchSerializer = {
      _fromJsonObject(object) {
        return {
          metadata: object["metadata"],
          name: object["name"],
          rateLimit: object["rateLimit"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self2) {
        return {
          metadata: self2.metadata,
          name: self2.name,
          rateLimit: self2.rateLimit,
          uid: self2.uid
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseApplicationOut.js
var require_listResponseApplicationOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseApplicationOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseApplicationOutSerializer = void 0;
    var applicationOut_1 = require_applicationOut();
    exports.ListResponseApplicationOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => applicationOut_1.ApplicationOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => applicationOut_1.ApplicationOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/application.js
var require_application = __commonJS({
  "../../node_modules/svix/dist/api/application.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Application = void 0;
    var applicationIn_1 = require_applicationIn();
    var applicationOut_1 = require_applicationOut();
    var applicationPatch_1 = require_applicationPatch();
    var listResponseApplicationOut_1 = require_listResponseApplicationOut();
    var request_1 = require_request();
    var Application = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseApplicationOut_1.ListResponseApplicationOutSerializer._fromJsonObject);
      }
      create(applicationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      getOrCreate(applicationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app");
        request.setQueryParam("get_if_exists", true);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      get(appId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      update(appId, applicationIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        request.setBody(applicationIn_1.ApplicationInSerializer._toJsonObject(applicationIn));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
      delete(appId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(appId, applicationPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}");
        request.setPathParam("app_id", appId);
        request.setBody(applicationPatch_1.ApplicationPatchSerializer._toJsonObject(applicationPatch));
        return request.send(this.requestCtx, applicationOut_1.ApplicationOutSerializer._fromJsonObject);
      }
    };
    __name(Application, "Application");
    exports.Application = Application;
  }
});

// ../../node_modules/svix/dist/models/backgroundTaskStatus.js
var require_backgroundTaskStatus = __commonJS({
  "../../node_modules/svix/dist/models/backgroundTaskStatus.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskStatusSerializer = exports.BackgroundTaskStatus = void 0;
    var BackgroundTaskStatus;
    (function(BackgroundTaskStatus2) {
      BackgroundTaskStatus2["Running"] = "running";
      BackgroundTaskStatus2["Finished"] = "finished";
      BackgroundTaskStatus2["Failed"] = "failed";
    })(BackgroundTaskStatus = exports.BackgroundTaskStatus || (exports.BackgroundTaskStatus = {}));
    exports.BackgroundTaskStatusSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/backgroundTaskType.js
var require_backgroundTaskType = __commonJS({
  "../../node_modules/svix/dist/models/backgroundTaskType.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskTypeSerializer = exports.BackgroundTaskType = void 0;
    var BackgroundTaskType;
    (function(BackgroundTaskType2) {
      BackgroundTaskType2["EndpointReplay"] = "endpoint.replay";
      BackgroundTaskType2["EndpointRecover"] = "endpoint.recover";
      BackgroundTaskType2["ApplicationStats"] = "application.stats";
      BackgroundTaskType2["MessageBroadcast"] = "message.broadcast";
      BackgroundTaskType2["SdkGenerate"] = "sdk.generate";
      BackgroundTaskType2["EventTypeAggregate"] = "event-type.aggregate";
      BackgroundTaskType2["ApplicationPurgeContent"] = "application.purge_content";
    })(BackgroundTaskType = exports.BackgroundTaskType || (exports.BackgroundTaskType = {}));
    exports.BackgroundTaskTypeSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/backgroundTaskOut.js
var require_backgroundTaskOut = __commonJS({
  "../../node_modules/svix/dist/models/backgroundTaskOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTaskOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.BackgroundTaskOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: object["data"],
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data,
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseBackgroundTaskOut.js
var require_listResponseBackgroundTaskOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseBackgroundTaskOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseBackgroundTaskOutSerializer = void 0;
    var backgroundTaskOut_1 = require_backgroundTaskOut();
    exports.ListResponseBackgroundTaskOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => backgroundTaskOut_1.BackgroundTaskOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/backgroundTask.js
var require_backgroundTask = __commonJS({
  "../../node_modules/svix/dist/api/backgroundTask.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BackgroundTask = void 0;
    var backgroundTaskOut_1 = require_backgroundTaskOut();
    var listResponseBackgroundTaskOut_1 = require_listResponseBackgroundTaskOut();
    var request_1 = require_request();
    var BackgroundTask = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task");
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("task", options === null || options === void 0 ? void 0 : options.task);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseBackgroundTaskOut_1.ListResponseBackgroundTaskOutSerializer._fromJsonObject);
      }
      listByEndpoint(options) {
        return this.list(options);
      }
      get(taskId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/background-task/{task_id}");
        request.setPathParam("task_id", taskId);
        return request.send(this.requestCtx, backgroundTaskOut_1.BackgroundTaskOutSerializer._fromJsonObject);
      }
    };
    __name(BackgroundTask, "BackgroundTask");
    exports.BackgroundTask = BackgroundTask;
  }
});

// ../../node_modules/svix/dist/models/endpointHeadersIn.js
var require_endpointHeadersIn = __commonJS({
  "../../node_modules/svix/dist/models/endpointHeadersIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersInSerializer = void 0;
    exports.EndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointHeadersOut.js
var require_endpointHeadersOut = __commonJS({
  "../../node_modules/svix/dist/models/endpointHeadersOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersOutSerializer = void 0;
    exports.EndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers,
          sensitive: self2.sensitive
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointHeadersPatchIn.js
var require_endpointHeadersPatchIn = __commonJS({
  "../../node_modules/svix/dist/models/endpointHeadersPatchIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointHeadersPatchInSerializer = void 0;
    exports.EndpointHeadersPatchInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointIn.js
var require_endpointIn = __commonJS({
  "../../node_modules/svix/dist/models/endpointIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointInSerializer = void 0;
    exports.EndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          headers: object["headers"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          headers: self2.headers,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          secret: self2.secret,
          uid: self2.uid,
          url: self2.url,
          version: self2.version
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointOut.js
var require_endpointOut = __commonJS({
  "../../node_modules/svix/dist/models/endpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointOutSerializer = void 0;
    exports.EndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          createdAt: self2.createdAt,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          id: self2.id,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          updatedAt: self2.updatedAt,
          url: self2.url,
          version: self2.version
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointPatch.js
var require_endpointPatch = __commonJS({
  "../../node_modules/svix/dist/models/endpointPatch.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointPatchSerializer = void 0;
    exports.EndpointPatchSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          secret: self2.secret,
          uid: self2.uid,
          url: self2.url,
          version: self2.version
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointSecretOut.js
var require_endpointSecretOut = __commonJS({
  "../../node_modules/svix/dist/models/endpointSecretOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointSecretOutSerializer = void 0;
    exports.EndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointSecretRotateIn.js
var require_endpointSecretRotateIn = __commonJS({
  "../../node_modules/svix/dist/models/endpointSecretRotateIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointSecretRotateInSerializer = void 0;
    exports.EndpointSecretRotateInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointStats.js
var require_endpointStats = __commonJS({
  "../../node_modules/svix/dist/models/endpointStats.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointStatsSerializer = void 0;
    exports.EndpointStatsSerializer = {
      _fromJsonObject(object) {
        return {
          fail: object["fail"],
          pending: object["pending"],
          sending: object["sending"],
          success: object["success"]
        };
      },
      _toJsonObject(self2) {
        return {
          fail: self2.fail,
          pending: self2.pending,
          sending: self2.sending,
          success: self2.success
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointTransformationIn.js
var require_endpointTransformationIn = __commonJS({
  "../../node_modules/svix/dist/models/endpointTransformationIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointTransformationInSerializer = void 0;
    exports.EndpointTransformationInSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self2) {
        return {
          code: self2.code,
          enabled: self2.enabled
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointTransformationOut.js
var require_endpointTransformationOut = __commonJS({
  "../../node_modules/svix/dist/models/endpointTransformationOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointTransformationOutSerializer = void 0;
    exports.EndpointTransformationOutSerializer = {
      _fromJsonObject(object) {
        return {
          code: object["code"],
          enabled: object["enabled"]
        };
      },
      _toJsonObject(self2) {
        return {
          code: self2.code,
          enabled: self2.enabled
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointUpdate.js
var require_endpointUpdate = __commonJS({
  "../../node_modules/svix/dist/models/endpointUpdate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointUpdateSerializer = void 0;
    exports.EndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          url: self2.url,
          version: self2.version
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventExampleIn.js
var require_eventExampleIn = __commonJS({
  "../../node_modules/svix/dist/models/eventExampleIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventExampleInSerializer = void 0;
    exports.EventExampleInSerializer = {
      _fromJsonObject(object) {
        return {
          eventType: object["eventType"],
          exampleIndex: object["exampleIndex"]
        };
      },
      _toJsonObject(self2) {
        return {
          eventType: self2.eventType,
          exampleIndex: self2.exampleIndex
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseEndpointOut.js
var require_listResponseEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEndpointOutSerializer = void 0;
    var endpointOut_1 = require_endpointOut();
    exports.ListResponseEndpointOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => endpointOut_1.EndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => endpointOut_1.EndpointOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/messageOut.js
var require_messageOut = __commonJS({
  "../../node_modules/svix/dist/models/messageOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageOutSerializer = void 0;
    exports.MessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          id: object["id"],
          payload: object["payload"],
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          eventId: self2.eventId,
          eventType: self2.eventType,
          id: self2.id,
          payload: self2.payload,
          tags: self2.tags,
          timestamp: self2.timestamp
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/recoverIn.js
var require_recoverIn = __commonJS({
  "../../node_modules/svix/dist/models/recoverIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecoverInSerializer = void 0;
    exports.RecoverInSerializer = {
      _fromJsonObject(object) {
        return {
          since: new Date(object["since"]),
          until: new Date(object["until"])
        };
      },
      _toJsonObject(self2) {
        return {
          since: self2.since,
          until: self2.until
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/recoverOut.js
var require_recoverOut = __commonJS({
  "../../node_modules/svix/dist/models/recoverOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecoverOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.RecoverOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self2) {
        return {
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/replayIn.js
var require_replayIn = __commonJS({
  "../../node_modules/svix/dist/models/replayIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReplayInSerializer = void 0;
    exports.ReplayInSerializer = {
      _fromJsonObject(object) {
        return {
          since: new Date(object["since"]),
          until: new Date(object["until"])
        };
      },
      _toJsonObject(self2) {
        return {
          since: self2.since,
          until: self2.until
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/replayOut.js
var require_replayOut = __commonJS({
  "../../node_modules/svix/dist/models/replayOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ReplayOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.ReplayOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self2) {
        return {
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/endpoint.js
var require_endpoint = __commonJS({
  "../../node_modules/svix/dist/api/endpoint.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Endpoint = void 0;
    var endpointHeadersIn_1 = require_endpointHeadersIn();
    var endpointHeadersOut_1 = require_endpointHeadersOut();
    var endpointHeadersPatchIn_1 = require_endpointHeadersPatchIn();
    var endpointIn_1 = require_endpointIn();
    var endpointOut_1 = require_endpointOut();
    var endpointPatch_1 = require_endpointPatch();
    var endpointSecretOut_1 = require_endpointSecretOut();
    var endpointSecretRotateIn_1 = require_endpointSecretRotateIn();
    var endpointStats_1 = require_endpointStats();
    var endpointTransformationIn_1 = require_endpointTransformationIn();
    var endpointTransformationOut_1 = require_endpointTransformationOut();
    var endpointUpdate_1 = require_endpointUpdate();
    var eventExampleIn_1 = require_eventExampleIn();
    var listResponseEndpointOut_1 = require_listResponseEndpointOut();
    var messageOut_1 = require_messageOut();
    var recoverIn_1 = require_recoverIn();
    var recoverOut_1 = require_recoverOut();
    var replayIn_1 = require_replayIn();
    var replayOut_1 = require_replayOut();
    var request_1 = require_request();
    var Endpoint = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseEndpointOut_1.ListResponseEndpointOutSerializer._fromJsonObject);
      }
      create(appId, endpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(endpointIn_1.EndpointInSerializer._toJsonObject(endpointIn));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      get(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      update(appId, endpointId, endpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointUpdate_1.EndpointUpdateSerializer._toJsonObject(endpointUpdate));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      delete(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(appId, endpointId, endpointPatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointPatch_1.EndpointPatchSerializer._toJsonObject(endpointPatch));
        return request.send(this.requestCtx, endpointOut_1.EndpointOutSerializer._fromJsonObject);
      }
      getHeaders(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointHeadersOut_1.EndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(appId, endpointId, endpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointHeadersIn_1.EndpointHeadersInSerializer._toJsonObject(endpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      headersUpdate(appId, endpointId, endpointHeadersIn) {
        return this.updateHeaders(appId, endpointId, endpointHeadersIn);
      }
      patchHeaders(appId, endpointId, endpointHeadersPatchIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointHeadersPatchIn_1.EndpointHeadersPatchInSerializer._toJsonObject(endpointHeadersPatchIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      headersPatch(appId, endpointId, endpointHeadersPatchIn) {
        return this.patchHeaders(appId, endpointId, endpointHeadersPatchIn);
      }
      recover(appId, endpointId, recoverIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/recover");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(recoverIn_1.RecoverInSerializer._toJsonObject(recoverIn));
        return request.send(this.requestCtx, recoverOut_1.RecoverOutSerializer._fromJsonObject);
      }
      replayMissing(appId, endpointId, replayIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/replay-missing");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(replayIn_1.ReplayInSerializer._toJsonObject(replayIn));
        return request.send(this.requestCtx, replayOut_1.ReplayOutSerializer._fromJsonObject);
      }
      getSecret(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointSecretOut_1.EndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(appId, endpointId, endpointSecretRotateIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(endpointSecretRotateIn_1.EndpointSecretRotateInSerializer._toJsonObject(endpointSecretRotateIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      sendExample(appId, endpointId, eventExampleIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/send-example");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventExampleIn_1.EventExampleInSerializer._toJsonObject(eventExampleIn));
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      getStats(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/stats");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("since", options === null || options === void 0 ? void 0 : options.since);
        request.setQueryParam("until", options === null || options === void 0 ? void 0 : options.until);
        return request.send(this.requestCtx, endpointStats_1.EndpointStatsSerializer._fromJsonObject);
      }
      transformationGet(appId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, endpointTransformationOut_1.EndpointTransformationOutSerializer._fromJsonObject);
      }
      transformationPartialUpdate(appId, endpointId, endpointTransformationIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/transformation");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(endpointTransformationIn_1.EndpointTransformationInSerializer._toJsonObject(endpointTransformationIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(Endpoint, "Endpoint");
    exports.Endpoint = Endpoint;
  }
});

// ../../node_modules/svix/dist/models/eventTypeImportOpenApiIn.js
var require_eventTypeImportOpenApiIn = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeImportOpenApiIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiInSerializer = void 0;
    exports.EventTypeImportOpenApiInSerializer = {
      _fromJsonObject(object) {
        return {
          dryRun: object["dryRun"],
          replaceAll: object["replaceAll"],
          spec: object["spec"],
          specRaw: object["specRaw"]
        };
      },
      _toJsonObject(self2) {
        return {
          dryRun: self2.dryRun,
          replaceAll: self2.replaceAll,
          spec: self2.spec,
          specRaw: self2.specRaw
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeFromOpenApi.js
var require_eventTypeFromOpenApi = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeFromOpenApi.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeFromOpenApiSerializer = void 0;
    exports.EventTypeFromOpenApiSerializer = {
      _fromJsonObject(object) {
        return {
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self2) {
        return {
          deprecated: self2.deprecated,
          description: self2.description,
          featureFlag: self2.featureFlag,
          groupName: self2.groupName,
          name: self2.name,
          schemas: self2.schemas
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeImportOpenApiOutData.js
var require_eventTypeImportOpenApiOutData = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeImportOpenApiOutData.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiOutDataSerializer = void 0;
    var eventTypeFromOpenApi_1 = require_eventTypeFromOpenApi();
    exports.EventTypeImportOpenApiOutDataSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          modified: object["modified"],
          toModify: (_a2 = object["to_modify"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._fromJsonObject(item))
        };
      },
      _toJsonObject(self2) {
        var _a2;
        return {
          modified: self2.modified,
          to_modify: (_a2 = self2.toModify) === null || _a2 === void 0 ? void 0 : _a2.map((item) => eventTypeFromOpenApi_1.EventTypeFromOpenApiSerializer._toJsonObject(item))
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeImportOpenApiOut.js
var require_eventTypeImportOpenApiOut = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeImportOpenApiOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeImportOpenApiOutSerializer = void 0;
    var eventTypeImportOpenApiOutData_1 = require_eventTypeImportOpenApiOutData();
    exports.EventTypeImportOpenApiOutSerializer = {
      _fromJsonObject(object) {
        return {
          data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._fromJsonObject(object["data"])
        };
      },
      _toJsonObject(self2) {
        return {
          data: eventTypeImportOpenApiOutData_1.EventTypeImportOpenApiOutDataSerializer._toJsonObject(self2.data)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeIn.js
var require_eventTypeIn = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeInSerializer = void 0;
    exports.EventTypeInSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self2) {
        return {
          archived: self2.archived,
          deprecated: self2.deprecated,
          description: self2.description,
          featureFlag: self2.featureFlag,
          groupName: self2.groupName,
          name: self2.name,
          schemas: self2.schemas
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeOut.js
var require_eventTypeOut = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeOutSerializer = void 0;
    exports.EventTypeOutSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          createdAt: new Date(object["createdAt"]),
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          groupName: object["groupName"],
          name: object["name"],
          schemas: object["schemas"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self2) {
        return {
          archived: self2.archived,
          createdAt: self2.createdAt,
          deprecated: self2.deprecated,
          description: self2.description,
          featureFlag: self2.featureFlag,
          groupName: self2.groupName,
          name: self2.name,
          schemas: self2.schemas,
          updatedAt: self2.updatedAt
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypePatch.js
var require_eventTypePatch = __commonJS({
  "../../node_modules/svix/dist/models/eventTypePatch.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypePatchSerializer = void 0;
    exports.EventTypePatchSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          groupName: object["groupName"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self2) {
        return {
          archived: self2.archived,
          deprecated: self2.deprecated,
          description: self2.description,
          featureFlag: self2.featureFlag,
          groupName: self2.groupName,
          schemas: self2.schemas
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/eventTypeUpdate.js
var require_eventTypeUpdate = __commonJS({
  "../../node_modules/svix/dist/models/eventTypeUpdate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventTypeUpdateSerializer = void 0;
    exports.EventTypeUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          archived: object["archived"],
          deprecated: object["deprecated"],
          description: object["description"],
          featureFlag: object["featureFlag"],
          groupName: object["groupName"],
          schemas: object["schemas"]
        };
      },
      _toJsonObject(self2) {
        return {
          archived: self2.archived,
          deprecated: self2.deprecated,
          description: self2.description,
          featureFlag: self2.featureFlag,
          groupName: self2.groupName,
          schemas: self2.schemas
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseEventTypeOut.js
var require_listResponseEventTypeOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseEventTypeOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEventTypeOutSerializer = void 0;
    var eventTypeOut_1 = require_eventTypeOut();
    exports.ListResponseEventTypeOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => eventTypeOut_1.EventTypeOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => eventTypeOut_1.EventTypeOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/eventType.js
var require_eventType = __commonJS({
  "../../node_modules/svix/dist/api/eventType.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EventType = void 0;
    var eventTypeImportOpenApiIn_1 = require_eventTypeImportOpenApiIn();
    var eventTypeImportOpenApiOut_1 = require_eventTypeImportOpenApiOut();
    var eventTypeIn_1 = require_eventTypeIn();
    var eventTypeOut_1 = require_eventTypeOut();
    var eventTypePatch_1 = require_eventTypePatch();
    var eventTypeUpdate_1 = require_eventTypeUpdate();
    var listResponseEventTypeOut_1 = require_listResponseEventTypeOut();
    var request_1 = require_request();
    var EventType = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        request.setQueryParam("include_archived", options === null || options === void 0 ? void 0 : options.includeArchived);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        return request.send(this.requestCtx, listResponseEventTypeOut_1.ListResponseEventTypeOutSerializer._fromJsonObject);
      }
      create(eventTypeIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventTypeIn_1.EventTypeInSerializer._toJsonObject(eventTypeIn));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      importOpenapi(eventTypeImportOpenApiIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/event-type/import/openapi");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(eventTypeImportOpenApiIn_1.EventTypeImportOpenApiInSerializer._toJsonObject(eventTypeImportOpenApiIn));
        return request.send(this.requestCtx, eventTypeImportOpenApiOut_1.EventTypeImportOpenApiOutSerializer._fromJsonObject);
      }
      get(eventTypeName) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      update(eventTypeName, eventTypeUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setBody(eventTypeUpdate_1.EventTypeUpdateSerializer._toJsonObject(eventTypeUpdate));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
      delete(eventTypeName, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setQueryParam("expunge", options === null || options === void 0 ? void 0 : options.expunge);
        return request.sendNoResponseBody(this.requestCtx);
      }
      patch(eventTypeName, eventTypePatch) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PATCH, "/api/v1/event-type/{event_type_name}");
        request.setPathParam("event_type_name", eventTypeName);
        request.setBody(eventTypePatch_1.EventTypePatchSerializer._toJsonObject(eventTypePatch));
        return request.send(this.requestCtx, eventTypeOut_1.EventTypeOutSerializer._fromJsonObject);
      }
    };
    __name(EventType, "EventType");
    exports.EventType = EventType;
  }
});

// ../../node_modules/svix/dist/models/ingestSourceConsumerPortalAccessIn.js
var require_ingestSourceConsumerPortalAccessIn = __commonJS({
  "../../node_modules/svix/dist/models/ingestSourceConsumerPortalAccessIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceConsumerPortalAccessInSerializer = void 0;
    exports.IngestSourceConsumerPortalAccessInSerializer = {
      _fromJsonObject(object) {
        return {
          expiry: object["expiry"],
          readOnly: object["readOnly"]
        };
      },
      _toJsonObject(self2) {
        return {
          expiry: self2.expiry,
          readOnly: self2.readOnly
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointHeadersIn.js
var require_ingestEndpointHeadersIn = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointHeadersIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointHeadersInSerializer = void 0;
    exports.IngestEndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointHeadersOut.js
var require_ingestEndpointHeadersOut = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointHeadersOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointHeadersOutSerializer = void 0;
    exports.IngestEndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers,
          sensitive: self2.sensitive
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointIn.js
var require_ingestEndpointIn = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointInSerializer = void 0;
    exports.IngestEndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          description: self2.description,
          disabled: self2.disabled,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          secret: self2.secret,
          uid: self2.uid,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointOut.js
var require_ingestEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointOutSerializer = void 0;
    exports.IngestEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          createdAt: self2.createdAt,
          description: self2.description,
          disabled: self2.disabled,
          id: self2.id,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          updatedAt: self2.updatedAt,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointSecretIn.js
var require_ingestEndpointSecretIn = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointSecretIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointSecretInSerializer = void 0;
    exports.IngestEndpointSecretInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointSecretOut.js
var require_ingestEndpointSecretOut = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointSecretOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointSecretOutSerializer = void 0;
    exports.IngestEndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestEndpointUpdate.js
var require_ingestEndpointUpdate = __commonJS({
  "../../node_modules/svix/dist/models/ingestEndpointUpdate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpointUpdateSerializer = void 0;
    exports.IngestEndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          description: self2.description,
          disabled: self2.disabled,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseIngestEndpointOut.js
var require_listResponseIngestEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseIngestEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIngestEndpointOutSerializer = void 0;
    var ingestEndpointOut_1 = require_ingestEndpointOut();
    exports.ListResponseIngestEndpointOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => ingestEndpointOut_1.IngestEndpointOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/ingestEndpoint.js
var require_ingestEndpoint = __commonJS({
  "../../node_modules/svix/dist/api/ingestEndpoint.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestEndpoint = void 0;
    var ingestEndpointHeadersIn_1 = require_ingestEndpointHeadersIn();
    var ingestEndpointHeadersOut_1 = require_ingestEndpointHeadersOut();
    var ingestEndpointIn_1 = require_ingestEndpointIn();
    var ingestEndpointOut_1 = require_ingestEndpointOut();
    var ingestEndpointSecretIn_1 = require_ingestEndpointSecretIn();
    var ingestEndpointSecretOut_1 = require_ingestEndpointSecretOut();
    var ingestEndpointUpdate_1 = require_ingestEndpointUpdate();
    var listResponseIngestEndpointOut_1 = require_listResponseIngestEndpointOut();
    var request_1 = require_request();
    var IngestEndpoint = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(sourceId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint");
        request.setPathParam("source_id", sourceId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIngestEndpointOut_1.ListResponseIngestEndpointOutSerializer._fromJsonObject);
      }
      create(sourceId, ingestEndpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestEndpointIn_1.IngestEndpointInSerializer._toJsonObject(ingestEndpointIn));
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      get(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      update(sourceId, endpointId, ingestEndpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(ingestEndpointUpdate_1.IngestEndpointUpdateSerializer._toJsonObject(ingestEndpointUpdate));
        return request.send(this.requestCtx, ingestEndpointOut_1.IngestEndpointOutSerializer._fromJsonObject);
      }
      delete(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getHeaders(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointHeadersOut_1.IngestEndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(sourceId, endpointId, ingestEndpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/headers");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(ingestEndpointHeadersIn_1.IngestEndpointHeadersInSerializer._toJsonObject(ingestEndpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      getSecret(sourceId, endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, ingestEndpointSecretOut_1.IngestEndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(sourceId, endpointId, ingestEndpointSecretIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("source_id", sourceId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestEndpointSecretIn_1.IngestEndpointSecretInSerializer._toJsonObject(ingestEndpointSecretIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(IngestEndpoint, "IngestEndpoint");
    exports.IngestEndpoint = IngestEndpoint;
  }
});

// ../../node_modules/svix/dist/models/adobeSignConfig.js
var require_adobeSignConfig = __commonJS({
  "../../node_modules/svix/dist/models/adobeSignConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdobeSignConfigSerializer = void 0;
    exports.AdobeSignConfigSerializer = {
      _fromJsonObject(object) {
        return {
          clientId: object["clientId"]
        };
      },
      _toJsonObject(self2) {
        return {
          clientId: self2.clientId
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/cronConfig.js
var require_cronConfig = __commonJS({
  "../../node_modules/svix/dist/models/cronConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CronConfigSerializer = void 0;
    exports.CronConfigSerializer = {
      _fromJsonObject(object) {
        return {
          contentType: object["contentType"],
          payload: object["payload"],
          schedule: object["schedule"]
        };
      },
      _toJsonObject(self2) {
        return {
          contentType: self2.contentType,
          payload: self2.payload,
          schedule: self2.schedule
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/docusignConfig.js
var require_docusignConfig = __commonJS({
  "../../node_modules/svix/dist/models/docusignConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocusignConfigSerializer = void 0;
    exports.DocusignConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/githubConfig.js
var require_githubConfig = __commonJS({
  "../../node_modules/svix/dist/models/githubConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GithubConfigSerializer = void 0;
    exports.GithubConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/hubspotConfig.js
var require_hubspotConfig = __commonJS({
  "../../node_modules/svix/dist/models/hubspotConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HubspotConfigSerializer = void 0;
    exports.HubspotConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/segmentConfig.js
var require_segmentConfig = __commonJS({
  "../../node_modules/svix/dist/models/segmentConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SegmentConfigSerializer = void 0;
    exports.SegmentConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/shopifyConfig.js
var require_shopifyConfig = __commonJS({
  "../../node_modules/svix/dist/models/shopifyConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShopifyConfigSerializer = void 0;
    exports.ShopifyConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/slackConfig.js
var require_slackConfig = __commonJS({
  "../../node_modules/svix/dist/models/slackConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SlackConfigSerializer = void 0;
    exports.SlackConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/stripeConfig.js
var require_stripeConfig = __commonJS({
  "../../node_modules/svix/dist/models/stripeConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeConfigSerializer = void 0;
    exports.StripeConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/svixConfig.js
var require_svixConfig = __commonJS({
  "../../node_modules/svix/dist/models/svixConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixConfigSerializer = void 0;
    exports.SvixConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/zoomConfig.js
var require_zoomConfig = __commonJS({
  "../../node_modules/svix/dist/models/zoomConfig.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoomConfigSerializer = void 0;
    exports.ZoomConfigSerializer = {
      _fromJsonObject(object) {
        return {
          secret: object["secret"]
        };
      },
      _toJsonObject(self2) {
        return {
          secret: self2.secret
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestSourceIn.js
var require_ingestSourceIn = __commonJS({
  "../../node_modules/svix/dist/models/ingestSourceIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceInSerializer = void 0;
    var adobeSignConfig_1 = require_adobeSignConfig();
    var cronConfig_1 = require_cronConfig();
    var docusignConfig_1 = require_docusignConfig();
    var githubConfig_1 = require_githubConfig();
    var hubspotConfig_1 = require_hubspotConfig();
    var segmentConfig_1 = require_segmentConfig();
    var shopifyConfig_1 = require_shopifyConfig();
    var slackConfig_1 = require_slackConfig();
    var stripeConfig_1 = require_stripeConfig();
    var svixConfig_1 = require_svixConfig();
    var zoomConfig_1 = require_zoomConfig();
    exports.IngestSourceInSerializer = {
      _fromJsonObject(object) {
        const type = object["type"];
        let config2;
        switch (type) {
          case "generic-webhook":
            config2 = {};
            break;
          case "cron":
            config2 = cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "adobe-sign":
            config2 = adobeSignConfig_1.AdobeSignConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "beehiiv":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "brex":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "clerk":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "docusign":
            config2 = docusignConfig_1.DocusignConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "github":
            config2 = githubConfig_1.GithubConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "guesty":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "hubspot":
            config2 = hubspotConfig_1.HubspotConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "incident-io":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "lithic":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "nash":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "pleo":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "replicate":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "resend":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "safebase":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "sardine":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "segment":
            config2 = segmentConfig_1.SegmentConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "shopify":
            config2 = shopifyConfig_1.ShopifyConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "slack":
            config2 = slackConfig_1.SlackConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "stripe":
            config2 = stripeConfig_1.StripeConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "stych":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "svix":
            config2 = svixConfig_1.SvixConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "zoom":
            config2 = zoomConfig_1.ZoomConfigSerializer._fromJsonObject(object["config"]);
            break;
        }
        return {
          type,
          config: config2,
          name: object["name"],
          uid: object["uid"]
        };
      },
      _toJsonObject(self2) {
        let config2;
        switch (self2.type) {
          case "generic-webhook":
            config2 = {};
            break;
          case "cron":
            config2 = cronConfig_1.CronConfigSerializer._toJsonObject(self2.config);
            break;
          case "adobe-sign":
            config2 = adobeSignConfig_1.AdobeSignConfigSerializer._toJsonObject(self2.config);
            break;
          case "beehiiv":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "brex":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "clerk":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "docusign":
            config2 = docusignConfig_1.DocusignConfigSerializer._toJsonObject(self2.config);
            break;
          case "github":
            config2 = githubConfig_1.GithubConfigSerializer._toJsonObject(self2.config);
            break;
          case "guesty":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "hubspot":
            config2 = hubspotConfig_1.HubspotConfigSerializer._toJsonObject(self2.config);
            break;
          case "incident-io":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "lithic":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "nash":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "pleo":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "replicate":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "resend":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "safebase":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "sardine":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "segment":
            config2 = segmentConfig_1.SegmentConfigSerializer._toJsonObject(self2.config);
            break;
          case "shopify":
            config2 = shopifyConfig_1.ShopifyConfigSerializer._toJsonObject(self2.config);
            break;
          case "slack":
            config2 = slackConfig_1.SlackConfigSerializer._toJsonObject(self2.config);
            break;
          case "stripe":
            config2 = stripeConfig_1.StripeConfigSerializer._toJsonObject(self2.config);
            break;
          case "stych":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "svix":
            config2 = svixConfig_1.SvixConfigSerializer._toJsonObject(self2.config);
            break;
          case "zoom":
            config2 = zoomConfig_1.ZoomConfigSerializer._toJsonObject(self2.config);
            break;
        }
        return {
          type: self2.type,
          config: config2,
          name: self2.name,
          uid: self2.uid
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/adobeSignConfigOut.js
var require_adobeSignConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/adobeSignConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AdobeSignConfigOutSerializer = void 0;
    exports.AdobeSignConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/docusignConfigOut.js
var require_docusignConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/docusignConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DocusignConfigOutSerializer = void 0;
    exports.DocusignConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/githubConfigOut.js
var require_githubConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/githubConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GithubConfigOutSerializer = void 0;
    exports.GithubConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/hubspotConfigOut.js
var require_hubspotConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/hubspotConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HubspotConfigOutSerializer = void 0;
    exports.HubspotConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/segmentConfigOut.js
var require_segmentConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/segmentConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SegmentConfigOutSerializer = void 0;
    exports.SegmentConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/shopifyConfigOut.js
var require_shopifyConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/shopifyConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ShopifyConfigOutSerializer = void 0;
    exports.ShopifyConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/slackConfigOut.js
var require_slackConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/slackConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SlackConfigOutSerializer = void 0;
    exports.SlackConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/stripeConfigOut.js
var require_stripeConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/stripeConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StripeConfigOutSerializer = void 0;
    exports.StripeConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/svixConfigOut.js
var require_svixConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/svixConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SvixConfigOutSerializer = void 0;
    exports.SvixConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/zoomConfigOut.js
var require_zoomConfigOut = __commonJS({
  "../../node_modules/svix/dist/models/zoomConfigOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZoomConfigOutSerializer = void 0;
    exports.ZoomConfigOutSerializer = {
      _fromJsonObject(object) {
        return {};
      },
      _toJsonObject(self2) {
        return {};
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ingestSourceOut.js
var require_ingestSourceOut = __commonJS({
  "../../node_modules/svix/dist/models/ingestSourceOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSourceOutSerializer = void 0;
    var adobeSignConfigOut_1 = require_adobeSignConfigOut();
    var cronConfig_1 = require_cronConfig();
    var docusignConfigOut_1 = require_docusignConfigOut();
    var githubConfigOut_1 = require_githubConfigOut();
    var hubspotConfigOut_1 = require_hubspotConfigOut();
    var segmentConfigOut_1 = require_segmentConfigOut();
    var shopifyConfigOut_1 = require_shopifyConfigOut();
    var slackConfigOut_1 = require_slackConfigOut();
    var stripeConfigOut_1 = require_stripeConfigOut();
    var svixConfigOut_1 = require_svixConfigOut();
    var zoomConfigOut_1 = require_zoomConfigOut();
    exports.IngestSourceOutSerializer = {
      _fromJsonObject(object) {
        const type = object["type"];
        let config2;
        switch (type) {
          case "generic-webhook":
            config2 = {};
            break;
          case "cron":
            config2 = cronConfig_1.CronConfigSerializer._fromJsonObject(object["config"]);
            break;
          case "adobe-sign":
            config2 = adobeSignConfigOut_1.AdobeSignConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "beehiiv":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "brex":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "clerk":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "docusign":
            config2 = docusignConfigOut_1.DocusignConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "github":
            config2 = githubConfigOut_1.GithubConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "guesty":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "hubspot":
            config2 = hubspotConfigOut_1.HubspotConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "incident-io":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "lithic":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "nash":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "pleo":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "replicate":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "resend":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "safebase":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "sardine":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "segment":
            config2 = segmentConfigOut_1.SegmentConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "shopify":
            config2 = shopifyConfigOut_1.ShopifyConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "slack":
            config2 = slackConfigOut_1.SlackConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "stripe":
            config2 = stripeConfigOut_1.StripeConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "stych":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "svix":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._fromJsonObject(object["config"]);
            break;
          case "zoom":
            config2 = zoomConfigOut_1.ZoomConfigOutSerializer._fromJsonObject(object["config"]);
            break;
        }
        return {
          type,
          config: config2,
          createdAt: new Date(object["createdAt"]),
          id: object["id"],
          ingestUrl: object["ingestUrl"],
          name: object["name"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self2) {
        let config2;
        switch (self2.type) {
          case "generic-webhook":
            config2 = {};
            break;
          case "cron":
            config2 = cronConfig_1.CronConfigSerializer._toJsonObject(self2.config);
            break;
          case "adobe-sign":
            config2 = adobeSignConfigOut_1.AdobeSignConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "beehiiv":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "brex":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "clerk":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "docusign":
            config2 = docusignConfigOut_1.DocusignConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "github":
            config2 = githubConfigOut_1.GithubConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "guesty":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "hubspot":
            config2 = hubspotConfigOut_1.HubspotConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "incident-io":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "lithic":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "nash":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "pleo":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "replicate":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "resend":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "safebase":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "sardine":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "segment":
            config2 = segmentConfigOut_1.SegmentConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "shopify":
            config2 = shopifyConfigOut_1.ShopifyConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "slack":
            config2 = slackConfigOut_1.SlackConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "stripe":
            config2 = stripeConfigOut_1.StripeConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "stych":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "svix":
            config2 = svixConfigOut_1.SvixConfigOutSerializer._toJsonObject(self2.config);
            break;
          case "zoom":
            config2 = zoomConfigOut_1.ZoomConfigOutSerializer._toJsonObject(self2.config);
            break;
        }
        return {
          type: self2.type,
          config: config2,
          createdAt: self2.createdAt,
          id: self2.id,
          ingestUrl: self2.ingestUrl,
          name: self2.name,
          uid: self2.uid,
          updatedAt: self2.updatedAt
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseIngestSourceOut.js
var require_listResponseIngestSourceOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseIngestSourceOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIngestSourceOutSerializer = void 0;
    var ingestSourceOut_1 = require_ingestSourceOut();
    exports.ListResponseIngestSourceOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => ingestSourceOut_1.IngestSourceOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/rotateTokenOut.js
var require_rotateTokenOut = __commonJS({
  "../../node_modules/svix/dist/models/rotateTokenOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateTokenOutSerializer = void 0;
    exports.RotateTokenOutSerializer = {
      _fromJsonObject(object) {
        return {
          ingestUrl: object["ingestUrl"]
        };
      },
      _toJsonObject(self2) {
        return {
          ingestUrl: self2.ingestUrl
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/ingestSource.js
var require_ingestSource = __commonJS({
  "../../node_modules/svix/dist/api/ingestSource.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IngestSource = void 0;
    var ingestSourceIn_1 = require_ingestSourceIn();
    var ingestSourceOut_1 = require_ingestSourceOut();
    var listResponseIngestSourceOut_1 = require_listResponseIngestSourceOut();
    var rotateTokenOut_1 = require_rotateTokenOut();
    var request_1 = require_request();
    var IngestSource = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIngestSourceOut_1.ListResponseIngestSourceOutSerializer._fromJsonObject);
      }
      create(ingestSourceIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      get(sourceId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      update(sourceId, ingestSourceIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        request.setBody(ingestSourceIn_1.IngestSourceInSerializer._toJsonObject(ingestSourceIn));
        return request.send(this.requestCtx, ingestSourceOut_1.IngestSourceOutSerializer._fromJsonObject);
      }
      delete(sourceId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/ingest/api/v1/source/{source_id}");
        request.setPathParam("source_id", sourceId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      rotateToken(sourceId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/token/rotate");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, rotateTokenOut_1.RotateTokenOutSerializer._fromJsonObject);
      }
    };
    __name(IngestSource, "IngestSource");
    exports.IngestSource = IngestSource;
  }
});

// ../../node_modules/svix/dist/api/ingest.js
var require_ingest = __commonJS({
  "../../node_modules/svix/dist/api/ingest.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Ingest = void 0;
    var dashboardAccessOut_1 = require_dashboardAccessOut();
    var ingestSourceConsumerPortalAccessIn_1 = require_ingestSourceConsumerPortalAccessIn();
    var request_1 = require_request();
    var ingestEndpoint_1 = require_ingestEndpoint();
    var ingestSource_1 = require_ingestSource();
    var Ingest = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get endpoint() {
        return new ingestEndpoint_1.IngestEndpoint(this.requestCtx);
      }
      get source() {
        return new ingestSource_1.IngestSource(this.requestCtx);
      }
      dashboard(sourceId, ingestSourceConsumerPortalAccessIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/ingest/api/v1/source/{source_id}/dashboard");
        request.setPathParam("source_id", sourceId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(ingestSourceConsumerPortalAccessIn_1.IngestSourceConsumerPortalAccessInSerializer._toJsonObject(ingestSourceConsumerPortalAccessIn));
        return request.send(this.requestCtx, dashboardAccessOut_1.DashboardAccessOutSerializer._fromJsonObject);
      }
    };
    __name(Ingest, "Ingest");
    exports.Ingest = Ingest;
  }
});

// ../../node_modules/svix/dist/models/integrationIn.js
var require_integrationIn = __commonJS({
  "../../node_modules/svix/dist/models/integrationIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationInSerializer = void 0;
    exports.IntegrationInSerializer = {
      _fromJsonObject(object) {
        return {
          featureFlags: object["featureFlags"],
          name: object["name"]
        };
      },
      _toJsonObject(self2) {
        return {
          featureFlags: self2.featureFlags,
          name: self2.name
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/integrationKeyOut.js
var require_integrationKeyOut = __commonJS({
  "../../node_modules/svix/dist/models/integrationKeyOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationKeyOutSerializer = void 0;
    exports.IntegrationKeyOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/integrationOut.js
var require_integrationOut = __commonJS({
  "../../node_modules/svix/dist/models/integrationOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationOutSerializer = void 0;
    exports.IntegrationOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          featureFlags: object["featureFlags"],
          id: object["id"],
          name: object["name"],
          updatedAt: new Date(object["updatedAt"])
        };
      },
      _toJsonObject(self2) {
        return {
          createdAt: self2.createdAt,
          featureFlags: self2.featureFlags,
          id: self2.id,
          name: self2.name,
          updatedAt: self2.updatedAt
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/integrationUpdate.js
var require_integrationUpdate = __commonJS({
  "../../node_modules/svix/dist/models/integrationUpdate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IntegrationUpdateSerializer = void 0;
    exports.IntegrationUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          featureFlags: object["featureFlags"],
          name: object["name"]
        };
      },
      _toJsonObject(self2) {
        return {
          featureFlags: self2.featureFlags,
          name: self2.name
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseIntegrationOut.js
var require_listResponseIntegrationOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseIntegrationOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseIntegrationOutSerializer = void 0;
    var integrationOut_1 = require_integrationOut();
    exports.ListResponseIntegrationOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => integrationOut_1.IntegrationOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => integrationOut_1.IntegrationOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/integration.js
var require_integration = __commonJS({
  "../../node_modules/svix/dist/api/integration.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Integration = void 0;
    var integrationIn_1 = require_integrationIn();
    var integrationKeyOut_1 = require_integrationKeyOut();
    var integrationOut_1 = require_integrationOut();
    var integrationUpdate_1 = require_integrationUpdate();
    var listResponseIntegrationOut_1 = require_listResponseIntegrationOut();
    var request_1 = require_request();
    var Integration = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseIntegrationOut_1.ListResponseIntegrationOutSerializer._fromJsonObject);
      }
      create(appId, integrationIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(integrationIn_1.IntegrationInSerializer._toJsonObject(integrationIn));
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      get(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      update(appId, integId, integrationUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        request.setBody(integrationUpdate_1.IntegrationUpdateSerializer._toJsonObject(integrationUpdate));
        return request.send(this.requestCtx, integrationOut_1.IntegrationOutSerializer._fromJsonObject);
      }
      delete(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/integration/{integ_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getKey(appId, integId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/integration/{integ_id}/key");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
      }
      rotateKey(appId, integId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/integration/{integ_id}/key/rotate");
        request.setPathParam("app_id", appId);
        request.setPathParam("integ_id", integId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, integrationKeyOut_1.IntegrationKeyOutSerializer._fromJsonObject);
      }
    };
    __name(Integration, "Integration");
    exports.Integration = Integration;
  }
});

// ../../node_modules/svix/dist/models/apiTokenExpireIn.js
var require_apiTokenExpireIn = __commonJS({
  "../../node_modules/svix/dist/models/apiTokenExpireIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiTokenExpireInSerializer = void 0;
    exports.ApiTokenExpireInSerializer = {
      _fromJsonObject(object) {
        return {
          expiry: object["expiry"]
        };
      },
      _toJsonObject(self2) {
        return {
          expiry: self2.expiry
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/apiTokenIn.js
var require_apiTokenIn = __commonJS({
  "../../node_modules/svix/dist/models/apiTokenIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiTokenInSerializer = void 0;
    exports.ApiTokenInSerializer = {
      _fromJsonObject(object) {
        return {
          name: object["name"],
          scopes: object["scopes"]
        };
      },
      _toJsonObject(self2) {
        return {
          name: self2.name,
          scopes: self2.scopes
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/apiTokenOut.js
var require_apiTokenOut = __commonJS({
  "../../node_modules/svix/dist/models/apiTokenOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiTokenOutSerializer = void 0;
    exports.ApiTokenOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          expiresAt: new Date(object["expiresAt"]),
          id: object["id"],
          name: object["name"],
          scopes: object["scopes"],
          token: object["token"]
        };
      },
      _toJsonObject(self2) {
        return {
          createdAt: self2.createdAt,
          expiresAt: self2.expiresAt,
          id: self2.id,
          name: self2.name,
          scopes: self2.scopes,
          token: self2.token
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/apiTokenCensoredOut.js
var require_apiTokenCensoredOut = __commonJS({
  "../../node_modules/svix/dist/models/apiTokenCensoredOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ApiTokenCensoredOutSerializer = void 0;
    exports.ApiTokenCensoredOutSerializer = {
      _fromJsonObject(object) {
        return {
          censoredToken: object["censoredToken"],
          createdAt: new Date(object["createdAt"]),
          expiresAt: new Date(object["expiresAt"]),
          id: object["id"],
          name: object["name"],
          scopes: object["scopes"]
        };
      },
      _toJsonObject(self2) {
        return {
          censoredToken: self2.censoredToken,
          createdAt: self2.createdAt,
          expiresAt: self2.expiresAt,
          id: self2.id,
          name: self2.name,
          scopes: self2.scopes
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseApiTokenCensoredOut.js
var require_listResponseApiTokenCensoredOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseApiTokenCensoredOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseApiTokenCensoredOutSerializer = void 0;
    var apiTokenCensoredOut_1 = require_apiTokenCensoredOut();
    exports.ListResponseApiTokenCensoredOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => apiTokenCensoredOut_1.ApiTokenCensoredOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => apiTokenCensoredOut_1.ApiTokenCensoredOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/managementAuthentication.js
var require_managementAuthentication = __commonJS({
  "../../node_modules/svix/dist/api/managementAuthentication.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ManagementAuthentication = void 0;
    var apiTokenExpireIn_1 = require_apiTokenExpireIn();
    var apiTokenIn_1 = require_apiTokenIn();
    var apiTokenOut_1 = require_apiTokenOut();
    var listResponseApiTokenCensoredOut_1 = require_listResponseApiTokenCensoredOut();
    var request_1 = require_request();
    var ManagementAuthentication = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      listApiTokens(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/management/authentication/api-token");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseApiTokenCensoredOut_1.ListResponseApiTokenCensoredOutSerializer._fromJsonObject);
      }
      createApiToken(apiTokenIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/management/authentication/api-token");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(apiTokenIn_1.ApiTokenInSerializer._toJsonObject(apiTokenIn));
        return request.send(this.requestCtx, apiTokenOut_1.ApiTokenOutSerializer._fromJsonObject);
      }
      expireApiToken(keyId, apiTokenExpireIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/management/authentication/api-token/{key_id}/expire");
        request.setPathParam("key_id", keyId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(apiTokenExpireIn_1.ApiTokenExpireInSerializer._toJsonObject(apiTokenExpireIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(ManagementAuthentication, "ManagementAuthentication");
    exports.ManagementAuthentication = ManagementAuthentication;
  }
});

// ../../node_modules/svix/dist/api/management.js
var require_management = __commonJS({
  "../../node_modules/svix/dist/api/management.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Management = void 0;
    var managementAuthentication_1 = require_managementAuthentication();
    var Management = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get authentication() {
        return new managementAuthentication_1.ManagementAuthentication(this.requestCtx);
      }
    };
    __name(Management, "Management");
    exports.Management = Management;
  }
});

// ../../node_modules/svix/dist/models/expungeAllContentsOut.js
var require_expungeAllContentsOut = __commonJS({
  "../../node_modules/svix/dist/models/expungeAllContentsOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpungeAllContentsOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.ExpungeAllContentsOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self2) {
        return {
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseMessageOut.js
var require_listResponseMessageOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseMessageOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageOutSerializer = void 0;
    var messageOut_1 = require_messageOut();
    exports.ListResponseMessageOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => messageOut_1.MessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => messageOut_1.MessageOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/messageIn.js
var require_messageIn = __commonJS({
  "../../node_modules/svix/dist/models/messageIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageInSerializer = void 0;
    var applicationIn_1 = require_applicationIn();
    exports.MessageInSerializer = {
      _fromJsonObject(object) {
        return {
          application: object["application"] ? applicationIn_1.ApplicationInSerializer._fromJsonObject(object["application"]) : void 0,
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          payload: object["payload"],
          payloadRetentionHours: object["payloadRetentionHours"],
          payloadRetentionPeriod: object["payloadRetentionPeriod"],
          tags: object["tags"],
          transformationsParams: object["transformationsParams"]
        };
      },
      _toJsonObject(self2) {
        return {
          application: self2.application ? applicationIn_1.ApplicationInSerializer._toJsonObject(self2.application) : void 0,
          channels: self2.channels,
          eventId: self2.eventId,
          eventType: self2.eventType,
          payload: self2.payload,
          payloadRetentionHours: self2.payloadRetentionHours,
          payloadRetentionPeriod: self2.payloadRetentionPeriod,
          tags: self2.tags,
          transformationsParams: self2.transformationsParams
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/pollingEndpointConsumerSeekIn.js
var require_pollingEndpointConsumerSeekIn = __commonJS({
  "../../node_modules/svix/dist/models/pollingEndpointConsumerSeekIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointConsumerSeekInSerializer = void 0;
    exports.PollingEndpointConsumerSeekInSerializer = {
      _fromJsonObject(object) {
        return {
          after: new Date(object["after"])
        };
      },
      _toJsonObject(self2) {
        return {
          after: self2.after
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/pollingEndpointConsumerSeekOut.js
var require_pollingEndpointConsumerSeekOut = __commonJS({
  "../../node_modules/svix/dist/models/pollingEndpointConsumerSeekOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointConsumerSeekOutSerializer = void 0;
    exports.PollingEndpointConsumerSeekOutSerializer = {
      _fromJsonObject(object) {
        return {
          iterator: object["iterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          iterator: self2.iterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/pollingEndpointMessageOut.js
var require_pollingEndpointMessageOut = __commonJS({
  "../../node_modules/svix/dist/models/pollingEndpointMessageOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointMessageOutSerializer = void 0;
    exports.PollingEndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          headers: object["headers"],
          id: object["id"],
          payload: object["payload"],
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          eventId: self2.eventId,
          eventType: self2.eventType,
          headers: self2.headers,
          id: self2.id,
          payload: self2.payload,
          tags: self2.tags,
          timestamp: self2.timestamp
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/pollingEndpointOut.js
var require_pollingEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/pollingEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PollingEndpointOutSerializer = void 0;
    var pollingEndpointMessageOut_1 = require_pollingEndpointMessageOut();
    exports.PollingEndpointOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => pollingEndpointMessageOut_1.PollingEndpointMessageOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/messagePoller.js
var require_messagePoller = __commonJS({
  "../../node_modules/svix/dist/api/messagePoller.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessagePoller = void 0;
    var pollingEndpointConsumerSeekIn_1 = require_pollingEndpointConsumerSeekIn();
    var pollingEndpointConsumerSeekOut_1 = require_pollingEndpointConsumerSeekOut();
    var pollingEndpointOut_1 = require_pollingEndpointOut();
    var request_1 = require_request();
    var MessagePoller = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      poll(appId, sinkId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("event_type", options === null || options === void 0 ? void 0 : options.eventType);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
      }
      consumerPoll(appId, sinkId, consumerId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setPathParam("consumer_id", consumerId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        return request.send(this.requestCtx, pollingEndpointOut_1.PollingEndpointOutSerializer._fromJsonObject);
      }
      consumerSeek(appId, sinkId, consumerId, pollingEndpointConsumerSeekIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/poller/{sink_id}/consumer/{consumer_id}/seek");
        request.setPathParam("app_id", appId);
        request.setPathParam("sink_id", sinkId);
        request.setPathParam("consumer_id", consumerId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(pollingEndpointConsumerSeekIn_1.PollingEndpointConsumerSeekInSerializer._toJsonObject(pollingEndpointConsumerSeekIn));
        return request.send(this.requestCtx, pollingEndpointConsumerSeekOut_1.PollingEndpointConsumerSeekOutSerializer._fromJsonObject);
      }
    };
    __name(MessagePoller, "MessagePoller");
    exports.MessagePoller = MessagePoller;
  }
});

// ../../node_modules/svix/dist/api/message.js
var require_message = __commonJS({
  "../../node_modules/svix/dist/api/message.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.messageInRaw = exports.Message = void 0;
    var expungeAllContentsOut_1 = require_expungeAllContentsOut();
    var listResponseMessageOut_1 = require_listResponseMessageOut();
    var messageIn_1 = require_messageIn();
    var messageOut_1 = require_messageOut();
    var request_1 = require_request();
    var messagePoller_1 = require_messagePoller();
    var Message = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get poller() {
        return new messagePoller_1.MessagePoller(this.requestCtx);
      }
      list(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg");
        request.setPathParam("app_id", appId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageOut_1.ListResponseMessageOutSerializer._fromJsonObject);
      }
      create(appId, messageIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg");
        request.setPathParam("app_id", appId);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(messageIn_1.MessageInSerializer._toJsonObject(messageIn));
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      expungeAllContents(appId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/expunge-all-contents");
        request.setPathParam("app_id", appId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.send(this.requestCtx, expungeAllContentsOut_1.ExpungeAllContentsOutSerializer._fromJsonObject);
      }
      get(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        return request.send(this.requestCtx, messageOut_1.MessageOutSerializer._fromJsonObject);
      }
      expungeContent(appId, msgId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/content");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(Message, "Message");
    exports.Message = Message;
    function messageInRaw(eventType, payload, contentType) {
      const headers = contentType ? { "content-type": contentType } : void 0;
      return {
        eventType,
        payload: {},
        transformationsParams: {
          rawPayload: payload,
          headers
        }
      };
    }
    __name(messageInRaw, "messageInRaw");
    exports.messageInRaw = messageInRaw;
  }
});

// ../../node_modules/svix/dist/models/messageStatus.js
var require_messageStatus = __commonJS({
  "../../node_modules/svix/dist/models/messageStatus.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageStatusSerializer = exports.MessageStatus = void 0;
    var MessageStatus;
    (function(MessageStatus2) {
      MessageStatus2[MessageStatus2["Success"] = 0] = "Success";
      MessageStatus2[MessageStatus2["Pending"] = 1] = "Pending";
      MessageStatus2[MessageStatus2["Fail"] = 2] = "Fail";
      MessageStatus2[MessageStatus2["Sending"] = 3] = "Sending";
    })(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
    exports.MessageStatusSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointMessageOut.js
var require_endpointMessageOut = __commonJS({
  "../../node_modules/svix/dist/models/endpointMessageOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointMessageOutSerializer = void 0;
    var messageStatus_1 = require_messageStatus();
    exports.EndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          eventId: object["eventId"],
          eventType: object["eventType"],
          id: object["id"],
          nextAttempt: new Date(object["nextAttempt"]),
          payload: object["payload"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          tags: object["tags"],
          timestamp: new Date(object["timestamp"])
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          eventId: self2.eventId,
          eventType: self2.eventType,
          id: self2.id,
          nextAttempt: self2.nextAttempt,
          payload: self2.payload,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self2.status),
          tags: self2.tags,
          timestamp: self2.timestamp
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseEndpointMessageOut.js
var require_listResponseEndpointMessageOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseEndpointMessageOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseEndpointMessageOutSerializer = void 0;
    var endpointMessageOut_1 = require_endpointMessageOut();
    exports.ListResponseEndpointMessageOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => endpointMessageOut_1.EndpointMessageOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/messageAttemptTriggerType.js
var require_messageAttemptTriggerType = __commonJS({
  "../../node_modules/svix/dist/models/messageAttemptTriggerType.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttemptTriggerTypeSerializer = exports.MessageAttemptTriggerType = void 0;
    var MessageAttemptTriggerType;
    (function(MessageAttemptTriggerType2) {
      MessageAttemptTriggerType2[MessageAttemptTriggerType2["Scheduled"] = 0] = "Scheduled";
      MessageAttemptTriggerType2[MessageAttemptTriggerType2["Manual"] = 1] = "Manual";
    })(MessageAttemptTriggerType = exports.MessageAttemptTriggerType || (exports.MessageAttemptTriggerType = {}));
    exports.MessageAttemptTriggerTypeSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/messageAttemptOut.js
var require_messageAttemptOut = __commonJS({
  "../../node_modules/svix/dist/models/messageAttemptOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttemptOutSerializer = void 0;
    var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
    var messageOut_1 = require_messageOut();
    var messageStatus_1 = require_messageStatus();
    exports.MessageAttemptOutSerializer = {
      _fromJsonObject(object) {
        return {
          endpointId: object["endpointId"],
          id: object["id"],
          msg: object["msg"] ? messageOut_1.MessageOutSerializer._fromJsonObject(object["msg"]) : void 0,
          msgId: object["msgId"],
          response: object["response"],
          responseDurationMs: object["responseDurationMs"],
          responseStatusCode: object["responseStatusCode"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          timestamp: new Date(object["timestamp"]),
          triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._fromJsonObject(object["triggerType"]),
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          endpointId: self2.endpointId,
          id: self2.id,
          msg: self2.msg ? messageOut_1.MessageOutSerializer._toJsonObject(self2.msg) : void 0,
          msgId: self2.msgId,
          response: self2.response,
          responseDurationMs: self2.responseDurationMs,
          responseStatusCode: self2.responseStatusCode,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self2.status),
          timestamp: self2.timestamp,
          triggerType: messageAttemptTriggerType_1.MessageAttemptTriggerTypeSerializer._toJsonObject(self2.triggerType),
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseMessageAttemptOut.js
var require_listResponseMessageAttemptOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseMessageAttemptOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageAttemptOutSerializer = void 0;
    var messageAttemptOut_1 = require_messageAttemptOut();
    exports.ListResponseMessageAttemptOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => messageAttemptOut_1.MessageAttemptOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/messageEndpointOut.js
var require_messageEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/messageEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageEndpointOutSerializer = void 0;
    var messageStatus_1 = require_messageStatus();
    exports.MessageEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          channels: object["channels"],
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          nextAttempt: new Date(object["nextAttempt"]),
          rateLimit: object["rateLimit"],
          status: messageStatus_1.MessageStatusSerializer._fromJsonObject(object["status"]),
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"],
          version: object["version"]
        };
      },
      _toJsonObject(self2) {
        return {
          channels: self2.channels,
          createdAt: self2.createdAt,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          id: self2.id,
          nextAttempt: self2.nextAttempt,
          rateLimit: self2.rateLimit,
          status: messageStatus_1.MessageStatusSerializer._toJsonObject(self2.status),
          uid: self2.uid,
          updatedAt: self2.updatedAt,
          url: self2.url,
          version: self2.version
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseMessageEndpointOut.js
var require_listResponseMessageEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseMessageEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseMessageEndpointOutSerializer = void 0;
    var messageEndpointOut_1 = require_messageEndpointOut();
    exports.ListResponseMessageEndpointOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => messageEndpointOut_1.MessageEndpointOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/messageAttempt.js
var require_messageAttempt = __commonJS({
  "../../node_modules/svix/dist/api/messageAttempt.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MessageAttempt = void 0;
    var listResponseEndpointMessageOut_1 = require_listResponseEndpointMessageOut();
    var listResponseMessageAttemptOut_1 = require_listResponseMessageAttemptOut();
    var listResponseMessageEndpointOut_1 = require_listResponseMessageEndpointOut();
    var messageAttemptOut_1 = require_messageAttemptOut();
    var request_1 = require_request();
    var MessageAttempt = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      listByEndpoint(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/endpoint/{endpoint_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("with_msg", options === null || options === void 0 ? void 0 : options.withMsg);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
      }
      listByMsg(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/attempt/msg/{msg_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("status_code_class", options === null || options === void 0 ? void 0 : options.statusCodeClass);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("endpoint_id", options === null || options === void 0 ? void 0 : options.endpointId);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseMessageAttemptOut_1.ListResponseMessageAttemptOutSerializer._fromJsonObject);
      }
      listAttemptedMessages(appId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/endpoint/{endpoint_id}/msg");
        request.setPathParam("app_id", appId);
        request.setPathParam("endpoint_id", endpointId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("channel", options === null || options === void 0 ? void 0 : options.channel);
        request.setQueryParam("tag", options === null || options === void 0 ? void 0 : options.tag);
        request.setQueryParam("status", options === null || options === void 0 ? void 0 : options.status);
        request.setQueryParam("before", options === null || options === void 0 ? void 0 : options.before);
        request.setQueryParam("after", options === null || options === void 0 ? void 0 : options.after);
        request.setQueryParam("with_content", options === null || options === void 0 ? void 0 : options.withContent);
        request.setQueryParam("event_types", options === null || options === void 0 ? void 0 : options.eventTypes);
        return request.send(this.requestCtx, listResponseEndpointMessageOut_1.ListResponseEndpointMessageOutSerializer._fromJsonObject);
      }
      get(appId, msgId, attemptId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("attempt_id", attemptId);
        return request.send(this.requestCtx, messageAttemptOut_1.MessageAttemptOutSerializer._fromJsonObject);
      }
      expungeContent(appId, msgId, attemptId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/app/{app_id}/msg/{msg_id}/attempt/{attempt_id}/content");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("attempt_id", attemptId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      listAttemptedDestinations(appId, msgId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        return request.send(this.requestCtx, listResponseMessageEndpointOut_1.ListResponseMessageEndpointOutSerializer._fromJsonObject);
      }
      resend(appId, msgId, endpointId, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/app/{app_id}/msg/{msg_id}/endpoint/{endpoint_id}/resend");
        request.setPathParam("app_id", appId);
        request.setPathParam("msg_id", msgId);
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(MessageAttempt, "MessageAttempt");
    exports.MessageAttempt = MessageAttempt;
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointOut.js
var require_operationalWebhookEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointOutSerializer = void 0;
    exports.OperationalWebhookEndpointOutSerializer = {
      _fromJsonObject(object) {
        return {
          createdAt: new Date(object["createdAt"]),
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          id: object["id"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          updatedAt: new Date(object["updatedAt"]),
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          createdAt: self2.createdAt,
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          id: self2.id,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          updatedAt: self2.updatedAt,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/listResponseOperationalWebhookEndpointOut.js
var require_listResponseOperationalWebhookEndpointOut = __commonJS({
  "../../node_modules/svix/dist/models/listResponseOperationalWebhookEndpointOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListResponseOperationalWebhookEndpointOutSerializer = void 0;
    var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
    exports.ListResponseOperationalWebhookEndpointOutSerializer = {
      _fromJsonObject(object) {
        var _a2;
        return {
          data: (_a2 = object["data"]) === null || _a2 === void 0 ? void 0 : _a2.map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject(item)),
          done: object["done"],
          iterator: object["iterator"],
          prevIterator: object["prevIterator"]
        };
      },
      _toJsonObject(self2) {
        return {
          data: self2.data.map((item) => operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._toJsonObject(item)),
          done: self2.done,
          iterator: self2.iterator,
          prevIterator: self2.prevIterator
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointHeadersIn.js
var require_operationalWebhookEndpointHeadersIn = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointHeadersIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointHeadersInSerializer = void 0;
    exports.OperationalWebhookEndpointHeadersInSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointHeadersOut.js
var require_operationalWebhookEndpointHeadersOut = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointHeadersOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointHeadersOutSerializer = void 0;
    exports.OperationalWebhookEndpointHeadersOutSerializer = {
      _fromJsonObject(object) {
        return {
          headers: object["headers"],
          sensitive: object["sensitive"]
        };
      },
      _toJsonObject(self2) {
        return {
          headers: self2.headers,
          sensitive: self2.sensitive
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointIn.js
var require_operationalWebhookEndpointIn = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointInSerializer = void 0;
    exports.OperationalWebhookEndpointInSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          secret: object["secret"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          secret: self2.secret,
          uid: self2.uid,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointSecretIn.js
var require_operationalWebhookEndpointSecretIn = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointSecretIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointSecretInSerializer = void 0;
    exports.OperationalWebhookEndpointSecretInSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointSecretOut.js
var require_operationalWebhookEndpointSecretOut = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointSecretOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointSecretOutSerializer = void 0;
    exports.OperationalWebhookEndpointSecretOutSerializer = {
      _fromJsonObject(object) {
        return {
          key: object["key"]
        };
      },
      _toJsonObject(self2) {
        return {
          key: self2.key
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/operationalWebhookEndpointUpdate.js
var require_operationalWebhookEndpointUpdate = __commonJS({
  "../../node_modules/svix/dist/models/operationalWebhookEndpointUpdate.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpointUpdateSerializer = void 0;
    exports.OperationalWebhookEndpointUpdateSerializer = {
      _fromJsonObject(object) {
        return {
          description: object["description"],
          disabled: object["disabled"],
          filterTypes: object["filterTypes"],
          metadata: object["metadata"],
          rateLimit: object["rateLimit"],
          uid: object["uid"],
          url: object["url"]
        };
      },
      _toJsonObject(self2) {
        return {
          description: self2.description,
          disabled: self2.disabled,
          filterTypes: self2.filterTypes,
          metadata: self2.metadata,
          rateLimit: self2.rateLimit,
          uid: self2.uid,
          url: self2.url
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/operationalWebhookEndpoint.js
var require_operationalWebhookEndpoint = __commonJS({
  "../../node_modules/svix/dist/api/operationalWebhookEndpoint.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhookEndpoint = void 0;
    var listResponseOperationalWebhookEndpointOut_1 = require_listResponseOperationalWebhookEndpointOut();
    var operationalWebhookEndpointHeadersIn_1 = require_operationalWebhookEndpointHeadersIn();
    var operationalWebhookEndpointHeadersOut_1 = require_operationalWebhookEndpointHeadersOut();
    var operationalWebhookEndpointIn_1 = require_operationalWebhookEndpointIn();
    var operationalWebhookEndpointOut_1 = require_operationalWebhookEndpointOut();
    var operationalWebhookEndpointSecretIn_1 = require_operationalWebhookEndpointSecretIn();
    var operationalWebhookEndpointSecretOut_1 = require_operationalWebhookEndpointSecretOut();
    var operationalWebhookEndpointUpdate_1 = require_operationalWebhookEndpointUpdate();
    var request_1 = require_request();
    var OperationalWebhookEndpoint = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      list(options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint");
        request.setQueryParam("limit", options === null || options === void 0 ? void 0 : options.limit);
        request.setQueryParam("iterator", options === null || options === void 0 ? void 0 : options.iterator);
        request.setQueryParam("order", options === null || options === void 0 ? void 0 : options.order);
        return request.send(this.requestCtx, listResponseOperationalWebhookEndpointOut_1.ListResponseOperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      create(operationalWebhookEndpointIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(operationalWebhookEndpointIn_1.OperationalWebhookEndpointInSerializer._toJsonObject(operationalWebhookEndpointIn));
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      get(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      update(endpointId, operationalWebhookEndpointUpdate) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(operationalWebhookEndpointUpdate_1.OperationalWebhookEndpointUpdateSerializer._toJsonObject(operationalWebhookEndpointUpdate));
        return request.send(this.requestCtx, operationalWebhookEndpointOut_1.OperationalWebhookEndpointOutSerializer._fromJsonObject);
      }
      delete(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.DELETE, "/api/v1/operational-webhook/endpoint/{endpoint_id}");
        request.setPathParam("endpoint_id", endpointId);
        return request.sendNoResponseBody(this.requestCtx);
      }
      getHeaders(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointHeadersOut_1.OperationalWebhookEndpointHeadersOutSerializer._fromJsonObject);
      }
      updateHeaders(endpointId, operationalWebhookEndpointHeadersIn) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/operational-webhook/endpoint/{endpoint_id}/headers");
        request.setPathParam("endpoint_id", endpointId);
        request.setBody(operationalWebhookEndpointHeadersIn_1.OperationalWebhookEndpointHeadersInSerializer._toJsonObject(operationalWebhookEndpointHeadersIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
      getSecret(endpointId) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.GET, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret");
        request.setPathParam("endpoint_id", endpointId);
        return request.send(this.requestCtx, operationalWebhookEndpointSecretOut_1.OperationalWebhookEndpointSecretOutSerializer._fromJsonObject);
      }
      rotateSecret(endpointId, operationalWebhookEndpointSecretIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/operational-webhook/endpoint/{endpoint_id}/secret/rotate");
        request.setPathParam("endpoint_id", endpointId);
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(operationalWebhookEndpointSecretIn_1.OperationalWebhookEndpointSecretInSerializer._toJsonObject(operationalWebhookEndpointSecretIn));
        return request.sendNoResponseBody(this.requestCtx);
      }
    };
    __name(OperationalWebhookEndpoint, "OperationalWebhookEndpoint");
    exports.OperationalWebhookEndpoint = OperationalWebhookEndpoint;
  }
});

// ../../node_modules/svix/dist/api/operationalWebhook.js
var require_operationalWebhook = __commonJS({
  "../../node_modules/svix/dist/api/operationalWebhook.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OperationalWebhook = void 0;
    var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
    var OperationalWebhook = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      get endpoint() {
        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
      }
    };
    __name(OperationalWebhook, "OperationalWebhook");
    exports.OperationalWebhook = OperationalWebhook;
  }
});

// ../../node_modules/svix/dist/models/aggregateEventTypesOut.js
var require_aggregateEventTypesOut = __commonJS({
  "../../node_modules/svix/dist/models/aggregateEventTypesOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AggregateEventTypesOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.AggregateEventTypesOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"])
        };
      },
      _toJsonObject(self2) {
        return {
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task)
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/appUsageStatsIn.js
var require_appUsageStatsIn = __commonJS({
  "../../node_modules/svix/dist/models/appUsageStatsIn.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppUsageStatsInSerializer = void 0;
    exports.AppUsageStatsInSerializer = {
      _fromJsonObject(object) {
        return {
          appIds: object["appIds"],
          since: new Date(object["since"]),
          until: new Date(object["until"])
        };
      },
      _toJsonObject(self2) {
        return {
          appIds: self2.appIds,
          since: self2.since,
          until: self2.until
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/models/appUsageStatsOut.js
var require_appUsageStatsOut = __commonJS({
  "../../node_modules/svix/dist/models/appUsageStatsOut.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppUsageStatsOutSerializer = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    var backgroundTaskType_1 = require_backgroundTaskType();
    exports.AppUsageStatsOutSerializer = {
      _fromJsonObject(object) {
        return {
          id: object["id"],
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._fromJsonObject(object["status"]),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._fromJsonObject(object["task"]),
          unresolvedAppIds: object["unresolvedAppIds"]
        };
      },
      _toJsonObject(self2) {
        return {
          id: self2.id,
          status: backgroundTaskStatus_1.BackgroundTaskStatusSerializer._toJsonObject(self2.status),
          task: backgroundTaskType_1.BackgroundTaskTypeSerializer._toJsonObject(self2.task),
          unresolvedAppIds: self2.unresolvedAppIds
        };
      }
    };
  }
});

// ../../node_modules/svix/dist/api/statistics.js
var require_statistics = __commonJS({
  "../../node_modules/svix/dist/api/statistics.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Statistics = void 0;
    var aggregateEventTypesOut_1 = require_aggregateEventTypesOut();
    var appUsageStatsIn_1 = require_appUsageStatsIn();
    var appUsageStatsOut_1 = require_appUsageStatsOut();
    var request_1 = require_request();
    var Statistics = class {
      constructor(requestCtx) {
        this.requestCtx = requestCtx;
      }
      aggregateAppStats(appUsageStatsIn, options) {
        const request = new request_1.SvixRequest(request_1.HttpMethod.POST, "/api/v1/stats/usage/app");
        request.setHeaderParam("idempotency-key", options === null || options === void 0 ? void 0 : options.idempotencyKey);
        request.setBody(appUsageStatsIn_1.AppUsageStatsInSerializer._toJsonObject(appUsageStatsIn));
        return request.send(this.requestCtx, appUsageStatsOut_1.AppUsageStatsOutSerializer._fromJsonObject);
      }
      aggregateEventTypes() {
        const request = new request_1.SvixRequest(request_1.HttpMethod.PUT, "/api/v1/stats/usage/event-types");
        return request.send(this.requestCtx, aggregateEventTypesOut_1.AggregateEventTypesOutSerializer._fromJsonObject);
      }
    };
    __name(Statistics, "Statistics");
    exports.Statistics = Statistics;
  }
});

// ../../node_modules/svix/dist/HttpErrors.js
var require_HttpErrors = __commonJS({
  "../../node_modules/svix/dist/HttpErrors.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HTTPValidationError = exports.ValidationError = exports.HttpErrorOut = void 0;
    var HttpErrorOut = class {
      static getAttributeTypeMap() {
        return HttpErrorOut.attributeTypeMap;
      }
    };
    __name(HttpErrorOut, "HttpErrorOut");
    exports.HttpErrorOut = HttpErrorOut;
    HttpErrorOut.discriminator = void 0;
    HttpErrorOut.mapping = void 0;
    HttpErrorOut.attributeTypeMap = [
      {
        name: "code",
        baseName: "code",
        type: "string",
        format: ""
      },
      {
        name: "detail",
        baseName: "detail",
        type: "string",
        format: ""
      }
    ];
    var ValidationError = class {
      static getAttributeTypeMap() {
        return ValidationError.attributeTypeMap;
      }
    };
    __name(ValidationError, "ValidationError");
    exports.ValidationError = ValidationError;
    ValidationError.discriminator = void 0;
    ValidationError.mapping = void 0;
    ValidationError.attributeTypeMap = [
      {
        name: "loc",
        baseName: "loc",
        type: "Array<string>",
        format: ""
      },
      {
        name: "msg",
        baseName: "msg",
        type: "string",
        format: ""
      },
      {
        name: "type",
        baseName: "type",
        type: "string",
        format: ""
      }
    ];
    var HTTPValidationError = class {
      static getAttributeTypeMap() {
        return HTTPValidationError.attributeTypeMap;
      }
    };
    __name(HTTPValidationError, "HTTPValidationError");
    exports.HTTPValidationError = HTTPValidationError;
    HTTPValidationError.discriminator = void 0;
    HTTPValidationError.mapping = void 0;
    HTTPValidationError.attributeTypeMap = [
      {
        name: "detail",
        baseName: "detail",
        type: "Array<ValidationError>",
        format: ""
      }
    ];
  }
});

// ../../node_modules/svix/dist/timing_safe_equal.js
var require_timing_safe_equal = __commonJS({
  "../../node_modules/svix/dist/timing_safe_equal.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timingSafeEqual = void 0;
    function assert3(expr, msg = "") {
      if (!expr) {
        throw new Error(msg);
      }
    }
    __name(assert3, "assert");
    function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      if (!(a instanceof DataView)) {
        a = new DataView(ArrayBuffer.isView(a) ? a.buffer : a);
      }
      if (!(b instanceof DataView)) {
        b = new DataView(ArrayBuffer.isView(b) ? b.buffer : b);
      }
      assert3(a instanceof DataView);
      assert3(b instanceof DataView);
      const length = a.byteLength;
      let out = 0;
      let i = -1;
      while (++i < length) {
        out |= a.getUint8(i) ^ b.getUint8(i);
      }
      return out === 0;
    }
    __name(timingSafeEqual2, "timingSafeEqual");
    exports.timingSafeEqual = timingSafeEqual2;
  }
});

// ../../node_modules/@stablelib/base64/lib/base64.js
var require_base64 = __commonJS({
  "../../node_modules/@stablelib/base64/lib/base64.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __extends = exports && exports.__extends || function() {
      var extendStatics = /* @__PURE__ */ __name(function(d, b) {
        extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
          d2.__proto__ = b2;
        } || function(d2, b2) {
          for (var p in b2)
            if (b2.hasOwnProperty(p))
              d2[p] = b2[p];
        };
        return extendStatics(d, b);
      }, "extendStatics");
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        __name(__, "__");
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", { value: true });
    var INVALID_BYTE = 256;
    var Coder = (
      /** @class */
      function() {
        function Coder2(_paddingCharacter) {
          if (_paddingCharacter === void 0) {
            _paddingCharacter = "=";
          }
          this._paddingCharacter = _paddingCharacter;
        }
        __name(Coder2, "Coder");
        Coder2.prototype.encodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 8 + 5) / 6 | 0;
          }
          return (length + 2) / 3 * 4 | 0;
        };
        Coder2.prototype.encode = function(data) {
          var out = "";
          var i = 0;
          for (; i < data.length - 2; i += 3) {
            var c = data[i] << 16 | data[i + 1] << 8 | data[i + 2];
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            out += this._encodeByte(c >>> 1 * 6 & 63);
            out += this._encodeByte(c >>> 0 * 6 & 63);
          }
          var left = data.length - i;
          if (left > 0) {
            var c = data[i] << 16 | (left === 2 ? data[i + 1] << 8 : 0);
            out += this._encodeByte(c >>> 3 * 6 & 63);
            out += this._encodeByte(c >>> 2 * 6 & 63);
            if (left === 2) {
              out += this._encodeByte(c >>> 1 * 6 & 63);
            } else {
              out += this._paddingCharacter || "";
            }
            out += this._paddingCharacter || "";
          }
          return out;
        };
        Coder2.prototype.maxDecodedLength = function(length) {
          if (!this._paddingCharacter) {
            return (length * 6 + 7) / 8 | 0;
          }
          return length / 4 * 3 | 0;
        };
        Coder2.prototype.decodedLength = function(s) {
          return this.maxDecodedLength(s.length - this._getPaddingLength(s));
        };
        Coder2.prototype.decode = function(s) {
          if (s.length === 0) {
            return new Uint8Array(0);
          }
          var paddingLength = this._getPaddingLength(s);
          var length = s.length - paddingLength;
          var out = new Uint8Array(this.maxDecodedLength(length));
          var op = 0;
          var i = 0;
          var haveBad = 0;
          var v0 = 0, v1 = 0, v2 = 0, v3 = 0;
          for (; i < length - 4; i += 4) {
            v0 = this._decodeChar(s.charCodeAt(i + 0));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v0 << 2 | v1 >>> 4;
            out[op++] = v1 << 4 | v2 >>> 2;
            out[op++] = v2 << 6 | v3;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
            haveBad |= v2 & INVALID_BYTE;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (i < length - 1) {
            v0 = this._decodeChar(s.charCodeAt(i));
            v1 = this._decodeChar(s.charCodeAt(i + 1));
            out[op++] = v0 << 2 | v1 >>> 4;
            haveBad |= v0 & INVALID_BYTE;
            haveBad |= v1 & INVALID_BYTE;
          }
          if (i < length - 2) {
            v2 = this._decodeChar(s.charCodeAt(i + 2));
            out[op++] = v1 << 4 | v2 >>> 2;
            haveBad |= v2 & INVALID_BYTE;
          }
          if (i < length - 3) {
            v3 = this._decodeChar(s.charCodeAt(i + 3));
            out[op++] = v2 << 6 | v3;
            haveBad |= v3 & INVALID_BYTE;
          }
          if (haveBad !== 0) {
            throw new Error("Base64Coder: incorrect characters for decoding");
          }
          return out;
        };
        Coder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 43;
          result += 62 - b >>> 8 & 62 - 43 - 63 + 47;
          return String.fromCharCode(result);
        };
        Coder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (42 - c & c - 44) >>> 8 & -INVALID_BYTE + c - 43 + 62;
          result += (46 - c & c - 48) >>> 8 & -INVALID_BYTE + c - 47 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        Coder2.prototype._getPaddingLength = function(s) {
          var paddingLength = 0;
          if (this._paddingCharacter) {
            for (var i = s.length - 1; i >= 0; i--) {
              if (s[i] !== this._paddingCharacter) {
                break;
              }
              paddingLength++;
            }
            if (s.length < 4 || paddingLength > 2) {
              throw new Error("Base64Coder: incorrect padding");
            }
          }
          return paddingLength;
        };
        return Coder2;
      }()
    );
    exports.Coder = Coder;
    var stdCoder = new Coder();
    function encode(data) {
      return stdCoder.encode(data);
    }
    __name(encode, "encode");
    exports.encode = encode;
    function decode(s) {
      return stdCoder.decode(s);
    }
    __name(decode, "decode");
    exports.decode = decode;
    var URLSafeCoder = (
      /** @class */
      function(_super) {
        __extends(URLSafeCoder2, _super);
        function URLSafeCoder2() {
          return _super !== null && _super.apply(this, arguments) || this;
        }
        __name(URLSafeCoder2, "URLSafeCoder");
        URLSafeCoder2.prototype._encodeByte = function(b) {
          var result = b;
          result += 65;
          result += 25 - b >>> 8 & 0 - 65 - 26 + 97;
          result += 51 - b >>> 8 & 26 - 97 - 52 + 48;
          result += 61 - b >>> 8 & 52 - 48 - 62 + 45;
          result += 62 - b >>> 8 & 62 - 45 - 63 + 95;
          return String.fromCharCode(result);
        };
        URLSafeCoder2.prototype._decodeChar = function(c) {
          var result = INVALID_BYTE;
          result += (44 - c & c - 46) >>> 8 & -INVALID_BYTE + c - 45 + 62;
          result += (94 - c & c - 96) >>> 8 & -INVALID_BYTE + c - 95 + 63;
          result += (47 - c & c - 58) >>> 8 & -INVALID_BYTE + c - 48 + 52;
          result += (64 - c & c - 91) >>> 8 & -INVALID_BYTE + c - 65 + 0;
          result += (96 - c & c - 123) >>> 8 & -INVALID_BYTE + c - 97 + 26;
          return result;
        };
        return URLSafeCoder2;
      }(Coder)
    );
    exports.URLSafeCoder = URLSafeCoder;
    var urlSafeCoder = new URLSafeCoder();
    function encodeURLSafe(data) {
      return urlSafeCoder.encode(data);
    }
    __name(encodeURLSafe, "encodeURLSafe");
    exports.encodeURLSafe = encodeURLSafe;
    function decodeURLSafe(s) {
      return urlSafeCoder.decode(s);
    }
    __name(decodeURLSafe, "decodeURLSafe");
    exports.decodeURLSafe = decodeURLSafe;
    exports.encodedLength = function(length) {
      return stdCoder.encodedLength(length);
    };
    exports.maxDecodedLength = function(length) {
      return stdCoder.maxDecodedLength(length);
    };
    exports.decodedLength = function(s) {
      return stdCoder.decodedLength(s);
    };
  }
});

// ../../node_modules/fast-sha256/sha256.js
var require_sha256 = __commonJS({
  "../../node_modules/fast-sha256/sha256.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(root, factory) {
      var exports2 = {};
      factory(exports2);
      var sha256 = exports2["default"];
      for (var k in exports2) {
        sha256[k] = exports2[k];
      }
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = sha256;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return sha256;
        });
      } else {
        root.sha256 = sha256;
      }
    })(exports, function(exports2) {
      "use strict";
      exports2.__esModule = true;
      exports2.digestLength = 32;
      exports2.blockSize = 64;
      var K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      function hashBlocks(w, v, p, pos, len) {
        var a, b, c, d, e, f, g, h, u, i, j, t1, t2;
        while (len >= 64) {
          a = v[0];
          b = v[1];
          c = v[2];
          d = v[3];
          e = v[4];
          f = v[5];
          g = v[6];
          h = v[7];
          for (i = 0; i < 16; i++) {
            j = pos + i * 4;
            w[i] = (p[j] & 255) << 24 | (p[j + 1] & 255) << 16 | (p[j + 2] & 255) << 8 | p[j + 3] & 255;
          }
          for (i = 16; i < 64; i++) {
            u = w[i - 2];
            t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
            u = w[i - 15];
            t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
            w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
          }
          for (i = 0; i < 64; i++) {
            t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
            t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
            h = g;
            g = f;
            f = e;
            e = d + t1 | 0;
            d = c;
            c = b;
            b = a;
            a = t1 + t2 | 0;
          }
          v[0] += a;
          v[1] += b;
          v[2] += c;
          v[3] += d;
          v[4] += e;
          v[5] += f;
          v[6] += g;
          v[7] += h;
          pos += 64;
          len -= 64;
        }
        return pos;
      }
      __name(hashBlocks, "hashBlocks");
      var Hash2 = (
        /** @class */
        function() {
          function Hash3() {
            this.digestLength = exports2.digestLength;
            this.blockSize = exports2.blockSize;
            this.state = new Int32Array(8);
            this.temp = new Int32Array(64);
            this.buffer = new Uint8Array(128);
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            this.reset();
          }
          __name(Hash3, "Hash");
          Hash3.prototype.reset = function() {
            this.state[0] = 1779033703;
            this.state[1] = 3144134277;
            this.state[2] = 1013904242;
            this.state[3] = 2773480762;
            this.state[4] = 1359893119;
            this.state[5] = 2600822924;
            this.state[6] = 528734635;
            this.state[7] = 1541459225;
            this.bufferLength = 0;
            this.bytesHashed = 0;
            this.finished = false;
            return this;
          };
          Hash3.prototype.clean = function() {
            for (var i = 0; i < this.buffer.length; i++) {
              this.buffer[i] = 0;
            }
            for (var i = 0; i < this.temp.length; i++) {
              this.temp[i] = 0;
            }
            this.reset();
          };
          Hash3.prototype.update = function(data, dataLength) {
            if (dataLength === void 0) {
              dataLength = data.length;
            }
            if (this.finished) {
              throw new Error("SHA256: can't update because hash was finished.");
            }
            var dataPos = 0;
            this.bytesHashed += dataLength;
            if (this.bufferLength > 0) {
              while (this.bufferLength < 64 && dataLength > 0) {
                this.buffer[this.bufferLength++] = data[dataPos++];
                dataLength--;
              }
              if (this.bufferLength === 64) {
                hashBlocks(this.temp, this.state, this.buffer, 0, 64);
                this.bufferLength = 0;
              }
            }
            if (dataLength >= 64) {
              dataPos = hashBlocks(this.temp, this.state, data, dataPos, dataLength);
              dataLength %= 64;
            }
            while (dataLength > 0) {
              this.buffer[this.bufferLength++] = data[dataPos++];
              dataLength--;
            }
            return this;
          };
          Hash3.prototype.finish = function(out) {
            if (!this.finished) {
              var bytesHashed = this.bytesHashed;
              var left = this.bufferLength;
              var bitLenHi = bytesHashed / 536870912 | 0;
              var bitLenLo = bytesHashed << 3;
              var padLength = bytesHashed % 64 < 56 ? 64 : 128;
              this.buffer[left] = 128;
              for (var i = left + 1; i < padLength - 8; i++) {
                this.buffer[i] = 0;
              }
              this.buffer[padLength - 8] = bitLenHi >>> 24 & 255;
              this.buffer[padLength - 7] = bitLenHi >>> 16 & 255;
              this.buffer[padLength - 6] = bitLenHi >>> 8 & 255;
              this.buffer[padLength - 5] = bitLenHi >>> 0 & 255;
              this.buffer[padLength - 4] = bitLenLo >>> 24 & 255;
              this.buffer[padLength - 3] = bitLenLo >>> 16 & 255;
              this.buffer[padLength - 2] = bitLenLo >>> 8 & 255;
              this.buffer[padLength - 1] = bitLenLo >>> 0 & 255;
              hashBlocks(this.temp, this.state, this.buffer, 0, padLength);
              this.finished = true;
            }
            for (var i = 0; i < 8; i++) {
              out[i * 4 + 0] = this.state[i] >>> 24 & 255;
              out[i * 4 + 1] = this.state[i] >>> 16 & 255;
              out[i * 4 + 2] = this.state[i] >>> 8 & 255;
              out[i * 4 + 3] = this.state[i] >>> 0 & 255;
            }
            return this;
          };
          Hash3.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          Hash3.prototype._saveState = function(out) {
            for (var i = 0; i < this.state.length; i++) {
              out[i] = this.state[i];
            }
          };
          Hash3.prototype._restoreState = function(from, bytesHashed) {
            for (var i = 0; i < this.state.length; i++) {
              this.state[i] = from[i];
            }
            this.bytesHashed = bytesHashed;
            this.finished = false;
            this.bufferLength = 0;
          };
          return Hash3;
        }()
      );
      exports2.Hash = Hash2;
      var HMAC = (
        /** @class */
        function() {
          function HMAC2(key) {
            this.inner = new Hash2();
            this.outer = new Hash2();
            this.blockSize = this.inner.blockSize;
            this.digestLength = this.inner.digestLength;
            var pad = new Uint8Array(this.blockSize);
            if (key.length > this.blockSize) {
              new Hash2().update(key).finish(pad).clean();
            } else {
              for (var i = 0; i < key.length; i++) {
                pad[i] = key[i];
              }
            }
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54;
            }
            this.inner.update(pad);
            for (var i = 0; i < pad.length; i++) {
              pad[i] ^= 54 ^ 92;
            }
            this.outer.update(pad);
            this.istate = new Uint32Array(8);
            this.ostate = new Uint32Array(8);
            this.inner._saveState(this.istate);
            this.outer._saveState(this.ostate);
            for (var i = 0; i < pad.length; i++) {
              pad[i] = 0;
            }
          }
          __name(HMAC2, "HMAC");
          HMAC2.prototype.reset = function() {
            this.inner._restoreState(this.istate, this.inner.blockSize);
            this.outer._restoreState(this.ostate, this.outer.blockSize);
            return this;
          };
          HMAC2.prototype.clean = function() {
            for (var i = 0; i < this.istate.length; i++) {
              this.ostate[i] = this.istate[i] = 0;
            }
            this.inner.clean();
            this.outer.clean();
          };
          HMAC2.prototype.update = function(data) {
            this.inner.update(data);
            return this;
          };
          HMAC2.prototype.finish = function(out) {
            if (this.outer.finished) {
              this.outer.finish(out);
            } else {
              this.inner.finish(out);
              this.outer.update(out, this.digestLength).finish(out);
            }
            return this;
          };
          HMAC2.prototype.digest = function() {
            var out = new Uint8Array(this.digestLength);
            this.finish(out);
            return out;
          };
          return HMAC2;
        }()
      );
      exports2.HMAC = HMAC;
      function hash2(data) {
        var h = new Hash2().update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hash2, "hash");
      exports2.hash = hash2;
      exports2["default"] = hash2;
      function hmac(key, data) {
        var h = new HMAC(key).update(data);
        var digest = h.digest();
        h.clean();
        return digest;
      }
      __name(hmac, "hmac");
      exports2.hmac = hmac;
      function fillBuffer(buffer, hmac2, info3, counter) {
        var num = counter[0];
        if (num === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        hmac2.reset();
        if (num > 1) {
          hmac2.update(buffer);
        }
        if (info3) {
          hmac2.update(info3);
        }
        hmac2.update(counter);
        hmac2.finish(buffer);
        counter[0]++;
      }
      __name(fillBuffer, "fillBuffer");
      var hkdfSalt = new Uint8Array(exports2.digestLength);
      function hkdf2(key, salt, info3, length) {
        if (salt === void 0) {
          salt = hkdfSalt;
        }
        if (length === void 0) {
          length = 32;
        }
        var counter = new Uint8Array([1]);
        var okm = hmac(salt, key);
        var hmac_ = new HMAC(okm);
        var buffer = new Uint8Array(hmac_.digestLength);
        var bufpos = buffer.length;
        var out = new Uint8Array(length);
        for (var i = 0; i < length; i++) {
          if (bufpos === buffer.length) {
            fillBuffer(buffer, hmac_, info3, counter);
            bufpos = 0;
          }
          out[i] = buffer[bufpos++];
        }
        hmac_.clean();
        buffer.fill(0);
        counter.fill(0);
        return out;
      }
      __name(hkdf2, "hkdf");
      exports2.hkdf = hkdf2;
      function pbkdf22(password, salt, iterations, dkLen) {
        var prf = new HMAC(password);
        var len = prf.digestLength;
        var ctr = new Uint8Array(4);
        var t = new Uint8Array(len);
        var u = new Uint8Array(len);
        var dk = new Uint8Array(dkLen);
        for (var i = 0; i * len < dkLen; i++) {
          var c = i + 1;
          ctr[0] = c >>> 24 & 255;
          ctr[1] = c >>> 16 & 255;
          ctr[2] = c >>> 8 & 255;
          ctr[3] = c >>> 0 & 255;
          prf.reset();
          prf.update(salt);
          prf.update(ctr);
          prf.finish(u);
          for (var j = 0; j < len; j++) {
            t[j] = u[j];
          }
          for (var j = 2; j <= iterations; j++) {
            prf.reset();
            prf.update(u).finish(u);
            for (var k = 0; k < len; k++) {
              t[k] ^= u[k];
            }
          }
          for (var j = 0; j < len && i * len + j < dkLen; j++) {
            dk[i * len + j] = t[j];
          }
        }
        for (var i = 0; i < len; i++) {
          t[i] = u[i] = 0;
        }
        for (var i = 0; i < 4; i++) {
          ctr[i] = 0;
        }
        prf.clean();
        return dk;
      }
      __name(pbkdf22, "pbkdf2");
      exports2.pbkdf2 = pbkdf22;
    });
  }
});

// ../../node_modules/svix/dist/webhook.js
var require_webhook = __commonJS({
  "../../node_modules/svix/dist/webhook.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Webhook = exports.WebhookVerificationError = void 0;
    var timing_safe_equal_1 = require_timing_safe_equal();
    var base64 = require_base64();
    var sha256 = require_sha256();
    var WEBHOOK_TOLERANCE_IN_SECONDS = 5 * 60;
    var ExtendableError = class extends Error {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, ExtendableError.prototype);
        this.name = "ExtendableError";
        this.stack = new Error(message).stack;
      }
    };
    __name(ExtendableError, "ExtendableError");
    var WebhookVerificationError = class extends ExtendableError {
      constructor(message) {
        super(message);
        Object.setPrototypeOf(this, WebhookVerificationError.prototype);
        this.name = "WebhookVerificationError";
      }
    };
    __name(WebhookVerificationError, "WebhookVerificationError");
    exports.WebhookVerificationError = WebhookVerificationError;
    var Webhook2 = class {
      constructor(secret, options) {
        if (!secret) {
          throw new Error("Secret can't be empty.");
        }
        if ((options === null || options === void 0 ? void 0 : options.format) === "raw") {
          if (secret instanceof Uint8Array) {
            this.key = secret;
          } else {
            this.key = Uint8Array.from(secret, (c) => c.charCodeAt(0));
          }
        } else {
          if (typeof secret !== "string") {
            throw new Error("Expected secret to be of type string");
          }
          if (secret.startsWith(Webhook2.prefix)) {
            secret = secret.substring(Webhook2.prefix.length);
          }
          this.key = base64.decode(secret);
        }
      }
      verify(payload, headers_) {
        const headers = {};
        for (const key of Object.keys(headers_)) {
          headers[key.toLowerCase()] = headers_[key];
        }
        let msgId = headers["svix-id"];
        let msgSignature = headers["svix-signature"];
        let msgTimestamp = headers["svix-timestamp"];
        if (!msgSignature || !msgId || !msgTimestamp) {
          msgId = headers["webhook-id"];
          msgSignature = headers["webhook-signature"];
          msgTimestamp = headers["webhook-timestamp"];
          if (!msgSignature || !msgId || !msgTimestamp) {
            throw new WebhookVerificationError("Missing required headers");
          }
        }
        const timestamp = this.verifyTimestamp(msgTimestamp);
        const computedSignature = this.sign(msgId, timestamp, payload);
        const expectedSignature = computedSignature.split(",")[1];
        const passedSignatures = msgSignature.split(" ");
        const encoder = new globalThis.TextEncoder();
        for (const versionedSignature of passedSignatures) {
          const [version2, signature] = versionedSignature.split(",");
          if (version2 !== "v1") {
            continue;
          }
          if ((0, timing_safe_equal_1.timingSafeEqual)(encoder.encode(signature), encoder.encode(expectedSignature))) {
            return JSON.parse(payload.toString());
          }
        }
        throw new WebhookVerificationError("No matching signature found");
      }
      sign(msgId, timestamp, payload) {
        if (typeof payload === "string") {
        } else if (payload.constructor.name === "Buffer") {
          payload = payload.toString();
        } else {
          throw new Error("Expected payload to be of type string or Buffer. Please refer to https://docs.svix.com/receiving/verifying-payloads/how for more information.");
        }
        const encoder = new TextEncoder();
        const timestampNumber = Math.floor(timestamp.getTime() / 1e3);
        const toSign = encoder.encode(`${msgId}.${timestampNumber}.${payload}`);
        const expectedSignature = base64.encode(sha256.hmac(this.key, toSign));
        return `v1,${expectedSignature}`;
      }
      verifyTimestamp(timestampHeader) {
        const now = Math.floor(Date.now() / 1e3);
        const timestamp = parseInt(timestampHeader, 10);
        if (isNaN(timestamp)) {
          throw new WebhookVerificationError("Invalid Signature Headers");
        }
        if (now - timestamp > WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too old");
        }
        if (timestamp > now + WEBHOOK_TOLERANCE_IN_SECONDS) {
          throw new WebhookVerificationError("Message timestamp too new");
        }
        return new Date(timestamp * 1e3);
      }
    };
    __name(Webhook2, "Webhook");
    exports.Webhook = Webhook2;
    Webhook2.prefix = "whsec_";
  }
});

// ../../node_modules/svix/dist/models/connectorKind.js
var require_connectorKind = __commonJS({
  "../../node_modules/svix/dist/models/connectorKind.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConnectorKindSerializer = exports.ConnectorKind = void 0;
    var ConnectorKind;
    (function(ConnectorKind2) {
      ConnectorKind2["Custom"] = "Custom";
      ConnectorKind2["CustomerIo"] = "CustomerIO";
      ConnectorKind2["Discord"] = "Discord";
      ConnectorKind2["Hubspot"] = "Hubspot";
      ConnectorKind2["Inngest"] = "Inngest";
      ConnectorKind2["Salesforce"] = "Salesforce";
      ConnectorKind2["Segment"] = "Segment";
      ConnectorKind2["Slack"] = "Slack";
      ConnectorKind2["Teams"] = "Teams";
      ConnectorKind2["TriggerDev"] = "TriggerDev";
      ConnectorKind2["Windmill"] = "Windmill";
      ConnectorKind2["Zapier"] = "Zapier";
    })(ConnectorKind = exports.ConnectorKind || (exports.ConnectorKind = {}));
    exports.ConnectorKindSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/endpointDisabledTrigger.js
var require_endpointDisabledTrigger = __commonJS({
  "../../node_modules/svix/dist/models/endpointDisabledTrigger.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EndpointDisabledTriggerSerializer = exports.EndpointDisabledTrigger = void 0;
    var EndpointDisabledTrigger;
    (function(EndpointDisabledTrigger2) {
      EndpointDisabledTrigger2["Manual"] = "manual";
      EndpointDisabledTrigger2["Automatic"] = "automatic";
    })(EndpointDisabledTrigger = exports.EndpointDisabledTrigger || (exports.EndpointDisabledTrigger = {}));
    exports.EndpointDisabledTriggerSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/ordering.js
var require_ordering = __commonJS({
  "../../node_modules/svix/dist/models/ordering.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OrderingSerializer = exports.Ordering = void 0;
    var Ordering;
    (function(Ordering2) {
      Ordering2["Ascending"] = "ascending";
      Ordering2["Descending"] = "descending";
    })(Ordering = exports.Ordering || (exports.Ordering = {}));
    exports.OrderingSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/statusCodeClass.js
var require_statusCodeClass = __commonJS({
  "../../node_modules/svix/dist/models/statusCodeClass.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusCodeClassSerializer = exports.StatusCodeClass = void 0;
    var StatusCodeClass;
    (function(StatusCodeClass2) {
      StatusCodeClass2[StatusCodeClass2["CodeNone"] = 0] = "CodeNone";
      StatusCodeClass2[StatusCodeClass2["Code1xx"] = 100] = "Code1xx";
      StatusCodeClass2[StatusCodeClass2["Code2xx"] = 200] = "Code2xx";
      StatusCodeClass2[StatusCodeClass2["Code3xx"] = 300] = "Code3xx";
      StatusCodeClass2[StatusCodeClass2["Code4xx"] = 400] = "Code4xx";
      StatusCodeClass2[StatusCodeClass2["Code5xx"] = 500] = "Code5xx";
    })(StatusCodeClass = exports.StatusCodeClass || (exports.StatusCodeClass = {}));
    exports.StatusCodeClassSerializer = {
      _fromJsonObject(object) {
        return object;
      },
      _toJsonObject(self2) {
        return self2;
      }
    };
  }
});

// ../../node_modules/svix/dist/models/index.js
var require_models = __commonJS({
  "../../node_modules/svix/dist/models/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StatusCodeClass = exports.Ordering = exports.MessageStatus = exports.MessageAttemptTriggerType = exports.EndpointDisabledTrigger = exports.ConnectorKind = exports.BackgroundTaskType = exports.BackgroundTaskStatus = void 0;
    var backgroundTaskStatus_1 = require_backgroundTaskStatus();
    Object.defineProperty(exports, "BackgroundTaskStatus", { enumerable: true, get: function() {
      return backgroundTaskStatus_1.BackgroundTaskStatus;
    } });
    var backgroundTaskType_1 = require_backgroundTaskType();
    Object.defineProperty(exports, "BackgroundTaskType", { enumerable: true, get: function() {
      return backgroundTaskType_1.BackgroundTaskType;
    } });
    var connectorKind_1 = require_connectorKind();
    Object.defineProperty(exports, "ConnectorKind", { enumerable: true, get: function() {
      return connectorKind_1.ConnectorKind;
    } });
    var endpointDisabledTrigger_1 = require_endpointDisabledTrigger();
    Object.defineProperty(exports, "EndpointDisabledTrigger", { enumerable: true, get: function() {
      return endpointDisabledTrigger_1.EndpointDisabledTrigger;
    } });
    var messageAttemptTriggerType_1 = require_messageAttemptTriggerType();
    Object.defineProperty(exports, "MessageAttemptTriggerType", { enumerable: true, get: function() {
      return messageAttemptTriggerType_1.MessageAttemptTriggerType;
    } });
    var messageStatus_1 = require_messageStatus();
    Object.defineProperty(exports, "MessageStatus", { enumerable: true, get: function() {
      return messageStatus_1.MessageStatus;
    } });
    var ordering_1 = require_ordering();
    Object.defineProperty(exports, "Ordering", { enumerable: true, get: function() {
      return ordering_1.Ordering;
    } });
    var statusCodeClass_1 = require_statusCodeClass();
    Object.defineProperty(exports, "StatusCodeClass", { enumerable: true, get: function() {
      return statusCodeClass_1.StatusCodeClass;
    } });
  }
});

// ../../node_modules/svix/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/svix/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Svix = exports.messageInRaw = exports.ValidationError = exports.HttpErrorOut = exports.HTTPValidationError = exports.ApiException = void 0;
    var authentication_1 = require_authentication();
    var application_1 = require_application();
    var backgroundTask_1 = require_backgroundTask();
    var endpoint_1 = require_endpoint();
    var eventType_1 = require_eventType();
    var ingest_1 = require_ingest();
    var integration_1 = require_integration();
    var management_1 = require_management();
    var message_1 = require_message();
    var messageAttempt_1 = require_messageAttempt();
    var operationalWebhook_1 = require_operationalWebhook();
    var operationalWebhookEndpoint_1 = require_operationalWebhookEndpoint();
    var statistics_1 = require_statistics();
    var util_1 = require_util();
    Object.defineProperty(exports, "ApiException", { enumerable: true, get: function() {
      return util_1.ApiException;
    } });
    var HttpErrors_1 = require_HttpErrors();
    Object.defineProperty(exports, "HTTPValidationError", { enumerable: true, get: function() {
      return HttpErrors_1.HTTPValidationError;
    } });
    Object.defineProperty(exports, "HttpErrorOut", { enumerable: true, get: function() {
      return HttpErrors_1.HttpErrorOut;
    } });
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return HttpErrors_1.ValidationError;
    } });
    __exportStar(require_webhook(), exports);
    __exportStar(require_models(), exports);
    var message_2 = require_message();
    Object.defineProperty(exports, "messageInRaw", { enumerable: true, get: function() {
      return message_2.messageInRaw;
    } });
    var REGIONS = [
      { region: "us", url: "https://api.us.svix.com" },
      { region: "eu", url: "https://api.eu.svix.com" },
      { region: "in", url: "https://api.in.svix.com" },
      { region: "ca", url: "https://api.ca.svix.com" },
      { region: "au", url: "https://api.au.svix.com" }
    ];
    var Svix = class {
      constructor(token, options = {}) {
        var _a2, _b, _c;
        const regionalUrl = (_a2 = REGIONS.find((x) => x.region === token.split(".")[1])) === null || _a2 === void 0 ? void 0 : _a2.url;
        const baseUrl = (_c = (_b = options.serverUrl) !== null && _b !== void 0 ? _b : regionalUrl) !== null && _c !== void 0 ? _c : "https://api.svix.com";
        this.requestCtx = { baseUrl, token, timeout: options.requestTimeout };
      }
      get authentication() {
        return new authentication_1.Authentication(this.requestCtx);
      }
      get application() {
        return new application_1.Application(this.requestCtx);
      }
      get endpoint() {
        return new endpoint_1.Endpoint(this.requestCtx);
      }
      get eventType() {
        return new eventType_1.EventType(this.requestCtx);
      }
      get ingest() {
        return new ingest_1.Ingest(this.requestCtx);
      }
      get integration() {
        return new integration_1.Integration(this.requestCtx);
      }
      get management() {
        return new management_1.Management(this.requestCtx);
      }
      get message() {
        return new message_1.Message(this.requestCtx);
      }
      get messageAttempt() {
        return new messageAttempt_1.MessageAttempt(this.requestCtx);
      }
      get backgroundTask() {
        return new backgroundTask_1.BackgroundTask(this.requestCtx);
      }
      get statistics() {
        return new statistics_1.Statistics(this.requestCtx);
      }
      get operationalWebhook() {
        return new operationalWebhook_1.OperationalWebhook(this.requestCtx);
      }
      get operationalWebhookEndpoint() {
        return new operationalWebhookEndpoint_1.OperationalWebhookEndpoint(this.requestCtx);
      }
    };
    __name(Svix, "Svix");
    exports.Svix = Svix;
  }
});

// node-built-in-modules:events
import libDefault from "events";
var require_events = __commonJS({
  "node-built-in-modules:events"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault;
  }
});

// ../../node_modules/pg-types/node_modules/postgres-array/index.js
var require_postgres_array = __commonJS({
  "../../node_modules/pg-types/node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    exports.parse = function(source, transform) {
      return new ArrayParser(source, transform).parse();
    };
    var ArrayParser = class {
      constructor(source, transform) {
        this.source = source;
        this.transform = transform || identity;
        this.position = 0;
        this.entries = [];
        this.recorded = [];
        this.dimension = 0;
      }
      isEof() {
        return this.position >= this.source.length;
      }
      nextCharacter() {
        var character = this.source[this.position++];
        if (character === "\\") {
          return {
            value: this.source[this.position++],
            escaped: true
          };
        }
        return {
          value: character,
          escaped: false
        };
      }
      record(character) {
        this.recorded.push(character);
      }
      newEntry(includeEmpty) {
        var entry;
        if (this.recorded.length > 0 || includeEmpty) {
          entry = this.recorded.join("");
          if (entry === "NULL" && !includeEmpty) {
            entry = null;
          }
          if (entry !== null)
            entry = this.transform(entry);
          this.entries.push(entry);
          this.recorded = [];
        }
      }
      consumeDimensions() {
        if (this.source[0] === "[") {
          while (!this.isEof()) {
            var char = this.nextCharacter();
            if (char.value === "=")
              break;
          }
        }
      }
      parse(nested) {
        var character, parser, quote;
        this.consumeDimensions();
        while (!this.isEof()) {
          character = this.nextCharacter();
          if (character.value === "{" && !quote) {
            this.dimension++;
            if (this.dimension > 1) {
              parser = new ArrayParser(this.source.substr(this.position - 1), this.transform);
              this.entries.push(parser.parse(true));
              this.position += parser.position - 2;
            }
          } else if (character.value === "}" && !quote) {
            this.dimension--;
            if (!this.dimension) {
              this.newEntry();
              if (nested)
                return this.entries;
            }
          } else if (character.value === '"' && !character.escaped) {
            if (quote)
              this.newEntry(true);
            quote = !quote;
          } else if (character.value === "," && !quote) {
            this.newEntry();
          } else {
            this.record(character.value);
          }
        }
        if (this.dimension !== 0) {
          throw new Error("array dimension not balanced");
        }
        return this.entries;
      }
    };
    __name(ArrayParser, "ArrayParser");
    function identity(value) {
      return value;
    }
    __name(identity, "identity");
  }
});

// ../../node_modules/pg-types/lib/arrayParser.js
var require_arrayParser = __commonJS({
  "../../node_modules/pg-types/lib/arrayParser.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    module.exports = {
      create: function(source, transform) {
        return {
          parse: function() {
            return array.parse(source, transform);
          }
        };
      }
    };
  }
});

// ../../node_modules/postgres-date/index.js
var require_postgres_date = __commonJS({
  "../../node_modules/postgres-date/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var DATE_TIME = /(\d{1,})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})(\.\d{1,})?.*?( BC)?$/;
    var DATE = /^(\d{1,})-(\d{2})-(\d{2})( BC)?$/;
    var TIME_ZONE = /([Z+-])(\d{2})?:?(\d{2})?:?(\d{2})?/;
    var INFINITY = /^-?infinity$/;
    module.exports = /* @__PURE__ */ __name(function parseDate(isoDate) {
      if (INFINITY.test(isoDate)) {
        return Number(isoDate.replace("i", "I"));
      }
      var matches = DATE_TIME.exec(isoDate);
      if (!matches) {
        return getDate(isoDate) || null;
      }
      var isBC = !!matches[8];
      var year = parseInt(matches[1], 10);
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var hour = parseInt(matches[4], 10);
      var minute = parseInt(matches[5], 10);
      var second = parseInt(matches[6], 10);
      var ms = matches[7];
      ms = ms ? 1e3 * parseFloat(ms) : 0;
      var date;
      var offset = timeZoneOffset(isoDate);
      if (offset != null) {
        date = new Date(Date.UTC(year, month, day, hour, minute, second, ms));
        if (is0To99(year)) {
          date.setUTCFullYear(year);
        }
        if (offset !== 0) {
          date.setTime(date.getTime() - offset);
        }
      } else {
        date = new Date(year, month, day, hour, minute, second, ms);
        if (is0To99(year)) {
          date.setFullYear(year);
        }
      }
      return date;
    }, "parseDate");
    function getDate(isoDate) {
      var matches = DATE.exec(isoDate);
      if (!matches) {
        return;
      }
      var year = parseInt(matches[1], 10);
      var isBC = !!matches[4];
      if (isBC) {
        year = bcYearToNegativeYear(year);
      }
      var month = parseInt(matches[2], 10) - 1;
      var day = matches[3];
      var date = new Date(year, month, day);
      if (is0To99(year)) {
        date.setFullYear(year);
      }
      return date;
    }
    __name(getDate, "getDate");
    function timeZoneOffset(isoDate) {
      if (isoDate.endsWith("+00")) {
        return 0;
      }
      var zone = TIME_ZONE.exec(isoDate.split(" ")[1]);
      if (!zone)
        return;
      var type = zone[1];
      if (type === "Z") {
        return 0;
      }
      var sign2 = type === "-" ? -1 : 1;
      var offset = parseInt(zone[2], 10) * 3600 + parseInt(zone[3] || 0, 10) * 60 + parseInt(zone[4] || 0, 10);
      return offset * sign2 * 1e3;
    }
    __name(timeZoneOffset, "timeZoneOffset");
    function bcYearToNegativeYear(year) {
      return -(year - 1);
    }
    __name(bcYearToNegativeYear, "bcYearToNegativeYear");
    function is0To99(num) {
      return num >= 0 && num < 100;
    }
    __name(is0To99, "is0To99");
  }
});

// ../../node_modules/xtend/mutable.js
var require_mutable = __commonJS({
  "../../node_modules/xtend/mutable.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = extend;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function extend(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    }
    __name(extend, "extend");
  }
});

// ../../node_modules/postgres-interval/index.js
var require_postgres_interval = __commonJS({
  "../../node_modules/postgres-interval/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var extend = require_mutable();
    module.exports = PostgresInterval;
    function PostgresInterval(raw3) {
      if (!(this instanceof PostgresInterval)) {
        return new PostgresInterval(raw3);
      }
      extend(this, parse(raw3));
    }
    __name(PostgresInterval, "PostgresInterval");
    var properties = ["seconds", "minutes", "hours", "days", "months", "years"];
    PostgresInterval.prototype.toPostgres = function() {
      var filtered = properties.filter(this.hasOwnProperty, this);
      if (this.milliseconds && filtered.indexOf("seconds") < 0) {
        filtered.push("seconds");
      }
      if (filtered.length === 0)
        return "0";
      return filtered.map(function(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/\.?0+$/, "");
        }
        return value + " " + property;
      }, this).join(" ");
    };
    var propertiesISOEquivalent = {
      years: "Y",
      months: "M",
      days: "D",
      hours: "H",
      minutes: "M",
      seconds: "S"
    };
    var dateProperties = ["years", "months", "days"];
    var timeProperties = ["hours", "minutes", "seconds"];
    PostgresInterval.prototype.toISOString = PostgresInterval.prototype.toISO = function() {
      var datePart = dateProperties.map(buildProperty, this).join("");
      var timePart = timeProperties.map(buildProperty, this).join("");
      return "P" + datePart + "T" + timePart;
      function buildProperty(property) {
        var value = this[property] || 0;
        if (property === "seconds" && this.milliseconds) {
          value = (value + this.milliseconds / 1e3).toFixed(6).replace(/0+$/, "");
        }
        return value + propertiesISOEquivalent[property];
      }
      __name(buildProperty, "buildProperty");
    };
    var NUMBER = "([+-]?\\d+)";
    var YEAR = NUMBER + "\\s+years?";
    var MONTH = NUMBER + "\\s+mons?";
    var DAY = NUMBER + "\\s+days?";
    var TIME = "([+-])?([\\d]*):(\\d\\d):(\\d\\d)\\.?(\\d{1,6})?";
    var INTERVAL = new RegExp([YEAR, MONTH, DAY, TIME].map(function(regexString) {
      return "(" + regexString + ")?";
    }).join("\\s*"));
    var positions = {
      years: 2,
      months: 4,
      days: 6,
      hours: 9,
      minutes: 10,
      seconds: 11,
      milliseconds: 12
    };
    var negatives = ["hours", "minutes", "seconds", "milliseconds"];
    function parseMilliseconds(fraction) {
      var microseconds = fraction + "000000".slice(fraction.length);
      return parseInt(microseconds, 10) / 1e3;
    }
    __name(parseMilliseconds, "parseMilliseconds");
    function parse(interval) {
      if (!interval)
        return {};
      var matches = INTERVAL.exec(interval);
      var isNegative = matches[8] === "-";
      return Object.keys(positions).reduce(function(parsed, property) {
        var position = positions[property];
        var value = matches[position];
        if (!value)
          return parsed;
        value = property === "milliseconds" ? parseMilliseconds(value) : parseInt(value, 10);
        if (!value)
          return parsed;
        if (isNegative && ~negatives.indexOf(property)) {
          value *= -1;
        }
        parsed[property] = value;
        return parsed;
      }, {});
    }
    __name(parse, "parse");
  }
});

// ../../node_modules/postgres-bytea/index.js
var require_postgres_bytea = __commonJS({
  "../../node_modules/postgres-bytea/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = /* @__PURE__ */ __name(function parseBytea(input) {
      if (/^\\x/.test(input)) {
        return new Buffer(input.substr(2), "hex");
      }
      var output = "";
      var i = 0;
      while (i < input.length) {
        if (input[i] !== "\\") {
          output += input[i];
          ++i;
        } else {
          if (/[0-7]{3}/.test(input.substr(i + 1, 3))) {
            output += String.fromCharCode(parseInt(input.substr(i + 1, 3), 8));
            i += 4;
          } else {
            var backslashes = 1;
            while (i + backslashes < input.length && input[i + backslashes] === "\\") {
              backslashes++;
            }
            for (var k = 0; k < Math.floor(backslashes / 2); ++k) {
              output += "\\";
            }
            i += Math.floor(backslashes / 2) * 2;
          }
        }
      }
      return new Buffer(output, "binary");
    }, "parseBytea");
  }
});

// ../../node_modules/pg-types/lib/textParsers.js
var require_textParsers = __commonJS({
  "../../node_modules/pg-types/lib/textParsers.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var array = require_postgres_array();
    var arrayParser = require_arrayParser();
    var parseDate = require_postgres_date();
    var parseInterval = require_postgres_interval();
    var parseByteA = require_postgres_bytea();
    function allowNull(fn) {
      return /* @__PURE__ */ __name(function nullAllowed(value) {
        if (value === null)
          return value;
        return fn(value);
      }, "nullAllowed");
    }
    __name(allowNull, "allowNull");
    function parseBool(value) {
      if (value === null)
        return value;
      return value === "TRUE" || value === "t" || value === "true" || value === "y" || value === "yes" || value === "on" || value === "1";
    }
    __name(parseBool, "parseBool");
    function parseBoolArray(value) {
      if (!value)
        return null;
      return array.parse(value, parseBool);
    }
    __name(parseBoolArray, "parseBoolArray");
    function parseBaseTenInt(string) {
      return parseInt(string, 10);
    }
    __name(parseBaseTenInt, "parseBaseTenInt");
    function parseIntegerArray(value) {
      if (!value)
        return null;
      return array.parse(value, allowNull(parseBaseTenInt));
    }
    __name(parseIntegerArray, "parseIntegerArray");
    function parseBigIntegerArray(value) {
      if (!value)
        return null;
      return array.parse(value, allowNull(function(entry) {
        return parseBigInteger(entry).trim();
      }));
    }
    __name(parseBigIntegerArray, "parseBigIntegerArray");
    var parsePointArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parsePoint(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parsePointArray");
    var parseFloatArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseFloat(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseFloatArray");
    var parseStringArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value);
      return p.parse();
    }, "parseStringArray");
    var parseDateArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseDate(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseDateArray");
    var parseIntervalArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      var p = arrayParser.create(value, function(entry) {
        if (entry !== null) {
          entry = parseInterval(entry);
        }
        return entry;
      });
      return p.parse();
    }, "parseIntervalArray");
    var parseByteAArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(parseByteA));
    }, "parseByteAArray");
    var parseInteger = /* @__PURE__ */ __name(function(value) {
      return parseInt(value, 10);
    }, "parseInteger");
    var parseBigInteger = /* @__PURE__ */ __name(function(value) {
      var valStr = String(value);
      if (/^\d+$/.test(valStr)) {
        return valStr;
      }
      return value;
    }, "parseBigInteger");
    var parseJsonArray = /* @__PURE__ */ __name(function(value) {
      if (!value) {
        return null;
      }
      return array.parse(value, allowNull(JSON.parse));
    }, "parseJsonArray");
    var parsePoint = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "(") {
        return null;
      }
      value = value.substring(1, value.length - 1).split(",");
      return {
        x: parseFloat(value[0]),
        y: parseFloat(value[1])
      };
    }, "parsePoint");
    var parseCircle = /* @__PURE__ */ __name(function(value) {
      if (value[0] !== "<" && value[1] !== "(") {
        return null;
      }
      var point = "(";
      var radius = "";
      var pointParsed = false;
      for (var i = 2; i < value.length - 1; i++) {
        if (!pointParsed) {
          point += value[i];
        }
        if (value[i] === ")") {
          pointParsed = true;
          continue;
        } else if (!pointParsed) {
          continue;
        }
        if (value[i] === ",") {
          continue;
        }
        radius += value[i];
      }
      var result = parsePoint(point);
      result.radius = parseFloat(radius);
      return result;
    }, "parseCircle");
    var init2 = /* @__PURE__ */ __name(function(register) {
      register(20, parseBigInteger);
      register(21, parseInteger);
      register(23, parseInteger);
      register(26, parseInteger);
      register(700, parseFloat);
      register(701, parseFloat);
      register(16, parseBool);
      register(1082, parseDate);
      register(1114, parseDate);
      register(1184, parseDate);
      register(600, parsePoint);
      register(651, parseStringArray);
      register(718, parseCircle);
      register(1e3, parseBoolArray);
      register(1001, parseByteAArray);
      register(1005, parseIntegerArray);
      register(1007, parseIntegerArray);
      register(1028, parseIntegerArray);
      register(1016, parseBigIntegerArray);
      register(1017, parsePointArray);
      register(1021, parseFloatArray);
      register(1022, parseFloatArray);
      register(1231, parseFloatArray);
      register(1014, parseStringArray);
      register(1015, parseStringArray);
      register(1008, parseStringArray);
      register(1009, parseStringArray);
      register(1040, parseStringArray);
      register(1041, parseStringArray);
      register(1115, parseDateArray);
      register(1182, parseDateArray);
      register(1185, parseDateArray);
      register(1186, parseInterval);
      register(1187, parseIntervalArray);
      register(17, parseByteA);
      register(114, JSON.parse.bind(JSON));
      register(3802, JSON.parse.bind(JSON));
      register(199, parseJsonArray);
      register(3807, parseJsonArray);
      register(3907, parseStringArray);
      register(2951, parseStringArray);
      register(791, parseStringArray);
      register(1183, parseStringArray);
      register(1270, parseStringArray);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});

// ../../node_modules/pg-int8/index.js
var require_pg_int8 = __commonJS({
  "../../node_modules/pg-int8/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BASE = 1e6;
    function readInt8(buffer) {
      var high = buffer.readInt32BE(0);
      var low = buffer.readUInt32BE(4);
      var sign2 = "";
      if (high < 0) {
        high = ~high + (low === 0);
        low = ~low + 1 >>> 0;
        sign2 = "-";
      }
      var result = "";
      var carry;
      var t;
      var digits;
      var pad;
      var l;
      var i;
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        high = high / BASE >>> 0;
        t = 4294967296 * carry + low;
        low = t / BASE >>> 0;
        digits = "" + (t - BASE * low);
        if (low === 0 && high === 0) {
          return sign2 + digits + result;
        }
        pad = "";
        l = 6 - digits.length;
        for (i = 0; i < l; i++) {
          pad += "0";
        }
        result = pad + digits + result;
      }
      {
        carry = high % BASE;
        t = 4294967296 * carry + low;
        digits = "" + t % BASE;
        return sign2 + digits + result;
      }
    }
    __name(readInt8, "readInt8");
    module.exports = readInt8;
  }
});

// ../../node_modules/pg-types/lib/binaryParsers.js
var require_binaryParsers = __commonJS({
  "../../node_modules/pg-types/lib/binaryParsers.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parseInt64 = require_pg_int8();
    var parseBits = /* @__PURE__ */ __name(function(data, bits, offset, invert, callback) {
      offset = offset || 0;
      invert = invert || false;
      callback = callback || function(lastValue, newValue, bits2) {
        return lastValue * Math.pow(2, bits2) + newValue;
      };
      var offsetBytes = offset >> 3;
      var inv = /* @__PURE__ */ __name(function(value) {
        if (invert) {
          return ~value & 255;
        }
        return value;
      }, "inv");
      var mask = 255;
      var firstBits = 8 - offset % 8;
      if (bits < firstBits) {
        mask = 255 << 8 - bits & 255;
        firstBits = bits;
      }
      if (offset) {
        mask = mask >> offset % 8;
      }
      var result = 0;
      if (offset % 8 + bits >= 8) {
        result = callback(0, inv(data[offsetBytes]) & mask, firstBits);
      }
      var bytes = bits + offset >> 3;
      for (var i = offsetBytes + 1; i < bytes; i++) {
        result = callback(result, inv(data[i]), 8);
      }
      var lastBits = (bits + offset) % 8;
      if (lastBits > 0) {
        result = callback(result, inv(data[bytes]) >> 8 - lastBits, lastBits);
      }
      return result;
    }, "parseBits");
    var parseFloatFromBits = /* @__PURE__ */ __name(function(data, precisionBits, exponentBits) {
      var bias = Math.pow(2, exponentBits - 1) - 1;
      var sign2 = parseBits(data, 1);
      var exponent = parseBits(data, exponentBits, 1);
      if (exponent === 0) {
        return 0;
      }
      var precisionBitsCounter = 1;
      var parsePrecisionBits = /* @__PURE__ */ __name(function(lastValue, newValue, bits) {
        if (lastValue === 0) {
          lastValue = 1;
        }
        for (var i = 1; i <= bits; i++) {
          precisionBitsCounter /= 2;
          if ((newValue & 1 << bits - i) > 0) {
            lastValue += precisionBitsCounter;
          }
        }
        return lastValue;
      }, "parsePrecisionBits");
      var mantissa = parseBits(data, precisionBits, exponentBits + 1, false, parsePrecisionBits);
      if (exponent == Math.pow(2, exponentBits + 1) - 1) {
        if (mantissa === 0) {
          return sign2 === 0 ? Infinity : -Infinity;
        }
        return NaN;
      }
      return (sign2 === 0 ? 1 : -1) * Math.pow(2, exponent - bias) * mantissa;
    }, "parseFloatFromBits");
    var parseInt16 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 15, 1, true) + 1);
      }
      return parseBits(value, 15, 1);
    }, "parseInt16");
    var parseInt32 = /* @__PURE__ */ __name(function(value) {
      if (parseBits(value, 1) == 1) {
        return -1 * (parseBits(value, 31, 1, true) + 1);
      }
      return parseBits(value, 31, 1);
    }, "parseInt32");
    var parseFloat32 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 23, 8);
    }, "parseFloat32");
    var parseFloat64 = /* @__PURE__ */ __name(function(value) {
      return parseFloatFromBits(value, 52, 11);
    }, "parseFloat64");
    var parseNumeric = /* @__PURE__ */ __name(function(value) {
      var sign2 = parseBits(value, 16, 32);
      if (sign2 == 49152) {
        return NaN;
      }
      var weight = Math.pow(1e4, parseBits(value, 16, 16));
      var result = 0;
      var digits = [];
      var ndigits = parseBits(value, 16);
      for (var i = 0; i < ndigits; i++) {
        result += parseBits(value, 16, 64 + 16 * i) * weight;
        weight /= 1e4;
      }
      var scale = Math.pow(10, parseBits(value, 16, 48));
      return (sign2 === 0 ? 1 : -1) * Math.round(result * scale) / scale;
    }, "parseNumeric");
    var parseDate = /* @__PURE__ */ __name(function(isUTC, value) {
      var sign2 = parseBits(value, 1);
      var rawValue = parseBits(value, 63, 1);
      var result = new Date((sign2 === 0 ? 1 : -1) * rawValue / 1e3 + 9466848e5);
      if (!isUTC) {
        result.setTime(result.getTime() + result.getTimezoneOffset() * 6e4);
      }
      result.usec = rawValue % 1e3;
      result.getMicroSeconds = function() {
        return this.usec;
      };
      result.setMicroSeconds = function(value2) {
        this.usec = value2;
      };
      result.getUTCMicroSeconds = function() {
        return this.usec;
      };
      return result;
    }, "parseDate");
    var parseArray2 = /* @__PURE__ */ __name(function(value) {
      var dim2 = parseBits(value, 32);
      var flags = parseBits(value, 32, 32);
      var elementType = parseBits(value, 32, 64);
      var offset = 96;
      var dims = [];
      for (var i = 0; i < dim2; i++) {
        dims[i] = parseBits(value, 32, offset);
        offset += 32;
        offset += 32;
      }
      var parseElement = /* @__PURE__ */ __name(function(elementType2) {
        var length = parseBits(value, 32, offset);
        offset += 32;
        if (length == 4294967295) {
          return null;
        }
        var result;
        if (elementType2 == 23 || elementType2 == 20) {
          result = parseBits(value, length * 8, offset);
          offset += length * 8;
          return result;
        } else if (elementType2 == 25) {
          result = value.toString(this.encoding, offset >> 3, (offset += length << 3) >> 3);
          return result;
        } else {
          console.log("ERROR: ElementType not implemented: " + elementType2);
        }
      }, "parseElement");
      var parse = /* @__PURE__ */ __name(function(dimension, elementType2) {
        var array = [];
        var i2;
        if (dimension.length > 1) {
          var count3 = dimension.shift();
          for (i2 = 0; i2 < count3; i2++) {
            array[i2] = parse(dimension, elementType2);
          }
          dimension.unshift(count3);
        } else {
          for (i2 = 0; i2 < dimension[0]; i2++) {
            array[i2] = parseElement(elementType2);
          }
        }
        return array;
      }, "parse");
      return parse(dims, elementType);
    }, "parseArray");
    var parseText = /* @__PURE__ */ __name(function(value) {
      return value.toString("utf8");
    }, "parseText");
    var parseBool = /* @__PURE__ */ __name(function(value) {
      if (value === null)
        return null;
      return parseBits(value, 8) > 0;
    }, "parseBool");
    var init2 = /* @__PURE__ */ __name(function(register) {
      register(20, parseInt64);
      register(21, parseInt16);
      register(23, parseInt32);
      register(26, parseInt32);
      register(1700, parseNumeric);
      register(700, parseFloat32);
      register(701, parseFloat64);
      register(16, parseBool);
      register(1114, parseDate.bind(null, false));
      register(1184, parseDate.bind(null, true));
      register(1e3, parseArray2);
      register(1007, parseArray2);
      register(1016, parseArray2);
      register(1008, parseArray2);
      register(1009, parseArray2);
      register(25, parseText);
    }, "init");
    module.exports = {
      init: init2
    };
  }
});

// ../../node_modules/pg-types/lib/builtins.js
var require_builtins = __commonJS({
  "../../node_modules/pg-types/lib/builtins.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      BOOL: 16,
      BYTEA: 17,
      CHAR: 18,
      INT8: 20,
      INT2: 21,
      INT4: 23,
      REGPROC: 24,
      TEXT: 25,
      OID: 26,
      TID: 27,
      XID: 28,
      CID: 29,
      JSON: 114,
      XML: 142,
      PG_NODE_TREE: 194,
      SMGR: 210,
      PATH: 602,
      POLYGON: 604,
      CIDR: 650,
      FLOAT4: 700,
      FLOAT8: 701,
      ABSTIME: 702,
      RELTIME: 703,
      TINTERVAL: 704,
      CIRCLE: 718,
      MACADDR8: 774,
      MONEY: 790,
      MACADDR: 829,
      INET: 869,
      ACLITEM: 1033,
      BPCHAR: 1042,
      VARCHAR: 1043,
      DATE: 1082,
      TIME: 1083,
      TIMESTAMP: 1114,
      TIMESTAMPTZ: 1184,
      INTERVAL: 1186,
      TIMETZ: 1266,
      BIT: 1560,
      VARBIT: 1562,
      NUMERIC: 1700,
      REFCURSOR: 1790,
      REGPROCEDURE: 2202,
      REGOPER: 2203,
      REGOPERATOR: 2204,
      REGCLASS: 2205,
      REGTYPE: 2206,
      UUID: 2950,
      TXID_SNAPSHOT: 2970,
      PG_LSN: 3220,
      PG_NDISTINCT: 3361,
      PG_DEPENDENCIES: 3402,
      TSVECTOR: 3614,
      TSQUERY: 3615,
      GTSVECTOR: 3642,
      REGCONFIG: 3734,
      REGDICTIONARY: 3769,
      JSONB: 3802,
      REGNAMESPACE: 4089,
      REGROLE: 4096
    };
  }
});

// ../../node_modules/pg-types/index.js
var require_pg_types = __commonJS({
  "../../node_modules/pg-types/index.js"(exports) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var textParsers = require_textParsers();
    var binaryParsers = require_binaryParsers();
    var arrayParser = require_arrayParser();
    var builtinTypes = require_builtins();
    exports.getTypeParser = getTypeParser2;
    exports.setTypeParser = setTypeParser;
    exports.arrayParser = arrayParser;
    exports.builtins = builtinTypes;
    var typeParsers = {
      text: {},
      binary: {}
    };
    function noParse(val) {
      return String(val);
    }
    __name(noParse, "noParse");
    function getTypeParser2(oid, format2) {
      format2 = format2 || "text";
      if (!typeParsers[format2]) {
        return noParse;
      }
      return typeParsers[format2][oid] || noParse;
    }
    __name(getTypeParser2, "getTypeParser");
    function setTypeParser(oid, format2, parseFn) {
      if (typeof format2 == "function") {
        parseFn = format2;
        format2 = "text";
      }
      typeParsers[format2][oid] = parseFn;
    }
    __name(setTypeParser, "setTypeParser");
    textParsers.init(function(oid, converter) {
      typeParsers.text[oid] = converter;
    });
    binaryParsers.init(function(oid, converter) {
      typeParsers.binary[oid] = converter;
    });
  }
});

// ../../node_modules/pg/lib/defaults.js
var require_defaults = __commonJS({
  "../../node_modules/pg/lib/defaults.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = {
      // database host. defaults to localhost
      host: "localhost",
      // database user's name
      user: process.platform === "win32" ? process.env.USERNAME : process.env.USER,
      // name of database to connect
      database: void 0,
      // database user's password
      password: null,
      // a Postgres connection string to be used instead of setting individual connection items
      // NOTE:  Setting this value will cause it to override any other value (such as database or user) defined
      // in the defaults object.
      connectionString: void 0,
      // database port
      port: 5432,
      // number of rows to return at a time from a prepared statement's
      // portal. 0 will return all rows at once
      rows: 0,
      // binary result mode
      binary: false,
      // Connection pool options - see https://github.com/brianc/node-pg-pool
      // number of connections to use in connection pool
      // 0 will disable connection pooling
      max: 10,
      // max milliseconds a client can go unused before it is removed
      // from the pool and destroyed
      idleTimeoutMillis: 3e4,
      client_encoding: "",
      ssl: false,
      application_name: void 0,
      fallback_application_name: void 0,
      options: void 0,
      parseInputDatesAsUTC: false,
      // max milliseconds any query using this connection will execute for before timing out in error.
      // false=unlimited
      statement_timeout: false,
      // Abort any statement that waits longer than the specified duration in milliseconds while attempting to acquire a lock.
      // false=unlimited
      lock_timeout: false,
      // Terminate any session with an open transaction that has been idle for longer than the specified duration in milliseconds
      // false=unlimited
      idle_in_transaction_session_timeout: false,
      // max milliseconds to wait for query to complete (client side)
      query_timeout: false,
      connect_timeout: 0,
      keepalives: 1,
      keepalives_idle: 0
    };
    var pgTypes = require_pg_types();
    var parseBigInteger = pgTypes.getTypeParser(20, "text");
    var parseBigIntegerArray = pgTypes.getTypeParser(1016, "text");
    module.exports.__defineSetter__("parseInt8", function(val) {
      pgTypes.setTypeParser(20, "text", val ? pgTypes.getTypeParser(23, "text") : parseBigInteger);
      pgTypes.setTypeParser(1016, "text", val ? pgTypes.getTypeParser(1007, "text") : parseBigIntegerArray);
    });
  }
});

// ../../node_modules/pg/lib/utils.js
var require_utils = __commonJS({
  "../../node_modules/pg/lib/utils.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var defaults2 = require_defaults();
    function escapeElement(elementRepresentation) {
      const escaped = elementRepresentation.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return '"' + escaped + '"';
    }
    __name(escapeElement, "escapeElement");
    function arrayString(val) {
      let result = "{";
      for (let i = 0; i < val.length; i++) {
        if (i > 0) {
          result = result + ",";
        }
        if (val[i] === null || typeof val[i] === "undefined") {
          result = result + "NULL";
        } else if (Array.isArray(val[i])) {
          result = result + arrayString(val[i]);
        } else if (ArrayBuffer.isView(val[i])) {
          let item = val[i];
          if (!(item instanceof Buffer)) {
            const buf = Buffer.from(item.buffer, item.byteOffset, item.byteLength);
            if (buf.length === item.byteLength) {
              item = buf;
            } else {
              item = buf.slice(item.byteOffset, item.byteOffset + item.byteLength);
            }
          }
          result += "\\\\x" + item.toString("hex");
        } else {
          result += escapeElement(prepareValue(val[i]));
        }
      }
      result = result + "}";
      return result;
    }
    __name(arrayString, "arrayString");
    var prepareValue = /* @__PURE__ */ __name(function(val, seen) {
      if (val == null) {
        return null;
      }
      if (typeof val === "object") {
        if (val instanceof Buffer) {
          return val;
        }
        if (ArrayBuffer.isView(val)) {
          const buf = Buffer.from(val.buffer, val.byteOffset, val.byteLength);
          if (buf.length === val.byteLength) {
            return buf;
          }
          return buf.slice(val.byteOffset, val.byteOffset + val.byteLength);
        }
        if (val instanceof Date) {
          if (defaults2.parseInputDatesAsUTC) {
            return dateToStringUTC(val);
          } else {
            return dateToString(val);
          }
        }
        if (Array.isArray(val)) {
          return arrayString(val);
        }
        return prepareObject(val, seen);
      }
      return val.toString();
    }, "prepareValue");
    function prepareObject(val, seen) {
      if (val && typeof val.toPostgres === "function") {
        seen = seen || [];
        if (seen.indexOf(val) !== -1) {
          throw new Error('circular reference detected while preparing "' + val + '" for query');
        }
        seen.push(val);
        return prepareValue(val.toPostgres(prepareValue), seen);
      }
      return JSON.stringify(val);
    }
    __name(prepareObject, "prepareObject");
    function dateToString(date) {
      let offset = -date.getTimezoneOffset();
      let year = date.getFullYear();
      const isBCYear = year < 1;
      if (isBCYear)
        year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + "T" + String(date.getHours()).padStart(2, "0") + ":" + String(date.getMinutes()).padStart(2, "0") + ":" + String(date.getSeconds()).padStart(2, "0") + "." + String(date.getMilliseconds()).padStart(3, "0");
      if (offset < 0) {
        ret += "-";
        offset *= -1;
      } else {
        ret += "+";
      }
      ret += String(Math.floor(offset / 60)).padStart(2, "0") + ":" + String(offset % 60).padStart(2, "0");
      if (isBCYear)
        ret += " BC";
      return ret;
    }
    __name(dateToString, "dateToString");
    function dateToStringUTC(date) {
      let year = date.getUTCFullYear();
      const isBCYear = year < 1;
      if (isBCYear)
        year = Math.abs(year) + 1;
      let ret = String(year).padStart(4, "0") + "-" + String(date.getUTCMonth() + 1).padStart(2, "0") + "-" + String(date.getUTCDate()).padStart(2, "0") + "T" + String(date.getUTCHours()).padStart(2, "0") + ":" + String(date.getUTCMinutes()).padStart(2, "0") + ":" + String(date.getUTCSeconds()).padStart(2, "0") + "." + String(date.getUTCMilliseconds()).padStart(3, "0");
      ret += "+00:00";
      if (isBCYear)
        ret += " BC";
      return ret;
    }
    __name(dateToStringUTC, "dateToStringUTC");
    function normalizeQueryConfig(config2, values, callback) {
      config2 = typeof config2 === "string" ? { text: config2 } : config2;
      if (values) {
        if (typeof values === "function") {
          config2.callback = values;
        } else {
          config2.values = values;
        }
      }
      if (callback) {
        config2.callback = callback;
      }
      return config2;
    }
    __name(normalizeQueryConfig, "normalizeQueryConfig");
    var escapeIdentifier2 = /* @__PURE__ */ __name(function(str) {
      return '"' + str.replace(/"/g, '""') + '"';
    }, "escapeIdentifier");
    var escapeLiteral2 = /* @__PURE__ */ __name(function(str) {
      let hasBackslash = false;
      let escaped = "'";
      for (let i = 0; i < str.length; i++) {
        const c = str[i];
        if (c === "'") {
          escaped += c + c;
        } else if (c === "\\") {
          escaped += c + c;
          hasBackslash = true;
        } else {
          escaped += c;
        }
      }
      escaped += "'";
      if (hasBackslash === true) {
        escaped = " E" + escaped;
      }
      return escaped;
    }, "escapeLiteral");
    module.exports = {
      prepareValue: /* @__PURE__ */ __name(function prepareValueWrapper(value) {
        return prepareValue(value);
      }, "prepareValueWrapper"),
      normalizeQueryConfig,
      escapeIdentifier: escapeIdentifier2,
      escapeLiteral: escapeLiteral2
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs
var subtle;
var init_web = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/crypto/web.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    subtle = globalThis.crypto?.subtle;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs
var webcrypto, createCipher, createDecipher, pseudoRandomBytes, createCipheriv, createDecipheriv, createECDH, createSign, createVerify, diffieHellman, getCipherInfo, privateDecrypt, privateEncrypt, publicDecrypt, publicEncrypt, sign, verify, hash, Cipher, Cipheriv, Decipher, Decipheriv, ECDH, Sign, Verify;
var init_node = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/crypto/node.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    webcrypto = new Proxy(globalThis.crypto, { get(_, key) {
      if (key === "CryptoKey") {
        return globalThis.CryptoKey;
      }
      if (typeof globalThis.crypto[key] === "function") {
        return globalThis.crypto[key].bind(globalThis.crypto);
      }
      return globalThis.crypto[key];
    } });
    createCipher = /* @__PURE__ */ notImplemented("crypto.createCipher");
    createDecipher = /* @__PURE__ */ notImplemented("crypto.createDecipher");
    pseudoRandomBytes = /* @__PURE__ */ notImplemented("crypto.pseudoRandomBytes");
    createCipheriv = /* @__PURE__ */ notImplemented("crypto.createCipheriv");
    createDecipheriv = /* @__PURE__ */ notImplemented("crypto.createDecipheriv");
    createECDH = /* @__PURE__ */ notImplemented("crypto.createECDH");
    createSign = /* @__PURE__ */ notImplemented("crypto.createSign");
    createVerify = /* @__PURE__ */ notImplemented("crypto.createVerify");
    diffieHellman = /* @__PURE__ */ notImplemented("crypto.diffieHellman");
    getCipherInfo = /* @__PURE__ */ notImplemented("crypto.getCipherInfo");
    privateDecrypt = /* @__PURE__ */ notImplemented("crypto.privateDecrypt");
    privateEncrypt = /* @__PURE__ */ notImplemented("crypto.privateEncrypt");
    publicDecrypt = /* @__PURE__ */ notImplemented("crypto.publicDecrypt");
    publicEncrypt = /* @__PURE__ */ notImplemented("crypto.publicEncrypt");
    sign = /* @__PURE__ */ notImplemented("crypto.sign");
    verify = /* @__PURE__ */ notImplemented("crypto.verify");
    hash = /* @__PURE__ */ notImplemented("crypto.hash");
    Cipher = /* @__PURE__ */ notImplementedClass("crypto.Cipher");
    Cipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Cipheriv"
      // @ts-expect-error not typed yet
    );
    Decipher = /* @__PURE__ */ notImplementedClass("crypto.Decipher");
    Decipheriv = /* @__PURE__ */ notImplementedClass(
      "crypto.Decipheriv"
      // @ts-expect-error not typed yet
    );
    ECDH = /* @__PURE__ */ notImplementedClass("crypto.ECDH");
    Sign = /* @__PURE__ */ notImplementedClass("crypto.Sign");
    Verify = /* @__PURE__ */ notImplementedClass("crypto.Verify");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs
var SSL_OP_ALL, SSL_OP_ALLOW_NO_DHE_KEX, SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION, SSL_OP_CIPHER_SERVER_PREFERENCE, SSL_OP_CISCO_ANYCONNECT, SSL_OP_COOKIE_EXCHANGE, SSL_OP_CRYPTOPRO_TLSEXT_BUG, SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS, SSL_OP_LEGACY_SERVER_CONNECT, SSL_OP_NO_COMPRESSION, SSL_OP_NO_ENCRYPT_THEN_MAC, SSL_OP_NO_QUERY_MTU, SSL_OP_NO_RENEGOTIATION, SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION, SSL_OP_NO_SSLv2, SSL_OP_NO_SSLv3, SSL_OP_NO_TICKET, SSL_OP_NO_TLSv1, SSL_OP_NO_TLSv1_1, SSL_OP_NO_TLSv1_2, SSL_OP_NO_TLSv1_3, SSL_OP_PRIORITIZE_CHACHA, SSL_OP_TLS_ROLLBACK_BUG, ENGINE_METHOD_RSA, ENGINE_METHOD_DSA, ENGINE_METHOD_DH, ENGINE_METHOD_RAND, ENGINE_METHOD_EC, ENGINE_METHOD_CIPHERS, ENGINE_METHOD_DIGESTS, ENGINE_METHOD_PKEY_METHS, ENGINE_METHOD_PKEY_ASN1_METHS, ENGINE_METHOD_ALL, ENGINE_METHOD_NONE, DH_CHECK_P_NOT_SAFE_PRIME, DH_CHECK_P_NOT_PRIME, DH_UNABLE_TO_CHECK_GENERATOR, DH_NOT_SUITABLE_GENERATOR, RSA_PKCS1_PADDING, RSA_NO_PADDING, RSA_PKCS1_OAEP_PADDING, RSA_X931_PADDING, RSA_PKCS1_PSS_PADDING, RSA_PSS_SALTLEN_DIGEST, RSA_PSS_SALTLEN_MAX_SIGN, RSA_PSS_SALTLEN_AUTO, POINT_CONVERSION_COMPRESSED, POINT_CONVERSION_UNCOMPRESSED, POINT_CONVERSION_HYBRID, defaultCoreCipherList, defaultCipherList, OPENSSL_VERSION_NUMBER, TLS1_VERSION, TLS1_1_VERSION, TLS1_2_VERSION, TLS1_3_VERSION;
var init_constants = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/crypto/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SSL_OP_ALL = 2147485776;
    SSL_OP_ALLOW_NO_DHE_KEX = 1024;
    SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION = 262144;
    SSL_OP_CIPHER_SERVER_PREFERENCE = 4194304;
    SSL_OP_CISCO_ANYCONNECT = 32768;
    SSL_OP_COOKIE_EXCHANGE = 8192;
    SSL_OP_CRYPTOPRO_TLSEXT_BUG = 2147483648;
    SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS = 2048;
    SSL_OP_LEGACY_SERVER_CONNECT = 4;
    SSL_OP_NO_COMPRESSION = 131072;
    SSL_OP_NO_ENCRYPT_THEN_MAC = 524288;
    SSL_OP_NO_QUERY_MTU = 4096;
    SSL_OP_NO_RENEGOTIATION = 1073741824;
    SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION = 65536;
    SSL_OP_NO_SSLv2 = 0;
    SSL_OP_NO_SSLv3 = 33554432;
    SSL_OP_NO_TICKET = 16384;
    SSL_OP_NO_TLSv1 = 67108864;
    SSL_OP_NO_TLSv1_1 = 268435456;
    SSL_OP_NO_TLSv1_2 = 134217728;
    SSL_OP_NO_TLSv1_3 = 536870912;
    SSL_OP_PRIORITIZE_CHACHA = 2097152;
    SSL_OP_TLS_ROLLBACK_BUG = 8388608;
    ENGINE_METHOD_RSA = 1;
    ENGINE_METHOD_DSA = 2;
    ENGINE_METHOD_DH = 4;
    ENGINE_METHOD_RAND = 8;
    ENGINE_METHOD_EC = 2048;
    ENGINE_METHOD_CIPHERS = 64;
    ENGINE_METHOD_DIGESTS = 128;
    ENGINE_METHOD_PKEY_METHS = 512;
    ENGINE_METHOD_PKEY_ASN1_METHS = 1024;
    ENGINE_METHOD_ALL = 65535;
    ENGINE_METHOD_NONE = 0;
    DH_CHECK_P_NOT_SAFE_PRIME = 2;
    DH_CHECK_P_NOT_PRIME = 1;
    DH_UNABLE_TO_CHECK_GENERATOR = 4;
    DH_NOT_SUITABLE_GENERATOR = 8;
    RSA_PKCS1_PADDING = 1;
    RSA_NO_PADDING = 3;
    RSA_PKCS1_OAEP_PADDING = 4;
    RSA_X931_PADDING = 5;
    RSA_PKCS1_PSS_PADDING = 6;
    RSA_PSS_SALTLEN_DIGEST = -1;
    RSA_PSS_SALTLEN_MAX_SIGN = -2;
    RSA_PSS_SALTLEN_AUTO = -2;
    POINT_CONVERSION_COMPRESSED = 2;
    POINT_CONVERSION_UNCOMPRESSED = 4;
    POINT_CONVERSION_HYBRID = 6;
    defaultCoreCipherList = "";
    defaultCipherList = "";
    OPENSSL_VERSION_NUMBER = 0;
    TLS1_VERSION = 0;
    TLS1_1_VERSION = 0;
    TLS1_2_VERSION = 0;
    TLS1_3_VERSION = 0;
  }
});

// ../../node_modules/unenv/dist/runtime/node/crypto.mjs
var constants;
var init_crypto = __esm({
  "../../node_modules/unenv/dist/runtime/node/crypto.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_constants();
    init_web();
    init_node();
    constants = {
      OPENSSL_VERSION_NUMBER,
      SSL_OP_ALL,
      SSL_OP_ALLOW_NO_DHE_KEX,
      SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
      SSL_OP_CIPHER_SERVER_PREFERENCE,
      SSL_OP_CISCO_ANYCONNECT,
      SSL_OP_COOKIE_EXCHANGE,
      SSL_OP_CRYPTOPRO_TLSEXT_BUG,
      SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS,
      SSL_OP_LEGACY_SERVER_CONNECT,
      SSL_OP_NO_COMPRESSION,
      SSL_OP_NO_ENCRYPT_THEN_MAC,
      SSL_OP_NO_QUERY_MTU,
      SSL_OP_NO_RENEGOTIATION,
      SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION,
      SSL_OP_NO_SSLv2,
      SSL_OP_NO_SSLv3,
      SSL_OP_NO_TICKET,
      SSL_OP_NO_TLSv1,
      SSL_OP_NO_TLSv1_1,
      SSL_OP_NO_TLSv1_2,
      SSL_OP_NO_TLSv1_3,
      SSL_OP_PRIORITIZE_CHACHA,
      SSL_OP_TLS_ROLLBACK_BUG,
      ENGINE_METHOD_RSA,
      ENGINE_METHOD_DSA,
      ENGINE_METHOD_DH,
      ENGINE_METHOD_RAND,
      ENGINE_METHOD_EC,
      ENGINE_METHOD_CIPHERS,
      ENGINE_METHOD_DIGESTS,
      ENGINE_METHOD_PKEY_METHS,
      ENGINE_METHOD_PKEY_ASN1_METHS,
      ENGINE_METHOD_ALL,
      ENGINE_METHOD_NONE,
      DH_CHECK_P_NOT_SAFE_PRIME,
      DH_CHECK_P_NOT_PRIME,
      DH_UNABLE_TO_CHECK_GENERATOR,
      DH_NOT_SUITABLE_GENERATOR,
      RSA_PKCS1_PADDING,
      RSA_NO_PADDING,
      RSA_PKCS1_OAEP_PADDING,
      RSA_X931_PADDING,
      RSA_PKCS1_PSS_PADDING,
      RSA_PSS_SALTLEN_DIGEST,
      RSA_PSS_SALTLEN_MAX_SIGN,
      RSA_PSS_SALTLEN_AUTO,
      defaultCoreCipherList,
      TLS1_VERSION,
      TLS1_1_VERSION,
      TLS1_2_VERSION,
      TLS1_3_VERSION,
      POINT_CONVERSION_COMPRESSED,
      POINT_CONVERSION_UNCOMPRESSED,
      POINT_CONVERSION_HYBRID,
      defaultCipherList
    };
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs
var workerdCrypto, Certificate, DiffieHellman, DiffieHellmanGroup, Hash, Hmac, KeyObject, X509Certificate, checkPrime, checkPrimeSync, createDiffieHellman, createDiffieHellmanGroup, createHash, createHmac, createPrivateKey, createPublicKey, createSecretKey, generateKey, generateKeyPair, generateKeyPairSync, generateKeySync, generatePrime, generatePrimeSync, getCiphers, getCurves, getDiffieHellman, getFips, getHashes, hkdf, hkdfSync, pbkdf2, pbkdf2Sync, randomBytes, randomFill, randomFillSync, randomInt, randomUUID, scrypt, scryptSync, secureHeapUsed, setEngine, setFips, subtle2, timingSafeEqual, getRandomValues, webcrypto2, fips, crypto_default;
var init_crypto2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/crypto.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto();
    workerdCrypto = process.getBuiltinModule("node:crypto");
    ({
      Certificate,
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      X509Certificate,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      scrypt,
      scryptSync,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual
    } = workerdCrypto);
    getRandomValues = workerdCrypto.getRandomValues.bind(
      workerdCrypto.webcrypto
    );
    webcrypto2 = {
      // @ts-expect-error unenv has unknown type
      CryptoKey: webcrypto.CryptoKey,
      getRandomValues,
      randomUUID,
      subtle: subtle2
    };
    fips = workerdCrypto.fips;
    crypto_default = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      Certificate,
      Cipher,
      Cipheriv,
      Decipher,
      Decipheriv,
      ECDH,
      Sign,
      Verify,
      X509Certificate,
      // @ts-expect-error @types/node is out of date - this is a bug in typings
      constants,
      // @ts-expect-error unenv has unknown type
      createCipheriv,
      // @ts-expect-error unenv has unknown type
      createDecipheriv,
      // @ts-expect-error unenv has unknown type
      createECDH,
      // @ts-expect-error unenv has unknown type
      createSign,
      // @ts-expect-error unenv has unknown type
      createVerify,
      // @ts-expect-error unenv has unknown type
      diffieHellman,
      // @ts-expect-error unenv has unknown type
      getCipherInfo,
      // @ts-expect-error unenv has unknown type
      hash,
      // @ts-expect-error unenv has unknown type
      privateDecrypt,
      // @ts-expect-error unenv has unknown type
      privateEncrypt,
      // @ts-expect-error unenv has unknown type
      publicDecrypt,
      // @ts-expect-error unenv has unknown type
      publicEncrypt,
      scrypt,
      scryptSync,
      // @ts-expect-error unenv has unknown type
      sign,
      // @ts-expect-error unenv has unknown type
      verify,
      // default-only export from unenv
      // @ts-expect-error unenv has unknown type
      createCipher,
      // @ts-expect-error unenv has unknown type
      createDecipher,
      // @ts-expect-error unenv has unknown type
      pseudoRandomBytes,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      DiffieHellman,
      DiffieHellmanGroup,
      Hash,
      Hmac,
      KeyObject,
      checkPrime,
      checkPrimeSync,
      createDiffieHellman,
      createDiffieHellmanGroup,
      createHash,
      createHmac,
      createPrivateKey,
      createPublicKey,
      createSecretKey,
      generateKey,
      generateKeyPair,
      generateKeyPairSync,
      generateKeySync,
      generatePrime,
      generatePrimeSync,
      getCiphers,
      getCurves,
      getDiffieHellman,
      getFips,
      getHashes,
      getRandomValues,
      hkdf,
      hkdfSync,
      pbkdf2,
      pbkdf2Sync,
      randomBytes,
      randomFill,
      randomFillSync,
      randomInt,
      randomUUID,
      secureHeapUsed,
      setEngine,
      setFips,
      subtle: subtle2,
      timingSafeEqual,
      // default-only export from workerd
      fips,
      // special-cased deep merged symbols
      webcrypto: webcrypto2
    };
  }
});

// node-built-in-modules:crypto
var require_crypto = __commonJS({
  "node-built-in-modules:crypto"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_crypto2();
    module.exports = crypto_default;
  }
});

// ../../node_modules/pg/lib/crypto/utils-legacy.js
var require_utils_legacy = __commonJS({
  "../../node_modules/pg/lib/crypto/utils-legacy.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    function md5(string) {
      return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
    }
    __name(md5, "md5");
    function postgresMd5PasswordHash(user, password, salt) {
      const inner = md5(password + user);
      const outer = md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    function sha256(text) {
      return nodeCrypto.createHash("sha256").update(text).digest();
    }
    __name(sha256, "sha256");
    function hashByName(hashName, text) {
      hashName = hashName.replace(/(\D)-/, "$1");
      return nodeCrypto.createHash(hashName).update(text).digest();
    }
    __name(hashByName, "hashByName");
    function hmacSha256(key, msg) {
      return nodeCrypto.createHmac("sha256", key).update(msg).digest();
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      return nodeCrypto.pbkdf2Sync(password, salt, iterations, 32, "sha256");
    }
    __name(deriveKey, "deriveKey");
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes: nodeCrypto.randomBytes,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
  }
});

// ../../node_modules/pg/lib/crypto/utils-webcrypto.js
var require_utils_webcrypto = __commonJS({
  "../../node_modules/pg/lib/crypto/utils-webcrypto.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var nodeCrypto = require_crypto();
    module.exports = {
      postgresMd5PasswordHash,
      randomBytes: randomBytes2,
      deriveKey,
      sha256,
      hashByName,
      hmacSha256,
      md5
    };
    var webCrypto = nodeCrypto.webcrypto || globalThis.crypto;
    var subtleCrypto = webCrypto.subtle;
    var textEncoder = new TextEncoder();
    function randomBytes2(length) {
      return webCrypto.getRandomValues(Buffer.alloc(length));
    }
    __name(randomBytes2, "randomBytes");
    async function md5(string) {
      try {
        return nodeCrypto.createHash("md5").update(string, "utf-8").digest("hex");
      } catch (e) {
        const data = typeof string === "string" ? textEncoder.encode(string) : string;
        const hash2 = await subtleCrypto.digest("MD5", data);
        return Array.from(new Uint8Array(hash2)).map((b) => b.toString(16).padStart(2, "0")).join("");
      }
    }
    __name(md5, "md5");
    async function postgresMd5PasswordHash(user, password, salt) {
      const inner = await md5(password + user);
      const outer = await md5(Buffer.concat([Buffer.from(inner), salt]));
      return "md5" + outer;
    }
    __name(postgresMd5PasswordHash, "postgresMd5PasswordHash");
    async function sha256(text) {
      return await subtleCrypto.digest("SHA-256", text);
    }
    __name(sha256, "sha256");
    async function hashByName(hashName, text) {
      return await subtleCrypto.digest(hashName, text);
    }
    __name(hashByName, "hashByName");
    async function hmacSha256(keyBuffer, msg) {
      const key = await subtleCrypto.importKey("raw", keyBuffer, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
      return await subtleCrypto.sign("HMAC", key, textEncoder.encode(msg));
    }
    __name(hmacSha256, "hmacSha256");
    async function deriveKey(password, salt, iterations) {
      const key = await subtleCrypto.importKey("raw", textEncoder.encode(password), "PBKDF2", false, ["deriveBits"]);
      const params = { name: "PBKDF2", hash: "SHA-256", salt, iterations };
      return await subtleCrypto.deriveBits(params, key, 32 * 8, ["deriveBits"]);
    }
    __name(deriveKey, "deriveKey");
  }
});

// ../../node_modules/pg/lib/crypto/utils.js
var require_utils2 = __commonJS({
  "../../node_modules/pg/lib/crypto/utils.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var useLegacyCrypto = parseInt(process.versions && process.versions.node && process.versions.node.split(".")[0]) < 15;
    if (useLegacyCrypto) {
      module.exports = require_utils_legacy();
    } else {
      module.exports = require_utils_webcrypto();
    }
  }
});

// ../../node_modules/pg/lib/crypto/cert-signatures.js
var require_cert_signatures = __commonJS({
  "../../node_modules/pg/lib/crypto/cert-signatures.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function x509Error(msg, cert) {
      return new Error("SASL channel binding: " + msg + " when parsing public certificate " + cert.toString("base64"));
    }
    __name(x509Error, "x509Error");
    function readASN1Length(data, index) {
      let length = data[index++];
      if (length < 128)
        return { length, index };
      const lengthBytes = length & 127;
      if (lengthBytes > 4)
        throw x509Error("bad length", data);
      length = 0;
      for (let i = 0; i < lengthBytes; i++) {
        length = length << 8 | data[index++];
      }
      return { length, index };
    }
    __name(readASN1Length, "readASN1Length");
    function readASN1OID(data, index) {
      if (data[index++] !== 6)
        throw x509Error("non-OID data", data);
      const { length: OIDLength, index: indexAfterOIDLength } = readASN1Length(data, index);
      index = indexAfterOIDLength;
      const lastIndex = index + OIDLength;
      const byte1 = data[index++];
      let oid = (byte1 / 40 >> 0) + "." + byte1 % 40;
      while (index < lastIndex) {
        let value = 0;
        while (index < lastIndex) {
          const nextByte = data[index++];
          value = value << 7 | nextByte & 127;
          if (nextByte < 128)
            break;
        }
        oid += "." + value;
      }
      return { oid, index };
    }
    __name(readASN1OID, "readASN1OID");
    function expectASN1Seq(data, index) {
      if (data[index++] !== 48)
        throw x509Error("non-sequence data", data);
      return readASN1Length(data, index);
    }
    __name(expectASN1Seq, "expectASN1Seq");
    function signatureAlgorithmHashFromCertificate(data, index) {
      if (index === void 0)
        index = 0;
      index = expectASN1Seq(data, index).index;
      const { length: certInfoLength, index: indexAfterCertInfoLength } = expectASN1Seq(data, index);
      index = indexAfterCertInfoLength + certInfoLength;
      index = expectASN1Seq(data, index).index;
      const { oid, index: indexAfterOID } = readASN1OID(data, index);
      switch (oid) {
        case "1.2.840.113549.1.1.4":
          return "MD5";
        case "1.2.840.113549.1.1.5":
          return "SHA-1";
        case "1.2.840.113549.1.1.11":
          return "SHA-256";
        case "1.2.840.113549.1.1.12":
          return "SHA-384";
        case "1.2.840.113549.1.1.13":
          return "SHA-512";
        case "1.2.840.113549.1.1.14":
          return "SHA-224";
        case "1.2.840.113549.1.1.15":
          return "SHA512-224";
        case "1.2.840.113549.1.1.16":
          return "SHA512-256";
        case "1.2.840.10045.4.1":
          return "SHA-1";
        case "1.2.840.10045.4.3.1":
          return "SHA-224";
        case "1.2.840.10045.4.3.2":
          return "SHA-256";
        case "1.2.840.10045.4.3.3":
          return "SHA-384";
        case "1.2.840.10045.4.3.4":
          return "SHA-512";
        case "1.2.840.113549.1.1.10": {
          index = indexAfterOID;
          index = expectASN1Seq(data, index).index;
          if (data[index++] !== 160)
            throw x509Error("non-tag data", data);
          index = readASN1Length(data, index).index;
          index = expectASN1Seq(data, index).index;
          const { oid: hashOID } = readASN1OID(data, index);
          switch (hashOID) {
            case "1.2.840.113549.2.5":
              return "MD5";
            case "1.3.14.3.2.26":
              return "SHA-1";
            case "2.16.840.1.101.3.4.2.1":
              return "SHA-256";
            case "2.16.840.1.101.3.4.2.2":
              return "SHA-384";
            case "2.16.840.1.101.3.4.2.3":
              return "SHA-512";
          }
          throw x509Error("unknown hash OID " + hashOID, data);
        }
        case "1.3.101.110":
        case "1.3.101.112":
          return "SHA-512";
        case "1.3.101.111":
        case "1.3.101.113":
          throw x509Error("Ed448 certificate channel binding is not currently supported by Postgres");
      }
      throw x509Error("unknown OID " + oid, data);
    }
    __name(signatureAlgorithmHashFromCertificate, "signatureAlgorithmHashFromCertificate");
    module.exports = { signatureAlgorithmHashFromCertificate };
  }
});

// ../../node_modules/pg/lib/crypto/sasl.js
var require_sasl = __commonJS({
  "../../node_modules/pg/lib/crypto/sasl.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var crypto2 = require_utils2();
    var { signatureAlgorithmHashFromCertificate } = require_cert_signatures();
    function startSession(mechanisms, stream) {
      const candidates = ["SCRAM-SHA-256"];
      if (stream)
        candidates.unshift("SCRAM-SHA-256-PLUS");
      const mechanism = candidates.find((candidate) => mechanisms.includes(candidate));
      if (!mechanism) {
        throw new Error("SASL: Only mechanism(s) " + candidates.join(" and ") + " are supported");
      }
      if (mechanism === "SCRAM-SHA-256-PLUS" && typeof stream.getPeerCertificate !== "function") {
        throw new Error("SASL: Mechanism SCRAM-SHA-256-PLUS requires a certificate");
      }
      const clientNonce = crypto2.randomBytes(18).toString("base64");
      const gs2Header = mechanism === "SCRAM-SHA-256-PLUS" ? "p=tls-server-end-point" : stream ? "y" : "n";
      return {
        mechanism,
        clientNonce,
        response: gs2Header + ",,n=*,r=" + clientNonce,
        message: "SASLInitialResponse"
      };
    }
    __name(startSession, "startSession");
    async function continueSession(session, password, serverData, stream) {
      if (session.message !== "SASLInitialResponse") {
        throw new Error("SASL: Last message was not SASLInitialResponse");
      }
      if (typeof password !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string");
      }
      if (password === "") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a non-empty string");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: serverData must be a string");
      }
      const sv = parseServerFirstMessage(serverData);
      if (!sv.nonce.startsWith(session.clientNonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce does not start with client nonce");
      } else if (sv.nonce.length === session.clientNonce.length) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: server nonce is too short");
      }
      const clientFirstMessageBare = "n=*,r=" + session.clientNonce;
      const serverFirstMessage = "r=" + sv.nonce + ",s=" + sv.salt + ",i=" + sv.iteration;
      let channelBinding = stream ? "eSws" : "biws";
      if (session.mechanism === "SCRAM-SHA-256-PLUS") {
        const peerCert = stream.getPeerCertificate().raw;
        let hashName = signatureAlgorithmHashFromCertificate(peerCert);
        if (hashName === "MD5" || hashName === "SHA-1")
          hashName = "SHA-256";
        const certHash = await crypto2.hashByName(hashName, peerCert);
        const bindingData = Buffer.concat([Buffer.from("p=tls-server-end-point,,"), Buffer.from(certHash)]);
        channelBinding = bindingData.toString("base64");
      }
      const clientFinalMessageWithoutProof = "c=" + channelBinding + ",r=" + sv.nonce;
      const authMessage = clientFirstMessageBare + "," + serverFirstMessage + "," + clientFinalMessageWithoutProof;
      const saltBytes = Buffer.from(sv.salt, "base64");
      const saltedPassword = await crypto2.deriveKey(password, saltBytes, sv.iteration);
      const clientKey = await crypto2.hmacSha256(saltedPassword, "Client Key");
      const storedKey = await crypto2.sha256(clientKey);
      const clientSignature = await crypto2.hmacSha256(storedKey, authMessage);
      const clientProof = xorBuffers(Buffer.from(clientKey), Buffer.from(clientSignature)).toString("base64");
      const serverKey = await crypto2.hmacSha256(saltedPassword, "Server Key");
      const serverSignatureBytes = await crypto2.hmacSha256(serverKey, authMessage);
      session.message = "SASLResponse";
      session.serverSignature = Buffer.from(serverSignatureBytes).toString("base64");
      session.response = clientFinalMessageWithoutProof + ",p=" + clientProof;
    }
    __name(continueSession, "continueSession");
    function finalizeSession(session, serverData) {
      if (session.message !== "SASLResponse") {
        throw new Error("SASL: Last message was not SASLResponse");
      }
      if (typeof serverData !== "string") {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: serverData must be a string");
      }
      const { serverSignature } = parseServerFinalMessage(serverData);
      if (serverSignature !== session.serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature does not match");
      }
    }
    __name(finalizeSession, "finalizeSession");
    function isPrintableChars(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: text must be a string");
      }
      return text.split("").map((_, i) => text.charCodeAt(i)).every((c) => c >= 33 && c <= 43 || c >= 45 && c <= 126);
    }
    __name(isPrintableChars, "isPrintableChars");
    function isBase64(text) {
      return /^(?:[a-zA-Z0-9+/]{4})*(?:[a-zA-Z0-9+/]{2}==|[a-zA-Z0-9+/]{3}=)?$/.test(text);
    }
    __name(isBase64, "isBase64");
    function parseAttributePairs(text) {
      if (typeof text !== "string") {
        throw new TypeError("SASL: attribute pairs text must be a string");
      }
      return new Map(
        text.split(",").map((attrValue) => {
          if (!/^.=/.test(attrValue)) {
            throw new Error("SASL: Invalid attribute pair entry");
          }
          const name2 = attrValue[0];
          const value = attrValue.substring(2);
          return [name2, value];
        })
      );
    }
    __name(parseAttributePairs, "parseAttributePairs");
    function parseServerFirstMessage(data) {
      const attrPairs = parseAttributePairs(data);
      const nonce = attrPairs.get("r");
      if (!nonce) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce missing");
      } else if (!isPrintableChars(nonce)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: nonce must only contain printable characters");
      }
      const salt = attrPairs.get("s");
      if (!salt) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt missing");
      } else if (!isBase64(salt)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: salt must be base64");
      }
      const iterationText = attrPairs.get("i");
      if (!iterationText) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: iteration missing");
      } else if (!/^[1-9][0-9]*$/.test(iterationText)) {
        throw new Error("SASL: SCRAM-SERVER-FIRST-MESSAGE: invalid iteration count");
      }
      const iteration = parseInt(iterationText, 10);
      return {
        nonce,
        salt,
        iteration
      };
    }
    __name(parseServerFirstMessage, "parseServerFirstMessage");
    function parseServerFinalMessage(serverData) {
      const attrPairs = parseAttributePairs(serverData);
      const serverSignature = attrPairs.get("v");
      if (!serverSignature) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature is missing");
      } else if (!isBase64(serverSignature)) {
        throw new Error("SASL: SCRAM-SERVER-FINAL-MESSAGE: server signature must be base64");
      }
      return {
        serverSignature
      };
    }
    __name(parseServerFinalMessage, "parseServerFinalMessage");
    function xorBuffers(a, b) {
      if (!Buffer.isBuffer(a)) {
        throw new TypeError("first argument must be a Buffer");
      }
      if (!Buffer.isBuffer(b)) {
        throw new TypeError("second argument must be a Buffer");
      }
      if (a.length !== b.length) {
        throw new Error("Buffer lengths must match");
      }
      if (a.length === 0) {
        throw new Error("Buffers cannot be empty");
      }
      return Buffer.from(a.map((_, i) => a[i] ^ b[i]));
    }
    __name(xorBuffers, "xorBuffers");
    module.exports = {
      startSession,
      continueSession,
      finalizeSession
    };
  }
});

// ../../node_modules/pg/lib/type-overrides.js
var require_type_overrides = __commonJS({
  "../../node_modules/pg/lib/type-overrides.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types5 = require_pg_types();
    function TypeOverrides2(userTypes) {
      this._types = userTypes || types5;
      this.text = {};
      this.binary = {};
    }
    __name(TypeOverrides2, "TypeOverrides");
    TypeOverrides2.prototype.getOverrides = function(format2) {
      switch (format2) {
        case "text":
          return this.text;
        case "binary":
          return this.binary;
        default:
          return {};
      }
    };
    TypeOverrides2.prototype.setTypeParser = function(oid, format2, parseFn) {
      if (typeof format2 === "function") {
        parseFn = format2;
        format2 = "text";
      }
      this.getOverrides(format2)[oid] = parseFn;
    };
    TypeOverrides2.prototype.getTypeParser = function(oid, format2) {
      format2 = format2 || "text";
      return this.getOverrides(format2)[oid] || this._types.getTypeParser(oid, format2);
    };
    module.exports = TypeOverrides2;
  }
});

// node-built-in-modules:dns
import libDefault2 from "dns";
var require_dns = __commonJS({
  "node-built-in-modules:dns"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault2;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs
var access, copyFile, cp, open, opendir, rename, truncate, rm, rmdir, mkdir, readdir, readlink, symlink, lstat, stat, link, unlink, chmod, lchmod, lchown, chown, utimes, lutimes, realpath, mkdtemp, writeFile, appendFile, readFile, watch, statfs, glob;
var init_promises = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    access = /* @__PURE__ */ notImplemented("fs.access");
    copyFile = /* @__PURE__ */ notImplemented("fs.copyFile");
    cp = /* @__PURE__ */ notImplemented("fs.cp");
    open = /* @__PURE__ */ notImplemented("fs.open");
    opendir = /* @__PURE__ */ notImplemented("fs.opendir");
    rename = /* @__PURE__ */ notImplemented("fs.rename");
    truncate = /* @__PURE__ */ notImplemented("fs.truncate");
    rm = /* @__PURE__ */ notImplemented("fs.rm");
    rmdir = /* @__PURE__ */ notImplemented("fs.rmdir");
    mkdir = /* @__PURE__ */ notImplemented("fs.mkdir");
    readdir = /* @__PURE__ */ notImplemented("fs.readdir");
    readlink = /* @__PURE__ */ notImplemented("fs.readlink");
    symlink = /* @__PURE__ */ notImplemented("fs.symlink");
    lstat = /* @__PURE__ */ notImplemented("fs.lstat");
    stat = /* @__PURE__ */ notImplemented("fs.stat");
    link = /* @__PURE__ */ notImplemented("fs.link");
    unlink = /* @__PURE__ */ notImplemented("fs.unlink");
    chmod = /* @__PURE__ */ notImplemented("fs.chmod");
    lchmod = /* @__PURE__ */ notImplemented("fs.lchmod");
    lchown = /* @__PURE__ */ notImplemented("fs.lchown");
    chown = /* @__PURE__ */ notImplemented("fs.chown");
    utimes = /* @__PURE__ */ notImplemented("fs.utimes");
    lutimes = /* @__PURE__ */ notImplemented("fs.lutimes");
    realpath = /* @__PURE__ */ notImplemented("fs.realpath");
    mkdtemp = /* @__PURE__ */ notImplemented("fs.mkdtemp");
    writeFile = /* @__PURE__ */ notImplemented("fs.writeFile");
    appendFile = /* @__PURE__ */ notImplemented("fs.appendFile");
    readFile = /* @__PURE__ */ notImplemented("fs.readFile");
    watch = /* @__PURE__ */ notImplemented("fs.watch");
    statfs = /* @__PURE__ */ notImplemented("fs.statfs");
    glob = /* @__PURE__ */ notImplemented("fs.glob");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs
var constants_exports = {};
__export(constants_exports, {
  COPYFILE_EXCL: () => COPYFILE_EXCL,
  COPYFILE_FICLONE: () => COPYFILE_FICLONE,
  COPYFILE_FICLONE_FORCE: () => COPYFILE_FICLONE_FORCE,
  EXTENSIONLESS_FORMAT_JAVASCRIPT: () => EXTENSIONLESS_FORMAT_JAVASCRIPT,
  EXTENSIONLESS_FORMAT_WASM: () => EXTENSIONLESS_FORMAT_WASM,
  F_OK: () => F_OK,
  O_APPEND: () => O_APPEND,
  O_CREAT: () => O_CREAT,
  O_DIRECT: () => O_DIRECT,
  O_DIRECTORY: () => O_DIRECTORY,
  O_DSYNC: () => O_DSYNC,
  O_EXCL: () => O_EXCL,
  O_NOATIME: () => O_NOATIME,
  O_NOCTTY: () => O_NOCTTY,
  O_NOFOLLOW: () => O_NOFOLLOW,
  O_NONBLOCK: () => O_NONBLOCK,
  O_RDONLY: () => O_RDONLY,
  O_RDWR: () => O_RDWR,
  O_SYNC: () => O_SYNC,
  O_TRUNC: () => O_TRUNC,
  O_WRONLY: () => O_WRONLY,
  R_OK: () => R_OK,
  S_IFBLK: () => S_IFBLK,
  S_IFCHR: () => S_IFCHR,
  S_IFDIR: () => S_IFDIR,
  S_IFIFO: () => S_IFIFO,
  S_IFLNK: () => S_IFLNK,
  S_IFMT: () => S_IFMT,
  S_IFREG: () => S_IFREG,
  S_IFSOCK: () => S_IFSOCK,
  S_IRGRP: () => S_IRGRP,
  S_IROTH: () => S_IROTH,
  S_IRUSR: () => S_IRUSR,
  S_IRWXG: () => S_IRWXG,
  S_IRWXO: () => S_IRWXO,
  S_IRWXU: () => S_IRWXU,
  S_IWGRP: () => S_IWGRP,
  S_IWOTH: () => S_IWOTH,
  S_IWUSR: () => S_IWUSR,
  S_IXGRP: () => S_IXGRP,
  S_IXOTH: () => S_IXOTH,
  S_IXUSR: () => S_IXUSR,
  UV_DIRENT_BLOCK: () => UV_DIRENT_BLOCK,
  UV_DIRENT_CHAR: () => UV_DIRENT_CHAR,
  UV_DIRENT_DIR: () => UV_DIRENT_DIR,
  UV_DIRENT_FIFO: () => UV_DIRENT_FIFO,
  UV_DIRENT_FILE: () => UV_DIRENT_FILE,
  UV_DIRENT_LINK: () => UV_DIRENT_LINK,
  UV_DIRENT_SOCKET: () => UV_DIRENT_SOCKET,
  UV_DIRENT_UNKNOWN: () => UV_DIRENT_UNKNOWN,
  UV_FS_COPYFILE_EXCL: () => UV_FS_COPYFILE_EXCL,
  UV_FS_COPYFILE_FICLONE: () => UV_FS_COPYFILE_FICLONE,
  UV_FS_COPYFILE_FICLONE_FORCE: () => UV_FS_COPYFILE_FICLONE_FORCE,
  UV_FS_O_FILEMAP: () => UV_FS_O_FILEMAP,
  UV_FS_SYMLINK_DIR: () => UV_FS_SYMLINK_DIR,
  UV_FS_SYMLINK_JUNCTION: () => UV_FS_SYMLINK_JUNCTION,
  W_OK: () => W_OK,
  X_OK: () => X_OK
});
var UV_FS_SYMLINK_DIR, UV_FS_SYMLINK_JUNCTION, O_RDONLY, O_WRONLY, O_RDWR, UV_DIRENT_UNKNOWN, UV_DIRENT_FILE, UV_DIRENT_DIR, UV_DIRENT_LINK, UV_DIRENT_FIFO, UV_DIRENT_SOCKET, UV_DIRENT_CHAR, UV_DIRENT_BLOCK, EXTENSIONLESS_FORMAT_JAVASCRIPT, EXTENSIONLESS_FORMAT_WASM, S_IFMT, S_IFREG, S_IFDIR, S_IFCHR, S_IFBLK, S_IFIFO, S_IFLNK, S_IFSOCK, O_CREAT, O_EXCL, UV_FS_O_FILEMAP, O_NOCTTY, O_TRUNC, O_APPEND, O_DIRECTORY, O_NOATIME, O_NOFOLLOW, O_SYNC, O_DSYNC, O_DIRECT, O_NONBLOCK, S_IRWXU, S_IRUSR, S_IWUSR, S_IXUSR, S_IRWXG, S_IRGRP, S_IWGRP, S_IXGRP, S_IRWXO, S_IROTH, S_IWOTH, S_IXOTH, F_OK, R_OK, W_OK, X_OK, UV_FS_COPYFILE_EXCL, COPYFILE_EXCL, UV_FS_COPYFILE_FICLONE, COPYFILE_FICLONE, UV_FS_COPYFILE_FICLONE_FORCE, COPYFILE_FICLONE_FORCE;
var init_constants2 = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/fs/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    UV_FS_SYMLINK_DIR = 1;
    UV_FS_SYMLINK_JUNCTION = 2;
    O_RDONLY = 0;
    O_WRONLY = 1;
    O_RDWR = 2;
    UV_DIRENT_UNKNOWN = 0;
    UV_DIRENT_FILE = 1;
    UV_DIRENT_DIR = 2;
    UV_DIRENT_LINK = 3;
    UV_DIRENT_FIFO = 4;
    UV_DIRENT_SOCKET = 5;
    UV_DIRENT_CHAR = 6;
    UV_DIRENT_BLOCK = 7;
    EXTENSIONLESS_FORMAT_JAVASCRIPT = 0;
    EXTENSIONLESS_FORMAT_WASM = 1;
    S_IFMT = 61440;
    S_IFREG = 32768;
    S_IFDIR = 16384;
    S_IFCHR = 8192;
    S_IFBLK = 24576;
    S_IFIFO = 4096;
    S_IFLNK = 40960;
    S_IFSOCK = 49152;
    O_CREAT = 64;
    O_EXCL = 128;
    UV_FS_O_FILEMAP = 0;
    O_NOCTTY = 256;
    O_TRUNC = 512;
    O_APPEND = 1024;
    O_DIRECTORY = 65536;
    O_NOATIME = 262144;
    O_NOFOLLOW = 131072;
    O_SYNC = 1052672;
    O_DSYNC = 4096;
    O_DIRECT = 16384;
    O_NONBLOCK = 2048;
    S_IRWXU = 448;
    S_IRUSR = 256;
    S_IWUSR = 128;
    S_IXUSR = 64;
    S_IRWXG = 56;
    S_IRGRP = 32;
    S_IWGRP = 16;
    S_IXGRP = 8;
    S_IRWXO = 7;
    S_IROTH = 4;
    S_IWOTH = 2;
    S_IXOTH = 1;
    F_OK = 0;
    R_OK = 4;
    W_OK = 2;
    X_OK = 1;
    UV_FS_COPYFILE_EXCL = 1;
    COPYFILE_EXCL = 1;
    UV_FS_COPYFILE_FICLONE = 2;
    COPYFILE_FICLONE = 2;
    UV_FS_COPYFILE_FICLONE_FORCE = 4;
    COPYFILE_FICLONE_FORCE = 4;
  }
});

// ../../node_modules/unenv/dist/runtime/node/fs/promises.mjs
var promises_default;
var init_promises2 = __esm({
  "../../node_modules/unenv/dist/runtime/node/fs/promises.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises();
    init_constants2();
    init_promises();
    promises_default = {
      constants: constants_exports,
      access,
      appendFile,
      chmod,
      chown,
      copyFile,
      cp,
      glob,
      lchmod,
      lchown,
      link,
      lstat,
      lutimes,
      mkdir,
      mkdtemp,
      open,
      opendir,
      readFile,
      readdir,
      readlink,
      realpath,
      rename,
      rm,
      rmdir,
      stat,
      statfs,
      symlink,
      truncate,
      unlink,
      utimes,
      watch,
      writeFile
    };
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs
var Dir, Dirent, Stats, ReadStream2, WriteStream2, FileReadStream, FileWriteStream;
var init_classes = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/fs/classes.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Dir = /* @__PURE__ */ notImplementedClass("fs.Dir");
    Dirent = /* @__PURE__ */ notImplementedClass("fs.Dirent");
    Stats = /* @__PURE__ */ notImplementedClass("fs.Stats");
    ReadStream2 = /* @__PURE__ */ notImplementedClass("fs.ReadStream");
    WriteStream2 = /* @__PURE__ */ notImplementedClass("fs.WriteStream");
    FileReadStream = ReadStream2;
    FileWriteStream = WriteStream2;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs
function callbackify(fn) {
  const fnc = /* @__PURE__ */ __name(function(...args) {
    const cb = args.pop();
    fn().catch((error3) => cb(error3)).then((val) => cb(void 0, val));
  }, "fnc");
  fnc.__promisify__ = fn;
  fnc.native = fnc;
  return fnc;
}
var access2, appendFile2, chown2, chmod2, copyFile2, cp2, lchown2, lchmod2, link2, lstat2, lutimes2, mkdir2, mkdtemp2, realpath2, open2, opendir2, readdir2, readFile2, readlink2, rename2, rm2, rmdir2, stat2, symlink2, truncate2, unlink2, utimes2, writeFile2, statfs2, close, createReadStream, createWriteStream, exists, fchown, fchmod, fdatasync, fstat, fsync, ftruncate, futimes, lstatSync, read, readv, realpathSync, statSync, unwatchFile, watch2, watchFile, write, writev, _toUnixTimestamp, openAsBlob, glob2, appendFileSync, accessSync, chownSync, chmodSync, closeSync, copyFileSync, cpSync, existsSync, fchownSync, fchmodSync, fdatasyncSync, fstatSync, fsyncSync, ftruncateSync, futimesSync, lchownSync, lchmodSync, linkSync, lutimesSync, mkdirSync, mkdtempSync, openSync, opendirSync, readdirSync, readSync, readvSync, readFileSync, readlinkSync, renameSync, rmSync, rmdirSync, symlinkSync, truncateSync, unlinkSync, utimesSync, writeFileSync, writeSync, writevSync, statfsSync, globSync;
var init_fs = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/fs/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_promises();
    __name(callbackify, "callbackify");
    access2 = callbackify(access);
    appendFile2 = callbackify(appendFile);
    chown2 = callbackify(chown);
    chmod2 = callbackify(chmod);
    copyFile2 = callbackify(copyFile);
    cp2 = callbackify(cp);
    lchown2 = callbackify(lchown);
    lchmod2 = callbackify(lchmod);
    link2 = callbackify(link);
    lstat2 = callbackify(lstat);
    lutimes2 = callbackify(lutimes);
    mkdir2 = callbackify(mkdir);
    mkdtemp2 = callbackify(mkdtemp);
    realpath2 = callbackify(realpath);
    open2 = callbackify(open);
    opendir2 = callbackify(opendir);
    readdir2 = callbackify(readdir);
    readFile2 = callbackify(readFile);
    readlink2 = callbackify(readlink);
    rename2 = callbackify(rename);
    rm2 = callbackify(rm);
    rmdir2 = callbackify(rmdir);
    stat2 = callbackify(stat);
    symlink2 = callbackify(symlink);
    truncate2 = callbackify(truncate);
    unlink2 = callbackify(unlink);
    utimes2 = callbackify(utimes);
    writeFile2 = callbackify(writeFile);
    statfs2 = callbackify(statfs);
    close = /* @__PURE__ */ notImplementedAsync("fs.close");
    createReadStream = /* @__PURE__ */ notImplementedAsync("fs.createReadStream");
    createWriteStream = /* @__PURE__ */ notImplementedAsync("fs.createWriteStream");
    exists = /* @__PURE__ */ notImplementedAsync("fs.exists");
    fchown = /* @__PURE__ */ notImplementedAsync("fs.fchown");
    fchmod = /* @__PURE__ */ notImplementedAsync("fs.fchmod");
    fdatasync = /* @__PURE__ */ notImplementedAsync("fs.fdatasync");
    fstat = /* @__PURE__ */ notImplementedAsync("fs.fstat");
    fsync = /* @__PURE__ */ notImplementedAsync("fs.fsync");
    ftruncate = /* @__PURE__ */ notImplementedAsync("fs.ftruncate");
    futimes = /* @__PURE__ */ notImplementedAsync("fs.futimes");
    lstatSync = /* @__PURE__ */ notImplementedAsync("fs.lstatSync");
    read = /* @__PURE__ */ notImplementedAsync("fs.read");
    readv = /* @__PURE__ */ notImplementedAsync("fs.readv");
    realpathSync = /* @__PURE__ */ notImplementedAsync("fs.realpathSync");
    statSync = /* @__PURE__ */ notImplementedAsync("fs.statSync");
    unwatchFile = /* @__PURE__ */ notImplementedAsync("fs.unwatchFile");
    watch2 = /* @__PURE__ */ notImplementedAsync("fs.watch");
    watchFile = /* @__PURE__ */ notImplementedAsync("fs.watchFile");
    write = /* @__PURE__ */ notImplementedAsync("fs.write");
    writev = /* @__PURE__ */ notImplementedAsync("fs.writev");
    _toUnixTimestamp = /* @__PURE__ */ notImplementedAsync("fs._toUnixTimestamp");
    openAsBlob = /* @__PURE__ */ notImplementedAsync("fs.openAsBlob");
    glob2 = /* @__PURE__ */ notImplementedAsync("fs.glob");
    appendFileSync = /* @__PURE__ */ notImplemented("fs.appendFileSync");
    accessSync = /* @__PURE__ */ notImplemented("fs.accessSync");
    chownSync = /* @__PURE__ */ notImplemented("fs.chownSync");
    chmodSync = /* @__PURE__ */ notImplemented("fs.chmodSync");
    closeSync = /* @__PURE__ */ notImplemented("fs.closeSync");
    copyFileSync = /* @__PURE__ */ notImplemented("fs.copyFileSync");
    cpSync = /* @__PURE__ */ notImplemented("fs.cpSync");
    existsSync = /* @__PURE__ */ __name(() => false, "existsSync");
    fchownSync = /* @__PURE__ */ notImplemented("fs.fchownSync");
    fchmodSync = /* @__PURE__ */ notImplemented("fs.fchmodSync");
    fdatasyncSync = /* @__PURE__ */ notImplemented("fs.fdatasyncSync");
    fstatSync = /* @__PURE__ */ notImplemented("fs.fstatSync");
    fsyncSync = /* @__PURE__ */ notImplemented("fs.fsyncSync");
    ftruncateSync = /* @__PURE__ */ notImplemented("fs.ftruncateSync");
    futimesSync = /* @__PURE__ */ notImplemented("fs.futimesSync");
    lchownSync = /* @__PURE__ */ notImplemented("fs.lchownSync");
    lchmodSync = /* @__PURE__ */ notImplemented("fs.lchmodSync");
    linkSync = /* @__PURE__ */ notImplemented("fs.linkSync");
    lutimesSync = /* @__PURE__ */ notImplemented("fs.lutimesSync");
    mkdirSync = /* @__PURE__ */ notImplemented("fs.mkdirSync");
    mkdtempSync = /* @__PURE__ */ notImplemented("fs.mkdtempSync");
    openSync = /* @__PURE__ */ notImplemented("fs.openSync");
    opendirSync = /* @__PURE__ */ notImplemented("fs.opendirSync");
    readdirSync = /* @__PURE__ */ notImplemented("fs.readdirSync");
    readSync = /* @__PURE__ */ notImplemented("fs.readSync");
    readvSync = /* @__PURE__ */ notImplemented("fs.readvSync");
    readFileSync = /* @__PURE__ */ notImplemented("fs.readFileSync");
    readlinkSync = /* @__PURE__ */ notImplemented("fs.readlinkSync");
    renameSync = /* @__PURE__ */ notImplemented("fs.renameSync");
    rmSync = /* @__PURE__ */ notImplemented("fs.rmSync");
    rmdirSync = /* @__PURE__ */ notImplemented("fs.rmdirSync");
    symlinkSync = /* @__PURE__ */ notImplemented("fs.symlinkSync");
    truncateSync = /* @__PURE__ */ notImplemented("fs.truncateSync");
    unlinkSync = /* @__PURE__ */ notImplemented("fs.unlinkSync");
    utimesSync = /* @__PURE__ */ notImplemented("fs.utimesSync");
    writeFileSync = /* @__PURE__ */ notImplemented("fs.writeFileSync");
    writeSync = /* @__PURE__ */ notImplemented("fs.writeSync");
    writevSync = /* @__PURE__ */ notImplemented("fs.writevSync");
    statfsSync = /* @__PURE__ */ notImplemented("fs.statfsSync");
    globSync = /* @__PURE__ */ notImplemented("fs.globSync");
  }
});

// ../../node_modules/unenv/dist/runtime/node/fs.mjs
var fs_default;
var init_fs2 = __esm({
  "../../node_modules/unenv/dist/runtime/node/fs.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_promises2();
    init_classes();
    init_fs();
    init_constants2();
    init_constants2();
    init_fs();
    init_classes();
    fs_default = {
      F_OK,
      R_OK,
      W_OK,
      X_OK,
      constants: constants_exports,
      promises: promises_default,
      Dir,
      Dirent,
      FileReadStream,
      FileWriteStream,
      ReadStream: ReadStream2,
      Stats,
      WriteStream: WriteStream2,
      _toUnixTimestamp,
      access: access2,
      accessSync,
      appendFile: appendFile2,
      appendFileSync,
      chmod: chmod2,
      chmodSync,
      chown: chown2,
      chownSync,
      close,
      closeSync,
      copyFile: copyFile2,
      copyFileSync,
      cp: cp2,
      cpSync,
      createReadStream,
      createWriteStream,
      exists,
      existsSync,
      fchmod,
      fchmodSync,
      fchown,
      fchownSync,
      fdatasync,
      fdatasyncSync,
      fstat,
      fstatSync,
      fsync,
      fsyncSync,
      ftruncate,
      ftruncateSync,
      futimes,
      futimesSync,
      glob: glob2,
      lchmod: lchmod2,
      globSync,
      lchmodSync,
      lchown: lchown2,
      lchownSync,
      link: link2,
      linkSync,
      lstat: lstat2,
      lstatSync,
      lutimes: lutimes2,
      lutimesSync,
      mkdir: mkdir2,
      mkdirSync,
      mkdtemp: mkdtemp2,
      mkdtempSync,
      open: open2,
      openAsBlob,
      openSync,
      opendir: opendir2,
      opendirSync,
      read,
      readFile: readFile2,
      readFileSync,
      readSync,
      readdir: readdir2,
      readdirSync,
      readlink: readlink2,
      readlinkSync,
      readv,
      readvSync,
      realpath: realpath2,
      realpathSync,
      rename: rename2,
      renameSync,
      rm: rm2,
      rmSync,
      rmdir: rmdir2,
      rmdirSync,
      stat: stat2,
      statSync,
      statfs: statfs2,
      statfsSync,
      symlink: symlink2,
      symlinkSync,
      truncate: truncate2,
      truncateSync,
      unlink: unlink2,
      unlinkSync,
      unwatchFile,
      utimes: utimes2,
      utimesSync,
      watch: watch2,
      watchFile,
      write,
      writeFile: writeFile2,
      writeFileSync,
      writeSync,
      writev,
      writevSync
    };
  }
});

// node-built-in-modules:fs
var require_fs = __commonJS({
  "node-built-in-modules:fs"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_fs2();
    module.exports = fs_default;
  }
});

// ../../node_modules/pg-connection-string/index.js
var require_pg_connection_string = __commonJS({
  "../../node_modules/pg-connection-string/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function parse(str, options = {}) {
      if (str.charAt(0) === "/") {
        const config3 = str.split(" ");
        return { host: config3[0], database: config3[1] };
      }
      const config2 = {};
      let result;
      let dummyHost = false;
      if (/ |%[^a-f0-9]|%[a-f0-9][^a-f0-9]/i.test(str)) {
        str = encodeURI(str).replace(/%25(\d\d)/g, "%$1");
      }
      try {
        result = new URL(str, "postgres://base");
      } catch (e) {
        result = new URL(str.replace("@/", "@___DUMMY___/"), "postgres://base");
        dummyHost = true;
      }
      for (const entry of result.searchParams.entries()) {
        config2[entry[0]] = entry[1];
      }
      config2.user = config2.user || decodeURIComponent(result.username);
      config2.password = config2.password || decodeURIComponent(result.password);
      if (result.protocol == "socket:") {
        config2.host = decodeURI(result.pathname);
        config2.database = result.searchParams.get("db");
        config2.client_encoding = result.searchParams.get("encoding");
        return config2;
      }
      const hostname = dummyHost ? "" : result.hostname;
      if (!config2.host) {
        config2.host = decodeURIComponent(hostname);
      } else if (hostname && /^%2f/i.test(hostname)) {
        result.pathname = hostname + result.pathname;
      }
      if (!config2.port) {
        config2.port = result.port;
      }
      const pathname = result.pathname.slice(1) || null;
      config2.database = pathname ? decodeURI(pathname) : null;
      if (config2.ssl === "true" || config2.ssl === "1") {
        config2.ssl = true;
      }
      if (config2.ssl === "0") {
        config2.ssl = false;
      }
      if (config2.sslcert || config2.sslkey || config2.sslrootcert || config2.sslmode) {
        config2.ssl = {};
      }
      const fs = config2.sslcert || config2.sslkey || config2.sslrootcert ? require_fs() : null;
      if (config2.sslcert) {
        config2.ssl.cert = fs.readFileSync(config2.sslcert).toString();
      }
      if (config2.sslkey) {
        config2.ssl.key = fs.readFileSync(config2.sslkey).toString();
      }
      if (config2.sslrootcert) {
        config2.ssl.ca = fs.readFileSync(config2.sslrootcert).toString();
      }
      if (options.useLibpqCompat && config2.uselibpqcompat) {
        throw new Error("Both useLibpqCompat and uselibpqcompat are set. Please use only one of them.");
      }
      if (config2.uselibpqcompat === "true" || options.useLibpqCompat) {
        switch (config2.sslmode) {
          case "disable": {
            config2.ssl = false;
            break;
          }
          case "prefer": {
            config2.ssl.rejectUnauthorized = false;
            break;
          }
          case "require": {
            if (config2.sslrootcert) {
              config2.ssl.checkServerIdentity = function() {
              };
            } else {
              config2.ssl.rejectUnauthorized = false;
            }
            break;
          }
          case "verify-ca": {
            if (!config2.ssl.ca) {
              throw new Error(
                "SECURITY WARNING: Using sslmode=verify-ca requires specifying a CA with sslrootcert. If a public CA is used, verify-ca allows connections to a server that somebody else may have registered with the CA, making you vulnerable to Man-in-the-Middle attacks. Either specify a custom CA certificate with sslrootcert parameter or use sslmode=verify-full for proper security."
              );
            }
            config2.ssl.checkServerIdentity = function() {
            };
            break;
          }
          case "verify-full": {
            break;
          }
        }
      } else {
        switch (config2.sslmode) {
          case "disable": {
            config2.ssl = false;
            break;
          }
          case "prefer":
          case "require":
          case "verify-ca":
          case "verify-full": {
            break;
          }
          case "no-verify": {
            config2.ssl.rejectUnauthorized = false;
            break;
          }
        }
      }
      return config2;
    }
    __name(parse, "parse");
    function toConnectionOptions(sslConfig) {
      const connectionOptions = Object.entries(sslConfig).reduce((c, [key, value]) => {
        if (value !== void 0 && value !== null) {
          c[key] = value;
        }
        return c;
      }, {});
      return connectionOptions;
    }
    __name(toConnectionOptions, "toConnectionOptions");
    function toClientConfig(config2) {
      const poolConfig = Object.entries(config2).reduce((c, [key, value]) => {
        if (key === "ssl") {
          const sslConfig = value;
          if (typeof sslConfig === "boolean") {
            c[key] = sslConfig;
          }
          if (typeof sslConfig === "object") {
            c[key] = toConnectionOptions(sslConfig);
          }
        } else if (value !== void 0 && value !== null) {
          if (key === "port") {
            if (value !== "") {
              const v = parseInt(value, 10);
              if (isNaN(v)) {
                throw new Error(`Invalid ${key}: ${value}`);
              }
              c[key] = v;
            }
          } else {
            c[key] = value;
          }
        }
        return c;
      }, {});
      return poolConfig;
    }
    __name(toClientConfig, "toClientConfig");
    function parseIntoClientConfig(str) {
      return toClientConfig(parse(str));
    }
    __name(parseIntoClientConfig, "parseIntoClientConfig");
    module.exports = parse;
    parse.parse = parse;
    parse.toClientConfig = toClientConfig;
    parse.parseIntoClientConfig = parseIntoClientConfig;
  }
});

// ../../node_modules/pg/lib/connection-parameters.js
var require_connection_parameters = __commonJS({
  "../../node_modules/pg/lib/connection-parameters.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var dns = require_dns();
    var defaults2 = require_defaults();
    var parse = require_pg_connection_string().parse;
    var val = /* @__PURE__ */ __name(function(key, config2, envVar) {
      if (envVar === void 0) {
        envVar = process.env["PG" + key.toUpperCase()];
      } else if (envVar === false) {
      } else {
        envVar = process.env[envVar];
      }
      return config2[key] || envVar || defaults2[key];
    }, "val");
    var readSSLConfigFromEnvironment = /* @__PURE__ */ __name(function() {
      switch (process.env.PGSSLMODE) {
        case "disable":
          return false;
        case "prefer":
        case "require":
        case "verify-ca":
        case "verify-full":
          return true;
        case "no-verify":
          return { rejectUnauthorized: false };
      }
      return defaults2.ssl;
    }, "readSSLConfigFromEnvironment");
    var quoteParamValue = /* @__PURE__ */ __name(function(value) {
      return "'" + ("" + value).replace(/\\/g, "\\\\").replace(/'/g, "\\'") + "'";
    }, "quoteParamValue");
    var add = /* @__PURE__ */ __name(function(params, config2, paramName) {
      const value = config2[paramName];
      if (value !== void 0 && value !== null) {
        params.push(paramName + "=" + quoteParamValue(value));
      }
    }, "add");
    var ConnectionParameters = class {
      constructor(config2) {
        config2 = typeof config2 === "string" ? parse(config2) : config2 || {};
        if (config2.connectionString) {
          config2 = Object.assign({}, config2, parse(config2.connectionString));
        }
        this.user = val("user", config2);
        this.database = val("database", config2);
        if (this.database === void 0) {
          this.database = this.user;
        }
        this.port = parseInt(val("port", config2), 10);
        this.host = val("host", config2);
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: val("password", config2)
        });
        this.binary = val("binary", config2);
        this.options = val("options", config2);
        this.ssl = typeof config2.ssl === "undefined" ? readSSLConfigFromEnvironment() : config2.ssl;
        if (typeof this.ssl === "string") {
          if (this.ssl === "true") {
            this.ssl = true;
          }
        }
        if (this.ssl === "no-verify") {
          this.ssl = { rejectUnauthorized: false };
        }
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this.client_encoding = val("client_encoding", config2);
        this.replication = val("replication", config2);
        this.isDomainSocket = !(this.host || "").indexOf("/");
        this.application_name = val("application_name", config2, "PGAPPNAME");
        this.fallback_application_name = val("fallback_application_name", config2, false);
        this.statement_timeout = val("statement_timeout", config2, false);
        this.lock_timeout = val("lock_timeout", config2, false);
        this.idle_in_transaction_session_timeout = val("idle_in_transaction_session_timeout", config2, false);
        this.query_timeout = val("query_timeout", config2, false);
        if (config2.connectionTimeoutMillis === void 0) {
          this.connect_timeout = process.env.PGCONNECT_TIMEOUT || 0;
        } else {
          this.connect_timeout = Math.floor(config2.connectionTimeoutMillis / 1e3);
        }
        if (config2.keepAlive === false) {
          this.keepalives = 0;
        } else if (config2.keepAlive === true) {
          this.keepalives = 1;
        }
        if (typeof config2.keepAliveInitialDelayMillis === "number") {
          this.keepalives_idle = Math.floor(config2.keepAliveInitialDelayMillis / 1e3);
        }
      }
      getLibpqConnectionString(cb) {
        const params = [];
        add(params, this, "user");
        add(params, this, "password");
        add(params, this, "port");
        add(params, this, "application_name");
        add(params, this, "fallback_application_name");
        add(params, this, "connect_timeout");
        add(params, this, "options");
        const ssl = typeof this.ssl === "object" ? this.ssl : this.ssl ? { sslmode: this.ssl } : {};
        add(params, ssl, "sslmode");
        add(params, ssl, "sslca");
        add(params, ssl, "sslkey");
        add(params, ssl, "sslcert");
        add(params, ssl, "sslrootcert");
        if (this.database) {
          params.push("dbname=" + quoteParamValue(this.database));
        }
        if (this.replication) {
          params.push("replication=" + quoteParamValue(this.replication));
        }
        if (this.host) {
          params.push("host=" + quoteParamValue(this.host));
        }
        if (this.isDomainSocket) {
          return cb(null, params.join(" "));
        }
        if (this.client_encoding) {
          params.push("client_encoding=" + quoteParamValue(this.client_encoding));
        }
        dns.lookup(this.host, function(err, address) {
          if (err)
            return cb(err, null);
          params.push("hostaddr=" + quoteParamValue(address));
          return cb(null, params.join(" "));
        });
      }
    };
    __name(ConnectionParameters, "ConnectionParameters");
    module.exports = ConnectionParameters;
  }
});

// ../../node_modules/pg/lib/result.js
var require_result = __commonJS({
  "../../node_modules/pg/lib/result.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var types5 = require_pg_types();
    var matchRegexp = /^([A-Za-z]+)(?: (\d+))?(?: (\d+))?/;
    var Result2 = class {
      constructor(rowMode, types6) {
        this.command = null;
        this.rowCount = null;
        this.oid = null;
        this.rows = [];
        this.fields = [];
        this._parsers = void 0;
        this._types = types6;
        this.RowCtor = null;
        this.rowAsArray = rowMode === "array";
        if (this.rowAsArray) {
          this.parseRow = this._parseRowAsArray;
        }
        this._prebuiltEmptyResultObject = null;
      }
      // adds a command complete message
      addCommandComplete(msg) {
        let match;
        if (msg.text) {
          match = matchRegexp.exec(msg.text);
        } else {
          match = matchRegexp.exec(msg.command);
        }
        if (match) {
          this.command = match[1];
          if (match[3]) {
            this.oid = parseInt(match[2], 10);
            this.rowCount = parseInt(match[3], 10);
          } else if (match[2]) {
            this.rowCount = parseInt(match[2], 10);
          }
        }
      }
      _parseRowAsArray(rowData) {
        const row = new Array(rowData.length);
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          if (rawValue !== null) {
            row[i] = this._parsers[i](rawValue);
          } else {
            row[i] = null;
          }
        }
        return row;
      }
      parseRow(rowData) {
        const row = { ...this._prebuiltEmptyResultObject };
        for (let i = 0, len = rowData.length; i < len; i++) {
          const rawValue = rowData[i];
          const field = this.fields[i].name;
          if (rawValue !== null) {
            row[field] = this._parsers[i](rawValue);
          } else {
            row[field] = null;
          }
        }
        return row;
      }
      addRow(row) {
        this.rows.push(row);
      }
      addFields(fieldDescriptions) {
        this.fields = fieldDescriptions;
        if (this.fields.length) {
          this._parsers = new Array(fieldDescriptions.length);
        }
        const row = {};
        for (let i = 0; i < fieldDescriptions.length; i++) {
          const desc = fieldDescriptions[i];
          row[desc.name] = null;
          if (this._types) {
            this._parsers[i] = this._types.getTypeParser(desc.dataTypeID, desc.format || "text");
          } else {
            this._parsers[i] = types5.getTypeParser(desc.dataTypeID, desc.format || "text");
          }
        }
        this._prebuiltEmptyResultObject = { ...row };
      }
    };
    __name(Result2, "Result");
    module.exports = Result2;
  }
});

// ../../node_modules/pg/lib/query.js
var require_query = __commonJS({
  "../../node_modules/pg/lib/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { EventEmitter: EventEmitter2 } = require_events();
    var Result2 = require_result();
    var utils = require_utils();
    var Query2 = class extends EventEmitter2 {
      constructor(config2, values, callback) {
        super();
        config2 = utils.normalizeQueryConfig(config2, values, callback);
        this.text = config2.text;
        this.values = config2.values;
        this.rows = config2.rows;
        this.types = config2.types;
        this.name = config2.name;
        this.queryMode = config2.queryMode;
        this.binary = config2.binary;
        this.portal = config2.portal || "";
        this.callback = config2.callback;
        this._rowMode = config2.rowMode;
        if (process.domain && config2.callback) {
          this.callback = process.domain.bind(config2.callback);
        }
        this._result = new Result2(this._rowMode, this.types);
        this._results = this._result;
        this._canceledDueToError = false;
      }
      requiresPreparation() {
        if (this.queryMode === "extended") {
          return true;
        }
        if (this.name) {
          return true;
        }
        if (this.rows) {
          return true;
        }
        if (!this.text) {
          return false;
        }
        if (!this.values) {
          return false;
        }
        return this.values.length > 0;
      }
      _checkForMultirow() {
        if (this._result.command) {
          if (!Array.isArray(this._results)) {
            this._results = [this._result];
          }
          this._result = new Result2(this._rowMode, this._result._types);
          this._results.push(this._result);
        }
      }
      // associates row metadata from the supplied
      // message with this query object
      // metadata used when parsing row results
      handleRowDescription(msg) {
        this._checkForMultirow();
        this._result.addFields(msg.fields);
        this._accumulateRows = this.callback || !this.listeners("row").length;
      }
      handleDataRow(msg) {
        let row;
        if (this._canceledDueToError) {
          return;
        }
        try {
          row = this._result.parseRow(msg.fields);
        } catch (err) {
          this._canceledDueToError = err;
          return;
        }
        this.emit("row", row, this._result);
        if (this._accumulateRows) {
          this._result.addRow(row);
        }
      }
      handleCommandComplete(msg, connection) {
        this._checkForMultirow();
        this._result.addCommandComplete(msg);
        if (this.rows) {
          connection.sync();
        }
      }
      // if a named prepared statement is created with empty query text
      // the backend will send an emptyQuery message but *not* a command complete message
      // since we pipeline sync immediately after execute we don't need to do anything here
      // unless we have rows specified, in which case we did not pipeline the intial sync call
      handleEmptyQuery(connection) {
        if (this.rows) {
          connection.sync();
        }
      }
      handleError(err, connection) {
        if (this._canceledDueToError) {
          err = this._canceledDueToError;
          this._canceledDueToError = false;
        }
        if (this.callback) {
          return this.callback(err);
        }
        this.emit("error", err);
      }
      handleReadyForQuery(con) {
        if (this._canceledDueToError) {
          return this.handleError(this._canceledDueToError, con);
        }
        if (this.callback) {
          try {
            this.callback(null, this._results);
          } catch (err) {
            process.nextTick(() => {
              throw err;
            });
          }
        }
        this.emit("end", this._results);
      }
      submit(connection) {
        if (typeof this.text !== "string" && typeof this.name !== "string") {
          return new Error("A query must have either text or a name. Supplying neither is unsupported.");
        }
        const previous = connection.parsedStatements[this.name];
        if (this.text && previous && this.text !== previous) {
          return new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
        }
        if (this.values && !Array.isArray(this.values)) {
          return new Error("Query values must be an array");
        }
        if (this.requiresPreparation()) {
          connection.stream.cork && connection.stream.cork();
          try {
            this.prepare(connection);
          } finally {
            connection.stream.uncork && connection.stream.uncork();
          }
        } else {
          connection.query(this.text);
        }
        return null;
      }
      hasBeenParsed(connection) {
        return this.name && connection.parsedStatements[this.name];
      }
      handlePortalSuspended(connection) {
        this._getRows(connection, this.rows);
      }
      _getRows(connection, rows) {
        connection.execute({
          portal: this.portal,
          rows
        });
        if (!rows) {
          connection.sync();
        } else {
          connection.flush();
        }
      }
      // http://developer.postgresql.org/pgdocs/postgres/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      prepare(connection) {
        if (!this.hasBeenParsed(connection)) {
          connection.parse({
            text: this.text,
            name: this.name,
            types: this.types
          });
        }
        try {
          connection.bind({
            portal: this.portal,
            statement: this.name,
            values: this.values,
            binary: this.binary,
            valueMapper: utils.prepareValue
          });
        } catch (err) {
          this.handleError(err, connection);
          return;
        }
        connection.describe({
          type: "P",
          name: this.portal || ""
        });
        this._getRows(connection, this.rows);
      }
      handleCopyInResponse(connection) {
        connection.sendCopyFail("No source stream defined");
      }
      handleCopyData(msg, connection) {
      }
    };
    __name(Query2, "Query");
    module.exports = Query2;
  }
});

// ../../node_modules/pg-protocol/dist/messages.js
var require_messages = __commonJS({
  "../../node_modules/pg-protocol/dist/messages.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NoticeMessage = exports.DataRowMessage = exports.CommandCompleteMessage = exports.ReadyForQueryMessage = exports.NotificationResponseMessage = exports.BackendKeyDataMessage = exports.AuthenticationMD5Password = exports.ParameterStatusMessage = exports.ParameterDescriptionMessage = exports.RowDescriptionMessage = exports.Field = exports.CopyResponse = exports.CopyDataMessage = exports.DatabaseError = exports.copyDone = exports.emptyQuery = exports.replicationStart = exports.portalSuspended = exports.noData = exports.closeComplete = exports.bindComplete = exports.parseComplete = void 0;
    exports.parseComplete = {
      name: "parseComplete",
      length: 5
    };
    exports.bindComplete = {
      name: "bindComplete",
      length: 5
    };
    exports.closeComplete = {
      name: "closeComplete",
      length: 5
    };
    exports.noData = {
      name: "noData",
      length: 5
    };
    exports.portalSuspended = {
      name: "portalSuspended",
      length: 5
    };
    exports.replicationStart = {
      name: "replicationStart",
      length: 4
    };
    exports.emptyQuery = {
      name: "emptyQuery",
      length: 4
    };
    exports.copyDone = {
      name: "copyDone",
      length: 4
    };
    var DatabaseError2 = class extends Error {
      constructor(message, length, name2) {
        super(message);
        this.length = length;
        this.name = name2;
      }
    };
    __name(DatabaseError2, "DatabaseError");
    exports.DatabaseError = DatabaseError2;
    var CopyDataMessage = class {
      constructor(length, chunk) {
        this.length = length;
        this.chunk = chunk;
        this.name = "copyData";
      }
    };
    __name(CopyDataMessage, "CopyDataMessage");
    exports.CopyDataMessage = CopyDataMessage;
    var CopyResponse = class {
      constructor(length, name2, binary, columnCount) {
        this.length = length;
        this.name = name2;
        this.binary = binary;
        this.columnTypes = new Array(columnCount);
      }
    };
    __name(CopyResponse, "CopyResponse");
    exports.CopyResponse = CopyResponse;
    var Field = class {
      constructor(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, format2) {
        this.name = name2;
        this.tableID = tableID;
        this.columnID = columnID;
        this.dataTypeID = dataTypeID;
        this.dataTypeSize = dataTypeSize;
        this.dataTypeModifier = dataTypeModifier;
        this.format = format2;
      }
    };
    __name(Field, "Field");
    exports.Field = Field;
    var RowDescriptionMessage = class {
      constructor(length, fieldCount) {
        this.length = length;
        this.fieldCount = fieldCount;
        this.name = "rowDescription";
        this.fields = new Array(this.fieldCount);
      }
    };
    __name(RowDescriptionMessage, "RowDescriptionMessage");
    exports.RowDescriptionMessage = RowDescriptionMessage;
    var ParameterDescriptionMessage = class {
      constructor(length, parameterCount) {
        this.length = length;
        this.parameterCount = parameterCount;
        this.name = "parameterDescription";
        this.dataTypeIDs = new Array(this.parameterCount);
      }
    };
    __name(ParameterDescriptionMessage, "ParameterDescriptionMessage");
    exports.ParameterDescriptionMessage = ParameterDescriptionMessage;
    var ParameterStatusMessage = class {
      constructor(length, parameterName, parameterValue) {
        this.length = length;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.name = "parameterStatus";
      }
    };
    __name(ParameterStatusMessage, "ParameterStatusMessage");
    exports.ParameterStatusMessage = ParameterStatusMessage;
    var AuthenticationMD5Password = class {
      constructor(length, salt) {
        this.length = length;
        this.salt = salt;
        this.name = "authenticationMD5Password";
      }
    };
    __name(AuthenticationMD5Password, "AuthenticationMD5Password");
    exports.AuthenticationMD5Password = AuthenticationMD5Password;
    var BackendKeyDataMessage = class {
      constructor(length, processID, secretKey) {
        this.length = length;
        this.processID = processID;
        this.secretKey = secretKey;
        this.name = "backendKeyData";
      }
    };
    __name(BackendKeyDataMessage, "BackendKeyDataMessage");
    exports.BackendKeyDataMessage = BackendKeyDataMessage;
    var NotificationResponseMessage = class {
      constructor(length, processId, channel2, payload) {
        this.length = length;
        this.processId = processId;
        this.channel = channel2;
        this.payload = payload;
        this.name = "notification";
      }
    };
    __name(NotificationResponseMessage, "NotificationResponseMessage");
    exports.NotificationResponseMessage = NotificationResponseMessage;
    var ReadyForQueryMessage = class {
      constructor(length, status) {
        this.length = length;
        this.status = status;
        this.name = "readyForQuery";
      }
    };
    __name(ReadyForQueryMessage, "ReadyForQueryMessage");
    exports.ReadyForQueryMessage = ReadyForQueryMessage;
    var CommandCompleteMessage = class {
      constructor(length, text) {
        this.length = length;
        this.text = text;
        this.name = "commandComplete";
      }
    };
    __name(CommandCompleteMessage, "CommandCompleteMessage");
    exports.CommandCompleteMessage = CommandCompleteMessage;
    var DataRowMessage = class {
      constructor(length, fields) {
        this.length = length;
        this.fields = fields;
        this.name = "dataRow";
        this.fieldCount = fields.length;
      }
    };
    __name(DataRowMessage, "DataRowMessage");
    exports.DataRowMessage = DataRowMessage;
    var NoticeMessage = class {
      constructor(length, message) {
        this.length = length;
        this.message = message;
        this.name = "notice";
      }
    };
    __name(NoticeMessage, "NoticeMessage");
    exports.NoticeMessage = NoticeMessage;
  }
});

// ../../node_modules/pg-protocol/dist/buffer-writer.js
var require_buffer_writer = __commonJS({
  "../../node_modules/pg-protocol/dist/buffer-writer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Writer = void 0;
    var Writer = class {
      constructor(size = 256) {
        this.size = size;
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(size);
      }
      ensure(size) {
        const remaining = this.buffer.length - this.offset;
        if (remaining < size) {
          const oldBuffer = this.buffer;
          const newSize = oldBuffer.length + (oldBuffer.length >> 1) + size;
          this.buffer = Buffer.allocUnsafe(newSize);
          oldBuffer.copy(this.buffer);
        }
      }
      addInt32(num) {
        this.ensure(4);
        this.buffer[this.offset++] = num >>> 24 & 255;
        this.buffer[this.offset++] = num >>> 16 & 255;
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addInt16(num) {
        this.ensure(2);
        this.buffer[this.offset++] = num >>> 8 & 255;
        this.buffer[this.offset++] = num >>> 0 & 255;
        return this;
      }
      addCString(string) {
        if (!string) {
          this.ensure(1);
        } else {
          const len = Buffer.byteLength(string);
          this.ensure(len + 1);
          this.buffer.write(string, this.offset, "utf-8");
          this.offset += len;
        }
        this.buffer[this.offset++] = 0;
        return this;
      }
      addString(string = "") {
        const len = Buffer.byteLength(string);
        this.ensure(len);
        this.buffer.write(string, this.offset);
        this.offset += len;
        return this;
      }
      add(otherBuffer) {
        this.ensure(otherBuffer.length);
        otherBuffer.copy(this.buffer, this.offset);
        this.offset += otherBuffer.length;
        return this;
      }
      join(code) {
        if (code) {
          this.buffer[this.headerPosition] = code;
          const length = this.offset - (this.headerPosition + 1);
          this.buffer.writeInt32BE(length, this.headerPosition + 1);
        }
        return this.buffer.slice(code ? 0 : 5, this.offset);
      }
      flush(code) {
        const result = this.join(code);
        this.offset = 5;
        this.headerPosition = 0;
        this.buffer = Buffer.allocUnsafe(this.size);
        return result;
      }
    };
    __name(Writer, "Writer");
    exports.Writer = Writer;
  }
});

// ../../node_modules/pg-protocol/dist/serializer.js
var require_serializer = __commonJS({
  "../../node_modules/pg-protocol/dist/serializer.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.serialize = void 0;
    var buffer_writer_1 = require_buffer_writer();
    var writer = new buffer_writer_1.Writer();
    var startup = /* @__PURE__ */ __name((opts) => {
      writer.addInt16(3).addInt16(0);
      for (const key of Object.keys(opts)) {
        writer.addCString(key).addCString(opts[key]);
      }
      writer.addCString("client_encoding").addCString("UTF8");
      const bodyBuffer = writer.addCString("").flush();
      const length = bodyBuffer.length + 4;
      return new buffer_writer_1.Writer().addInt32(length).add(bodyBuffer).flush();
    }, "startup");
    var requestSsl = /* @__PURE__ */ __name(() => {
      const response = Buffer.allocUnsafe(8);
      response.writeInt32BE(8, 0);
      response.writeInt32BE(80877103, 4);
      return response;
    }, "requestSsl");
    var password = /* @__PURE__ */ __name((password2) => {
      return writer.addCString(password2).flush(
        112
        /* code.startup */
      );
    }, "password");
    var sendSASLInitialResponseMessage = /* @__PURE__ */ __name(function(mechanism, initialResponse) {
      writer.addCString(mechanism).addInt32(Buffer.byteLength(initialResponse)).addString(initialResponse);
      return writer.flush(
        112
        /* code.startup */
      );
    }, "sendSASLInitialResponseMessage");
    var sendSCRAMClientFinalMessage = /* @__PURE__ */ __name(function(additionalData) {
      return writer.addString(additionalData).flush(
        112
        /* code.startup */
      );
    }, "sendSCRAMClientFinalMessage");
    var query = /* @__PURE__ */ __name((text) => {
      return writer.addCString(text).flush(
        81
        /* code.query */
      );
    }, "query");
    var emptyArray = [];
    var parse = /* @__PURE__ */ __name((query2) => {
      const name2 = query2.name || "";
      if (name2.length > 63) {
        console.error("Warning! Postgres only supports 63 characters for query names.");
        console.error("You supplied %s (%s)", name2, name2.length);
        console.error("This can cause conflicts and silent errors executing queries");
      }
      const types5 = query2.types || emptyArray;
      const len = types5.length;
      const buffer = writer.addCString(name2).addCString(query2.text).addInt16(len);
      for (let i = 0; i < len; i++) {
        buffer.addInt32(types5[i]);
      }
      return writer.flush(
        80
        /* code.parse */
      );
    }, "parse");
    var paramWriter = new buffer_writer_1.Writer();
    var writeValues = /* @__PURE__ */ __name(function(values, valueMapper) {
      for (let i = 0; i < values.length; i++) {
        const mappedVal = valueMapper ? valueMapper(values[i], i) : values[i];
        if (mappedVal == null) {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(-1);
        } else if (mappedVal instanceof Buffer) {
          writer.addInt16(
            1
            /* ParamType.BINARY */
          );
          paramWriter.addInt32(mappedVal.length);
          paramWriter.add(mappedVal);
        } else {
          writer.addInt16(
            0
            /* ParamType.STRING */
          );
          paramWriter.addInt32(Buffer.byteLength(mappedVal));
          paramWriter.addString(mappedVal);
        }
      }
    }, "writeValues");
    var bind = /* @__PURE__ */ __name((config2 = {}) => {
      const portal = config2.portal || "";
      const statement = config2.statement || "";
      const binary = config2.binary || false;
      const values = config2.values || emptyArray;
      const len = values.length;
      writer.addCString(portal).addCString(statement);
      writer.addInt16(len);
      writeValues(values, config2.valueMapper);
      writer.addInt16(len);
      writer.add(paramWriter.flush());
      writer.addInt16(
        binary ? 1 : 0
        /* ParamType.STRING */
      );
      return writer.flush(
        66
        /* code.bind */
      );
    }, "bind");
    var emptyExecute = Buffer.from([69, 0, 0, 0, 9, 0, 0, 0, 0, 0]);
    var execute = /* @__PURE__ */ __name((config2) => {
      if (!config2 || !config2.portal && !config2.rows) {
        return emptyExecute;
      }
      const portal = config2.portal || "";
      const rows = config2.rows || 0;
      const portalLength = Buffer.byteLength(portal);
      const len = 4 + portalLength + 1 + 4;
      const buff = Buffer.allocUnsafe(1 + len);
      buff[0] = 69;
      buff.writeInt32BE(len, 1);
      buff.write(portal, 5, "utf-8");
      buff[portalLength + 5] = 0;
      buff.writeUInt32BE(rows, buff.length - 4);
      return buff;
    }, "execute");
    var cancel = /* @__PURE__ */ __name((processID, secretKey) => {
      const buffer = Buffer.allocUnsafe(16);
      buffer.writeInt32BE(16, 0);
      buffer.writeInt16BE(1234, 4);
      buffer.writeInt16BE(5678, 6);
      buffer.writeInt32BE(processID, 8);
      buffer.writeInt32BE(secretKey, 12);
      return buffer;
    }, "cancel");
    var cstringMessage = /* @__PURE__ */ __name((code, string) => {
      const stringLen = Buffer.byteLength(string);
      const len = 4 + stringLen + 1;
      const buffer = Buffer.allocUnsafe(1 + len);
      buffer[0] = code;
      buffer.writeInt32BE(len, 1);
      buffer.write(string, 5, "utf-8");
      buffer[len] = 0;
      return buffer;
    }, "cstringMessage");
    var emptyDescribePortal = writer.addCString("P").flush(
      68
      /* code.describe */
    );
    var emptyDescribeStatement = writer.addCString("S").flush(
      68
      /* code.describe */
    );
    var describe = /* @__PURE__ */ __name((msg) => {
      return msg.name ? cstringMessage(68, `${msg.type}${msg.name || ""}`) : msg.type === "P" ? emptyDescribePortal : emptyDescribeStatement;
    }, "describe");
    var close2 = /* @__PURE__ */ __name((msg) => {
      const text = `${msg.type}${msg.name || ""}`;
      return cstringMessage(67, text);
    }, "close");
    var copyData = /* @__PURE__ */ __name((chunk) => {
      return writer.add(chunk).flush(
        100
        /* code.copyFromChunk */
      );
    }, "copyData");
    var copyFail = /* @__PURE__ */ __name((message) => {
      return cstringMessage(102, message);
    }, "copyFail");
    var codeOnlyBuffer = /* @__PURE__ */ __name((code) => Buffer.from([code, 0, 0, 0, 4]), "codeOnlyBuffer");
    var flushBuffer = codeOnlyBuffer(
      72
      /* code.flush */
    );
    var syncBuffer = codeOnlyBuffer(
      83
      /* code.sync */
    );
    var endBuffer = codeOnlyBuffer(
      88
      /* code.end */
    );
    var copyDoneBuffer = codeOnlyBuffer(
      99
      /* code.copyDone */
    );
    var serialize = {
      startup,
      password,
      requestSsl,
      sendSASLInitialResponseMessage,
      sendSCRAMClientFinalMessage,
      query,
      parse,
      bind,
      execute,
      describe,
      close: close2,
      flush: () => flushBuffer,
      sync: () => syncBuffer,
      end: () => endBuffer,
      copyData,
      copyDone: () => copyDoneBuffer,
      copyFail,
      cancel
    };
    exports.serialize = serialize;
  }
});

// ../../node_modules/pg-protocol/dist/buffer-reader.js
var require_buffer_reader = __commonJS({
  "../../node_modules/pg-protocol/dist/buffer-reader.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BufferReader = void 0;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var BufferReader = class {
      constructor(offset = 0) {
        this.offset = offset;
        this.buffer = emptyBuffer;
        this.encoding = "utf-8";
      }
      setBuffer(offset, buffer) {
        this.offset = offset;
        this.buffer = buffer;
      }
      int16() {
        const result = this.buffer.readInt16BE(this.offset);
        this.offset += 2;
        return result;
      }
      byte() {
        const result = this.buffer[this.offset];
        this.offset++;
        return result;
      }
      int32() {
        const result = this.buffer.readInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      uint32() {
        const result = this.buffer.readUInt32BE(this.offset);
        this.offset += 4;
        return result;
      }
      string(length) {
        const result = this.buffer.toString(this.encoding, this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
      cstring() {
        const start = this.offset;
        let end = start;
        while (this.buffer[end++] !== 0) {
        }
        this.offset = end;
        return this.buffer.toString(this.encoding, start, end - 1);
      }
      bytes(length) {
        const result = this.buffer.slice(this.offset, this.offset + length);
        this.offset += length;
        return result;
      }
    };
    __name(BufferReader, "BufferReader");
    exports.BufferReader = BufferReader;
  }
});

// ../../node_modules/pg-protocol/dist/parser.js
var require_parser = __commonJS({
  "../../node_modules/pg-protocol/dist/parser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Parser = void 0;
    var messages_1 = require_messages();
    var buffer_reader_1 = require_buffer_reader();
    var CODE_LENGTH = 1;
    var LEN_LENGTH = 4;
    var HEADER_LENGTH = CODE_LENGTH + LEN_LENGTH;
    var emptyBuffer = Buffer.allocUnsafe(0);
    var Parser = class {
      constructor(opts) {
        this.buffer = emptyBuffer;
        this.bufferLength = 0;
        this.bufferOffset = 0;
        this.reader = new buffer_reader_1.BufferReader();
        if ((opts === null || opts === void 0 ? void 0 : opts.mode) === "binary") {
          throw new Error("Binary mode not supported yet");
        }
        this.mode = (opts === null || opts === void 0 ? void 0 : opts.mode) || "text";
      }
      parse(buffer, callback) {
        this.mergeBuffer(buffer);
        const bufferFullLength = this.bufferOffset + this.bufferLength;
        let offset = this.bufferOffset;
        while (offset + HEADER_LENGTH <= bufferFullLength) {
          const code = this.buffer[offset];
          const length = this.buffer.readUInt32BE(offset + CODE_LENGTH);
          const fullMessageLength = CODE_LENGTH + length;
          if (fullMessageLength + offset <= bufferFullLength) {
            const message = this.handlePacket(offset + HEADER_LENGTH, code, length, this.buffer);
            callback(message);
            offset += fullMessageLength;
          } else {
            break;
          }
        }
        if (offset === bufferFullLength) {
          this.buffer = emptyBuffer;
          this.bufferLength = 0;
          this.bufferOffset = 0;
        } else {
          this.bufferLength = bufferFullLength - offset;
          this.bufferOffset = offset;
        }
      }
      mergeBuffer(buffer) {
        if (this.bufferLength > 0) {
          const newLength = this.bufferLength + buffer.byteLength;
          const newFullLength = newLength + this.bufferOffset;
          if (newFullLength > this.buffer.byteLength) {
            let newBuffer;
            if (newLength <= this.buffer.byteLength && this.bufferOffset >= this.bufferLength) {
              newBuffer = this.buffer;
            } else {
              let newBufferLength = this.buffer.byteLength * 2;
              while (newLength >= newBufferLength) {
                newBufferLength *= 2;
              }
              newBuffer = Buffer.allocUnsafe(newBufferLength);
            }
            this.buffer.copy(newBuffer, 0, this.bufferOffset, this.bufferOffset + this.bufferLength);
            this.buffer = newBuffer;
            this.bufferOffset = 0;
          }
          buffer.copy(this.buffer, this.bufferOffset + this.bufferLength);
          this.bufferLength = newLength;
        } else {
          this.buffer = buffer;
          this.bufferOffset = 0;
          this.bufferLength = buffer.byteLength;
        }
      }
      handlePacket(offset, code, length, bytes) {
        switch (code) {
          case 50:
            return messages_1.bindComplete;
          case 49:
            return messages_1.parseComplete;
          case 51:
            return messages_1.closeComplete;
          case 110:
            return messages_1.noData;
          case 115:
            return messages_1.portalSuspended;
          case 99:
            return messages_1.copyDone;
          case 87:
            return messages_1.replicationStart;
          case 73:
            return messages_1.emptyQuery;
          case 68:
            return this.parseDataRowMessage(offset, length, bytes);
          case 67:
            return this.parseCommandCompleteMessage(offset, length, bytes);
          case 90:
            return this.parseReadyForQueryMessage(offset, length, bytes);
          case 65:
            return this.parseNotificationMessage(offset, length, bytes);
          case 82:
            return this.parseAuthenticationResponse(offset, length, bytes);
          case 83:
            return this.parseParameterStatusMessage(offset, length, bytes);
          case 75:
            return this.parseBackendKeyData(offset, length, bytes);
          case 69:
            return this.parseErrorMessage(offset, length, bytes, "error");
          case 78:
            return this.parseErrorMessage(offset, length, bytes, "notice");
          case 84:
            return this.parseRowDescriptionMessage(offset, length, bytes);
          case 116:
            return this.parseParameterDescriptionMessage(offset, length, bytes);
          case 71:
            return this.parseCopyInMessage(offset, length, bytes);
          case 72:
            return this.parseCopyOutMessage(offset, length, bytes);
          case 100:
            return this.parseCopyData(offset, length, bytes);
          default:
            return new messages_1.DatabaseError("received invalid response: " + code.toString(16), length, "error");
        }
      }
      parseReadyForQueryMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const status = this.reader.string(1);
        return new messages_1.ReadyForQueryMessage(length, status);
      }
      parseCommandCompleteMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const text = this.reader.cstring();
        return new messages_1.CommandCompleteMessage(length, text);
      }
      parseCopyData(offset, length, bytes) {
        const chunk = bytes.slice(offset, offset + (length - 4));
        return new messages_1.CopyDataMessage(length, chunk);
      }
      parseCopyInMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyInResponse");
      }
      parseCopyOutMessage(offset, length, bytes) {
        return this.parseCopyMessage(offset, length, bytes, "copyOutResponse");
      }
      parseCopyMessage(offset, length, bytes, messageName) {
        this.reader.setBuffer(offset, bytes);
        const isBinary = this.reader.byte() !== 0;
        const columnCount = this.reader.int16();
        const message = new messages_1.CopyResponse(length, messageName, isBinary, columnCount);
        for (let i = 0; i < columnCount; i++) {
          message.columnTypes[i] = this.reader.int16();
        }
        return message;
      }
      parseNotificationMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processId = this.reader.int32();
        const channel2 = this.reader.cstring();
        const payload = this.reader.cstring();
        return new messages_1.NotificationResponseMessage(length, processId, channel2, payload);
      }
      parseRowDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const message = new messages_1.RowDescriptionMessage(length, fieldCount);
        for (let i = 0; i < fieldCount; i++) {
          message.fields[i] = this.parseField();
        }
        return message;
      }
      parseField() {
        const name2 = this.reader.cstring();
        const tableID = this.reader.uint32();
        const columnID = this.reader.int16();
        const dataTypeID = this.reader.uint32();
        const dataTypeSize = this.reader.int16();
        const dataTypeModifier = this.reader.int32();
        const mode = this.reader.int16() === 0 ? "text" : "binary";
        return new messages_1.Field(name2, tableID, columnID, dataTypeID, dataTypeSize, dataTypeModifier, mode);
      }
      parseParameterDescriptionMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const parameterCount = this.reader.int16();
        const message = new messages_1.ParameterDescriptionMessage(length, parameterCount);
        for (let i = 0; i < parameterCount; i++) {
          message.dataTypeIDs[i] = this.reader.int32();
        }
        return message;
      }
      parseDataRowMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const fieldCount = this.reader.int16();
        const fields = new Array(fieldCount);
        for (let i = 0; i < fieldCount; i++) {
          const len = this.reader.int32();
          fields[i] = len === -1 ? null : this.reader.string(len);
        }
        return new messages_1.DataRowMessage(length, fields);
      }
      parseParameterStatusMessage(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const name2 = this.reader.cstring();
        const value = this.reader.cstring();
        return new messages_1.ParameterStatusMessage(length, name2, value);
      }
      parseBackendKeyData(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const processID = this.reader.int32();
        const secretKey = this.reader.int32();
        return new messages_1.BackendKeyDataMessage(length, processID, secretKey);
      }
      parseAuthenticationResponse(offset, length, bytes) {
        this.reader.setBuffer(offset, bytes);
        const code = this.reader.int32();
        const message = {
          name: "authenticationOk",
          length
        };
        switch (code) {
          case 0:
            break;
          case 3:
            if (message.length === 8) {
              message.name = "authenticationCleartextPassword";
            }
            break;
          case 5:
            if (message.length === 12) {
              message.name = "authenticationMD5Password";
              const salt = this.reader.bytes(4);
              return new messages_1.AuthenticationMD5Password(length, salt);
            }
            break;
          case 10:
            {
              message.name = "authenticationSASL";
              message.mechanisms = [];
              let mechanism;
              do {
                mechanism = this.reader.cstring();
                if (mechanism) {
                  message.mechanisms.push(mechanism);
                }
              } while (mechanism);
            }
            break;
          case 11:
            message.name = "authenticationSASLContinue";
            message.data = this.reader.string(length - 8);
            break;
          case 12:
            message.name = "authenticationSASLFinal";
            message.data = this.reader.string(length - 8);
            break;
          default:
            throw new Error("Unknown authenticationOk message type " + code);
        }
        return message;
      }
      parseErrorMessage(offset, length, bytes, name2) {
        this.reader.setBuffer(offset, bytes);
        const fields = {};
        let fieldType = this.reader.string(1);
        while (fieldType !== "\0") {
          fields[fieldType] = this.reader.cstring();
          fieldType = this.reader.string(1);
        }
        const messageValue = fields.M;
        const message = name2 === "notice" ? new messages_1.NoticeMessage(length, messageValue) : new messages_1.DatabaseError(messageValue, length, name2);
        message.severity = fields.S;
        message.code = fields.C;
        message.detail = fields.D;
        message.hint = fields.H;
        message.position = fields.P;
        message.internalPosition = fields.p;
        message.internalQuery = fields.q;
        message.where = fields.W;
        message.schema = fields.s;
        message.table = fields.t;
        message.column = fields.c;
        message.dataType = fields.d;
        message.constraint = fields.n;
        message.file = fields.F;
        message.line = fields.L;
        message.routine = fields.R;
        return message;
      }
    };
    __name(Parser, "Parser");
    exports.Parser = Parser;
  }
});

// ../../node_modules/pg-protocol/dist/index.js
var require_dist2 = __commonJS({
  "../../node_modules/pg-protocol/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatabaseError = exports.serialize = exports.parse = void 0;
    var messages_1 = require_messages();
    Object.defineProperty(exports, "DatabaseError", { enumerable: true, get: function() {
      return messages_1.DatabaseError;
    } });
    var serializer_1 = require_serializer();
    Object.defineProperty(exports, "serialize", { enumerable: true, get: function() {
      return serializer_1.serialize;
    } });
    var parser_1 = require_parser();
    function parse(stream, callback) {
      const parser = new parser_1.Parser();
      stream.on("data", (buffer) => parser.parse(buffer, callback));
      return new Promise((resolve) => stream.on("end", () => resolve()));
    }
    __name(parse, "parse");
    exports.parse = parse;
  }
});

// node-built-in-modules:net
import libDefault3 from "net";
var require_net = __commonJS({
  "node-built-in-modules:net"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault3;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tls/tls-socket.mjs
import { Socket as Socket3 } from "node:net";
var TLSSocket;
var init_tls_socket = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tls/tls-socket.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    TLSSocket = class extends Socket3 {
      authorized = false;
      encrypted = true;
      alpnProtocol = null;
      authorizationError = new Error("[unenv] TLSSocket.authorizationError is not implemented yet!");
      exportKeyingMaterial() {
        throw createNotImplementedError("TLSSocket.exportKeyingMaterial");
      }
      getCipher() {
        throw createNotImplementedError("TLSSocket.getCipher");
      }
      getPeerCertificate(_detailed) {
        throw createNotImplementedError("TLSSocket.getPeerCertificate");
      }
      getCertificate() {
        return null;
      }
      getEphemeralKeyInfo() {
        return null;
      }
      getFinished() {
      }
      getPeerFinished() {
      }
      getProtocol() {
        return null;
      }
      getSession() {
      }
      getSharedSigalgs() {
        return [];
      }
      getTLSTicket() {
      }
      isSessionReused() {
        return false;
      }
      renegotiate(options, callback) {
        if (typeof callback === "function") {
          callback(null);
        }
      }
      setMaxSendFragment(size) {
        return false;
      }
      disableRenegotiation() {
      }
      enableTrace() {
      }
      getPeerX509Certificate() {
      }
      getX509Certificate() {
      }
    };
    __name(TLSSocket, "TLSSocket");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tls/server.mjs
import { Server as _Server } from "node:net";
var Server;
var init_server = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tls/server.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    Server = class extends _Server {
      constructor(arg1, arg2) {
        super(arg1, arg2);
      }
      addContext(hostname, context2) {
      }
      setSecureContext(options) {
      }
      setTicketKeys(_keys) {
        throw createNotImplementedError("Server.setTicketKeys");
      }
      getTicketKeys() {
        throw createNotImplementedError("Server.getTicketKeys");
      }
    };
    __name(Server, "Server");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tls/secure-context.mjs
var SecureContext;
var init_secure_context = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tls/secure-context.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    SecureContext = class {
      context = {};
    };
    __name(SecureContext, "SecureContext");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/tls/constants.mjs
var CLIENT_RENEG_LIMIT, CLIENT_RENEG_WINDOW, DEFAULT_CIPHERS, DEFAULT_ECDH_CURVE, DEFAULT_MIN_VERSION, DEFAULT_MAX_VERSION;
var init_constants3 = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/tls/constants.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    CLIENT_RENEG_LIMIT = 3;
    CLIENT_RENEG_WINDOW = 600;
    DEFAULT_CIPHERS = "";
    DEFAULT_ECDH_CURVE = "auto";
    DEFAULT_MIN_VERSION = "TLSv1.2";
    DEFAULT_MAX_VERSION = "TLSv1.3";
  }
});

// ../../node_modules/unenv/dist/runtime/node/tls.mjs
var connect, createServer, checkServerIdentity, convertALPNProtocols, createSecureContext, createSecurePair, getCiphers2, rootCertificates, tls_default;
var init_tls = __esm({
  "../../node_modules/unenv/dist/runtime/node/tls.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_tls_socket();
    init_server();
    init_secure_context();
    init_constants3();
    init_constants3();
    connect = /* @__PURE__ */ __name(function connect2() {
      return new TLSSocket();
    }, "connect");
    createServer = /* @__PURE__ */ __name(function createServer2() {
      return new Server();
    }, "createServer");
    checkServerIdentity = /* @__PURE__ */ notImplemented("tls.checkServerIdentity");
    convertALPNProtocols = /* @__PURE__ */ notImplemented("tls.convertALPNProtocols");
    createSecureContext = /* @__PURE__ */ notImplemented("tls.createSecureContext");
    createSecurePair = /* @__PURE__ */ notImplemented("tls.createSecurePair");
    getCiphers2 = /* @__PURE__ */ notImplemented("tls.getCiphers");
    rootCertificates = [];
    tls_default = {
      CLIENT_RENEG_LIMIT,
      CLIENT_RENEG_WINDOW,
      DEFAULT_CIPHERS,
      DEFAULT_ECDH_CURVE,
      DEFAULT_MAX_VERSION,
      DEFAULT_MIN_VERSION,
      SecureContext,
      Server,
      TLSSocket,
      checkServerIdentity,
      connect,
      convertALPNProtocols,
      createSecureContext,
      createSecurePair,
      createServer,
      getCiphers: getCiphers2,
      rootCertificates
    };
  }
});

// node-built-in-modules:tls
var require_tls = __commonJS({
  "node-built-in-modules:tls"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tls();
    module.exports = tls_default;
  }
});

// ../../node_modules/pg-cloudflare/dist/index.js
var require_dist3 = __commonJS({
  "../../node_modules/pg-cloudflare/dist/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CloudflareSocket = void 0;
    var events_1 = require_events();
    var CloudflareSocket = class extends events_1.EventEmitter {
      constructor(ssl) {
        super();
        this.ssl = ssl;
        this.writable = false;
        this.destroyed = false;
        this._upgrading = false;
        this._upgraded = false;
        this._cfSocket = null;
        this._cfWriter = null;
        this._cfReader = null;
      }
      setNoDelay() {
        return this;
      }
      setKeepAlive() {
        return this;
      }
      ref() {
        return this;
      }
      unref() {
        return this;
      }
      async connect(port, host, connectListener) {
        try {
          log5("connecting");
          if (connectListener)
            this.once("connect", connectListener);
          const options = this.ssl ? { secureTransport: "starttls" } : {};
          const mod = await import("cloudflare:sockets");
          const connect3 = mod.connect;
          this._cfSocket = connect3(`${host}:${port}`, options);
          this._cfWriter = this._cfSocket.writable.getWriter();
          this._addClosedHandler();
          this._cfReader = this._cfSocket.readable.getReader();
          if (this.ssl) {
            this._listenOnce().catch((e) => this.emit("error", e));
          } else {
            this._listen().catch((e) => this.emit("error", e));
          }
          await this._cfWriter.ready;
          log5("socket ready");
          this.writable = true;
          this.emit("connect");
          return this;
        } catch (e) {
          this.emit("error", e);
        }
      }
      async _listen() {
        while (true) {
          log5("awaiting receive from CF socket");
          const { done, value } = await this._cfReader.read();
          log5("CF socket received:", done, value);
          if (done) {
            log5("done");
            break;
          }
          this.emit("data", Buffer.from(value));
        }
      }
      async _listenOnce() {
        log5("awaiting first receive from CF socket");
        const { done, value } = await this._cfReader.read();
        log5("First CF socket received:", done, value);
        this.emit("data", Buffer.from(value));
      }
      write(data, encoding = "utf8", callback = () => {
      }) {
        if (data.length === 0)
          return callback();
        if (typeof data === "string")
          data = Buffer.from(data, encoding);
        log5("sending data direct:", data);
        this._cfWriter.write(data).then(() => {
          log5("data sent");
          callback();
        }, (err) => {
          log5("send error", err);
          callback(err);
        });
        return true;
      }
      end(data = Buffer.alloc(0), encoding = "utf8", callback = () => {
      }) {
        log5("ending CF socket");
        this.write(data, encoding, (err) => {
          this._cfSocket.close();
          if (callback)
            callback(err);
        });
        return this;
      }
      destroy(reason) {
        log5("destroying CF socket", reason);
        this.destroyed = true;
        return this.end();
      }
      startTls(options) {
        if (this._upgraded) {
          this.emit("error", "Cannot call `startTls()` more than once on a socket");
          return;
        }
        this._cfWriter.releaseLock();
        this._cfReader.releaseLock();
        this._upgrading = true;
        this._cfSocket = this._cfSocket.startTls(options);
        this._cfWriter = this._cfSocket.writable.getWriter();
        this._cfReader = this._cfSocket.readable.getReader();
        this._addClosedHandler();
        this._listen().catch((e) => this.emit("error", e));
      }
      _addClosedHandler() {
        this._cfSocket.closed.then(() => {
          if (!this._upgrading) {
            log5("CF socket closed");
            this._cfSocket = null;
            this.emit("close");
          } else {
            this._upgrading = false;
            this._upgraded = true;
          }
        }).catch((e) => this.emit("error", e));
      }
    };
    __name(CloudflareSocket, "CloudflareSocket");
    exports.CloudflareSocket = CloudflareSocket;
    var debug6 = false;
    function dump(data) {
      if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        const hex = Buffer.from(data).toString("hex");
        const str = new TextDecoder().decode(data);
        return `
>>> STR: "${str.replace(/\n/g, "\\n")}"
>>> HEX: ${hex}
`;
      } else {
        return data;
      }
    }
    __name(dump, "dump");
    function log5(...args) {
      debug6 && console.log(...args.map(dump));
    }
    __name(log5, "log");
  }
});

// ../../node_modules/pg/lib/stream.js
var require_stream = __commonJS({
  "../../node_modules/pg/lib/stream.js"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { getStream, getSecureStream } = getStreamFuncs();
    module.exports = {
      /**
       * Get a socket stream compatible with the current runtime environment.
       * @returns {Duplex}
       */
      getStream,
      /**
       * Get a TLS secured socket, compatible with the current environment,
       * using the socket and other settings given in `options`.
       * @returns {Duplex}
       */
      getSecureStream
    };
    function getNodejsStreamFuncs() {
      function getStream2(ssl) {
        const net = require_net();
        return new net.Socket();
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        const tls = require_tls();
        return tls.connect(options);
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getNodejsStreamFuncs, "getNodejsStreamFuncs");
    function getCloudflareStreamFuncs() {
      function getStream2(ssl) {
        const { CloudflareSocket } = require_dist3();
        return new CloudflareSocket(ssl);
      }
      __name(getStream2, "getStream");
      function getSecureStream2(options) {
        options.socket.startTls(options);
        return options.socket;
      }
      __name(getSecureStream2, "getSecureStream");
      return {
        getStream: getStream2,
        getSecureStream: getSecureStream2
      };
    }
    __name(getCloudflareStreamFuncs, "getCloudflareStreamFuncs");
    function isCloudflareRuntime() {
      if (typeof navigator === "object" && navigator !== null && true) {
        return true;
      }
      if (typeof Response === "function") {
        const resp = new Response(null, { cf: { thing: true } });
        if (typeof resp.cf === "object" && resp.cf !== null && resp.cf.thing) {
          return true;
        }
      }
      return false;
    }
    __name(isCloudflareRuntime, "isCloudflareRuntime");
    function getStreamFuncs() {
      if (isCloudflareRuntime()) {
        return getCloudflareStreamFuncs();
      }
      return getNodejsStreamFuncs();
    }
    __name(getStreamFuncs, "getStreamFuncs");
  }
});

// ../../node_modules/pg/lib/connection.js
var require_connection = __commonJS({
  "../../node_modules/pg/lib/connection.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var { parse, serialize } = require_dist2();
    var { getStream, getSecureStream } = require_stream();
    var flushBuffer = serialize.flush();
    var syncBuffer = serialize.sync();
    var endBuffer = serialize.end();
    var Connection2 = class extends EventEmitter2 {
      constructor(config2) {
        super();
        config2 = config2 || {};
        this.stream = config2.stream || getStream(config2.ssl);
        if (typeof this.stream === "function") {
          this.stream = this.stream(config2);
        }
        this._keepAlive = config2.keepAlive;
        this._keepAliveInitialDelayMillis = config2.keepAliveInitialDelayMillis;
        this.lastBuffer = false;
        this.parsedStatements = {};
        this.ssl = config2.ssl || false;
        this._ending = false;
        this._emitMessage = false;
        const self2 = this;
        this.on("newListener", function(eventName) {
          if (eventName === "message") {
            self2._emitMessage = true;
          }
        });
      }
      connect(port, host) {
        const self2 = this;
        this._connecting = true;
        this.stream.setNoDelay(true);
        this.stream.connect(port, host);
        this.stream.once("connect", function() {
          if (self2._keepAlive) {
            self2.stream.setKeepAlive(true, self2._keepAliveInitialDelayMillis);
          }
          self2.emit("connect");
        });
        const reportStreamError = /* @__PURE__ */ __name(function(error3) {
          if (self2._ending && (error3.code === "ECONNRESET" || error3.code === "EPIPE")) {
            return;
          }
          self2.emit("error", error3);
        }, "reportStreamError");
        this.stream.on("error", reportStreamError);
        this.stream.on("close", function() {
          self2.emit("end");
        });
        if (!this.ssl) {
          return this.attachListeners(this.stream);
        }
        this.stream.once("data", function(buffer) {
          const responseCode = buffer.toString("utf8");
          switch (responseCode) {
            case "S":
              break;
            case "N":
              self2.stream.end();
              return self2.emit("error", new Error("The server does not support SSL connections"));
            default:
              self2.stream.end();
              return self2.emit("error", new Error("There was an error establishing an SSL connection"));
          }
          const options = {
            socket: self2.stream
          };
          if (self2.ssl !== true) {
            Object.assign(options, self2.ssl);
            if ("key" in self2.ssl) {
              options.key = self2.ssl.key;
            }
          }
          const net = require_net();
          if (net.isIP && net.isIP(host) === 0) {
            options.servername = host;
          }
          try {
            self2.stream = getSecureStream(options);
          } catch (err) {
            return self2.emit("error", err);
          }
          self2.attachListeners(self2.stream);
          self2.stream.on("error", reportStreamError);
          self2.emit("sslconnect");
        });
      }
      attachListeners(stream) {
        parse(stream, (msg) => {
          const eventName = msg.name === "error" ? "errorMessage" : msg.name;
          if (this._emitMessage) {
            this.emit("message", msg);
          }
          this.emit(eventName, msg);
        });
      }
      requestSsl() {
        this.stream.write(serialize.requestSsl());
      }
      startup(config2) {
        this.stream.write(serialize.startup(config2));
      }
      cancel(processID, secretKey) {
        this._send(serialize.cancel(processID, secretKey));
      }
      password(password) {
        this._send(serialize.password(password));
      }
      sendSASLInitialResponseMessage(mechanism, initialResponse) {
        this._send(serialize.sendSASLInitialResponseMessage(mechanism, initialResponse));
      }
      sendSCRAMClientFinalMessage(additionalData) {
        this._send(serialize.sendSCRAMClientFinalMessage(additionalData));
      }
      _send(buffer) {
        if (!this.stream.writable) {
          return false;
        }
        return this.stream.write(buffer);
      }
      query(text) {
        this._send(serialize.query(text));
      }
      // send parse message
      parse(query) {
        this._send(serialize.parse(query));
      }
      // send bind message
      bind(config2) {
        this._send(serialize.bind(config2));
      }
      // send execute message
      execute(config2) {
        this._send(serialize.execute(config2));
      }
      flush() {
        if (this.stream.writable) {
          this.stream.write(flushBuffer);
        }
      }
      sync() {
        this._ending = true;
        this._send(syncBuffer);
      }
      ref() {
        this.stream.ref();
      }
      unref() {
        this.stream.unref();
      }
      end() {
        this._ending = true;
        if (!this._connecting || !this.stream.writable) {
          this.stream.end();
          return;
        }
        return this.stream.write(endBuffer, () => {
          this.stream.end();
        });
      }
      close(msg) {
        this._send(serialize.close(msg));
      }
      describe(msg) {
        this._send(serialize.describe(msg));
      }
      sendCopyFromChunk(chunk) {
        this._send(serialize.copyData(chunk));
      }
      endCopyFrom() {
        this._send(serialize.copyDone());
      }
      sendCopyFail(msg) {
        this._send(serialize.copyFail(msg));
      }
    };
    __name(Connection2, "Connection");
    module.exports = Connection2;
  }
});

// node-built-in-modules:path
import libDefault4 from "path";
var require_path = __commonJS({
  "node-built-in-modules:path"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault4;
  }
});

// node-built-in-modules:stream
import libDefault5 from "stream";
var require_stream2 = __commonJS({
  "node-built-in-modules:stream"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault5;
  }
});

// node-built-in-modules:string_decoder
import libDefault6 from "string_decoder";
var require_string_decoder = __commonJS({
  "node-built-in-modules:string_decoder"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = libDefault6;
  }
});

// ../../node_modules/split2/index.js
var require_split2 = __commonJS({
  "../../node_modules/split2/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var { Transform } = require_stream2();
    var { StringDecoder } = require_string_decoder();
    var kLast = Symbol("last");
    var kDecoder = Symbol("decoder");
    function transform(chunk, enc, cb) {
      let list;
      if (this.overflow) {
        const buf = this[kDecoder].write(chunk);
        list = buf.split(this.matcher);
        if (list.length === 1)
          return cb();
        list.shift();
        this.overflow = false;
      } else {
        this[kLast] += this[kDecoder].write(chunk);
        list = this[kLast].split(this.matcher);
      }
      this[kLast] = list.pop();
      for (let i = 0; i < list.length; i++) {
        try {
          push(this, this.mapper(list[i]));
        } catch (error3) {
          return cb(error3);
        }
      }
      this.overflow = this[kLast].length > this.maxLength;
      if (this.overflow && !this.skipOverflow) {
        cb(new Error("maximum buffer reached"));
        return;
      }
      cb();
    }
    __name(transform, "transform");
    function flush(cb) {
      this[kLast] += this[kDecoder].end();
      if (this[kLast]) {
        try {
          push(this, this.mapper(this[kLast]));
        } catch (error3) {
          return cb(error3);
        }
      }
      cb();
    }
    __name(flush, "flush");
    function push(self2, val) {
      if (val !== void 0) {
        self2.push(val);
      }
    }
    __name(push, "push");
    function noop(incoming) {
      return incoming;
    }
    __name(noop, "noop");
    function split(matcher, mapper, options) {
      matcher = matcher || /\r?\n/;
      mapper = mapper || noop;
      options = options || {};
      switch (arguments.length) {
        case 1:
          if (typeof matcher === "function") {
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof matcher === "object" && !(matcher instanceof RegExp) && !matcher[Symbol.split]) {
            options = matcher;
            matcher = /\r?\n/;
          }
          break;
        case 2:
          if (typeof matcher === "function") {
            options = mapper;
            mapper = matcher;
            matcher = /\r?\n/;
          } else if (typeof mapper === "object") {
            options = mapper;
            mapper = noop;
          }
      }
      options = Object.assign({}, options);
      options.autoDestroy = true;
      options.transform = transform;
      options.flush = flush;
      options.readableObjectMode = true;
      const stream = new Transform(options);
      stream[kLast] = "";
      stream[kDecoder] = new StringDecoder("utf8");
      stream.matcher = matcher;
      stream.mapper = mapper;
      stream.maxLength = options.maxLength;
      stream.skipOverflow = options.skipOverflow || false;
      stream.overflow = false;
      stream._destroy = function(err, cb) {
        this._writableState.errorEmitted = false;
        cb(err);
      };
      return stream;
    }
    __name(split, "split");
    module.exports = split;
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/util/legacy-types.mjs
var isRegExp, isDate, isBoolean, isNull, isNullOrUndefined, isNumber, isString, isSymbol, isUndefined, isFunction, isBuffer, isObject, isError, isPrimitive;
var init_legacy_types = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/util/legacy-types.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    isRegExp = /* @__PURE__ */ __name((val) => val instanceof RegExp, "isRegExp");
    isDate = /* @__PURE__ */ __name((val) => val instanceof Date, "isDate");
    isBoolean = /* @__PURE__ */ __name((val) => typeof val === "boolean", "isBoolean");
    isNull = /* @__PURE__ */ __name((val) => val === null, "isNull");
    isNullOrUndefined = /* @__PURE__ */ __name((val) => val === null || val === void 0, "isNullOrUndefined");
    isNumber = /* @__PURE__ */ __name((val) => typeof val === "number", "isNumber");
    isString = /* @__PURE__ */ __name((val) => typeof val === "string", "isString");
    isSymbol = /* @__PURE__ */ __name((val) => typeof val === "symbol", "isSymbol");
    isUndefined = /* @__PURE__ */ __name((val) => val === void 0, "isUndefined");
    isFunction = /* @__PURE__ */ __name((val) => typeof val === "function", "isFunction");
    isBuffer = /* @__PURE__ */ __name((val) => {
      return val && typeof val === "object" && typeof val.copy === "function" && typeof val.fill === "function" && typeof val.readUInt8 === "function";
    }, "isBuffer");
    isObject = /* @__PURE__ */ __name((val) => val !== null && typeof val === "object" && Object.getPrototypeOf(val).isPrototypeOf(Object), "isObject");
    isError = /* @__PURE__ */ __name((val) => val instanceof Error, "isError");
    isPrimitive = /* @__PURE__ */ __name((val) => {
      if (typeof val === "object") {
        return val === null;
      }
      return typeof val !== "function";
    }, "isPrimitive");
  }
});

// ../../node_modules/unenv/dist/runtime/node/internal/util/log.mjs
var init_log = __esm({
  "../../node_modules/unenv/dist/runtime/node/internal/util/log.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});

// ../../node_modules/unenv/dist/runtime/node/util.mjs
import types from "node:util/types";
import { default as default2 } from "node:util/types";
var TextDecoder2, TextEncoder2, _errnoException, _exceptionWithHostPort, getSystemErrorMap, getSystemErrorName, parseEnv, styleText;
var init_util = __esm({
  "../../node_modules/unenv/dist/runtime/node/util.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    init_legacy_types();
    init_log();
    TextDecoder2 = globalThis.TextDecoder;
    TextEncoder2 = globalThis.TextEncoder;
    _errnoException = /* @__PURE__ */ notImplemented("util._errnoException");
    _exceptionWithHostPort = /* @__PURE__ */ notImplemented("util._exceptionWithHostPort");
    getSystemErrorMap = /* @__PURE__ */ notImplemented("util.getSystemErrorMap");
    getSystemErrorName = /* @__PURE__ */ notImplemented("util.getSystemErrorName");
    parseEnv = /* @__PURE__ */ notImplemented("util.parseEnv");
    styleText = /* @__PURE__ */ notImplemented("util.styleText");
  }
});

// ../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/util.mjs
var workerdUtil, MIMEParams, MIMEType, TextDecoder3, TextEncoder3, _extend, aborted, callbackify2, debug4, debuglog, deprecate, format, formatWithOptions, getCallSite, inherits, inspect, isArray, isDeepStrictEqual, log4, parseArgs, promisify, stripVTControlCharacters, toUSVString, transferableAbortController, transferableAbortSignal, types2, util_default;
var init_util2 = __esm({
  "../../node_modules/@cloudflare/unenv-preset/dist/runtime/node/util.mjs"() {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util();
    workerdUtil = process.getBuiltinModule("node:util");
    ({
      MIMEParams,
      MIMEType,
      TextDecoder: TextDecoder3,
      TextEncoder: TextEncoder3,
      _extend: (
        // @ts-expect-error missing types?
        _extend
      ),
      aborted,
      callbackify: callbackify2,
      debug: debug4,
      debuglog,
      deprecate,
      format,
      formatWithOptions,
      getCallSite: (
        // @ts-expect-error unknown type
        getCallSite
      ),
      inherits,
      inspect,
      isArray,
      isDeepStrictEqual,
      log: log4,
      parseArgs,
      promisify,
      stripVTControlCharacters,
      toUSVString,
      transferableAbortController,
      transferableAbortSignal
    } = workerdUtil);
    types2 = workerdUtil.types;
    util_default = {
      /**
       * manually unroll unenv-polyfilled-symbols to make it tree-shakeable
       */
      _errnoException,
      _exceptionWithHostPort,
      // @ts-expect-error unenv has unknown type
      getSystemErrorMap,
      // @ts-expect-error unenv has unknown type
      getSystemErrorName,
      isBoolean,
      isBuffer,
      isDate,
      isError,
      isFunction,
      isNull,
      isNullOrUndefined,
      isNumber,
      isObject,
      isPrimitive,
      isRegExp,
      isString,
      isSymbol,
      isUndefined,
      // @ts-expect-error unenv has unknown type
      parseEnv,
      // @ts-expect-error unenv has unknown type
      styleText,
      /**
       * manually unroll workerd-polyfilled-symbols to make it tree-shakeable
       */
      _extend,
      aborted,
      callbackify: callbackify2,
      debug: debug4,
      debuglog,
      deprecate,
      format,
      formatWithOptions,
      getCallSite,
      inherits,
      inspect,
      isArray,
      isDeepStrictEqual,
      log: log4,
      MIMEParams,
      MIMEType,
      parseArgs,
      promisify,
      stripVTControlCharacters,
      TextDecoder: TextDecoder3,
      TextEncoder: TextEncoder3,
      toUSVString,
      transferableAbortController,
      transferableAbortSignal,
      // special-cased deep merged symbols
      types: types2
    };
  }
});

// node-built-in-modules:util
var require_util2 = __commonJS({
  "node-built-in-modules:util"(exports, module) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_util2();
    module.exports = util_default;
  }
});

// ../../node_modules/pgpass/lib/helper.js
var require_helper = __commonJS({
  "../../node_modules/pgpass/lib/helper.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var Stream = require_stream2().Stream;
    var split = require_split2();
    var util = require_util2();
    var defaultPort = 5432;
    var isWin = process.platform === "win32";
    var warnStream = process.stderr;
    var S_IRWXG2 = 56;
    var S_IRWXO2 = 7;
    var S_IFMT2 = 61440;
    var S_IFREG2 = 32768;
    function isRegFile(mode) {
      return (mode & S_IFMT2) == S_IFREG2;
    }
    __name(isRegFile, "isRegFile");
    var fieldNames = ["host", "port", "database", "user", "password"];
    var nrOfFields = fieldNames.length;
    var passKey = fieldNames[nrOfFields - 1];
    function warn3() {
      var isWritable = warnStream instanceof Stream && true === warnStream.writable;
      if (isWritable) {
        var args = Array.prototype.slice.call(arguments).concat("\n");
        warnStream.write(util.format.apply(util, args));
      }
    }
    __name(warn3, "warn");
    Object.defineProperty(module.exports, "isWin", {
      get: function() {
        return isWin;
      },
      set: function(val) {
        isWin = val;
      }
    });
    module.exports.warnTo = function(stream) {
      var old = warnStream;
      warnStream = stream;
      return old;
    };
    module.exports.getFileName = function(rawEnv) {
      var env2 = rawEnv || process.env;
      var file = env2.PGPASSFILE || (isWin ? path.join(env2.APPDATA || "./", "postgresql", "pgpass.conf") : path.join(env2.HOME || "./", ".pgpass"));
      return file;
    };
    module.exports.usePgPass = function(stats, fname) {
      if (Object.prototype.hasOwnProperty.call(process.env, "PGPASSWORD")) {
        return false;
      }
      if (isWin) {
        return true;
      }
      fname = fname || "<unkn>";
      if (!isRegFile(stats.mode)) {
        warn3('WARNING: password file "%s" is not a plain file', fname);
        return false;
      }
      if (stats.mode & (S_IRWXG2 | S_IRWXO2)) {
        warn3('WARNING: password file "%s" has group or world access; permissions should be u=rw (0600) or less', fname);
        return false;
      }
      return true;
    };
    var matcher = module.exports.match = function(connInfo, entry) {
      return fieldNames.slice(0, -1).reduce(function(prev, field, idx) {
        if (idx == 1) {
          if (Number(connInfo[field] || defaultPort) === Number(entry[field])) {
            return prev && true;
          }
        }
        return prev && (entry[field] === "*" || entry[field] === connInfo[field]);
      }, true);
    };
    module.exports.getPassword = function(connInfo, stream, cb) {
      var pass;
      var lineStream = stream.pipe(split());
      function onLine(line) {
        var entry = parseLine(line);
        if (entry && isValidEntry(entry) && matcher(connInfo, entry)) {
          pass = entry[passKey];
          lineStream.end();
        }
      }
      __name(onLine, "onLine");
      var onEnd = /* @__PURE__ */ __name(function() {
        stream.destroy();
        cb(pass);
      }, "onEnd");
      var onErr = /* @__PURE__ */ __name(function(err) {
        stream.destroy();
        warn3("WARNING: error on reading file: %s", err);
        cb(void 0);
      }, "onErr");
      stream.on("error", onErr);
      lineStream.on("data", onLine).on("end", onEnd).on("error", onErr);
    };
    var parseLine = module.exports.parseLine = function(line) {
      if (line.length < 11 || line.match(/^\s+#/)) {
        return null;
      }
      var curChar = "";
      var prevChar = "";
      var fieldIdx = 0;
      var startIdx = 0;
      var endIdx = 0;
      var obj = {};
      var isLastField = false;
      var addToObj = /* @__PURE__ */ __name(function(idx, i0, i1) {
        var field = line.substring(i0, i1);
        if (!Object.hasOwnProperty.call(process.env, "PGPASS_NO_DEESCAPE")) {
          field = field.replace(/\\([:\\])/g, "$1");
        }
        obj[fieldNames[idx]] = field;
      }, "addToObj");
      for (var i = 0; i < line.length - 1; i += 1) {
        curChar = line.charAt(i + 1);
        prevChar = line.charAt(i);
        isLastField = fieldIdx == nrOfFields - 1;
        if (isLastField) {
          addToObj(fieldIdx, startIdx);
          break;
        }
        if (i >= 0 && curChar == ":" && prevChar !== "\\") {
          addToObj(fieldIdx, startIdx, i + 1);
          startIdx = i + 2;
          fieldIdx += 1;
        }
      }
      obj = Object.keys(obj).length === nrOfFields ? obj : null;
      return obj;
    };
    var isValidEntry = module.exports.isValidEntry = function(entry) {
      var rules = {
        // host
        0: function(x) {
          return x.length > 0;
        },
        // port
        1: function(x) {
          if (x === "*") {
            return true;
          }
          x = Number(x);
          return isFinite(x) && x > 0 && x < 9007199254740992 && Math.floor(x) === x;
        },
        // database
        2: function(x) {
          return x.length > 0;
        },
        // username
        3: function(x) {
          return x.length > 0;
        },
        // password
        4: function(x) {
          return x.length > 0;
        }
      };
      for (var idx = 0; idx < fieldNames.length; idx += 1) {
        var rule = rules[idx];
        var value = entry[fieldNames[idx]] || "";
        var res = rule(value);
        if (!res) {
          return false;
        }
      }
      return true;
    };
  }
});

// ../../node_modules/pgpass/lib/index.js
var require_lib = __commonJS({
  "../../node_modules/pgpass/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var path = require_path();
    var fs = require_fs();
    var helper = require_helper();
    module.exports = function(connInfo, cb) {
      var file = helper.getFileName();
      fs.stat(file, function(err, stat3) {
        if (err || !helper.usePgPass(stat3, file)) {
          return cb(void 0);
        }
        var st = fs.createReadStream(file);
        helper.getPassword(connInfo, st, cb);
      });
    };
    module.exports.warnTo = helper.warnTo;
  }
});

// ../../node_modules/pg/lib/client.js
var require_client = __commonJS({
  "../../node_modules/pg/lib/client.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var utils = require_utils();
    var sasl = require_sasl();
    var TypeOverrides2 = require_type_overrides();
    var ConnectionParameters = require_connection_parameters();
    var Query2 = require_query();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var crypto2 = require_utils2();
    var Client2 = class extends EventEmitter2 {
      constructor(config2) {
        super();
        this.connectionParameters = new ConnectionParameters(config2);
        this.user = this.connectionParameters.user;
        this.database = this.connectionParameters.database;
        this.port = this.connectionParameters.port;
        this.host = this.connectionParameters.host;
        Object.defineProperty(this, "password", {
          configurable: true,
          enumerable: false,
          writable: true,
          value: this.connectionParameters.password
        });
        this.replication = this.connectionParameters.replication;
        const c = config2 || {};
        this._Promise = c.Promise || global.Promise;
        this._types = new TypeOverrides2(c.types);
        this._ending = false;
        this._ended = false;
        this._connecting = false;
        this._connected = false;
        this._connectionError = false;
        this._queryable = true;
        this.enableChannelBinding = Boolean(c.enableChannelBinding);
        this.connection = c.connection || new Connection2({
          stream: c.stream,
          ssl: this.connectionParameters.ssl,
          keepAlive: c.keepAlive || false,
          keepAliveInitialDelayMillis: c.keepAliveInitialDelayMillis || 0,
          encoding: this.connectionParameters.client_encoding || "utf8"
        });
        this.queryQueue = [];
        this.binary = c.binary || defaults2.binary;
        this.processID = null;
        this.secretKey = null;
        this.ssl = this.connectionParameters.ssl || false;
        if (this.ssl && this.ssl.key) {
          Object.defineProperty(this.ssl, "key", {
            enumerable: false
          });
        }
        this._connectionTimeoutMillis = c.connectionTimeoutMillis || 0;
      }
      _errorAllQueries(err) {
        const enqueueError = /* @__PURE__ */ __name((query) => {
          process.nextTick(() => {
            query.handleError(err, this.connection);
          });
        }, "enqueueError");
        if (this.activeQuery) {
          enqueueError(this.activeQuery);
          this.activeQuery = null;
        }
        this.queryQueue.forEach(enqueueError);
        this.queryQueue.length = 0;
      }
      _connect(callback) {
        const self2 = this;
        const con = this.connection;
        this._connectionCallback = callback;
        if (this._connecting || this._connected) {
          const err = new Error("Client has already been connected. You cannot reuse a client.");
          process.nextTick(() => {
            callback(err);
          });
          return;
        }
        this._connecting = true;
        if (this._connectionTimeoutMillis > 0) {
          this.connectionTimeoutHandle = setTimeout(() => {
            con._ending = true;
            con.stream.destroy(new Error("timeout expired"));
          }, this._connectionTimeoutMillis);
          if (this.connectionTimeoutHandle.unref) {
            this.connectionTimeoutHandle.unref();
          }
        }
        if (this.host && this.host.indexOf("/") === 0) {
          con.connect(this.host + "/.s.PGSQL." + this.port);
        } else {
          con.connect(this.port, this.host);
        }
        con.on("connect", function() {
          if (self2.ssl) {
            con.requestSsl();
          } else {
            con.startup(self2.getStartupConf());
          }
        });
        con.on("sslconnect", function() {
          con.startup(self2.getStartupConf());
        });
        this._attachListeners(con);
        con.once("end", () => {
          const error3 = this._ending ? new Error("Connection terminated") : new Error("Connection terminated unexpectedly");
          clearTimeout(this.connectionTimeoutHandle);
          this._errorAllQueries(error3);
          this._ended = true;
          if (!this._ending) {
            if (this._connecting && !this._connectionError) {
              if (this._connectionCallback) {
                this._connectionCallback(error3);
              } else {
                this._handleErrorEvent(error3);
              }
            } else if (!this._connectionError) {
              this._handleErrorEvent(error3);
            }
          }
          process.nextTick(() => {
            this.emit("end");
          });
        });
      }
      connect(callback) {
        if (callback) {
          this._connect(callback);
          return;
        }
        return new this._Promise((resolve, reject) => {
          this._connect((error3) => {
            if (error3) {
              reject(error3);
            } else {
              resolve();
            }
          });
        });
      }
      _attachListeners(con) {
        con.on("authenticationCleartextPassword", this._handleAuthCleartextPassword.bind(this));
        con.on("authenticationMD5Password", this._handleAuthMD5Password.bind(this));
        con.on("authenticationSASL", this._handleAuthSASL.bind(this));
        con.on("authenticationSASLContinue", this._handleAuthSASLContinue.bind(this));
        con.on("authenticationSASLFinal", this._handleAuthSASLFinal.bind(this));
        con.on("backendKeyData", this._handleBackendKeyData.bind(this));
        con.on("error", this._handleErrorEvent.bind(this));
        con.on("errorMessage", this._handleErrorMessage.bind(this));
        con.on("readyForQuery", this._handleReadyForQuery.bind(this));
        con.on("notice", this._handleNotice.bind(this));
        con.on("rowDescription", this._handleRowDescription.bind(this));
        con.on("dataRow", this._handleDataRow.bind(this));
        con.on("portalSuspended", this._handlePortalSuspended.bind(this));
        con.on("emptyQuery", this._handleEmptyQuery.bind(this));
        con.on("commandComplete", this._handleCommandComplete.bind(this));
        con.on("parseComplete", this._handleParseComplete.bind(this));
        con.on("copyInResponse", this._handleCopyInResponse.bind(this));
        con.on("copyData", this._handleCopyData.bind(this));
        con.on("notification", this._handleNotification.bind(this));
      }
      // TODO(bmc): deprecate pgpass "built in" integration since this.password can be a function
      // it can be supplied by the user if required - this is a breaking change!
      _checkPgPass(cb) {
        const con = this.connection;
        if (typeof this.password === "function") {
          this._Promise.resolve().then(() => this.password()).then((pass) => {
            if (pass !== void 0) {
              if (typeof pass !== "string") {
                con.emit("error", new TypeError("Password must be a string"));
                return;
              }
              this.connectionParameters.password = this.password = pass;
            } else {
              this.connectionParameters.password = this.password = null;
            }
            cb();
          }).catch((err) => {
            con.emit("error", err);
          });
        } else if (this.password !== null) {
          cb();
        } else {
          try {
            const pgPass = require_lib();
            pgPass(this.connectionParameters, (pass) => {
              if (void 0 !== pass) {
                this.connectionParameters.password = this.password = pass;
              }
              cb();
            });
          } catch (e) {
            this.emit("error", e);
          }
        }
      }
      _handleAuthCleartextPassword(msg) {
        this._checkPgPass(() => {
          this.connection.password(this.password);
        });
      }
      _handleAuthMD5Password(msg) {
        this._checkPgPass(async () => {
          try {
            const hashedPassword = await crypto2.postgresMd5PasswordHash(this.user, this.password, msg.salt);
            this.connection.password(hashedPassword);
          } catch (e) {
            this.emit("error", e);
          }
        });
      }
      _handleAuthSASL(msg) {
        this._checkPgPass(() => {
          try {
            this.saslSession = sasl.startSession(msg.mechanisms, this.enableChannelBinding && this.connection.stream);
            this.connection.sendSASLInitialResponseMessage(this.saslSession.mechanism, this.saslSession.response);
          } catch (err) {
            this.connection.emit("error", err);
          }
        });
      }
      async _handleAuthSASLContinue(msg) {
        try {
          await sasl.continueSession(
            this.saslSession,
            this.password,
            msg.data,
            this.enableChannelBinding && this.connection.stream
          );
          this.connection.sendSCRAMClientFinalMessage(this.saslSession.response);
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleAuthSASLFinal(msg) {
        try {
          sasl.finalizeSession(this.saslSession, msg.data);
          this.saslSession = null;
        } catch (err) {
          this.connection.emit("error", err);
        }
      }
      _handleBackendKeyData(msg) {
        this.processID = msg.processID;
        this.secretKey = msg.secretKey;
      }
      _handleReadyForQuery(msg) {
        if (this._connecting) {
          this._connecting = false;
          this._connected = true;
          clearTimeout(this.connectionTimeoutHandle);
          if (this._connectionCallback) {
            this._connectionCallback(null, this);
            this._connectionCallback = null;
          }
          this.emit("connect");
        }
        const { activeQuery } = this;
        this.activeQuery = null;
        this.readyForQuery = true;
        if (activeQuery) {
          activeQuery.handleReadyForQuery(this.connection);
        }
        this._pulseQueryQueue();
      }
      // if we receieve an error event or error message
      // during the connection process we handle it here
      _handleErrorWhileConnecting(err) {
        if (this._connectionError) {
          return;
        }
        this._connectionError = true;
        clearTimeout(this.connectionTimeoutHandle);
        if (this._connectionCallback) {
          return this._connectionCallback(err);
        }
        this.emit("error", err);
      }
      // if we're connected and we receive an error event from the connection
      // this means the socket is dead - do a hard abort of all queries and emit
      // the socket error on the client as well
      _handleErrorEvent(err) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(err);
        }
        this._queryable = false;
        this._errorAllQueries(err);
        this.emit("error", err);
      }
      // handle error messages from the postgres backend
      _handleErrorMessage(msg) {
        if (this._connecting) {
          return this._handleErrorWhileConnecting(msg);
        }
        const activeQuery = this.activeQuery;
        if (!activeQuery) {
          this._handleErrorEvent(msg);
          return;
        }
        this.activeQuery = null;
        activeQuery.handleError(msg, this.connection);
      }
      _handleRowDescription(msg) {
        this.activeQuery.handleRowDescription(msg);
      }
      _handleDataRow(msg) {
        this.activeQuery.handleDataRow(msg);
      }
      _handlePortalSuspended(msg) {
        this.activeQuery.handlePortalSuspended(this.connection);
      }
      _handleEmptyQuery(msg) {
        this.activeQuery.handleEmptyQuery(this.connection);
      }
      _handleCommandComplete(msg) {
        if (this.activeQuery == null) {
          const error3 = new Error("Received unexpected commandComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        this.activeQuery.handleCommandComplete(msg, this.connection);
      }
      _handleParseComplete() {
        if (this.activeQuery == null) {
          const error3 = new Error("Received unexpected parseComplete message from backend.");
          this._handleErrorEvent(error3);
          return;
        }
        if (this.activeQuery.name) {
          this.connection.parsedStatements[this.activeQuery.name] = this.activeQuery.text;
        }
      }
      _handleCopyInResponse(msg) {
        this.activeQuery.handleCopyInResponse(this.connection);
      }
      _handleCopyData(msg) {
        this.activeQuery.handleCopyData(msg, this.connection);
      }
      _handleNotification(msg) {
        this.emit("notification", msg);
      }
      _handleNotice(msg) {
        this.emit("notice", msg);
      }
      getStartupConf() {
        const params = this.connectionParameters;
        const data = {
          user: params.user,
          database: params.database
        };
        const appName = params.application_name || params.fallback_application_name;
        if (appName) {
          data.application_name = appName;
        }
        if (params.replication) {
          data.replication = "" + params.replication;
        }
        if (params.statement_timeout) {
          data.statement_timeout = String(parseInt(params.statement_timeout, 10));
        }
        if (params.lock_timeout) {
          data.lock_timeout = String(parseInt(params.lock_timeout, 10));
        }
        if (params.idle_in_transaction_session_timeout) {
          data.idle_in_transaction_session_timeout = String(parseInt(params.idle_in_transaction_session_timeout, 10));
        }
        if (params.options) {
          data.options = params.options;
        }
        return data;
      }
      cancel(client, query) {
        if (client.activeQuery === query) {
          const con = this.connection;
          if (this.host && this.host.indexOf("/") === 0) {
            con.connect(this.host + "/.s.PGSQL." + this.port);
          } else {
            con.connect(this.port, this.host);
          }
          con.on("connect", function() {
            con.cancel(client.processID, client.secretKey);
          });
        } else if (client.queryQueue.indexOf(query) !== -1) {
          client.queryQueue.splice(client.queryQueue.indexOf(query), 1);
        }
      }
      setTypeParser(oid, format2, parseFn) {
        return this._types.setTypeParser(oid, format2, parseFn);
      }
      getTypeParser(oid, format2) {
        return this._types.getTypeParser(oid, format2);
      }
      // escapeIdentifier and escapeLiteral moved to utility functions & exported
      // on PG
      // re-exported here for backwards compatibility
      escapeIdentifier(str) {
        return utils.escapeIdentifier(str);
      }
      escapeLiteral(str) {
        return utils.escapeLiteral(str);
      }
      _pulseQueryQueue() {
        if (this.readyForQuery === true) {
          this.activeQuery = this.queryQueue.shift();
          if (this.activeQuery) {
            this.readyForQuery = false;
            this.hasExecuted = true;
            const queryError = this.activeQuery.submit(this.connection);
            if (queryError) {
              process.nextTick(() => {
                this.activeQuery.handleError(queryError, this.connection);
                this.readyForQuery = true;
                this._pulseQueryQueue();
              });
            }
          } else if (this.hasExecuted) {
            this.activeQuery = null;
            this.emit("drain");
          }
        }
      }
      query(config2, values, callback) {
        let query;
        let result;
        let readTimeout;
        let readTimeoutTimer;
        let queryCallback;
        if (config2 === null || config2 === void 0) {
          throw new TypeError("Client was passed a null or undefined query");
        } else if (typeof config2.submit === "function") {
          readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
          result = query = config2;
          if (typeof values === "function") {
            query.callback = query.callback || values;
          }
        } else {
          readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
          query = new Query2(config2, values, callback);
          if (!query.callback) {
            result = new this._Promise((resolve, reject) => {
              query.callback = (err, res) => err ? reject(err) : resolve(res);
            }).catch((err) => {
              Error.captureStackTrace(err);
              throw err;
            });
          }
        }
        if (readTimeout) {
          queryCallback = query.callback;
          readTimeoutTimer = setTimeout(() => {
            const error3 = new Error("Query read timeout");
            process.nextTick(() => {
              query.handleError(error3, this.connection);
            });
            queryCallback(error3);
            query.callback = () => {
            };
            const index = this.queryQueue.indexOf(query);
            if (index > -1) {
              this.queryQueue.splice(index, 1);
            }
            this._pulseQueryQueue();
          }, readTimeout);
          query.callback = (err, res) => {
            clearTimeout(readTimeoutTimer);
            queryCallback(err, res);
          };
        }
        if (this.binary && !query.binary) {
          query.binary = true;
        }
        if (query._result && !query._result._types) {
          query._result._types = this._types;
        }
        if (!this._queryable) {
          process.nextTick(() => {
            query.handleError(new Error("Client has encountered a connection error and is not queryable"), this.connection);
          });
          return result;
        }
        if (this._ending) {
          process.nextTick(() => {
            query.handleError(new Error("Client was closed and is not queryable"), this.connection);
          });
          return result;
        }
        this.queryQueue.push(query);
        this._pulseQueryQueue();
        return result;
      }
      ref() {
        this.connection.ref();
      }
      unref() {
        this.connection.unref();
      }
      end(cb) {
        this._ending = true;
        if (!this.connection._connecting || this._ended) {
          if (cb) {
            cb();
          } else {
            return this._Promise.resolve();
          }
        }
        if (this.activeQuery || !this._queryable) {
          this.connection.stream.destroy();
        } else {
          this.connection.end();
        }
        if (cb) {
          this.connection.once("end", cb);
        } else {
          return new this._Promise((resolve) => {
            this.connection.once("end", resolve);
          });
        }
      }
    };
    __name(Client2, "Client");
    Client2.Query = Query2;
    module.exports = Client2;
  }
});

// ../../node_modules/pg-pool/index.js
var require_pg_pool = __commonJS({
  "../../node_modules/pg-pool/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var NOOP = /* @__PURE__ */ __name(function() {
    }, "NOOP");
    var removeWhere = /* @__PURE__ */ __name((list, predicate) => {
      const i = list.findIndex(predicate);
      return i === -1 ? void 0 : list.splice(i, 1)[0];
    }, "removeWhere");
    var IdleItem = class {
      constructor(client, idleListener, timeoutId) {
        this.client = client;
        this.idleListener = idleListener;
        this.timeoutId = timeoutId;
      }
    };
    __name(IdleItem, "IdleItem");
    var PendingItem = class {
      constructor(callback) {
        this.callback = callback;
      }
    };
    __name(PendingItem, "PendingItem");
    function throwOnDoubleRelease() {
      throw new Error("Release called on client which has already been released to the pool.");
    }
    __name(throwOnDoubleRelease, "throwOnDoubleRelease");
    function promisify2(Promise2, callback) {
      if (callback) {
        return { callback, result: void 0 };
      }
      let rej;
      let res;
      const cb = /* @__PURE__ */ __name(function(err, client) {
        err ? rej(err) : res(client);
      }, "cb");
      const result = new Promise2(function(resolve, reject) {
        res = resolve;
        rej = reject;
      }).catch((err) => {
        Error.captureStackTrace(err);
        throw err;
      });
      return { callback: cb, result };
    }
    __name(promisify2, "promisify");
    function makeIdleListener(pool, client) {
      return /* @__PURE__ */ __name(function idleListener(err) {
        err.client = client;
        client.removeListener("error", idleListener);
        client.on("error", () => {
          pool.log("additional client error after disconnection due to error", err);
        });
        pool._remove(client);
        pool.emit("error", err, client);
      }, "idleListener");
    }
    __name(makeIdleListener, "makeIdleListener");
    var Pool2 = class extends EventEmitter2 {
      constructor(options, Client2) {
        super();
        this.options = Object.assign({}, options);
        if (options != null && "password" in options) {
          Object.defineProperty(this.options, "password", {
            configurable: true,
            enumerable: false,
            writable: true,
            value: options.password
          });
        }
        if (options != null && options.ssl && options.ssl.key) {
          Object.defineProperty(this.options.ssl, "key", {
            enumerable: false
          });
        }
        this.options.max = this.options.max || this.options.poolSize || 10;
        this.options.min = this.options.min || 0;
        this.options.maxUses = this.options.maxUses || Infinity;
        this.options.allowExitOnIdle = this.options.allowExitOnIdle || false;
        this.options.maxLifetimeSeconds = this.options.maxLifetimeSeconds || 0;
        this.log = this.options.log || function() {
        };
        this.Client = this.options.Client || Client2 || require_lib2().Client;
        this.Promise = this.options.Promise || global.Promise;
        if (typeof this.options.idleTimeoutMillis === "undefined") {
          this.options.idleTimeoutMillis = 1e4;
        }
        this._clients = [];
        this._idle = [];
        this._expired = /* @__PURE__ */ new WeakSet();
        this._pendingQueue = [];
        this._endCallback = void 0;
        this.ending = false;
        this.ended = false;
      }
      _isFull() {
        return this._clients.length >= this.options.max;
      }
      _isAboveMin() {
        return this._clients.length > this.options.min;
      }
      _pulseQueue() {
        this.log("pulse queue");
        if (this.ended) {
          this.log("pulse queue ended");
          return;
        }
        if (this.ending) {
          this.log("pulse queue on ending");
          if (this._idle.length) {
            this._idle.slice().map((item) => {
              this._remove(item.client);
            });
          }
          if (!this._clients.length) {
            this.ended = true;
            this._endCallback();
          }
          return;
        }
        if (!this._pendingQueue.length) {
          this.log("no queued requests");
          return;
        }
        if (!this._idle.length && this._isFull()) {
          return;
        }
        const pendingItem = this._pendingQueue.shift();
        if (this._idle.length) {
          const idleItem = this._idle.pop();
          clearTimeout(idleItem.timeoutId);
          const client = idleItem.client;
          client.ref && client.ref();
          const idleListener = idleItem.idleListener;
          return this._acquireClient(client, pendingItem, idleListener, false);
        }
        if (!this._isFull()) {
          return this.newClient(pendingItem);
        }
        throw new Error("unexpected condition");
      }
      _remove(client) {
        const removed = removeWhere(this._idle, (item) => item.client === client);
        if (removed !== void 0) {
          clearTimeout(removed.timeoutId);
        }
        this._clients = this._clients.filter((c) => c !== client);
        client.end();
        this.emit("remove", client);
      }
      connect(cb) {
        if (this.ending) {
          const err = new Error("Cannot use a pool after calling end on the pool");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        const response = promisify2(this.Promise, cb);
        const result = response.result;
        if (this._isFull() || this._idle.length) {
          if (this._idle.length) {
            process.nextTick(() => this._pulseQueue());
          }
          if (!this.options.connectionTimeoutMillis) {
            this._pendingQueue.push(new PendingItem(response.callback));
            return result;
          }
          const queueCallback = /* @__PURE__ */ __name((err, res, done) => {
            clearTimeout(tid);
            response.callback(err, res, done);
          }, "queueCallback");
          const pendingItem = new PendingItem(queueCallback);
          const tid = setTimeout(() => {
            removeWhere(this._pendingQueue, (i) => i.callback === queueCallback);
            pendingItem.timedOut = true;
            response.callback(new Error("timeout exceeded when trying to connect"));
          }, this.options.connectionTimeoutMillis);
          if (tid.unref) {
            tid.unref();
          }
          this._pendingQueue.push(pendingItem);
          return result;
        }
        this.newClient(new PendingItem(response.callback));
        return result;
      }
      newClient(pendingItem) {
        const client = new this.Client(this.options);
        this._clients.push(client);
        const idleListener = makeIdleListener(this, client);
        this.log("checking client timeout");
        let tid;
        let timeoutHit = false;
        if (this.options.connectionTimeoutMillis) {
          tid = setTimeout(() => {
            this.log("ending client due to timeout");
            timeoutHit = true;
            client.connection ? client.connection.stream.destroy() : client.end();
          }, this.options.connectionTimeoutMillis);
        }
        this.log("connecting new client");
        client.connect((err) => {
          if (tid) {
            clearTimeout(tid);
          }
          client.on("error", idleListener);
          if (err) {
            this.log("client failed to connect", err);
            this._clients = this._clients.filter((c) => c !== client);
            if (timeoutHit) {
              err = new Error("Connection terminated due to connection timeout", { cause: err });
            }
            this._pulseQueue();
            if (!pendingItem.timedOut) {
              pendingItem.callback(err, void 0, NOOP);
            }
          } else {
            this.log("new client connected");
            if (this.options.maxLifetimeSeconds !== 0) {
              const maxLifetimeTimeout = setTimeout(() => {
                this.log("ending client due to expired lifetime");
                this._expired.add(client);
                const idleIndex = this._idle.findIndex((idleItem) => idleItem.client === client);
                if (idleIndex !== -1) {
                  this._acquireClient(
                    client,
                    new PendingItem((err2, client2, clientRelease) => clientRelease()),
                    idleListener,
                    false
                  );
                }
              }, this.options.maxLifetimeSeconds * 1e3);
              maxLifetimeTimeout.unref();
              client.once("end", () => clearTimeout(maxLifetimeTimeout));
            }
            return this._acquireClient(client, pendingItem, idleListener, true);
          }
        });
      }
      // acquire a client for a pending work item
      _acquireClient(client, pendingItem, idleListener, isNew) {
        if (isNew) {
          this.emit("connect", client);
        }
        this.emit("acquire", client);
        client.release = this._releaseOnce(client, idleListener);
        client.removeListener("error", idleListener);
        if (!pendingItem.timedOut) {
          if (isNew && this.options.verify) {
            this.options.verify(client, (err) => {
              if (err) {
                client.release(err);
                return pendingItem.callback(err, void 0, NOOP);
              }
              pendingItem.callback(void 0, client, client.release);
            });
          } else {
            pendingItem.callback(void 0, client, client.release);
          }
        } else {
          if (isNew && this.options.verify) {
            this.options.verify(client, client.release);
          } else {
            client.release();
          }
        }
      }
      // returns a function that wraps _release and throws if called more than once
      _releaseOnce(client, idleListener) {
        let released = false;
        return (err) => {
          if (released) {
            throwOnDoubleRelease();
          }
          released = true;
          this._release(client, idleListener, err);
        };
      }
      // release a client back to the poll, include an error
      // to remove it from the pool
      _release(client, idleListener, err) {
        client.on("error", idleListener);
        client._poolUseCount = (client._poolUseCount || 0) + 1;
        this.emit("release", err, client);
        if (err || this.ending || !client._queryable || client._ending || client._poolUseCount >= this.options.maxUses) {
          if (client._poolUseCount >= this.options.maxUses) {
            this.log("remove expended client");
          }
          this._remove(client);
          this._pulseQueue();
          return;
        }
        const isExpired = this._expired.has(client);
        if (isExpired) {
          this.log("remove expired client");
          this._expired.delete(client);
          this._remove(client);
          this._pulseQueue();
          return;
        }
        let tid;
        if (this.options.idleTimeoutMillis && this._isAboveMin()) {
          tid = setTimeout(() => {
            this.log("remove idle client");
            this._remove(client);
          }, this.options.idleTimeoutMillis);
          if (this.options.allowExitOnIdle) {
            tid.unref();
          }
        }
        if (this.options.allowExitOnIdle) {
          client.unref();
        }
        this._idle.push(new IdleItem(client, idleListener, tid));
        this._pulseQueue();
      }
      query(text, values, cb) {
        if (typeof text === "function") {
          const response2 = promisify2(this.Promise, text);
          setImmediate(function() {
            return response2.callback(new Error("Passing a function as the first parameter to pool.query is not supported"));
          });
          return response2.result;
        }
        if (typeof values === "function") {
          cb = values;
          values = void 0;
        }
        const response = promisify2(this.Promise, cb);
        cb = response.callback;
        this.connect((err, client) => {
          if (err) {
            return cb(err);
          }
          let clientReleased = false;
          const onError = /* @__PURE__ */ __name((err2) => {
            if (clientReleased) {
              return;
            }
            clientReleased = true;
            client.release(err2);
            cb(err2);
          }, "onError");
          client.once("error", onError);
          this.log("dispatching query");
          try {
            client.query(text, values, (err2, res) => {
              this.log("query dispatched");
              client.removeListener("error", onError);
              if (clientReleased) {
                return;
              }
              clientReleased = true;
              client.release(err2);
              if (err2) {
                return cb(err2);
              }
              return cb(void 0, res);
            });
          } catch (err2) {
            client.release(err2);
            return cb(err2);
          }
        });
        return response.result;
      }
      end(cb) {
        this.log("ending");
        if (this.ending) {
          const err = new Error("Called end on pool more than once");
          return cb ? cb(err) : this.Promise.reject(err);
        }
        this.ending = true;
        const promised = promisify2(this.Promise, cb);
        this._endCallback = promised.callback;
        this._pulseQueue();
        return promised.result;
      }
      get waitingCount() {
        return this._pendingQueue.length;
      }
      get idleCount() {
        return this._idle.length;
      }
      get expiredCount() {
        return this._clients.reduce((acc, client) => acc + (this._expired.has(client) ? 1 : 0), 0);
      }
      get totalCount() {
        return this._clients.length;
      }
    };
    __name(Pool2, "Pool");
    module.exports = Pool2;
  }
});

// ../../node_modules/pg/lib/native/query.js
var require_query2 = __commonJS({
  "../../node_modules/pg/lib/native/query.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util2();
    var utils = require_utils();
    var NativeQuery = module.exports = function(config2, values, callback) {
      EventEmitter2.call(this);
      config2 = utils.normalizeQueryConfig(config2, values, callback);
      this.text = config2.text;
      this.values = config2.values;
      this.name = config2.name;
      this.queryMode = config2.queryMode;
      this.callback = config2.callback;
      this.state = "new";
      this._arrayMode = config2.rowMode === "array";
      this._emitRowEvents = false;
      this.on(
        "newListener",
        function(event) {
          if (event === "row")
            this._emitRowEvents = true;
        }.bind(this)
      );
    };
    util.inherits(NativeQuery, EventEmitter2);
    var errorFieldMap = {
      sqlState: "code",
      statementPosition: "position",
      messagePrimary: "message",
      context: "where",
      schemaName: "schema",
      tableName: "table",
      columnName: "column",
      dataTypeName: "dataType",
      constraintName: "constraint",
      sourceFile: "file",
      sourceLine: "line",
      sourceFunction: "routine"
    };
    NativeQuery.prototype.handleError = function(err) {
      const fields = this.native.pq.resultErrorFields();
      if (fields) {
        for (const key in fields) {
          const normalizedFieldName = errorFieldMap[key] || key;
          err[normalizedFieldName] = fields[key];
        }
      }
      if (this.callback) {
        this.callback(err);
      } else {
        this.emit("error", err);
      }
      this.state = "error";
    };
    NativeQuery.prototype.then = function(onSuccess, onFailure) {
      return this._getPromise().then(onSuccess, onFailure);
    };
    NativeQuery.prototype.catch = function(callback) {
      return this._getPromise().catch(callback);
    };
    NativeQuery.prototype._getPromise = function() {
      if (this._promise)
        return this._promise;
      this._promise = new Promise(
        function(resolve, reject) {
          this._once("end", resolve);
          this._once("error", reject);
        }.bind(this)
      );
      return this._promise;
    };
    NativeQuery.prototype.submit = function(client) {
      this.state = "running";
      const self2 = this;
      this.native = client.native;
      client.native.arrayMode = this._arrayMode;
      let after = /* @__PURE__ */ __name(function(err, rows, results) {
        client.native.arrayMode = false;
        setImmediate(function() {
          self2.emit("_done");
        });
        if (err) {
          return self2.handleError(err);
        }
        if (self2._emitRowEvents) {
          if (results.length > 1) {
            rows.forEach((rowOfRows, i) => {
              rowOfRows.forEach((row) => {
                self2.emit("row", row, results[i]);
              });
            });
          } else {
            rows.forEach(function(row) {
              self2.emit("row", row, results);
            });
          }
        }
        self2.state = "end";
        self2.emit("end", results);
        if (self2.callback) {
          self2.callback(null, results);
        }
      }, "after");
      if (process.domain) {
        after = process.domain.bind(after);
      }
      if (this.name) {
        if (this.name.length > 63) {
          console.error("Warning! Postgres only supports 63 characters for query names.");
          console.error("You supplied %s (%s)", this.name, this.name.length);
          console.error("This can cause conflicts and silent errors executing queries");
        }
        const values = (this.values || []).map(utils.prepareValue);
        if (client.namedQueries[this.name]) {
          if (this.text && client.namedQueries[this.name] !== this.text) {
            const err = new Error(`Prepared statements must be unique - '${this.name}' was used for a different statement`);
            return after(err);
          }
          return client.native.execute(this.name, values, after);
        }
        return client.native.prepare(this.name, this.text, values.length, function(err) {
          if (err)
            return after(err);
          client.namedQueries[self2.name] = self2.text;
          return self2.native.execute(self2.name, values, after);
        });
      } else if (this.values) {
        if (!Array.isArray(this.values)) {
          const err = new Error("Query values must be an array");
          return after(err);
        }
        const vals = this.values.map(utils.prepareValue);
        client.native.query(this.text, vals, after);
      } else if (this.queryMode === "extended") {
        client.native.query(this.text, [], after);
      } else {
        client.native.query(this.text, after);
      }
    };
  }
});

// ../../node_modules/pg/lib/native/client.js
var require_client2 = __commonJS({
  "../../node_modules/pg/lib/native/client.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Native;
    try {
      Native = __require("pg-native");
    } catch (e) {
      throw e;
    }
    var TypeOverrides2 = require_type_overrides();
    var EventEmitter2 = require_events().EventEmitter;
    var util = require_util2();
    var ConnectionParameters = require_connection_parameters();
    var NativeQuery = require_query2();
    var Client2 = module.exports = function(config2) {
      EventEmitter2.call(this);
      config2 = config2 || {};
      this._Promise = config2.Promise || global.Promise;
      this._types = new TypeOverrides2(config2.types);
      this.native = new Native({
        types: this._types
      });
      this._queryQueue = [];
      this._ending = false;
      this._connecting = false;
      this._connected = false;
      this._queryable = true;
      const cp3 = this.connectionParameters = new ConnectionParameters(config2);
      if (config2.nativeConnectionString)
        cp3.nativeConnectionString = config2.nativeConnectionString;
      this.user = cp3.user;
      Object.defineProperty(this, "password", {
        configurable: true,
        enumerable: false,
        writable: true,
        value: cp3.password
      });
      this.database = cp3.database;
      this.host = cp3.host;
      this.port = cp3.port;
      this.namedQueries = {};
    };
    Client2.Query = NativeQuery;
    util.inherits(Client2, EventEmitter2);
    Client2.prototype._errorAllQueries = function(err) {
      const enqueueError = /* @__PURE__ */ __name((query) => {
        process.nextTick(() => {
          query.native = this.native;
          query.handleError(err);
        });
      }, "enqueueError");
      if (this._hasActiveQuery()) {
        enqueueError(this._activeQuery);
        this._activeQuery = null;
      }
      this._queryQueue.forEach(enqueueError);
      this._queryQueue.length = 0;
    };
    Client2.prototype._connect = function(cb) {
      const self2 = this;
      if (this._connecting) {
        process.nextTick(() => cb(new Error("Client has already been connected. You cannot reuse a client.")));
        return;
      }
      this._connecting = true;
      this.connectionParameters.getLibpqConnectionString(function(err, conString) {
        if (self2.connectionParameters.nativeConnectionString)
          conString = self2.connectionParameters.nativeConnectionString;
        if (err)
          return cb(err);
        self2.native.connect(conString, function(err2) {
          if (err2) {
            self2.native.end();
            return cb(err2);
          }
          self2._connected = true;
          self2.native.on("error", function(err3) {
            self2._queryable = false;
            self2._errorAllQueries(err3);
            self2.emit("error", err3);
          });
          self2.native.on("notification", function(msg) {
            self2.emit("notification", {
              channel: msg.relname,
              payload: msg.extra
            });
          });
          self2.emit("connect");
          self2._pulseQueryQueue(true);
          cb();
        });
      });
    };
    Client2.prototype.connect = function(callback) {
      if (callback) {
        this._connect(callback);
        return;
      }
      return new this._Promise((resolve, reject) => {
        this._connect((error3) => {
          if (error3) {
            reject(error3);
          } else {
            resolve();
          }
        });
      });
    };
    Client2.prototype.query = function(config2, values, callback) {
      let query;
      let result;
      let readTimeout;
      let readTimeoutTimer;
      let queryCallback;
      if (config2 === null || config2 === void 0) {
        throw new TypeError("Client was passed a null or undefined query");
      } else if (typeof config2.submit === "function") {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        result = query = config2;
        if (typeof values === "function") {
          config2.callback = values;
        }
      } else {
        readTimeout = config2.query_timeout || this.connectionParameters.query_timeout;
        query = new NativeQuery(config2, values, callback);
        if (!query.callback) {
          let resolveOut, rejectOut;
          result = new this._Promise((resolve, reject) => {
            resolveOut = resolve;
            rejectOut = reject;
          }).catch((err) => {
            Error.captureStackTrace(err);
            throw err;
          });
          query.callback = (err, res) => err ? rejectOut(err) : resolveOut(res);
        }
      }
      if (readTimeout) {
        queryCallback = query.callback;
        readTimeoutTimer = setTimeout(() => {
          const error3 = new Error("Query read timeout");
          process.nextTick(() => {
            query.handleError(error3, this.connection);
          });
          queryCallback(error3);
          query.callback = () => {
          };
          const index = this._queryQueue.indexOf(query);
          if (index > -1) {
            this._queryQueue.splice(index, 1);
          }
          this._pulseQueryQueue();
        }, readTimeout);
        query.callback = (err, res) => {
          clearTimeout(readTimeoutTimer);
          queryCallback(err, res);
        };
      }
      if (!this._queryable) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client has encountered a connection error and is not queryable"));
        });
        return result;
      }
      if (this._ending) {
        query.native = this.native;
        process.nextTick(() => {
          query.handleError(new Error("Client was closed and is not queryable"));
        });
        return result;
      }
      this._queryQueue.push(query);
      this._pulseQueryQueue();
      return result;
    };
    Client2.prototype.end = function(cb) {
      const self2 = this;
      this._ending = true;
      if (!this._connected) {
        this.once("connect", this.end.bind(this, cb));
      }
      let result;
      if (!cb) {
        result = new this._Promise(function(resolve, reject) {
          cb = /* @__PURE__ */ __name((err) => err ? reject(err) : resolve(), "cb");
        });
      }
      this.native.end(function() {
        self2._errorAllQueries(new Error("Connection terminated"));
        process.nextTick(() => {
          self2.emit("end");
          if (cb)
            cb();
        });
      });
      return result;
    };
    Client2.prototype._hasActiveQuery = function() {
      return this._activeQuery && this._activeQuery.state !== "error" && this._activeQuery.state !== "end";
    };
    Client2.prototype._pulseQueryQueue = function(initialConnection) {
      if (!this._connected) {
        return;
      }
      if (this._hasActiveQuery()) {
        return;
      }
      const query = this._queryQueue.shift();
      if (!query) {
        if (!initialConnection) {
          this.emit("drain");
        }
        return;
      }
      this._activeQuery = query;
      query.submit(this);
      const self2 = this;
      query.once("_done", function() {
        self2._pulseQueryQueue();
      });
    };
    Client2.prototype.cancel = function(query) {
      if (this._activeQuery === query) {
        this.native.cancel(function() {
        });
      } else if (this._queryQueue.indexOf(query) !== -1) {
        this._queryQueue.splice(this._queryQueue.indexOf(query), 1);
      }
    };
    Client2.prototype.ref = function() {
    };
    Client2.prototype.unref = function() {
    };
    Client2.prototype.setTypeParser = function(oid, format2, parseFn) {
      return this._types.setTypeParser(oid, format2, parseFn);
    };
    Client2.prototype.getTypeParser = function(oid, format2) {
      return this._types.getTypeParser(oid, format2);
    };
  }
});

// ../../node_modules/pg/lib/native/index.js
var require_native = __commonJS({
  "../../node_modules/pg/lib/native/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_client2();
  }
});

// ../../node_modules/pg/lib/index.js
var require_lib2 = __commonJS({
  "../../node_modules/pg/lib/index.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var Client2 = require_client();
    var defaults2 = require_defaults();
    var Connection2 = require_connection();
    var Result2 = require_result();
    var utils = require_utils();
    var Pool2 = require_pg_pool();
    var TypeOverrides2 = require_type_overrides();
    var { DatabaseError: DatabaseError2 } = require_dist2();
    var { escapeIdentifier: escapeIdentifier2, escapeLiteral: escapeLiteral2 } = require_utils();
    var poolFactory = /* @__PURE__ */ __name((Client3) => {
      return /* @__PURE__ */ __name(class BoundPool extends Pool2 {
        constructor(options) {
          super(options, Client3);
        }
      }, "BoundPool");
    }, "poolFactory");
    var PG = /* @__PURE__ */ __name(function(clientConstructor) {
      this.defaults = defaults2;
      this.Client = clientConstructor;
      this.Query = this.Client.Query;
      this.Pool = poolFactory(this.Client);
      this._pools = [];
      this.Connection = Connection2;
      this.types = require_pg_types();
      this.DatabaseError = DatabaseError2;
      this.TypeOverrides = TypeOverrides2;
      this.escapeIdentifier = escapeIdentifier2;
      this.escapeLiteral = escapeLiteral2;
      this.Result = Result2;
      this.utils = utils;
    }, "PG");
    if (typeof process.env.NODE_PG_FORCE_NATIVE !== "undefined") {
      module.exports = new PG(require_native());
    } else {
      module.exports = new PG(Client2);
      Object.defineProperty(module.exports, "native", {
        configurable: true,
        enumerable: false,
        get() {
          let native = null;
          try {
            native = new PG(require_native());
          } catch (err) {
            if (err.code !== "MODULE_NOT_FOUND") {
              throw err;
            }
          }
          Object.defineProperty(module.exports, "native", {
            value: native
          });
          return native;
        }
      });
    }
  }
});

// ../../node_modules/postgres-array/index.js
var require_postgres_array2 = __commonJS({
  "../../node_modules/postgres-array/index.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var BACKSLASH = "\\";
    var DQUOT = '"';
    var LBRACE = "{";
    var RBRACE = "}";
    var LBRACKET = "[";
    var EQUALS = "=";
    var COMMA = ",";
    var NULL_STRING = "NULL";
    function makeParseArrayWithTransform(transform) {
      const haveTransform = transform != null;
      return /* @__PURE__ */ __name(function parseArray3(str) {
        const rbraceIndex = str.length - 1;
        if (rbraceIndex === 1) {
          return [];
        }
        if (str[rbraceIndex] !== RBRACE) {
          throw new Error("Invalid array text - must end with }");
        }
        let position = 0;
        if (str[position] === LBRACKET) {
          position = str.indexOf(EQUALS) + 1;
        }
        if (str[position++] !== LBRACE) {
          throw new Error("Invalid array text - must start with {");
        }
        const output = [];
        let current = output;
        const stack = [];
        let currentStringStart = position;
        let currentString = "";
        let expectValue = true;
        for (; position < rbraceIndex; ++position) {
          let char = str[position];
          if (char === DQUOT) {
            currentStringStart = ++position;
            let dquot = str.indexOf(DQUOT, currentStringStart);
            let backSlash = str.indexOf(BACKSLASH, currentStringStart);
            while (backSlash !== -1 && backSlash < dquot) {
              position = backSlash;
              const part2 = str.slice(currentStringStart, position);
              currentString += part2;
              currentStringStart = ++position;
              if (dquot === position++) {
                dquot = str.indexOf(DQUOT, position);
              }
              backSlash = str.indexOf(BACKSLASH, position);
            }
            position = dquot;
            const part = str.slice(currentStringStart, position);
            currentString += part;
            current.push(haveTransform ? transform(currentString) : currentString);
            currentString = "";
            expectValue = false;
          } else if (char === LBRACE) {
            const newArray = [];
            current.push(newArray);
            stack.push(current);
            current = newArray;
            currentStringStart = position + 1;
            expectValue = true;
          } else if (char === COMMA) {
            expectValue = true;
          } else if (char === RBRACE) {
            expectValue = false;
            const arr = stack.pop();
            if (arr === void 0) {
              throw new Error("Invalid array text - too many '}'");
            }
            current = arr;
          } else if (expectValue) {
            currentStringStart = position;
            while ((char = str[position]) !== COMMA && char !== RBRACE && position < rbraceIndex) {
              ++position;
            }
            const part = str.slice(currentStringStart, position--);
            current.push(
              part === NULL_STRING ? null : haveTransform ? transform(part) : part
            );
            expectValue = false;
          } else {
            throw new Error("Was expecting delimeter");
          }
        }
        return output;
      }, "parseArray");
    }
    __name(makeParseArrayWithTransform, "makeParseArrayWithTransform");
    var parseArray2 = makeParseArrayWithTransform();
    exports.parse = (source, transform) => transform != null ? makeParseArrayWithTransform(transform)(source) : parseArray2(source);
  }
});

// ../../packages/db/generated/node/runtime/index-browser.js
var require_index_browser = __commonJS({
  "../../packages/db/generated/node/runtime/index-browser.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var pe = Object.defineProperty;
    var Xe = Object.getOwnPropertyDescriptor;
    var Ke = Object.getOwnPropertyNames;
    var Qe = Object.prototype.hasOwnProperty;
    var Ye = /* @__PURE__ */ __name((e) => {
      throw TypeError(e);
    }, "Ye");
    var Oe = /* @__PURE__ */ __name((e, n) => {
      for (var i in n)
        pe(e, i, { get: n[i], enumerable: true });
    }, "Oe");
    var xe = /* @__PURE__ */ __name((e, n, i, t) => {
      if (n && typeof n == "object" || typeof n == "function")
        for (let r of Ke(n))
          !Qe.call(e, r) && r !== i && pe(e, r, { get: () => n[r], enumerable: !(t = Xe(n, r)) || t.enumerable });
      return e;
    }, "xe");
    var ze = /* @__PURE__ */ __name((e) => xe(pe({}, "__esModule", { value: true }), e), "ze");
    var ne = /* @__PURE__ */ __name((e, n, i) => n.has(e) ? Ye("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(e) : n.set(e, i), "ne");
    var ii = {};
    Oe(ii, { Decimal: () => Je, Public: () => ge, getRuntime: () => _e, makeStrictEnum: () => qe, objectEnumValues: () => Ae });
    module.exports = ze(ii);
    var ge = {};
    Oe(ge, { validator: () => Re });
    function Re(...e) {
      return (n) => n;
    }
    __name(Re, "Re");
    var ie = Symbol();
    var me = /* @__PURE__ */ new WeakMap();
    var we = /* @__PURE__ */ __name(class {
      constructor(n) {
        n === ie ? me.set(this, "Prisma.".concat(this._getName())) : me.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return me.get(this);
      }
    }, "we");
    var G = /* @__PURE__ */ __name(class extends we {
      _getNamespace() {
        return "NullTypes";
      }
    }, "G");
    var Ne;
    var J = /* @__PURE__ */ __name(class extends G {
      constructor() {
        super(...arguments);
        ne(this, Ne);
      }
    }, "J");
    Ne = /* @__PURE__ */ new WeakMap();
    ke(J, "DbNull");
    var ve;
    var X = /* @__PURE__ */ __name(class extends G {
      constructor() {
        super(...arguments);
        ne(this, ve);
      }
    }, "X");
    ve = /* @__PURE__ */ new WeakMap();
    ke(X, "JsonNull");
    var Ee;
    var K = /* @__PURE__ */ __name(class extends G {
      constructor() {
        super(...arguments);
        ne(this, Ee);
      }
    }, "K");
    Ee = /* @__PURE__ */ new WeakMap();
    ke(K, "AnyNull");
    var Ae = { classes: { DbNull: J, JsonNull: X, AnyNull: K }, instances: { DbNull: new J(ie), JsonNull: new X(ie), AnyNull: new K(ie) } };
    function ke(e, n) {
      Object.defineProperty(e, "name", { value: n, configurable: true });
    }
    __name(ke, "ke");
    var ye = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function qe(e) {
      return new Proxy(e, { get(n, i) {
        if (i in n)
          return n[i];
        if (!ye.has(i))
          throw new TypeError("Invalid enum value: ".concat(String(i)));
      } });
    }
    __name(qe, "qe");
    var en = /* @__PURE__ */ __name(() => {
      var e, n;
      return ((n = (e = globalThis.process) == null ? void 0 : e.release) == null ? void 0 : n.name) === "node";
    }, "en");
    var nn = /* @__PURE__ */ __name(() => {
      var e, n;
      return !!globalThis.Bun || !!((n = (e = globalThis.process) == null ? void 0 : e.versions) != null && n.bun);
    }, "nn");
    var tn = /* @__PURE__ */ __name(() => !!globalThis.Deno, "tn");
    var rn = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "rn");
    var sn = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "sn");
    var on2 = /* @__PURE__ */ __name(() => {
      var e;
      return ((e = globalThis.navigator) == null ? void 0 : e.userAgent) === "Cloudflare-Workers";
    }, "on");
    function un() {
      var i;
      return (i = [[rn, "netlify"], [sn, "edge-light"], [on2, "workerd"], [tn, "deno"], [nn, "bun"], [en, "node"]].flatMap((t) => t[0]() ? [t[1]] : []).at(0)) != null ? i : "";
    }
    __name(un, "un");
    var fn = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function _e() {
      let e = un();
      return { id: e, prettyName: fn[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
    }
    __name(_e, "_e");
    var V = 9e15;
    var H = 1e9;
    var Se = "0123456789abcdef";
    var se = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
    var oe = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
    var Me = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -V, maxE: V, crypto: false };
    var Le;
    var Z;
    var w = true;
    var fe = "[DecimalError] ";
    var $2 = fe + "Invalid argument: ";
    var Ie = fe + "Precision limit exceeded";
    var Ze = fe + "crypto unavailable";
    var Ue = "[object Decimal]";
    var R = Math.floor;
    var C = Math.pow;
    var cn = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
    var ln = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
    var an = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
    var Be = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
    var D = 1e7;
    var m = 7;
    var dn = 9007199254740991;
    var hn = se.length - 1;
    var Ce = oe.length - 1;
    var h = { toStringTag: Ue };
    h.absoluteValue = h.abs = function() {
      var e = new this.constructor(this);
      return e.s < 0 && (e.s = 1), p(e);
    };
    h.ceil = function() {
      return p(new this.constructor(this), this.e + 1, 2);
    };
    h.clampedTo = h.clamp = function(e, n) {
      var i, t = this, r = t.constructor;
      if (e = new r(e), n = new r(n), !e.s || !n.s)
        return new r(NaN);
      if (e.gt(n))
        throw Error($2 + n);
      return i = t.cmp(e), i < 0 ? e : t.cmp(n) > 0 ? n : new r(t);
    };
    h.comparedTo = h.cmp = function(e) {
      var n, i, t, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, c = s.s, f = e.s;
      if (!o || !u)
        return !c || !f ? NaN : c !== f ? c : o === u ? 0 : !o ^ c < 0 ? 1 : -1;
      if (!o[0] || !u[0])
        return o[0] ? c : u[0] ? -f : 0;
      if (c !== f)
        return c;
      if (s.e !== e.e)
        return s.e > e.e ^ c < 0 ? 1 : -1;
      for (t = o.length, r = u.length, n = 0, i = t < r ? t : r; n < i; ++n)
        if (o[n] !== u[n])
          return o[n] > u[n] ^ c < 0 ? 1 : -1;
      return t === r ? 0 : t > r ^ c < 0 ? 1 : -1;
    };
    h.cosine = h.cos = function() {
      var e, n, i = this, t = i.constructor;
      return i.d ? i.d[0] ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = pn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z == 2 || Z == 3 ? i.neg() : i, e, n, true)) : new t(1) : new t(NaN);
    };
    h.cubeRoot = h.cbrt = function() {
      var e, n, i, t, r, s, o, u, c, f, l = this, a = l.constructor;
      if (!l.isFinite() || l.isZero())
        return new a(l);
      for (w = false, s = l.s * C(l.s * l, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = b(l.d), e = l.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = R((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t = new a(i), t.s = l.s) : t = new a(s.toString()), o = (e = a.precision) + 3; ; )
        if (u = t, c = u.times(u).times(u), f = c.plus(l), t = k(f.plus(l).times(u), f.plus(c), o + 2, 1), b(u.d).slice(0, o) === (i = b(t.d)).slice(0, o))
          if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {
            if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(l))) {
              t = u;
              break;
            }
            o += 4, r = 1;
          } else {
            (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t, e + 1, 1), n = !t.times(t).times(t).eq(l));
            break;
          }
      return w = true, p(t, e, a.rounding, n);
    };
    h.decimalPlaces = h.dp = function() {
      var e, n = this.d, i = NaN;
      if (n) {
        if (e = n.length - 1, i = (e - R(this.e / m)) * m, e = n[e], e)
          for (; e % 10 == 0; e /= 10)
            i--;
        i < 0 && (i = 0);
      }
      return i;
    };
    h.dividedBy = h.div = function(e) {
      return k(this, new this.constructor(e));
    };
    h.dividedToIntegerBy = h.divToInt = function(e) {
      var n = this, i = n.constructor;
      return p(k(n, new i(e), 0, 1, 1), i.precision, i.rounding);
    };
    h.equals = h.eq = function(e) {
      return this.cmp(e) === 0;
    };
    h.floor = function() {
      return p(new this.constructor(this), this.e + 1, 3);
    };
    h.greaterThan = h.gt = function(e) {
      return this.cmp(e) > 0;
    };
    h.greaterThanOrEqualTo = h.gte = function(e) {
      var n = this.cmp(e);
      return n == 1 || n === 0;
    };
    h.hyperbolicCosine = h.cosh = function() {
      var e, n, i, t, r, s = this, o = s.constructor, u = new o(1);
      if (!s.isFinite())
        return new o(s.s ? 1 / 0 : NaN);
      if (s.isZero())
        return u;
      i = o.precision, t = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / le(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), true);
      for (var c, f = e, l = new o(8); f--; )
        c = s.times(s), s = u.minus(c.times(l.minus(c.times(l))));
      return p(s, o.precision = i, o.rounding = t, true);
    };
    h.hyperbolicSine = h.sinh = function() {
      var e, n, i, t, r = this, s = r.constructor;
      if (!r.isFinite() || r.isZero())
        return new s(r);
      if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t = r.d.length, t < 3)
        r = j(s, 2, r, r, true);
      else {
        e = 1.4 * Math.sqrt(t), e = e > 16 ? 16 : e | 0, r = r.times(1 / le(5, e)), r = j(s, 2, r, r, true);
        for (var o, u = new s(5), c = new s(16), f = new s(20); e--; )
          o = r.times(r), r = r.times(u.plus(o.times(c.times(o).plus(f))));
      }
      return s.precision = n, s.rounding = i, p(r, n, i, true);
    };
    h.hyperbolicTangent = h.tanh = function() {
      var e, n, i = this, t = i.constructor;
      return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 7, t.rounding = 1, k(i.sinh(), i.cosh(), t.precision = e, t.rounding = n)) : new t(i.s);
    };
    h.inverseCosine = h.acos = function() {
      var e = this, n = e.constructor, i = e.abs().cmp(1), t = n.precision, r = n.rounding;
      return i !== -1 ? i === 0 ? e.isNeg() ? F(n, t, r) : new n(0) : new n(NaN) : e.isZero() ? F(n, t + 4, r).times(0.5) : (n.precision = t + 6, n.rounding = 1, e = new n(1).minus(e).div(e.plus(1)).sqrt().atan(), n.precision = t, n.rounding = r, e.times(2));
    };
    h.inverseHyperbolicCosine = h.acosh = function() {
      var e, n, i = this, t = i.constructor;
      return i.lte(1) ? new t(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t.precision, n = t.rounding, t.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t.rounding = 1, w = false, i = i.times(i).minus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln()) : new t(i);
    };
    h.inverseHyperbolicSine = h.asinh = function() {
      var e, n, i = this, t = i.constructor;
      return !i.isFinite() || i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t.rounding = 1, w = false, i = i.times(i).plus(1).sqrt().plus(i), w = true, t.precision = e, t.rounding = n, i.ln());
    };
    h.inverseHyperbolicTangent = h.atanh = function() {
      var e, n, i, t, r = this, s = r.constructor;
      return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t = r.sd(), Math.max(t, e) < 2 * -r.e - 1 ? p(new s(r), e, n, true) : (s.precision = i = t - r.e, r = k(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);
    };
    h.inverseSine = h.asin = function() {
      var e, n, i, t, r = this, s = r.constructor;
      return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t = s.rounding, n !== -1 ? n === 0 ? (e = F(s, i + 4, t).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t, r.times(2)));
    };
    h.inverseTangent = h.atan = function() {
      var e, n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding;
      if (f.isFinite()) {
        if (f.isZero())
          return new l(f);
        if (f.abs().eq(1) && a + 4 <= Ce)
          return o = F(l, a + 4, d).times(0.25), o.s = f.s, o;
      } else {
        if (!f.s)
          return new l(NaN);
        if (a + 4 <= Ce)
          return o = F(l, a + 4, d).times(0.5), o.s = f.s, o;
      }
      for (l.precision = u = a + 10, l.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i; e; --e)
        f = f.div(f.times(f).plus(1).sqrt().plus(1));
      for (w = false, n = Math.ceil(u / m), t = 1, c = f.times(f), o = new l(f), r = f; e !== -1; )
        if (r = r.times(c), s = o.minus(r.div(t += 2)), r = r.times(c), o = s.plus(r.div(t += 2)), o.d[n] !== void 0)
          for (e = n; o.d[e] === s.d[e] && e--; )
            ;
      return i && (o = o.times(2 << i - 1)), w = true, p(o, l.precision = a, l.rounding = d, true);
    };
    h.isFinite = function() {
      return !!this.d;
    };
    h.isInteger = h.isInt = function() {
      return !!this.d && R(this.e / m) > this.d.length - 2;
    };
    h.isNaN = function() {
      return !this.s;
    };
    h.isNegative = h.isNeg = function() {
      return this.s < 0;
    };
    h.isPositive = h.isPos = function() {
      return this.s > 0;
    };
    h.isZero = function() {
      return !!this.d && this.d[0] === 0;
    };
    h.lessThan = h.lt = function(e) {
      return this.cmp(e) < 0;
    };
    h.lessThanOrEqualTo = h.lte = function(e) {
      return this.cmp(e) < 1;
    };
    h.logarithm = h.log = function(e) {
      var n, i, t, r, s, o, u, c, f = this, l = f.constructor, a = l.precision, d = l.rounding, g = 5;
      if (e == null)
        e = new l(10), n = true;
      else {
        if (e = new l(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1))
          return new l(NaN);
        n = e.eq(10);
      }
      if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1))
        return new l(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);
      if (n)
        if (i.length > 1)
          s = true;
        else {
          for (r = i[0]; r % 10 === 0; )
            r /= 10;
          s = r !== 1;
        }
      if (w = false, u = a + g, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), Q(c.d, r = a, d))
        do
          if (u += 10, o = B(f, u), t = n ? ue(l, u + 10) : B(e, u), c = k(o, t, u, 1), !s) {
            +b(c.d).slice(r + 1, r + 15) + 1 == 1e14 && (c = p(c, a + 1, 0));
            break;
          }
        while (Q(c.d, r += 10, d));
      return w = true, p(c, a, d);
    };
    h.minus = h.sub = function(e) {
      var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.constructor;
      if (e = new v(e), !g.d || !e.d)
        return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
      if (g.s != e.s)
        return e.s = -e.s, g.plus(e);
      if (f = g.d, d = e.d, u = v.precision, c = v.rounding, !f[0] || !d[0]) {
        if (d[0])
          e.s = -e.s;
        else if (f[0])
          e = new v(g);
        else
          return new v(c === 3 ? -0 : 0);
        return w ? p(e, u, c) : e;
      }
      if (i = R(e.e / m), l = R(g.e / m), f = f.slice(), s = l - i, s) {
        for (a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = l, o = f.length), t = Math.max(Math.ceil(u / m), o) + 2, s > t && (s = t, n.length = 1), n.reverse(), t = s; t--; )
          n.push(0);
        n.reverse();
      } else {
        for (t = f.length, o = d.length, a = t < o, a && (o = t), t = 0; t < o; t++)
          if (f[t] != d[t]) {
            a = f[t] < d[t];
            break;
          }
        s = 0;
      }
      for (a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t = d.length - o; t > 0; --t)
        f[o++] = 0;
      for (t = d.length; t > s; ) {
        if (f[--t] < d[t]) {
          for (r = t; r && f[--r] === 0; )
            f[r] = D - 1;
          --f[r], f[t] += D;
        }
        f[t] -= d[t];
      }
      for (; f[--o] === 0; )
        f.pop();
      for (; f[0] === 0; f.shift())
        --i;
      return f[0] ? (e.d = f, e.e = ce(f, i), w ? p(e, u, c) : e) : new v(c === 3 ? -0 : 0);
    };
    h.modulo = h.mod = function(e) {
      var n, i = this, t = i.constructor;
      return e = new t(e), !i.d || !e.s || e.d && !e.d[0] ? new t(NaN) : !e.d || i.d && !i.d[0] ? p(new t(i), t.precision, t.rounding) : (w = false, t.modulo == 9 ? (n = k(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = k(i, e, 0, t.modulo, 1), n = n.times(e), w = true, i.minus(n));
    };
    h.naturalExponential = h.exp = function() {
      return be(this);
    };
    h.naturalLogarithm = h.ln = function() {
      return B(this);
    };
    h.negated = h.neg = function() {
      var e = new this.constructor(this);
      return e.s = -e.s, p(e);
    };
    h.plus = h.add = function(e) {
      var n, i, t, r, s, o, u, c, f, l, a = this, d = a.constructor;
      if (e = new d(e), !a.d || !e.d)
        return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;
      if (a.s != e.s)
        return e.s = -e.s, a.minus(e);
      if (f = a.d, l = e.d, u = d.precision, c = d.rounding, !f[0] || !l[0])
        return l[0] || (e = new d(a)), w ? p(e, u, c) : e;
      if (s = R(a.e / m), t = R(e.e / m), f = f.slice(), r = s - t, r) {
        for (r < 0 ? (i = f, r = -r, o = l.length) : (i = l, t = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse(); r--; )
          i.push(0);
        i.reverse();
      }
      for (o = f.length, r = l.length, o - r < 0 && (r = o, i = l, l = f, f = i), n = 0; r; )
        n = (f[--r] = f[r] + l[r] + n) / D | 0, f[r] %= D;
      for (n && (f.unshift(n), ++t), o = f.length; f[--o] == 0; )
        f.pop();
      return e.d = f, e.e = ce(f, t), w ? p(e, u, c) : e;
    };
    h.precision = h.sd = function(e) {
      var n, i = this;
      if (e !== void 0 && e !== !!e && e !== 1 && e !== 0)
        throw Error($2 + e);
      return i.d ? (n = $e(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;
    };
    h.round = function() {
      var e = this, n = e.constructor;
      return p(new n(e), e.e + 1, n.rounding);
    };
    h.sine = h.sin = function() {
      var e, n, i = this, t = i.constructor;
      return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + Math.max(i.e, i.sd()) + m, t.rounding = 1, i = mn(t, We(t, i)), t.precision = e, t.rounding = n, p(Z > 2 ? i.neg() : i, e, n, true)) : new t(NaN);
    };
    h.squareRoot = h.sqrt = function() {
      var e, n, i, t, r, s, o = this, u = o.d, c = o.e, f = o.s, l = o.constructor;
      if (f !== 1 || !u || !u[0])
        return new l(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
      for (w = false, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = b(u), (n.length + c) % 2 == 0 && (n += "0"), f = Math.sqrt(n), c = R((c + 1) / 2) - (c < 0 || c % 2), f == 1 / 0 ? n = "5e" + c : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + c), t = new l(n)) : t = new l(f.toString()), i = (c = l.precision) + 3; ; )
        if (s = t, t = s.plus(k(o, s, i + 2, 1)).times(0.5), b(s.d).slice(0, i) === (n = b(t.d)).slice(0, i))
          if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {
            if (!r && (p(s, c + 1, 0), s.times(s).eq(o))) {
              t = s;
              break;
            }
            i += 4, r = 1;
          } else {
            (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t, c + 1, 1), e = !t.times(t).eq(o));
            break;
          }
      return w = true, p(t, c, l.rounding, e);
    };
    h.tangent = h.tan = function() {
      var e, n, i = this, t = i.constructor;
      return i.isFinite() ? i.isZero() ? new t(i) : (e = t.precision, n = t.rounding, t.precision = e + 10, t.rounding = 1, i = i.sin(), i.s = 1, i = k(i, new t(1).minus(i.times(i)).sqrt(), e + 10, 0), t.precision = e, t.rounding = n, p(Z == 2 || Z == 4 ? i.neg() : i, e, n, true)) : new t(NaN);
    };
    h.times = h.mul = function(e) {
      var n, i, t, r, s, o, u, c, f, l = this, a = l.constructor, d = l.d, g = (e = new a(e)).d;
      if (e.s *= l.s, !d || !d[0] || !g || !g[0])
        return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);
      for (i = R(l.e / m) + R(e.e / m), c = d.length, f = g.length, c < f && (s = d, d = g, g = s, o = c, c = f, f = o), s = [], o = c + f, t = o; t--; )
        s.push(0);
      for (t = f; --t >= 0; ) {
        for (n = 0, r = c + t; r > t; )
          u = s[r] + g[t] * d[r - t - 1] + n, s[r--] = u % D | 0, n = u / D | 0;
        s[r] = (s[r] + n) % D | 0;
      }
      for (; !s[--o]; )
        s.pop();
      return n ? ++i : s.shift(), e.d = s, e.e = ce(s, i), w ? p(e, a.precision, a.rounding) : e;
    };
    h.toBinary = function(e, n) {
      return Pe(this, 2, e, n);
    };
    h.toDecimalPlaces = h.toDP = function(e, n) {
      var i = this, t = i.constructor;
      return i = new t(i), e === void 0 ? i : (q(e, 0, H), n === void 0 ? n = t.rounding : q(n, 0, 8), p(i, e + i.e + 1, n));
    };
    h.toExponential = function(e, n) {
      var i, t = this, r = t.constructor;
      return e === void 0 ? i = L(t, true) : (q(e, 0, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e + 1, n), i = L(t, true, e + 1)), t.isNeg() && !t.isZero() ? "-" + i : i;
    };
    h.toFixed = function(e, n) {
      var i, t, r = this, s = r.constructor;
      return e === void 0 ? i = L(r) : (q(e, 0, H), n === void 0 ? n = s.rounding : q(n, 0, 8), t = p(new s(r), e + r.e + 1, n), i = L(t, false, e + t.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;
    };
    h.toFraction = function(e) {
      var n, i, t, r, s, o, u, c, f, l, a, d, g = this, v = g.d, N = g.constructor;
      if (!v)
        return new N(g);
      if (f = i = new N(1), t = c = new N(0), n = new N(t), s = n.e = $e(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null)
        e = s > 0 ? n : f;
      else {
        if (u = new N(e), !u.isInt() || u.lt(f))
          throw Error($2 + u);
        e = u.gt(n) ? s > 0 ? n : f : u;
      }
      for (w = false, u = new N(b(v)), l = N.precision, N.precision = s = v.length * m * 2; a = k(u, n, 0, 1, 1), r = i.plus(a.times(t)), r.cmp(e) != 1; )
        i = t, t = r, r = f, f = c.plus(a.times(r)), c = r, r = n, n = u.minus(a.times(r)), u = r;
      return r = k(e.minus(i), t, 0, 1, 1), c = c.plus(r.times(f)), i = i.plus(r.times(t)), c.s = f.s = g.s, d = k(f, t, s, 1).minus(g).abs().cmp(k(c, i, s, 1).minus(g).abs()) < 1 ? [f, t] : [c, i], N.precision = l, w = true, d;
    };
    h.toHexadecimal = h.toHex = function(e, n) {
      return Pe(this, 16, e, n);
    };
    h.toNearest = function(e, n) {
      var i = this, t = i.constructor;
      if (i = new t(i), e == null) {
        if (!i.d)
          return i;
        e = new t(1), n = t.rounding;
      } else {
        if (e = new t(e), n === void 0 ? n = t.rounding : q(n, 0, 8), !i.d)
          return e.s ? i : e;
        if (!e.d)
          return e.s && (e.s = i.s), e;
      }
      return e.d[0] ? (w = false, i = k(i, e, 0, n, 1).times(e), w = true, p(i)) : (e.s = i.s, i = e), i;
    };
    h.toNumber = function() {
      return +this;
    };
    h.toOctal = function(e, n) {
      return Pe(this, 8, e, n);
    };
    h.toPower = h.pow = function(e) {
      var n, i, t, r, s, o, u = this, c = u.constructor, f = +(e = new c(e));
      if (!u.d || !e.d || !u.d[0] || !e.d[0])
        return new c(C(+u, f));
      if (u = new c(u), u.eq(1))
        return u;
      if (t = c.precision, s = c.rounding, e.eq(1))
        return p(u, t, s);
      if (n = R(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= dn)
        return r = He(c, u, i, t), e.s < 0 ? new c(1).div(r) : p(r, t, s);
      if (o = u.s, o < 0) {
        if (n < e.d.length - 1)
          return new c(NaN);
        if ((e.d[n] & 1) == 0 && (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1)
          return u.s = o, u;
      }
      return i = C(+u, f), n = i == 0 || !isFinite(i) ? R(f * (Math.log("0." + b(u.d)) / Math.LN10 + u.e + 1)) : new c(i + "").e, n > c.maxE + 1 || n < c.minE - 1 ? new c(n > 0 ? o / 0 : 0) : (w = false, c.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = be(e.times(B(u, t + i)), t), r.d && (r = p(r, t + 5, 1), Q(r.d, t, s) && (n = t + 10, r = p(be(e.times(B(u, n + i)), n), n + 5, 1), +b(r.d).slice(t + 1, t + 15) + 1 == 1e14 && (r = p(r, t + 1, 0)))), r.s = o, w = true, c.rounding = s, p(r, t, s));
    };
    h.toPrecision = function(e, n) {
      var i, t = this, r = t.constructor;
      return e === void 0 ? i = L(t, t.e <= r.toExpNeg || t.e >= r.toExpPos) : (q(e, 1, H), n === void 0 ? n = r.rounding : q(n, 0, 8), t = p(new r(t), e, n), i = L(t, e <= t.e || t.e <= r.toExpNeg, e)), t.isNeg() && !t.isZero() ? "-" + i : i;
    };
    h.toSignificantDigits = h.toSD = function(e, n) {
      var i = this, t = i.constructor;
      return e === void 0 ? (e = t.precision, n = t.rounding) : (q(e, 1, H), n === void 0 ? n = t.rounding : q(n, 0, 8)), p(new t(i), e, n);
    };
    h.toString = function() {
      var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
      return e.isNeg() && !e.isZero() ? "-" + i : i;
    };
    h.truncated = h.trunc = function() {
      return p(new this.constructor(this), this.e + 1, 1);
    };
    h.valueOf = h.toJSON = function() {
      var e = this, n = e.constructor, i = L(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
      return e.isNeg() ? "-" + i : i;
    };
    function b(e) {
      var n, i, t, r = e.length - 1, s = "", o = e[0];
      if (r > 0) {
        for (s += o, n = 1; n < r; n++)
          t = e[n] + "", i = m - t.length, i && (s += U(i)), s += t;
        o = e[n], t = o + "", i = m - t.length, i && (s += U(i));
      } else if (o === 0)
        return "0";
      for (; o % 10 === 0; )
        o /= 10;
      return s + o;
    }
    __name(b, "b");
    function q(e, n, i) {
      if (e !== ~~e || e < n || e > i)
        throw Error($2 + e);
    }
    __name(q, "q");
    function Q(e, n, i, t) {
      var r, s, o, u;
      for (s = e[0]; s >= 10; s /= 10)
        --n;
      return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 5e4 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1e3 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t || i < 4) && u == 9999 || !t && i > 3 && u == 4999) : o = ((t || i < 4) && u + 1 == s || !t && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1e3 | 0) == C(10, n - 3) - 1, o;
    }
    __name(Q, "Q");
    function te(e, n, i) {
      for (var t, r = [0], s, o = 0, u = e.length; o < u; ) {
        for (s = r.length; s--; )
          r[s] *= n;
        for (r[0] += Se.indexOf(e.charAt(o++)), t = 0; t < r.length; t++)
          r[t] > i - 1 && (r[t + 1] === void 0 && (r[t + 1] = 0), r[t + 1] += r[t] / i | 0, r[t] %= i);
      }
      return r.reverse();
    }
    __name(te, "te");
    function pn(e, n) {
      var i, t, r;
      if (n.isZero())
        return n;
      t = n.d.length, t < 32 ? (i = Math.ceil(t / 3), r = (1 / le(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));
      for (var s = i; s--; ) {
        var o = n.times(n);
        n = o.times(o).minus(o).times(8).plus(1);
      }
      return e.precision -= i, n;
    }
    __name(pn, "pn");
    var k = function() {
      function e(t, r, s) {
        var o, u = 0, c = t.length;
        for (t = t.slice(); c--; )
          o = t[c] * r + u, t[c] = o % s | 0, u = o / s | 0;
        return u && t.unshift(u), t;
      }
      __name(e, "e");
      function n(t, r, s, o) {
        var u, c;
        if (s != o)
          c = s > o ? 1 : -1;
        else
          for (u = c = 0; u < s; u++)
            if (t[u] != r[u]) {
              c = t[u] > r[u] ? 1 : -1;
              break;
            }
        return c;
      }
      __name(n, "n");
      function i(t, r, s, o) {
        for (var u = 0; s--; )
          t[s] -= u, u = t[s] < r[s] ? 1 : 0, t[s] = u * o + t[s] - r[s];
        for (; !t[0] && t.length > 1; )
          t.shift();
      }
      __name(i, "i");
      return function(t, r, s, o, u, c) {
        var f, l, a, d, g, v, N, A, M, _, E, P, x, I, ae, z, W, de, T, y, ee = t.constructor, he = t.s == r.s ? 1 : -1, O = t.d, S = r.d;
        if (!O || !O[0] || !S || !S[0])
          return new ee(!t.s || !r.s || (O ? S && O[0] == S[0] : !S) ? NaN : O && O[0] == 0 || !S ? he * 0 : he / 0);
        for (c ? (g = 1, l = t.e - r.e) : (c = D, g = m, l = R(t.e / g) - R(r.e / g)), T = S.length, W = O.length, M = new ee(he), _ = M.d = [], a = 0; S[a] == (O[a] || 0); a++)
          ;
        if (S[a] > (O[a] || 0) && l--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t.e - r.e) + 1 : I = s, I < 0)
          _.push(1), v = true;
        else {
          if (I = I / g + 2 | 0, a = 0, T == 1) {
            for (d = 0, S = S[0], I++; (a < W || d) && I--; a++)
              ae = d * c + (O[a] || 0), _[a] = ae / S | 0, d = ae % S | 0;
            v = d || a < W;
          } else {
            for (d = c / (S[0] + 1) | 0, d > 1 && (S = e(S, d, c), O = e(O, d, c), T = S.length, W = O.length), z = T, E = O.slice(0, T), P = E.length; P < T; )
              E[P++] = 0;
            y = S.slice(), y.unshift(0), de = S[0], S[1] >= c / 2 && ++de;
            do
              d = 0, f = n(S, E, T, P), f < 0 ? (x = E[0], T != P && (x = x * c + (E[1] || 0)), d = x / de | 0, d > 1 ? (d >= c && (d = c - 1), N = e(S, d, c), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : S, A, c))) : (d == 0 && (f = d = 1), N = S.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, c), f == -1 && (P = E.length, f = n(S, E, T, P), f < 1 && (d++, i(E, T < P ? y : S, P, c))), P = E.length) : f === 0 && (d++, E = [0]), _[a++] = d, f && E[0] ? E[P++] = O[z] || 0 : (E = [O[z]], P = 1);
            while ((z++ < W || E[0] !== void 0) && I--);
            v = E[0] !== void 0;
          }
          _[0] || _.shift();
        }
        if (g == 1)
          M.e = l, Le = v;
        else {
          for (a = 1, d = _[0]; d >= 10; d /= 10)
            a++;
          M.e = a + l * g - 1, p(M, u ? s + M.e + 1 : s, o, v);
        }
        return M;
      };
    }();
    function p(e, n, i, t) {
      var r, s, o, u, c, f, l, a, d, g = e.constructor;
      e:
        if (n != null) {
          if (a = e.d, !a)
            return e;
          for (r = 1, u = a[0]; u >= 10; u /= 10)
            r++;
          if (s = n - r, s < 0)
            s += m, o = n, l = a[d = 0], c = l / C(10, r - o - 1) % 10 | 0;
          else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u)
            if (t) {
              for (; u++ <= d; )
                a.push(0);
              l = c = 0, r = 1, s %= m, o = s - m + 1;
            } else
              break e;
          else {
            for (l = u = a[d], r = 1; u >= 10; u /= 10)
              r++;
            s %= m, o = s - m + r, c = o < 0 ? 0 : l / C(10, r - o - 1) % 10 | 0;
          }
          if (t = t || n < 0 || a[d + 1] !== void 0 || (o < 0 ? l : l % C(10, r - o - 1)), f = i < 4 ? (c || t) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : c > 5 || c == 5 && (i == 4 || t || i == 6 && (s > 0 ? o > 0 ? l / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0])
            return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;
          if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (l / C(10, r - o) % C(10, o) | 0) * u : 0), f)
            for (; ; )
              if (d == 0) {
                for (s = 1, o = a[0]; o >= 10; o /= 10)
                  s++;
                for (o = a[0] += u, u = 1; o >= 10; o /= 10)
                  u++;
                s != u && (e.e++, a[0] == D && (a[0] = 1));
                break;
              } else {
                if (a[d] += u, a[d] != D)
                  break;
                a[d--] = 0, u = 1;
              }
          for (s = a.length; a[--s] === 0; )
            a.pop();
        }
      return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;
    }
    __name(p, "p");
    function L(e, n, i) {
      if (!e.isFinite())
        return je(e);
      var t, r = e.e, s = b(e.d), o = s.length;
      return n ? (i && (t = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t = i - o) > 0 && (s += U(t))) : r >= o ? (s += U(r + 1 - o), i && (t = i - r - 1) > 0 && (s = s + "." + U(t))) : ((t = r + 1) < o && (s = s.slice(0, t) + "." + s.slice(t)), i && (t = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t))), s;
    }
    __name(L, "L");
    function ce(e, n) {
      var i = e[0];
      for (n *= m; i >= 10; i /= 10)
        n++;
      return n;
    }
    __name(ce, "ce");
    function ue(e, n, i) {
      if (n > hn)
        throw w = true, i && (e.precision = i), Error(Ie);
      return p(new e(se), n, 1, true);
    }
    __name(ue, "ue");
    function F(e, n, i) {
      if (n > Ce)
        throw Error(Ie);
      return p(new e(oe), n, i, true);
    }
    __name(F, "F");
    function $e(e) {
      var n = e.length - 1, i = n * m + 1;
      if (n = e[n], n) {
        for (; n % 10 == 0; n /= 10)
          i--;
        for (n = e[0]; n >= 10; n /= 10)
          i++;
      }
      return i;
    }
    __name($e, "$e");
    function U(e) {
      for (var n = ""; e--; )
        n += "0";
      return n;
    }
    __name(U, "U");
    function He(e, n, i, t) {
      var r, s = new e(1), o = Math.ceil(t / m + 4);
      for (w = false; ; ) {
        if (i % 2 && (s = s.times(n), De(s.d, o) && (r = true)), i = R(i / 2), i === 0) {
          i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];
          break;
        }
        n = n.times(n), De(n.d, o);
      }
      return w = true, s;
    }
    __name(He, "He");
    function Te(e) {
      return e.d[e.d.length - 1] & 1;
    }
    __name(Te, "Te");
    function Ve(e, n, i) {
      for (var t, r, s = new e(n[0]), o = 0; ++o < n.length; ) {
        if (r = new e(n[o]), !r.s) {
          s = r;
          break;
        }
        t = s.cmp(r), (t === i || t === 0 && s.s === i) && (s = r);
      }
      return s;
    }
    __name(Ve, "Ve");
    function be(e, n) {
      var i, t, r, s, o, u, c, f = 0, l = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;
      if (!e.d || !e.d[0] || e.e > 17)
        return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
      for (n == null ? (w = false, c = v) : c = n, u = new d(0.03125); e.e > -2; )
        e = e.times(u), a += 5;
      for (t = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, c += t, i = s = o = new d(1), d.precision = c; ; ) {
        if (s = p(s.times(e), c, 1), i = i.times(++l), u = o.plus(k(s, i, c, 1)), b(u.d).slice(0, c) === b(o.d).slice(0, c)) {
          for (r = a; r--; )
            o = p(o.times(o), c, 1);
          if (n == null)
            if (f < 3 && Q(o.d, c - t, g, f))
              d.precision = c += 10, i = s = u = new d(1), l = 0, f++;
            else
              return p(o, d.precision = v, g, w = true);
          else
            return d.precision = v, o;
        }
        o = u;
      }
    }
    __name(be, "be");
    function B(e, n) {
      var i, t, r, s, o, u, c, f, l, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, _ = M.rounding, E = M.precision;
      if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1)
        return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);
      if (n == null ? (w = false, l = E) : l = n, M.precision = l += v, i = b(A), t = i.charAt(0), Math.abs(s = N.e) < 15e14) {
        for (; t < 7 && t != 1 || t == 1 && i.charAt(1) > 3; )
          N = N.times(e), i = b(N.d), t = i.charAt(0), g++;
        s = N.e, t > 1 ? (N = new M("0." + i), s++) : N = new M(t + "." + i.slice(1));
      } else
        return f = ue(M, l + 2, E).times(s + ""), N = B(new M(t + "." + i.slice(1)), l - v).plus(f), M.precision = E, n == null ? p(N, E, _, w = true) : N;
      for (a = N, c = o = N = k(N.minus(1), N.plus(1), l, 1), d = p(N.times(N), l, 1), r = 3; ; ) {
        if (o = p(o.times(d), l, 1), f = c.plus(k(o, new M(r), l, 1)), b(f.d).slice(0, l) === b(c.d).slice(0, l))
          if (c = c.times(2), s !== 0 && (c = c.plus(ue(M, l + 2, E).times(s + ""))), c = k(c, new M(g), l, 1), n == null)
            if (Q(c.d, l - v, _, u))
              M.precision = l += v, f = o = N = k(a.minus(1), a.plus(1), l, 1), d = p(N.times(N), l, 1), r = u = 1;
            else
              return p(c, M.precision = E, _, w = true);
          else
            return M.precision = E, c;
        c = f, r += 2;
      }
    }
    __name(B, "B");
    function je(e) {
      return String(e.s * e.s / 0);
    }
    __name(je, "je");
    function re(e, n) {
      var i, t, r;
      for ((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t = n.search(/e/i)) > 0 ? (i < 0 && (i = t), i += +n.slice(t + 1), n = n.substring(0, t)) : i < 0 && (i = n.length), t = 0; n.charCodeAt(t) === 48; t++)
        ;
      for (r = n.length; n.charCodeAt(r - 1) === 48; --r)
        ;
      if (n = n.slice(t, r), n) {
        if (r -= t, e.e = i = i - t - 1, e.d = [], t = (i + 1) % m, i < 0 && (t += m), t < r) {
          for (t && e.d.push(+n.slice(0, t)), r -= m; t < r; )
            e.d.push(+n.slice(t, t += m));
          n = n.slice(t), t = m - n.length;
        } else
          t -= r;
        for (; t--; )
          n += "0";
        e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
      } else
        e.e = 0, e.d = [0];
      return e;
    }
    __name(re, "re");
    function gn(e, n) {
      var i, t, r, s, o, u, c, f, l;
      if (n.indexOf("_") > -1) {
        if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Be.test(n))
          return re(e, n);
      } else if (n === "Infinity" || n === "NaN")
        return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
      if (ln.test(n))
        i = 16, n = n.toLowerCase();
      else if (cn.test(n))
        i = 2;
      else if (an.test(n))
        i = 8;
      else
        throw Error($2 + n);
      for (s = n.search(/p/i), s > 0 ? (c = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = He(t, new t(i), s, s * 2)), f = te(n, i, D), l = f.length - 1, s = l; f[s] === 0; --s)
        f.pop();
      return s < 0 ? new t(e.s * 0) : (e.e = ce(f, l), e.d = f, w = false, o && (e = k(e, r, u * 4)), c && (e = e.times(Math.abs(c) < 54 ? C(2, c) : Y.pow(2, c))), w = true, e);
    }
    __name(gn, "gn");
    function mn(e, n) {
      var i, t = n.d.length;
      if (t < 3)
        return n.isZero() ? n : j(e, 2, n, n);
      i = 1.4 * Math.sqrt(t), i = i > 16 ? 16 : i | 0, n = n.times(1 / le(5, i)), n = j(e, 2, n, n);
      for (var r, s = new e(5), o = new e(16), u = new e(20); i--; )
        r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));
      return n;
    }
    __name(mn, "mn");
    function j(e, n, i, t, r) {
      var s, o, u, c, f = 1, l = e.precision, a = Math.ceil(l / m);
      for (w = false, c = i.times(i), u = new e(t); ; ) {
        if (o = k(u.times(c), new e(n++ * n++), l, 1), u = r ? t.plus(o) : t.minus(o), t = k(o.times(c), new e(n++ * n++), l, 1), o = u.plus(t), o.d[a] !== void 0) {
          for (s = a; o.d[s] === u.d[s] && s--; )
            ;
          if (s == -1)
            break;
        }
        s = u, u = t, t = o, o = s, f++;
      }
      return w = true, o.d.length = a + 1, o;
    }
    __name(j, "j");
    function le(e, n) {
      for (var i = e; --n; )
        i *= e;
      return i;
    }
    __name(le, "le");
    function We(e, n) {
      var i, t = n.s < 0, r = F(e, e.precision, 1), s = r.times(0.5);
      if (n = n.abs(), n.lte(s))
        return Z = t ? 4 : 1, n;
      if (i = n.divToInt(r), i.isZero())
        Z = t ? 3 : 2;
      else {
        if (n = n.minus(i.times(r)), n.lte(s))
          return Z = Te(i) ? t ? 2 : 3 : t ? 4 : 1, n;
        Z = Te(i) ? t ? 1 : 4 : t ? 3 : 2;
      }
      return n.minus(r).abs();
    }
    __name(We, "We");
    function Pe(e, n, i, t) {
      var r, s, o, u, c, f, l, a, d, g = e.constructor, v = i !== void 0;
      if (v ? (q(i, 1, H), t === void 0 ? t = g.rounding : q(t, 0, 8)) : (i = g.precision, t = g.rounding), !e.isFinite())
        l = je(e);
      else {
        for (l = L(e), o = l.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (l = l.replace(".", ""), d = new g(1), d.e = l.length - o, d.d = te(L(d), 10, r), d.e = d.d.length), a = te(l, 10, r), s = c = a.length; a[--c] == 0; )
          a.pop();
        if (!a[0])
          l = v ? "0p+0" : "0";
        else {
          if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = k(e, d, i, t, 0, r), a = e.d, s = e.e, f = Le), o = a[i], u = r / 2, f = f || a[i + 1] !== void 0, f = t < 4 ? (o !== void 0 || f) && (t === 0 || t === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t === 4 || f || t === 6 && a[i - 1] & 1 || t === (e.s < 0 ? 8 : 7)), a.length = i, f)
            for (; ++a[--i] > r - 1; )
              a[i] = 0, i || (++s, a.unshift(1));
          for (c = a.length; !a[c - 1]; --c)
            ;
          for (o = 0, l = ""; o < c; o++)
            l += Se.charAt(a[o]);
          if (v) {
            if (c > 1)
              if (n == 16 || n == 8) {
                for (o = n == 16 ? 4 : 3, --c; c % o; c++)
                  l += "0";
                for (a = te(l, r, n), c = a.length; !a[c - 1]; --c)
                  ;
                for (o = 1, l = "1."; o < c; o++)
                  l += Se.charAt(a[o]);
              } else
                l = l.charAt(0) + "." + l.slice(1);
            l = l + (s < 0 ? "p" : "p+") + s;
          } else if (s < 0) {
            for (; ++s; )
              l = "0" + l;
            l = "0." + l;
          } else if (++s > c)
            for (s -= c; s--; )
              l += "0";
          else
            s < c && (l = l.slice(0, s) + "." + l.slice(s));
        }
        l = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + l;
      }
      return e.s < 0 ? "-" + l : l;
    }
    __name(Pe, "Pe");
    function De(e, n) {
      if (e.length > n)
        return e.length = n, true;
    }
    __name(De, "De");
    function wn(e) {
      return new this(e).abs();
    }
    __name(wn, "wn");
    function Nn(e) {
      return new this(e).acos();
    }
    __name(Nn, "Nn");
    function vn(e) {
      return new this(e).acosh();
    }
    __name(vn, "vn");
    function En(e, n) {
      return new this(e).plus(n);
    }
    __name(En, "En");
    function kn(e) {
      return new this(e).asin();
    }
    __name(kn, "kn");
    function Sn(e) {
      return new this(e).asinh();
    }
    __name(Sn, "Sn");
    function Mn(e) {
      return new this(e).atan();
    }
    __name(Mn, "Mn");
    function Cn(e) {
      return new this(e).atanh();
    }
    __name(Cn, "Cn");
    function bn(e, n) {
      e = new this(e), n = new this(n);
      var i, t = this.precision, r = this.rounding, s = t + 4;
      return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = F(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? F(this, t, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = F(this, s, 1).times(0.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(k(e, n, s, 1)), n = F(this, s, 1), this.precision = t, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(k(e, n, s, 1)), i;
    }
    __name(bn, "bn");
    function Pn(e) {
      return new this(e).cbrt();
    }
    __name(Pn, "Pn");
    function On(e) {
      return p(e = new this(e), e.e + 1, 2);
    }
    __name(On, "On");
    function Rn(e, n, i) {
      return new this(e).clamp(n, i);
    }
    __name(Rn, "Rn");
    function An(e) {
      if (!e || typeof e != "object")
        throw Error(fe + "Object expected");
      var n, i, t, r = e.defaults === true, s = ["precision", 1, H, "rounding", 0, 8, "toExpNeg", -V, 0, "toExpPos", 0, V, "maxE", 0, V, "minE", -V, 0, "modulo", 0, 9];
      for (n = 0; n < s.length; n += 3)
        if (i = s[n], r && (this[i] = Me[i]), (t = e[i]) !== void 0)
          if (R(t) === t && t >= s[n + 1] && t <= s[n + 2])
            this[i] = t;
          else
            throw Error($2 + i + ": " + t);
      if (i = "crypto", r && (this[i] = Me[i]), (t = e[i]) !== void 0)
        if (t === true || t === false || t === 0 || t === 1)
          if (t)
            if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
              this[i] = true;
            else
              throw Error(Ze);
          else
            this[i] = false;
        else
          throw Error($2 + i + ": " + t);
      return this;
    }
    __name(An, "An");
    function qn(e) {
      return new this(e).cos();
    }
    __name(qn, "qn");
    function _n(e) {
      return new this(e).cosh();
    }
    __name(_n, "_n");
    function Ge(e) {
      var n, i, t;
      function r(s) {
        var o, u, c, f = this;
        if (!(f instanceof r))
          return new r(s);
        if (f.constructor = r, Fe(s)) {
          f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
          return;
        }
        if (c = typeof s, c === "number") {
          if (s === 0) {
            f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];
            return;
          }
          if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
            for (o = 0, u = s; u >= 10; u /= 10)
              o++;
            w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);
            return;
          }
          if (s * 0 !== 0) {
            s || (f.s = NaN), f.e = NaN, f.d = null;
            return;
          }
          return re(f, s.toString());
        }
        if (c === "string")
          return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Be.test(s) ? re(f, s) : gn(f, s);
        if (c === "bigint")
          return s < 0 ? (s = -s, f.s = -1) : f.s = 1, re(f, s.toString());
        throw Error($2 + s);
      }
      __name(r, "r");
      if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = An, r.clone = Ge, r.isDecimal = Fe, r.abs = wn, r.acos = Nn, r.acosh = vn, r.add = En, r.asin = kn, r.asinh = Sn, r.atan = Mn, r.atanh = Cn, r.atan2 = bn, r.cbrt = Pn, r.ceil = On, r.clamp = Rn, r.cos = qn, r.cosh = _n, r.div = Tn, r.exp = Dn, r.floor = Fn, r.hypot = Ln, r.ln = In, r.log = Zn, r.log10 = Bn, r.log2 = Un, r.max = $n, r.min = Hn, r.mod = Vn, r.mul = jn, r.pow = Wn, r.random = Gn, r.round = Jn, r.sign = Xn, r.sin = Kn, r.sinh = Qn, r.sqrt = Yn, r.sub = xn, r.sum = zn, r.tan = yn, r.tanh = ei, r.trunc = ni, e === void 0 && (e = {}), e && e.defaults !== true)
        for (t = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0; n < t.length; )
          e.hasOwnProperty(i = t[n++]) || (e[i] = this[i]);
      return r.config(e), r;
    }
    __name(Ge, "Ge");
    function Tn(e, n) {
      return new this(e).div(n);
    }
    __name(Tn, "Tn");
    function Dn(e) {
      return new this(e).exp();
    }
    __name(Dn, "Dn");
    function Fn(e) {
      return p(e = new this(e), e.e + 1, 3);
    }
    __name(Fn, "Fn");
    function Ln() {
      var e, n, i = new this(0);
      for (w = false, e = 0; e < arguments.length; )
        if (n = new this(arguments[e++]), n.d)
          i.d && (i = i.plus(n.times(n)));
        else {
          if (n.s)
            return w = true, new this(1 / 0);
          i = n;
        }
      return w = true, i.sqrt();
    }
    __name(Ln, "Ln");
    function Fe(e) {
      return e instanceof Y || e && e.toStringTag === Ue || false;
    }
    __name(Fe, "Fe");
    function In(e) {
      return new this(e).ln();
    }
    __name(In, "In");
    function Zn(e, n) {
      return new this(e).log(n);
    }
    __name(Zn, "Zn");
    function Un(e) {
      return new this(e).log(2);
    }
    __name(Un, "Un");
    function Bn(e) {
      return new this(e).log(10);
    }
    __name(Bn, "Bn");
    function $n() {
      return Ve(this, arguments, -1);
    }
    __name($n, "$n");
    function Hn() {
      return Ve(this, arguments, 1);
    }
    __name(Hn, "Hn");
    function Vn(e, n) {
      return new this(e).mod(n);
    }
    __name(Vn, "Vn");
    function jn(e, n) {
      return new this(e).mul(n);
    }
    __name(jn, "jn");
    function Wn(e, n) {
      return new this(e).pow(n);
    }
    __name(Wn, "Wn");
    function Gn(e) {
      var n, i, t, r, s = 0, o = new this(1), u = [];
      if (e === void 0 ? e = this.precision : q(e, 1, H), t = Math.ceil(e / m), this.crypto)
        if (crypto.getRandomValues)
          for (n = crypto.getRandomValues(new Uint32Array(t)); s < t; )
            r = n[s], r >= 429e7 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;
        else if (crypto.randomBytes) {
          for (n = crypto.randomBytes(t *= 4); s < t; )
            r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 214e7 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);
          s = t / 4;
        } else
          throw Error(Ze);
      else
        for (; s < t; )
          u[s++] = Math.random() * 1e7 | 0;
      for (t = u[--s], e %= m, t && e && (r = C(10, m - e), u[s] = (t / r | 0) * r); u[s] === 0; s--)
        u.pop();
      if (s < 0)
        i = 0, u = [0];
      else {
        for (i = -1; u[0] === 0; i -= m)
          u.shift();
        for (t = 1, r = u[0]; r >= 10; r /= 10)
          t++;
        t < m && (i -= m - t);
      }
      return o.e = i, o.d = u, o;
    }
    __name(Gn, "Gn");
    function Jn(e) {
      return p(e = new this(e), e.e + 1, this.rounding);
    }
    __name(Jn, "Jn");
    function Xn(e) {
      return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
    }
    __name(Xn, "Xn");
    function Kn(e) {
      return new this(e).sin();
    }
    __name(Kn, "Kn");
    function Qn(e) {
      return new this(e).sinh();
    }
    __name(Qn, "Qn");
    function Yn(e) {
      return new this(e).sqrt();
    }
    __name(Yn, "Yn");
    function xn(e, n) {
      return new this(e).sub(n);
    }
    __name(xn, "xn");
    function zn() {
      var e = 0, n = arguments, i = new this(n[e]);
      for (w = false; i.s && ++e < n.length; )
        i = i.plus(n[e]);
      return w = true, p(i, this.precision, this.rounding);
    }
    __name(zn, "zn");
    function yn(e) {
      return new this(e).tan();
    }
    __name(yn, "yn");
    function ei(e) {
      return new this(e).tanh();
    }
    __name(ei, "ei");
    function ni(e) {
      return p(e = new this(e), e.e + 1, 1);
    }
    __name(ni, "ni");
    h[Symbol.for("nodejs.util.inspect.custom")] = h.toString;
    h[Symbol.toStringTag] = "Decimal";
    var Y = h.constructor = Ge(Me);
    se = new Y(se);
    oe = new Y(oe);
    var Je = Y;
  }
});

// ../../packages/db/generated/node/index-browser.js
var require_index_browser2 = __commonJS({
  "../../packages/db/generated/node/index-browser.js"(exports) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      Decimal: Decimal2,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Public: Public2,
      getRuntime: getRuntime2,
      skip: skip2
    } = require_index_browser();
    var Prisma2 = {};
    exports.Prisma = Prisma2;
    exports.$Enums = {};
    Prisma2.prismaVersion = {
      client: "6.8.2",
      engine: "2060c79ba17c6bb9f5823312b6f6b7f4a845738e"
    };
    Prisma2.PrismaClientKnownRequestError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientUnknownRequestError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientRustPanicError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientInitializationError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientValidationError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.Decimal = Decimal2;
    Prisma2.sql = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.empty = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.join = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.raw = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.validator = Public2.validator;
    Prisma2.getExtensionContext = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.defineExtension = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.DbNull = objectEnumValues2.instances.DbNull;
    Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma2.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.PostScalarFieldEnum = {
      id: "id",
      title: "title",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StripePaymentScalarFieldEnum = {
      id: "id",
      clerkUserId: "clerkUserId",
      amount: "amount",
      currency: "currency",
      status: "status",
      stripePaymentId: "stripePaymentId",
      metadata: "metadata",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      username: "username",
      primaryEmailAddress: "primaryEmailAddress",
      imageUrl: "imageUrl",
      clerkUserProperties: "clerkUserProperties",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogTagScalarFieldEnum = {
      id: "id",
      name: "name",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryScalarFieldEnum = {
      id: "id",
      userId: "userId",
      content: "content",
      upvoteCount: "upvoteCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryTagScalarFieldEnum = {
      id: "id",
      entryId: "entryId",
      tagId: "tagId",
      createdAt: "createdAt"
    };
    exports.Prisma.FounderLogReflectionScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullableJsonNullValueInput = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull,
      AnyNull: Prisma2.AnyNull
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.ModelName = {
      Post: "Post",
      StripePayment: "StripePayment",
      User: "User",
      FounderLogTag: "FounderLogTag",
      FounderLogEntry: "FounderLogEntry",
      FounderLogEntryTag: "FounderLogEntryTag",
      FounderLogReflection: "FounderLogReflection"
    };
    var PrismaClient3 = class {
      constructor() {
        return new Proxy(this, {
          get(target, prop) {
            let message;
            const runtime = getRuntime2();
            if (runtime.isEdge) {
              message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
            } else {
              message = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";
            }
            message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
            throw new Error(message);
          }
        });
      }
    };
    __name(PrismaClient3, "PrismaClient");
    exports.PrismaClient = PrismaClient3;
    Object.assign(exports, Prisma2);
  }
});

// ../../packages/db/generated/node/wasm.js
var require_wasm = __commonJS({
  "../../packages/db/generated/node/wasm.js"(exports) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      Decimal: Decimal2,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Public: Public2,
      getRuntime: getRuntime2,
      skip: skip2
    } = require_index_browser();
    var Prisma2 = {};
    exports.Prisma = Prisma2;
    exports.$Enums = {};
    Prisma2.prismaVersion = {
      client: "6.8.2",
      engine: "2060c79ba17c6bb9f5823312b6f6b7f4a845738e"
    };
    Prisma2.PrismaClientKnownRequestError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientUnknownRequestError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientRustPanicError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientInitializationError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.PrismaClientValidationError = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.Decimal = Decimal2;
    Prisma2.sql = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.empty = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.join = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.raw = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.validator = Public2.validator;
    Prisma2.getExtensionContext = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.defineExtension = () => {
      const runtimeName = getRuntime2().prettyName;
      throw new Error(
        `Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`
      );
    };
    Prisma2.DbNull = objectEnumValues2.instances.DbNull;
    Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma2.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.PostScalarFieldEnum = {
      id: "id",
      title: "title",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StripePaymentScalarFieldEnum = {
      id: "id",
      clerkUserId: "clerkUserId",
      amount: "amount",
      currency: "currency",
      status: "status",
      stripePaymentId: "stripePaymentId",
      metadata: "metadata",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      username: "username",
      primaryEmailAddress: "primaryEmailAddress",
      imageUrl: "imageUrl",
      clerkUserProperties: "clerkUserProperties",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogTagScalarFieldEnum = {
      id: "id",
      name: "name",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryScalarFieldEnum = {
      id: "id",
      userId: "userId",
      content: "content",
      upvoteCount: "upvoteCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryTagScalarFieldEnum = {
      id: "id",
      entryId: "entryId",
      tagId: "tagId",
      createdAt: "createdAt"
    };
    exports.Prisma.FounderLogReflectionScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullableJsonNullValueInput = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull,
      AnyNull: Prisma2.AnyNull
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.ModelName = {
      Post: "Post",
      StripePayment: "StripePayment",
      User: "User",
      FounderLogTag: "FounderLogTag",
      FounderLogEntry: "FounderLogEntry",
      FounderLogEntryTag: "FounderLogEntryTag",
      FounderLogReflection: "FounderLogReflection"
    };
    var PrismaClient3 = class {
      constructor() {
        return new Proxy(this, {
          get(target, prop) {
            let message;
            const runtime = getRuntime2();
            if (runtime.isEdge) {
              message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
            } else {
              message = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";
            }
            message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
            throw new Error(message);
          }
        });
      }
    };
    __name(PrismaClient3, "PrismaClient");
    exports.PrismaClient = PrismaClient3;
    Object.assign(exports, Prisma2);
  }
});

// ../../packages/db/generated/edge/runtime/wasm.js
var require_wasm2 = __commonJS({
  "../../packages/db/generated/edge/runtime/wasm.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var zo = Object.create;
    var Ot = Object.defineProperty;
    var Yo = Object.getOwnPropertyDescriptor;
    var Xo = Object.getOwnPropertyNames;
    var Zo = Object.getPrototypeOf;
    var es = Object.prototype.hasOwnProperty;
    var ne = /* @__PURE__ */ __name((t, e) => () => (t && (e = t(t = 0)), e), "ne");
    var Le = /* @__PURE__ */ __name((t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports), "Le");
    var rt = /* @__PURE__ */ __name((t, e) => {
      for (var r in e)
        Ot(t, r, { get: e[r], enumerable: true });
    }, "rt");
    var cn = /* @__PURE__ */ __name((t, e, r, n) => {
      if (e && typeof e == "object" || typeof e == "function")
        for (let i of Xo(e))
          !es.call(t, i) && i !== r && Ot(t, i, { get: () => e[i], enumerable: !(n = Yo(e, i)) || n.enumerable });
      return t;
    }, "cn");
    var nt = /* @__PURE__ */ __name((t, e, r) => (r = t != null ? zo(Zo(t)) : {}, cn(e || !t || !t.__esModule ? Ot(r, "default", { value: t, enumerable: true }) : r, t)), "nt");
    var ts = /* @__PURE__ */ __name((t) => cn(Ot({}, "__esModule", { value: true }), t), "ts");
    function xr(t, e) {
      if (e = e.toLowerCase(), e === "utf8" || e === "utf-8")
        return new y(os.encode(t));
      if (e === "base64" || e === "base64url")
        return t = t.replace(/-/g, "+").replace(/_/g, "/"), t = t.replace(/[^A-Za-z0-9+/]/g, ""), new y([...atob(t)].map((r) => r.charCodeAt(0)));
      if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1")
        return new y([...t].map((r) => r.charCodeAt(0)));
      if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
        let r = new y(t.length * 2), n = new DataView(r.buffer);
        for (let i = 0; i < t.length; i++)
          n.setUint16(i * 2, t.charCodeAt(i), true);
        return r;
      }
      if (e === "hex") {
        let r = new y(t.length / 2);
        for (let n = 0, i = 0; i < t.length; i += 2, n++)
          r[n] = parseInt(t.slice(i, i + 2), 16);
        return r;
      }
      pn(`encoding "${e}"`);
    }
    __name(xr, "xr");
    function rs(t) {
      let r = Object.getOwnPropertyNames(DataView.prototype).filter((a) => a.startsWith("get") || a.startsWith("set")), n = r.map((a) => a.replace("get", "read").replace("set", "write")), i = /* @__PURE__ */ __name((a, f) => function(h = 0) {
        return B(h, "offset"), Y(h, "offset"), V(h, "offset", this.length - 1), new DataView(this.buffer)[r[a]](h, f);
      }, "i"), o = /* @__PURE__ */ __name((a, f) => function(h, T = 0) {
        let C = r[a].match(/set(\w+\d+)/)[1].toLowerCase(), k = is[C];
        return B(T, "offset"), Y(T, "offset"), V(T, "offset", this.length - 1), ns(h, "value", k[0], k[1]), new DataView(this.buffer)[r[a]](T, h, f), T + parseInt(r[a].match(/\d+/)[0]) / 8;
      }, "o"), s = /* @__PURE__ */ __name((a) => {
        a.forEach((f) => {
          f.includes("Uint") && (t[f.replace("Uint", "UInt")] = t[f]), f.includes("Float64") && (t[f.replace("Float64", "Double")] = t[f]), f.includes("Float32") && (t[f.replace("Float32", "Float")] = t[f]);
        });
      }, "s");
      n.forEach((a, f) => {
        a.startsWith("read") && (t[a] = i(f, false), t[a + "LE"] = i(f, true), t[a + "BE"] = i(f, false)), a.startsWith("write") && (t[a] = o(f, false), t[a + "LE"] = o(f, true), t[a + "BE"] = o(f, false)), s([a, a + "LE", a + "BE"]);
      });
    }
    __name(rs, "rs");
    function pn(t) {
      throw new Error(`Buffer polyfill does not implement "${t}"`);
    }
    __name(pn, "pn");
    function Mt(t, e) {
      if (!(t instanceof Uint8Array))
        throw new TypeError(`The "${e}" argument must be an instance of Buffer or Uint8Array`);
    }
    __name(Mt, "Mt");
    function V(t, e, r = ls + 1) {
      if (t < 0 || t > r) {
        let n = new RangeError(`The value of "${e}" is out of range. It must be >= 0 && <= ${r}. Received ${t}`);
        throw n.code = "ERR_OUT_OF_RANGE", n;
      }
    }
    __name(V, "V");
    function B(t, e) {
      if (typeof t != "number") {
        let r = new TypeError(`The "${e}" argument must be of type number. Received type ${typeof t}.`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(B, "B");
    function Y(t, e) {
      if (!Number.isInteger(t) || Number.isNaN(t)) {
        let r = new RangeError(`The value of "${e}" is out of range. It must be an integer. Received ${t}`);
        throw r.code = "ERR_OUT_OF_RANGE", r;
      }
    }
    __name(Y, "Y");
    function ns(t, e, r, n) {
      if (t < r || t > n) {
        let i = new RangeError(`The value of "${e}" is out of range. It must be >= ${r} and <= ${n}. Received ${t}`);
        throw i.code = "ERR_OUT_OF_RANGE", i;
      }
    }
    __name(ns, "ns");
    function mn(t, e) {
      if (typeof t != "string") {
        let r = new TypeError(`The "${e}" argument must be of type string. Received type ${typeof t}`);
        throw r.code = "ERR_INVALID_ARG_TYPE", r;
      }
    }
    __name(mn, "mn");
    function us(t, e = "utf8") {
      return y.from(t, e);
    }
    __name(us, "us");
    var y;
    var is;
    var os;
    var ss;
    var as;
    var ls;
    var b;
    var Er;
    var u = ne(() => {
      "use strict";
      y = /* @__PURE__ */ __name(class t extends Uint8Array {
        _isBuffer = true;
        get offset() {
          return this.byteOffset;
        }
        static alloc(e, r = 0, n = "utf8") {
          return mn(n, "encoding"), t.allocUnsafe(e).fill(r, n);
        }
        static allocUnsafe(e) {
          return t.from(e);
        }
        static allocUnsafeSlow(e) {
          return t.from(e);
        }
        static isBuffer(e) {
          return e && !!e._isBuffer;
        }
        static byteLength(e, r = "utf8") {
          if (typeof e == "string")
            return xr(e, r).byteLength;
          if (e && e.byteLength)
            return e.byteLength;
          let n = new TypeError('The "string" argument must be of type string or an instance of Buffer or ArrayBuffer.');
          throw n.code = "ERR_INVALID_ARG_TYPE", n;
        }
        static isEncoding(e) {
          return as.includes(e);
        }
        static compare(e, r) {
          Mt(e, "buff1"), Mt(r, "buff2");
          for (let n = 0; n < e.length; n++) {
            if (e[n] < r[n])
              return -1;
            if (e[n] > r[n])
              return 1;
          }
          return e.length === r.length ? 0 : e.length > r.length ? 1 : -1;
        }
        static from(e, r = "utf8") {
          if (e && typeof e == "object" && e.type === "Buffer")
            return new t(e.data);
          if (typeof e == "number")
            return new t(new Uint8Array(e));
          if (typeof e == "string")
            return xr(e, r);
          if (ArrayBuffer.isView(e)) {
            let { byteOffset: n, byteLength: i, buffer: o } = e;
            return "map" in e && typeof e.map == "function" ? new t(e.map((s) => s % 256), n, i) : new t(o, n, i);
          }
          if (e && typeof e == "object" && ("length" in e || "byteLength" in e || "buffer" in e))
            return new t(e);
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }
        static concat(e, r) {
          if (e.length === 0)
            return t.alloc(0);
          let n = [].concat(...e.map((o) => [...o])), i = t.alloc(r !== void 0 ? r : n.length);
          return i.set(r !== void 0 ? n.slice(0, r) : n), i;
        }
        slice(e = 0, r = this.length) {
          return this.subarray(e, r);
        }
        subarray(e = 0, r = this.length) {
          return Object.setPrototypeOf(super.subarray(e, r), t.prototype);
        }
        reverse() {
          return super.reverse(), this;
        }
        readIntBE(e, r) {
          B(e, "offset"), Y(e, "offset"), V(e, "offset", this.length - 1), B(r, "byteLength"), Y(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++)
            i = i * 256 + n.getUint8(o);
          return n.getUint8(0) & 128 && (i -= Math.pow(256, r)), i;
        }
        readIntLE(e, r) {
          B(e, "offset"), Y(e, "offset"), V(e, "offset", this.length - 1), B(r, "byteLength"), Y(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++)
            i += n.getUint8(o) * Math.pow(256, o);
          return n.getUint8(r - 1) & 128 && (i -= Math.pow(256, r)), i;
        }
        readUIntBE(e, r) {
          B(e, "offset"), Y(e, "offset"), V(e, "offset", this.length - 1), B(r, "byteLength"), Y(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++)
            i = i * 256 + n.getUint8(o);
          return i;
        }
        readUintBE(e, r) {
          return this.readUIntBE(e, r);
        }
        readUIntLE(e, r) {
          B(e, "offset"), Y(e, "offset"), V(e, "offset", this.length - 1), B(r, "byteLength"), Y(r, "byteLength");
          let n = new DataView(this.buffer, e, r), i = 0;
          for (let o = 0; o < r; o++)
            i += n.getUint8(o) * Math.pow(256, o);
          return i;
        }
        readUintLE(e, r) {
          return this.readUIntLE(e, r);
        }
        writeIntBE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntBE(e, r, n);
        }
        writeIntLE(e, r, n) {
          return e = e < 0 ? e + Math.pow(256, n) : e, this.writeUIntLE(e, r, n);
        }
        writeUIntBE(e, r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = n - 1; o >= 0; o--)
            i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintBE(e, r, n) {
          return this.writeUIntBE(e, r, n);
        }
        writeUIntLE(e, r, n) {
          B(r, "offset"), Y(r, "offset"), V(r, "offset", this.length - 1), B(n, "byteLength"), Y(n, "byteLength");
          let i = new DataView(this.buffer, r, n);
          for (let o = 0; o < n; o++)
            i.setUint8(o, e & 255), e = e / 256;
          return r + n;
        }
        writeUintLE(e, r, n) {
          return this.writeUIntLE(e, r, n);
        }
        toJSON() {
          return { type: "Buffer", data: Array.from(this) };
        }
        swap16() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 2)
            e.setUint16(r, e.getUint16(r, true), false);
          return this;
        }
        swap32() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 4)
            e.setUint32(r, e.getUint32(r, true), false);
          return this;
        }
        swap64() {
          let e = new DataView(this.buffer, this.byteOffset, this.byteLength);
          for (let r = 0; r < this.length; r += 8)
            e.setBigUint64(r, e.getBigUint64(r, true), false);
          return this;
        }
        compare(e, r = 0, n = e.length, i = 0, o = this.length) {
          return Mt(e, "target"), B(r, "targetStart"), B(n, "targetEnd"), B(i, "sourceStart"), B(o, "sourceEnd"), V(r, "targetStart"), V(n, "targetEnd", e.length), V(i, "sourceStart"), V(o, "sourceEnd", this.length), t.compare(this.slice(i, o), e.slice(r, n));
        }
        equals(e) {
          return Mt(e, "otherBuffer"), this.length === e.length && this.every((r, n) => r === e[n]);
        }
        copy(e, r = 0, n = 0, i = this.length) {
          V(r, "targetStart"), V(n, "sourceStart", this.length), V(i, "sourceEnd"), r >>>= 0, n >>>= 0, i >>>= 0;
          let o = 0;
          for (; n < i && !(this[n] === void 0 || e[r] === void 0); )
            e[r] = this[n], o++, n++, r++;
          return o;
        }
        write(e, r, n, i = "utf8") {
          let o = typeof r == "string" ? 0 : r ?? 0, s = typeof n == "string" ? this.length - o : n ?? this.length - o;
          return i = typeof r == "string" ? r : typeof n == "string" ? n : i, B(o, "offset"), B(s, "length"), V(o, "offset", this.length), V(s, "length", this.length), (i === "ucs2" || i === "ucs-2" || i === "utf16le" || i === "utf-16le") && (s = s - s % 2), xr(e, i).copy(this, o, 0, s);
        }
        fill(e = 0, r = 0, n = this.length, i = "utf-8") {
          let o = typeof r == "string" ? 0 : r, s = typeof n == "string" ? this.length : n;
          if (i = typeof r == "string" ? r : typeof n == "string" ? n : i, e = t.from(typeof e == "number" ? [e] : e ?? [], i), mn(i, "encoding"), V(o, "offset", this.length), V(s, "end", this.length), e.length !== 0)
            for (let a = o; a < s; a += e.length)
              super.set(e.slice(0, e.length + a >= this.length ? this.length - a : e.length), a);
          return this;
        }
        includes(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n) !== -1;
        }
        lastIndexOf(e, r = null, n = "utf-8") {
          return this.indexOf(e, r, n, true);
        }
        indexOf(e, r = null, n = "utf-8", i = false) {
          let o = i ? this.findLastIndex.bind(this) : this.findIndex.bind(this);
          n = typeof r == "string" ? r : n;
          let s = t.from(typeof e == "number" ? [e] : e, n), a = typeof r == "string" ? 0 : r;
          return a = typeof r == "number" ? a : null, a = Number.isNaN(a) ? null : a, a ??= i ? this.length : 0, a = a < 0 ? this.length + a : a, s.length === 0 && i === false ? a >= this.length ? this.length : a : s.length === 0 && i === true ? (a >= this.length ? this.length : a) || this.length : o((f, h) => (i ? h <= a : h >= a) && this[h] === s[0] && s.every((C, k) => this[h + k] === C));
        }
        toString(e = "utf8", r = 0, n = this.length) {
          if (r = r < 0 ? 0 : r, e = e.toString().toLowerCase(), n <= 0)
            return "";
          if (e === "utf8" || e === "utf-8")
            return ss.decode(this.slice(r, n));
          if (e === "base64" || e === "base64url") {
            let i = btoa(this.reduce((o, s) => o + Er(s), ""));
            return e === "base64url" ? i.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : i;
          }
          if (e === "binary" || e === "ascii" || e === "latin1" || e === "latin-1")
            return this.slice(r, n).reduce((i, o) => i + Er(o & (e === "ascii" ? 127 : 255)), "");
          if (e === "ucs2" || e === "ucs-2" || e === "utf16le" || e === "utf-16le") {
            let i = new DataView(this.buffer.slice(r, n));
            return Array.from({ length: i.byteLength / 2 }, (o, s) => s * 2 + 1 < i.byteLength ? Er(i.getUint16(s * 2, true)) : "").join("");
          }
          if (e === "hex")
            return this.slice(r, n).reduce((i, o) => i + o.toString(16).padStart(2, "0"), "");
          pn(`encoding "${e}"`);
        }
        toLocaleString() {
          return this.toString();
        }
        inspect() {
          return `<Buffer ${this.toString("hex").match(/.{1,2}/g).join(" ")}>`;
        }
      }, "t");
      is = { int8: [-128, 127], int16: [-32768, 32767], int32: [-2147483648, 2147483647], uint8: [0, 255], uint16: [0, 65535], uint32: [0, 4294967295], float32: [-1 / 0, 1 / 0], float64: [-1 / 0, 1 / 0], bigint64: [-0x8000000000000000n, 0x7fffffffffffffffn], biguint64: [0n, 0xffffffffffffffffn] }, os = new TextEncoder(), ss = new TextDecoder(), as = ["utf8", "utf-8", "hex", "base64", "ascii", "binary", "base64url", "ucs2", "ucs-2", "utf16le", "utf-16le", "latin1", "latin-1"], ls = 4294967295;
      rs(y.prototype);
      b = new Proxy(us, { construct(t, [e, r]) {
        return y.from(e, r);
      }, get(t, e) {
        return y[e];
      } }), Er = String.fromCodePoint;
    });
    var g;
    var c = ne(() => {
      "use strict";
      g = { nextTick: (t, ...e) => {
        setTimeout(() => {
          t(...e);
        }, 0);
      }, env: {}, version: "", cwd: () => "/", stderr: {}, argv: ["/bin/node"] };
    });
    var E;
    var m = ne(() => {
      "use strict";
      E = globalThis.performance ?? (() => {
        let t = Date.now();
        return { now: () => Date.now() - t };
      })();
    });
    var x;
    var p = ne(() => {
      "use strict";
      x = /* @__PURE__ */ __name(() => {
      }, "x");
      x.prototype = x;
    });
    var w;
    var d = ne(() => {
      "use strict";
      w = /* @__PURE__ */ __name(class {
        value;
        constructor(e) {
          this.value = e;
        }
        deref() {
          return this.value;
        }
      }, "w");
    });
    function yn(t, e) {
      var r, n, i, o, s, a, f, h, T = t.constructor, C = T.precision;
      if (!t.s || !e.s)
        return e.s || (e = new T(t)), q ? _(e, C) : e;
      if (f = t.d, h = e.d, s = t.e, i = e.e, f = f.slice(), o = s - i, o) {
        for (o < 0 ? (n = f, o = -o, a = h.length) : (n = h, i = s, a = f.length), s = Math.ceil(C / N), a = s > a ? s + 1 : a + 1, o > a && (o = a, n.length = 1), n.reverse(); o--; )
          n.push(0);
        n.reverse();
      }
      for (a = f.length, o = h.length, a - o < 0 && (o = a, n = h, h = f, f = n), r = 0; o; )
        r = (f[--o] = f[o] + h[o] + r) / Q | 0, f[o] %= Q;
      for (r && (f.unshift(r), ++i), a = f.length; f[--a] == 0; )
        f.pop();
      return e.d = f, e.e = i, q ? _(e, C) : e;
    }
    __name(yn, "yn");
    function me(t, e, r) {
      if (t !== ~~t || t < e || t > r)
        throw Error(Oe + t);
    }
    __name(me, "me");
    function ce(t) {
      var e, r, n, i = t.length - 1, o = "", s = t[0];
      if (i > 0) {
        for (o += s, e = 1; e < i; e++)
          n = t[e] + "", r = N - n.length, r && (o += Pe(r)), o += n;
        s = t[e], n = s + "", r = N - n.length, r && (o += Pe(r));
      } else if (s === 0)
        return "0";
      for (; s % 10 === 0; )
        s /= 10;
      return o + s;
    }
    __name(ce, "ce");
    function hn(t, e) {
      var r, n, i, o, s, a, f = 0, h = 0, T = t.constructor, C = T.precision;
      if ($2(t) > 16)
        throw Error(vr + $2(t));
      if (!t.s)
        return new T(ee);
      for (e == null ? (q = false, a = C) : a = e, s = new T(0.03125); t.abs().gte(0.1); )
        t = t.times(s), h += 5;
      for (n = Math.log(ke(2, h)) / Math.LN10 * 2 + 5 | 0, a += n, r = i = o = new T(ee), T.precision = a; ; ) {
        if (i = _(i.times(t), a), r = r.times(++f), s = o.plus(he(i, r, a)), ce(s.d).slice(0, a) === ce(o.d).slice(0, a)) {
          for (; h--; )
            o = _(o.times(o), a);
          return T.precision = C, e == null ? (q = true, _(o, C)) : o;
        }
        o = s;
      }
    }
    __name(hn, "hn");
    function $2(t) {
      for (var e = t.e * N, r = t.d[0]; r >= 10; r /= 10)
        e++;
      return e;
    }
    __name($2, "$");
    function Pr(t, e, r) {
      if (e > t.LN10.sd())
        throw q = true, r && (t.precision = r), Error(ie + "LN10 precision limit exceeded");
      return _(new t(t.LN10), e);
    }
    __name(Pr, "Pr");
    function Pe(t) {
      for (var e = ""; t--; )
        e += "0";
      return e;
    }
    __name(Pe, "Pe");
    function it(t, e) {
      var r, n, i, o, s, a, f, h, T, C = 1, k = 10, A = t, O = A.d, S = A.constructor, M = S.precision;
      if (A.s < 1)
        throw Error(ie + (A.s ? "NaN" : "-Infinity"));
      if (A.eq(ee))
        return new S(0);
      if (e == null ? (q = false, h = M) : h = e, A.eq(10))
        return e == null && (q = true), Pr(S, h);
      if (h += k, S.precision = h, r = ce(O), n = r.charAt(0), o = $2(A), Math.abs(o) < 15e14) {
        for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
          A = A.times(t), r = ce(A.d), n = r.charAt(0), C++;
        o = $2(A), n > 1 ? (A = new S("0." + r), o++) : A = new S(n + "." + r.slice(1));
      } else
        return f = Pr(S, h + 2, M).times(o + ""), A = it(new S(n + "." + r.slice(1)), h - k).plus(f), S.precision = M, e == null ? (q = true, _(A, M)) : A;
      for (a = s = A = he(A.minus(ee), A.plus(ee), h), T = _(A.times(A), h), i = 3; ; ) {
        if (s = _(s.times(T), h), f = a.plus(he(s, new S(i), h)), ce(f.d).slice(0, h) === ce(a.d).slice(0, h))
          return a = a.times(2), o !== 0 && (a = a.plus(Pr(S, h + 2, M).times(o + ""))), a = he(a, new S(C), h), S.precision = M, e == null ? (q = true, _(a, M)) : a;
        a = f, i += 2;
      }
    }
    __name(it, "it");
    function dn(t, e) {
      var r, n, i;
      for ((r = e.indexOf(".")) > -1 && (e = e.replace(".", "")), (n = e.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +e.slice(n + 1), e = e.substring(0, n)) : r < 0 && (r = e.length), n = 0; e.charCodeAt(n) === 48; )
        ++n;
      for (i = e.length; e.charCodeAt(i - 1) === 48; )
        --i;
      if (e = e.slice(n, i), e) {
        if (i -= n, r = r - n - 1, t.e = Ne(r / N), t.d = [], n = (r + 1) % N, r < 0 && (n += N), n < i) {
          for (n && t.d.push(+e.slice(0, n)), i -= N; n < i; )
            t.d.push(+e.slice(n, n += N));
          e = e.slice(n), n = N - e.length;
        } else
          n -= i;
        for (; n--; )
          e += "0";
        if (t.d.push(+e), q && (t.e > It || t.e < -It))
          throw Error(vr + r);
      } else
        t.s = 0, t.e = 0, t.d = [0];
      return t;
    }
    __name(dn, "dn");
    function _(t, e, r) {
      var n, i, o, s, a, f, h, T, C = t.d;
      for (s = 1, o = C[0]; o >= 10; o /= 10)
        s++;
      if (n = e - s, n < 0)
        n += N, i = e, h = C[T = 0];
      else {
        if (T = Math.ceil((n + 1) / N), o = C.length, T >= o)
          return t;
        for (h = o = C[T], s = 1; o >= 10; o /= 10)
          s++;
        n %= N, i = n - N + s;
      }
      if (r !== void 0 && (o = ke(10, s - i - 1), a = h / o % 10 | 0, f = e < 0 || C[T + 1] !== void 0 || h % o, f = r < 4 ? (a || f) && (r == 0 || r == (t.s < 0 ? 3 : 2)) : a > 5 || a == 5 && (r == 4 || f || r == 6 && (n > 0 ? i > 0 ? h / ke(10, s - i) : 0 : C[T - 1]) % 10 & 1 || r == (t.s < 0 ? 8 : 7))), e < 1 || !C[0])
        return f ? (o = $2(t), C.length = 1, e = e - o - 1, C[0] = ke(10, (N - e % N) % N), t.e = Ne(-e / N) || 0) : (C.length = 1, C[0] = t.e = t.s = 0), t;
      if (n == 0 ? (C.length = T, o = 1, T--) : (C.length = T + 1, o = ke(10, N - n), C[T] = i > 0 ? (h / ke(10, s - i) % ke(10, i) | 0) * o : 0), f)
        for (; ; )
          if (T == 0) {
            (C[0] += o) == Q && (C[0] = 1, ++t.e);
            break;
          } else {
            if (C[T] += o, C[T] != Q)
              break;
            C[T--] = 0, o = 1;
          }
      for (n = C.length; C[--n] === 0; )
        C.pop();
      if (q && (t.e > It || t.e < -It))
        throw Error(vr + $2(t));
      return t;
    }
    __name(_, "_");
    function bn(t, e) {
      var r, n, i, o, s, a, f, h, T, C, k = t.constructor, A = k.precision;
      if (!t.s || !e.s)
        return e.s ? e.s = -e.s : e = new k(t), q ? _(e, A) : e;
      if (f = t.d, C = e.d, n = e.e, h = t.e, f = f.slice(), s = h - n, s) {
        for (T = s < 0, T ? (r = f, s = -s, a = C.length) : (r = C, n = h, a = f.length), i = Math.max(Math.ceil(A / N), a) + 2, s > i && (s = i, r.length = 1), r.reverse(), i = s; i--; )
          r.push(0);
        r.reverse();
      } else {
        for (i = f.length, a = C.length, T = i < a, T && (a = i), i = 0; i < a; i++)
          if (f[i] != C[i]) {
            T = f[i] < C[i];
            break;
          }
        s = 0;
      }
      for (T && (r = f, f = C, C = r, e.s = -e.s), a = f.length, i = C.length - a; i > 0; --i)
        f[a++] = 0;
      for (i = C.length; i > s; ) {
        if (f[--i] < C[i]) {
          for (o = i; o && f[--o] === 0; )
            f[o] = Q - 1;
          --f[o], f[i] += Q;
        }
        f[i] -= C[i];
      }
      for (; f[--a] === 0; )
        f.pop();
      for (; f[0] === 0; f.shift())
        --n;
      return f[0] ? (e.d = f, e.e = n, q ? _(e, A) : e) : new k(0);
    }
    __name(bn, "bn");
    function Me(t, e, r) {
      var n, i = $2(t), o = ce(t.d), s = o.length;
      return e ? (r && (n = r - s) > 0 ? o = o.charAt(0) + "." + o.slice(1) + Pe(n) : s > 1 && (o = o.charAt(0) + "." + o.slice(1)), o = o + (i < 0 ? "e" : "e+") + i) : i < 0 ? (o = "0." + Pe(-i - 1) + o, r && (n = r - s) > 0 && (o += Pe(n))) : i >= s ? (o += Pe(i + 1 - s), r && (n = r - i - 1) > 0 && (o = o + "." + Pe(n))) : ((n = i + 1) < s && (o = o.slice(0, n) + "." + o.slice(n)), r && (n = r - s) > 0 && (i + 1 === s && (o += "."), o += Pe(n))), t.s < 0 ? "-" + o : o;
    }
    __name(Me, "Me");
    function fn(t, e) {
      if (t.length > e)
        return t.length = e, true;
    }
    __name(fn, "fn");
    function wn(t) {
      var e, r, n;
      function i(o) {
        var s = this;
        if (!(s instanceof i))
          return new i(o);
        if (s.constructor = i, o instanceof i) {
          s.s = o.s, s.e = o.e, s.d = (o = o.d) ? o.slice() : o;
          return;
        }
        if (typeof o == "number") {
          if (o * 0 !== 0)
            throw Error(Oe + o);
          if (o > 0)
            s.s = 1;
          else if (o < 0)
            o = -o, s.s = -1;
          else {
            s.s = 0, s.e = 0, s.d = [0];
            return;
          }
          if (o === ~~o && o < 1e7) {
            s.e = 0, s.d = [o];
            return;
          }
          return dn(s, o.toString());
        } else if (typeof o != "string")
          throw Error(Oe + o);
        if (o.charCodeAt(0) === 45 ? (o = o.slice(1), s.s = -1) : s.s = 1, ms.test(o))
          dn(s, o);
        else
          throw Error(Oe + o);
      }
      __name(i, "i");
      if (i.prototype = R, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = wn, i.config = i.set = ps, t === void 0 && (t = {}), t)
        for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], e = 0; e < n.length; )
          t.hasOwnProperty(r = n[e++]) || (t[r] = this[r]);
      return i.config(t), i;
    }
    __name(wn, "wn");
    function ps(t) {
      if (!t || typeof t != "object")
        throw Error(ie + "Object expected");
      var e, r, n, i = ["precision", 1, Fe, "rounding", 0, 8, "toExpNeg", -1 / 0, 0, "toExpPos", 0, 1 / 0];
      for (e = 0; e < i.length; e += 3)
        if ((n = t[r = i[e]]) !== void 0)
          if (Ne(n) === n && n >= i[e + 1] && n <= i[e + 2])
            this[r] = n;
          else
            throw Error(Oe + r + ": " + n);
      if ((n = t[r = "LN10"]) !== void 0)
        if (n == Math.LN10)
          this[r] = new this(n);
        else
          throw Error(Oe + r + ": " + n);
      return this;
    }
    __name(ps, "ps");
    var Fe;
    var cs;
    var Tr;
    var q;
    var ie;
    var Oe;
    var vr;
    var Ne;
    var ke;
    var ms;
    var ee;
    var Q;
    var N;
    var gn;
    var It;
    var R;
    var he;
    var Tr;
    var Dt;
    var xn = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Fe = 1e9, cs = { precision: 20, rounding: 4, toExpNeg: -7, toExpPos: 21, LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286" }, q = true, ie = "[DecimalError] ", Oe = ie + "Invalid argument: ", vr = ie + "Exponent out of range: ", Ne = Math.floor, ke = Math.pow, ms = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, Q = 1e7, N = 7, gn = 9007199254740991, It = Ne(gn / N), R = {};
      R.absoluteValue = R.abs = function() {
        var t = new this.constructor(this);
        return t.s && (t.s = 1), t;
      };
      R.comparedTo = R.cmp = function(t) {
        var e, r, n, i, o = this;
        if (t = new o.constructor(t), o.s !== t.s)
          return o.s || -t.s;
        if (o.e !== t.e)
          return o.e > t.e ^ o.s < 0 ? 1 : -1;
        for (n = o.d.length, i = t.d.length, e = 0, r = n < i ? n : i; e < r; ++e)
          if (o.d[e] !== t.d[e])
            return o.d[e] > t.d[e] ^ o.s < 0 ? 1 : -1;
        return n === i ? 0 : n > i ^ o.s < 0 ? 1 : -1;
      };
      R.decimalPlaces = R.dp = function() {
        var t = this, e = t.d.length - 1, r = (e - t.e) * N;
        if (e = t.d[e], e)
          for (; e % 10 == 0; e /= 10)
            r--;
        return r < 0 ? 0 : r;
      };
      R.dividedBy = R.div = function(t) {
        return he(this, new this.constructor(t));
      };
      R.dividedToIntegerBy = R.idiv = function(t) {
        var e = this, r = e.constructor;
        return _(he(e, new r(t), 0, 1), r.precision);
      };
      R.equals = R.eq = function(t) {
        return !this.cmp(t);
      };
      R.exponent = function() {
        return $2(this);
      };
      R.greaterThan = R.gt = function(t) {
        return this.cmp(t) > 0;
      };
      R.greaterThanOrEqualTo = R.gte = function(t) {
        return this.cmp(t) >= 0;
      };
      R.isInteger = R.isint = function() {
        return this.e > this.d.length - 2;
      };
      R.isNegative = R.isneg = function() {
        return this.s < 0;
      };
      R.isPositive = R.ispos = function() {
        return this.s > 0;
      };
      R.isZero = function() {
        return this.s === 0;
      };
      R.lessThan = R.lt = function(t) {
        return this.cmp(t) < 0;
      };
      R.lessThanOrEqualTo = R.lte = function(t) {
        return this.cmp(t) < 1;
      };
      R.logarithm = R.log = function(t) {
        var e, r = this, n = r.constructor, i = n.precision, o = i + 5;
        if (t === void 0)
          t = new n(10);
        else if (t = new n(t), t.s < 1 || t.eq(ee))
          throw Error(ie + "NaN");
        if (r.s < 1)
          throw Error(ie + (r.s ? "NaN" : "-Infinity"));
        return r.eq(ee) ? new n(0) : (q = false, e = he(it(r, o), it(t, o), o), q = true, _(e, i));
      };
      R.minus = R.sub = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? bn(e, t) : yn(e, (t.s = -t.s, t));
      };
      R.modulo = R.mod = function(t) {
        var e, r = this, n = r.constructor, i = n.precision;
        if (t = new n(t), !t.s)
          throw Error(ie + "NaN");
        return r.s ? (q = false, e = he(r, t, 0, 1).times(t), q = true, r.minus(e)) : _(new n(r), i);
      };
      R.naturalExponential = R.exp = function() {
        return hn(this);
      };
      R.naturalLogarithm = R.ln = function() {
        return it(this);
      };
      R.negated = R.neg = function() {
        var t = new this.constructor(this);
        return t.s = -t.s || 0, t;
      };
      R.plus = R.add = function(t) {
        var e = this;
        return t = new e.constructor(t), e.s == t.s ? yn(e, t) : bn(e, (t.s = -t.s, t));
      };
      R.precision = R.sd = function(t) {
        var e, r, n, i = this;
        if (t !== void 0 && t !== !!t && t !== 1 && t !== 0)
          throw Error(Oe + t);
        if (e = $2(i) + 1, n = i.d.length - 1, r = n * N + 1, n = i.d[n], n) {
          for (; n % 10 == 0; n /= 10)
            r--;
          for (n = i.d[0]; n >= 10; n /= 10)
            r++;
        }
        return t && e > r ? e : r;
      };
      R.squareRoot = R.sqrt = function() {
        var t, e, r, n, i, o, s, a = this, f = a.constructor;
        if (a.s < 1) {
          if (!a.s)
            return new f(0);
          throw Error(ie + "NaN");
        }
        for (t = $2(a), q = false, i = Math.sqrt(+a), i == 0 || i == 1 / 0 ? (e = ce(a.d), (e.length + t) % 2 == 0 && (e += "0"), i = Math.sqrt(e), t = Ne((t + 1) / 2) - (t < 0 || t % 2), i == 1 / 0 ? e = "5e" + t : (e = i.toExponential(), e = e.slice(0, e.indexOf("e") + 1) + t), n = new f(e)) : n = new f(i.toString()), r = f.precision, i = s = r + 3; ; )
          if (o = n, n = o.plus(he(a, o, s + 2)).times(0.5), ce(o.d).slice(0, s) === (e = ce(n.d)).slice(0, s)) {
            if (e = e.slice(s - 3, s + 1), i == s && e == "4999") {
              if (_(o, r + 1, 0), o.times(o).eq(a)) {
                n = o;
                break;
              }
            } else if (e != "9999")
              break;
            s += 4;
          }
        return q = true, _(n, r);
      };
      R.times = R.mul = function(t) {
        var e, r, n, i, o, s, a, f, h, T = this, C = T.constructor, k = T.d, A = (t = new C(t)).d;
        if (!T.s || !t.s)
          return new C(0);
        for (t.s *= T.s, r = T.e + t.e, f = k.length, h = A.length, f < h && (o = k, k = A, A = o, s = f, f = h, h = s), o = [], s = f + h, n = s; n--; )
          o.push(0);
        for (n = h; --n >= 0; ) {
          for (e = 0, i = f + n; i > n; )
            a = o[i] + A[n] * k[i - n - 1] + e, o[i--] = a % Q | 0, e = a / Q | 0;
          o[i] = (o[i] + e) % Q | 0;
        }
        for (; !o[--s]; )
          o.pop();
        return e ? ++r : o.shift(), t.d = o, t.e = r, q ? _(t, C.precision) : t;
      };
      R.toDecimalPlaces = R.todp = function(t, e) {
        var r = this, n = r.constructor;
        return r = new n(r), t === void 0 ? r : (me(t, 0, Fe), e === void 0 ? e = n.rounding : me(e, 0, 8), _(r, t + $2(r) + 1, e));
      };
      R.toExponential = function(t, e) {
        var r, n = this, i = n.constructor;
        return t === void 0 ? r = Me(n, true) : (me(t, 0, Fe), e === void 0 ? e = i.rounding : me(e, 0, 8), n = _(new i(n), t + 1, e), r = Me(n, true, t + 1)), r;
      };
      R.toFixed = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? Me(i) : (me(t, 0, Fe), e === void 0 ? e = o.rounding : me(e, 0, 8), n = _(new o(i), t + $2(i) + 1, e), r = Me(n.abs(), false, t + $2(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
      };
      R.toInteger = R.toint = function() {
        var t = this, e = t.constructor;
        return _(new e(t), $2(t) + 1, e.rounding);
      };
      R.toNumber = function() {
        return +this;
      };
      R.toPower = R.pow = function(t) {
        var e, r, n, i, o, s, a = this, f = a.constructor, h = 12, T = +(t = new f(t));
        if (!t.s)
          return new f(ee);
        if (a = new f(a), !a.s) {
          if (t.s < 1)
            throw Error(ie + "Infinity");
          return a;
        }
        if (a.eq(ee))
          return a;
        if (n = f.precision, t.eq(ee))
          return _(a, n);
        if (e = t.e, r = t.d.length - 1, s = e >= r, o = a.s, s) {
          if ((r = T < 0 ? -T : T) <= gn) {
            for (i = new f(ee), e = Math.ceil(n / N + 4), q = false; r % 2 && (i = i.times(a), fn(i.d, e)), r = Ne(r / 2), r !== 0; )
              a = a.times(a), fn(a.d, e);
            return q = true, t.s < 0 ? new f(ee).div(i) : _(i, n);
          }
        } else if (o < 0)
          throw Error(ie + "NaN");
        return o = o < 0 && t.d[Math.max(e, r)] & 1 ? -1 : 1, a.s = 1, q = false, i = t.times(it(a, n + h)), q = true, i = hn(i), i.s = o, i;
      };
      R.toPrecision = function(t, e) {
        var r, n, i = this, o = i.constructor;
        return t === void 0 ? (r = $2(i), n = Me(i, r <= o.toExpNeg || r >= o.toExpPos)) : (me(t, 1, Fe), e === void 0 ? e = o.rounding : me(e, 0, 8), i = _(new o(i), t, e), r = $2(i), n = Me(i, t <= r || r <= o.toExpNeg, t)), n;
      };
      R.toSignificantDigits = R.tosd = function(t, e) {
        var r = this, n = r.constructor;
        return t === void 0 ? (t = n.precision, e = n.rounding) : (me(t, 1, Fe), e === void 0 ? e = n.rounding : me(e, 0, 8)), _(new n(r), t, e);
      };
      R.toString = R.valueOf = R.val = R.toJSON = R[Symbol.for("nodejs.util.inspect.custom")] = function() {
        var t = this, e = $2(t), r = t.constructor;
        return Me(t, e <= r.toExpNeg || e >= r.toExpPos);
      };
      he = function() {
        function t(n, i) {
          var o, s = 0, a = n.length;
          for (n = n.slice(); a--; )
            o = n[a] * i + s, n[a] = o % Q | 0, s = o / Q | 0;
          return s && n.unshift(s), n;
        }
        __name(t, "t");
        function e(n, i, o, s) {
          var a, f;
          if (o != s)
            f = o > s ? 1 : -1;
          else
            for (a = f = 0; a < o; a++)
              if (n[a] != i[a]) {
                f = n[a] > i[a] ? 1 : -1;
                break;
              }
          return f;
        }
        __name(e, "e");
        function r(n, i, o) {
          for (var s = 0; o--; )
            n[o] -= s, s = n[o] < i[o] ? 1 : 0, n[o] = s * Q + n[o] - i[o];
          for (; !n[0] && n.length > 1; )
            n.shift();
        }
        __name(r, "r");
        return function(n, i, o, s) {
          var a, f, h, T, C, k, A, O, S, M, oe, H, L, z, Se, wr, se, St, kt = n.constructor, Ho = n.s == i.s ? 1 : -1, ue = n.d, U = i.d;
          if (!n.s)
            return new kt(n);
          if (!i.s)
            throw Error(ie + "Division by zero");
          for (f = n.e - i.e, se = U.length, Se = ue.length, A = new kt(Ho), O = A.d = [], h = 0; U[h] == (ue[h] || 0); )
            ++h;
          if (U[h] > (ue[h] || 0) && --f, o == null ? H = o = kt.precision : s ? H = o + ($2(n) - $2(i)) + 1 : H = o, H < 0)
            return new kt(0);
          if (H = H / N + 2 | 0, h = 0, se == 1)
            for (T = 0, U = U[0], H++; (h < Se || T) && H--; h++)
              L = T * Q + (ue[h] || 0), O[h] = L / U | 0, T = L % U | 0;
          else {
            for (T = Q / (U[0] + 1) | 0, T > 1 && (U = t(U, T), ue = t(ue, T), se = U.length, Se = ue.length), z = se, S = ue.slice(0, se), M = S.length; M < se; )
              S[M++] = 0;
            St = U.slice(), St.unshift(0), wr = U[0], U[1] >= Q / 2 && ++wr;
            do
              T = 0, a = e(U, S, se, M), a < 0 ? (oe = S[0], se != M && (oe = oe * Q + (S[1] || 0)), T = oe / wr | 0, T > 1 ? (T >= Q && (T = Q - 1), C = t(U, T), k = C.length, M = S.length, a = e(C, S, k, M), a == 1 && (T--, r(C, se < k ? St : U, k))) : (T == 0 && (a = T = 1), C = U.slice()), k = C.length, k < M && C.unshift(0), r(S, C, M), a == -1 && (M = S.length, a = e(U, S, se, M), a < 1 && (T++, r(S, se < M ? St : U, M))), M = S.length) : a === 0 && (T++, S = [0]), O[h++] = T, a && S[0] ? S[M++] = ue[z] || 0 : (S = [ue[z]], M = 1);
            while ((z++ < Se || S[0] !== void 0) && H--);
          }
          return O[0] || O.shift(), A.e = f, _(A, s ? o + $2(A) + 1 : o);
        };
      }();
      Tr = wn(cs);
      ee = new Tr(1);
      Dt = Tr;
    });
    var v;
    var ae;
    var l = ne(() => {
      "use strict";
      xn();
      v = /* @__PURE__ */ __name(class extends Dt {
        static isDecimal(e) {
          return e instanceof Dt;
        }
        static random(e = 20) {
          {
            let n = globalThis.crypto.getRandomValues(new Uint8Array(e)).reduce((i, o) => i + o, "");
            return new Dt(`0.${n.slice(0, e)}`);
          }
        }
      }, "v"), ae = v;
    });
    function bs() {
      return false;
    }
    __name(bs, "bs");
    function Nn() {
      return { dev: 0, ino: 0, mode: 0, nlink: 0, uid: 0, gid: 0, rdev: 0, size: 0, blksize: 0, blocks: 0, atimeMs: 0, mtimeMs: 0, ctimeMs: 0, birthtimeMs: 0, atime: /* @__PURE__ */ new Date(), mtime: /* @__PURE__ */ new Date(), ctime: /* @__PURE__ */ new Date(), birthtime: /* @__PURE__ */ new Date() };
    }
    __name(Nn, "Nn");
    function ws() {
      return Nn();
    }
    __name(ws, "ws");
    function xs() {
      return [];
    }
    __name(xs, "xs");
    function Es(t) {
      t(null, []);
    }
    __name(Es, "Es");
    function Ps() {
      return "";
    }
    __name(Ps, "Ps");
    function vs() {
      return "";
    }
    __name(vs, "vs");
    function Ts() {
    }
    __name(Ts, "Ts");
    function Cs() {
    }
    __name(Cs, "Cs");
    function Rs() {
    }
    __name(Rs, "Rs");
    function As() {
    }
    __name(As, "As");
    function Ss() {
    }
    __name(Ss, "Ss");
    function ks() {
    }
    __name(ks, "ks");
    var Os;
    var Ms;
    var qn;
    var Un = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Os = {}, Ms = { existsSync: bs, lstatSync: Nn, statSync: ws, readdirSync: xs, readdir: Es, readlinkSync: Ps, realpathSync: vs, chmodSync: Ts, renameSync: Cs, mkdirSync: Rs, rmdirSync: As, rmSync: Ss, unlinkSync: ks, promises: Os }, qn = Ms;
    });
    function Is(...t) {
      return t.join("/");
    }
    __name(Is, "Is");
    function Ds(...t) {
      return t.join("/");
    }
    __name(Ds, "Ds");
    function _s(t) {
      let e = Bn(t), r = $n(t), [n, i] = e.split(".");
      return { root: "/", dir: r, base: e, ext: i, name: n };
    }
    __name(_s, "_s");
    function Bn(t) {
      let e = t.split("/");
      return e[e.length - 1];
    }
    __name(Bn, "Bn");
    function $n(t) {
      return t.split("/").slice(0, -1).join("/");
    }
    __name($n, "$n");
    var Vn;
    var Ls;
    var Fs;
    var Nt;
    var jn = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Vn = "/", Ls = { sep: Vn }, Fs = { basename: Bn, dirname: $n, join: Ds, parse: _s, posix: Ls, resolve: Is, sep: Vn }, Nt = Fs;
    });
    var Qn = Le((Zc, Ns) => {
      Ns.exports = { name: "@prisma/internals", version: "6.8.2", description: "This package is intended for Prisma's internal use", main: "dist/index.js", types: "dist/index.d.ts", repository: { type: "git", url: "https://github.com/prisma/prisma.git", directory: "packages/internals" }, homepage: "https://www.prisma.io", author: "Tim Suchanek <suchanek@prisma.io>", bugs: "https://github.com/prisma/prisma/issues", license: "Apache-2.0", scripts: { dev: "DEV=true tsx helpers/build.ts", build: "tsx helpers/build.ts", test: "dotenv -e ../../.db.env -- jest --silent", prepublishOnly: "pnpm run build" }, files: ["README.md", "dist", "!**/libquery_engine*", "!dist/get-generators/engines/*", "scripts"], devDependencies: { "@babel/helper-validator-identifier": "7.25.9", "@opentelemetry/api": "1.9.0", "@swc/core": "1.11.5", "@swc/jest": "0.2.37", "@types/babel__helper-validator-identifier": "7.15.2", "@types/jest": "29.5.14", "@types/node": "18.19.76", "@types/resolve": "1.20.6", archiver: "6.0.2", "checkpoint-client": "1.1.33", "cli-truncate": "4.0.0", dotenv: "16.5.0", esbuild: "0.25.1", "escape-string-regexp": "5.0.0", execa: "5.1.1", "fast-glob": "3.3.3", "find-up": "7.0.0", "fp-ts": "2.16.9", "fs-extra": "11.3.0", "fs-jetpack": "5.1.0", "global-dirs": "4.0.0", globby: "11.1.0", "identifier-regex": "1.0.0", "indent-string": "4.0.0", "is-windows": "1.0.2", "is-wsl": "3.1.0", jest: "29.7.0", "jest-junit": "16.0.0", kleur: "4.1.5", "mock-stdin": "1.0.0", "new-github-issue-url": "0.2.1", "node-fetch": "3.3.2", "npm-packlist": "5.1.3", open: "7.4.2", "p-map": "4.0.0", "read-package-up": "11.0.0", resolve: "1.22.10", "string-width": "7.2.0", "strip-ansi": "6.0.1", "strip-indent": "4.0.0", "temp-dir": "2.0.0", tempy: "1.0.1", "terminal-link": "4.0.0", tmp: "0.2.3", "ts-node": "10.9.2", "ts-pattern": "5.6.2", "ts-toolbelt": "9.6.0", typescript: "5.4.5", yarn: "1.22.22" }, dependencies: { "@prisma/config": "workspace:*", "@prisma/debug": "workspace:*", "@prisma/dmmf": "workspace:*", "@prisma/driver-adapter-utils": "workspace:*", "@prisma/engines": "workspace:*", "@prisma/fetch-engine": "workspace:*", "@prisma/generator": "workspace:*", "@prisma/generator-helper": "workspace:*", "@prisma/get-platform": "workspace:*", "@prisma/prisma-schema-wasm": "6.8.0-43.2060c79ba17c6bb9f5823312b6f6b7f4a845738e", "@prisma/schema-engine-wasm": "6.8.0-43.2060c79ba17c6bb9f5823312b6f6b7f4a845738e", "@prisma/schema-files-loader": "workspace:*", arg: "5.0.2", prompts: "2.4.2" }, peerDependencies: { typescript: ">=5.1.0" }, peerDependenciesMeta: { typescript: { optional: true } }, sideEffects: false };
    });
    var Kn = Le((Em, Wn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      Wn.exports = (t, e = 1, r) => {
        if (r = { indent: " ", includeEmptyLines: false, ...r }, typeof t != "string")
          throw new TypeError(`Expected \`input\` to be a \`string\`, got \`${typeof t}\``);
        if (typeof e != "number")
          throw new TypeError(`Expected \`count\` to be a \`number\`, got \`${typeof e}\``);
        if (typeof r.indent != "string")
          throw new TypeError(`Expected \`options.indent\` to be a \`string\`, got \`${typeof r.indent}\``);
        if (e === 0)
          return t;
        let n = r.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
        return t.replace(n, r.indent.repeat(e));
      };
    });
    var Yn = Le((Lm, zn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      zn.exports = ({ onlyFirst: t = false } = {}) => {
        let e = ["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"].join("|");
        return new RegExp(e, t ? void 0 : "g");
      };
    });
    var Zn = Le((Vm, Xn) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      var Js = Yn();
      Xn.exports = (t) => typeof t == "string" ? t.replace(Js(), "") : t;
    });
    var Fr = Le((sy, ii) => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      ii.exports = function() {
        function t(e, r, n, i, o) {
          return e < r || n < r ? e > n ? n + 1 : e + 1 : i === o ? r : r + 1;
        }
        __name(t, "t");
        return function(e, r) {
          if (e === r)
            return 0;
          if (e.length > r.length) {
            var n = e;
            e = r, r = n;
          }
          for (var i = e.length, o = r.length; i > 0 && e.charCodeAt(i - 1) === r.charCodeAt(o - 1); )
            i--, o--;
          for (var s = 0; s < i && e.charCodeAt(s) === r.charCodeAt(s); )
            s++;
          if (i -= s, o -= s, i === 0 || o < 3)
            return o;
          var a = 0, f, h, T, C, k, A, O, S, M, oe, H, L, z = [];
          for (f = 0; f < i; f++)
            z.push(f + 1), z.push(e.charCodeAt(s + f));
          for (var Se = z.length - 1; a < o - 3; )
            for (M = r.charCodeAt(s + (h = a)), oe = r.charCodeAt(s + (T = a + 1)), H = r.charCodeAt(s + (C = a + 2)), L = r.charCodeAt(s + (k = a + 3)), A = a += 4, f = 0; f < Se; f += 2)
              O = z[f], S = z[f + 1], h = t(O, h, T, M, S), T = t(h, T, C, oe, S), C = t(T, C, k, H, S), A = t(C, k, A, L, S), z[f] = A, k = C, C = T, T = h, h = O;
          for (; a < o; )
            for (M = r.charCodeAt(s + (h = a)), A = ++a, f = 0; f < Se; f += 2)
              O = z[f], z[f] = A = t(O, h, A, M, z[f + 1]), h = O;
          return A;
        };
      }();
    });
    var ui = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
    });
    var ci = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
    });
    var _i = Le((oP, qa) => {
      qa.exports = { name: "@prisma/engines-version", version: "6.8.0-43.2060c79ba17c6bb9f5823312b6f6b7f4a845738e", main: "index.js", types: "index.d.ts", license: "Apache-2.0", author: "Tim Suchanek <suchanek@prisma.io>", prisma: { enginesVersion: "2060c79ba17c6bb9f5823312b6f6b7f4a845738e" }, repository: { type: "git", url: "https://github.com/prisma/engines-wrapper.git", directory: "packages/engines-version" }, devDependencies: { "@types/node": "18.19.76", typescript: "4.9.5" }, files: ["index.js", "index.d.ts"], scripts: { build: "tsc -d" } };
    });
    var nr;
    var Li = ne(() => {
      "use strict";
      u();
      c();
      m();
      p();
      d();
      l();
      nr = /* @__PURE__ */ __name(class {
        events = {};
        on(e, r) {
          return this.events[e] || (this.events[e] = []), this.events[e].push(r), this;
        }
        emit(e, ...r) {
          return this.events[e] ? (this.events[e].forEach((n) => {
            n(...r);
          }), true) : false;
        }
      }, "nr");
    });
    var Jl = {};
    rt(Jl, { DMMF: () => mt, Debug: () => J, Decimal: () => ae, Extensions: () => Cr, MetricsClient: () => Ye, PrismaClientInitializationError: () => I, PrismaClientKnownRequestError: () => X, PrismaClientRustPanicError: () => we, PrismaClientUnknownRequestError: () => j, PrismaClientValidationError: () => W, Public: () => Rr, Sql: () => Z, createParam: () => Ri, defineDmmfProperty: () => Ii, deserializeJsonResponse: () => $e, deserializeRawResult: () => hr, dmmfToRuntimeDataModel: () => ni, empty: () => Ni, getPrismaClient: () => Go, getRuntime: () => Re, join: () => Fi, makeStrictEnum: () => Wo, makeTypedQueryFactory: () => Di, objectEnumValues: () => Wt, raw: () => Jr, serializeJsonQuery: () => er, skip: () => Zt, sqltag: () => Gr, warnEnvConflicts: () => void 0, warnOnce: () => lt });
    module.exports = ts(Jl);
    u();
    c();
    m();
    p();
    d();
    l();
    var Cr = {};
    rt(Cr, { defineExtension: () => En, getExtensionContext: () => Pn });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function En(t) {
      return typeof t == "function" ? t : (e) => e.$extends(t);
    }
    __name(En, "En");
    u();
    c();
    m();
    p();
    d();
    l();
    function Pn(t) {
      return t;
    }
    __name(Pn, "Pn");
    var Rr = {};
    rt(Rr, { validator: () => vn });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function vn(...t) {
      return (e) => e;
    }
    __name(vn, "vn");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Ar;
    var Tn;
    var Cn;
    var Rn;
    var An = true;
    typeof g < "u" && ({ FORCE_COLOR: Ar, NODE_DISABLE_COLORS: Tn, NO_COLOR: Cn, TERM: Rn } = g.env || {}, An = g.stdout && g.stdout.isTTY);
    var ds = { enabled: !Tn && Cn == null && Rn !== "dumb" && (Ar != null && Ar !== "0" || An) };
    function F(t, e) {
      let r = new RegExp(`\\x1b\\[${e}m`, "g"), n = `\x1B[${t}m`, i = `\x1B[${e}m`;
      return function(o) {
        return !ds.enabled || o == null ? o : n + (~("" + o).indexOf(i) ? o.replace(r, i + n) : o) + i;
      };
    }
    __name(F, "F");
    var ju = F(0, 0);
    var _t = F(1, 22);
    var Lt = F(2, 22);
    var Qu = F(3, 23);
    var Sn = F(4, 24);
    var Ju = F(7, 27);
    var Gu = F(8, 28);
    var Wu = F(9, 29);
    var Ku = F(30, 39);
    var qe = F(31, 39);
    var kn = F(32, 39);
    var On = F(33, 39);
    var Mn = F(34, 39);
    var Hu = F(35, 39);
    var In = F(36, 39);
    var zu = F(37, 39);
    var Dn = F(90, 39);
    var Yu = F(90, 39);
    var Xu = F(40, 49);
    var Zu = F(41, 49);
    var ec = F(42, 49);
    var tc = F(43, 49);
    var rc = F(44, 49);
    var nc = F(45, 49);
    var ic = F(46, 49);
    var oc = F(47, 49);
    u();
    c();
    m();
    p();
    d();
    l();
    var fs = 100;
    var _n = ["green", "yellow", "blue", "magenta", "cyan", "red"];
    var Ft = [];
    var Ln = Date.now();
    var gs = 0;
    var Sr = typeof g < "u" ? g.env : {};
    globalThis.DEBUG ??= Sr.DEBUG ?? "";
    globalThis.DEBUG_COLORS ??= Sr.DEBUG_COLORS ? Sr.DEBUG_COLORS === "true" : true;
    var ot = { enable(t) {
      typeof t == "string" && (globalThis.DEBUG = t);
    }, disable() {
      let t = globalThis.DEBUG;
      return globalThis.DEBUG = "", t;
    }, enabled(t) {
      let e = globalThis.DEBUG.split(",").map((i) => i.replace(/[.+?^${}()|[\]\\]/g, "\\$&")), r = e.some((i) => i === "" || i[0] === "-" ? false : t.match(RegExp(i.split("*").join(".*") + "$"))), n = e.some((i) => i === "" || i[0] !== "-" ? false : t.match(RegExp(i.slice(1).split("*").join(".*") + "$")));
      return r && !n;
    }, log: (...t) => {
      let [e, r, ...n] = t;
      (console.warn ?? console.log)(`${e} ${r}`, ...n);
    }, formatters: {} };
    function ys(t) {
      let e = { color: _n[gs++ % _n.length], enabled: ot.enabled(t), namespace: t, log: ot.log, extend: () => {
      } }, r = /* @__PURE__ */ __name((...n) => {
        let { enabled: i, namespace: o, color: s, log: a } = e;
        if (n.length !== 0 && Ft.push([o, ...n]), Ft.length > fs && Ft.shift(), ot.enabled(o) || i) {
          let f = n.map((T) => typeof T == "string" ? T : hs(T)), h = `+${Date.now() - Ln}ms`;
          Ln = Date.now(), a(o, ...f, h);
        }
      }, "r");
      return new Proxy(r, { get: (n, i) => e[i], set: (n, i, o) => e[i] = o });
    }
    __name(ys, "ys");
    var J = new Proxy(ys, { get: (t, e) => ot[e], set: (t, e, r) => ot[e] = r });
    function hs(t, e = 2) {
      let r = /* @__PURE__ */ new Set();
      return JSON.stringify(t, (n, i) => {
        if (typeof i == "object" && i !== null) {
          if (r.has(i))
            return "[Circular *]";
          r.add(i);
        } else if (typeof i == "bigint")
          return i.toString();
        return i;
      }, e);
    }
    __name(hs, "hs");
    function Fn() {
      Ft.length = 0;
    }
    __name(Fn, "Fn");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var kr = ["darwin", "darwin-arm64", "debian-openssl-1.0.x", "debian-openssl-1.1.x", "debian-openssl-3.0.x", "rhel-openssl-1.0.x", "rhel-openssl-1.1.x", "rhel-openssl-3.0.x", "linux-arm64-openssl-1.1.x", "linux-arm64-openssl-1.0.x", "linux-arm64-openssl-3.0.x", "linux-arm-openssl-1.1.x", "linux-arm-openssl-1.0.x", "linux-arm-openssl-3.0.x", "linux-musl", "linux-musl-openssl-3.0.x", "linux-musl-arm64-openssl-1.1.x", "linux-musl-arm64-openssl-3.0.x", "linux-nixos", "linux-static-x64", "linux-static-arm64", "windows", "freebsd11", "freebsd12", "freebsd13", "freebsd14", "freebsd15", "openbsd", "netbsd", "arm"];
    u();
    c();
    m();
    p();
    d();
    l();
    var qs = Qn();
    var Or = qs.version;
    u();
    c();
    m();
    p();
    d();
    l();
    function Ue(t) {
      let e = Us();
      return e || (t?.config.engineType === "library" ? "library" : t?.config.engineType === "binary" ? "binary" : t?.config.engineType === "client" ? "client" : Bs(t));
    }
    __name(Ue, "Ue");
    function Us() {
      let t = g.env.PRISMA_CLIENT_ENGINE_TYPE;
      return t === "library" ? "library" : t === "binary" ? "binary" : t === "client" ? "client" : void 0;
    }
    __name(Us, "Us");
    function Bs(t) {
      return t?.previewFeatures.includes("queryCompiler") ? "client" : "library";
    }
    __name(Bs, "Bs");
    u();
    c();
    m();
    p();
    d();
    l();
    var Jn = "prisma+postgres";
    var Gn = `${Jn}:`;
    function Mr(t) {
      return t?.toString().startsWith(`${Gn}//`) ?? false;
    }
    __name(Mr, "Mr");
    var at = {};
    rt(at, { error: () => js, info: () => Vs, log: () => $s, query: () => Qs, should: () => Hn, tags: () => st, warn: () => Ir });
    u();
    c();
    m();
    p();
    d();
    l();
    var st = { error: qe("prisma:error"), warn: On("prisma:warn"), info: In("prisma:info"), query: Mn("prisma:query") };
    var Hn = { warn: () => !g.env.PRISMA_DISABLE_WARNINGS };
    function $s(...t) {
      console.log(...t);
    }
    __name($s, "$s");
    function Ir(t, ...e) {
      Hn.warn() && console.warn(`${st.warn} ${t}`, ...e);
    }
    __name(Ir, "Ir");
    function Vs(t, ...e) {
      console.info(`${st.info} ${t}`, ...e);
    }
    __name(Vs, "Vs");
    function js(t, ...e) {
      console.error(`${st.error} ${t}`, ...e);
    }
    __name(js, "js");
    function Qs(t, ...e) {
      console.log(`${st.query} ${t}`, ...e);
    }
    __name(Qs, "Qs");
    u();
    c();
    m();
    p();
    d();
    l();
    function qt(t, e) {
      if (!t)
        throw new Error(`${e}. This should never happen. If you see this error, please, open an issue at https://pris.ly/prisma-prisma-bug-report`);
    }
    __name(qt, "qt");
    u();
    c();
    m();
    p();
    d();
    l();
    function be(t, e) {
      throw new Error(e);
    }
    __name(be, "be");
    u();
    c();
    m();
    p();
    d();
    l();
    function Dr(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    __name(Dr, "Dr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Be(t, e) {
      let r = {};
      for (let n of Object.keys(t))
        r[n] = e(t[n], n);
      return r;
    }
    __name(Be, "Be");
    u();
    c();
    m();
    p();
    d();
    l();
    function _r(t, e) {
      if (t.length === 0)
        return;
      let r = t[0];
      for (let n = 1; n < t.length; n++)
        e(r, t[n]) < 0 && (r = t[n]);
      return r;
    }
    __name(_r, "_r");
    u();
    c();
    m();
    p();
    d();
    l();
    function te(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(te, "te");
    u();
    c();
    m();
    p();
    d();
    l();
    var ei = /* @__PURE__ */ new Set();
    var lt = /* @__PURE__ */ __name((t, e, ...r) => {
      ei.has(t) || (ei.add(t), Ir(e, ...r));
    }, "lt");
    var I = /* @__PURE__ */ __name(class t extends Error {
      clientVersion;
      errorCode;
      retryable;
      constructor(e, r, n) {
        super(e), this.name = "PrismaClientInitializationError", this.clientVersion = r, this.errorCode = n, Error.captureStackTrace(t);
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientInitializationError";
      }
    }, "t");
    te(I, "PrismaClientInitializationError");
    u();
    c();
    m();
    p();
    d();
    l();
    var X = /* @__PURE__ */ __name(class extends Error {
      code;
      meta;
      clientVersion;
      batchRequestIdx;
      constructor(e, { code: r, clientVersion: n, meta: i, batchRequestIdx: o }) {
        super(e), this.name = "PrismaClientKnownRequestError", this.code = r, this.clientVersion = n, this.meta = i, Object.defineProperty(this, "batchRequestIdx", { value: o, enumerable: false, writable: true });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientKnownRequestError";
      }
    }, "X");
    te(X, "PrismaClientKnownRequestError");
    u();
    c();
    m();
    p();
    d();
    l();
    var we = /* @__PURE__ */ __name(class extends Error {
      clientVersion;
      constructor(e, r) {
        super(e), this.name = "PrismaClientRustPanicError", this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientRustPanicError";
      }
    }, "we");
    te(we, "PrismaClientRustPanicError");
    u();
    c();
    m();
    p();
    d();
    l();
    var j = /* @__PURE__ */ __name(class extends Error {
      clientVersion;
      batchRequestIdx;
      constructor(e, { clientVersion: r, batchRequestIdx: n }) {
        super(e), this.name = "PrismaClientUnknownRequestError", this.clientVersion = r, Object.defineProperty(this, "batchRequestIdx", { value: n, writable: true, enumerable: false });
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientUnknownRequestError";
      }
    }, "j");
    te(j, "PrismaClientUnknownRequestError");
    u();
    c();
    m();
    p();
    d();
    l();
    var W = /* @__PURE__ */ __name(class extends Error {
      name = "PrismaClientValidationError";
      clientVersion;
      constructor(e, { clientVersion: r }) {
        super(e), this.clientVersion = r;
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientValidationError";
      }
    }, "W");
    te(W, "PrismaClientValidationError");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function $e(t) {
      return t === null ? t : Array.isArray(t) ? t.map($e) : typeof t == "object" ? Gs(t) ? Ws(t) : typeof t == "bigint" || t instanceof Date || t instanceof Uint8Array || t instanceof ae ? t : Be(t, $e) : t;
    }
    __name($e, "$e");
    function Gs(t) {
      return t !== null && typeof t == "object" && typeof t.$type == "string";
    }
    __name(Gs, "Gs");
    function Ws({ $type: t, value: e }) {
      switch (t) {
        case "BigInt":
          return BigInt(e);
        case "Bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "DateTime":
          return new Date(e);
        case "Decimal":
          return new ae(e);
        case "Json":
          return JSON.parse(e);
        default:
          be(e, "Unknown tagged value");
      }
    }
    __name(Ws, "Ws");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var pe = /* @__PURE__ */ __name(class {
      _map = /* @__PURE__ */ new Map();
      get(e) {
        return this._map.get(e)?.value;
      }
      set(e, r) {
        this._map.set(e, { value: r });
      }
      getOrCreate(e, r) {
        let n = this._map.get(e);
        if (n)
          return n.value;
        let i = r();
        return this.set(e, i), i;
      }
    }, "pe");
    u();
    c();
    m();
    p();
    d();
    l();
    function ve(t) {
      return t.substring(0, 1).toLowerCase() + t.substring(1);
    }
    __name(ve, "ve");
    u();
    c();
    m();
    p();
    d();
    l();
    function ri(t, e) {
      let r = {};
      for (let n of t) {
        let i = n[e];
        r[i] = n;
      }
      return r;
    }
    __name(ri, "ri");
    u();
    c();
    m();
    p();
    d();
    l();
    function ut(t) {
      let e;
      return { get() {
        return e || (e = { value: t() }), e.value;
      } };
    }
    __name(ut, "ut");
    u();
    c();
    m();
    p();
    d();
    l();
    function ni(t) {
      return { models: Lr(t.models), enums: Lr(t.enums), types: Lr(t.types) };
    }
    __name(ni, "ni");
    function Lr(t) {
      let e = {};
      for (let { name: r, ...n } of t)
        e[r] = n;
      return e;
    }
    __name(Lr, "Lr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ve(t) {
      return t instanceof Date || Object.prototype.toString.call(t) === "[object Date]";
    }
    __name(Ve, "Ve");
    function Ut(t) {
      return t.toString() !== "Invalid Date";
    }
    __name(Ut, "Ut");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function je(t) {
      return v.isDecimal(t) ? true : t !== null && typeof t == "object" && typeof t.s == "number" && typeof t.e == "number" && typeof t.toFixed == "function" && Array.isArray(t.d);
    }
    __name(je, "je");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var mt = {};
    rt(mt, { ModelAction: () => ct, datamodelEnumToSchemaEnum: () => Ks });
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Ks(t) {
      return { name: t.name, values: t.values.map((e) => e.name) };
    }
    __name(Ks, "Ks");
    u();
    c();
    m();
    p();
    d();
    l();
    var ct = ((L) => (L.findUnique = "findUnique", L.findUniqueOrThrow = "findUniqueOrThrow", L.findFirst = "findFirst", L.findFirstOrThrow = "findFirstOrThrow", L.findMany = "findMany", L.create = "create", L.createMany = "createMany", L.createManyAndReturn = "createManyAndReturn", L.update = "update", L.updateMany = "updateMany", L.updateManyAndReturn = "updateManyAndReturn", L.upsert = "upsert", L.delete = "delete", L.deleteMany = "deleteMany", L.groupBy = "groupBy", L.count = "count", L.aggregate = "aggregate", L.findRaw = "findRaw", L.aggregateRaw = "aggregateRaw", L))(ct || {});
    var Hs = nt(Kn());
    var zs = { red: qe, gray: Dn, dim: Lt, bold: _t, underline: Sn, highlightSource: (t) => t.highlight() };
    var Ys = { red: (t) => t, gray: (t) => t, dim: (t) => t, bold: (t) => t, underline: (t) => t, highlightSource: (t) => t };
    function Xs({ message: t, originalMethod: e, isPanic: r, callArguments: n }) {
      return { functionName: `prisma.${e}()`, message: t, isPanic: r ?? false, callArguments: n };
    }
    __name(Xs, "Xs");
    function Zs({ functionName: t, location: e, message: r, isPanic: n, contextLines: i, callArguments: o }, s) {
      let a = [""], f = e ? " in" : ":";
      if (n ? (a.push(s.red(`Oops, an unknown error occurred! This is ${s.bold("on us")}, you did nothing wrong.`)), a.push(s.red(`It occurred in the ${s.bold(`\`${t}\``)} invocation${f}`))) : a.push(s.red(`Invalid ${s.bold(`\`${t}\``)} invocation${f}`)), e && a.push(s.underline(ea(e))), i) {
        a.push("");
        let h = [i.toString()];
        o && (h.push(o), h.push(s.dim(")"))), a.push(h.join("")), o && a.push("");
      } else
        a.push(""), o && a.push(o), a.push("");
      return a.push(r), a.join(`
`);
    }
    __name(Zs, "Zs");
    function ea(t) {
      let e = [t.fileName];
      return t.lineNumber && e.push(String(t.lineNumber)), t.columnNumber && e.push(String(t.columnNumber)), e.join(":");
    }
    __name(ea, "ea");
    function Bt(t) {
      let e = t.showColors ? zs : Ys, r;
      return typeof $getTemplateParameters < "u" ? r = $getTemplateParameters(t, e) : r = Xs(t), Zs(r, e);
    }
    __name(Bt, "Bt");
    u();
    c();
    m();
    p();
    d();
    l();
    var pi = nt(Fr());
    u();
    c();
    m();
    p();
    d();
    l();
    function ai(t, e, r) {
      let n = li(t), i = ta(n), o = na(i);
      o ? $t(o, e, r) : e.addErrorMessage(() => "Unknown error");
    }
    __name(ai, "ai");
    function li(t) {
      return t.errors.flatMap((e) => e.kind === "Union" ? li(e) : [e]);
    }
    __name(li, "li");
    function ta(t) {
      let e = /* @__PURE__ */ new Map(), r = [];
      for (let n of t) {
        if (n.kind !== "InvalidArgumentType") {
          r.push(n);
          continue;
        }
        let i = `${n.selectionPath.join(".")}:${n.argumentPath.join(".")}`, o = e.get(i);
        o ? e.set(i, { ...n, argument: { ...n.argument, typeNames: ra(o.argument.typeNames, n.argument.typeNames) } }) : e.set(i, n);
      }
      return r.push(...e.values()), r;
    }
    __name(ta, "ta");
    function ra(t, e) {
      return [...new Set(t.concat(e))];
    }
    __name(ra, "ra");
    function na(t) {
      return _r(t, (e, r) => {
        let n = oi(e), i = oi(r);
        return n !== i ? n - i : si(e) - si(r);
      });
    }
    __name(na, "na");
    function oi(t) {
      let e = 0;
      return Array.isArray(t.selectionPath) && (e += t.selectionPath.length), Array.isArray(t.argumentPath) && (e += t.argumentPath.length), e;
    }
    __name(oi, "oi");
    function si(t) {
      switch (t.kind) {
        case "InvalidArgumentValue":
        case "ValueTooLarge":
          return 20;
        case "InvalidArgumentType":
          return 10;
        case "RequiredArgumentMissing":
          return -10;
        default:
          return 0;
      }
    }
    __name(si, "si");
    u();
    c();
    m();
    p();
    d();
    l();
    var re = /* @__PURE__ */ __name(class {
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      isRequired = false;
      makeRequired() {
        return this.isRequired = true, this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.addMarginSymbol(r(this.isRequired ? "+" : "?")), e.write(r(this.name)), this.isRequired || e.write(r("?")), e.write(r(": ")), typeof this.value == "string" ? e.write(r(this.value)) : e.write(this.value);
      }
    }, "re");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    ci();
    u();
    c();
    m();
    p();
    d();
    l();
    var Qe = /* @__PURE__ */ __name(class {
      constructor(e = 0, r) {
        this.context = r;
        this.currentIndent = e;
      }
      lines = [];
      currentLine = "";
      currentIndent = 0;
      marginSymbol;
      afterNextNewLineCallback;
      write(e) {
        return typeof e == "string" ? this.currentLine += e : e.write(this), this;
      }
      writeJoined(e, r, n = (i, o) => o.write(i)) {
        let i = r.length - 1;
        for (let o = 0; o < r.length; o++)
          n(r[o], this), o !== i && this.write(e);
        return this;
      }
      writeLine(e) {
        return this.write(e).newLine();
      }
      newLine() {
        this.lines.push(this.indentedCurrentLine()), this.currentLine = "", this.marginSymbol = void 0;
        let e = this.afterNextNewLineCallback;
        return this.afterNextNewLineCallback = void 0, e?.(), this;
      }
      withIndent(e) {
        return this.indent(), e(this), this.unindent(), this;
      }
      afterNextNewline(e) {
        return this.afterNextNewLineCallback = e, this;
      }
      indent() {
        return this.currentIndent++, this;
      }
      unindent() {
        return this.currentIndent > 0 && this.currentIndent--, this;
      }
      addMarginSymbol(e) {
        return this.marginSymbol = e, this;
      }
      toString() {
        return this.lines.concat(this.indentedCurrentLine()).join(`
`);
      }
      getCurrentLineLength() {
        return this.currentLine.length;
      }
      indentedCurrentLine() {
        let e = this.currentLine.padStart(this.currentLine.length + 2 * this.currentIndent);
        return this.marginSymbol ? this.marginSymbol + e.slice(1) : e;
      }
    }, "Qe");
    ui();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Vt = /* @__PURE__ */ __name(class {
      constructor(e) {
        this.value = e;
      }
      write(e) {
        e.write(this.value);
      }
      markAsError() {
        this.value.markAsError();
      }
    }, "Vt");
    u();
    c();
    m();
    p();
    d();
    l();
    var jt = /* @__PURE__ */ __name((t) => t, "jt");
    var Qt = { bold: jt, red: jt, green: jt, dim: jt, enabled: false };
    var mi = { bold: _t, red: qe, green: kn, dim: Lt, enabled: true };
    var Je = { write(t) {
      t.writeLine(",");
    } };
    u();
    c();
    m();
    p();
    d();
    l();
    var de = /* @__PURE__ */ __name(class {
      constructor(e) {
        this.contents = e;
      }
      isUnderlined = false;
      color = (e) => e;
      underline() {
        return this.isUnderlined = true, this;
      }
      setColor(e) {
        return this.color = e, this;
      }
      write(e) {
        let r = e.getCurrentLineLength();
        e.write(this.color(this.contents)), this.isUnderlined && e.afterNextNewline(() => {
          e.write(" ".repeat(r)).writeLine(this.color("~".repeat(this.contents.length)));
        });
      }
    }, "de");
    u();
    c();
    m();
    p();
    d();
    l();
    var Te = /* @__PURE__ */ __name(class {
      hasError = false;
      markAsError() {
        return this.hasError = true, this;
      }
    }, "Te");
    var Ge = /* @__PURE__ */ __name(class extends Te {
      items = [];
      addItem(e) {
        return this.items.push(new Vt(e)), this;
      }
      getField(e) {
        return this.items[e];
      }
      getPrintWidth() {
        return this.items.length === 0 ? 2 : Math.max(...this.items.map((r) => r.value.getPrintWidth())) + 2;
      }
      write(e) {
        if (this.items.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithItems(e);
      }
      writeEmpty(e) {
        let r = new de("[]");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithItems(e) {
        let { colors: r } = e.context;
        e.writeLine("[").withIndent(() => e.writeJoined(Je, this.items).newLine()).write("]"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(r.red("~".repeat(this.getPrintWidth())));
        });
      }
      asObject() {
      }
    }, "Ge");
    var We = /* @__PURE__ */ __name(class t extends Te {
      fields = {};
      suggestions = [];
      addField(e) {
        this.fields[e.name] = e;
      }
      addSuggestion(e) {
        this.suggestions.push(e);
      }
      getField(e) {
        return this.fields[e];
      }
      getDeepField(e) {
        let [r, ...n] = e, i = this.getField(r);
        if (!i)
          return;
        let o = i;
        for (let s of n) {
          let a;
          if (o.value instanceof t ? a = o.value.getField(s) : o.value instanceof Ge && (a = o.value.getField(Number(s))), !a)
            return;
          o = a;
        }
        return o;
      }
      getDeepFieldValue(e) {
        return e.length === 0 ? this : this.getDeepField(e)?.value;
      }
      hasField(e) {
        return !!this.getField(e);
      }
      removeAllFields() {
        this.fields = {};
      }
      removeField(e) {
        delete this.fields[e];
      }
      getFields() {
        return this.fields;
      }
      isEmpty() {
        return Object.keys(this.fields).length === 0;
      }
      getFieldValue(e) {
        return this.getField(e)?.value;
      }
      getDeepSubSelectionValue(e) {
        let r = this;
        for (let n of e) {
          if (!(r instanceof t))
            return;
          let i = r.getSubSelectionValue(n);
          if (!i)
            return;
          r = i;
        }
        return r;
      }
      getDeepSelectionParent(e) {
        let r = this.getSelectionParent();
        if (!r)
          return;
        let n = r;
        for (let i of e) {
          let o = n.value.getFieldValue(i);
          if (!o || !(o instanceof t))
            return;
          let s = o.getSelectionParent();
          if (!s)
            return;
          n = s;
        }
        return n;
      }
      getSelectionParent() {
        let e = this.getField("select")?.value.asObject();
        if (e)
          return { kind: "select", value: e };
        let r = this.getField("include")?.value.asObject();
        if (r)
          return { kind: "include", value: r };
      }
      getSubSelectionValue(e) {
        return this.getSelectionParent()?.value.fields[e].value;
      }
      getPrintWidth() {
        let e = Object.values(this.fields);
        return e.length == 0 ? 2 : Math.max(...e.map((n) => n.getPrintWidth())) + 2;
      }
      write(e) {
        let r = Object.values(this.fields);
        if (r.length === 0 && this.suggestions.length === 0) {
          this.writeEmpty(e);
          return;
        }
        this.writeWithContents(e, r);
      }
      asObject() {
        return this;
      }
      writeEmpty(e) {
        let r = new de("{}");
        this.hasError && r.setColor(e.context.colors.red).underline(), e.write(r);
      }
      writeWithContents(e, r) {
        e.writeLine("{").withIndent(() => {
          e.writeJoined(Je, [...r, ...this.suggestions]).newLine();
        }), e.write("}"), this.hasError && e.afterNextNewline(() => {
          e.writeLine(e.context.colors.red("~".repeat(this.getPrintWidth())));
        });
      }
    }, "t");
    u();
    c();
    m();
    p();
    d();
    l();
    var G = /* @__PURE__ */ __name(class extends Te {
      constructor(r) {
        super();
        this.text = r;
      }
      getPrintWidth() {
        return this.text.length;
      }
      write(r) {
        let n = new de(this.text);
        this.hasError && n.underline().setColor(r.context.colors.red), r.write(n);
      }
      asObject() {
      }
    }, "G");
    u();
    c();
    m();
    p();
    d();
    l();
    var pt = /* @__PURE__ */ __name(class {
      fields = [];
      addField(e, r) {
        return this.fields.push({ write(n) {
          let { green: i, dim: o } = n.context.colors;
          n.write(i(o(`${e}: ${r}`))).addMarginSymbol(i(o("+")));
        } }), this;
      }
      write(e) {
        let { colors: { green: r } } = e.context;
        e.writeLine(r("{")).withIndent(() => {
          e.writeJoined(Je, this.fields).newLine();
        }).write(r("}")).addMarginSymbol(r("+"));
      }
    }, "pt");
    function $t(t, e, r) {
      switch (t.kind) {
        case "MutuallyExclusiveFields":
          ia(t, e);
          break;
        case "IncludeOnScalar":
          oa(t, e);
          break;
        case "EmptySelection":
          sa(t, e, r);
          break;
        case "UnknownSelectionField":
          ca(t, e);
          break;
        case "InvalidSelectionValue":
          ma(t, e);
          break;
        case "UnknownArgument":
          pa(t, e);
          break;
        case "UnknownInputField":
          da(t, e);
          break;
        case "RequiredArgumentMissing":
          fa(t, e);
          break;
        case "InvalidArgumentType":
          ga(t, e);
          break;
        case "InvalidArgumentValue":
          ya(t, e);
          break;
        case "ValueTooLarge":
          ha(t, e);
          break;
        case "SomeFieldsMissing":
          ba(t, e);
          break;
        case "TooManyFieldsGiven":
          wa(t, e);
          break;
        case "Union":
          ai(t, e, r);
          break;
        default:
          throw new Error("not implemented: " + t.kind);
      }
    }
    __name($t, "$t");
    function ia(t, e) {
      let r = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      r && (r.getField(t.firstField)?.markAsError(), r.getField(t.secondField)?.markAsError()), e.addErrorMessage((n) => `Please ${n.bold("either")} use ${n.green(`\`${t.firstField}\``)} or ${n.green(`\`${t.secondField}\``)}, but ${n.red("not both")} at the same time.`);
    }
    __name(ia, "ia");
    function oa(t, e) {
      let [r, n] = dt(t.selectionPath), i = t.outputType, o = e.arguments.getDeepSelectionParent(r)?.value;
      if (o && (o.getField(n)?.markAsError(), i))
        for (let s of i.fields)
          s.isRelation && o.addSuggestion(new re(s.name, "true"));
      e.addErrorMessage((s) => {
        let a = `Invalid scalar field ${s.red(`\`${n}\``)} for ${s.bold("include")} statement`;
        return i ? a += ` on model ${s.bold(i.name)}. ${ft(s)}` : a += ".", a += `
Note that ${s.bold("include")} statements only accept relation fields.`, a;
      });
    }
    __name(oa, "oa");
    function sa(t, e, r) {
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getField("omit")?.value.asObject();
        if (i) {
          aa(t, e, i);
          return;
        }
        if (n.hasField("select")) {
          la(t, e);
          return;
        }
      }
      if (r?.[ve(t.outputType.name)]) {
        ua(t, e);
        return;
      }
      e.addErrorMessage(() => `Unknown field at "${t.selectionPath.join(".")} selection"`);
    }
    __name(sa, "sa");
    function aa(t, e, r) {
      r.removeAllFields();
      for (let n of t.outputType.fields)
        r.addSuggestion(new re(n.name, "false"));
      e.addErrorMessage((n) => `The ${n.red("omit")} statement includes every field of the model ${n.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(aa, "aa");
    function la(t, e) {
      let r = t.outputType, n = e.arguments.getDeepSelectionParent(t.selectionPath)?.value, i = n?.isEmpty() ?? false;
      n && (n.removeAllFields(), gi(n, r)), e.addErrorMessage((o) => i ? `The ${o.red("`select`")} statement for type ${o.bold(r.name)} must not be empty. ${ft(o)}` : `The ${o.red("`select`")} statement for type ${o.bold(r.name)} needs ${o.bold("at least one truthy value")}.`);
    }
    __name(la, "la");
    function ua(t, e) {
      let r = new pt();
      for (let i of t.outputType.fields)
        i.isRelation || r.addField(i.name, "false");
      let n = new re("omit", r).makeRequired();
      if (t.selectionPath.length === 0)
        e.arguments.addSuggestion(n);
      else {
        let [i, o] = dt(t.selectionPath), a = e.arguments.getDeepSelectionParent(i)?.value.asObject()?.getField(o);
        if (a) {
          let f = a?.value.asObject() ?? new We();
          f.addSuggestion(n), a.value = f;
        }
      }
      e.addErrorMessage((i) => `The global ${i.red("omit")} configuration excludes every field of the model ${i.bold(t.outputType.name)}. At least one field must be included in the result`);
    }
    __name(ua, "ua");
    function ca(t, e) {
      let r = yi(t.selectionPath, e);
      if (r.parentKind !== "unknown") {
        r.field.markAsError();
        let n = r.parent;
        switch (r.parentKind) {
          case "select":
            gi(n, t.outputType);
            break;
          case "include":
            xa(n, t.outputType);
            break;
          case "omit":
            Ea(n, t.outputType);
            break;
        }
      }
      e.addErrorMessage((n) => {
        let i = [`Unknown field ${n.red(`\`${r.fieldName}\``)}`];
        return r.parentKind !== "unknown" && i.push(`for ${n.bold(r.parentKind)} statement`), i.push(`on model ${n.bold(`\`${t.outputType.name}\``)}.`), i.push(ft(n)), i.join(" ");
      });
    }
    __name(ca, "ca");
    function ma(t, e) {
      let r = yi(t.selectionPath, e);
      r.parentKind !== "unknown" && r.field.value.markAsError(), e.addErrorMessage((n) => `Invalid value for selection field \`${n.red(r.fieldName)}\`: ${t.underlyingError}`);
    }
    __name(ma, "ma");
    function pa(t, e) {
      let r = t.argumentPath[0], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && (n.getField(r)?.markAsError(), Pa(n, t.arguments)), e.addErrorMessage((i) => di(i, r, t.arguments.map((o) => o.name)));
    }
    __name(pa, "pa");
    function da(t, e) {
      let [r, n] = dt(t.argumentPath), i = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (i) {
        i.getDeepField(t.argumentPath)?.markAsError();
        let o = i.getDeepFieldValue(r)?.asObject();
        o && hi(o, t.inputType);
      }
      e.addErrorMessage((o) => di(o, n, t.inputType.fields.map((s) => s.name)));
    }
    __name(da, "da");
    function di(t, e, r) {
      let n = [`Unknown argument \`${t.red(e)}\`.`], i = Ta(e, r);
      return i && n.push(`Did you mean \`${t.green(i)}\`?`), r.length > 0 && n.push(ft(t)), n.join(" ");
    }
    __name(di, "di");
    function fa(t, e) {
      let r;
      e.addErrorMessage((f) => r?.value instanceof G && r.value.text === "null" ? `Argument \`${f.green(o)}\` must not be ${f.red("null")}.` : `Argument \`${f.green(o)}\` is missing.`);
      let n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (!n)
        return;
      let [i, o] = dt(t.argumentPath), s = new pt(), a = n.getDeepFieldValue(i)?.asObject();
      if (a)
        if (r = a.getField(o), r && a.removeField(o), t.inputTypes.length === 1 && t.inputTypes[0].kind === "object") {
          for (let f of t.inputTypes[0].fields)
            s.addField(f.name, f.typeNames.join(" | "));
          a.addSuggestion(new re(o, s).makeRequired());
        } else {
          let f = t.inputTypes.map(fi).join(" | ");
          a.addSuggestion(new re(o, f).makeRequired());
        }
    }
    __name(fa, "fa");
    function fi(t) {
      return t.kind === "list" ? `${fi(t.elementType)}[]` : t.name;
    }
    __name(fi, "fi");
    function ga(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = Jt("or", t.argument.typeNames.map((s) => i.green(s)));
        return `Argument \`${i.bold(r)}\`: Invalid value provided. Expected ${o}, provided ${i.red(t.inferredType)}.`;
      });
    }
    __name(ga, "ga");
    function ya(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      n && n.getDeepFieldValue(t.argumentPath)?.markAsError(), e.addErrorMessage((i) => {
        let o = [`Invalid value for argument \`${i.bold(r)}\``];
        if (t.underlyingError && o.push(`: ${t.underlyingError}`), o.push("."), t.argument.typeNames.length > 0) {
          let s = Jt("or", t.argument.typeNames.map((a) => i.green(a)));
          o.push(` Expected ${s}.`);
        }
        return o.join("");
      });
    }
    __name(ya, "ya");
    function ha(t, e) {
      let r = t.argument.name, n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i;
      if (n) {
        let s = n.getDeepField(t.argumentPath)?.value;
        s?.markAsError(), s instanceof G && (i = s.text);
      }
      e.addErrorMessage((o) => {
        let s = ["Unable to fit value"];
        return i && s.push(o.red(i)), s.push(`into a 64-bit signed integer for field \`${o.bold(r)}\``), s.join(" ");
      });
    }
    __name(ha, "ha");
    function ba(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject();
      if (n) {
        let i = n.getDeepFieldValue(t.argumentPath)?.asObject();
        i && hi(i, t.inputType);
      }
      e.addErrorMessage((i) => {
        let o = [`Argument \`${i.bold(r)}\` of type ${i.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 ? t.constraints.requiredFields ? o.push(`${i.green("at least one of")} ${Jt("or", t.constraints.requiredFields.map((s) => `\`${i.bold(s)}\``))} arguments.`) : o.push(`${i.green("at least one")} argument.`) : o.push(`${i.green(`at least ${t.constraints.minFieldCount}`)} arguments.`), o.push(ft(i)), o.join(" ");
      });
    }
    __name(ba, "ba");
    function wa(t, e) {
      let r = t.argumentPath[t.argumentPath.length - 1], n = e.arguments.getDeepSubSelectionValue(t.selectionPath)?.asObject(), i = [];
      if (n) {
        let o = n.getDeepFieldValue(t.argumentPath)?.asObject();
        o && (o.markAsError(), i = Object.keys(o.getFields()));
      }
      e.addErrorMessage((o) => {
        let s = [`Argument \`${o.bold(r)}\` of type ${o.bold(t.inputType.name)} needs`];
        return t.constraints.minFieldCount === 1 && t.constraints.maxFieldCount == 1 ? s.push(`${o.green("exactly one")} argument,`) : t.constraints.maxFieldCount == 1 ? s.push(`${o.green("at most one")} argument,`) : s.push(`${o.green(`at most ${t.constraints.maxFieldCount}`)} arguments,`), s.push(`but you provided ${Jt("and", i.map((a) => o.red(a)))}. Please choose`), t.constraints.maxFieldCount === 1 ? s.push("one.") : s.push(`${t.constraints.maxFieldCount}.`), s.join(" ");
      });
    }
    __name(wa, "wa");
    function gi(t, e) {
      for (let r of e.fields)
        t.hasField(r.name) || t.addSuggestion(new re(r.name, "true"));
    }
    __name(gi, "gi");
    function xa(t, e) {
      for (let r of e.fields)
        r.isRelation && !t.hasField(r.name) && t.addSuggestion(new re(r.name, "true"));
    }
    __name(xa, "xa");
    function Ea(t, e) {
      for (let r of e.fields)
        !t.hasField(r.name) && !r.isRelation && t.addSuggestion(new re(r.name, "true"));
    }
    __name(Ea, "Ea");
    function Pa(t, e) {
      for (let r of e)
        t.hasField(r.name) || t.addSuggestion(new re(r.name, r.typeNames.join(" | ")));
    }
    __name(Pa, "Pa");
    function yi(t, e) {
      let [r, n] = dt(t), i = e.arguments.getDeepSubSelectionValue(r)?.asObject();
      if (!i)
        return { parentKind: "unknown", fieldName: n };
      let o = i.getFieldValue("select")?.asObject(), s = i.getFieldValue("include")?.asObject(), a = i.getFieldValue("omit")?.asObject(), f = o?.getField(n);
      return o && f ? { parentKind: "select", parent: o, field: f, fieldName: n } : (f = s?.getField(n), s && f ? { parentKind: "include", field: f, parent: s, fieldName: n } : (f = a?.getField(n), a && f ? { parentKind: "omit", field: f, parent: a, fieldName: n } : { parentKind: "unknown", fieldName: n }));
    }
    __name(yi, "yi");
    function hi(t, e) {
      if (e.kind === "object")
        for (let r of e.fields)
          t.hasField(r.name) || t.addSuggestion(new re(r.name, r.typeNames.join(" | ")));
    }
    __name(hi, "hi");
    function dt(t) {
      let e = [...t], r = e.pop();
      if (!r)
        throw new Error("unexpected empty path");
      return [e, r];
    }
    __name(dt, "dt");
    function ft({ green: t, enabled: e }) {
      return "Available options are " + (e ? `listed in ${t("green")}` : "marked with ?") + ".";
    }
    __name(ft, "ft");
    function Jt(t, e) {
      if (e.length === 1)
        return e[0];
      let r = [...e], n = r.pop();
      return `${r.join(", ")} ${t} ${n}`;
    }
    __name(Jt, "Jt");
    var va = 3;
    function Ta(t, e) {
      let r = 1 / 0, n;
      for (let i of e) {
        let o = (0, pi.default)(t, i);
        o > va || o < r && (r = o, n = i);
      }
      return n;
    }
    __name(Ta, "Ta");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var gt = /* @__PURE__ */ __name(class {
      modelName;
      name;
      typeName;
      isList;
      isEnum;
      constructor(e, r, n, i, o) {
        this.modelName = e, this.name = r, this.typeName = n, this.isList = i, this.isEnum = o;
      }
      _toGraphQLInputType() {
        let e = this.isList ? "List" : "", r = this.isEnum ? "Enum" : "";
        return `${e}${r}${this.typeName}FieldRefInput<${this.modelName}>`;
      }
    }, "gt");
    function Ke(t) {
      return t instanceof gt;
    }
    __name(Ke, "Ke");
    u();
    c();
    m();
    p();
    d();
    l();
    var Gt = Symbol();
    var qr = /* @__PURE__ */ new WeakMap();
    var xe = /* @__PURE__ */ __name(class {
      constructor(e) {
        e === Gt ? qr.set(this, `Prisma.${this._getName()}`) : qr.set(this, `new Prisma.${this._getNamespace()}.${this._getName()}()`);
      }
      _getName() {
        return this.constructor.name;
      }
      toString() {
        return qr.get(this);
      }
    }, "xe");
    var yt = /* @__PURE__ */ __name(class extends xe {
      _getNamespace() {
        return "NullTypes";
      }
    }, "yt");
    var ht = /* @__PURE__ */ __name(class extends yt {
      #e;
    }, "ht");
    Ur(ht, "DbNull");
    var bt = /* @__PURE__ */ __name(class extends yt {
      #e;
    }, "bt");
    Ur(bt, "JsonNull");
    var wt = /* @__PURE__ */ __name(class extends yt {
      #e;
    }, "wt");
    Ur(wt, "AnyNull");
    var Wt = { classes: { DbNull: ht, JsonNull: bt, AnyNull: wt }, instances: { DbNull: new ht(Gt), JsonNull: new bt(Gt), AnyNull: new wt(Gt) } };
    function Ur(t, e) {
      Object.defineProperty(t, "name", { value: e, configurable: true });
    }
    __name(Ur, "Ur");
    u();
    c();
    m();
    p();
    d();
    l();
    var bi = ": ";
    var Kt = /* @__PURE__ */ __name(class {
      constructor(e, r) {
        this.name = e;
        this.value = r;
      }
      hasError = false;
      markAsError() {
        this.hasError = true;
      }
      getPrintWidth() {
        return this.name.length + this.value.getPrintWidth() + bi.length;
      }
      write(e) {
        let r = new de(this.name);
        this.hasError && r.underline().setColor(e.context.colors.red), e.write(r).write(bi).write(this.value);
      }
    }, "Kt");
    var Br = /* @__PURE__ */ __name(class {
      arguments;
      errorMessages = [];
      constructor(e) {
        this.arguments = e;
      }
      write(e) {
        e.write(this.arguments);
      }
      addErrorMessage(e) {
        this.errorMessages.push(e);
      }
      renderAllMessages(e) {
        return this.errorMessages.map((r) => r(e)).join(`
`);
      }
    }, "Br");
    function He(t) {
      return new Br(wi(t));
    }
    __name(He, "He");
    function wi(t) {
      let e = new We();
      for (let [r, n] of Object.entries(t)) {
        let i = new Kt(r, xi(n));
        e.addField(i);
      }
      return e;
    }
    __name(wi, "wi");
    function xi(t) {
      if (typeof t == "string")
        return new G(JSON.stringify(t));
      if (typeof t == "number" || typeof t == "boolean")
        return new G(String(t));
      if (typeof t == "bigint")
        return new G(`${t}n`);
      if (t === null)
        return new G("null");
      if (t === void 0)
        return new G("undefined");
      if (je(t))
        return new G(`new Prisma.Decimal("${t.toFixed()}")`);
      if (t instanceof Uint8Array)
        return b.isBuffer(t) ? new G(`Buffer.alloc(${t.byteLength})`) : new G(`new Uint8Array(${t.byteLength})`);
      if (t instanceof Date) {
        let e = Ut(t) ? t.toISOString() : "Invalid Date";
        return new G(`new Date("${e}")`);
      }
      return t instanceof xe ? new G(`Prisma.${t._getName()}`) : Ke(t) ? new G(`prisma.${ve(t.modelName)}.$fields.${t.name}`) : Array.isArray(t) ? Ca(t) : typeof t == "object" ? wi(t) : new G(Object.prototype.toString.call(t));
    }
    __name(xi, "xi");
    function Ca(t) {
      let e = new Ge();
      for (let r of t)
        e.addItem(xi(r));
      return e;
    }
    __name(Ca, "Ca");
    function Ht(t, e) {
      let r = e === "pretty" ? mi : Qt, n = t.renderAllMessages(r), i = new Qe(0, { colors: r }).write(t).toString();
      return { message: n, args: i };
    }
    __name(Ht, "Ht");
    function zt({ args: t, errors: e, errorFormat: r, callsite: n, originalMethod: i, clientVersion: o, globalOmit: s }) {
      let a = He(t);
      for (let C of e)
        $t(C, a, s);
      let { message: f, args: h } = Ht(a, r), T = Bt({ message: f, callsite: n, originalMethod: i, showColors: r === "pretty", callArguments: h });
      throw new W(T, { clientVersion: o });
    }
    __name(zt, "zt");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function fe(t) {
      return t.replace(/^./, (e) => e.toLowerCase());
    }
    __name(fe, "fe");
    u();
    c();
    m();
    p();
    d();
    l();
    function Pi(t, e, r) {
      let n = fe(r);
      return !e.result || !(e.result.$allModels || e.result[n]) ? t : Ra({ ...t, ...Ei(e.name, t, e.result.$allModels), ...Ei(e.name, t, e.result[n]) });
    }
    __name(Pi, "Pi");
    function Ra(t) {
      let e = new pe(), r = /* @__PURE__ */ __name((n, i) => e.getOrCreate(n, () => i.has(n) ? [n] : (i.add(n), t[n] ? t[n].needs.flatMap((o) => r(o, i)) : [n])), "r");
      return Be(t, (n) => ({ ...n, needs: r(n.name, /* @__PURE__ */ new Set()) }));
    }
    __name(Ra, "Ra");
    function Ei(t, e, r) {
      return r ? Be(r, ({ needs: n, compute: i }, o) => ({ name: o, needs: n ? Object.keys(n).filter((s) => n[s]) : [], compute: Aa(e, o, i) })) : {};
    }
    __name(Ei, "Ei");
    function Aa(t, e, r) {
      let n = t?.[e]?.compute;
      return n ? (i) => r({ ...i, [e]: n(i) }) : r;
    }
    __name(Aa, "Aa");
    function vi(t, e) {
      if (!e)
        return t;
      let r = { ...t };
      for (let n of Object.values(e))
        if (t[n.name])
          for (let i of n.needs)
            r[i] = true;
      return r;
    }
    __name(vi, "vi");
    function Ti(t, e) {
      if (!e)
        return t;
      let r = { ...t };
      for (let n of Object.values(e))
        if (!t[n.name])
          for (let i of n.needs)
            delete r[i];
      return r;
    }
    __name(Ti, "Ti");
    var Yt = /* @__PURE__ */ __name(class {
      constructor(e, r) {
        this.extension = e;
        this.previous = r;
      }
      computedFieldsCache = new pe();
      modelExtensionsCache = new pe();
      queryCallbacksCache = new pe();
      clientExtensions = ut(() => this.extension.client ? { ...this.previous?.getAllClientExtensions(), ...this.extension.client } : this.previous?.getAllClientExtensions());
      batchCallbacks = ut(() => {
        let e = this.previous?.getAllBatchQueryCallbacks() ?? [], r = this.extension.query?.$__internalBatch;
        return r ? e.concat(r) : e;
      });
      getAllComputedFields(e) {
        return this.computedFieldsCache.getOrCreate(e, () => Pi(this.previous?.getAllComputedFields(e), this.extension, e));
      }
      getAllClientExtensions() {
        return this.clientExtensions.get();
      }
      getAllModelExtensions(e) {
        return this.modelExtensionsCache.getOrCreate(e, () => {
          let r = fe(e);
          return !this.extension.model || !(this.extension.model[r] || this.extension.model.$allModels) ? this.previous?.getAllModelExtensions(e) : { ...this.previous?.getAllModelExtensions(e), ...this.extension.model.$allModels, ...this.extension.model[r] };
        });
      }
      getAllQueryCallbacks(e, r) {
        return this.queryCallbacksCache.getOrCreate(`${e}:${r}`, () => {
          let n = this.previous?.getAllQueryCallbacks(e, r) ?? [], i = [], o = this.extension.query;
          return !o || !(o[e] || o.$allModels || o[r] || o.$allOperations) ? n : (o[e] !== void 0 && (o[e][r] !== void 0 && i.push(o[e][r]), o[e].$allOperations !== void 0 && i.push(o[e].$allOperations)), e !== "$none" && o.$allModels !== void 0 && (o.$allModels[r] !== void 0 && i.push(o.$allModels[r]), o.$allModels.$allOperations !== void 0 && i.push(o.$allModels.$allOperations)), o[r] !== void 0 && i.push(o[r]), o.$allOperations !== void 0 && i.push(o.$allOperations), n.concat(i));
        });
      }
      getAllBatchQueryCallbacks() {
        return this.batchCallbacks.get();
      }
    }, "Yt");
    var ze = /* @__PURE__ */ __name(class t {
      constructor(e) {
        this.head = e;
      }
      static empty() {
        return new t();
      }
      static single(e) {
        return new t(new Yt(e));
      }
      isEmpty() {
        return this.head === void 0;
      }
      append(e) {
        return new t(new Yt(e, this.head));
      }
      getAllComputedFields(e) {
        return this.head?.getAllComputedFields(e);
      }
      getAllClientExtensions() {
        return this.head?.getAllClientExtensions();
      }
      getAllModelExtensions(e) {
        return this.head?.getAllModelExtensions(e);
      }
      getAllQueryCallbacks(e, r) {
        return this.head?.getAllQueryCallbacks(e, r) ?? [];
      }
      getAllBatchQueryCallbacks() {
        return this.head?.getAllBatchQueryCallbacks() ?? [];
      }
    }, "t");
    u();
    c();
    m();
    p();
    d();
    l();
    var Xt = /* @__PURE__ */ __name(class {
      constructor(e) {
        this.name = e;
      }
    }, "Xt");
    function Ci(t) {
      return t instanceof Xt;
    }
    __name(Ci, "Ci");
    function Ri(t) {
      return new Xt(t);
    }
    __name(Ri, "Ri");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Ai = Symbol();
    var xt = /* @__PURE__ */ __name(class {
      constructor(e) {
        if (e !== Ai)
          throw new Error("Skip instance can not be constructed directly");
      }
      ifUndefined(e) {
        return e === void 0 ? Zt : e;
      }
    }, "xt");
    var Zt = new xt(Ai);
    function ge(t) {
      return t instanceof xt;
    }
    __name(ge, "ge");
    var Sa = { findUnique: "findUnique", findUniqueOrThrow: "findUniqueOrThrow", findFirst: "findFirst", findFirstOrThrow: "findFirstOrThrow", findMany: "findMany", count: "aggregate", create: "createOne", createMany: "createMany", createManyAndReturn: "createManyAndReturn", update: "updateOne", updateMany: "updateMany", updateManyAndReturn: "updateManyAndReturn", upsert: "upsertOne", delete: "deleteOne", deleteMany: "deleteMany", executeRaw: "executeRaw", queryRaw: "queryRaw", aggregate: "aggregate", groupBy: "groupBy", runCommandRaw: "runCommandRaw", findRaw: "findRaw", aggregateRaw: "aggregateRaw" };
    var Si = "explicitly `undefined` values are not allowed";
    function er({ modelName: t, action: e, args: r, runtimeDataModel: n, extensions: i = ze.empty(), callsite: o, clientMethod: s, errorFormat: a, clientVersion: f, previewFeatures: h, globalOmit: T }) {
      let C = new $r({ runtimeDataModel: n, modelName: t, action: e, rootArgs: r, callsite: o, extensions: i, selectionPath: [], argumentPath: [], originalMethod: s, errorFormat: a, clientVersion: f, previewFeatures: h, globalOmit: T });
      return { modelName: t, action: Sa[e], query: Et(r, C) };
    }
    __name(er, "er");
    function Et({ select: t, include: e, ...r } = {}, n) {
      let i = r.omit;
      return delete r.omit, { arguments: Oi(r, n), selection: ka(t, e, i, n) };
    }
    __name(Et, "Et");
    function ka(t, e, r, n) {
      return t ? (e ? n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "include", secondField: "select", selectionPath: n.getSelectionPath() }) : r && n.throwValidationError({ kind: "MutuallyExclusiveFields", firstField: "omit", secondField: "select", selectionPath: n.getSelectionPath() }), Da(t, n)) : Oa(n, e, r);
    }
    __name(ka, "ka");
    function Oa(t, e, r) {
      let n = {};
      return t.modelOrType && !t.isRawAction() && (n.$composites = true, n.$scalars = true), e && Ma(n, e, t), Ia(n, r, t), n;
    }
    __name(Oa, "Oa");
    function Ma(t, e, r) {
      for (let [n, i] of Object.entries(e)) {
        if (ge(i))
          continue;
        let o = r.nestSelection(n);
        if (Vr(i, o), i === false || i === void 0) {
          t[n] = false;
          continue;
        }
        let s = r.findField(n);
        if (s && s.kind !== "object" && r.throwValidationError({ kind: "IncludeOnScalar", selectionPath: r.getSelectionPath().concat(n), outputType: r.getOutputTypeDescription() }), s) {
          t[n] = Et(i === true ? {} : i, o);
          continue;
        }
        if (i === true) {
          t[n] = true;
          continue;
        }
        t[n] = Et(i, o);
      }
    }
    __name(Ma, "Ma");
    function Ia(t, e, r) {
      let n = r.getComputedFields(), i = { ...r.getGlobalOmit(), ...e }, o = Ti(i, n);
      for (let [s, a] of Object.entries(o)) {
        if (ge(a))
          continue;
        Vr(a, r.nestSelection(s));
        let f = r.findField(s);
        n?.[s] && !f || (t[s] = !a);
      }
    }
    __name(Ia, "Ia");
    function Da(t, e) {
      let r = {}, n = e.getComputedFields(), i = vi(t, n);
      for (let [o, s] of Object.entries(i)) {
        if (ge(s))
          continue;
        let a = e.nestSelection(o);
        Vr(s, a);
        let f = e.findField(o);
        if (!(n?.[o] && !f)) {
          if (s === false || s === void 0 || ge(s)) {
            r[o] = false;
            continue;
          }
          if (s === true) {
            f?.kind === "object" ? r[o] = Et({}, a) : r[o] = true;
            continue;
          }
          r[o] = Et(s, a);
        }
      }
      return r;
    }
    __name(Da, "Da");
    function ki(t, e) {
      if (t === null)
        return null;
      if (typeof t == "string" || typeof t == "number" || typeof t == "boolean")
        return t;
      if (typeof t == "bigint")
        return { $type: "BigInt", value: String(t) };
      if (Ve(t)) {
        if (Ut(t))
          return { $type: "DateTime", value: t.toISOString() };
        e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: ["Date"] }, underlyingError: "Provided Date object is invalid" });
      }
      if (Ci(t))
        return { $type: "Param", value: t.name };
      if (Ke(t))
        return { $type: "FieldRef", value: { _ref: t.name, _container: t.modelName } };
      if (Array.isArray(t))
        return _a2(t, e);
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { $type: "Bytes", value: b.from(r, n, i).toString("base64") };
      }
      if (La(t))
        return t.values;
      if (je(t))
        return { $type: "Decimal", value: t.toFixed() };
      if (t instanceof xe) {
        if (t !== Wt.instances[t._getName()])
          throw new Error("Invalid ObjectEnumValue");
        return { $type: "Enum", value: t._getName() };
      }
      if (Fa(t))
        return t.toJSON();
      if (typeof t == "object")
        return Oi(t, e);
      e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: e.getSelectionPath(), argumentPath: e.getArgumentPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: `We could not serialize ${Object.prototype.toString.call(t)} value. Serialize the object to JSON or implement a ".toJSON()" method on it` });
    }
    __name(ki, "ki");
    function Oi(t, e) {
      if (t.$type)
        return { $type: "Raw", value: t };
      let r = {};
      for (let n in t) {
        let i = t[n], o = e.nestArgument(n);
        ge(i) || (i !== void 0 ? r[n] = ki(i, o) : e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidArgumentValue", argumentPath: o.getArgumentPath(), selectionPath: e.getSelectionPath(), argument: { name: e.getArgumentName(), typeNames: [] }, underlyingError: Si }));
      }
      return r;
    }
    __name(Oi, "Oi");
    function _a2(t, e) {
      let r = [];
      for (let n = 0; n < t.length; n++) {
        let i = e.nestArgument(String(n)), o = t[n];
        if (o === void 0 || ge(o)) {
          let s = o === void 0 ? "undefined" : "Prisma.skip";
          e.throwValidationError({ kind: "InvalidArgumentValue", selectionPath: i.getSelectionPath(), argumentPath: i.getArgumentPath(), argument: { name: `${e.getArgumentName()}[${n}]`, typeNames: [] }, underlyingError: `Can not use \`${s}\` value within array. Use \`null\` or filter out \`${s}\` values` });
        }
        r.push(ki(o, i));
      }
      return r;
    }
    __name(_a2, "_a");
    function La(t) {
      return typeof t == "object" && t !== null && t.__prismaRawParameters__ === true;
    }
    __name(La, "La");
    function Fa(t) {
      return typeof t == "object" && t !== null && typeof t.toJSON == "function";
    }
    __name(Fa, "Fa");
    function Vr(t, e) {
      t === void 0 && e.isPreviewFeatureOn("strictUndefinedChecks") && e.throwValidationError({ kind: "InvalidSelectionValue", selectionPath: e.getSelectionPath(), underlyingError: Si });
    }
    __name(Vr, "Vr");
    var $r = /* @__PURE__ */ __name(class t {
      constructor(e) {
        this.params = e;
        this.params.modelName && (this.modelOrType = this.params.runtimeDataModel.models[this.params.modelName] ?? this.params.runtimeDataModel.types[this.params.modelName]);
      }
      modelOrType;
      throwValidationError(e) {
        zt({ errors: [e], originalMethod: this.params.originalMethod, args: this.params.rootArgs ?? {}, callsite: this.params.callsite, errorFormat: this.params.errorFormat, clientVersion: this.params.clientVersion, globalOmit: this.params.globalOmit });
      }
      getSelectionPath() {
        return this.params.selectionPath;
      }
      getArgumentPath() {
        return this.params.argumentPath;
      }
      getArgumentName() {
        return this.params.argumentPath[this.params.argumentPath.length - 1];
      }
      getOutputTypeDescription() {
        if (!(!this.params.modelName || !this.modelOrType))
          return { name: this.params.modelName, fields: this.modelOrType.fields.map((e) => ({ name: e.name, typeName: "boolean", isRelation: e.kind === "object" })) };
      }
      isRawAction() {
        return ["executeRaw", "queryRaw", "runCommandRaw", "findRaw", "aggregateRaw"].includes(this.params.action);
      }
      isPreviewFeatureOn(e) {
        return this.params.previewFeatures.includes(e);
      }
      getComputedFields() {
        if (this.params.modelName)
          return this.params.extensions.getAllComputedFields(this.params.modelName);
      }
      findField(e) {
        return this.modelOrType?.fields.find((r) => r.name === e);
      }
      nestSelection(e) {
        let r = this.findField(e), n = r?.kind === "object" ? r.type : void 0;
        return new t({ ...this.params, modelName: n, selectionPath: this.params.selectionPath.concat(e) });
      }
      getGlobalOmit() {
        return this.params.modelName && this.shouldApplyGlobalOmit() ? this.params.globalOmit?.[ve(this.params.modelName)] ?? {} : {};
      }
      shouldApplyGlobalOmit() {
        switch (this.params.action) {
          case "findFirst":
          case "findFirstOrThrow":
          case "findUniqueOrThrow":
          case "findMany":
          case "upsert":
          case "findUnique":
          case "createManyAndReturn":
          case "create":
          case "update":
          case "updateManyAndReturn":
          case "delete":
            return true;
          case "executeRaw":
          case "aggregateRaw":
          case "runCommandRaw":
          case "findRaw":
          case "createMany":
          case "deleteMany":
          case "groupBy":
          case "updateMany":
          case "count":
          case "aggregate":
          case "queryRaw":
            return false;
          default:
            be(this.params.action, "Unknown action");
        }
      }
      nestArgument(e) {
        return new t({ ...this.params, argumentPath: this.params.argumentPath.concat(e) });
      }
    }, "t");
    u();
    c();
    m();
    p();
    d();
    l();
    function Mi(t) {
      if (!t._hasPreviewFlag("metrics"))
        throw new W("`metrics` preview feature must be enabled in order to access metrics API", { clientVersion: t._clientVersion });
    }
    __name(Mi, "Mi");
    var Ye = /* @__PURE__ */ __name(class {
      _client;
      constructor(e) {
        this._client = e;
      }
      prometheus(e) {
        return Mi(this._client), this._client._engine.metrics({ format: "prometheus", ...e });
      }
      json(e) {
        return Mi(this._client), this._client._engine.metrics({ format: "json", ...e });
      }
    }, "Ye");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ii(t, e) {
      let r = ut(() => Na(e));
      Object.defineProperty(t, "dmmf", { get: () => r.get() });
    }
    __name(Ii, "Ii");
    function Na(t) {
      throw new Error("Prisma.dmmf is not available when running in edge runtimes.");
    }
    __name(Na, "Na");
    u();
    c();
    m();
    p();
    d();
    l();
    var Qr = /* @__PURE__ */ new WeakMap();
    var tr = "$$PrismaTypedSql";
    var Pt = /* @__PURE__ */ __name(class {
      constructor(e, r) {
        Qr.set(this, { sql: e, values: r }), Object.defineProperty(this, tr, { value: tr });
      }
      get sql() {
        return Qr.get(this).sql;
      }
      get values() {
        return Qr.get(this).values;
      }
    }, "Pt");
    function Di(t) {
      return (...e) => new Pt(t, e);
    }
    __name(Di, "Di");
    function rr(t) {
      return t != null && t[tr] === tr;
    }
    __name(rr, "rr");
    u();
    c();
    m();
    p();
    d();
    l();
    var Jo = nt(_i());
    u();
    c();
    m();
    p();
    d();
    l();
    Li();
    Un();
    jn();
    u();
    c();
    m();
    p();
    d();
    l();
    var Z = /* @__PURE__ */ __name(class t {
      constructor(e, r) {
        if (e.length - 1 !== r.length)
          throw e.length === 0 ? new TypeError("Expected at least 1 string") : new TypeError(`Expected ${e.length} strings to have ${e.length - 1} values`);
        let n = r.reduce((s, a) => s + (a instanceof t ? a.values.length : 1), 0);
        this.values = new Array(n), this.strings = new Array(n + 1), this.strings[0] = e[0];
        let i = 0, o = 0;
        for (; i < r.length; ) {
          let s = r[i++], a = e[i];
          if (s instanceof t) {
            this.strings[o] += s.strings[0];
            let f = 0;
            for (; f < s.values.length; )
              this.values[o++] = s.values[f++], this.strings[o] = s.strings[f];
            this.strings[o] += a;
          } else
            this.values[o++] = s, this.strings[o] = a;
        }
      }
      get sql() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; )
          n += `?${this.strings[r++]}`;
        return n;
      }
      get statement() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; )
          n += `:${r}${this.strings[r++]}`;
        return n;
      }
      get text() {
        let e = this.strings.length, r = 1, n = this.strings[0];
        for (; r < e; )
          n += `$${r}${this.strings[r++]}`;
        return n;
      }
      inspect() {
        return { sql: this.sql, statement: this.statement, text: this.text, values: this.values };
      }
    }, "t");
    function Fi(t, e = ",", r = "", n = "") {
      if (t.length === 0)
        throw new TypeError("Expected `join([])` to be called with an array of multiple elements, but got an empty array");
      return new Z([r, ...Array(t.length - 1).fill(e), n], t);
    }
    __name(Fi, "Fi");
    function Jr(t) {
      return new Z([t], []);
    }
    __name(Jr, "Jr");
    var Ni = Jr("");
    function Gr(t, ...e) {
      return new Z(t, e);
    }
    __name(Gr, "Gr");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function vt(t) {
      return { getKeys() {
        return Object.keys(t);
      }, getPropertyValue(e) {
        return t[e];
      } };
    }
    __name(vt, "vt");
    u();
    c();
    m();
    p();
    d();
    l();
    function K(t, e) {
      return { getKeys() {
        return [t];
      }, getPropertyValue() {
        return e();
      } };
    }
    __name(K, "K");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ie(t) {
      let e = new pe();
      return { getKeys() {
        return t.getKeys();
      }, getPropertyValue(r) {
        return e.getOrCreate(r, () => t.getPropertyValue(r));
      }, getPropertyDescriptor(r) {
        return t.getPropertyDescriptor?.(r);
      } };
    }
    __name(Ie, "Ie");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var ir = { enumerable: true, configurable: true, writable: true };
    function or(t) {
      let e = new Set(t);
      return { getPrototypeOf: () => Object.prototype, getOwnPropertyDescriptor: () => ir, has: (r, n) => e.has(n), set: (r, n, i) => e.add(n) && Reflect.set(r, n, i), ownKeys: () => [...e] };
    }
    __name(or, "or");
    var qi = Symbol.for("nodejs.util.inspect.custom");
    function le(t, e) {
      let r = Ua(e), n = /* @__PURE__ */ new Set(), i = new Proxy(t, { get(o, s) {
        if (n.has(s))
          return o[s];
        let a = r.get(s);
        return a ? a.getPropertyValue(s) : o[s];
      }, has(o, s) {
        if (n.has(s))
          return true;
        let a = r.get(s);
        return a ? a.has?.(s) ?? true : Reflect.has(o, s);
      }, ownKeys(o) {
        let s = Ui(Reflect.ownKeys(o), r), a = Ui(Array.from(r.keys()), r);
        return [.../* @__PURE__ */ new Set([...s, ...a, ...n])];
      }, set(o, s, a) {
        return r.get(s)?.getPropertyDescriptor?.(s)?.writable === false ? false : (n.add(s), Reflect.set(o, s, a));
      }, getOwnPropertyDescriptor(o, s) {
        let a = Reflect.getOwnPropertyDescriptor(o, s);
        if (a && !a.configurable)
          return a;
        let f = r.get(s);
        return f ? f.getPropertyDescriptor ? { ...ir, ...f?.getPropertyDescriptor(s) } : ir : a;
      }, defineProperty(o, s, a) {
        return n.add(s), Reflect.defineProperty(o, s, a);
      }, getPrototypeOf: () => Object.prototype });
      return i[qi] = function() {
        let o = { ...this };
        return delete o[qi], o;
      }, i;
    }
    __name(le, "le");
    function Ua(t) {
      let e = /* @__PURE__ */ new Map();
      for (let r of t) {
        let n = r.getKeys();
        for (let i of n)
          e.set(i, r);
      }
      return e;
    }
    __name(Ua, "Ua");
    function Ui(t, e) {
      return t.filter((r) => e.get(r)?.has?.(r) ?? true);
    }
    __name(Ui, "Ui");
    u();
    c();
    m();
    p();
    d();
    l();
    function Xe(t) {
      return { getKeys() {
        return t;
      }, has() {
        return false;
      }, getPropertyValue() {
      } };
    }
    __name(Xe, "Xe");
    u();
    c();
    m();
    p();
    d();
    l();
    function sr(t, e) {
      return { batch: t, transaction: e?.kind === "batch" ? { isolationLevel: e.options.isolationLevel } : void 0 };
    }
    __name(sr, "sr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Bi(t) {
      if (t === void 0)
        return "";
      let e = He(t);
      return new Qe(0, { colors: Qt }).write(e).toString();
    }
    __name(Bi, "Bi");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ba = "P2037";
    function ar({ error: t, user_facing_error: e }, r, n) {
      return e.error_code ? new X($a(e, n), { code: e.error_code, clientVersion: r, meta: e.meta, batchRequestIdx: e.batch_request_idx }) : new j(t, { clientVersion: r, batchRequestIdx: e.batch_request_idx });
    }
    __name(ar, "ar");
    function $a(t, e) {
      let r = t.message;
      return (e === "postgresql" || e === "postgres" || e === "mysql") && t.error_code === Ba && (r += `
Prisma Accelerate has built-in connection pooling to prevent such errors: https://pris.ly/client/error-accelerate`), r;
    }
    __name($a, "$a");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Wr = /* @__PURE__ */ __name(class {
      getLocation() {
        return null;
      }
    }, "Wr");
    function Ce(t) {
      return typeof $EnabledCallSite == "function" && t !== "minimal" ? new $EnabledCallSite() : new Wr();
    }
    __name(Ce, "Ce");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var $i = { _avg: true, _count: true, _sum: true, _min: true, _max: true };
    function Ze(t = {}) {
      let e = ja(t);
      return Object.entries(e).reduce((n, [i, o]) => ($i[i] !== void 0 ? n.select[i] = { select: o } : n[i] = o, n), { select: {} });
    }
    __name(Ze, "Ze");
    function ja(t = {}) {
      return typeof t._count == "boolean" ? { ...t, _count: { _all: t._count } } : t;
    }
    __name(ja, "ja");
    function lr(t = {}) {
      return (e) => (typeof t._count == "boolean" && (e._count = e._count._all), e);
    }
    __name(lr, "lr");
    function Vi(t, e) {
      let r = lr(t);
      return e({ action: "aggregate", unpacker: r, argsMapper: Ze })(t);
    }
    __name(Vi, "Vi");
    u();
    c();
    m();
    p();
    d();
    l();
    function Qa(t = {}) {
      let { select: e, ...r } = t;
      return typeof e == "object" ? Ze({ ...r, _count: e }) : Ze({ ...r, _count: { _all: true } });
    }
    __name(Qa, "Qa");
    function Ja(t = {}) {
      return typeof t.select == "object" ? (e) => lr(t)(e)._count : (e) => lr(t)(e)._count._all;
    }
    __name(Ja, "Ja");
    function ji(t, e) {
      return e({ action: "count", unpacker: Ja(t), argsMapper: Qa })(t);
    }
    __name(ji, "ji");
    u();
    c();
    m();
    p();
    d();
    l();
    function Ga(t = {}) {
      let e = Ze(t);
      if (Array.isArray(e.by))
        for (let r of e.by)
          typeof r == "string" && (e.select[r] = true);
      else
        typeof e.by == "string" && (e.select[e.by] = true);
      return e;
    }
    __name(Ga, "Ga");
    function Wa(t = {}) {
      return (e) => (typeof t?._count == "boolean" && e.forEach((r) => {
        r._count = r._count._all;
      }), e);
    }
    __name(Wa, "Wa");
    function Qi(t, e) {
      return e({ action: "groupBy", unpacker: Wa(t), argsMapper: Ga })(t);
    }
    __name(Qi, "Qi");
    function Ji(t, e, r) {
      if (e === "aggregate")
        return (n) => Vi(n, r);
      if (e === "count")
        return (n) => ji(n, r);
      if (e === "groupBy")
        return (n) => Qi(n, r);
    }
    __name(Ji, "Ji");
    u();
    c();
    m();
    p();
    d();
    l();
    function Gi(t, e) {
      let r = e.fields.filter((i) => !i.relationName), n = ri(r, "name");
      return new Proxy({}, { get(i, o) {
        if (o in i || typeof o == "symbol")
          return i[o];
        let s = n[o];
        if (s)
          return new gt(t, o, s.type, s.isList, s.kind === "enum");
      }, ...or(Object.keys(n)) });
    }
    __name(Gi, "Gi");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var Wi = /* @__PURE__ */ __name((t) => Array.isArray(t) ? t : t.split("."), "Wi");
    var Kr = /* @__PURE__ */ __name((t, e) => Wi(e).reduce((r, n) => r && r[n], t), "Kr");
    var Ki = /* @__PURE__ */ __name((t, e, r) => Wi(e).reduceRight((n, i, o, s) => Object.assign({}, Kr(t, s.slice(0, o)), { [i]: n }), r), "Ki");
    function Ka(t, e) {
      return t === void 0 || e === void 0 ? [] : [...e, "select", t];
    }
    __name(Ka, "Ka");
    function Ha(t, e, r) {
      return e === void 0 ? t ?? {} : Ki(e, r, t || true);
    }
    __name(Ha, "Ha");
    function Hr(t, e, r, n, i, o) {
      let a = t._runtimeDataModel.models[e].fields.reduce((f, h) => ({ ...f, [h.name]: h }), {});
      return (f) => {
        let h = Ce(t._errorFormat), T = Ka(n, i), C = Ha(f, o, T), k = r({ dataPath: T, callsite: h })(C), A = za(t, e);
        return new Proxy(k, { get(O, S) {
          if (!A.includes(S))
            return O[S];
          let oe = [a[S].type, r, S], H = [T, C];
          return Hr(t, ...oe, ...H);
        }, ...or([...A, ...Object.getOwnPropertyNames(k)]) });
      };
    }
    __name(Hr, "Hr");
    function za(t, e) {
      return t._runtimeDataModel.models[e].fields.filter((r) => r.kind === "object").map((r) => r.name);
    }
    __name(za, "za");
    var Ya = ["findUnique", "findUniqueOrThrow", "findFirst", "findFirstOrThrow", "create", "update", "upsert", "delete"];
    var Xa = ["aggregate", "count", "groupBy"];
    function zr(t, e) {
      let r = t._extensions.getAllModelExtensions(e) ?? {}, n = [Za(t, e), tl(t, e), vt(r), K("name", () => e), K("$name", () => e), K("$parent", () => t._appliedParent)];
      return le({}, n);
    }
    __name(zr, "zr");
    function Za(t, e) {
      let r = fe(e), n = Object.keys(ct).concat("count");
      return { getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = i, s = /* @__PURE__ */ __name((a) => (f) => {
          let h = Ce(t._errorFormat);
          return t._createPrismaPromise((T) => {
            let C = { args: f, dataPath: [], action: o, model: e, clientMethod: `${r}.${i}`, jsModelName: r, transaction: T, callsite: h };
            return t._request({ ...C, ...a });
          }, { action: o, args: f, model: e });
        }, "s");
        return Ya.includes(o) ? Hr(t, e, s) : el(i) ? Ji(t, i, s) : s({});
      } };
    }
    __name(Za, "Za");
    function el(t) {
      return Xa.includes(t);
    }
    __name(el, "el");
    function tl(t, e) {
      return Ie(K("fields", () => {
        let r = t._runtimeDataModel.models[e];
        return Gi(e, r);
      }));
    }
    __name(tl, "tl");
    u();
    c();
    m();
    p();
    d();
    l();
    function Hi(t) {
      return t.replace(/^./, (e) => e.toUpperCase());
    }
    __name(Hi, "Hi");
    var Yr = Symbol();
    function Tt(t) {
      let e = [rl(t), nl(t), K(Yr, () => t), K("$parent", () => t._appliedParent)], r = t._extensions.getAllClientExtensions();
      return r && e.push(vt(r)), le(t, e);
    }
    __name(Tt, "Tt");
    function rl(t) {
      let e = Object.getPrototypeOf(t._originalClient), r = [...new Set(Object.getOwnPropertyNames(e))];
      return { getKeys() {
        return r;
      }, getPropertyValue(n) {
        return t[n];
      } };
    }
    __name(rl, "rl");
    function nl(t) {
      let e = Object.keys(t._runtimeDataModel.models), r = e.map(fe), n = [...new Set(e.concat(r))];
      return Ie({ getKeys() {
        return n;
      }, getPropertyValue(i) {
        let o = Hi(i);
        if (t._runtimeDataModel.models[o] !== void 0)
          return zr(t, o);
        if (t._runtimeDataModel.models[i] !== void 0)
          return zr(t, i);
      }, getPropertyDescriptor(i) {
        if (!r.includes(i))
          return { enumerable: false };
      } });
    }
    __name(nl, "nl");
    function zi(t) {
      return t[Yr] ? t[Yr] : t;
    }
    __name(zi, "zi");
    function Yi(t) {
      if (typeof t == "function")
        return t(this);
      if (t.client?.__AccelerateEngine) {
        let r = t.client.__AccelerateEngine;
        this._originalClient._engine = new r(this._originalClient._accelerateEngineConfig);
      }
      let e = Object.create(this._originalClient, { _extensions: { value: this._extensions.append(t) }, _appliedParent: { value: this, configurable: true }, $use: { value: void 0 }, $on: { value: void 0 } });
      return Tt(e);
    }
    __name(Yi, "Yi");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Xi({ result: t, modelName: e, select: r, omit: n, extensions: i }) {
      let o = i.getAllComputedFields(e);
      if (!o)
        return t;
      let s = [], a = [];
      for (let f of Object.values(o)) {
        if (n) {
          if (n[f.name])
            continue;
          let h = f.needs.filter((T) => n[T]);
          h.length > 0 && a.push(Xe(h));
        } else if (r) {
          if (!r[f.name])
            continue;
          let h = f.needs.filter((T) => !r[T]);
          h.length > 0 && a.push(Xe(h));
        }
        il(t, f.needs) && s.push(ol(f, le(t, s)));
      }
      return s.length > 0 || a.length > 0 ? le(t, [...s, ...a]) : t;
    }
    __name(Xi, "Xi");
    function il(t, e) {
      return e.every((r) => Dr(t, r));
    }
    __name(il, "il");
    function ol(t, e) {
      return Ie(K(t.name, () => t.compute(e)));
    }
    __name(ol, "ol");
    u();
    c();
    m();
    p();
    d();
    l();
    function ur({ visitor: t, result: e, args: r, runtimeDataModel: n, modelName: i }) {
      if (Array.isArray(e)) {
        for (let s = 0; s < e.length; s++)
          e[s] = ur({ result: e[s], args: r, modelName: i, runtimeDataModel: n, visitor: t });
        return e;
      }
      let o = t(e, i, r) ?? e;
      return r.include && Zi({ includeOrSelect: r.include, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), r.select && Zi({ includeOrSelect: r.select, result: o, parentModelName: i, runtimeDataModel: n, visitor: t }), o;
    }
    __name(ur, "ur");
    function Zi({ includeOrSelect: t, result: e, parentModelName: r, runtimeDataModel: n, visitor: i }) {
      for (let [o, s] of Object.entries(t)) {
        if (!s || e[o] == null || ge(s))
          continue;
        let f = n.models[r].fields.find((T) => T.name === o);
        if (!f || f.kind !== "object" || !f.relationName)
          continue;
        let h = typeof s == "object" ? s : {};
        e[o] = ur({ visitor: i, result: e[o], args: h, modelName: f.type, runtimeDataModel: n });
      }
    }
    __name(Zi, "Zi");
    function eo({ result: t, modelName: e, args: r, extensions: n, runtimeDataModel: i, globalOmit: o }) {
      return n.isEmpty() || t == null || typeof t != "object" || !i.models[e] ? t : ur({ result: t, args: r ?? {}, modelName: e, runtimeDataModel: i, visitor: (a, f, h) => {
        let T = fe(f);
        return Xi({ result: a, modelName: T, select: h.select, omit: h.select ? void 0 : { ...o?.[T], ...h.omit }, extensions: n });
      } });
    }
    __name(eo, "eo");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var sl = ["$connect", "$disconnect", "$on", "$transaction", "$use", "$extends"];
    var to = sl;
    function ro(t) {
      if (t instanceof Z)
        return al(t);
      if (rr(t))
        return ll(t);
      if (Array.isArray(t)) {
        let r = [t[0]];
        for (let n = 1; n < t.length; n++)
          r[n] = Ct(t[n]);
        return r;
      }
      let e = {};
      for (let r in t)
        e[r] = Ct(t[r]);
      return e;
    }
    __name(ro, "ro");
    function al(t) {
      return new Z(t.strings, t.values);
    }
    __name(al, "al");
    function ll(t) {
      return new Pt(t.sql, t.values);
    }
    __name(ll, "ll");
    function Ct(t) {
      if (typeof t != "object" || t == null || t instanceof xe || Ke(t))
        return t;
      if (je(t))
        return new ae(t.toFixed());
      if (Ve(t))
        return /* @__PURE__ */ new Date(+t);
      if (ArrayBuffer.isView(t))
        return t.slice(0);
      if (Array.isArray(t)) {
        let e = t.length, r;
        for (r = Array(e); e--; )
          r[e] = Ct(t[e]);
        return r;
      }
      if (typeof t == "object") {
        let e = {};
        for (let r in t)
          r === "__proto__" ? Object.defineProperty(e, r, { value: Ct(t[r]), configurable: true, enumerable: true, writable: true }) : e[r] = Ct(t[r]);
        return e;
      }
      be(t, "Unknown value");
    }
    __name(Ct, "Ct");
    function io(t, e, r, n = 0) {
      return t._createPrismaPromise((i) => {
        let o = e.customDataProxyFetch;
        return "transaction" in e && i !== void 0 && (e.transaction?.kind === "batch" && e.transaction.lock.then(), e.transaction = i), n === r.length ? t._executeRequest(e) : r[n]({ model: e.model, operation: e.model ? e.action : e.clientMethod, args: ro(e.args ?? {}), __internalParams: e, query: (s, a = e) => {
          let f = a.customDataProxyFetch;
          return a.customDataProxyFetch = lo(o, f), a.args = s, io(t, a, r, n + 1);
        } });
      });
    }
    __name(io, "io");
    function oo(t, e) {
      let { jsModelName: r, action: n, clientMethod: i } = e, o = r ? n : i;
      if (t._extensions.isEmpty())
        return t._executeRequest(e);
      let s = t._extensions.getAllQueryCallbacks(r ?? "$none", o);
      return io(t, e, s);
    }
    __name(oo, "oo");
    function so(t) {
      return (e) => {
        let r = { requests: e }, n = e[0].extensions.getAllBatchQueryCallbacks();
        return n.length ? ao(r, n, 0, t) : t(r);
      };
    }
    __name(so, "so");
    function ao(t, e, r, n) {
      if (r === e.length)
        return n(t);
      let i = t.customDataProxyFetch, o = t.requests[0].transaction;
      return e[r]({ args: { queries: t.requests.map((s) => ({ model: s.modelName, operation: s.action, args: s.args })), transaction: o ? { isolationLevel: o.kind === "batch" ? o.isolationLevel : void 0 } : void 0 }, __internalParams: t, query(s, a = t) {
        let f = a.customDataProxyFetch;
        return a.customDataProxyFetch = lo(i, f), ao(a, e, r + 1, n);
      } });
    }
    __name(ao, "ao");
    var no = /* @__PURE__ */ __name((t) => t, "no");
    function lo(t = no, e = no) {
      return (r) => t(e(r));
    }
    __name(lo, "lo");
    u();
    c();
    m();
    p();
    d();
    l();
    var uo = J("prisma:client");
    var co = { Vercel: "vercel", "Netlify CI": "netlify" };
    function mo({ postinstall: t, ciName: e, clientVersion: r }) {
      if (uo("checkPlatformCaching:postinstall", t), uo("checkPlatformCaching:ciName", e), t === true && e && e in co) {
        let n = `Prisma has detected that this project was built on ${e}, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the \`prisma generate\` command during the build process.

Learn how: https://pris.ly/d/${co[e]}-build`;
        throw console.error(n), new I(n, r);
      }
    }
    __name(mo, "mo");
    u();
    c();
    m();
    p();
    d();
    l();
    function po(t, e) {
      return t ? t.datasources ? t.datasources : t.datasourceUrl ? { [e[0]]: { url: t.datasourceUrl } } : {} : {};
    }
    __name(po, "po");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var ul = /* @__PURE__ */ __name(() => globalThis.process?.release?.name === "node", "ul");
    var cl = /* @__PURE__ */ __name(() => !!globalThis.Bun || !!globalThis.process?.versions?.bun, "cl");
    var ml = /* @__PURE__ */ __name(() => !!globalThis.Deno, "ml");
    var pl = /* @__PURE__ */ __name(() => typeof globalThis.Netlify == "object", "pl");
    var dl = /* @__PURE__ */ __name(() => typeof globalThis.EdgeRuntime == "object", "dl");
    var fl = /* @__PURE__ */ __name(() => globalThis.navigator?.userAgent === "Cloudflare-Workers", "fl");
    function gl() {
      return [[pl, "netlify"], [dl, "edge-light"], [fl, "workerd"], [ml, "deno"], [cl, "bun"], [ul, "node"]].flatMap((r) => r[0]() ? [r[1]] : []).at(0) ?? "";
    }
    __name(gl, "gl");
    var yl = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
    function Re() {
      let t = gl();
      return { id: t, prettyName: yl[t] || t, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(t) };
    }
    __name(Re, "Re");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function Xr(t) {
      return t.name === "DriverAdapterError" && typeof t.cause == "object";
    }
    __name(Xr, "Xr");
    u();
    c();
    m();
    p();
    d();
    l();
    function cr(t) {
      return { ok: true, value: t, map(e) {
        return cr(e(t));
      }, flatMap(e) {
        return e(t);
      } };
    }
    __name(cr, "cr");
    function De(t) {
      return { ok: false, error: t, map() {
        return De(t);
      }, flatMap() {
        return De(t);
      } };
    }
    __name(De, "De");
    var fo = J("driver-adapter-utils");
    var Zr = /* @__PURE__ */ __name(class {
      registeredErrors = [];
      consumeError(e) {
        return this.registeredErrors[e];
      }
      registerNewError(e) {
        let r = 0;
        for (; this.registeredErrors[r] !== void 0; )
          r++;
        return this.registeredErrors[r] = { error: e }, r;
      }
    }, "Zr");
    var en = /* @__PURE__ */ __name((t, e = new Zr()) => {
      let r = { adapterName: t.adapterName, errorRegistry: e, queryRaw: Ee(e, t.queryRaw.bind(t)), executeRaw: Ee(e, t.executeRaw.bind(t)), executeScript: Ee(e, t.executeScript.bind(t)), dispose: Ee(e, t.dispose.bind(t)), provider: t.provider, startTransaction: async (...n) => (await Ee(e, t.startTransaction.bind(t))(...n)).map((o) => hl(e, o)) };
      return t.getConnectionInfo && (r.getConnectionInfo = bl(e, t.getConnectionInfo.bind(t))), r;
    }, "en");
    var hl = /* @__PURE__ */ __name((t, e) => ({ adapterName: e.adapterName, provider: e.provider, options: e.options, queryRaw: Ee(t, e.queryRaw.bind(e)), executeRaw: Ee(t, e.executeRaw.bind(e)), commit: Ee(t, e.commit.bind(e)), rollback: Ee(t, e.rollback.bind(e)) }), "hl");
    function Ee(t, e) {
      return async (...r) => {
        try {
          return cr(await e(...r));
        } catch (n) {
          if (fo("[error@wrapAsync]", n), Xr(n))
            return De(n.cause);
          let i = t.registerNewError(n);
          return De({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(Ee, "Ee");
    function bl(t, e) {
      return (...r) => {
        try {
          return cr(e(...r));
        } catch (n) {
          if (fo("[error@wrapSync]", n), Xr(n))
            return De(n.cause);
          let i = t.registerNewError(n);
          return De({ kind: "GenericJs", id: i });
        }
      };
    }
    __name(bl, "bl");
    var go = "6.8.2";
    u();
    c();
    m();
    p();
    d();
    l();
    function mr({ inlineDatasources: t, overrideDatasources: e, env: r, clientVersion: n }) {
      let i, o = Object.keys(t)[0], s = t[o]?.url, a = e[o]?.url;
      if (o === void 0 ? i = void 0 : a ? i = a : s?.value ? i = s.value : s?.fromEnvVar && (i = r[s.fromEnvVar]), s?.fromEnvVar !== void 0 && i === void 0)
        throw Re().id === "workerd" ? new I(`error: Environment variable not found: ${s.fromEnvVar}.

In Cloudflare module Workers, environment variables are available only in the Worker's \`env\` parameter of \`fetch\`.
To solve this, provide the connection string directly: https://pris.ly/d/cloudflare-datasource-url`, n) : new I(`error: Environment variable not found: ${s.fromEnvVar}.`, n);
      if (i === void 0)
        throw new I("error: Missing URL environment variable, value, or override.", n);
      return i;
    }
    __name(mr, "mr");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    function yo(t) {
      if (t?.kind === "itx")
        return t.options.id;
    }
    __name(yo, "yo");
    u();
    c();
    m();
    p();
    d();
    l();
    var tn;
    var ho = { async loadLibrary(t) {
      let { clientVersion: e, adapter: r, engineWasm: n } = t;
      if (r === void 0)
        throw new I(`The \`adapter\` option for \`PrismaClient\` is required in this context (${Re().prettyName})`, e);
      if (n === void 0)
        throw new I("WASM engine was unexpectedly `undefined`", e);
      tn === void 0 && (tn = (async () => {
        let o = await n.getRuntime(), s = await n.getQueryEngineWasmModule();
        if (s == null)
          throw new I("The loaded wasm module was unexpectedly `undefined` or `null` once loaded", e);
        let a = { "./query_engine_bg.js": o }, f = new WebAssembly.Instance(s, a), h = f.exports.__wbindgen_start;
        return o.__wbg_set_wasm(f.exports), h(), o.QueryEngine;
      })());
      let i = await tn;
      return { debugPanic() {
        return Promise.reject("{}");
      }, dmmf() {
        return Promise.resolve("{}");
      }, version() {
        return { commit: "unknown", version: "unknown" };
      }, QueryEngine: i };
    } };
    var xl = "P2036";
    var ye = J("prisma:client:libraryEngine");
    function El(t) {
      return t.item_type === "query" && "query" in t;
    }
    __name(El, "El");
    function Pl(t) {
      return "level" in t ? t.level === "error" && t.message === "PANIC" : false;
    }
    __name(Pl, "Pl");
    var OS = [...kr, "native"];
    var vl = 0xffffffffffffffffn;
    var rn = 1n;
    function Tl() {
      let t = rn++;
      return rn > vl && (rn = 1n), t;
    }
    __name(Tl, "Tl");
    var Rt = /* @__PURE__ */ __name(class {
      name = "LibraryEngine";
      engine;
      libraryInstantiationPromise;
      libraryStartingPromise;
      libraryStoppingPromise;
      libraryStarted;
      executingQueryPromise;
      config;
      QueryEngineConstructor;
      libraryLoader;
      library;
      logEmitter;
      libQueryEnginePath;
      binaryTarget;
      datasourceOverrides;
      datamodel;
      logQueries;
      logLevel;
      lastQuery;
      loggerRustPanic;
      tracingHelper;
      adapterPromise;
      versionInfo;
      constructor(e, r) {
        this.libraryLoader = r ?? ho, this.config = e, this.libraryStarted = false, this.logQueries = e.logQueries ?? false, this.logLevel = e.logLevel ?? "error", this.logEmitter = e.logEmitter, this.datamodel = e.inlineSchema, this.tracingHelper = e.tracingHelper, e.enableDebugLogs && (this.logLevel = "debug");
        let n = Object.keys(e.overrideDatasources)[0], i = e.overrideDatasources[n]?.url;
        n !== void 0 && i !== void 0 && (this.datasourceOverrides = { [n]: i }), this.libraryInstantiationPromise = this.instantiateLibrary();
      }
      wrapEngine(e) {
        return { applyPendingMigrations: e.applyPendingMigrations?.bind(e), commitTransaction: this.withRequestId(e.commitTransaction.bind(e)), connect: this.withRequestId(e.connect.bind(e)), disconnect: this.withRequestId(e.disconnect.bind(e)), metrics: e.metrics?.bind(e), query: this.withRequestId(e.query.bind(e)), rollbackTransaction: this.withRequestId(e.rollbackTransaction.bind(e)), sdlSchema: e.sdlSchema?.bind(e), startTransaction: this.withRequestId(e.startTransaction.bind(e)), trace: e.trace.bind(e) };
      }
      withRequestId(e) {
        return async (...r) => {
          let n = Tl().toString();
          try {
            return await e(...r, n);
          } finally {
            if (this.tracingHelper.isEnabled()) {
              let i = await this.engine?.trace(n);
              if (i) {
                let o = JSON.parse(i);
                this.tracingHelper.dispatchEngineSpans(o.spans);
              }
            }
          }
        };
      }
      async applyPendingMigrations() {
        throw new Error("Cannot call this method from this type of engine instance");
      }
      async transaction(e, r, n) {
        await this.start();
        let i = await this.adapterPromise, o = JSON.stringify(r), s;
        if (e === "start") {
          let f = JSON.stringify({ max_wait: n.maxWait, timeout: n.timeout, isolation_level: n.isolationLevel });
          s = await this.engine?.startTransaction(f, o);
        } else
          e === "commit" ? s = await this.engine?.commitTransaction(n.id, o) : e === "rollback" && (s = await this.engine?.rollbackTransaction(n.id, o));
        let a = this.parseEngineResponse(s);
        if (Cl(a)) {
          let f = this.getExternalAdapterError(a, i?.errorRegistry);
          throw f ? f.error : new X(a.message, { code: a.error_code, clientVersion: this.config.clientVersion, meta: a.meta });
        } else if (typeof a.message == "string")
          throw new j(a.message, { clientVersion: this.config.clientVersion });
        return a;
      }
      async instantiateLibrary() {
        if (ye("internalSetup"), this.libraryInstantiationPromise)
          return this.libraryInstantiationPromise;
        this.binaryTarget = await this.getCurrentBinaryTarget(), await this.tracingHelper.runInChildSpan("load_engine", () => this.loadEngine()), this.version();
      }
      async getCurrentBinaryTarget() {
      }
      parseEngineResponse(e) {
        if (!e)
          throw new j("Response from the Engine was empty", { clientVersion: this.config.clientVersion });
        try {
          return JSON.parse(e);
        } catch {
          throw new j("Unable to JSON.parse response from engine", { clientVersion: this.config.clientVersion });
        }
      }
      async loadEngine() {
        if (!this.engine) {
          this.QueryEngineConstructor || (this.library = await this.libraryLoader.loadLibrary(this.config), this.QueryEngineConstructor = this.library.QueryEngine);
          try {
            let e = new w(this);
            this.adapterPromise || (this.adapterPromise = this.config.adapter?.connect()?.then(en));
            let r = await this.adapterPromise;
            r && ye("Using driver adapter: %O", r), this.engine = this.wrapEngine(new this.QueryEngineConstructor({ datamodel: this.datamodel, env: g.env, logQueries: this.config.logQueries ?? false, ignoreEnvVarErrors: true, datasourceOverrides: this.datasourceOverrides ?? {}, logLevel: this.logLevel, configDir: this.config.cwd, engineProtocol: "json", enableTracing: this.tracingHelper.isEnabled() }, (n) => {
              e.deref()?.logger(n);
            }, r));
          } catch (e) {
            let r = e, n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          }
        }
      }
      logger(e) {
        let r = this.parseEngineResponse(e);
        r && (r.level = r?.level.toLowerCase() ?? "unknown", El(r) ? this.logEmitter.emit("query", { timestamp: /* @__PURE__ */ new Date(), query: r.query, params: r.params, duration: Number(r.duration_ms), target: r.module_path }) : (Pl(r), this.logEmitter.emit(r.level, { timestamp: /* @__PURE__ */ new Date(), message: r.message, target: r.module_path })));
      }
      parseInitError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      parseRequestError(e) {
        try {
          return JSON.parse(e);
        } catch {
        }
        return e;
      }
      onBeforeExit() {
        throw new Error('"beforeExit" hook is not applicable to the library engine since Prisma 5.0.0, it is only relevant and implemented for the binary engine. Please add your event listener to the `process` object directly instead.');
      }
      async start() {
        if (await this.libraryInstantiationPromise, await this.libraryStoppingPromise, this.libraryStartingPromise)
          return ye(`library already starting, this.libraryStarted: ${this.libraryStarted}`), this.libraryStartingPromise;
        if (this.libraryStarted)
          return;
        let e = /* @__PURE__ */ __name(async () => {
          ye("library starting");
          try {
            let r = { traceparent: this.tracingHelper.getTraceParent() };
            await this.engine?.connect(JSON.stringify(r)), this.libraryStarted = true, ye("library started");
          } catch (r) {
            let n = this.parseInitError(r.message);
            throw typeof n == "string" ? r : new I(n.message, this.config.clientVersion, n.error_code);
          } finally {
            this.libraryStartingPromise = void 0;
          }
        }, "e");
        return this.libraryStartingPromise = this.tracingHelper.runInChildSpan("connect", e), this.libraryStartingPromise;
      }
      async stop() {
        if (await this.libraryInstantiationPromise, await this.libraryStartingPromise, await this.executingQueryPromise, this.libraryStoppingPromise)
          return ye("library is already stopping"), this.libraryStoppingPromise;
        if (!this.libraryStarted)
          return;
        let e = /* @__PURE__ */ __name(async () => {
          await new Promise((n) => setTimeout(n, 5)), ye("library stopping");
          let r = { traceparent: this.tracingHelper.getTraceParent() };
          await this.engine?.disconnect(JSON.stringify(r)), this.libraryStarted = false, this.libraryStoppingPromise = void 0, await (await this.adapterPromise)?.dispose(), this.adapterPromise = void 0, ye("library stopped");
        }, "e");
        return this.libraryStoppingPromise = this.tracingHelper.runInChildSpan("disconnect", e), this.libraryStoppingPromise;
      }
      version() {
        return this.versionInfo = this.library?.version(), this.versionInfo?.version ?? "unknown";
      }
      debugPanic(e) {
        return this.library?.debugPanic(e);
      }
      async request(e, { traceparent: r, interactiveTransaction: n }) {
        ye(`sending request, this.libraryStarted: ${this.libraryStarted}`);
        let i = JSON.stringify({ traceparent: r }), o = JSON.stringify(e);
        try {
          await this.start();
          let s = await this.adapterPromise;
          this.executingQueryPromise = this.engine?.query(o, i, n?.id), this.lastQuery = o;
          let a = this.parseEngineResponse(await this.executingQueryPromise);
          if (a.errors)
            throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], s?.errorRegistry) : new j(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
          if (this.loggerRustPanic)
            throw this.loggerRustPanic;
          return { data: a };
        } catch (s) {
          if (s instanceof I)
            throw s;
          s.code === "GenericFailure" && s.message?.startsWith("PANIC:");
          let a = this.parseRequestError(s.message);
          throw typeof a == "string" ? s : new j(`${a.message}
${a.backtrace}`, { clientVersion: this.config.clientVersion });
        }
      }
      async requestBatch(e, { transaction: r, traceparent: n }) {
        ye("requestBatch");
        let i = sr(e, r);
        await this.start();
        let o = await this.adapterPromise;
        this.lastQuery = JSON.stringify(i), this.executingQueryPromise = this.engine.query(this.lastQuery, JSON.stringify({ traceparent: n }), yo(r));
        let s = await this.executingQueryPromise, a = this.parseEngineResponse(s);
        if (a.errors)
          throw a.errors.length === 1 ? this.buildQueryError(a.errors[0], o?.errorRegistry) : new j(JSON.stringify(a.errors), { clientVersion: this.config.clientVersion });
        let { batchResult: f, errors: h } = a;
        if (Array.isArray(f))
          return f.map((T) => T.errors && T.errors.length > 0 ? this.loggerRustPanic ?? this.buildQueryError(T.errors[0], o?.errorRegistry) : { data: T });
        throw h && h.length === 1 ? new Error(h[0].error) : new Error(JSON.stringify(a));
      }
      buildQueryError(e, r) {
        e.user_facing_error.is_panic;
        let n = this.getExternalAdapterError(e.user_facing_error, r);
        return n ? n.error : ar(e, this.config.clientVersion, this.config.activeProvider);
      }
      getExternalAdapterError(e, r) {
        if (e.error_code === xl && r) {
          let n = e.meta?.id;
          qt(typeof n == "number", "Malformed external JS error received from the engine");
          let i = r.consumeError(n);
          return qt(i, "External error with reported id was not registered"), i;
        }
      }
      async metrics(e) {
        await this.start();
        let r = await this.engine.metrics(JSON.stringify(e));
        return e.format === "prometheus" ? r : this.parseEngineResponse(r);
      }
    }, "Rt");
    function Cl(t) {
      return typeof t == "object" && t !== null && t.error_code !== void 0;
    }
    __name(Cl, "Cl");
    u();
    c();
    m();
    p();
    d();
    l();
    var At = "Accelerate has not been setup correctly. Make sure your client is using `.$extends(withAccelerate())`. See https://pris.ly/d/accelerate-getting-started";
    var pr = /* @__PURE__ */ __name(class {
      constructor(e) {
        this.config = e;
        this.resolveDatasourceUrl = this.config.accelerateUtils?.resolveDatasourceUrl, this.getBatchRequestPayload = this.config.accelerateUtils?.getBatchRequestPayload, this.prismaGraphQLToJSError = this.config.accelerateUtils?.prismaGraphQLToJSError, this.PrismaClientUnknownRequestError = this.config.accelerateUtils?.PrismaClientUnknownRequestError, this.PrismaClientInitializationError = this.config.accelerateUtils?.PrismaClientInitializationError, this.PrismaClientKnownRequestError = this.config.accelerateUtils?.PrismaClientKnownRequestError, this.debug = this.config.accelerateUtils?.debug, this.engineVersion = this.config.accelerateUtils?.engineVersion, this.clientVersion = this.config.accelerateUtils?.clientVersion;
      }
      name = "AccelerateEngine";
      resolveDatasourceUrl;
      getBatchRequestPayload;
      prismaGraphQLToJSError;
      PrismaClientUnknownRequestError;
      PrismaClientInitializationError;
      PrismaClientKnownRequestError;
      debug;
      engineVersion;
      clientVersion;
      onBeforeExit(e) {
      }
      async start() {
      }
      async stop() {
      }
      version(e) {
        return "unknown";
      }
      transaction(e, r, n) {
        throw new I(At, this.config.clientVersion);
      }
      metrics(e) {
        throw new I(At, this.config.clientVersion);
      }
      request(e, r) {
        throw new I(At, this.config.clientVersion);
      }
      requestBatch(e, r) {
        throw new I(At, this.config.clientVersion);
      }
      applyPendingMigrations() {
        throw new I(At, this.config.clientVersion);
      }
    }, "pr");
    function bo({ copyEngine: t = true }, e) {
      let r;
      try {
        r = mr({ inlineDatasources: e.inlineDatasources, overrideDatasources: e.overrideDatasources, env: { ...e.env, ...g.env }, clientVersion: e.clientVersion });
      } catch {
      }
      let n = !!(r?.startsWith("prisma://") || Mr(r));
      t && n && lt("recommend--no-engine", "In production, we recommend using `prisma generate --no-engine` (See: `prisma generate --help`)");
      let i = Ue(e.generator), o = n || !t, s = !!e.adapter, a = i === "library", f = i === "binary", h = i === "client";
      if (o && s || s && false) {
        let T;
        throw t ? r?.startsWith("prisma://") ? T = ["Prisma Client was configured to use the `adapter` option but the URL was a `prisma://` URL.", "Please either use the `prisma://` URL or remove the `adapter` from the Prisma Client constructor."] : T = ["Prisma Client was configured to use both the `adapter` and Accelerate, please chose one."] : T = ["Prisma Client was configured to use the `adapter` option but `prisma generate` was run with `--no-engine`.", "Please run `prisma generate` without `--no-engine` to be able to use Prisma Client with the adapter."], new W(T.join(`
`), { clientVersion: e.clientVersion });
      }
      if (s)
        return new Rt(e);
      if (o)
        return new pr(e);
      {
        let T = [`PrismaClient failed to initialize because it wasn't configured to run in this environment (${Re().prettyName}).`, "In order to run Prisma Client in an edge runtime, you will need to configure one of the following options:", "- Enable Driver Adapters: https://pris.ly/d/driver-adapters", "- Enable Accelerate: https://pris.ly/d/accelerate"];
        throw new W(T.join(`
`), { clientVersion: e.clientVersion });
      }
      return "wasm";
    }
    __name(bo, "bo");
    u();
    c();
    m();
    p();
    d();
    l();
    function dr({ generator: t }) {
      return t?.previewFeatures ?? [];
    }
    __name(dr, "dr");
    u();
    c();
    m();
    p();
    d();
    l();
    var wo = /* @__PURE__ */ __name((t) => ({ command: t }), "wo");
    u();
    c();
    m();
    p();
    d();
    l();
    u();
    c();
    m();
    p();
    d();
    l();
    var xo = /* @__PURE__ */ __name((t) => t.strings.reduce((e, r, n) => `${e}@P${n}${r}`), "xo");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function et(t) {
      try {
        return Eo(t, "fast");
      } catch {
        return Eo(t, "slow");
      }
    }
    __name(et, "et");
    function Eo(t, e) {
      return JSON.stringify(t.map((r) => vo(r, e)));
    }
    __name(Eo, "Eo");
    function vo(t, e) {
      if (Array.isArray(t))
        return t.map((r) => vo(r, e));
      if (typeof t == "bigint")
        return { prisma__type: "bigint", prisma__value: t.toString() };
      if (Ve(t))
        return { prisma__type: "date", prisma__value: t.toJSON() };
      if (ae.isDecimal(t))
        return { prisma__type: "decimal", prisma__value: t.toJSON() };
      if (b.isBuffer(t))
        return { prisma__type: "bytes", prisma__value: t.toString("base64") };
      if (Rl(t))
        return { prisma__type: "bytes", prisma__value: b.from(t).toString("base64") };
      if (ArrayBuffer.isView(t)) {
        let { buffer: r, byteOffset: n, byteLength: i } = t;
        return { prisma__type: "bytes", prisma__value: b.from(r, n, i).toString("base64") };
      }
      return typeof t == "object" && e === "slow" ? To(t) : t;
    }
    __name(vo, "vo");
    function Rl(t) {
      return t instanceof ArrayBuffer || t instanceof SharedArrayBuffer ? true : typeof t == "object" && t !== null ? t[Symbol.toStringTag] === "ArrayBuffer" || t[Symbol.toStringTag] === "SharedArrayBuffer" : false;
    }
    __name(Rl, "Rl");
    function To(t) {
      if (typeof t != "object" || t === null)
        return t;
      if (typeof t.toJSON == "function")
        return t.toJSON();
      if (Array.isArray(t))
        return t.map(Po);
      let e = {};
      for (let r of Object.keys(t))
        e[r] = Po(t[r]);
      return e;
    }
    __name(To, "To");
    function Po(t) {
      return typeof t == "bigint" ? t.toString() : To(t);
    }
    __name(Po, "Po");
    var Al = /^(\s*alter\s)/i;
    var Co = J("prisma:client");
    function nn(t, e, r, n) {
      if (!(t !== "postgresql" && t !== "cockroachdb") && r.length > 0 && Al.exec(e))
        throw new Error(`Running ALTER using ${n} is not supported
Using the example below you can still execute your query with Prisma, but please note that it is vulnerable to SQL injection attacks and requires you to take care of input sanitization.

Example:
  await prisma.$executeRawUnsafe(\`ALTER USER prisma WITH PASSWORD '\${password}'\`)

More Information: https://pris.ly/d/execute-raw
`);
    }
    __name(nn, "nn");
    var on2 = /* @__PURE__ */ __name(({ clientMethod: t, activeProvider: e }) => (r) => {
      let n = "", i;
      if (rr(r))
        n = r.sql, i = { values: et(r.values), __prismaRawParameters__: true };
      else if (Array.isArray(r)) {
        let [o, ...s] = r;
        n = o, i = { values: et(s || []), __prismaRawParameters__: true };
      } else
        switch (e) {
          case "sqlite":
          case "mysql": {
            n = r.sql, i = { values: et(r.values), __prismaRawParameters__: true };
            break;
          }
          case "cockroachdb":
          case "postgresql":
          case "postgres": {
            n = r.text, i = { values: et(r.values), __prismaRawParameters__: true };
            break;
          }
          case "sqlserver": {
            n = xo(r), i = { values: et(r.values), __prismaRawParameters__: true };
            break;
          }
          default:
            throw new Error(`The ${e} provider does not support ${t}`);
        }
      return i?.values ? Co(`prisma.${t}(${n}, ${i.values})`) : Co(`prisma.${t}(${n})`), { query: n, parameters: i };
    }, "on");
    var Ro = { requestArgsToMiddlewareArgs(t) {
      return [t.strings, ...t.values];
    }, middlewareArgsToRequestArgs(t) {
      let [e, ...r] = t;
      return new Z(e, r);
    } };
    var Ao = { requestArgsToMiddlewareArgs(t) {
      return [t];
    }, middlewareArgsToRequestArgs(t) {
      return t[0];
    } };
    u();
    c();
    m();
    p();
    d();
    l();
    function sn(t) {
      return function(r, n) {
        let i, o = /* @__PURE__ */ __name((s = t) => {
          try {
            return s === void 0 || s?.kind === "itx" ? i ??= So(r(s)) : So(r(s));
          } catch (a) {
            return Promise.reject(a);
          }
        }, "o");
        return { get spec() {
          return n;
        }, then(s, a) {
          return o().then(s, a);
        }, catch(s) {
          return o().catch(s);
        }, finally(s) {
          return o().finally(s);
        }, requestTransaction(s) {
          let a = o(s);
          return a.requestTransaction ? a.requestTransaction(s) : a;
        }, [Symbol.toStringTag]: "PrismaPromise" };
      };
    }
    __name(sn, "sn");
    function So(t) {
      return typeof t.then == "function" ? t : Promise.resolve(t);
    }
    __name(So, "So");
    u();
    c();
    m();
    p();
    d();
    l();
    var Sl = Or.split(".")[0];
    var kl = { isEnabled() {
      return false;
    }, getTraceParent() {
      return "00-10-10-00";
    }, dispatchEngineSpans() {
    }, getActiveContext() {
    }, runInChildSpan(t, e) {
      return e();
    } };
    var an = /* @__PURE__ */ __name(class {
      isEnabled() {
        return this.getGlobalTracingHelper().isEnabled();
      }
      getTraceParent(e) {
        return this.getGlobalTracingHelper().getTraceParent(e);
      }
      dispatchEngineSpans(e) {
        return this.getGlobalTracingHelper().dispatchEngineSpans(e);
      }
      getActiveContext() {
        return this.getGlobalTracingHelper().getActiveContext();
      }
      runInChildSpan(e, r) {
        return this.getGlobalTracingHelper().runInChildSpan(e, r);
      }
      getGlobalTracingHelper() {
        let e = globalThis[`V${Sl}_PRISMA_INSTRUMENTATION`], r = globalThis.PRISMA_INSTRUMENTATION;
        return e?.helper ?? r?.helper ?? kl;
      }
    }, "an");
    function ko() {
      return new an();
    }
    __name(ko, "ko");
    u();
    c();
    m();
    p();
    d();
    l();
    function Oo(t, e = () => {
    }) {
      let r, n = new Promise((i) => r = i);
      return { then(i) {
        return --t === 0 && r(e()), i?.(n);
      } };
    }
    __name(Oo, "Oo");
    u();
    c();
    m();
    p();
    d();
    l();
    function Mo(t) {
      return typeof t == "string" ? t : t.reduce((e, r) => {
        let n = typeof r == "string" ? r : r.level;
        return n === "query" ? e : e && (r === "info" || e === "info") ? "info" : n;
      }, void 0);
    }
    __name(Mo, "Mo");
    u();
    c();
    m();
    p();
    d();
    l();
    var fr = /* @__PURE__ */ __name(class {
      _middlewares = [];
      use(e) {
        this._middlewares.push(e);
      }
      get(e) {
        return this._middlewares[e];
      }
      has(e) {
        return !!this._middlewares[e];
      }
      length() {
        return this._middlewares.length;
      }
    }, "fr");
    u();
    c();
    m();
    p();
    d();
    l();
    var Do = nt(Zn());
    u();
    c();
    m();
    p();
    d();
    l();
    function gr(t) {
      return typeof t.batchRequestIdx == "number";
    }
    __name(gr, "gr");
    u();
    c();
    m();
    p();
    d();
    l();
    function Io(t) {
      if (t.action !== "findUnique" && t.action !== "findUniqueOrThrow")
        return;
      let e = [];
      return t.modelName && e.push(t.modelName), t.query.arguments && e.push(ln(t.query.arguments)), e.push(ln(t.query.selection)), e.join("");
    }
    __name(Io, "Io");
    function ln(t) {
      return `(${Object.keys(t).sort().map((r) => {
        let n = t[r];
        return typeof n == "object" && n !== null ? `(${r} ${ln(n)})` : r;
      }).join(" ")})`;
    }
    __name(ln, "ln");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ol = { aggregate: false, aggregateRaw: false, createMany: true, createManyAndReturn: true, createOne: true, deleteMany: true, deleteOne: true, executeRaw: true, findFirst: false, findFirstOrThrow: false, findMany: false, findRaw: false, findUnique: false, findUniqueOrThrow: false, groupBy: false, queryRaw: false, runCommandRaw: true, updateMany: true, updateManyAndReturn: true, updateOne: true, upsertOne: true };
    function un(t) {
      return Ol[t];
    }
    __name(un, "un");
    u();
    c();
    m();
    p();
    d();
    l();
    var yr = /* @__PURE__ */ __name(class {
      constructor(e) {
        this.options = e;
        this.batches = {};
      }
      batches;
      tickActive = false;
      request(e) {
        let r = this.options.batchBy(e);
        return r ? (this.batches[r] || (this.batches[r] = [], this.tickActive || (this.tickActive = true, g.nextTick(() => {
          this.dispatchBatches(), this.tickActive = false;
        }))), new Promise((n, i) => {
          this.batches[r].push({ request: e, resolve: n, reject: i });
        })) : this.options.singleLoader(e);
      }
      dispatchBatches() {
        for (let e in this.batches) {
          let r = this.batches[e];
          delete this.batches[e], r.length === 1 ? this.options.singleLoader(r[0].request).then((n) => {
            n instanceof Error ? r[0].reject(n) : r[0].resolve(n);
          }).catch((n) => {
            r[0].reject(n);
          }) : (r.sort((n, i) => this.options.batchOrder(n.request, i.request)), this.options.batchLoader(r.map((n) => n.request)).then((n) => {
            if (n instanceof Error)
              for (let i = 0; i < r.length; i++)
                r[i].reject(n);
            else
              for (let i = 0; i < r.length; i++) {
                let o = n[i];
                o instanceof Error ? r[i].reject(o) : r[i].resolve(o);
              }
          }).catch((n) => {
            for (let i = 0; i < r.length; i++)
              r[i].reject(n);
          }));
        }
      }
      get [Symbol.toStringTag]() {
        return "DataLoader";
      }
    }, "yr");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
    function _e(t, e) {
      if (e === null)
        return e;
      switch (t) {
        case "bigint":
          return BigInt(e);
        case "bytes": {
          let { buffer: r, byteOffset: n, byteLength: i } = b.from(e, "base64");
          return new Uint8Array(r, n, i);
        }
        case "decimal":
          return new ae(e);
        case "datetime":
        case "date":
          return new Date(e);
        case "time":
          return /* @__PURE__ */ new Date(`1970-01-01T${e}Z`);
        case "bigint-array":
          return e.map((r) => _e("bigint", r));
        case "bytes-array":
          return e.map((r) => _e("bytes", r));
        case "decimal-array":
          return e.map((r) => _e("decimal", r));
        case "datetime-array":
          return e.map((r) => _e("datetime", r));
        case "date-array":
          return e.map((r) => _e("date", r));
        case "time-array":
          return e.map((r) => _e("time", r));
        default:
          return e;
      }
    }
    __name(_e, "_e");
    function hr(t) {
      let e = [], r = Ml(t);
      for (let n = 0; n < t.rows.length; n++) {
        let i = t.rows[n], o = { ...r };
        for (let s = 0; s < i.length; s++)
          o[t.columns[s]] = _e(t.types[s], i[s]);
        e.push(o);
      }
      return e;
    }
    __name(hr, "hr");
    function Ml(t) {
      let e = {};
      for (let r = 0; r < t.columns.length; r++)
        e[t.columns[r]] = null;
      return e;
    }
    __name(Ml, "Ml");
    var Il = J("prisma:client:request_handler");
    var br = /* @__PURE__ */ __name(class {
      client;
      dataloader;
      logEmitter;
      constructor(e, r) {
        this.logEmitter = r, this.client = e, this.dataloader = new yr({ batchLoader: so(async ({ requests: n, customDataProxyFetch: i }) => {
          let { transaction: o, otelParentCtx: s } = n[0], a = n.map((C) => C.protocolQuery), f = this.client._tracingHelper.getTraceParent(s), h = n.some((C) => un(C.protocolQuery.action));
          return (await this.client._engine.requestBatch(a, { traceparent: f, transaction: Dl(o), containsWrite: h, customDataProxyFetch: i })).map((C, k) => {
            if (C instanceof Error)
              return C;
            try {
              return this.mapQueryEngineResult(n[k], C);
            } catch (A) {
              return A;
            }
          });
        }), singleLoader: async (n) => {
          let i = n.transaction?.kind === "itx" ? _o(n.transaction) : void 0, o = await this.client._engine.request(n.protocolQuery, { traceparent: this.client._tracingHelper.getTraceParent(), interactiveTransaction: i, isWrite: un(n.protocolQuery.action), customDataProxyFetch: n.customDataProxyFetch });
          return this.mapQueryEngineResult(n, o);
        }, batchBy: (n) => n.transaction?.id ? `transaction-${n.transaction.id}` : Io(n.protocolQuery), batchOrder(n, i) {
          return n.transaction?.kind === "batch" && i.transaction?.kind === "batch" ? n.transaction.index - i.transaction.index : 0;
        } });
      }
      async request(e) {
        try {
          return await this.dataloader.request(e);
        } catch (r) {
          let { clientMethod: n, callsite: i, transaction: o, args: s, modelName: a } = e;
          this.handleAndLogRequestError({ error: r, clientMethod: n, callsite: i, transaction: o, args: s, modelName: a, globalOmit: e.globalOmit });
        }
      }
      mapQueryEngineResult({ dataPath: e, unpacker: r }, n) {
        let i = n?.data, o = this.unpack(i, e, r);
        return g.env.PRISMA_CLIENT_GET_TIME ? { data: o } : o;
      }
      handleAndLogRequestError(e) {
        try {
          this.handleRequestError(e);
        } catch (r) {
          throw this.logEmitter && this.logEmitter.emit("error", { message: r.message, target: e.clientMethod, timestamp: /* @__PURE__ */ new Date() }), r;
        }
      }
      handleRequestError({ error: e, clientMethod: r, callsite: n, transaction: i, args: o, modelName: s, globalOmit: a }) {
        if (Il(e), _l(e, i))
          throw e;
        if (e instanceof X && Ll(e)) {
          let h = Lo(e.meta);
          zt({ args: o, errors: [h], callsite: n, errorFormat: this.client._errorFormat, originalMethod: r, clientVersion: this.client._clientVersion, globalOmit: a });
        }
        let f = e.message;
        if (n && (f = Bt({ callsite: n, originalMethod: r, isPanic: e.isPanic, showColors: this.client._errorFormat === "pretty", message: f })), f = this.sanitizeMessage(f), e.code) {
          let h = s ? { modelName: s, ...e.meta } : e.meta;
          throw new X(f, { code: e.code, clientVersion: this.client._clientVersion, meta: h, batchRequestIdx: e.batchRequestIdx });
        } else {
          if (e.isPanic)
            throw new we(f, this.client._clientVersion);
          if (e instanceof j)
            throw new j(f, { clientVersion: this.client._clientVersion, batchRequestIdx: e.batchRequestIdx });
          if (e instanceof I)
            throw new I(f, this.client._clientVersion);
          if (e instanceof we)
            throw new we(f, this.client._clientVersion);
        }
        throw e.clientVersion = this.client._clientVersion, e;
      }
      sanitizeMessage(e) {
        return this.client._errorFormat && this.client._errorFormat !== "pretty" ? (0, Do.default)(e) : e;
      }
      unpack(e, r, n) {
        if (!e || (e.data && (e = e.data), !e))
          return e;
        let i = Object.keys(e)[0], o = Object.values(e)[0], s = r.filter((h) => h !== "select" && h !== "include"), a = Kr(o, s), f = i === "queryRaw" ? hr(a) : $e(a);
        return n ? n(f) : f;
      }
      get [Symbol.toStringTag]() {
        return "RequestHandler";
      }
    }, "br");
    function Dl(t) {
      if (t) {
        if (t.kind === "batch")
          return { kind: "batch", options: { isolationLevel: t.isolationLevel } };
        if (t.kind === "itx")
          return { kind: "itx", options: _o(t) };
        be(t, "Unknown transaction kind");
      }
    }
    __name(Dl, "Dl");
    function _o(t) {
      return { id: t.id, payload: t.payload };
    }
    __name(_o, "_o");
    function _l(t, e) {
      return gr(t) && e?.kind === "batch" && t.batchRequestIdx !== e.index;
    }
    __name(_l, "_l");
    function Ll(t) {
      return t.code === "P2009" || t.code === "P2012";
    }
    __name(Ll, "Ll");
    function Lo(t) {
      if (t.kind === "Union")
        return { kind: "Union", errors: t.errors.map(Lo) };
      if (Array.isArray(t.selectionPath)) {
        let [, ...e] = t.selectionPath;
        return { ...t, selectionPath: e };
      }
      return t;
    }
    __name(Lo, "Lo");
    u();
    c();
    m();
    p();
    d();
    l();
    var Fo = go;
    u();
    c();
    m();
    p();
    d();
    l();
    var $o = nt(Fr());
    u();
    c();
    m();
    p();
    d();
    l();
    var D = /* @__PURE__ */ __name(class extends Error {
      constructor(e) {
        super(e + `
Read more at https://pris.ly/d/client-constructor`), this.name = "PrismaClientConstructorValidationError";
      }
      get [Symbol.toStringTag]() {
        return "PrismaClientConstructorValidationError";
      }
    }, "D");
    te(D, "PrismaClientConstructorValidationError");
    var No = ["datasources", "datasourceUrl", "errorFormat", "adapter", "log", "transactionOptions", "omit", "__internal"];
    var qo = ["pretty", "colorless", "minimal"];
    var Uo = ["info", "query", "warn", "error"];
    var Fl = { datasources: (t, { datasourceNames: e }) => {
      if (t) {
        if (typeof t != "object" || Array.isArray(t))
          throw new D(`Invalid value ${JSON.stringify(t)} for "datasources" provided to PrismaClient constructor`);
        for (let [r, n] of Object.entries(t)) {
          if (!e.includes(r)) {
            let i = tt(r, e) || ` Available datasources: ${e.join(", ")}`;
            throw new D(`Unknown datasource ${r} provided to PrismaClient constructor.${i}`);
          }
          if (typeof n != "object" || Array.isArray(n))
            throw new D(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
          if (n && typeof n == "object")
            for (let [i, o] of Object.entries(n)) {
              if (i !== "url")
                throw new D(`Invalid value ${JSON.stringify(t)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
              if (typeof o != "string")
                throw new D(`Invalid value ${JSON.stringify(o)} for datasource "${r}" provided to PrismaClient constructor.
It should have this form: { url: "CONNECTION_STRING" }`);
            }
        }
      }
    }, adapter: (t, e) => {
      if (!t && Ue(e.generator) === "client")
        throw new D('Using engine type "client" requires a driver adapter to be provided to PrismaClient constructor.');
      if (t === null)
        return;
      if (t === void 0)
        throw new D('"adapter" property must not be undefined, use null to conditionally disable driver adapters.');
      if (!dr(e).includes("driverAdapters"))
        throw new D('"adapter" property can only be provided to PrismaClient constructor when "driverAdapters" preview feature is enabled.');
      if (Ue(e.generator) === "binary")
        throw new D('Cannot use a driver adapter with the "binary" Query Engine. Please use the "library" Query Engine.');
    }, datasourceUrl: (t) => {
      if (typeof t < "u" && typeof t != "string")
        throw new D(`Invalid value ${JSON.stringify(t)} for "datasourceUrl" provided to PrismaClient constructor.
Expected string or undefined.`);
    }, errorFormat: (t) => {
      if (t) {
        if (typeof t != "string")
          throw new D(`Invalid value ${JSON.stringify(t)} for "errorFormat" provided to PrismaClient constructor.`);
        if (!qo.includes(t)) {
          let e = tt(t, qo);
          throw new D(`Invalid errorFormat ${t} provided to PrismaClient constructor.${e}`);
        }
      }
    }, log: (t) => {
      if (!t)
        return;
      if (!Array.isArray(t))
        throw new D(`Invalid value ${JSON.stringify(t)} for "log" provided to PrismaClient constructor.`);
      function e(r) {
        if (typeof r == "string" && !Uo.includes(r)) {
          let n = tt(r, Uo);
          throw new D(`Invalid log level "${r}" provided to PrismaClient constructor.${n}`);
        }
      }
      __name(e, "e");
      for (let r of t) {
        e(r);
        let n = { level: e, emit: (i) => {
          let o = ["stdout", "event"];
          if (!o.includes(i)) {
            let s = tt(i, o);
            throw new D(`Invalid value ${JSON.stringify(i)} for "emit" in logLevel provided to PrismaClient constructor.${s}`);
          }
        } };
        if (r && typeof r == "object")
          for (let [i, o] of Object.entries(r))
            if (n[i])
              n[i](o);
            else
              throw new D(`Invalid property ${i} for "log" provided to PrismaClient constructor`);
      }
    }, transactionOptions: (t) => {
      if (!t)
        return;
      let e = t.maxWait;
      if (e != null && e <= 0)
        throw new D(`Invalid value ${e} for maxWait in "transactionOptions" provided to PrismaClient constructor. maxWait needs to be greater than 0`);
      let r = t.timeout;
      if (r != null && r <= 0)
        throw new D(`Invalid value ${r} for timeout in "transactionOptions" provided to PrismaClient constructor. timeout needs to be greater than 0`);
    }, omit: (t, e) => {
      if (typeof t != "object")
        throw new D('"omit" option is expected to be an object.');
      if (t === null)
        throw new D('"omit" option can not be `null`');
      let r = [];
      for (let [n, i] of Object.entries(t)) {
        let o = ql(n, e.runtimeDataModel);
        if (!o) {
          r.push({ kind: "UnknownModel", modelKey: n });
          continue;
        }
        for (let [s, a] of Object.entries(i)) {
          let f = o.fields.find((h) => h.name === s);
          if (!f) {
            r.push({ kind: "UnknownField", modelKey: n, fieldName: s });
            continue;
          }
          if (f.relationName) {
            r.push({ kind: "RelationInOmit", modelKey: n, fieldName: s });
            continue;
          }
          typeof a != "boolean" && r.push({ kind: "InvalidFieldValue", modelKey: n, fieldName: s });
        }
      }
      if (r.length > 0)
        throw new D(Ul(t, r));
    }, __internal: (t) => {
      if (!t)
        return;
      let e = ["debug", "engine", "configOverride"];
      if (typeof t != "object")
        throw new D(`Invalid value ${JSON.stringify(t)} for "__internal" to PrismaClient constructor`);
      for (let [r] of Object.entries(t))
        if (!e.includes(r)) {
          let n = tt(r, e);
          throw new D(`Invalid property ${JSON.stringify(r)} for "__internal" provided to PrismaClient constructor.${n}`);
        }
    } };
    function Vo(t, e) {
      for (let [r, n] of Object.entries(t)) {
        if (!No.includes(r)) {
          let i = tt(r, No);
          throw new D(`Unknown property ${r} provided to PrismaClient constructor.${i}`);
        }
        Fl[r](n, e);
      }
      if (t.datasourceUrl && t.datasources)
        throw new D('Can not use "datasourceUrl" and "datasources" options at the same time. Pick one of them');
    }
    __name(Vo, "Vo");
    function tt(t, e) {
      if (e.length === 0 || typeof t != "string")
        return "";
      let r = Nl(t, e);
      return r ? ` Did you mean "${r}"?` : "";
    }
    __name(tt, "tt");
    function Nl(t, e) {
      if (e.length === 0)
        return null;
      let r = e.map((i) => ({ value: i, distance: (0, $o.default)(t, i) }));
      r.sort((i, o) => i.distance < o.distance ? -1 : 1);
      let n = r[0];
      return n.distance < 3 ? n.value : null;
    }
    __name(Nl, "Nl");
    function ql(t, e) {
      return Bo(e.models, t) ?? Bo(e.types, t);
    }
    __name(ql, "ql");
    function Bo(t, e) {
      let r = Object.keys(t).find((n) => ve(n) === e);
      if (r)
        return t[r];
    }
    __name(Bo, "Bo");
    function Ul(t, e) {
      let r = He(t);
      for (let o of e)
        switch (o.kind) {
          case "UnknownModel":
            r.arguments.getField(o.modelKey)?.markAsError(), r.addErrorMessage(() => `Unknown model name: ${o.modelKey}.`);
            break;
          case "UnknownField":
            r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => `Model "${o.modelKey}" does not have a field named "${o.fieldName}".`);
            break;
          case "RelationInOmit":
            r.arguments.getDeepField([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => 'Relations are already excluded by default and can not be specified in "omit".');
            break;
          case "InvalidFieldValue":
            r.arguments.getDeepFieldValue([o.modelKey, o.fieldName])?.markAsError(), r.addErrorMessage(() => "Omit field option value must be a boolean.");
            break;
        }
      let { message: n, args: i } = Ht(r, "colorless");
      return `Error validating "omit" option:

${i}

${n}`;
    }
    __name(Ul, "Ul");
    u();
    c();
    m();
    p();
    d();
    l();
    function jo(t) {
      return t.length === 0 ? Promise.resolve([]) : new Promise((e, r) => {
        let n = new Array(t.length), i = null, o = false, s = 0, a = /* @__PURE__ */ __name(() => {
          o || (s++, s === t.length && (o = true, i ? r(i) : e(n)));
        }, "a"), f = /* @__PURE__ */ __name((h) => {
          o || (o = true, r(h));
        }, "f");
        for (let h = 0; h < t.length; h++)
          t[h].then((T) => {
            n[h] = T, a();
          }, (T) => {
            if (!gr(T)) {
              f(T);
              return;
            }
            T.batchRequestIdx === h ? f(T) : (i || (i = T), a());
          });
      });
    }
    __name(jo, "jo");
    var Ae = J("prisma:client");
    typeof globalThis == "object" && (globalThis.NODE_CLIENT = true);
    var Bl = { requestArgsToMiddlewareArgs: (t) => t, middlewareArgsToRequestArgs: (t) => t };
    var $l = Symbol.for("prisma.client.transaction.id");
    var Vl = { id: 0, nextId() {
      return ++this.id;
    } };
    function Go(t) {
      class e {
        _originalClient = this;
        _runtimeDataModel;
        _requestHandler;
        _connectionPromise;
        _disconnectionPromise;
        _engineConfig;
        _accelerateEngineConfig;
        _clientVersion;
        _errorFormat;
        _tracingHelper;
        _middlewares = new fr();
        _previewFeatures;
        _activeProvider;
        _globalOmit;
        _extensions;
        _engine;
        _appliedParent;
        _createPrismaPromise = sn();
        constructor(n) {
          t = n?.__internal?.configOverride?.(t) ?? t, mo(t), n && Vo(n, t);
          let i = new nr().on("error", () => {
          });
          this._extensions = ze.empty(), this._previewFeatures = dr(t), this._clientVersion = t.clientVersion ?? Fo, this._activeProvider = t.activeProvider, this._globalOmit = n?.omit, this._tracingHelper = ko();
          let o = t.relativeEnvPaths && { rootEnvPath: t.relativeEnvPaths.rootEnvPath && Nt.resolve(t.dirname, t.relativeEnvPaths.rootEnvPath), schemaEnvPath: t.relativeEnvPaths.schemaEnvPath && Nt.resolve(t.dirname, t.relativeEnvPaths.schemaEnvPath) }, s;
          if (n?.adapter) {
            s = n.adapter;
            let f = t.activeProvider === "postgresql" ? "postgres" : t.activeProvider;
            if (s.provider !== f)
              throw new I(`The Driver Adapter \`${s.adapterName}\`, based on \`${s.provider}\`, is not compatible with the provider \`${f}\` specified in the Prisma schema.`, this._clientVersion);
            if (n.datasources || n.datasourceUrl !== void 0)
              throw new I("Custom datasource configuration is not compatible with Prisma Driver Adapters. Please define the database connection string directly in the Driver Adapter configuration.", this._clientVersion);
          }
          let a = t.injectableEdgeEnv?.();
          try {
            let f = n ?? {}, h = f.__internal ?? {}, T = h.debug === true;
            T && J.enable("prisma:client");
            let C = Nt.resolve(t.dirname, t.relativePath);
            qn.existsSync(C) || (C = t.dirname), Ae("dirname", t.dirname), Ae("relativePath", t.relativePath), Ae("cwd", C);
            let k = h.engine || {};
            if (f.errorFormat ? this._errorFormat = f.errorFormat : g.env.NODE_ENV === "production" ? this._errorFormat = "minimal" : g.env.NO_COLOR ? this._errorFormat = "colorless" : this._errorFormat = "colorless", this._runtimeDataModel = t.runtimeDataModel, this._engineConfig = { cwd: C, dirname: t.dirname, enableDebugLogs: T, allowTriggerPanic: k.allowTriggerPanic, prismaPath: k.binaryPath ?? void 0, engineEndpoint: k.endpoint, generator: t.generator, showColors: this._errorFormat === "pretty", logLevel: f.log && Mo(f.log), logQueries: f.log && !!(typeof f.log == "string" ? f.log === "query" : f.log.find((A) => typeof A == "string" ? A === "query" : A.level === "query")), env: a?.parsed ?? {}, flags: [], engineWasm: t.engineWasm, compilerWasm: t.compilerWasm, clientVersion: t.clientVersion, engineVersion: t.engineVersion, previewFeatures: this._previewFeatures, activeProvider: t.activeProvider, inlineSchema: t.inlineSchema, overrideDatasources: po(f, t.datasourceNames), inlineDatasources: t.inlineDatasources, inlineSchemaHash: t.inlineSchemaHash, tracingHelper: this._tracingHelper, transactionOptions: { maxWait: f.transactionOptions?.maxWait ?? 2e3, timeout: f.transactionOptions?.timeout ?? 5e3, isolationLevel: f.transactionOptions?.isolationLevel }, logEmitter: i, isBundled: t.isBundled, adapter: s }, this._accelerateEngineConfig = { ...this._engineConfig, accelerateUtils: { resolveDatasourceUrl: mr, getBatchRequestPayload: sr, prismaGraphQLToJSError: ar, PrismaClientUnknownRequestError: j, PrismaClientInitializationError: I, PrismaClientKnownRequestError: X, debug: J("prisma:client:accelerateEngine"), engineVersion: Jo.version, clientVersion: t.clientVersion } }, Ae("clientVersion", t.clientVersion), this._engine = bo(t, this._engineConfig), this._requestHandler = new br(this, i), f.log)
              for (let A of f.log) {
                let O = typeof A == "string" ? A : A.emit === "stdout" ? A.level : null;
                O && this.$on(O, (S) => {
                  at.log(`${at.tags[O] ?? ""}`, S.message || S.query);
                });
              }
          } catch (f) {
            throw f.clientVersion = this._clientVersion, f;
          }
          return this._appliedParent = Tt(this);
        }
        get [Symbol.toStringTag]() {
          return "PrismaClient";
        }
        $use(n) {
          this._middlewares.use(n);
        }
        $on(n, i) {
          return n === "beforeExit" ? this._engine.onBeforeExit(i) : n && this._engineConfig.logEmitter.on(n, i), this;
        }
        $connect() {
          try {
            return this._engine.start();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          }
        }
        async $disconnect() {
          try {
            await this._engine.stop();
          } catch (n) {
            throw n.clientVersion = this._clientVersion, n;
          } finally {
            Fn();
          }
        }
        $executeRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "executeRaw", args: o, transaction: n, clientMethod: i, argsMapper: on2({ clientMethod: i, activeProvider: a }), callsite: Ce(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $executeRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0) {
              let [s, a] = Qo(n, i);
              return nn(this._activeProvider, s.text, s.values, Array.isArray(n) ? "prisma.$executeRaw`<SQL>`" : "prisma.$executeRaw(sql`<SQL>`)"), this.$executeRawInternal(o, "$executeRaw", s, a);
            }
            throw new W("`$executeRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#executeraw\n", { clientVersion: this._clientVersion });
          });
        }
        $executeRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => (nn(this._activeProvider, n, i, "prisma.$executeRawUnsafe(<SQL>, [...values])"), this.$executeRawInternal(o, "$executeRawUnsafe", [n, ...i])));
        }
        $runCommandRaw(n) {
          if (t.activeProvider !== "mongodb")
            throw new W(`The ${t.activeProvider} provider does not support $runCommandRaw. Use the mongodb provider.`, { clientVersion: this._clientVersion });
          return this._createPrismaPromise((i) => this._request({ args: n, clientMethod: "$runCommandRaw", dataPath: [], action: "runCommandRaw", argsMapper: wo, callsite: Ce(this._errorFormat), transaction: i }));
        }
        async $queryRawInternal(n, i, o, s) {
          let a = this._activeProvider;
          return this._request({ action: "queryRaw", args: o, transaction: n, clientMethod: i, argsMapper: on2({ clientMethod: i, activeProvider: a }), callsite: Ce(this._errorFormat), dataPath: [], middlewareArgsMapper: s });
        }
        $queryRaw(n, ...i) {
          return this._createPrismaPromise((o) => {
            if (n.raw !== void 0 || n.sql !== void 0)
              return this.$queryRawInternal(o, "$queryRaw", ...Qo(n, i));
            throw new W("`$queryRaw` is a tag function, please use it like the following:\n```\nconst result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`\n```\n\nOr read our docs at https://www.prisma.io/docs/concepts/components/prisma-client/raw-database-access#queryraw\n", { clientVersion: this._clientVersion });
          });
        }
        $queryRawTyped(n) {
          return this._createPrismaPromise((i) => {
            if (!this._hasPreviewFlag("typedSql"))
              throw new W("`typedSql` preview feature must be enabled in order to access $queryRawTyped API", { clientVersion: this._clientVersion });
            return this.$queryRawInternal(i, "$queryRawTyped", n);
          });
        }
        $queryRawUnsafe(n, ...i) {
          return this._createPrismaPromise((o) => this.$queryRawInternal(o, "$queryRawUnsafe", [n, ...i]));
        }
        _transactionWithArray({ promises: n, options: i }) {
          let o = Vl.nextId(), s = Oo(n.length), a = n.map((f, h) => {
            if (f?.[Symbol.toStringTag] !== "PrismaPromise")
              throw new Error("All elements of the array need to be Prisma Client promises. Hint: Please make sure you are not awaiting the Prisma client calls you intended to pass in the $transaction function.");
            let T = i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel, C = { kind: "batch", id: o, index: h, isolationLevel: T, lock: s };
            return f.requestTransaction?.(C) ?? f;
          });
          return jo(a);
        }
        async _transactionWithCallback({ callback: n, options: i }) {
          let o = { traceparent: this._tracingHelper.getTraceParent() }, s = { maxWait: i?.maxWait ?? this._engineConfig.transactionOptions.maxWait, timeout: i?.timeout ?? this._engineConfig.transactionOptions.timeout, isolationLevel: i?.isolationLevel ?? this._engineConfig.transactionOptions.isolationLevel }, a = await this._engine.transaction("start", o, s), f;
          try {
            let h = { kind: "itx", ...a };
            f = await n(this._createItxClient(h)), await this._engine.transaction("commit", o, a);
          } catch (h) {
            throw await this._engine.transaction("rollback", o, a).catch(() => {
            }), h;
          }
          return f;
        }
        _createItxClient(n) {
          return le(Tt(le(zi(this), [K("_appliedParent", () => this._appliedParent._createItxClient(n)), K("_createPrismaPromise", () => sn(n)), K($l, () => n.id)])), [Xe(to)]);
        }
        $transaction(n, i) {
          let o;
          typeof n == "function" ? this._engineConfig.adapter?.adapterName === "@prisma/adapter-d1" ? o = /* @__PURE__ */ __name(() => {
            throw new Error("Cloudflare D1 does not support interactive transactions. We recommend you to refactor your queries with that limitation in mind, and use batch transactions with `prisma.$transactions([])` where applicable.");
          }, "o") : o = /* @__PURE__ */ __name(() => this._transactionWithCallback({ callback: n, options: i }), "o") : o = /* @__PURE__ */ __name(() => this._transactionWithArray({ promises: n, options: i }), "o");
          let s = { name: "transaction", attributes: { method: "$transaction" } };
          return this._tracingHelper.runInChildSpan(s, o);
        }
        _request(n) {
          n.otelParentCtx = this._tracingHelper.getActiveContext();
          let i = n.middlewareArgsMapper ?? Bl, o = { args: i.requestArgsToMiddlewareArgs(n.args), dataPath: n.dataPath, runInTransaction: !!n.transaction, action: n.action, model: n.model }, s = { middleware: { name: "middleware", middleware: true, attributes: { method: "$use" }, active: false }, operation: { name: "operation", attributes: { method: o.action, model: o.model, name: o.model ? `${o.model}.${o.action}` : o.action } } }, a = -1, f = /* @__PURE__ */ __name(async (h) => {
            let T = this._middlewares.get(++a);
            if (T)
              return this._tracingHelper.runInChildSpan(s.middleware, (M) => T(h, (oe) => (M?.end(), f(oe))));
            let { runInTransaction: C, args: k, ...A } = h, O = { ...n, ...A };
            k && (O.args = i.middlewareArgsToRequestArgs(k)), n.transaction !== void 0 && C === false && delete O.transaction;
            let S = await oo(this, O);
            return O.model ? eo({ result: S, modelName: O.model, args: O.args, extensions: this._extensions, runtimeDataModel: this._runtimeDataModel, globalOmit: this._globalOmit }) : S;
          }, "f");
          return this._tracingHelper.runInChildSpan(s.operation, () => f(o));
        }
        async _executeRequest({ args: n, clientMethod: i, dataPath: o, callsite: s, action: a, model: f, argsMapper: h, transaction: T, unpacker: C, otelParentCtx: k, customDataProxyFetch: A }) {
          try {
            n = h ? h(n) : n;
            let O = { name: "serialize" }, S = this._tracingHelper.runInChildSpan(O, () => er({ modelName: f, runtimeDataModel: this._runtimeDataModel, action: a, args: n, clientMethod: i, callsite: s, extensions: this._extensions, errorFormat: this._errorFormat, clientVersion: this._clientVersion, previewFeatures: this._previewFeatures, globalOmit: this._globalOmit }));
            return J.enabled("prisma:client") && (Ae("Prisma Client call:"), Ae(`prisma.${i}(${Bi(n)})`), Ae("Generated request:"), Ae(JSON.stringify(S, null, 2) + `
`)), T?.kind === "batch" && await T.lock, this._requestHandler.request({ protocolQuery: S, modelName: f, action: a, clientMethod: i, dataPath: o, callsite: s, args: n, extensions: this._extensions, transaction: T, unpacker: C, otelParentCtx: k, otelChildCtx: this._tracingHelper.getActiveContext(), globalOmit: this._globalOmit, customDataProxyFetch: A });
          } catch (O) {
            throw O.clientVersion = this._clientVersion, O;
          }
        }
        $metrics = new Ye(this);
        _hasPreviewFlag(n) {
          return !!this._engineConfig.previewFeatures?.includes(n);
        }
        $applyPendingMigrations() {
          return this._engine.applyPendingMigrations();
        }
        $extends = Yi;
      }
      __name(e, "e");
      return e;
    }
    __name(Go, "Go");
    function Qo(t, e) {
      return jl(t) ? [new Z(t, e), Ro] : [t, Ao];
    }
    __name(Qo, "Qo");
    function jl(t) {
      return Array.isArray(t) && Array.isArray(t.raw);
    }
    __name(jl, "jl");
    u();
    c();
    m();
    p();
    d();
    l();
    var Ql = /* @__PURE__ */ new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
    function Wo(t) {
      return new Proxy(t, { get(e, r) {
        if (r in e)
          return e[r];
        if (!Ql.has(r))
          throw new TypeError(`Invalid enum value: ${String(r)}`);
      } });
    }
    __name(Wo, "Wo");
    u();
    c();
    m();
    p();
    d();
    l();
    l();
  }
});

// ../../packages/db/generated/edge/query_engine_bg.js
var require_query_engine_bg = __commonJS({
  "../../packages/db/generated/edge/query_engine_bg.js"(exports, module) {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var S = Object.defineProperty;
    var k = Object.getOwnPropertyDescriptor;
    var D = Object.getOwnPropertyNames;
    var R = Object.prototype.hasOwnProperty;
    var B = /* @__PURE__ */ __name((e, t) => {
      for (var n in t)
        S(e, n, { get: t[n], enumerable: true });
    }, "B");
    var U = /* @__PURE__ */ __name((e, t, n, r) => {
      if (t && typeof t == "object" || typeof t == "function")
        for (let _ of D(t))
          !R.call(e, _) && _ !== n && S(e, _, { get: () => t[_], enumerable: !(r = k(t, _)) || r.enumerable });
      return e;
    }, "U");
    var L = /* @__PURE__ */ __name((e) => U(S({}, "__esModule", { value: true }), e), "L");
    var Ft = {};
    B(Ft, { QueryEngine: () => Q, __wbg_String_8f0eb39a4a4c2f66: () => H, __wbg_buffer_609cc3eee51ed158: () => J, __wbg_call_672a4d21634d4a24: () => K, __wbg_call_7cccdd69e0791ae2: () => X, __wbg_crypto_805be4ce92f1e370: () => Y, __wbg_done_769e5ede4b31c67b: () => Z, __wbg_entries_3265d4158b33e5dc: () => ee, __wbg_exec_3e2d2d0644c927df: () => te, __wbg_getRandomValues_f6a868620c8bab49: () => ne, __wbg_getTime_46267b1c24877e30: () => re, __wbg_get_67b2ba62fc30de12: () => oe, __wbg_get_b9b93047fe3cf45b: () => _e, __wbg_get_ece95cf6585650d9: () => ce, __wbg_getwithrefkey_1dc361bd10053bfe: () => ie, __wbg_has_a5ea9117f258a0ec: () => ue, __wbg_instanceof_ArrayBuffer_e14585432e3737fc: () => se, __wbg_instanceof_Map_f3469ce2244d2430: () => fe, __wbg_instanceof_Promise_935168b8f4b49db3: () => ae, __wbg_instanceof_Uint8Array_17156bcf118086a9: () => be, __wbg_isArray_a1eab7e0d067391b: () => ge, __wbg_isSafeInteger_343e2beeeece1bb0: () => le, __wbg_iterator_9a24c88df860dc65: () => de, __wbg_keys_5c77a08ddc2fb8a6: () => we, __wbg_length_a446193dc22c12f8: () => pe, __wbg_length_e2d2a49132c1b256: () => xe, __wbg_msCrypto_2ac4d17c4748234a: () => ye, __wbg_new0_f788a2397c7ca929: () => me, __wbg_new_23a2665fac83c611: () => he, __wbg_new_405e22f390576ce2: () => Te, __wbg_new_5e0be73521bc8c17: () => qe, __wbg_new_63847613cde5d4bc: () => Se, __wbg_new_78feb108b6472713: () => Ae, __wbg_new_a12002a7f91c75be: () => Ie, __wbg_newnoargs_105ed471475aaf50: () => Ee, __wbg_newwithbyteoffsetandlength_d97e637ebe145a9a: () => Oe, __wbg_newwithlength_a381634e90c276d4: () => Fe, __wbg_next_25feadfc0913fea9: () => Me, __wbg_next_6574e1a8a62d1055: () => je, __wbg_node_ecc8306b9857f33d: () => ke, __wbg_now_7fd00a794a07d388: () => De, __wbg_now_807e54c39636c349: () => Re, __wbg_now_b3f7572f6ef3d3a9: () => Be, __wbg_process_5cff2739921be718: () => Ue, __wbg_push_737cfc8c1432c2c6: () => Le, __wbg_queueMicrotask_5a8a9131f3f0b37b: () => ve, __wbg_queueMicrotask_6d79674585219521: () => Ne, __wbg_randomFillSync_d3c85af7e31cf1f8: () => $e, __wbg_require_0c566c6f2eef6c79: () => Ce, __wbg_resolve_4851785c9c5f573d: () => Ve, __wbg_setTimeout_5d6a1d4fc51ea450: () => ze, __wbg_set_37837023f3d740e8: () => We, __wbg_set_3f1d0b984ed272ed: () => Pe, __wbg_set_65595bdd868b3009: () => Ge, __wbg_set_8fc6bf8a5b1071d1: () => Qe, __wbg_set_bb8cecf6a62b9f46: () => He, __wbg_set_wasm: () => v, __wbg_static_accessor_GLOBAL_88a902d13a557d07: () => Je, __wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0: () => Ke, __wbg_static_accessor_SELF_37c5d418e4bf5819: () => Xe, __wbg_static_accessor_WINDOW_5de37043a91a9c40: () => Ye, __wbg_subarray_aa9065fa9dc5df96: () => Ze, __wbg_then_44b73946d2fb3e7d: () => et, __wbg_then_48b406749878a531: () => tt, __wbg_valueOf_7392193dd78c6b97: () => nt, __wbg_value_cd1ffa7b1ab794f1: () => rt, __wbg_versions_a8e5a362e1f16442: () => ot, __wbindgen_as_number: () => _t, __wbindgen_bigint_from_i64: () => ct, __wbindgen_bigint_from_u64: () => it, __wbindgen_bigint_get_as_i64: () => ut, __wbindgen_boolean_get: () => st, __wbindgen_cb_drop: () => ft, __wbindgen_closure_wrapper7577: () => at, __wbindgen_debug_string: () => bt, __wbindgen_error_new: () => gt, __wbindgen_in: () => lt, __wbindgen_init_externref_table: () => dt, __wbindgen_is_bigint: () => wt, __wbindgen_is_function: () => pt, __wbindgen_is_object: () => xt, __wbindgen_is_string: () => yt, __wbindgen_is_undefined: () => mt, __wbindgen_jsval_eq: () => ht, __wbindgen_jsval_loose_eq: () => Tt, __wbindgen_memory: () => qt, __wbindgen_number_get: () => St, __wbindgen_number_new: () => At, __wbindgen_string_get: () => It, __wbindgen_string_new: () => Et, __wbindgen_throw: () => Ot, debug_panic: () => W, getBuildTimeInfo: () => z });
    module.exports = L(Ft);
    var m = /* @__PURE__ */ __name(() => {
    }, "m");
    m.prototype = m;
    var o;
    function v(e) {
      o = e;
    }
    __name(v, "v");
    var s = 0;
    var h = null;
    function T() {
      return (h === null || h.byteLength === 0) && (h = new Uint8Array(o.memory.buffer)), h;
    }
    __name(T, "T");
    var N = typeof TextEncoder > "u" ? (0, module.require)("util").TextEncoder : TextEncoder;
    var q = new N("utf-8");
    var $2 = typeof q.encodeInto == "function" ? function(e, t) {
      return q.encodeInto(e, t);
    } : function(e, t) {
      const n = q.encode(e);
      return t.set(n), { read: e.length, written: n.length };
    };
    function f(e, t, n) {
      if (n === void 0) {
        const u = q.encode(e), a = t(u.length, 1) >>> 0;
        return T().subarray(a, a + u.length).set(u), s = u.length, a;
      }
      let r = e.length, _ = t(r, 1) >>> 0;
      const i = T();
      let c = 0;
      for (; c < r; c++) {
        const u = e.charCodeAt(c);
        if (u > 127)
          break;
        i[_ + c] = u;
      }
      if (c !== r) {
        c !== 0 && (e = e.slice(c)), _ = n(_, r, r = c + e.length * 3, 1) >>> 0;
        const u = T().subarray(_ + c, _ + r), a = $2(e, u);
        c += a.written, _ = n(_, r, c, 1) >>> 0;
      }
      return s = c, _;
    }
    __name(f, "f");
    var p = null;
    function l() {
      return (p === null || p.buffer.detached === true || p.buffer.detached === void 0 && p.buffer !== o.memory.buffer) && (p = new DataView(o.memory.buffer)), p;
    }
    __name(l, "l");
    function x(e) {
      const t = o.__externref_table_alloc();
      return o.__wbindgen_export_4.set(t, e), t;
    }
    __name(x, "x");
    function g(e, t) {
      try {
        return e.apply(this, t);
      } catch (n) {
        const r = x(n);
        o.__wbindgen_exn_store(r);
      }
    }
    __name(g, "g");
    var C = typeof TextDecoder > "u" ? (0, module.require)("util").TextDecoder : TextDecoder;
    var I = new C("utf-8", { ignoreBOM: true, fatal: true });
    I.decode();
    function w(e, t) {
      return e = e >>> 0, I.decode(T().subarray(e, e + t));
    }
    __name(w, "w");
    function b(e) {
      return e == null;
    }
    __name(b, "b");
    var E = typeof FinalizationRegistry > "u" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((e) => {
      o.__wbindgen_export_5.get(e.dtor)(e.a, e.b);
    });
    function V(e, t, n, r) {
      const _ = { a: e, b: t, cnt: 1, dtor: n }, i = /* @__PURE__ */ __name((...c) => {
        _.cnt++;
        const u = _.a;
        _.a = 0;
        try {
          return r(u, _.b, ...c);
        } finally {
          --_.cnt === 0 ? (o.__wbindgen_export_5.get(_.dtor)(u, _.b), E.unregister(_)) : _.a = u;
        }
      }, "i");
      return i.original = _, E.register(i, _, _), i;
    }
    __name(V, "V");
    function A(e) {
      const t = typeof e;
      if (t == "number" || t == "boolean" || e == null)
        return `${e}`;
      if (t == "string")
        return `"${e}"`;
      if (t == "symbol") {
        const _ = e.description;
        return _ == null ? "Symbol" : `Symbol(${_})`;
      }
      if (t == "function") {
        const _ = e.name;
        return typeof _ == "string" && _.length > 0 ? `Function(${_})` : "Function";
      }
      if (Array.isArray(e)) {
        const _ = e.length;
        let i = "[";
        _ > 0 && (i += A(e[0]));
        for (let c = 1; c < _; c++)
          i += ", " + A(e[c]);
        return i += "]", i;
      }
      const n = /\[object ([^\]]+)\]/.exec(toString.call(e));
      let r;
      if (n && n.length > 1)
        r = n[1];
      else
        return toString.call(e);
      if (r == "Object")
        try {
          return "Object(" + JSON.stringify(e) + ")";
        } catch {
          return "Object";
        }
      return e instanceof Error ? `${e.name}: ${e.message}
${e.stack}` : r;
    }
    __name(A, "A");
    function O(e) {
      const t = o.__wbindgen_export_4.get(e);
      return o.__externref_table_dealloc(e), t;
    }
    __name(O, "O");
    function z() {
      return o.getBuildTimeInfo();
    }
    __name(z, "z");
    function W(e) {
      var t = b(e) ? 0 : f(e, o.__wbindgen_malloc, o.__wbindgen_realloc), n = s;
      const r = o.debug_panic(t, n);
      if (r[1])
        throw O(r[0]);
    }
    __name(W, "W");
    function P(e, t, n) {
      o.closure572_externref_shim(e, t, n);
    }
    __name(P, "P");
    function G(e, t, n, r) {
      o.closure132_externref_shim(e, t, n, r);
    }
    __name(G, "G");
    var F = typeof FinalizationRegistry > "u" ? { register: () => {
    }, unregister: () => {
    } } : new FinalizationRegistry((e) => o.__wbg_queryengine_free(e >>> 0, 1));
    var Q = class {
      __destroy_into_raw() {
        const t = this.__wbg_ptr;
        return this.__wbg_ptr = 0, F.unregister(this), t;
      }
      free() {
        const t = this.__destroy_into_raw();
        o.__wbg_queryengine_free(t, 0);
      }
      constructor(t, n, r) {
        const _ = o.queryengine_new(t, n, r);
        if (_[2])
          throw O(_[1]);
        return this.__wbg_ptr = _[0] >>> 0, F.register(this, this.__wbg_ptr, this), this;
      }
      connect(t, n) {
        const r = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s, i = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s;
        return o.queryengine_connect(this.__wbg_ptr, r, _, i, c);
      }
      disconnect(t, n) {
        const r = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s, i = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s;
        return o.queryengine_disconnect(this.__wbg_ptr, r, _, i, c);
      }
      query(t, n, r, _) {
        const i = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), c = s, u = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), a = s;
        var d = b(r) ? 0 : f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), y = s;
        const M = f(_, o.__wbindgen_malloc, o.__wbindgen_realloc), j = s;
        return o.queryengine_query(this.__wbg_ptr, i, c, u, a, d, y, M, j);
      }
      startTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d = s;
        return o.queryengine_startTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      commitTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d = s;
        return o.queryengine_commitTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      rollbackTransaction(t, n, r) {
        const _ = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s, c = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), u = s, a = f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), d = s;
        return o.queryengine_rollbackTransaction(this.__wbg_ptr, _, i, c, u, a, d);
      }
      metrics(t) {
        const n = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), r = s;
        return o.queryengine_metrics(this.__wbg_ptr, n, r);
      }
      trace(t) {
        const n = f(t, o.__wbindgen_malloc, o.__wbindgen_realloc), r = s;
        return o.queryengine_trace(this.__wbg_ptr, n, r);
      }
    };
    __name(Q, "Q");
    function H(e, t) {
      const n = String(t), r = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s;
      l().setInt32(e + 4 * 1, _, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(H, "H");
    function J(e) {
      return e.buffer;
    }
    __name(J, "J");
    function K() {
      return g(function(e, t) {
        return e.call(t);
      }, arguments);
    }
    __name(K, "K");
    function X() {
      return g(function(e, t, n) {
        return e.call(t, n);
      }, arguments);
    }
    __name(X, "X");
    function Y(e) {
      return e.crypto;
    }
    __name(Y, "Y");
    function Z(e) {
      return e.done;
    }
    __name(Z, "Z");
    function ee(e) {
      return Object.entries(e);
    }
    __name(ee, "ee");
    function te(e, t, n) {
      const r = e.exec(w(t, n));
      return b(r) ? 0 : x(r);
    }
    __name(te, "te");
    function ne() {
      return g(function(e, t) {
        e.getRandomValues(t);
      }, arguments);
    }
    __name(ne, "ne");
    function re(e) {
      return e.getTime();
    }
    __name(re, "re");
    function oe() {
      return g(function(e, t) {
        return Reflect.get(e, t);
      }, arguments);
    }
    __name(oe, "oe");
    function _e(e, t) {
      return e[t >>> 0];
    }
    __name(_e, "_e");
    function ce() {
      return g(function(e, t) {
        return e[t];
      }, arguments);
    }
    __name(ce, "ce");
    function ie(e, t) {
      return e[t];
    }
    __name(ie, "ie");
    function ue() {
      return g(function(e, t) {
        return Reflect.has(e, t);
      }, arguments);
    }
    __name(ue, "ue");
    function se(e) {
      let t;
      try {
        t = e instanceof ArrayBuffer;
      } catch {
        t = false;
      }
      return t;
    }
    __name(se, "se");
    function fe(e) {
      let t;
      try {
        t = e instanceof Map;
      } catch {
        t = false;
      }
      return t;
    }
    __name(fe, "fe");
    function ae(e) {
      let t;
      try {
        t = e instanceof Promise;
      } catch {
        t = false;
      }
      return t;
    }
    __name(ae, "ae");
    function be(e) {
      let t;
      try {
        t = e instanceof Uint8Array;
      } catch {
        t = false;
      }
      return t;
    }
    __name(be, "be");
    function ge(e) {
      return Array.isArray(e);
    }
    __name(ge, "ge");
    function le(e) {
      return Number.isSafeInteger(e);
    }
    __name(le, "le");
    function de() {
      return Symbol.iterator;
    }
    __name(de, "de");
    function we(e) {
      return Object.keys(e);
    }
    __name(we, "we");
    function pe(e) {
      return e.length;
    }
    __name(pe, "pe");
    function xe(e) {
      return e.length;
    }
    __name(xe, "xe");
    function ye(e) {
      return e.msCrypto;
    }
    __name(ye, "ye");
    function me() {
      return /* @__PURE__ */ new Date();
    }
    __name(me, "me");
    function he(e, t) {
      try {
        var n = { a: e, b: t }, r = /* @__PURE__ */ __name((i, c) => {
          const u = n.a;
          n.a = 0;
          try {
            return G(u, n.b, i, c);
          } finally {
            n.a = u;
          }
        }, "r");
        return new Promise(r);
      } finally {
        n.a = n.b = 0;
      }
    }
    __name(he, "he");
    function Te() {
      return new Object();
    }
    __name(Te, "Te");
    function qe() {
      return /* @__PURE__ */ new Map();
    }
    __name(qe, "qe");
    function Se(e, t, n, r) {
      return new RegExp(w(e, t), w(n, r));
    }
    __name(Se, "Se");
    function Ae() {
      return new Array();
    }
    __name(Ae, "Ae");
    function Ie(e) {
      return new Uint8Array(e);
    }
    __name(Ie, "Ie");
    function Ee(e, t) {
      return new m(w(e, t));
    }
    __name(Ee, "Ee");
    function Oe(e, t, n) {
      return new Uint8Array(e, t >>> 0, n >>> 0);
    }
    __name(Oe, "Oe");
    function Fe(e) {
      return new Uint8Array(e >>> 0);
    }
    __name(Fe, "Fe");
    function Me(e) {
      return e.next;
    }
    __name(Me, "Me");
    function je() {
      return g(function(e) {
        return e.next();
      }, arguments);
    }
    __name(je, "je");
    function ke(e) {
      return e.node;
    }
    __name(ke, "ke");
    function De(e) {
      return e.now();
    }
    __name(De, "De");
    function Re() {
      return Date.now();
    }
    __name(Re, "Re");
    function Be() {
      return g(function() {
        return Date.now();
      }, arguments);
    }
    __name(Be, "Be");
    function Ue(e) {
      return e.process;
    }
    __name(Ue, "Ue");
    function Le(e, t) {
      return e.push(t);
    }
    __name(Le, "Le");
    function ve(e) {
      return e.queueMicrotask;
    }
    __name(ve, "ve");
    function Ne(e) {
      queueMicrotask(e);
    }
    __name(Ne, "Ne");
    function $e() {
      return g(function(e, t) {
        e.randomFillSync(t);
      }, arguments);
    }
    __name($e, "$e");
    function Ce() {
      return g(function() {
        return module.require;
      }, arguments);
    }
    __name(Ce, "Ce");
    function Ve(e) {
      return Promise.resolve(e);
    }
    __name(Ve, "Ve");
    function ze(e, t) {
      return setTimeout(e, t >>> 0);
    }
    __name(ze, "ze");
    function We(e, t, n) {
      e[t >>> 0] = n;
    }
    __name(We, "We");
    function Pe(e, t, n) {
      e[t] = n;
    }
    __name(Pe, "Pe");
    function Ge(e, t, n) {
      e.set(t, n >>> 0);
    }
    __name(Ge, "Ge");
    function Qe(e, t, n) {
      return e.set(t, n);
    }
    __name(Qe, "Qe");
    function He() {
      return g(function(e, t, n) {
        return Reflect.set(e, t, n);
      }, arguments);
    }
    __name(He, "He");
    function Je() {
      const e = typeof global > "u" ? null : global;
      return b(e) ? 0 : x(e);
    }
    __name(Je, "Je");
    function Ke() {
      const e = typeof globalThis > "u" ? null : globalThis;
      return b(e) ? 0 : x(e);
    }
    __name(Ke, "Ke");
    function Xe() {
      const e = typeof self > "u" ? null : self;
      return b(e) ? 0 : x(e);
    }
    __name(Xe, "Xe");
    function Ye() {
      const e = typeof window > "u" ? null : window;
      return b(e) ? 0 : x(e);
    }
    __name(Ye, "Ye");
    function Ze(e, t, n) {
      return e.subarray(t >>> 0, n >>> 0);
    }
    __name(Ze, "Ze");
    function et(e, t) {
      return e.then(t);
    }
    __name(et, "et");
    function tt(e, t, n) {
      return e.then(t, n);
    }
    __name(tt, "tt");
    function nt(e) {
      return e.valueOf();
    }
    __name(nt, "nt");
    function rt(e) {
      return e.value;
    }
    __name(rt, "rt");
    function ot(e) {
      return e.versions;
    }
    __name(ot, "ot");
    function _t(e) {
      return +e;
    }
    __name(_t, "_t");
    function ct(e) {
      return e;
    }
    __name(ct, "ct");
    function it(e) {
      return BigInt.asUintN(64, e);
    }
    __name(it, "it");
    function ut(e, t) {
      const n = t, r = typeof n == "bigint" ? n : void 0;
      l().setBigInt64(e + 8 * 1, b(r) ? BigInt(0) : r, true), l().setInt32(e + 4 * 0, !b(r), true);
    }
    __name(ut, "ut");
    function st(e) {
      const t = e;
      return typeof t == "boolean" ? t ? 1 : 0 : 2;
    }
    __name(st, "st");
    function ft(e) {
      const t = e.original;
      return t.cnt-- == 1 ? (t.a = 0, true) : false;
    }
    __name(ft, "ft");
    function at(e, t, n) {
      return V(e, t, 573, P);
    }
    __name(at, "at");
    function bt(e, t) {
      const n = A(t), r = f(n, o.__wbindgen_malloc, o.__wbindgen_realloc), _ = s;
      l().setInt32(e + 4 * 1, _, true), l().setInt32(e + 4 * 0, r, true);
    }
    __name(bt, "bt");
    function gt(e, t) {
      return new Error(w(e, t));
    }
    __name(gt, "gt");
    function lt(e, t) {
      return e in t;
    }
    __name(lt, "lt");
    function dt() {
      const e = o.__wbindgen_export_4, t = e.grow(4);
      e.set(0, void 0), e.set(t + 0, void 0), e.set(t + 1, null), e.set(t + 2, true), e.set(t + 3, false);
    }
    __name(dt, "dt");
    function wt(e) {
      return typeof e == "bigint";
    }
    __name(wt, "wt");
    function pt(e) {
      return typeof e == "function";
    }
    __name(pt, "pt");
    function xt(e) {
      const t = e;
      return typeof t == "object" && t !== null;
    }
    __name(xt, "xt");
    function yt(e) {
      return typeof e == "string";
    }
    __name(yt, "yt");
    function mt(e) {
      return e === void 0;
    }
    __name(mt, "mt");
    function ht(e, t) {
      return e === t;
    }
    __name(ht, "ht");
    function Tt(e, t) {
      return e == t;
    }
    __name(Tt, "Tt");
    function qt() {
      return o.memory;
    }
    __name(qt, "qt");
    function St(e, t) {
      const n = t, r = typeof n == "number" ? n : void 0;
      l().setFloat64(e + 8 * 1, b(r) ? 0 : r, true), l().setInt32(e + 4 * 0, !b(r), true);
    }
    __name(St, "St");
    function At(e) {
      return e;
    }
    __name(At, "At");
    function It(e, t) {
      const n = t, r = typeof n == "string" ? n : void 0;
      var _ = b(r) ? 0 : f(r, o.__wbindgen_malloc, o.__wbindgen_realloc), i = s;
      l().setInt32(e + 4 * 1, i, true), l().setInt32(e + 4 * 0, _, true);
    }
    __name(It, "It");
    function Et(e, t) {
      return w(e, t);
    }
    __name(Et, "Et");
    function Ot(e, t) {
      throw new Error(w(e, t));
    }
    __name(Ot, "Ot");
  }
});

// ../../packages/db/generated/edge/wasm-worker-loader.mjs
var wasm_worker_loader_exports = {};
__export(wasm_worker_loader_exports, {
  default: () => wasm_worker_loader_default
});
var wasm_worker_loader_default;
var init_wasm_worker_loader = __esm({
  "../../packages/db/generated/edge/wasm-worker-loader.mjs"() {
    "use strict";
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    wasm_worker_loader_default = import("./345fc7670767108e9f890aa9af5921b1f947841d-query_engine_bg.wasm");
  }
});

// ../../packages/db/generated/edge/wasm.js
var require_wasm3 = __commonJS({
  "../../packages/db/generated/edge/wasm.js"(exports) {
    init_modules_watch_stub();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports, "__esModule", { value: true });
    var {
      PrismaClientKnownRequestError: PrismaClientKnownRequestError2,
      PrismaClientUnknownRequestError: PrismaClientUnknownRequestError2,
      PrismaClientRustPanicError: PrismaClientRustPanicError2,
      PrismaClientInitializationError: PrismaClientInitializationError2,
      PrismaClientValidationError: PrismaClientValidationError2,
      getPrismaClient: getPrismaClient2,
      sqltag: sqltag2,
      empty: empty2,
      join: join2,
      raw: raw3,
      skip: skip2,
      Decimal: Decimal2,
      Debug: Debug3,
      objectEnumValues: objectEnumValues2,
      makeStrictEnum: makeStrictEnum2,
      Extensions: Extensions2,
      warnOnce: warnOnce2,
      defineDmmfProperty: defineDmmfProperty2,
      Public: Public2,
      getRuntime: getRuntime2,
      createParam: createParam2
    } = require_wasm2();
    var Prisma2 = {};
    exports.Prisma = Prisma2;
    exports.$Enums = {};
    Prisma2.prismaVersion = {
      client: "6.8.2",
      engine: "2060c79ba17c6bb9f5823312b6f6b7f4a845738e"
    };
    Prisma2.PrismaClientKnownRequestError = PrismaClientKnownRequestError2;
    Prisma2.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError2;
    Prisma2.PrismaClientRustPanicError = PrismaClientRustPanicError2;
    Prisma2.PrismaClientInitializationError = PrismaClientInitializationError2;
    Prisma2.PrismaClientValidationError = PrismaClientValidationError2;
    Prisma2.Decimal = Decimal2;
    Prisma2.sql = sqltag2;
    Prisma2.empty = empty2;
    Prisma2.join = join2;
    Prisma2.raw = raw3;
    Prisma2.validator = Public2.validator;
    Prisma2.getExtensionContext = Extensions2.getExtensionContext;
    Prisma2.defineExtension = Extensions2.defineExtension;
    Prisma2.DbNull = objectEnumValues2.instances.DbNull;
    Prisma2.JsonNull = objectEnumValues2.instances.JsonNull;
    Prisma2.AnyNull = objectEnumValues2.instances.AnyNull;
    Prisma2.NullTypes = {
      DbNull: objectEnumValues2.classes.DbNull,
      JsonNull: objectEnumValues2.classes.JsonNull,
      AnyNull: objectEnumValues2.classes.AnyNull
    };
    exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
      ReadUncommitted: "ReadUncommitted",
      ReadCommitted: "ReadCommitted",
      RepeatableRead: "RepeatableRead",
      Serializable: "Serializable"
    });
    exports.Prisma.PostScalarFieldEnum = {
      id: "id",
      title: "title",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.StripePaymentScalarFieldEnum = {
      id: "id",
      clerkUserId: "clerkUserId",
      amount: "amount",
      currency: "currency",
      status: "status",
      stripePaymentId: "stripePaymentId",
      metadata: "metadata",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.UserScalarFieldEnum = {
      id: "id",
      firstName: "firstName",
      lastName: "lastName",
      username: "username",
      primaryEmailAddress: "primaryEmailAddress",
      imageUrl: "imageUrl",
      clerkUserProperties: "clerkUserProperties",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogTagScalarFieldEnum = {
      id: "id",
      name: "name",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryScalarFieldEnum = {
      id: "id",
      userId: "userId",
      content: "content",
      upvoteCount: "upvoteCount",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.FounderLogEntryTagScalarFieldEnum = {
      id: "id",
      entryId: "entryId",
      tagId: "tagId",
      createdAt: "createdAt"
    };
    exports.Prisma.FounderLogReflectionScalarFieldEnum = {
      id: "id",
      userId: "userId",
      type: "type",
      content: "content",
      createdAt: "createdAt",
      updatedAt: "updatedAt"
    };
    exports.Prisma.SortOrder = {
      asc: "asc",
      desc: "desc"
    };
    exports.Prisma.NullableJsonNullValueInput = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull
    };
    exports.Prisma.QueryMode = {
      default: "default",
      insensitive: "insensitive"
    };
    exports.Prisma.JsonNullValueFilter = {
      DbNull: Prisma2.DbNull,
      JsonNull: Prisma2.JsonNull,
      AnyNull: Prisma2.AnyNull
    };
    exports.Prisma.NullsOrder = {
      first: "first",
      last: "last"
    };
    exports.Prisma.ModelName = {
      Post: "Post",
      StripePayment: "StripePayment",
      User: "User",
      FounderLogTag: "FounderLogTag",
      FounderLogEntry: "FounderLogEntry",
      FounderLogEntryTag: "FounderLogEntryTag",
      FounderLogReflection: "FounderLogReflection"
    };
    var config2 = {
      "generator": {
        "name": "edge",
        "provider": {
          "fromEnvVar": null,
          "value": "prisma-client-js"
        },
        "output": {
          "value": "/Users/knamnguyen/Documents/0-Programming/founderlog/packages/db/generated/edge",
          "fromEnvVar": null
        },
        "config": {
          "engineType": "library"
        },
        "binaryTargets": [
          {
            "fromEnvVar": null,
            "value": "darwin-arm64",
            "native": true
          }
        ],
        "previewFeatures": [
          "driverAdapters"
        ],
        "sourceFilePath": "/Users/knamnguyen/Documents/0-Programming/founderlog/packages/db/prisma/schema.prisma",
        "isCustomOutput": true
      },
      "relativeEnvPaths": {
        "rootEnvPath": null
      },
      "relativePath": "../../prisma",
      "clientVersion": "6.8.2",
      "engineVersion": "2060c79ba17c6bb9f5823312b6f6b7f4a845738e",
      "datasourceNames": [
        "db"
      ],
      "activeProvider": "postgresql",
      "postinstall": false,
      "inlineDatasources": {
        "db": {
          "url": {
            "fromEnvVar": "DATABASE_URL",
            "value": null
          }
        }
      },
      "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\n//binaryTargets to handle the client for production environment on vercel\n//specify output locations so that path resolve work with turbo repo\ngenerator client {\n  provider      = "prisma-client-js"\n  output        = "../generated/node"\n  binaryTargets = ["native", "rhel-openssl-3.0.x", "linux-arm64-openssl-3.0.x", "linux-musl-arm64-openssl-3.0.x"]\n}\n\n// Dedicated edge client for Cloudflare Workers\ngenerator edge {\n  provider        = "prisma-client-js"\n  output          = "../generated/edge"\n  binaryTargets   = ["native"]\n  previewFeatures = ["driverAdapters"]\n}\n\ndatasource db {\n  provider  = "postgresql"\n  url       = env("DATABASE_URL")\n  directUrl = env("DIRECT_URL")\n}\n\n//note that post current does not connect to a user\n//you would want to connect it to a user later\nmodel Post {\n  id        String   @id @default(uuid())\n  title     String   @db.VarChar(256)\n  content   String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n}\n\n//Probably not needed because we can use the clerk user object to store the stripe customer id and access type\nmodel StripePayment {\n  id              String   @id @default(cuid())\n  clerkUserId     String // Clerk user ID\n  amount          Int // in cents\n  currency        String   @default("usd")\n  status          String\n  stripePaymentId String   @unique\n  metadata        Json? // Optional metadata about the purchase\n  createdAt       DateTime @default(now())\n  updatedAt       DateTime @updatedAt\n\n  // Index to make querying by user efficient\n  @@index([clerkUserId])\n}\n\n// User model to link with Clerk users\nmodel User {\n  id                  String                 @id // This is the Clerk ID\n  firstName           String?\n  lastName            String?\n  username            String?                @unique\n  primaryEmailAddress String?                @unique\n  imageUrl            String?\n  clerkUserProperties Json? // Made optional to preserve existing data\n  entries             FounderLogEntry[]\n  reflections         FounderLogReflection[]\n  createdAt           DateTime               @default(now())\n  updatedAt           DateTime               @updatedAt\n}\n\n// Tags for categorizing founder log entries\nmodel FounderLogTag {\n  id        String               @id @default(cuid())\n  name      String               @unique\n  entries   FounderLogEntryTag[]\n  createdAt DateTime             @default(now())\n  updatedAt DateTime             @updatedAt\n}\n\n// Main founder log entry model\nmodel FounderLogEntry {\n  id          String               @id @default(cuid())\n  userId      String\n  user        User                 @relation(fields: [userId], references: [id], onDelete: Cascade)\n  content     String\n  upvoteCount Int                  @default(0)\n  tags        FounderLogEntryTag[]\n  createdAt   DateTime             @default(now())\n  updatedAt   DateTime             @updatedAt\n\n  @@index([userId])\n}\n\n// Join table for many-to-many relationship between entries and tags\nmodel FounderLogEntryTag {\n  id        String          @id @default(cuid())\n  entryId   String\n  entry     FounderLogEntry @relation(fields: [entryId], references: [id], onDelete: Cascade)\n  tagId     String\n  tag       FounderLogTag   @relation(fields: [tagId], references: [id], onDelete: Cascade)\n  createdAt DateTime        @default(now())\n\n  @@unique([entryId, tagId])\n  @@index([entryId])\n  @@index([tagId])\n}\n\n// Morning/evening reflections\nmodel FounderLogReflection {\n  id        String   @id @default(cuid())\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n  type      String // "morning" or "evening"\n  content   String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n}\n\n//User and and Stripe subscribers info is stored in the Clerk User object so it is not defined in this schema here\n',
      "inlineSchemaHash": "d26993210ab4492055fab0ab5011a7cf99e0e68729585c3abf3e8fcaa1318ce8",
      "copyEngine": true
    };
    config2.dirname = "/";
    config2.runtimeDataModel = JSON.parse('{"models":{"Post":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"StripePayment":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"clerkUserId","kind":"scalar","type":"String"},{"name":"amount","kind":"scalar","type":"Int"},{"name":"currency","kind":"scalar","type":"String"},{"name":"status","kind":"scalar","type":"String"},{"name":"stripePaymentId","kind":"scalar","type":"String"},{"name":"metadata","kind":"scalar","type":"Json"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"firstName","kind":"scalar","type":"String"},{"name":"lastName","kind":"scalar","type":"String"},{"name":"username","kind":"scalar","type":"String"},{"name":"primaryEmailAddress","kind":"scalar","type":"String"},{"name":"imageUrl","kind":"scalar","type":"String"},{"name":"clerkUserProperties","kind":"scalar","type":"Json"},{"name":"entries","kind":"object","type":"FounderLogEntry","relationName":"FounderLogEntryToUser"},{"name":"reflections","kind":"object","type":"FounderLogReflection","relationName":"FounderLogReflectionToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"FounderLogTag":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"entries","kind":"object","type":"FounderLogEntryTag","relationName":"FounderLogEntryTagToFounderLogTag"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"FounderLogEntry":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"FounderLogEntryToUser"},{"name":"content","kind":"scalar","type":"String"},{"name":"upvoteCount","kind":"scalar","type":"Int"},{"name":"tags","kind":"object","type":"FounderLogEntryTag","relationName":"FounderLogEntryToFounderLogEntryTag"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null},"FounderLogEntryTag":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"entryId","kind":"scalar","type":"String"},{"name":"entry","kind":"object","type":"FounderLogEntry","relationName":"FounderLogEntryToFounderLogEntryTag"},{"name":"tagId","kind":"scalar","type":"String"},{"name":"tag","kind":"object","type":"FounderLogTag","relationName":"FounderLogEntryTagToFounderLogTag"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null},"FounderLogReflection":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"FounderLogReflectionToUser"},{"name":"type","kind":"scalar","type":"String"},{"name":"content","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":null}},"enums":{},"types":{}}');
    defineDmmfProperty2(exports.Prisma, config2.runtimeDataModel);
    config2.engineWasm = {
      getRuntime: async () => require_query_engine_bg(),
      getQueryEngineWasmModule: async () => {
        const loader = (await Promise.resolve().then(() => (init_wasm_worker_loader(), wasm_worker_loader_exports))).default;
        const engine = (await loader).default;
        return engine;
      }
    };
    config2.compilerWasm = void 0;
    config2.injectableEdgeEnv = () => ({
      parsed: {
        DATABASE_URL: typeof globalThis !== "undefined" && globalThis["DATABASE_URL"] || typeof process !== "undefined" && process.env && process.env.DATABASE_URL || void 0
      }
    });
    if (typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0) {
      Debug3.enable(typeof globalThis !== "undefined" && globalThis["DEBUG"] || typeof process !== "undefined" && process.env && process.env.DEBUG || void 0);
    }
    var PrismaClient3 = getPrismaClient2(config2);
    exports.PrismaClient = PrismaClient3;
    Object.assign(exports, Prisma2);
  }
});

// .wrangler/tmp/bundle-rZHlhy/middleware-loader.entry.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// .wrangler/tmp/bundle-rZHlhy/middleware-insertion-facade.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// src/index.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/hono.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/hono-base.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/compose.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var compose = /* @__PURE__ */ __name((middleware, onError, onNotFound) => {
  return (context2, next) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError2 = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context2.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next || void 0;
      }
      if (handler) {
        try {
          res = await handler(context2, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context2.error = err;
            res = await onError(err, context2);
            isError2 = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context2.finalized === false && onNotFound) {
          res = await onNotFound(context2);
        }
      }
      if (res && (context2.finalized === false || isError2)) {
        context2.res = res;
      }
      return context2;
    }
    __name(dispatch, "dispatch");
  };
}, "compose");

// ../../node_modules/hono/dist/context.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/request.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/utils/body.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var parseBody = /* @__PURE__ */ __name(async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = request instanceof HonoRequest ? request.raw.headers : request.headers;
  const contentType = headers.get("Content-Type");
  if (contentType?.startsWith("multipart/form-data") || contentType?.startsWith("application/x-www-form-urlencoded")) {
    return parseFormData(request, { all, dot });
  }
  return {};
}, "parseBody");
async function parseFormData(request, options) {
  const formData = await request.formData();
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
__name(parseFormData, "parseFormData");
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
__name(convertFormDataToBodyData, "convertFormDataToBodyData");
var handleParsingAllValues = /* @__PURE__ */ __name((form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    form[key] = value;
  }
}, "handleParsingAllValues");
var handleParsingNestedValues = /* @__PURE__ */ __name((form, key, value) => {
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
}, "handleParsingNestedValues");

// ../../node_modules/hono/dist/utils/url.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var splitPath = /* @__PURE__ */ __name((path) => {
  const paths = path.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
}, "splitPath");
var splitRoutingPath = /* @__PURE__ */ __name((routePath) => {
  const { groups, path } = extractGroupsFromPath(routePath);
  const paths = splitPath(path);
  return replaceGroupMarks(paths, groups);
}, "splitRoutingPath");
var extractGroupsFromPath = /* @__PURE__ */ __name((path) => {
  const groups = [];
  path = path.replace(/\{[^}]+\}/g, (match, index) => {
    const mark = `@${index}`;
    groups.push([mark, match]);
    return mark;
  });
  return { groups, path };
}, "extractGroupsFromPath");
var replaceGroupMarks = /* @__PURE__ */ __name((paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
}, "replaceGroupMarks");
var patternCache = {};
var getPattern = /* @__PURE__ */ __name((label, next) => {
  if (label === "*") {
    return "*";
  }
  const match = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match) {
    const cacheKey = `${label}#${next}`;
    if (!patternCache[cacheKey]) {
      if (match[2]) {
        patternCache[cacheKey] = next && next[0] !== ":" && next[0] !== "*" ? [cacheKey, match[1], new RegExp(`^${match[2]}(?=/${next})`)] : [label, match[1], new RegExp(`^${match[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
}, "getPattern");
var tryDecode = /* @__PURE__ */ __name((str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match) => {
      try {
        return decoder(match);
      } catch {
        return match;
      }
    });
  }
}, "tryDecode");
var tryDecodeURI = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURI), "tryDecodeURI");
var getPath = /* @__PURE__ */ __name((request) => {
  const url = request.url;
  const start = url.indexOf("/", 8);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const path = url.slice(start, queryIndex === -1 ? void 0 : queryIndex);
      return tryDecodeURI(path.includes("%25") ? path.replace(/%25/g, "%2525") : path);
    } else if (charCode === 63) {
      break;
    }
  }
  return url.slice(start, i);
}, "getPath");
var getPathNoStrict = /* @__PURE__ */ __name((request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
}, "getPathNoStrict");
var mergePath = /* @__PURE__ */ __name((base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
}, "mergePath");
var checkOptionalParameter = /* @__PURE__ */ __name((path) => {
  if (path.charCodeAt(path.length - 1) !== 63 || !path.includes(":")) {
    return null;
  }
  const segments = path.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (/\?/.test(segment)) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.replace("?", "");
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
}, "checkOptionalParameter");
var _decodeURI = /* @__PURE__ */ __name((value) => {
  if (!/[%+]/.test(value)) {
    return value;
  }
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return value.indexOf("%") !== -1 ? decodeURIComponent_(value) : value;
}, "_decodeURI");
var _getQueryParam = /* @__PURE__ */ __name((url, key, multiple) => {
  let encoded;
  if (!multiple && key && !/[%+]/.test(key)) {
    let keyIndex2 = url.indexOf(`?${key}`, 8);
    if (keyIndex2 === -1) {
      keyIndex2 = url.indexOf(`&${key}`, 8);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = {};
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name2 = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name2 = _decodeURI(name2);
    }
    keyIndex = nextKeyIndex;
    if (name2 === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name2] && Array.isArray(results[name2]))) {
        results[name2] = [];
      }
      ;
      results[name2].push(value);
    } else {
      results[name2] ??= value;
    }
  }
  return key ? results[key] : results;
}, "_getQueryParam");
var getQueryParam = _getQueryParam;
var getQueryParams = /* @__PURE__ */ __name((url, key) => {
  return _getQueryParam(url, key, true);
}, "getQueryParams");
var decodeURIComponent_ = decodeURIComponent;

// ../../node_modules/hono/dist/request.js
var tryDecodeURIComponent = /* @__PURE__ */ __name((str) => tryDecode(str, decodeURIComponent_), "tryDecodeURIComponent");
var HonoRequest = /* @__PURE__ */ __name(class {
  raw;
  #validatedData;
  #matchResult;
  routeIndex = 0;
  path;
  bodyCache = {};
  constructor(request, path = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path;
    this.#matchResult = matchResult;
    this.#validatedData = {};
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex][1][key];
    const param = this.#getParamValue(paramKey);
    return param ? /\%/.test(param) ? tryDecodeURIComponent(param) : param : void 0;
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex][1]);
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value && typeof value === "string") {
        decoded[key] = /\%/.test(value) ? tryDecodeURIComponent(value) : value;
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name2) {
    if (name2) {
      return this.raw.headers.get(name2) ?? void 0;
    }
    const headerData = {};
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return this.bodyCache.parsedBody ??= await parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw3 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    const anyCachedKey = Object.keys(bodyCache)[0];
    if (anyCachedKey) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw3[key]();
  };
  json() {
    return this.#cachedBody("json");
  }
  text() {
    return this.#cachedBody("text");
  }
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  blob() {
    return this.#cachedBody("blob");
  }
  formData() {
    return this.#cachedBody("formData");
  }
  addValidatedData(target, data) {
    this.#validatedData[target] = data;
  }
  valid(target) {
    return this.#validatedData[target];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
}, "HonoRequest");

// ../../node_modules/hono/dist/utils/html.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw2 = /* @__PURE__ */ __name((value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
}, "raw");
var resolveCallback = /* @__PURE__ */ __name(async (str, phase, preserveCallbacks, context2, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context: context2 }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context2, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw2(await resStr, callbacks);
  } else {
    return resStr;
  }
}, "resolveCallback");

// ../../node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setHeaders = /* @__PURE__ */ __name((headers, map = {}) => {
  for (const key of Object.keys(map)) {
    headers.set(key, map[key]);
  }
  return headers;
}, "setHeaders");
var Context = /* @__PURE__ */ __name(class {
  #rawRequest;
  #req;
  env = {};
  #var;
  finalized = false;
  error;
  #status = 200;
  #executionCtx;
  #headers;
  #preparedHeaders;
  #res;
  #isFresh = true;
  #layout;
  #renderer;
  #notFoundHandler;
  #matchResult;
  #path;
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  get res() {
    this.#isFresh = false;
    return this.#res ||= new Response("404 Not Found", { status: 404 });
  }
  set res(_res) {
    this.#isFresh = false;
    if (this.#res && _res) {
      _res = new Response(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  setLayout = (layout) => this.#layout = layout;
  getLayout = () => this.#layout;
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  header = (name2, value, options) => {
    if (this.finalized) {
      this.#res = new Response(this.#res.body, this.#res);
    }
    if (value === void 0) {
      if (this.#headers) {
        this.#headers.delete(name2);
      } else if (this.#preparedHeaders) {
        delete this.#preparedHeaders[name2.toLocaleLowerCase()];
      }
      if (this.finalized) {
        this.res.headers.delete(name2);
      }
      return;
    }
    if (options?.append) {
      if (!this.#headers) {
        this.#isFresh = false;
        this.#headers = new Headers(this.#preparedHeaders);
        this.#preparedHeaders = {};
      }
      this.#headers.append(name2, value);
    } else {
      if (this.#headers) {
        this.#headers.set(name2, value);
      } else {
        this.#preparedHeaders ??= {};
        this.#preparedHeaders[name2.toLowerCase()] = value;
      }
    }
    if (this.finalized) {
      if (options?.append) {
        this.res.headers.append(name2, value);
      } else {
        this.res.headers.set(name2, value);
      }
    }
  };
  status = (status) => {
    this.#isFresh = false;
    this.#status = status;
  };
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    if (this.#isFresh && !headers && !arg && this.#status === 200) {
      return new Response(data, {
        headers: this.#preparedHeaders
      });
    }
    if (arg && typeof arg !== "number") {
      const header = new Headers(arg.headers);
      if (this.#headers) {
        this.#headers.forEach((v, k) => {
          if (k === "set-cookie") {
            header.append(k, v);
          } else {
            header.set(k, v);
          }
        });
      }
      const headers2 = setHeaders(header, this.#preparedHeaders);
      return new Response(data, {
        headers: headers2,
        status: arg.status ?? this.#status
      });
    }
    const status = typeof arg === "number" ? arg : this.#status;
    this.#preparedHeaders ??= {};
    this.#headers ??= new Headers();
    setHeaders(this.#headers, this.#preparedHeaders);
    if (this.#res) {
      this.#res.headers.forEach((v, k) => {
        if (k === "set-cookie") {
          this.#headers?.append(k, v);
        } else {
          this.#headers?.set(k, v);
        }
      });
      setHeaders(this.#headers, this.#preparedHeaders);
    }
    headers ??= {};
    for (const [k, v] of Object.entries(headers)) {
      if (typeof v === "string") {
        this.#headers.set(k, v);
      } else {
        this.#headers.delete(k);
        for (const v2 of v) {
          this.#headers.append(k, v2);
        }
      }
    }
    return new Response(data, {
      status,
      headers: this.#headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  body = (data, arg, headers) => {
    return typeof arg === "number" ? this.#newResponse(data, arg, headers) : this.#newResponse(data, arg);
  };
  text = (text, arg, headers) => {
    if (!this.#preparedHeaders) {
      if (this.#isFresh && !headers && !arg) {
        return new Response(text);
      }
      this.#preparedHeaders = {};
    }
    this.#preparedHeaders["content-type"] = TEXT_PLAIN;
    if (typeof arg === "number") {
      return this.#newResponse(text, arg, headers);
    }
    return this.#newResponse(text, arg);
  };
  json = (object, arg, headers) => {
    const body = JSON.stringify(object);
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "application/json";
    return typeof arg === "number" ? this.#newResponse(body, arg, headers) : this.#newResponse(body, arg);
  };
  html = (html, arg, headers) => {
    this.#preparedHeaders ??= {};
    this.#preparedHeaders["content-type"] = "text/html; charset=UTF-8";
    if (typeof html === "object") {
      return resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then((html2) => {
        return typeof arg === "number" ? this.#newResponse(html2, arg, headers) : this.#newResponse(html2, arg);
      });
    }
    return typeof arg === "number" ? this.#newResponse(html, arg, headers) : this.#newResponse(html, arg);
  };
  redirect = (location, status) => {
    this.#headers ??= new Headers();
    this.#headers.set("Location", String(location));
    return this.newResponse(null, status ?? 302);
  };
  notFound = () => {
    this.#notFoundHandler ??= () => new Response();
    return this.#notFoundHandler(this);
  };
}, "Context");

// ../../node_modules/hono/dist/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = /* @__PURE__ */ __name(class extends Error {
}, "UnsupportedPathError");

// ../../node_modules/hono/dist/utils/constants.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// ../../node_modules/hono/dist/hono-base.js
var notFoundHandler = /* @__PURE__ */ __name((c) => {
  return c.text("404 Not Found", 404);
}, "notFoundHandler");
var errorHandler = /* @__PURE__ */ __name((err, c) => {
  if ("getResponse" in err) {
    return err.getResponse();
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
}, "errorHandler");
var Hono = /* @__PURE__ */ __name(class {
  get;
  post;
  put;
  delete;
  options;
  patch;
  all;
  on;
  use;
  router;
  getPath;
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path, ...handlers) => {
      for (const p of [path].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  errorHandler = errorHandler;
  route(path, app2) {
    const subApp = this.basePath(path);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = /* @__PURE__ */ __name(async (c, next) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next))).res, "handler");
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler);
    });
    return this;
  }
  basePath(path) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path);
    return subApp;
  }
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  mount(path, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = /* @__PURE__ */ __name((request) => request, "replaceRequest");
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = url.pathname.slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = /* @__PURE__ */ __name(async (c, next) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next();
    }, "handler");
    this.#addRoute(METHOD_NAME_ALL, mergePath(path, "*"), handler);
    return this;
  }
  #addRoute(method, path, handler) {
    method = method.toUpperCase();
    path = mergePath(this._basePath, path);
    const r = { path, method, handler };
    this.router.add(method, path, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path);
    const c = new Context(request, {
      path,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved) => resolved || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context2 = await composed(c);
        if (!context2.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context2.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
}, "Hono");

// ../../node_modules/hono/dist/router/reg-exp-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/router/reg-exp-router/node.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
__name(compareKey, "compareKey");
var Node = /* @__PURE__ */ __name(class {
  #index;
  #varIndex;
  #children = /* @__PURE__ */ Object.create(null);
  insert(tokens, index, paramMap, context2, pathErrorCheckOnly) {
    if (tokens.length === 0) {
      if (this.#index !== void 0) {
        throw PATH_ERROR;
      }
      if (pathErrorCheckOnly) {
        return;
      }
      this.#index = index;
      return;
    }
    const [token, ...restTokens] = tokens;
    const pattern = token === "*" ? restTokens.length === 0 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let node;
    if (pattern) {
      const name2 = pattern[1];
      let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
      if (name2 && pattern[2]) {
        regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
        if (/\((?!\?:)/.test(regexpStr)) {
          throw PATH_ERROR;
        }
      }
      node = this.#children[regexpStr];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[regexpStr] = new Node();
        if (name2 !== "") {
          node.#varIndex = context2.varIndex++;
        }
      }
      if (!pathErrorCheckOnly && name2 !== "") {
        paramMap.push([name2, node.#varIndex]);
      }
    } else {
      node = this.#children[token];
      if (!node) {
        if (Object.keys(this.#children).some(
          (k) => k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
        )) {
          throw PATH_ERROR;
        }
        if (pathErrorCheckOnly) {
          return;
        }
        node = this.#children[token] = new Node();
      }
    }
    node.insert(restTokens, index, paramMap, context2, pathErrorCheckOnly);
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      return (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + c.buildRegExpStr();
    });
    if (typeof this.#index === "number") {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
}, "Node");

// ../../node_modules/hono/dist/router/reg-exp-router/trie.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var Trie = /* @__PURE__ */ __name(class {
  #context = { varIndex: 0 };
  #root = new Node();
  insert(path, index, pathErrorCheckOnly) {
    const paramAssoc = [];
    const groups = [];
    for (let i = 0; ; ) {
      let replaced = false;
      path = path.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = path.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, index, paramAssoc, this.#context, pathErrorCheckOnly);
    return paramAssoc;
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
}, "Trie");

// ../../node_modules/hono/dist/router/reg-exp-router/router.js
var emptyParam = [];
var nullMatcher = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
function buildWildcardRegExp(path) {
  return wildcardRegExpCache[path] ??= new RegExp(
    path === "*" ? "" : `^${path.replace(
      /\/\*$|([.\\+*[^\]$()])/g,
      (_, metaChar) => metaChar ? `\\${metaChar}` : "(?:|/.*)"
    )}$`
  );
}
__name(buildWildcardRegExp, "buildWildcardRegExp");
function clearWildcardRegExpCache() {
  wildcardRegExpCache = /* @__PURE__ */ Object.create(null);
}
__name(clearWildcardRegExpCache, "clearWildcardRegExpCache");
function buildMatcherFromPreprocessedRoutes(routes) {
  const trie = new Trie();
  const handlerData = [];
  if (routes.length === 0) {
    return nullMatcher;
  }
  const routesWithStaticPathFlag = routes.map(
    (route) => [!/\*|\/:/.test(route[0]), ...route]
  ).sort(
    ([isStaticA, pathA], [isStaticB, pathB]) => isStaticA ? 1 : isStaticB ? -1 : pathA.length - pathB.length
  );
  const staticMap = /* @__PURE__ */ Object.create(null);
  for (let i = 0, j = -1, len = routesWithStaticPathFlag.length; i < len; i++) {
    const [pathErrorCheckOnly, path, handlers] = routesWithStaticPathFlag[i];
    if (pathErrorCheckOnly) {
      staticMap[path] = [handlers.map(([h]) => [h, /* @__PURE__ */ Object.create(null)]), emptyParam];
    } else {
      j++;
    }
    let paramAssoc;
    try {
      paramAssoc = trie.insert(path, j, pathErrorCheckOnly);
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path) : e;
    }
    if (pathErrorCheckOnly) {
      continue;
    }
    handlerData[j] = handlers.map(([h, paramCount]) => {
      const paramIndexMap = /* @__PURE__ */ Object.create(null);
      paramCount -= 1;
      for (; paramCount >= 0; paramCount--) {
        const [key, value] = paramAssoc[paramCount];
        paramIndexMap[key] = value;
      }
      return [h, paramIndexMap];
    });
  }
  const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
  for (let i = 0, len = handlerData.length; i < len; i++) {
    for (let j = 0, len2 = handlerData[i].length; j < len2; j++) {
      const map = handlerData[i][j]?.[1];
      if (!map) {
        continue;
      }
      const keys = Object.keys(map);
      for (let k = 0, len3 = keys.length; k < len3; k++) {
        map[keys[k]] = paramReplacementMap[map[keys[k]]];
      }
    }
  }
  const handlerMap = [];
  for (const i in indexReplacementMap) {
    handlerMap[i] = handlerData[indexReplacementMap[i]];
  }
  return [regexp, handlerMap, staticMap];
}
__name(buildMatcherFromPreprocessedRoutes, "buildMatcherFromPreprocessedRoutes");
function findMiddleware(middleware, path) {
  if (!middleware) {
    return void 0;
  }
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
__name(findMiddleware, "findMiddleware");
var RegExpRouter = /* @__PURE__ */ __name(class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
    this.#routes = { [METHOD_NAME_ALL]: /* @__PURE__ */ Object.create(null) };
  }
  add(method, path, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware || !routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      ;
      [middleware, routes].forEach((handlerMap) => {
        handlerMap[method] = /* @__PURE__ */ Object.create(null);
        Object.keys(handlerMap[METHOD_NAME_ALL]).forEach((p) => {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
        });
      });
    }
    if (path === "/*") {
      path = "*";
    }
    const paramCount = (path.match(/\/:/g) || []).length;
    if (/\*$/.test(path)) {
      const re = buildWildcardRegExp(path);
      if (method === METHOD_NAME_ALL) {
        Object.keys(middleware).forEach((m) => {
          middleware[m][path] ||= findMiddleware(middleware[m], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
        });
      } else {
        middleware[method][path] ||= findMiddleware(middleware[method], path) || findMiddleware(middleware[METHOD_NAME_ALL], path) || [];
      }
      Object.keys(middleware).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(middleware[m]).forEach((p) => {
            re.test(p) && middleware[m][p].push([handler, paramCount]);
          });
        }
      });
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          Object.keys(routes[m]).forEach(
            (p) => re.test(p) && routes[m][p].push([handler, paramCount])
          );
        }
      });
      return;
    }
    const paths = checkOptionalParameter(path) || [path];
    for (let i = 0, len = paths.length; i < len; i++) {
      const path2 = paths[i];
      Object.keys(routes).forEach((m) => {
        if (method === METHOD_NAME_ALL || method === m) {
          routes[m][path2] ||= [
            ...findMiddleware(middleware[m], path2) || findMiddleware(middleware[METHOD_NAME_ALL], path2) || []
          ];
          routes[m][path2].push([handler, paramCount - len + i + 1]);
        }
      });
    }
  }
  match(method, path) {
    clearWildcardRegExpCache();
    const matchers = this.#buildAllMatchers();
    this.match = (method2, path2) => {
      const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
      const staticMatch = matcher[2][path2];
      if (staticMatch) {
        return staticMatch;
      }
      const match = path2.match(matcher[0]);
      if (!match) {
        return [[], emptyParam];
      }
      const index = match.indexOf("", 1);
      return [matcher[1][index], match];
    };
    return this.match(method, path);
  }
  #buildAllMatchers() {
    const matchers = /* @__PURE__ */ Object.create(null);
    Object.keys(this.#routes).concat(Object.keys(this.#middleware)).forEach((method) => {
      matchers[method] ||= this.#buildMatcher(method);
    });
    this.#middleware = this.#routes = void 0;
    return matchers;
  }
  #buildMatcher(method) {
    const routes = [];
    let hasOwnRoute = method === METHOD_NAME_ALL;
    [this.#middleware, this.#routes].forEach((r) => {
      const ownRoute = r[method] ? Object.keys(r[method]).map((path) => [path, r[method][path]]) : [];
      if (ownRoute.length !== 0) {
        hasOwnRoute ||= true;
        routes.push(...ownRoute);
      } else if (method !== METHOD_NAME_ALL) {
        routes.push(
          ...Object.keys(r[METHOD_NAME_ALL]).map((path) => [path, r[METHOD_NAME_ALL][path]])
        );
      }
    });
    if (!hasOwnRoute) {
      return null;
    } else {
      return buildMatcherFromPreprocessedRoutes(routes);
    }
  }
}, "RegExpRouter");

// ../../node_modules/hono/dist/router/smart-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/router/smart-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var SmartRouter = /* @__PURE__ */ __name(class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init2) {
    this.#routers = init2.routers;
  }
  add(method, path, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path, handler]);
  }
  match(method, path) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
}, "SmartRouter");

// ../../node_modules/hono/dist/router/trie-router/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/router/trie-router/router.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/router/trie-router/node.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var emptyParams = /* @__PURE__ */ Object.create(null);
var Node2 = /* @__PURE__ */ __name(class {
  #methods;
  #children;
  #patterns;
  #order = 0;
  #params = emptyParams;
  constructor(method, handler, children) {
    this.#children = children || /* @__PURE__ */ Object.create(null);
    this.#methods = [];
    if (method && handler) {
      const m = /* @__PURE__ */ Object.create(null);
      m[method] = { handler, possibleKeys: [], score: 0 };
      this.#methods = [m];
    }
    this.#patterns = [];
  }
  insert(method, path, handler) {
    this.#order = ++this.#order;
    let curNode = this;
    const parts = splitRoutingPath(path);
    const possibleKeys = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const p = parts[i];
      const nextP = parts[i + 1];
      const pattern = getPattern(p, nextP);
      const key = Array.isArray(pattern) ? pattern[0] : p;
      if (Object.keys(curNode.#children).includes(key)) {
        curNode = curNode.#children[key];
        const pattern2 = getPattern(p, nextP);
        if (pattern2) {
          possibleKeys.push(pattern2[1]);
        }
        continue;
      }
      curNode.#children[key] = new Node2();
      if (pattern) {
        curNode.#patterns.push(pattern);
        possibleKeys.push(pattern[1]);
      }
      curNode = curNode.#children[key];
    }
    const m = /* @__PURE__ */ Object.create(null);
    const handlerSet = {
      handler,
      possibleKeys: possibleKeys.filter((v, i, a) => a.indexOf(v) === i),
      score: this.#order
    };
    m[method] = handlerSet;
    curNode.#methods.push(m);
    return curNode;
  }
  #getHandlerSets(node, method, nodeParams, params) {
    const handlerSets = [];
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      const processedSet = {};
      if (handlerSet !== void 0) {
        handlerSet.params = /* @__PURE__ */ Object.create(null);
        handlerSets.push(handlerSet);
        if (nodeParams !== emptyParams || params && params !== emptyParams) {
          for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
            const key = handlerSet.possibleKeys[i2];
            const processed = processedSet[handlerSet.score];
            handlerSet.params[key] = params?.[key] && !processed ? params[key] : nodeParams[key] ?? params?.[key];
            processedSet[handlerSet.score] = true;
          }
        }
      }
    }
    return handlerSets;
  }
  search(method, path) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path);
    const curNodesQueue = [];
    for (let i = 0, len = parts.length; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              handlerSets.push(
                ...this.#getHandlerSets(nextNode.#children["*"], method, node.#params)
              );
            }
            handlerSets.push(...this.#getHandlerSets(nextNode, method, node.#params));
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (let k = 0, len3 = node.#patterns.length; k < len3; k++) {
          const pattern = node.#patterns[k];
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (pattern === "*") {
            const astNode = node.#children["*"];
            if (astNode) {
              handlerSets.push(...this.#getHandlerSets(astNode, method, node.#params));
              astNode.#params = params;
              tempNodes.push(astNode);
            }
            continue;
          }
          if (part === "") {
            continue;
          }
          const [key, name2, matcher] = pattern;
          const child = node.#children[key];
          const restPathString = parts.slice(i).join("/");
          if (matcher instanceof RegExp) {
            const m = matcher.exec(restPathString);
            if (m) {
              params[name2] = m[0];
              handlerSets.push(...this.#getHandlerSets(child, method, node.#params, params));
              if (Object.keys(child.#children).length) {
                child.#params = params;
                const componentCount = m[0].match(/\//)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name2] = part;
            if (isLast) {
              handlerSets.push(...this.#getHandlerSets(child, method, params, node.#params));
              if (child.#children["*"]) {
                handlerSets.push(
                  ...this.#getHandlerSets(child.#children["*"], method, params, node.#params)
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      curNodes = tempNodes.concat(curNodesQueue.shift() ?? []);
    }
    if (handlerSets.length > 1) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
}, "Node");

// ../../node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = /* @__PURE__ */ __name(class {
  name = "TrieRouter";
  #node;
  constructor() {
    this.#node = new Node2();
  }
  add(method, path, handler) {
    const results = checkOptionalParameter(path);
    if (results) {
      for (let i = 0, len = results.length; i < len; i++) {
        this.#node.insert(method, results[i], handler);
      }
      return;
    }
    this.#node.insert(method, path, handler);
  }
  match(method, path) {
    return this.#node.search(method, path);
  }
}, "TrieRouter");

// ../../node_modules/hono/dist/hono.js
var Hono2 = /* @__PURE__ */ __name(class extends Hono {
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
}, "Hono");

// ../../node_modules/hono/dist/middleware/cors/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var cors = /* @__PURE__ */ __name((options) => {
  const defaults2 = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"],
    allowHeaders: [],
    exposeHeaders: []
  };
  const opts = {
    ...defaults2,
    ...options
  };
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  return /* @__PURE__ */ __name(async function cors2(c, next) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    __name(set, "set");
    const allowOrigin = findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.origin !== "*") {
      const existingVary = c.req.header("Vary");
      if (existingVary) {
        set("Vary", existingVary);
      } else {
        set("Vary", "Origin");
      }
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (opts.exposeHeaders?.length) {
      set("Access-Control-Expose-Headers", opts.exposeHeaders.join(","));
    }
    if (c.req.method === "OPTIONS") {
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      if (opts.allowMethods?.length) {
        set("Access-Control-Allow-Methods", opts.allowMethods.join(","));
      }
      let headers = opts.allowHeaders;
      if (!headers?.length) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headers = requestHeaders.split(/\s*,\s*/);
        }
      }
      if (headers?.length) {
        set("Access-Control-Allow-Headers", headers.join(","));
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next();
  }, "cors2");
}, "cors");

// ../../node_modules/hono/dist/middleware/logger/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/hono/dist/utils/color.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function getColorEnabled() {
  const { process: process2, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== void 0 ? "NO_COLOR" in process2?.env : false;
  return !isNoColor;
}
__name(getColorEnabled, "getColorEnabled");

// ../../node_modules/hono/dist/middleware/logger/index.js
var humanize = /* @__PURE__ */ __name((times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
}, "humanize");
var time3 = /* @__PURE__ */ __name((start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
}, "time");
var colorStatus = /* @__PURE__ */ __name((status) => {
  const colorEnabled = getColorEnabled();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
}, "colorStatus");
function log3(fn, prefix, method, path, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path}` : `${prefix} ${method} ${path} ${colorStatus(status)} ${elapsed}`;
  fn(out);
}
__name(log3, "log");
var logger = /* @__PURE__ */ __name((fn = console.log) => {
  return /* @__PURE__ */ __name(async function logger2(c, next) {
    const { method, url } = c.req;
    const path = url.slice(url.indexOf("/", 8));
    log3(fn, "<--", method, path);
    const start = Date.now();
    await next();
    log3(fn, "-->", method, path, c.res.status, time3(start));
  }, "logger2");
}, "logger");

// src/index.ts
var import_svix = __toESM(require_dist(), 1);

// src/middleware/db.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/@prisma/adapter-pg/dist/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/@prisma/driver-adapter-utils/dist/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();

// ../../node_modules/@prisma/debug/dist/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __defProp2 = Object.defineProperty;
var __export2 = /* @__PURE__ */ __name((target, all) => {
  for (var name2 in all)
    __defProp2(target, name2, { get: all[name2], enumerable: true });
}, "__export");
var colors_exports = {};
__export2(colors_exports, {
  $: () => $,
  bgBlack: () => bgBlack,
  bgBlue: () => bgBlue,
  bgCyan: () => bgCyan,
  bgGreen: () => bgGreen,
  bgMagenta: () => bgMagenta,
  bgRed: () => bgRed,
  bgWhite: () => bgWhite,
  bgYellow: () => bgYellow,
  black: () => black,
  blue: () => blue,
  bold: () => bold,
  cyan: () => cyan,
  dim: () => dim,
  gray: () => gray,
  green: () => green,
  grey: () => grey,
  hidden: () => hidden,
  inverse: () => inverse,
  italic: () => italic,
  magenta: () => magenta,
  red: () => red,
  reset: () => reset,
  strikethrough: () => strikethrough,
  underline: () => underline,
  white: () => white,
  yellow: () => yellow
});
var FORCE_COLOR;
var NODE_DISABLE_COLORS;
var NO_COLOR;
var TERM;
var isTTY = true;
if (typeof process !== "undefined") {
  ({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
  isTTY = process.stdout && process.stdout.isTTY;
}
var $ = {
  enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== "dumb" && (FORCE_COLOR != null && FORCE_COLOR !== "0" || isTTY)
};
function init(x, y) {
  let rgx = new RegExp(`\\x1b\\[${y}m`, "g");
  let open3 = `\x1B[${x}m`, close2 = `\x1B[${y}m`;
  return function(txt) {
    if (!$.enabled || txt == null)
      return txt;
    return open3 + (!!~("" + txt).indexOf(close2) ? txt.replace(rgx, close2 + open3) : txt) + close2;
  };
}
__name(init, "init");
var reset = init(0, 0);
var bold = init(1, 22);
var dim = init(2, 22);
var italic = init(3, 23);
var underline = init(4, 24);
var inverse = init(7, 27);
var hidden = init(8, 28);
var strikethrough = init(9, 29);
var black = init(30, 39);
var red = init(31, 39);
var green = init(32, 39);
var yellow = init(33, 39);
var blue = init(34, 39);
var magenta = init(35, 39);
var cyan = init(36, 39);
var white = init(37, 39);
var gray = init(90, 39);
var grey = init(90, 39);
var bgBlack = init(40, 49);
var bgRed = init(41, 49);
var bgGreen = init(42, 49);
var bgYellow = init(43, 49);
var bgBlue = init(44, 49);
var bgMagenta = init(45, 49);
var bgCyan = init(46, 49);
var bgWhite = init(47, 49);
var MAX_ARGS_HISTORY = 100;
var COLORS = ["green", "yellow", "blue", "magenta", "cyan", "red"];
var argsHistory = [];
var lastTimestamp = Date.now();
var lastColor = 0;
var processEnv = typeof process !== "undefined" ? process.env : {};
globalThis.DEBUG ??= processEnv.DEBUG ?? "";
globalThis.DEBUG_COLORS ??= processEnv.DEBUG_COLORS ? processEnv.DEBUG_COLORS === "true" : true;
var topProps = {
  enable(namespace) {
    if (typeof namespace === "string") {
      globalThis.DEBUG = namespace;
    }
  },
  disable() {
    const prev = globalThis.DEBUG;
    globalThis.DEBUG = "";
    return prev;
  },
  // this is the core logic to check if logging should happen or not
  enabled(namespace) {
    const listenedNamespaces = globalThis.DEBUG.split(",").map((s) => {
      return s.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    });
    const isListened = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] === "-")
        return false;
      return namespace.match(RegExp(listenedNamespace.split("*").join(".*") + "$"));
    });
    const isExcluded = listenedNamespaces.some((listenedNamespace) => {
      if (listenedNamespace === "" || listenedNamespace[0] !== "-")
        return false;
      return namespace.match(RegExp(listenedNamespace.slice(1).split("*").join(".*") + "$"));
    });
    return isListened && !isExcluded;
  },
  log: (...args) => {
    const [namespace, format2, ...rest] = args;
    const logWithFormatting = console.warn ?? console.log;
    logWithFormatting(`${namespace} ${format2}`, ...rest);
  },
  formatters: {}
  // not implemented
};
function debugCreate(namespace) {
  const instanceProps = {
    color: COLORS[lastColor++ % COLORS.length],
    enabled: topProps.enabled(namespace),
    namespace,
    log: topProps.log,
    extend: () => {
    }
    // not implemented
  };
  const debugCall = /* @__PURE__ */ __name((...args) => {
    const { enabled, namespace: namespace2, color, log: log5 } = instanceProps;
    if (args.length !== 0) {
      argsHistory.push([namespace2, ...args]);
    }
    if (argsHistory.length > MAX_ARGS_HISTORY) {
      argsHistory.shift();
    }
    if (topProps.enabled(namespace2) || enabled) {
      const stringArgs = args.map((arg) => {
        if (typeof arg === "string") {
          return arg;
        }
        return safeStringify(arg);
      });
      const ms = `+${Date.now() - lastTimestamp}ms`;
      lastTimestamp = Date.now();
      if (globalThis.DEBUG_COLORS) {
        log5(colors_exports[color](bold(namespace2)), ...stringArgs, colors_exports[color](ms));
      } else {
        log5(namespace2, ...stringArgs, ms);
      }
    }
  }, "debugCall");
  return new Proxy(debugCall, {
    get: (_, prop) => instanceProps[prop],
    set: (_, prop, value) => instanceProps[prop] = value
  });
}
__name(debugCreate, "debugCreate");
var Debug2 = new Proxy(debugCreate, {
  get: (_, prop) => topProps[prop],
  set: (_, prop, value) => topProps[prop] = value
});
function safeStringify(value, indent = 2) {
  const cache = /* @__PURE__ */ new Set();
  return JSON.stringify(
    value,
    (key, value2) => {
      if (typeof value2 === "object" && value2 !== null) {
        if (cache.has(value2)) {
          return `[Circular *]`;
        }
        cache.add(value2);
      } else if (typeof value2 === "bigint") {
        return value2.toString();
      }
      return value2;
    },
    indent
  );
}
__name(safeStringify, "safeStringify");

// ../../node_modules/@prisma/driver-adapter-utils/dist/index.mjs
var DriverAdapterError = /* @__PURE__ */ __name(class extends Error {
  name = "DriverAdapterError";
  cause;
  constructor(payload) {
    super(typeof payload["message"] === "string" ? payload["message"] : payload.kind);
    this.cause = payload;
  }
}, "DriverAdapterError");
var debug3 = Debug2("driver-adapter-utils");
var ColumnTypeEnum = {
  // Scalars
  Int32: 0,
  Int64: 1,
  Float: 2,
  Double: 3,
  Numeric: 4,
  Boolean: 5,
  Character: 6,
  Text: 7,
  Date: 8,
  Time: 9,
  DateTime: 10,
  Json: 11,
  Enum: 12,
  Bytes: 13,
  Set: 14,
  Uuid: 15,
  // Arrays
  Int32Array: 64,
  Int64Array: 65,
  FloatArray: 66,
  DoubleArray: 67,
  NumericArray: 68,
  BooleanArray: 69,
  CharacterArray: 70,
  TextArray: 71,
  DateArray: 72,
  TimeArray: 73,
  DateTimeArray: 74,
  JsonArray: 75,
  EnumArray: 76,
  BytesArray: 77,
  UuidArray: 78,
  // Custom
  UnknownNumber: 128
};
var mockAdapterErrors = {
  queryRaw: new Error("Not implemented: queryRaw"),
  executeRaw: new Error("Not implemented: executeRaw"),
  startTransaction: new Error("Not implemented: startTransaction"),
  executeScript: new Error("Not implemented: executeScript"),
  dispose: new Error("Not implemented: dispose")
};

// ../../node_modules/pg/esm/index.mjs
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_lib = __toESM(require_lib2(), 1);
var Client = import_lib.default.Client;
var Pool = import_lib.default.Pool;
var Connection = import_lib.default.Connection;
var types3 = import_lib.default.types;
var Query = import_lib.default.Query;
var DatabaseError = import_lib.default.DatabaseError;
var escapeIdentifier = import_lib.default.escapeIdentifier;
var escapeLiteral = import_lib.default.escapeLiteral;
var Result = import_lib.default.Result;
var TypeOverrides = import_lib.default.TypeOverrides;
var defaults = import_lib.default.defaults;
var esm_default = import_lib.default;

// ../../node_modules/@prisma/adapter-pg/dist/index.mjs
var import_postgres_array = __toESM(require_postgres_array2(), 1);
var name = "@prisma/adapter-pg";
var { types: types4 } = esm_default;
var { builtins: ScalarColumnType, getTypeParser } = types4;
var ArrayColumnType = {
  BIT_ARRAY: 1561,
  BOOL_ARRAY: 1e3,
  BYTEA_ARRAY: 1001,
  BPCHAR_ARRAY: 1014,
  CHAR_ARRAY: 1002,
  CIDR_ARRAY: 651,
  DATE_ARRAY: 1182,
  FLOAT4_ARRAY: 1021,
  FLOAT8_ARRAY: 1022,
  INET_ARRAY: 1041,
  INT2_ARRAY: 1005,
  INT4_ARRAY: 1007,
  INT8_ARRAY: 1016,
  JSONB_ARRAY: 3807,
  JSON_ARRAY: 199,
  MONEY_ARRAY: 791,
  NUMERIC_ARRAY: 1231,
  OID_ARRAY: 1028,
  TEXT_ARRAY: 1009,
  TIMESTAMP_ARRAY: 1115,
  TIME_ARRAY: 1183,
  UUID_ARRAY: 2951,
  VARBIT_ARRAY: 1563,
  VARCHAR_ARRAY: 1015,
  XML_ARRAY: 143
};
var _a;
var UnsupportedNativeDataType = (/* @__PURE__ */ __name(_a = class extends Error {
  type;
  constructor(code) {
    super();
    this.type = _a.typeNames[code] || "Unknown";
    this.message = `Unsupported column type ${this.type}`;
  }
}, "_UnsupportedNativeDataType"), // map of type codes to type names
__publicField(_a, "typeNames", {
  16: "bool",
  17: "bytea",
  18: "char",
  19: "name",
  20: "int8",
  21: "int2",
  22: "int2vector",
  23: "int4",
  24: "regproc",
  25: "text",
  26: "oid",
  27: "tid",
  28: "xid",
  29: "cid",
  30: "oidvector",
  32: "pg_ddl_command",
  71: "pg_type",
  75: "pg_attribute",
  81: "pg_proc",
  83: "pg_class",
  114: "json",
  142: "xml",
  194: "pg_node_tree",
  269: "table_am_handler",
  325: "index_am_handler",
  600: "point",
  601: "lseg",
  602: "path",
  603: "box",
  604: "polygon",
  628: "line",
  650: "cidr",
  700: "float4",
  701: "float8",
  705: "unknown",
  718: "circle",
  774: "macaddr8",
  790: "money",
  829: "macaddr",
  869: "inet",
  1033: "aclitem",
  1042: "bpchar",
  1043: "varchar",
  1082: "date",
  1083: "time",
  1114: "timestamp",
  1184: "timestamptz",
  1186: "interval",
  1266: "timetz",
  1560: "bit",
  1562: "varbit",
  1700: "numeric",
  1790: "refcursor",
  2202: "regprocedure",
  2203: "regoper",
  2204: "regoperator",
  2205: "regclass",
  2206: "regtype",
  2249: "record",
  2275: "cstring",
  2276: "any",
  2277: "anyarray",
  2278: "void",
  2279: "trigger",
  2280: "language_handler",
  2281: "internal",
  2283: "anyelement",
  2287: "_record",
  2776: "anynonarray",
  2950: "uuid",
  2970: "txid_snapshot",
  3115: "fdw_handler",
  3220: "pg_lsn",
  3310: "tsm_handler",
  3361: "pg_ndistinct",
  3402: "pg_dependencies",
  3500: "anyenum",
  3614: "tsvector",
  3615: "tsquery",
  3642: "gtsvector",
  3734: "regconfig",
  3769: "regdictionary",
  3802: "jsonb",
  3831: "anyrange",
  3838: "event_trigger",
  3904: "int4range",
  3906: "numrange",
  3908: "tsrange",
  3910: "tstzrange",
  3912: "daterange",
  3926: "int8range",
  4072: "jsonpath",
  4089: "regnamespace",
  4096: "regrole",
  4191: "regcollation",
  4451: "int4multirange",
  4532: "nummultirange",
  4533: "tsmultirange",
  4534: "tstzmultirange",
  4535: "datemultirange",
  4536: "int8multirange",
  4537: "anymultirange",
  4538: "anycompatiblemultirange",
  4600: "pg_brin_bloom_summary",
  4601: "pg_brin_minmax_multi_summary",
  5017: "pg_mcv_list",
  5038: "pg_snapshot",
  5069: "xid8",
  5077: "anycompatible",
  5078: "anycompatiblearray",
  5079: "anycompatiblenonarray",
  5080: "anycompatiblerange"
}), _a);
function fieldToColumnType(fieldTypeId) {
  switch (fieldTypeId) {
    case ScalarColumnType.INT2:
    case ScalarColumnType.INT4:
      return ColumnTypeEnum.Int32;
    case ScalarColumnType.INT8:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.FLOAT4:
      return ColumnTypeEnum.Float;
    case ScalarColumnType.FLOAT8:
      return ColumnTypeEnum.Double;
    case ScalarColumnType.BOOL:
      return ColumnTypeEnum.Boolean;
    case ScalarColumnType.DATE:
      return ColumnTypeEnum.Date;
    case ScalarColumnType.TIME:
    case ScalarColumnType.TIMETZ:
      return ColumnTypeEnum.Time;
    case ScalarColumnType.TIMESTAMP:
    case ScalarColumnType.TIMESTAMPTZ:
      return ColumnTypeEnum.DateTime;
    case ScalarColumnType.NUMERIC:
    case ScalarColumnType.MONEY:
      return ColumnTypeEnum.Numeric;
    case ScalarColumnType.JSON:
    case ScalarColumnType.JSONB:
      return ColumnTypeEnum.Json;
    case ScalarColumnType.UUID:
      return ColumnTypeEnum.Uuid;
    case ScalarColumnType.OID:
      return ColumnTypeEnum.Int64;
    case ScalarColumnType.BPCHAR:
    case ScalarColumnType.TEXT:
    case ScalarColumnType.VARCHAR:
    case ScalarColumnType.BIT:
    case ScalarColumnType.VARBIT:
    case ScalarColumnType.INET:
    case ScalarColumnType.CIDR:
    case ScalarColumnType.XML:
      return ColumnTypeEnum.Text;
    case ScalarColumnType.BYTEA:
      return ColumnTypeEnum.Bytes;
    case ArrayColumnType.INT2_ARRAY:
    case ArrayColumnType.INT4_ARRAY:
      return ColumnTypeEnum.Int32Array;
    case ArrayColumnType.FLOAT4_ARRAY:
      return ColumnTypeEnum.FloatArray;
    case ArrayColumnType.FLOAT8_ARRAY:
      return ColumnTypeEnum.DoubleArray;
    case ArrayColumnType.NUMERIC_ARRAY:
    case ArrayColumnType.MONEY_ARRAY:
      return ColumnTypeEnum.NumericArray;
    case ArrayColumnType.BOOL_ARRAY:
      return ColumnTypeEnum.BooleanArray;
    case ArrayColumnType.CHAR_ARRAY:
      return ColumnTypeEnum.CharacterArray;
    case ArrayColumnType.BPCHAR_ARRAY:
    case ArrayColumnType.TEXT_ARRAY:
    case ArrayColumnType.VARCHAR_ARRAY:
    case ArrayColumnType.VARBIT_ARRAY:
    case ArrayColumnType.BIT_ARRAY:
    case ArrayColumnType.INET_ARRAY:
    case ArrayColumnType.CIDR_ARRAY:
    case ArrayColumnType.XML_ARRAY:
      return ColumnTypeEnum.TextArray;
    case ArrayColumnType.DATE_ARRAY:
      return ColumnTypeEnum.DateArray;
    case ArrayColumnType.TIME_ARRAY:
      return ColumnTypeEnum.TimeArray;
    case ArrayColumnType.TIMESTAMP_ARRAY:
      return ColumnTypeEnum.DateTimeArray;
    case ArrayColumnType.JSON_ARRAY:
    case ArrayColumnType.JSONB_ARRAY:
      return ColumnTypeEnum.JsonArray;
    case ArrayColumnType.BYTEA_ARRAY:
      return ColumnTypeEnum.BytesArray;
    case ArrayColumnType.UUID_ARRAY:
      return ColumnTypeEnum.UuidArray;
    case ArrayColumnType.INT8_ARRAY:
    case ArrayColumnType.OID_ARRAY:
      return ColumnTypeEnum.Int64Array;
    default:
      if (fieldTypeId >= 1e4) {
        return ColumnTypeEnum.Text;
      }
      throw new UnsupportedNativeDataType(fieldTypeId);
  }
}
__name(fieldToColumnType, "fieldToColumnType");
function normalize_array(element_normalizer) {
  return (str) => (0, import_postgres_array.parse)(str, element_normalizer);
}
__name(normalize_array, "normalize_array");
function normalize_numeric(numeric) {
  return numeric;
}
__name(normalize_numeric, "normalize_numeric");
function normalize_date(date) {
  return date;
}
__name(normalize_date, "normalize_date");
function normalize_timestamp(time4) {
  return (/* @__PURE__ */ new Date(`${time4}Z`)).toISOString().replace(/(\.000)?Z$/, "+00:00");
}
__name(normalize_timestamp, "normalize_timestamp");
function normalize_timestampz(time4) {
  return new Date(time4.replace(/[+-]\d{2}(:\d{2})?$/, "Z")).toISOString().replace(/(\.000)?Z$/, "+00:00");
}
__name(normalize_timestampz, "normalize_timestampz");
function normalize_time(time4) {
  return time4;
}
__name(normalize_time, "normalize_time");
function normalize_timez(time4) {
  return time4.replace(/[+-]\d{2}(:\d{2})?$/, "");
}
__name(normalize_timez, "normalize_timez");
function normalize_money(money) {
  return money.slice(1);
}
__name(normalize_money, "normalize_money");
function normalize_xml(xml) {
  return xml;
}
__name(normalize_xml, "normalize_xml");
function toJson(json) {
  return json;
}
__name(toJson, "toJson");
function encodeBuffer(buffer) {
  return Array.from(new Uint8Array(buffer));
}
__name(encodeBuffer, "encodeBuffer");
var parsePgBytes = getTypeParser(ScalarColumnType.BYTEA);
var parseBytesArray = getTypeParser(ArrayColumnType.BYTEA_ARRAY);
function normalizeByteaArray(serializedBytesArray) {
  const buffers = parseBytesArray(serializedBytesArray);
  return buffers.map((buf) => buf ? encodeBuffer(buf) : null);
}
__name(normalizeByteaArray, "normalizeByteaArray");
function convertBytes(serializedBytes) {
  const buffer = parsePgBytes(serializedBytes);
  return encodeBuffer(buffer);
}
__name(convertBytes, "convertBytes");
function normalizeBit(bit) {
  return bit;
}
__name(normalizeBit, "normalizeBit");
var customParsers = {
  [ScalarColumnType.NUMERIC]: normalize_numeric,
  [ArrayColumnType.NUMERIC_ARRAY]: normalize_array(normalize_numeric),
  [ScalarColumnType.TIME]: normalize_time,
  [ArrayColumnType.TIME_ARRAY]: normalize_array(normalize_time),
  [ScalarColumnType.TIMETZ]: normalize_timez,
  [ScalarColumnType.DATE]: normalize_date,
  [ArrayColumnType.DATE_ARRAY]: normalize_array(normalize_date),
  [ScalarColumnType.TIMESTAMP]: normalize_timestamp,
  [ArrayColumnType.TIMESTAMP_ARRAY]: normalize_array(normalize_timestamp),
  [ScalarColumnType.TIMESTAMPTZ]: normalize_timestampz,
  [ScalarColumnType.MONEY]: normalize_money,
  [ArrayColumnType.MONEY_ARRAY]: normalize_array(normalize_money),
  [ScalarColumnType.JSON]: toJson,
  [ScalarColumnType.JSONB]: toJson,
  [ScalarColumnType.BYTEA]: convertBytes,
  [ArrayColumnType.BYTEA_ARRAY]: normalizeByteaArray,
  [ArrayColumnType.BIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.VARBIT_ARRAY]: normalize_array(normalizeBit),
  [ArrayColumnType.XML_ARRAY]: normalize_array(normalize_xml)
};
function fixArrayBufferValues(values) {
  for (let i = 0; i < values.length; i++) {
    const list = values[i];
    if (!Array.isArray(list)) {
      continue;
    }
    for (let j = 0; j < list.length; j++) {
      const listItem = list[j];
      if (ArrayBuffer.isView(listItem)) {
        list[j] = Buffer.from(listItem.buffer, listItem.byteOffset, listItem.byteLength);
      }
    }
  }
  return values;
}
__name(fixArrayBufferValues, "fixArrayBufferValues");
function convertDriverError(error3) {
  if (!isDbError(error3)) {
    throw error3;
  }
  switch (error3.code) {
    case "22001":
      return {
        kind: "LengthMismatch",
        column: error3.column
      };
    case "23505":
      return {
        kind: "UniqueConstraintViolation",
        fields: error3.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ") ?? []
      };
    case "23502":
      return {
        kind: "NullConstraintViolation",
        fields: error3.detail?.match(/Key \(([^)]+)\)/)?.at(1)?.split(", ") ?? []
      };
    case "23503": {
      let constraint;
      if (error3.column) {
        constraint = { fields: [error3.column] };
      } else if (error3.constraint) {
        constraint = { index: error3.constraint };
      }
      return {
        kind: "ForeignKeyConstraintViolation",
        constraint
      };
    }
    case "3D000":
      return {
        kind: "DatabaseDoesNotExist",
        db: error3.message.split(" ").at(1)?.split('"').at(1)
      };
    case "28000":
      return {
        kind: "DatabaseAccessDenied",
        db: error3.message.split(" ").at(5)?.split('"').at(1)
      };
    case "28P01":
      return {
        kind: "AuthenticationFailed",
        user: error3.message.split(" ").pop()?.split('"').at(1)
      };
    case "40001":
      return {
        kind: "TransactionWriteConflict"
      };
    case "42P01":
      return {
        kind: "TableDoesNotExist",
        table: error3.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42703":
      return {
        kind: "ColumnNotFound",
        column: error3.message.split(" ").at(1)?.split('"').at(1)
      };
    case "42P04":
      return {
        kind: "DatabaseAlreadyExists",
        db: error3.message.split(" ").at(1)?.split('"').at(1)
      };
    case "53300":
      return {
        kind: "TooManyConnections",
        cause: error3.message
      };
    default:
      return {
        kind: "postgres",
        code: error3.code ?? "N/A",
        severity: error3.severity ?? "N/A",
        message: error3.message,
        detail: error3.detail,
        column: error3.column,
        hint: error3.hint
      };
  }
}
__name(convertDriverError, "convertDriverError");
function isDbError(error3) {
  return typeof error3.code === "string" && typeof error3.message === "string" && typeof error3.severity === "string" && (typeof error3.detail === "string" || error3.detail === void 0) && (typeof error3.column === "string" || error3.column === void 0) && (typeof error3.hint === "string" || error3.hint === void 0);
}
__name(isDbError, "isDbError");
var types22 = esm_default.types;
var debug5 = Debug2("prisma:driver-adapter:pg");
var PgQueryable = /* @__PURE__ */ __name(class {
  constructor(client) {
    this.client = client;
  }
  provider = "postgres";
  adapterName = name;
  /**
   * Execute a query given as SQL, interpolating the given parameters.
   */
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug5(`${tag} %O`, query);
    const { fields, rows } = await this.performIO(query);
    const columnNames = fields.map((field) => field.name);
    let columnTypes = [];
    try {
      columnTypes = fields.map((field) => fieldToColumnType(field.dataTypeID));
    } catch (e) {
      if (e instanceof UnsupportedNativeDataType) {
        throw new DriverAdapterError({
          kind: "UnsupportedNativeDataType",
          type: e.type
        });
      }
      throw e;
    }
    return {
      columnNames,
      columnTypes,
      rows
    };
  }
  /**
   * Execute a query given as SQL, interpolating the given parameters and
   * returning the number of affected rows.
   * Note: Queryable expects a u64, but napi.rs only supports u32.
   */
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug5(`${tag} %O`, query);
    return (await this.performIO(query)).rowCount ?? 0;
  }
  /**
   * Run a query against the database, returning the result set.
   * Should the query fail due to a connection error, the connection is
   * marked as unhealthy.
   */
  async performIO(query) {
    const { sql, args: values } = query;
    try {
      const result = await this.client.query(
        {
          text: sql,
          values: fixArrayBufferValues(values),
          rowMode: "array",
          types: {
            // This is the error expected:
            // No overload matches this call.
            // The last overload gave the following error.
            // Type '(oid: number, format?: any) => (json: string) => unknown' is not assignable to type '{ <T>(oid: number): TypeParser<string, string | T>; <T>(oid: number, format: "text"): TypeParser<string, string | T>; <T>(oid: number, format: "binary"): TypeParser<...>; }'.
            //   Type '(json: string) => unknown' is not assignable to type 'TypeParser<Buffer, any>'.
            //     Types of parameters 'json' and 'value' are incompatible.
            //       Type 'Buffer' is not assignable to type 'string'.ts(2769)
            //
            // Because pg-types types expect us to handle both binary and text protocol versions,
            // where as far we can see, pg will ever pass only text version.
            //
            // @ts-expect-error
            getTypeParser: (oid, format2) => {
              if (format2 === "text" && customParsers[oid]) {
                return customParsers[oid];
              }
              return types22.getTypeParser(oid, format2);
            }
          }
        },
        fixArrayBufferValues(values)
      );
      return result;
    } catch (e) {
      this.onError(e);
    }
  }
  onError(error3) {
    debug5("Error in performIO: %O", error3);
    throw new DriverAdapterError(convertDriverError(error3));
  }
}, "PgQueryable");
var PgTransaction = /* @__PURE__ */ __name(class extends PgQueryable {
  constructor(client, options) {
    super(client);
    this.options = options;
  }
  async commit() {
    debug5(`[js::commit]`);
    this.client.release();
  }
  async rollback() {
    debug5(`[js::rollback]`);
    this.client.release();
  }
}, "PgTransaction");
var PrismaPgAdapter = /* @__PURE__ */ __name(class extends PgQueryable {
  constructor(client, options, release2) {
    super(client);
    this.options = options;
    this.release = release2;
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: false
    };
    const tag = "[js::startTransaction]";
    debug5("%s options: %O", tag, options);
    const conn = await this.client.connect().catch((error3) => this.onError(error3));
    try {
      const tx = new PgTransaction(conn, options);
      await tx.executeRaw({ sql: "BEGIN", args: [], argTypes: [] });
      if (isolationLevel) {
        await tx.executeRaw({
          sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
          args: [],
          argTypes: []
        });
      }
      return tx;
    } catch (error3) {
      conn.release(error3);
      this.onError(error3);
    }
  }
  async executeScript(script) {
    for (const stmt of script.split(";")) {
      try {
        await this.client.query(stmt);
      } catch (error3) {
        this.onError(error3);
      }
    }
  }
  getConnectionInfo() {
    return {
      schemaName: this.options?.schema
    };
  }
  async dispose() {
    await this.release?.();
    return await this.client.end();
  }
}, "PrismaPgAdapter");
var PrismaPgAdapterFactory = /* @__PURE__ */ __name(class {
  constructor(config2, options) {
    this.config = config2;
    this.options = options;
  }
  provider = "postgres";
  adapterName = name;
  async connect() {
    return new PrismaPgAdapter(new esm_default.Pool(this.config), this.options, async () => {
    });
  }
  async connectToShadowDb() {
    const conn = await this.connect();
    const database = `prisma_migrate_shadow_db_${globalThis.crypto.randomUUID()}`;
    await conn.executeScript(`CREATE DATABASE "${database}"`);
    return new PrismaPgAdapter(new esm_default.Pool({ ...this.config, database }), void 0, async () => {
      await conn.executeScript(`DROP DATABASE "${database}"`);
    });
  }
}, "PrismaPgAdapterFactory");

// ../../node_modules/hono/dist/helper/factory/index.js
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var createMiddleware = /* @__PURE__ */ __name((middleware) => middleware, "createMiddleware");

// ../../packages/db/src/index.ts
var src_exports = {};
__export(src_exports, {
  Prisma: () => import_node4.Prisma,
  PrismaClientEdge: () => import_db_edge.PrismaClient,
  db: () => db
});
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
__reExport(src_exports, __toESM(require_index_browser2(), 1));
var import_node4 = __toESM(require_index_browser2(), 1);

// ../../packages/db/src/client.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_db_node = __toESM(require_wasm(), 1);
var prisma;
if (false) {
  console.log("Creating new PrismaClient instance for production");
  prisma = new import_db_node.PrismaClient({
    /* options */
  });
} else {
  if (!global.cachedPrisma) {
    console.log(
      "Creating and caching new PrismaClient instance for development"
    );
    global.cachedPrisma = new import_db_node.PrismaClient({
      /* options */
    });
  }
  prisma = global.cachedPrisma;
}
var db = prisma;

// ../../packages/db/src/edge.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var import_db_edge = __toESM(require_wasm3(), 1);

// src/middleware/db.ts
var prisma2 = /* @__PURE__ */ __name(() => {
  return createMiddleware(async (c, next) => {
    if (!c.get("prisma")) {
      const env2 = c.env;
      try {
        const adapter = new PrismaPgAdapterFactory({ connectionString: env2.DATABASE_URL });
        const prisma3 = new import_db_edge.PrismaClient({ adapter });
        c.set("prisma", prisma3);
      } catch (error3) {
        const err = error3 instanceof Error ? error3 : new Error(String(error3));
        console.error("Error initializing Prisma:", err);
        throw err;
      }
    }
    await next();
  });
}, "prisma");

// src/index.ts
var app = new Hono2();
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"]
  })
);
app.use("/api/*", prisma2());
app.get("/", (c) => c.text("Webhook handler is running"));
app.get("/health", (c) => c.json({ status: "ok" }));
app.get("/api/users", async (c) => {
  const prisma3 = c.get("prisma");
  const users = await prisma3.user.findMany();
  return c.json(users);
});
var verifyClerkWebhook = /* @__PURE__ */ __name(async (c, next) => {
  try {
    const payload = await c.req.json();
    const headers = Object.fromEntries(c.req.raw.headers.entries());
    const svixId = headers["svix-id"];
    const svixTimestamp = headers["svix-timestamp"];
    const svixSignature = headers["svix-signature"];
    if (!svixId || !svixTimestamp || !svixSignature) {
      return c.json({ error: "Missing Svix headers" }, 400);
    }
    const webhookSecret = c.env.CLERK_WEBHOOK_SECRET;
    const wh = new import_svix.Webhook(webhookSecret);
    const evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature
    });
    c.set("webhookEvent", evt);
    await next();
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return c.json({ error: "Webhook verification failed" }, 400);
  }
}, "verifyClerkWebhook");
app.post("/api/webhooks/clerk", verifyClerkWebhook, async (c) => {
  const evt = c.get("webhookEvent");
  const eventType = evt.type;
  const data = evt.data;
  console.log(`Webhook event received: ${eventType}`);
  try {
    const db2 = c.get("prisma");
    switch (eventType) {
      case "user.created": {
        try {
          const user = data;
          const primaryEmail = user.email_addresses?.find(
            (email) => email.id === user.primary_email_address_id
          )?.email_address;
          await db2.user.create({
            data: {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username ?? user.first_name ?? user.last_name,
              primaryEmailAddress: primaryEmail,
              imageUrl: user.image_url,
              clerkUserProperties: user
            }
          });
          console.log(`User created: ${user.id}`);
        } catch (error3) {
          console.error("Error creating user:", error3);
          return c.json({ error: "Failed to create user" }, 500);
        }
        break;
      }
      case "user.updated": {
        try {
          const user = data;
          const primaryEmail = user.email_addresses?.find(
            (email) => email.id === user.primary_email_address_id
          )?.email_address;
          await db2.user.update({
            where: { id: user.id },
            data: {
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username ?? user.first_name ?? user.last_name,
              primaryEmailAddress: primaryEmail,
              imageUrl: user.image_url,
              clerkUserProperties: user
            }
          });
          console.log(`User updated: ${user.id}`);
        } catch (error3) {
          console.error("Error updating user:", error3);
          return c.json({ error: "Failed to update user" }, 500);
        }
        break;
      }
      case "user.deleted": {
        try {
          const user = data;
          await db2.user.delete({
            where: { id: user.id }
          });
          console.log(`User deleted: ${user.id}`);
        } catch (error3) {
          console.error("Error deleting user:", error3);
          return c.json({ error: "Failed to delete user" }, 500);
        }
        break;
      }
      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }
    return c.json({ success: true });
  } catch (error3) {
    console.error(`Error processing webhook event ${eventType}:`, error3);
    return c.json({ error: "Failed to process webhook" }, 500);
  }
});
var src_default = app;

// ../../node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../../node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    return Response.json(error3, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-rZHlhy/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = src_default;

// ../../node_modules/wrangler/templates/middleware/common.ts
init_modules_watch_stub();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-rZHlhy/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*! Bundled license information:

decimal.js/decimal.mjs:
  (*!
   *  decimal.js v10.5.0
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2025 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   *)
*/
//# sourceMappingURL=index.js.map
