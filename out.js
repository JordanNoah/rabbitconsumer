// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __toCommonJS = (from) => {
  const moduleCache = __toCommonJS.moduleCache ??= new WeakMap;
  var cached = moduleCache.get(from);
  if (cached)
    return cached;
  var to = __defProp({}, "__esModule", { value: true });
  var desc = { enumerable: false };
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  moduleCache.set(from, to);
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __require = (id) => {
  return import.meta.require(id);
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

// node_modules/requires-port/index.js
var require_requires_port = __commonJS((exports, module) => {
  module.exports = function required(port, protocol) {
    protocol = protocol.split(":")[0];
    port = +port;
    if (!port)
      return false;
    switch (protocol) {
      case "http":
      case "ws":
        return port !== 80;
      case "https":
      case "wss":
        return port !== 443;
      case "ftp":
        return port !== 21;
      case "gopher":
        return port !== 70;
      case "file":
        return false;
    }
    return port !== 0;
  };
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS((exports) => {
  var decode = function(input) {
    try {
      return decodeURIComponent(input.replace(/\+/g, " "));
    } catch (e) {
      return null;
    }
  };
  var encode = function(input) {
    try {
      return encodeURIComponent(input);
    } catch (e) {
      return null;
    }
  };
  var querystring = function(query) {
    var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
    while (part = parser.exec(query)) {
      var key = decode(part[1]), value = decode(part[2]);
      if (key === null || value === null || (key in result))
        continue;
      result[key] = value;
    }
    return result;
  };
  var querystringify = function(obj, prefix) {
    prefix = prefix || "";
    var pairs = [], value, key;
    if (typeof prefix !== "string")
      prefix = "?";
    for (key in obj) {
      if (has.call(obj, key)) {
        value = obj[key];
        if (!value && (value === null || value === undef || isNaN(value))) {
          value = "";
        }
        key = encode(key);
        value = encode(value);
        if (key === null || value === null)
          continue;
        pairs.push(key + "=" + value);
      }
    }
    return pairs.length ? prefix + pairs.join("&") : "";
  };
  var has = Object.prototype.hasOwnProperty;
  var undef;
  exports.stringify = querystringify;
  exports.parse = querystring;
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS((exports, module) => {
  var trimLeft = function(str) {
    return (str ? str : "").toString().replace(controlOrWhitespace, "");
  };
  var lolcation = function(loc) {
    var globalVar;
    if (typeof window !== "undefined")
      globalVar = window;
    else if (typeof global !== "undefined")
      globalVar = global;
    else if (typeof self !== "undefined")
      globalVar = self;
    else
      globalVar = {};
    var location = globalVar.location || {};
    loc = loc || location;
    var finaldestination = {}, type = typeof loc, key;
    if (loc.protocol === "blob:") {
      finaldestination = new Url(unescape(loc.pathname), {});
    } else if (type === "string") {
      finaldestination = new Url(loc, {});
      for (key in ignore)
        delete finaldestination[key];
    } else if (type === "object") {
      for (key in loc) {
        if (key in ignore)
          continue;
        finaldestination[key] = loc[key];
      }
      if (finaldestination.slashes === undefined) {
        finaldestination.slashes = slashes.test(loc.href);
      }
    }
    return finaldestination;
  };
  var isSpecial = function(scheme) {
    return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
  };
  var extractProtocol = function(address, location) {
    address = trimLeft(address);
    address = address.replace(CRHTLF, "");
    location = location || {};
    var match = protocolre.exec(address);
    var protocol = match[1] ? match[1].toLowerCase() : "";
    var forwardSlashes = !!match[2];
    var otherSlashes = !!match[3];
    var slashesCount = 0;
    var rest;
    if (forwardSlashes) {
      if (otherSlashes) {
        rest = match[2] + match[3] + match[4];
        slashesCount = match[2].length + match[3].length;
      } else {
        rest = match[2] + match[4];
        slashesCount = match[2].length;
      }
    } else {
      if (otherSlashes) {
        rest = match[3] + match[4];
        slashesCount = match[3].length;
      } else {
        rest = match[4];
      }
    }
    if (protocol === "file:") {
      if (slashesCount >= 2) {
        rest = rest.slice(2);
      }
    } else if (isSpecial(protocol)) {
      rest = match[4];
    } else if (protocol) {
      if (forwardSlashes) {
        rest = rest.slice(2);
      }
    } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
      rest = match[4];
    }
    return {
      protocol,
      slashes: forwardSlashes || isSpecial(protocol),
      slashesCount,
      rest
    };
  };
  var resolve = function(relative, base) {
    if (relative === "")
      return base;
    var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
    while (i--) {
      if (path[i] === ".") {
        path.splice(i, 1);
      } else if (path[i] === "..") {
        path.splice(i, 1);
        up++;
      } else if (up) {
        if (i === 0)
          unshift = true;
        path.splice(i, 1);
        up--;
      }
    }
    if (unshift)
      path.unshift("");
    if (last === "." || last === "..")
      path.push("");
    return path.join("/");
  };
  var Url = function(address, location, parser) {
    address = trimLeft(address);
    address = address.replace(CRHTLF, "");
    if (!(this instanceof Url)) {
      return new Url(address, location, parser);
    }
    var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
    if (type !== "object" && type !== "string") {
      parser = location;
      location = null;
    }
    if (parser && typeof parser !== "function")
      parser = qs.parse;
    location = lolcation(location);
    extracted = extractProtocol(address || "", location);
    relative = !extracted.protocol && !extracted.slashes;
    url.slashes = extracted.slashes || relative && location.slashes;
    url.protocol = extracted.protocol || location.protocol || "";
    address = extracted.rest;
    if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
      instructions[3] = [/(.*)/, "pathname"];
    }
    for (;i < instructions.length; i++) {
      instruction = instructions[i];
      if (typeof instruction === "function") {
        address = instruction(address, url);
        continue;
      }
      parse = instruction[0];
      key = instruction[1];
      if (parse !== parse) {
        url[key] = address;
      } else if (typeof parse === "string") {
        index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
        if (~index) {
          if (typeof instruction[2] === "number") {
            url[key] = address.slice(0, index);
            address = address.slice(index + instruction[2]);
          } else {
            url[key] = address.slice(index);
            address = address.slice(0, index);
          }
        }
      } else if (index = parse.exec(address)) {
        url[key] = index[1];
        address = address.slice(0, index.index);
      }
      url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
      if (instruction[4])
        url[key] = url[key].toLowerCase();
    }
    if (parser)
      url.query = parser(url.query);
    if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
      url.pathname = resolve(url.pathname, location.pathname);
    }
    if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
      url.pathname = "/" + url.pathname;
    }
    if (!required(url.port, url.protocol)) {
      url.host = url.hostname;
      url.port = "";
    }
    url.username = url.password = "";
    if (url.auth) {
      index = url.auth.indexOf(":");
      if (~index) {
        url.username = url.auth.slice(0, index);
        url.username = encodeURIComponent(decodeURIComponent(url.username));
        url.password = url.auth.slice(index + 1);
        url.password = encodeURIComponent(decodeURIComponent(url.password));
      } else {
        url.username = encodeURIComponent(decodeURIComponent(url.auth));
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
    }
    url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
    url.href = url.toString();
  };
  var set = function(part, value, fn) {
    var url = this;
    switch (part) {
      case "query":
        if (typeof value === "string" && value.length) {
          value = (fn || qs.parse)(value);
        }
        url[part] = value;
        break;
      case "port":
        url[part] = value;
        if (!required(value, url.protocol)) {
          url.host = url.hostname;
          url[part] = "";
        } else if (value) {
          url.host = url.hostname + ":" + value;
        }
        break;
      case "hostname":
        url[part] = value;
        if (url.port)
          value += ":" + url.port;
        url.host = value;
        break;
      case "host":
        url[part] = value;
        if (port.test(value)) {
          value = value.split(":");
          url.port = value.pop();
          url.hostname = value.join(":");
        } else {
          url.hostname = value;
          url.port = "";
        }
        break;
      case "protocol":
        url.protocol = value.toLowerCase();
        url.slashes = !fn;
        break;
      case "pathname":
      case "hash":
        if (value) {
          var char = part === "pathname" ? "/" : "#";
          url[part] = value.charAt(0) !== char ? char + value : value;
        } else {
          url[part] = value;
        }
        break;
      case "username":
      case "password":
        url[part] = encodeURIComponent(value);
        break;
      case "auth":
        var index = value.indexOf(":");
        if (~index) {
          url.username = value.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = value.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(value));
        }
    }
    for (var i = 0;i < rules.length; i++) {
      var ins = rules[i];
      if (ins[4])
        url[ins[1]] = url[ins[1]].toLowerCase();
    }
    url.auth = url.password ? url.username + ":" + url.password : url.username;
    url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
    url.href = url.toString();
    return url;
  };
  var toString = function(stringify) {
    if (!stringify || typeof stringify !== "function")
      stringify = qs.stringify;
    var query, url = this, host = url.host, protocol = url.protocol;
    if (protocol && protocol.charAt(protocol.length - 1) !== ":")
      protocol += ":";
    var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
    if (url.username) {
      result += url.username;
      if (url.password)
        result += ":" + url.password;
      result += "@";
    } else if (url.password) {
      result += ":" + url.password;
      result += "@";
    } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
      result += "@";
    }
    if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
      host += ":";
    }
    result += host + url.pathname;
    query = typeof url.query === "object" ? stringify(url.query) : url.query;
    if (query)
      result += query.charAt(0) !== "?" ? "?" + query : query;
    if (url.hash)
      result += url.hash;
    return result;
  };
  var required = require_requires_port();
  var qs = require_querystringify();
  var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
  var CRHTLF = /[\n\r\t]/g;
  var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
  var port = /:\d+$/;
  var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
  var windowsDriveLetter = /^[a-zA-Z]:/;
  var rules = [
    ["#", "hash"],
    ["?", "query"],
    function sanitize(address, url) {
      return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
    },
    ["/", "pathname"],
    ["@", "auth", 1],
    [NaN, "host", undefined, 1, 1],
    [/:(\d*)$/, "port", undefined, 1],
    [NaN, "hostname", undefined, 1, 1]
  ];
  var ignore = { hash: 1, query: 1 };
  Url.prototype = { set, toString };
  Url.extractProtocol = extractProtocol;
  Url.location = lolcation;
  Url.trimLeft = trimLeft;
  Url.qs = qs;
  module.exports = Url;
});

