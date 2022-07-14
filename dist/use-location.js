"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = notify;
exports.useLocation = useLocation;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    href: window.location.href,
    local: window.location
  };
}
/**
 * @type {Array<() => void>}
 */


var listeners = [];
/**
 * Notifies all location listeners. Can be used if the history state has been manipulated
 * in by another module. Effectifely, all components using the 'useLocation' hook will
 * update.
 */

function notify() {
  listeners.forEach(function (listener) {
    return listener();
  });
}

function useLocation() {
  var _useState = (0, _react.useState)(getCurrentLocation()),
      _useState2 = _slicedToArray(_useState, 2),
      _useState2$ = _useState2[0],
      pathname = _useState2$.pathname,
      search = _useState2$.search,
      href = _useState2$.href,
      local = _useState2$.local,
      setLocation = _useState2[1]; // console.log('#1: ', href);
  // console.log('#2: ', local.href);


  (0, _react.useEffect)(function () {
    window.addEventListener('popstate', handleChange);
    return function () {
      return window.removeEventListener('popstate', handleChange);
    };
  }, []);
  (0, _react.useEffect)(function () {
    listeners.push(handleChange);
    return function () {
      return listeners.splice(listeners.indexOf(handleChange), 1);
    };
  }, []);

  function handleChange() {
    setLocation(getCurrentLocation());
  }
  /**
   * @param {string} url
   */


  function push(url) {
    window.history.pushState(null, null, url);
    notify();
  }
  /**
   * @param {string} url
   */


  function replace(url) {
    window.history.replaceState(null, null, url);
    notify();
  }

  return {
    push: push,
    replace: replace,
    pathname: pathname,
    search: search,
    href: href,
    local: local
  };
}