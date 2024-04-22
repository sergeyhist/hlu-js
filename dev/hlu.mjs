#!/usr/bin/env zx

// node_modules/zx/build/core.js
import assert from "node:assert";
import { spawn as spawn3, spawnSync as spawnSync3 } from "node:child_process";
import { AsyncLocalStorage, createHook } from "node:async_hooks";
import { inspect } from "node:util";

// node_modules/zx/build/vendor.js
import vt from "node:http";
import Bs from "node:https";
import st from "node:zlib";
import me, { PassThrough as cr, pipeline as lt } from "node:stream";
import { Buffer as M2 } from "node:buffer";
import { types as dr, promisify as ks, deprecate as hr } from "node:util";
import { format as qs } from "node:url";
import { isIP as Os } from "node:net";
import { statSync as ci, createReadStream as zs, promises as Is } from "node:fs";
import { basename as Fs } from "node:path";
import process3 from "node:process";
import fs3 from "node:fs";
import nodePath from "node:path";
import { on, once } from "node:events";
import { PassThrough as PassThroughStream } from "node:stream";
import { finished } from "node:stream/promises";
import fs, { promises as fsPromises } from "fs";
import { fileURLToPath } from "node:url";
import process2 from "node:process";
import fs2 from "node:fs";
import fsPromises2 from "node:fs/promises";
import path from "node:path";
import * as cp from "node:child_process";
import process4 from "node:process";
import EventEmitter from "node:events";
import { Stream as Stream2, Transform } from "node:stream";
import process5 from "node:process";
import os from "node:os";
import tty from "node:tty";
import process7 from "node:process";
import fs4 from "node:fs";
import * as cp2 from "node:child_process";
import process6 from "node:process";
import EventEmitter2 from "node:events";
import { Stream as Stream4, Transform as Transform2 } from "node:stream";
import { EOL as SystemEOL } from "node:os";
var require2 = (await import("node:module")).createRequire(import.meta.url);
var __filename2 = (await import("node:url")).fileURLToPath(import.meta.url);
var __dirname = (await import("node:path")).dirname(__filename2);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x2) => typeof require2 !== "undefined" ? require2 : typeof Proxy !== "undefined" ? new Proxy(x2, {
  get: (a2, b) => (typeof require2 !== "undefined" ? require2 : a2)[b]
}) : x2)(function(x2) {
  if (typeof require2 !== "undefined")
    return require2.apply(this, arguments);
  throw Error('Dynamic require of "' + x2 + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var require_array = __commonJS({
  "node_modules/fast-glob/out/utils/array.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.splitWhen = exports.flatten = void 0;
    function flatten(items) {
      return items.reduce((collection, item) => [].concat(collection, item), []);
    }
    exports.flatten = flatten;
    function splitWhen(items, predicate) {
      const result = [[]];
      let groupIndex = 0;
      for (const item of items) {
        if (predicate(item)) {
          groupIndex++;
          result[groupIndex] = [];
        } else {
          result[groupIndex].push(item);
        }
      }
      return result;
    }
    exports.splitWhen = splitWhen;
  }
});
var require_errno = __commonJS({
  "node_modules/fast-glob/out/utils/errno.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEnoentCodeError = void 0;
    function isEnoentCodeError(error) {
      return error.code === "ENOENT";
    }
    exports.isEnoentCodeError = isEnoentCodeError;
  }
});
var require_fs = __commonJS({
  "node_modules/fast-glob/out/utils/fs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports.createDirentFromStats = createDirentFromStats;
  }
});
var require_path = __commonJS({
  "node_modules/fast-glob/out/utils/path.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertPosixPathToPattern = exports.convertWindowsPathToPattern = exports.convertPathToPattern = exports.escapePosixPath = exports.escapeWindowsPath = exports.escape = exports.removeLeadingDotSegment = exports.makeAbsolute = exports.unixify = void 0;
    var os22 = __require("os");
    var path2 = __require("path");
    var IS_WINDOWS_PLATFORM = os22.platform() === "win32";
    var LEADING_DOT_SEGMENT_CHARACTERS_COUNT = 2;
    var POSIX_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()*?[\]{|}]|^!|[!+@](?=\()|\\(?![!()*+?@[\]{|}]))/g;
    var WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE = /(\\?)([()[\]{}]|^!|[!+@](?=\())/g;
    var DOS_DEVICE_PATH_RE = /^\\\\([.?])/;
    var WINDOWS_BACKSLASHES_RE = /\\(?![!()+@[\]{}])/g;
    function unixify(filepath) {
      return filepath.replace(/\\/g, "/");
    }
    exports.unixify = unixify;
    function makeAbsolute(cwd2, filepath) {
      return path2.resolve(cwd2, filepath);
    }
    exports.makeAbsolute = makeAbsolute;
    function removeLeadingDotSegment(entry) {
      if (entry.charAt(0) === ".") {
        const secondCharactery = entry.charAt(1);
        if (secondCharactery === "/" || secondCharactery === "\\") {
          return entry.slice(LEADING_DOT_SEGMENT_CHARACTERS_COUNT);
        }
      }
      return entry;
    }
    exports.removeLeadingDotSegment = removeLeadingDotSegment;
    exports.escape = IS_WINDOWS_PLATFORM ? escapeWindowsPath : escapePosixPath;
    function escapeWindowsPath(pattern) {
      return pattern.replace(WINDOWS_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
    }
    exports.escapeWindowsPath = escapeWindowsPath;
    function escapePosixPath(pattern) {
      return pattern.replace(POSIX_UNESCAPED_GLOB_SYMBOLS_RE, "\\$2");
    }
    exports.escapePosixPath = escapePosixPath;
    exports.convertPathToPattern = IS_WINDOWS_PLATFORM ? convertWindowsPathToPattern : convertPosixPathToPattern;
    function convertWindowsPathToPattern(filepath) {
      return escapeWindowsPath(filepath).replace(DOS_DEVICE_PATH_RE, "//$1").replace(WINDOWS_BACKSLASHES_RE, "/");
    }
    exports.convertWindowsPathToPattern = convertWindowsPathToPattern;
    function convertPosixPathToPattern(filepath) {
      return escapePosixPath(filepath);
    }
    exports.convertPosixPathToPattern = convertPosixPathToPattern;
  }
});
var require_is_extglob = __commonJS({
  "node_modules/is-extglob/index.js"(exports, module) {
    "use strict";
    module.exports = function isExtglob(str) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      var match;
      while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
        if (match[2])
          return true;
        str = str.slice(match.index + match[0].length);
      }
      return false;
    };
  }
});
var require_is_glob = __commonJS({
  "node_modules/is-glob/index.js"(exports, module) {
    "use strict";
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      var pipeIndex = -2;
      var closeSquareIndex = -2;
      var closeCurlyIndex = -2;
      var closeParenIndex = -2;
      var backSlashIndex = -2;
      while (index < str.length) {
        if (str[index] === "*") {
          return true;
        }
        if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
          return true;
        }
        if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf("]", index);
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
          closeCurlyIndex = str.indexOf("}", index);
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true;
            }
          }
        }
        if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
          closeParenIndex = str.indexOf(")", index);
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf("|", index);
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
            closeParenIndex = str.indexOf(")", pipeIndex);
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf("\\", pipeIndex);
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true;
              }
            }
          }
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n3 = str.indexOf(close, index);
            if (n3 !== -1) {
              index = n3 + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    var relaxedCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true;
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n3 = str.indexOf(close, index);
            if (n3 !== -1) {
              index = n3 + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    module.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var check = strictCheck;
      if (options && options.strict === false) {
        check = relaxedCheck;
      }
      return check(str);
    };
  }
});
var require_glob_parent = __commonJS({
  "node_modules/glob-parent/index.js"(exports, module) {
    "use strict";
    var isGlob = require_is_glob();
    var pathPosixDirname = __require("path").posix.dirname;
    var isWin32 = __require("os").platform() === "win32";
    var slash2 = "/";
    var backslash = /\\/g;
    var enclosure = /[\{\[].*[\}\]]$/;
    var globby23 = /(^|[^\\])([\{\[]|\([^\)]+$)/;
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts);
      if (options.flipBackslashes && isWin32 && str.indexOf(slash2) < 0) {
        str = str.replace(backslash, slash2);
      }
      if (enclosure.test(str)) {
        str += slash2;
      }
      str += "a";
      do {
        str = pathPosixDirname(str);
      } while (isGlob(str) || globby23.test(str));
      return str.replace(escaped, "$1");
    };
  }
});
var require_utils = __commonJS({
  "node_modules/braces/lib/utils.js"(exports) {
    "use strict";
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false)
        return false;
      if (!exports.isInteger(min) || !exports.isInteger(max))
        return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports.escapeNode = (block, n3 = 0, type) => {
      let node = block.nodes[n3];
      if (!node)
        return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports.encloseBrace = (node) => {
      if (node.type !== "brace")
        return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports.isInvalidBrace = (block) => {
      if (block.type !== "brace")
        return false;
      if (block.invalid === true || block.dollar)
        return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text")
        acc.push(node.value);
      if (node.type === "range")
        node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          let ele = arr[i];
          Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});
var require_stringify = __commonJS({
  "node_modules/braces/lib/stringify.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = (ast, options = {}) => {
      let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});
var require_is_number = __commonJS({
  "node_modules/is-number/index.js"(exports, module) {
    "use strict";
    module.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});
var require_to_regex_range = __commonJS({
  "node_modules/to-regex-range/index.js"(exports, module) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a2 = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a2 - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a: a2, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a2 < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a2), state, opts);
        a2 = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a2, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a2, b) {
      let arr = [];
      for (let i = 0; i < a2.length; i++)
        arr.push([a2[i], b[i]]);
      return arr;
    }
    function compare(a2, b) {
      return a2 > b ? 1 : b > a2 ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a2, b, options) {
      return `[${a2}${b - a2 === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module.exports = toRegexRange;
  }
});
var require_fill_range = __commonJS({
  "node_modules/fill-range/index.js"(exports, module) {
    "use strict";
    var util = __require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-")
        value = value.slice(1);
      if (value === "0")
        return false;
      while (value[++index] === "0")
        ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash)
          input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength)
        input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options) => {
      parts.negatives.sort((a2, b) => a2 < b ? -1 : a2 > b ? 1 : 0);
      parts.positives.sort((a2, b) => a2 < b ? -1 : a2 > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a2, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a2, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a2);
      if (a2 === b)
        return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true)
        throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a2 = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a2) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
          throw rangeError([start, end]);
        return [];
      }
      if (a2 === 0)
        a2 = 0;
      if (b === 0)
        b = 0;
      let descending = a2 > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a2 >= b : a2 <= b) {
        if (options.toRegex === true && step > 1) {
          push(a2);
        } else {
          range.push(pad(format(a2, index), maxLen, toNumber));
        }
        a2 = descending ? a2 - step : a2 + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a2 = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a2 > b;
      let min = Math.min(a2, b);
      let max = Math.max(a2, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a2 >= b : a2 <= b) {
        range.push(format(a2, index));
        a2 = descending ? a2 - step : a2 + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true)
        opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step))
          return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module.exports = fill;
  }
});
var require_compile = __commonJS({
  "node_modules/braces/lib/compile.js"(exports, module) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils();
    var compile = (ast, options = {}) => {
      let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let invalid = invalidBlock === true || invalidNode === true;
        let prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          let range = fill(...args, { ...options, wrap: false, toRegex: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (let child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module.exports = compile;
  }
});
var require_expand = __commonJS({
  "node_modules/braces/lib/expand.js"(exports, module) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils();
    var append = (queue = "", stash = "", enclose = false) => {
      let result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length)
        return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (let item of queue) {
        if (Array.isArray(item)) {
          for (let value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string")
              ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      let rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      let walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          let args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        let enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          let child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1)
              queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module.exports = expand;
  }
});
var require_constants = __commonJS({
  "node_modules/braces/lib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      MAX_LENGTH: 1024 * 64,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});
var require_parse = __commonJS({
  "node_modules/braces/lib/parse.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants();
    var parse2 = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      let opts = options || {};
      let max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      let ast = { type: "root", input, nodes: [] };
      let stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      let length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      let memo = {};
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let closed = true;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          let open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true)
                value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          let dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          let brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          let type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            let open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          let siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            let before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open")
                node.isOpen = true;
              if (node.type === "close")
                node.isClose = true;
              if (!node.nodes)
                node.type = "text";
              node.invalid = true;
            }
          });
          let parent = stack[stack.length - 1];
          let index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module.exports = parse2;
  }
});
var require_braces = __commonJS({
  "node_modules/braces/index.js"(exports, module) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse2 = require_parse();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (let pattern of input) {
          let result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse2(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module.exports = braces;
  }
});
var require_constants2 = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module.exports = {
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path2.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});
var require_utils2 = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var path2 = __require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants2();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1)
        return input;
      if (input[idx - 1] === "\\")
        return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module) {
    "use strict";
    var utils = require_utils2();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants2();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished2 = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished2 = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished2 = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished2 = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished2 === true)
            continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished2 = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished2 = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK)
            isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished2 = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished2 = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished2 = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished2 = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished2 = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob2 = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob2 = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob2 = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob2)
          glob2 = utils.removeBackslashes(glob2);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob: glob2,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n3 = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n3, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module.exports = scan;
  }
});
var require_parse2 = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module) {
    "use strict";
    var constants = require_constants2();
    var utils = require_utils2();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v2) => utils.escapeRegex(v2)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var parse2 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n3 = 1) => input[state.index + n3];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
          append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse2(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m2, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m2;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m2 : `\\${m2}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m2) => {
              return m2.length % 2 === 0 ? "\\\\" : m2 ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t4 of toks) {
              state.output += t4.output || t4.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".")
              prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true)
          throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse2.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true)
          return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match)
              return;
            const source2 = create(match[1]);
            if (!source2)
              return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module.exports = parse2;
  }
});
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    var scan = require_scan();
    var parse2 = require_parse2();
    var utils = require_utils2();
    var constants = require_constants2();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob2, options, returnState = false) => {
      if (Array.isArray(glob2)) {
        const fns = glob2.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2)
              return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob2) && glob2.tokens && glob2.input;
      if (glob2 === "" || typeof glob2 !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob2, options) : picomatch.makeRe(glob2, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob: glob2, posix });
        const result = { glob: glob2, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob: glob2, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob2;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob2;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob2, options, posix = utils.isWindows(options)) => {
      const regex = glob2 instanceof RegExp ? glob2 : picomatch.makeRe(glob2, options);
      return regex.test(path2.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern))
        return pattern.map((p) => picomatch.parse(p, options));
      return parse2(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse2.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse2(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true)
          throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module.exports = picomatch;
  }
});
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module) {
    "use strict";
    module.exports = require_picomatch();
  }
});
var require_micromatch = __commonJS({
  "node_modules/micromatch/index.js"(exports, module) {
    "use strict";
    var util = __require("util");
    var braces = require_braces();
    var picomatch = require_picomatch2();
    var utils = require_utils2();
    var isEmptyString = (val) => val === "" || val === "./";
    var micromatch = (list, patterns, options) => {
      patterns = [].concat(patterns);
      list = [].concat(list);
      let omit = /* @__PURE__ */ new Set();
      let keep = /* @__PURE__ */ new Set();
      let items = /* @__PURE__ */ new Set();
      let negatives = 0;
      let onResult = (state) => {
        items.add(state.output);
        if (options && options.onResult) {
          options.onResult(state);
        }
      };
      for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch(String(patterns[i]), { ...options, onResult }, true);
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        if (negated)
          negatives++;
        for (let item of list) {
          let matched = isMatch(item, true);
          let match = negated ? !matched.isMatch : matched.isMatch;
          if (!match)
            continue;
          if (negated) {
            omit.add(matched.output);
          } else {
            omit.delete(matched.output);
            keep.add(matched.output);
          }
        }
      }
      let result = negatives === patterns.length ? [...items] : [...keep];
      let matches = result.filter((item) => !omit.has(item));
      if (options && matches.length === 0) {
        if (options.failglob === true) {
          throw new Error(`No matches found for "${patterns.join(", ")}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
          return options.unescape ? patterns.map((p) => p.replace(/\\/g, "")) : patterns;
        }
      }
      return matches;
    };
    micromatch.match = micromatch;
    micromatch.matcher = (pattern, options) => picomatch(pattern, options);
    micromatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    micromatch.any = micromatch.isMatch;
    micromatch.not = (list, patterns, options = {}) => {
      patterns = [].concat(patterns).map(String);
      let result = /* @__PURE__ */ new Set();
      let items = [];
      let onResult = (state) => {
        if (options.onResult)
          options.onResult(state);
        items.push(state.output);
      };
      let matches = new Set(micromatch(list, patterns, { ...options, onResult }));
      for (let item of items) {
        if (!matches.has(item)) {
          result.add(item);
        }
      }
      return [...result];
    };
    micromatch.contains = (str, pattern, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      if (Array.isArray(pattern)) {
        return pattern.some((p) => micromatch.contains(str, p, options));
      }
      if (typeof pattern === "string") {
        if (isEmptyString(str) || isEmptyString(pattern)) {
          return false;
        }
        if (str.includes(pattern) || str.startsWith("./") && str.slice(2).includes(pattern)) {
          return true;
        }
      }
      return micromatch.isMatch(str, pattern, { ...options, contains: true });
    };
    micromatch.matchKeys = (obj, patterns, options) => {
      if (!utils.isObject(obj)) {
        throw new TypeError("Expected the first argument to be an object");
      }
      let keys = micromatch(Object.keys(obj), patterns, options);
      let res = {};
      for (let key of keys)
        res[key] = obj[key];
      return res;
    };
    micromatch.some = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (items.some((item) => isMatch(item))) {
          return true;
        }
      }
      return false;
    };
    micromatch.every = (list, patterns, options) => {
      let items = [].concat(list);
      for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch(String(pattern), options);
        if (!items.every((item) => isMatch(item))) {
          return false;
        }
      }
      return true;
    };
    micromatch.all = (str, patterns, options) => {
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
      }
      return [].concat(patterns).every((p) => picomatch(p, options)(str));
    };
    micromatch.capture = (glob2, input, options) => {
      let posix = utils.isWindows(options);
      let regex = picomatch.makeRe(String(glob2), { ...options, capture: true });
      let match = regex.exec(posix ? utils.toPosixSlashes(input) : input);
      if (match) {
        return match.slice(1).map((v2) => v2 === void 0 ? "" : v2);
      }
    };
    micromatch.makeRe = (...args) => picomatch.makeRe(...args);
    micromatch.scan = (...args) => picomatch.scan(...args);
    micromatch.parse = (patterns, options) => {
      let res = [];
      for (let pattern of [].concat(patterns || [])) {
        for (let str of braces(String(pattern), options)) {
          res.push(picomatch.parse(str, options));
        }
      }
      return res;
    };
    micromatch.braces = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
        return [pattern];
      }
      return braces(pattern, options);
    };
    micromatch.braceExpand = (pattern, options) => {
      if (typeof pattern !== "string")
        throw new TypeError("Expected a string");
      return micromatch.braces(pattern, { ...options, expand: true });
    };
    module.exports = micromatch;
  }
});
var require_pattern = __commonJS({
  "node_modules/fast-glob/out/utils/pattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.removeDuplicateSlashes = exports.matchAny = exports.convertPatternsToRe = exports.makeRe = exports.getPatternParts = exports.expandBraceExpansion = exports.expandPatternsWithBraceExpansion = exports.isAffectDepthOfReadingPattern = exports.endsWithSlashGlobStar = exports.hasGlobStar = exports.getBaseDirectory = exports.isPatternRelatedToParentDirectory = exports.getPatternsOutsideCurrentDirectory = exports.getPatternsInsideCurrentDirectory = exports.getPositivePatterns = exports.getNegativePatterns = exports.isPositivePattern = exports.isNegativePattern = exports.convertToNegativePattern = exports.convertToPositivePattern = exports.isDynamicPattern = exports.isStaticPattern = void 0;
    var path2 = __require("path");
    var globParent = require_glob_parent();
    var micromatch = require_micromatch();
    var GLOBSTAR = "**";
    var ESCAPE_SYMBOL = "\\";
    var COMMON_GLOB_SYMBOLS_RE = /[*?]|^!/;
    var REGEX_CHARACTER_CLASS_SYMBOLS_RE = /\[[^[]*]/;
    var REGEX_GROUP_SYMBOLS_RE = /(?:^|[^!*+?@])\([^(]*\|[^|]*\)/;
    var GLOB_EXTENSION_SYMBOLS_RE = /[!*+?@]\([^(]*\)/;
    var BRACE_EXPANSION_SEPARATORS_RE = /,|\.\./;
    var DOUBLE_SLASH_RE = /(?!^)\/{2,}/g;
    function isStaticPattern(pattern, options = {}) {
      return !isDynamicPattern2(pattern, options);
    }
    exports.isStaticPattern = isStaticPattern;
    function isDynamicPattern2(pattern, options = {}) {
      if (pattern === "") {
        return false;
      }
      if (options.caseSensitiveMatch === false || pattern.includes(ESCAPE_SYMBOL)) {
        return true;
      }
      if (COMMON_GLOB_SYMBOLS_RE.test(pattern) || REGEX_CHARACTER_CLASS_SYMBOLS_RE.test(pattern) || REGEX_GROUP_SYMBOLS_RE.test(pattern)) {
        return true;
      }
      if (options.extglob !== false && GLOB_EXTENSION_SYMBOLS_RE.test(pattern)) {
        return true;
      }
      if (options.braceExpansion !== false && hasBraceExpansion(pattern)) {
        return true;
      }
      return false;
    }
    exports.isDynamicPattern = isDynamicPattern2;
    function hasBraceExpansion(pattern) {
      const openingBraceIndex = pattern.indexOf("{");
      if (openingBraceIndex === -1) {
        return false;
      }
      const closingBraceIndex = pattern.indexOf("}", openingBraceIndex + 1);
      if (closingBraceIndex === -1) {
        return false;
      }
      const braceContent = pattern.slice(openingBraceIndex, closingBraceIndex);
      return BRACE_EXPANSION_SEPARATORS_RE.test(braceContent);
    }
    function convertToPositivePattern(pattern) {
      return isNegativePattern2(pattern) ? pattern.slice(1) : pattern;
    }
    exports.convertToPositivePattern = convertToPositivePattern;
    function convertToNegativePattern(pattern) {
      return "!" + pattern;
    }
    exports.convertToNegativePattern = convertToNegativePattern;
    function isNegativePattern2(pattern) {
      return pattern.startsWith("!") && pattern[1] !== "(";
    }
    exports.isNegativePattern = isNegativePattern2;
    function isPositivePattern(pattern) {
      return !isNegativePattern2(pattern);
    }
    exports.isPositivePattern = isPositivePattern;
    function getNegativePatterns(patterns) {
      return patterns.filter(isNegativePattern2);
    }
    exports.getNegativePatterns = getNegativePatterns;
    function getPositivePatterns(patterns) {
      return patterns.filter(isPositivePattern);
    }
    exports.getPositivePatterns = getPositivePatterns;
    function getPatternsInsideCurrentDirectory(patterns) {
      return patterns.filter((pattern) => !isPatternRelatedToParentDirectory(pattern));
    }
    exports.getPatternsInsideCurrentDirectory = getPatternsInsideCurrentDirectory;
    function getPatternsOutsideCurrentDirectory(patterns) {
      return patterns.filter(isPatternRelatedToParentDirectory);
    }
    exports.getPatternsOutsideCurrentDirectory = getPatternsOutsideCurrentDirectory;
    function isPatternRelatedToParentDirectory(pattern) {
      return pattern.startsWith("..") || pattern.startsWith("./..");
    }
    exports.isPatternRelatedToParentDirectory = isPatternRelatedToParentDirectory;
    function getBaseDirectory(pattern) {
      return globParent(pattern, { flipBackslashes: false });
    }
    exports.getBaseDirectory = getBaseDirectory;
    function hasGlobStar(pattern) {
      return pattern.includes(GLOBSTAR);
    }
    exports.hasGlobStar = hasGlobStar;
    function endsWithSlashGlobStar(pattern) {
      return pattern.endsWith("/" + GLOBSTAR);
    }
    exports.endsWithSlashGlobStar = endsWithSlashGlobStar;
    function isAffectDepthOfReadingPattern(pattern) {
      const basename = path2.basename(pattern);
      return endsWithSlashGlobStar(pattern) || isStaticPattern(basename);
    }
    exports.isAffectDepthOfReadingPattern = isAffectDepthOfReadingPattern;
    function expandPatternsWithBraceExpansion(patterns) {
      return patterns.reduce((collection, pattern) => {
        return collection.concat(expandBraceExpansion(pattern));
      }, []);
    }
    exports.expandPatternsWithBraceExpansion = expandPatternsWithBraceExpansion;
    function expandBraceExpansion(pattern) {
      const patterns = micromatch.braces(pattern, { expand: true, nodupes: true, keepEscaping: true });
      patterns.sort((a2, b) => a2.length - b.length);
      return patterns.filter((pattern2) => pattern2 !== "");
    }
    exports.expandBraceExpansion = expandBraceExpansion;
    function getPatternParts(pattern, options) {
      let { parts } = micromatch.scan(pattern, Object.assign(Object.assign({}, options), { parts: true }));
      if (parts.length === 0) {
        parts = [pattern];
      }
      if (parts[0].startsWith("/")) {
        parts[0] = parts[0].slice(1);
        parts.unshift("");
      }
      return parts;
    }
    exports.getPatternParts = getPatternParts;
    function makeRe(pattern, options) {
      return micromatch.makeRe(pattern, options);
    }
    exports.makeRe = makeRe;
    function convertPatternsToRe(patterns, options) {
      return patterns.map((pattern) => makeRe(pattern, options));
    }
    exports.convertPatternsToRe = convertPatternsToRe;
    function matchAny(entry, patternsRe) {
      return patternsRe.some((patternRe) => patternRe.test(entry));
    }
    exports.matchAny = matchAny;
    function removeDuplicateSlashes(pattern) {
      return pattern.replace(DOUBLE_SLASH_RE, "/");
    }
    exports.removeDuplicateSlashes = removeDuplicateSlashes;
  }
});
var require_merge2 = __commonJS({
  "node_modules/merge2/index.js"(exports, module) {
    "use strict";
    var Stream5 = __require("stream");
    var PassThrough = Stream5.PassThrough;
    var slice = Array.prototype.slice;
    module.exports = merge2;
    function merge2() {
      const streamsQueue = [];
      const args = slice.call(arguments);
      let merging = false;
      let options = args[args.length - 1];
      if (options && !Array.isArray(options) && options.pipe == null) {
        args.pop();
      } else {
        options = {};
      }
      const doEnd = options.end !== false;
      const doPipeError = options.pipeError === true;
      if (options.objectMode == null) {
        options.objectMode = true;
      }
      if (options.highWaterMark == null) {
        options.highWaterMark = 64 * 1024;
      }
      const mergedStream = PassThrough(options);
      function addStream() {
        for (let i = 0, len = arguments.length; i < len; i++) {
          streamsQueue.push(pauseStreams(arguments[i], options));
        }
        mergeStream();
        return this;
      }
      function mergeStream() {
        if (merging) {
          return;
        }
        merging = true;
        let streams = streamsQueue.shift();
        if (!streams) {
          process.nextTick(endStream2);
          return;
        }
        if (!Array.isArray(streams)) {
          streams = [streams];
        }
        let pipesCount = streams.length + 1;
        function next() {
          if (--pipesCount > 0) {
            return;
          }
          merging = false;
          mergeStream();
        }
        function pipe(stream) {
          function onend() {
            stream.removeListener("merge2UnpipeEnd", onend);
            stream.removeListener("end", onend);
            if (doPipeError) {
              stream.removeListener("error", onerror);
            }
            next();
          }
          function onerror(err) {
            mergedStream.emit("error", err);
          }
          if (stream._readableState.endEmitted) {
            return next();
          }
          stream.on("merge2UnpipeEnd", onend);
          stream.on("end", onend);
          if (doPipeError) {
            stream.on("error", onerror);
          }
          stream.pipe(mergedStream, { end: false });
          stream.resume();
        }
        for (let i = 0; i < streams.length; i++) {
          pipe(streams[i]);
        }
        next();
      }
      function endStream2() {
        merging = false;
        mergedStream.emit("queueDrain");
        if (doEnd) {
          mergedStream.end();
        }
      }
      mergedStream.setMaxListeners(0);
      mergedStream.add = addStream;
      mergedStream.on("unpipe", function(stream) {
        stream.emit("merge2UnpipeEnd");
      });
      if (args.length) {
        addStream.apply(null, args);
      }
      return mergedStream;
    }
    function pauseStreams(streams, options) {
      if (!Array.isArray(streams)) {
        if (!streams._readableState && streams.pipe) {
          streams = streams.pipe(PassThrough(options));
        }
        if (!streams._readableState || !streams.pause || !streams.pipe) {
          throw new Error("Only readable stream can be merged.");
        }
        streams.pause();
      } else {
        for (let i = 0, len = streams.length; i < len; i++) {
          streams[i] = pauseStreams(streams[i], options);
        }
      }
      return streams;
    }
  }
});
var require_stream = __commonJS({
  "node_modules/fast-glob/out/utils/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = void 0;
    var merge2 = require_merge2();
    function merge(streams) {
      const mergedStream = merge2(streams);
      streams.forEach((stream) => {
        stream.once("error", (error) => mergedStream.emit("error", error));
      });
      mergedStream.once("close", () => propagateCloseEventToSources(streams));
      mergedStream.once("end", () => propagateCloseEventToSources(streams));
      return mergedStream;
    }
    exports.merge = merge;
    function propagateCloseEventToSources(streams) {
      streams.forEach((stream) => stream.emit("close"));
    }
  }
});
var require_string = __commonJS({
  "node_modules/fast-glob/out/utils/string.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEmpty = exports.isString = void 0;
    function isString2(input) {
      return typeof input === "string";
    }
    exports.isString = isString2;
    function isEmpty(input) {
      return input === "";
    }
    exports.isEmpty = isEmpty;
  }
});
var require_utils3 = __commonJS({
  "node_modules/fast-glob/out/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.string = exports.stream = exports.pattern = exports.path = exports.fs = exports.errno = exports.array = void 0;
    var array = require_array();
    exports.array = array;
    var errno = require_errno();
    exports.errno = errno;
    var fs6 = require_fs();
    exports.fs = fs6;
    var path2 = require_path();
    exports.path = path2;
    var pattern = require_pattern();
    exports.pattern = pattern;
    var stream = require_stream();
    exports.stream = stream;
    var string = require_string();
    exports.string = string;
  }
});
var require_tasks = __commonJS({
  "node_modules/fast-glob/out/managers/tasks.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertPatternGroupToTask = exports.convertPatternGroupsToTasks = exports.groupPatternsByBaseDirectory = exports.getNegativePatternsAsPositive = exports.getPositivePatterns = exports.convertPatternsToTasks = exports.generate = void 0;
    var utils = require_utils3();
    function generate(input, settings) {
      const patterns = processPatterns(input, settings);
      const ignore = processPatterns(settings.ignore, settings);
      const positivePatterns = getPositivePatterns(patterns);
      const negativePatterns = getNegativePatternsAsPositive(patterns, ignore);
      const staticPatterns = positivePatterns.filter((pattern) => utils.pattern.isStaticPattern(pattern, settings));
      const dynamicPatterns = positivePatterns.filter((pattern) => utils.pattern.isDynamicPattern(pattern, settings));
      const staticTasks = convertPatternsToTasks(
        staticPatterns,
        negativePatterns,
        /* dynamic */
        false
      );
      const dynamicTasks = convertPatternsToTasks(
        dynamicPatterns,
        negativePatterns,
        /* dynamic */
        true
      );
      return staticTasks.concat(dynamicTasks);
    }
    exports.generate = generate;
    function processPatterns(input, settings) {
      let patterns = input;
      if (settings.braceExpansion) {
        patterns = utils.pattern.expandPatternsWithBraceExpansion(patterns);
      }
      if (settings.baseNameMatch) {
        patterns = patterns.map((pattern) => pattern.includes("/") ? pattern : `**/${pattern}`);
      }
      return patterns.map((pattern) => utils.pattern.removeDuplicateSlashes(pattern));
    }
    function convertPatternsToTasks(positive, negative, dynamic) {
      const tasks = [];
      const patternsOutsideCurrentDirectory = utils.pattern.getPatternsOutsideCurrentDirectory(positive);
      const patternsInsideCurrentDirectory = utils.pattern.getPatternsInsideCurrentDirectory(positive);
      const outsideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsOutsideCurrentDirectory);
      const insideCurrentDirectoryGroup = groupPatternsByBaseDirectory(patternsInsideCurrentDirectory);
      tasks.push(...convertPatternGroupsToTasks(outsideCurrentDirectoryGroup, negative, dynamic));
      if ("." in insideCurrentDirectoryGroup) {
        tasks.push(convertPatternGroupToTask(".", patternsInsideCurrentDirectory, negative, dynamic));
      } else {
        tasks.push(...convertPatternGroupsToTasks(insideCurrentDirectoryGroup, negative, dynamic));
      }
      return tasks;
    }
    exports.convertPatternsToTasks = convertPatternsToTasks;
    function getPositivePatterns(patterns) {
      return utils.pattern.getPositivePatterns(patterns);
    }
    exports.getPositivePatterns = getPositivePatterns;
    function getNegativePatternsAsPositive(patterns, ignore) {
      const negative = utils.pattern.getNegativePatterns(patterns).concat(ignore);
      const positive = negative.map(utils.pattern.convertToPositivePattern);
      return positive;
    }
    exports.getNegativePatternsAsPositive = getNegativePatternsAsPositive;
    function groupPatternsByBaseDirectory(patterns) {
      const group = {};
      return patterns.reduce((collection, pattern) => {
        const base = utils.pattern.getBaseDirectory(pattern);
        if (base in collection) {
          collection[base].push(pattern);
        } else {
          collection[base] = [pattern];
        }
        return collection;
      }, group);
    }
    exports.groupPatternsByBaseDirectory = groupPatternsByBaseDirectory;
    function convertPatternGroupsToTasks(positive, negative, dynamic) {
      return Object.keys(positive).map((base) => {
        return convertPatternGroupToTask(base, positive[base], negative, dynamic);
      });
    }
    exports.convertPatternGroupsToTasks = convertPatternGroupsToTasks;
    function convertPatternGroupToTask(base, positive, negative, dynamic) {
      return {
        dynamic,
        positive,
        negative,
        base,
        patterns: [].concat(positive, negative.map(utils.pattern.convertToNegativePattern))
      };
    }
    exports.convertPatternGroupToTask = convertPatternGroupToTask;
  }
});
var require_async = __commonJS({
  "node_modules/@nodelib/fs.stat/out/providers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read = void 0;
    function read(path2, settings, callback) {
      settings.fs.lstat(path2, (lstatError, lstat) => {
        if (lstatError !== null) {
          callFailureCallback(callback, lstatError);
          return;
        }
        if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
          callSuccessCallback(callback, lstat);
          return;
        }
        settings.fs.stat(path2, (statError, stat) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              callFailureCallback(callback, statError);
              return;
            }
            callSuccessCallback(callback, lstat);
            return;
          }
          if (settings.markSymbolicLink) {
            stat.isSymbolicLink = () => true;
          }
          callSuccessCallback(callback, stat);
        });
      });
    }
    exports.read = read;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});
var require_sync = __commonJS({
  "node_modules/@nodelib/fs.stat/out/providers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.read = void 0;
    function read(path2, settings) {
      const lstat = settings.fs.lstatSync(path2);
      if (!lstat.isSymbolicLink() || !settings.followSymbolicLink) {
        return lstat;
      }
      try {
        const stat = settings.fs.statSync(path2);
        if (settings.markSymbolicLink) {
          stat.isSymbolicLink = () => true;
        }
        return stat;
      } catch (error) {
        if (!settings.throwErrorOnBrokenSymbolicLink) {
          return lstat;
        }
        throw error;
      }
    }
    exports.read = read;
  }
});
var require_fs2 = __commonJS({
  "node_modules/@nodelib/fs.stat/out/adapters/fs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
    var fs6 = __require("fs");
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs6.lstat,
      stat: fs6.stat,
      lstatSync: fs6.lstatSync,
      statSync: fs6.statSync
    };
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER;
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports.createFileSystemAdapter = createFileSystemAdapter;
  }
});
var require_settings = __commonJS({
  "node_modules/@nodelib/fs.stat/out/settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs6 = require_fs2();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLink = this._getValue(this._options.followSymbolicLink, true);
        this.fs = fs6.createFileSystemAdapter(this._options.fs);
        this.markSymbolicLink = this._getValue(this._options.markSymbolicLink, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports.default = Settings;
  }
});
var require_out = __commonJS({
  "node_modules/@nodelib/fs.stat/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.statSync = exports.stat = exports.Settings = void 0;
    var async = require_async();
    var sync = require_sync();
    var settings_1 = require_settings();
    exports.Settings = settings_1.default;
    function stat(path2, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        async.read(path2, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports.stat = stat;
    function statSync(path2, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      return sync.read(path2, settings);
    }
    exports.statSync = statSync;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});
var require_queue_microtask = __commonJS({
  "node_modules/queue-microtask/index.js"(exports, module) {
    "use strict";
    var promise;
    module.exports = typeof queueMicrotask === "function" ? queueMicrotask.bind(typeof window !== "undefined" ? window : global) : (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
      throw err;
    }, 0));
  }
});
var require_run_parallel = __commonJS({
  "node_modules/run-parallel/index.js"(exports, module) {
    "use strict";
    module.exports = runParallel;
    var queueMicrotask2 = require_queue_microtask();
    function runParallel(tasks, cb) {
      let results, pending, keys;
      let isSync = true;
      if (Array.isArray(tasks)) {
        results = [];
        pending = tasks.length;
      } else {
        keys = Object.keys(tasks);
        results = {};
        pending = keys.length;
      }
      function done(err) {
        function end() {
          if (cb)
            cb(err, results);
          cb = null;
        }
        if (isSync)
          queueMicrotask2(end);
        else
          end();
      }
      function each(i, err, result) {
        results[i] = result;
        if (--pending === 0 || err) {
          done(err);
        }
      }
      if (!pending) {
        done(null);
      } else if (keys) {
        keys.forEach(function(key) {
          tasks[key](function(err, result) {
            each(key, err, result);
          });
        });
      } else {
        tasks.forEach(function(task, i) {
          task(function(err, result) {
            each(i, err, result);
          });
        });
      }
      isSync = false;
    }
  }
});
var require_constants3 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = void 0;
    var NODE_PROCESS_VERSION_PARTS = process.versions.node.split(".");
    if (NODE_PROCESS_VERSION_PARTS[0] === void 0 || NODE_PROCESS_VERSION_PARTS[1] === void 0) {
      throw new Error(`Unexpected behavior. The 'process.versions.node' variable has invalid value: ${process.versions.node}`);
    }
    var MAJOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[0], 10);
    var MINOR_VERSION = Number.parseInt(NODE_PROCESS_VERSION_PARTS[1], 10);
    var SUPPORTED_MAJOR_VERSION = 10;
    var SUPPORTED_MINOR_VERSION = 10;
    var IS_MATCHED_BY_MAJOR = MAJOR_VERSION > SUPPORTED_MAJOR_VERSION;
    var IS_MATCHED_BY_MAJOR_AND_MINOR = MAJOR_VERSION === SUPPORTED_MAJOR_VERSION && MINOR_VERSION >= SUPPORTED_MINOR_VERSION;
    exports.IS_SUPPORT_READDIR_WITH_FILE_TYPES = IS_MATCHED_BY_MAJOR || IS_MATCHED_BY_MAJOR_AND_MINOR;
  }
});
var require_fs3 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/utils/fs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createDirentFromStats = void 0;
    var DirentFromStats = class {
      constructor(name, stats) {
        this.name = name;
        this.isBlockDevice = stats.isBlockDevice.bind(stats);
        this.isCharacterDevice = stats.isCharacterDevice.bind(stats);
        this.isDirectory = stats.isDirectory.bind(stats);
        this.isFIFO = stats.isFIFO.bind(stats);
        this.isFile = stats.isFile.bind(stats);
        this.isSocket = stats.isSocket.bind(stats);
        this.isSymbolicLink = stats.isSymbolicLink.bind(stats);
      }
    };
    function createDirentFromStats(name, stats) {
      return new DirentFromStats(name, stats);
    }
    exports.createDirentFromStats = createDirentFromStats;
  }
});
var require_utils4 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fs = void 0;
    var fs6 = require_fs3();
    exports.fs = fs6;
  }
});
var require_common = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.joinPathSegments = void 0;
    function joinPathSegments(a2, b, separator) {
      if (a2.endsWith(separator)) {
        return a2 + b;
      }
      return a2 + separator + b;
    }
    exports.joinPathSegments = joinPathSegments;
  }
});
var require_async2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
    var fsStat = require_out();
    var rpl = require_run_parallel();
    var constants_1 = require_constants3();
    var utils = require_utils4();
    var common = require_common();
    function read(directory, settings, callback) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        readdirWithFileTypes(directory, settings, callback);
        return;
      }
      readdir(directory, settings, callback);
    }
    exports.read = read;
    function readdirWithFileTypes(directory, settings, callback) {
      settings.fs.readdir(directory, { withFileTypes: true }, (readdirError, dirents) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        const entries = dirents.map((dirent) => ({
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        }));
        if (!settings.followSymbolicLinks) {
          callSuccessCallback(callback, entries);
          return;
        }
        const tasks = entries.map((entry) => makeRplTaskEntry(entry, settings));
        rpl(tasks, (rplError, rplEntries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, rplEntries);
        });
      });
    }
    exports.readdirWithFileTypes = readdirWithFileTypes;
    function makeRplTaskEntry(entry, settings) {
      return (done) => {
        if (!entry.dirent.isSymbolicLink()) {
          done(null, entry);
          return;
        }
        settings.fs.stat(entry.path, (statError, stats) => {
          if (statError !== null) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              done(statError);
              return;
            }
            done(null, entry);
            return;
          }
          entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          done(null, entry);
        });
      };
    }
    function readdir(directory, settings, callback) {
      settings.fs.readdir(directory, (readdirError, names) => {
        if (readdirError !== null) {
          callFailureCallback(callback, readdirError);
          return;
        }
        const tasks = names.map((name) => {
          const path2 = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
          return (done) => {
            fsStat.stat(path2, settings.fsStatSettings, (error, stats) => {
              if (error !== null) {
                done(error);
                return;
              }
              const entry = {
                name,
                path: path2,
                dirent: utils.fs.createDirentFromStats(name, stats)
              };
              if (settings.stats) {
                entry.stats = stats;
              }
              done(null, entry);
            });
          };
        });
        rpl(tasks, (rplError, entries) => {
          if (rplError !== null) {
            callFailureCallback(callback, rplError);
            return;
          }
          callSuccessCallback(callback, entries);
        });
      });
    }
    exports.readdir = readdir;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, result) {
      callback(null, result);
    }
  }
});
var require_sync2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/providers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.readdir = exports.readdirWithFileTypes = exports.read = void 0;
    var fsStat = require_out();
    var constants_1 = require_constants3();
    var utils = require_utils4();
    var common = require_common();
    function read(directory, settings) {
      if (!settings.stats && constants_1.IS_SUPPORT_READDIR_WITH_FILE_TYPES) {
        return readdirWithFileTypes(directory, settings);
      }
      return readdir(directory, settings);
    }
    exports.read = read;
    function readdirWithFileTypes(directory, settings) {
      const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
      return dirents.map((dirent) => {
        const entry = {
          dirent,
          name: dirent.name,
          path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
        };
        if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
          try {
            const stats = settings.fs.statSync(entry.path);
            entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
          } catch (error) {
            if (settings.throwErrorOnBrokenSymbolicLink) {
              throw error;
            }
          }
        }
        return entry;
      });
    }
    exports.readdirWithFileTypes = readdirWithFileTypes;
    function readdir(directory, settings) {
      const names = settings.fs.readdirSync(directory);
      return names.map((name) => {
        const entryPath = common.joinPathSegments(directory, name, settings.pathSegmentSeparator);
        const stats = fsStat.statSync(entryPath, settings.fsStatSettings);
        const entry = {
          name,
          path: entryPath,
          dirent: utils.fs.createDirentFromStats(name, stats)
        };
        if (settings.stats) {
          entry.stats = stats;
        }
        return entry;
      });
    }
    exports.readdir = readdir;
  }
});
var require_fs4 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/adapters/fs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createFileSystemAdapter = exports.FILE_SYSTEM_ADAPTER = void 0;
    var fs6 = __require("fs");
    exports.FILE_SYSTEM_ADAPTER = {
      lstat: fs6.lstat,
      stat: fs6.stat,
      lstatSync: fs6.lstatSync,
      statSync: fs6.statSync,
      readdir: fs6.readdir,
      readdirSync: fs6.readdirSync
    };
    function createFileSystemAdapter(fsMethods) {
      if (fsMethods === void 0) {
        return exports.FILE_SYSTEM_ADAPTER;
      }
      return Object.assign(Object.assign({}, exports.FILE_SYSTEM_ADAPTER), fsMethods);
    }
    exports.createFileSystemAdapter = createFileSystemAdapter;
  }
});
var require_settings2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path2 = __require("path");
    var fsStat = require_out();
    var fs6 = require_fs4();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, false);
        this.fs = fs6.createFileSystemAdapter(this._options.fs);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
        this.stats = this._getValue(this._options.stats, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, true);
        this.fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this.followSymbolicLinks,
          fs: this.fs,
          throwErrorOnBrokenSymbolicLink: this.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports.default = Settings;
  }
});
var require_out2 = __commonJS({
  "node_modules/@nodelib/fs.scandir/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Settings = exports.scandirSync = exports.scandir = void 0;
    var async = require_async2();
    var sync = require_sync2();
    var settings_1 = require_settings2();
    exports.Settings = settings_1.default;
    function scandir(path2, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        async.read(path2, getSettings(), optionsOrSettingsOrCallback);
        return;
      }
      async.read(path2, getSettings(optionsOrSettingsOrCallback), callback);
    }
    exports.scandir = scandir;
    function scandirSync(path2, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      return sync.read(path2, settings);
    }
    exports.scandirSync = scandirSync;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});
var require_reusify = __commonJS({
  "node_modules/reusify/reusify.js"(exports, module) {
    "use strict";
    function reusify(Constructor) {
      var head = new Constructor();
      var tail = head;
      function get() {
        var current = head;
        if (current.next) {
          head = current.next;
        } else {
          head = new Constructor();
          tail = head;
        }
        current.next = null;
        return current;
      }
      function release(obj) {
        tail.next = obj;
        tail = obj;
      }
      return {
        get,
        release
      };
    }
    module.exports = reusify;
  }
});
var require_queue = __commonJS({
  "node_modules/fastq/queue.js"(exports, module) {
    "use strict";
    var reusify = require_reusify();
    function fastqueue(context, worker, concurrency) {
      if (typeof context === "function") {
        concurrency = worker;
        worker = context;
        context = null;
      }
      if (concurrency < 1) {
        throw new Error("fastqueue concurrency must be greater than 1");
      }
      var cache = reusify(Task);
      var queueHead = null;
      var queueTail = null;
      var _running = 0;
      var errorHandler = null;
      var self2 = {
        push,
        drain: noop52,
        saturated: noop52,
        pause,
        paused: false,
        concurrency,
        running,
        resume,
        idle,
        length,
        getQueue,
        unshift,
        empty: noop52,
        kill: kill22,
        killAndDrain,
        error
      };
      return self2;
      function running() {
        return _running;
      }
      function pause() {
        self2.paused = true;
      }
      function length() {
        var current = queueHead;
        var counter = 0;
        while (current) {
          current = current.next;
          counter++;
        }
        return counter;
      }
      function getQueue() {
        var current = queueHead;
        var tasks = [];
        while (current) {
          tasks.push(current.value);
          current = current.next;
        }
        return tasks;
      }
      function resume() {
        if (!self2.paused)
          return;
        self2.paused = false;
        for (var i = 0; i < self2.concurrency; i++) {
          _running++;
          release();
        }
      }
      function idle() {
        return _running === 0 && self2.length() === 0;
      }
      function push(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop52;
        current.errorHandler = errorHandler;
        if (_running === self2.concurrency || self2.paused) {
          if (queueTail) {
            queueTail.next = current;
            queueTail = current;
          } else {
            queueHead = current;
            queueTail = current;
            self2.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function unshift(value, done) {
        var current = cache.get();
        current.context = context;
        current.release = release;
        current.value = value;
        current.callback = done || noop52;
        if (_running === self2.concurrency || self2.paused) {
          if (queueHead) {
            current.next = queueHead;
            queueHead = current;
          } else {
            queueHead = current;
            queueTail = current;
            self2.saturated();
          }
        } else {
          _running++;
          worker.call(context, current.value, current.worked);
        }
      }
      function release(holder) {
        if (holder) {
          cache.release(holder);
        }
        var next = queueHead;
        if (next) {
          if (!self2.paused) {
            if (queueTail === queueHead) {
              queueTail = null;
            }
            queueHead = next.next;
            next.next = null;
            worker.call(context, next.value, next.worked);
            if (queueTail === null) {
              self2.empty();
            }
          } else {
            _running--;
          }
        } else if (--_running === 0) {
          self2.drain();
        }
      }
      function kill22() {
        queueHead = null;
        queueTail = null;
        self2.drain = noop52;
      }
      function killAndDrain() {
        queueHead = null;
        queueTail = null;
        self2.drain();
        self2.drain = noop52;
      }
      function error(handler) {
        errorHandler = handler;
      }
    }
    function noop52() {
    }
    function Task() {
      this.value = null;
      this.callback = noop52;
      this.next = null;
      this.release = noop52;
      this.context = null;
      this.errorHandler = null;
      var self2 = this;
      this.worked = function worked(err, result) {
        var callback = self2.callback;
        var errorHandler = self2.errorHandler;
        var val = self2.value;
        self2.value = null;
        self2.callback = noop52;
        if (self2.errorHandler) {
          errorHandler(err, val);
        }
        callback.call(self2.context, err, result);
        self2.release(self2);
      };
    }
    function queueAsPromised(context, worker, concurrency) {
      if (typeof context === "function") {
        concurrency = worker;
        worker = context;
        context = null;
      }
      function asyncWrapper(arg, cb) {
        worker.call(this, arg).then(function(res) {
          cb(null, res);
        }, cb);
      }
      var queue = fastqueue(context, asyncWrapper, concurrency);
      var pushCb = queue.push;
      var unshiftCb = queue.unshift;
      queue.push = push;
      queue.unshift = unshift;
      queue.drained = drained;
      return queue;
      function push(value) {
        var p = new Promise(function(resolve, reject) {
          pushCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop52);
        return p;
      }
      function unshift(value) {
        var p = new Promise(function(resolve, reject) {
          unshiftCb(value, function(err, result) {
            if (err) {
              reject(err);
              return;
            }
            resolve(result);
          });
        });
        p.catch(noop52);
        return p;
      }
      function drained() {
        var previousDrain = queue.drain;
        var p = new Promise(function(resolve) {
          queue.drain = function() {
            previousDrain();
            resolve();
          };
        });
        return p;
      }
    }
    module.exports = fastqueue;
    module.exports.promise = queueAsPromised;
  }
});
var require_common2 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/common.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.joinPathSegments = exports.replacePathSegmentSeparator = exports.isAppliedFilter = exports.isFatalError = void 0;
    function isFatalError(settings, error) {
      if (settings.errorFilter === null) {
        return true;
      }
      return !settings.errorFilter(error);
    }
    exports.isFatalError = isFatalError;
    function isAppliedFilter(filter, value) {
      return filter === null || filter(value);
    }
    exports.isAppliedFilter = isAppliedFilter;
    function replacePathSegmentSeparator(filepath, separator) {
      return filepath.split(/[/\\]/).join(separator);
    }
    exports.replacePathSegmentSeparator = replacePathSegmentSeparator;
    function joinPathSegments(a2, b, separator) {
      if (a2 === "") {
        return b;
      }
      if (a2.endsWith(separator)) {
        return a2 + b;
      }
      return a2 + separator + b;
    }
    exports.joinPathSegments = joinPathSegments;
  }
});
var require_reader = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/reader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var common = require_common2();
    var Reader = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._root = common.replacePathSegmentSeparator(_root, _settings.pathSegmentSeparator);
      }
    };
    exports.default = Reader;
  }
});
var require_async3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var events_1 = __require("events");
    var fsScandir = require_out2();
    var fastq = require_queue();
    var common = require_common2();
    var reader_1 = require_reader();
    var AsyncReader = class extends reader_1.default {
      constructor(_root, _settings) {
        super(_root, _settings);
        this._settings = _settings;
        this._scandir = fsScandir.scandir;
        this._emitter = new events_1.EventEmitter();
        this._queue = fastq(this._worker.bind(this), this._settings.concurrency);
        this._isFatalError = false;
        this._isDestroyed = false;
        this._queue.drain = () => {
          if (!this._isFatalError) {
            this._emitter.emit("end");
          }
        };
      }
      read() {
        this._isFatalError = false;
        this._isDestroyed = false;
        setImmediate(() => {
          this._pushToQueue(this._root, this._settings.basePath);
        });
        return this._emitter;
      }
      get isDestroyed() {
        return this._isDestroyed;
      }
      destroy() {
        if (this._isDestroyed) {
          throw new Error("The reader is already destroyed");
        }
        this._isDestroyed = true;
        this._queue.killAndDrain();
      }
      onEntry(callback) {
        this._emitter.on("entry", callback);
      }
      onError(callback) {
        this._emitter.once("error", callback);
      }
      onEnd(callback) {
        this._emitter.once("end", callback);
      }
      _pushToQueue(directory, base) {
        const queueItem = { directory, base };
        this._queue.push(queueItem, (error) => {
          if (error !== null) {
            this._handleError(error);
          }
        });
      }
      _worker(item, done) {
        this._scandir(item.directory, this._settings.fsScandirSettings, (error, entries) => {
          if (error !== null) {
            done(error, void 0);
            return;
          }
          for (const entry of entries) {
            this._handleEntry(entry, item.base);
          }
          done(null, void 0);
        });
      }
      _handleError(error) {
        if (this._isDestroyed || !common.isFatalError(this._settings, error)) {
          return;
        }
        this._isFatalError = true;
        this._isDestroyed = true;
        this._emitter.emit("error", error);
      }
      _handleEntry(entry, base) {
        if (this._isDestroyed || this._isFatalError) {
          return;
        }
        const fullpath = entry.path;
        if (base !== void 0) {
          entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._emitEntry(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
        }
      }
      _emitEntry(entry) {
        this._emitter.emit("entry", entry);
      }
    };
    exports.default = AsyncReader;
  }
});
var require_async4 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var async_1 = require_async3();
    var AsyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._storage = [];
      }
      read(callback) {
        this._reader.onError((error) => {
          callFailureCallback(callback, error);
        });
        this._reader.onEntry((entry) => {
          this._storage.push(entry);
        });
        this._reader.onEnd(() => {
          callSuccessCallback(callback, this._storage);
        });
        this._reader.read();
      }
    };
    exports.default = AsyncProvider;
    function callFailureCallback(callback, error) {
      callback(error);
    }
    function callSuccessCallback(callback, entries) {
      callback(null, entries);
    }
  }
});
var require_stream2 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = __require("stream");
    var async_1 = require_async3();
    var StreamProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new async_1.default(this._root, this._settings);
        this._stream = new stream_1.Readable({
          objectMode: true,
          read: () => {
          },
          destroy: () => {
            if (!this._reader.isDestroyed) {
              this._reader.destroy();
            }
          }
        });
      }
      read() {
        this._reader.onError((error) => {
          this._stream.emit("error", error);
        });
        this._reader.onEntry((entry) => {
          this._stream.push(entry);
        });
        this._reader.onEnd(() => {
          this._stream.push(null);
        });
        this._reader.read();
        return this._stream;
      }
    };
    exports.default = StreamProvider;
  }
});
var require_sync3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/readers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fsScandir = require_out2();
    var common = require_common2();
    var reader_1 = require_reader();
    var SyncReader = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._scandir = fsScandir.scandirSync;
        this._storage = [];
        this._queue = /* @__PURE__ */ new Set();
      }
      read() {
        this._pushToQueue(this._root, this._settings.basePath);
        this._handleQueue();
        return this._storage;
      }
      _pushToQueue(directory, base) {
        this._queue.add({ directory, base });
      }
      _handleQueue() {
        for (const item of this._queue.values()) {
          this._handleDirectory(item.directory, item.base);
        }
      }
      _handleDirectory(directory, base) {
        try {
          const entries = this._scandir(directory, this._settings.fsScandirSettings);
          for (const entry of entries) {
            this._handleEntry(entry, base);
          }
        } catch (error) {
          this._handleError(error);
        }
      }
      _handleError(error) {
        if (!common.isFatalError(this._settings, error)) {
          return;
        }
        throw error;
      }
      _handleEntry(entry, base) {
        const fullpath = entry.path;
        if (base !== void 0) {
          entry.path = common.joinPathSegments(base, entry.name, this._settings.pathSegmentSeparator);
        }
        if (common.isAppliedFilter(this._settings.entryFilter, entry)) {
          this._pushToStorage(entry);
        }
        if (entry.dirent.isDirectory() && common.isAppliedFilter(this._settings.deepFilter, entry)) {
          this._pushToQueue(fullpath, base === void 0 ? void 0 : entry.path);
        }
      }
      _pushToStorage(entry) {
        this._storage.push(entry);
      }
    };
    exports.default = SyncReader;
  }
});
var require_sync4 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/providers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sync_1 = require_sync3();
    var SyncProvider = class {
      constructor(_root, _settings) {
        this._root = _root;
        this._settings = _settings;
        this._reader = new sync_1.default(this._root, this._settings);
      }
      read() {
        return this._reader.read();
      }
    };
    exports.default = SyncProvider;
  }
});
var require_settings3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path2 = __require("path");
    var fsScandir = require_out2();
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.basePath = this._getValue(this._options.basePath, void 0);
        this.concurrency = this._getValue(this._options.concurrency, Number.POSITIVE_INFINITY);
        this.deepFilter = this._getValue(this._options.deepFilter, null);
        this.entryFilter = this._getValue(this._options.entryFilter, null);
        this.errorFilter = this._getValue(this._options.errorFilter, null);
        this.pathSegmentSeparator = this._getValue(this._options.pathSegmentSeparator, path2.sep);
        this.fsScandirSettings = new fsScandir.Settings({
          followSymbolicLinks: this._options.followSymbolicLinks,
          fs: this._options.fs,
          pathSegmentSeparator: this._options.pathSegmentSeparator,
          stats: this._options.stats,
          throwErrorOnBrokenSymbolicLink: this._options.throwErrorOnBrokenSymbolicLink
        });
      }
      _getValue(option, value) {
        return option !== null && option !== void 0 ? option : value;
      }
    };
    exports.default = Settings;
  }
});
var require_out3 = __commonJS({
  "node_modules/@nodelib/fs.walk/out/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Settings = exports.walkStream = exports.walkSync = exports.walk = void 0;
    var async_1 = require_async4();
    var stream_1 = require_stream2();
    var sync_1 = require_sync4();
    var settings_1 = require_settings3();
    exports.Settings = settings_1.default;
    function walk(directory, optionsOrSettingsOrCallback, callback) {
      if (typeof optionsOrSettingsOrCallback === "function") {
        new async_1.default(directory, getSettings()).read(optionsOrSettingsOrCallback);
        return;
      }
      new async_1.default(directory, getSettings(optionsOrSettingsOrCallback)).read(callback);
    }
    exports.walk = walk;
    function walkSync(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      const provider = new sync_1.default(directory, settings);
      return provider.read();
    }
    exports.walkSync = walkSync;
    function walkStream(directory, optionsOrSettings) {
      const settings = getSettings(optionsOrSettings);
      const provider = new stream_1.default(directory, settings);
      return provider.read();
    }
    exports.walkStream = walkStream;
    function getSettings(settingsOrOptions = {}) {
      if (settingsOrOptions instanceof settings_1.default) {
        return settingsOrOptions;
      }
      return new settings_1.default(settingsOrOptions);
    }
  }
});
var require_reader2 = __commonJS({
  "node_modules/fast-glob/out/readers/reader.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path2 = __require("path");
    var fsStat = require_out();
    var utils = require_utils3();
    var Reader = class {
      constructor(_settings) {
        this._settings = _settings;
        this._fsStatSettings = new fsStat.Settings({
          followSymbolicLink: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          throwErrorOnBrokenSymbolicLink: this._settings.followSymbolicLinks
        });
      }
      _getFullEntryPath(filepath) {
        return path2.resolve(this._settings.cwd, filepath);
      }
      _makeEntry(stats, pattern) {
        const entry = {
          name: pattern,
          path: pattern,
          dirent: utils.fs.createDirentFromStats(pattern, stats)
        };
        if (this._settings.stats) {
          entry.stats = stats;
        }
        return entry;
      }
      _isFatalError(error) {
        return !utils.errno.isEnoentCodeError(error) && !this._settings.suppressErrors;
      }
    };
    exports.default = Reader;
  }
});
var require_stream3 = __commonJS({
  "node_modules/fast-glob/out/readers/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = __require("stream");
    var fsStat = require_out();
    var fsWalk = require_out3();
    var reader_1 = require_reader2();
    var ReaderStream = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._walkStream = fsWalk.walkStream;
        this._stat = fsStat.stat;
      }
      dynamic(root, options) {
        return this._walkStream(root, options);
      }
      static(patterns, options) {
        const filepaths = patterns.map(this._getFullEntryPath, this);
        const stream = new stream_1.PassThrough({ objectMode: true });
        stream._write = (index, _enc, done) => {
          return this._getEntry(filepaths[index], patterns[index], options).then((entry) => {
            if (entry !== null && options.entryFilter(entry)) {
              stream.push(entry);
            }
            if (index === filepaths.length - 1) {
              stream.end();
            }
            done();
          }).catch(done);
        };
        for (let i = 0; i < filepaths.length; i++) {
          stream.write(i);
        }
        return stream;
      }
      _getEntry(filepath, pattern, options) {
        return this._getStat(filepath).then((stats) => this._makeEntry(stats, pattern)).catch((error) => {
          if (options.errorFilter(error)) {
            return null;
          }
          throw error;
        });
      }
      _getStat(filepath) {
        return new Promise((resolve, reject) => {
          this._stat(filepath, this._fsStatSettings, (error, stats) => {
            return error === null ? resolve(stats) : reject(error);
          });
        });
      }
    };
    exports.default = ReaderStream;
  }
});
var require_async5 = __commonJS({
  "node_modules/fast-glob/out/readers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fsWalk = require_out3();
    var reader_1 = require_reader2();
    var stream_1 = require_stream3();
    var ReaderAsync = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._walkAsync = fsWalk.walk;
        this._readerStream = new stream_1.default(this._settings);
      }
      dynamic(root, options) {
        return new Promise((resolve, reject) => {
          this._walkAsync(root, options, (error, entries) => {
            if (error === null) {
              resolve(entries);
            } else {
              reject(error);
            }
          });
        });
      }
      async static(patterns, options) {
        const entries = [];
        const stream = this._readerStream.static(patterns, options);
        return new Promise((resolve, reject) => {
          stream.once("error", reject);
          stream.on("data", (entry) => entries.push(entry));
          stream.once("end", () => resolve(entries));
        });
      }
    };
    exports.default = ReaderAsync;
  }
});
var require_matcher = __commonJS({
  "node_modules/fast-glob/out/providers/matchers/matcher.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils3();
    var Matcher = class {
      constructor(_patterns, _settings, _micromatchOptions) {
        this._patterns = _patterns;
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this._storage = [];
        this._fillStorage();
      }
      _fillStorage() {
        for (const pattern of this._patterns) {
          const segments = this._getPatternSegments(pattern);
          const sections = this._splitSegmentsIntoSections(segments);
          this._storage.push({
            complete: sections.length <= 1,
            pattern,
            segments,
            sections
          });
        }
      }
      _getPatternSegments(pattern) {
        const parts = utils.pattern.getPatternParts(pattern, this._micromatchOptions);
        return parts.map((part) => {
          const dynamic = utils.pattern.isDynamicPattern(part, this._settings);
          if (!dynamic) {
            return {
              dynamic: false,
              pattern: part
            };
          }
          return {
            dynamic: true,
            pattern: part,
            patternRe: utils.pattern.makeRe(part, this._micromatchOptions)
          };
        });
      }
      _splitSegmentsIntoSections(segments) {
        return utils.array.splitWhen(segments, (segment) => segment.dynamic && utils.pattern.hasGlobStar(segment.pattern));
      }
    };
    exports.default = Matcher;
  }
});
var require_partial = __commonJS({
  "node_modules/fast-glob/out/providers/matchers/partial.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var matcher_1 = require_matcher();
    var PartialMatcher = class extends matcher_1.default {
      match(filepath) {
        const parts = filepath.split("/");
        const levels = parts.length;
        const patterns = this._storage.filter((info) => !info.complete || info.segments.length > levels);
        for (const pattern of patterns) {
          const section = pattern.sections[0];
          if (!pattern.complete && levels > section.length) {
            return true;
          }
          const match = parts.every((part, index) => {
            const segment = pattern.segments[index];
            if (segment.dynamic && segment.patternRe.test(part)) {
              return true;
            }
            if (!segment.dynamic && segment.pattern === part) {
              return true;
            }
            return false;
          });
          if (match) {
            return true;
          }
        }
        return false;
      }
    };
    exports.default = PartialMatcher;
  }
});
var require_deep = __commonJS({
  "node_modules/fast-glob/out/providers/filters/deep.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils3();
    var partial_1 = require_partial();
    var DeepFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
      }
      getFilter(basePath, positive, negative) {
        const matcher = this._getMatcher(positive);
        const negativeRe = this._getNegativePatternsRe(negative);
        return (entry) => this._filter(basePath, entry, matcher, negativeRe);
      }
      _getMatcher(patterns) {
        return new partial_1.default(patterns, this._settings, this._micromatchOptions);
      }
      _getNegativePatternsRe(patterns) {
        const affectDepthOfReadingPatterns = patterns.filter(utils.pattern.isAffectDepthOfReadingPattern);
        return utils.pattern.convertPatternsToRe(affectDepthOfReadingPatterns, this._micromatchOptions);
      }
      _filter(basePath, entry, matcher, negativeRe) {
        if (this._isSkippedByDeep(basePath, entry.path)) {
          return false;
        }
        if (this._isSkippedSymbolicLink(entry)) {
          return false;
        }
        const filepath = utils.path.removeLeadingDotSegment(entry.path);
        if (this._isSkippedByPositivePatterns(filepath, matcher)) {
          return false;
        }
        return this._isSkippedByNegativePatterns(filepath, negativeRe);
      }
      _isSkippedByDeep(basePath, entryPath) {
        if (this._settings.deep === Infinity) {
          return false;
        }
        return this._getEntryLevel(basePath, entryPath) >= this._settings.deep;
      }
      _getEntryLevel(basePath, entryPath) {
        const entryPathDepth = entryPath.split("/").length;
        if (basePath === "") {
          return entryPathDepth;
        }
        const basePathDepth = basePath.split("/").length;
        return entryPathDepth - basePathDepth;
      }
      _isSkippedSymbolicLink(entry) {
        return !this._settings.followSymbolicLinks && entry.dirent.isSymbolicLink();
      }
      _isSkippedByPositivePatterns(entryPath, matcher) {
        return !this._settings.baseNameMatch && !matcher.match(entryPath);
      }
      _isSkippedByNegativePatterns(entryPath, patternsRe) {
        return !utils.pattern.matchAny(entryPath, patternsRe);
      }
    };
    exports.default = DeepFilter;
  }
});
var require_entry = __commonJS({
  "node_modules/fast-glob/out/providers/filters/entry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils3();
    var EntryFilter = class {
      constructor(_settings, _micromatchOptions) {
        this._settings = _settings;
        this._micromatchOptions = _micromatchOptions;
        this.index = /* @__PURE__ */ new Map();
      }
      getFilter(positive, negative) {
        const positiveRe = utils.pattern.convertPatternsToRe(positive, this._micromatchOptions);
        const negativeRe = utils.pattern.convertPatternsToRe(negative, Object.assign(Object.assign({}, this._micromatchOptions), { dot: true }));
        return (entry) => this._filter(entry, positiveRe, negativeRe);
      }
      _filter(entry, positiveRe, negativeRe) {
        const filepath = utils.path.removeLeadingDotSegment(entry.path);
        if (this._settings.unique && this._isDuplicateEntry(filepath)) {
          return false;
        }
        if (this._onlyFileFilter(entry) || this._onlyDirectoryFilter(entry)) {
          return false;
        }
        if (this._isSkippedByAbsoluteNegativePatterns(filepath, negativeRe)) {
          return false;
        }
        const isDirectory2 = entry.dirent.isDirectory();
        const isMatched = this._isMatchToPatterns(filepath, positiveRe, isDirectory2) && !this._isMatchToPatterns(filepath, negativeRe, isDirectory2);
        if (this._settings.unique && isMatched) {
          this._createIndexRecord(filepath);
        }
        return isMatched;
      }
      _isDuplicateEntry(filepath) {
        return this.index.has(filepath);
      }
      _createIndexRecord(filepath) {
        this.index.set(filepath, void 0);
      }
      _onlyFileFilter(entry) {
        return this._settings.onlyFiles && !entry.dirent.isFile();
      }
      _onlyDirectoryFilter(entry) {
        return this._settings.onlyDirectories && !entry.dirent.isDirectory();
      }
      _isSkippedByAbsoluteNegativePatterns(entryPath, patternsRe) {
        if (!this._settings.absolute) {
          return false;
        }
        const fullpath = utils.path.makeAbsolute(this._settings.cwd, entryPath);
        return utils.pattern.matchAny(fullpath, patternsRe);
      }
      _isMatchToPatterns(filepath, patternsRe, isDirectory2) {
        const isMatched = utils.pattern.matchAny(filepath, patternsRe);
        if (!isMatched && isDirectory2) {
          return utils.pattern.matchAny(filepath + "/", patternsRe);
        }
        return isMatched;
      }
    };
    exports.default = EntryFilter;
  }
});
var require_error = __commonJS({
  "node_modules/fast-glob/out/providers/filters/error.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils3();
    var ErrorFilter = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getFilter() {
        return (error) => this._isNonFatalError(error);
      }
      _isNonFatalError(error) {
        return utils.errno.isEnoentCodeError(error) || this._settings.suppressErrors;
      }
    };
    exports.default = ErrorFilter;
  }
});
var require_entry2 = __commonJS({
  "node_modules/fast-glob/out/providers/transformers/entry.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var utils = require_utils3();
    var EntryTransformer = class {
      constructor(_settings) {
        this._settings = _settings;
      }
      getTransformer() {
        return (entry) => this._transform(entry);
      }
      _transform(entry) {
        let filepath = entry.path;
        if (this._settings.absolute) {
          filepath = utils.path.makeAbsolute(this._settings.cwd, filepath);
          filepath = utils.path.unixify(filepath);
        }
        if (this._settings.markDirectories && entry.dirent.isDirectory()) {
          filepath += "/";
        }
        if (!this._settings.objectMode) {
          return filepath;
        }
        return Object.assign(Object.assign({}, entry), { path: filepath });
      }
    };
    exports.default = EntryTransformer;
  }
});
var require_provider = __commonJS({
  "node_modules/fast-glob/out/providers/provider.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var path2 = __require("path");
    var deep_1 = require_deep();
    var entry_1 = require_entry();
    var error_1 = require_error();
    var entry_2 = require_entry2();
    var Provider = class {
      constructor(_settings) {
        this._settings = _settings;
        this.errorFilter = new error_1.default(this._settings);
        this.entryFilter = new entry_1.default(this._settings, this._getMicromatchOptions());
        this.deepFilter = new deep_1.default(this._settings, this._getMicromatchOptions());
        this.entryTransformer = new entry_2.default(this._settings);
      }
      _getRootDirectory(task) {
        return path2.resolve(this._settings.cwd, task.base);
      }
      _getReaderOptions(task) {
        const basePath = task.base === "." ? "" : task.base;
        return {
          basePath,
          pathSegmentSeparator: "/",
          concurrency: this._settings.concurrency,
          deepFilter: this.deepFilter.getFilter(basePath, task.positive, task.negative),
          entryFilter: this.entryFilter.getFilter(task.positive, task.negative),
          errorFilter: this.errorFilter.getFilter(),
          followSymbolicLinks: this._settings.followSymbolicLinks,
          fs: this._settings.fs,
          stats: this._settings.stats,
          throwErrorOnBrokenSymbolicLink: this._settings.throwErrorOnBrokenSymbolicLink,
          transform: this.entryTransformer.getTransformer()
        };
      }
      _getMicromatchOptions() {
        return {
          dot: this._settings.dot,
          matchBase: this._settings.baseNameMatch,
          nobrace: !this._settings.braceExpansion,
          nocase: !this._settings.caseSensitiveMatch,
          noext: !this._settings.extglob,
          noglobstar: !this._settings.globstar,
          posix: true,
          strictSlashes: false
        };
      }
    };
    exports.default = Provider;
  }
});
var require_async6 = __commonJS({
  "node_modules/fast-glob/out/providers/async.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var async_1 = require_async5();
    var provider_1 = require_provider();
    var ProviderAsync = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new async_1.default(this._settings);
      }
      async read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = await this.api(root, task, options);
        return entries.map((entry) => options.transform(entry));
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderAsync;
  }
});
var require_stream4 = __commonJS({
  "node_modules/fast-glob/out/providers/stream.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stream_1 = __require("stream");
    var stream_2 = require_stream3();
    var provider_1 = require_provider();
    var ProviderStream = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new stream_2.default(this._settings);
      }
      read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const source = this.api(root, task, options);
        const destination = new stream_1.Readable({ objectMode: true, read: () => {
        } });
        source.once("error", (error) => destination.emit("error", error)).on("data", (entry) => destination.emit("data", options.transform(entry))).once("end", () => destination.emit("end"));
        destination.once("close", () => source.destroy());
        return destination;
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderStream;
  }
});
var require_sync5 = __commonJS({
  "node_modules/fast-glob/out/readers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fsStat = require_out();
    var fsWalk = require_out3();
    var reader_1 = require_reader2();
    var ReaderSync = class extends reader_1.default {
      constructor() {
        super(...arguments);
        this._walkSync = fsWalk.walkSync;
        this._statSync = fsStat.statSync;
      }
      dynamic(root, options) {
        return this._walkSync(root, options);
      }
      static(patterns, options) {
        const entries = [];
        for (const pattern of patterns) {
          const filepath = this._getFullEntryPath(pattern);
          const entry = this._getEntry(filepath, pattern, options);
          if (entry === null || !options.entryFilter(entry)) {
            continue;
          }
          entries.push(entry);
        }
        return entries;
      }
      _getEntry(filepath, pattern, options) {
        try {
          const stats = this._getStat(filepath);
          return this._makeEntry(stats, pattern);
        } catch (error) {
          if (options.errorFilter(error)) {
            return null;
          }
          throw error;
        }
      }
      _getStat(filepath) {
        return this._statSync(filepath, this._fsStatSettings);
      }
    };
    exports.default = ReaderSync;
  }
});
var require_sync6 = __commonJS({
  "node_modules/fast-glob/out/providers/sync.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var sync_1 = require_sync5();
    var provider_1 = require_provider();
    var ProviderSync = class extends provider_1.default {
      constructor() {
        super(...arguments);
        this._reader = new sync_1.default(this._settings);
      }
      read(task) {
        const root = this._getRootDirectory(task);
        const options = this._getReaderOptions(task);
        const entries = this.api(root, task, options);
        return entries.map(options.transform);
      }
      api(root, task, options) {
        if (task.dynamic) {
          return this._reader.dynamic(root, options);
        }
        return this._reader.static(task.patterns, options);
      }
    };
    exports.default = ProviderSync;
  }
});
var require_settings4 = __commonJS({
  "node_modules/fast-glob/out/settings.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = void 0;
    var fs6 = __require("fs");
    var os22 = __require("os");
    var CPU_COUNT = Math.max(os22.cpus().length, 1);
    exports.DEFAULT_FILE_SYSTEM_ADAPTER = {
      lstat: fs6.lstat,
      lstatSync: fs6.lstatSync,
      stat: fs6.stat,
      statSync: fs6.statSync,
      readdir: fs6.readdir,
      readdirSync: fs6.readdirSync
    };
    var Settings = class {
      constructor(_options = {}) {
        this._options = _options;
        this.absolute = this._getValue(this._options.absolute, false);
        this.baseNameMatch = this._getValue(this._options.baseNameMatch, false);
        this.braceExpansion = this._getValue(this._options.braceExpansion, true);
        this.caseSensitiveMatch = this._getValue(this._options.caseSensitiveMatch, true);
        this.concurrency = this._getValue(this._options.concurrency, CPU_COUNT);
        this.cwd = this._getValue(this._options.cwd, process.cwd());
        this.deep = this._getValue(this._options.deep, Infinity);
        this.dot = this._getValue(this._options.dot, false);
        this.extglob = this._getValue(this._options.extglob, true);
        this.followSymbolicLinks = this._getValue(this._options.followSymbolicLinks, true);
        this.fs = this._getFileSystemMethods(this._options.fs);
        this.globstar = this._getValue(this._options.globstar, true);
        this.ignore = this._getValue(this._options.ignore, []);
        this.markDirectories = this._getValue(this._options.markDirectories, false);
        this.objectMode = this._getValue(this._options.objectMode, false);
        this.onlyDirectories = this._getValue(this._options.onlyDirectories, false);
        this.onlyFiles = this._getValue(this._options.onlyFiles, true);
        this.stats = this._getValue(this._options.stats, false);
        this.suppressErrors = this._getValue(this._options.suppressErrors, false);
        this.throwErrorOnBrokenSymbolicLink = this._getValue(this._options.throwErrorOnBrokenSymbolicLink, false);
        this.unique = this._getValue(this._options.unique, true);
        if (this.onlyDirectories) {
          this.onlyFiles = false;
        }
        if (this.stats) {
          this.objectMode = true;
        }
        this.ignore = [].concat(this.ignore);
      }
      _getValue(option, value) {
        return option === void 0 ? value : option;
      }
      _getFileSystemMethods(methods = {}) {
        return Object.assign(Object.assign({}, exports.DEFAULT_FILE_SYSTEM_ADAPTER), methods);
      }
    };
    exports.default = Settings;
  }
});
var require_out4 = __commonJS({
  "node_modules/fast-glob/out/index.js"(exports, module) {
    "use strict";
    var taskManager = require_tasks();
    var async_1 = require_async6();
    var stream_1 = require_stream4();
    var sync_1 = require_sync6();
    var settings_1 = require_settings4();
    var utils = require_utils3();
    async function FastGlob(source, options) {
      assertPatternsInput2(source);
      const works = getWorks(source, async_1.default, options);
      const result = await Promise.all(works);
      return utils.array.flatten(result);
    }
    (function(FastGlob2) {
      FastGlob2.glob = FastGlob2;
      FastGlob2.globSync = sync;
      FastGlob2.globStream = stream;
      FastGlob2.async = FastGlob2;
      function sync(source, options) {
        assertPatternsInput2(source);
        const works = getWorks(source, sync_1.default, options);
        return utils.array.flatten(works);
      }
      FastGlob2.sync = sync;
      function stream(source, options) {
        assertPatternsInput2(source);
        const works = getWorks(source, stream_1.default, options);
        return utils.stream.merge(works);
      }
      FastGlob2.stream = stream;
      function generateTasks2(source, options) {
        assertPatternsInput2(source);
        const patterns = [].concat(source);
        const settings = new settings_1.default(options);
        return taskManager.generate(patterns, settings);
      }
      FastGlob2.generateTasks = generateTasks2;
      function isDynamicPattern2(source, options) {
        assertPatternsInput2(source);
        const settings = new settings_1.default(options);
        return utils.pattern.isDynamicPattern(source, settings);
      }
      FastGlob2.isDynamicPattern = isDynamicPattern2;
      function escapePath(source) {
        assertPatternsInput2(source);
        return utils.path.escape(source);
      }
      FastGlob2.escapePath = escapePath;
      function convertPathToPattern2(source) {
        assertPatternsInput2(source);
        return utils.path.convertPathToPattern(source);
      }
      FastGlob2.convertPathToPattern = convertPathToPattern2;
      let posix;
      (function(posix2) {
        function escapePath2(source) {
          assertPatternsInput2(source);
          return utils.path.escapePosixPath(source);
        }
        posix2.escapePath = escapePath2;
        function convertPathToPattern3(source) {
          assertPatternsInput2(source);
          return utils.path.convertPosixPathToPattern(source);
        }
        posix2.convertPathToPattern = convertPathToPattern3;
      })(posix = FastGlob2.posix || (FastGlob2.posix = {}));
      let win32;
      (function(win322) {
        function escapePath2(source) {
          assertPatternsInput2(source);
          return utils.path.escapeWindowsPath(source);
        }
        win322.escapePath = escapePath2;
        function convertPathToPattern3(source) {
          assertPatternsInput2(source);
          return utils.path.convertWindowsPathToPattern(source);
        }
        win322.convertPathToPattern = convertPathToPattern3;
      })(win32 = FastGlob2.win32 || (FastGlob2.win32 = {}));
    })(FastGlob || (FastGlob = {}));
    function getWorks(source, _Provider, options) {
      const patterns = [].concat(source);
      const settings = new settings_1.default(options);
      const tasks = taskManager.generate(patterns, settings);
      const provider = new _Provider(settings);
      return tasks.map(provider.read, provider);
    }
    function assertPatternsInput2(input) {
      const source = [].concat(input);
      const isValidSource = source.every((item) => utils.string.isString(item) && !utils.string.isEmpty(item));
      if (!isValidSource) {
        throw new TypeError("Patterns must be a string (non empty) or an array of strings");
      }
    }
    module.exports = FastGlob;
  }
});
var require_ignore = __commonJS({
  "node_modules/ignore/index.js"(exports, module) {
    "use strict";
    function makeArray(subject) {
      return Array.isArray(subject) ? subject : [subject];
    }
    var EMPTY = "";
    var SPACE = " ";
    var ESCAPE = "\\";
    var REGEX_TEST_BLANK_LINE = /^\s+$/;
    var REGEX_INVALID_TRAILING_BACKSLASH = /(?:[^\\]|^)\\$/;
    var REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION = /^\\!/;
    var REGEX_REPLACE_LEADING_EXCAPED_HASH = /^\\#/;
    var REGEX_SPLITALL_CRLF = /\r?\n/g;
    var REGEX_TEST_INVALID_PATH = /^\.*\/|^\.+$/;
    var SLASH = "/";
    var TMP_KEY_IGNORE = "node-ignore";
    if (typeof Symbol !== "undefined") {
      TMP_KEY_IGNORE = Symbol.for("node-ignore");
    }
    var KEY_IGNORE = TMP_KEY_IGNORE;
    var define = (object, key, value) => Object.defineProperty(object, key, { value });
    var REGEX_REGEXP_RANGE = /([0-z])-([0-z])/g;
    var RETURN_FALSE = () => false;
    var sanitizeRange = (range) => range.replace(
      REGEX_REGEXP_RANGE,
      (match, from, to) => from.charCodeAt(0) <= to.charCodeAt(0) ? match : EMPTY
    );
    var cleanRangeBackSlash = (slashes) => {
      const { length } = slashes;
      return slashes.slice(0, length - length % 2);
    };
    var REPLACERS = [
      [
        // remove BOM
        // TODO:
        // Other similar zero-width characters?
        /^\uFEFF/,
        () => EMPTY
      ],
      // > Trailing spaces are ignored unless they are quoted with backslash ("\")
      [
        // (a\ ) -> (a )
        // (a  ) -> (a)
        // (a \ ) -> (a  )
        /\\?\s+$/,
        (match) => match.indexOf("\\") === 0 ? SPACE : EMPTY
      ],
      // replace (\ ) with ' '
      [
        /\\\s/g,
        () => SPACE
      ],
      // Escape metacharacters
      // which is written down by users but means special for regular expressions.
      // > There are 12 characters with special meanings:
      // > - the backslash \,
      // > - the caret ^,
      // > - the dollar sign $,
      // > - the period or dot .,
      // > - the vertical bar or pipe symbol |,
      // > - the question mark ?,
      // > - the asterisk or star *,
      // > - the plus sign +,
      // > - the opening parenthesis (,
      // > - the closing parenthesis ),
      // > - and the opening square bracket [,
      // > - the opening curly brace {,
      // > These special characters are often called "metacharacters".
      [
        /[\\$.|*+(){^]/g,
        (match) => `\\${match}`
      ],
      [
        // > a question mark (?) matches a single character
        /(?!\\)\?/g,
        () => "[^/]"
      ],
      // leading slash
      [
        // > A leading slash matches the beginning of the pathname.
        // > For example, "/*.c" matches "cat-file.c" but not "mozilla-sha1/sha1.c".
        // A leading slash matches the beginning of the pathname
        /^\//,
        () => "^"
      ],
      // replace special metacharacter slash after the leading slash
      [
        /\//g,
        () => "\\/"
      ],
      [
        // > A leading "**" followed by a slash means match in all directories.
        // > For example, "**/foo" matches file or directory "foo" anywhere,
        // > the same as pattern "foo".
        // > "**/foo/bar" matches file or directory "bar" anywhere that is directly
        // >   under directory "foo".
        // Notice that the '*'s have been replaced as '\\*'
        /^\^*\\\*\\\*\\\//,
        // '**/foo' <-> 'foo'
        () => "^(?:.*\\/)?"
      ],
      // starting
      [
        // there will be no leading '/'
        //   (which has been replaced by section "leading slash")
        // If starts with '**', adding a '^' to the regular expression also works
        /^(?=[^^])/,
        function startingReplacer() {
          return !/\/(?!$)/.test(this) ? "(?:^|\\/)" : "^";
        }
      ],
      // two globstars
      [
        // Use lookahead assertions so that we could match more than one `'/**'`
        /\\\/\\\*\\\*(?=\\\/|$)/g,
        // Zero, one or several directories
        // should not use '*', or it will be replaced by the next replacer
        // Check if it is not the last `'/**'`
        (_, index, str) => index + 6 < str.length ? "(?:\\/[^\\/]+)*" : "\\/.+"
      ],
      // normal intermediate wildcards
      [
        // Never replace escaped '*'
        // ignore rule '\*' will match the path '*'
        // 'abc.*/' -> go
        // 'abc.*'  -> skip this rule,
        //    coz trailing single wildcard will be handed by [trailing wildcard]
        /(^|[^\\]+)(\\\*)+(?=.+)/g,
        // '*.js' matches '.js'
        // '*.js' doesn't match 'abc'
        (_, p1, p2) => {
          const unescaped = p2.replace(/\\\*/g, "[^\\/]*");
          return p1 + unescaped;
        }
      ],
      [
        // unescape, revert step 3 except for back slash
        // For example, if a user escape a '\\*',
        // after step 3, the result will be '\\\\\\*'
        /\\\\\\(?=[$.|*+(){^])/g,
        () => ESCAPE
      ],
      [
        // '\\\\' -> '\\'
        /\\\\/g,
        () => ESCAPE
      ],
      [
        // > The range notation, e.g. [a-zA-Z],
        // > can be used to match one of the characters in a range.
        // `\` is escaped by step 3
        /(\\)?\[([^\]/]*?)(\\*)($|\])/g,
        (match, leadEscape, range, endEscape, close) => leadEscape === ESCAPE ? `\\[${range}${cleanRangeBackSlash(endEscape)}${close}` : close === "]" ? endEscape.length % 2 === 0 ? `[${sanitizeRange(range)}${endEscape}]` : "[]" : "[]"
      ],
      // ending
      [
        // 'js' will not match 'js.'
        // 'ab' will not match 'abc'
        /(?:[^*])$/,
        // WTF!
        // https://git-scm.com/docs/gitignore
        // changes in [2.22.1](https://git-scm.com/docs/gitignore/2.22.1)
        // which re-fixes #24, #38
        // > If there is a separator at the end of the pattern then the pattern
        // > will only match directories, otherwise the pattern can match both
        // > files and directories.
        // 'js*' will not match 'a.js'
        // 'js/' will not match 'a.js'
        // 'js' will match 'a.js' and 'a.js/'
        (match) => /\/$/.test(match) ? `${match}$` : `${match}(?=$|\\/$)`
      ],
      // trailing wildcard
      [
        /(\^|\\\/)?\\\*$/,
        (_, p1) => {
          const prefix = p1 ? `${p1}[^/]+` : "[^/]*";
          return `${prefix}(?=$|\\/$)`;
        }
      ]
    ];
    var regexCache = /* @__PURE__ */ Object.create(null);
    var makeRegex = (pattern, ignoreCase) => {
      let source = regexCache[pattern];
      if (!source) {
        source = REPLACERS.reduce(
          (prev, current) => prev.replace(current[0], current[1].bind(pattern)),
          pattern
        );
        regexCache[pattern] = source;
      }
      return ignoreCase ? new RegExp(source, "i") : new RegExp(source);
    };
    var isString2 = (subject) => typeof subject === "string";
    var checkPattern = (pattern) => pattern && isString2(pattern) && !REGEX_TEST_BLANK_LINE.test(pattern) && !REGEX_INVALID_TRAILING_BACKSLASH.test(pattern) && pattern.indexOf("#") !== 0;
    var splitPattern = (pattern) => pattern.split(REGEX_SPLITALL_CRLF);
    var IgnoreRule = class {
      constructor(origin, pattern, negative, regex) {
        this.origin = origin;
        this.pattern = pattern;
        this.negative = negative;
        this.regex = regex;
      }
    };
    var createRule = (pattern, ignoreCase) => {
      const origin = pattern;
      let negative = false;
      if (pattern.indexOf("!") === 0) {
        negative = true;
        pattern = pattern.substr(1);
      }
      pattern = pattern.replace(REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION, "!").replace(REGEX_REPLACE_LEADING_EXCAPED_HASH, "#");
      const regex = makeRegex(pattern, ignoreCase);
      return new IgnoreRule(
        origin,
        pattern,
        negative,
        regex
      );
    };
    var throwError = (message, Ctor) => {
      throw new Ctor(message);
    };
    var checkPath = (path2, originalPath, doThrow) => {
      if (!isString2(path2)) {
        return doThrow(
          `path must be a string, but got \`${originalPath}\``,
          TypeError
        );
      }
      if (!path2) {
        return doThrow(`path must not be empty`, TypeError);
      }
      if (checkPath.isNotRelative(path2)) {
        const r = "`path.relative()`d";
        return doThrow(
          `path should be a ${r} string, but got "${originalPath}"`,
          RangeError
        );
      }
      return true;
    };
    var isNotRelative = (path2) => REGEX_TEST_INVALID_PATH.test(path2);
    checkPath.isNotRelative = isNotRelative;
    checkPath.convert = (p) => p;
    var Ignore = class {
      constructor({
        ignorecase = true,
        ignoreCase = ignorecase,
        allowRelativePaths = false
      } = {}) {
        define(this, KEY_IGNORE, true);
        this._rules = [];
        this._ignoreCase = ignoreCase;
        this._allowRelativePaths = allowRelativePaths;
        this._initCache();
      }
      _initCache() {
        this._ignoreCache = /* @__PURE__ */ Object.create(null);
        this._testCache = /* @__PURE__ */ Object.create(null);
      }
      _addPattern(pattern) {
        if (pattern && pattern[KEY_IGNORE]) {
          this._rules = this._rules.concat(pattern._rules);
          this._added = true;
          return;
        }
        if (checkPattern(pattern)) {
          const rule = createRule(pattern, this._ignoreCase);
          this._added = true;
          this._rules.push(rule);
        }
      }
      // @param {Array<string> | string | Ignore} pattern
      add(pattern) {
        this._added = false;
        makeArray(
          isString2(pattern) ? splitPattern(pattern) : pattern
        ).forEach(this._addPattern, this);
        if (this._added) {
          this._initCache();
        }
        return this;
      }
      // legacy
      addPattern(pattern) {
        return this.add(pattern);
      }
      //          |           ignored : unignored
      // negative |   0:0   |   0:1   |   1:0   |   1:1
      // -------- | ------- | ------- | ------- | --------
      //     0    |  TEST   |  TEST   |  SKIP   |    X
      //     1    |  TESTIF |  SKIP   |  TEST   |    X
      // - SKIP: always skip
      // - TEST: always test
      // - TESTIF: only test if checkUnignored
      // - X: that never happen
      // @param {boolean} whether should check if the path is unignored,
      //   setting `checkUnignored` to `false` could reduce additional
      //   path matching.
      // @returns {TestResult} true if a file is ignored
      _testOne(path2, checkUnignored) {
        let ignored = false;
        let unignored = false;
        this._rules.forEach((rule) => {
          const { negative } = rule;
          if (unignored === negative && ignored !== unignored || negative && !ignored && !unignored && !checkUnignored) {
            return;
          }
          const matched = rule.regex.test(path2);
          if (matched) {
            ignored = !negative;
            unignored = negative;
          }
        });
        return {
          ignored,
          unignored
        };
      }
      // @returns {TestResult}
      _test(originalPath, cache, checkUnignored, slices) {
        const path2 = originalPath && checkPath.convert(originalPath);
        checkPath(
          path2,
          originalPath,
          this._allowRelativePaths ? RETURN_FALSE : throwError
        );
        return this._t(path2, cache, checkUnignored, slices);
      }
      _t(path2, cache, checkUnignored, slices) {
        if (path2 in cache) {
          return cache[path2];
        }
        if (!slices) {
          slices = path2.split(SLASH);
        }
        slices.pop();
        if (!slices.length) {
          return cache[path2] = this._testOne(path2, checkUnignored);
        }
        const parent = this._t(
          slices.join(SLASH) + SLASH,
          cache,
          checkUnignored,
          slices
        );
        return cache[path2] = parent.ignored ? parent : this._testOne(path2, checkUnignored);
      }
      ignores(path2) {
        return this._test(path2, this._ignoreCache, false).ignored;
      }
      createFilter() {
        return (path2) => !this.ignores(path2);
      }
      filter(paths) {
        return makeArray(paths).filter(this.createFilter());
      }
      // @returns {TestResult}
      test(path2) {
        return this._test(path2, this._testCache, true);
      }
    };
    var factory = (options) => new Ignore(options);
    var isPathValid = (path2) => checkPath(path2 && checkPath.convert(path2), path2, RETURN_FALSE);
    factory.isPathValid = isPathValid;
    factory.default = factory;
    module.exports = factory;
    if (
      // Detect `process` so that it can run in browsers.
      typeof process !== "undefined" && (process.env && process.env.IGNORE_TEST_WIN32 || process.platform === "win32")
    ) {
      const makePosix = (str) => /^\\\\\?\\/.test(str) || /["<>|\u0000-\u001F]+/u.test(str) ? str : str.replace(/\\/g, "/");
      checkPath.convert = makePosix;
      const REGIX_IS_WINDOWS_PATH_ABSOLUTE = /^[a-z]:\//i;
      checkPath.isNotRelative = (path2) => REGIX_IS_WINDOWS_PATH_ABSOLUTE.test(path2) || isNotRelative(path2);
    }
  }
});
var require_identity = __commonJS({
  "node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    var ALIAS = Symbol.for("yaml.alias");
    var DOC = Symbol.for("yaml.document");
    var MAP = Symbol.for("yaml.map");
    var PAIR = Symbol.for("yaml.pair");
    var SCALAR = Symbol.for("yaml.scalar");
    var SEQ = Symbol.for("yaml.seq");
    var NODE_TYPE = Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});
var require_visit = __commonJS({
  "node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity2.isDocument(node)) {
        const cd2 = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd2 === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path2) {
      const ctrl = callVisitor(key, node, visitor, path2);
      if (identity2.isNode(ctrl) || identity2.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visit_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (identity2.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci2 = visit_(i, node.items[i], visitor, path2);
            if (typeof ci2 === "number")
              i = ci2 - 1;
            else if (ci2 === BREAK)
              return BREAK;
            else if (ci2 === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity2.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = visit_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity2.isDocument(node)) {
        const cd2 = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd2 === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path2) {
      const ctrl = await callVisitor(key, node, visitor, path2);
      if (identity2.isNode(ctrl) || identity2.isPair(ctrl)) {
        replaceNode(key, path2, ctrl);
        return visitAsync_(key, ctrl, visitor, path2);
      }
      if (typeof ctrl !== "symbol") {
        if (identity2.isCollection(node)) {
          path2 = Object.freeze(path2.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci2 = await visitAsync_(i, node.items[i], visitor, path2);
            if (typeof ci2 === "number")
              i = ci2 - 1;
            else if (ci2 === BREAK)
              return BREAK;
            else if (ci2 === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity2.isPair(node)) {
          path2 = Object.freeze(path2.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path2);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path2);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path2) {
      var _a2, _b2, _c, _d, _e;
      if (typeof visitor === "function")
        return visitor(key, node, path2);
      if (identity2.isMap(node))
        return (_a2 = visitor.Map) == null ? void 0 : _a2.call(visitor, key, node, path2);
      if (identity2.isSeq(node))
        return (_b2 = visitor.Seq) == null ? void 0 : _b2.call(visitor, key, node, path2);
      if (identity2.isPair(node))
        return (_c = visitor.Pair) == null ? void 0 : _c.call(visitor, key, node, path2);
      if (identity2.isScalar(node))
        return (_d = visitor.Scalar) == null ? void 0 : _d.call(visitor, key, node, path2);
      if (identity2.isAlias(node))
        return (_e = visitor.Alias) == null ? void 0 : _e.call(visitor, key, node, path2);
      return void 0;
    }
    function replaceNode(key, path2, node) {
      const parent = path2[path2.length - 1];
      if (identity2.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity2.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity2.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt2 = identity2.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt2} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});
var require_directives = __commonJS({
  "node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml2, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml2);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity2.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity2.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});
var require_anchors = __commonJS({
  "node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          if (!prevAnchors)
            prevAnchors = anchorNames(doc);
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity2.isScalar(ref.node) || identity2.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});
var require_applyReviver = __commonJS({
  "node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k2 of Array.from(val.keys())) {
            const v0 = val.get(k2);
            const v1 = applyReviver(reviver, val, k2, v0);
            if (v1 === void 0)
              val.delete(k2);
            else if (v1 !== v0)
              val.set(k2, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k2, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k2, v0);
            if (v1 === void 0)
              delete val[k2];
            else if (v1 !== v0)
              val[k2] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});
var require_toJS = __commonJS({
  "node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v2, i) => toJS(v2, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity2.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !(ctx == null ? void 0 : ctx.keep))
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});
var require_Node = __commonJS({
  "node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity2 = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity2.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity2.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});
var require_Alias = __commonJS({
  "node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity2 = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity2.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc) {
        let found = void 0;
        visit.visit(doc, {
          Node: (_key, node) => {
            if (node === this)
              return visit.visit.BREAK;
            if (node.anchor === this.source)
              found = node;
          }
        });
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const { anchors: anchors2, doc, maxAliasCount } = ctx;
        const source = this.resolve(doc);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        let data = anchors2.get(source);
        if (!data) {
          toJS.toJS(source, null, ctx);
          data = anchors2.get(source);
        }
        if (!data || data.res === void 0) {
          const msg = "This should not happen: Alias anchor was not resolved?";
          throw new ReferenceError(msg);
        }
        if (maxAliasCount >= 0) {
          data.count += 1;
          if (data.aliasCount === 0)
            data.aliasCount = getAliasCount(doc, source, anchors2);
          if (data.count * data.aliasCount > maxAliasCount) {
            const msg = "Excessive alias count indicates a resource exhaustion attack";
            throw new ReferenceError(msg);
          }
        }
        return data.res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity2.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity2.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity2.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});
var require_Scalar = __commonJS({
  "node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity2.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return (ctx == null ? void 0 : ctx.keep) ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});
var require_createNode = __commonJS({
  "node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t4) => t4.tag === tagName);
        const tagObj = match.find((t4) => !t4.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t4) => {
        var _a2;
        return ((_a2 = t4.identify) == null ? void 0 : _a2.call(t4, value)) && !t4.format;
      });
    }
    function createNode(value, tagName, ctx) {
      var _a2, _b2, _c;
      if (identity2.isDocument(value))
        value = value.contents;
      if (identity2.isNode(value))
        return value;
      if (identity2.isPair(value)) {
        const map = (_b2 = (_a2 = ctx.schema[identity2.MAP]).createNode) == null ? void 0 : _b2.call(_a2, ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          if (!ref.anchor)
            ref.anchor = onAnchor(value);
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName == null ? void 0 : tagName.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity2.MAP] : Symbol.iterator in Object(value) ? schema[identity2.SEQ] : schema[identity2.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = (tagObj == null ? void 0 : tagObj.createNode) ? tagObj.createNode(ctx.schema, value, ctx) : typeof ((_c = tagObj == null ? void 0 : tagObj.nodeClass) == null ? void 0 : _c.from) === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});
var require_Collection = __commonJS({
  "node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var identity2 = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path2, value) {
      let v2 = value;
      for (let i = path2.length - 1; i >= 0; --i) {
        const k2 = path2[i];
        if (typeof k2 === "number" && Number.isInteger(k2) && k2 >= 0) {
          const a2 = [];
          a2[k2] = v2;
          v2 = a2;
        } else {
          v2 = /* @__PURE__ */ new Map([[k2, v2]]);
        }
      }
      return createNode.createNode(v2, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path2) => path2 == null || typeof path2 === "object" && !!path2[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity2.isNode(it) || identity2.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path2, value) {
        if (isEmptyPath(path2))
          this.add(value);
        else {
          const [key, ...rest] = path2;
          const node = this.get(key, true);
          if (identity2.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity2.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path2, keepScalar) {
        const [key, ...rest] = path2;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity2.isScalar(node) ? node.value : node;
        else
          return identity2.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity2.isPair(node))
            return false;
          const n3 = node.value;
          return n3 == null || allowScalar && identity2.isScalar(n3) && n3.value == null && !n3.commentBefore && !n3.comment && !n3.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path2) {
        const [key, ...rest] = path2;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity2.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path2, value) {
        const [key, ...rest] = path2;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity2.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    Collection.maxFlowStringSingleLineLength = 60;
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});
var require_stringifyComment = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});
var require_foldFlowLines = __commonJS({
  "node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});
var require_stringifyString = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs2;
      if (singleQuote === false)
        qs2 = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs2 = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs2 = doubleQuotedString;
        else
          qs2 = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs2(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value) || /^\s*$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (literal ? "|" : ">") + (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (literal) {
        value = value.replace(/\n+/g, `$&${indent}`);
        return `${header}
${indent}${start}${value}${end}`;
      }
      value = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
      const body = foldFlowLines.foldFlowLines(`${start}${value}${end}`, indent, foldFlowLines.FOLD_BLOCK, getFoldOptions(ctx, true));
      return `${header}
${indent}${body}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (!value || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => {
          var _a2;
          return tag.default && tag.tag !== "tag:yaml.org,2002:str" && ((_a2 = tag.test) == null ? void 0 : _a2.test(str));
        };
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || (compat == null ? void 0 : compat.some(test)))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t4 = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t4);
        if (res === null)
          throw new Error(`Unsupported default string type ${t4}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});
var require_stringify2 = __commonJS({
  "node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var identity2 = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      var _a2;
      if (item.tag) {
        const match = tags.filter((t4) => t4.tag === item.tag);
        if (match.length > 0)
          return match.find((t4) => t4.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity2.isScalar(item)) {
        obj = item.value;
        const match = tags.filter((t4) => {
          var _a3;
          return (_a3 = t4.identify) == null ? void 0 : _a3.call(t4, obj);
        });
        tagObj = match.find((t4) => t4.format === item.format) ?? match.find((t4) => !t4.format);
      } else {
        obj = item;
        tagObj = tags.find((t4) => t4.nodeClass && obj instanceof t4.nodeClass);
      }
      if (!tagObj) {
        const name = ((_a2 = obj == null ? void 0 : obj.constructor) == null ? void 0 : _a2.name) ?? typeof obj;
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity2.isScalar(node) || identity2.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ? node.tag : tagObj.default ? null : tagObj.tag;
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      var _a2;
      if (identity2.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity2.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if ((_a2 = ctx.resolvedAliases) == null ? void 0 : _a2.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity2.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o3) => tagObj = o3 });
      if (!tagObj)
        tagObj = getTagObject(ctx.doc.schema.tags, node);
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity2.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity2.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});
var require_stringifyPair = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify2();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity2.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity2.isCollection(key)) {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity2.isCollection(key) || (identity2.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity2.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity2.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity2.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n")
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity2.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});
var require_log = __commonJS({
  "node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof process !== "undefined" && process.emitWarning)
          process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});
var require_addPairToJSMap = __commonJS({
  "node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log2 = require_log();
    var stringify = require_stringify2();
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var MERGE_KEY = "<<";
    function addPairToJSMap(ctx, map, { key, value }) {
      if ((ctx == null ? void 0 : ctx.doc.schema.merge) && isMergeKey(key)) {
        value = identity2.isAlias(value) ? value.resolve(ctx.doc) : value;
        if (identity2.isSeq(value))
          for (const it of value.items)
            mergeToJSMap(ctx, map, it);
        else if (Array.isArray(value))
          for (const it of value)
            mergeToJSMap(ctx, map, it);
        else
          mergeToJSMap(ctx, map, value);
      } else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    var isMergeKey = (key) => key === MERGE_KEY || identity2.isScalar(key) && key.value === MERGE_KEY && (!key.type || key.type === Scalar.Scalar.PLAIN);
    function mergeToJSMap(ctx, map, value) {
      const source = ctx && identity2.isAlias(value) ? value.resolve(ctx.doc) : value;
      if (!identity2.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity2.isNode(key) && (ctx == null ? void 0 : ctx.doc)) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log2.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});
var require_Pair = __commonJS({
  "node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity2 = require_identity();
    function createPair(key, value, ctx) {
      const k2 = createNode.createNode(key, void 0, ctx);
      const v2 = createNode.createNode(value, void 0, ctx);
      return new Pair(k2, v2);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity2.NODE_TYPE, { value: identity2.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity2.isNode(key))
          key = key.clone(schema);
        if (identity2.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return (ctx == null ? void 0 : ctx.doc) ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});
var require_stringifyCollection = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var stringify = require_stringify2();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity2.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity2.isPair(item)) {
          const ik = identity2.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity2.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity2.isPair(item)) {
          const ik = identity2.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity2.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && (ik == null ? void 0 : ik.comment)) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        if (i < items.length - 1)
          str += ",";
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        if (!reqNewline && (lines.length > linesAtValue || str.includes("\n")))
          reqNewline = true;
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});
var require_YAMLMap = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity2 = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k2 = identity2.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity2.isPair(it)) {
          if (it.key === key || it.key === k2)
            return it;
          if (identity2.isScalar(it.key) && it.key.value === k2)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity2.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        var _a2;
        let _pair;
        if (identity2.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair == null ? void 0 : pair.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = (_a2 = this.schema) == null ? void 0 : _a2.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity2.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it == null ? void 0 : it.value;
        return (!keepScalar && identity2.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : (ctx == null ? void 0 : ctx.mapAsMap) ? /* @__PURE__ */ new Map() : {};
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity2.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});
var require_map = __commonJS({
  "node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity2.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});
var require_YAMLSeq = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity2.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity2.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity2.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity2.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});
var require_seq = __commonJS({
  "node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity2.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});
var require_string2 = __commonJS({
  "node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});
var require_null = __commonJS({
  "node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});
var require_bool = __commonJS({
  "node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});
var require_stringifyNumber = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n3 = JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^\d/.test(n3)) {
        let i = n3.indexOf(".");
        if (i < 0) {
          i = n3.length;
          n3 += ".";
        }
        let d2 = minFractionDigits - (n3.length - i - 1);
        while (d2-- > 0)
          n3 += "0";
      }
      return n3;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});
var require_float = __commonJS({
  "node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN))$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});
var require_int = __commonJS({
  "node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});
var require_schema = __commonJS({
  "node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string2();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});
var require_schema2 = __commonJS({
  "node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true|false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});
var require_binary = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof Buffer === "function") {
          return Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        const buf = value;
        let str;
        if (typeof Buffer === "function") {
          str = buf instanceof Buffer ? buf.toString("base64") : Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s2 = "";
          for (let i = 0; i < buf.length; ++i)
            s2 += String.fromCharCode(buf[i]);
          str = btoa(s2);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        if (!type)
          type = Scalar.Scalar.BLOCK_LITERAL;
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n3 = Math.ceil(str.length / lineWidth);
          const lines = new Array(n3);
          for (let i = 0, o3 = 0; i < n3; ++i, o3 += lineWidth) {
            lines[i] = str.substr(o3, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});
var require_pairs = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity2.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity2.isPair(item))
            continue;
          else if (identity2.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity2.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});
var require_omap = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx == null ? void 0 : ctx.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity2.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity2.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});
var require_bool2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/i,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});
var require_float2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?\.(?:inf|Inf|INF|nan|NaN|NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f3 = str.substring(dot + 1).replace(/_/g, "");
          if (f3[f3.length - 1] === "0")
            node.minFractionDigits = f3.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});
var require_int2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n4 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n4 : n4;
      }
      const n3 = parseInt(str, radix);
      return sign === "-" ? -1 * n3 : n3;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});
var require_set = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity2.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity2.isPair(pair) ? identity2.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity2.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});
var require_timestamp = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n3) => asBigInt ? BigInt(n3) : Number(n3);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n3) => n3;
      if (typeof value === "bigint")
        num = (n3) => BigInt(n3);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n3) => String(n3).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d2 = parseSexagesimal(tz, false);
          if (Math.abs(d2) < 30)
            d2 *= 60;
          date -= 6e4 * d2;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value.toISOString().replace(/((T00:00)?:00)?\.000Z$/, "")
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});
var require_schema3 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string2();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});
var require_tags = __commonJS({
  "node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string2();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName) {
      let tags = schemas.get(schemaName);
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      return tags.map((tag) => {
        if (typeof tag !== "string")
          return tag;
        const tagObj = tagsByName[tag];
        if (tagObj)
          return tagObj;
        const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
        throw new Error(`Unknown custom tag "${tag}"; use one of ${keys}`);
      });
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});
var require_Schema = __commonJS({
  "node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string2();
    var tags = require_tags();
    var sortMapEntriesByKey = (a2, b) => a2.key < b.key ? -1 : a2.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.merge = !!merge;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity2.MAP, { value: map.map });
        Object.defineProperty(this, identity2.SCALAR, { value: string.string });
        Object.defineProperty(this, identity2.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});
var require_stringifyDocument = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var stringify = require_stringify2();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      var _a2;
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity2.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if ((_a2 = doc.directives) == null ? void 0 : _a2.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});
var require_Document = __commonJS({
  "node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity2 = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity2.NODE_TYPE, { value: identity2.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options == null ? void 0 : options._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity2.NODE_TYPE]: { value: identity2.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity2.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path2, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path2, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v2) => typeof v2 === "number" || v2 instanceof String || v2 instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity2.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k2 = this.createNode(key, null, options);
        const v2 = this.createNode(value, null, options);
        return new Pair.Pair(k2, v2);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path2) {
        if (Collection.isEmptyPath(path2)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path2) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity2.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path2, keepScalar) {
        if (Collection.isEmptyPath(path2))
          return !keepScalar && identity2.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity2.isCollection(this.contents) ? this.contents.getIn(path2, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity2.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path2) {
        if (Collection.isEmptyPath(path2))
          return this.contents !== void 0;
        return identity2.isCollection(this.contents) ? this.contents.hasIn(path2) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path2, value) {
        if (Collection.isEmptyPath(path2)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path2), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path2, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { merge: true, resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { merge: false, resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s2 = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s2}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity2.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});
var require_errors = __commonJS({
  "node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci2 = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci2 >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci2 - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci2 -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci2))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end && end.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci2));
        }
        const pointer = " ".repeat(ci2) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});
var require_resolve_props = __commonJS({
  "node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let hasNewlineAfterProp = false;
      let reqSpace = false;
      let anchor = null;
      let tag = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        switch (token.type) {
          case "space":
            if (!flow && atNewline && indicator !== "doc-start" && token.source[0] === "	")
              onError(token, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              hasNewlineAfterProp = true;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            if (start === null)
              start = token.offset;
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = false;
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== ""))
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        hasNewlineAfterProp,
        anchor,
        tag,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});
var require_util_contains_newline = __commonJS({
  "node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st2 of key.end)
              if (st2.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st2 of it.start)
              if (st2.type === "newline")
                return true;
            if (it.sep) {
              for (const st2 of it.sep)
                if (st2.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});
var require_util_flow_indent_check = __commonJS({
  "node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if ((fc == null ? void 0 : fc.type) === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});
var require_util_map_includes = __commonJS({
  "node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a2, b) => a2 === b || identity2.isScalar(a2) && identity2.isScalar(b) && a2.value === b.value && !(a2.value === "<<" && ctx.schema.merge);
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});
var require_resolve_block_map = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      var _a2;
      const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? (sep == null ? void 0 : sep[0]),
          offset,
          onError,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.hasNewlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (((_a2 = keyProps.found) == null ? void 0 : _a2.indent) !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if ((value == null ? void 0 : value.type) === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});
var require_resolve_block_seq = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value && value.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});
var require_resolve_end = __commonJS({
  "node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});
var require_resolve_flow_collection = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = (tag == null ? void 0 : tag.nodeClass) ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? (sep == null ? void 0 : sep[0]),
          offset,
          onError,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop:
              for (const st2 of start) {
                switch (st2.type) {
                  case "comma":
                  case "space":
                    break;
                  case "comment":
                    prevItemComment = st2.source.substring(1);
                    break loop;
                  default:
                    break loop;
                }
              }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity2.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st2 of sep) {
                  if (st2 === valueProps.found)
                    break;
                  if (st2.type === "newline") {
                    onError(st2, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source && value.source[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee2] = fc.end;
      let cePos = offset;
      if (ce && ce.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee2.unshift(ce);
      }
      if (ee2.length > 0) {
        const end = resolveEnd.resolveEnd(ee2, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});
var require_compose_collection = __commonJS({
  "node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, tagToken, onError) {
      var _a2;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq" || !expType) {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t4) => t4.tag === tagName && t4.collection === expType);
      if (!tag) {
        const kt2 = ctx.schema.knownTags[tagName];
        if (kt2 && kt2.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt2, { default: false }));
          tag = kt2;
        } else {
          if (kt2 == null ? void 0 : kt2.collection) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt2.tag} used for ${expType} collection, but expects ${kt2.collection}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = ((_a2 = tag.resolve) == null ? void 0 : _a2.call(tag, coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options)) ?? coll;
      const node = identity2.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag == null ? void 0 : tag.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});
var require_resolve_block_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(scalar, strict, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n3 = Number(ch);
          if (!indent && n3)
            indent = n3;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m2 = first.match(/^( *)/);
      const line0 = (m2 == null ? void 0 : m2[1]) ? [m2[1], first.slice(m2[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});
var require_resolve_flow_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return foldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return foldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function foldLines(source) {
      let first, line;
      try {
        first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
        line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
      } catch (_) {
        first = /(.*?)[ \t]*\r?\n/sy;
        line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
      }
      let match = first.exec(source);
      if (!match)
        return source;
      let res = match[1];
      let sep = " ";
      let pos = first.lastIndex;
      line.lastIndex = pos;
      while (match = line.exec(source)) {
        if (match[1] === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + match[1];
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + ((match == null ? void 0 : match[1]) ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = { x: 2, u: 4, U: 8 }[next];
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      if (isNaN(code)) {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
      return String.fromCodePoint(code);
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});
var require_compose_scalar = __commonJS({
  "node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var identity2 = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(token, ctx.options.strict, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      const tag = tagToken && tagName ? findScalarTagByName(ctx.schema, value, tagName, tagToken, onError) : token.type === "scalar" ? findScalarTagByTest(ctx, value, token, onError) : ctx.schema[identity2.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity2.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      var _a2;
      if (tagName === "!")
        return schema[identity2.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if ((_a2 = tag.test) == null ? void 0 : _a2.test(value))
          return tag;
      const kt2 = schema.knownTags[tagName];
      if (kt2 && !kt2.collection) {
        schema.tags.push(Object.assign({}, kt2, { default: false, test: void 0 }));
        return kt2;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity2.SCALAR];
    }
    function findScalarTagByTest({ directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => {
        var _a2;
        return tag2.default && ((_a2 = tag2.test) == null ? void 0 : _a2.test(value));
      }) || schema[identity2.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => {
          var _a2;
          return tag2.default && ((_a2 = tag2.test) == null ? void 0 : _a2.test(value));
        }) ?? schema[identity2.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});
var require_util_empty_scalar_position = __commonJS({
  "node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        if (pos === null)
          pos = before.length;
        for (let i = pos - 1; i >= 0; --i) {
          let st2 = before[i];
          switch (st2.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st2.source.length;
              continue;
          }
          st2 = before[++i];
          while ((st2 == null ? void 0 : st2.type) === "space") {
            offset += st2.source.length;
            st2 = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});
var require_compose_node = __commonJS({
  "node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          node = composeCollection.composeCollection(CN, ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError);
          isSrcToken = false;
        }
      }
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});
var require_compose_doc = __commonJS({
  "node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? (end == null ? void 0 : end[0]),
        offset,
        onError,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});
var require_composer = __commonJS({
  "node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity2 = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      var _a2;
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (((_a2 = prelude[i + 1]) == null ? void 0 : _a2[0]) !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity2.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity2.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          Array.prototype.push.apply(doc.errors, this.errors);
          Array.prototype.push.apply(doc.warnings, this.warnings);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});
var require_cst_scalar = __commonJS({
  "node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar(token, strict, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st2 of end)
          switch (st2.type) {
            case "space":
            case "comment":
              props.push(st2);
              break;
            case "newline":
              props.push(st2);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl2 = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl2] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st2) => st2.type === "space" || st2.type === "comment" || st2.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});
var require_cst_stringify = __commonJS({
  "node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st2 of token.end)
            res += st2.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st2 of token.end)
              res += st2.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st2 of token.end)
              res += st2.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st2 of start)
        res += st2.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st2 of sep)
          res += st2.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});
var require_cst_visit = __commonJS({
  "node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = Symbol("break visit");
    var SKIP = Symbol("skip children");
    var REMOVE = Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path2) => {
      let item = cst;
      for (const [field, index] of path2) {
        const tok = item == null ? void 0 : item[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path2) => {
      const parent = visit.itemAtPath(cst, path2.slice(0, -1));
      const field = path2[path2.length - 1][0];
      const coll = parent == null ? void 0 : parent[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path2, item, visitor) {
      let ctrl = visitor(item, path2);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci2 = _visit(Object.freeze(path2.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci2 === "number")
              i = ci2 - 1;
            else if (ci2 === BREAK)
              return BREAK;
            else if (ci2 === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path2);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path2) : ctrl;
    }
    exports.visit = visit;
  }
});
var require_cst = __commonJS({
  "node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});
var require_lexer = __commonJS({
  "node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = "0123456789ABCDEFabcdef".split("");
    var tagChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()".split("");
    var invalidFlowScalarChars = ",[]{}".split("");
    var invalidAnchorChars = " ,[]{}\n\r	".split("");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.includes(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n3) {
        return this.buffer[this.pos + n3];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt2 = this.buffer.substr(offset, 3);
          if ((dt2 === "---" || dt2 === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n3) {
        return this.pos + n3 <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n3) {
        return this.buffer.substr(this.pos, n3);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          const cs = line.indexOf("#");
          if (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	")
              dirEnd = cs - 1;
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n3 = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n3);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s2 = this.peek(3);
          if (s2 === "---" && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return "doc";
          } else if (s2 === "..." && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            return "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n3 = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n3;
          return yield* this.parseBlockStart();
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n3 = yield* this.pushIndicators();
        switch (line[n3]) {
          case "#":
            yield* this.pushCount(line.length - n3);
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n3 += yield* this.parseBlockScalarHeader();
            n3 += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n3);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl2, sp;
        let indent = -1;
        do {
          nl2 = yield* this.pushNewline();
          if (nl2 > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl2 + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n3 = 0;
        while (line[n3] === ",") {
          n3 += yield* this.pushCount(1);
          n3 += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n3 += yield* this.pushIndicators();
        switch (line[n3]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n3);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote2 = this.charAt(0);
        let end = this.buffer.indexOf(quote2, this.pos + 1);
        if (quote2 === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n3 = 0;
            while (this.buffer[end - 1 - n3] === "\\")
              n3 += 1;
            if (n3 % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl2 = qb.indexOf("\n", this.pos);
        if (nl2 !== -1) {
          while (nl2 !== -1) {
            const cs = this.continueScalar(nl2 + 1);
            if (cs === -1)
              break;
            nl2 = qb.indexOf("\n", cs);
          }
          if (nl2 !== -1) {
            end = nl2 - (qb[nl2 - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl2 = this.pos - 1;
        let indent = 0;
        let ch;
        loop:
          for (let i = this.pos; ch = this.buffer[i]; ++i) {
            switch (ch) {
              case " ":
                indent += 1;
                break;
              case "\n":
                nl2 = i;
                indent = 0;
                break;
              case "\r": {
                const next = this.buffer[i + 1];
                if (!next && !this.atEnd)
                  return this.setNext("block-scalar");
                if (next === "\n")
                  break;
              }
              default:
                break loop;
            }
          }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else
            this.indentNext += this.blockScalarIndent;
          do {
            const cs = this.continueScalar(nl2 + 1);
            if (cs === -1)
              break;
            nl2 = this.buffer.indexOf("\n", cs);
          } while (nl2 !== -1);
          if (nl2 === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl2 = this.buffer.length;
          }
        }
        if (!this.blockScalarKeep) {
          do {
            let i = nl2 - 1;
            let ch2 = this.buffer[i];
            if (ch2 === "\r")
              ch2 = this.buffer[--i];
            const lastChar = i;
            while (ch2 === " " || ch2 === "	")
              ch2 = this.buffer[--i];
            if (ch2 === "\n" && i >= this.pos && i + 1 + indent > lastChar)
              nl2 = i;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl2 + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && next === ",")
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && invalidFlowScalarChars.includes(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && invalidFlowScalarChars.includes(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n3) {
        if (n3 > 0) {
          yield this.buffer.substr(this.pos, n3);
          this.pos += n3;
          return n3;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s2 = this.buffer.slice(this.pos, i);
        if (s2) {
          yield s2;
          this.pos += s2.length;
          return s2.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        switch (this.charAt(0)) {
          case "!":
            return (yield* this.pushTag()) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "&":
            return (yield* this.pushUntil(isNotAnchorChar)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
          case "-":
          case "?":
          case ":": {
            const inFlow = this.flowLevel > 0;
            const ch1 = this.charAt(1);
            if (isEmpty(ch1) || inFlow && invalidFlowScalarChars.includes(ch1)) {
              if (!inFlow)
                this.indentNext = this.indentValue + 1;
              else if (this.flowKey)
                this.flowKey = false;
              return (yield* this.pushCount(1)) + (yield* this.pushSpaces(true)) + (yield* this.pushIndicators());
            }
          }
        }
        return 0;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.includes(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.includes(this.buffer[i + 1]) && hexDigits.includes(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n3 = i - this.pos;
        if (n3 > 0) {
          yield this.buffer.substr(this.pos, n3);
          this.pos = i;
        }
        return n3;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports.Lexer = Lexer;
  }
});
var require_line_counter = __commonJS({
  "node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});
var require_parser = __commonJS({
  "node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token == null ? void 0 : token.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      var _a2;
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop:
        while (--i >= 0) {
          switch (prev[i].type) {
            case "doc-start":
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
            case "newline":
              break loop;
          }
        }
      while (((_a2 = prev[++i]) == null ? void 0 : _a2.type) === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                Array.prototype.push.apply(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              Array.prototype.push.apply(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st2 = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st2;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && (!top || top.type !== "doc-end")) {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n3) {
        return this.stack[this.stack.length - n3];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !includesToken(it.start, "explicit-key-ind");
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st2) => st2.type !== "comment" || st2.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl2 = this.source.indexOf("\n") + 1;
              while (nl2 !== 0) {
                this.onNewLine(this.offset + nl2);
                nl2 = this.source.indexOf("\n", nl2) + 1;
              }
            }
            yield* this.pop();
            break;
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        var _a2;
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if ((last == null ? void 0 : last.type) === "comment")
                end == null ? void 0 : end.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = (_a2 = prev == null ? void 0 : prev.value) == null ? void 0 : _a2.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atNextItem = !this.onKeyLine && this.indent === map.indent && it.sep && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl2 = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st2 = it.sep[i];
              switch (st2.type) {
                case "newline":
                  nl2.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st2.indent > map.indent)
                    nl2.length = 0;
                  break;
                default:
                  nl2.length = 0;
              }
            }
            if (nl2.length >= 2)
              start = it.sep.splice(nl2[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !includesToken(it.start, "explicit-key-ind")) {
                it.start.push(this.sourceToken);
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken] }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (includesToken(it.start, "explicit-key-ind")) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key, delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs6 = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs6, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs6);
              } else {
                Object.assign(it, { key: fs6, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (atNextItem && bv.type !== "block-seq" && includesToken(it.start, "explicit-key-ind")) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        var _a2;
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if ((last == null ? void 0 : last.type) === "comment")
                end == null ? void 0 : end.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = (_a2 = prev == null ? void 0 : prev.value) == null ? void 0 : _a2.end;
                if (Array.isArray(end)) {
                  Array.prototype.push.apply(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top && top.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs6 = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs6, sep: [] });
              else if (it.sep)
                this.stack.push(fs6);
              else
                Object.assign(it, { key: fs6, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl2 = this.source.indexOf("\n") + 1;
          while (nl2 !== 0) {
            this.onNewLine(this.offset + nl2);
            nl2 = this.source.indexOf("\n", nl2) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st2) => st2.type === "newline" || st2.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser;
  }
});
var require_public_api = __commonJS({
  "node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log2 = require_log();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2 == null ? void 0 : lineCounter2.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2 == null ? void 0 : lineCounter2.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log2.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse2;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});
var require_dist = __commonJS({
  "node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity2 = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity2.isAlias;
    exports.isCollection = identity2.isCollection;
    exports.isDocument = identity2.isDocument;
    exports.isMap = identity2.isMap;
    exports.isNode = identity2.isNode;
    exports.isPair = identity2.isPair;
    exports.isScalar = identity2.isScalar;
    exports.isSeq = identity2.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});
var require_universalify = __commonJS({
  "node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function")
          fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            fn.call(
              this,
              ...args,
              (err, res) => err != null ? reject(err) : resolve(res)
            );
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function")
          return fn.apply(this, args);
        else
          fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
      }, "name", { value: fn.name });
    };
  }
});
var require_polyfills = __commonJS({
  "node_modules/graceful-fs/polyfills.js"(exports, module) {
    "use strict";
    var constants = __require("constants");
    var origCwd = process.cwd;
    var cwd2 = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd2)
        cwd2 = origCwd.call(process);
      return cwd2;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d2) {
        cwd2 = null;
        chdir.call(process, d2);
      };
      if (Object.setPrototypeOf)
        Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module.exports = patch;
    function patch(fs6) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs6);
      }
      if (!fs6.lutimes) {
        patchLutimes(fs6);
      }
      fs6.chown = chownFix(fs6.chown);
      fs6.fchown = chownFix(fs6.fchown);
      fs6.lchown = chownFix(fs6.lchown);
      fs6.chmod = chmodFix(fs6.chmod);
      fs6.fchmod = chmodFix(fs6.fchmod);
      fs6.lchmod = chmodFix(fs6.lchmod);
      fs6.chownSync = chownFixSync(fs6.chownSync);
      fs6.fchownSync = chownFixSync(fs6.fchownSync);
      fs6.lchownSync = chownFixSync(fs6.lchownSync);
      fs6.chmodSync = chmodFixSync(fs6.chmodSync);
      fs6.fchmodSync = chmodFixSync(fs6.fchmodSync);
      fs6.lchmodSync = chmodFixSync(fs6.lchmodSync);
      fs6.stat = statFix(fs6.stat);
      fs6.fstat = statFix(fs6.fstat);
      fs6.lstat = statFix(fs6.lstat);
      fs6.statSync = statFixSync(fs6.statSync);
      fs6.fstatSync = statFixSync(fs6.fstatSync);
      fs6.lstatSync = statFixSync(fs6.lstatSync);
      if (fs6.chmod && !fs6.lchmod) {
        fs6.lchmod = function(path2, mode, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs6.lchmodSync = function() {
        };
      }
      if (fs6.chown && !fs6.lchown) {
        fs6.lchown = function(path2, uid, gid, cb) {
          if (cb)
            process.nextTick(cb);
        };
        fs6.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs6.rename = typeof fs6.rename !== "function" ? fs6.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs6.stat(to, function(stater, st2) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb)
                cb(er);
            });
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs6.rename);
      }
      fs6.read = typeof fs6.read !== "function" ? fs6.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs6, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs6, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs6.read);
      fs6.readSync = typeof fs6.readSync !== "function" ? fs6.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs6, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs6.readSync);
      function patchLchmod(fs7) {
        fs7.lchmod = function(path2, mode, callback) {
          fs7.open(
            path2,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs7.fchmod(fd, mode, function(err2) {
                fs7.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            }
          );
        };
        fs7.lchmodSync = function(path2, mode) {
          var fd = fs7.openSync(path2, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs7.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs7.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs7.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs7) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs7.futimes) {
          fs7.lutimes = function(path2, at, mt, cb) {
            fs7.open(path2, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb)
                  cb(er);
                return;
              }
              fs7.futimes(fd, at, mt, function(er2) {
                fs7.close(fd, function(er22) {
                  if (cb)
                    cb(er2 || er22);
                });
              });
            });
          };
          fs7.lutimesSync = function(path2, at, mt) {
            var fd = fs7.openSync(path2, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs7.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs7.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs7.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs7.futimes) {
          fs7.lutimes = function(_a2, _b2, _c, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs7.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig)
          return orig;
        return function(target, mode, cb) {
          return orig.call(fs6, target, mode, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, mode) {
          try {
            return orig.call(fs6, target, mode);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs6, target, uid, gid, function(er) {
            if (chownErOk(er))
              er = null;
            if (cb)
              cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs6, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er))
              throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig)
          return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0)
                stats.uid += 4294967296;
              if (stats.gid < 0)
                stats.gid += 4294967296;
            }
            if (cb)
              cb.apply(this, arguments);
          }
          return options ? orig.call(fs6, target, options, callback) : orig.call(fs6, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig)
          return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs6, target, options) : orig.call(fs6, target);
          if (stats) {
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});
var require_legacy_streams = __commonJS({
  "node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    "use strict";
    var Stream5 = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs6) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path2, options) {
        if (!(this instanceof ReadStream))
          return new ReadStream(path2, options);
        Stream5.call(this);
        var self2 = this;
        this.path = path2;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding)
          this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self2._read();
          });
          return;
        }
        fs6.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self2.emit("error", err);
            self2.readable = false;
            return;
          }
          self2.fd = fd;
          self2.emit("open", fd);
          self2._read();
        });
      }
      function WriteStream(path2, options) {
        if (!(this instanceof WriteStream))
          return new WriteStream(path2, options);
        Stream5.call(this);
        this.path = path2;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs6.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});
var require_clone = __commonJS({
  "node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});
var require_graceful_fs = __commonJS({
  "node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    "use strict";
    var fs6 = __require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = __require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop52() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop52;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m2 = util.format.apply(util, arguments);
        m2 = "GFS4: " + m2.split(/\n/).join("\nGFS4: ");
        console.error(m2);
      };
    if (!fs6[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs6, queue);
      fs6.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs6, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs6.close);
      fs6.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs6, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs6.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs6[gracefulQueue]);
          __require("assert").equal(fs6[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs6[gracefulQueue]);
    }
    module.exports = patch(clone(fs6));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs6.__patched) {
      module.exports = patch(fs6);
      fs6.__patched = true;
    }
    function patch(fs7) {
      polyfills(fs7);
      fs7.gracefulify = patch;
      fs7.createReadStream = createReadStream;
      fs7.createWriteStream = createWriteStream;
      var fs$readFile = fs7.readFile;
      fs7.readFile = readFile;
      function readFile(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path2, options, cb);
        function go$readFile(path3, options2, cb2, startTime) {
          return fs$readFile(path3, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path3, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs7.writeFile;
      fs7.writeFile = writeFile;
      function writeFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path2, data, options, cb);
        function go$writeFile(path3, data2, options2, cb2, startTime) {
          return fs$writeFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs7.appendFile;
      if (fs$appendFile)
        fs7.appendFile = appendFile;
      function appendFile(path2, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path2, data, options, cb);
        function go$appendFile(path3, data2, options2, cb2, startTime) {
          return fs$appendFile(path3, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path3, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs7.copyFile;
      if (fs$copyFile)
        fs7.copyFile = copyFile;
      function copyFile(src, dest, flags2, cb) {
        if (typeof flags2 === "function") {
          cb = flags2;
          flags2 = 0;
        }
        return go$copyFile(src, dest, flags2, cb);
        function go$copyFile(src2, dest2, flags22, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags22, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags22, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs7.readdir;
      fs7.readdir = readdir;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir(path2, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path3, options2, cb2, startTime) {
          return fs$readdir(path3, fs$readdirCallback(
            path3,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path3, options2, cb2, startTime) {
          return fs$readdir(path3, options2, fs$readdirCallback(
            path3,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path2, options, cb);
        function fs$readdirCallback(path3, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path3, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs7);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs7.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs7.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs7, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs7, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs7, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs7, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path2, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path2, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path2, options) {
        return new fs7.ReadStream(path2, options);
      }
      function createWriteStream(path2, options) {
        return new fs7.WriteStream(path2, options);
      }
      var fs$open = fs7.open;
      fs7.open = open;
      function open(path2, flags2, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path2, flags2, mode, cb);
        function go$open(path3, flags22, mode2, cb2, startTime) {
          return fs$open(path3, flags22, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path3, flags22, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs7;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs6[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs6[gracefulQueue].length; ++i) {
        if (fs6[gracefulQueue][i].length > 2) {
          fs6[gracefulQueue][i][3] = now;
          fs6[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs6[gracefulQueue].length === 0)
        return;
      var elem = fs6[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs6[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});
var require_fs5 = __commonJS({
  "node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u2 = require_universalify().fromCallback;
    var fs6 = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs6[key] === "function";
    });
    Object.assign(exports, fs6);
    api.forEach((method) => {
      exports[method] = u2(fs6[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs6.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs6.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs6.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs6.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs6.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs6.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs6.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs6.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs6.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs6.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err)
            return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs6.realpath.native === "function") {
      exports.realpath.native = u2(fs6.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});
var require_utils5 = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    module.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path2.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error = new Error(`Path contains invalid characters: ${pth}`);
          error.code = "EINVAL";
          throw error;
        }
      }
    };
  }
});
var require_make_dir = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var { checkPath } = require_utils5();
    var getMode = (options) => {
      const defaults2 = { mode: 511 };
      if (typeof options === "number")
        return options;
      return { ...defaults2, ...options }.mode;
    };
    module.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs6.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs6.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});
var require_mkdirs = __commonJS({
  "node_modules/fs-extra/lib/mkdirs/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u2(_makeDir);
    module.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});
var require_path_exists = __commonJS({
  "node_modules/fs-extra/lib/path-exists/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs6 = require_fs5();
    function pathExists(path2) {
      return fs6.access(path2).then(() => true).catch(() => false);
    }
    module.exports = {
      pathExists: u2(pathExists),
      pathExistsSync: fs6.existsSync
    };
  }
});
var require_utimes = __commonJS({
  "node_modules/fs-extra/lib/util/utimes.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var u2 = require_universalify().fromPromise;
    async function utimesMillis(path2, atime, mtime) {
      const fd = await fs6.open(path2, "r+");
      let closeErr = null;
      try {
        await fs6.futimes(fd, atime, mtime);
      } finally {
        try {
          await fs6.close(fd);
        } catch (e) {
          closeErr = e;
        }
      }
      if (closeErr) {
        throw closeErr;
      }
    }
    function utimesMillisSync(path2, atime, mtime) {
      const fd = fs6.openSync(path2, "r+");
      fs6.futimesSync(fd, atime, mtime);
      return fs6.closeSync(fd);
    }
    module.exports = {
      utimesMillis: u2(utimesMillis),
      utimesMillisSync
    };
  }
});
var require_stat = __commonJS({
  "node_modules/fs-extra/lib/util/stat.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var path2 = __require("path");
    var u2 = require_universalify().fromPromise;
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs6.stat(file, { bigint: true }) : (file) => fs6.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT")
            return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs6.statSync(file, { bigint: true }) : (file) => fs6.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT")
          return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    async function checkPaths(src, dest, funcName, opts) {
      const { srcStat, destStat } = await getStats(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path2.basename(src);
          const destBaseName = path2.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path2.basename(src);
          const destBaseName = path2.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    async function checkParentPaths(src, srcStat, dest, funcName) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = await fs6.stat(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPaths(src, srcStat, destParent, funcName);
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path2.resolve(path2.dirname(src));
      const destParent = path2.resolve(path2.dirname(dest));
      if (destParent === srcParent || destParent === path2.parse(destParent).root)
        return;
      let destStat;
      try {
        destStat = fs6.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT")
          return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path2.resolve(src).split(path2.sep).filter((i) => i);
      const destArr = path2.resolve(dest).split(path2.sep).filter((i) => i);
      return srcArr.every((cur, i) => destArr[i] === cur);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module.exports = {
      // checkPaths
      checkPaths: u2(checkPaths),
      checkPathsSync,
      // checkParent
      checkParentPaths: u2(checkParentPaths),
      checkParentPathsSync,
      // Misc
      isSrcSubdir,
      areIdentical
    };
  }
});
var require_copy = __commonJS({
  "node_modules/fs-extra/lib/copy/copy.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var path2 = __require("path");
    var { mkdirs } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { utimesMillis } = require_utimes();
    var stat = require_stat();
    async function copy(src, dest, opts = {}) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      const { srcStat, destStat } = await stat.checkPaths(src, dest, "copy", opts);
      await stat.checkParentPaths(src, srcStat, dest, "copy");
      const include = await runFilter(src, dest, opts);
      if (!include)
        return;
      const destParent = path2.dirname(dest);
      const dirExists = await pathExists(destParent);
      if (!dirExists) {
        await mkdirs(destParent);
      }
      await getStatsAndPerformCopy(destStat, src, dest, opts);
    }
    async function runFilter(src, dest, opts) {
      if (!opts.filter)
        return true;
      return opts.filter(src, dest);
    }
    async function getStatsAndPerformCopy(destStat, src, dest, opts) {
      const statFn = opts.dereference ? fs6.stat : fs6.lstat;
      const srcStat = await statFn(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    async function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      if (opts.overwrite) {
        await fs6.unlink(dest);
        return copyFile(srcStat, src, dest, opts);
      }
      if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    async function copyFile(srcStat, src, dest, opts) {
      await fs6.copyFile(src, dest);
      if (opts.preserveTimestamps) {
        if (fileIsNotWritable(srcStat.mode)) {
          await makeFileWritable(dest, srcStat.mode);
        }
        const updatedSrcStat = await fs6.stat(src);
        await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
      }
      return fs6.chmod(dest, srcStat.mode);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return fs6.chmod(dest, srcMode | 128);
    }
    async function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) {
        await fs6.mkdir(dest);
      }
      const items = await fs6.readdir(src);
      await Promise.all(items.map(async (item) => {
        const srcItem = path2.join(src, item);
        const destItem = path2.join(dest, item);
        const include = await runFilter(srcItem, destItem, opts);
        if (!include)
          return;
        const { destStat: destStat2 } = await stat.checkPaths(srcItem, destItem, "copy", opts);
        return getStatsAndPerformCopy(destStat2, srcItem, destItem, opts);
      }));
      if (!destStat) {
        await fs6.chmod(dest, srcStat.mode);
      }
    }
    async function onLink(destStat, src, dest, opts) {
      let resolvedSrc = await fs6.readlink(src);
      if (opts.dereference) {
        resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs6.symlink(resolvedSrc, dest);
      }
      let resolvedDest = null;
      try {
        resolvedDest = await fs6.readlink(dest);
      } catch (e) {
        if (e.code === "EINVAL" || e.code === "UNKNOWN")
          return fs6.symlink(resolvedSrc, dest);
        throw e;
      }
      if (opts.dereference) {
        resolvedDest = path2.resolve(process.cwd(), resolvedDest);
      }
      if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
        throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
      }
      if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
        throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
      }
      await fs6.unlink(dest);
      return fs6.symlink(resolvedSrc, dest);
    }
    module.exports = copy;
  }
});
var require_copy_sync = __commonJS({
  "node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module) {
    "use strict";
    var fs6 = require_graceful_fs();
    var path2 = __require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest))
        return;
      const destParent = path2.dirname(dest);
      if (!fs6.existsSync(destParent))
        mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs6.statSync : fs6.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory())
        return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
        return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink())
        return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket())
        throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO())
        throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs6.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs6.copyFileSync(src, dest);
      if (opts.preserveTimestamps)
        handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode))
        makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs6.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs6.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat)
        return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs6.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      fs6.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path2.join(src, item);
      const destItem = path2.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem))
        return;
      const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs6.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path2.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs6.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs6.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN")
            return fs6.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path2.resolve(process.cwd(), resolvedDest);
        }
        if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs6.unlinkSync(dest);
      return fs6.symlinkSync(resolvedSrc, dest);
    }
    module.exports = copySync;
  }
});
var require_copy2 = __commonJS({
  "node_modules/fs-extra/lib/copy/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    module.exports = {
      copy: u2(require_copy()),
      copySync: require_copy_sync()
    };
  }
});
var require_remove = __commonJS({
  "node_modules/fs-extra/lib/remove/index.js"(exports, module) {
    "use strict";
    var fs6 = require_graceful_fs();
    var u2 = require_universalify().fromCallback;
    function remove(path2, callback) {
      fs6.rm(path2, { recursive: true, force: true }, callback);
    }
    function removeSync(path2) {
      fs6.rmSync(path2, { recursive: true, force: true });
    }
    module.exports = {
      remove: u2(remove),
      removeSync
    };
  }
});
var require_empty = __commonJS({
  "node_modules/fs-extra/lib/empty/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs6 = require_fs5();
    var path2 = __require("path");
    var mkdir = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u2(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs6.readdir(dir);
      } catch {
        return mkdir.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path2.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs6.readdirSync(dir);
      } catch {
        return mkdir.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path2.join(dir, item);
        remove.removeSync(item);
      });
    }
    module.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});
var require_file = __commonJS({
  "node_modules/fs-extra/lib/ensure/file.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var path2 = __require("path");
    var fs6 = require_fs5();
    var mkdir = require_mkdirs();
    async function createFile(file) {
      let stats;
      try {
        stats = await fs6.stat(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path2.dirname(file);
      let dirStats = null;
      try {
        dirStats = await fs6.stat(dir);
      } catch (err) {
        if (err.code === "ENOENT") {
          await mkdir.mkdirs(dir);
          await fs6.writeFile(file, "");
          return;
        } else {
          throw err;
        }
      }
      if (dirStats.isDirectory()) {
        await fs6.writeFile(file, "");
      } else {
        await fs6.readdir(dir);
      }
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs6.statSync(file);
      } catch {
      }
      if (stats && stats.isFile())
        return;
      const dir = path2.dirname(file);
      try {
        if (!fs6.statSync(dir).isDirectory()) {
          fs6.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT")
          mkdir.mkdirsSync(dir);
        else
          throw err;
      }
      fs6.writeFileSync(file, "");
    }
    module.exports = {
      createFile: u2(createFile),
      createFileSync
    };
  }
});
var require_link = __commonJS({
  "node_modules/fs-extra/lib/ensure/link.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var path2 = __require("path");
    var fs6 = require_fs5();
    var mkdir = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createLink(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = await fs6.lstat(dstpath);
      } catch {
      }
      let srcStat;
      try {
        srcStat = await fs6.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      if (dstStat && areIdentical(srcStat, dstStat))
        return;
      const dir = path2.dirname(dstpath);
      const dirExists = await pathExists(dir);
      if (!dirExists) {
        await mkdir.mkdirs(dir);
      }
      await fs6.link(srcpath, dstpath);
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs6.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs6.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat))
          return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path2.dirname(dstpath);
      const dirExists = fs6.existsSync(dir);
      if (dirExists)
        return fs6.linkSync(srcpath, dstpath);
      mkdir.mkdirsSync(dir);
      return fs6.linkSync(srcpath, dstpath);
    }
    module.exports = {
      createLink: u2(createLink),
      createLinkSync
    };
  }
});
var require_symlink_paths = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module) {
    "use strict";
    var path2 = __require("path");
    var fs6 = require_fs5();
    var { pathExists } = require_path_exists();
    var u2 = require_universalify().fromPromise;
    async function symlinkPaths(srcpath, dstpath) {
      if (path2.isAbsolute(srcpath)) {
        try {
          await fs6.lstat(srcpath);
        } catch (err) {
          err.message = err.message.replace("lstat", "ensureSymlink");
          throw err;
        }
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path2.dirname(dstpath);
      const relativeToDst = path2.join(dstdir, srcpath);
      const exists = await pathExists(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      try {
        await fs6.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: path2.relative(dstdir, srcpath)
      };
    }
    function symlinkPathsSync(srcpath, dstpath) {
      if (path2.isAbsolute(srcpath)) {
        const exists2 = fs6.existsSync(srcpath);
        if (!exists2)
          throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path2.dirname(dstpath);
      const relativeToDst = path2.join(dstdir, srcpath);
      const exists = fs6.existsSync(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      const srcExists = fs6.existsSync(srcpath);
      if (!srcExists)
        throw new Error("relative srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: path2.relative(dstdir, srcpath)
      };
    }
    module.exports = {
      symlinkPaths: u2(symlinkPaths),
      symlinkPathsSync
    };
  }
});
var require_symlink_type = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var u2 = require_universalify().fromPromise;
    async function symlinkType(srcpath, type) {
      if (type)
        return type;
      let stats;
      try {
        stats = await fs6.lstat(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    function symlinkTypeSync(srcpath, type) {
      if (type)
        return type;
      let stats;
      try {
        stats = fs6.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module.exports = {
      symlinkType: u2(symlinkType),
      symlinkTypeSync
    };
  }
});
var require_symlink = __commonJS({
  "node_modules/fs-extra/lib/ensure/symlink.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var path2 = __require("path");
    var fs6 = require_fs5();
    var { mkdirs, mkdirsSync } = require_mkdirs();
    var { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
    var { symlinkType, symlinkTypeSync } = require_symlink_type();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createSymlink(srcpath, dstpath, type) {
      let stats;
      try {
        stats = await fs6.lstat(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const [srcStat, dstStat] = await Promise.all([
          fs6.stat(srcpath),
          fs6.stat(dstpath)
        ]);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = await symlinkPaths(srcpath, dstpath);
      srcpath = relative.toDst;
      const toType = await symlinkType(relative.toCwd, type);
      const dir = path2.dirname(dstpath);
      if (!await pathExists(dir)) {
        await mkdirs(dir);
      }
      return fs6.symlink(srcpath, dstpath, toType);
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs6.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs6.statSync(srcpath);
        const dstStat = fs6.statSync(dstpath);
        if (areIdentical(srcStat, dstStat))
          return;
      }
      const relative = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative.toDst;
      type = symlinkTypeSync(relative.toCwd, type);
      const dir = path2.dirname(dstpath);
      const exists = fs6.existsSync(dir);
      if (exists)
        return fs6.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs6.symlinkSync(srcpath, dstpath, type);
    }
    module.exports = {
      createSymlink: u2(createSymlink),
      createSymlinkSync
    };
  }
});
var require_ensure = __commonJS({
  "node_modules/fs-extra/lib/ensure/index.js"(exports, module) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module.exports = {
      // file
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});
var require_utils6 = __commonJS({
  "node_modules/jsonfile/utils.js"(exports, module) {
    "use strict";
    function stringify(obj, { EOL: EOL3 = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL3 : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL3) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content))
        content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module.exports = { stringify, stripBom };
  }
});
var require_jsonfile = __commonJS({
  "node_modules/jsonfile/index.js"(exports, module) {
    "use strict";
    var _fs2;
    try {
      _fs2 = require_graceful_fs();
    } catch (_) {
      _fs2 = __require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils6();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs6 = options.fs || _fs2;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs6.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs6 = options.fs || _fs2;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs6.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs6 = options.fs || _fs2;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs6.writeFile)(file, str, options);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs6 = options.fs || _fs2;
      const str = stringify(obj, options);
      return fs6.writeFileSync(file, str, options);
    }
    var jsonfile = {
      readFile,
      readFileSync,
      writeFile,
      writeFileSync
    };
    module.exports = jsonfile;
  }
});
var require_jsonfile2 = __commonJS({
  "node_modules/fs-extra/lib/json/jsonfile.js"(exports, module) {
    "use strict";
    var jsonFile = require_jsonfile();
    module.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});
var require_output_file = __commonJS({
  "node_modules/fs-extra/lib/output-file/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var fs6 = require_fs5();
    var path2 = __require("path");
    var mkdir = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    async function outputFile(file, data, encoding = "utf-8") {
      const dir = path2.dirname(file);
      if (!await pathExists(dir)) {
        await mkdir.mkdirs(dir);
      }
      return fs6.writeFile(file, data, encoding);
    }
    function outputFileSync(file, ...args) {
      const dir = path2.dirname(file);
      if (!fs6.existsSync(dir)) {
        mkdir.mkdirsSync(dir);
      }
      fs6.writeFileSync(file, ...args);
    }
    module.exports = {
      outputFile: u2(outputFile),
      outputFileSync
    };
  }
});
var require_output_json = __commonJS({
  "node_modules/fs-extra/lib/json/output-json.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils6();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module.exports = outputJson;
  }
});
var require_output_json_sync = __commonJS({
  "node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils6();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module.exports = outputJsonSync;
  }
});
var require_json = __commonJS({
  "node_modules/fs-extra/lib/json/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u2(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module.exports = jsonFile;
  }
});
var require_move = __commonJS({
  "node_modules/fs-extra/lib/move/move.js"(exports, module) {
    "use strict";
    var fs6 = require_fs5();
    var path2 = __require("path");
    var { copy } = require_copy2();
    var { remove } = require_remove();
    var { mkdirp } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var stat = require_stat();
    async function move(src, dest, opts = {}) {
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = await stat.checkPaths(src, dest, "move", opts);
      await stat.checkParentPaths(src, srcStat, dest, "move");
      const destParent = path2.dirname(dest);
      const parsedParentPath = path2.parse(destParent);
      if (parsedParentPath.root !== destParent) {
        await mkdirp(destParent);
      }
      return doRename(src, dest, overwrite, isChangingCase);
    }
    async function doRename(src, dest, overwrite, isChangingCase) {
      if (!isChangingCase) {
        if (overwrite) {
          await remove(dest);
        } else if (await pathExists(dest)) {
          throw new Error("dest already exists.");
        }
      }
      try {
        await fs6.rename(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") {
          throw err;
        }
        await moveAcrossDevice(src, dest, overwrite);
      }
    }
    async function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      await copy(src, dest, opts);
      return remove(src);
    }
    module.exports = move;
  }
});
var require_move_sync = __commonJS({
  "node_modules/fs-extra/lib/move/move-sync.js"(exports, module) {
    "use strict";
    var fs6 = require_graceful_fs();
    var path2 = __require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
      stat.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest))
        mkdirpSync(path2.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path2.dirname(dest);
      const parsedPath = path2.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase)
        return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs6.existsSync(dest))
        throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs6.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV")
          throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module.exports = moveSync;
  }
});
var require_move2 = __commonJS({
  "node_modules/fs-extra/lib/move/index.js"(exports, module) {
    "use strict";
    var u2 = require_universalify().fromPromise;
    module.exports = {
      move: u2(require_move()),
      moveSync: require_move_sync()
    };
  }
});
var require_lib = __commonJS({
  "node_modules/fs-extra/lib/index.js"(exports, module) {
    "use strict";
    module.exports = {
      // Export promiseified graceful-fs:
      ...require_fs5(),
      // Export extra methods:
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});
function f(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var t;
var o;
var n;
var init_node_fetch_native_1a4a356d = __esm({
  "node_modules/node-fetch-native/dist/shared/node-fetch-native.1a4a356d.mjs"() {
    "use strict";
    t = Object.defineProperty;
    o = (e, l2) => t(e, "name", { value: l2, configurable: true });
    n = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
    o(f, "getDefaultExportFromCjs");
  }
});
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => Z
});
function v(u2) {
  const a2 = u2.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!a2)
    return;
  const n3 = a2[2] || a2[3] || "";
  let r = n3.slice(n3.lastIndexOf("\\") + 1);
  return r = r.replace(/%22/g, '"'), r = r.replace(/&#(\d{4});/g, (d2, l2) => String.fromCharCode(l2)), r;
}
async function Z(u2, a2) {
  if (!/multipart/i.test(a2))
    throw new TypeError("Failed to fetch");
  const n3 = a2.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!n3)
    throw new TypeError("no or bad content-type header, no multipart boundary");
  const r = new k(n3[1] || n3[2]);
  let d2, l2, c, p, e, i;
  const A2 = [], H2 = new br(), O2 = E((s2) => {
    c += f3.decode(s2, { stream: true });
  }, "onPartData"), y = E((s2) => {
    A2.push(s2);
  }, "appendToFile"), o3 = E(() => {
    const s2 = new On(A2, i, { type: e });
    H2.append(p, s2);
  }, "appendFileToFormData"), L = E(() => {
    H2.append(p, c);
  }, "appendEntryToFormData"), f3 = new TextDecoder("utf-8");
  f3.decode(), r.onPartBegin = function() {
    r.onPartData = O2, r.onPartEnd = L, d2 = "", l2 = "", c = "", p = "", e = "", i = null, A2.length = 0;
  }, r.onHeaderField = function(s2) {
    d2 += f3.decode(s2, { stream: true });
  }, r.onHeaderValue = function(s2) {
    l2 += f3.decode(s2, { stream: true });
  }, r.onHeaderEnd = function() {
    if (l2 += f3.decode(), d2 = d2.toLowerCase(), d2 === "content-disposition") {
      const s2 = l2.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      s2 && (p = s2[2] || s2[3] || ""), i = v(l2), i && (r.onPartData = y, r.onPartEnd = o3);
    } else
      d2 === "content-type" && (e = l2);
    l2 = "", d2 = "";
  };
  for await (const s2 of u2)
    r.write(s2);
  return r.end(), H2;
}
var B;
var E;
var D;
var t2;
var w;
var R;
var g;
var N;
var x;
var P;
var C;
var I;
var M;
var $;
var m;
var F;
var k;
var init_multipart_parser = __esm({
  "node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs"() {
    "use strict";
    init_node();
    init_node_fetch_native_1a4a356d();
    B = Object.defineProperty;
    E = (u2, a2) => B(u2, "name", { value: a2, configurable: true });
    D = 0;
    t2 = { START_BOUNDARY: D++, HEADER_FIELD_START: D++, HEADER_FIELD: D++, HEADER_VALUE_START: D++, HEADER_VALUE: D++, HEADER_VALUE_ALMOST_DONE: D++, HEADERS_ALMOST_DONE: D++, PART_DATA_START: D++, PART_DATA: D++, END: D++ };
    w = 1;
    R = { PART_BOUNDARY: w, LAST_BOUNDARY: w *= 2 };
    g = 10;
    N = 13;
    x = 32;
    P = 45;
    C = 58;
    I = 97;
    M = 122;
    $ = E((u2) => u2 | 32, "lower");
    m = E(() => {
    }, "noop");
    F = class F2 {
      constructor(a2) {
        this.index = 0, this.flags = 0, this.onHeaderEnd = m, this.onHeaderField = m, this.onHeadersEnd = m, this.onHeaderValue = m, this.onPartBegin = m, this.onPartData = m, this.onPartEnd = m, this.boundaryChars = {}, a2 = `\r
--` + a2;
        const n3 = new Uint8Array(a2.length);
        for (let r = 0; r < a2.length; r++)
          n3[r] = a2.charCodeAt(r), this.boundaryChars[n3[r]] = true;
        this.boundary = n3, this.lookbehind = new Uint8Array(this.boundary.length + 8), this.state = t2.START_BOUNDARY;
      }
      write(a2) {
        let n3 = 0;
        const r = a2.length;
        let d2 = this.index, { lookbehind: l2, boundary: c, boundaryChars: p, index: e, state: i, flags: A2 } = this;
        const H2 = this.boundary.length, O2 = H2 - 1, y = a2.length;
        let o3, L;
        const f3 = E((h) => {
          this[h + "Mark"] = n3;
        }, "mark"), s2 = E((h) => {
          delete this[h + "Mark"];
        }, "clear"), T2 = E((h, S, _, U) => {
          (S === void 0 || S !== _) && this[h](U && U.subarray(S, _));
        }, "callback"), b = E((h, S) => {
          const _ = h + "Mark";
          _ in this && (S ? (T2(h, this[_], n3, a2), delete this[_]) : (T2(h, this[_], a2.length, a2), this[_] = 0));
        }, "dataCallback");
        for (n3 = 0; n3 < r; n3++)
          switch (o3 = a2[n3], i) {
            case t2.START_BOUNDARY:
              if (e === c.length - 2) {
                if (o3 === P)
                  A2 |= R.LAST_BOUNDARY;
                else if (o3 !== N)
                  return;
                e++;
                break;
              } else if (e - 1 === c.length - 2) {
                if (A2 & R.LAST_BOUNDARY && o3 === P)
                  i = t2.END, A2 = 0;
                else if (!(A2 & R.LAST_BOUNDARY) && o3 === g)
                  e = 0, T2("onPartBegin"), i = t2.HEADER_FIELD_START;
                else
                  return;
                break;
              }
              o3 !== c[e + 2] && (e = -2), o3 === c[e + 2] && e++;
              break;
            case t2.HEADER_FIELD_START:
              i = t2.HEADER_FIELD, f3("onHeaderField"), e = 0;
            case t2.HEADER_FIELD:
              if (o3 === N) {
                s2("onHeaderField"), i = t2.HEADERS_ALMOST_DONE;
                break;
              }
              if (e++, o3 === P)
                break;
              if (o3 === C) {
                if (e === 1)
                  return;
                b("onHeaderField", true), i = t2.HEADER_VALUE_START;
                break;
              }
              if (L = $(o3), L < I || L > M)
                return;
              break;
            case t2.HEADER_VALUE_START:
              if (o3 === x)
                break;
              f3("onHeaderValue"), i = t2.HEADER_VALUE;
            case t2.HEADER_VALUE:
              o3 === N && (b("onHeaderValue", true), T2("onHeaderEnd"), i = t2.HEADER_VALUE_ALMOST_DONE);
              break;
            case t2.HEADER_VALUE_ALMOST_DONE:
              if (o3 !== g)
                return;
              i = t2.HEADER_FIELD_START;
              break;
            case t2.HEADERS_ALMOST_DONE:
              if (o3 !== g)
                return;
              T2("onHeadersEnd"), i = t2.PART_DATA_START;
              break;
            case t2.PART_DATA_START:
              i = t2.PART_DATA, f3("onPartData");
            case t2.PART_DATA:
              if (d2 = e, e === 0) {
                for (n3 += O2; n3 < y && !(a2[n3] in p); )
                  n3 += H2;
                n3 -= O2, o3 = a2[n3];
              }
              if (e < c.length)
                c[e] === o3 ? (e === 0 && b("onPartData", true), e++) : e = 0;
              else if (e === c.length)
                e++, o3 === N ? A2 |= R.PART_BOUNDARY : o3 === P ? A2 |= R.LAST_BOUNDARY : e = 0;
              else if (e - 1 === c.length)
                if (A2 & R.PART_BOUNDARY) {
                  if (e = 0, o3 === g) {
                    A2 &= ~R.PART_BOUNDARY, T2("onPartEnd"), T2("onPartBegin"), i = t2.HEADER_FIELD_START;
                    break;
                  }
                } else
                  A2 & R.LAST_BOUNDARY && o3 === P ? (T2("onPartEnd"), i = t2.END, A2 = 0) : e = 0;
              if (e > 0)
                l2[e - 1] = o3;
              else if (d2 > 0) {
                const h = new Uint8Array(l2.buffer, l2.byteOffset, l2.byteLength);
                T2("onPartData", 0, d2, h), d2 = 0, f3("onPartData"), n3--;
              }
              break;
            case t2.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${i}`);
          }
        b("onHeaderField"), b("onHeaderValue"), b("onPartData"), this.index = e, this.state = i, this.flags = A2;
      }
      end() {
        if (this.state === t2.HEADER_FIELD_START && this.index === 0 || this.state === t2.PART_DATA && this.index === this.boundary.length)
          this.onPartEnd();
        else if (this.state !== t2.END)
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
      }
    };
    E(F, "MultipartParser");
    k = F;
    E(v, "_fileName");
    E(Z, "toFormData");
  }
});
function js(i) {
  if (!/^data:/i.test(i))
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  i = i.replace(/\r?\n/g, "");
  const o3 = i.indexOf(",");
  if (o3 === -1 || o3 <= 4)
    throw new TypeError("malformed data: URI");
  const a2 = i.substring(5, o3).split(";");
  let u2 = "", l2 = false;
  const p = a2[0] || "text/plain";
  let h = p;
  for (let E2 = 1; E2 < a2.length; E2++)
    a2[E2] === "base64" ? l2 = true : a2[E2] && (h += `;${a2[E2]}`, a2[E2].indexOf("charset=") === 0 && (u2 = a2[E2].substring(8)));
  !a2[0] && !u2.length && (h += ";charset=US-ASCII", u2 = "US-ASCII");
  const g3 = l2 ? "base64" : "ascii", A2 = unescape(i.substring(o3 + 1)), w2 = Buffer.from(A2, g3);
  return w2.type = p, w2.typeFull = h, w2.charset = u2, w2;
}
function Ls() {
  return di || (di = 1, function(i, o3) {
    (function(a2, u2) {
      u2(o3);
    })(n, function(a2) {
      function u2() {
      }
      n2(u2, "noop");
      function l2(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n2(l2, "typeIsObject");
      const p = u2;
      function h(e, t4) {
        try {
          Object.defineProperty(e, "name", { value: t4, configurable: true });
        } catch {
        }
      }
      n2(h, "setFunctionName");
      const g3 = Promise, A2 = Promise.prototype.then, w2 = Promise.reject.bind(g3);
      function E2(e) {
        return new g3(e);
      }
      n2(E2, "newPromise");
      function T2(e) {
        return E2((t4) => t4(e));
      }
      n2(T2, "promiseResolvedWith");
      function b(e) {
        return w2(e);
      }
      n2(b, "promiseRejectedWith");
      function q(e, t4, r) {
        return A2.call(e, t4, r);
      }
      n2(q, "PerformPromiseThen");
      function _(e, t4, r) {
        q(q(e, t4, r), void 0, p);
      }
      n2(_, "uponPromise");
      function V(e, t4) {
        _(e, t4);
      }
      n2(V, "uponFulfillment");
      function I2(e, t4) {
        _(e, void 0, t4);
      }
      n2(I2, "uponRejection");
      function F3(e, t4, r) {
        return q(e, t4, r);
      }
      n2(F3, "transformPromiseWith");
      function Q(e) {
        q(e, void 0, p);
      }
      n2(Q, "setPromiseIsHandledToTrue");
      let ge = n2((e) => {
        if (typeof queueMicrotask == "function")
          ge = queueMicrotask;
        else {
          const t4 = T2(void 0);
          ge = n2((r) => q(t4, r), "_queueMicrotask");
        }
        return ge(e);
      }, "_queueMicrotask");
      function z(e, t4, r) {
        if (typeof e != "function")
          throw new TypeError("Argument is not a function");
        return Function.prototype.apply.call(e, t4, r);
      }
      n2(z, "reflectCall");
      function j(e, t4, r) {
        try {
          return T2(z(e, t4, r));
        } catch (s2) {
          return b(s2);
        }
      }
      n2(j, "promiseCall");
      const U = 16384, bn = class bn {
        constructor() {
          this._cursor = 0, this._size = 0, this._front = { _elements: [], _next: void 0 }, this._back = this._front, this._cursor = 0, this._size = 0;
        }
        get length() {
          return this._size;
        }
        push(t4) {
          const r = this._back;
          let s2 = r;
          r._elements.length === U - 1 && (s2 = { _elements: [], _next: void 0 }), r._elements.push(t4), s2 !== r && (this._back = s2, r._next = s2), ++this._size;
        }
        shift() {
          const t4 = this._front;
          let r = t4;
          const s2 = this._cursor;
          let f3 = s2 + 1;
          const c = t4._elements, d2 = c[s2];
          return f3 === U && (r = t4._next, f3 = 0), --this._size, this._cursor = f3, t4 !== r && (this._front = r), c[s2] = void 0, d2;
        }
        forEach(t4) {
          let r = this._cursor, s2 = this._front, f3 = s2._elements;
          for (; (r !== f3.length || s2._next !== void 0) && !(r === f3.length && (s2 = s2._next, f3 = s2._elements, r = 0, f3.length === 0)); )
            t4(f3[r]), ++r;
        }
        peek() {
          const t4 = this._front, r = this._cursor;
          return t4._elements[r];
        }
      };
      n2(bn, "SimpleQueue");
      let D2 = bn;
      const Ft = Symbol("[[AbortSteps]]"), Qn = Symbol("[[ErrorSteps]]"), Ar = Symbol("[[CancelSteps]]"), Br = Symbol("[[PullSteps]]"), kr = Symbol("[[ReleaseSteps]]");
      function Yn(e, t4) {
        e._ownerReadableStream = t4, t4._reader = e, t4._state === "readable" ? qr(e) : t4._state === "closed" ? Li(e) : Gn(e, t4._storedError);
      }
      n2(Yn, "ReadableStreamReaderGenericInitialize");
      function Wr(e, t4) {
        const r = e._ownerReadableStream;
        return ie(r, t4);
      }
      n2(Wr, "ReadableStreamReaderGenericCancel");
      function _e(e) {
        const t4 = e._ownerReadableStream;
        t4._state === "readable" ? Or(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")) : $i(e, new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")), t4._readableStreamController[kr](), t4._reader = void 0, e._ownerReadableStream = void 0;
      }
      n2(_e, "ReadableStreamReaderGenericRelease");
      function jt(e) {
        return new TypeError("Cannot " + e + " a stream using a released reader");
      }
      n2(jt, "readerLockException");
      function qr(e) {
        e._closedPromise = E2((t4, r) => {
          e._closedPromise_resolve = t4, e._closedPromise_reject = r;
        });
      }
      n2(qr, "defaultReaderClosedPromiseInitialize");
      function Gn(e, t4) {
        qr(e), Or(e, t4);
      }
      n2(Gn, "defaultReaderClosedPromiseInitializeAsRejected");
      function Li(e) {
        qr(e), Zn(e);
      }
      n2(Li, "defaultReaderClosedPromiseInitializeAsResolved");
      function Or(e, t4) {
        e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t4), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n2(Or, "defaultReaderClosedPromiseReject");
      function $i(e, t4) {
        Gn(e, t4);
      }
      n2($i, "defaultReaderClosedPromiseResetToRejected");
      function Zn(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0);
      }
      n2(Zn, "defaultReaderClosedPromiseResolve");
      const Kn = Number.isFinite || function(e) {
        return typeof e == "number" && isFinite(e);
      }, Di = Math.trunc || function(e) {
        return e < 0 ? Math.ceil(e) : Math.floor(e);
      };
      function Mi(e) {
        return typeof e == "object" || typeof e == "function";
      }
      n2(Mi, "isDictionary");
      function ue(e, t4) {
        if (e !== void 0 && !Mi(e))
          throw new TypeError(`${t4} is not an object.`);
      }
      n2(ue, "assertDictionary");
      function Z2(e, t4) {
        if (typeof e != "function")
          throw new TypeError(`${t4} is not a function.`);
      }
      n2(Z2, "assertFunction");
      function Ui(e) {
        return typeof e == "object" && e !== null || typeof e == "function";
      }
      n2(Ui, "isObject");
      function Jn(e, t4) {
        if (!Ui(e))
          throw new TypeError(`${t4} is not an object.`);
      }
      n2(Jn, "assertObject");
      function Se(e, t4, r) {
        if (e === void 0)
          throw new TypeError(`Parameter ${t4} is required in '${r}'.`);
      }
      n2(Se, "assertRequiredArgument");
      function zr(e, t4, r) {
        if (e === void 0)
          throw new TypeError(`${t4} is required in '${r}'.`);
      }
      n2(zr, "assertRequiredField");
      function Ir(e) {
        return Number(e);
      }
      n2(Ir, "convertUnrestrictedDouble");
      function Xn(e) {
        return e === 0 ? 0 : e;
      }
      n2(Xn, "censorNegativeZero");
      function xi(e) {
        return Xn(Di(e));
      }
      n2(xi, "integerPart");
      function Fr(e, t4) {
        const s2 = Number.MAX_SAFE_INTEGER;
        let f3 = Number(e);
        if (f3 = Xn(f3), !Kn(f3))
          throw new TypeError(`${t4} is not a finite number`);
        if (f3 = xi(f3), f3 < 0 || f3 > s2)
          throw new TypeError(`${t4} is outside the accepted range of 0 to ${s2}, inclusive`);
        return !Kn(f3) || f3 === 0 ? 0 : f3;
      }
      n2(Fr, "convertUnsignedLongLongWithEnforceRange");
      function jr(e, t4) {
        if (!We(e))
          throw new TypeError(`${t4} is not a ReadableStream.`);
      }
      n2(jr, "assertReadableStream");
      function Qe(e) {
        return new fe(e);
      }
      n2(Qe, "AcquireReadableStreamDefaultReader");
      function eo(e, t4) {
        e._reader._readRequests.push(t4);
      }
      n2(eo, "ReadableStreamAddReadRequest");
      function Lr(e, t4, r) {
        const f3 = e._reader._readRequests.shift();
        r ? f3._closeSteps() : f3._chunkSteps(t4);
      }
      n2(Lr, "ReadableStreamFulfillReadRequest");
      function Lt(e) {
        return e._reader._readRequests.length;
      }
      n2(Lt, "ReadableStreamGetNumReadRequests");
      function to(e) {
        const t4 = e._reader;
        return !(t4 === void 0 || !Ee(t4));
      }
      n2(to, "ReadableStreamHasDefaultReader");
      const mn = class mn {
        constructor(t4) {
          if (Se(t4, 1, "ReadableStreamDefaultReader"), jr(t4, "First parameter"), qe(t4))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          Yn(this, t4), this._readRequests = new D2();
        }
        get closed() {
          return Ee(this) ? this._closedPromise : b($t("closed"));
        }
        cancel(t4 = void 0) {
          return Ee(this) ? this._ownerReadableStream === void 0 ? b(jt("cancel")) : Wr(this, t4) : b($t("cancel"));
        }
        read() {
          if (!Ee(this))
            return b($t("read"));
          if (this._ownerReadableStream === void 0)
            return b(jt("read from"));
          let t4, r;
          const s2 = E2((c, d2) => {
            t4 = c, r = d2;
          });
          return mt(this, { _chunkSteps: (c) => t4({ value: c, done: false }), _closeSteps: () => t4({ value: void 0, done: true }), _errorSteps: (c) => r(c) }), s2;
        }
        releaseLock() {
          if (!Ee(this))
            throw $t("releaseLock");
          this._ownerReadableStream !== void 0 && Ni(this);
        }
      };
      n2(mn, "ReadableStreamDefaultReader");
      let fe = mn;
      Object.defineProperties(fe.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h(fe.prototype.cancel, "cancel"), h(fe.prototype.read, "read"), h(fe.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(fe.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultReader", configurable: true });
      function Ee(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_readRequests") ? false : e instanceof fe;
      }
      n2(Ee, "IsReadableStreamDefaultReader");
      function mt(e, t4) {
        const r = e._ownerReadableStream;
        r._disturbed = true, r._state === "closed" ? t4._closeSteps() : r._state === "errored" ? t4._errorSteps(r._storedError) : r._readableStreamController[Br](t4);
      }
      n2(mt, "ReadableStreamDefaultReaderRead");
      function Ni(e) {
        _e(e);
        const t4 = new TypeError("Reader was released");
        ro(e, t4);
      }
      n2(Ni, "ReadableStreamDefaultReaderRelease");
      function ro(e, t4) {
        const r = e._readRequests;
        e._readRequests = new D2(), r.forEach((s2) => {
          s2._errorSteps(t4);
        });
      }
      n2(ro, "ReadableStreamDefaultReaderErrorReadRequests");
      function $t(e) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`);
      }
      n2($t, "defaultReaderBrandCheckException");
      const Hi = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype), yn = class yn {
        constructor(t4, r) {
          this._ongoingPromise = void 0, this._isFinished = false, this._reader = t4, this._preventCancel = r;
        }
        next() {
          const t4 = n2(() => this._nextSteps(), "nextSteps");
          return this._ongoingPromise = this._ongoingPromise ? F3(this._ongoingPromise, t4, t4) : t4(), this._ongoingPromise;
        }
        return(t4) {
          const r = n2(() => this._returnSteps(t4), "returnSteps");
          return this._ongoingPromise ? F3(this._ongoingPromise, r, r) : r();
        }
        _nextSteps() {
          if (this._isFinished)
            return Promise.resolve({ value: void 0, done: true });
          const t4 = this._reader;
          let r, s2;
          const f3 = E2((d2, m2) => {
            r = d2, s2 = m2;
          });
          return mt(t4, { _chunkSteps: (d2) => {
            this._ongoingPromise = void 0, ge(() => r({ value: d2, done: false }));
          }, _closeSteps: () => {
            this._ongoingPromise = void 0, this._isFinished = true, _e(t4), r({ value: void 0, done: true });
          }, _errorSteps: (d2) => {
            this._ongoingPromise = void 0, this._isFinished = true, _e(t4), s2(d2);
          } }), f3;
        }
        _returnSteps(t4) {
          if (this._isFinished)
            return Promise.resolve({ value: t4, done: true });
          this._isFinished = true;
          const r = this._reader;
          if (!this._preventCancel) {
            const s2 = Wr(r, t4);
            return _e(r), F3(s2, () => ({ value: t4, done: true }));
          }
          return _e(r), T2({ value: t4, done: true });
        }
      };
      n2(yn, "ReadableStreamAsyncIteratorImpl");
      let Dt = yn;
      const no = { next() {
        return oo(this) ? this._asyncIteratorImpl.next() : b(io("next"));
      }, return(e) {
        return oo(this) ? this._asyncIteratorImpl.return(e) : b(io("return"));
      } };
      Object.setPrototypeOf(no, Hi);
      function Vi(e, t4) {
        const r = Qe(e), s2 = new Dt(r, t4), f3 = Object.create(no);
        return f3._asyncIteratorImpl = s2, f3;
      }
      n2(Vi, "AcquireReadableStreamAsyncIterator");
      function oo(e) {
        if (!l2(e) || !Object.prototype.hasOwnProperty.call(e, "_asyncIteratorImpl"))
          return false;
        try {
          return e._asyncIteratorImpl instanceof Dt;
        } catch {
          return false;
        }
      }
      n2(oo, "IsReadableStreamAsyncIterator");
      function io(e) {
        return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`);
      }
      n2(io, "streamAsyncIteratorBrandCheckException");
      const ao = Number.isNaN || function(e) {
        return e !== e;
      };
      var $r, Dr, Mr;
      function yt(e) {
        return e.slice();
      }
      n2(yt, "CreateArrayFromList");
      function so(e, t4, r, s2, f3) {
        new Uint8Array(e).set(new Uint8Array(r, s2, f3), t4);
      }
      n2(so, "CopyDataBlockBytes");
      let we = n2((e) => (typeof e.transfer == "function" ? we = n2((t4) => t4.transfer(), "TransferArrayBuffer") : typeof structuredClone == "function" ? we = n2((t4) => structuredClone(t4, { transfer: [t4] }), "TransferArrayBuffer") : we = n2((t4) => t4, "TransferArrayBuffer"), we(e)), "TransferArrayBuffer"), Ae = n2((e) => (typeof e.detached == "boolean" ? Ae = n2((t4) => t4.detached, "IsDetachedBuffer") : Ae = n2((t4) => t4.byteLength === 0, "IsDetachedBuffer"), Ae(e)), "IsDetachedBuffer");
      function lo(e, t4, r) {
        if (e.slice)
          return e.slice(t4, r);
        const s2 = r - t4, f3 = new ArrayBuffer(s2);
        return so(f3, 0, e, t4, s2), f3;
      }
      n2(lo, "ArrayBufferSlice");
      function Mt(e, t4) {
        const r = e[t4];
        if (r != null) {
          if (typeof r != "function")
            throw new TypeError(`${String(t4)} is not a function`);
          return r;
        }
      }
      n2(Mt, "GetMethod");
      function Qi(e) {
        const t4 = { [Symbol.iterator]: () => e.iterator }, r = async function* () {
          return yield* t4;
        }(), s2 = r.next;
        return { iterator: r, nextMethod: s2, done: false };
      }
      n2(Qi, "CreateAsyncFromSyncIterator");
      const Ur = (Mr = ($r = Symbol.asyncIterator) !== null && $r !== void 0 ? $r : (Dr = Symbol.for) === null || Dr === void 0 ? void 0 : Dr.call(Symbol, "Symbol.asyncIterator")) !== null && Mr !== void 0 ? Mr : "@@asyncIterator";
      function uo(e, t4 = "sync", r) {
        if (r === void 0)
          if (t4 === "async") {
            if (r = Mt(e, Ur), r === void 0) {
              const c = Mt(e, Symbol.iterator), d2 = uo(e, "sync", c);
              return Qi(d2);
            }
          } else
            r = Mt(e, Symbol.iterator);
        if (r === void 0)
          throw new TypeError("The object is not iterable");
        const s2 = z(r, e, []);
        if (!l2(s2))
          throw new TypeError("The iterator method must return an object");
        const f3 = s2.next;
        return { iterator: s2, nextMethod: f3, done: false };
      }
      n2(uo, "GetIterator");
      function Yi(e) {
        const t4 = z(e.nextMethod, e.iterator, []);
        if (!l2(t4))
          throw new TypeError("The iterator.next() method must return an object");
        return t4;
      }
      n2(Yi, "IteratorNext");
      function Gi(e) {
        return !!e.done;
      }
      n2(Gi, "IteratorComplete");
      function Zi(e) {
        return e.value;
      }
      n2(Zi, "IteratorValue");
      function Ki(e) {
        return !(typeof e != "number" || ao(e) || e < 0);
      }
      n2(Ki, "IsNonNegativeNumber");
      function fo(e) {
        const t4 = lo(e.buffer, e.byteOffset, e.byteOffset + e.byteLength);
        return new Uint8Array(t4);
      }
      n2(fo, "CloneAsUint8Array");
      function xr(e) {
        const t4 = e._queue.shift();
        return e._queueTotalSize -= t4.size, e._queueTotalSize < 0 && (e._queueTotalSize = 0), t4.value;
      }
      n2(xr, "DequeueValue");
      function Nr(e, t4, r) {
        if (!Ki(r) || r === 1 / 0)
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        e._queue.push({ value: t4, size: r }), e._queueTotalSize += r;
      }
      n2(Nr, "EnqueueValueWithSize");
      function Ji(e) {
        return e._queue.peek().value;
      }
      n2(Ji, "PeekQueueValue");
      function Be(e) {
        e._queue = new D2(), e._queueTotalSize = 0;
      }
      n2(Be, "ResetQueue");
      function co(e) {
        return e === DataView;
      }
      n2(co, "isDataViewConstructor");
      function Xi(e) {
        return co(e.constructor);
      }
      n2(Xi, "isDataView");
      function ea(e) {
        return co(e) ? 1 : e.BYTES_PER_ELEMENT;
      }
      n2(ea, "arrayBufferViewElementSize");
      const gn = class gn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get view() {
          if (!Hr(this))
            throw Zr("view");
          return this._view;
        }
        respond(t4) {
          if (!Hr(this))
            throw Zr("respond");
          if (Se(t4, 1, "respond"), t4 = Fr(t4, "First parameter"), this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          if (Ae(this._view.buffer))
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");
          Ht(this._associatedReadableByteStreamController, t4);
        }
        respondWithNewView(t4) {
          if (!Hr(this))
            throw Zr("respondWithNewView");
          if (Se(t4, 1, "respondWithNewView"), !ArrayBuffer.isView(t4))
            throw new TypeError("You can only respond with array buffer views");
          if (this._associatedReadableByteStreamController === void 0)
            throw new TypeError("This BYOB request has been invalidated");
          if (Ae(t4.buffer))
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          Vt(this._associatedReadableByteStreamController, t4);
        }
      };
      n2(gn, "ReadableStreamBYOBRequest");
      let Re = gn;
      Object.defineProperties(Re.prototype, { respond: { enumerable: true }, respondWithNewView: { enumerable: true }, view: { enumerable: true } }), h(Re.prototype.respond, "respond"), h(Re.prototype.respondWithNewView, "respondWithNewView"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Re.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBRequest", configurable: true });
      const _n = class _n {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get byobRequest() {
          if (!ze(this))
            throw _t("byobRequest");
          return Gr(this);
        }
        get desiredSize() {
          if (!ze(this))
            throw _t("desiredSize");
          return Ro(this);
        }
        close() {
          if (!ze(this))
            throw _t("close");
          if (this._closeRequested)
            throw new TypeError("The stream has already been closed; do not close it again!");
          const t4 = this._controlledReadableByteStream._state;
          if (t4 !== "readable")
            throw new TypeError(`The stream (in ${t4} state) is not in the readable state and cannot be closed`);
          gt(this);
        }
        enqueue(t4) {
          if (!ze(this))
            throw _t("enqueue");
          if (Se(t4, 1, "enqueue"), !ArrayBuffer.isView(t4))
            throw new TypeError("chunk must be an array buffer view");
          if (t4.byteLength === 0)
            throw new TypeError("chunk must have non-zero byteLength");
          if (t4.buffer.byteLength === 0)
            throw new TypeError("chunk's buffer must have non-zero byteLength");
          if (this._closeRequested)
            throw new TypeError("stream is closed or draining");
          const r = this._controlledReadableByteStream._state;
          if (r !== "readable")
            throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);
          Nt(this, t4);
        }
        error(t4 = void 0) {
          if (!ze(this))
            throw _t("error");
          K(this, t4);
        }
        [Ar](t4) {
          ho(this), Be(this);
          const r = this._cancelAlgorithm(t4);
          return xt(this), r;
        }
        [Br](t4) {
          const r = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            wo(this, t4);
            return;
          }
          const s2 = this._autoAllocateChunkSize;
          if (s2 !== void 0) {
            let f3;
            try {
              f3 = new ArrayBuffer(s2);
            } catch (d2) {
              t4._errorSteps(d2);
              return;
            }
            const c = { buffer: f3, bufferByteLength: s2, byteOffset: 0, byteLength: s2, bytesFilled: 0, minimumFill: 1, elementSize: 1, viewConstructor: Uint8Array, readerType: "default" };
            this._pendingPullIntos.push(c);
          }
          eo(r, t4), Ie(this);
        }
        [kr]() {
          if (this._pendingPullIntos.length > 0) {
            const t4 = this._pendingPullIntos.peek();
            t4.readerType = "none", this._pendingPullIntos = new D2(), this._pendingPullIntos.push(t4);
          }
        }
      };
      n2(_n, "ReadableByteStreamController");
      let te = _n;
      Object.defineProperties(te.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, byobRequest: { enumerable: true }, desiredSize: { enumerable: true } }), h(te.prototype.close, "close"), h(te.prototype.enqueue, "enqueue"), h(te.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(te.prototype, Symbol.toStringTag, { value: "ReadableByteStreamController", configurable: true });
      function ze(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableByteStream") ? false : e instanceof te;
      }
      n2(ze, "IsReadableByteStreamController");
      function Hr(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_associatedReadableByteStreamController") ? false : e instanceof Re;
      }
      n2(Hr, "IsReadableStreamBYOBRequest");
      function Ie(e) {
        if (!ia(e))
          return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r = e._pullAlgorithm();
        _(r, () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, Ie(e)), null), (s2) => (K(e, s2), null));
      }
      n2(Ie, "ReadableByteStreamControllerCallPullIfNeeded");
      function ho(e) {
        Qr(e), e._pendingPullIntos = new D2();
      }
      n2(ho, "ReadableByteStreamControllerClearPendingPullIntos");
      function Vr(e, t4) {
        let r = false;
        e._state === "closed" && (r = true);
        const s2 = po(t4);
        t4.readerType === "default" ? Lr(e, s2, r) : ca(e, s2, r);
      }
      n2(Vr, "ReadableByteStreamControllerCommitPullIntoDescriptor");
      function po(e) {
        const t4 = e.bytesFilled, r = e.elementSize;
        return new e.viewConstructor(e.buffer, e.byteOffset, t4 / r);
      }
      n2(po, "ReadableByteStreamControllerConvertPullIntoDescriptor");
      function Ut(e, t4, r, s2) {
        e._queue.push({ buffer: t4, byteOffset: r, byteLength: s2 }), e._queueTotalSize += s2;
      }
      n2(Ut, "ReadableByteStreamControllerEnqueueChunkToQueue");
      function bo(e, t4, r, s2) {
        let f3;
        try {
          f3 = lo(t4, r, r + s2);
        } catch (c) {
          throw K(e, c), c;
        }
        Ut(e, f3, 0, s2);
      }
      n2(bo, "ReadableByteStreamControllerEnqueueClonedChunkToQueue");
      function mo(e, t4) {
        t4.bytesFilled > 0 && bo(e, t4.buffer, t4.byteOffset, t4.bytesFilled), Ye(e);
      }
      n2(mo, "ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");
      function yo(e, t4) {
        const r = Math.min(e._queueTotalSize, t4.byteLength - t4.bytesFilled), s2 = t4.bytesFilled + r;
        let f3 = r, c = false;
        const d2 = s2 % t4.elementSize, m2 = s2 - d2;
        m2 >= t4.minimumFill && (f3 = m2 - t4.bytesFilled, c = true);
        const R3 = e._queue;
        for (; f3 > 0; ) {
          const y = R3.peek(), C3 = Math.min(f3, y.byteLength), P2 = t4.byteOffset + t4.bytesFilled;
          so(t4.buffer, P2, y.buffer, y.byteOffset, C3), y.byteLength === C3 ? R3.shift() : (y.byteOffset += C3, y.byteLength -= C3), e._queueTotalSize -= C3, go(e, C3, t4), f3 -= C3;
        }
        return c;
      }
      n2(yo, "ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");
      function go(e, t4, r) {
        r.bytesFilled += t4;
      }
      n2(go, "ReadableByteStreamControllerFillHeadPullIntoDescriptor");
      function _o(e) {
        e._queueTotalSize === 0 && e._closeRequested ? (xt(e), Pt(e._controlledReadableByteStream)) : Ie(e);
      }
      n2(_o, "ReadableByteStreamControllerHandleQueueDrain");
      function Qr(e) {
        e._byobRequest !== null && (e._byobRequest._associatedReadableByteStreamController = void 0, e._byobRequest._view = null, e._byobRequest = null);
      }
      n2(Qr, "ReadableByteStreamControllerInvalidateBYOBRequest");
      function Yr(e) {
        for (; e._pendingPullIntos.length > 0; ) {
          if (e._queueTotalSize === 0)
            return;
          const t4 = e._pendingPullIntos.peek();
          yo(e, t4) && (Ye(e), Vr(e._controlledReadableByteStream, t4));
        }
      }
      n2(Yr, "ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");
      function ta(e) {
        const t4 = e._controlledReadableByteStream._reader;
        for (; t4._readRequests.length > 0; ) {
          if (e._queueTotalSize === 0)
            return;
          const r = t4._readRequests.shift();
          wo(e, r);
        }
      }
      n2(ta, "ReadableByteStreamControllerProcessReadRequestsUsingQueue");
      function ra(e, t4, r, s2) {
        const f3 = e._controlledReadableByteStream, c = t4.constructor, d2 = ea(c), { byteOffset: m2, byteLength: R3 } = t4, y = r * d2;
        let C3;
        try {
          C3 = we(t4.buffer);
        } catch (B2) {
          s2._errorSteps(B2);
          return;
        }
        const P2 = { buffer: C3, bufferByteLength: C3.byteLength, byteOffset: m2, byteLength: R3, bytesFilled: 0, minimumFill: y, elementSize: d2, viewConstructor: c, readerType: "byob" };
        if (e._pendingPullIntos.length > 0) {
          e._pendingPullIntos.push(P2), Po(f3, s2);
          return;
        }
        if (f3._state === "closed") {
          const B2 = new c(P2.buffer, P2.byteOffset, 0);
          s2._closeSteps(B2);
          return;
        }
        if (e._queueTotalSize > 0) {
          if (yo(e, P2)) {
            const B2 = po(P2);
            _o(e), s2._chunkSteps(B2);
            return;
          }
          if (e._closeRequested) {
            const B2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            K(e, B2), s2._errorSteps(B2);
            return;
          }
        }
        e._pendingPullIntos.push(P2), Po(f3, s2), Ie(e);
      }
      n2(ra, "ReadableByteStreamControllerPullInto");
      function na(e, t4) {
        t4.readerType === "none" && Ye(e);
        const r = e._controlledReadableByteStream;
        if (Kr(r))
          for (; vo(r) > 0; ) {
            const s2 = Ye(e);
            Vr(r, s2);
          }
      }
      n2(na, "ReadableByteStreamControllerRespondInClosedState");
      function oa(e, t4, r) {
        if (go(e, t4, r), r.readerType === "none") {
          mo(e, r), Yr(e);
          return;
        }
        if (r.bytesFilled < r.minimumFill)
          return;
        Ye(e);
        const s2 = r.bytesFilled % r.elementSize;
        if (s2 > 0) {
          const f3 = r.byteOffset + r.bytesFilled;
          bo(e, r.buffer, f3 - s2, s2);
        }
        r.bytesFilled -= s2, Vr(e._controlledReadableByteStream, r), Yr(e);
      }
      n2(oa, "ReadableByteStreamControllerRespondInReadableState");
      function So(e, t4) {
        const r = e._pendingPullIntos.peek();
        Qr(e), e._controlledReadableByteStream._state === "closed" ? na(e, r) : oa(e, t4, r), Ie(e);
      }
      n2(So, "ReadableByteStreamControllerRespondInternal");
      function Ye(e) {
        return e._pendingPullIntos.shift();
      }
      n2(Ye, "ReadableByteStreamControllerShiftPendingPullInto");
      function ia(e) {
        const t4 = e._controlledReadableByteStream;
        return t4._state !== "readable" || e._closeRequested || !e._started ? false : !!(to(t4) && Lt(t4) > 0 || Kr(t4) && vo(t4) > 0 || Ro(e) > 0);
      }
      n2(ia, "ReadableByteStreamControllerShouldCallPull");
      function xt(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0;
      }
      n2(xt, "ReadableByteStreamControllerClearAlgorithms");
      function gt(e) {
        const t4 = e._controlledReadableByteStream;
        if (!(e._closeRequested || t4._state !== "readable")) {
          if (e._queueTotalSize > 0) {
            e._closeRequested = true;
            return;
          }
          if (e._pendingPullIntos.length > 0) {
            const r = e._pendingPullIntos.peek();
            if (r.bytesFilled % r.elementSize !== 0) {
              const s2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              throw K(e, s2), s2;
            }
          }
          xt(e), Pt(t4);
        }
      }
      n2(gt, "ReadableByteStreamControllerClose");
      function Nt(e, t4) {
        const r = e._controlledReadableByteStream;
        if (e._closeRequested || r._state !== "readable")
          return;
        const { buffer: s2, byteOffset: f3, byteLength: c } = t4;
        if (Ae(s2))
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        const d2 = we(s2);
        if (e._pendingPullIntos.length > 0) {
          const m2 = e._pendingPullIntos.peek();
          if (Ae(m2.buffer))
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          Qr(e), m2.buffer = we(m2.buffer), m2.readerType === "none" && mo(e, m2);
        }
        if (to(r))
          if (ta(e), Lt(r) === 0)
            Ut(e, d2, f3, c);
          else {
            e._pendingPullIntos.length > 0 && Ye(e);
            const m2 = new Uint8Array(d2, f3, c);
            Lr(r, m2, false);
          }
        else
          Kr(r) ? (Ut(e, d2, f3, c), Yr(e)) : Ut(e, d2, f3, c);
        Ie(e);
      }
      n2(Nt, "ReadableByteStreamControllerEnqueue");
      function K(e, t4) {
        const r = e._controlledReadableByteStream;
        r._state === "readable" && (ho(e), Be(e), xt(e), Zo(r, t4));
      }
      n2(K, "ReadableByteStreamControllerError");
      function wo(e, t4) {
        const r = e._queue.shift();
        e._queueTotalSize -= r.byteLength, _o(e);
        const s2 = new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
        t4._chunkSteps(s2);
      }
      n2(wo, "ReadableByteStreamControllerFillReadRequestFromQueue");
      function Gr(e) {
        if (e._byobRequest === null && e._pendingPullIntos.length > 0) {
          const t4 = e._pendingPullIntos.peek(), r = new Uint8Array(t4.buffer, t4.byteOffset + t4.bytesFilled, t4.byteLength - t4.bytesFilled), s2 = Object.create(Re.prototype);
          sa(s2, e, r), e._byobRequest = s2;
        }
        return e._byobRequest;
      }
      n2(Gr, "ReadableByteStreamControllerGetBYOBRequest");
      function Ro(e) {
        const t4 = e._controlledReadableByteStream._state;
        return t4 === "errored" ? null : t4 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n2(Ro, "ReadableByteStreamControllerGetDesiredSize");
      function Ht(e, t4) {
        const r = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t4 !== 0)
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
        } else {
          if (t4 === 0)
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          if (r.bytesFilled + t4 > r.byteLength)
            throw new RangeError("bytesWritten out of range");
        }
        r.buffer = we(r.buffer), So(e, t4);
      }
      n2(Ht, "ReadableByteStreamControllerRespond");
      function Vt(e, t4) {
        const r = e._pendingPullIntos.peek();
        if (e._controlledReadableByteStream._state === "closed") {
          if (t4.byteLength !== 0)
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
        } else if (t4.byteLength === 0)
          throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
        if (r.byteOffset + r.bytesFilled !== t4.byteOffset)
          throw new RangeError("The region specified by view does not match byobRequest");
        if (r.bufferByteLength !== t4.buffer.byteLength)
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        if (r.bytesFilled + t4.byteLength > r.byteLength)
          throw new RangeError("The region specified by view is larger than byobRequest");
        const f3 = t4.byteLength;
        r.buffer = we(t4.buffer), So(e, f3);
      }
      n2(Vt, "ReadableByteStreamControllerRespondWithNewView");
      function To(e, t4, r, s2, f3, c, d2) {
        t4._controlledReadableByteStream = e, t4._pullAgain = false, t4._pulling = false, t4._byobRequest = null, t4._queue = t4._queueTotalSize = void 0, Be(t4), t4._closeRequested = false, t4._started = false, t4._strategyHWM = c, t4._pullAlgorithm = s2, t4._cancelAlgorithm = f3, t4._autoAllocateChunkSize = d2, t4._pendingPullIntos = new D2(), e._readableStreamController = t4;
        const m2 = r();
        _(T2(m2), () => (t4._started = true, Ie(t4), null), (R3) => (K(t4, R3), null));
      }
      n2(To, "SetUpReadableByteStreamController");
      function aa(e, t4, r) {
        const s2 = Object.create(te.prototype);
        let f3, c, d2;
        t4.start !== void 0 ? f3 = n2(() => t4.start(s2), "startAlgorithm") : f3 = n2(() => {
        }, "startAlgorithm"), t4.pull !== void 0 ? c = n2(() => t4.pull(s2), "pullAlgorithm") : c = n2(() => T2(void 0), "pullAlgorithm"), t4.cancel !== void 0 ? d2 = n2((R3) => t4.cancel(R3), "cancelAlgorithm") : d2 = n2(() => T2(void 0), "cancelAlgorithm");
        const m2 = t4.autoAllocateChunkSize;
        if (m2 === 0)
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        To(e, s2, f3, c, d2, r, m2);
      }
      n2(aa, "SetUpReadableByteStreamControllerFromUnderlyingSource");
      function sa(e, t4, r) {
        e._associatedReadableByteStreamController = t4, e._view = r;
      }
      n2(sa, "SetUpReadableStreamBYOBRequest");
      function Zr(e) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`);
      }
      n2(Zr, "byobRequestBrandCheckException");
      function _t(e) {
        return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`);
      }
      n2(_t, "byteStreamControllerBrandCheckException");
      function la(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.mode;
        return { mode: r === void 0 ? void 0 : ua(r, `${t4} has member 'mode' that`) };
      }
      n2(la, "convertReaderOptions");
      function ua(e, t4) {
        if (e = `${e}`, e !== "byob")
          throw new TypeError(`${t4} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);
        return e;
      }
      n2(ua, "convertReadableStreamReaderMode");
      function fa(e, t4) {
        var r;
        ue(e, t4);
        const s2 = (r = e == null ? void 0 : e.min) !== null && r !== void 0 ? r : 1;
        return { min: Fr(s2, `${t4} has member 'min' that`) };
      }
      n2(fa, "convertByobReadOptions");
      function Co(e) {
        return new ce(e);
      }
      n2(Co, "AcquireReadableStreamBYOBReader");
      function Po(e, t4) {
        e._reader._readIntoRequests.push(t4);
      }
      n2(Po, "ReadableStreamAddReadIntoRequest");
      function ca(e, t4, r) {
        const f3 = e._reader._readIntoRequests.shift();
        r ? f3._closeSteps(t4) : f3._chunkSteps(t4);
      }
      n2(ca, "ReadableStreamFulfillReadIntoRequest");
      function vo(e) {
        return e._reader._readIntoRequests.length;
      }
      n2(vo, "ReadableStreamGetNumReadIntoRequests");
      function Kr(e) {
        const t4 = e._reader;
        return !(t4 === void 0 || !Fe(t4));
      }
      n2(Kr, "ReadableStreamHasBYOBReader");
      const Sn = class Sn {
        constructor(t4) {
          if (Se(t4, 1, "ReadableStreamBYOBReader"), jr(t4, "First parameter"), qe(t4))
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          if (!ze(t4._readableStreamController))
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          Yn(this, t4), this._readIntoRequests = new D2();
        }
        get closed() {
          return Fe(this) ? this._closedPromise : b(Qt("closed"));
        }
        cancel(t4 = void 0) {
          return Fe(this) ? this._ownerReadableStream === void 0 ? b(jt("cancel")) : Wr(this, t4) : b(Qt("cancel"));
        }
        read(t4, r = {}) {
          if (!Fe(this))
            return b(Qt("read"));
          if (!ArrayBuffer.isView(t4))
            return b(new TypeError("view must be an array buffer view"));
          if (t4.byteLength === 0)
            return b(new TypeError("view must have non-zero byteLength"));
          if (t4.buffer.byteLength === 0)
            return b(new TypeError("view's buffer must have non-zero byteLength"));
          if (Ae(t4.buffer))
            return b(new TypeError("view's buffer has been detached"));
          let s2;
          try {
            s2 = fa(r, "options");
          } catch (y) {
            return b(y);
          }
          const f3 = s2.min;
          if (f3 === 0)
            return b(new TypeError("options.min must be greater than 0"));
          if (Xi(t4)) {
            if (f3 > t4.byteLength)
              return b(new RangeError("options.min must be less than or equal to view's byteLength"));
          } else if (f3 > t4.length)
            return b(new RangeError("options.min must be less than or equal to view's length"));
          if (this._ownerReadableStream === void 0)
            return b(jt("read from"));
          let c, d2;
          const m2 = E2((y, C3) => {
            c = y, d2 = C3;
          });
          return Eo(this, t4, f3, { _chunkSteps: (y) => c({ value: y, done: false }), _closeSteps: (y) => c({ value: y, done: true }), _errorSteps: (y) => d2(y) }), m2;
        }
        releaseLock() {
          if (!Fe(this))
            throw Qt("releaseLock");
          this._ownerReadableStream !== void 0 && da(this);
        }
      };
      n2(Sn, "ReadableStreamBYOBReader");
      let ce = Sn;
      Object.defineProperties(ce.prototype, { cancel: { enumerable: true }, read: { enumerable: true }, releaseLock: { enumerable: true }, closed: { enumerable: true } }), h(ce.prototype.cancel, "cancel"), h(ce.prototype.read, "read"), h(ce.prototype.releaseLock, "releaseLock"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ce.prototype, Symbol.toStringTag, { value: "ReadableStreamBYOBReader", configurable: true });
      function Fe(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_readIntoRequests") ? false : e instanceof ce;
      }
      n2(Fe, "IsReadableStreamBYOBReader");
      function Eo(e, t4, r, s2) {
        const f3 = e._ownerReadableStream;
        f3._disturbed = true, f3._state === "errored" ? s2._errorSteps(f3._storedError) : ra(f3._readableStreamController, t4, r, s2);
      }
      n2(Eo, "ReadableStreamBYOBReaderRead");
      function da(e) {
        _e(e);
        const t4 = new TypeError("Reader was released");
        Ao(e, t4);
      }
      n2(da, "ReadableStreamBYOBReaderRelease");
      function Ao(e, t4) {
        const r = e._readIntoRequests;
        e._readIntoRequests = new D2(), r.forEach((s2) => {
          s2._errorSteps(t4);
        });
      }
      n2(Ao, "ReadableStreamBYOBReaderErrorReadIntoRequests");
      function Qt(e) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`);
      }
      n2(Qt, "byobReaderBrandCheckException");
      function St(e, t4) {
        const { highWaterMark: r } = e;
        if (r === void 0)
          return t4;
        if (ao(r) || r < 0)
          throw new RangeError("Invalid highWaterMark");
        return r;
      }
      n2(St, "ExtractHighWaterMark");
      function Yt(e) {
        const { size: t4 } = e;
        return t4 || (() => 1);
      }
      n2(Yt, "ExtractSizeAlgorithm");
      function Gt(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.highWaterMark, s2 = e == null ? void 0 : e.size;
        return { highWaterMark: r === void 0 ? void 0 : Ir(r), size: s2 === void 0 ? void 0 : ha(s2, `${t4} has member 'size' that`) };
      }
      n2(Gt, "convertQueuingStrategy");
      function ha(e, t4) {
        return Z2(e, t4), (r) => Ir(e(r));
      }
      n2(ha, "convertQueuingStrategySize");
      function pa(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.abort, s2 = e == null ? void 0 : e.close, f3 = e == null ? void 0 : e.start, c = e == null ? void 0 : e.type, d2 = e == null ? void 0 : e.write;
        return { abort: r === void 0 ? void 0 : ba(r, e, `${t4} has member 'abort' that`), close: s2 === void 0 ? void 0 : ma(s2, e, `${t4} has member 'close' that`), start: f3 === void 0 ? void 0 : ya(f3, e, `${t4} has member 'start' that`), write: d2 === void 0 ? void 0 : ga(d2, e, `${t4} has member 'write' that`), type: c };
      }
      n2(pa, "convertUnderlyingSink");
      function ba(e, t4, r) {
        return Z2(e, r), (s2) => j(e, t4, [s2]);
      }
      n2(ba, "convertUnderlyingSinkAbortCallback");
      function ma(e, t4, r) {
        return Z2(e, r), () => j(e, t4, []);
      }
      n2(ma, "convertUnderlyingSinkCloseCallback");
      function ya(e, t4, r) {
        return Z2(e, r), (s2) => z(e, t4, [s2]);
      }
      n2(ya, "convertUnderlyingSinkStartCallback");
      function ga(e, t4, r) {
        return Z2(e, r), (s2, f3) => j(e, t4, [s2, f3]);
      }
      n2(ga, "convertUnderlyingSinkWriteCallback");
      function Bo(e, t4) {
        if (!Ge(e))
          throw new TypeError(`${t4} is not a WritableStream.`);
      }
      n2(Bo, "assertWritableStream");
      function _a2(e) {
        if (typeof e != "object" || e === null)
          return false;
        try {
          return typeof e.aborted == "boolean";
        } catch {
          return false;
        }
      }
      n2(_a2, "isAbortSignal");
      const Sa = typeof AbortController == "function";
      function wa() {
        if (Sa)
          return new AbortController();
      }
      n2(wa, "createAbortController");
      const wn = class wn {
        constructor(t4 = {}, r = {}) {
          t4 === void 0 ? t4 = null : Jn(t4, "First parameter");
          const s2 = Gt(r, "Second parameter"), f3 = pa(t4, "First parameter");
          if (Wo(this), f3.type !== void 0)
            throw new RangeError("Invalid type is specified");
          const d2 = Yt(s2), m2 = St(s2, 1);
          Ia(this, f3, m2, d2);
        }
        get locked() {
          if (!Ge(this))
            throw er("locked");
          return Ze(this);
        }
        abort(t4 = void 0) {
          return Ge(this) ? Ze(this) ? b(new TypeError("Cannot abort a stream that already has a writer")) : Zt(this, t4) : b(er("abort"));
        }
        close() {
          return Ge(this) ? Ze(this) ? b(new TypeError("Cannot close a stream that already has a writer")) : he(this) ? b(new TypeError("Cannot close an already-closing stream")) : qo(this) : b(er("close"));
        }
        getWriter() {
          if (!Ge(this))
            throw er("getWriter");
          return ko(this);
        }
      };
      n2(wn, "WritableStream");
      let de = wn;
      Object.defineProperties(de.prototype, { abort: { enumerable: true }, close: { enumerable: true }, getWriter: { enumerable: true }, locked: { enumerable: true } }), h(de.prototype.abort, "abort"), h(de.prototype.close, "close"), h(de.prototype.getWriter, "getWriter"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(de.prototype, Symbol.toStringTag, { value: "WritableStream", configurable: true });
      function ko(e) {
        return new re(e);
      }
      n2(ko, "AcquireWritableStreamDefaultWriter");
      function Ra(e, t4, r, s2, f3 = 1, c = () => 1) {
        const d2 = Object.create(de.prototype);
        Wo(d2);
        const m2 = Object.create(ke.prototype);
        return Lo(d2, m2, e, t4, r, s2, f3, c), d2;
      }
      n2(Ra, "CreateWritableStream");
      function Wo(e) {
        e._state = "writable", e._storedError = void 0, e._writer = void 0, e._writableStreamController = void 0, e._writeRequests = new D2(), e._inFlightWriteRequest = void 0, e._closeRequest = void 0, e._inFlightCloseRequest = void 0, e._pendingAbortRequest = void 0, e._backpressure = false;
      }
      n2(Wo, "InitializeWritableStream");
      function Ge(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_writableStreamController") ? false : e instanceof de;
      }
      n2(Ge, "IsWritableStream");
      function Ze(e) {
        return e._writer !== void 0;
      }
      n2(Ze, "IsWritableStreamLocked");
      function Zt(e, t4) {
        var r;
        if (e._state === "closed" || e._state === "errored")
          return T2(void 0);
        e._writableStreamController._abortReason = t4, (r = e._writableStreamController._abortController) === null || r === void 0 || r.abort(t4);
        const s2 = e._state;
        if (s2 === "closed" || s2 === "errored")
          return T2(void 0);
        if (e._pendingAbortRequest !== void 0)
          return e._pendingAbortRequest._promise;
        let f3 = false;
        s2 === "erroring" && (f3 = true, t4 = void 0);
        const c = E2((d2, m2) => {
          e._pendingAbortRequest = { _promise: void 0, _resolve: d2, _reject: m2, _reason: t4, _wasAlreadyErroring: f3 };
        });
        return e._pendingAbortRequest._promise = c, f3 || Xr(e, t4), c;
      }
      n2(Zt, "WritableStreamAbort");
      function qo(e) {
        const t4 = e._state;
        if (t4 === "closed" || t4 === "errored")
          return b(new TypeError(`The stream (in ${t4} state) is not in the writable state and cannot be closed`));
        const r = E2((f3, c) => {
          const d2 = { _resolve: f3, _reject: c };
          e._closeRequest = d2;
        }), s2 = e._writer;
        return s2 !== void 0 && e._backpressure && t4 === "writable" && ln(s2), Fa(e._writableStreamController), r;
      }
      n2(qo, "WritableStreamClose");
      function Ta(e) {
        return E2((r, s2) => {
          const f3 = { _resolve: r, _reject: s2 };
          e._writeRequests.push(f3);
        });
      }
      n2(Ta, "WritableStreamAddWriteRequest");
      function Jr(e, t4) {
        if (e._state === "writable") {
          Xr(e, t4);
          return;
        }
        en(e);
      }
      n2(Jr, "WritableStreamDealWithRejection");
      function Xr(e, t4) {
        const r = e._writableStreamController;
        e._state = "erroring", e._storedError = t4;
        const s2 = e._writer;
        s2 !== void 0 && zo(s2, t4), !Aa(e) && r._started && en(e);
      }
      n2(Xr, "WritableStreamStartErroring");
      function en(e) {
        e._state = "errored", e._writableStreamController[Qn]();
        const t4 = e._storedError;
        if (e._writeRequests.forEach((f3) => {
          f3._reject(t4);
        }), e._writeRequests = new D2(), e._pendingAbortRequest === void 0) {
          Kt(e);
          return;
        }
        const r = e._pendingAbortRequest;
        if (e._pendingAbortRequest = void 0, r._wasAlreadyErroring) {
          r._reject(t4), Kt(e);
          return;
        }
        const s2 = e._writableStreamController[Ft](r._reason);
        _(s2, () => (r._resolve(), Kt(e), null), (f3) => (r._reject(f3), Kt(e), null));
      }
      n2(en, "WritableStreamFinishErroring");
      function Ca(e) {
        e._inFlightWriteRequest._resolve(void 0), e._inFlightWriteRequest = void 0;
      }
      n2(Ca, "WritableStreamFinishInFlightWrite");
      function Pa(e, t4) {
        e._inFlightWriteRequest._reject(t4), e._inFlightWriteRequest = void 0, Jr(e, t4);
      }
      n2(Pa, "WritableStreamFinishInFlightWriteWithError");
      function va(e) {
        e._inFlightCloseRequest._resolve(void 0), e._inFlightCloseRequest = void 0, e._state === "erroring" && (e._storedError = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._resolve(), e._pendingAbortRequest = void 0)), e._state = "closed";
        const r = e._writer;
        r !== void 0 && Uo(r);
      }
      n2(va, "WritableStreamFinishInFlightClose");
      function Ea(e, t4) {
        e._inFlightCloseRequest._reject(t4), e._inFlightCloseRequest = void 0, e._pendingAbortRequest !== void 0 && (e._pendingAbortRequest._reject(t4), e._pendingAbortRequest = void 0), Jr(e, t4);
      }
      n2(Ea, "WritableStreamFinishInFlightCloseWithError");
      function he(e) {
        return !(e._closeRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n2(he, "WritableStreamCloseQueuedOrInFlight");
      function Aa(e) {
        return !(e._inFlightWriteRequest === void 0 && e._inFlightCloseRequest === void 0);
      }
      n2(Aa, "WritableStreamHasOperationMarkedInFlight");
      function Ba(e) {
        e._inFlightCloseRequest = e._closeRequest, e._closeRequest = void 0;
      }
      n2(Ba, "WritableStreamMarkCloseRequestInFlight");
      function ka(e) {
        e._inFlightWriteRequest = e._writeRequests.shift();
      }
      n2(ka, "WritableStreamMarkFirstWriteRequestInFlight");
      function Kt(e) {
        e._closeRequest !== void 0 && (e._closeRequest._reject(e._storedError), e._closeRequest = void 0);
        const t4 = e._writer;
        t4 !== void 0 && an(t4, e._storedError);
      }
      n2(Kt, "WritableStreamRejectCloseAndClosedPromiseIfNeeded");
      function tn(e, t4) {
        const r = e._writer;
        r !== void 0 && t4 !== e._backpressure && (t4 ? xa(r) : ln(r)), e._backpressure = t4;
      }
      n2(tn, "WritableStreamUpdateBackpressure");
      const Rn = class Rn {
        constructor(t4) {
          if (Se(t4, 1, "WritableStreamDefaultWriter"), Bo(t4, "First parameter"), Ze(t4))
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          this._ownerWritableStream = t4, t4._writer = this;
          const r = t4._state;
          if (r === "writable")
            !he(t4) && t4._backpressure ? rr(this) : xo(this), tr(this);
          else if (r === "erroring")
            sn(this, t4._storedError), tr(this);
          else if (r === "closed")
            xo(this), Ma(this);
          else {
            const s2 = t4._storedError;
            sn(this, s2), Mo(this, s2);
          }
        }
        get closed() {
          return je(this) ? this._closedPromise : b(Le("closed"));
        }
        get desiredSize() {
          if (!je(this))
            throw Le("desiredSize");
          if (this._ownerWritableStream === void 0)
            throw Rt("desiredSize");
          return za(this);
        }
        get ready() {
          return je(this) ? this._readyPromise : b(Le("ready"));
        }
        abort(t4 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? b(Rt("abort")) : Wa(this, t4) : b(Le("abort"));
        }
        close() {
          if (!je(this))
            return b(Le("close"));
          const t4 = this._ownerWritableStream;
          return t4 === void 0 ? b(Rt("close")) : he(t4) ? b(new TypeError("Cannot close an already-closing stream")) : Oo(this);
        }
        releaseLock() {
          if (!je(this))
            throw Le("releaseLock");
          this._ownerWritableStream !== void 0 && Io(this);
        }
        write(t4 = void 0) {
          return je(this) ? this._ownerWritableStream === void 0 ? b(Rt("write to")) : Fo(this, t4) : b(Le("write"));
        }
      };
      n2(Rn, "WritableStreamDefaultWriter");
      let re = Rn;
      Object.defineProperties(re.prototype, { abort: { enumerable: true }, close: { enumerable: true }, releaseLock: { enumerable: true }, write: { enumerable: true }, closed: { enumerable: true }, desiredSize: { enumerable: true }, ready: { enumerable: true } }), h(re.prototype.abort, "abort"), h(re.prototype.close, "close"), h(re.prototype.releaseLock, "releaseLock"), h(re.prototype.write, "write"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(re.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultWriter", configurable: true });
      function je(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_ownerWritableStream") ? false : e instanceof re;
      }
      n2(je, "IsWritableStreamDefaultWriter");
      function Wa(e, t4) {
        const r = e._ownerWritableStream;
        return Zt(r, t4);
      }
      n2(Wa, "WritableStreamDefaultWriterAbort");
      function Oo(e) {
        const t4 = e._ownerWritableStream;
        return qo(t4);
      }
      n2(Oo, "WritableStreamDefaultWriterClose");
      function qa(e) {
        const t4 = e._ownerWritableStream, r = t4._state;
        return he(t4) || r === "closed" ? T2(void 0) : r === "errored" ? b(t4._storedError) : Oo(e);
      }
      n2(qa, "WritableStreamDefaultWriterCloseWithErrorPropagation");
      function Oa(e, t4) {
        e._closedPromiseState === "pending" ? an(e, t4) : Ua(e, t4);
      }
      n2(Oa, "WritableStreamDefaultWriterEnsureClosedPromiseRejected");
      function zo(e, t4) {
        e._readyPromiseState === "pending" ? No(e, t4) : Na(e, t4);
      }
      n2(zo, "WritableStreamDefaultWriterEnsureReadyPromiseRejected");
      function za(e) {
        const t4 = e._ownerWritableStream, r = t4._state;
        return r === "errored" || r === "erroring" ? null : r === "closed" ? 0 : $o(t4._writableStreamController);
      }
      n2(za, "WritableStreamDefaultWriterGetDesiredSize");
      function Io(e) {
        const t4 = e._ownerWritableStream, r = new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");
        zo(e, r), Oa(e, r), t4._writer = void 0, e._ownerWritableStream = void 0;
      }
      n2(Io, "WritableStreamDefaultWriterRelease");
      function Fo(e, t4) {
        const r = e._ownerWritableStream, s2 = r._writableStreamController, f3 = ja(s2, t4);
        if (r !== e._ownerWritableStream)
          return b(Rt("write to"));
        const c = r._state;
        if (c === "errored")
          return b(r._storedError);
        if (he(r) || c === "closed")
          return b(new TypeError("The stream is closing or closed and cannot be written to"));
        if (c === "erroring")
          return b(r._storedError);
        const d2 = Ta(r);
        return La(s2, t4, f3), d2;
      }
      n2(Fo, "WritableStreamDefaultWriterWrite");
      const jo = {}, Tn = class Tn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get abortReason() {
          if (!rn(this))
            throw on2("abortReason");
          return this._abortReason;
        }
        get signal() {
          if (!rn(this))
            throw on2("signal");
          if (this._abortController === void 0)
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          return this._abortController.signal;
        }
        error(t4 = void 0) {
          if (!rn(this))
            throw on2("error");
          this._controlledWritableStream._state === "writable" && Do(this, t4);
        }
        [Ft](t4) {
          const r = this._abortAlgorithm(t4);
          return Jt(this), r;
        }
        [Qn]() {
          Be(this);
        }
      };
      n2(Tn, "WritableStreamDefaultController");
      let ke = Tn;
      Object.defineProperties(ke.prototype, { abortReason: { enumerable: true }, signal: { enumerable: true }, error: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ke.prototype, Symbol.toStringTag, { value: "WritableStreamDefaultController", configurable: true });
      function rn(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledWritableStream") ? false : e instanceof ke;
      }
      n2(rn, "IsWritableStreamDefaultController");
      function Lo(e, t4, r, s2, f3, c, d2, m2) {
        t4._controlledWritableStream = e, e._writableStreamController = t4, t4._queue = void 0, t4._queueTotalSize = void 0, Be(t4), t4._abortReason = void 0, t4._abortController = wa(), t4._started = false, t4._strategySizeAlgorithm = m2, t4._strategyHWM = d2, t4._writeAlgorithm = s2, t4._closeAlgorithm = f3, t4._abortAlgorithm = c;
        const R3 = nn(t4);
        tn(e, R3);
        const y = r(), C3 = T2(y);
        _(C3, () => (t4._started = true, Xt(t4), null), (P2) => (t4._started = true, Jr(e, P2), null));
      }
      n2(Lo, "SetUpWritableStreamDefaultController");
      function Ia(e, t4, r, s2) {
        const f3 = Object.create(ke.prototype);
        let c, d2, m2, R3;
        t4.start !== void 0 ? c = n2(() => t4.start(f3), "startAlgorithm") : c = n2(() => {
        }, "startAlgorithm"), t4.write !== void 0 ? d2 = n2((y) => t4.write(y, f3), "writeAlgorithm") : d2 = n2(() => T2(void 0), "writeAlgorithm"), t4.close !== void 0 ? m2 = n2(() => t4.close(), "closeAlgorithm") : m2 = n2(() => T2(void 0), "closeAlgorithm"), t4.abort !== void 0 ? R3 = n2((y) => t4.abort(y), "abortAlgorithm") : R3 = n2(() => T2(void 0), "abortAlgorithm"), Lo(e, f3, c, d2, m2, R3, r, s2);
      }
      n2(Ia, "SetUpWritableStreamDefaultControllerFromUnderlyingSink");
      function Jt(e) {
        e._writeAlgorithm = void 0, e._closeAlgorithm = void 0, e._abortAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n2(Jt, "WritableStreamDefaultControllerClearAlgorithms");
      function Fa(e) {
        Nr(e, jo, 0), Xt(e);
      }
      n2(Fa, "WritableStreamDefaultControllerClose");
      function ja(e, t4) {
        try {
          return e._strategySizeAlgorithm(t4);
        } catch (r) {
          return wt(e, r), 1;
        }
      }
      n2(ja, "WritableStreamDefaultControllerGetChunkSize");
      function $o(e) {
        return e._strategyHWM - e._queueTotalSize;
      }
      n2($o, "WritableStreamDefaultControllerGetDesiredSize");
      function La(e, t4, r) {
        try {
          Nr(e, t4, r);
        } catch (f3) {
          wt(e, f3);
          return;
        }
        const s2 = e._controlledWritableStream;
        if (!he(s2) && s2._state === "writable") {
          const f3 = nn(e);
          tn(s2, f3);
        }
        Xt(e);
      }
      n2(La, "WritableStreamDefaultControllerWrite");
      function Xt(e) {
        const t4 = e._controlledWritableStream;
        if (!e._started || t4._inFlightWriteRequest !== void 0)
          return;
        if (t4._state === "erroring") {
          en(t4);
          return;
        }
        if (e._queue.length === 0)
          return;
        const s2 = Ji(e);
        s2 === jo ? $a(e) : Da(e, s2);
      }
      n2(Xt, "WritableStreamDefaultControllerAdvanceQueueIfNeeded");
      function wt(e, t4) {
        e._controlledWritableStream._state === "writable" && Do(e, t4);
      }
      n2(wt, "WritableStreamDefaultControllerErrorIfNeeded");
      function $a(e) {
        const t4 = e._controlledWritableStream;
        Ba(t4), xr(e);
        const r = e._closeAlgorithm();
        Jt(e), _(r, () => (va(t4), null), (s2) => (Ea(t4, s2), null));
      }
      n2($a, "WritableStreamDefaultControllerProcessClose");
      function Da(e, t4) {
        const r = e._controlledWritableStream;
        ka(r);
        const s2 = e._writeAlgorithm(t4);
        _(s2, () => {
          Ca(r);
          const f3 = r._state;
          if (xr(e), !he(r) && f3 === "writable") {
            const c = nn(e);
            tn(r, c);
          }
          return Xt(e), null;
        }, (f3) => (r._state === "writable" && Jt(e), Pa(r, f3), null));
      }
      n2(Da, "WritableStreamDefaultControllerProcessWrite");
      function nn(e) {
        return $o(e) <= 0;
      }
      n2(nn, "WritableStreamDefaultControllerGetBackpressure");
      function Do(e, t4) {
        const r = e._controlledWritableStream;
        Jt(e), Xr(r, t4);
      }
      n2(Do, "WritableStreamDefaultControllerError");
      function er(e) {
        return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`);
      }
      n2(er, "streamBrandCheckException$2");
      function on2(e) {
        return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`);
      }
      n2(on2, "defaultControllerBrandCheckException$2");
      function Le(e) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`);
      }
      n2(Le, "defaultWriterBrandCheckException");
      function Rt(e) {
        return new TypeError("Cannot " + e + " a stream using a released writer");
      }
      n2(Rt, "defaultWriterLockException");
      function tr(e) {
        e._closedPromise = E2((t4, r) => {
          e._closedPromise_resolve = t4, e._closedPromise_reject = r, e._closedPromiseState = "pending";
        });
      }
      n2(tr, "defaultWriterClosedPromiseInitialize");
      function Mo(e, t4) {
        tr(e), an(e, t4);
      }
      n2(Mo, "defaultWriterClosedPromiseInitializeAsRejected");
      function Ma(e) {
        tr(e), Uo(e);
      }
      n2(Ma, "defaultWriterClosedPromiseInitializeAsResolved");
      function an(e, t4) {
        e._closedPromise_reject !== void 0 && (Q(e._closedPromise), e._closedPromise_reject(t4), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "rejected");
      }
      n2(an, "defaultWriterClosedPromiseReject");
      function Ua(e, t4) {
        Mo(e, t4);
      }
      n2(Ua, "defaultWriterClosedPromiseResetToRejected");
      function Uo(e) {
        e._closedPromise_resolve !== void 0 && (e._closedPromise_resolve(void 0), e._closedPromise_resolve = void 0, e._closedPromise_reject = void 0, e._closedPromiseState = "resolved");
      }
      n2(Uo, "defaultWriterClosedPromiseResolve");
      function rr(e) {
        e._readyPromise = E2((t4, r) => {
          e._readyPromise_resolve = t4, e._readyPromise_reject = r;
        }), e._readyPromiseState = "pending";
      }
      n2(rr, "defaultWriterReadyPromiseInitialize");
      function sn(e, t4) {
        rr(e), No(e, t4);
      }
      n2(sn, "defaultWriterReadyPromiseInitializeAsRejected");
      function xo(e) {
        rr(e), ln(e);
      }
      n2(xo, "defaultWriterReadyPromiseInitializeAsResolved");
      function No(e, t4) {
        e._readyPromise_reject !== void 0 && (Q(e._readyPromise), e._readyPromise_reject(t4), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "rejected");
      }
      n2(No, "defaultWriterReadyPromiseReject");
      function xa(e) {
        rr(e);
      }
      n2(xa, "defaultWriterReadyPromiseReset");
      function Na(e, t4) {
        sn(e, t4);
      }
      n2(Na, "defaultWriterReadyPromiseResetToRejected");
      function ln(e) {
        e._readyPromise_resolve !== void 0 && (e._readyPromise_resolve(void 0), e._readyPromise_resolve = void 0, e._readyPromise_reject = void 0, e._readyPromiseState = "fulfilled");
      }
      n2(ln, "defaultWriterReadyPromiseResolve");
      function Ha() {
        if (typeof globalThis < "u")
          return globalThis;
        if (typeof self < "u")
          return self;
        if (typeof n < "u")
          return n;
      }
      n2(Ha, "getGlobals");
      const un = Ha();
      function Va(e) {
        if (!(typeof e == "function" || typeof e == "object") || e.name !== "DOMException")
          return false;
        try {
          return new e(), true;
        } catch {
          return false;
        }
      }
      n2(Va, "isDOMExceptionConstructor");
      function Qa() {
        const e = un == null ? void 0 : un.DOMException;
        return Va(e) ? e : void 0;
      }
      n2(Qa, "getFromGlobal");
      function Ya() {
        const e = n2(function(r, s2) {
          this.message = r || "", this.name = s2 || "Error", Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
        }, "DOMException");
        return h(e, "DOMException"), e.prototype = Object.create(Error.prototype), Object.defineProperty(e.prototype, "constructor", { value: e, writable: true, configurable: true }), e;
      }
      n2(Ya, "createPolyfill");
      const Ga = Qa() || Ya();
      function Ho(e, t4, r, s2, f3, c) {
        const d2 = Qe(e), m2 = ko(t4);
        e._disturbed = true;
        let R3 = false, y = T2(void 0);
        return E2((C3, P2) => {
          let B2;
          if (c !== void 0) {
            if (B2 = n2(() => {
              const S = c.reason !== void 0 ? c.reason : new Ga("Aborted", "AbortError"), v2 = [];
              s2 || v2.push(() => t4._state === "writable" ? Zt(t4, S) : T2(void 0)), f3 || v2.push(() => e._state === "readable" ? ie(e, S) : T2(void 0)), N2(() => Promise.all(v2.map((k2) => k2())), true, S);
            }, "abortAlgorithm"), c.aborted) {
              B2();
              return;
            }
            c.addEventListener("abort", B2);
          }
          function ae() {
            return E2((S, v2) => {
              function k2(Y) {
                Y ? S() : q(nt(), k2, v2);
              }
              n2(k2, "next"), k2(false);
            });
          }
          n2(ae, "pipeLoop");
          function nt() {
            return R3 ? T2(true) : q(m2._readyPromise, () => E2((S, v2) => {
              mt(d2, { _chunkSteps: (k2) => {
                y = q(Fo(m2, k2), void 0, u2), S(false);
              }, _closeSteps: () => S(true), _errorSteps: v2 });
            }));
          }
          if (n2(nt, "pipeStep"), Te(e, d2._closedPromise, (S) => (s2 ? J(true, S) : N2(() => Zt(t4, S), true, S), null)), Te(t4, m2._closedPromise, (S) => (f3 ? J(true, S) : N2(() => ie(e, S), true, S), null)), x2(e, d2._closedPromise, () => (r ? J() : N2(() => qa(m2)), null)), he(t4) || t4._state === "closed") {
            const S = new TypeError("the destination writable stream closed before all data could be piped to it");
            f3 ? J(true, S) : N2(() => ie(e, S), true, S);
          }
          Q(ae());
          function Oe() {
            const S = y;
            return q(y, () => S !== y ? Oe() : void 0);
          }
          n2(Oe, "waitForWritesToFinish");
          function Te(S, v2, k2) {
            S._state === "errored" ? k2(S._storedError) : I2(v2, k2);
          }
          n2(Te, "isOrBecomesErrored");
          function x2(S, v2, k2) {
            S._state === "closed" ? k2() : V(v2, k2);
          }
          n2(x2, "isOrBecomesClosed");
          function N2(S, v2, k2) {
            if (R3)
              return;
            R3 = true, t4._state === "writable" && !he(t4) ? V(Oe(), Y) : Y();
            function Y() {
              return _(S(), () => Ce(v2, k2), (ot) => Ce(true, ot)), null;
            }
            n2(Y, "doTheRest");
          }
          n2(N2, "shutdownWithAction");
          function J(S, v2) {
            R3 || (R3 = true, t4._state === "writable" && !he(t4) ? V(Oe(), () => Ce(S, v2)) : Ce(S, v2));
          }
          n2(J, "shutdown");
          function Ce(S, v2) {
            return Io(m2), _e(d2), c !== void 0 && c.removeEventListener("abort", B2), S ? P2(v2) : C3(void 0), null;
          }
          n2(Ce, "finalize");
        });
      }
      n2(Ho, "ReadableStreamPipeTo");
      const Cn = class Cn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!nr(this))
            throw ir("desiredSize");
          return fn(this);
        }
        close() {
          if (!nr(this))
            throw ir("close");
          if (!Je(this))
            throw new TypeError("The stream is not in a state that permits close");
          $e(this);
        }
        enqueue(t4 = void 0) {
          if (!nr(this))
            throw ir("enqueue");
          if (!Je(this))
            throw new TypeError("The stream is not in a state that permits enqueue");
          return Ke(this, t4);
        }
        error(t4 = void 0) {
          if (!nr(this))
            throw ir("error");
          oe(this, t4);
        }
        [Ar](t4) {
          Be(this);
          const r = this._cancelAlgorithm(t4);
          return or(this), r;
        }
        [Br](t4) {
          const r = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const s2 = xr(this);
            this._closeRequested && this._queue.length === 0 ? (or(this), Pt(r)) : Tt(this), t4._chunkSteps(s2);
          } else
            eo(r, t4), Tt(this);
        }
        [kr]() {
        }
      };
      n2(Cn, "ReadableStreamDefaultController");
      let ne = Cn;
      Object.defineProperties(ne.prototype, { close: { enumerable: true }, enqueue: { enumerable: true }, error: { enumerable: true }, desiredSize: { enumerable: true } }), h(ne.prototype.close, "close"), h(ne.prototype.enqueue, "enqueue"), h(ne.prototype.error, "error"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(ne.prototype, Symbol.toStringTag, { value: "ReadableStreamDefaultController", configurable: true });
      function nr(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledReadableStream") ? false : e instanceof ne;
      }
      n2(nr, "IsReadableStreamDefaultController");
      function Tt(e) {
        if (!Vo(e))
          return;
        if (e._pulling) {
          e._pullAgain = true;
          return;
        }
        e._pulling = true;
        const r = e._pullAlgorithm();
        _(r, () => (e._pulling = false, e._pullAgain && (e._pullAgain = false, Tt(e)), null), (s2) => (oe(e, s2), null));
      }
      n2(Tt, "ReadableStreamDefaultControllerCallPullIfNeeded");
      function Vo(e) {
        const t4 = e._controlledReadableStream;
        return !Je(e) || !e._started ? false : !!(qe(t4) && Lt(t4) > 0 || fn(e) > 0);
      }
      n2(Vo, "ReadableStreamDefaultControllerShouldCallPull");
      function or(e) {
        e._pullAlgorithm = void 0, e._cancelAlgorithm = void 0, e._strategySizeAlgorithm = void 0;
      }
      n2(or, "ReadableStreamDefaultControllerClearAlgorithms");
      function $e(e) {
        if (!Je(e))
          return;
        const t4 = e._controlledReadableStream;
        e._closeRequested = true, e._queue.length === 0 && (or(e), Pt(t4));
      }
      n2($e, "ReadableStreamDefaultControllerClose");
      function Ke(e, t4) {
        if (!Je(e))
          return;
        const r = e._controlledReadableStream;
        if (qe(r) && Lt(r) > 0)
          Lr(r, t4, false);
        else {
          let s2;
          try {
            s2 = e._strategySizeAlgorithm(t4);
          } catch (f3) {
            throw oe(e, f3), f3;
          }
          try {
            Nr(e, t4, s2);
          } catch (f3) {
            throw oe(e, f3), f3;
          }
        }
        Tt(e);
      }
      n2(Ke, "ReadableStreamDefaultControllerEnqueue");
      function oe(e, t4) {
        const r = e._controlledReadableStream;
        r._state === "readable" && (Be(e), or(e), Zo(r, t4));
      }
      n2(oe, "ReadableStreamDefaultControllerError");
      function fn(e) {
        const t4 = e._controlledReadableStream._state;
        return t4 === "errored" ? null : t4 === "closed" ? 0 : e._strategyHWM - e._queueTotalSize;
      }
      n2(fn, "ReadableStreamDefaultControllerGetDesiredSize");
      function Za(e) {
        return !Vo(e);
      }
      n2(Za, "ReadableStreamDefaultControllerHasBackpressure");
      function Je(e) {
        const t4 = e._controlledReadableStream._state;
        return !e._closeRequested && t4 === "readable";
      }
      n2(Je, "ReadableStreamDefaultControllerCanCloseOrEnqueue");
      function Qo(e, t4, r, s2, f3, c, d2) {
        t4._controlledReadableStream = e, t4._queue = void 0, t4._queueTotalSize = void 0, Be(t4), t4._started = false, t4._closeRequested = false, t4._pullAgain = false, t4._pulling = false, t4._strategySizeAlgorithm = d2, t4._strategyHWM = c, t4._pullAlgorithm = s2, t4._cancelAlgorithm = f3, e._readableStreamController = t4;
        const m2 = r();
        _(T2(m2), () => (t4._started = true, Tt(t4), null), (R3) => (oe(t4, R3), null));
      }
      n2(Qo, "SetUpReadableStreamDefaultController");
      function Ka(e, t4, r, s2) {
        const f3 = Object.create(ne.prototype);
        let c, d2, m2;
        t4.start !== void 0 ? c = n2(() => t4.start(f3), "startAlgorithm") : c = n2(() => {
        }, "startAlgorithm"), t4.pull !== void 0 ? d2 = n2(() => t4.pull(f3), "pullAlgorithm") : d2 = n2(() => T2(void 0), "pullAlgorithm"), t4.cancel !== void 0 ? m2 = n2((R3) => t4.cancel(R3), "cancelAlgorithm") : m2 = n2(() => T2(void 0), "cancelAlgorithm"), Qo(e, f3, c, d2, m2, r, s2);
      }
      n2(Ka, "SetUpReadableStreamDefaultControllerFromUnderlyingSource");
      function ir(e) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`);
      }
      n2(ir, "defaultControllerBrandCheckException$1");
      function Ja(e, t4) {
        return ze(e._readableStreamController) ? es(e) : Xa(e);
      }
      n2(Ja, "ReadableStreamTee");
      function Xa(e, t4) {
        const r = Qe(e);
        let s2 = false, f3 = false, c = false, d2 = false, m2, R3, y, C3, P2;
        const B2 = E2((x2) => {
          P2 = x2;
        });
        function ae() {
          return s2 ? (f3 = true, T2(void 0)) : (s2 = true, mt(r, { _chunkSteps: (N2) => {
            ge(() => {
              f3 = false;
              const J = N2, Ce = N2;
              c || Ke(y._readableStreamController, J), d2 || Ke(C3._readableStreamController, Ce), s2 = false, f3 && ae();
            });
          }, _closeSteps: () => {
            s2 = false, c || $e(y._readableStreamController), d2 || $e(C3._readableStreamController), (!c || !d2) && P2(void 0);
          }, _errorSteps: () => {
            s2 = false;
          } }), T2(void 0));
        }
        n2(ae, "pullAlgorithm");
        function nt(x2) {
          if (c = true, m2 = x2, d2) {
            const N2 = yt([m2, R3]), J = ie(e, N2);
            P2(J);
          }
          return B2;
        }
        n2(nt, "cancel1Algorithm");
        function Oe(x2) {
          if (d2 = true, R3 = x2, c) {
            const N2 = yt([m2, R3]), J = ie(e, N2);
            P2(J);
          }
          return B2;
        }
        n2(Oe, "cancel2Algorithm");
        function Te() {
        }
        return n2(Te, "startAlgorithm"), y = Ct(Te, ae, nt), C3 = Ct(Te, ae, Oe), I2(r._closedPromise, (x2) => (oe(y._readableStreamController, x2), oe(C3._readableStreamController, x2), (!c || !d2) && P2(void 0), null)), [y, C3];
      }
      n2(Xa, "ReadableStreamDefaultTee");
      function es(e) {
        let t4 = Qe(e), r = false, s2 = false, f3 = false, c = false, d2 = false, m2, R3, y, C3, P2;
        const B2 = E2((S) => {
          P2 = S;
        });
        function ae(S) {
          I2(S._closedPromise, (v2) => (S !== t4 || (K(y._readableStreamController, v2), K(C3._readableStreamController, v2), (!c || !d2) && P2(void 0)), null));
        }
        n2(ae, "forwardReaderError");
        function nt() {
          Fe(t4) && (_e(t4), t4 = Qe(e), ae(t4)), mt(t4, { _chunkSteps: (v2) => {
            ge(() => {
              s2 = false, f3 = false;
              const k2 = v2;
              let Y = v2;
              if (!c && !d2)
                try {
                  Y = fo(v2);
                } catch (ot) {
                  K(y._readableStreamController, ot), K(C3._readableStreamController, ot), P2(ie(e, ot));
                  return;
                }
              c || Nt(y._readableStreamController, k2), d2 || Nt(C3._readableStreamController, Y), r = false, s2 ? Te() : f3 && x2();
            });
          }, _closeSteps: () => {
            r = false, c || gt(y._readableStreamController), d2 || gt(C3._readableStreamController), y._readableStreamController._pendingPullIntos.length > 0 && Ht(y._readableStreamController, 0), C3._readableStreamController._pendingPullIntos.length > 0 && Ht(C3._readableStreamController, 0), (!c || !d2) && P2(void 0);
          }, _errorSteps: () => {
            r = false;
          } });
        }
        n2(nt, "pullWithDefaultReader");
        function Oe(S, v2) {
          Ee(t4) && (_e(t4), t4 = Co(e), ae(t4));
          const k2 = v2 ? C3 : y, Y = v2 ? y : C3;
          Eo(t4, S, 1, { _chunkSteps: (it) => {
            ge(() => {
              s2 = false, f3 = false;
              const at = v2 ? d2 : c;
              if (v2 ? c : d2)
                at || Vt(k2._readableStreamController, it);
              else {
                let ui;
                try {
                  ui = fo(it);
                } catch (kn) {
                  K(k2._readableStreamController, kn), K(Y._readableStreamController, kn), P2(ie(e, kn));
                  return;
                }
                at || Vt(k2._readableStreamController, it), Nt(Y._readableStreamController, ui);
              }
              r = false, s2 ? Te() : f3 && x2();
            });
          }, _closeSteps: (it) => {
            r = false;
            const at = v2 ? d2 : c, fr = v2 ? c : d2;
            at || gt(k2._readableStreamController), fr || gt(Y._readableStreamController), it !== void 0 && (at || Vt(k2._readableStreamController, it), !fr && Y._readableStreamController._pendingPullIntos.length > 0 && Ht(Y._readableStreamController, 0)), (!at || !fr) && P2(void 0);
          }, _errorSteps: () => {
            r = false;
          } });
        }
        n2(Oe, "pullWithBYOBReader");
        function Te() {
          if (r)
            return s2 = true, T2(void 0);
          r = true;
          const S = Gr(y._readableStreamController);
          return S === null ? nt() : Oe(S._view, false), T2(void 0);
        }
        n2(Te, "pull1Algorithm");
        function x2() {
          if (r)
            return f3 = true, T2(void 0);
          r = true;
          const S = Gr(C3._readableStreamController);
          return S === null ? nt() : Oe(S._view, true), T2(void 0);
        }
        n2(x2, "pull2Algorithm");
        function N2(S) {
          if (c = true, m2 = S, d2) {
            const v2 = yt([m2, R3]), k2 = ie(e, v2);
            P2(k2);
          }
          return B2;
        }
        n2(N2, "cancel1Algorithm");
        function J(S) {
          if (d2 = true, R3 = S, c) {
            const v2 = yt([m2, R3]), k2 = ie(e, v2);
            P2(k2);
          }
          return B2;
        }
        n2(J, "cancel2Algorithm");
        function Ce() {
        }
        return n2(Ce, "startAlgorithm"), y = Go(Ce, Te, N2), C3 = Go(Ce, x2, J), ae(t4), [y, C3];
      }
      n2(es, "ReadableByteStreamTee");
      function ts(e) {
        return l2(e) && typeof e.getReader < "u";
      }
      n2(ts, "isReadableStreamLike");
      function rs(e) {
        return ts(e) ? os22(e.getReader()) : ns(e);
      }
      n2(rs, "ReadableStreamFrom");
      function ns(e) {
        let t4;
        const r = uo(e, "async"), s2 = u2;
        function f3() {
          let d2;
          try {
            d2 = Yi(r);
          } catch (R3) {
            return b(R3);
          }
          const m2 = T2(d2);
          return F3(m2, (R3) => {
            if (!l2(R3))
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            if (Gi(R3))
              $e(t4._readableStreamController);
            else {
              const C3 = Zi(R3);
              Ke(t4._readableStreamController, C3);
            }
          });
        }
        n2(f3, "pullAlgorithm");
        function c(d2) {
          const m2 = r.iterator;
          let R3;
          try {
            R3 = Mt(m2, "return");
          } catch (P2) {
            return b(P2);
          }
          if (R3 === void 0)
            return T2(void 0);
          let y;
          try {
            y = z(R3, m2, [d2]);
          } catch (P2) {
            return b(P2);
          }
          const C3 = T2(y);
          return F3(C3, (P2) => {
            if (!l2(P2))
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
          });
        }
        return n2(c, "cancelAlgorithm"), t4 = Ct(s2, f3, c, 0), t4;
      }
      n2(ns, "ReadableStreamFromIterable");
      function os22(e) {
        let t4;
        const r = u2;
        function s2() {
          let c;
          try {
            c = e.read();
          } catch (d2) {
            return b(d2);
          }
          return F3(c, (d2) => {
            if (!l2(d2))
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            if (d2.done)
              $e(t4._readableStreamController);
            else {
              const m2 = d2.value;
              Ke(t4._readableStreamController, m2);
            }
          });
        }
        n2(s2, "pullAlgorithm");
        function f3(c) {
          try {
            return T2(e.cancel(c));
          } catch (d2) {
            return b(d2);
          }
        }
        return n2(f3, "cancelAlgorithm"), t4 = Ct(r, s2, f3, 0), t4;
      }
      n2(os22, "ReadableStreamFromDefaultReader");
      function is(e, t4) {
        ue(e, t4);
        const r = e, s2 = r == null ? void 0 : r.autoAllocateChunkSize, f3 = r == null ? void 0 : r.cancel, c = r == null ? void 0 : r.pull, d2 = r == null ? void 0 : r.start, m2 = r == null ? void 0 : r.type;
        return { autoAllocateChunkSize: s2 === void 0 ? void 0 : Fr(s2, `${t4} has member 'autoAllocateChunkSize' that`), cancel: f3 === void 0 ? void 0 : as(f3, r, `${t4} has member 'cancel' that`), pull: c === void 0 ? void 0 : ss(c, r, `${t4} has member 'pull' that`), start: d2 === void 0 ? void 0 : ls(d2, r, `${t4} has member 'start' that`), type: m2 === void 0 ? void 0 : us(m2, `${t4} has member 'type' that`) };
      }
      n2(is, "convertUnderlyingDefaultOrByteSource");
      function as(e, t4, r) {
        return Z2(e, r), (s2) => j(e, t4, [s2]);
      }
      n2(as, "convertUnderlyingSourceCancelCallback");
      function ss(e, t4, r) {
        return Z2(e, r), (s2) => j(e, t4, [s2]);
      }
      n2(ss, "convertUnderlyingSourcePullCallback");
      function ls(e, t4, r) {
        return Z2(e, r), (s2) => z(e, t4, [s2]);
      }
      n2(ls, "convertUnderlyingSourceStartCallback");
      function us(e, t4) {
        if (e = `${e}`, e !== "bytes")
          throw new TypeError(`${t4} '${e}' is not a valid enumeration value for ReadableStreamType`);
        return e;
      }
      n2(us, "convertReadableStreamType");
      function fs6(e, t4) {
        return ue(e, t4), { preventCancel: !!(e == null ? void 0 : e.preventCancel) };
      }
      n2(fs6, "convertIteratorOptions");
      function Yo(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.preventAbort, s2 = e == null ? void 0 : e.preventCancel, f3 = e == null ? void 0 : e.preventClose, c = e == null ? void 0 : e.signal;
        return c !== void 0 && cs(c, `${t4} has member 'signal' that`), { preventAbort: !!r, preventCancel: !!s2, preventClose: !!f3, signal: c };
      }
      n2(Yo, "convertPipeOptions");
      function cs(e, t4) {
        if (!_a2(e))
          throw new TypeError(`${t4} is not an AbortSignal.`);
      }
      n2(cs, "assertAbortSignal");
      function ds(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.readable;
        zr(r, "readable", "ReadableWritablePair"), jr(r, `${t4} has member 'readable' that`);
        const s2 = e == null ? void 0 : e.writable;
        return zr(s2, "writable", "ReadableWritablePair"), Bo(s2, `${t4} has member 'writable' that`), { readable: r, writable: s2 };
      }
      n2(ds, "convertReadableWritablePair");
      const Pn = class Pn {
        constructor(t4 = {}, r = {}) {
          t4 === void 0 ? t4 = null : Jn(t4, "First parameter");
          const s2 = Gt(r, "Second parameter"), f3 = is(t4, "First parameter");
          if (cn(this), f3.type === "bytes") {
            if (s2.size !== void 0)
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            const c = St(s2, 0);
            aa(this, f3, c);
          } else {
            const c = Yt(s2), d2 = St(s2, 1);
            Ka(this, f3, d2, c);
          }
        }
        get locked() {
          if (!We(this))
            throw De("locked");
          return qe(this);
        }
        cancel(t4 = void 0) {
          return We(this) ? qe(this) ? b(new TypeError("Cannot cancel a stream that already has a reader")) : ie(this, t4) : b(De("cancel"));
        }
        getReader(t4 = void 0) {
          if (!We(this))
            throw De("getReader");
          return la(t4, "First parameter").mode === void 0 ? Qe(this) : Co(this);
        }
        pipeThrough(t4, r = {}) {
          if (!We(this))
            throw De("pipeThrough");
          Se(t4, 1, "pipeThrough");
          const s2 = ds(t4, "First parameter"), f3 = Yo(r, "Second parameter");
          if (qe(this))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          if (Ze(s2.writable))
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          const c = Ho(this, s2.writable, f3.preventClose, f3.preventAbort, f3.preventCancel, f3.signal);
          return Q(c), s2.readable;
        }
        pipeTo(t4, r = {}) {
          if (!We(this))
            return b(De("pipeTo"));
          if (t4 === void 0)
            return b("Parameter 1 is required in 'pipeTo'.");
          if (!Ge(t4))
            return b(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));
          let s2;
          try {
            s2 = Yo(r, "Second parameter");
          } catch (f3) {
            return b(f3);
          }
          return qe(this) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")) : Ze(t4) ? b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")) : Ho(this, t4, s2.preventClose, s2.preventAbort, s2.preventCancel, s2.signal);
        }
        tee() {
          if (!We(this))
            throw De("tee");
          const t4 = Ja(this);
          return yt(t4);
        }
        values(t4 = void 0) {
          if (!We(this))
            throw De("values");
          const r = fs6(t4, "First parameter");
          return Vi(this, r.preventCancel);
        }
        [Ur](t4) {
          return this.values(t4);
        }
        static from(t4) {
          return rs(t4);
        }
      };
      n2(Pn, "ReadableStream");
      let L = Pn;
      Object.defineProperties(L, { from: { enumerable: true } }), Object.defineProperties(L.prototype, { cancel: { enumerable: true }, getReader: { enumerable: true }, pipeThrough: { enumerable: true }, pipeTo: { enumerable: true }, tee: { enumerable: true }, values: { enumerable: true }, locked: { enumerable: true } }), h(L.from, "from"), h(L.prototype.cancel, "cancel"), h(L.prototype.getReader, "getReader"), h(L.prototype.pipeThrough, "pipeThrough"), h(L.prototype.pipeTo, "pipeTo"), h(L.prototype.tee, "tee"), h(L.prototype.values, "values"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(L.prototype, Symbol.toStringTag, { value: "ReadableStream", configurable: true }), Object.defineProperty(L.prototype, Ur, { value: L.prototype.values, writable: true, configurable: true });
      function Ct(e, t4, r, s2 = 1, f3 = () => 1) {
        const c = Object.create(L.prototype);
        cn(c);
        const d2 = Object.create(ne.prototype);
        return Qo(c, d2, e, t4, r, s2, f3), c;
      }
      n2(Ct, "CreateReadableStream");
      function Go(e, t4, r) {
        const s2 = Object.create(L.prototype);
        cn(s2);
        const f3 = Object.create(te.prototype);
        return To(s2, f3, e, t4, r, 0, void 0), s2;
      }
      n2(Go, "CreateReadableByteStream");
      function cn(e) {
        e._state = "readable", e._reader = void 0, e._storedError = void 0, e._disturbed = false;
      }
      n2(cn, "InitializeReadableStream");
      function We(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_readableStreamController") ? false : e instanceof L;
      }
      n2(We, "IsReadableStream");
      function qe(e) {
        return e._reader !== void 0;
      }
      n2(qe, "IsReadableStreamLocked");
      function ie(e, t4) {
        if (e._disturbed = true, e._state === "closed")
          return T2(void 0);
        if (e._state === "errored")
          return b(e._storedError);
        Pt(e);
        const r = e._reader;
        if (r !== void 0 && Fe(r)) {
          const f3 = r._readIntoRequests;
          r._readIntoRequests = new D2(), f3.forEach((c) => {
            c._closeSteps(void 0);
          });
        }
        const s2 = e._readableStreamController[Ar](t4);
        return F3(s2, u2);
      }
      n2(ie, "ReadableStreamCancel");
      function Pt(e) {
        e._state = "closed";
        const t4 = e._reader;
        if (t4 !== void 0 && (Zn(t4), Ee(t4))) {
          const r = t4._readRequests;
          t4._readRequests = new D2(), r.forEach((s2) => {
            s2._closeSteps();
          });
        }
      }
      n2(Pt, "ReadableStreamClose");
      function Zo(e, t4) {
        e._state = "errored", e._storedError = t4;
        const r = e._reader;
        r !== void 0 && (Or(r, t4), Ee(r) ? ro(r, t4) : Ao(r, t4));
      }
      n2(Zo, "ReadableStreamError");
      function De(e) {
        return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`);
      }
      n2(De, "streamBrandCheckException$1");
      function Ko(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.highWaterMark;
        return zr(r, "highWaterMark", "QueuingStrategyInit"), { highWaterMark: Ir(r) };
      }
      n2(Ko, "convertQueuingStrategyInit");
      const Jo = n2((e) => e.byteLength, "byteLengthSizeFunction");
      h(Jo, "size");
      const vn = class vn {
        constructor(t4) {
          Se(t4, 1, "ByteLengthQueuingStrategy"), t4 = Ko(t4, "First parameter"), this._byteLengthQueuingStrategyHighWaterMark = t4.highWaterMark;
        }
        get highWaterMark() {
          if (!ei(this))
            throw Xo("highWaterMark");
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!ei(this))
            throw Xo("size");
          return Jo;
        }
      };
      n2(vn, "ByteLengthQueuingStrategy");
      let Xe = vn;
      Object.defineProperties(Xe.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Xe.prototype, Symbol.toStringTag, { value: "ByteLengthQueuingStrategy", configurable: true });
      function Xo(e) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`);
      }
      n2(Xo, "byteLengthBrandCheckException");
      function ei(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_byteLengthQueuingStrategyHighWaterMark") ? false : e instanceof Xe;
      }
      n2(ei, "IsByteLengthQueuingStrategy");
      const ti = n2(() => 1, "countSizeFunction");
      h(ti, "size");
      const En = class En {
        constructor(t4) {
          Se(t4, 1, "CountQueuingStrategy"), t4 = Ko(t4, "First parameter"), this._countQueuingStrategyHighWaterMark = t4.highWaterMark;
        }
        get highWaterMark() {
          if (!ni(this))
            throw ri("highWaterMark");
          return this._countQueuingStrategyHighWaterMark;
        }
        get size() {
          if (!ni(this))
            throw ri("size");
          return ti;
        }
      };
      n2(En, "CountQueuingStrategy");
      let et = En;
      Object.defineProperties(et.prototype, { highWaterMark: { enumerable: true }, size: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(et.prototype, Symbol.toStringTag, { value: "CountQueuingStrategy", configurable: true });
      function ri(e) {
        return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`);
      }
      n2(ri, "countBrandCheckException");
      function ni(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_countQueuingStrategyHighWaterMark") ? false : e instanceof et;
      }
      n2(ni, "IsCountQueuingStrategy");
      function hs(e, t4) {
        ue(e, t4);
        const r = e == null ? void 0 : e.cancel, s2 = e == null ? void 0 : e.flush, f3 = e == null ? void 0 : e.readableType, c = e == null ? void 0 : e.start, d2 = e == null ? void 0 : e.transform, m2 = e == null ? void 0 : e.writableType;
        return { cancel: r === void 0 ? void 0 : ys(r, e, `${t4} has member 'cancel' that`), flush: s2 === void 0 ? void 0 : ps(s2, e, `${t4} has member 'flush' that`), readableType: f3, start: c === void 0 ? void 0 : bs(c, e, `${t4} has member 'start' that`), transform: d2 === void 0 ? void 0 : ms(d2, e, `${t4} has member 'transform' that`), writableType: m2 };
      }
      n2(hs, "convertTransformer");
      function ps(e, t4, r) {
        return Z2(e, r), (s2) => j(e, t4, [s2]);
      }
      n2(ps, "convertTransformerFlushCallback");
      function bs(e, t4, r) {
        return Z2(e, r), (s2) => z(e, t4, [s2]);
      }
      n2(bs, "convertTransformerStartCallback");
      function ms(e, t4, r) {
        return Z2(e, r), (s2, f3) => j(e, t4, [s2, f3]);
      }
      n2(ms, "convertTransformerTransformCallback");
      function ys(e, t4, r) {
        return Z2(e, r), (s2) => j(e, t4, [s2]);
      }
      n2(ys, "convertTransformerCancelCallback");
      const An = class An {
        constructor(t4 = {}, r = {}, s2 = {}) {
          t4 === void 0 && (t4 = null);
          const f3 = Gt(r, "Second parameter"), c = Gt(s2, "Third parameter"), d2 = hs(t4, "First parameter");
          if (d2.readableType !== void 0)
            throw new RangeError("Invalid readableType specified");
          if (d2.writableType !== void 0)
            throw new RangeError("Invalid writableType specified");
          const m2 = St(c, 0), R3 = Yt(c), y = St(f3, 1), C3 = Yt(f3);
          let P2;
          const B2 = E2((ae) => {
            P2 = ae;
          });
          gs(this, B2, y, C3, m2, R3), Ss(this, d2), d2.start !== void 0 ? P2(d2.start(this._transformStreamController)) : P2(void 0);
        }
        get readable() {
          if (!oi(this))
            throw li("readable");
          return this._readable;
        }
        get writable() {
          if (!oi(this))
            throw li("writable");
          return this._writable;
        }
      };
      n2(An, "TransformStream");
      let tt = An;
      Object.defineProperties(tt.prototype, { readable: { enumerable: true }, writable: { enumerable: true } }), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(tt.prototype, Symbol.toStringTag, { value: "TransformStream", configurable: true });
      function gs(e, t4, r, s2, f3, c) {
        function d2() {
          return t4;
        }
        n2(d2, "startAlgorithm");
        function m2(B2) {
          return Ts(e, B2);
        }
        n2(m2, "writeAlgorithm");
        function R3(B2) {
          return Cs(e, B2);
        }
        n2(R3, "abortAlgorithm");
        function y() {
          return Ps(e);
        }
        n2(y, "closeAlgorithm"), e._writable = Ra(d2, m2, y, R3, r, s2);
        function C3() {
          return vs(e);
        }
        n2(C3, "pullAlgorithm");
        function P2(B2) {
          return Es(e, B2);
        }
        n2(P2, "cancelAlgorithm"), e._readable = Ct(d2, C3, P2, f3, c), e._backpressure = void 0, e._backpressureChangePromise = void 0, e._backpressureChangePromise_resolve = void 0, ar(e, true), e._transformStreamController = void 0;
      }
      n2(gs, "InitializeTransformStream");
      function oi(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_transformStreamController") ? false : e instanceof tt;
      }
      n2(oi, "IsTransformStream");
      function ii(e, t4) {
        oe(e._readable._readableStreamController, t4), dn(e, t4);
      }
      n2(ii, "TransformStreamError");
      function dn(e, t4) {
        lr(e._transformStreamController), wt(e._writable._writableStreamController, t4), hn(e);
      }
      n2(dn, "TransformStreamErrorWritableAndUnblockWrite");
      function hn(e) {
        e._backpressure && ar(e, false);
      }
      n2(hn, "TransformStreamUnblockWrite");
      function ar(e, t4) {
        e._backpressureChangePromise !== void 0 && e._backpressureChangePromise_resolve(), e._backpressureChangePromise = E2((r) => {
          e._backpressureChangePromise_resolve = r;
        }), e._backpressure = t4;
      }
      n2(ar, "TransformStreamSetBackpressure");
      const Bn = class Bn {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        get desiredSize() {
          if (!sr(this))
            throw ur("desiredSize");
          const t4 = this._controlledTransformStream._readable._readableStreamController;
          return fn(t4);
        }
        enqueue(t4 = void 0) {
          if (!sr(this))
            throw ur("enqueue");
          ai(this, t4);
        }
        error(t4 = void 0) {
          if (!sr(this))
            throw ur("error");
          ws(this, t4);
        }
        terminate() {
          if (!sr(this))
            throw ur("terminate");
          Rs(this);
        }
      };
      n2(Bn, "TransformStreamDefaultController");
      let pe = Bn;
      Object.defineProperties(pe.prototype, { enqueue: { enumerable: true }, error: { enumerable: true }, terminate: { enumerable: true }, desiredSize: { enumerable: true } }), h(pe.prototype.enqueue, "enqueue"), h(pe.prototype.error, "error"), h(pe.prototype.terminate, "terminate"), typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pe.prototype, Symbol.toStringTag, { value: "TransformStreamDefaultController", configurable: true });
      function sr(e) {
        return !l2(e) || !Object.prototype.hasOwnProperty.call(e, "_controlledTransformStream") ? false : e instanceof pe;
      }
      n2(sr, "IsTransformStreamDefaultController");
      function _s(e, t4, r, s2, f3) {
        t4._controlledTransformStream = e, e._transformStreamController = t4, t4._transformAlgorithm = r, t4._flushAlgorithm = s2, t4._cancelAlgorithm = f3, t4._finishPromise = void 0, t4._finishPromise_resolve = void 0, t4._finishPromise_reject = void 0;
      }
      n2(_s, "SetUpTransformStreamDefaultController");
      function Ss(e, t4) {
        const r = Object.create(pe.prototype);
        let s2, f3, c;
        t4.transform !== void 0 ? s2 = n2((d2) => t4.transform(d2, r), "transformAlgorithm") : s2 = n2((d2) => {
          try {
            return ai(r, d2), T2(void 0);
          } catch (m2) {
            return b(m2);
          }
        }, "transformAlgorithm"), t4.flush !== void 0 ? f3 = n2(() => t4.flush(r), "flushAlgorithm") : f3 = n2(() => T2(void 0), "flushAlgorithm"), t4.cancel !== void 0 ? c = n2((d2) => t4.cancel(d2), "cancelAlgorithm") : c = n2(() => T2(void 0), "cancelAlgorithm"), _s(e, r, s2, f3, c);
      }
      n2(Ss, "SetUpTransformStreamDefaultControllerFromTransformer");
      function lr(e) {
        e._transformAlgorithm = void 0, e._flushAlgorithm = void 0, e._cancelAlgorithm = void 0;
      }
      n2(lr, "TransformStreamDefaultControllerClearAlgorithms");
      function ai(e, t4) {
        const r = e._controlledTransformStream, s2 = r._readable._readableStreamController;
        if (!Je(s2))
          throw new TypeError("Readable side is not in a state that permits enqueue");
        try {
          Ke(s2, t4);
        } catch (c) {
          throw dn(r, c), r._readable._storedError;
        }
        Za(s2) !== r._backpressure && ar(r, true);
      }
      n2(ai, "TransformStreamDefaultControllerEnqueue");
      function ws(e, t4) {
        ii(e._controlledTransformStream, t4);
      }
      n2(ws, "TransformStreamDefaultControllerError");
      function si(e, t4) {
        const r = e._transformAlgorithm(t4);
        return F3(r, void 0, (s2) => {
          throw ii(e._controlledTransformStream, s2), s2;
        });
      }
      n2(si, "TransformStreamDefaultControllerPerformTransform");
      function Rs(e) {
        const t4 = e._controlledTransformStream, r = t4._readable._readableStreamController;
        $e(r);
        const s2 = new TypeError("TransformStream terminated");
        dn(t4, s2);
      }
      n2(Rs, "TransformStreamDefaultControllerTerminate");
      function Ts(e, t4) {
        const r = e._transformStreamController;
        if (e._backpressure) {
          const s2 = e._backpressureChangePromise;
          return F3(s2, () => {
            const f3 = e._writable;
            if (f3._state === "erroring")
              throw f3._storedError;
            return si(r, t4);
          });
        }
        return si(r, t4);
      }
      n2(Ts, "TransformStreamDefaultSinkWriteAlgorithm");
      function Cs(e, t4) {
        const r = e._transformStreamController;
        if (r._finishPromise !== void 0)
          return r._finishPromise;
        const s2 = e._readable;
        r._finishPromise = E2((c, d2) => {
          r._finishPromise_resolve = c, r._finishPromise_reject = d2;
        });
        const f3 = r._cancelAlgorithm(t4);
        return lr(r), _(f3, () => (s2._state === "errored" ? rt(r, s2._storedError) : (oe(s2._readableStreamController, t4), pn(r)), null), (c) => (oe(s2._readableStreamController, c), rt(r, c), null)), r._finishPromise;
      }
      n2(Cs, "TransformStreamDefaultSinkAbortAlgorithm");
      function Ps(e) {
        const t4 = e._transformStreamController;
        if (t4._finishPromise !== void 0)
          return t4._finishPromise;
        const r = e._readable;
        t4._finishPromise = E2((f3, c) => {
          t4._finishPromise_resolve = f3, t4._finishPromise_reject = c;
        });
        const s2 = t4._flushAlgorithm();
        return lr(t4), _(s2, () => (r._state === "errored" ? rt(t4, r._storedError) : ($e(r._readableStreamController), pn(t4)), null), (f3) => (oe(r._readableStreamController, f3), rt(t4, f3), null)), t4._finishPromise;
      }
      n2(Ps, "TransformStreamDefaultSinkCloseAlgorithm");
      function vs(e) {
        return ar(e, false), e._backpressureChangePromise;
      }
      n2(vs, "TransformStreamDefaultSourcePullAlgorithm");
      function Es(e, t4) {
        const r = e._transformStreamController;
        if (r._finishPromise !== void 0)
          return r._finishPromise;
        const s2 = e._writable;
        r._finishPromise = E2((c, d2) => {
          r._finishPromise_resolve = c, r._finishPromise_reject = d2;
        });
        const f3 = r._cancelAlgorithm(t4);
        return lr(r), _(f3, () => (s2._state === "errored" ? rt(r, s2._storedError) : (wt(s2._writableStreamController, t4), hn(e), pn(r)), null), (c) => (wt(s2._writableStreamController, c), hn(e), rt(r, c), null)), r._finishPromise;
      }
      n2(Es, "TransformStreamDefaultSourceCancelAlgorithm");
      function ur(e) {
        return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`);
      }
      n2(ur, "defaultControllerBrandCheckException");
      function pn(e) {
        e._finishPromise_resolve !== void 0 && (e._finishPromise_resolve(), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
      }
      n2(pn, "defaultControllerFinishPromiseResolve");
      function rt(e, t4) {
        e._finishPromise_reject !== void 0 && (Q(e._finishPromise), e._finishPromise_reject(t4), e._finishPromise_resolve = void 0, e._finishPromise_reject = void 0);
      }
      n2(rt, "defaultControllerFinishPromiseReject");
      function li(e) {
        return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`);
      }
      n2(li, "streamBrandCheckException"), a2.ByteLengthQueuingStrategy = Xe, a2.CountQueuingStrategy = et, a2.ReadableByteStreamController = te, a2.ReadableStream = L, a2.ReadableStreamBYOBReader = ce, a2.ReadableStreamBYOBRequest = Re, a2.ReadableStreamDefaultController = ne, a2.ReadableStreamDefaultReader = fe, a2.TransformStream = tt, a2.TransformStreamDefaultController = pe, a2.WritableStream = de, a2.WritableStreamDefaultController = ke, a2.WritableStreamDefaultWriter = re;
    });
  }(pr, pr.exports)), pr.exports;
}
async function* qn(i, o3 = true) {
  for (const a2 of i)
    if ("stream" in a2)
      yield* a2.stream();
    else if (ArrayBuffer.isView(a2))
      if (o3) {
        let u2 = a2.byteOffset;
        const l2 = a2.byteOffset + a2.byteLength;
        for (; u2 !== l2; ) {
          const p = Math.min(l2 - u2, hi), h = a2.buffer.slice(u2, u2 + p);
          u2 += h.byteLength, yield new Uint8Array(h);
        }
      } else
        yield a2;
    else {
      let u2 = 0, l2 = a2;
      for (; u2 !== l2.size; ) {
        const h = await l2.slice(u2, Math.min(l2.size, u2 + hi)).arrayBuffer();
        u2 += h.byteLength, yield new Uint8Array(h);
      }
    }
}
function Vs(i, o3 = ut) {
  var a2 = `${bi()}${bi()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), u2 = [], l2 = `--${a2}\r
Content-Disposition: form-data; name="`;
  return i.forEach((p, h) => typeof p == "string" ? u2.push(l2 + zn(h) + `"\r
\r
${p.replace(/\r(?!\n)|(?<!\r)\n/g, `\r
`)}\r
`) : u2.push(l2 + zn(h) + `"; filename="${zn(p.name, 1)}"\r
Content-Type: ${p.type || "application/octet-stream"}\r
\r
`, p, `\r
`)), u2.push(`--${a2}--`), new o3(u2, { type: "multipart/form-data; boundary=" + a2 });
}
async function In(i) {
  if (i[H].disturbed)
    throw new TypeError(`body used already for: ${i.url}`);
  if (i[H].disturbed = true, i[H].error)
    throw i[H].error;
  const { body: o3 } = i;
  if (o3 === null)
    return M2.alloc(0);
  if (!(o3 instanceof me))
    return M2.alloc(0);
  const a2 = [];
  let u2 = 0;
  try {
    for await (const l2 of o3) {
      if (i.size > 0 && u2 + l2.length > i.size) {
        const p = new G(`content size at ${i.url} over limit: ${i.size}`, "max-size");
        throw o3.destroy(p), p;
      }
      u2 += l2.length, a2.push(l2);
    }
  } catch (l2) {
    throw l2 instanceof ft ? l2 : new G(`Invalid response body while trying to fetch ${i.url}: ${l2.message}`, "system", l2);
  }
  if (o3.readableEnded === true || o3._readableState.ended === true)
    try {
      return a2.every((l2) => typeof l2 == "string") ? M2.from(a2.join("")) : M2.concat(a2, u2);
    } catch (l2) {
      throw new G(`Could not create Buffer from response body for ${i.url}: ${l2.message}`, "system", l2);
    }
  else
    throw new G(`Premature close of server response while trying to fetch ${i.url}`);
}
function el(i = []) {
  return new ye(i.reduce((o3, a2, u2, l2) => (u2 % 2 === 0 && o3.push(l2.slice(u2, u2 + 2)), o3), []).filter(([o3, a2]) => {
    try {
      return gr(o3), jn(o3, String(a2)), true;
    } catch {
      return false;
    }
  }));
}
function _i(i, o3 = false) {
  return i == null || (i = new URL(i), /^(about|blob|data):$/.test(i.protocol)) ? "no-referrer" : (i.username = "", i.password = "", i.hash = "", o3 && (i.pathname = "", i.search = ""), i);
}
function ol(i) {
  if (!Si.has(i))
    throw new TypeError(`Invalid referrerPolicy: ${i}`);
  return i;
}
function il(i) {
  if (/^(http|ws)s:$/.test(i.protocol))
    return true;
  const o3 = i.host.replace(/(^\[)|(]$)/g, ""), a2 = Os(o3);
  return a2 === 4 && /^127\./.test(o3) || a2 === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o3) ? true : i.host === "localhost" || i.host.endsWith(".localhost") ? false : i.protocol === "file:";
}
function ct(i) {
  return /^about:(blank|srcdoc)$/.test(i) || i.protocol === "data:" || /^(blob|filesystem):$/.test(i.protocol) ? true : il(i);
}
function al(i, { referrerURLCallback: o3, referrerOriginCallback: a2 } = {}) {
  if (i.referrer === "no-referrer" || i.referrerPolicy === "")
    return null;
  const u2 = i.referrerPolicy;
  if (i.referrer === "about:client")
    return "no-referrer";
  const l2 = i.referrer;
  let p = _i(l2), h = _i(l2, true);
  p.toString().length > 4096 && (p = h), o3 && (p = o3(p)), a2 && (h = a2(h));
  const g3 = new URL(i.url);
  switch (u2) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return h;
    case "unsafe-url":
      return p;
    case "strict-origin":
      return ct(p) && !ct(g3) ? "no-referrer" : h.toString();
    case "strict-origin-when-cross-origin":
      return p.origin === g3.origin ? p : ct(p) && !ct(g3) ? "no-referrer" : h;
    case "same-origin":
      return p.origin === g3.origin ? p : "no-referrer";
    case "origin-when-cross-origin":
      return p.origin === g3.origin ? p : h;
    case "no-referrer-when-downgrade":
      return ct(p) && !ct(g3) ? "no-referrer" : p;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${u2}`);
  }
}
function sl(i) {
  const o3 = (i.get("referrer-policy") || "").split(/[,\s]+/);
  let a2 = "";
  for (const u2 of o3)
    u2 && Si.has(u2) && (a2 = u2);
  return a2;
}
async function Ti(i, o3) {
  return new Promise((a2, u2) => {
    const l2 = new dt(i, o3), { parsedURL: p, options: h } = ul(l2);
    if (!ml.has(p.protocol))
      throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${p.protocol.replace(/:$/, "")}" is not supported.`);
    if (p.protocol === "data:") {
      const _ = js(l2.url), V = new le(_, { headers: { "Content-Type": _.typeFull } });
      a2(V);
      return;
    }
    const g3 = (p.protocol === "https:" ? Bs : vt).request, { signal: A2 } = l2;
    let w2 = null;
    const E2 = n2(() => {
      const _ = new _r("The operation was aborted.");
      u2(_), l2.body && l2.body instanceof me.Readable && l2.body.destroy(_), !(!w2 || !w2.body) && w2.body.emit("error", _);
    }, "abort");
    if (A2 && A2.aborted) {
      E2();
      return;
    }
    const T2 = n2(() => {
      E2(), q();
    }, "abortAndFinalize"), b = g3(p.toString(), h);
    A2 && A2.addEventListener("abort", T2);
    const q = n2(() => {
      b.abort(), A2 && A2.removeEventListener("abort", T2);
    }, "finalize");
    b.on("error", (_) => {
      u2(new G(`request to ${l2.url} failed, reason: ${_.message}`, "system", _)), q();
    }), yl(b, (_) => {
      w2 && w2.body && w2.body.destroy(_);
    }), process.version < "v14" && b.on("socket", (_) => {
      let V;
      _.prependListener("end", () => {
        V = _._eventsCount;
      }), _.prependListener("close", (I2) => {
        if (w2 && V < _._eventsCount && !I2) {
          const F3 = new Error("Premature close");
          F3.code = "ERR_STREAM_PREMATURE_CLOSE", w2.body.emit("error", F3);
        }
      });
    }), b.on("response", (_) => {
      b.setTimeout(0);
      const V = el(_.rawHeaders);
      if (Ln(_.statusCode)) {
        const z = V.get("Location");
        let j = null;
        try {
          j = z === null ? null : new URL(z, l2.url);
        } catch {
          if (l2.redirect !== "manual") {
            u2(new G(`uri requested responds with an invalid redirect URL: ${z}`, "invalid-redirect")), q();
            return;
          }
        }
        switch (l2.redirect) {
          case "error":
            u2(new G(`uri requested responds with a redirect, redirect mode is set to error: ${l2.url}`, "no-redirect")), q();
            return;
          case "manual":
            break;
          case "follow": {
            if (j === null)
              break;
            if (l2.counter >= l2.follow) {
              u2(new G(`maximum redirect reached at: ${l2.url}`, "max-redirect")), q();
              return;
            }
            const U = { headers: new ye(l2.headers), follow: l2.follow, counter: l2.counter + 1, agent: l2.agent, compress: l2.compress, method: l2.method, body: Fn(l2), signal: l2.signal, size: l2.size, referrer: l2.referrer, referrerPolicy: l2.referrerPolicy };
            if (!Ys(l2.url, j) || !Gs(l2.url, j))
              for (const Ft of ["authorization", "www-authenticate", "cookie", "cookie2"])
                U.headers.delete(Ft);
            if (_.statusCode !== 303 && l2.body && o3.body instanceof me.Readable) {
              u2(new G("Cannot follow redirect with body being a readable stream", "unsupported-redirect")), q();
              return;
            }
            (_.statusCode === 303 || (_.statusCode === 301 || _.statusCode === 302) && l2.method === "POST") && (U.method = "GET", U.body = void 0, U.headers.delete("content-length"));
            const D2 = sl(V);
            D2 && (U.referrerPolicy = D2), a2(Ti(new dt(j, U))), q();
            return;
          }
          default:
            return u2(new TypeError(`Redirect option '${l2.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      A2 && _.once("end", () => {
        A2.removeEventListener("abort", T2);
      });
      let I2 = lt(_, new cr(), (z) => {
        z && u2(z);
      });
      process.version < "v12.10" && _.on("aborted", T2);
      const F3 = { url: l2.url, status: _.statusCode, statusText: _.statusMessage, headers: V, size: l2.size, counter: l2.counter, highWaterMark: l2.highWaterMark }, Q = V.get("Content-Encoding");
      if (!l2.compress || l2.method === "HEAD" || Q === null || _.statusCode === 204 || _.statusCode === 304) {
        w2 = new le(I2, F3), a2(w2);
        return;
      }
      const ge = { flush: st.Z_SYNC_FLUSH, finishFlush: st.Z_SYNC_FLUSH };
      if (Q === "gzip" || Q === "x-gzip") {
        I2 = lt(I2, st.createGunzip(ge), (z) => {
          z && u2(z);
        }), w2 = new le(I2, F3), a2(w2);
        return;
      }
      if (Q === "deflate" || Q === "x-deflate") {
        const z = lt(_, new cr(), (j) => {
          j && u2(j);
        });
        z.once("data", (j) => {
          (j[0] & 15) === 8 ? I2 = lt(I2, st.createInflate(), (U) => {
            U && u2(U);
          }) : I2 = lt(I2, st.createInflateRaw(), (U) => {
            U && u2(U);
          }), w2 = new le(I2, F3), a2(w2);
        }), z.once("end", () => {
          w2 || (w2 = new le(I2, F3), a2(w2));
        });
        return;
      }
      if (Q === "br") {
        I2 = lt(I2, st.createBrotliDecompress(), (z) => {
          z && u2(z);
        }), w2 = new le(I2, F3), a2(w2);
        return;
      }
      w2 = new le(I2, F3), a2(w2);
    }), Xs(b, l2).catch(u2);
  });
}
function yl(i, o3) {
  const a2 = M2.from(`0\r
\r
`);
  let u2 = false, l2 = false, p;
  i.on("response", (h) => {
    const { headers: g3 } = h;
    u2 = g3["transfer-encoding"] === "chunked" && !g3["content-length"];
  }), i.on("socket", (h) => {
    const g3 = n2(() => {
      if (u2 && !l2) {
        const w2 = new Error("Premature close");
        w2.code = "ERR_STREAM_PREMATURE_CLOSE", o3(w2);
      }
    }, "onSocketClose"), A2 = n2((w2) => {
      l2 = M2.compare(w2.slice(-5), a2) === 0, !l2 && p && (l2 = M2.compare(p.slice(-3), a2.slice(0, 3)) === 0 && M2.compare(w2.slice(-2), a2.slice(3)) === 0), p = w2;
    }, "onData");
    h.prependListener("close", g3), h.on("data", A2), i.on("close", () => {
      h.removeListener("close", g3), h.removeListener("data", A2);
    });
  });
}
function W(i) {
  const o3 = Ci.get(i);
  return console.assert(o3 != null, "'this' is expected an Event object, but got", i), o3;
}
function Pi(i) {
  if (i.passiveListener != null) {
    typeof console < "u" && typeof console.error == "function" && console.error("Unable to preventDefault inside passive event listener invocation.", i.passiveListener);
    return;
  }
  i.event.cancelable && (i.canceled = true, typeof i.event.preventDefault == "function" && i.event.preventDefault());
}
function ht(i, o3) {
  Ci.set(this, { eventTarget: i, event: o3, eventPhase: 2, currentTarget: i, canceled: false, stopped: false, immediateStopped: false, passiveListener: null, timeStamp: o3.timeStamp || Date.now() }), Object.defineProperty(this, "isTrusted", { value: false, enumerable: true });
  const a2 = Object.keys(o3);
  for (let u2 = 0; u2 < a2.length; ++u2) {
    const l2 = a2[u2];
    l2 in this || Object.defineProperty(this, l2, vi(l2));
  }
}
function vi(i) {
  return { get() {
    return W(this).event[i];
  }, set(o3) {
    W(this).event[i] = o3;
  }, configurable: true, enumerable: true };
}
function gl(i) {
  return { value() {
    const o3 = W(this).event;
    return o3[i].apply(o3, arguments);
  }, configurable: true, enumerable: true };
}
function _l(i, o3) {
  const a2 = Object.keys(o3);
  if (a2.length === 0)
    return i;
  function u2(l2, p) {
    i.call(this, l2, p);
  }
  n2(u2, "CustomEvent"), u2.prototype = Object.create(i.prototype, { constructor: { value: u2, configurable: true, writable: true } });
  for (let l2 = 0; l2 < a2.length; ++l2) {
    const p = a2[l2];
    if (!(p in i.prototype)) {
      const g3 = typeof Object.getOwnPropertyDescriptor(o3, p).value == "function";
      Object.defineProperty(u2.prototype, p, g3 ? gl(p) : vi(p));
    }
  }
  return u2;
}
function Ei(i) {
  if (i == null || i === Object.prototype)
    return ht;
  let o3 = Dn.get(i);
  return o3 == null && (o3 = _l(Ei(Object.getPrototypeOf(i)), i), Dn.set(i, o3)), o3;
}
function Sl(i, o3) {
  const a2 = Ei(Object.getPrototypeOf(o3));
  return new a2(i, o3);
}
function wl(i) {
  return W(i).immediateStopped;
}
function Rl(i, o3) {
  W(i).eventPhase = o3;
}
function Tl(i, o3) {
  W(i).currentTarget = o3;
}
function Ai(i, o3) {
  W(i).passiveListener = o3;
}
function Rr(i) {
  return i !== null && typeof i == "object";
}
function Bt(i) {
  const o3 = Bi.get(i);
  if (o3 == null)
    throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  return o3;
}
function Cl(i) {
  return { get() {
    let a2 = Bt(this).get(i);
    for (; a2 != null; ) {
      if (a2.listenerType === wr)
        return a2.listener;
      a2 = a2.next;
    }
    return null;
  }, set(o3) {
    typeof o3 != "function" && !Rr(o3) && (o3 = null);
    const a2 = Bt(this);
    let u2 = null, l2 = a2.get(i);
    for (; l2 != null; )
      l2.listenerType === wr ? u2 !== null ? u2.next = l2.next : l2.next !== null ? a2.set(i, l2.next) : a2.delete(i) : u2 = l2, l2 = l2.next;
    if (o3 !== null) {
      const p = { listener: o3, listenerType: wr, passive: false, once: false, next: null };
      u2 === null ? a2.set(i, p) : u2.next = p;
    }
  }, configurable: true, enumerable: true };
}
function qi(i, o3) {
  Object.defineProperty(i, `on${o3}`, Cl(o3));
}
function Oi(i) {
  function o3() {
    Pe.call(this);
  }
  n2(o3, "CustomEventTarget"), o3.prototype = Object.create(Pe.prototype, { constructor: { value: o3, configurable: true, writable: true } });
  for (let a2 = 0; a2 < i.length; ++a2)
    qi(o3.prototype, i[a2]);
  return o3;
}
function Pe() {
  if (this instanceof Pe) {
    Bi.set(this, /* @__PURE__ */ new Map());
    return;
  }
  if (arguments.length === 1 && Array.isArray(arguments[0]))
    return Oi(arguments[0]);
  if (arguments.length > 0) {
    const i = new Array(arguments.length);
    for (let o3 = 0; o3 < arguments.length; ++o3)
      i[o3] = arguments[o3];
    return Oi(i);
  }
  throw new TypeError("Cannot call a class as a function");
}
function Pl() {
  const i = Object.create(pt.prototype);
  return Pe.call(i), Tr.set(i, false), i;
}
function vl(i) {
  Tr.get(i) === false && (Tr.set(i, true), i.dispatchEvent({ type: "abort" }));
}
function Ii(i) {
  const o3 = zi.get(i);
  if (o3 == null)
    throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i === null ? "null" : typeof i}`);
  return o3;
}
function ji() {
  var _a2, _b2, _c;
  !((_b2 = (_a2 = globalThis.process) == null ? void 0 : _a2.versions) == null ? void 0 : _b2.node) && !((_c = globalThis.process) == null ? void 0 : _c.env.DISABLE_NODE_FETCH_NATIVE_WARN) && console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");
}
var As;
var n2;
var fi;
var O;
var be;
var X;
var ve;
var kt;
var bt;
var Cr;
var Ve;
var Wt;
var qt;
var Ot;
var ee;
var zt;
var Ne;
var He;
var It;
var pr;
var di;
var $s;
var hi;
var pi;
var Ds;
var ut;
var Ms;
var Us;
var On;
var Et;
var xs;
var Ns;
var bi;
var Hs;
var mi;
var zn;
var Me;
var br;
var Un;
var ft;
var xn;
var G;
var mr;
var yi;
var yr;
var Qs;
var Ys;
var Gs;
var Zs;
var H;
var Nn;
var Ue;
var Fn;
var Ks;
var gi;
var Js;
var Xs;
var gr;
var jn;
var Pr;
var ye;
var tl;
var Ln;
var se;
var xe;
var le;
var rl;
var Si;
var nl;
var $2;
var At;
var ll;
var vr;
var dt;
var ul;
var Hn;
var _r;
var fl;
var cl;
var $n;
var dl;
var hl;
var pl;
var bl;
var wi;
var Ri;
var Er;
var Sr;
var ml;
var Ci;
var Dn;
var Bi;
var ki;
var Wi;
var wr;
var Vn;
var pt;
var Tr;
var Mn;
var zi;
var El;
var Al;
var Fi;
var init_node = __esm({
  "node_modules/node-fetch-native/dist/node.mjs"() {
    "use strict";
    init_node_fetch_native_1a4a356d();
    As = Object.defineProperty;
    n2 = (i, o3) => As(i, "name", { value: o3, configurable: true });
    fi = (i, o3, a2) => {
      if (!o3.has(i))
        throw TypeError("Cannot " + a2);
    };
    O = (i, o3, a2) => (fi(i, o3, "read from private field"), a2 ? a2.call(i) : o3.get(i));
    be = (i, o3, a2) => {
      if (o3.has(i))
        throw TypeError("Cannot add the same private member more than once");
      o3 instanceof WeakSet ? o3.add(i) : o3.set(i, a2);
    };
    X = (i, o3, a2, u2) => (fi(i, o3, "write to private field"), u2 ? u2.call(i, a2) : o3.set(i, a2), a2);
    n2(js, "dataUriToBuffer");
    pr = { exports: {} };
    n2(Ls, "requirePonyfill_es2018");
    $s = 65536;
    if (!globalThis.ReadableStream)
      try {
        const i = __require("node:process"), { emitWarning: o3 } = i;
        try {
          i.emitWarning = () => {
          }, Object.assign(globalThis, __require("node:stream/web")), i.emitWarning = o3;
        } catch (a2) {
          throw i.emitWarning = o3, a2;
        }
      } catch {
        Object.assign(globalThis, Ls());
      }
    try {
      const { Blob: i } = __require("buffer");
      i && !i.prototype.stream && (i.prototype.stream = n2(function(a2) {
        let u2 = 0;
        const l2 = this;
        return new ReadableStream({ type: "bytes", async pull(p) {
          const g3 = await l2.slice(u2, Math.min(l2.size, u2 + $s)).arrayBuffer();
          u2 += g3.byteLength, p.enqueue(new Uint8Array(g3)), u2 === l2.size && p.close();
        } });
      }, "name"));
    } catch {
    }
    hi = 65536;
    n2(qn, "toIterator");
    pi = (Ve = class {
      constructor(o3 = [], a2 = {}) {
        be(this, ve, []);
        be(this, kt, "");
        be(this, bt, 0);
        be(this, Cr, "transparent");
        if (typeof o3 != "object" || o3 === null)
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        if (typeof o3[Symbol.iterator] != "function")
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        if (typeof a2 != "object" && typeof a2 != "function")
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        a2 === null && (a2 = {});
        const u2 = new TextEncoder();
        for (const p of o3) {
          let h;
          ArrayBuffer.isView(p) ? h = new Uint8Array(p.buffer.slice(p.byteOffset, p.byteOffset + p.byteLength)) : p instanceof ArrayBuffer ? h = new Uint8Array(p.slice(0)) : p instanceof Ve ? h = p : h = u2.encode(`${p}`), X(this, bt, O(this, bt) + (ArrayBuffer.isView(h) ? h.byteLength : h.size)), O(this, ve).push(h);
        }
        X(this, Cr, `${a2.endings === void 0 ? "transparent" : a2.endings}`);
        const l2 = a2.type === void 0 ? "" : String(a2.type);
        X(this, kt, /^[\x20-\x7E]*$/.test(l2) ? l2 : "");
      }
      get size() {
        return O(this, bt);
      }
      get type() {
        return O(this, kt);
      }
      async text() {
        const o3 = new TextDecoder();
        let a2 = "";
        for await (const u2 of qn(O(this, ve), false))
          a2 += o3.decode(u2, { stream: true });
        return a2 += o3.decode(), a2;
      }
      async arrayBuffer() {
        const o3 = new Uint8Array(this.size);
        let a2 = 0;
        for await (const u2 of qn(O(this, ve), false))
          o3.set(u2, a2), a2 += u2.length;
        return o3.buffer;
      }
      stream() {
        const o3 = qn(O(this, ve), true);
        return new globalThis.ReadableStream({ type: "bytes", async pull(a2) {
          const u2 = await o3.next();
          u2.done ? a2.close() : a2.enqueue(u2.value);
        }, async cancel() {
          await o3.return();
        } });
      }
      slice(o3 = 0, a2 = this.size, u2 = "") {
        const { size: l2 } = this;
        let p = o3 < 0 ? Math.max(l2 + o3, 0) : Math.min(o3, l2), h = a2 < 0 ? Math.max(l2 + a2, 0) : Math.min(a2, l2);
        const g3 = Math.max(h - p, 0), A2 = O(this, ve), w2 = [];
        let E2 = 0;
        for (const b of A2) {
          if (E2 >= g3)
            break;
          const q = ArrayBuffer.isView(b) ? b.byteLength : b.size;
          if (p && q <= p)
            p -= q, h -= q;
          else {
            let _;
            ArrayBuffer.isView(b) ? (_ = b.subarray(p, Math.min(q, h)), E2 += _.byteLength) : (_ = b.slice(p, Math.min(q, h)), E2 += _.size), h -= q, w2.push(_), p = 0;
          }
        }
        const T2 = new Ve([], { type: String(u2).toLowerCase() });
        return X(T2, bt, g3), X(T2, ve, w2), T2;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](o3) {
        return o3 && typeof o3 == "object" && typeof o3.constructor == "function" && (typeof o3.stream == "function" || typeof o3.arrayBuffer == "function") && /^(Blob|File)$/.test(o3[Symbol.toStringTag]);
      }
    }, ve = /* @__PURE__ */ new WeakMap(), kt = /* @__PURE__ */ new WeakMap(), bt = /* @__PURE__ */ new WeakMap(), Cr = /* @__PURE__ */ new WeakMap(), n2(Ve, "Blob"), Ve);
    Object.defineProperties(pi.prototype, { size: { enumerable: true }, type: { enumerable: true }, slice: { enumerable: true } });
    Ds = pi;
    ut = Ds;
    Ms = (Ot = class extends ut {
      constructor(a2, u2, l2 = {}) {
        if (arguments.length < 2)
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        super(a2, l2);
        be(this, Wt, 0);
        be(this, qt, "");
        l2 === null && (l2 = {});
        const p = l2.lastModified === void 0 ? Date.now() : Number(l2.lastModified);
        Number.isNaN(p) || X(this, Wt, p), X(this, qt, String(u2));
      }
      get name() {
        return O(this, qt);
      }
      get lastModified() {
        return O(this, Wt);
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](a2) {
        return !!a2 && a2 instanceof ut && /^(File)$/.test(a2[Symbol.toStringTag]);
      }
    }, Wt = /* @__PURE__ */ new WeakMap(), qt = /* @__PURE__ */ new WeakMap(), n2(Ot, "File"), Ot);
    Us = Ms;
    On = Us;
    ({ toStringTag: Et, iterator: xs, hasInstance: Ns } = Symbol);
    bi = Math.random;
    Hs = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    mi = n2((i, o3, a2) => (i += "", /^(Blob|File)$/.test(o3 && o3[Et]) ? [(a2 = a2 !== void 0 ? a2 + "" : o3[Et] == "File" ? o3.name : "blob", i), o3.name !== a2 || o3[Et] == "blob" ? new On([o3], a2, o3) : o3] : [i, o3 + ""]), "f");
    zn = n2((i, o3) => (o3 ? i : i.replace(/\r?\n|\r/g, `\r
`)).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22"), "e$1");
    Me = n2((i, o3, a2) => {
      if (o3.length < a2)
        throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a2} arguments required, but only ${o3.length} present.`);
    }, "x");
    br = (zt = class {
      constructor(...o3) {
        be(this, ee, []);
        if (o3.length)
          throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.");
      }
      get [Et]() {
        return "FormData";
      }
      [xs]() {
        return this.entries();
      }
      static [Ns](o3) {
        return o3 && typeof o3 == "object" && o3[Et] === "FormData" && !Hs.some((a2) => typeof o3[a2] != "function");
      }
      append(...o3) {
        Me("append", arguments, 2), O(this, ee).push(mi(...o3));
      }
      delete(o3) {
        Me("delete", arguments, 1), o3 += "", X(this, ee, O(this, ee).filter(([a2]) => a2 !== o3));
      }
      get(o3) {
        Me("get", arguments, 1), o3 += "";
        for (var a2 = O(this, ee), u2 = a2.length, l2 = 0; l2 < u2; l2++)
          if (a2[l2][0] === o3)
            return a2[l2][1];
        return null;
      }
      getAll(o3, a2) {
        return Me("getAll", arguments, 1), a2 = [], o3 += "", O(this, ee).forEach((u2) => u2[0] === o3 && a2.push(u2[1])), a2;
      }
      has(o3) {
        return Me("has", arguments, 1), o3 += "", O(this, ee).some((a2) => a2[0] === o3);
      }
      forEach(o3, a2) {
        Me("forEach", arguments, 1);
        for (var [u2, l2] of this)
          o3.call(a2, l2, u2, this);
      }
      set(...o3) {
        Me("set", arguments, 2);
        var a2 = [], u2 = true;
        o3 = mi(...o3), O(this, ee).forEach((l2) => {
          l2[0] === o3[0] ? u2 && (u2 = !a2.push(o3)) : a2.push(l2);
        }), u2 && a2.push(o3), X(this, ee, a2);
      }
      *entries() {
        yield* O(this, ee);
      }
      *keys() {
        for (var [o3] of this)
          yield o3;
      }
      *values() {
        for (var [, o3] of this)
          yield o3;
      }
    }, ee = /* @__PURE__ */ new WeakMap(), n2(zt, "FormData"), zt);
    n2(Vs, "formDataToBlob");
    Un = class Un2 extends Error {
      constructor(o3, a2) {
        super(o3), Error.captureStackTrace(this, this.constructor), this.type = a2;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    n2(Un, "FetchBaseError");
    ft = Un;
    xn = class xn2 extends ft {
      constructor(o3, a2, u2) {
        super(o3, a2), u2 && (this.code = this.errno = u2.code, this.erroredSysCall = u2.syscall);
      }
    };
    n2(xn, "FetchError");
    G = xn;
    mr = Symbol.toStringTag;
    yi = n2((i) => typeof i == "object" && typeof i.append == "function" && typeof i.delete == "function" && typeof i.get == "function" && typeof i.getAll == "function" && typeof i.has == "function" && typeof i.set == "function" && typeof i.sort == "function" && i[mr] === "URLSearchParams", "isURLSearchParameters");
    yr = n2((i) => i && typeof i == "object" && typeof i.arrayBuffer == "function" && typeof i.type == "string" && typeof i.stream == "function" && typeof i.constructor == "function" && /^(Blob|File)$/.test(i[mr]), "isBlob");
    Qs = n2((i) => typeof i == "object" && (i[mr] === "AbortSignal" || i[mr] === "EventTarget"), "isAbortSignal");
    Ys = n2((i, o3) => {
      const a2 = new URL(o3).hostname, u2 = new URL(i).hostname;
      return a2 === u2 || a2.endsWith(`.${u2}`);
    }, "isDomainOrSubdomain");
    Gs = n2((i, o3) => {
      const a2 = new URL(o3).protocol, u2 = new URL(i).protocol;
      return a2 === u2;
    }, "isSameProtocol");
    Zs = ks(me.pipeline);
    H = Symbol("Body internals");
    Nn = class Nn2 {
      constructor(o3, { size: a2 = 0 } = {}) {
        let u2 = null;
        o3 === null ? o3 = null : yi(o3) ? o3 = M2.from(o3.toString()) : yr(o3) || M2.isBuffer(o3) || (dr.isAnyArrayBuffer(o3) ? o3 = M2.from(o3) : ArrayBuffer.isView(o3) ? o3 = M2.from(o3.buffer, o3.byteOffset, o3.byteLength) : o3 instanceof me || (o3 instanceof br ? (o3 = Vs(o3), u2 = o3.type.split("=")[1]) : o3 = M2.from(String(o3))));
        let l2 = o3;
        M2.isBuffer(o3) ? l2 = me.Readable.from(o3) : yr(o3) && (l2 = me.Readable.from(o3.stream())), this[H] = { body: o3, stream: l2, boundary: u2, disturbed: false, error: null }, this.size = a2, o3 instanceof me && o3.on("error", (p) => {
          const h = p instanceof ft ? p : new G(`Invalid response body while trying to fetch ${this.url}: ${p.message}`, "system", p);
          this[H].error = h;
        });
      }
      get body() {
        return this[H].stream;
      }
      get bodyUsed() {
        return this[H].disturbed;
      }
      async arrayBuffer() {
        const { buffer: o3, byteOffset: a2, byteLength: u2 } = await In(this);
        return o3.slice(a2, a2 + u2);
      }
      async formData() {
        const o3 = this.headers.get("content-type");
        if (o3.startsWith("application/x-www-form-urlencoded")) {
          const u2 = new br(), l2 = new URLSearchParams(await this.text());
          for (const [p, h] of l2)
            u2.append(p, h);
          return u2;
        }
        const { toFormData: a2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return a2(this.body, o3);
      }
      async blob() {
        const o3 = this.headers && this.headers.get("content-type") || this[H].body && this[H].body.type || "", a2 = await this.arrayBuffer();
        return new ut([a2], { type: o3 });
      }
      async json() {
        const o3 = await this.text();
        return JSON.parse(o3);
      }
      async text() {
        const o3 = await In(this);
        return new TextDecoder().decode(o3);
      }
      buffer() {
        return In(this);
      }
    };
    n2(Nn, "Body");
    Ue = Nn;
    Ue.prototype.buffer = hr(Ue.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer"), Object.defineProperties(Ue.prototype, { body: { enumerable: true }, bodyUsed: { enumerable: true }, arrayBuffer: { enumerable: true }, blob: { enumerable: true }, json: { enumerable: true }, text: { enumerable: true }, data: { get: hr(() => {
    }, "data doesn't exist, use json(), text(), arrayBuffer(), or body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (response)") } });
    n2(In, "consumeBody");
    Fn = n2((i, o3) => {
      let a2, u2, { body: l2 } = i[H];
      if (i.bodyUsed)
        throw new Error("cannot clone body after it is used");
      return l2 instanceof me && typeof l2.getBoundary != "function" && (a2 = new cr({ highWaterMark: o3 }), u2 = new cr({ highWaterMark: o3 }), l2.pipe(a2), l2.pipe(u2), i[H].stream = a2, l2 = u2), l2;
    }, "clone");
    Ks = hr((i) => i.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    gi = n2((i, o3) => i === null ? null : typeof i == "string" ? "text/plain;charset=UTF-8" : yi(i) ? "application/x-www-form-urlencoded;charset=UTF-8" : yr(i) ? i.type || null : M2.isBuffer(i) || dr.isAnyArrayBuffer(i) || ArrayBuffer.isView(i) ? null : i instanceof br ? `multipart/form-data; boundary=${o3[H].boundary}` : i && typeof i.getBoundary == "function" ? `multipart/form-data;boundary=${Ks(i)}` : i instanceof me ? null : "text/plain;charset=UTF-8", "extractContentType");
    Js = n2((i) => {
      const { body: o3 } = i[H];
      return o3 === null ? 0 : yr(o3) ? o3.size : M2.isBuffer(o3) ? o3.length : o3 && typeof o3.getLengthSync == "function" && o3.hasKnownLength && o3.hasKnownLength() ? o3.getLengthSync() : null;
    }, "getTotalBytes");
    Xs = n2(async (i, { body: o3 }) => {
      o3 === null ? i.end() : await Zs(o3, i);
    }, "writeToStream");
    gr = typeof vt.validateHeaderName == "function" ? vt.validateHeaderName : (i) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)) {
        const o3 = new TypeError(`Header name must be a valid HTTP token [${i}]`);
        throw Object.defineProperty(o3, "code", { value: "ERR_INVALID_HTTP_TOKEN" }), o3;
      }
    };
    jn = typeof vt.validateHeaderValue == "function" ? vt.validateHeaderValue : (i, o3) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o3)) {
        const a2 = new TypeError(`Invalid character in header content ["${i}"]`);
        throw Object.defineProperty(a2, "code", { value: "ERR_INVALID_CHAR" }), a2;
      }
    };
    Pr = class Pr2 extends URLSearchParams {
      constructor(o3) {
        let a2 = [];
        if (o3 instanceof Pr2) {
          const u2 = o3.raw();
          for (const [l2, p] of Object.entries(u2))
            a2.push(...p.map((h) => [l2, h]));
        } else if (o3 != null)
          if (typeof o3 == "object" && !dr.isBoxedPrimitive(o3)) {
            const u2 = o3[Symbol.iterator];
            if (u2 == null)
              a2.push(...Object.entries(o3));
            else {
              if (typeof u2 != "function")
                throw new TypeError("Header pairs must be iterable");
              a2 = [...o3].map((l2) => {
                if (typeof l2 != "object" || dr.isBoxedPrimitive(l2))
                  throw new TypeError("Each header pair must be an iterable object");
                return [...l2];
              }).map((l2) => {
                if (l2.length !== 2)
                  throw new TypeError("Each header pair must be a name/value tuple");
                return [...l2];
              });
            }
          } else
            throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        return a2 = a2.length > 0 ? a2.map(([u2, l2]) => (gr(u2), jn(u2, String(l2)), [String(u2).toLowerCase(), String(l2)])) : void 0, super(a2), new Proxy(this, { get(u2, l2, p) {
          switch (l2) {
            case "append":
            case "set":
              return (h, g3) => (gr(h), jn(h, String(g3)), URLSearchParams.prototype[l2].call(u2, String(h).toLowerCase(), String(g3)));
            case "delete":
            case "has":
            case "getAll":
              return (h) => (gr(h), URLSearchParams.prototype[l2].call(u2, String(h).toLowerCase()));
            case "keys":
              return () => (u2.sort(), new Set(URLSearchParams.prototype.keys.call(u2)).keys());
            default:
              return Reflect.get(u2, l2, p);
          }
        } });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(o3) {
        const a2 = this.getAll(o3);
        if (a2.length === 0)
          return null;
        let u2 = a2.join(", ");
        return /^content-encoding$/i.test(o3) && (u2 = u2.toLowerCase()), u2;
      }
      forEach(o3, a2 = void 0) {
        for (const u2 of this.keys())
          Reflect.apply(o3, a2, [this.get(u2), u2, this]);
      }
      *values() {
        for (const o3 of this.keys())
          yield this.get(o3);
      }
      *entries() {
        for (const o3 of this.keys())
          yield [o3, this.get(o3)];
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((o3, a2) => (o3[a2] = this.getAll(a2), o3), {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((o3, a2) => {
          const u2 = this.getAll(a2);
          return a2 === "host" ? o3[a2] = u2[0] : o3[a2] = u2.length > 1 ? u2 : u2[0], o3;
        }, {});
      }
    };
    n2(Pr, "Headers");
    ye = Pr;
    Object.defineProperties(ye.prototype, ["get", "entries", "forEach", "values"].reduce((i, o3) => (i[o3] = { enumerable: true }, i), {}));
    n2(el, "fromRawHeaders");
    tl = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
    Ln = n2((i) => tl.has(i), "isRedirect");
    se = Symbol("Response internals");
    xe = class xe2 extends Ue {
      constructor(o3 = null, a2 = {}) {
        super(o3, a2);
        const u2 = a2.status != null ? a2.status : 200, l2 = new ye(a2.headers);
        if (o3 !== null && !l2.has("Content-Type")) {
          const p = gi(o3, this);
          p && l2.append("Content-Type", p);
        }
        this[se] = { type: "default", url: a2.url, status: u2, statusText: a2.statusText || "", headers: l2, counter: a2.counter, highWaterMark: a2.highWaterMark };
      }
      get type() {
        return this[se].type;
      }
      get url() {
        return this[se].url || "";
      }
      get status() {
        return this[se].status;
      }
      get ok() {
        return this[se].status >= 200 && this[se].status < 300;
      }
      get redirected() {
        return this[se].counter > 0;
      }
      get statusText() {
        return this[se].statusText;
      }
      get headers() {
        return this[se].headers;
      }
      get highWaterMark() {
        return this[se].highWaterMark;
      }
      clone() {
        return new xe2(Fn(this, this.highWaterMark), { type: this.type, url: this.url, status: this.status, statusText: this.statusText, headers: this.headers, ok: this.ok, redirected: this.redirected, size: this.size, highWaterMark: this.highWaterMark });
      }
      static redirect(o3, a2 = 302) {
        if (!Ln(a2))
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        return new xe2(null, { headers: { location: new URL(o3).toString() }, status: a2 });
      }
      static error() {
        const o3 = new xe2(null, { status: 0, statusText: "" });
        return o3[se].type = "error", o3;
      }
      static json(o3 = void 0, a2 = {}) {
        const u2 = JSON.stringify(o3);
        if (u2 === void 0)
          throw new TypeError("data is not JSON serializable");
        const l2 = new ye(a2 && a2.headers);
        return l2.has("content-type") || l2.set("content-type", "application/json"), new xe2(u2, { ...a2, headers: l2 });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    n2(xe, "Response");
    le = xe;
    Object.defineProperties(le.prototype, { type: { enumerable: true }, url: { enumerable: true }, status: { enumerable: true }, ok: { enumerable: true }, redirected: { enumerable: true }, statusText: { enumerable: true }, headers: { enumerable: true }, clone: { enumerable: true } });
    rl = n2((i) => {
      if (i.search)
        return i.search;
      const o3 = i.href.length - 1, a2 = i.hash || (i.href[o3] === "#" ? "#" : "");
      return i.href[o3 - a2.length] === "?" ? "?" : "";
    }, "getSearch");
    n2(_i, "stripURLForUseAsAReferrer");
    Si = /* @__PURE__ */ new Set(["", "no-referrer", "no-referrer-when-downgrade", "same-origin", "origin", "strict-origin", "origin-when-cross-origin", "strict-origin-when-cross-origin", "unsafe-url"]);
    nl = "strict-origin-when-cross-origin";
    n2(ol, "validateReferrerPolicy");
    n2(il, "isOriginPotentiallyTrustworthy");
    n2(ct, "isUrlPotentiallyTrustworthy");
    n2(al, "determineRequestsReferrer");
    n2(sl, "parseReferrerPolicyFromHeader");
    $2 = Symbol("Request internals");
    At = n2((i) => typeof i == "object" && typeof i[$2] == "object", "isRequest");
    ll = hr(() => {
    }, ".data is not a valid RequestInit property, use .body instead", "https://github.com/node-fetch/node-fetch/issues/1000 (request)");
    vr = class vr2 extends Ue {
      constructor(o3, a2 = {}) {
        let u2;
        if (At(o3) ? u2 = new URL(o3.url) : (u2 = new URL(o3), o3 = {}), u2.username !== "" || u2.password !== "")
          throw new TypeError(`${u2} is an url with embedded credentials.`);
        let l2 = a2.method || o3.method || "GET";
        if (/^(delete|get|head|options|post|put)$/i.test(l2) && (l2 = l2.toUpperCase()), !At(a2) && "data" in a2 && ll(), (a2.body != null || At(o3) && o3.body !== null) && (l2 === "GET" || l2 === "HEAD"))
          throw new TypeError("Request with GET/HEAD method cannot have body");
        const p = a2.body ? a2.body : At(o3) && o3.body !== null ? Fn(o3) : null;
        super(p, { size: a2.size || o3.size || 0 });
        const h = new ye(a2.headers || o3.headers || {});
        if (p !== null && !h.has("Content-Type")) {
          const w2 = gi(p, this);
          w2 && h.set("Content-Type", w2);
        }
        let g3 = At(o3) ? o3.signal : null;
        if ("signal" in a2 && (g3 = a2.signal), g3 != null && !Qs(g3))
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        let A2 = a2.referrer == null ? o3.referrer : a2.referrer;
        if (A2 === "")
          A2 = "no-referrer";
        else if (A2) {
          const w2 = new URL(A2);
          A2 = /^about:(\/\/)?client$/.test(w2) ? "client" : w2;
        } else
          A2 = void 0;
        this[$2] = { method: l2, redirect: a2.redirect || o3.redirect || "follow", headers: h, parsedURL: u2, signal: g3, referrer: A2 }, this.follow = a2.follow === void 0 ? o3.follow === void 0 ? 20 : o3.follow : a2.follow, this.compress = a2.compress === void 0 ? o3.compress === void 0 ? true : o3.compress : a2.compress, this.counter = a2.counter || o3.counter || 0, this.agent = a2.agent || o3.agent, this.highWaterMark = a2.highWaterMark || o3.highWaterMark || 16384, this.insecureHTTPParser = a2.insecureHTTPParser || o3.insecureHTTPParser || false, this.referrerPolicy = a2.referrerPolicy || o3.referrerPolicy || "";
      }
      get method() {
        return this[$2].method;
      }
      get url() {
        return qs(this[$2].parsedURL);
      }
      get headers() {
        return this[$2].headers;
      }
      get redirect() {
        return this[$2].redirect;
      }
      get signal() {
        return this[$2].signal;
      }
      get referrer() {
        if (this[$2].referrer === "no-referrer")
          return "";
        if (this[$2].referrer === "client")
          return "about:client";
        if (this[$2].referrer)
          return this[$2].referrer.toString();
      }
      get referrerPolicy() {
        return this[$2].referrerPolicy;
      }
      set referrerPolicy(o3) {
        this[$2].referrerPolicy = ol(o3);
      }
      clone() {
        return new vr2(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    n2(vr, "Request");
    dt = vr;
    Object.defineProperties(dt.prototype, { method: { enumerable: true }, url: { enumerable: true }, headers: { enumerable: true }, redirect: { enumerable: true }, clone: { enumerable: true }, signal: { enumerable: true }, referrer: { enumerable: true }, referrerPolicy: { enumerable: true } });
    ul = n2((i) => {
      const { parsedURL: o3 } = i[$2], a2 = new ye(i[$2].headers);
      a2.has("Accept") || a2.set("Accept", "*/*");
      let u2 = null;
      if (i.body === null && /^(post|put)$/i.test(i.method) && (u2 = "0"), i.body !== null) {
        const g3 = Js(i);
        typeof g3 == "number" && !Number.isNaN(g3) && (u2 = String(g3));
      }
      u2 && a2.set("Content-Length", u2), i.referrerPolicy === "" && (i.referrerPolicy = nl), i.referrer && i.referrer !== "no-referrer" ? i[$2].referrer = al(i) : i[$2].referrer = "no-referrer", i[$2].referrer instanceof URL && a2.set("Referer", i.referrer), a2.has("User-Agent") || a2.set("User-Agent", "node-fetch"), i.compress && !a2.has("Accept-Encoding") && a2.set("Accept-Encoding", "gzip, deflate, br");
      let { agent: l2 } = i;
      typeof l2 == "function" && (l2 = l2(o3));
      const p = rl(o3), h = { path: o3.pathname + p, method: i.method, headers: a2[Symbol.for("nodejs.util.inspect.custom")](), insecureHTTPParser: i.insecureHTTPParser, agent: l2 };
      return { parsedURL: o3, options: h };
    }, "getNodeRequestOptions");
    Hn = class Hn2 extends ft {
      constructor(o3, a2 = "aborted") {
        super(o3, a2);
      }
    };
    n2(Hn, "AbortError");
    _r = Hn;
    if (!globalThis.DOMException)
      try {
        const { MessageChannel: i } = __require("worker_threads"), o3 = new i().port1, a2 = new ArrayBuffer();
        o3.postMessage(a2, [a2, a2]);
      } catch (i) {
        i.constructor.name === "DOMException" && (globalThis.DOMException = i.constructor);
      }
    fl = globalThis.DOMException;
    cl = f(fl);
    ({ stat: $n } = Is);
    dl = n2((i, o3) => wi(ci(i), i, o3), "blobFromSync");
    hl = n2((i, o3) => $n(i).then((a2) => wi(a2, i, o3)), "blobFrom");
    pl = n2((i, o3) => $n(i).then((a2) => Ri(a2, i, o3)), "fileFrom");
    bl = n2((i, o3) => Ri(ci(i), i, o3), "fileFromSync");
    wi = n2((i, o3, a2 = "") => new ut([new Sr({ path: o3, size: i.size, lastModified: i.mtimeMs, start: 0 })], { type: a2 }), "fromBlob");
    Ri = n2((i, o3, a2 = "") => new On([new Sr({ path: o3, size: i.size, lastModified: i.mtimeMs, start: 0 })], Fs(o3), { type: a2, lastModified: i.mtimeMs }), "fromFile");
    Er = class Er2 {
      constructor(o3) {
        be(this, Ne, void 0);
        be(this, He, void 0);
        X(this, Ne, o3.path), X(this, He, o3.start), this.size = o3.size, this.lastModified = o3.lastModified;
      }
      slice(o3, a2) {
        return new Er2({ path: O(this, Ne), lastModified: this.lastModified, size: a2 - o3, start: O(this, He) + o3 });
      }
      async *stream() {
        const { mtimeMs: o3 } = await $n(O(this, Ne));
        if (o3 > this.lastModified)
          throw new cl("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.", "NotReadableError");
        yield* zs(O(this, Ne), { start: O(this, He), end: O(this, He) + this.size - 1 });
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
    };
    Ne = /* @__PURE__ */ new WeakMap(), He = /* @__PURE__ */ new WeakMap(), n2(Er, "BlobDataItem");
    Sr = Er;
    ml = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
    n2(Ti, "fetch$1");
    n2(yl, "fixResponseChunkedTransferBadEnding");
    Ci = /* @__PURE__ */ new WeakMap();
    Dn = /* @__PURE__ */ new WeakMap();
    n2(W, "pd");
    n2(Pi, "setCancelFlag");
    n2(ht, "Event"), ht.prototype = { get type() {
      return W(this).event.type;
    }, get target() {
      return W(this).eventTarget;
    }, get currentTarget() {
      return W(this).currentTarget;
    }, composedPath() {
      const i = W(this).currentTarget;
      return i == null ? [] : [i];
    }, get NONE() {
      return 0;
    }, get CAPTURING_PHASE() {
      return 1;
    }, get AT_TARGET() {
      return 2;
    }, get BUBBLING_PHASE() {
      return 3;
    }, get eventPhase() {
      return W(this).eventPhase;
    }, stopPropagation() {
      const i = W(this);
      i.stopped = true, typeof i.event.stopPropagation == "function" && i.event.stopPropagation();
    }, stopImmediatePropagation() {
      const i = W(this);
      i.stopped = true, i.immediateStopped = true, typeof i.event.stopImmediatePropagation == "function" && i.event.stopImmediatePropagation();
    }, get bubbles() {
      return !!W(this).event.bubbles;
    }, get cancelable() {
      return !!W(this).event.cancelable;
    }, preventDefault() {
      Pi(W(this));
    }, get defaultPrevented() {
      return W(this).canceled;
    }, get composed() {
      return !!W(this).event.composed;
    }, get timeStamp() {
      return W(this).timeStamp;
    }, get srcElement() {
      return W(this).eventTarget;
    }, get cancelBubble() {
      return W(this).stopped;
    }, set cancelBubble(i) {
      if (!i)
        return;
      const o3 = W(this);
      o3.stopped = true, typeof o3.event.cancelBubble == "boolean" && (o3.event.cancelBubble = true);
    }, get returnValue() {
      return !W(this).canceled;
    }, set returnValue(i) {
      i || Pi(W(this));
    }, initEvent() {
    } }, Object.defineProperty(ht.prototype, "constructor", { value: ht, configurable: true, writable: true }), typeof window < "u" && typeof window.Event < "u" && (Object.setPrototypeOf(ht.prototype, window.Event.prototype), Dn.set(window.Event.prototype, ht));
    n2(vi, "defineRedirectDescriptor");
    n2(gl, "defineCallDescriptor");
    n2(_l, "defineWrapper");
    n2(Ei, "getWrapper");
    n2(Sl, "wrapEvent");
    n2(wl, "isStopped");
    n2(Rl, "setEventPhase");
    n2(Tl, "setCurrentTarget");
    n2(Ai, "setPassiveListener");
    Bi = /* @__PURE__ */ new WeakMap();
    ki = 1;
    Wi = 2;
    wr = 3;
    n2(Rr, "isObject");
    n2(Bt, "getListeners");
    n2(Cl, "defineEventAttributeDescriptor");
    n2(qi, "defineEventAttribute");
    n2(Oi, "defineCustomEventTarget");
    n2(Pe, "EventTarget"), Pe.prototype = { addEventListener(i, o3, a2) {
      if (o3 == null)
        return;
      if (typeof o3 != "function" && !Rr(o3))
        throw new TypeError("'listener' should be a function or an object.");
      const u2 = Bt(this), l2 = Rr(a2), h = (l2 ? !!a2.capture : !!a2) ? ki : Wi, g3 = { listener: o3, listenerType: h, passive: l2 && !!a2.passive, once: l2 && !!a2.once, next: null };
      let A2 = u2.get(i);
      if (A2 === void 0) {
        u2.set(i, g3);
        return;
      }
      let w2 = null;
      for (; A2 != null; ) {
        if (A2.listener === o3 && A2.listenerType === h)
          return;
        w2 = A2, A2 = A2.next;
      }
      w2.next = g3;
    }, removeEventListener(i, o3, a2) {
      if (o3 == null)
        return;
      const u2 = Bt(this), p = (Rr(a2) ? !!a2.capture : !!a2) ? ki : Wi;
      let h = null, g3 = u2.get(i);
      for (; g3 != null; ) {
        if (g3.listener === o3 && g3.listenerType === p) {
          h !== null ? h.next = g3.next : g3.next !== null ? u2.set(i, g3.next) : u2.delete(i);
          return;
        }
        h = g3, g3 = g3.next;
      }
    }, dispatchEvent(i) {
      if (i == null || typeof i.type != "string")
        throw new TypeError('"event.type" should be a string.');
      const o3 = Bt(this), a2 = i.type;
      let u2 = o3.get(a2);
      if (u2 == null)
        return true;
      const l2 = Sl(this, i);
      let p = null;
      for (; u2 != null; ) {
        if (u2.once ? p !== null ? p.next = u2.next : u2.next !== null ? o3.set(a2, u2.next) : o3.delete(a2) : p = u2, Ai(l2, u2.passive ? u2.listener : null), typeof u2.listener == "function")
          try {
            u2.listener.call(this, l2);
          } catch (h) {
            typeof console < "u" && typeof console.error == "function" && console.error(h);
          }
        else
          u2.listenerType !== wr && typeof u2.listener.handleEvent == "function" && u2.listener.handleEvent(l2);
        if (wl(l2))
          break;
        u2 = u2.next;
      }
      return Ai(l2, null), Rl(l2, 0), Tl(l2, null), !l2.defaultPrevented;
    } }, Object.defineProperty(Pe.prototype, "constructor", { value: Pe, configurable: true, writable: true }), typeof window < "u" && typeof window.EventTarget < "u" && Object.setPrototypeOf(Pe.prototype, window.EventTarget.prototype);
    Vn = class Vn2 extends Pe {
      constructor() {
        throw super(), new TypeError("AbortSignal cannot be constructed directly");
      }
      get aborted() {
        const o3 = Tr.get(this);
        if (typeof o3 != "boolean")
          throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this === null ? "null" : typeof this}`);
        return o3;
      }
    };
    n2(Vn, "AbortSignal");
    pt = Vn;
    qi(pt.prototype, "abort");
    n2(Pl, "createAbortSignal");
    n2(vl, "abortSignal");
    Tr = /* @__PURE__ */ new WeakMap();
    Object.defineProperties(pt.prototype, { aborted: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(pt.prototype, Symbol.toStringTag, { configurable: true, value: "AbortSignal" });
    Mn = (It = class {
      constructor() {
        zi.set(this, Pl());
      }
      get signal() {
        return Ii(this);
      }
      abort() {
        vl(Ii(this));
      }
    }, n2(It, "AbortController"), It);
    zi = /* @__PURE__ */ new WeakMap();
    n2(Ii, "getSignal"), Object.defineProperties(Mn.prototype, { signal: { enumerable: true }, abort: { enumerable: true } }), typeof Symbol == "function" && typeof Symbol.toStringTag == "symbol" && Object.defineProperty(Mn.prototype, Symbol.toStringTag, { configurable: true, value: "AbortController" });
    El = Object.defineProperty;
    Al = n2((i, o3) => El(i, "name", { value: o3, configurable: true }), "e");
    Fi = Ti;
    ji();
    n2(ji, "s"), Al(ji, "checkNodeEnvironment");
  }
});
var require_posix = __commonJS({
  "node_modules/which/node_modules/isexe/dist/cjs/posix.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs");
    var promises_1 = __require("fs/promises");
    var isexe = async (path2, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path2), options);
      } catch (e) {
        const er = e;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    };
    exports.isexe = isexe;
    var sync = (path2, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat((0, fs_1.statSync)(path2), options);
      } catch (e) {
        const er = e;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    };
    exports.sync = sync;
    var checkStat = (stat, options) => stat.isFile() && checkMode(stat, options);
    var checkMode = (stat, options) => {
      var _a2, _b2, _c;
      const myUid = options.uid ?? ((_a2 = process.getuid) == null ? void 0 : _a2.call(process));
      const myGroups = options.groups ?? ((_b2 = process.getgroups) == null ? void 0 : _b2.call(process)) ?? [];
      const myGid = options.gid ?? ((_c = process.getgid) == null ? void 0 : _c.call(process)) ?? myGroups[0];
      if (myUid === void 0 || myGid === void 0) {
        throw new Error("cannot get uid or gid");
      }
      const groups = /* @__PURE__ */ new Set([myGid, ...myGroups]);
      const mod = stat.mode;
      const uid = stat.uid;
      const gid = stat.gid;
      const u2 = parseInt("100", 8);
      const g3 = parseInt("010", 8);
      const o3 = parseInt("001", 8);
      const ug = u2 | g3;
      return !!(mod & o3 || mod & g3 && groups.has(gid) || mod & u2 && uid === myUid || mod & ug && myUid === 0);
    };
  }
});
var require_win32 = __commonJS({
  "node_modules/which/node_modules/isexe/dist/cjs/win32.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = void 0;
    var fs_1 = __require("fs");
    var promises_1 = __require("fs/promises");
    var isexe = async (path2, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat(await (0, promises_1.stat)(path2), path2, options);
      } catch (e) {
        const er = e;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    };
    exports.isexe = isexe;
    var sync = (path2, options = {}) => {
      const { ignoreErrors = false } = options;
      try {
        return checkStat((0, fs_1.statSync)(path2), path2, options);
      } catch (e) {
        const er = e;
        if (ignoreErrors || er.code === "EACCES")
          return false;
        throw er;
      }
    };
    exports.sync = sync;
    var checkPathExt = (path2, options) => {
      const { pathExt = process.env.PATHEXT || "" } = options;
      const peSplit = pathExt.split(";");
      if (peSplit.indexOf("") !== -1) {
        return true;
      }
      for (let i = 0; i < peSplit.length; i++) {
        const p = peSplit[i].toLowerCase();
        const ext = path2.substring(path2.length - p.length).toLowerCase();
        if (p && ext === p) {
          return true;
        }
      }
      return false;
    };
    var checkStat = (stat, path2, options) => stat.isFile() && checkPathExt(path2, options);
  }
});
var require_options = __commonJS({
  "node_modules/which/node_modules/isexe/dist/cjs/options.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});
var require_cjs = __commonJS({
  "node_modules/which/node_modules/isexe/dist/cjs/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o3, m2, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      var desc = Object.getOwnPropertyDescriptor(m2, k2);
      if (!desc || ("get" in desc ? !m2.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m2[k2];
        } };
      }
      Object.defineProperty(o3, k22, desc);
    } : function(o3, m2, k2, k22) {
      if (k22 === void 0)
        k22 = k2;
      o3[k22] = m2[k2];
    });
    var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o3, v2) {
      Object.defineProperty(o3, "default", { enumerable: true, value: v2 });
    } : function(o3, v2) {
      o3["default"] = v2;
    });
    var __importStar = exports && exports.__importStar || function(mod) {
      if (mod && mod.__esModule)
        return mod;
      var result = {};
      if (mod != null) {
        for (var k2 in mod)
          if (k2 !== "default" && Object.prototype.hasOwnProperty.call(mod, k2))
            __createBinding(result, mod, k2);
      }
      __setModuleDefault(result, mod);
      return result;
    };
    var __exportStar = exports && exports.__exportStar || function(m2, exports2) {
      for (var p in m2)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m2, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sync = exports.isexe = exports.posix = exports.win32 = void 0;
    var posix = __importStar(require_posix());
    exports.posix = posix;
    var win32 = __importStar(require_win32());
    exports.win32 = win32;
    __exportStar(require_options(), exports);
    var platform = process.env._ISEXE_TEST_PLATFORM_ || process.platform;
    var impl = platform === "win32" ? win32 : posix;
    exports.isexe = impl.isexe;
    exports.sync = impl.sync;
  }
});
var require_lib2 = __commonJS({
  "node_modules/which/lib/index.js"(exports, module) {
    "use strict";
    var { isexe, sync: isexeSync } = require_cjs();
    var { join, delimiter, sep, posix } = __require("path");
    var isWindows = process.platform === "win32";
    var rSlash = new RegExp(`[${posix.sep}${sep === posix.sep ? "" : sep}]`.replace(/(\\)/g, "\\$1"));
    var rRel = new RegExp(`^\\.${rSlash.source}`);
    var getNotFoundError = (cmd) => Object.assign(new Error(`not found: ${cmd}`), { code: "ENOENT" });
    var getPathInfo = (cmd, {
      path: optPath = process.env.PATH,
      pathExt: optPathExt = process.env.PATHEXT,
      delimiter: optDelimiter = delimiter
    }) => {
      const pathEnv = cmd.match(rSlash) ? [""] : [
        // windows always checks the cwd first
        ...isWindows ? [process.cwd()] : [],
        ...(optPath || /* istanbul ignore next: very unusual */
        "").split(optDelimiter)
      ];
      if (isWindows) {
        const pathExtExe = optPathExt || [".EXE", ".CMD", ".BAT", ".COM"].join(optDelimiter);
        const pathExt = pathExtExe.split(optDelimiter).flatMap((item) => [item, item.toLowerCase()]);
        if (cmd.includes(".") && pathExt[0] !== "") {
          pathExt.unshift("");
        }
        return { pathEnv, pathExt, pathExtExe };
      }
      return { pathEnv, pathExt: [""] };
    };
    var getPathPart = (raw, cmd) => {
      const pathPart = /^".*"$/.test(raw) ? raw.slice(1, -1) : raw;
      const prefix = !pathPart && rRel.test(cmd) ? cmd.slice(0, 2) : "";
      return prefix + join(pathPart, cmd);
    };
    var which = async (cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const envPart of pathEnv) {
        const p = getPathPart(envPart, cmd);
        for (const ext of pathExt) {
          const withExt = p + ext;
          const is = await isexe(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    };
    var whichSync = (cmd, opt = {}) => {
      const { pathEnv, pathExt, pathExtExe } = getPathInfo(cmd, opt);
      const found = [];
      for (const pathEnvPart of pathEnv) {
        const p = getPathPart(pathEnvPart, cmd);
        for (const ext of pathExt) {
          const withExt = p + ext;
          const is = isexeSync(withExt, { pathExt: pathExtExe, ignoreErrors: true });
          if (is) {
            if (!opt.all) {
              return withExt;
            }
            found.push(withExt);
          }
        }
      }
      if (opt.all && found.length) {
        return found;
      }
      if (opt.nothrow) {
        return null;
      }
      throw getNotFoundError(cmd);
    };
    module.exports = which;
    which.sync = whichSync;
  }
});
var require_minimist = __commonJS({
  "node_modules/minimist/index.js"(exports, module) {
    "use strict";
    function hasKey(obj, keys) {
      var o3 = obj;
      keys.slice(0, -1).forEach(function(key2) {
        o3 = o3[key2] || {};
      });
      var key = keys[keys.length - 1];
      return key in o3;
    }
    function isNumber(x2) {
      if (typeof x2 === "number") {
        return true;
      }
      if (/^0x[0-9a-f]+$/i.test(x2)) {
        return true;
      }
      return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x2);
    }
    function isConstructorOrProto(obj, key) {
      return key === "constructor" && typeof obj[key] === "function" || key === "__proto__";
    }
    module.exports = function(args, opts) {
      if (!opts) {
        opts = {};
      }
      var flags2 = {
        bools: {},
        strings: {},
        unknownFn: null
      };
      if (typeof opts.unknown === "function") {
        flags2.unknownFn = opts.unknown;
      }
      if (typeof opts.boolean === "boolean" && opts.boolean) {
        flags2.allBools = true;
      } else {
        [].concat(opts.boolean).filter(Boolean).forEach(function(key2) {
          flags2.bools[key2] = true;
        });
      }
      var aliases = {};
      function aliasIsBoolean(key2) {
        return aliases[key2].some(function(x2) {
          return flags2.bools[x2];
        });
      }
      Object.keys(opts.alias || {}).forEach(function(key2) {
        aliases[key2] = [].concat(opts.alias[key2]);
        aliases[key2].forEach(function(x2) {
          aliases[x2] = [key2].concat(aliases[key2].filter(function(y) {
            return x2 !== y;
          }));
        });
      });
      [].concat(opts.string).filter(Boolean).forEach(function(key2) {
        flags2.strings[key2] = true;
        if (aliases[key2]) {
          [].concat(aliases[key2]).forEach(function(k2) {
            flags2.strings[k2] = true;
          });
        }
      });
      var defaults2 = opts.default || {};
      var argv2 = { _: [] };
      function argDefined(key2, arg2) {
        return flags2.allBools && /^--[^=]+$/.test(arg2) || flags2.strings[key2] || flags2.bools[key2] || aliases[key2];
      }
      function setKey(obj, keys, value2) {
        var o3 = obj;
        for (var i2 = 0; i2 < keys.length - 1; i2++) {
          var key2 = keys[i2];
          if (isConstructorOrProto(o3, key2)) {
            return;
          }
          if (o3[key2] === void 0) {
            o3[key2] = {};
          }
          if (o3[key2] === Object.prototype || o3[key2] === Number.prototype || o3[key2] === String.prototype) {
            o3[key2] = {};
          }
          if (o3[key2] === Array.prototype) {
            o3[key2] = [];
          }
          o3 = o3[key2];
        }
        var lastKey = keys[keys.length - 1];
        if (isConstructorOrProto(o3, lastKey)) {
          return;
        }
        if (o3 === Object.prototype || o3 === Number.prototype || o3 === String.prototype) {
          o3 = {};
        }
        if (o3 === Array.prototype) {
          o3 = [];
        }
        if (o3[lastKey] === void 0 || flags2.bools[lastKey] || typeof o3[lastKey] === "boolean") {
          o3[lastKey] = value2;
        } else if (Array.isArray(o3[lastKey])) {
          o3[lastKey].push(value2);
        } else {
          o3[lastKey] = [o3[lastKey], value2];
        }
      }
      function setArg(key2, val, arg2) {
        if (arg2 && flags2.unknownFn && !argDefined(key2, arg2)) {
          if (flags2.unknownFn(arg2) === false) {
            return;
          }
        }
        var value2 = !flags2.strings[key2] && isNumber(val) ? Number(val) : val;
        setKey(argv2, key2.split("."), value2);
        (aliases[key2] || []).forEach(function(x2) {
          setKey(argv2, x2.split("."), value2);
        });
      }
      Object.keys(flags2.bools).forEach(function(key2) {
        setArg(key2, defaults2[key2] === void 0 ? false : defaults2[key2]);
      });
      var notFlags = [];
      if (args.indexOf("--") !== -1) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
      }
      for (var i = 0; i < args.length; i++) {
        var arg = args[i];
        var key;
        var next;
        if (/^--.+=/.test(arg)) {
          var m2 = arg.match(/^--([^=]+)=([\s\S]*)$/);
          key = m2[1];
          var value = m2[2];
          if (flags2.bools[key]) {
            value = value !== "false";
          }
          setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
          key = arg.match(/^--no-(.+)/)[1];
          setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
          key = arg.match(/^--(.+)/)[1];
          next = args[i + 1];
          if (next !== void 0 && !/^(-|--)[^-]/.test(next) && !flags2.bools[key] && !flags2.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
            setArg(key, next, arg);
            i += 1;
          } else if (/^(true|false)$/.test(next)) {
            setArg(key, next === "true", arg);
            i += 1;
          } else {
            setArg(key, flags2.strings[key] ? "" : true, arg);
          }
        } else if (/^-[^-]+/.test(arg)) {
          var letters = arg.slice(1, -1).split("");
          var broken = false;
          for (var j = 0; j < letters.length; j++) {
            next = arg.slice(j + 2);
            if (next === "-") {
              setArg(letters[j], next, arg);
              continue;
            }
            if (/[A-Za-z]/.test(letters[j]) && next[0] === "=") {
              setArg(letters[j], next.slice(1), arg);
              broken = true;
              break;
            }
            if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
              setArg(letters[j], next, arg);
              broken = true;
              break;
            }
            if (letters[j + 1] && letters[j + 1].match(/\W/)) {
              setArg(letters[j], arg.slice(j + 2), arg);
              broken = true;
              break;
            } else {
              setArg(letters[j], flags2.strings[letters[j]] ? "" : true, arg);
            }
          }
          key = arg.slice(-1)[0];
          if (!broken && key !== "-") {
            if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags2.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
              setArg(key, args[i + 1], arg);
              i += 1;
            } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
              setArg(key, args[i + 1] === "true", arg);
              i += 1;
            } else {
              setArg(key, flags2.strings[key] ? "" : true, arg);
            }
          }
        } else {
          if (!flags2.unknownFn || flags2.unknownFn(arg) !== false) {
            argv2._.push(flags2.strings._ || !isNumber(arg) ? arg : Number(arg));
          }
          if (opts.stopEarly) {
            argv2._.push.apply(argv2._, args.slice(i + 1));
            break;
          }
        }
      }
      Object.keys(defaults2).forEach(function(k2) {
        if (!hasKey(argv2, k2.split("."))) {
          setKey(argv2, k2.split("."), defaults2[k2]);
          (aliases[k2] || []).forEach(function(x2) {
            setKey(argv2, x2.split("."), defaults2[k2]);
          });
        }
      });
      if (opts["--"]) {
        argv2["--"] = notFlags.slice();
      } else {
        notFlags.forEach(function(k2) {
          argv2._.push(k2);
        });
      }
      return argv2;
    };
  }
});
function mergeStreams(streams) {
  if (!Array.isArray(streams)) {
    throw new TypeError(`Expected an array, got \`${typeof streams}\`.`);
  }
  for (const stream of streams) {
    validateStream(stream);
  }
  const objectMode = streams.some(({ readableObjectMode }) => readableObjectMode);
  const highWaterMark = getHighWaterMark(streams, objectMode);
  const passThroughStream = new MergedStream({
    objectMode,
    writableHighWaterMark: highWaterMark,
    readableHighWaterMark: highWaterMark
  });
  for (const stream of streams) {
    passThroughStream.add(stream);
  }
  if (streams.length === 0) {
    endStream(passThroughStream);
  }
  return passThroughStream;
}
var getHighWaterMark = (streams, objectMode) => {
  if (streams.length === 0) {
    return 16384;
  }
  const highWaterMarks = streams.filter(({ readableObjectMode }) => readableObjectMode === objectMode).map(({ readableHighWaterMark }) => readableHighWaterMark);
  return Math.max(...highWaterMarks);
};
var MergedStream = class extends PassThroughStream {
  #streams = /* @__PURE__ */ new Set([]);
  #ended = /* @__PURE__ */ new Set([]);
  #aborted = /* @__PURE__ */ new Set([]);
  #onFinished;
  add(stream) {
    validateStream(stream);
    if (this.#streams.has(stream)) {
      return;
    }
    this.#streams.add(stream);
    this.#onFinished ??= onMergedStreamFinished(this, this.#streams);
    endWhenStreamsDone({
      passThroughStream: this,
      stream,
      streams: this.#streams,
      ended: this.#ended,
      aborted: this.#aborted,
      onFinished: this.#onFinished
    });
    stream.pipe(this, { end: false });
  }
  remove(stream) {
    validateStream(stream);
    if (!this.#streams.has(stream)) {
      return false;
    }
    stream.unpipe(this);
    return true;
  }
};
var onMergedStreamFinished = async (passThroughStream, streams) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_COUNT);
  const controller = new AbortController();
  try {
    await Promise.race([
      onMergedStreamEnd(passThroughStream, controller),
      onInputStreamsUnpipe(passThroughStream, streams, controller)
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_COUNT);
  }
};
var onMergedStreamEnd = async (passThroughStream, { signal }) => {
  await finished(passThroughStream, { signal, cleanup: true });
};
var onInputStreamsUnpipe = async (passThroughStream, streams, { signal }) => {
  for await (const [unpipedStream] of on(passThroughStream, "unpipe", { signal })) {
    if (streams.has(unpipedStream)) {
      unpipedStream.emit(unpipeEvent);
    }
  }
};
var validateStream = (stream) => {
  if (typeof (stream == null ? void 0 : stream.pipe) !== "function") {
    throw new TypeError(`Expected a readable stream, got: \`${typeof stream}\`.`);
  }
};
var endWhenStreamsDone = async ({ passThroughStream, stream, streams, ended, aborted, onFinished }) => {
  updateMaxListeners(passThroughStream, PASSTHROUGH_LISTENERS_PER_STREAM);
  const controller = new AbortController();
  try {
    await Promise.race([
      afterMergedStreamFinished(onFinished, stream),
      onInputStreamEnd({ passThroughStream, stream, streams, ended, aborted, controller }),
      onInputStreamUnpipe({ stream, streams, ended, aborted, controller })
    ]);
  } finally {
    controller.abort();
    updateMaxListeners(passThroughStream, -PASSTHROUGH_LISTENERS_PER_STREAM);
  }
  if (streams.size === ended.size + aborted.size) {
    if (ended.size === 0 && aborted.size > 0) {
      abortStream(passThroughStream);
    } else {
      endStream(passThroughStream);
    }
  }
};
var isAbortError = (error) => (error == null ? void 0 : error.code) === "ERR_STREAM_PREMATURE_CLOSE";
var afterMergedStreamFinished = async (onFinished, stream) => {
  try {
    await onFinished;
    abortStream(stream);
  } catch (error) {
    if (isAbortError(error)) {
      abortStream(stream);
    } else {
      errorStream(stream, error);
    }
  }
};
var onInputStreamEnd = async ({ passThroughStream, stream, streams, ended, aborted, controller: { signal } }) => {
  try {
    await finished(stream, { signal, cleanup: true, readable: true, writable: false });
    if (streams.has(stream)) {
      ended.add(stream);
    }
  } catch (error) {
    if (signal.aborted || !streams.has(stream)) {
      return;
    }
    if (isAbortError(error)) {
      aborted.add(stream);
    } else {
      errorStream(passThroughStream, error);
    }
  }
};
var onInputStreamUnpipe = async ({ stream, streams, ended, aborted, controller: { signal } }) => {
  await once(stream, unpipeEvent, { signal });
  streams.delete(stream);
  ended.delete(stream);
  aborted.delete(stream);
};
var unpipeEvent = Symbol("unpipe");
var endStream = (stream) => {
  if (stream.writable) {
    stream.end();
  }
};
var abortStream = (stream) => {
  if (stream.readable || stream.writable) {
    stream.destroy();
  }
};
var errorStream = (stream, error) => {
  if (!stream.destroyed) {
    stream.once("error", noop);
    stream.destroy(error);
  }
};
var noop = () => {
};
var updateMaxListeners = (passThroughStream, increment) => {
  const maxListeners = passThroughStream.getMaxListeners();
  if (maxListeners !== 0 && maxListeners !== Number.POSITIVE_INFINITY) {
    passThroughStream.setMaxListeners(maxListeners + increment);
  }
};
var PASSTHROUGH_LISTENERS_COUNT = 2;
var PASSTHROUGH_LISTENERS_PER_STREAM = 1;
var import_fast_glob2 = __toESM(require_out4(), 1);
async function isType(fsStatType, statsMethodName, filePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }
  try {
    const stats = await fsPromises[fsStatType](filePath);
    return stats[statsMethodName]();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
function isTypeSync(fsStatType, statsMethodName, filePath) {
  if (typeof filePath !== "string") {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }
  try {
    return fs[fsStatType](filePath)[statsMethodName]();
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
var isFile = isType.bind(null, "stat", "isFile");
var isDirectory = isType.bind(null, "stat", "isDirectory");
var isSymlink = isType.bind(null, "lstat", "isSymbolicLink");
var isFileSync = isTypeSync.bind(null, "statSync", "isFile");
var isDirectorySync = isTypeSync.bind(null, "statSync", "isDirectory");
var isSymlinkSync = isTypeSync.bind(null, "lstatSync", "isSymbolicLink");
function toPath(urlOrPath) {
  return urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
}
var import_fast_glob = __toESM(require_out4(), 1);
var import_ignore = __toESM(require_ignore(), 1);
function slash(path2) {
  const isExtendedLengthPath = path2.startsWith("\\\\?\\");
  if (isExtendedLengthPath) {
    return path2;
  }
  return path2.replace(/\\/g, "/");
}
var isNegativePattern = (pattern) => pattern[0] === "!";
var defaultIgnoredDirectories = [
  "**/node_modules",
  "**/flow-typed",
  "**/coverage",
  "**/.git"
];
var ignoreFilesGlobOptions = {
  absolute: true,
  dot: true
};
var GITIGNORE_FILES_PATTERN = "**/.gitignore";
var applyBaseToPattern = (pattern, base) => isNegativePattern(pattern) ? "!" + path.posix.join(base, pattern.slice(1)) : path.posix.join(base, pattern);
var parseIgnoreFile = (file, cwd2) => {
  const base = slash(path.relative(cwd2, path.dirname(file.filePath)));
  return file.content.split(/\r?\n/).filter((line) => line && !line.startsWith("#")).map((pattern) => applyBaseToPattern(pattern, base));
};
var toRelativePath = (fileOrDirectory, cwd2) => {
  cwd2 = slash(cwd2);
  if (path.isAbsolute(fileOrDirectory)) {
    if (slash(fileOrDirectory).startsWith(cwd2)) {
      return path.relative(cwd2, fileOrDirectory);
    }
    throw new Error(`Path ${fileOrDirectory} is not in cwd ${cwd2}`);
  }
  return fileOrDirectory;
};
var getIsIgnoredPredicate = (files, cwd2) => {
  const patterns = files.flatMap((file) => parseIgnoreFile(file, cwd2));
  const ignores = (0, import_ignore.default)().add(patterns);
  return (fileOrDirectory) => {
    fileOrDirectory = toPath(fileOrDirectory);
    fileOrDirectory = toRelativePath(fileOrDirectory, cwd2);
    return fileOrDirectory ? ignores.ignores(slash(fileOrDirectory)) : false;
  };
};
var normalizeOptions = (options = {}) => ({
  cwd: toPath(options.cwd) ?? process2.cwd(),
  suppressErrors: Boolean(options.suppressErrors),
  deep: typeof options.deep === "number" ? options.deep : Number.POSITIVE_INFINITY,
  ignore: [...options.ignore ?? [], ...defaultIgnoredDirectories]
});
var isIgnoredByIgnoreFiles = async (patterns, options) => {
  const { cwd: cwd2, suppressErrors, deep, ignore } = normalizeOptions(options);
  const paths = await (0, import_fast_glob.default)(patterns, {
    cwd: cwd2,
    suppressErrors,
    deep,
    ignore,
    ...ignoreFilesGlobOptions
  });
  const files = await Promise.all(
    paths.map(async (filePath) => ({
      filePath,
      content: await fsPromises2.readFile(filePath, "utf8")
    }))
  );
  return getIsIgnoredPredicate(files, cwd2);
};
var isIgnoredByIgnoreFilesSync = (patterns, options) => {
  const { cwd: cwd2, suppressErrors, deep, ignore } = normalizeOptions(options);
  const paths = import_fast_glob.default.sync(patterns, {
    cwd: cwd2,
    suppressErrors,
    deep,
    ignore,
    ...ignoreFilesGlobOptions
  });
  const files = paths.map((filePath) => ({
    filePath,
    content: fs2.readFileSync(filePath, "utf8")
  }));
  return getIsIgnoredPredicate(files, cwd2);
};
var isGitIgnored = (options) => isIgnoredByIgnoreFiles(GITIGNORE_FILES_PATTERN, options);
var isGitIgnoredSync = (options) => isIgnoredByIgnoreFilesSync(GITIGNORE_FILES_PATTERN, options);
var assertPatternsInput = (patterns) => {
  if (patterns.some((pattern) => typeof pattern !== "string")) {
    throw new TypeError("Patterns must be a string or an array of strings");
  }
};
var normalizePathForDirectoryGlob = (filePath, cwd2) => {
  const path2 = isNegativePattern(filePath) ? filePath.slice(1) : filePath;
  return nodePath.isAbsolute(path2) ? path2 : nodePath.join(cwd2, path2);
};
var getDirectoryGlob = ({ directoryPath, files, extensions }) => {
  const extensionGlob = (extensions == null ? void 0 : extensions.length) > 0 ? `.${extensions.length > 1 ? `{${extensions.join(",")}}` : extensions[0]}` : "";
  return files ? files.map((file) => nodePath.posix.join(directoryPath, `**/${nodePath.extname(file) ? file : `${file}${extensionGlob}`}`)) : [nodePath.posix.join(directoryPath, `**${extensionGlob ? `/*${extensionGlob}` : ""}`)];
};
var directoryToGlob = async (directoryPaths, {
  cwd: cwd2 = process3.cwd(),
  files,
  extensions
} = {}) => {
  const globs = await Promise.all(
    directoryPaths.map(async (directoryPath) => await isDirectory(normalizePathForDirectoryGlob(directoryPath, cwd2)) ? getDirectoryGlob({ directoryPath, files, extensions }) : directoryPath)
  );
  return globs.flat();
};
var directoryToGlobSync = (directoryPaths, {
  cwd: cwd2 = process3.cwd(),
  files,
  extensions
} = {}) => directoryPaths.flatMap((directoryPath) => isDirectorySync(normalizePathForDirectoryGlob(directoryPath, cwd2)) ? getDirectoryGlob({ directoryPath, files, extensions }) : directoryPath);
var toPatternsArray = (patterns) => {
  patterns = [...new Set([patterns].flat())];
  assertPatternsInput(patterns);
  return patterns;
};
var checkCwdOption = (cwd2) => {
  if (!cwd2) {
    return;
  }
  let stat;
  try {
    stat = fs3.statSync(cwd2);
  } catch {
    return;
  }
  if (!stat.isDirectory()) {
    throw new Error("The `cwd` option must be a path to a directory");
  }
};
var normalizeOptions2 = (options = {}) => {
  options = {
    ...options,
    ignore: options.ignore ?? [],
    expandDirectories: options.expandDirectories ?? true,
    cwd: toPath(options.cwd)
  };
  checkCwdOption(options.cwd);
  return options;
};
var normalizeArguments = (function_) => async (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions2(options));
var normalizeArgumentsSync = (function_) => (patterns, options) => function_(toPatternsArray(patterns), normalizeOptions2(options));
var getIgnoreFilesPatterns = (options) => {
  const { ignoreFiles, gitignore } = options;
  const patterns = ignoreFiles ? toPatternsArray(ignoreFiles) : [];
  if (gitignore) {
    patterns.push(GITIGNORE_FILES_PATTERN);
  }
  return patterns;
};
var getFilter = async (options) => {
  const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
  return createFilterFunction(
    ignoreFilesPatterns.length > 0 && await isIgnoredByIgnoreFiles(ignoreFilesPatterns, options)
  );
};
var getFilterSync = (options) => {
  const ignoreFilesPatterns = getIgnoreFilesPatterns(options);
  return createFilterFunction(
    ignoreFilesPatterns.length > 0 && isIgnoredByIgnoreFilesSync(ignoreFilesPatterns, options)
  );
};
var createFilterFunction = (isIgnored) => {
  const seen = /* @__PURE__ */ new Set();
  return (fastGlobResult) => {
    const pathKey = nodePath.normalize(fastGlobResult.path ?? fastGlobResult);
    if (seen.has(pathKey) || isIgnored && isIgnored(pathKey)) {
      return false;
    }
    seen.add(pathKey);
    return true;
  };
};
var unionFastGlobResults = (results, filter) => results.flat().filter((fastGlobResult) => filter(fastGlobResult));
var convertNegativePatterns = (patterns, options) => {
  const tasks = [];
  while (patterns.length > 0) {
    const index = patterns.findIndex((pattern) => isNegativePattern(pattern));
    if (index === -1) {
      tasks.push({ patterns, options });
      break;
    }
    const ignorePattern = patterns[index].slice(1);
    for (const task of tasks) {
      task.options.ignore.push(ignorePattern);
    }
    if (index !== 0) {
      tasks.push({
        patterns: patterns.slice(0, index),
        options: {
          ...options,
          ignore: [
            ...options.ignore,
            ignorePattern
          ]
        }
      });
    }
    patterns = patterns.slice(index + 1);
  }
  return tasks;
};
var normalizeExpandDirectoriesOption = (options, cwd2) => ({
  ...cwd2 ? { cwd: cwd2 } : {},
  ...Array.isArray(options) ? { files: options } : options
});
var generateTasks = async (patterns, options) => {
  const globTasks = convertNegativePatterns(patterns, options);
  const { cwd: cwd2, expandDirectories } = options;
  if (!expandDirectories) {
    return globTasks;
  }
  const directoryToGlobOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd2);
  return Promise.all(
    globTasks.map(async (task) => {
      let { patterns: patterns2, options: options2 } = task;
      [
        patterns2,
        options2.ignore
      ] = await Promise.all([
        directoryToGlob(patterns2, directoryToGlobOptions),
        directoryToGlob(options2.ignore, { cwd: cwd2 })
      ]);
      return { patterns: patterns2, options: options2 };
    })
  );
};
var generateTasksSync = (patterns, options) => {
  const globTasks = convertNegativePatterns(patterns, options);
  const { cwd: cwd2, expandDirectories } = options;
  if (!expandDirectories) {
    return globTasks;
  }
  const directoryToGlobSyncOptions = normalizeExpandDirectoriesOption(expandDirectories, cwd2);
  return globTasks.map((task) => {
    let { patterns: patterns2, options: options2 } = task;
    patterns2 = directoryToGlobSync(patterns2, directoryToGlobSyncOptions);
    options2.ignore = directoryToGlobSync(options2.ignore, { cwd: cwd2 });
    return { patterns: patterns2, options: options2 };
  });
};
var globby = normalizeArguments(async (patterns, options) => {
  const [
    tasks,
    filter
  ] = await Promise.all([
    generateTasks(patterns, options),
    getFilter(options)
  ]);
  const results = await Promise.all(tasks.map((task) => (0, import_fast_glob2.default)(task.patterns, task.options)));
  return unionFastGlobResults(results, filter);
});
var globbySync = normalizeArgumentsSync((patterns, options) => {
  const tasks = generateTasksSync(patterns, options);
  const filter = getFilterSync(options);
  const results = tasks.map((task) => import_fast_glob2.default.sync(task.patterns, task.options));
  return unionFastGlobResults(results, filter);
});
var globbyStream = normalizeArgumentsSync((patterns, options) => {
  const tasks = generateTasksSync(patterns, options);
  const filter = getFilterSync(options);
  const streams = tasks.map((task) => import_fast_glob2.default.stream(task.patterns, task.options));
  const stream = mergeStreams(streams).filter((fastGlobResult) => filter(fastGlobResult));
  return stream;
});
var isDynamicPattern = normalizeArgumentsSync(
  (patterns, options) => patterns.some((pattern) => import_fast_glob2.default.isDynamicPattern(pattern, options))
);
var generateGlobTasks = normalizeArguments(generateTasks);
var generateGlobTasksSync = normalizeArgumentsSync(generateTasksSync);
var { convertPathToPattern } = import_fast_glob2.default;
var yaml = __toESM(require_dist(), 1);
var _fs = __toESM(require_lib(), 1);
var noop2 = () => {
};
var isPromiseLike = (value) => typeof (value == null ? void 0 : value.then) === "function";
var assign = (target, ...extras) => Object.defineProperties(target, extras.reduce((m2, extra) => ({ ...m2, ...Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(extra)).filter(([, v2]) => !Object.hasOwn(v2, "value") || v2.value !== void 0)) }), {}));
var buildCmd = (quote2, pieces, args, subs = substitute) => {
  if (args.some(isPromiseLike))
    return Promise.all(args).then((args2) => buildCmd(quote2, pieces, args2));
  let cmd = pieces[0], i = 0;
  while (i < args.length) {
    const s2 = Array.isArray(args[i]) ? args[i].map((x2) => quote2(subs(x2))).join(" ") : quote2(subs(args[i]));
    cmd += s2 + pieces[++i];
  }
  return cmd;
};
var substitute = (arg) => typeof (arg == null ? void 0 : arg.stdout) === "string" ? arg.stdout.replace(/\n$/, "") : `${arg}`;
var normalizeCtx = (...ctxs) => assign({
  id: Math.random().toString(36).slice(2),
  cmd: "",
  cwd: process4.cwd(),
  sync: false,
  args: [],
  input: null,
  env: process4.env,
  ee: new EventEmitter(),
  ac: new AbortController(),
  get signal() {
    return this.ac.signal;
  },
  on: {},
  detached: process4.platform !== "win32",
  shell: true,
  spawn: cp.spawn,
  spawnSync: cp.spawnSync,
  spawnOpts: {},
  callback: noop2,
  stdin: new VoidWritable(),
  stdout: new VoidWritable(),
  stderr: new VoidWritable(),
  stdio: ["pipe", "pipe", "pipe"],
  run: setImmediate
}, ...ctxs);
var processInput = (child, input) => {
  if (input && child.stdin && !child.stdin.destroyed) {
    if (input instanceof Stream2) {
      input.pipe(child.stdin);
    } else {
      child.stdin.write(input);
      child.stdin.end();
    }
  }
};
var VoidWritable = class extends Transform {
  _transform(chunk, _, cb) {
    this.emit("data", chunk);
    cb();
  }
};
var buildSpawnOpts = ({ spawnOpts, stdio, cwd: cwd2, shell, input, env: env2, detached, signal }) => ({
  ...spawnOpts,
  env: env2,
  cwd: cwd2,
  stdio,
  shell,
  input,
  windowsHide: true,
  detached,
  signal
});
var attachListeners = (ee2, on2 = {}) => {
  for (const [name, listener] of Object.entries(on2)) {
    ee2.on(name, listener);
  }
};
var invoke = (c) => {
  const now = Date.now();
  const stdio = [c.stdin, c.stdout, c.stderr];
  try {
    if (c.sync) {
      attachListeners(c.ee, c.on);
      const opts = buildSpawnOpts(c);
      const result = c.spawnSync(c.cmd, c.args, opts);
      c.ee.emit("start", result, c);
      if (result.stdout.length > 0) {
        c.stdout.write(result.stdout);
        c.ee.emit("stdout", result.stdout, c);
      }
      if (result.stderr.length > 0) {
        c.stderr.write(result.stderr);
        c.ee.emit("stderr", result.stderr, c);
      }
      c.callback(null, c.fulfilled = {
        ...result,
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString(),
        stdio,
        get stdall() {
          return this.stdout + this.stderr;
        },
        duration: Date.now() - now,
        ctx: c
      });
      c.ee.emit("end", c.fulfilled, c);
    } else {
      c.run(() => {
        var _a2, _b2;
        attachListeners(c.ee, c.on);
        let error = null;
        const opts = buildSpawnOpts(c);
        const stderr = [];
        const stdout = [];
        const stdall = [];
        const child = c.spawn(c.cmd, c.args, opts);
        c.child = child;
        c.ee.emit("start", child, c);
        opts.signal.addEventListener("abort", (event) => {
          if (opts.detached && child.pid) {
            try {
              process4.kill(-child.pid);
            } catch {
              child.kill();
            }
          }
          c.ee.emit("abort", event, c);
        });
        processInput(child, c.input || c.stdin);
        (_a2 = child.stdout) == null ? void 0 : _a2.pipe(c.stdout).on("data", (d2) => {
          stdout.push(d2);
          stdall.push(d2);
          c.ee.emit("stdout", d2, c);
        });
        (_b2 = child.stderr) == null ? void 0 : _b2.pipe(c.stderr).on("data", (d2) => {
          stderr.push(d2);
          stdall.push(d2);
          c.ee.emit("stderr", d2, c);
        });
        child.on("error", (e) => {
          error = e;
          c.ee.emit("err", error, c);
        }).on("close", (status, signal) => {
          c.callback(error, c.fulfilled = {
            error,
            status,
            signal,
            stdout: stdout.join(""),
            stderr: stderr.join(""),
            stdall: stdall.join(""),
            stdio: [c.stdin, c.stdout, c.stderr],
            duration: Date.now() - now,
            ctx: c
          });
          c.ee.emit("end", c.fulfilled, c);
        });
      }, c);
    }
  } catch (error) {
    c.callback(
      error,
      c.fulfilled = {
        error,
        status: null,
        signal: null,
        stdout: "",
        stderr: "",
        stdall: "",
        stdio,
        duration: Date.now() - now,
        ctx: c
      }
    );
    c.ee.emit("err", error, c);
    c.ee.emit("end", c.fulfilled, c);
  }
  return c;
};
var exec = (ctx) => invoke(normalizeCtx(ctx));
init_node();
init_node();
init_node_fetch_native_1a4a356d();
var a = Object.defineProperty;
var t3 = (e, r) => a(e, "name", { value: r, configurable: true });
var f2 = Object.defineProperty;
var g2 = t3((e, r) => f2(e, "name", { value: r, configurable: true }), "e");
var _a, _b;
var o2 = !!((_b = (_a = globalThis.process) == null ? void 0 : _a.env) == null ? void 0 : _b.FORCE_NODE_FETCH);
function l() {
  return !o2 && globalThis.fetch ? globalThis.fetch : Fi;
}
t3(l, "p"), g2(l, "_getFetch");
var s = l();
var T = !o2 && globalThis.Blob || ut;
var R2 = !o2 && globalThis.File || On;
var u = !o2 && globalThis.FormData || br;
var d = !o2 && globalThis.Headers || ye;
var $3 = !o2 && globalThis.Request || dt;
var C2 = !o2 && globalThis.Response || le;
var A = !o2 && globalThis.AbortController || Mn;
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;
function hasFlag(flag, argv2 = globalThis.Deno ? globalThis.Deno.args : process5.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv2.indexOf(prefix + flag);
  const terminatorPosition = argv2.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process5;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process5.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if ("GITHUB_ACTIONS" in env || "GITEA_ACTIONS" in env) {
      return 3;
    }
    if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self2, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self2;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self2, string) => {
  if (self2.level <= 0 || !string) {
    return self2[IS_EMPTY] ? "" : string;
  }
  let styler = self2[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;
var import_which = __toESM(require_lib2(), 1);
var import_minimist = __toESM(require_minimist(), 1);
var EOL = /\r?\n|\r|\n/;
var parseLine = (line, sep = " ") => {
  const result = {
    spaces: [],
    words: []
  };
  const capture = () => {
    if (word) {
      result.words.push({
        s: s2,
        e: s2 + word.length - 1,
        w: word
      });
      word = "";
      s2 = -1;
    }
  };
  let bb;
  let word = "";
  let s2 = -1;
  for (const i in [...line]) {
    const prev = line[+i - 1];
    const char = line[i];
    if (bb) {
      word += char;
      if (char === bb && prev !== "\\") {
        bb = void 0;
      }
      continue;
    }
    if (char === sep) {
      result.spaces.push(+i);
      capture();
      continue;
    }
    if (s2 === -1)
      s2 = +i;
    if (char === '"' || char === "'")
      bb = char;
    word += char;
  }
  capture();
  return result;
};
var parseLines = (input, sep) => input.split(EOL).map((l2) => parseLine(l2, sep));
var countWordsByIndex = ({ words }, index) => words.filter(({ e }) => e < index).length;
var getBorders = (lines) => lines[0].spaces.reduce((m2, i) => {
  const c = countWordsByIndex(lines[0], i);
  if (lines.every((l2) => l2.spaces.includes(i) && c === countWordsByIndex(l2, i))) {
    m2.push(i);
  }
  return m2;
}, []);
var parseUnixGrid = (input) => {
  const lines = parseLines(input);
  const borders = getBorders(lines);
  const _borders = [Number.NEGATIVE_INFINITY, ...borders, Number.POSITIVE_INFINITY];
  const grid = [];
  for (const { words } of lines) {
    const row = [];
    grid.push(row);
    for (const n3 in words) {
      const { w: w2, s: s2, e } = words[n3];
      for (const _b2 in _borders) {
        const a2 = _borders[+_b2];
        const b = _borders[+_b2 + 1];
        if (b === void 0)
          break;
        const block = row[_b2] || (row[_b2] = []);
        if (s2 > a2 && e < b)
          block.push(w2);
      }
    }
  }
  return gridToData(grid);
};
var gridToData = (grid) => {
  const data = [];
  const [headers, ...body] = grid;
  for (const row of body) {
    const entry = {};
    data.push(entry);
    for (const i in headers) {
      const keys = headers[i];
      if (keys.length === 0)
        continue;
      if (keys.length > row[i].length) {
        throw new Error("Malformed grid: row has more columns than headers");
      }
      for (const k2 in keys) {
        const key = keys[k2];
        const to = +k2 + 1 === keys.length ? Number.POSITIVE_INFINITY : +k2 + 1;
        entry[key] = row[i].slice(+k2, to);
      }
    }
  }
  return data;
};
var cut = (line, points, pad = 2) => {
  const chunks = [];
  let s2 = 0;
  for (const i in [...points, Number.POSITIVE_INFINITY]) {
    const chunk = line.slice(s2, points[i]);
    chunks.push(chunk);
    s2 = points[i] + pad;
  }
  return chunks;
};
var parseWinGrid = (input) => {
  var _a2;
  const lines = input.split(EOL);
  const headers = lines[0].trim().split(/\s+/);
  const data = [];
  let memo = null;
  for (const line of lines.slice(1)) {
    if (!line)
      continue;
    const { spaces } = parseLine(line);
    const borders = spaces.filter((s2, i) => spaces[i + 1] === s2 + 1 && spaces[i + 2] !== s2 + 2);
    let chunks = (borders.length > 0 ? cut(line, borders, 2) : [line]).map((l2) => l2.trim());
    if (chunks.length < headers.length) {
      memo = chunks;
      continue;
    } else if ((_a2 = chunks[0]) == null ? void 0 : _a2.trim()) {
      memo = null;
    } else {
      chunks = [...memo || ["<unknown>"], ...chunks].filter(Boolean);
    }
    const entry = Object.fromEntries(headers.map(
      (header, i) => [header, parseLine(chunks[i]).words.map(({ w: w2 }) => w2)]
    ));
    data.push(entry);
  }
  return data;
};
var parsers = {
  unix: parseUnixGrid,
  win: parseWinGrid
};
var parse = (input, { format = "unix" } = {}) => {
  const parser = parsers[format];
  if (!parser)
    throw new Error(`unsupported format: ${format}`);
  return parser(input);
};
var noop3 = () => {
};
var assign2 = (target, ...extras) => Object.defineProperties(target, extras.reduce((m2, extra) => ({ ...m2, ...Object.fromEntries(Object.entries(Object.getOwnPropertyDescriptors(extra)).filter(([, v2]) => !Object.hasOwn(v2, "value") || v2.value !== void 0)) }), {}));
var normalizeCtx2 = (...ctxs) => assign2({
  id: Math.random().toString(36).slice(2),
  cmd: "",
  cwd: process6.cwd(),
  sync: false,
  args: [],
  input: null,
  env: process6.env,
  ee: new EventEmitter2(),
  ac: new AbortController(),
  on: {},
  detached: process6.platform !== "win32",
  shell: true,
  spawn: cp2.spawn,
  spawnSync: cp2.spawnSync,
  spawnOpts: {},
  callback: noop3,
  stdin: new VoidWritable2(),
  stdout: new VoidWritable2(),
  stderr: new VoidWritable2(),
  stdio: ["pipe", "pipe", "pipe"],
  run: setImmediate
}, ...ctxs);
var processInput2 = (child, input) => {
  if (input && child.stdin && !child.stdin.destroyed) {
    if (input instanceof Stream4) {
      input.pipe(child.stdin);
    } else {
      child.stdin.write(input);
      child.stdin.end();
    }
  }
};
var VoidWritable2 = class extends Transform2 {
  _transform(chunk, _, cb) {
    this.emit("data", chunk);
    cb();
  }
};
var buildSpawnOpts2 = ({ spawnOpts, stdio, cwd: cwd2, shell, input, env: env2, detached, ac: { signal } }) => ({
  ...spawnOpts,
  env: env2,
  cwd: cwd2,
  stdio,
  shell,
  input,
  windowsHide: true,
  detached,
  signal
});
var attachListeners2 = (ee2, on2 = {}) => {
  for (const [name, listener] of Object.entries(on2)) {
    ee2.on(name, listener);
  }
};
var invoke2 = (c) => {
  const now = Date.now();
  const stdio = [c.stdin, c.stdout, c.stderr];
  try {
    if (c.sync) {
      attachListeners2(c.ee, c.on);
      const opts = buildSpawnOpts2(c);
      const result = c.spawnSync(c.cmd, c.args, opts);
      c.ee.emit("start", result, c);
      if (result.stdout.length > 0) {
        c.stdout.write(result.stdout);
        c.ee.emit("stdout", result.stdout, c);
      }
      if (result.stderr.length > 0) {
        c.stderr.write(result.stderr);
        c.ee.emit("stderr", result.stderr, c);
      }
      c.callback(null, c.fulfilled = {
        ...result,
        stdout: result.stdout.toString(),
        stderr: result.stderr.toString(),
        stdio,
        get stdall() {
          return this.stdout + this.stderr;
        },
        duration: Date.now() - now,
        ctx: c
      });
      c.ee.emit("end", c.fulfilled, c);
    } else {
      c.run(() => {
        attachListeners2(c.ee, c.on);
        let error = null;
        const opts = buildSpawnOpts2(c);
        const stderr = [];
        const stdout = [];
        const stdall = [];
        const child = c.spawn(c.cmd, c.args, opts);
        c.child = child;
        c.ee.emit("start", child, c);
        opts.signal.addEventListener("abort", (event) => {
          if (opts.detached && child.pid) {
            try {
              process6.kill(-child.pid);
            } catch {
              child.kill();
            }
          }
          c.ee.emit("abort", event, c);
        });
        processInput2(child, c.input || c.stdin);
        child.stdout.pipe(c.stdout).on("data", (d2) => {
          stdout.push(d2);
          stdall.push(d2);
          c.ee.emit("stdout", d2, c);
        });
        child.stderr.pipe(c.stderr).on("data", (d2) => {
          stderr.push(d2);
          stdall.push(d2);
          c.ee.emit("stderr", d2, c);
        });
        child.on("error", (e) => {
          error = e;
          c.ee.emit("err", error, c);
        }).on("close", (status, signal) => {
          c.callback(error, c.fulfilled = {
            error,
            status,
            signal,
            stdout: stdout.join(""),
            stderr: stderr.join(""),
            stdall: stdall.join(""),
            stdio: [c.stdin, c.stdout, c.stderr],
            duration: Date.now() - now,
            ctx: c
          });
          c.ee.emit("end", c.fulfilled, c);
        });
      }, c);
    }
  } catch (error) {
    c.callback(
      error,
      c.fulfilled = {
        error,
        status: null,
        signal: null,
        stdout: "",
        stderr: "",
        stdall: "",
        stdio,
        duration: Date.now() - now,
        ctx: c
      }
    );
    c.ee.emit("err", error, c);
    c.ee.emit("end", c.fulfilled, c);
  }
  return c;
};
var exec2 = (ctx) => invoke2(normalizeCtx2(ctx));
var EOL2 = /(\r\n)|(\n\r)|\n|\r/;
var IS_WIN = process7.platform === "win32";
var isBin = (f3) => {
  if (f3 === "")
    return false;
  if (!f3.includes("/"))
    return true;
  if (!fs4.existsSync(f3))
    return false;
  const stat = fs4.lstatSync(f3);
  return stat.isFile() || stat.isSymbolicLink();
};
var lookup = (query = {}, cb = noop4) => {
  const { promise, resolve, reject } = makeDeferred();
  const { psargs = ["-lx"] } = query;
  const args = typeof psargs === "string" ? psargs.split(/\s+/) : psargs;
  const extract2 = IS_WIN ? extractWmic : identity;
  const callback = (err, { stdout }) => {
    if (err) {
      reject(err);
      cb(err);
      return;
    }
    const list = parseProcessList(extract2(stdout), query);
    resolve(list);
    cb(null, list);
  };
  const ctx = IS_WIN ? {
    cmd: "cmd",
    input: "wmic process get ProcessId,ParentProcessId,CommandLine \n",
    callback,
    run(cb2) {
      cb2();
    }
  } : {
    cmd: "ps",
    args,
    run(cb2) {
      cb2();
    },
    callback
  };
  exec2(ctx);
  return promise;
};
var parseProcessList = (output, query = {}) => {
  const processList = parseGrid(output.trim());
  const pidList = (query.pid === void 0 ? [] : [query.pid].flat(1)).map((v2) => v2 + "");
  const filters = [
    (p) => query.command ? new RegExp(query.command, "i").test(p.command) : true,
    (p) => query.arguments ? new RegExp(query.arguments, "i").test(p.arguments.join(" ")) : true,
    (p) => query.ppid ? query.ppid + "" === p.ppid : true
  ];
  return processList.filter(
    (p) => (pidList.length === 0 || pidList.includes(p.pid)) && filters.every((f3) => f3(p))
  );
};
var extractWmic = (stdout) => {
  const _stdout = stdout.split(EOL2);
  const beginRow = _stdout.findIndex((out) => (out == null ? void 0 : out.indexOf("CommandLine")) === 0);
  _stdout.splice(_stdout.length - 1, 1);
  _stdout.splice(0, beginRow);
  return _stdout.join(SystemEOL);
};
var pickTree = (list, pid, recursive = false) => {
  const children = list.filter((p) => p.ppid === pid + "");
  return [
    ...children,
    ...children.flatMap((p) => recursive ? pickTree(list, p.pid, true) : [])
  ];
};
var tree = async (opts, cb = noop4) => {
  if (typeof opts === "string" || typeof opts === "number") {
    return tree({ pid: opts }, cb);
  }
  try {
    const all = await lookup();
    if (opts === void 0)
      return all;
    const { pid, recursive = false } = opts;
    const list = pickTree(all, pid, recursive);
    cb(null, list);
    return list;
  } catch (err) {
    cb(err);
    throw err;
  }
};
var kill = (pid, opts, next) => {
  if (typeof opts == "function") {
    return kill(pid, void 0, opts);
  }
  if (typeof opts == "string" || typeof opts == "number") {
    return kill(pid, { signal: opts }, next);
  }
  const { promise, resolve, reject } = makeDeferred();
  const {
    timeout = 30,
    signal = "SIGTERM"
  } = opts || {};
  try {
    process7.kill(+pid, signal);
  } catch (e) {
    reject(e);
    next == null ? void 0 : next(e);
    return promise;
  }
  let checkConfident = 0;
  let checkTimeoutTimer;
  let checkIsTimeout = false;
  const checkKilled = (finishCallback) => lookup({ pid }, (err, list = []) => {
    if (checkIsTimeout)
      return;
    if (err) {
      clearTimeout(checkTimeoutTimer);
      reject(err);
      finishCallback == null ? void 0 : finishCallback(err, pid);
    } else if (list.length > 0) {
      checkConfident = checkConfident - 1 || 0;
      checkKilled(finishCallback);
    } else {
      checkConfident++;
      if (checkConfident === 5) {
        clearTimeout(checkTimeoutTimer);
        resolve(pid);
        finishCallback == null ? void 0 : finishCallback(null, pid);
      } else {
        checkKilled(finishCallback);
      }
    }
  });
  if (next) {
    checkKilled(next);
    checkTimeoutTimer = setTimeout(() => {
      checkIsTimeout = true;
      next(new Error("Kill process timeout"));
    }, timeout * 1e3);
  } else {
    resolve(pid);
  }
  return promise;
};
var parseGrid = (output) => output ? formatOutput(parse(output, { format: IS_WIN ? "win" : "unix" })) : [];
var formatOutput = (data) => data.reduce((m2, d2) => {
  var _a2, _b2, _c, _d;
  const pid = ((_a2 = d2.PID) == null ? void 0 : _a2[0]) || ((_b2 = d2.ProcessId) == null ? void 0 : _b2[0]);
  const ppid = ((_c = d2.PPID) == null ? void 0 : _c[0]) || ((_d = d2.ParentProcessId) == null ? void 0 : _d[0]);
  const cmd = d2.CMD || d2.CommandLine || d2.COMMAND || [];
  if (pid && cmd.length > 0) {
    const c = cmd.findIndex((_v, i) => isBin(cmd.slice(0, i).join(" ")));
    const command = cmd.slice(0, c).join(" ");
    const args = cmd.length > 1 ? cmd.slice(c) : [];
    m2.push({
      pid,
      ppid,
      command,
      arguments: args
    });
  }
  return m2;
}, []);
var makeDeferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { resolve, reject, promise };
};
var noop4 = () => {
};
var identity = (v2) => v2;
var ts_default = { lookup, kill, tree };
var globbyModule = {
  globby,
  globbySync,
  globbyStream,
  generateGlobTasksSync,
  generateGlobTasks,
  isGitIgnoredSync,
  isGitIgnored,
  isDynamicPattern
};
var fs5 = _fs;
var export_minimist = import_minimist.default;
var export_which = import_which.default;

// node_modules/zx/build/util.js
function noop5() {
}
function noquote() {
  throw new Error("No quote function is defined: https://\xEF.at/no-quote-func");
}
function quote(arg) {
  if (/^[a-z0-9/_.\-@:=]+$/i.test(arg) || arg === "") {
    return arg;
  }
  return `$'` + arg.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0") + `'`;
}
function exitCodeInfo(exitCode) {
  return {
    2: "Misuse of shell builtins",
    126: "Invoked command cannot execute",
    127: "Command not found",
    128: "Invalid exit argument",
    129: "Hangup",
    130: "Interrupt",
    131: "Quit and dump core",
    132: "Illegal instruction",
    133: "Trace/breakpoint trap",
    134: "Process aborted",
    135: 'Bus error: "access to undefined portion of memory object"',
    136: 'Floating point exception: "erroneous arithmetic operation"',
    137: "Kill (terminate immediately)",
    138: "User-defined 1",
    139: "Segmentation violation",
    140: "User-defined 2",
    141: "Write to pipe with no one reading",
    142: "Signal raised by alarm",
    143: "Termination (request to terminate)",
    145: "Child process terminated, stopped (or continued*)",
    146: "Continue if stopped",
    147: "Stop executing temporarily",
    148: "Terminal stop signal",
    149: 'Background process attempting to read from tty ("in")',
    150: 'Background process attempting to write to tty ("out")',
    151: "Urgent data available on socket",
    152: "CPU time limit exceeded",
    153: "File size limit exceeded",
    154: 'Signal raised by timer counting virtual time: "virtual timer expired"',
    155: "Profiling timer expired",
    157: "Pollable event",
    159: "Bad syscall"
  }[exitCode || -1];
}
function errnoMessage(errno) {
  if (errno === void 0) {
    return "Unknown error";
  }
  return {
    0: "Success",
    1: "Not super-user",
    2: "No such file or directory",
    3: "No such process",
    4: "Interrupted system call",
    5: "I/O error",
    6: "No such device or address",
    7: "Arg list too long",
    8: "Exec format error",
    9: "Bad file number",
    10: "No children",
    11: "No more processes",
    12: "Not enough core",
    13: "Permission denied",
    14: "Bad address",
    15: "Block device required",
    16: "Mount device busy",
    17: "File exists",
    18: "Cross-device link",
    19: "No such device",
    20: "Not a directory",
    21: "Is a directory",
    22: "Invalid argument",
    23: "Too many open files in system",
    24: "Too many open files",
    25: "Not a typewriter",
    26: "Text file busy",
    27: "File too large",
    28: "No space left on device",
    29: "Illegal seek",
    30: "Read only file system",
    31: "Too many links",
    32: "Broken pipe",
    33: "Math arg out of domain of func",
    34: "Math result not representable",
    35: "File locking deadlock error",
    36: "File or path name too long",
    37: "No record locks available",
    38: "Function not implemented",
    39: "Directory not empty",
    40: "Too many symbolic links",
    42: "No message of desired type",
    43: "Identifier removed",
    44: "Channel number out of range",
    45: "Level 2 not synchronized",
    46: "Level 3 halted",
    47: "Level 3 reset",
    48: "Link number out of range",
    49: "Protocol driver not attached",
    50: "No CSI structure available",
    51: "Level 2 halted",
    52: "Invalid exchange",
    53: "Invalid request descriptor",
    54: "Exchange full",
    55: "No anode",
    56: "Invalid request code",
    57: "Invalid slot",
    59: "Bad font file fmt",
    60: "Device not a stream",
    61: "No data (for no delay io)",
    62: "Timer expired",
    63: "Out of streams resources",
    64: "Machine is not on the network",
    65: "Package not installed",
    66: "The object is remote",
    67: "The link has been severed",
    68: "Advertise error",
    69: "Srmount error",
    70: "Communication error on send",
    71: "Protocol error",
    72: "Multihop attempted",
    73: "Cross mount point (not really error)",
    74: "Trying to read unreadable message",
    75: "Value too large for defined data type",
    76: "Given log. name not unique",
    77: "f.d. invalid for this operation",
    78: "Remote address changed",
    79: "Can   access a needed shared lib",
    80: "Accessing a corrupted shared lib",
    81: ".lib section in a.out corrupted",
    82: "Attempting to link in too many libs",
    83: "Attempting to exec a shared library",
    84: "Illegal byte sequence",
    86: "Streams pipe error",
    87: "Too many users",
    88: "Socket operation on non-socket",
    89: "Destination address required",
    90: "Message too long",
    91: "Protocol wrong type for socket",
    92: "Protocol not available",
    93: "Unknown protocol",
    94: "Socket type not supported",
    95: "Not supported",
    96: "Protocol family not supported",
    97: "Address family not supported by protocol family",
    98: "Address already in use",
    99: "Address not available",
    100: "Network interface is not configured",
    101: "Network is unreachable",
    102: "Connection reset by network",
    103: "Connection aborted",
    104: "Connection reset by peer",
    105: "No buffer space available",
    106: "Socket is already connected",
    107: "Socket is not connected",
    108: "Can't send after socket shutdown",
    109: "Too many references",
    110: "Connection timed out",
    111: "Connection refused",
    112: "Host is down",
    113: "Host is unreachable",
    114: "Socket already connected",
    115: "Connection already in progress",
    116: "Stale file handle",
    122: "Quota exceeded",
    123: "No medium (in tape drive)",
    125: "Operation canceled",
    130: "Previous owner died",
    131: "State not recoverable"
  }[-errno] || "Unknown error";
}
function parseDuration(d2) {
  if (typeof d2 == "number") {
    if (isNaN(d2) || d2 < 0)
      throw new Error(`Invalid duration: "${d2}".`);
    return d2;
  } else if (/\d+s/.test(d2)) {
    return +d2.slice(0, -1) * 1e3;
  } else if (/\d+ms/.test(d2)) {
    return +d2.slice(0, -2);
  } else if (/\d+m/.test(d2)) {
    return +d2.slice(0, -1) * 1e3 * 60;
  }
  throw new Error(`Unknown duration: "${d2}".`);
}
function formatCmd(cmd) {
  if (cmd == void 0)
    return source_default.grey("undefined");
  const chars = [...cmd];
  let out = "$ ";
  let buf = "";
  let ch;
  let state = root;
  let wordCount = 0;
  while (state) {
    ch = chars.shift() || "EOF";
    if (ch == "\n") {
      out += style(state, buf) + "\n> ";
      buf = "";
      continue;
    }
    const next = ch == "EOF" ? void 0 : state();
    if (next != state) {
      out += style(state, buf);
      buf = "";
    }
    state = next == root ? next() : next;
    buf += ch;
  }
  function style(state2, s2) {
    if (s2 == "")
      return "";
    if (reservedWords.includes(s2)) {
      return source_default.cyanBright(s2);
    }
    if (state2 == word && wordCount == 0) {
      wordCount++;
      return source_default.greenBright(s2);
    }
    if (state2 == syntax) {
      wordCount = 0;
      return source_default.cyanBright(s2);
    }
    if (state2 == dollar)
      return source_default.yellowBright(s2);
    if (state2 == null ? void 0 : state2.name.startsWith("str"))
      return source_default.yellowBright(s2);
    return s2;
  }
  function isSyntax(ch2) {
    return "()[]{}<>;:+|&=".includes(ch2);
  }
  function root() {
    if (/\s/.test(ch))
      return space;
    if (isSyntax(ch))
      return syntax;
    if (/[$]/.test(ch))
      return dollar;
    if (/["]/.test(ch))
      return strDouble;
    if (/[']/.test(ch))
      return strSingle;
    return word;
  }
  function space() {
    if (/\s/.test(ch))
      return space;
    return root;
  }
  function word() {
    if (/[0-9a-z/_.]/i.test(ch))
      return word;
    return root;
  }
  function syntax() {
    if (isSyntax(ch))
      return syntax;
    return root;
  }
  function dollar() {
    if (/[']/.test(ch))
      return str;
    return root;
  }
  function str() {
    if (/[']/.test(ch))
      return strEnd;
    if (/[\\]/.test(ch))
      return strBackslash;
    return str;
  }
  function strBackslash() {
    return strEscape;
  }
  function strEscape() {
    return str;
  }
  function strDouble() {
    if (/["]/.test(ch))
      return strEnd;
    return strDouble;
  }
  function strSingle() {
    if (/[']/.test(ch))
      return strEnd;
    return strSingle;
  }
  function strEnd() {
    return root;
  }
  return out + "\n";
}
var reservedWords = [
  "if",
  "then",
  "else",
  "elif",
  "fi",
  "case",
  "esac",
  "for",
  "select",
  "while",
  "until",
  "do",
  "done",
  "in"
];
function getCallerLocation(err = new Error()) {
  return getCallerLocationFromString(err.stack);
}
function getCallerLocationFromString(stackString = "unknown") {
  var _a2;
  return ((_a2 = stackString.split(/^\s*(at\s)?/m).filter((s2) => s2 == null ? void 0 : s2.includes(":"))[2]) == null ? void 0 : _a2.trim()) || stackString;
}

// node_modules/zx/build/core.js
var processCwd = Symbol("processCwd");
var syncExec = Symbol("syncExec");
var storage = new AsyncLocalStorage();
var cwdSyncHook = createHook({
  init: syncCwd,
  before: syncCwd,
  promiseResolve: syncCwd,
  after: syncCwd,
  destroy: syncCwd
});
var defaults = {
  [processCwd]: process.cwd(),
  [syncExec]: false,
  verbose: false,
  env: process.env,
  sync: false,
  shell: true,
  stdio: ["inherit", "pipe", "pipe"],
  nothrow: false,
  quiet: false,
  prefix: "",
  postfix: "",
  quote: noquote,
  spawn: spawn3,
  spawnSync: spawnSync3,
  log,
  kill: kill2
};
var isWin = process.platform == "win32";
function useBash() {
  $4.shell = export_which.sync("bash");
  $4.prefix = "set -euo pipefail;";
  $4.quote = quote;
}
function checkShell() {
  if (!$4.shell) {
    throw new Error(`shell is not available: setup guide goes here`);
  }
}
function getStore() {
  return storage.getStore() || defaults;
}
var $4 = new Proxy(
  function(pieces, ...args) {
    checkShell();
    if (!Array.isArray(pieces)) {
      return function(...args2) {
        const self2 = this;
        return within(() => {
          return Object.assign($4, pieces).apply(self2, args2);
        });
      };
    }
    const from = getCallerLocation();
    if (pieces.some((p) => p == void 0)) {
      throw new Error(`Malformed command at ${from}`);
    }
    let resolve, reject;
    const promise = new ProcessPromise((...args2) => [resolve, reject] = args2);
    const cmd = buildCmd(
      $4.quote,
      pieces,
      args
    );
    const snapshot = getStore();
    const sync = snapshot[syncExec];
    const callback = () => promise.isHalted || promise.run();
    promise._bind(
      cmd,
      from,
      resolve,
      (v2) => {
        reject(v2);
        if (sync)
          throw v2;
      },
      snapshot
    );
    sync ? callback() : setImmediate(callback);
    return sync ? promise.output : promise;
  },
  {
    set(_, key, value) {
      const target = key in Function.prototype ? _ : getStore();
      Reflect.set(target, key === "sync" ? syncExec : key, value);
      return true;
    },
    get(_, key) {
      if (key === "sync")
        return $4({ sync: true });
      const target = key in Function.prototype ? _ : getStore();
      return Reflect.get(target, key);
    }
  }
);
try {
  useBash();
} catch (err) {
}
var ProcessPromise = class _ProcessPromise extends Promise {
  constructor() {
    super(...arguments);
    this._command = "";
    this._from = "";
    this._resolve = noop5;
    this._reject = noop5;
    this._snapshot = getStore();
    this._timeoutSignal = "SIGTERM";
    this._resolved = false;
    this._halted = false;
    this._piped = false;
    this._zurk = null;
    this._output = null;
    this._prerun = noop5;
    this._postrun = noop5;
  }
  _bind(cmd, from, resolve, reject, options) {
    this._command = cmd;
    this._from = from;
    this._resolve = resolve;
    this._reject = reject;
    this._snapshot = { ...options };
  }
  run() {
    var _a2;
    if (this.child)
      return this;
    this._prerun();
    const $22 = this._snapshot;
    const self2 = this;
    const input = ((_a2 = $22.input) == null ? void 0 : _a2.stdout) ?? $22.input;
    if (input)
      this.stdio("pipe");
    $22.log({
      kind: "cmd",
      cmd: this._command,
      verbose: self2.isVerbose()
    });
    this._zurk = exec({
      input,
      cmd: $22.prefix + self2._command + $22.postfix,
      cwd: $22.cwd ?? $22[processCwd],
      ac: $22.ac,
      signal: $22.signal,
      shell: typeof $22.shell === "string" ? $22.shell : true,
      env: $22.env,
      spawn: $22.spawn,
      spawnSync: $22.spawnSync,
      stdio: self2._stdio ?? $22.stdio,
      sync: $22[syncExec],
      detached: !isWin,
      run: (cb) => cb(),
      on: {
        start: () => {
          if (self2._timeout) {
            const t4 = setTimeout(
              () => self2.kill(self2._timeoutSignal),
              self2._timeout
            );
            self2.finally(() => clearTimeout(t4)).catch(noop5);
          }
        },
        stdout: (data) => {
          if (self2._piped)
            return;
          $22.log({ kind: "stdout", data, verbose: self2.isVerbose() });
        },
        stderr: (data) => {
          $22.log({ kind: "stderr", data, verbose: !self2.isQuiet() });
        },
        end: ({ error, stdout, stderr, stdall, status, signal }) => {
          self2._resolved = true;
          if (error) {
            const message = ProcessOutput.getErrorMessage(error, self2._from);
            const output = new ProcessOutput(
              null,
              null,
              stdout,
              stderr,
              stdall,
              message
            );
            self2._output = output;
            self2._reject(output);
          } else {
            const message = ProcessOutput.getExitMessage(
              status,
              signal,
              stderr,
              self2._from
            );
            const output = new ProcessOutput(
              status,
              signal,
              stdout,
              stderr,
              stdall,
              message
            );
            self2._output = output;
            if (status === 0 || (self2._nothrow ?? $22.nothrow)) {
              self2._resolve(output);
            } else {
              self2._reject(output);
            }
          }
        }
      }
    });
    this._postrun();
    return this;
  }
  get child() {
    var _a2;
    return (_a2 = this._zurk) == null ? void 0 : _a2.child;
  }
  get stdin() {
    this.stdio("pipe");
    this.run();
    assert(this.child);
    if (this.child.stdin == null)
      throw new Error("The stdin of subprocess is null.");
    return this.child.stdin;
  }
  get stdout() {
    this.run();
    assert(this.child);
    if (this.child.stdout == null)
      throw new Error("The stdout of subprocess is null.");
    return this.child.stdout;
  }
  get stderr() {
    this.run();
    assert(this.child);
    if (this.child.stderr == null)
      throw new Error("The stderr of subprocess is null.");
    return this.child.stderr;
  }
  get exitCode() {
    return this.then(
      (p) => p.exitCode,
      (p) => p.exitCode
    );
  }
  then(onfulfilled, onrejected) {
    if (this.isHalted && !this.child) {
      throw new Error("The process is halted!");
    }
    return super.then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return super.catch(onrejected);
  }
  pipe(dest) {
    if (typeof dest == "string")
      throw new Error("The pipe() method does not take strings. Forgot $?");
    if (this._resolved) {
      if (dest instanceof _ProcessPromise)
        dest.stdin.end();
      throw new Error(
        "The pipe() method shouldn't be called after promise is already resolved!"
      );
    }
    this._piped = true;
    if (dest instanceof _ProcessPromise) {
      dest.stdio("pipe");
      dest._prerun = this.run.bind(this);
      dest._postrun = () => {
        if (!dest.child)
          throw new Error(
            "Access to stdin of pipe destination without creation a subprocess."
          );
        this.stdout.pipe(dest.stdin);
      };
      return dest;
    } else {
      this._postrun = () => this.stdout.pipe(dest);
      return this;
    }
  }
  abort(reason) {
    var _a2;
    if (!this.child)
      throw new Error("Trying to abort a process without creating one.");
    (_a2 = this._zurk) == null ? void 0 : _a2.ac.abort(reason);
  }
  async kill(signal = "SIGTERM") {
    if (!this.child)
      throw new Error("Trying to kill a process without creating one.");
    if (!this.child.pid)
      throw new Error("The process pid is undefined.");
    return $4.kill(this.child.pid, signal);
  }
  stdio(stdin, stdout = "pipe", stderr = "pipe") {
    this._stdio = [stdin, stdout, stderr];
    return this;
  }
  nothrow() {
    this._nothrow = true;
    return this;
  }
  quiet() {
    this._quiet = true;
    return this;
  }
  isQuiet() {
    return this._quiet ?? this._snapshot.quiet;
  }
  isVerbose() {
    return this._snapshot.verbose && !this.isQuiet();
  }
  timeout(d2, signal = "SIGTERM") {
    this._timeout = parseDuration(d2);
    this._timeoutSignal = signal;
    return this;
  }
  halt() {
    this._halted = true;
    return this;
  }
  get isHalted() {
    return this._halted;
  }
  get output() {
    return this._output;
  }
};
var ProcessOutput = class extends Error {
  constructor(code, signal, stdout, stderr, combined, message) {
    super(message);
    this._code = code;
    this._signal = signal;
    this._stdout = stdout;
    this._stderr = stderr;
    this._combined = combined;
  }
  toString() {
    return this._combined;
  }
  valueOf() {
    return this._combined.trim();
  }
  get stdout() {
    return this._stdout;
  }
  get stderr() {
    return this._stderr;
  }
  get exitCode() {
    return this._code;
  }
  get signal() {
    return this._signal;
  }
  static getExitMessage(code, signal, stderr, from) {
    let message = `exit code: ${code}`;
    if (code != 0 || signal != null) {
      message = `${stderr || "\n"}    at ${from}`;
      message += `
    exit code: ${code}${exitCodeInfo(code) ? " (" + exitCodeInfo(code) + ")" : ""}`;
      if (signal != null) {
        message += `
    signal: ${signal}`;
      }
    }
    return message;
  }
  static getErrorMessage(err, from) {
    return `${err.message}
    errno: ${err.errno} (${errnoMessage(err.errno)})
    code: ${err.code}
    at ${from}`;
  }
  [inspect.custom]() {
    let stringify = (s2, c) => s2.length === 0 ? "''" : c(inspect(s2));
    return `ProcessOutput {
  stdout: ${stringify(this.stdout, source_default.green)},
  stderr: ${stringify(this.stderr, source_default.red)},
  signal: ${inspect(this.signal)},
  exitCode: ${(this.exitCode === 0 ? source_default.green : source_default.red)(this.exitCode)}${exitCodeInfo(this.exitCode) ? source_default.grey(" (" + exitCodeInfo(this.exitCode) + ")") : ""}
}`;
  }
};
function within(callback) {
  return storage.run({ ...getStore() }, callback);
}
function syncCwd() {
  if ($4[processCwd] != process.cwd())
    process.chdir($4[processCwd]);
}
function cd(dir) {
  if (dir instanceof ProcessOutput) {
    dir = dir.toString().trim();
  }
  $4.log({ kind: "cd", dir });
  process.chdir(dir);
  $4[processCwd] = process.cwd();
}
async function kill2(pid, signal) {
  let children = await ts_default.tree({ pid, recursive: true });
  for (const p of children) {
    try {
      process.kill(+p.pid, signal);
    } catch (e) {
    }
  }
  try {
    process.kill(-pid, signal);
  } catch (e) {
    try {
      process.kill(+pid, signal);
    } catch (e2) {
    }
  }
}
function log(entry) {
  switch (entry.kind) {
    case "cmd":
      if (!entry.verbose)
        return;
      process.stderr.write(formatCmd(entry.cmd));
      break;
    case "stdout":
    case "stderr":
      if (!entry.verbose)
        return;
      process.stderr.write(entry.data);
      break;
    case "cd":
      if (!$4.verbose)
        return;
      process.stderr.write("$ " + source_default.greenBright("cd") + ` ${entry.dir}
`);
      break;
    case "fetch":
      if (!$4.verbose)
        return;
      const init = entry.init ? " " + inspect(entry.init) : "";
      process.stderr.write(
        "$ " + source_default.greenBright("fetch") + ` ${entry.url}${init}
`
      );
      break;
    case "retry":
      if (!$4.verbose)
        return;
      process.stderr.write(entry.error + "\n");
  }
}

// node_modules/zx/build/goods.js
import { createInterface } from "node:readline";
import { default as default2 } from "node:path";
import * as os2 from "node:os";
var argv = export_minimist(process.argv.slice(2));
var globby2 = Object.assign(function globby22(patterns, options) {
  return globbyModule.globby(patterns, options);
}, globbyModule);
var glob = globby2;
async function fetch2(url, init) {
  $4.log({ kind: "fetch", url, init });
  return s(url, init);
}
async function question(query, options) {
  let completer = void 0;
  if (options && Array.isArray(options.choices)) {
    completer = function completer2(line) {
      const completions = options.choices;
      const hits = completions.filter((c) => c.startsWith(line));
      return [hits.length ? hits : completions, line];
    };
  }
  const rl2 = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
    completer
  });
  return new Promise(
    (resolve) => rl2.question(query ?? "", (answer) => {
      rl2.close();
      resolve(answer);
    })
  );
}

// src/model/constants.ts
$4.verbose = false;
var flags = {
  restart: 0
};
var steamBlockList = ["228980", "1391110", "1161040", "1826330"];
var steamProtonList = ["1580130", "1493710", "1887720", "1420170"];
var gpuVersion = $4`lspci | grep VGA`;
var userPath = os2.homedir + "/.local/share/Hist";
var appsPath = os2.homedir + "/.local/share/applications/HLU";
var dirsPath = os2.homedir + "/.local/share/desktop-directories";
var menusPath = os2.homedir + "/.config/menus/applications-merged";
var globalAppsPath = os2.homedir + "/.local/share/applications/";
var scriptsPath = userPath + "/Scripts";
var iconsPath = userPath + "/Icons";
var packagesPath = userPath + "/Packages";
var releasesPath = userPath + "/Packages/Releases";
var historyPath = userPath + "/.history";
var logsPath = userPath + "/.logs";
var protonPath = userPath + "/.proton";
if (!fs5.existsSync(userPath + "/prefixes.json")) {
  fs5.outputJsonSync(
    userPath + "/prefixes.json",
    {
      wine: [
        {
          name: "Default",
          path: os2.homedir + "/.wine"
        }
      ],
      proton: [
        {
          name: "Default",
          path: protonPath
        }
      ]
    },
    {
      spaces: 2
    }
  );
}
if (!fs5.existsSync(userPath + "/runners.json")) {
  fs5.outputJsonSync(
    userPath + "/runners.json",
    {
      wine: [
        {
          name: "Default",
          path: "/usr/bin/wine"
        }
      ],
      proton: []
    },
    {
      spaces: 2
    }
  );
}
var wineList = {
  prefixes: fs5.readJsonSync(userPath + "/prefixes.json").wine,
  runners: fs5.readJsonSync(userPath + "/runners.json").wine
};
var protonList = {
  prefixes: fs5.readJsonSync(userPath + "/prefixes.json").proton,
  runners: fs5.readJsonSync(userPath + "/runners.json").proton
};
var steamApps = {
  wine: [],
  native: [],
  protonBuilds: [],
  blockList: []
};
var retroarchCores = [];
var prefixCommands = [
  {
    name: "Wine config",
    command: "winecfg"
  },
  {
    name: "Control panel",
    command: "control"
  },
  {
    name: "Task manager",
    command: "taskmgr"
  },
  {
    name: "Explorer",
    command: "explorer"
  },
  {
    name: "Install/Uninstall apps",
    command: "uninstaller"
  },
  {
    name: "Registry editor",
    command: "regedit"
  },
  {
    name: "Kill running apps",
    command: "wineserver -k"
  },
  {
    name: "Force kill running apps",
    command: "wineserver -k9"
  },
  {
    name: "Custom command",
    command: "input value"
  }
];

// src/utils/input.ts
var generalInput = async ({
  qstring,
  hfile,
  def,
  text
}) => {
  const choices = [];
  let historyString = "";
  if (def) {
    choices.push(def);
  }
  if (hfile) {
    if (fs5.existsSync(historyPath + "/" + hfile) && fs5.statSync(historyPath + "/" + hfile).size != 0) {
      for (let item of fs5.readFileSync(historyPath + "/" + hfile, {
        encoding: "utf8",
        flag: "r"
      }).split("\n")) {
        choices.push(item);
      }
    } else {
      await $4`touch ${historyPath}/${hfile}`;
    }
    if (choices.length) {
      historyString = ' (press "' + source_default.cyan("Tab") + '" for ' + source_default.green("history") + " or " + source_default.green("default") + ")";
    }
  }
  if (text) {
    console.log(text);
  }
  let answer = await question(qstring + historyString + ": ", {
    choices
  });
  if (hfile) {
    if (answer != def) {
      if (fs5.statSync(historyPath + "/" + hfile).size != 0) {
        if (!choices.includes(answer)) {
          fs5.appendFileSync(historyPath + "/" + hfile, "\n" + answer);
        }
      } else {
        fs5.appendFileSync(historyPath + "/" + hfile, answer);
      }
    }
  }
  return answer;
};

// src/utils/exit.ts
import { spawnSync as spawnSync4 } from "child_process";
var scriptExit = async () => {
  switch (await generalInput({
    qstring: "Restart " + source_default.green("HLU") + " ? " + source_default.cyan("y|N")
  })) {
    case "y":
    case "Y":
      const argv2 = process.argv;
      flags.restart = 1;
      spawnSync4(argv2[0], argv2.slice(1), {
        cwd: process.cwd(),
        stdio: "inherit"
      });
    case "n":
    case "N":
    case "":
    case " ":
      process.exit(1);
    default:
      await scriptExit();
  }
};

// src/utils/list.ts
var listSelector = async ({
  items,
  name,
  descriptions,
  values,
  options
}) => {
  const listOutput = ["\n" + source_default.bold.magenta(name) + "\n"];
  const listDescriptions = (descriptions == null ? void 0 : descriptions.map((description) => " - " + source_default.blue(description))) || [];
  const listValues = (values == null ? void 0 : values.map((value) => " - (" + source_default.cyan(value) + ")")) || [];
  items.forEach(
    (item, index) => listOutput.push(
      " " + source_default.cyan(index + 1) + (listValues[index] || "") + " - " + source_default.green(item) + (listDescriptions[index] || "")
    )
  );
  while (true) {
    listOutput.forEach((element) => console.log(element));
    let answer = await question(
      "\nChoose " + source_default.cyan("item") + " from the " + source_default.green("list") + " above (" + source_default.cyan("q|Q") + " for " + source_default.green("exit") + "): "
    );
    switch (answer) {
      case "q":
      case "Q":
        if (options == null ? void 0 : options.includes("continue")) {
          return 0;
        } else {
          await scriptExit();
        }
      default:
        if (!isNaN(+answer)) {
          if (+answer <= items.length && +answer > 0) {
            return answer;
          }
        }
    }
  }
};
var steamListInit = async () => {
  var _a2, _b2;
  const libraries = [];
  const appmanifests = [];
  const paths = [
    os2.homedir + "/.steam/",
    os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/"
  ];
  for (let path2 of paths) {
    if (fs5.existsSync(path2)) {
      let temp = await $4`echo $(grep path ${path2}root/steamapps/libraryfolders.vdf | cut -d'"' -f4) | tr -d '\n'`;
      for (let item of temp.stdout.split(" ")) {
        libraries.push(item);
      }
      for (let item of libraries) {
        if (fs5.existsSync(item)) {
          for (let item2 of await globby2(item, {
            expandDirectories: { files: ["appmanifest_*"] },
            deep: 2
          })) {
            !appmanifests.includes(item2) && appmanifests.push(item2);
          }
        }
      }
    }
  }
  for (let item of appmanifests) {
    const appid = await $4`echo $(grep '"appid"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const nameOutput = await $4`echo $(grep '"name"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const name = nameOutput.stdout.replace(" \\", "");
    const installPath = await $4`echo $(grep '"installdir"' ${item} | cut -d'"' -f4) | tr -d '\n'`;
    const dirname = await $4`dirname ${item} | tr -d '\n'`;
    if (steamBlockList.includes(appid.stdout)) {
      steamApps.blockList.push({
        name,
        appId: appid.stdout
      });
    } else if (steamProtonList.includes(appid.stdout)) {
      steamApps.protonBuilds.push({
        name,
        appId: appid.stdout,
        path: dirname.stdout + "/common/" + installPath.stdout + "/proton"
      });
    } else {
      if (fs5.existsSync(dirname.stdout + "/compatdata/" + appid.stdout + "/pfx")) {
        steamApps.wine.push({
          name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout,
          prefix: dirname.stdout + "/compatdata/" + appid.stdout
        });
      } else {
        steamApps.native.push({
          name,
          appId: appid.stdout,
          path: dirname.stdout + "/common/" + installPath.stdout
        });
      }
    }
  }
  if (fs5.existsSync("/usr/share/steam/compatibilitytools.d/")) {
    const tools = await globby2(
      "/usr/share/steam/compatibilitytools.d/",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: default2.basename(default2.dirname(tool)),
        path: tool
      });
    }
  }
  if (fs5.existsSync(os2.homedir + "/.steam/root/compatibilitytools.d")) {
    const tools = await globby2(
      os2.homedir + "/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: default2.basename(default2.dirname(tool)),
        path: tool
      });
    }
  }
  if (fs5.existsSync(
    os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d"
  )) {
    const tools = await globby2(
      os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/root/compatibilitytools.d",
      {
        expandDirectories: { files: ["proton"] },
        deep: 2
      }
    );
    for (let tool of tools) {
      steamApps.protonBuilds.push({
        name: default2.basename(default2.dirname(tool)),
        path: tool
      });
    }
  }
  for (let app of steamApps.wine) {
    !!app.prefix && ((_a2 = protonList.prefixes) == null ? void 0 : _a2.push({
      name: app.name,
      path: app.prefix
    }));
  }
  for (let app of steamApps.protonBuilds) {
    !!app.path && ((_b2 = protonList.runners) == null ? void 0 : _b2.push({
      name: app.name,
      path: app.path
    }));
  }
};
var retroarchListInit = async () => {
  const cwd2 = process.cwd();
  let coreName;
  const getName = (infoPath) => {
    if (fs5.existsSync(infoPath)) {
      for (let line of fs5.readFileSync(infoPath, { encoding: "utf-8" }).split("\\n")) {
        if (line.includes("display_name")) {
          return line.split('"')[1];
        }
      }
    } else {
      return default2.basename(infoPath, ".info");
    }
  };
  const coresInit = async (coresPath, infoPath) => {
    if (fs5.existsSync(coresPath)) {
      cd(coresPath);
      const cores = await globby2(coresPath, {
        expandDirectories: { extensions: ["so"] },
        absolute: true
      });
      cores == null ? void 0 : cores.forEach((item) => {
        if (infoPath) {
          coreName = getName(
            item.replace(coresPath, infoPath).replace(".so", ".info")
          );
        } else {
          coreName = getName(item.replace(".so", ".info"));
        }
        !!coreName && retroarchCores.push({
          name: coreName,
          path: item
        });
      });
    }
  };
  await coresInit(os2.homedir + "/.config/retroarch/cores");
  await coresInit(
    os2.homedir + "/.var/app/org.libretro.RetroArch/config/retroarch/cores",
    "/var/lib/flatpak/app/org.libretro.RetroArch/current/19bc2de02efb8da5e2bea76f858cce45b1b20b11a2e134c462f22db0eba59d4f/files/share/libretro/info"
  );
  await coresInit("/usr/lib/libretro", "/usr/share/libretro/info");
  cd(cwd2);
};

// src/utils/legendary.ts
$4.verbose = false;
var getLegendaryList = async ({ type, isFull }) => {
  const apps = [];
  let appsJson;
  switch (type) {
    case "all":
      appsJson = await $4`legendary list --json`;
      break;
    case "installed":
      appsJson = await $4`legendary list-installed --json`;
      break;
  }
  appsJson = JSON.parse(appsJson.stdout);
  for (let app2 of appsJson) {
    apps.push({
      name: app2.app_title,
      id: app2.app_name
    });
  }
  const app = apps[+await listSelector({
    name: "EGS Games",
    items: apps.map((app2) => app2.name),
    descriptions: apps.map((app2) => app2.name)
  }) - 1];
  return isFull ? app : app.id;
};
var legendaryHelper = async () => {
  if (fs5.existsSync("/usr/local/bin/legendary") || fs5.existsSync("/usr/bin/legendary")) {
    switch (fs5.existsSync(os2.homedir + "/.config/legendary/user.json")) {
      case false:
        switch (await generalInput({
          qstring: source_default.green("Sign in") + " ? " + source_default.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await verboseBash(`legendary auth`);
          default:
            break;
        }
      case true:
        if (fs5.existsSync(os2.homedir + "/.config/legendary/user.json")) {
          switch (await listSelector({
            name: "Legendary Helper",
            items: [
              "Sign out",
              "Import game",
              "Install game",
              "Verify game",
              "Repair game",
              "Update game",
              "Move game",
              "Uninstall game",
              "Check updates",
              "Upload cloud saves",
              "Fix cloud saves",
              "Game info",
              "Install EOS-Overlay",
              "Update EOS-Overlay",
              "Remove EOS-Overlay"
            ]
          })) {
            case "1":
              await verboseBash(`legendary auth --delete`);
              break;
            case "2":
              await verboseBash(
                `legendary import ${await getLegendaryList({
                  type: "all"
                })} "${await generalInput({
                  qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("game"),
                  hfile: "legendary_paths"
                })}"`
              );
              break;
            case "3":
              await verboseBash(
                `legendary install --base-path "${await generalInput({
                  qstring: "Enter " + source_default.cyan("path") + " where the " + source_default.green("game") + " will be installed",
                  hfile: "legendary_paths"
                })}" ${await getLegendaryList({ type: "all" })}`
              );
              break;
            case "4":
              await verboseBash(
                `legendary verify ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "5":
              await verboseBash(
                `legendary repair ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "6":
              await verboseBash(
                `legendary update ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "7":
              await verboseBash(
                `legendary move ${await getLegendaryList({
                  type: "installed"
                })} "${await generalInput({
                  qstring: "Enter " + source_default.cyan("path") + " where the " + source_default.green("game") + " will be moved",
                  hfile: "legendary_paths"
                })}"`
              );
              break;
            case "8":
              await verboseBash(
                `legendary uninstall ${await getLegendaryList({
                  type: "installed"
                })}`
              );
              break;
            case "9":
              await verboseBash(`legendary list-installed --check-updates`);
              break;
            case "10":
              await verboseBash(
                `legendary sync-saves --skip-download --disable-filters`
              );
              break;
            case "11":
              await verboseBash(`legendary clean-saves --delete-incomplete`);
              break;
            case "12":
              await verboseBash(
                `legendary info ${await getLegendaryList({ type: "all" })}`
              );
              break;
            case "13":
              await verboseBash(
                `legendary eos-overlay install --path "${await generalInput({
                  qstring: "Enter " + source_default.cyan("path") + " where the " + source_default.green("eos-overlay") + " will be installed",
                  hfile: "legendary_paths"
                })}/.overlay"`
              );
              break;
            case "14":
              await verboseBash(`legendary eos-overlay update`);
              break;
            case "15":
              await verboseBash(`legendary eos-overlay remove`);
              break;
          }
        }
    }
  } else {
    console.log(source_default.green("Legendary") + " " + source_default.cyan("not installed!"));
  }
};

// src/utils/selector.ts
var generalSelector = async ({
  type,
  subType,
  list
}) => {
  const selectedList = subType === "proton" ? protonList : wineList;
  switch (type) {
    case "launchers":
      if (!!list) {
        const index = +await listSelector({
          name: "Launchers",
          items: list.map((item) => item.name || "")
        }) - 1;
        return `${index}///${JSON.stringify(list[index])}`;
      }
    case "prefixes":
    case "runners":
      return selectedList[type][+await listSelector({
        name: "Prefixes",
        items: selectedList[type].map((element) => element.name),
        descriptions: selectedList[type].map((element) => element.path)
      }) - 1].path;
    case "prefix commands":
      return prefixCommands[+await listSelector({
        name: "Prefix Commands",
        items: prefixCommands.map((command) => command.name),
        descriptions: prefixCommands.map((command) => command.command)
      }) - 1].command;
    case "git releases":
      return list[+await listSelector({
        name: "Git Releases",
        items: list.map((element) => element.name),
        descriptions: list.map((element) => element.url)
      }) - 1].url;
    case "retroarch cores":
      return retroarchCores[+await listSelector({
        name: "Retroarch Cores",
        items: retroarchCores.map((core) => core.name),
        descriptions: retroarchCores.map((core) => core.path)
      }) - 1].path;
  }
  return "";
};

// src/utils/settings.ts
var settingsInit = async ({ launcher, settings }) => {
  var _a2, _b2, _c, _d, _e, _f, _g;
  let menu;
  let item;
  let input;
  let selected;
  let limit;
  while (menu != "0") {
    menu = await listSelector({
      name: "Settings",
      items: settings.map((option) => option.name),
      options: ["continue"]
    });
    if (menu != 0) {
      do {
        item = await listSelector({
          name: settings[+menu - 1].name,
          items: settings[+menu - 1].settings.map((option) => option.name),
          values: settings[+menu - 1].settings.map(
            (option) => option.value || ""
          ),
          options: ["continue"]
        });
        if (item != "0") {
          limit = 0;
          selected = settings[+menu - 1].settings[+item - 1];
          if ((_a2 = selected.limitation) == null ? void 0 : _a2.file) {
            for (let item2 of selected.limitation.file) {
              if (fs5.existsSync(item2)) {
                limit = 1;
              }
            }
            if (limit == 0) {
              console.log(
                "\n" + source_default.green(selected.limitation.file) + source_default.red(" not installed!")
              );
            }
          } else if ((_b2 = selected.limitation) == null ? void 0 : _b2.launcher) {
            if (selected.limitation.launcher.includes(launcher.info.type) || selected.limitation.launcher.includes(
              launcher.info.runnerType
            )) {
              limit = 1;
            } else {
              console.log(
                "\nOnly for " + source_default.green(selected.limitation.launcher.join(","))
              );
            }
          } else if ((_c = selected.limitation) == null ? void 0 : _c.video) {
            const gpu = await gpuVersion;
            if (selected.limitation.video.some(
              (element) => gpu.stdout.includes(element)
            )) {
              limit = 1;
            } else {
              console.log(
                "\nOnly for " + source_default.green(selected.limitation.video)
              );
            }
          } else {
            limit = 1;
          }
          if (limit == 1) {
            if ((_d = selected.exampleValue) == null ? void 0 : _d.includes("input_value")) {
              const colors = {
                cyan: "\x1B[36m",
                green: "\x1B[32m",
                zero: "\x1B[0m"
              };
              input = await generalInput({
                qstring: (_e = selected.text) == null ? void 0 : _e.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero),
                hfile: selected.name.replace(/ /g, "_"),
                def: selected.defaultValue,
                text: (_f = selected.additionalText) == null ? void 0 : _f.replace(/cyan_/g, colors.cyan).replace(/green_/g, colors.green).replace(/_end/g, colors.zero)
              });
              if (input != "") {
                settings[+menu - 1].settings[+item - 1].value = selected.exampleValue.replace("input_value", input).replace(
                  "launcher_name",
                  ((_g = launcher.name) == null ? void 0 : _g.replace(/ /g, "_")) || ""
                );
              } else {
                settings[+menu - 1].settings[+item - 1].value = "";
              }
            } else {
              if (!settings[+menu - 1].settings[+item - 1].value) {
                settings[+menu - 1].settings[+item - 1].value = selected.exampleValue;
              } else {
                settings[+menu - 1].settings[+item - 1].value = "";
              }
            }
          }
        }
      } while (item != "0");
    }
  }
  return settings;
};

// src/utils/launcher/launcherInit.ts
var launcherInit = async (type) => {
  var _a2;
  const launcher = {
    name: "",
    info: {
      type
    }
  };
  let settings;
  let launchers;
  let launcher_settings = [];
  switch (type) {
    case "wine":
    case "proton":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: type
      });
      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: type
      });
      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("app") + " folder or " + source_default.cyan("full path") + " to the " + source_default.green("executable") + " file",
          hfile: "exec_paths"
        }),
        ext: ["exe"]
      });
      launcher.name = await generalInput({
        qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("launcher"),
        hfile: "launcher_names",
        def: default2.basename(launcher.info.exec, ".exe")
      });
      break;
    case "linux":
      launcher.info.exec = await getExecutable({
        location: await generalInput({
          qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("app") + " folder or " + source_default.cyan("full path") + " to the " + source_default.green("executable") + " file",
          hfile: "exec_paths"
        })
      });
      launcher.name = await generalInput({
        qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("launcher"),
        hfile: "launcher_names",
        def: default2.basename(launcher.info.exec)
      });
      break;
    case "legendary":
      switch (await listSelector({
        name: "Runner Type",
        items: ["Wine", "Proton"]
      })) {
        case "1":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type
          });
          launcher.info.runnerType = "wine";
          launcher.info.userPath = "/drive_c/users";
          break;
        case "2":
          launcher.info.prefix = await generalSelector({
            type: "prefixes",
            subType: type
          });
          launcher.info.runner = await generalSelector({
            type: "runners",
            subType: type
          });
          launcher.info.runnerType = "proton";
          launcher.info.userPath = "/pfx/drive_c/users";
      }
      const egsApp = await getLegendaryList({
        type: "installed",
        isFull: true
      });
      launcher.name = egsApp.name;
      launcher.info.id = egsApp.id;
      if (!!launcher.info.prefix && !!launcher.info.userPath && fs5.existsSync(
        launcher.info.prefix + launcher.info.userPath + "/steamuser"
      ) && launcher.info.runnerType == "wine") {
        const users = [os2.userInfo().username, "steamuser"];
        launcher.info.userPath = launcher.info.userPath + "/" + users[+await listSelector({
          name: "User name for cloud saves",
          items: users
        }) - 1];
      } else if (launcher.info.runnerType == "proton") {
        launcher.info.userPath = launcher.info.userPath + "/steamuser";
      } else {
        launcher.info.userPath = launcher.info.userPath + "/" + os2.userInfo().username;
      }
      const egsUserInfo = fs5.readJsonSync(
        os2.homedir + "/.config/legendary/user.json"
      );
      let egsAppInfo = await $4`legendary info ${launcher.info.id} --json`;
      let egsEosInfo = await $4`legendary eos-overlay info`;
      if (!egsEosInfo.stderr.includes("No Legendary-managed installation found")) {
        switch (await generalInput({
          qstring: "Install " + source_default.green("EOS-Overlay") + "? " + source_default.cyan("y|N")
        })) {
          case "y":
          case "Y":
            launcher.info.runnerType == "wine" ? await verboseBash(
              `legendary eos-overlay enable --prefix "${launcher.info.prefix}"`
            ) : await verboseBash(
              `legendary eos-overlay enable --prefix "${launcher.info.prefix}/pfx"`
            );
            break;
        }
      }
      egsAppInfo = JSON.parse(egsAppInfo.stdout);
      if (egsAppInfo.game.cloud_saves_supported == true) {
        launcher.info.savePath = egsAppInfo.game.cloud_save_folder.replace(
          "{AppData}",
          launcher.info.prefix + launcher.info.userPath + "/AppData/Local"
        ).replace(
          "{UserSavedGames}",
          launcher.info.prefix + launcher.info.userPath + "/Saved Games"
        ).replace(
          "{UserDir}",
          launcher.info.prefix + launcher.info.userPath + "/Documents"
        ).replace("{InstallDir}", (_a2 = egsAppInfo.install) == null ? void 0 : _a2.install_path).replace("{EpicID}", egsUserInfo.account_id);
      }
      break;
    case "retroarch":
      const retroarchNative = await $4`echo $(command -v retroarch)`;
      const retroarchFlatpak = await $4`echo $(command -v org.libretro.RetroArch)`;
      const retroarchNativeExec = retroarchNative.stdout != "/n" ? retroarchNative.stdout.trim() : null;
      const retroarchFlatpakExec = retroarchFlatpak.stdout != "/n" ? retroarchFlatpak.stdout.trim() : null;
      if (retroarchNativeExec && retroarchFlatpakExec) {
        const retroarchType = await listSelector({
          name: "Retroarch executable",
          items: ["Native", "Flatpak"]
        });
        switch (retroarchType) {
          case "1":
            launcher.info.executable = "retroarch";
            break;
          case "2":
            launcher.info.executable = "org.libretro.RetroArch";
            break;
        }
      } else if (retroarchNativeExec && !retroarchFlatpakExec) {
        launcher.info.executable = "retroarch";
      } else if (!retroarchNativeExec && retroarchFlatpakExec) {
        launcher.info.executable = "org.libretro.RetroArch";
      }
      launcher.info.core = await generalSelector({ type: "retroarch cores" });
      launcher.info.rom = await generalInput({
        qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("ROM") + " (Example: " + source_default.cyan("/folder/with/rom/ROM.extension") + ")"
      });
      launcher.name = await generalInput({
        qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("launcher"),
        hfile: "launcher_names",
        def: default2.basename(launcher.info.rom)
      });
  }
  launcher.info.category = await generalInput({
    qstring: "Enter " + source_default.cyan("category") + " of the " + source_default.green("launcher") + " (Default: " + source_default.cyan("General") + ")",
    hfile: "launcher_categories"
  });
  if (!launcher.info.category) {
    launcher.info.category = "General";
  }
  settings = await settingsInit({
    launcher,
    settings: fs5.readJsonSync(userPath + "/settings.json")
  });
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcher_settings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value
        });
      }
    }
  }
  if (fs5.existsSync(userPath + "/launchers.json")) {
    launchers = fs5.readJsonSync(userPath + "/launchers.json");
    for (let i in launchers) {
      if (launchers[i].name == launcher.name) {
        launchers.splice(i, 1);
      }
    }
    launchers.push({
      name: launcher.name,
      info: launcher.info,
      settings: launcher_settings
    });
    fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2
    });
  } else {
    launchers = [
      {
        name: launcher.name,
        info: launcher.info,
        settings: launcher_settings
      }
    ];
    fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
      spaces: 2
    });
  }
};

// src/utils/launcher/getLaunchers.ts
var getLaunchers = () => {
  return fs5.readJsonSync(userPath + "/launchers.json").slice(0).filter((launcher) => !!launcher.name).sort((a2, b) => {
    var _a2;
    return (_a2 = a2.name) == null ? void 0 : _a2.localeCompare(b.name);
  }).sort((a2, b) => {
    var _a2;
    return (_a2 = a2.info.category) == null ? void 0 : _a2.localeCompare(b.info.category || "");
  });
};

// src/utils/launcher/launcherEditor.ts
var launcherEditor = async () => {
  var _a2;
  const launchers = getLaunchers();
  const settings = fs5.readJsonSync(userPath + "/settings.json");
  let launcherSettings = [];
  let items = [];
  const selected = await generalSelector({
    type: "launchers",
    list: launchers
  });
  const index = selected.split("///")[0];
  const launcher = JSON.parse(selected.split("///")[1]);
  switch (launcher.info.type) {
    case "wine":
    case "proton":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable",
        "Change prefix and runner"
      ];
      break;
    case "linux":
      items = [
        "Change settings",
        "Change name",
        "Change category",
        "Change executable"
      ];
      break;
    case "legendary":
      items = ["Change settings", "Change name", "Change category"];
      break;
    case "retroarch":
      items = ["Change settings", "Change name", "Change category"];
      break;
  }
  switch (await listSelector({
    name: "Launcher Editor",
    items
  })) {
    case "1":
      for (let i in settings) {
        for (let j in settings[i].settings) {
          (_a2 = launcher.settings) == null ? void 0 : _a2.forEach(
            (option) => option.name == settings[i].settings[j].name && (settings[i].settings[j].value = option.value)
          );
        }
      }
      const newSettings = await settingsInit({ launcher, settings });
      for (let i in newSettings) {
        for (let j in newSettings[i].settings) {
          if (newSettings[i].settings[j].value) {
            launcherSettings.push({
              name: settings[i].settings[j].name,
              value: settings[i].settings[j].value
            });
          }
        }
      }
      for (let i in launchers) {
        if (launchers[i].name == launcher.name) {
          launchers.splice(i, 1);
        }
      }
      launchers.push({
        name: launcher.name,
        info: launcher.info,
        settings: launcherSettings
      });
      fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "2":
      launcher.name = await generalInput({
        qstring: "Enter " + source_default.green("launcher") + " " + source_default.cyan("name"),
        hfile: "launcher_names"
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "3":
      launcher.info.category = await generalInput({
        qstring: "Enter " + source_default.green("launcher") + " " + source_default.cyan("category"),
        hfile: "launcher_categories"
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "4":
      switch (launcher.info.type) {
        case "wine":
        case "proton":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring: "Enter " + source_default.green("path to the") + " " + source_default.cyan("executable"),
              hfile: "exec_paths"
            }),
            ext: ["exe"]
          });
          break;
        case "linux":
          launcher.info.exec = await getExecutable({
            location: await generalInput({
              qstring: "Enter " + source_default.green("path to the") + " " + source_default.cyan("executable"),
              hfile: "exec_paths"
            })
          });
          break;
      }
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
    case "5":
      launcher.info.prefix = await generalSelector({
        type: "prefixes",
        subType: launcher.info.type
      });
      launcher.info.runner = await generalSelector({
        type: "runners",
        subType: launcher.info.type
      });
      launchers.splice(index, 1);
      launchers.push(launcher);
      fs5.outputJsonSync(userPath + "/launchers.json", launchers, {
        spaces: 2
      });
      break;
  }
};

// src/utils/launcher/launcherCommand.ts
var launcherCommand = (launcher) => {
  var _a2, _b2;
  const { settings } = launcher;
  let complete = [];
  let debug = "&> /dev/null";
  let steamPath = fs5.existsSync(os2.homedir + "/.steam/steam") ? os2.homedir + "/.steam/steam" : fs5.existsSync(
    os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam"
  ) ? os2.homedir + "/.var/app/com.valvesoftware.Steam/.steam/steam" : "";
  let command = {
    pre: [],
    mid: [],
    post: []
  };
  if (!!launcher.settings) {
    let gamescope;
    let strangle;
    settings == null ? void 0 : settings.forEach((option) => {
      if (option.value != "") {
        switch (option.name) {
          case "Enable virtual desktop":
            command.mid.push(option.value);
            break;
          case "Add arguments":
            command.post.push(option.value);
            break;
          case "Enable debug":
            debug = ' &> "' + logsPath + "/" + launcher.name.replace(/ /g, "_") + '.log"';
            break;
          case "Enable gamescope":
            gamescope = option.value;
            break;
          case "Enable libstrangle":
            strangle = option.value;
            break;
          default:
            command.pre.push(option.value);
        }
      }
    });
    strangle && command.pre.push(strangle);
    gamescope && command.pre.push(gamescope);
  }
  switch (launcher.info.type) {
    case "wine":
      complete.push(`cd "${default2.dirname(launcher.info.exec || "")}";`);
      complete.push(`WINEPREFIX="${launcher.info.prefix}"`);
      complete.push(command.pre.join(" "));
      complete.push(`"${launcher.info.runner}"`);
      complete.push(command.mid.join(" "));
      complete.push(`"${launcher.info.exec}"`);
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
    case "proton":
      complete.push(`cd "${default2.dirname(launcher.info.exec || "")}";`);
      complete.push(`STEAM_COMPAT_CLIENT_INSTALL_PATH="${steamPath}"`);
      complete.push(`STEAM_COMPAT_DATA_PATH="${launcher.info.prefix}"`);
      !!((_a2 = command.pre) == null ? void 0 : _a2.length) && complete.push(command.pre.join(" "));
      complete.push(
        `"${launcher.info.runner}" run "${launcher.info.exec}"`
      );
      !!((_b2 = command.post) == null ? void 0 : _b2.length) && complete.push(command.post.join(" "));
      !!debug && complete.push(debug);
      break;
    case "linux":
      complete.push(command.pre.join(" "));
      complete.push(`"${launcher.info.exec}"`);
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
    case "legendary":
      if (launcher.info.savePath) {
        complete.push(
          `legendary sync-saves -y --skip-upload --save-path "${launcher.info.savePath}" ${launcher.info.id}`
        );
        complete.push(debug + ";");
      }
      complete.push(
        `legendary update -y --update-only "${launcher.info.id}"`
      );
      complete.push(debug.replace(">", ">>") + ";");
      if (launcher.info.runnerType == "wine") {
        complete.push(command.pre.join(" "));
        complete.push(
          `legendary launch --wine "${launcher.info.runner}" --wine-prefix "${launcher.info.prefix}" ${launcher.info.id}`
        );
      } else {
        complete.push(
          `STEAM_COMPAT_CLIENT_INSTALL_PATH="${steamPath}" STEAM_COMPAT_DATA_PATH="${launcher.info.prefix}"`
        );
        complete.push(command.pre.join(" "));
        complete.push(
          `legendary launch --no-wine --wrapper "${launcher.info.runner}" run ${launcher.info.id}`
        );
      }
      complete.push(command.post.join(" "));
      complete.push(debug.replace(">", ">>"));
      break;
    case "steam":
      complete.push(command.pre.join(" "));
      complete.push("%command%");
      complete.push(command.post.join(" "));
      break;
    case "retroarch":
      complete.push(command.pre.join(" "));
      complete.push(
        `${launcher.info.executable} --verbose -L "${launcher.info.core}" "${launcher.info.rom}"`
      );
      complete.push(command.post.join(" "));
      complete.push(debug);
      break;
  }
  return complete.join(" ");
};

// src/utils/launcher/launcherRunner.ts
var launcherRunner = async () => {
  let launchers = await getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  let commands = launcherCommand(JSON.parse(launcher.split("///")[1]));
  await verboseBash(commands);
};

// src/utils/launcher/launcherInfo.ts
var launcherInfo = async () => {
  let launchers = getLaunchers();
  let launcher = await generalSelector({ type: "launchers", list: launchers });
  console.log(JSON.parse(launcher.split("///")[1]));
};

// src/utils/launcher/launcherRemover.ts
var launcherRemover = async () => {
  const launchers = getLaunchers();
  const launcher = await generalSelector({
    type: "launchers",
    list: launchers
  });
  const launcherInfo2 = JSON.parse(launcher.split("///")[1]);
  const removeOption = await listSelector({
    name: "Choose remove option:",
    items: ["All", "Script", "Desktop file"]
  });
  if (["1"].includes(removeOption.toString())) {
    launchers.splice(+launcher.split("///")[0], 1);
    fs5.outputJsonSync(userPath + "/launchers.json", launchers, { spaces: 2 });
  }
  ["1", "2"].includes(removeOption.toString()) && fs5.removeSync(
    `${scriptsPath}/${launcherInfo2.info.category}/${launcherInfo2.name}.sh`
  );
  ["1", "3"].includes(removeOption.toString()) && fs5.remove(`${appsPath}/${launcherInfo2.name}.desktop`).then(async () => await $4`update-desktop-database "${globalAppsPath}"`);
};

// src/utils/launcher/launcherSGDB.ts
var steamGridDB = "https://www.steamgriddb.com/api/v2";
var fetchLaunchers = async (name) => {
  return fetch2(`${steamGridDB}/search/autocomplete/${name}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" }
  }).then((response) => response.json()).then((response) => response);
};
var fetchLauncherIcon = async (id) => {
  return fetch2(`${steamGridDB}/icons/game/${id}`, {
    headers: { Authorization: "Bearer 4b651cdf8aaa440703430ad6c1a318fd" }
  }).then((response) => response.json()).then((response) => response);
};

// src/utils/launcher/launcherGenerator.ts
var generateScript = (launcher) => {
  const command = launcherCommand(launcher);
  fs5.ensureDirSync(scriptsPath + "/" + launcher.info.category);
  fs5.writeFileSync(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    "#!/bin/bash\n" + command
  );
  fs5.chmod(
    scriptsPath + "/" + launcher.info.category + "/" + launcher.name + ".sh",
    493
  );
};
var saveIcon = (path2, launcher) => {
  fs5.writeFile(
    `${appsPath}/${launcher.name}.desktop`,
    `[Desktop Entry]
Name=${launcher.name}
Exec="${`${scriptsPath}/${launcher.info.category}/${launcher.name}.sh`}"
Type=Application
Icon=${path2}
Categories=HLU;Games;
Keywords=HLU;`
  ).then(async () => await $4`update-desktop-database "${globalAppsPath}"`);
};
var generateDesktop = (launcher) => {
  generateScript(launcher);
  fetchLaunchers(launcher.name).then(
    (games) => {
      var _a2;
      return !!((_a2 = games == null ? void 0 : games.data[0]) == null ? void 0 : _a2.id) ? fetchLauncherIcon(games.data[0].id).then((icons) => {
        cd(iconsPath);
        if (icons.data.length > 0) {
          $4`wget ${icons.data[0].thumb} -O ${launcher.name}.ico`.then(() => {
            saveIcon(`${iconsPath}/${launcher.name}.ico`, launcher);
          });
        } else {
          saveIcon(`${userPath}/HLU.png`, launcher);
        }
      }) : saveIcon(`${userPath}/HLU.png`, launcher);
    }
  );
};
var launcherGenerator = async (type) => {
  const launchers = getLaunchers();
  const generateOption = await listSelector({
    name: "Select option:",
    items: [
      `All ${type === "icon" ? "(icons from SteamGridDB)" : ""}`,
      "Select specific launcher"
    ]
  });
  if (generateOption === "1") {
    type === "script" && fs5.emptyDirSync(scriptsPath);
    type === "icon" && fs5.emptyDirSync(iconsPath);
    type === "icon" && fs5.emptyDirSync(appsPath);
    launchers.forEach(async (launcher) => {
      type === "script" ? generateScript(launcher) : generateDesktop(launcher);
    });
  }
  if (generateOption === "2") {
    const launcher = await generalSelector({
      type: "launchers",
      list: launchers
    }).then((data) => JSON.parse(data.split("///")[1]));
    if (type === "script")
      return generateScript(launcher);
    const iconPath = await generalInput({
      qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("icon file"),
      hfile: "icon_paths"
    });
    !iconPath ? generateDesktop(launcher) : saveIcon(iconPath, launcher);
  }
  console.log(
    source_default.green(
      `${type === "script" ? "Script" : "Desktop file"}${generateOption === "1" ? "s" : ""}`
    ) + " been generated in the " + source_default.green(type === "icon" ? appsPath : scriptsPath) + " folder"
  );
};

// src/utils/common.ts
import { exec as exec3 } from "child_process";
$4.verbose = false;
var verboseBash = async (command) => {
  $4.verbose = true;
  await $4`eval ${command}`;
  $4.verbose = false;
};
var ensurePaths = async () => {
  fs5.ensureDirSync(packagesPath);
  fs5.ensureDirSync(releasesPath);
  fs5.ensureDirSync(historyPath);
  fs5.ensureDirSync(logsPath);
  fs5.ensureDirSync(protonPath);
  fs5.ensureDirSync(appsPath);
  fs5.ensureDirSync(dirsPath);
  fs5.ensureDirSync(menusPath);
  fs5.ensureDirSync(iconsPath);
  fs5.ensureDirSync(scriptsPath);
  !fs5.existsSync(`${userPath}/HLU.png`) && await $4`cd ${userPath}; wget https://raw.githubusercontent.com/sergeyhist/hlu-js/main/images/HLU.png`;
  !fs5.existsSync(`${dirsPath}/hlu.directory`) && fs5.writeFileSync(
    `${dirsPath}/hlu.directory`,
    `[Desktop Entry]
Type=Directory
Name=HLU
Icon=${userPath}/HLU.png`
  );
  !fs5.existsSync(`${menusPath}/hlu.menu`) && fs5.writeFileSync(
    `${menusPath}/hlu.menu`,
    `<!DOCTYPE Menu PUBLIC "-//freedesktop//DTD Menu 1.0//EN"
"http://www.freedesktop.org/standards/menu-spec/menu-1.0.dtd">
<Menu>
<Name>Applications</Name>
<Menu>
<Name>HLU</Name>
<Directory>hlu.directory</Directory>
<Include>
<Category>HLU</Category>
</Include>
</Menu>
</Menu>`
  );
  fs5.writeFile(
    `${appsPath.split("/").slice(0, -1).join("/")}/HLU.desktop`,
    `[Desktop Entry]
Name=HLU
Exec=${__filename}
Type=Application
Icon=${userPath}/HLU.png
Terminal=truemCategories=HLU;Games;
Actions=Launchers;Services;

[Desktop Action Launchers]
Name=Launchers
Exec=${__filename} run

[Desktop Action Services]
Name=Services
Exec=${__filename} services`
  ).then(async () => await $4`update-desktop-database "${globalAppsPath}"`);
  if (!fs5.existsSync(userPath + "/settings.json") || !fs5.existsSync(userPath + "/packages.json")) {
    cd(userPath);
    await $4`git clone https://github.com/sergeyhist/hlu-js.git`;
    fs5.copySync("hlu-js/settings.json", userPath + "/settings.json");
    fs5.copySync("hlu-js/packages.json", userPath + "/packages.json");
    fs5.removeSync("hlu-js");
  }
};
var getExecutable = async ({
  ext,
  location,
  title = "Executables"
}) => {
  const executables = {
    all: [],
    names: [],
    paths: []
  };
  try {
    cd(location);
    if (ext) {
      if (ext.includes("wine")) {
        executables.names = await globby2("", {
          expandDirectories: { files: ext }
        });
        executables.paths = await globby2("", {
          absolute: true,
          expandDirectories: { files: ext }
        });
      } else {
        executables.names = await globby2("", {
          expandDirectories: { extensions: ext }
        });
        executables.paths = await globby2("", {
          absolute: true,
          expandDirectories: { extensions: ext }
        });
      }
    } else {
      executables.all = await globby2("", {
        absolute: true
      });
      for (let item of executables.all) {
        try {
          fs5.accessSync(item, fs5.constants.X_OK);
          executables.names.push(default2.basename(item));
          executables.paths.push(item);
        } catch (e) {
        }
      }
    }
    return executables.paths[+await listSelector({
      name: title,
      items: executables.names,
      descriptions: executables.paths
    }) - 1];
  } catch (e) {
    return location;
  }
};
var steamOptions = async () => {
  const launcherSettings = [];
  const launcher = { name: "Steam Game", info: { type: "steam" } };
  let settings = await settingsInit({
    launcher,
    settings: fs5.readJsonSync(userPath + "/settings.json")
  });
  for (let i in settings) {
    for (let j in settings[i].settings) {
      if (settings[i].settings[j].value) {
        launcherSettings.push({
          name: settings[i].settings[j].name,
          value: settings[i].settings[j].value || ""
        });
      }
    }
  }
  const command = launcherCommand({ ...launcher, settings: launcherSettings });
  const sessionType = await $4`echo $XDG_SESSION_TYPE`;
  console.log(
    "Copy & paste " + source_default.cyan("this") + " to the " + source_default.green("steam game") + " properties:\n" + source_default.cyan(command)
  );
  $4`echo ${command}`;
  switch (sessionType.stdout.trim()) {
    case "wayland":
      exec3(`wl-copy ${command}`, { timeout: 1e3 });
      break;
    default:
      $4`echo ${command} | xclip -sel clip`;
  }
};

// src/utils/wine/prefixCommands.ts
var prefixCommands2 = async ({ type }) => {
  let prefix;
  let runner;
  let command;
  prefix = await generalSelector({ type: "prefixes", subType: type });
  runner = await generalSelector({ type: "runners", subType: type });
  command = await generalSelector({ type: "prefix commands" });
  if (command == "input value") {
    command = await generalInput({
      qstring: "Enter " + source_default.green("custom") + " " + source_default.cyan("command") + " (Example: " + source_default.cyan("notepad") + ")",
      hfile: "pfxcoms"
    });
  }
  switch (type) {
    case "wine":
      await verboseBash(`WINEPREFIX="${prefix}" "${runner}" ${command}`);
      break;
    case "proton":
      await verboseBash(
        `STEAM_COMPAT_CLIENT_INSTALL_PATH="${os2.homedir}/.steam/steam" STEAM_COMPAT_DATA_PATH="${prefix}" "${runner}" run ${command}`
      );
  }
};

// src/utils/wine/prefixWinetricks.ts
var prefixWinetricks = async ({ type }) => {
  let prefix = await generalSelector({ type: "prefixes", subType: type });
  let runner = await generalSelector({ type: "runners", subType: type });
  if (type === "proton") {
    cd(default2.dirname(runner));
    prefix += "/pfx";
    runner = default2.dirname(runner) + "/" + await glob(["**/wine64"][0]);
  }
  const command = await generalInput({
    qstring: "Enter " + source_default.green("winetricks") + " " + source_default.cyan("arguments") + " (Example: " + source_default.cyan("vcrun2019") + ") (For " + source_default.green("gui") + " just " + source_default.cyan('press "Enter"') + ")",
    hfile: "winetricks_args"
  });
  switch (type) {
    case "wine":
      await verboseBash(
        `WINEPREFIX="${prefix}" WINE="${runner}" winetricks ${command}`
      );
      break;
    case "proton":
      await verboseBash(
        `WINEPREFIX="${prefix}" WINE="${runner}" winetricks ${command}`
      );
      break;
  }
};

// src/utils/packages.ts
var gitReleases = async ({
  author,
  gitName,
  ext
}) => {
  let git_objects;
  let git_result = [];
  const response = await fetch(
    "https://api.github.com/repos/" + author + "/" + gitName + "/releases"
  );
  if (response.ok) {
    git_objects = JSON.parse(await response.text());
    for (let i = 0; i < 10 && i < git_objects.length; i++) {
      for (let item of git_objects[i].assets) {
        if (item.browser_download_url.includes("." + ext)) {
          git_result.push({
            name: item.name,
            url: item.browser_download_url
          });
        }
      }
    }
  }
  return git_result;
};
var packageInstaller = async ({ type, pack }) => {
  let packages = fs5.readJsonSync(userPath + "/packages.json");
  let release;
  let status;
  const gitBuild = async () => {
    if (packages.git[pack].delete_folders) {
      for (let item of packages.git[pack].delete_folders) {
        fs5.removeSync(item);
      }
    }
    if (packages.git[pack].build_command) {
      try {
        await verboseBash(`${packages.git[pack].build_command}`);
      } catch (error) {
        switch (await generalInput({
          qstring: "Retry " + source_default.green("build") + "? " + source_default.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await verboseBash(`${packages.git[pack].build_command}`);
            break;
        }
      }
    }
  };
  let release_install = async () => {
    var _a2, _b2;
    release = await generalSelector({
      type: "git releases",
      list: await gitReleases({
        author: packages.release[pack].author,
        gitName: packages.release[pack].git_name,
        ext: packages.release[pack].extension
      })
    });
    const packageName = default2.basename(
      release,
      "." + packages.release[pack].extension
    );
    const packagePath = releasesPath + "/" + packageName;
    if (!fs5.existsSync(
      releasesPath + "/" + packageName + "." + packages.release[pack].extension
    )) {
      cd(releasesPath);
      console.log("\n" + source_default.green("Downloading..."));
      await verboseBash(`wget ${release}`);
    }
    if ((_a2 = packages.release[pack].flags) == null ? void 0 : _a2.includes("archive")) {
      fs5.emptyDirSync(packagePath);
      console.log("\n" + source_default.green("Extracting..."));
      await $4`tar -xf ${packagePath + "." + packages.release[pack].extension} -C ${packagePath} --strip-components 1`;
      fs5.removeSync(default2.basename(release));
      console.log("\n" + source_default.green("Installing...") + "\n");
      if ((_b2 = packages.release[pack].flags) == null ? void 0 : _b2.includes("install")) {
        for (let folder of packages.release[pack].folders) {
          folder = folder.replaceAll("hlu_packspath", packagesPath).replaceAll("home_dir", os2.homedir);
          if (fs5.existsSync(folder)) {
            folder = folder + "/" + packages.release[pack].path.replace("name", pack);
            fs5.removeSync(folder);
            fs5.copySync(packagePath, folder);
            if (fs5.existsSync(folder + "/compatibilitytool.vdf")) {
              let newArray = [];
              for (let line of fs5.readFileSync(folder + "/compatibilitytool.vdf", {
                encoding: "utf-8",
                flag: "r"
              }).split("\n")) {
                let selectedLine = line;
                if (line.includes("Internal name")) {
                  selectedLine = '    "' + pack + '"';
                }
                if (line.includes('"display_name"')) {
                  selectedLine = '      "display_name" "' + pack + '"';
                }
                newArray.push(selectedLine);
              }
              fs5.writeFileSync(
                folder + "/compatibilitytool.vdf",
                newArray.join("\n")
              );
            }
          }
        }
        fs5.removeSync(packagePath);
      } else {
        cd(releasesPath);
        fs5.removeSync(packages.release[pack].git_name);
        fs5.moveSync(packagePath, packages.release[pack].git_name);
      }
    }
  };
  switch (type) {
    case "git":
      if (fs5.existsSync(
        packagesPath + "/" + default2.basename(packages.git[pack].url, ".git")
      )) {
        cd(packagesPath);
        cd(default2.basename(packages.git[pack].url, ".git"));
        $4.verbose = true;
        if (packages.git[pack].url_args) {
          status = await $4`git reset --hard; git submodule--helper update ${packages.git[pack].url_args}; git pull ${packages.git[pack].url}`;
        } else {
          status = await $4`git reset --hard; git pull ${packages.git[pack].url}`;
        }
        $4.verbose = false;
        if (status.stdout.includes("Already up to date") && packages.git[pack].build_command) {
          switch (await generalInput({
            qstring: "Rebuild " + source_default.green("package") + " ? " + source_default.cyan("y|N")
          })) {
            case "y":
            case "Y":
              await gitBuild();
          }
        } else {
          await gitBuild();
        }
      } else {
        cd(packagesPath);
        if (packages.git[pack].url_args) {
          await verboseBash(
            `git clone ${packages.git[pack].url_args} ${packages.git[pack].url}`
          );
        } else {
          await verboseBash(`git clone ${packages.git[pack].url}`);
        }
        cd(default2.basename(packages.git[pack].url, ".git"));
        await gitBuild();
      }
      break;
    case "release":
      if (fs5.existsSync(releasesPath + "/" + packages.release[pack].git_name)) {
        switch (await generalInput({
          qstring: "Download another " + source_default.green("release package") + " ? " + source_default.cyan("y|N")
        })) {
          case "y":
          case "Y":
            await release_install();
        }
      } else {
        await release_install();
      }
      break;
  }
};

// src/utils/wine/prefixManager.ts
var prefixManager = async ({ type }) => {
  let prefix;
  let runner;
  let items = [];
  let prefixes = fs5.readJsonSync(userPath + "/prefixes.json");
  switch (type) {
    case "wine":
      items = [
        "Add prefix",
        "Delete prefix",
        "Create prefix",
        "DXVK Install/Uninstall",
        "VKD3D Install/Uninstall",
        "MF Install",
        "MF-Cab Install"
      ];
      break;
    case "proton":
      items = ["Add prefix", "Delete prefix"];
      break;
  }
  switch (await listSelector({
    name: "Prefixes Manager",
    items
  })) {
    case "1":
      prefix = await generalInput({
        qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("prefix"),
        hfile: "pfx_paths"
      });
      fs5.ensureDirSync(prefix);
      prefixes[type].push({
        name: await generalInput({
          qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("prefix"),
          hfile: "pfx_names",
          def: default2.basename(prefix)
        }),
        path: prefix
      });
      fs5.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      break;
    case "2":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      for (let i in prefixes[type]) {
        if (prefix == prefixes[type][i].path && prefix != "/home/hist/.wine" && prefix != protonPath) {
          prefixes[type].splice(i, 1);
        }
      }
      fs5.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      switch (await generalInput({
        qstring: "Delete " + source_default.green("folder") + "? " + source_default.cyan("y|N")
      })) {
        case "y":
        case "Y":
          fs5.emptyDirSync(prefix);
          break;
      }
      break;
    case "3":
      prefix = await generalInput({
        qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("prefix"),
        hfile: "pfx_paths"
      });
      prefixes[type].push({
        name: await generalInput({
          qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("prefix"),
          hfile: "pfx_names",
          def: default2.basename(prefix)
        }),
        path: prefix
      });
      fs5.outputJsonSync(userPath + "/prefixes.json", prefixes, {
        spaces: 2
      });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "Prefix Arch",
        items: ["32bit", "64bit"]
      })) {
        case "1":
          await $4`WINEARCH=win32 WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
        case "2":
          await $4`WINEPREFIX=${prefix} ${runner} wineboot -u`;
          break;
      }
      break;
    case "4":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "DXVK Installer",
        items: ["Git master", "Release"]
      })) {
        case "1":
          await packageInstaller({ type: "git", pack: "DXVK" });
          verboseBash(
            `cp ${packagesPath}/dxvk/dlls/dxvk-master/x64/*.dll ${prefix}/drive_c/windows/system32; cp ${packagesPath}/dxvk/dlls/dxvk-master/x32/*.dll ${prefix}/drive_c/windows/syswow64; WINEPREFIX="${prefix}" "${runner}" wineboot -u`
          );
          break;
        case "2":
          await packageInstaller({ type: "release", pack: "DXVK" });
          verboseBash(
            `cp ${releasesPath}/dxvk/x64/*.dll ${prefix}/drive_c/windows/system32; cp ${releasesPath}/dxvk/x32/*.dll ${prefix}/drive_c/windows/syswow64; WINEPREFIX="${prefix}" "${runner}" wineboot -u`
          );
          break;
      }
      break;
    case "5":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      switch (await listSelector({
        name: "VKD3D Installer",
        items: ["Git master", "Release"]
      })) {
        case "1":
          await packageInstaller({ type: "git", pack: "VKD3D" });
          verboseBash(
            `WINEPREFIX=${prefix} PATH=${default2.dirname(
              runner
            )}:$PATH WINELOADER=${runner} ${packagesPath}/vkd3d-proton/dlls/vkd3d-proton-master/setup_vkd3d_proton.sh install`
          );
          break;
        case "2":
          await packageInstaller({ type: "release", pack: "VKD3D" });
          verboseBash(
            `WINEPREFIX=${prefix} PATH=${default2.dirname(
              runner
            )}:$PATH WINELOADER=${runner} ${releasesPath}/vkd3d-proton/setup_vkd3d_proton.sh install`
          );
          break;
      }
      break;
    case "6":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      await packageInstaller({ type: "git", pack: "MF" });
      verboseBash(
        `WINEPREFIX=${prefix} PATH=${default2.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-install/mf-install.sh uninstall`
      );
      break;
    case "7":
      prefix = await generalSelector({ type: "prefixes", subType: type });
      runner = await generalSelector({ type: "runners", subType: type });
      await packageInstaller({ type: "git", pack: "MF-Cab" });
      verboseBash(
        `WINEPREFIX=${prefix} PATH=${default2.dirname(
          runner
        )}:$PATH WINELOADER=${runner} ${packagesPath}/mf-installcab/install-mf-64.sh uninstall`
      );
      break;
  }
};

// src/utils/wine/runnerManager.ts
var runnerManager = async () => {
  let runner;
  let runners = fs5.readJsonSync(userPath + "/runners.json");
  switch (await listSelector({
    name: "Runners Manager",
    items: [
      "Add wine runner",
      "Delete wine runner",
      "Install GE-Proton",
      "Install GE-Wine"
    ]
  })) {
    case "1":
      runner = await generalInput({
        qstring: "Enter " + source_default.cyan("path") + " to the " + source_default.green("runner"),
        hfile: "pfx_paths"
      });
      runner = await getExecutable({ location: runner, ext: ["wine"] });
      runners.wine.push({
        name: await generalInput({
          qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("runner"),
          hfile: "pfx_names"
        }),
        path: runner
      });
      fs5.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
    case "2":
      runner = await generalSelector({ type: "runners", subType: "wine" });
      for (let i in runners.wine) {
        if (runner == runners.wine[i].path && runner != "/usr/bin/wine") {
          runners.wine.splice(i, 1);
        }
      }
      fs5.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      switch (await generalInput({
        qstring: "Delete " + source_default.green("folder") + "? " + source_default.cyan("y|N")
      })) {
        case "y":
        case "Y":
          fs5.removeSync(runner);
          break;
      }
      break;
    case "3":
      await packageInstaller({ type: "release", pack: "GE-Proton" });
      break;
    case "4":
      await packageInstaller({ type: "release", pack: "GE-Wine" });
      for (let i in runners.wine) {
        if (runners.wine[i].name == "GE-Wine") {
          runners.wine.splice(i, 1);
        }
      }
      runners.wine.push({
        name: "GE-Wine",
        path: packagesPath + "/GE-Wine/bin/wine"
      });
      fs5.outputJsonSync(userPath + "/runners.json", runners, { spaces: 2 });
      break;
  }
};

// src/utils/updater.ts
var updater = async () => {
  cd(userPath);
  await $4`git clone https://github.com/sergeyhist/hlu-js.git`;
  fs5.copySync(
    userPath + "/hlu-js/settings.json",
    userPath + "/settings.json"
  );
  fs5.copySync(
    userPath + "/hlu-js/packages.json",
    userPath + "/packages.json"
  );
  fs5.removeSync(userPath + "/hlu-js");
};

// src/utils/systemd.ts
var systemdController = async () => {
  let addService = async () => {
    let service = {
      name: "",
      path: "",
      type: "user"
    };
    service.name = await generalInput({
      qstring: "Enter " + source_default.cyan("name") + " of the " + source_default.green("service") + " (Example: " + source_default.cyan("gdm.service") + ")",
      hfile: "service_names"
    });
    let path2 = await $4`systemctl show --user -p FragmentPath ${service.name} | tr -d '\\n'`;
    if (path2.stdout == "FragmentPath=") {
      path2 = await $4`systemctl show -p FragmentPath ${service.name} | tr -d '\\n'`;
      service.type = "root";
    } else {
      service.type = "user";
    }
    service.path = path2.stdout.split("=").pop();
    return service;
  };
  let services = [];
  let systemd_menu;
  switch (fs5.existsSync(userPath + "/services.json")) {
    case false:
      services.push(await addService());
      fs5.outputJsonSync(userPath + "/services.json", services, {
        spaces: 2
      });
    case true:
      while (systemd_menu != 0) {
        let service = 0;
        systemd_menu = await listSelector({
          name: "Systemd Controller",
          items: ["Services list", "Add Service"],
          options: ["continue"]
        });
        if (systemd_menu != 0) {
          switch (systemd_menu) {
            case "2":
              services = fs5.readJsonSync(userPath + "/services.json");
              services.push(await addService());
              fs5.outputJsonSync(userPath + "/services.json", services, {
                spaces: 2
              });
            case "1":
              while (service + 1 != 0) {
                let statuses = [];
                let status;
                services = fs5.readJsonSync(userPath + "/services.json");
                for (let item of services) {
                  if (item.type == "user") {
                    status = await $4`systemctl show --user -p ActiveState ${item.name} | tr -d '\\n'`;
                  } else {
                    status = await $4`systemctl show -p ActiveState ${item.name} | tr -d '\\n'`;
                  }
                  statuses.push(status.stdout.split("=").pop());
                }
                service = +await listSelector({
                  name: "Services List",
                  items: services.map((service2) => service2.name),
                  descriptions: services.map((service2) => service2.path),
                  values: statuses,
                  options: ["continue"]
                }) - 1;
                if (service + 1 != 0) {
                  switch (await listSelector({
                    name: services[service].name,
                    items: [
                      "Start",
                      "Stop",
                      "Restart",
                      "Enable",
                      "Disable",
                      "Status",
                      "Reset",
                      "Unlist"
                    ],
                    options: ["continue"]
                  })) {
                    case "1":
                      if (services[service].type == "user") {
                        await $4`systemctl start --user ${services[service].name}`;
                      } else {
                        await $4`systemctl start ${services[service].name}`;
                      }
                      break;
                    case "2":
                      if (services[service].type == "user") {
                        await $4`systemctl stop --user ${services[service].name}`;
                      } else {
                        await $4`systemctl stop ${services[service].name}`;
                      }
                      break;
                    case "3":
                      if (services[service].type == "user") {
                        await $4`systemctl restart --user ${services[service].name}`;
                      } else {
                        await $4`systemctl restart ${services[service].name}`;
                      }
                      break;
                    case "4":
                      if (services[service].type == "user") {
                        await $4`systemctl enable --user ${services[service].name}`;
                      } else {
                        await $4`systemctl enable ${services[service].name}`;
                      }
                      break;
                    case "5":
                      if (services[service].type == "user") {
                        await $4`systemctl disable --user ${services[service].name}`;
                      } else {
                        await $4`systemctl disable ${services[service].name}`;
                      }
                      break;
                    case "6":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl status --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl status ${services[service].name}`
                        );
                      }
                      break;
                    case "7":
                      if (services[service].type == "user") {
                        await verboseBash(
                          `systemctl reset-failed --user ${services[service].name}`
                        );
                      } else {
                        await verboseBash(
                          `systemctl reset-failed ${services[service].name}`
                        );
                      }
                      break;
                    case "8":
                      services.splice(service, 1);
                      fs5.outputJsonSync(userPath + "/services.json", services, {
                        spaces: 2
                      });
                      break;
                  }
                }
              }
              break;
          }
        }
      }
  }
};

// src/hlu.mts
$4.verbose = false;
process.on("beforeExit", async () => {
  if (flags.restart == 0) {
    await scriptExit();
  }
});
process.on("uncaughtException", async (err, origin) => {
  console.log(
    "\n	" + source_default.red("Error") + "\n" + err + "\n	" + source_default.red("Origin") + "\n" + origin + "\n"
  );
  if (flags.restart == 0) {
    await scriptExit();
  }
});
var cwd = process.cwd();
var mainProcess = async () => {
  cd(userPath);
  await ensurePaths();
  if (process.argv[3] == "run") {
    return await launcherRunner();
  }
  if (process.argv[3] == "services") {
    return await systemdController();
  }
  if (fs5.existsSync(os2.homedir + "/.steam") || fs5.existsSync(os2.homedir + "/.var/app/com.valvesoftware.Steam")) {
    await steamListInit();
  }
  await retroarchListInit();
  switch (await listSelector({
    name: "Hist Linux Utilities",
    items: [
      "Launcher Controller",
      "Wine/Proton Helper",
      "Legendary Helper",
      "Systemd Controller",
      "Launch options for steam game",
      "Install Luxtorpeda",
      "Update settings and packages"
    ]
  })) {
    case "1":
      switch (await listSelector({
        name: "Launcher Controller",
        items: [
          "Create launcher",
          "Edit launcher",
          "Run launcher",
          "Delete launcher/script/desktop file",
          "Generate bash scripts",
          "Generate desktop files",
          "Display information"
        ]
      })) {
        case "1":
          switch (await listSelector({
            name: "Launcher Creator",
            items: ["Wine", "Proton", "Linux", "Legendary", "Retroarch"]
          })) {
            case "1":
              await launcherInit("wine");
              break;
            case "2":
              await launcherInit("proton");
              break;
            case "3":
              await launcherInit("linux");
              break;
            case "4":
              await launcherInit("legendary");
              break;
            case "5":
              await launcherInit("retroarch");
              break;
          }
          break;
        case "2":
          await launcherEditor();
          break;
        case "3":
          await launcherRunner();
          break;
        case "4":
          await launcherRemover();
          break;
        case "5":
          await launcherGenerator("script");
          break;
        case "6":
          await launcherGenerator("icon");
          break;
        case "7":
          await launcherInfo();
          break;
      }
      break;
    case "2":
      switch (await listSelector({
        name: "Wine/Proton Helper",
        items: [
          "Prefix commands",
          "Winetricks",
          "Prefixes manager",
          "Runners manager"
        ]
      })) {
        case "1":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixCommands2({ type: "wine" });
              break;
            case "2":
              await prefixCommands2({ type: "proton" });
              break;
          }
          break;
        case "2":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixWinetricks({ type: "wine" });
              break;
            case "2":
              await prefixWinetricks({ type: "proton" });
              break;
          }
          break;
        case "3":
          switch (await listSelector({
            name: "Prefix Type",
            items: ["Wine", "Proton"]
          })) {
            case "1":
              await prefixManager({ type: "wine" });
              break;
            case "2":
              await prefixManager({ type: "proton" });
              break;
          }
          break;
        case "4":
          await runnerManager();
          break;
      }
      break;
    case "3":
      await legendaryHelper();
      break;
    case "4":
      await systemdController();
      break;
    case "5":
      await steamOptions();
      break;
    case "6":
      await packageInstaller({ type: "release", pack: "Luxtorpeda" });
      break;
    case "7":
      await updater();
      break;
  }
  cd(cwd);
};
mainProcess();
/*! Bundled license information:

zx/build/vendor.js:
  (*! Bundled license information:
  
  is-extglob/index.js:
    (*!
     * is-extglob <https://github.com/jonschlinkert/is-extglob>
     *
     * Copyright (c) 2014-2016, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  
  is-glob/index.js:
    (*!
     * is-glob <https://github.com/jonschlinkert/is-glob>
     *
     * Copyright (c) 2014-2017, Jon Schlinkert.
     * Released under the MIT License.
     *)
  
  is-number/index.js:
    (*!
     * is-number <https://github.com/jonschlinkert/is-number>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Released under the MIT License.
     *)
  
  to-regex-range/index.js:
    (*!
     * to-regex-range <https://github.com/micromatch/to-regex-range>
     *
     * Copyright (c) 2015-present, Jon Schlinkert.
     * Released under the MIT License.
     *)
  
  fill-range/index.js:
    (*!
     * fill-range <https://github.com/jonschlinkert/fill-range>
     *
     * Copyright (c) 2014-present, Jon Schlinkert.
     * Licensed under the MIT License.
     *)
  
  queue-microtask/index.js:
    (*! queue-microtask. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  run-parallel/index.js:
    (*! run-parallel. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
  
  node-fetch-native/dist/node.mjs:
    (**
    * @license
    * web-streams-polyfill v3.3.3
    * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
    * This code is released under the MIT license.
    * SPDX-License-Identifier: MIT
    *)
    (*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)
    (*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)
    (*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)
  *)
*/