// node_modules/buffer-more-ints/buffer-more-ints.js
var require_buffer_more_ints = __commonJS((exports, module) => {
  var isContiguousInt = function(val) {
    return val <= MAX_INT && val >= -MAX_INT;
  };
  var assertContiguousInt = function(val) {
    if (!isContiguousInt(val)) {
      throw new TypeError("number cannot be represented as a contiguous integer");
    }
  };
  var check_value = function(val, min, max) {
    val = +val;
    if (typeof val != "number" || val < min || val > max || Math.floor(val) !== val) {
      throw new TypeError("\"value\" argument is out of bounds");
    }
    return val;
  };
  var check_bounds = function(buf, offset, len) {
    if (offset < 0 || offset + len > buf.length) {
      throw new RangeError("Index out of range");
    }
  };
  var readUInt24BE = function(buf, offset) {
    return buf.readUInt8(offset) << 16 | buf.readUInt16BE(offset + 1);
  };
  var writeUInt24BE = function(buf, val, offset) {
    val = check_value(val, 0, 16777215);
    check_bounds(buf, offset, 3);
    buf.writeUInt8(val >>> 16, offset);
    buf.writeUInt16BE(val & 65535, offset + 1);
  };
  var readUInt40BE = function(buf, offset) {
    return (buf.readUInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
  };
  var writeUInt40BE = function(buf, val, offset) {
    val = check_value(val, 0, 1099511627775);
    check_bounds(buf, offset, 5);
    buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 1);
  };
  var readUInt48BE = function(buf, offset) {
    return buf.readUInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
  };
  var writeUInt48BE = function(buf, val, offset) {
    val = check_value(val, 0, 281474976710655);
    check_bounds(buf, offset, 6);
    buf.writeUInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 2);
  };
  var readUInt56BE = function(buf, offset) {
    return ((buf.readUInt8(offset) || 0) << 16 | buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
  };
  var writeUInt56BE = function(buf, val, offset) {
    val = check_value(val, 0, 72057594037927940);
    check_bounds(buf, offset, 7);
    if (val < 72057594037927940) {
      var hi = Math.floor(val * SHIFT_RIGHT_32);
      buf.writeUInt8(hi >>> 16, offset);
      buf.writeUInt16BE(hi & 65535, offset + 1);
      buf.writeInt32BE(val & -1, offset + 3);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
    }
  };
  var readUInt64BE = function(buf, offset) {
    return buf.readUInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
  };
  var writeUInt64BE = function(buf, val, offset) {
    val = check_value(val, 0, 18446744073709550000);
    check_bounds(buf, offset, 8);
    if (val < 18446744073709550000) {
      buf.writeUInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 4);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
      buf[offset + 7] = 255;
    }
  };
  var readUInt24LE = function(buf, offset) {
    return buf.readUInt8(offset + 2) << 16 | buf.readUInt16LE(offset);
  };
  var writeUInt24LE = function(buf, val, offset) {
    val = check_value(val, 0, 16777215);
    check_bounds(buf, offset, 3);
    buf.writeUInt16LE(val & 65535, offset);
    buf.writeUInt8(val >>> 16, offset + 2);
  };
  var readUInt40LE = function(buf, offset) {
    return (buf.readUInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeUInt40LE = function(buf, val, offset) {
    val = check_value(val, 0, 1099511627775);
    check_bounds(buf, offset, 5);
    buf.writeInt32LE(val & -1, offset);
    buf.writeUInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
  };
  var readUInt48LE = function(buf, offset) {
    return buf.readUInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeUInt48LE = function(buf, val, offset) {
    val = check_value(val, 0, 281474976710655);
    check_bounds(buf, offset, 6);
    buf.writeInt32LE(val & -1, offset);
    buf.writeUInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
  };
  var readUInt56LE = function(buf, offset) {
    return ((buf.readUInt8(offset + 6) || 0) << 16 | buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeUInt56LE = function(buf, val, offset) {
    val = check_value(val, 0, 72057594037927940);
    check_bounds(buf, offset, 7);
    if (val < 72057594037927940) {
      buf.writeInt32LE(val & -1, offset);
      var hi = Math.floor(val * SHIFT_RIGHT_32);
      buf.writeUInt16LE(hi & 65535, offset + 4);
      buf.writeUInt8(hi >>> 16, offset + 6);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
    }
  };
  var readUInt64LE = function(buf, offset) {
    return buf.readUInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeUInt64LE = function(buf, val, offset) {
    val = check_value(val, 0, 18446744073709550000);
    check_bounds(buf, offset, 8);
    if (val < 18446744073709550000) {
      buf.writeInt32LE(val & -1, offset);
      buf.writeUInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
      buf[offset + 7] = 255;
    }
  };
  var readInt24BE = function(buf, offset) {
    return (buf.readInt8(offset) << 16) + buf.readUInt16BE(offset + 1);
  };
  var writeInt24BE = function(buf, val, offset) {
    val = check_value(val, -8388608, 8388607);
    check_bounds(buf, offset, 3);
    buf.writeInt8(val >> 16, offset);
    buf.writeUInt16BE(val & 65535, offset + 1);
  };
  var readInt40BE = function(buf, offset) {
    return (buf.readInt8(offset) || 0) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 1);
  };
  var writeInt40BE = function(buf, val, offset) {
    val = check_value(val, -549755813888, 549755813887);
    check_bounds(buf, offset, 5);
    buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 1);
  };
  var readInt48BE = function(buf, offset) {
    return buf.readInt16BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 2);
  };
  var writeInt48BE = function(buf, val, offset) {
    val = check_value(val, -140737488355328, 140737488355327);
    check_bounds(buf, offset, 6);
    buf.writeInt16BE(Math.floor(val * SHIFT_RIGHT_32), offset);
    buf.writeInt32BE(val & -1, offset + 2);
  };
  var readInt56BE = function(buf, offset) {
    return (((buf.readInt8(offset) || 0) << 16) + buf.readUInt16BE(offset + 1)) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 3);
  };
  var writeInt56BE = function(buf, val, offset) {
    val = check_value(val, -576460752303423500, 36028797018963970);
    check_bounds(buf, offset, 7);
    if (val < 36028797018963970) {
      var hi = Math.floor(val * SHIFT_RIGHT_32);
      buf.writeInt8(hi >> 16, offset);
      buf.writeUInt16BE(hi & 65535, offset + 1);
      buf.writeInt32BE(val & -1, offset + 3);
    } else {
      buf[offset] = 127;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
    }
  };
  var readInt64BE = function(buf, offset) {
    return buf.readInt32BE(offset) * SHIFT_LEFT_32 + buf.readUInt32BE(offset + 4);
  };
  var writeInt64BE = function(buf, val, offset) {
    val = check_value(val, -2361183241434822600000, 9223372036854776000);
    check_bounds(buf, offset, 8);
    if (val < 9223372036854776000) {
      buf.writeInt32BE(Math.floor(val * SHIFT_RIGHT_32), offset);
      buf.writeInt32BE(val & -1, offset + 4);
    } else {
      buf[offset] = 127;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
      buf[offset + 7] = 255;
    }
  };
  var readInt24LE = function(buf, offset) {
    return (buf.readInt8(offset + 2) << 16) + buf.readUInt16LE(offset);
  };
  var writeInt24LE = function(buf, val, offset) {
    val = check_value(val, -8388608, 8388607);
    check_bounds(buf, offset, 3);
    buf.writeUInt16LE(val & 65535, offset);
    buf.writeInt8(val >> 16, offset + 2);
  };
  var readInt40LE = function(buf, offset) {
    return (buf.readInt8(offset + 4) || 0) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeInt40LE = function(buf, val, offset) {
    val = check_value(val, -549755813888, 549755813887);
    check_bounds(buf, offset, 5);
    buf.writeInt32LE(val & -1, offset);
    buf.writeInt8(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
  };
  var readInt48LE = function(buf, offset) {
    return buf.readInt16LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeInt48LE = function(buf, val, offset) {
    val = check_value(val, -140737488355328, 140737488355327);
    check_bounds(buf, offset, 6);
    buf.writeInt32LE(val & -1, offset);
    buf.writeInt16LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
  };
  var readInt56LE = function(buf, offset) {
    return (((buf.readInt8(offset + 6) || 0) << 16) + buf.readUInt16LE(offset + 4)) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeInt56LE = function(buf, val, offset) {
    val = check_value(val, -36028797018963970, 36028797018963970);
    check_bounds(buf, offset, 7);
    if (val < 36028797018963970) {
      buf.writeInt32LE(val & -1, offset);
      var hi = Math.floor(val * SHIFT_RIGHT_32);
      buf.writeUInt16LE(hi & 65535, offset + 4);
      buf.writeInt8(hi >> 16, offset + 6);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 127;
    }
  };
  var readInt64LE = function(buf, offset) {
    return buf.readInt32LE(offset + 4) * SHIFT_LEFT_32 + buf.readUInt32LE(offset);
  };
  var writeInt64LE = function(buf, val, offset) {
    val = check_value(val, -9223372036854776000, 9223372036854776000);
    check_bounds(buf, offset, 8);
    if (val < 9223372036854776000) {
      buf.writeInt32LE(val & -1, offset);
      buf.writeInt32LE(Math.floor(val * SHIFT_RIGHT_32), offset + 4);
    } else {
      buf[offset] = 255;
      buf[offset + 1] = 255;
      buf[offset + 2] = 255;
      buf[offset + 3] = 255;
      buf[offset + 4] = 255;
      buf[offset + 5] = 255;
      buf[offset + 6] = 255;
      buf[offset + 7] = 127;
    }
  };
  var SHIFT_LEFT_32 = (1 << 16) * (1 << 16);
  var SHIFT_RIGHT_32 = 1 / SHIFT_LEFT_32;
  var MAX_INT = 9007199254740991;
  exports.isContiguousInt = isContiguousInt;
  exports.assertContiguousInt = assertContiguousInt;
  ["UInt", "Int"].forEach(function(sign) {
    var suffix = sign + "8";
    exports["read" + suffix] = Buffer.prototype["read" + suffix].call;
    exports["write" + suffix] = Buffer.prototype["write" + suffix].call;
    ["16", "32"].forEach(function(size) {
      ["LE", "BE"].forEach(function(endian) {
        var suffix2 = sign + size + endian;
        var read = Buffer.prototype["read" + suffix2];
        exports["read" + suffix2] = function(buf, offset) {
          return read.call(buf, offset);
        };
        var write = Buffer.prototype["write" + suffix2];
        exports["write" + suffix2] = function(buf, val, offset) {
          return write.call(buf, val, offset);
        };
      });
    });
  });
  exports.readUInt24BE = readUInt24BE;
  exports.writeUInt24BE = writeUInt24BE;
  exports.readUInt40BE = readUInt40BE;
  exports.writeUInt40BE = writeUInt40BE;
  exports.readUInt48BE = readUInt48BE;
  exports.writeUInt48BE = writeUInt48BE;
  exports.readUInt56BE = readUInt56BE;
  exports.writeUInt56BE = writeUInt56BE;
  exports.readUInt64BE = readUInt64BE;
  exports.writeUInt64BE = writeUInt64BE;
  exports.readUInt24LE = readUInt24LE;
  exports.writeUInt24LE = writeUInt24LE;
  exports.readUInt40LE = readUInt40LE;
  exports.writeUInt40LE = writeUInt40LE;
  exports.readUInt48LE = readUInt48LE;
  exports.writeUInt48LE = writeUInt48LE;
  exports.readUInt56LE = readUInt56LE;
  exports.writeUInt56LE = writeUInt56LE;
  exports.readUInt64LE = readUInt64LE;
  exports.writeUInt64LE = writeUInt64LE;
  exports.readInt24BE = readInt24BE;
  exports.writeInt24BE = writeInt24BE;
  exports.readInt40BE = readInt40BE;
  exports.writeInt40BE = writeInt40BE;
  exports.readInt48BE = readInt48BE;
  exports.writeInt48BE = writeInt48BE;
  exports.readInt56BE = readInt56BE;
  exports.writeInt56BE = writeInt56BE;
  exports.readInt64BE = readInt64BE;
  exports.writeInt64BE = writeInt64BE;
  exports.readInt24LE = readInt24LE;
  exports.writeInt24LE = writeInt24LE;
  exports.readInt40LE = readInt40LE;
  exports.writeInt40LE = writeInt40LE;
  exports.readInt48LE = readInt48LE;
  exports.writeInt48LE = writeInt48LE;
  exports.readInt56LE = readInt56LE;
  exports.writeInt56LE = writeInt56LE;
  exports.readInt64LE = readInt64LE;
  exports.writeInt64LE = writeInt64LE;
});

// node_modules/amqplib/lib/codec.js
var require_codec = __commonJS((exports, module) => {
  var isFloatingPoint = function(n) {
    return n >= 9223372036854776000 || Math.abs(n) < 1125899906842624 && Math.floor(n) !== n;
  };
  var encodeTable = function(buffer, val, offset) {
    var start = offset;
    offset += 4;
    for (var key in val) {
      if (val[key] !== undefined) {
        var len = Buffer.byteLength(key);
        buffer.writeUInt8(len, offset);
        offset++;
        buffer.write(key, offset, "utf8");
        offset += len;
        offset += encodeFieldValue(buffer, val[key], offset);
      }
    }
    var size = offset - start;
    buffer.writeUInt32BE(size - 4, start);
    return size;
  };
  var encodeArray = function(buffer, val, offset) {
    var start = offset;
    offset += 4;
    for (var i = 0, num = val.length;i < num; i++) {
      offset += encodeFieldValue(buffer, val[i], offset);
    }
    var size = offset - start;
    buffer.writeUInt32BE(size - 4, start);
    return size;
  };
  var encodeFieldValue = function(buffer, value, offset) {
    var start = offset;
    var type = typeof value, val = value;
    if (value && type === "object" && value.hasOwnProperty("!")) {
      val = value.value;
      type = value["!"];
    }
    if (type == "number") {
      if (isFloatingPoint(val)) {
        type = "double";
      } else {
        if (val < 128 && val >= -128) {
          type = "byte";
        } else if (val >= -32768 && val < 32768) {
          type = "short";
        } else if (val >= -2147483648 && val < 2147483648) {
          type = "int";
        } else {
          type = "long";
        }
      }
    }
    function tag(t) {
      buffer.write(t, offset);
      offset++;
    }
    switch (type) {
      case "string":
        var len = Buffer.byteLength(val, "utf8");
        tag("S");
        buffer.writeUInt32BE(len, offset);
        offset += 4;
        buffer.write(val, offset, "utf8");
        offset += len;
        break;
      case "object":
        if (val === null) {
          tag("V");
        } else if (Array.isArray(val)) {
          tag("A");
          offset += encodeArray(buffer, val, offset);
        } else if (Buffer.isBuffer(val)) {
          tag("x");
          buffer.writeUInt32BE(val.length, offset);
          offset += 4;
          val.copy(buffer, offset);
          offset += val.length;
        } else {
          tag("F");
          offset += encodeTable(buffer, val, offset);
        }
        break;
      case "boolean":
        tag("t");
        buffer.writeUInt8(val ? 1 : 0, offset);
        offset++;
        break;
      case "double":
      case "float64":
        tag("d");
        buffer.writeDoubleBE(val, offset);
        offset += 8;
        break;
      case "byte":
      case "int8":
        tag("b");
        buffer.writeInt8(val, offset);
        offset++;
        break;
      case "short":
      case "int16":
        tag("s");
        buffer.writeInt16BE(val, offset);
        offset += 2;
        break;
      case "int":
      case "int32":
        tag("I");
        buffer.writeInt32BE(val, offset);
        offset += 4;
        break;
      case "long":
      case "int64":
        tag("l");
        ints.writeInt64BE(buffer, val, offset);
        offset += 8;
        break;
      case "timestamp":
        tag("T");
        ints.writeUInt64BE(buffer, val, offset);
        offset += 8;
        break;
      case "float":
        tag("f");
        buffer.writeFloatBE(val, offset);
        offset += 4;
        break;
      case "decimal":
        tag("D");
        if (val.hasOwnProperty("places") && val.hasOwnProperty("digits") && val.places >= 0 && val.places < 256) {
          buffer[offset] = val.places;
          offset++;
          buffer.writeUInt32BE(val.digits, offset);
          offset += 4;
        } else
          throw new TypeError("Decimal value must be {'places': 0..255, 'digits': uint32}, got " + JSON.stringify(val));
        break;
      default:
        throw new TypeError("Unknown type to encode: " + type);
    }
    return offset - start;
  };
  var decodeFields = function(slice) {
    var fields = {}, offset = 0, size = slice.length;
    var len, key, val;
    function decodeFieldValue() {
      var tag = String.fromCharCode(slice[offset]);
      offset++;
      switch (tag) {
        case "b":
          val = slice.readInt8(offset);
          offset++;
          break;
        case "S":
          len = slice.readUInt32BE(offset);
          offset += 4;
          val = slice.toString("utf8", offset, offset + len);
          offset += len;
          break;
        case "I":
          val = slice.readInt32BE(offset);
          offset += 4;
          break;
        case "D":
          var places = slice[offset];
          offset++;
          var digits = slice.readUInt32BE(offset);
          offset += 4;
          val = { "!": "decimal", value: { places, digits } };
          break;
        case "T":
          val = ints.readUInt64BE(slice, offset);
          offset += 8;
          val = { "!": "timestamp", value: val };
          break;
        case "F":
          len = slice.readUInt32BE(offset);
          offset += 4;
          val = decodeFields(slice.slice(offset, offset + len));
          offset += len;
          break;
        case "A":
          len = slice.readUInt32BE(offset);
          offset += 4;
          decodeArray(offset + len);
          break;
        case "d":
          val = slice.readDoubleBE(offset);
          offset += 8;
          break;
        case "f":
          val = slice.readFloatBE(offset);
          offset += 4;
          break;
        case "l":
          val = ints.readInt64BE(slice, offset);
          offset += 8;
          break;
        case "s":
          val = slice.readInt16BE(offset);
          offset += 2;
          break;
        case "t":
          val = slice[offset] != 0;
          offset++;
          break;
        case "V":
          val = null;
          break;
        case "x":
          len = slice.readUInt32BE(offset);
          offset += 4;
          val = slice.slice(offset, offset + len);
          offset += len;
          break;
        default:
          throw new TypeError('Unexpected type tag "' + tag + '"');
      }
    }
    function decodeArray(until) {
      var vals = [];
      while (offset < until) {
        decodeFieldValue();
        vals.push(val);
      }
      val = vals;
    }
    while (offset < size) {
      len = slice.readUInt8(offset);
      offset++;
      key = slice.toString("utf8", offset, offset + len);
      offset += len;
      decodeFieldValue();
      fields[key] = val;
    }
    return fields;
  };
  var ints = require_buffer_more_ints();
  exports.encodeTable = encodeTable;
  exports.decodeFields = decodeFields;
});

// node_modules/amqplib/lib/defs.js
var require_defs = __commonJS((exports, module) => {
  var decodeConnectionStart = function(buffer) {
    var val, len, offset = 0, fields = {
      versionMajor: undefined,
      versionMinor: undefined,
      serverProperties: undefined,
      mechanisms: undefined,
      locales: undefined
    };
    val = buffer[offset];
    offset++;
    fields.versionMajor = val;
    val = buffer[offset];
    offset++;
    fields.versionMinor = val;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.serverProperties = val;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.mechanisms = val;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.locales = val;
    return fields;
  };
  var encodeConnectionStart = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
    val = fields.serverProperties;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'serverProperties'");
    if (typeof val != "object")
      throw new TypeError("Field 'serverProperties' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var serverProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += serverProperties_encoded.length;
    val = fields.mechanisms;
    if (val === undefined)
      val = Buffer.from("PLAIN");
    else if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'mechanisms' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    val = fields.locales;
    if (val === undefined)
      val = Buffer.from("en_US");
    else if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'locales' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    var buffer = Buffer.alloc(22 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655370, 7);
    offset = 11;
    val = fields.versionMajor;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'versionMajor' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt8(val, offset);
    offset++;
    val = fields.versionMinor;
    if (val === undefined)
      val = 9;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'versionMinor' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt8(val, offset);
    offset++;
    offset += serverProperties_encoded.copy(buffer, offset);
    val = fields.mechanisms;
    val === undefined && (val = Buffer.from("PLAIN"));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    val = fields.locales;
    val === undefined && (val = Buffer.from("en_US"));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionStartOk = function(buffer) {
    var val, len, offset = 0, fields = {
      clientProperties: undefined,
      mechanism: undefined,
      response: undefined,
      locale: undefined
    };
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.clientProperties = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.mechanism = val;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.response = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.locale = val;
    return fields;
  };
  var encodeConnectionStartOk = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
    val = fields.clientProperties;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'clientProperties'");
    if (typeof val != "object")
      throw new TypeError("Field 'clientProperties' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var clientProperties_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += clientProperties_encoded.length;
    val = fields.mechanism;
    if (val === undefined)
      val = "PLAIN";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'mechanism' is the wrong type; must be a string (up to 255 chars)");
    var mechanism_len = Buffer.byteLength(val, "utf8");
    varyingSize += mechanism_len;
    val = fields.response;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'response'");
    if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    val = fields.locale;
    if (val === undefined)
      val = "en_US";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'locale' is the wrong type; must be a string (up to 255 chars)");
    var locale_len = Buffer.byteLength(val, "utf8");
    varyingSize += locale_len;
    var buffer = Buffer.alloc(18 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655371, 7);
    offset = 11;
    offset += clientProperties_encoded.copy(buffer, offset);
    val = fields.mechanism;
    val === undefined && (val = "PLAIN");
    buffer[offset] = mechanism_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += mechanism_len;
    val = fields.response;
    val === undefined && (val = Buffer.from(undefined));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    val = fields.locale;
    val === undefined && (val = "en_US");
    buffer[offset] = locale_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += locale_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionSecure = function(buffer) {
    var val, len, offset = 0, fields = {
      challenge: undefined
    };
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.challenge = val;
    return fields;
  };
  var encodeConnectionSecure = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0;
    val = fields.challenge;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'challenge'");
    if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'challenge' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655380, 7);
    offset = 11;
    val = fields.challenge;
    val === undefined && (val = Buffer.from(undefined));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionSecureOk = function(buffer) {
    var val, len, offset = 0, fields = {
      response: undefined
    };
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.response = val;
    return fields;
  };
  var encodeConnectionSecureOk = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0;
    val = fields.response;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'response'");
    if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'response' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655381, 7);
    offset = 11;
    val = fields.response;
    val === undefined && (val = Buffer.from(undefined));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionTune = function(buffer) {
    var val, offset = 0, fields = {
      channelMax: undefined,
      frameMax: undefined,
      heartbeat: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.channelMax = val;
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.frameMax = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.heartbeat = val;
    return fields;
  };
  var encodeConnectionTune = function(channel, fields) {
    var offset = 0, val = null, buffer = Buffer.alloc(20);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655390, 7);
    offset = 11;
    val = fields.channelMax;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.frameMax;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    val = fields.heartbeat;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionTuneOk = function(buffer) {
    var val, offset = 0, fields = {
      channelMax: undefined,
      frameMax: undefined,
      heartbeat: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.channelMax = val;
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.frameMax = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.heartbeat = val;
    return fields;
  };
  var encodeConnectionTuneOk = function(channel, fields) {
    var offset = 0, val = null, buffer = Buffer.alloc(20);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655391, 7);
    offset = 11;
    val = fields.channelMax;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'channelMax' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.frameMax;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'frameMax' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    val = fields.heartbeat;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'heartbeat' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionOpen = function(buffer) {
    var val, len, offset = 0, fields = {
      virtualHost: undefined,
      capabilities: undefined,
      insist: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.virtualHost = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.capabilities = val;
    val = !!(1 & buffer[offset]);
    fields.insist = val;
    return fields;
  };
  var encodeConnectionOpen = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.virtualHost;
    if (val === undefined)
      val = "/";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'virtualHost' is the wrong type; must be a string (up to 255 chars)");
    var virtualHost_len = Buffer.byteLength(val, "utf8");
    varyingSize += virtualHost_len;
    val = fields.capabilities;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'capabilities' is the wrong type; must be a string (up to 255 chars)");
    var capabilities_len = Buffer.byteLength(val, "utf8");
    varyingSize += capabilities_len;
    var buffer = Buffer.alloc(15 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655400, 7);
    offset = 11;
    val = fields.virtualHost;
    val === undefined && (val = "/");
    buffer[offset] = virtualHost_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += virtualHost_len;
    val = fields.capabilities;
    val === undefined && (val = "");
    buffer[offset] = capabilities_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += capabilities_len;
    val = fields.insist;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionOpenOk = function(buffer) {
    var val, len, offset = 0, fields = {
      knownHosts: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.knownHosts = val;
    return fields;
  };
  var encodeConnectionOpenOk = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.knownHosts;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'knownHosts' is the wrong type; must be a string (up to 255 chars)");
    var knownHosts_len = Buffer.byteLength(val, "utf8");
    varyingSize += knownHosts_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655401, 7);
    offset = 11;
    val = fields.knownHosts;
    val === undefined && (val = "");
    buffer[offset] = knownHosts_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += knownHosts_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionClose = function(buffer) {
    var val, len, offset = 0, fields = {
      replyCode: undefined,
      replyText: undefined,
      classId: undefined,
      methodId: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.replyCode = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.replyText = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.classId = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.methodId = val;
    return fields;
  };
  var encodeConnectionClose = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.replyText;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
    var replyText_len = Buffer.byteLength(val, "utf8");
    varyingSize += replyText_len;
    var buffer = Buffer.alloc(19 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655410, 7);
    offset = 11;
    val = fields.replyCode;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'replyCode'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.replyText;
    val === undefined && (val = "");
    buffer[offset] = replyText_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += replyText_len;
    val = fields.classId;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'classId'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.methodId;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'methodId'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionCloseOk = function(buffer) {
    return {};
  };
  var encodeConnectionCloseOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655411, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionBlocked = function(buffer) {
    var val, len, offset = 0, fields = {
      reason: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.reason = val;
    return fields;
  };
  var encodeConnectionBlocked = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.reason;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'reason' is the wrong type; must be a string (up to 255 chars)");
    var reason_len = Buffer.byteLength(val, "utf8");
    varyingSize += reason_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655420, 7);
    offset = 11;
    val = fields.reason;
    val === undefined && (val = "");
    buffer[offset] = reason_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += reason_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConnectionUnblocked = function(buffer) {
    return {};
  };
  var encodeConnectionUnblocked = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(655421, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelOpen = function(buffer) {
    var val, len, offset = 0, fields = {
      outOfBand: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.outOfBand = val;
    return fields;
  };
  var encodeChannelOpen = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.outOfBand;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'outOfBand' is the wrong type; must be a string (up to 255 chars)");
    var outOfBand_len = Buffer.byteLength(val, "utf8");
    varyingSize += outOfBand_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310730, 7);
    offset = 11;
    val = fields.outOfBand;
    val === undefined && (val = "");
    buffer[offset] = outOfBand_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += outOfBand_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelOpenOk = function(buffer) {
    var val, len, offset = 0, fields = {
      channelId: undefined
    };
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = buffer.slice(offset, offset + len);
    offset += len;
    fields.channelId = val;
    return fields;
  };
  var encodeChannelOpenOk = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0;
    val = fields.channelId;
    if (val === undefined)
      val = Buffer.from("");
    else if (!Buffer.isBuffer(val))
      throw new TypeError("Field 'channelId' is the wrong type; must be a Buffer");
    varyingSize += val.length;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310731, 7);
    offset = 11;
    val = fields.channelId;
    val === undefined && (val = Buffer.from(""));
    len = val.length;
    buffer.writeUInt32BE(len, offset);
    offset += 4;
    val.copy(buffer, offset);
    offset += len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelFlow = function(buffer) {
    var val, fields = {
      active: undefined
    };
    val = !!(1 & buffer[0]);
    fields.active = val;
    return fields;
  };
  var encodeChannelFlow = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310740, 7);
    offset = 11;
    val = fields.active;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'active'");
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelFlowOk = function(buffer) {
    var val, fields = {
      active: undefined
    };
    val = !!(1 & buffer[0]);
    fields.active = val;
    return fields;
  };
  var encodeChannelFlowOk = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310741, 7);
    offset = 11;
    val = fields.active;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'active'");
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelClose = function(buffer) {
    var val, len, offset = 0, fields = {
      replyCode: undefined,
      replyText: undefined,
      classId: undefined,
      methodId: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.replyCode = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.replyText = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.classId = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.methodId = val;
    return fields;
  };
  var encodeChannelClose = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.replyText;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
    var replyText_len = Buffer.byteLength(val, "utf8");
    varyingSize += replyText_len;
    var buffer = Buffer.alloc(19 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310760, 7);
    offset = 11;
    val = fields.replyCode;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'replyCode'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.replyText;
    val === undefined && (val = "");
    buffer[offset] = replyText_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += replyText_len;
    val = fields.classId;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'classId'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'classId' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.methodId;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'methodId'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'methodId' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeChannelCloseOk = function(buffer) {
    return {};
  };
  var encodeChannelCloseOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1310761, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeAccessRequest = function(buffer) {
    var val, len, offset = 0, fields = {
      realm: undefined,
      exclusive: undefined,
      passive: undefined,
      active: undefined,
      write: undefined,
      read: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.realm = val;
    val = !!(1 & buffer[offset]);
    fields.exclusive = val;
    val = !!(2 & buffer[offset]);
    fields.passive = val;
    val = !!(4 & buffer[offset]);
    fields.active = val;
    val = !!(8 & buffer[offset]);
    fields.write = val;
    val = !!(16 & buffer[offset]);
    fields.read = val;
    return fields;
  };
  var encodeAccessRequest = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.realm;
    if (val === undefined)
      val = "/data";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'realm' is the wrong type; must be a string (up to 255 chars)");
    var realm_len = Buffer.byteLength(val, "utf8");
    varyingSize += realm_len;
    var buffer = Buffer.alloc(14 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1966090, 7);
    offset = 11;
    val = fields.realm;
    val === undefined && (val = "/data");
    buffer[offset] = realm_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += realm_len;
    val = fields.exclusive;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.passive;
    val === undefined && (val = true);
    val && (bits += 2);
    val = fields.active;
    val === undefined && (val = true);
    val && (bits += 4);
    val = fields.write;
    val === undefined && (val = true);
    val && (bits += 8);
    val = fields.read;
    val === undefined && (val = true);
    val && (bits += 16);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeAccessRequestOk = function(buffer) {
    var val, offset = 0, fields = {
      ticket: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    return fields;
  };
  var encodeAccessRequestOk = function(channel, fields) {
    var offset = 0, val = null, buffer = Buffer.alloc(14);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(1966091, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 1;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeDeclare = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      exchange: undefined,
      type: undefined,
      passive: undefined,
      durable: undefined,
      autoDelete: undefined,
      internal: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.type = val;
    val = !!(1 & buffer[offset]);
    fields.passive = val;
    val = !!(2 & buffer[offset]);
    fields.durable = val;
    val = !!(4 & buffer[offset]);
    fields.autoDelete = val;
    val = !!(8 & buffer[offset]);
    fields.internal = val;
    val = !!(16 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeExchangeDeclare = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.type;
    if (val === undefined)
      val = "direct";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
    var type_len = Buffer.byteLength(val, "utf8");
    varyingSize += type_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(17 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621450, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.type;
    val === undefined && (val = "direct");
    buffer[offset] = type_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += type_len;
    val = fields.passive;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.durable;
    val === undefined && (val = false);
    val && (bits += 2);
    val = fields.autoDelete;
    val === undefined && (val = false);
    val && (bits += 4);
    val = fields.internal;
    val === undefined && (val = false);
    val && (bits += 8);
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 16);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeDeclareOk = function(buffer) {
    return {};
  };
  var encodeExchangeDeclareOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621451, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeDelete = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      exchange: undefined,
      ifUnused: undefined,
      nowait: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    val = !!(1 & buffer[offset]);
    fields.ifUnused = val;
    val = !!(2 & buffer[offset]);
    fields.nowait = val;
    return fields;
  };
  var encodeExchangeDelete = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621460, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.ifUnused;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 2);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeDeleteOk = function(buffer) {
    return {};
  };
  var encodeExchangeDeleteOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621461, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeBind = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      destination: undefined,
      source: undefined,
      routingKey: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.destination = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.source = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    val = !!(1 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeExchangeBind = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.destination;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'destination'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
    var destination_len = Buffer.byteLength(val, "utf8");
    varyingSize += destination_len;
    val = fields.source;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'source'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
    var source_len = Buffer.byteLength(val, "utf8");
    varyingSize += source_len;
    val = fields.routingKey;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(18 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621470, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.destination;
    val === undefined && (val = undefined);
    buffer[offset] = destination_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += destination_len;
    val = fields.source;
    val === undefined && (val = undefined);
    buffer[offset] = source_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += source_len;
    val = fields.routingKey;
    val === undefined && (val = "");
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeBindOk = function(buffer) {
    return {};
  };
  var encodeExchangeBindOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621471, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeUnbind = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      destination: undefined,
      source: undefined,
      routingKey: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.destination = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.source = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    val = !!(1 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeExchangeUnbind = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.destination;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'destination'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'destination' is the wrong type; must be a string (up to 255 chars)");
    var destination_len = Buffer.byteLength(val, "utf8");
    varyingSize += destination_len;
    val = fields.source;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'source'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'source' is the wrong type; must be a string (up to 255 chars)");
    var source_len = Buffer.byteLength(val, "utf8");
    varyingSize += source_len;
    val = fields.routingKey;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(18 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621480, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.destination;
    val === undefined && (val = undefined);
    buffer[offset] = destination_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += destination_len;
    val = fields.source;
    val === undefined && (val = undefined);
    buffer[offset] = source_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += source_len;
    val = fields.routingKey;
    val === undefined && (val = "");
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeExchangeUnbindOk = function(buffer) {
    return {};
  };
  var encodeExchangeUnbindOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(2621491, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueDeclare = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      passive: undefined,
      durable: undefined,
      exclusive: undefined,
      autoDelete: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    val = !!(1 & buffer[offset]);
    fields.passive = val;
    val = !!(2 & buffer[offset]);
    fields.durable = val;
    val = !!(4 & buffer[offset]);
    fields.exclusive = val;
    val = !!(8 & buffer[offset]);
    fields.autoDelete = val;
    val = !!(16 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeQueueDeclare = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276810, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.passive;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.durable;
    val === undefined && (val = false);
    val && (bits += 2);
    val = fields.exclusive;
    val === undefined && (val = false);
    val && (bits += 4);
    val = fields.autoDelete;
    val === undefined && (val = false);
    val && (bits += 8);
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 16);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueDeclareOk = function(buffer) {
    var val, len, offset = 0, fields = {
      queue: undefined,
      messageCount: undefined,
      consumerCount: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.messageCount = val;
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.consumerCount = val;
    return fields;
  };
  var encodeQueueDeclareOk = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.queue;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'queue'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    var buffer = Buffer.alloc(21 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276811, 7);
    offset = 11;
    val = fields.queue;
    val === undefined && (val = undefined);
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.messageCount;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'messageCount'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    val = fields.consumerCount;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'consumerCount'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'consumerCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueBind = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      exchange: undefined,
      routingKey: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    val = !!(1 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeQueueBind = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(18 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276820, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = "");
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueBindOk = function(buffer) {
    return {};
  };
  var encodeQueueBindOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276821, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueuePurge = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      nowait: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    val = !!(1 & buffer[offset]);
    fields.nowait = val;
    return fields;
  };
  var encodeQueuePurge = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276830, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueuePurgeOk = function(buffer) {
    var val, offset = 0, fields = {
      messageCount: undefined
    };
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.messageCount = val;
    return fields;
  };
  var encodeQueuePurgeOk = function(channel, fields) {
    var offset = 0, val = null, buffer = Buffer.alloc(16);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276831, 7);
    offset = 11;
    val = fields.messageCount;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'messageCount'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueDelete = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      ifUnused: undefined,
      ifEmpty: undefined,
      nowait: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    val = !!(1 & buffer[offset]);
    fields.ifUnused = val;
    val = !!(2 & buffer[offset]);
    fields.ifEmpty = val;
    val = !!(4 & buffer[offset]);
    fields.nowait = val;
    return fields;
  };
  var encodeQueueDelete = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276840, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.ifUnused;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.ifEmpty;
    val === undefined && (val = false);
    val && (bits += 2);
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 4);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueDeleteOk = function(buffer) {
    var val, offset = 0, fields = {
      messageCount: undefined
    };
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.messageCount = val;
    return fields;
  };
  var encodeQueueDeleteOk = function(channel, fields) {
    var offset = 0, val = null, buffer = Buffer.alloc(16);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276841, 7);
    offset = 11;
    val = fields.messageCount;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'messageCount'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueUnbind = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      exchange: undefined,
      routingKey: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeQueueUnbind = function(channel, fields) {
    var len, offset = 0, val = null, varyingSize = 0, scratchOffset = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(17 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276850, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = "");
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeQueueUnbindOk = function(buffer) {
    return {};
  };
  var encodeQueueUnbindOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3276851, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicQos = function(buffer) {
    var val, offset = 0, fields = {
      prefetchSize: undefined,
      prefetchCount: undefined,
      global: undefined
    };
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.prefetchSize = val;
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.prefetchCount = val;
    val = !!(1 & buffer[offset]);
    fields.global = val;
    return fields;
  };
  var encodeBasicQos = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(19);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932170, 7);
    offset = 11;
    val = fields.prefetchSize;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'prefetchSize' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    val = fields.prefetchCount;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'prefetchCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.global;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicQosOk = function(buffer) {
    return {};
  };
  var encodeBasicQosOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932171, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicConsume = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      consumerTag: undefined,
      noLocal: undefined,
      noAck: undefined,
      exclusive: undefined,
      nowait: undefined,
      arguments: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.consumerTag = val;
    val = !!(1 & buffer[offset]);
    fields.noLocal = val;
    val = !!(2 & buffer[offset]);
    fields.noAck = val;
    val = !!(4 & buffer[offset]);
    fields.exclusive = val;
    val = !!(8 & buffer[offset]);
    fields.nowait = val;
    offset++;
    len = buffer.readUInt32BE(offset);
    offset += 4;
    val = decodeFields(buffer.slice(offset, offset + len));
    offset += len;
    fields.arguments = val;
    return fields;
  };
  var encodeBasicConsume = function(channel, fields) {
    var len, offset = 0, val = null, bits = 0, varyingSize = 0, scratchOffset = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    val = fields.consumerTag;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
    var consumerTag_len = Buffer.byteLength(val, "utf8");
    varyingSize += consumerTag_len;
    val = fields.arguments;
    if (val === undefined)
      val = {};
    else if (typeof val != "object")
      throw new TypeError("Field 'arguments' is the wrong type; must be an object");
    len = encodeTable(SCRATCH, val, scratchOffset);
    var arguments_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
    scratchOffset += len;
    varyingSize += arguments_encoded.length;
    var buffer = Buffer.alloc(17 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932180, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.consumerTag;
    val === undefined && (val = "");
    buffer[offset] = consumerTag_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += consumerTag_len;
    val = fields.noLocal;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.noAck;
    val === undefined && (val = false);
    val && (bits += 2);
    val = fields.exclusive;
    val === undefined && (val = false);
    val && (bits += 4);
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 8);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    offset += arguments_encoded.copy(buffer, offset);
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicConsumeOk = function(buffer) {
    var val, len, offset = 0, fields = {
      consumerTag: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.consumerTag = val;
    return fields;
  };
  var encodeBasicConsumeOk = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.consumerTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'consumerTag'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
    var consumerTag_len = Buffer.byteLength(val, "utf8");
    varyingSize += consumerTag_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932181, 7);
    offset = 11;
    val = fields.consumerTag;
    val === undefined && (val = undefined);
    buffer[offset] = consumerTag_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += consumerTag_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicCancel = function(buffer) {
    var val, len, offset = 0, fields = {
      consumerTag: undefined,
      nowait: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.consumerTag = val;
    val = !!(1 & buffer[offset]);
    fields.nowait = val;
    return fields;
  };
  var encodeBasicCancel = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.consumerTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'consumerTag'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
    var consumerTag_len = Buffer.byteLength(val, "utf8");
    varyingSize += consumerTag_len;
    var buffer = Buffer.alloc(14 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932190, 7);
    offset = 11;
    val = fields.consumerTag;
    val === undefined && (val = undefined);
    buffer[offset] = consumerTag_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += consumerTag_len;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicCancelOk = function(buffer) {
    var val, len, offset = 0, fields = {
      consumerTag: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.consumerTag = val;
    return fields;
  };
  var encodeBasicCancelOk = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.consumerTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'consumerTag'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
    var consumerTag_len = Buffer.byteLength(val, "utf8");
    varyingSize += consumerTag_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932191, 7);
    offset = 11;
    val = fields.consumerTag;
    val === undefined && (val = undefined);
    buffer[offset] = consumerTag_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += consumerTag_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicPublish = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      exchange: undefined,
      routingKey: undefined,
      mandatory: undefined,
      immediate: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    val = !!(1 & buffer[offset]);
    fields.mandatory = val;
    val = !!(2 & buffer[offset]);
    fields.immediate = val;
    return fields;
  };
  var encodeBasicPublish = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.exchange;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    var buffer = Buffer.alloc(17 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932200, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.exchange;
    val === undefined && (val = "");
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = "");
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    val = fields.mandatory;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.immediate;
    val === undefined && (val = false);
    val && (bits += 2);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicReturn = function(buffer) {
    var val, len, offset = 0, fields = {
      replyCode: undefined,
      replyText: undefined,
      exchange: undefined,
      routingKey: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.replyCode = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.replyText = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    return fields;
  };
  var encodeBasicReturn = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.replyText;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'replyText' is the wrong type; must be a string (up to 255 chars)");
    var replyText_len = Buffer.byteLength(val, "utf8");
    varyingSize += replyText_len;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'routingKey'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    var buffer = Buffer.alloc(17 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932210, 7);
    offset = 11;
    val = fields.replyCode;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'replyCode'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'replyCode' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.replyText;
    val === undefined && (val = "");
    buffer[offset] = replyText_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += replyText_len;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = undefined);
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicDeliver = function(buffer) {
    var val, len, offset = 0, fields = {
      consumerTag: undefined,
      deliveryTag: undefined,
      redelivered: undefined,
      exchange: undefined,
      routingKey: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.consumerTag = val;
    val = ints.readUInt64BE(buffer, offset);
    offset += 8;
    fields.deliveryTag = val;
    val = !!(1 & buffer[offset]);
    fields.redelivered = val;
    offset++;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    return fields;
  };
  var encodeBasicDeliver = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.consumerTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'consumerTag'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'consumerTag' is the wrong type; must be a string (up to 255 chars)");
    var consumerTag_len = Buffer.byteLength(val, "utf8");
    varyingSize += consumerTag_len;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'routingKey'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    var buffer = Buffer.alloc(24 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932220, 7);
    offset = 11;
    val = fields.consumerTag;
    val === undefined && (val = undefined);
    buffer[offset] = consumerTag_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += consumerTag_len;
    val = fields.deliveryTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'deliveryTag'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
    ints.writeUInt64BE(buffer, val, offset);
    offset += 8;
    val = fields.redelivered;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = undefined);
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicGet = function(buffer) {
    var val, len, offset = 0, fields = {
      ticket: undefined,
      queue: undefined,
      noAck: undefined
    };
    val = buffer.readUInt16BE(offset);
    offset += 2;
    fields.ticket = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.queue = val;
    val = !!(1 & buffer[offset]);
    fields.noAck = val;
    return fields;
  };
  var encodeBasicGet = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.queue;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'queue' is the wrong type; must be a string (up to 255 chars)");
    var queue_len = Buffer.byteLength(val, "utf8");
    varyingSize += queue_len;
    var buffer = Buffer.alloc(16 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932230, 7);
    offset = 11;
    val = fields.ticket;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'ticket' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt16BE(val, offset);
    offset += 2;
    val = fields.queue;
    val === undefined && (val = "");
    buffer[offset] = queue_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += queue_len;
    val = fields.noAck;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicGetOk = function(buffer) {
    var val, len, offset = 0, fields = {
      deliveryTag: undefined,
      redelivered: undefined,
      exchange: undefined,
      routingKey: undefined,
      messageCount: undefined
    };
    val = ints.readUInt64BE(buffer, offset);
    offset += 8;
    fields.deliveryTag = val;
    val = !!(1 & buffer[offset]);
    fields.redelivered = val;
    offset++;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.exchange = val;
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.routingKey = val;
    val = buffer.readUInt32BE(offset);
    offset += 4;
    fields.messageCount = val;
    return fields;
  };
  var encodeBasicGetOk = function(channel, fields) {
    var offset = 0, val = null, bits = 0, varyingSize = 0;
    val = fields.exchange;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'exchange'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'exchange' is the wrong type; must be a string (up to 255 chars)");
    var exchange_len = Buffer.byteLength(val, "utf8");
    varyingSize += exchange_len;
    val = fields.routingKey;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'routingKey'");
    if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'routingKey' is the wrong type; must be a string (up to 255 chars)");
    var routingKey_len = Buffer.byteLength(val, "utf8");
    varyingSize += routingKey_len;
    var buffer = Buffer.alloc(27 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932231, 7);
    offset = 11;
    val = fields.deliveryTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'deliveryTag'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
    ints.writeUInt64BE(buffer, val, offset);
    offset += 8;
    val = fields.redelivered;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    bits = 0;
    val = fields.exchange;
    val === undefined && (val = undefined);
    buffer[offset] = exchange_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += exchange_len;
    val = fields.routingKey;
    val === undefined && (val = undefined);
    buffer[offset] = routingKey_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += routingKey_len;
    val = fields.messageCount;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'messageCount'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'messageCount' is the wrong type; must be a number (but not NaN)");
    buffer.writeUInt32BE(val, offset);
    offset += 4;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicGetEmpty = function(buffer) {
    var val, len, offset = 0, fields = {
      clusterId: undefined
    };
    len = buffer.readUInt8(offset);
    offset++;
    val = buffer.toString("utf8", offset, offset + len);
    offset += len;
    fields.clusterId = val;
    return fields;
  };
  var encodeBasicGetEmpty = function(channel, fields) {
    var offset = 0, val = null, varyingSize = 0;
    val = fields.clusterId;
    if (val === undefined)
      val = "";
    else if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
      throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
    var clusterId_len = Buffer.byteLength(val, "utf8");
    varyingSize += clusterId_len;
    var buffer = Buffer.alloc(13 + varyingSize);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932232, 7);
    offset = 11;
    val = fields.clusterId;
    val === undefined && (val = "");
    buffer[offset] = clusterId_len;
    offset++;
    buffer.write(val, offset, "utf8");
    offset += clusterId_len;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicAck = function(buffer) {
    var val, offset = 0, fields = {
      deliveryTag: undefined,
      multiple: undefined
    };
    val = ints.readUInt64BE(buffer, offset);
    offset += 8;
    fields.deliveryTag = val;
    val = !!(1 & buffer[offset]);
    fields.multiple = val;
    return fields;
  };
  var encodeBasicAck = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932240, 7);
    offset = 11;
    val = fields.deliveryTag;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
    ints.writeUInt64BE(buffer, val, offset);
    offset += 8;
    val = fields.multiple;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicReject = function(buffer) {
    var val, offset = 0, fields = {
      deliveryTag: undefined,
      requeue: undefined
    };
    val = ints.readUInt64BE(buffer, offset);
    offset += 8;
    fields.deliveryTag = val;
    val = !!(1 & buffer[offset]);
    fields.requeue = val;
    return fields;
  };
  var encodeBasicReject = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932250, 7);
    offset = 11;
    val = fields.deliveryTag;
    if (val === undefined)
      throw new Error("Missing value for mandatory field 'deliveryTag'");
    if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
    ints.writeUInt64BE(buffer, val, offset);
    offset += 8;
    val = fields.requeue;
    val === undefined && (val = true);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicRecoverAsync = function(buffer) {
    var val, fields = {
      requeue: undefined
    };
    val = !!(1 & buffer[0]);
    fields.requeue = val;
    return fields;
  };
  var encodeBasicRecoverAsync = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932260, 7);
    offset = 11;
    val = fields.requeue;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicRecover = function(buffer) {
    var val, fields = {
      requeue: undefined
    };
    val = !!(1 & buffer[0]);
    fields.requeue = val;
    return fields;
  };
  var encodeBasicRecover = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932270, 7);
    offset = 11;
    val = fields.requeue;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicRecoverOk = function(buffer) {
    return {};
  };
  var encodeBasicRecoverOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932271, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeBasicNack = function(buffer) {
    var val, offset = 0, fields = {
      deliveryTag: undefined,
      multiple: undefined,
      requeue: undefined
    };
    val = ints.readUInt64BE(buffer, offset);
    offset += 8;
    fields.deliveryTag = val;
    val = !!(1 & buffer[offset]);
    fields.multiple = val;
    val = !!(2 & buffer[offset]);
    fields.requeue = val;
    return fields;
  };
  var encodeBasicNack = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(21);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932280, 7);
    offset = 11;
    val = fields.deliveryTag;
    if (val === undefined)
      val = 0;
    else if (typeof val != "number" || isNaN(val))
      throw new TypeError("Field 'deliveryTag' is the wrong type; must be a number (but not NaN)");
    ints.writeUInt64BE(buffer, val, offset);
    offset += 8;
    val = fields.multiple;
    val === undefined && (val = false);
    val && (bits += 1);
    val = fields.requeue;
    val === undefined && (val = true);
    val && (bits += 2);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxSelect = function(buffer) {
    return {};
  };
  var encodeTxSelect = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898250, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxSelectOk = function(buffer) {
    return {};
  };
  var encodeTxSelectOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898251, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxCommit = function(buffer) {
    return {};
  };
  var encodeTxCommit = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898260, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxCommitOk = function(buffer) {
    return {};
  };
  var encodeTxCommitOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898261, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxRollback = function(buffer) {
    return {};
  };
  var encodeTxRollback = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898270, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeTxRollbackOk = function(buffer) {
    return {};
  };
  var encodeTxRollbackOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5898271, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConfirmSelect = function(buffer) {
    var val, fields = {
      nowait: undefined
    };
    val = !!(1 & buffer[0]);
    fields.nowait = val;
    return fields;
  };
  var encodeConfirmSelect = function(channel, fields) {
    var offset = 0, val = null, bits = 0, buffer = Buffer.alloc(13);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5570570, 7);
    offset = 11;
    val = fields.nowait;
    val === undefined && (val = false);
    val && (bits += 1);
    buffer[offset] = bits;
    offset++;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var decodeConfirmSelectOk = function(buffer) {
    return {};
  };
  var encodeConfirmSelectOk = function(channel, fields) {
    var offset = 0, buffer = Buffer.alloc(12);
    buffer[0] = 1;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(5570571, 7);
    offset = 11;
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    return buffer;
  };
  var encodeBasicProperties = function(channel, size, fields) {
    var val, len, offset = 0, flags = 0, scratchOffset = 0, varyingSize = 0;
    val = fields.contentType;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'contentType' is the wrong type; must be a string (up to 255 chars)");
      var contentType_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += contentType_len;
    }
    val = fields.contentEncoding;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'contentEncoding' is the wrong type; must be a string (up to 255 chars)");
      var contentEncoding_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += contentEncoding_len;
    }
    val = fields.headers;
    if (val != null) {
      if (typeof val != "object")
        throw new TypeError("Field 'headers' is the wrong type; must be an object");
      len = encodeTable(SCRATCH, val, scratchOffset);
      var headers_encoded = SCRATCH.slice(scratchOffset, scratchOffset + len);
      scratchOffset += len;
      varyingSize += headers_encoded.length;
    }
    val = fields.deliveryMode;
    if (val != null) {
      if (typeof val != "number" || isNaN(val))
        throw new TypeError("Field 'deliveryMode' is the wrong type; must be a number (but not NaN)");
      varyingSize += 1;
    }
    val = fields.priority;
    if (val != null) {
      if (typeof val != "number" || isNaN(val))
        throw new TypeError("Field 'priority' is the wrong type; must be a number (but not NaN)");
      varyingSize += 1;
    }
    val = fields.correlationId;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'correlationId' is the wrong type; must be a string (up to 255 chars)");
      var correlationId_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += correlationId_len;
    }
    val = fields.replyTo;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'replyTo' is the wrong type; must be a string (up to 255 chars)");
      var replyTo_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += replyTo_len;
    }
    val = fields.expiration;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'expiration' is the wrong type; must be a string (up to 255 chars)");
      var expiration_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += expiration_len;
    }
    val = fields.messageId;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'messageId' is the wrong type; must be a string (up to 255 chars)");
      var messageId_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += messageId_len;
    }
    val = fields.timestamp;
    if (val != null) {
      if (typeof val != "number" || isNaN(val))
        throw new TypeError("Field 'timestamp' is the wrong type; must be a number (but not NaN)");
      varyingSize += 8;
    }
    val = fields.type;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'type' is the wrong type; must be a string (up to 255 chars)");
      var type_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += type_len;
    }
    val = fields.userId;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'userId' is the wrong type; must be a string (up to 255 chars)");
      var userId_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += userId_len;
    }
    val = fields.appId;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'appId' is the wrong type; must be a string (up to 255 chars)");
      var appId_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += appId_len;
    }
    val = fields.clusterId;
    if (val != null) {
      if (!(typeof val == "string" && Buffer.byteLength(val) < 256))
        throw new TypeError("Field 'clusterId' is the wrong type; must be a string (up to 255 chars)");
      var clusterId_len = Buffer.byteLength(val, "utf8");
      varyingSize += 1;
      varyingSize += clusterId_len;
    }
    var buffer = Buffer.alloc(22 + varyingSize);
    buffer[0] = 2;
    buffer.writeUInt16BE(channel, 1);
    buffer.writeUInt32BE(3932160, 7);
    ints.writeUInt64BE(buffer, size, 11);
    flags = 0;
    offset = 21;
    val = fields.contentType;
    if (val != null) {
      flags += 32768;
      buffer[offset] = contentType_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += contentType_len;
    }
    val = fields.contentEncoding;
    if (val != null) {
      flags += 16384;
      buffer[offset] = contentEncoding_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += contentEncoding_len;
    }
    val = fields.headers;
    if (val != null) {
      flags += 8192;
      offset += headers_encoded.copy(buffer, offset);
    }
    val = fields.deliveryMode;
    if (val != null) {
      flags += 4096;
      buffer.writeUInt8(val, offset);
      offset++;
    }
    val = fields.priority;
    if (val != null) {
      flags += 2048;
      buffer.writeUInt8(val, offset);
      offset++;
    }
    val = fields.correlationId;
    if (val != null) {
      flags += 1024;
      buffer[offset] = correlationId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += correlationId_len;
    }
    val = fields.replyTo;
    if (val != null) {
      flags += 512;
      buffer[offset] = replyTo_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += replyTo_len;
    }
    val = fields.expiration;
    if (val != null) {
      flags += 256;
      buffer[offset] = expiration_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += expiration_len;
    }
    val = fields.messageId;
    if (val != null) {
      flags += 128;
      buffer[offset] = messageId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += messageId_len;
    }
    val = fields.timestamp;
    if (val != null) {
      flags += 64;
      ints.writeUInt64BE(buffer, val, offset);
      offset += 8;
    }
    val = fields.type;
    if (val != null) {
      flags += 32;
      buffer[offset] = type_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += type_len;
    }
    val = fields.userId;
    if (val != null) {
      flags += 16;
      buffer[offset] = userId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += userId_len;
    }
    val = fields.appId;
    if (val != null) {
      flags += 8;
      buffer[offset] = appId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += appId_len;
    }
    val = fields.clusterId;
    if (val != null) {
      flags += 4;
      buffer[offset] = clusterId_len;
      offset++;
      buffer.write(val, offset, "utf8");
      offset += clusterId_len;
    }
    buffer[offset] = 206;
    buffer.writeUInt32BE(offset - 7, 3);
    buffer.writeUInt16BE(flags, 19);
    return buffer.slice(0, offset + 1);
  };
  var decodeBasicProperties = function(buffer) {
    var flags, val, len, offset = 2;
    flags = buffer.readUInt16BE(0);
    if (flags === 0)
      return {};
    var fields = {
      contentType: undefined,
      contentEncoding: undefined,
      headers: undefined,
      deliveryMode: undefined,
      priority: undefined,
      correlationId: undefined,
      replyTo: undefined,
      expiration: undefined,
      messageId: undefined,
      timestamp: undefined,
      type: undefined,
      userId: undefined,
      appId: undefined,
      clusterId: undefined
    };
    if (32768 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.contentType = val;
    }
    if (16384 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.contentEncoding = val;
    }
    if (8192 & flags) {
      len = buffer.readUInt32BE(offset);
      offset += 4;
      val = decodeFields(buffer.slice(offset, offset + len));
      offset += len;
      fields.headers = val;
    }
    if (4096 & flags) {
      val = buffer[offset];
      offset++;
      fields.deliveryMode = val;
    }
    if (2048 & flags) {
      val = buffer[offset];
      offset++;
      fields.priority = val;
    }
    if (1024 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.correlationId = val;
    }
    if (512 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.replyTo = val;
    }
    if (256 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.expiration = val;
    }
    if (128 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.messageId = val;
    }
    if (64 & flags) {
      val = ints.readUInt64BE(buffer, offset);
      offset += 8;
      fields.timestamp = val;
    }
    if (32 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.type = val;
    }
    if (16 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.userId = val;
    }
    if (8 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.appId = val;
    }
    if (4 & flags) {
      len = buffer.readUInt8(offset);
      offset++;
      val = buffer.toString("utf8", offset, offset + len);
      offset += len;
      fields.clusterId = val;
    }
    return fields;
  };
  var codec = require_codec();
  var ints = require_buffer_more_ints();
  var encodeTable = codec.encodeTable;
  var decodeFields = codec.decodeFields;
  var SCRATCH = Buffer.alloc(65536);
  var EMPTY_OBJECT = Object.freeze({});
  exports.constants = {
    FRAME_METHOD: 1,
    FRAME_HEADER: 2,
    FRAME_BODY: 3,
    FRAME_HEARTBEAT: 8,
    FRAME_MIN_SIZE: 4096,
    FRAME_END: 206,
    REPLY_SUCCESS: 200,
    CONTENT_TOO_LARGE: 311,
    NO_ROUTE: 312,
    NO_CONSUMERS: 313,
    ACCESS_REFUSED: 403,
    NOT_FOUND: 404,
    RESOURCE_LOCKED: 405,
    PRECONDITION_FAILED: 406,
    CONNECTION_FORCED: 320,
    INVALID_PATH: 402,
    FRAME_ERROR: 501,
    SYNTAX_ERROR: 502,
    COMMAND_INVALID: 503,
    CHANNEL_ERROR: 504,
    UNEXPECTED_FRAME: 505,
    RESOURCE_ERROR: 506,
    NOT_ALLOWED: 530,
    NOT_IMPLEMENTED: 540,
    INTERNAL_ERROR: 541
  };
  exports.constant_strs = {
    "1": "FRAME-METHOD",
    "2": "FRAME-HEADER",
    "3": "FRAME-BODY",
    "8": "FRAME-HEARTBEAT",
    "200": "REPLY-SUCCESS",
    "206": "FRAME-END",
    "311": "CONTENT-TOO-LARGE",
    "312": "NO-ROUTE",
    "313": "NO-CONSUMERS",
    "320": "CONNECTION-FORCED",
    "402": "INVALID-PATH",
    "403": "ACCESS-REFUSED",
    "404": "NOT-FOUND",
    "405": "RESOURCE-LOCKED",
    "406": "PRECONDITION-FAILED",
    "501": "FRAME-ERROR",
    "502": "SYNTAX-ERROR",
    "503": "COMMAND-INVALID",
    "504": "CHANNEL-ERROR",
    "505": "UNEXPECTED-FRAME",
    "506": "RESOURCE-ERROR",
    "530": "NOT-ALLOWED",
    "540": "NOT-IMPLEMENTED",
    "541": "INTERNAL-ERROR",
    "4096": "FRAME-MIN-SIZE"
  };
  exports.FRAME_OVERHEAD = 8;
  exports.decode = function(id, buf) {
    switch (id) {
      case 655370:
        return decodeConnectionStart(buf);
      case 655371:
        return decodeConnectionStartOk(buf);
      case 655380:
        return decodeConnectionSecure(buf);
      case 655381:
        return decodeConnectionSecureOk(buf);
      case 655390:
        return decodeConnectionTune(buf);
      case 655391:
        return decodeConnectionTuneOk(buf);
      case 655400:
        return decodeConnectionOpen(buf);
      case 655401:
        return decodeConnectionOpenOk(buf);
      case 655410:
        return decodeConnectionClose(buf);
      case 655411:
        return decodeConnectionCloseOk(buf);
      case 655420:
        return decodeConnectionBlocked(buf);
      case 655421:
        return decodeConnectionUnblocked(buf);
      case 1310730:
        return decodeChannelOpen(buf);
      case 1310731:
        return decodeChannelOpenOk(buf);
      case 1310740:
        return decodeChannelFlow(buf);
      case 1310741:
        return decodeChannelFlowOk(buf);
      case 1310760:
        return decodeChannelClose(buf);
      case 1310761:
        return decodeChannelCloseOk(buf);
      case 1966090:
        return decodeAccessRequest(buf);
      case 1966091:
        return decodeAccessRequestOk(buf);
      case 2621450:
        return decodeExchangeDeclare(buf);
      case 2621451:
        return decodeExchangeDeclareOk(buf);
      case 2621460:
        return decodeExchangeDelete(buf);
      case 2621461:
        return decodeExchangeDeleteOk(buf);
      case 2621470:
        return decodeExchangeBind(buf);
      case 2621471:
        return decodeExchangeBindOk(buf);
      case 2621480:
        return decodeExchangeUnbind(buf);
      case 2621491:
        return decodeExchangeUnbindOk(buf);
      case 3276810:
        return decodeQueueDeclare(buf);
      case 3276811:
        return decodeQueueDeclareOk(buf);
      case 3276820:
        return decodeQueueBind(buf);
      case 3276821:
        return decodeQueueBindOk(buf);
      case 3276830:
        return decodeQueuePurge(buf);
      case 3276831:
        return decodeQueuePurgeOk(buf);
      case 3276840:
        return decodeQueueDelete(buf);
      case 3276841:
        return decodeQueueDeleteOk(buf);
      case 3276850:
        return decodeQueueUnbind(buf);
      case 3276851:
        return decodeQueueUnbindOk(buf);
      case 3932170:
        return decodeBasicQos(buf);
      case 3932171:
        return decodeBasicQosOk(buf);
      case 3932180:
        return decodeBasicConsume(buf);
      case 3932181:
        return decodeBasicConsumeOk(buf);
      case 3932190:
        return decodeBasicCancel(buf);
      case 3932191:
        return decodeBasicCancelOk(buf);
      case 3932200:
        return decodeBasicPublish(buf);
      case 3932210:
        return decodeBasicReturn(buf);
      case 3932220:
        return decodeBasicDeliver(buf);
      case 3932230:
        return decodeBasicGet(buf);
      case 3932231:
        return decodeBasicGetOk(buf);
      case 3932232:
        return decodeBasicGetEmpty(buf);
      case 3932240:
        return decodeBasicAck(buf);
      case 3932250:
        return decodeBasicReject(buf);
      case 3932260:
        return decodeBasicRecoverAsync(buf);
      case 3932270:
        return decodeBasicRecover(buf);
      case 3932271:
        return decodeBasicRecoverOk(buf);
      case 3932280:
        return decodeBasicNack(buf);
      case 5898250:
        return decodeTxSelect(buf);
      case 5898251:
        return decodeTxSelectOk(buf);
      case 5898260:
        return decodeTxCommit(buf);
      case 5898261:
        return decodeTxCommitOk(buf);
      case 5898270:
        return decodeTxRollback(buf);
      case 5898271:
        return decodeTxRollbackOk(buf);
      case 5570570:
        return decodeConfirmSelect(buf);
      case 5570571:
        return decodeConfirmSelectOk(buf);
      case 60:
        return decodeBasicProperties(buf);
      default:
        throw new Error("Unknown class/method ID");
    }
  };
  exports.encodeMethod = function(id, channel, fields) {
    switch (id) {
      case 655370:
        return encodeConnectionStart(channel, fields);
      case 655371:
        return encodeConnectionStartOk(channel, fields);
      case 655380:
        return encodeConnectionSecure(channel, fields);
      case 655381:
        return encodeConnectionSecureOk(channel, fields);
      case 655390:
        return encodeConnectionTune(channel, fields);
      case 655391:
        return encodeConnectionTuneOk(channel, fields);
      case 655400:
        return encodeConnectionOpen(channel, fields);
      case 655401:
        return encodeConnectionOpenOk(channel, fields);
      case 655410:
        return encodeConnectionClose(channel, fields);
      case 655411:
        return encodeConnectionCloseOk(channel, fields);
      case 655420:
        return encodeConnectionBlocked(channel, fields);
      case 655421:
        return encodeConnectionUnblocked(channel, fields);
      case 1310730:
        return encodeChannelOpen(channel, fields);
      case 1310731:
        return encodeChannelOpenOk(channel, fields);
      case 1310740:
        return encodeChannelFlow(channel, fields);
      case 1310741:
        return encodeChannelFlowOk(channel, fields);
      case 1310760:
        return encodeChannelClose(channel, fields);
      case 1310761:
        return encodeChannelCloseOk(channel, fields);
      case 1966090:
        return encodeAccessRequest(channel, fields);
      case 1966091:
        return encodeAccessRequestOk(channel, fields);
      case 2621450:
        return encodeExchangeDeclare(channel, fields);
      case 2621451:
        return encodeExchangeDeclareOk(channel, fields);
      case 2621460:
        return encodeExchangeDelete(channel, fields);
      case 2621461:
        return encodeExchangeDeleteOk(channel, fields);
      case 2621470:
        return encodeExchangeBind(channel, fields);
      case 2621471:
        return encodeExchangeBindOk(channel, fields);
      case 2621480:
        return encodeExchangeUnbind(channel, fields);
      case 2621491:
        return encodeExchangeUnbindOk(channel, fields);
      case 3276810:
        return encodeQueueDeclare(channel, fields);
      case 3276811:
        return encodeQueueDeclareOk(channel, fields);
      case 3276820:
        return encodeQueueBind(channel, fields);
      case 3276821:
        return encodeQueueBindOk(channel, fields);
      case 3276830:
        return encodeQueuePurge(channel, fields);
      case 3276831:
        return encodeQueuePurgeOk(channel, fields);
      case 3276840:
        return encodeQueueDelete(channel, fields);
      case 3276841:
        return encodeQueueDeleteOk(channel, fields);
      case 3276850:
        return encodeQueueUnbind(channel, fields);
      case 3276851:
        return encodeQueueUnbindOk(channel, fields);
      case 3932170:
        return encodeBasicQos(channel, fields);
      case 3932171:
        return encodeBasicQosOk(channel, fields);
      case 3932180:
        return encodeBasicConsume(channel, fields);
      case 3932181:
        return encodeBasicConsumeOk(channel, fields);
      case 3932190:
        return encodeBasicCancel(channel, fields);
      case 3932191:
        return encodeBasicCancelOk(channel, fields);
      case 3932200:
        return encodeBasicPublish(channel, fields);
      case 3932210:
        return encodeBasicReturn(channel, fields);
      case 3932220:
        return encodeBasicDeliver(channel, fields);
      case 3932230:
        return encodeBasicGet(channel, fields);
      case 3932231:
        return encodeBasicGetOk(channel, fields);
      case 3932232:
        return encodeBasicGetEmpty(channel, fields);
      case 3932240:
        return encodeBasicAck(channel, fields);
      case 3932250:
        return encodeBasicReject(channel, fields);
      case 3932260:
        return encodeBasicRecoverAsync(channel, fields);
      case 3932270:
        return encodeBasicRecover(channel, fields);
      case 3932271:
        return encodeBasicRecoverOk(channel, fields);
      case 3932280:
        return encodeBasicNack(channel, fields);
      case 5898250:
        return encodeTxSelect(channel, fields);
      case 5898251:
        return encodeTxSelectOk(channel, fields);
      case 5898260:
        return encodeTxCommit(channel, fields);
      case 5898261:
        return encodeTxCommitOk(channel, fields);
      case 5898270:
        return encodeTxRollback(channel, fields);
      case 5898271:
        return encodeTxRollbackOk(channel, fields);
      case 5570570:
        return encodeConfirmSelect(channel, fields);
      case 5570571:
        return encodeConfirmSelectOk(channel, fields);
      default:
        throw new Error("Unknown class/method ID");
    }
  };
  exports.encodeProperties = function(id, channel, size, fields) {
    switch (id) {
      case 60:
        return encodeBasicProperties(channel, size, fields);
      default:
        throw new Error("Unknown class/properties ID");
    }
  };
  exports.info = function(id) {
    switch (id) {
      case 655370:
        return methodInfoConnectionStart;
      case 655371:
        return methodInfoConnectionStartOk;
      case 655380:
        return methodInfoConnectionSecure;
      case 655381:
        return methodInfoConnectionSecureOk;
      case 655390:
        return methodInfoConnectionTune;
      case 655391:
        return methodInfoConnectionTuneOk;
      case 655400:
        return methodInfoConnectionOpen;
      case 655401:
        return methodInfoConnectionOpenOk;
      case 655410:
        return methodInfoConnectionClose;
      case 655411:
        return methodInfoConnectionCloseOk;
      case 655420:
        return methodInfoConnectionBlocked;
      case 655421:
        return methodInfoConnectionUnblocked;
      case 1310730:
        return methodInfoChannelOpen;
      case 1310731:
        return methodInfoChannelOpenOk;
      case 1310740:
        return methodInfoChannelFlow;
      case 1310741:
        return methodInfoChannelFlowOk;
      case 1310760:
        return methodInfoChannelClose;
      case 1310761:
        return methodInfoChannelCloseOk;
      case 1966090:
        return methodInfoAccessRequest;
      case 1966091:
        return methodInfoAccessRequestOk;
      case 2621450:
        return methodInfoExchangeDeclare;
      case 2621451:
        return methodInfoExchangeDeclareOk;
      case 2621460:
        return methodInfoExchangeDelete;
      case 2621461:
        return methodInfoExchangeDeleteOk;
      case 2621470:
        return methodInfoExchangeBind;
      case 2621471:
        return methodInfoExchangeBindOk;
      case 2621480:
        return methodInfoExchangeUnbind;
      case 2621491:
        return methodInfoExchangeUnbindOk;
      case 3276810:
        return methodInfoQueueDeclare;
      case 3276811:
        return methodInfoQueueDeclareOk;
      case 3276820:
        return methodInfoQueueBind;
      case 3276821:
        return methodInfoQueueBindOk;
      case 3276830:
        return methodInfoQueuePurge;
      case 3276831:
        return methodInfoQueuePurgeOk;
      case 3276840:
        return methodInfoQueueDelete;
      case 3276841:
        return methodInfoQueueDeleteOk;
      case 3276850:
        return methodInfoQueueUnbind;
      case 3276851:
        return methodInfoQueueUnbindOk;
      case 3932170:
        return methodInfoBasicQos;
      case 3932171:
        return methodInfoBasicQosOk;
      case 3932180:
        return methodInfoBasicConsume;
      case 3932181:
        return methodInfoBasicConsumeOk;
      case 3932190:
        return methodInfoBasicCancel;
      case 3932191:
        return methodInfoBasicCancelOk;
      case 3932200:
        return methodInfoBasicPublish;
      case 3932210:
        return methodInfoBasicReturn;
      case 3932220:
        return methodInfoBasicDeliver;
      case 3932230:
        return methodInfoBasicGet;
      case 3932231:
        return methodInfoBasicGetOk;
      case 3932232:
        return methodInfoBasicGetEmpty;
      case 3932240:
        return methodInfoBasicAck;
      case 3932250:
        return methodInfoBasicReject;
      case 3932260:
        return methodInfoBasicRecoverAsync;
      case 3932270:
        return methodInfoBasicRecover;
      case 3932271:
        return methodInfoBasicRecoverOk;
      case 3932280:
        return methodInfoBasicNack;
      case 5898250:
        return methodInfoTxSelect;
      case 5898251:
        return methodInfoTxSelectOk;
      case 5898260:
        return methodInfoTxCommit;
      case 5898261:
        return methodInfoTxCommitOk;
      case 5898270:
        return methodInfoTxRollback;
      case 5898271:
        return methodInfoTxRollbackOk;
      case 5570570:
        return methodInfoConfirmSelect;
      case 5570571:
        return methodInfoConfirmSelectOk;
      case 60:
        return propertiesInfoBasicProperties;
      default:
        throw new Error("Unknown class/method ID");
    }
  };
  exports.ConnectionStart = 655370;
  var methodInfoConnectionStart = exports.methodInfoConnectionStart = {
    id: 655370,
    classId: 10,
    methodId: 10,
    name: "ConnectionStart",
    args: [{
      type: "octet",
      name: "versionMajor",
      default: 0
    }, {
      type: "octet",
      name: "versionMinor",
      default: 9
    }, {
      type: "table",
      name: "serverProperties"
    }, {
      type: "longstr",
      name: "mechanisms",
      default: "PLAIN"
    }, {
      type: "longstr",
      name: "locales",
      default: "en_US"
    }]
  };
  exports.ConnectionStartOk = 655371;
  var methodInfoConnectionStartOk = exports.methodInfoConnectionStartOk = {
    id: 655371,
    classId: 10,
    methodId: 11,
    name: "ConnectionStartOk",
    args: [{
      type: "table",
      name: "clientProperties"
    }, {
      type: "shortstr",
      name: "mechanism",
      default: "PLAIN"
    }, {
      type: "longstr",
      name: "response"
    }, {
      type: "shortstr",
      name: "locale",
      default: "en_US"
    }]
  };
  exports.ConnectionSecure = 655380;
  var methodInfoConnectionSecure = exports.methodInfoConnectionSecure = {
    id: 655380,
    classId: 10,
    methodId: 20,
    name: "ConnectionSecure",
    args: [{
      type: "longstr",
      name: "challenge"
    }]
  };
  exports.ConnectionSecureOk = 655381;
  var methodInfoConnectionSecureOk = exports.methodInfoConnectionSecureOk = {
    id: 655381,
    classId: 10,
    methodId: 21,
    name: "ConnectionSecureOk",
    args: [{
      type: "longstr",
      name: "response"
    }]
  };
  exports.ConnectionTune = 655390;
  var methodInfoConnectionTune = exports.methodInfoConnectionTune = {
    id: 655390,
    classId: 10,
    methodId: 30,
    name: "ConnectionTune",
    args: [{
      type: "short",
      name: "channelMax",
      default: 0
    }, {
      type: "long",
      name: "frameMax",
      default: 0
    }, {
      type: "short",
      name: "heartbeat",
      default: 0
    }]
  };
  exports.ConnectionTuneOk = 655391;
  var methodInfoConnectionTuneOk = exports.methodInfoConnectionTuneOk = {
    id: 655391,
    classId: 10,
    methodId: 31,
    name: "ConnectionTuneOk",
    args: [{
      type: "short",
      name: "channelMax",
      default: 0
    }, {
      type: "long",
      name: "frameMax",
      default: 0
    }, {
      type: "short",
      name: "heartbeat",
      default: 0
    }]
  };
  exports.ConnectionOpen = 655400;
  var methodInfoConnectionOpen = exports.methodInfoConnectionOpen = {
    id: 655400,
    classId: 10,
    methodId: 40,
    name: "ConnectionOpen",
    args: [{
      type: "shortstr",
      name: "virtualHost",
      default: "/"
    }, {
      type: "shortstr",
      name: "capabilities",
      default: ""
    }, {
      type: "bit",
      name: "insist",
      default: false
    }]
  };
  exports.ConnectionOpenOk = 655401;
  var methodInfoConnectionOpenOk = exports.methodInfoConnectionOpenOk = {
    id: 655401,
    classId: 10,
    methodId: 41,
    name: "ConnectionOpenOk",
    args: [{
      type: "shortstr",
      name: "knownHosts",
      default: ""
    }]
  };
  exports.ConnectionClose = 655410;
  var methodInfoConnectionClose = exports.methodInfoConnectionClose = {
    id: 655410,
    classId: 10,
    methodId: 50,
    name: "ConnectionClose",
    args: [{
      type: "short",
      name: "replyCode"
    }, {
      type: "shortstr",
      name: "replyText",
      default: ""
    }, {
      type: "short",
      name: "classId"
    }, {
      type: "short",
      name: "methodId"
    }]
  };
  exports.ConnectionCloseOk = 655411;
  var methodInfoConnectionCloseOk = exports.methodInfoConnectionCloseOk = {
    id: 655411,
    classId: 10,
    methodId: 51,
    name: "ConnectionCloseOk",
    args: []
  };
  exports.ConnectionBlocked = 655420;
  var methodInfoConnectionBlocked = exports.methodInfoConnectionBlocked = {
    id: 655420,
    classId: 10,
    methodId: 60,
    name: "ConnectionBlocked",
    args: [{
      type: "shortstr",
      name: "reason",
      default: ""
    }]
  };
  exports.ConnectionUnblocked = 655421;
  var methodInfoConnectionUnblocked = exports.methodInfoConnectionUnblocked = {
    id: 655421,
    classId: 10,
    methodId: 61,
    name: "ConnectionUnblocked",
    args: []
  };
  exports.ChannelOpen = 1310730;
  var methodInfoChannelOpen = exports.methodInfoChannelOpen = {
    id: 1310730,
    classId: 20,
    methodId: 10,
    name: "ChannelOpen",
    args: [{
      type: "shortstr",
      name: "outOfBand",
      default: ""
    }]
  };
  exports.ChannelOpenOk = 1310731;
  var methodInfoChannelOpenOk = exports.methodInfoChannelOpenOk = {
    id: 1310731,
    classId: 20,
    methodId: 11,
    name: "ChannelOpenOk",
    args: [{
      type: "longstr",
      name: "channelId",
      default: ""
    }]
  };
  exports.ChannelFlow = 1310740;
  var methodInfoChannelFlow = exports.methodInfoChannelFlow = {
    id: 1310740,
    classId: 20,
    methodId: 20,
    name: "ChannelFlow",
    args: [{
      type: "bit",
      name: "active"
    }]
  };
  exports.ChannelFlowOk = 1310741;
  var methodInfoChannelFlowOk = exports.methodInfoChannelFlowOk = {
    id: 1310741,
    classId: 20,
    methodId: 21,
    name: "ChannelFlowOk",
    args: [{
      type: "bit",
      name: "active"
    }]
  };
  exports.ChannelClose = 1310760;
  var methodInfoChannelClose = exports.methodInfoChannelClose = {
    id: 1310760,
    classId: 20,
    methodId: 40,
    name: "ChannelClose",
    args: [{
      type: "short",
      name: "replyCode"
    }, {
      type: "shortstr",
      name: "replyText",
      default: ""
    }, {
      type: "short",
      name: "classId"
    }, {
      type: "short",
      name: "methodId"
    }]
  };
  exports.ChannelCloseOk = 1310761;
  var methodInfoChannelCloseOk = exports.methodInfoChannelCloseOk = {
    id: 1310761,
    classId: 20,
    methodId: 41,
    name: "ChannelCloseOk",
    args: []
  };
  exports.AccessRequest = 1966090;
  var methodInfoAccessRequest = exports.methodInfoAccessRequest = {
    id: 1966090,
    classId: 30,
    methodId: 10,
    name: "AccessRequest",
    args: [{
      type: "shortstr",
      name: "realm",
      default: "/data"
    }, {
      type: "bit",
      name: "exclusive",
      default: false
    }, {
      type: "bit",
      name: "passive",
      default: true
    }, {
      type: "bit",
      name: "active",
      default: true
    }, {
      type: "bit",
      name: "write",
      default: true
    }, {
      type: "bit",
      name: "read",
      default: true
    }]
  };
  exports.AccessRequestOk = 1966091;
  var methodInfoAccessRequestOk = exports.methodInfoAccessRequestOk = {
    id: 1966091,
    classId: 30,
    methodId: 11,
    name: "AccessRequestOk",
    args: [{
      type: "short",
      name: "ticket",
      default: 1
    }]
  };
  exports.ExchangeDeclare = 2621450;
  var methodInfoExchangeDeclare = exports.methodInfoExchangeDeclare = {
    id: 2621450,
    classId: 40,
    methodId: 10,
    name: "ExchangeDeclare",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "type",
      default: "direct"
    }, {
      type: "bit",
      name: "passive",
      default: false
    }, {
      type: "bit",
      name: "durable",
      default: false
    }, {
      type: "bit",
      name: "autoDelete",
      default: false
    }, {
      type: "bit",
      name: "internal",
      default: false
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.ExchangeDeclareOk = 2621451;
  var methodInfoExchangeDeclareOk = exports.methodInfoExchangeDeclareOk = {
    id: 2621451,
    classId: 40,
    methodId: 11,
    name: "ExchangeDeclareOk",
    args: []
  };
  exports.ExchangeDelete = 2621460;
  var methodInfoExchangeDelete = exports.methodInfoExchangeDelete = {
    id: 2621460,
    classId: 40,
    methodId: 20,
    name: "ExchangeDelete",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "bit",
      name: "ifUnused",
      default: false
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }]
  };
  exports.ExchangeDeleteOk = 2621461;
  var methodInfoExchangeDeleteOk = exports.methodInfoExchangeDeleteOk = {
    id: 2621461,
    classId: 40,
    methodId: 21,
    name: "ExchangeDeleteOk",
    args: []
  };
  exports.ExchangeBind = 2621470;
  var methodInfoExchangeBind = exports.methodInfoExchangeBind = {
    id: 2621470,
    classId: 40,
    methodId: 30,
    name: "ExchangeBind",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "destination"
    }, {
      type: "shortstr",
      name: "source"
    }, {
      type: "shortstr",
      name: "routingKey",
      default: ""
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.ExchangeBindOk = 2621471;
  var methodInfoExchangeBindOk = exports.methodInfoExchangeBindOk = {
    id: 2621471,
    classId: 40,
    methodId: 31,
    name: "ExchangeBindOk",
    args: []
  };
  exports.ExchangeUnbind = 2621480;
  var methodInfoExchangeUnbind = exports.methodInfoExchangeUnbind = {
    id: 2621480,
    classId: 40,
    methodId: 40,
    name: "ExchangeUnbind",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "destination"
    }, {
      type: "shortstr",
      name: "source"
    }, {
      type: "shortstr",
      name: "routingKey",
      default: ""
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.ExchangeUnbindOk = 2621491;
  var methodInfoExchangeUnbindOk = exports.methodInfoExchangeUnbindOk = {
    id: 2621491,
    classId: 40,
    methodId: 51,
    name: "ExchangeUnbindOk",
    args: []
  };
  exports.QueueDeclare = 3276810;
  var methodInfoQueueDeclare = exports.methodInfoQueueDeclare = {
    id: 3276810,
    classId: 50,
    methodId: 10,
    name: "QueueDeclare",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "bit",
      name: "passive",
      default: false
    }, {
      type: "bit",
      name: "durable",
      default: false
    }, {
      type: "bit",
      name: "exclusive",
      default: false
    }, {
      type: "bit",
      name: "autoDelete",
      default: false
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.QueueDeclareOk = 3276811;
  var methodInfoQueueDeclareOk = exports.methodInfoQueueDeclareOk = {
    id: 3276811,
    classId: 50,
    methodId: 11,
    name: "QueueDeclareOk",
    args: [{
      type: "shortstr",
      name: "queue"
    }, {
      type: "long",
      name: "messageCount"
    }, {
      type: "long",
      name: "consumerCount"
    }]
  };
  exports.QueueBind = 3276820;
  var methodInfoQueueBind = exports.methodInfoQueueBind = {
    id: 3276820,
    classId: 50,
    methodId: 20,
    name: "QueueBind",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "routingKey",
      default: ""
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.QueueBindOk = 3276821;
  var methodInfoQueueBindOk = exports.methodInfoQueueBindOk = {
    id: 3276821,
    classId: 50,
    methodId: 21,
    name: "QueueBindOk",
    args: []
  };
  exports.QueuePurge = 3276830;
  var methodInfoQueuePurge = exports.methodInfoQueuePurge = {
    id: 3276830,
    classId: 50,
    methodId: 30,
    name: "QueuePurge",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }]
  };
  exports.QueuePurgeOk = 3276831;
  var methodInfoQueuePurgeOk = exports.methodInfoQueuePurgeOk = {
    id: 3276831,
    classId: 50,
    methodId: 31,
    name: "QueuePurgeOk",
    args: [{
      type: "long",
      name: "messageCount"
    }]
  };
  exports.QueueDelete = 3276840;
  var methodInfoQueueDelete = exports.methodInfoQueueDelete = {
    id: 3276840,
    classId: 50,
    methodId: 40,
    name: "QueueDelete",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "bit",
      name: "ifUnused",
      default: false
    }, {
      type: "bit",
      name: "ifEmpty",
      default: false
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }]
  };
  exports.QueueDeleteOk = 3276841;
  var methodInfoQueueDeleteOk = exports.methodInfoQueueDeleteOk = {
    id: 3276841,
    classId: 50,
    methodId: 41,
    name: "QueueDeleteOk",
    args: [{
      type: "long",
      name: "messageCount"
    }]
  };
  exports.QueueUnbind = 3276850;
  var methodInfoQueueUnbind = exports.methodInfoQueueUnbind = {
    id: 3276850,
    classId: 50,
    methodId: 50,
    name: "QueueUnbind",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "routingKey",
      default: ""
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.QueueUnbindOk = 3276851;
  var methodInfoQueueUnbindOk = exports.methodInfoQueueUnbindOk = {
    id: 3276851,
    classId: 50,
    methodId: 51,
    name: "QueueUnbindOk",
    args: []
  };
  exports.BasicQos = 3932170;
  var methodInfoBasicQos = exports.methodInfoBasicQos = {
    id: 3932170,
    classId: 60,
    methodId: 10,
    name: "BasicQos",
    args: [{
      type: "long",
      name: "prefetchSize",
      default: 0
    }, {
      type: "short",
      name: "prefetchCount",
      default: 0
    }, {
      type: "bit",
      name: "global",
      default: false
    }]
  };
  exports.BasicQosOk = 3932171;
  var methodInfoBasicQosOk = exports.methodInfoBasicQosOk = {
    id: 3932171,
    classId: 60,
    methodId: 11,
    name: "BasicQosOk",
    args: []
  };
  exports.BasicConsume = 3932180;
  var methodInfoBasicConsume = exports.methodInfoBasicConsume = {
    id: 3932180,
    classId: 60,
    methodId: 20,
    name: "BasicConsume",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "shortstr",
      name: "consumerTag",
      default: ""
    }, {
      type: "bit",
      name: "noLocal",
      default: false
    }, {
      type: "bit",
      name: "noAck",
      default: false
    }, {
      type: "bit",
      name: "exclusive",
      default: false
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }, {
      type: "table",
      name: "arguments",
      default: {}
    }]
  };
  exports.BasicConsumeOk = 3932181;
  var methodInfoBasicConsumeOk = exports.methodInfoBasicConsumeOk = {
    id: 3932181,
    classId: 60,
    methodId: 21,
    name: "BasicConsumeOk",
    args: [{
      type: "shortstr",
      name: "consumerTag"
    }]
  };
  exports.BasicCancel = 3932190;
  var methodInfoBasicCancel = exports.methodInfoBasicCancel = {
    id: 3932190,
    classId: 60,
    methodId: 30,
    name: "BasicCancel",
    args: [{
      type: "shortstr",
      name: "consumerTag"
    }, {
      type: "bit",
      name: "nowait",
      default: false
    }]
  };
  exports.BasicCancelOk = 3932191;
  var methodInfoBasicCancelOk = exports.methodInfoBasicCancelOk = {
    id: 3932191,
    classId: 60,
    methodId: 31,
    name: "BasicCancelOk",
    args: [{
      type: "shortstr",
      name: "consumerTag"
    }]
  };
  exports.BasicPublish = 3932200;
  var methodInfoBasicPublish = exports.methodInfoBasicPublish = {
    id: 3932200,
    classId: 60,
    methodId: 40,
    name: "BasicPublish",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "exchange",
      default: ""
    }, {
      type: "shortstr",
      name: "routingKey",
      default: ""
    }, {
      type: "bit",
      name: "mandatory",
      default: false
    }, {
      type: "bit",
      name: "immediate",
      default: false
    }]
  };
  exports.BasicReturn = 3932210;
  var methodInfoBasicReturn = exports.methodInfoBasicReturn = {
    id: 3932210,
    classId: 60,
    methodId: 50,
    name: "BasicReturn",
    args: [{
      type: "short",
      name: "replyCode"
    }, {
      type: "shortstr",
      name: "replyText",
      default: ""
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "routingKey"
    }]
  };
  exports.BasicDeliver = 3932220;
  var methodInfoBasicDeliver = exports.methodInfoBasicDeliver = {
    id: 3932220,
    classId: 60,
    methodId: 60,
    name: "BasicDeliver",
    args: [{
      type: "shortstr",
      name: "consumerTag"
    }, {
      type: "longlong",
      name: "deliveryTag"
    }, {
      type: "bit",
      name: "redelivered",
      default: false
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "routingKey"
    }]
  };
  exports.BasicGet = 3932230;
  var methodInfoBasicGet = exports.methodInfoBasicGet = {
    id: 3932230,
    classId: 60,
    methodId: 70,
    name: "BasicGet",
    args: [{
      type: "short",
      name: "ticket",
      default: 0
    }, {
      type: "shortstr",
      name: "queue",
      default: ""
    }, {
      type: "bit",
      name: "noAck",
      default: false
    }]
  };
  exports.BasicGetOk = 3932231;
  var methodInfoBasicGetOk = exports.methodInfoBasicGetOk = {
    id: 3932231,
    classId: 60,
    methodId: 71,
    name: "BasicGetOk",
    args: [{
      type: "longlong",
      name: "deliveryTag"
    }, {
      type: "bit",
      name: "redelivered",
      default: false
    }, {
      type: "shortstr",
      name: "exchange"
    }, {
      type: "shortstr",
      name: "routingKey"
    }, {
      type: "long",
      name: "messageCount"
    }]
  };
  exports.BasicGetEmpty = 3932232;
  var methodInfoBasicGetEmpty = exports.methodInfoBasicGetEmpty = {
    id: 3932232,
    classId: 60,
    methodId: 72,
    name: "BasicGetEmpty",
    args: [{
      type: "shortstr",
      name: "clusterId",
      default: ""
    }]
  };
  exports.BasicAck = 3932240;
  var methodInfoBasicAck = exports.methodInfoBasicAck = {
    id: 3932240,
    classId: 60,
    methodId: 80,
    name: "BasicAck",
    args: [{
      type: "longlong",
      name: "deliveryTag",
      default: 0
    }, {
      type: "bit",
      name: "multiple",
      default: false
    }]
  };
  exports.BasicReject = 3932250;
  var methodInfoBasicReject = exports.methodInfoBasicReject = {
    id: 3932250,
    classId: 60,
    methodId: 90,
    name: "BasicReject",
    args: [{
      type: "longlong",
      name: "deliveryTag"
    }, {
      type: "bit",
      name: "requeue",
      default: true
    }]
  };
  exports.BasicRecoverAsync = 3932260;
  var methodInfoBasicRecoverAsync = exports.methodInfoBasicRecoverAsync = {
    id: 3932260,
    classId: 60,
    methodId: 100,
    name: "BasicRecoverAsync",
    args: [{
      type: "bit",
      name: "requeue",
      default: false
    }]
  };
  exports.BasicRecover = 3932270;
  var methodInfoBasicRecover = exports.methodInfoBasicRecover = {
    id: 3932270,
    classId: 60,
    methodId: 110,
    name: "BasicRecover",
    args: [{
      type: "bit",
      name: "requeue",
      default: false
    }]
  };
  exports.BasicRecoverOk = 3932271;
  var methodInfoBasicRecoverOk = exports.methodInfoBasicRecoverOk = {
    id: 3932271,
    classId: 60,
    methodId: 111,
    name: "BasicRecoverOk",
    args: []
  };
  exports.BasicNack = 3932280;
  var methodInfoBasicNack = exports.methodInfoBasicNack = {
    id: 3932280,
    classId: 60,
    methodId: 120,
    name: "BasicNack",
    args: [{
      type: "longlong",
      name: "deliveryTag",
      default: 0
    }, {
      type: "bit",
      name: "multiple",
      default: false
    }, {
      type: "bit",
      name: "requeue",
      default: true
    }]
  };
  exports.TxSelect = 5898250;
  var methodInfoTxSelect = exports.methodInfoTxSelect = {
    id: 5898250,
    classId: 90,
    methodId: 10,
    name: "TxSelect",
    args: []
  };
  exports.TxSelectOk = 5898251;
  var methodInfoTxSelectOk = exports.methodInfoTxSelectOk = {
    id: 5898251,
    classId: 90,
    methodId: 11,
    name: "TxSelectOk",
    args: []
  };
  exports.TxCommit = 5898260;
  var methodInfoTxCommit = exports.methodInfoTxCommit = {
    id: 5898260,
    classId: 90,
    methodId: 20,
    name: "TxCommit",
    args: []
  };
  exports.TxCommitOk = 5898261;
  var methodInfoTxCommitOk = exports.methodInfoTxCommitOk = {
    id: 5898261,
    classId: 90,
    methodId: 21,
    name: "TxCommitOk",
    args: []
  };
  exports.TxRollback = 5898270;
  var methodInfoTxRollback = exports.methodInfoTxRollback = {
    id: 5898270,
    classId: 90,
    methodId: 30,
    name: "TxRollback",
    args: []
  };
  exports.TxRollbackOk = 5898271;
  var methodInfoTxRollbackOk = exports.methodInfoTxRollbackOk = {
    id: 5898271,
    classId: 90,
    methodId: 31,
    name: "TxRollbackOk",
    args: []
  };
  exports.ConfirmSelect = 5570570;
  var methodInfoConfirmSelect = exports.methodInfoConfirmSelect = {
    id: 5570570,
    classId: 85,
    methodId: 10,
    name: "ConfirmSelect",
    args: [{
      type: "bit",
      name: "nowait",
      default: false
    }]
  };
  exports.ConfirmSelectOk = 5570571;
  var methodInfoConfirmSelectOk = exports.methodInfoConfirmSelectOk = {
    id: 5570571,
    classId: 85,
    methodId: 11,
    name: "ConfirmSelectOk",
    args: []
  };
  exports.BasicProperties = 60;
  var propertiesInfoBasicProperties = exports.propertiesInfoBasicProperties = {
    id: 60,
    name: "BasicProperties",
    args: [{
      type: "shortstr",
      name: "contentType"
    }, {
      type: "shortstr",
      name: "contentEncoding"
    }, {
      type: "table",
      name: "headers"
    }, {
      type: "octet",
      name: "deliveryMode"
    }, {
      type: "octet",
      name: "priority"
    }, {
      type: "shortstr",
      name: "correlationId"
    }, {
      type: "shortstr",
      name: "replyTo"
    }, {
      type: "shortstr",
      name: "expiration"
    }, {
      type: "shortstr",
      name: "messageId"
    }, {
      type: "timestamp",
      name: "timestamp"
    }, {
      type: "shortstr",
      name: "type"
    }, {
      type: "shortstr",
      name: "userId"
    }, {
      type: "shortstr",
      name: "appId"
    }, {
      type: "shortstr",
      name: "clusterId"
    }]
  };
});

