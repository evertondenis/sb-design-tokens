"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCSSVariables = void 0;

var cssKeyToJsKey = function cssKeyToJsKey(key) {
  return key.replace('--', '').replace(/-./g, function (x) {
    return x.toUpperCase()[1];
  });
};

var getAllCSSVariableNames = function getAllCSSVariableNames(styleSheets) {
  var cssVars = [];
  Array.from(styleSheets).forEach(function (styleSheet) {
    return Array.from(styleSheet.cssRules).forEach(function (rule) {
      if (!rule || !rule['style']) {
        return;
      }

      Array.from(rule['style']).forEach(function (style) {
        if (style.startsWith('--') && cssVars.indexOf(style) == -1) {
          cssVars.push(style);
        }
      });
    });
  });
  return cssVars;
};

var getType = function getType(value) {
  if (CSS.supports('color', value)) {
    return 'color';
  }

  return 'text';
};

var getElementCSSVariables = function getElementCSSVariables(allCSSVars, element) {
  var pseudo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var elStyles = window.getComputedStyle(element, pseudo);
  var cssVars = [];
  allCSSVars.forEach(function (key) {
    var value = elStyles.getPropertyValue(key);

    if (value) {
      cssVars.push({
        key: key,
        value: value.trim(),
        name: cssKeyToJsKey(key),
        type: getType(value)
      });
    }
  });
  return cssVars;
};

var getAllCSSVariables = function getAllCSSVariables(storyDocument) {
  var cssVars = getAllCSSVariableNames(storyDocument.styleSheets);
  return getElementCSSVariables(cssVars, storyDocument.documentElement);
};

exports.getAllCSSVariables = getAllCSSVariables;