// node_modules/@acuminous/bitsyntax/lib/pattern.js
var require_pattern = __commonJS((exports, module) => {
  var set = function(values) {
    var s = {};
    for (var i in values) {
      if (!Object.prototype.hasOwnProperty.call(values, i))
        continue;
      s[values[i]] = 1;
    }
    return s;
  };
  var variable = function(name, size, specifiers0) {
    var specifiers = set(specifiers0);
    var segment = { name };
    segment.type = type_in(specifiers);
    specs(segment, segment.type, specifiers);
    segment.size = size_of(segment, segment.type, size, segment.unit);
    return segment;
  };
  var value = function(val, size, specifiers0) {
    var specifiers = set(specifiers0);
    var segment = { value: val };
    segment.type = type_in(specifiers);
    specs(segment, segment.type, specifiers);
    segment.size = size_of(segment, segment.type, size, segment.unit);
    return segment;
  };
  var string = function(val) {
    return { value: val, type: "string" };
  };
  var type_in = function(specifiers) {
    for (var t in specifiers) {
      if (!Object.prototype.hasOwnProperty.call(specifiers, t))
        continue;
      if (TYPES[t]) {
        return t;
      }
    }
    return "integer";
  };
  var specs = function(segment, type, specifiers) {
    switch (type) {
      case "integer":
        segment.signed = signed_in(specifiers);
      case "float":
        segment.bigendian = endian_in(specifiers);
      default:
        segment.unit = unit_in(specifiers, segment.type);
    }
    return segment;
  };
  var endian_in = function(specifiers) {
    return !specifiers["little"];
  };
  var signed_in = function(specifiers) {
    return specifiers["signed"];
  };
  var unit_in = function(specifiers, type) {
    for (var s in specifiers) {
      if (!Object.prototype.hasOwnProperty.call(specifiers, s))
        continue;
      if (s.substr(0, 5) == "unit:") {
        var unit = parseInt(s.substr(5));
        return unit;
      }
    }
    switch (type) {
      case "binary":
        return 8;
      case "integer":
      case "float":
        return 1;
    }
  };
  var size_of = function(segment, type, size, unit) {
    if (size !== undefined && size !== "") {
      return size;
    } else {
      switch (type) {
        case "integer":
          return 8;
        case "float":
          return 64;
        case "binary":
          return true;
      }
    }
  };
  exports.variable = variable;
  exports.rest = function() {
    return variable("_", true, ["binary"]);
  };
  exports.value = value;
  exports.string = string;
  var TYPES = { integer: 1, binary: 1, float: 1 };
});

// node_modules/@acuminous/bitsyntax/lib/parser.js
var require_parser = __commonJS((exports, module) => {
  module.exports = function() {
    function quote(s) {
      return '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"';
    }
    var result = {
      parse: function(input, startRule) {
        var parseFunctions = {
          start: parse_start,
          segmentTail: parse_segmentTail,
          segment: parse_segment,
          string: parse_string,
          chars: parse_chars,
          char: parse_char,
          hexDigit: parse_hexDigit,
          identifier: parse_identifier,
          number: parse_number,
          size: parse_size,
          specifierList: parse_specifierList,
          specifierTail: parse_specifierTail,
          specifier: parse_specifier,
          unit: parse_unit,
          ws: parse_ws
        };
        if (startRule !== undefined) {
          if (parseFunctions[startRule] === undefined) {
            throw new Error("Invalid rule name: " + quote(startRule) + ".");
          }
        } else {
          startRule = "start";
        }
        var pos = 0;
        var reportFailures = 0;
        var rightmostFailuresPos = 0;
        var rightmostFailuresExpected = [];
        function padLeft(input2, padding, length) {
          var result3 = input2;
          var padLength = length - input2.length;
          for (var i = 0;i < padLength; i++) {
            result3 = padding + result3;
          }
          return result3;
        }
        function escape2(ch) {
          var charCode = ch.charCodeAt(0);
          var escapeChar;
          var length;
          if (charCode <= 255) {
            escapeChar = "x";
            length = 2;
          } else {
            escapeChar = "u";
            length = 4;
          }
          return "\\" + escapeChar + padLeft(charCode.toString(16).toUpperCase(), "0", length);
        }
        function matchFailed(failure) {
          if (pos < rightmostFailuresPos) {
            return;
          }
          if (pos > rightmostFailuresPos) {
            rightmostFailuresPos = pos;
            rightmostFailuresExpected = [];
          }
          rightmostFailuresExpected.push(failure);
        }
        function parse_start() {
          var result0, result1, result22, result3;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          result0 = parse_ws();
          if (result0 !== null) {
            result1 = parse_segment();
            if (result1 !== null) {
              result22 = [];
              result3 = parse_segmentTail();
              while (result3 !== null) {
                result22.push(result3);
                result3 = parse_segmentTail();
              }
              if (result22 !== null) {
                result0 = [result0, result1, result22];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, head, tail) {
              tail.unshift(head);
              return tail;
            }(pos0, result0[1], result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_segmentTail() {
          var result0, result1, result22, result3;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          result0 = parse_ws();
          if (result0 !== null) {
            if (input.charCodeAt(pos) === 44) {
              result1 = ",";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\",\"");
              }
            }
            if (result1 !== null) {
              result22 = parse_ws();
              if (result22 !== null) {
                result3 = parse_segment();
                if (result3 !== null) {
                  result0 = [result0, result1, result22, result3];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, seg) {
              return seg;
            }(pos0, result0[3]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_segment() {
          var result0, result1, result22;
          var pos0, pos1;
          pos0 = pos;
          result0 = parse_string();
          if (result0 !== null) {
            result0 = function(offset2, str) {
              return { string: str };
            }(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            result0 = parse_identifier();
            if (result0 !== null) {
              result1 = parse_size();
              result1 = result1 !== null ? result1 : "";
              if (result1 !== null) {
                result22 = parse_specifierList();
                result22 = result22 !== null ? result22 : "";
                if (result22 !== null) {
                  result0 = [result0, result1, result22];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, v, size, specs) {
                return { name: v, size, specifiers: specs };
              }(pos0, result0[0], result0[1], result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              result0 = parse_number();
              if (result0 !== null) {
                result1 = parse_size();
                result1 = result1 !== null ? result1 : "";
                if (result1 !== null) {
                  result22 = parse_specifierList();
                  result22 = result22 !== null ? result22 : "";
                  if (result22 !== null) {
                    result0 = [result0, result1, result22];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = function(offset2, v, size, specs) {
                  return { value: v, size, specifiers: specs };
                }(pos0, result0[0], result0[1], result0[2]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
          }
          return result0;
        }
        function parse_string() {
          var result0, result1, result22;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 34) {
            result0 = "\"";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"\\\"\"");
            }
          }
          if (result0 !== null) {
            if (input.charCodeAt(pos) === 34) {
              result1 = "\"";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2) {
              return "";
            }(pos0);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 34) {
              result0 = "\"";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\"\"");
              }
            }
            if (result0 !== null) {
              result1 = parse_chars();
              if (result1 !== null) {
                if (input.charCodeAt(pos) === 34) {
                  result22 = "\"";
                  pos++;
                } else {
                  result22 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\"\"");
                  }
                }
                if (result22 !== null) {
                  result0 = [result0, result1, result22];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, chars) {
                return chars;
              }(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
          return result0;
        }
        function parse_chars() {
          var result0, result1;
          var pos0;
          pos0 = pos;
          result1 = parse_char();
          if (result1 !== null) {
            result0 = [];
            while (result1 !== null) {
              result0.push(result1);
              result1 = parse_char();
            }
          } else {
            result0 = null;
          }
          if (result0 !== null) {
            result0 = function(offset2, chars) {
              return chars.join("");
            }(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_char() {
          var result0, result1, result22, result3, result4;
          var pos0, pos1;
          if (/^[^"\\\0-\x1F\u007F]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[^\"\\\\\\0-\\x1F]");
            }
          }
          if (result0 === null) {
            pos0 = pos;
            if (input.substr(pos, 2) === "\\\"") {
              result0 = "\\\"";
              pos += 2;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"\\\\\\\"\"");
              }
            }
            if (result0 !== null) {
              result0 = function(offset2) {
                return '"';
              }(pos0);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              if (input.substr(pos, 2) === "\\\\") {
                result0 = "\\\\";
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\\\\\\\\"");
                }
              }
              if (result0 !== null) {
                result0 = function(offset2) {
                  return "\\";
                }(pos0);
              }
              if (result0 === null) {
                pos = pos0;
              }
              if (result0 === null) {
                pos0 = pos;
                if (input.substr(pos, 2) === "\\/") {
                  result0 = "\\/";
                  pos += 2;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\\/\"");
                  }
                }
                if (result0 !== null) {
                  result0 = function(offset2) {
                    return "/";
                  }(pos0);
                }
                if (result0 === null) {
                  pos = pos0;
                }
                if (result0 === null) {
                  pos0 = pos;
                  if (input.substr(pos, 2) === "\\b") {
                    result0 = "\\b";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"\\\\b\"");
                    }
                  }
                  if (result0 !== null) {
                    result0 = function(offset2) {
                      return "\b";
                    }(pos0);
                  }
                  if (result0 === null) {
                    pos = pos0;
                  }
                  if (result0 === null) {
                    pos0 = pos;
                    if (input.substr(pos, 2) === "\\f") {
                      result0 = "\\f";
                      pos += 2;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"\\\\f\"");
                      }
                    }
                    if (result0 !== null) {
                      result0 = function(offset2) {
                        return "\f";
                      }(pos0);
                    }
                    if (result0 === null) {
                      pos = pos0;
                    }
                    if (result0 === null) {
                      pos0 = pos;
                      if (input.substr(pos, 2) === "\\n") {
                        result0 = "\\n";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"\\\\n\"");
                        }
                      }
                      if (result0 !== null) {
                        result0 = function(offset2) {
                          return "\n";
                        }(pos0);
                      }
                      if (result0 === null) {
                        pos = pos0;
                      }
                      if (result0 === null) {
                        pos0 = pos;
                        if (input.substr(pos, 2) === "\\r") {
                          result0 = "\\r";
                          pos += 2;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"\\\\r\"");
                          }
                        }
                        if (result0 !== null) {
                          result0 = function(offset2) {
                            return "\r";
                          }(pos0);
                        }
                        if (result0 === null) {
                          pos = pos0;
                        }
                        if (result0 === null) {
                          pos0 = pos;
                          if (input.substr(pos, 2) === "\\t") {
                            result0 = "\\t";
                            pos += 2;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"\\\\t\"");
                            }
                          }
                          if (result0 !== null) {
                            result0 = function(offset2) {
                              return "\t";
                            }(pos0);
                          }
                          if (result0 === null) {
                            pos = pos0;
                          }
                          if (result0 === null) {
                            pos0 = pos;
                            pos1 = pos;
                            if (input.substr(pos, 2) === "\\u") {
                              result0 = "\\u";
                              pos += 2;
                            } else {
                              result0 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"\\\\u\"");
                              }
                            }
                            if (result0 !== null) {
                              result1 = parse_hexDigit();
                              if (result1 !== null) {
                                result22 = parse_hexDigit();
                                if (result22 !== null) {
                                  result3 = parse_hexDigit();
                                  if (result3 !== null) {
                                    result4 = parse_hexDigit();
                                    if (result4 !== null) {
                                      result0 = [result0, result1, result22, result3, result4];
                                    } else {
                                      result0 = null;
                                      pos = pos1;
                                    }
                                  } else {
                                    result0 = null;
                                    pos = pos1;
                                  }
                                } else {
                                  result0 = null;
                                  pos = pos1;
                                }
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                            if (result0 !== null) {
                              result0 = function(offset2, h1, h2, h3, h4) {
                                return String.fromCharCode(parseInt("0x" + h1 + h2 + h3 + h4));
                              }(pos0, result0[1], result0[2], result0[3], result0[4]);
                            }
                            if (result0 === null) {
                              pos = pos0;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          return result0;
        }
        function parse_hexDigit() {
          var result0;
          if (/^[0-9a-fA-F]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[0-9a-fA-F]");
            }
          }
          return result0;
        }
        function parse_identifier() {
          var result0, result1, result22;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (/^[_a-zA-Z]/.test(input.charAt(pos))) {
            result0 = input.charAt(pos);
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("[_a-zA-Z]");
            }
          }
          if (result0 !== null) {
            result1 = [];
            if (/^[_a-zA-Z0-9]/.test(input.charAt(pos))) {
              result22 = input.charAt(pos);
              pos++;
            } else {
              result22 = null;
              if (reportFailures === 0) {
                matchFailed("[_a-zA-Z0-9]");
              }
            }
            while (result22 !== null) {
              result1.push(result22);
              if (/^[_a-zA-Z0-9]/.test(input.charAt(pos))) {
                result22 = input.charAt(pos);
                pos++;
              } else {
                result22 = null;
                if (reportFailures === 0) {
                  matchFailed("[_a-zA-Z0-9]");
                }
              }
            }
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, head, tail) {
              return head + tail.join("");
            }(pos0, result0[0], result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_number() {
          var result0, result1, result22;
          var pos0, pos1;
          pos0 = pos;
          if (input.charCodeAt(pos) === 48) {
            result0 = "0";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"0\"");
            }
          }
          if (result0 !== null) {
            result0 = function(offset2) {
              return 0;
            }(pos0);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (/^[1-9]/.test(input.charAt(pos))) {
              result0 = input.charAt(pos);
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("[1-9]");
              }
            }
            if (result0 !== null) {
              result1 = [];
              if (/^[0-9]/.test(input.charAt(pos))) {
                result22 = input.charAt(pos);
                pos++;
              } else {
                result22 = null;
                if (reportFailures === 0) {
                  matchFailed("[0-9]");
                }
              }
              while (result22 !== null) {
                result1.push(result22);
                if (/^[0-9]/.test(input.charAt(pos))) {
                  result22 = input.charAt(pos);
                  pos++;
                } else {
                  result22 = null;
                  if (reportFailures === 0) {
                    matchFailed("[0-9]");
                  }
                }
              }
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, head, tail) {
                return parseInt(head + tail.join(""));
              }(pos0, result0[0], result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
          return result0;
        }
        function parse_size() {
          var result0, result1;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 58) {
            result0 = ":";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\":\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_number();
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, num) {
              return num;
            }(pos0, result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 58) {
              result0 = ":";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\":\"");
              }
            }
            if (result0 !== null) {
              result1 = parse_identifier();
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = function(offset2, id) {
                return id;
              }(pos0, result0[1]);
            }
            if (result0 === null) {
              pos = pos0;
            }
          }
          return result0;
        }
        function parse_specifierList() {
          var result0, result1, result22, result3;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 47) {
            result0 = "/";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"/\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_specifier();
            if (result1 !== null) {
              result22 = [];
              result3 = parse_specifierTail();
              while (result3 !== null) {
                result22.push(result3);
                result3 = parse_specifierTail();
              }
              if (result22 !== null) {
                result0 = [result0, result1, result22];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, head, tail) {
              tail.unshift(head);
              return tail;
            }(pos0, result0[1], result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_specifierTail() {
          var result0, result1;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 45) {
            result0 = "-";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_specifier();
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, spec) {
              return spec;
            }(pos0, result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_specifier() {
          var result0;
          if (input.substr(pos, 6) === "little") {
            result0 = "little";
            pos += 6;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"little\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 3) === "big") {
              result0 = "big";
              pos += 3;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"big\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 6) === "signed") {
                result0 = "signed";
                pos += 6;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"signed\"");
                }
              }
              if (result0 === null) {
                if (input.substr(pos, 8) === "unsigned") {
                  result0 = "unsigned";
                  pos += 8;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"unsigned\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 7) === "integer") {
                    result0 = "integer";
                    pos += 7;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"integer\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.substr(pos, 6) === "binary") {
                      result0 = "binary";
                      pos += 6;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"binary\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos, 5) === "float") {
                        result0 = "float";
                        pos += 5;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"float\"");
                        }
                      }
                      if (result0 === null) {
                        result0 = parse_unit();
                      }
                    }
                  }
                }
              }
            }
          }
          return result0;
        }
        function parse_unit() {
          var result0, result1;
          var pos0, pos1;
          pos0 = pos;
          pos1 = pos;
          if (input.substr(pos, 5) === "unit:") {
            result0 = "unit:";
            pos += 5;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"unit:\"");
            }
          }
          if (result0 !== null) {
            result1 = parse_number();
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = function(offset2, num) {
              return "unit:" + num;
            }(pos0, result0[1]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          return result0;
        }
        function parse_ws() {
          var result0, result1;
          result0 = [];
          if (/^[ \t\n]/.test(input.charAt(pos))) {
            result1 = input.charAt(pos);
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("[ \\t\\n]");
            }
          }
          while (result1 !== null) {
            result0.push(result1);
            if (/^[ \t\n]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[ \\t\\n]");
              }
            }
          }
          return result0;
        }
        function cleanupExpected(expected) {
          expected.sort();
          var lastExpected = null;
          var cleanExpected = [];
          for (var i = 0;i < expected.length; i++) {
            if (expected[i] !== lastExpected) {
              cleanExpected.push(expected[i]);
              lastExpected = expected[i];
            }
          }
          return cleanExpected;
        }
        function computeErrorPosition() {
          var line = 1;
          var column = 1;
          var seenCR = false;
          for (var i = 0;i < Math.max(pos, rightmostFailuresPos); i++) {
            var ch = input.charAt(i);
            if (ch === "\n") {
              if (!seenCR) {
                line++;
              }
              column = 1;
              seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              line++;
              column = 1;
              seenCR = true;
            } else {
              column++;
              seenCR = false;
            }
          }
          return { line, column };
        }
        var result2 = parseFunctions[startRule]();
        if (result2 === null || pos !== input.length) {
          var offset = Math.max(pos, rightmostFailuresPos);
          var found = offset < input.length ? input.charAt(offset) : null;
          var errorPosition = computeErrorPosition();
          throw new this.SyntaxError(cleanupExpected(rightmostFailuresExpected), found, offset, errorPosition.line, errorPosition.column);
        }
        return result2;
      },
      toSource: function() {
        return this._source;
      }
    };
    result.SyntaxError = function(expected, found, offset, line, column) {
      function buildMessage(expected2, found2) {
        var expectedHumanized, foundHumanized;
        switch (expected2.length) {
          case 0:
            expectedHumanized = "end of input";
            break;
          case 1:
            expectedHumanized = expected2[0];
            break;
          default:
            expectedHumanized = expected2.slice(0, expected2.length - 1).join(", ") + " or " + expected2[expected2.length - 1];
        }
        foundHumanized = found2 ? quote(found2) : "end of input";
        return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
      }
      this.name = "SyntaxError";
      this.expected = expected;
      this.found = found;
      this.message = buildMessage(expected, found);
      this.offset = offset;
      this.line = line;
      this.column = column;
    };
    result.SyntaxError.prototype = Error.prototype;
    return result;
  }();
});

// node_modules/@acuminous/bitsyntax/lib/parse.js
var require_parse = __commonJS((exports, module) => {
  var parse_pattern = function(string) {
    var segments = parser.parse(string);
    for (var i = 0, len = segments.length;i < len; i++) {
      var s = segments[i];
      if (s.string != null) {
        segments[i] = ast.string(s.string);
      } else if (s.value != null) {
        segments[i] = ast.value(s.value, s.size, s.specifiers);
      } else if (s.name != null) {
        segments[i] = ast.variable(s.name, s.size, s.specifiers);
      } else {
        throw "Unknown segment " + s;
      }
    }
    return segments;
  };
  var ast = require_pattern();
  var parser = require_parser();
  exports.parse = function() {
    var str = [].join.call(arguments, ",");
    return parse_pattern(str);
  };
});

// node_modules/ms/index.js
var require_ms = __commonJS((exports, module) => {
  var parse = function(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "weeks":
      case "week":
      case "w":
        return n * w;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return;
    }
  };
  var fmtShort = function(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return Math.round(ms / d) + "d";
    }
    if (msAbs >= h) {
      return Math.round(ms / h) + "h";
    }
    if (msAbs >= m) {
      return Math.round(ms / m) + "m";
    }
    if (msAbs >= s) {
      return Math.round(ms / s) + "s";
    }
    return ms + "ms";
  };
  var fmtLong = function(ms) {
    var msAbs = Math.abs(ms);
    if (msAbs >= d) {
      return plural(ms, msAbs, d, "day");
    }
    if (msAbs >= h) {
      return plural(ms, msAbs, h, "hour");
    }
    if (msAbs >= m) {
      return plural(ms, msAbs, m, "minute");
    }
    if (msAbs >= s) {
      return plural(ms, msAbs, s, "second");
    }
    return ms + " ms";
  };
  var plural = function(ms, msAbs, n, name) {
    var isPlural = msAbs >= n * 1.5;
    return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
  };
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var w = d * 7;
  var y = d * 365.25;
  module.exports = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isFinite(val)) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
  };
});

// node_modules/debug/src/common.js
var require_common = __commonJS((exports, module) => {
  var setup = function(env) {
    createDebug.debug = createDebug;
    createDebug.default = createDebug;
    createDebug.coerce = coerce;
    createDebug.disable = disable;
    createDebug.enable = enable;
    createDebug.enabled = enabled;
    createDebug.humanize = require_ms();
    createDebug.destroy = destroy;
    Object.keys(env).forEach((key) => {
      createDebug[key] = env[key];
    });
    createDebug.names = [];
    createDebug.skips = [];
    createDebug.formatters = {};
    function selectColor(namespace) {
      let hash = 0;
      for (let i = 0;i < namespace.length; i++) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
    }
    createDebug.selectColor = selectColor;
    function createDebug(namespace) {
      let prevTime;
      let enableOverride = null;
      let namespacesCache;
      let enabledCache;
      function debug(...args) {
        if (!debug.enabled) {
          return;
        }
        const self2 = debug;
        const curr = Number(new Date);
        const ms = curr - (prevTime || curr);
        self2.diff = ms;
        self2.prev = prevTime;
        self2.curr = curr;
        prevTime = curr;
        args[0] = createDebug.coerce(args[0]);
        if (typeof args[0] !== "string") {
          args.unshift("%O");
        }
        let index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
          if (match === "%%") {
            return "%";
          }
          index++;
          const formatter = createDebug.formatters[format];
          if (typeof formatter === "function") {
            const val = args[index];
            match = formatter.call(self2, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        createDebug.formatArgs.call(self2, args);
        const logFn = self2.log || createDebug.log;
        logFn.apply(self2, args);
      }
      debug.namespace = namespace;
      debug.useColors = createDebug.useColors();
      debug.color = createDebug.selectColor(namespace);
      debug.extend = extend;
      debug.destroy = createDebug.destroy;
      Object.defineProperty(debug, "enabled", {
        enumerable: true,
        configurable: false,
        get: () => {
          if (enableOverride !== null) {
            return enableOverride;
          }
          if (namespacesCache !== createDebug.namespaces) {
            namespacesCache = createDebug.namespaces;
            enabledCache = createDebug.enabled(namespace);
          }
          return enabledCache;
        },
        set: (v) => {
          enableOverride = v;
        }
      });
      if (typeof createDebug.init === "function") {
        createDebug.init(debug);
      }
      return debug;
    }
    function extend(namespace, delimiter) {
      const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
      newDebug.log = this.log;
      return newDebug;
    }
    function enable(namespaces) {
      createDebug.save(namespaces);
      createDebug.namespaces = namespaces;
      createDebug.names = [];
      createDebug.skips = [];
      let i;
      const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      const len = split.length;
      for (i = 0;i < len; i++) {
        if (!split[i]) {
          continue;
        }
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
        } else {
          createDebug.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      const namespaces = [
        ...createDebug.names.map(toNamespace),
        ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
      ].join(",");
      createDebug.enable("");
      return namespaces;
    }
    function enabled(name) {
      if (name[name.length - 1] === "*") {
        return true;
      }
      let i;
      let len;
      for (i = 0, len = createDebug.skips.length;i < len; i++) {
        if (createDebug.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = createDebug.names.length;i < len; i++) {
        if (createDebug.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function toNamespace(regexp) {
      return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function coerce(val) {
      if (val instanceof Error) {
        return val.stack || val.message;
      }
      return val;
    }
    function destroy() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    createDebug.enable(createDebug.load());
    return createDebug;
  };
  module.exports = setup;
});

// node_modules/debug/src/browser.js
var require_browser = __commonJS((exports, module) => {
  var useColors = function() {
    if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
      return true;
    }
    if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }
    return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  };
  var formatArgs = function(args) {
    args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + exports.humanize(this.diff);
    if (!this.useColors) {
      return;
    }
    const c = "color: " + this.color;
    args.splice(1, 0, c, "color: inherit");
    let index = 0;
    let lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, (match) => {
      if (match === "%%") {
        return;
      }
      index++;
      if (match === "%c") {
        lastC = index;
      }
    });
    args.splice(lastC, 0, c);
  };
  var save = function(namespaces) {
    try {
      if (namespaces) {
        exports.storage.setItem("debug", namespaces);
      } else {
        exports.storage.removeItem("debug");
      }
    } catch (error) {
    }
  };
  var load = function() {
    let r;
    try {
      r = exports.storage.getItem("debug");
    } catch (error) {
    }
    if (!r && typeof process !== "undefined" && ("env" in process)) {
      r = process.env.DEBUG;
    }
    return r;
  };
  var localstorage = function() {
    try {
      return localStorage;
    } catch (error) {
    }
  };
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = localstorage();
  exports.destroy = (() => {
    let warned = false;
    return () => {
      if (!warned) {
        warned = true;
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
    };
  })();
  exports.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  exports.log = console.debug || console.log || (() => {
  });
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (error) {
      return "[UnexpectedJSONParseError]: " + error.message;
    }
  };
});

// node:supports-color
var exports_supports_color = {};
__export(exports_supports_color, {
  supportsColor: () => {
    {
      return s;
    }
  },
  stdout: () => {
    {
      return o;
    }
  },
  stderr: () => {
    {
      return a;
    }
  },
  default: () => {
    {
      return r;
    }
  }
});
var s, r, o, a;
var init_supports_color = __esm(() => {
  if ("Bun" in globalThis)
    if (Bun.enableANSIColors) {
      let e = { level: 2, hasBasic: true, has256: true, has16m: false };
      s = { stdout: e, stderr: e };
    } else
      s = { stdout: false, stderr: false };
  else {
    let t = /\b(Chrome|Chromium)\//.test(navigator.userAgent) ? { level: 1, hasBasic: true, has256: false, has16m: false } : false;
    s = { stdout: t, stderr: t };
  }
  r = s;
  o = s.stdout;
  a = s.stderr;
});

// node_modules/debug/src/node.js
var require_node = __commonJS((exports, module) => {
  var useColors = function() {
    return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
  };
  var formatArgs = function(args) {
    const { namespace: name, useColors: useColors2 } = this;
    if (useColors2) {
      const c = this.color;
      const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
      const prefix = `  ${colorCode};1m${name} \x1B[0m`;
      args[0] = prefix + args[0].split("\n").join("\n" + prefix);
      args.push(colorCode + "m+" + exports.humanize(this.diff) + "\x1B[0m");
    } else {
      args[0] = getDate() + name + " " + args[0];
    }
  };
  var getDate = function() {
    if (exports.inspectOpts.hideDate) {
      return "";
    }
    return new Date().toISOString() + " ";
  };
  var log = function(...args) {
    return process.stderr.write(util.format(...args) + "\n");
  };
  var save = function(namespaces) {
    if (namespaces) {
      process.env.DEBUG = namespaces;
    } else {
      delete process.env.DEBUG;
    }
  };
  var load = function() {
    return process.env.DEBUG;
  };
  var init = function(debug) {
    debug.inspectOpts = {};
    const keys = Object.keys(exports.inspectOpts);
    for (let i = 0;i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  };
  var tty = import.meta.require("node:tty");
  var util = import.meta.require("node:util");
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.destroy = util.deprecate(() => {
  }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  exports.colors = [6, 2, 3, 4, 5, 1];
  try {
    const supportsColor = (init_supports_color(), __toCommonJS(exports_supports_color));
    if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
      exports.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ];
    }
  } catch (error) {
  }
  exports.inspectOpts = Object.keys(process.env).filter((key) => {
    return /^debug_/i.test(key);
  }).reduce((obj, key) => {
    const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
      return k.toUpperCase();
    });
    let val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) {
      val = true;
    } else if (/^(no|off|false|disabled)$/i.test(val)) {
      val = false;
    } else if (val === "null") {
      val = null;
    } else {
      val = Number(val);
    }
    obj[prop] = val;
    return obj;
  }, {});
  module.exports = require_common()(exports);
  var { formatters } = module.exports;
  formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
  };
  formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };
});

// node_modules/debug/src/index.js
var require_src = __commonJS((exports, module) => {
  if (typeof process === "undefined" || process.type === "renderer" || false || process.__nwjs) {
    module.exports = require_browser();
  } else {
    module.exports = require_node();
  }
});

// node_modules/@acuminous/bitsyntax/lib/interp.js
var require_interp = __commonJS((exports, module) => {
  var parse_int = function(bin, off, sizeInBytes, bigendian, signed) {
    switch (sizeInBytes) {
      case 1:
        return signed ? bin.readInt8(off) : bin.readUInt8(off);
      case 2:
        return bigendian ? signed ? bin.readInt16BE(off) : bin.readUInt16BE(off) : signed ? bin.readInt16LE(off) : bin.readUInt16LE(off);
      case 4:
        return bigendian ? signed ? bin.readInt32BE(off) : bin.readUInt32BE(off) : signed ? bin.readInt32LE(off) : bin.readUInt32LE(off);
      case 8:
        return bigendian ? (signed ? ints.readInt64BE : ints.readUInt64BE)(bin, off) : (signed ? ints.readInt64LE : ints.readUInt64LE)(bin, off);
      default:
        throw "Integers must be 8-, 16-, 32- or 64-bit";
    }
  };
  var parse_float = function(bin, off, sizeInBytes, bigendian) {
    switch (sizeInBytes) {
      case 4:
        return bigendian ? bin.readFloatBE(off) : bin.readFloatLE(off);
      case 8:
        return bigendian ? bin.readDoubleBE(off) : bin.readDoubleLE(off);
      default:
        throw "Floats must be 32- or 64-bit";
    }
  };
  var size_of = function(segment, bound) {
    var size = segment.size;
    if (typeof size === "string") {
      return bound[size];
    } else {
      return size;
    }
  };
  var new_scope = function(env) {
    function scope() {
    }
    scope.prototype = env;
    return new scope;
  };
  var bindings = function(scope) {
    var s2 = {};
    for (var k in scope) {
      if (scope.hasOwnProperty(k)) {
        s2[k] = scope[k];
      }
    }
    return s2;
  };
  var match = function(pattern, binary, boundvars) {
    var offset = 0, vars = new_scope(boundvars);
    var binsize = binary.length * 8;
    function skip_bits(segment2) {
      debug("skip bits");
      debug(segment2);
      var size = size_of(segment2, vars);
      if (size === true) {
        if (offset % 8 === 0) {
          offset = binsize;
          return true;
        } else {
          return false;
        }
      }
      var bits = segment2.unit * size;
      if (offset + bits > binsize) {
        return false;
      } else {
        offset += bits;
      }
    }
    function get_integer(segment2) {
      debug("get_integer");
      debug(segment2);
      var unit = segment2.unit, size = size_of(segment2, vars);
      var bitsize = size * unit;
      var byteoffset = offset / 8;
      offset += bitsize;
      if (bitsize % 8 > 0 || offset > binsize) {
        return false;
      } else {
        return parse_int(binary, byteoffset, bitsize / 8, segment2.bigendian, segment2.signed);
      }
    }
    function get_float(segment2) {
      debug("get_float");
      debug(segment2);
      var unit = segment2.unit;
      var size = size_of(segment2, vars);
      var bitsize = size * unit;
      var byteoffset = offset / 8;
      offset += bitsize;
      if (offset > binsize) {
        return false;
      } else {
        return parse_float(binary, byteoffset, bitsize / 8, segment2.bigendian);
      }
    }
    function get_binary(segment2) {
      debug("get_binary");
      debug(segment2);
      var unit = segment2.unit, size = size_of(segment2, vars);
      var byteoffset = offset / 8;
      if (size === true) {
        offset = binsize;
        return binary.slice(byteoffset);
      } else {
        var bitsize = size * unit;
        if (bitsize % 8 > 0 || offset + bitsize > binsize) {
          return false;
        } else {
          offset += bitsize;
          return binary.slice(byteoffset, byteoffset + bitsize / 8);
        }
      }
    }
    function get_string(segment2) {
      debug("get_string");
      debug(segment2);
      var len = segment2.value.length;
      var byteoffset = offset / 8;
      offset += len * 8;
      if (offset > binsize) {
        return false;
      }
      return binary.slice(byteoffset, byteoffset + len).toString("utf8");
    }
    var patternlen = pattern.length;
    for (var i = 0;i < patternlen; i++) {
      var segment = pattern[i];
      var result = false;
      if (segment.name === "_") {
        result = skip_bits(segment);
      } else {
        switch (segment.type) {
          case "string":
            result = get_string(segment);
            break;
          case "integer":
            result = get_integer(segment);
            break;
          case "float":
            result = get_float(segment);
            break;
          case "binary":
            result = get_binary(segment);
            break;
        }
        if (result === false) {
          return false;
        } else if (segment.name) {
          vars[segment.name] = result;
        } else if (segment.value != result) {
          return false;
        }
      }
    }
    if (offset == binsize) {
      return bindings(vars);
    } else {
      return false;
    }
  };
  var ints = require_buffer_more_ints();
  var debug = require_src()("bitsyntax-Interpreter");
  exports.match = match;
  exports.parse_int = parse_int;
  exports.parse_float = parse_float;
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS((exports, module) => {
  var copyProps = function(src, dst) {
    for (var key in src) {
      dst[key] = src[key];
    }
  };
  var SafeBuffer = function(arg, encodingOrOffset, length) {
    return Buffer2(arg, encodingOrOffset, length);
  };
  var buffer = import.meta.require("node:buffer");
  var Buffer2 = buffer.Buffer;
  if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
    module.exports = buffer;
  } else {
    copyProps(buffer, exports);
    exports.Buffer = SafeBuffer;
  }
  copyProps(Buffer2, SafeBuffer);
  SafeBuffer.from = function(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      throw new TypeError("Argument must not be a number");
    }
    return Buffer2(arg, encodingOrOffset, length);
  };
  SafeBuffer.alloc = function(size, fill, encoding) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    var buf = Buffer2(size);
    if (fill !== undefined) {
      if (typeof encoding === "string") {
        buf.fill(fill, encoding);
      } else {
        buf.fill(fill);
      }
    } else {
      buf.fill(0);
    }
    return buf;
  };
  SafeBuffer.allocUnsafe = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return Buffer2(size);
  };
  SafeBuffer.allocUnsafeSlow = function(size) {
    if (typeof size !== "number") {
      throw new TypeError("Argument must be a number");
    }
    return buffer.SlowBuffer(size);
  };
});

// node_modules/@acuminous/bitsyntax/lib/constructor.js
var require_constructor = __commonJS((exports, module) => {
  var write = function(buf, offset, pattern, bindings) {
    for (var i = 0, len = pattern.length;i < len; i++) {
      var segment = pattern[i];
      switch (segment.type) {
        case "string":
          offset += buf.write(segment.value, offset, "utf8");
          break;
        case "binary":
          offset += writeBinary(segment, buf, offset, bindings);
          break;
        case "integer":
          offset += writeInteger(segment, buf, offset, bindings);
          break;
        case "float":
          offset += writeFloat(segment, buf, offset, bindings);
          break;
      }
    }
    return offset;
  };
  var build = function(pattern, bindings) {
    var bufsize = size_of(pattern, bindings);
    var buf = Buffer2.alloc(bufsize);
    write(buf, 0, pattern, bindings);
    return buf;
  };
  var size_of_segment = function(segment, bindings) {
    if (typeof segment.size === "string") {
      return bindings[segment.size] * segment.unit / 8;
    }
    if (segment.type === "string") {
      return Buffer2.byteLength(segment.value, "utf8");
    }
    if (segment.type === "binary" && segment.size === true) {
      var val = bindings[segment.name];
      return val.length;
    }
    return segment.size * segment.unit / 8;
  };
  var size_of = function(segments, bindings) {
    var size = 0;
    for (var i = 0, len = segments.length;i < len; i++) {
      size += size_of_segment(segments[i], bindings);
    }
    return size;
  };
  var writeBinary = function(segment, buf, offset, bindings) {
    var bin = bindings[segment.name];
    var size = size_of_segment(segment, bindings);
    bin.copy(buf, offset, 0, size);
    return size;
  };
  var writeInteger = function(segment, buf, offset, bindings) {
    var value = segment.name ? bindings[segment.name] : segment.value;
    var size = size_of_segment(segment, bindings);
    return write_int(buf, value, offset, size, segment.bigendian);
  };
  var write_int = function(buf, value, offset, size, bigendian) {
    switch (size) {
      case 1:
        buf.writeUInt8(value, offset);
        break;
      case 2:
        bigendian ? buf.writeUInt16BE(value, offset) : buf.writeUInt16LE(value, offset);
        break;
      case 4:
        bigendian ? buf.writeUInt32BE(value, offset) : buf.writeUInt32LE(value, offset);
        break;
      case 8:
        bigendian ? ints.writeUInt64BE(buf, value, offset) : ints.writeUInt64LE(buf, value, offset);
        break;
      default:
        throw new Error("integer size * unit must be 8, 16, 32 or 64");
    }
    return size;
  };
  var writeFloat = function(segment, buf, offset, bindings) {
    var value = segment.name ? bindings[segment.name] : segment.value;
    var size = size_of_segment(segment, bindings);
    return write_float(buf, value, offset, size, segment.bigendian);
  };
  var write_float = function(buf, value, offset, size, bigendian) {
    if (size === 4) {
      bigendian ? buf.writeFloatBE(value, offset) : buf.writeFloatLE(value, offset);
    } else if (size === 8) {
      bigendian ? buf.writeDoubleBE(value, offset) : buf.writeDoubleLE(value, offset);
    } else {
      throw new Error("float size * unit must be 32 or 64");
    }
    return size;
  };
  var ints = require_buffer_more_ints();
  var Buffer2 = require_safe_buffer().Buffer;
  var parse = require_parse().parse;
  exports.write = write;
  exports.build = build;
  exports.write_int = write_int;
  exports.write_float = write_float;
  exports.builder = function(pstr) {
    pstr = arguments.length > 1 ? [].join.call(arguments, ",") : pstr;
    var pattern = parse(pstr);
    return function(vars) {
      return build(pattern, vars);
    };
  };
});

// node_modules/@acuminous/bitsyntax/lib/compile.js
var require_compile = __commonJS((exports, module) => {
  var $start = function() {
    lines = [];
  };
  var $line = function() {
    lines.push($.apply(null, arguments));
  };
  var $result = function() {
    return lines.join("\n");
  };
  var bits_expr = function(segment) {
    if (typeof segment.size === "string") {
      return $("%s * %d", var_name(segment.size), segment.unit);
    } else {
      return (segment.size * segment.unit).toString();
    }
  };
  var get_number = function(segment) {
    $line("bits = %s;\n", bits_expr(segment));
    var parser = segment.type === "integer" ? "parse_int" : "parse_float";
    var { bigendian: be, signed: sg } = segment;
    $line("byteoffset = offset / 8; offset += bits");
    $line("if (offset > binsize) { return false; }");
    $line("else { result = %s(bin, byteoffset, bits / 8, %s, %s); }", parser, be, sg);
  };
  var get_binary = function(segment) {
    $line("byteoffset = offset / 8;");
    if (segment.size === true) {
      $line("offset = binsize;");
      $line("result = bin.slice(byteoffset);");
    } else {
      $line("bits = %s;", bits_expr(segment));
      $line("offset += bits;");
      $line("if (offset > binsize) { return false; }");
      $line("else { result = bin.slice(byteoffset,", "byteoffset + bits / 8); }");
    }
  };
  var get_string = function(segment) {
    $line("byteoffset = offset / 8;");
    var strlen = segment.value.length;
    var strlenbits = strlen * 8;
    $line("offset += %d;", strlenbits);
    $line("if (offset > binsize) { return false; }");
    $line("else { result = bin.toString(byteoffset,", $("byteoffset + %d); }", strlen));
  };
  var skip_bits = function(segment) {
    if (typeof segment.size === "string") {
      $line("var skipbits = %s * %d;", var_name(segment.size), segment.unit);
      $line("if (offset + skipbits > binsize) { return false; }");
      $line("else { offset += skipbits; }");
    } else if (segment.size === true) {
      $line("if (offset % 8 === 0) { offset = binsize; }");
      $line("else { return false; }");
    } else {
      var bits = segment.unit * segment.size;
      $line("if (offset + %d > binsize) { return false; }", bits);
      $line("else { offset += %d; }", bits);
    }
  };
  var match_seg = function(segment) {
    if (segment.name === "_") {
      skip_bits(segment);
    } else {
      var assign_result;
      switch (segment.type) {
        case "integer":
        case "float":
          get_number(segment);
          break;
        case "binary":
          get_binary(segment);
          break;
        case "string":
          get_string(segment);
          break;
      }
      $line("if (result === false) return false;");
      if (segment.name) {
        $line("else if (%s !== undefined) {", var_name(segment.name));
        $line("if (%s != result) return false;", var_name(segment.name));
        $line("}");
        $line("else %s = result;", var_name(segment.name));
      } else {
        var repr = JSON.stringify(segment.value);
        $line("else if (result != %s) return false;", repr);
      }
    }
  };
  var var_name = function(name) {
    return "var_" + name;
  };
  var variables = function(segments) {
    var names = {};
    for (var i = 0;i < segments.length; i++) {
      var name = segments[i].name;
      if (name && name !== "_") {
        names[name] = true;
      }
      name = segments[i].size;
      if (typeof name === "string") {
        names[name] = true;
      }
    }
    return Object.keys(names);
  };
  var compile_pattern = function(segments) {
    $start();
    $line("return function(binary, env) {");
    $line("'use strict';");
    $line("var bin = binary, env = env || {};");
    $line("var offset = 0, binsize = bin.length * 8;");
    $line("var bits, result, byteoffset;");
    var varnames = variables(segments);
    for (var v = 0;v < varnames.length; v++) {
      var name = varnames[v];
      $line("var %s = env['%s'];", var_name(name), name);
    }
    var len = segments.length;
    for (var i = 0;i < len; i++) {
      var segment = segments[i];
      $line("// " + JSON.stringify(segment));
      match_seg(segment);
    }
    $line("if (offset == binsize) {");
    $line("return {");
    for (var v = 0;v < varnames.length; v++) {
      var name = varnames[v];
      $line("%s: %s,", name, var_name(name));
    }
    $line("};");
    $line("}");
    $line("else return false;");
    $line("}");
    var fn = new Function("parse_int", "parse_float", $result());
    return fn(parse_int, parse_float);
  };
  var write_seg = function(segment) {
    switch (segment.type) {
      case "string":
        $line("offset += buf.write(%s, offset, 'utf8');", JSON.stringify(segment.value));
        break;
      case "binary":
        $line("val = bindings['%s'];", segment.name);
        if (segment.size === true) {
          $line("size = val.length;");
        } else if (typeof segment.size === "string") {
          $line("size = (bindings['%s'] * %d) / 8;", segment.size, segment.unit);
        } else {
          $line("size = %d;", segment.size * segment.unit / 8);
        }
        $line("val.copy(buf, offset, 0, size);");
        $line("offset += size;");
        break;
      case "integer":
      case "float":
        write_number(segment);
        break;
    }
  };
  var write_number = function(segment) {
    if (segment.name) {
      $line("val = bindings['%s'];", segment.name);
    } else {
      $line("val = %d", segment.value);
    }
    var writer = segment.type === "integer" ? "write_int" : "write_float";
    if (typeof segment.size === "string") {
      $line("size = (bindings['%s'] * %d) / 8;", segment.size, segment.unit);
    } else {
      $line("size = %d;", segment.size * segment.unit / 8);
    }
    $line("%s(buf, val, offset, size, %s);", writer, segment.bigendian);
    $line("offset += size;");
  };
  var size_of = function(segments) {
    var variable = [];
    var fixed = 0;
    for (var i = 0;i < segments.length; i++) {
      var segment = segments[i];
      if (typeof segment.size === "string" || segment.size === true) {
        variable.push(segment);
      } else if (segment.type === "string") {
        fixed += Buffer2.byteLength(segment.value);
      } else {
        fixed += segment.size * segment.unit / 8;
      }
    }
    $line("var buffersize = %d;", fixed);
    if (variable.length > 0) {
      for (var j = 0;j < variable.length; j++) {
        var segment = variable[j];
        if (segment.size === true) {
          $line("buffersize += bindings['%s'].length;", segment.name);
        } else {
          $line("buffersize += (bindings['%s'] * %d) / 8;", segment.size, segment.unit);
        }
      }
    }
  };
  var emit_write = function(segments) {
    $line("var val, size;");
    var len = segments.length;
    for (var i = 0;i < len; i++) {
      var segment = segments[i];
      $line("// %s", JSON.stringify(segment));
      write_seg(segment);
    }
  };
  var compile_ctor = function(segments) {
    $start();
    $line("return function(bindings) {");
    $line("'use strict';");
    size_of(segments);
    $line("var buf = Buffer.alloc(buffersize);");
    $line("var offset = 0;");
    emit_write(segments);
    $line("return buf;");
    $line("}");
    return new Function("write_int", "write_float", "Buffer", $result())(write_int, write_float, Buffer2);
  };
  require_buffer_more_ints();
  var $ = import.meta.require("node:util").format;
  var parse = require_parse().parse;
  var interp = require_interp();
  var parse_int = interp.parse_int;
  var parse_float = interp.parse_float;
  var construct = require_constructor();
  var write_int = construct.write_int;
  var write_float = construct.write_float;
  var Buffer2 = require_safe_buffer().Buffer;
  var lines = [];
  exports.compile_pattern = compile_pattern;
  exports.compile = function() {
    var str = [].join.call(arguments, ",");
    var p = parse(str);
    return compile_pattern(p);
  };
  exports.compile_builder = function() {
    var str = [].join.call(arguments, ",");
    var p = parse(str);
    return compile_ctor(p);
  };
});

// node_modules/@acuminous/bitsyntax/index.js
var require_bitsyntax = __commonJS((exports, module) => {
  exports.parse = require_parse().parse;
  exports.match = require_interp().match;
  exports.build = require_constructor().build;
  exports.write = require_constructor().write;
  exports.matcher = exports.compile = require_compile().compile;
  exports.builder = require_compile().compile_builder;
});

// node_modules/amqplib/lib/frame.js
var require_frame = __commonJS((exports, module) => {
  var parseFrame = function(bin, max) {
    var fh = frameHeaderPattern(bin);
    if (fh) {
      var { size, rest } = fh;
      console.error("size", size);
      console.log("max", max);
      if (size > max) {
        throw new Error("Frame size exceeds frame max");
      } else if (rest.length > size) {
        if (rest[size] !== FRAME_END)
          throw new Error("Invalid frame");
        return {
          type: fh.type,
          channel: fh.channel,
          size,
          payload: rest.slice(0, size),
          rest: rest.slice(size + 1)
        };
      }
    }
    return false;
  };
  var defs = require_defs();
  var constants = defs.constants;
  var decode = defs.decode;
  var Bits = require_bitsyntax();
  exports.PROTOCOL_HEADER = "AMQP" + String.fromCharCode(0, 0, 9, 1);
  var FRAME_METHOD = constants.FRAME_METHOD;
  var FRAME_HEARTBEAT = constants.FRAME_HEARTBEAT;
  var FRAME_HEADER = constants.FRAME_HEADER;
  var FRAME_BODY = constants.FRAME_BODY;
  var FRAME_END = constants.FRAME_END;
  var bodyCons = Bits.builder(FRAME_BODY, "channel:16, size:32, payload:size/binary", FRAME_END);
  exports.makeBodyFrame = function(channel, payload) {
    return bodyCons({ channel, size: payload.length, payload });
  };
  var frameHeaderPattern = Bits.matcher("type:8", "channel:16", "size:32", "rest/binary");
  exports.parseFrame = parseFrame;
  var headerPattern = Bits.matcher("class:16", "_weight:16", "size:64", "flagsAndfields/binary");
  var methodPattern = Bits.matcher("id:32, args/binary");
  var HEARTBEAT = { channel: 0 };
  exports.decodeFrame = function(frame) {
    var payload = frame.payload;
    switch (frame.type) {
      case FRAME_METHOD:
        var idAndArgs = methodPattern(payload);
        var id = idAndArgs.id;
        var fields = decode(id, idAndArgs.args);
        return { id, channel: frame.channel, fields };
      case FRAME_HEADER:
        var parts = headerPattern(payload);
        var id = parts["class"];
        var fields = decode(id, parts.flagsAndfields);
        return {
          id,
          channel: frame.channel,
          size: parts.size,
          fields
        };
      case FRAME_BODY:
        return { channel: frame.channel, content: frame.payload };
      case FRAME_HEARTBEAT:
        return HEARTBEAT;
      default:
        throw new Error("Unknown frame type " + frame.type);
    }
  };
  exports.HEARTBEAT_BUF = Buffer.from([
    constants.FRAME_HEARTBEAT,
    0,
    0,
    0,
    0,
    0,
    0,
    constants.FRAME_END
  ]);
  exports.HEARTBEAT = HEARTBEAT;
});

// node_modules/amqplib/lib/mux.js
var require_mux = __commonJS((exports, module) => {
  var Mux = function(downstream) {
    this.newStreams = [];
    this.oldStreams = [];
    this.blocked = false;
    this.scheduledRead = false;
    this.out = downstream;
    var self2 = this;
    downstream.on("drain", function() {
      self2.blocked = false;
      self2._readIncoming();
    });
  };
  var assert = import.meta.require("node:assert");
  var schedule = typeof setImmediate === "function" ? setImmediate : process.nextTick;
  Mux.prototype._readIncoming = function() {
    if (this.blocked)
      return;
    var accepting = true;
    var out = this.out;
    function roundrobin(streams) {
      var s2;
      while (accepting && (s2 = streams.shift())) {
        var chunk = s2.read();
        if (chunk !== null) {
          accepting = out.write(chunk);
          streams.push(s2);
        }
      }
    }
    roundrobin(this.newStreams);
    if (accepting) {
      assert.equal(0, this.newStreams.length);
      roundrobin(this.oldStreams);
    } else {
      assert(this.newStreams.length > 0, "Expect some new streams to remain");
      Array.prototype.push.apply(this.oldStreams, this.newStreams);
      this.newStreams = [];
    }
    this.blocked = !accepting;
  };
  Mux.prototype._scheduleRead = function() {
    var self2 = this;
    if (!self2.scheduledRead) {
      schedule(function() {
        self2.scheduledRead = false;
        self2._readIncoming();
      });
      self2.scheduledRead = true;
    }
  };
  Mux.prototype.pipeFrom = function(readable) {
    var self2 = this;
    function enqueue() {
      self2.newStreams.push(readable);
      self2._scheduleRead();
    }
    function cleanup() {
      readable.removeListener("readable", enqueue);
      readable.removeListener("error", cleanup);
      readable.removeListener("end", cleanup);
      readable.removeListener("unpipeFrom", cleanupIfMe);
    }
    function cleanupIfMe(dest) {
      if (dest === self2)
        cleanup();
    }
    readable.on("unpipeFrom", cleanupIfMe);
    readable.on("end", cleanup);
    readable.on("error", cleanup);
    readable.on("readable", enqueue);
  };
  Mux.prototype.unpipeFrom = function(readable) {
    readable.emit("unpipeFrom", this);
  };
  exports.Mux = Mux;
});

// node_modules/core-util-is/lib/util.js
var require_util = __commonJS((exports) => {
  var isArray = function(arg) {
    if (Array.isArray) {
      return Array.isArray(arg);
    }
    return objectToString(arg) === "[object Array]";
  };
  var isBoolean = function(arg) {
    return typeof arg === "boolean";
  };
  var isNull = function(arg) {
    return arg === null;
  };
  var isNullOrUndefined = function(arg) {
    return arg == null;
  };
  var isNumber = function(arg) {
    return typeof arg === "number";
  };
  var isString = function(arg) {
    return typeof arg === "string";
  };
  var isSymbol = function(arg) {
    return typeof arg === "symbol";
  };
  var isUndefined = function(arg) {
    return arg === undefined;
  };
  var isRegExp = function(re) {
    return objectToString(re) === "[object RegExp]";
  };
  var isObject = function(arg) {
    return typeof arg === "object" && arg !== null;
  };
  var isDate = function(d) {
    return objectToString(d) === "[object Date]";
  };
  var isError = function(e) {
    return objectToString(e) === "[object Error]" || e instanceof Error;
  };
  var isFunction = function(arg) {
    return typeof arg === "function";
  };
  var isPrimitive = function(arg) {
    return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || typeof arg === "undefined";
  };
  var objectToString = function(o2) {
    return Object.prototype.toString.call(o2);
  };
  exports.isArray = isArray;
  exports.isBoolean = isBoolean;
  exports.isNull = isNull;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isNumber = isNumber;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.isUndefined = isUndefined;
  exports.isRegExp = isRegExp;
  exports.isObject = isObject;
  exports.isDate = isDate;
  exports.isError = isError;
  exports.isFunction = isFunction;
  exports.isPrimitive = isPrimitive;
  exports.isBuffer = import.meta.require("node:buffer").Buffer.isBuffer;
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports, module) => {
  if (typeof Object.create === "function") {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor;
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports, module) => {
  try {
    util = import.meta.require("node:util");
    if (typeof util.inherits !== "function")
      throw "";
    module.exports = util.inherits;
  } catch (e) {
    module.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/string_decoder/index.js
var require_string_decoder = __commonJS((exports) => {
  var assertEncoding = function(encoding) {
    if (encoding && !isBufferEncoding(encoding)) {
      throw new Error("Unknown encoding: " + encoding);
    }
  };
  var passThroughWrite = function(buffer) {
    return buffer.toString(this.encoding);
  };
  var utf16DetectIncompleteChar = function(buffer) {
    this.charReceived = buffer.length % 2;
    this.charLength = this.charReceived ? 2 : 0;
  };
  var base64DetectIncompleteChar = function(buffer) {
    this.charReceived = buffer.length % 3;
    this.charLength = this.charReceived ? 3 : 0;
  };
  var Buffer2 = import.meta.require("node:buffer").Buffer;
  var isBufferEncoding = Buffer2.isEncoding || function(encoding) {
    switch (encoding && encoding.toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
      case "raw":
        return true;
      default:
        return false;
    }
  };
  var StringDecoder = exports.StringDecoder = function(encoding) {
    this.encoding = (encoding || "utf8").toLowerCase().replace(/[-_]/, "");
    assertEncoding(encoding);
    switch (this.encoding) {
      case "utf8":
        this.surrogateSize = 3;
        break;
      case "ucs2":
      case "utf16le":
        this.surrogateSize = 2;
        this.detectIncompleteChar = utf16DetectIncompleteChar;
        break;
      case "base64":
        this.surrogateSize = 3;
        this.detectIncompleteChar = base64DetectIncompleteChar;
        break;
      default:
        this.write = passThroughWrite;
        return;
    }
    this.charBuffer = new Buffer2(6);
    this.charReceived = 0;
    this.charLength = 0;
  };
  StringDecoder.prototype.write = function(buffer) {
    var charStr = "";
    while (this.charLength) {
      var available = buffer.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : buffer.length;
      buffer.copy(this.charBuffer, this.charReceived, 0, available);
      this.charReceived += available;
      if (this.charReceived < this.charLength) {
        return "";
      }
      buffer = buffer.slice(available, buffer.length);
      charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
      var charCode = charStr.charCodeAt(charStr.length - 1);
      if (charCode >= 55296 && charCode <= 56319) {
        this.charLength += this.surrogateSize;
        charStr = "";
        continue;
      }
      this.charReceived = this.charLength = 0;
      if (buffer.length === 0) {
        return charStr;
      }
      break;
    }
    this.detectIncompleteChar(buffer);
    var end = buffer.length;
    if (this.charLength) {
      buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
      end -= this.charReceived;
    }
    charStr += buffer.toString(this.encoding, 0, end);
    var end = charStr.length - 1;
    var charCode = charStr.charCodeAt(end);
    if (charCode >= 55296 && charCode <= 56319) {
      var size = this.surrogateSize;
      this.charLength += size;
      this.charReceived += size;
      this.charBuffer.copy(this.charBuffer, size, 0, size);
      buffer.copy(this.charBuffer, 0, 0, size);
      return charStr.substring(0, end);
    }
    return charStr;
  };
  StringDecoder.prototype.detectIncompleteChar = function(buffer) {
    var i = buffer.length >= 3 ? 3 : buffer.length;
    for (;i > 0; i--) {
      var c = buffer[buffer.length - i];
      if (i == 1 && c >> 5 == 6) {
        this.charLength = 2;
        break;
      }
      if (i <= 2 && c >> 4 == 14) {
        this.charLength = 3;
        break;
      }
      if (i <= 3 && c >> 3 == 30) {
        this.charLength = 4;
        break;
      }
    }
    this.charReceived = i;
  };
  StringDecoder.prototype.end = function(buffer) {
    var res = "";
    if (buffer && buffer.length)
      res = this.write(buffer);
    if (this.charReceived) {
      var cr = this.charReceived;
      var buf = this.charBuffer;
      var enc = this.encoding;
      res += buf.slice(0, cr).toString(enc);
    }
    return res;
  };
});

// node_modules/isarray/index.js
var require_isarray = __commonJS((exports, module) => {
  module.exports = Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) == "[object Array]";
  };
});

// node_modules/readable-stream/lib/_stream_readable.js
var require__stream_readable = __commonJS((exports, module) => {
  var ReadableState = function(options, stream) {
    var Duplex = require__stream_duplex();
    options = options || {};
    var hwm = options.highWaterMark;
    var defaultHwm = options.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
    this.highWaterMark = ~~this.highWaterMark;
    this.buffer = [];
    this.length = 0;
    this.pipes = null;
    this.pipesCount = 0;
    this.flowing = null;
    this.ended = false;
    this.endEmitted = false;
    this.reading = false;
    this.sync = true;
    this.needReadable = false;
    this.emittedReadable = false;
    this.readableListening = false;
    this.objectMode = !!options.objectMode;
    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.ranOut = false;
    this.awaitDrain = 0;
    this.readingMore = false;
    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        StringDecoder = require_string_decoder().StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }
  };
  var Readable = function(options) {
    var Duplex = require__stream_duplex();
    if (!(this instanceof Readable))
      return new Readable(options);
    this._readableState = new ReadableState(options, this);
    this.readable = true;
    Stream.call(this);
  };
  var readableAddChunk = function(stream, state, chunk, encoding, addToFront) {
    var er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit("error", er);
    } else if (util.isNullOrUndefined(chunk)) {
      state.reading = false;
      if (!state.ended)
        onEofChunk(stream, state);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (state.ended && !addToFront) {
        var e = new Error("stream.push() after EOF");
        stream.emit("error", e);
      } else if (state.endEmitted && addToFront) {
        var e = new Error("stream.unshift() after end event");
        stream.emit("error", e);
      } else {
        if (state.decoder && !addToFront && !encoding)
          chunk = state.decoder.write(chunk);
        if (!addToFront)
          state.reading = false;
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit("data", chunk);
          stream.read(0);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront)
            state.buffer.unshift(chunk);
          else
            state.buffer.push(chunk);
          if (state.needReadable)
            emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
    } else if (!addToFront) {
      state.reading = false;
    }
    return needMoreData(state);
  };
  var needMoreData = function(state) {
    return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
  };
  var roundUpToNextPowerOf2 = function(n) {
    if (n >= MAX_HWM) {
      n = MAX_HWM;
    } else {
      n--;
      for (var p = 1;p < 32; p <<= 1)
        n |= n >> p;
      n++;
    }
    return n;
  };
  var howMuchToRead = function(n, state) {
    if (state.length === 0 && state.ended)
      return 0;
    if (state.objectMode)
      return n === 0 ? 0 : 1;
    if (isNaN(n) || util.isNull(n)) {
      if (state.flowing && state.buffer.length)
        return state.buffer[0].length;
      else
        return state.length;
    }
    if (n <= 0)
      return 0;
    if (n > state.highWaterMark)
      state.highWaterMark = roundUpToNextPowerOf2(n);
    if (n > state.length) {
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      } else
        return state.length;
    }
    return n;
  };
  var chunkInvalid = function(state, chunk) {
    var er = null;
    if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
      er = new TypeError("Invalid non-string/buffer chunk");
    }
    return er;
  };
  var onEofChunk = function(stream, state) {
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) {
        state.buffer.push(chunk);
        state.length += state.objectMode ? 1 : chunk.length;
      }
    }
    state.ended = true;
    emitReadable(stream);
  };
  var emitReadable = function(stream) {
    var state = stream._readableState;
    state.needReadable = false;
    if (!state.emittedReadable) {
      debug("emitReadable", state.flowing);
      state.emittedReadable = true;
      if (state.sync)
        process.nextTick(function() {
          emitReadable_(stream);
        });
      else
        emitReadable_(stream);
    }
  };
  var emitReadable_ = function(stream) {
    debug("emit readable");
    stream.emit("readable");
    flow(stream);
  };
  var maybeReadMore = function(stream, state) {
    if (!state.readingMore) {
      state.readingMore = true;
      process.nextTick(function() {
        maybeReadMore_(stream, state);
      });
    }
  };
  var maybeReadMore_ = function(stream, state) {
    var len = state.length;
    while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
      debug("maybeReadMore read 0");
      stream.read(0);
      if (len === state.length)
        break;
      else
        len = state.length;
    }
    state.readingMore = false;
  };
  var pipeOnDrain = function(src) {
    return function() {
      var state = src._readableState;
      debug("pipeOnDrain", state.awaitDrain);
      if (state.awaitDrain)
        state.awaitDrain--;
      if (state.awaitDrain === 0 && EE.listenerCount(src, "data")) {
        state.flowing = true;
        flow(src);
      }
    };
  };
  var resume = function(stream, state) {
    if (!state.resumeScheduled) {
      state.resumeScheduled = true;
      process.nextTick(function() {
        resume_(stream, state);
      });
    }
  };
  var resume_ = function(stream, state) {
    state.resumeScheduled = false;
    stream.emit("resume");
    flow(stream);
    if (state.flowing && !state.reading)
      stream.read(0);
  };
  var flow = function(stream) {
    var state = stream._readableState;
    debug("flow", state.flowing);
    if (state.flowing) {
      do {
        var chunk = stream.read();
      } while (chunk !== null && state.flowing);
    }
  };
  var fromList = function(n, state) {
    var list = state.buffer;
    var length = state.length;
    var stringMode = !!state.decoder;
    var objectMode = !!state.objectMode;
    var ret;
    if (list.length === 0)
      return null;
    if (length === 0)
      ret = null;
    else if (objectMode)
      ret = list.shift();
    else if (!n || n >= length) {
      if (stringMode)
        ret = list.join("");
      else
        ret = Buffer2.concat(list, length);
      list.length = 0;
    } else {
      if (n < list[0].length) {
        var buf = list[0];
        ret = buf.slice(0, n);
        list[0] = buf.slice(n);
      } else if (n === list[0].length) {
        ret = list.shift();
      } else {
        if (stringMode)
          ret = "";
        else
          ret = new Buffer2(n);
        var c = 0;
        for (var i = 0, l = list.length;i < l && c < n; i++) {
          var buf = list[0];
          var cpy = Math.min(n - c, buf.length);
          if (stringMode)
            ret += buf.slice(0, cpy);
          else
            buf.copy(ret, c, 0, cpy);
          if (cpy < buf.length)
            list[0] = buf.slice(cpy);
          else
            list.shift();
          c += cpy;
        }
      }
    }
    return ret;
  };
  var endReadable = function(stream) {
    var state = stream._readableState;
    if (state.length > 0)
      throw new Error("endReadable called on non-empty stream");
    if (!state.endEmitted) {
      state.ended = true;
      process.nextTick(function() {
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
        }
      });
    }
  };
  var forEach = function(xs, f) {
    for (var i = 0, l = xs.length;i < l; i++) {
      f(xs[i], i);
    }
  };
  var indexOf = function(xs, x) {
    for (var i = 0, l = xs.length;i < l; i++) {
      if (xs[i] === x)
        return i;
    }
    return -1;
  };
  module.exports = Readable;
  var isArray = require_isarray();
  var Buffer2 = import.meta.require("node:buffer").Buffer;
  Readable.ReadableState = ReadableState;
  var EE = import.meta.require("node:events").EventEmitter;
  if (!EE.listenerCount)
    EE.listenerCount = function(emitter, type) {
      return emitter.listeners(type).length;
    };
  var Stream = import.meta.require("node:stream");
  var util = require_util();
  util.inherits = require_inherits();
  var StringDecoder;
  var debug = import.meta.require("node:util");
  if (debug && debug.debuglog) {
    debug = debug.debuglog("stream");
  } else {
    debug = function() {
    };
  }
  util.inherits(Readable, Stream);
  Readable.prototype.push = function(chunk, encoding) {
    var state = this._readableState;
    if (util.isString(chunk) && !state.objectMode) {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = new Buffer2(chunk, encoding);
        encoding = "";
      }
    }
    return readableAddChunk(this, state, chunk, encoding, false);
  };
  Readable.prototype.unshift = function(chunk) {
    var state = this._readableState;
    return readableAddChunk(this, state, chunk, "", true);
  };
  Readable.prototype.setEncoding = function(enc) {
    if (!StringDecoder)
      StringDecoder = require_string_decoder().StringDecoder;
    this._readableState.decoder = new StringDecoder(enc);
    this._readableState.encoding = enc;
    return this;
  };
  var MAX_HWM = 8388608;
  Readable.prototype.read = function(n) {
    debug("read", n);
    var state = this._readableState;
    var nOrig = n;
    if (!util.isNumber(n) || n > 0)
      state.emittedReadable = false;
    if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
      debug("read: emitReadable", state.length, state.ended);
      if (state.length === 0 && state.ended)
        endReadable(this);
      else
        emitReadable(this);
      return null;
    }
    n = howMuchToRead(n, state);
    if (n === 0 && state.ended) {
      if (state.length === 0)
        endReadable(this);
      return null;
    }
    var doRead = state.needReadable;
    debug("need readable", doRead);
    if (state.length === 0 || state.length - n < state.highWaterMark) {
      doRead = true;
      debug("length less than watermark", doRead);
    }
    if (state.ended || state.reading) {
      doRead = false;
      debug("reading or ended", doRead);
    }
    if (doRead) {
      debug("do read");
      state.reading = true;
      state.sync = true;
      if (state.length === 0)
        state.needReadable = true;
      this._read(state.highWaterMark);
      state.sync = false;
    }
    if (doRead && !state.reading)
      n = howMuchToRead(nOrig, state);
    var ret;
    if (n > 0)
      ret = fromList(n, state);
    else
      ret = null;
    if (util.isNull(ret)) {
      state.needReadable = true;
      n = 0;
    }
    state.length -= n;
    if (state.length === 0 && !state.ended)
      state.needReadable = true;
    if (nOrig !== n && state.ended && state.length === 0)
      endReadable(this);
    if (!util.isNull(ret))
      this.emit("data", ret);
    return ret;
  };
  Readable.prototype._read = function(n) {
    this.emit("error", new Error("not implemented"));
  };
  Readable.prototype.pipe = function(dest, pipeOpts) {
    var src = this;
    var state = this._readableState;
    switch (state.pipesCount) {
      case 0:
        state.pipes = dest;
        break;
      case 1:
        state.pipes = [state.pipes, dest];
        break;
      default:
        state.pipes.push(dest);
        break;
    }
    state.pipesCount += 1;
    debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
    var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
    var endFn = doEnd ? onend : cleanup;
    if (state.endEmitted)
      process.nextTick(endFn);
    else
      src.once("end", endFn);
    dest.on("unpipe", onunpipe);
    function onunpipe(readable) {
      debug("onunpipe");
      if (readable === src) {
        cleanup();
      }
    }
    function onend() {
      debug("onend");
      dest.end();
    }
    var ondrain = pipeOnDrain(src);
    dest.on("drain", ondrain);
    function cleanup() {
      debug("cleanup");
      dest.removeListener("close", onclose);
      dest.removeListener("finish", onfinish);
      dest.removeListener("drain", ondrain);
      dest.removeListener("error", onerror);
      dest.removeListener("unpipe", onunpipe);
      src.removeListener("end", onend);
      src.removeListener("end", cleanup);
      src.removeListener("data", ondata);
      if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
        ondrain();
    }
    src.on("data", ondata);
    function ondata(chunk) {
      debug("ondata");
      var ret = dest.write(chunk);
      if (ret === false) {
        debug("false write response, pause", src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        src.pause();
      }
    }
    function onerror(er) {
      debug("onerror", er);
      unpipe();
      dest.removeListener("error", onerror);
      if (EE.listenerCount(dest, "error") === 0)
        dest.emit("error", er);
    }
    if (!dest._events || !dest._events.error)
      dest.on("error", onerror);
    else if (isArray(dest._events.error))
      dest._events.error.unshift(onerror);
    else
      dest._events.error = [onerror, dest._events.error];
    function onclose() {
      dest.removeListener("finish", onfinish);
      unpipe();
    }
    dest.once("close", onclose);
    function onfinish() {
      debug("onfinish");
      dest.removeListener("close", onclose);
      unpipe();
    }
    dest.once("finish", onfinish);
    function unpipe() {
      debug("unpipe");
      src.unpipe(dest);
    }
    dest.emit("pipe", src);
    if (!state.flowing) {
      debug("pipe resume");
      src.resume();
    }
    return dest;
  };
  Readable.prototype.unpipe = function(dest) {
    var state = this._readableState;
    if (state.pipesCount === 0)
      return this;
    if (state.pipesCount === 1) {
      if (dest && dest !== state.pipes)
        return this;
      if (!dest)
        dest = state.pipes;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      if (dest)
        dest.emit("unpipe", this);
      return this;
    }
    if (!dest) {
      var dests = state.pipes;
      var len = state.pipesCount;
      state.pipes = null;
      state.pipesCount = 0;
      state.flowing = false;
      for (var i = 0;i < len; i++)
        dests[i].emit("unpipe", this);
      return this;
    }
    var i = indexOf(state.pipes, dest);
    if (i === -1)
      return this;
    state.pipes.splice(i, 1);
    state.pipesCount -= 1;
    if (state.pipesCount === 1)
      state.pipes = state.pipes[0];
    dest.emit("unpipe", this);
    return this;
  };
  Readable.prototype.on = function(ev, fn) {
    var res = Stream.prototype.on.call(this, ev, fn);
    if (ev === "data" && this._readableState.flowing !== false) {
      this.resume();
    }
    if (ev === "readable" && this.readable) {
      var state = this._readableState;
      if (!state.readableListening) {
        state.readableListening = true;
        state.emittedReadable = false;
        state.needReadable = true;
        if (!state.reading) {
          var self2 = this;
          process.nextTick(function() {
            debug("readable nexttick read 0");
            self2.read(0);
          });
        } else if (state.length) {
          emitReadable(this, state);
        }
      }
    }
    return res;
  };
  Readable.prototype.addListener = Readable.prototype.on;
  Readable.prototype.resume = function() {
    var state = this._readableState;
    if (!state.flowing) {
      debug("resume");
      state.flowing = true;
      if (!state.reading) {
        debug("resume read 0");
        this.read(0);
      }
      resume(this, state);
    }
    return this;
  };
  Readable.prototype.pause = function() {
    debug("call pause flowing=%j", this._readableState.flowing);
    if (this._readableState.flowing !== false) {
      debug("pause");
      this._readableState.flowing = false;
      this.emit("pause");
    }
    return this;
  };
  Readable.prototype.wrap = function(stream) {
    var state = this._readableState;
    var paused = false;
    var self2 = this;
    stream.on("end", function() {
      debug("wrapped end");
      if (state.decoder && !state.ended) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length)
          self2.push(chunk);
      }
      self2.push(null);
    });
    stream.on("data", function(chunk) {
      debug("wrapped data");
      if (state.decoder)
        chunk = state.decoder.write(chunk);
      if (!chunk || !state.objectMode && !chunk.length)
        return;
      var ret = self2.push(chunk);
      if (!ret) {
        paused = true;
        stream.pause();
      }
    });
    for (var i in stream) {
      if (util.isFunction(stream[i]) && util.isUndefined(this[i])) {
        this[i] = function(method) {
          return function() {
            return stream[method].apply(stream, arguments);
          };
        }(i);
      }
    }
    var events = ["error", "close", "destroy", "pause", "resume"];
    forEach(events, function(ev) {
      stream.on(ev, self2.emit.bind(self2, ev));
    });
    self2._read = function(n) {
      debug("wrapped _read", n);
      if (paused) {
        paused = false;
        stream.resume();
      }
    };
    return self2;
  };
  Readable._fromList = fromList;
});

// node_modules/readable-stream/lib/_stream_writable.js
var require__stream_writable = __commonJS((exports, module) => {
  var WriteReq = function(chunk, encoding, cb) {
    this.chunk = chunk;
    this.encoding = encoding;
    this.callback = cb;
  };
  var WritableState = function(options, stream) {
    var Duplex = require__stream_duplex();
    options = options || {};
    var hwm = options.highWaterMark;
    var defaultHwm = options.objectMode ? 16 : 16 * 1024;
    this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
    this.objectMode = !!options.objectMode;
    if (stream instanceof Duplex)
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    this.highWaterMark = ~~this.highWaterMark;
    this.needDrain = false;
    this.ending = false;
    this.ended = false;
    this.finished = false;
    var noDecode = options.decodeStrings === false;
    this.decodeStrings = !noDecode;
    this.defaultEncoding = options.defaultEncoding || "utf8";
    this.length = 0;
    this.writing = false;
    this.corked = 0;
    this.sync = true;
    this.bufferProcessing = false;
    this.onwrite = function(er) {
      onwrite(stream, er);
    };
    this.writecb = null;
    this.writelen = 0;
    this.buffer = [];
    this.pendingcb = 0;
    this.prefinished = false;
    this.errorEmitted = false;
  };
  var Writable = function(options) {
    var Duplex = require__stream_duplex();
    if (!(this instanceof Writable) && !(this instanceof Duplex))
      return new Writable(options);
    this._writableState = new WritableState(options, this);
    this.writable = true;
    Stream.call(this);
  };
  var writeAfterEnd = function(stream, state, cb) {
    var er = new Error("write after end");
    stream.emit("error", er);
    process.nextTick(function() {
      cb(er);
    });
  };
  var validChunk = function(stream, state, chunk, cb) {
    var valid = true;
    if (!util.isBuffer(chunk) && !util.isString(chunk) && !util.isNullOrUndefined(chunk) && !state.objectMode) {
      var er = new TypeError("Invalid non-string/buffer chunk");
      stream.emit("error", er);
      process.nextTick(function() {
        cb(er);
      });
      valid = false;
    }
    return valid;
  };
  var decodeChunk = function(state, chunk, encoding) {
    if (!state.objectMode && state.decodeStrings !== false && util.isString(chunk)) {
      chunk = new Buffer2(chunk, encoding);
    }
    return chunk;
  };
  var writeOrBuffer = function(stream, state, chunk, encoding, cb) {
    chunk = decodeChunk(state, chunk, encoding);
    if (util.isBuffer(chunk))
      encoding = "buffer";
    var len = state.objectMode ? 1 : chunk.length;
    state.length += len;
    var ret = state.length < state.highWaterMark;
    if (!ret)
      state.needDrain = true;
    if (state.writing || state.corked)
      state.buffer.push(new WriteReq(chunk, encoding, cb));
    else
      doWrite(stream, state, false, len, chunk, encoding, cb);
    return ret;
  };
  var doWrite = function(stream, state, writev, len, chunk, encoding, cb) {
    state.writelen = len;
    state.writecb = cb;
    state.writing = true;
    state.sync = true;
    if (writev)
      stream._writev(chunk, state.onwrite);
    else
      stream._write(chunk, encoding, state.onwrite);
    state.sync = false;
  };
  var onwriteError = function(stream, state, sync, er, cb) {
    if (sync)
      process.nextTick(function() {
        state.pendingcb--;
        cb(er);
      });
    else {
      state.pendingcb--;
      cb(er);
    }
    stream._writableState.errorEmitted = true;
    stream.emit("error", er);
  };
  var onwriteStateUpdate = function(state) {
    state.writing = false;
    state.writecb = null;
    state.length -= state.writelen;
    state.writelen = 0;
  };
  var onwrite = function(stream, er) {
    var state = stream._writableState;
    var sync = state.sync;
    var cb = state.writecb;
    onwriteStateUpdate(state);
    if (er)
      onwriteError(stream, state, sync, er, cb);
    else {
      var finished = needFinish(stream, state);
      if (!finished && !state.corked && !state.bufferProcessing && state.buffer.length) {
        clearBuffer(stream, state);
      }
      if (sync) {
        process.nextTick(function() {
          afterWrite(stream, state, finished, cb);
        });
      } else {
        afterWrite(stream, state, finished, cb);
      }
    }
  };
  var afterWrite = function(stream, state, finished, cb) {
    if (!finished)
      onwriteDrain(stream, state);
    state.pendingcb--;
    cb();
    finishMaybe(stream, state);
  };
  var onwriteDrain = function(stream, state) {
    if (state.length === 0 && state.needDrain) {
      state.needDrain = false;
      stream.emit("drain");
    }
  };
  var clearBuffer = function(stream, state) {
    state.bufferProcessing = true;
    if (stream._writev && state.buffer.length > 1) {
      var cbs = [];
      for (var c = 0;c < state.buffer.length; c++)
        cbs.push(state.buffer[c].callback);
      state.pendingcb++;
      doWrite(stream, state, true, state.length, state.buffer, "", function(err) {
        for (var i = 0;i < cbs.length; i++) {
          state.pendingcb--;
          cbs[i](err);
        }
      });
      state.buffer = [];
    } else {
      for (var c = 0;c < state.buffer.length; c++) {
        var entry = state.buffer[c];
        var chunk = entry.chunk;
        var encoding = entry.encoding;
        var cb = entry.callback;
        var len = state.objectMode ? 1 : chunk.length;
        doWrite(stream, state, false, len, chunk, encoding, cb);
        if (state.writing) {
          c++;
          break;
        }
      }
      if (c < state.buffer.length)
        state.buffer = state.buffer.slice(c);
      else
        state.buffer.length = 0;
    }
    state.bufferProcessing = false;
  };
  var needFinish = function(stream, state) {
    return state.ending && state.length === 0 && !state.finished && !state.writing;
  };
  var prefinish = function(stream, state) {
    if (!state.prefinished) {
      state.prefinished = true;
      stream.emit("prefinish");
    }
  };
  var finishMaybe = function(stream, state) {
    var need = needFinish(stream, state);
    if (need) {
      if (state.pendingcb === 0) {
        prefinish(stream, state);
        state.finished = true;
        stream.emit("finish");
      } else
        prefinish(stream, state);
    }
    return need;
  };
  var endWritable = function(stream, state, cb) {
    state.ending = true;
    finishMaybe(stream, state);
    if (cb) {
      if (state.finished)
        process.nextTick(cb);
      else
        stream.once("finish", cb);
    }
    state.ended = true;
  };
  module.exports = Writable;
  var Buffer2 = import.meta.require("node:buffer").Buffer;
  Writable.WritableState = WritableState;
  var util = require_util();
  util.inherits = require_inherits();
  var Stream = import.meta.require("node:stream");
  util.inherits(Writable, Stream);
  Writable.prototype.pipe = function() {
    this.emit("error", new Error("Cannot pipe. Not readable."));
  };
  Writable.prototype.write = function(chunk, encoding, cb) {
    var state = this._writableState;
    var ret = false;
    if (util.isFunction(encoding)) {
      cb = encoding;
      encoding = null;
    }
    if (util.isBuffer(chunk))
      encoding = "buffer";
    else if (!encoding)
      encoding = state.defaultEncoding;
    if (!util.isFunction(cb))
      cb = function() {
      };
    if (state.ended)
      writeAfterEnd(this, state, cb);
    else if (validChunk(this, state, chunk, cb)) {
      state.pendingcb++;
      ret = writeOrBuffer(this, state, chunk, encoding, cb);
    }
    return ret;
  };
  Writable.prototype.cork = function() {
    var state = this._writableState;
    state.corked++;
  };
  Writable.prototype.uncork = function() {
    var state = this._writableState;
    if (state.corked) {
      state.corked--;
      if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.buffer.length)
        clearBuffer(this, state);
    }
  };
  Writable.prototype._write = function(chunk, encoding, cb) {
    cb(new Error("not implemented"));
  };
  Writable.prototype._writev = null;
  Writable.prototype.end = function(chunk, encoding, cb) {
    var state = this._writableState;
    if (util.isFunction(chunk)) {
      cb = chunk;
      chunk = null;
      encoding = null;
    } else if (util.isFunction(encoding)) {
      cb = encoding;
      encoding = null;
    }
    if (!util.isNullOrUndefined(chunk))
      this.write(chunk, encoding);
    if (state.corked) {
      state.corked = 1;
      this.uncork();
    }
    if (!state.ending && !state.finished)
      endWritable(this, state, cb);
  };
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require__stream_duplex = __commonJS((exports, module) => {
  var Duplex = function(options) {
    if (!(this instanceof Duplex))
      return new Duplex(options);
    Readable.call(this, options);
    Writable.call(this, options);
    if (options && options.readable === false)
      this.readable = false;
    if (options && options.writable === false)
      this.writable = false;
    this.allowHalfOpen = true;
    if (options && options.allowHalfOpen === false)
      this.allowHalfOpen = false;
    this.once("end", onend);
  };
  var onend = function() {
    if (this.allowHalfOpen || this._writableState.ended)
      return;
    process.nextTick(this.end.bind(this));
  };
  var forEach = function(xs, f) {
    for (var i = 0, l = xs.length;i < l; i++) {
      f(xs[i], i);
    }
  };
  module.exports = Duplex;
  var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for (var key in obj)
      keys.push(key);
    return keys;
  };
  var util = require_util();
  util.inherits = require_inherits();
  var Readable = require__stream_readable();
  var Writable = require__stream_writable();
  util.inherits(Duplex, Readable);
  forEach(objectKeys(Writable.prototype), function(method) {
    if (!Duplex.prototype[method])
      Duplex.prototype[method] = Writable.prototype[method];
  });
});

// node_modules/amqplib/lib/heartbeat.js
var require_heartbeat = __commonJS((exports, module) => {
  var Heart = function(interval, checkSend, checkRecv) {
    EventEmitter.call(this);
    this.interval = interval;
    var intervalMs = interval * exports.UNITS_TO_MS;
    var beat = this.emit.bind(this, "beat");
    var timeout = this.emit.bind(this, "timeout");
    this.sendTimer = setInterval(this.runHeartbeat.bind(this, checkSend, beat), intervalMs / 2);
    var recvMissed = 0;
    function missedTwo() {
      if (!checkRecv())
        return ++recvMissed < 2;
      else {
        recvMissed = 0;
        return true;
      }
    }
    this.recvTimer = setInterval(this.runHeartbeat.bind(this, missedTwo, timeout), intervalMs);
  };
  var inherits = import.meta.require("node:util").inherits;
  var EventEmitter = import.meta.require("node:events").EventEmitter;
  exports.UNITS_TO_MS = 1000;
  inherits(Heart, EventEmitter);
  exports.Heart = Heart;
  Heart.prototype.clear = function() {
    clearInterval(this.sendTimer);
    clearInterval(this.recvTimer);
  };
  Heart.prototype.runHeartbeat = function(check, fail) {
    if (!check())
      fail();
  };
});

// node_modules/amqplib/lib/format.js
var require_format = __commonJS((exports, module) => {
  var defs = require_defs();
  var format = import.meta.require("node:util").format;
  var inherits = import.meta.require("node:util").inherits;
  var HEARTBEAT = require_frame().HEARTBEAT;
  exports.closeMessage = function(close) {
    var code = close.fields.replyCode;
    return format('%d (%s) with message "%s"', code, defs.constant_strs[code], close.fields.replyText);
  };
  exports.methodName = function(id) {
    return defs.info(id).name;
  };
  exports.inspect = function(frame, showFields) {
    if (frame === HEARTBEAT) {
      return "<Heartbeat>";
    } else if (!frame.id) {
      return format("<Content channel:%d size:%d>", frame.channel, frame.size);
    } else {
      var info = defs.info(frame.id);
      return format("<%s channel:%d%s>", info.name, frame.channel, showFields ? " " + JSON.stringify(frame.fields, undefined, 2) : "");
    }
  };
});

// node_modules/amqplib/lib/bitset.js
var require_bitset = __commonJS((exports, module) => {
  var wordIndex = function(bitIndex) {
    return Math.floor(bitIndex / 32);
  };
  var trailingZeros = function(i) {
    if (i === 0)
      return 32;
    let y, n = 31;
    y = i << 16;
    if (y != 0) {
      n = n - 16;
      i = y;
    }
    y = i << 8;
    if (y != 0) {
      n = n - 8;
      i = y;
    }
    y = i << 4;
    if (y != 0) {
      n = n - 4;
      i = y;
    }
    y = i << 2;
    if (y != 0) {
      n = n - 2;
      i = y;
    }
    return n - (i << 1 >>> 31);
  };

  class BitSet {
    constructor(size) {
      if (size) {
        const numWords = Math.ceil(size / 32);
        this.words = new Array(numWords);
      } else {
        this.words = [];
      }
      this.wordsInUse = 0;
    }
    ensureSize(numWords) {
      const wordsPresent = this.words.length;
      if (wordsPresent < numWords) {
        this.words = this.words.concat(new Array(numWords - wordsPresent));
      }
    }
    set(bitIndex) {
      const w = wordIndex(bitIndex);
      if (w >= this.wordsInUse) {
        this.ensureSize(w + 1);
        this.wordsInUse = w + 1;
      }
      const bit = 1 << bitIndex;
      this.words[w] |= bit;
    }
    clear(bitIndex) {
      const w = wordIndex(bitIndex);
      if (w >= this.wordsInUse)
        return;
      const mask = ~(1 << bitIndex);
      this.words[w] &= mask;
    }
    get(bitIndex) {
      const w = wordIndex(bitIndex);
      if (w >= this.wordsInUse)
        return false;
      const bit = 1 << bitIndex;
      return !!(this.words[w] & bit);
    }
    nextSetBit(fromIndex) {
      let w = wordIndex(fromIndex);
      if (w >= this.wordsInUse)
        return -1;
      let word = this.words[w] & 4294967295 << fromIndex;
      while (true) {
        if (word)
          return w * 32 + trailingZeros(word);
        w++;
        if (w === this.wordsInUse)
          return -1;
        word = this.words[w];
      }
    }
    nextClearBit(fromIndex) {
      let w = wordIndex(fromIndex);
      if (w >= this.wordsInUse)
        return fromIndex;
      let word = ~this.words[w] & 4294967295 << fromIndex;
      while (true) {
        if (word)
          return w * 32 + trailingZeros(word);
        w++;
        if (w == this.wordsInUse)
          return w * 32;
        word = ~this.words[w];
      }
    }
  }
  exports.BitSet = BitSet;
});

// node_modules/readable-stream/lib/_stream_transform.js
var require__stream_transform = __commonJS((exports, module) => {
  var TransformState = function(options, stream) {
    this.afterTransform = function(er, data) {
      return afterTransform(stream, er, data);
    };
    this.needTransform = false;
    this.transforming = false;
    this.writecb = null;
    this.writechunk = null;
  };
  var afterTransform = function(stream, er, data) {
    var ts = stream._transformState;
    ts.transforming = false;
    var cb = ts.writecb;
    if (!cb)
      return stream.emit("error", new Error("no writecb in Transform class"));
    ts.writechunk = null;
    ts.writecb = null;
    if (!util.isNullOrUndefined(data))
      stream.push(data);
    if (cb)
      cb(er);
    var rs = stream._readableState;
    rs.reading = false;
    if (rs.needReadable || rs.length < rs.highWaterMark) {
      stream._read(rs.highWaterMark);
    }
  };
  var Transform = function(options) {
    if (!(this instanceof Transform))
      return new Transform(options);
    Duplex.call(this, options);
    this._transformState = new TransformState(options, this);
    var stream = this;
    this._readableState.needReadable = true;
    this._readableState.sync = false;
    this.once("prefinish", function() {
      if (util.isFunction(this._flush))
        this._flush(function(er) {
          done(stream, er);
        });
      else
        done(stream);
    });
  };
  var done = function(stream, er) {
    if (er)
      return stream.emit("error", er);
    var ws = stream._writableState;
    var ts = stream._transformState;
    if (ws.length)
      throw new Error("calling transform done when ws.length != 0");
    if (ts.transforming)
      throw new Error("calling transform done when still transforming");
    return stream.push(null);
  };
  module.exports = Transform;
  var Duplex = require__stream_duplex();
  var util = require_util();
  util.inherits = require_inherits();
  util.inherits(Transform, Duplex);
  Transform.prototype.push = function(chunk, encoding) {
    this._transformState.needTransform = false;
    return Duplex.prototype.push.call(this, chunk, encoding);
  };
  Transform.prototype._transform = function(chunk, encoding, cb) {
    throw new Error("not implemented");
  };
  Transform.prototype._write = function(chunk, encoding, cb) {
    var ts = this._transformState;
    ts.writecb = cb;
    ts.writechunk = chunk;
    ts.writeencoding = encoding;
    if (!ts.transforming) {
      var rs = this._readableState;
      if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
        this._read(rs.highWaterMark);
    }
  };
  Transform.prototype._read = function(n) {
    var ts = this._transformState;
    if (!util.isNull(ts.writechunk) && ts.writecb && !ts.transforming) {
      ts.transforming = true;
      this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
    } else {
      ts.needTransform = true;
    }
  };
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require__stream_passthrough = __commonJS((exports, module) => {
  var PassThrough = function(options) {
    if (!(this instanceof PassThrough))
      return new PassThrough(options);
    Transform.call(this, options);
  };
  module.exports = PassThrough;
  var Transform = require__stream_transform();
  var util = require_util();
  util.inherits = require_inherits();
  util.inherits(PassThrough, Transform);
  PassThrough.prototype._transform = function(chunk, encoding, cb) {
    cb(null, chunk);
  };
});

// node_modules/amqplib/lib/error.js
var require_error = __commonJS((exports, module) => {
  var trimStack = function(stack, num) {
    return stack && stack.split("\n").slice(num).join("\n");
  };
  var IllegalOperationError = function(msg, stack) {
    var tmp = new Error;
    this.message = msg;
    this.stack = this.toString() + "\n" + trimStack(tmp.stack, 2);
    this.stackAtStateChange = stack;
  };
  var stackCapture = function(reason) {
    var e = new Error;
    return "Stack capture: " + reason + "\n" + trimStack(e.stack, 2);
  };
  var inherits = import.meta.require("node:util").inherits;
  inherits(IllegalOperationError, Error);
  IllegalOperationError.prototype.name = "IllegalOperationError";
  exports.IllegalOperationError = IllegalOperationError;
  exports.stackCapture = stackCapture;
});

// node_modules/amqplib/lib/connection.js
var require_connection = __commonJS((exports, module) => {
  var Connection = function(underlying) {
    EventEmitter.call(this);
    var stream = this.stream = wrapStream(underlying);
    this.muxer = new Mux(stream);
    this.rest = Buffer.alloc(0);
    this.frameMax = constants.FRAME_MIN_SIZE;
    this.sentSinceLastCheck = false;
    this.recvSinceLastCheck = false;
    this.expectSocketClose = false;
    this.freeChannels = new BitSet;
    this.channels = [{
      channel: { accept: channel0(this) },
      buffer: underlying
    }];
  };
  var mainAccept = function(frame2) {
    var rec = this.channels[frame2.channel];
    if (rec) {
      return rec.channel.accept(frame2);
    } else
      this.closeWithError(fmt("Frame on unknown channel %d", frame2.channel), constants.CHANNEL_ERROR, new Error(fmt("Frame on unknown channel: %s", inspect(frame2, false))));
  };
  var channel0 = function(connection) {
    return function(f) {
      if (f === HEARTBEAT)
        ;
      else if (f.id === defs.ConnectionClose) {
        connection.sendMethod(0, defs.ConnectionCloseOk, {});
        var emsg = fmt("Connection closed: %s", closeMsg(f));
        var s2 = stackCapture(emsg);
        var e = new Error(emsg);
        e.code = f.fields.replyCode;
        if (isFatalError(e)) {
          connection.emit("error", e);
        }
        connection.toClosed(s2, e);
      } else if (f.id === defs.ConnectionBlocked) {
        connection.emit("blocked", f.fields.reason);
      } else if (f.id === defs.ConnectionUnblocked) {
        connection.emit("unblocked");
      } else {
        connection.closeWithError(fmt("Unexpected frame on channel 0"), constants.UNEXPECTED_FRAME, new Error(fmt("Unexpected frame on channel 0: %s", inspect(f, false))));
      }
    };
  };
  var invalidOp = function(msg, stack) {
    return function() {
      throw new IllegalOperationError(msg, stack);
    };
  };
  var invalidateSend = function(conn, msg, stack) {
    conn.sendMethod = conn.sendContent = conn.sendMessage = invalidOp(msg, stack);
  };
  var wrapStream = function(s2) {
    if (s2 instanceof Duplex)
      return s2;
    else {
      var ws = new Duplex;
      ws.wrap(s2);
      ws._write = function(chunk, encoding, callback) {
        return s2.write(chunk, encoding, callback);
      };
      return ws;
    }
  };
  var isFatalError = function(error) {
    switch (error && error.code) {
      case defs.constants.CONNECTION_FORCED:
      case defs.constants.REPLY_SUCCESS:
        return false;
      default:
        return true;
    }
  };
  var defs = require_defs();
  var constants = defs.constants;
  var frame = require_frame();
  var HEARTBEAT = frame.HEARTBEAT;
  var Mux = require_mux().Mux;
  var Duplex = import.meta.require("node:stream").Duplex || require__stream_duplex();
  var EventEmitter = import.meta.require("node:events").EventEmitter;
  var Heart = require_heartbeat().Heart;
  var methodName = require_format().methodName;
  var closeMsg = require_format().closeMessage;
  var inspect = require_format().inspect;
  var BitSet = require_bitset().BitSet;
  var inherits = import.meta.require("node:util").inherits;
  var fmt = import.meta.require("node:util").format;
  var PassThrough = import.meta.require("node:stream").PassThrough || require__stream_passthrough();
  var IllegalOperationError = require_error().IllegalOperationError;
  var stackCapture = require_error().stackCapture;
  var DEFAULT_WRITE_HWM = 1024;
  var SINGLE_CHUNK_THRESHOLD = 2048;
  inherits(Connection, EventEmitter);
  var C = Connection.prototype;
  C.sendProtocolHeader = function() {
    this.sendBytes(frame.PROTOCOL_HEADER);
  };
  C.open = function(allFields, openCallback0) {
    var self2 = this;
    var openCallback = openCallback0 || function() {
    };
    var tunedOptions = Object.create(allFields);
    function wait(k) {
      self2.step(function(err, frame2) {
        if (err !== null)
          bail(err);
        else if (frame2.channel !== 0) {
          bail(new Error(fmt("Frame on channel != 0 during handshake: %s", inspect(frame2, false))));
        } else
          k(frame2);
      });
    }
    function expect(Method, k) {
      wait(function(frame2) {
        if (frame2.id === Method)
          k(frame2);
        else {
          bail(new Error(fmt("Expected %s; got %s", methodName(Method), inspect(frame2, false))));
        }
      });
    }
    function bail(err) {
      openCallback(err);
    }
    function send(Method) {
      self2.sendMethod(0, Method, tunedOptions);
    }
    function negotiate(server, desired) {
      if (server === 0 || desired === 0) {
        return Math.max(server, desired);
      } else {
        return Math.min(server, desired);
      }
    }
    function onStart(start) {
      var mechanisms = start.fields.mechanisms.toString().split(" ");
      if (mechanisms.indexOf(allFields.mechanism) < 0) {
        bail(new Error(fmt("SASL mechanism %s is not provided by the server", allFields.mechanism)));
        return;
      }
      self2.serverProperties = start.fields.serverProperties;
      try {
        send(defs.ConnectionStartOk);
      } catch (err) {
        bail(err);
        return;
      }
      wait(afterStartOk);
    }
    function afterStartOk(reply) {
      switch (reply.id) {
        case defs.ConnectionSecure:
          bail(new Error("Wasn't expecting to have to go through secure"));
          break;
        case defs.ConnectionClose:
          bail(new Error(fmt("Handshake terminated by server: %s", closeMsg(reply))));
          break;
        case defs.ConnectionTune:
          var fields = reply.fields;
          tunedOptions.frameMax = negotiate(fields.frameMax, allFields.frameMax);
          tunedOptions.channelMax = negotiate(fields.channelMax, allFields.channelMax);
          tunedOptions.heartbeat = negotiate(fields.heartbeat, allFields.heartbeat);
          try {
            send(defs.ConnectionTuneOk);
            send(defs.ConnectionOpen);
          } catch (err) {
            bail(err);
            return;
          }
          expect(defs.ConnectionOpenOk, onOpenOk);
          break;
        default:
          bail(new Error(fmt("Expected connection.secure, connection.close, or connection.tune during handshake; got %s", inspect(reply, false))));
          break;
      }
    }
    function onOpenOk(openOk) {
      self2.channelMax = tunedOptions.channelMax || 65535;
      self2.frameMax = tunedOptions.frameMax || 4294967295;
      self2.heartbeat = tunedOptions.heartbeat;
      self2.heartbeater = self2.startHeartbeater();
      self2.accept = mainAccept;
      succeed(openOk);
    }
    function endWhileOpening(err) {
      bail(err || new Error("Socket closed abruptly during opening handshake"));
    }
    this.stream.on("end", endWhileOpening);
    this.stream.on("error", endWhileOpening);
    function succeed(ok) {
      self2.stream.removeListener("end", endWhileOpening);
      self2.stream.removeListener("error", endWhileOpening);
      self2.stream.on("error", self2.onSocketError.bind(self2));
      self2.stream.on("end", self2.onSocketError.bind(self2, new Error("Unexpected close")));
      self2.on("frameError", self2.onSocketError.bind(self2));
      self2.acceptLoop();
      openCallback(null, ok);
    }
    this.sendProtocolHeader();
    expect(defs.ConnectionStart, onStart);
  };
  C.close = function(closeCallback) {
    var k = closeCallback && function() {
      closeCallback(null);
    };
    this.closeBecause("Cheers, thanks", constants.REPLY_SUCCESS, k);
  };
  C.closeBecause = function(reason, code, k) {
    this.sendMethod(0, defs.ConnectionClose, {
      replyText: reason,
      replyCode: code,
      methodId: 0,
      classId: 0
    });
    var s2 = stackCapture("closeBecause called: " + reason);
    this.toClosing(s2, k);
  };
  C.closeWithError = function(reason, code, error) {
    this.emit("error", error);
    this.closeBecause(reason, code);
  };
  C.onSocketError = function(err) {
    if (!this.expectSocketClose) {
      this.expectSocketClose = true;
      this.emit("error", err);
      var s2 = stackCapture("Socket error");
      this.toClosed(s2, err);
    }
  };
  C.toClosing = function(capturedStack, k) {
    var send = this.sendMethod.bind(this);
    this.accept = function(f) {
      if (f.id === defs.ConnectionCloseOk) {
        if (k)
          k();
        var s2 = stackCapture("ConnectionCloseOk received");
        this.toClosed(s2, undefined);
      } else if (f.id === defs.ConnectionClose) {
        send(0, defs.ConnectionCloseOk, {});
      }
    };
    invalidateSend(this, "Connection closing", capturedStack);
  };
  C._closeChannels = function(capturedStack) {
    for (var i = 1;i < this.channels.length; i++) {
      var ch = this.channels[i];
      if (ch !== null) {
        ch.channel.toClosed(capturedStack);
      }
    }
  };
  C.toClosed = function(capturedStack, maybeErr) {
    this._closeChannels(capturedStack);
    var info = fmt("Connection closed (%s)", maybeErr ? maybeErr.toString() : "by client");
    invalidateSend(this, info, capturedStack);
    this.accept = invalidOp(info, capturedStack);
    this.close = function(cb) {
      cb && cb(new IllegalOperationError(info, capturedStack));
    };
    if (this.heartbeater)
      this.heartbeater.clear();
    this.expectSocketClose = true;
    this.stream.end();
    this.emit("close", maybeErr);
  };
  C.startHeartbeater = function() {
    if (this.heartbeat === 0)
      return null;
    else {
      var self2 = this;
      var hb = new Heart(this.heartbeat, this.checkSend.bind(this), this.checkRecv.bind(this));
      hb.on("timeout", function() {
        var hberr = new Error("Heartbeat timeout");
        self2.emit("error", hberr);
        var s2 = stackCapture("Heartbeat timeout");
        self2.toClosed(s2, hberr);
      });
      hb.on("beat", function() {
        self2.sendHeartbeat();
      });
      return hb;
    }
  };
  C.freshChannel = function(channel, options) {
    var next = this.freeChannels.nextClearBit(1);
    if (next < 0 || next > this.channelMax)
      throw new Error("No channels left to allocate");
    this.freeChannels.set(next);
    var hwm = options && options.highWaterMark || DEFAULT_WRITE_HWM;
    var writeBuffer = new PassThrough({
      objectMode: true,
      highWaterMark: hwm
    });
    this.channels[next] = { channel, buffer: writeBuffer };
    writeBuffer.on("drain", function() {
      channel.onBufferDrain();
    });
    this.muxer.pipeFrom(writeBuffer);
    return next;
  };
  C.releaseChannel = function(channel) {
    this.freeChannels.clear(channel);
    var buffer = this.channels[channel].buffer;
    buffer.end();
    this.channels[channel] = null;
  };
  C.acceptLoop = function() {
    var self2 = this;
    function go() {
      try {
        var f;
        while (f = self2.recvFrame())
          self2.accept(f);
      } catch (e) {
        self2.emit("frameError", e);
      }
    }
    self2.stream.on("readable", go);
    go();
  };
  C.step = function(cb) {
    var self2 = this;
    function recv() {
      var f;
      try {
        f = self2.recvFrame();
      } catch (e) {
        cb(e, null);
        return;
      }
      if (f)
        cb(null, f);
      else
        self2.stream.once("readable", recv);
    }
    recv();
  };
  C.checkSend = function() {
    var check = this.sentSinceLastCheck;
    this.sentSinceLastCheck = false;
    return check;
  };
  C.checkRecv = function() {
    var check = this.recvSinceLastCheck;
    this.recvSinceLastCheck = false;
    return check;
  };
  C.sendBytes = function(bytes) {
    this.sentSinceLastCheck = true;
    this.stream.write(bytes);
  };
  C.sendHeartbeat = function() {
    return this.sendBytes(frame.HEARTBEAT_BUF);
  };
  var encodeMethod = defs.encodeMethod;
  var encodeProperties = defs.encodeProperties;
  C.sendMethod = function(channel, Method, fields) {
    var frame2 = encodeMethod(Method, channel, fields);
    this.sentSinceLastCheck = true;
    var buffer = this.channels[channel].buffer;
    return buffer.write(frame2);
  };
  C.sendMessage = function(channel, Method, fields, Properties, props, content) {
    if (!Buffer.isBuffer(content))
      throw new TypeError("content is not a buffer");
    var mframe = encodeMethod(Method, channel, fields);
    var pframe = encodeProperties(Properties, channel, content.length, props);
    var buffer = this.channels[channel].buffer;
    this.sentSinceLastCheck = true;
    var methodHeaderLen = mframe.length + pframe.length;
    var bodyLen = content.length > 0 ? content.length + FRAME_OVERHEAD : 0;
    var allLen = methodHeaderLen + bodyLen;
    if (allLen < SINGLE_CHUNK_THRESHOLD) {
      var all = Buffer.allocUnsafe(allLen);
      var offset = mframe.copy(all, 0);
      offset += pframe.copy(all, offset);
      if (bodyLen > 0)
        makeBodyFrame(channel, content).copy(all, offset);
      return buffer.write(all);
    } else {
      if (methodHeaderLen < SINGLE_CHUNK_THRESHOLD) {
        var both = Buffer.allocUnsafe(methodHeaderLen);
        var offset = mframe.copy(both, 0);
        pframe.copy(both, offset);
        buffer.write(both);
      } else {
        buffer.write(mframe);
        buffer.write(pframe);
      }
      return this.sendContent(channel, content);
    }
  };
  var FRAME_OVERHEAD = defs.FRAME_OVERHEAD;
  var makeBodyFrame = frame.makeBodyFrame;
  C.sendContent = function(channel, body) {
    if (!Buffer.isBuffer(body)) {
      throw new TypeError(fmt("Expected buffer; got %s", body));
    }
    var writeResult = true;
    var buffer = this.channels[channel].buffer;
    var maxBody = this.frameMax - FRAME_OVERHEAD;
    for (var offset = 0;offset < body.length; offset += maxBody) {
      var end = offset + maxBody;
      var slice = end > body.length ? body.slice(offset) : body.slice(offset, end);
      var bodyFrame = makeBodyFrame(channel, slice);
      writeResult = buffer.write(bodyFrame);
    }
    this.sentSinceLastCheck = true;
    return writeResult;
  };
  var parseFrame = frame.parseFrame;
  var decodeFrame = frame.decodeFrame;
  C.recvFrame = function() {
    var frame2 = parseFrame(this.rest, this.frameMax);
    if (!frame2) {
      var incoming = this.stream.read();
      if (incoming === null) {
        return false;
      } else {
        this.recvSinceLastCheck = true;
        this.rest = Buffer.concat([this.rest, incoming]);
        return this.recvFrame();
      }
    } else {
      this.rest = frame2.rest;
      return decodeFrame(frame2);
    }
  };
  exports.Connection = Connection;
  exports.isFatalError = isFatalError;
});

// node_modules/amqplib/lib/credentials.js
var require_credentials = __commonJS((exports, module) => {
  var codec = require_codec();
  exports.plain = function(user, passwd) {
    return {
      mechanism: "PLAIN",
      response: function() {
        return Buffer.from(["", user, passwd].join(String.fromCharCode(0)));
      },
      username: user,
      password: passwd
    };
  };
  exports.amqplain = function(user, passwd) {
    return {
      mechanism: "AMQPLAIN",
      response: function() {
        const buffer = Buffer.alloc(16384);
        const size = codec.encodeTable(buffer, { LOGIN: user, PASSWORD: passwd }, 0);
        return buffer.slice(4, size);
      },
      username: user,
      password: passwd
    };
  };
  exports.external = function() {
    return {
      mechanism: "EXTERNAL",
      response: function() {
        return Buffer.from("");
      }
    };
  };
});

// node_modules/amqplib/package.json
var require_package = __commonJS((exports, module) => {
  module.exports = {
    name: "amqplib",
    homepage: "http://amqp-node.github.io/amqplib/",
    main: "./channel_api.js",
    version: "0.10.3",
    description: "An AMQP 0-9-1 (e.g., RabbitMQ) library and client.",
    repository: {
      type: "git",
      url: "https://github.com/amqp-node/amqplib.git"
    },
    engines: {
      node: ">=10"
    },
    dependencies: {
      "@acuminous/bitsyntax": "^0.1.2",
      "buffer-more-ints": "~1.0.0",
      "readable-stream": "1.x >=1.1.9",
      "url-parse": "~1.5.10"
    },
    devDependencies: {
      claire: "0.4.1",
      mocha: "^9.2.2",
      nyc: "^15.1.0",
      "uglify-js": "2.8.x"
    },
    scripts: {
      test: "make test",
      prepare: "make"
    },
    keywords: [
      "AMQP",
      "AMQP 0-9-1",
      "RabbitMQ"
    ],
    author: "Michael Bridgen <mikeb@squaremobius.net>",
    license: "MIT"
  };
});

// node_modules/amqplib/lib/connect.js
var require_connect = __commonJS((exports, module) => {
  var copyInto = function(obj, target) {
    var keys = Object.keys(obj);
    var i = keys.length;
    while (i--) {
      var k = keys[i];
      target[k] = obj[k];
    }
    return target;
  };
  var clone = function(obj) {
    return copyInto(obj, {});
  };
  var openFrames = function(vhost, query, credentials2, extraClientProperties) {
    if (!vhost)
      vhost = "/";
    else
      vhost = QS.unescape(vhost);
    var query = query || {};
    function intOrDefault(val, def) {
      return val === undefined ? def : parseInt(val);
    }
    var clientProperties = Object.create(CLIENT_PROPERTIES);
    return {
      clientProperties: copyInto(extraClientProperties, clientProperties),
      mechanism: credentials2.mechanism,
      response: credentials2.response(),
      locale: query.locale || "en_US",
      channelMax: intOrDefault(query.channelMax, 0),
      frameMax: intOrDefault(query.frameMax, 4096),
      heartbeat: intOrDefault(query.heartbeat, 0),
      virtualHost: vhost,
      capabilities: "",
      insist: 0
    };
  };
  var credentialsFromUrl = function(parts) {
    var user = "guest", passwd = "guest";
    if (parts.username != "" || parts.password != "") {
      user = parts.username ? unescape(parts.username) : "";
      passwd = parts.password ? unescape(parts.password) : "";
    }
    return credentials.plain(user, passwd);
  };
  var connect = function(url, socketOptions, openCallback) {
    var sockopts = clone(socketOptions || {});
    url = url || "amqp://localhost";
    var noDelay = !!sockopts.noDelay;
    var timeout = sockopts.timeout;
    var keepAlive = !!sockopts.keepAlive;
    var keepAliveDelay = sockopts.keepAliveDelay || 0;
    var extraClientProperties = sockopts.clientProperties || {};
    var protocol, fields;
    if (typeof url === "object") {
      protocol = (url.protocol || "amqp") + ":";
      sockopts.host = url.hostname;
      sockopts.servername = sockopts.servername || url.hostname;
      sockopts.port = url.port || (protocol === "amqp:" ? 5672 : 5671);
      var user, pass;
      if (url.username == undefined && url.password == undefined) {
        user = "guest";
        pass = "guest";
      } else {
        user = url.username || "";
        pass = url.password || "";
      }
      var config = {
        locale: url.locale,
        channelMax: url.channelMax,
        frameMax: url.frameMax,
        heartbeat: url.heartbeat
      };
      fields = openFrames(url.vhost, config, sockopts.credentials || credentials.plain(user, pass), extraClientProperties);
    } else {
      var parts = URL(url, true);
      protocol = parts.protocol;
      sockopts.host = parts.hostname;
      sockopts.servername = sockopts.servername || parts.hostname;
      sockopts.port = parseInt(parts.port) || (protocol === "amqp:" ? 5672 : 5671);
      var vhost = parts.pathname ? parts.pathname.substr(1) : null;
      fields = openFrames(vhost, parts.query, sockopts.credentials || credentialsFromUrl(parts), extraClientProperties);
    }
    var sockok = false;
    var sock;
    function onConnect() {
      sockok = true;
      sock.setNoDelay(noDelay);
      if (keepAlive)
        sock.setKeepAlive(keepAlive, keepAliveDelay);
      var c = new Connection(sock);
      c.open(fields, function(err, ok) {
        if (timeout)
          sock.setTimeout(0);
        if (err === null) {
          openCallback(null, c);
        } else {
          sock.end();
          sock.destroy();
          openCallback(err);
        }
      });
    }
    if (protocol === "amqp:") {
      sock = import.meta.require("node:net").connect(sockopts, onConnect);
    } else if (protocol === "amqps:") {
      sock = import.meta.require("node:tls").connect(sockopts, onConnect);
    } else {
      throw new Error("Expected amqp: or amqps: as the protocol; got " + protocol);
    }
    if (timeout) {
      sock.setTimeout(timeout, function() {
        sock.end();
        sock.destroy();
        openCallback(new Error("connect ETIMEDOUT"));
      });
    }
    sock.once("error", function(err) {
      if (!sockok)
        openCallback(err);
    });
  };
  var URL = require_url_parse();
  var QS = import.meta.require("node:querystring");
  var Connection = require_connection().Connection;
  var fmt = import.meta.require("node:util").format;
  var credentials = require_credentials();
  var CLIENT_PROPERTIES = {
    product: "amqplib",
    version: require_package().version,
    platform: fmt("Node.JS %s", process.version),
    information: "http://squaremo.github.io/amqp.node",
    capabilities: {
      publisher_confirms: true,
      exchange_exchange_bindings: true,
      "basic.nack": true,
      consumer_cancel_notify: true,
      "connection.blocked": true,
      authentication_failure_close: true
    }
  };
  exports.connect = connect;
  exports.credentialsFromUrl = credentialsFromUrl;
});

// node_modules/amqplib/lib/channel.js
var require_channel = __commonJS((exports, module) => {
  var Channel = function(connection) {
    EventEmitter.call(this);
    this.connection = connection;
    this.reply = null;
    this.pending = [];
    this.lwm = 1;
    this.unconfirmed = [];
    this.on("ack", this.handleConfirm.bind(this, function(cb) {
      if (cb)
        cb(null);
    }));
    this.on("nack", this.handleConfirm.bind(this, function(cb) {
      if (cb)
        cb(new Error("message nacked"));
    }));
    this.on("close", function() {
      var cb;
      while (cb = this.unconfirmed.shift()) {
        if (cb)
          cb(new Error("channel closed"));
      }
    });
    this.handleMessage = acceptDeliveryOrReturn;
  };
  var invalidOp = function(msg, stack) {
    return function() {
      throw new IllegalOperationError(msg, stack);
    };
  };
  var invalidateSend = function(ch, msg, stack) {
    ch.sendImmediately = ch.sendOrEnqueue = ch.sendMessage = invalidOp(msg, stack);
  };
  var acceptDeliveryOrReturn = function(f) {
    var event;
    if (f.id === defs.BasicDeliver)
      event = "delivery";
    else if (f.id === defs.BasicReturn)
      event = "return";
    else
      throw fmt("Expected BasicDeliver or BasicReturn; got %s", inspect(f));
    var self2 = this;
    var fields = f.fields;
    return acceptMessage(function(message) {
      message.fields = fields;
      self2.emit(event, message);
    });
  };
  var acceptMessage = function(continuation) {
    var totalSize = 0, remaining = 0;
    var buffers = null;
    var message = {
      fields: null,
      properties: null,
      content: null
    };
    return headers;
    function headers(f) {
      if (f.id === defs.BasicProperties) {
        message.properties = f.fields;
        totalSize = remaining = f.size;
        if (totalSize === 0) {
          message.content = Buffer.alloc(0);
          continuation(message);
          return acceptDeliveryOrReturn;
        } else {
          return content;
        }
      } else {
        throw "Expected headers frame after delivery";
      }
    }
    function content(f) {
      if (f.content) {
        var size = f.content.length;
        remaining -= size;
        if (remaining === 0) {
          if (buffers !== null) {
            buffers.push(f.content);
            message.content = Buffer.concat(buffers);
          } else {
            message.content = f.content;
          }
          continuation(message);
          return acceptDeliveryOrReturn;
        } else if (remaining < 0) {
          throw fmt("Too much content sent! Expected %d bytes", totalSize);
        } else {
          if (buffers !== null)
            buffers.push(f.content);
          else
            buffers = [f.content];
          return content;
        }
      } else
        throw "Expected content frame after headers";
    }
  };
  var BaseChannel = function(connection) {
    Channel.call(this, connection);
    this.consumers = new Map;
  };
  var defs = require_defs();
  var closeMsg = require_format().closeMessage;
  var inspect = require_format().inspect;
  var methodName = require_format().methodName;
  var assert = import.meta.require("node:assert");
  var inherits = import.meta.require("node:util").inherits;
  var EventEmitter = import.meta.require("node:events").EventEmitter;
  var fmt = import.meta.require("node:util").format;
  var IllegalOperationError = require_error().IllegalOperationError;
  var stackCapture = require_error().stackCapture;
  inherits(Channel, EventEmitter);
  exports.Channel = Channel;
  exports.acceptMessage = acceptMessage;
  var C = Channel.prototype;
  C.allocate = function() {
    this.ch = this.connection.freshChannel(this);
    return this;
  };
  C.sendImmediately = function(method, fields) {
    return this.connection.sendMethod(this.ch, method, fields);
  };
  C.sendOrEnqueue = function(method, fields, reply) {
    if (!this.reply) {
      assert(this.pending.length === 0);
      this.reply = reply;
      this.sendImmediately(method, fields);
    } else {
      this.pending.push({
        method,
        fields,
        reply
      });
    }
  };
  C.sendMessage = function(fields, properties, content) {
    return this.connection.sendMessage(this.ch, defs.BasicPublish, fields, defs.BasicProperties, properties, content);
  };
  C._rpc = function(method, fields, expect, cb) {
    var self2 = this;
    function reply(err, f) {
      if (err === null) {
        if (f.id === expect) {
          return cb(null, f);
        } else {
          var expectedName = methodName(expect);
          var e = new Error(fmt("Expected %s; got %s", expectedName, inspect(f, false)));
          self2.closeWithError(f.id, fmt("Expected %s; got %s", expectedName, methodName(f.id)), defs.constants.UNEXPECTED_FRAME, e);
          return cb(e);
        }
      } else if (err instanceof Error)
        return cb(err);
      else {
        var closeReason = (err.fields.classId << 16) + err.fields.methodId;
        var e = method === closeReason ? fmt("Operation failed: %s; %s", methodName(method), closeMsg(err)) : fmt("Channel closed by server: %s", closeMsg(err));
        var closeFrameError = new Error(e);
        closeFrameError.code = err.fields.replyCode;
        closeFrameError.classId = err.fields.classId;
        closeFrameError.methodId = err.fields.methodId;
        return cb(closeFrameError);
      }
    }
    this.sendOrEnqueue(method, fields, reply);
  };
  C.toClosed = function(capturedStack) {
    this._rejectPending();
    invalidateSend(this, "Channel closed", capturedStack);
    this.accept = invalidOp("Channel closed", capturedStack);
    this.connection.releaseChannel(this.ch);
    this.emit("close");
  };
  C.toClosing = function(capturedStack, k) {
    var send = this.sendImmediately.bind(this);
    invalidateSend(this, "Channel closing", capturedStack);
    this.accept = function(f) {
      if (f.id === defs.ChannelCloseOk) {
        if (k)
          k();
        var s2 = stackCapture("ChannelCloseOk frame received");
        this.toClosed(s2);
      } else if (f.id === defs.ChannelClose) {
        send(defs.ChannelCloseOk, {});
      }
    };
  };
  C._rejectPending = function() {
    function rej(r2) {
      r2(new Error("Channel ended, no reply will be forthcoming"));
    }
    if (this.reply !== null)
      rej(this.reply);
    this.reply = null;
    var discard;
    while (discard = this.pending.shift())
      rej(discard.reply);
    this.pending = null;
  };
  C.closeBecause = function(reason, code, k) {
    this.sendImmediately(defs.ChannelClose, {
      replyText: reason,
      replyCode: code,
      methodId: 0,
      classId: 0
    });
    var s2 = stackCapture("closeBecause called: " + reason);
    this.toClosing(s2, k);
  };
  C.closeWithError = function(id, reason, code, error) {
    var self2 = this;
    this.closeBecause(reason, code, function() {
      error.code = code;
      if (id) {
        error.classId = defs.info(id).classId;
        error.methodId = defs.info(id).methodId;
      }
      self2.emit("error", error);
    });
  };
  C.acceptMessageFrame = function(f) {
    try {
      this.handleMessage = this.handleMessage(f);
    } catch (msg) {
      if (typeof msg === "string") {
        this.closeWithError(f.id, msg, defs.constants.UNEXPECTED_FRAME, new Error(msg));
      } else if (msg instanceof Error) {
        this.closeWithError(f.id, "Error while processing message", defs.constants.INTERNAL_ERROR, msg);
      } else {
        this.closeWithError(f.id, "Internal error while processing message", defs.constants.INTERNAL_ERROR, new Error(msg.toString()));
      }
    }
  };
  C.handleConfirm = function(handle, f) {
    var tag = f.deliveryTag;
    var multi = f.multiple;
    if (multi) {
      var confirmed = this.unconfirmed.splice(0, tag - this.lwm + 1);
      this.lwm = tag + 1;
      confirmed.forEach(handle);
    } else {
      var c;
      if (tag === this.lwm) {
        c = this.unconfirmed.shift();
        this.lwm++;
        while (this.unconfirmed[0] === null) {
          this.unconfirmed.shift();
          this.lwm++;
        }
      } else {
        c = this.unconfirmed[tag - this.lwm];
        this.unconfirmed[tag - this.lwm] = null;
      }
      handle(c);
    }
  };
  C.pushConfirmCallback = function(cb) {
    this.unconfirmed.push(cb || false);
  };
  C.accept = function(f) {
    switch (f.id) {
      case undefined:
      case defs.BasicDeliver:
      case defs.BasicReturn:
      case defs.BasicProperties:
        return this.acceptMessageFrame(f);
      case defs.BasicAck:
        return this.emit("ack", f.fields);
      case defs.BasicNack:
        return this.emit("nack", f.fields);
      case defs.BasicCancel:
        return this.emit("cancel", f.fields);
      case defs.ChannelClose:
        if (this.reply) {
          var reply = this.reply;
          this.reply = null;
          reply(f);
        }
        var emsg = "Channel closed by server: " + closeMsg(f);
        this.sendImmediately(defs.ChannelCloseOk, {});
        var error = new Error(emsg);
        error.code = f.fields.replyCode;
        error.classId = f.fields.classId;
        error.methodId = f.fields.methodId;
        this.emit("error", error);
        var s2 = stackCapture(emsg);
        this.toClosed(s2);
        return;
      case defs.BasicFlow:
        return this.closeWithError(f.id, "Flow not implemented", defs.constants.NOT_IMPLEMENTED, new Error("Flow not implemented"));
      default:
        var reply = this.reply;
        this.reply = null;
        if (this.pending.length > 0) {
          var send = this.pending.shift();
          this.reply = send.reply;
          this.sendImmediately(send.method, send.fields);
        }
        return reply(null, f);
    }
  };
  C.onBufferDrain = function() {
    this.emit("drain");
  };
  inherits(BaseChannel, Channel);
  exports.BaseChannel = BaseChannel;
  BaseChannel.prototype.registerConsumer = function(tag, callback) {
    this.consumers.set(tag, callback);
  };
  BaseChannel.prototype.unregisterConsumer = function(tag) {
    this.consumers.delete(tag);
  };
  BaseChannel.prototype.dispatchMessage = function(fields, message) {
    var consumerTag = fields.consumerTag;
    var consumer = this.consumers.get(consumerTag);
    if (consumer) {
      return consumer(message);
    } else {
      throw new Error("Unknown consumer: " + consumerTag);
    }
  };
  BaseChannel.prototype.handleDelivery = function(message) {
    return this.dispatchMessage(message.fields, message);
  };
  BaseChannel.prototype.handleCancel = function(fields) {
    var result = this.dispatchMessage(fields, null);
    this.unregisterConsumer(fields.consumerTag);
    return result;
  };
});

// node_modules/amqplib/lib/api_args.js
var require_api_args = __commonJS((exports, module) => {
  var setIfDefined = function(obj, prop, value) {
    if (value != null)
      obj[prop] = value;
  };
  var EMPTY_OPTIONS = Object.freeze({});
  var Args = {};
  Args.assertQueue = function(queue, options) {
    queue = queue || "";
    options = options || EMPTY_OPTIONS;
    var argt = Object.create(options.arguments || null);
    setIfDefined(argt, "x-expires", options.expires);
    setIfDefined(argt, "x-message-ttl", options.messageTtl);
    setIfDefined(argt, "x-dead-letter-exchange", options.deadLetterExchange);
    setIfDefined(argt, "x-dead-letter-routing-key", options.deadLetterRoutingKey);
    setIfDefined(argt, "x-max-length", options.maxLength);
    setIfDefined(argt, "x-max-priority", options.maxPriority);
    setIfDefined(argt, "x-overflow", options.overflow);
    setIfDefined(argt, "x-queue-mode", options.queueMode);
    return {
      queue,
      exclusive: !!options.exclusive,
      durable: options.durable === undefined ? true : options.durable,
      autoDelete: !!options.autoDelete,
      arguments: argt,
      passive: false,
      ticket: 0,
      nowait: false
    };
  };
  Args.checkQueue = function(queue) {
    return {
      queue,
      passive: true,
      nowait: false,
      durable: true,
      autoDelete: false,
      exclusive: false,
      ticket: 0
    };
  };
  Args.deleteQueue = function(queue, options) {
    options = options || EMPTY_OPTIONS;
    return {
      queue,
      ifUnused: !!options.ifUnused,
      ifEmpty: !!options.ifEmpty,
      ticket: 0,
      nowait: false
    };
  };
  Args.purgeQueue = function(queue) {
    return {
      queue,
      ticket: 0,
      nowait: false
    };
  };
  Args.bindQueue = function(queue, source, pattern, argt) {
    return {
      queue,
      exchange: source,
      routingKey: pattern,
      arguments: argt,
      ticket: 0,
      nowait: false
    };
  };
  Args.unbindQueue = function(queue, source, pattern, argt) {
    return {
      queue,
      exchange: source,
      routingKey: pattern,
      arguments: argt,
      ticket: 0,
      nowait: false
    };
  };
  Args.assertExchange = function(exchange, type, options) {
    options = options || EMPTY_OPTIONS;
    var argt = Object.create(options.arguments || null);
    setIfDefined(argt, "alternate-exchange", options.alternateExchange);
    return {
      exchange,
      ticket: 0,
      type,
      passive: false,
      durable: options.durable === undefined ? true : options.durable,
      autoDelete: !!options.autoDelete,
      internal: !!options.internal,
      nowait: false,
      arguments: argt
    };
  };
  Args.checkExchange = function(exchange) {
    return {
      exchange,
      passive: true,
      nowait: false,
      durable: true,
      internal: false,
      type: "",
      autoDelete: false,
      ticket: 0
    };
  };
  Args.deleteExchange = function(exchange, options) {
    options = options || EMPTY_OPTIONS;
    return {
      exchange,
      ifUnused: !!options.ifUnused,
      ticket: 0,
      nowait: false
    };
  };
  Args.bindExchange = function(dest, source, pattern, argt) {
    return {
      source,
      destination: dest,
      routingKey: pattern,
      arguments: argt,
      ticket: 0,
      nowait: false
    };
  };
  Args.unbindExchange = function(dest, source, pattern, argt) {
    return {
      source,
      destination: dest,
      routingKey: pattern,
      arguments: argt,
      ticket: 0,
      nowait: false
    };
  };
  Args.publish = function(exchange, routingKey, options) {
    options = options || EMPTY_OPTIONS;
    function convertCC(cc) {
      if (cc === undefined) {
        return;
      } else if (Array.isArray(cc)) {
        return cc.map(String);
      } else
        return [String(cc)];
    }
    var headers = Object.create(options.headers || null);
    setIfDefined(headers, "CC", convertCC(options.CC));
    setIfDefined(headers, "BCC", convertCC(options.BCC));
    var deliveryMode;
    if (options.persistent !== undefined)
      deliveryMode = options.persistent ? 2 : 1;
    else if (typeof options.deliveryMode === "number")
      deliveryMode = options.deliveryMode;
    else if (options.deliveryMode)
      deliveryMode = 2;
    var expiration = options.expiration;
    if (expiration !== undefined)
      expiration = expiration.toString();
    return {
      exchange,
      routingKey,
      mandatory: !!options.mandatory,
      immediate: false,
      ticket: undefined,
      contentType: options.contentType,
      contentEncoding: options.contentEncoding,
      headers,
      deliveryMode,
      priority: options.priority,
      correlationId: options.correlationId,
      replyTo: options.replyTo,
      expiration,
      messageId: options.messageId,
      timestamp: options.timestamp,
      type: options.type,
      userId: options.userId,
      appId: options.appId,
      clusterId: undefined
    };
  };
  Args.consume = function(queue, options) {
    options = options || EMPTY_OPTIONS;
    var argt = Object.create(options.arguments || null);
    setIfDefined(argt, "x-priority", options.priority);
    return {
      ticket: 0,
      queue,
      consumerTag: options.consumerTag || "",
      noLocal: !!options.noLocal,
      noAck: !!options.noAck,
      exclusive: !!options.exclusive,
      nowait: false,
      arguments: argt
    };
  };
  Args.cancel = function(consumerTag) {
    return {
      consumerTag,
      nowait: false
    };
  };
  Args.get = function(queue, options) {
    options = options || EMPTY_OPTIONS;
    return {
      ticket: 0,
      queue,
      noAck: !!options.noAck
    };
  };
  Args.ack = function(tag, allUpTo) {
    return {
      deliveryTag: tag,
      multiple: !!allUpTo
    };
  };
  Args.nack = function(tag, allUpTo, requeue) {
    return {
      deliveryTag: tag,
      multiple: !!allUpTo,
      requeue: requeue === undefined ? true : requeue
    };
  };
  Args.reject = function(tag, requeue) {
    return {
      deliveryTag: tag,
      requeue: requeue === undefined ? true : requeue
    };
  };
  Args.prefetch = function(count, global2) {
    return {
      prefetchCount: count || 0,
      prefetchSize: 0,
      global: !!global2
    };
  };
  Args.recover = function() {
    return { requeue: true };
  };
  module.exports = Object.freeze(Args);
});

// node_modules/amqplib/lib/channel_model.js
var require_channel_model = __commonJS((exports, module) => {
  var EventEmitter = import.meta.require("node:events");
  var promisify = import.meta.require("node:util").promisify;
  var defs = require_defs();
  var { BaseChannel } = require_channel();
  var { acceptMessage } = require_channel();
  var Args = require_api_args();
  var { inspect } = require_format();

  class ChannelModel extends EventEmitter {
    constructor(connection) {
      super();
      this.connection = connection;
      ["error", "close", "blocked", "unblocked"].forEach((ev) => {
        connection.on(ev, this.emit.bind(this, ev));
      });
    }
    close() {
      return promisify(this.connection.close.bind(this.connection))();
    }
    async createChannel() {
      const channel = new Channel(this.connection);
      await channel.open();
      return channel;
    }
    async createConfirmChannel() {
      const channel = new ConfirmChannel(this.connection);
      await channel.open();
      await channel.rpc(defs.ConfirmSelect, { nowait: false }, defs.ConfirmSelectOk);
      return channel;
    }
  }

  class Channel extends BaseChannel {
    constructor(connection) {
      super(connection);
      this.on("delivery", this.handleDelivery.bind(this));
      this.on("cancel", this.handleCancel.bind(this));
    }
    async rpc(method, fields, expect) {
      const f = await promisify((cb) => {
        return this._rpc(method, fields, expect, cb);
      })();
      return f.fields;
    }
    async open() {
      const ch = await this.allocate.bind(this)();
      return ch.rpc(defs.ChannelOpen, { outOfBand: "" }, defs.ChannelOpenOk);
    }
    close() {
      return promisify((cb) => {
        return this.closeBecause("Goodbye", defs.constants.REPLY_SUCCESS, cb);
      })();
    }
    assertQueue(queue, options) {
      return this.rpc(defs.QueueDeclare, Args.assertQueue(queue, options), defs.QueueDeclareOk);
    }
    checkQueue(queue) {
      return this.rpc(defs.QueueDeclare, Args.checkQueue(queue), defs.QueueDeclareOk);
    }
    deleteQueue(queue, options) {
      return this.rpc(defs.QueueDelete, Args.deleteQueue(queue, options), defs.QueueDeleteOk);
    }
    purgeQueue(queue) {
      return this.rpc(defs.QueuePurge, Args.purgeQueue(queue), defs.QueuePurgeOk);
    }
    bindQueue(queue, source, pattern, argt) {
      return this.rpc(defs.QueueBind, Args.bindQueue(queue, source, pattern, argt), defs.QueueBindOk);
    }
    unbindQueue(queue, source, pattern, argt) {
      return this.rpc(defs.QueueUnbind, Args.unbindQueue(queue, source, pattern, argt), defs.QueueUnbindOk);
    }
    assertExchange(exchange, type, options) {
      return this.rpc(defs.ExchangeDeclare, Args.assertExchange(exchange, type, options), defs.ExchangeDeclareOk).then((_ok) => {
        return { exchange };
      });
    }
    checkExchange(exchange) {
      return this.rpc(defs.ExchangeDeclare, Args.checkExchange(exchange), defs.ExchangeDeclareOk);
    }
    deleteExchange(name, options) {
      return this.rpc(defs.ExchangeDelete, Args.deleteExchange(name, options), defs.ExchangeDeleteOk);
    }
    bindExchange(dest, source, pattern, argt) {
      return this.rpc(defs.ExchangeBind, Args.bindExchange(dest, source, pattern, argt), defs.ExchangeBindOk);
    }
    unbindExchange(dest, source, pattern, argt) {
      return this.rpc(defs.ExchangeUnbind, Args.unbindExchange(dest, source, pattern, argt), defs.ExchangeUnbindOk);
    }
    publish(exchange, routingKey, content, options) {
      const fieldsAndProps = Args.publish(exchange, routingKey, options);
      return this.sendMessage(fieldsAndProps, fieldsAndProps, content);
    }
    sendToQueue(queue, content, options) {
      return this.publish("", queue, content, options);
    }
    consume(queue, callback, options) {
      const fields = Args.consume(queue, options);
      return new Promise((resolve, reject) => {
        this._rpc(defs.BasicConsume, fields, defs.BasicConsumeOk, (err, ok) => {
          if (err)
            return reject(err);
          this.registerConsumer(ok.fields.consumerTag, callback);
          resolve(ok.fields);
        });
      });
    }
    async cancel(consumerTag) {
      const ok = await promisify((cb) => {
        this._rpc(defs.BasicCancel, Args.cancel(consumerTag), defs.BasicCancelOk, cb);
      })().then((ok2) => {
        this.unregisterConsumer(consumerTag);
        return ok2.fields;
      });
    }
    get(queue, options) {
      const fields = Args.get(queue, options);
      return new Promise((resolve, reject) => {
        this.sendOrEnqueue(defs.BasicGet, fields, (err, f) => {
          if (err)
            return reject(err);
          if (f.id === defs.BasicGetEmpty) {
            return resolve(false);
          } else if (f.id === defs.BasicGetOk) {
            const fields2 = f.fields;
            this.handleMessage = acceptMessage((m) => {
              m.fields = fields2;
              resolve(m);
            });
          } else {
            reject(new Error(`Unexpected response to BasicGet: ${inspect(f)}`));
          }
        });
      });
    }
    ack(message, allUpTo) {
      this.sendImmediately(defs.BasicAck, Args.ack(message.fields.deliveryTag, allUpTo));
    }
    ackAll() {
      this.sendImmediately(defs.BasicAck, Args.ack(0, true));
    }
    nack(message, allUpTo, requeue) {
      this.sendImmediately(defs.BasicNack, Args.nack(message.fields.deliveryTag, allUpTo, requeue));
    }
    nackAll(requeue) {
      this.sendImmediately(defs.BasicNack, Args.nack(0, true, requeue));
    }
    reject(message, requeue) {
      this.sendImmediately(defs.BasicReject, Args.reject(message.fields.deliveryTag, requeue));
    }
    recover() {
      return this.rpc(defs.BasicRecover, Args.recover(), defs.BasicRecoverOk);
    }
    qos(count, global2) {
      return this.rpc(defs.BasicQos, Args.prefetch(count, global2), defs.BasicQosOk);
    }
  }
  Channel.prototype.prefetch = Channel.prototype.qos;

  class ConfirmChannel extends Channel {
    publish(exchange, routingKey, content, options, cb) {
      this.pushConfirmCallback(cb);
      return Channel.prototype.publish.call(this, exchange, routingKey, content, options);
    }
    sendToQueue(queue, content, options, cb) {
      return this.publish("", queue, content, options, cb);
    }
    waitForConfirms() {
      const awaiting = [];
      const unconfirmed = this.unconfirmed;
      unconfirmed.forEach((val, index) => {
        if (val !== null) {
          const confirmed = new Promise((resolve, reject) => {
            unconfirmed[index] = (err) => {
              if (val)
                val(err);
              if (err === null)
                resolve();
              else
                reject(err);
            };
          });
          awaiting.push(confirmed);
        }
      });
      if (!this.pending) {
        var cb;
        while (cb = this.unconfirmed.shift()) {
          if (cb)
            cb(new Error("channel closed"));
        }
      }
      return Promise.all(awaiting);
    }
  }
  exports.ConfirmChannel = ConfirmChannel;
  exports.Channel = Channel;
  exports.ChannelModel = ChannelModel;
});

// node_modules/amqplib/channel_api.js
var require_channel_api = __commonJS((exports, module) => {
  var connect = function(url, connOptions) {
    return promisify(function(cb) {
      return raw_connect(url, connOptions, cb);
    })().then(function(conn) {
      return new ChannelModel(conn);
    });
  };
  var raw_connect = require_connect().connect;
  var ChannelModel = require_channel_model().ChannelModel;
  var promisify = import.meta.require("node:util").promisify;
  exports.connect = connect;
  exports.credentials = require_credentials();
  exports.IllegalOperationError = require_error().IllegalOperationError;
});

// index.ts
var import_amqplib = __toESM(require_channel_api(), 1);
try {
  const queueName = "teaching-action.moodle.alerts.bunsh";
  const connection = await import_amqplib.default.connect({
    protocol: "amqp",
    hostname: "35.222.192.45",
    port: 5672,
    username: "team-accion-docente-beta",
    password: "sj&53#hjsGH@",
    vhost: "beta"
  });
  connection.on("error", (err) => {
    console.log("Error de conexion: ", err);
  });
  const channel = await connection.createConfirmChannel();
  channel.on("error", (err) => {
    console.log("Channel error: ", err);
  });
  await channel.assertQueue(queueName, { exclusive: false });
  await channel.assertExchange("sagittarius-a", "fanout", { durable: true });
  await channel.bindQueue(queueName, "sagittarius-a", "sagittarius-a");
  channel.consume(queueName, async (message) => {
    console.error("message", message?.content.toString());
  });
  console.log(`Esperando mensajes en la cola ${queueName}. Para salir, presiona Ctrl+C`);
} catch (error) {
  console.error(error);
}
