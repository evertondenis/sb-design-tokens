"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _react = _interopRequireWildcard(require("react"));

var _api = require("@storybook/api");

var _addons = require("@storybook/addons");

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _useReactPath = _interopRequireDefault(require("./useReactPath"));

var _useLocation2 = require("./use-location");

var _getAllCssVariables = require("./get-all-css-variables");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ADDON_ID = 'myaddon';
var PANEL_ID = "".concat(ADDON_ID, "/panel");

var setIframePreviewWhenReady = function setIframePreviewWhenReady(setIframePreview) {
  var iframePreview = document.getElementById('storybook-preview-iframe');

  if (!iframePreview) {
    setTimeout(function () {
      return setIframePreviewWhenReady(setIframePreview);
    }, 2000);
    return;
  }

  setIframePreview(iframePreview);
};

var getTokenValue = function getTokenValue(tokens, token) {
  var value = tokens.find(function (o, i) {
    // console.log(o);
    if (o.key === token) {
      // console.log('value: ', o.value)
      return true;
    }
  });
  return value;
};

var BoxColor = function BoxColor(_ref) {
  var color = _ref.color;
  var Color = (0, _react.useMemo)(function () {
    return _theming.styled.div(function () {
      return {
        background: color,
        borderRadius: 2,
        height: 20,
        width: 20,
        marginRight: 5
      };
    });
  }, [color]);
  return /*#__PURE__*/_react["default"].createElement(Color, null);
};

var MyPanel = function MyPanel() {
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      iframePreview = _useState2[0],
      setIframePreview = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      root = _useState4[0],
      setRoot = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      currentUrl = _useState6[0],
      setCurrentUrl = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      cssVars = _useState8[0],
      setCssVars = _useState8[1];

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      loading = _useState10[0],
      setLoading = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      tokens = _useState12[0],
      setTokens = _useState12[1];

  var _useLocation = (0, _useLocation2.useLocation)(),
      local = _useLocation.local;

  var localRef = local.href;
  setTimeout(function () {
    return setIframePreviewWhenReady(setIframePreview);
  }, 2000);
  (0, _react.useEffect)(function () {
    if (!iframePreview) return;
    var variables = (0, _getAllCssVariables.getAllCSSVariables)(iframePreview.contentWindow.document);
    var iframe = document.querySelector('iframe#storybook-preview-iframe');
    setCurrentUrl(localRef.substring(localRef.indexOf('story/') + 6));
    setRoot(iframe.contentWindow.document.querySelector('#root'));
    setCssVars(variables);
    setLoading(false);
  }, [iframePreview, localRef]);
  (0, _react.useEffect)(function () {
    if (typeof currentUrl === 'string') {
      // const compClass = currentUrl.replace(currentUrl.substring(0, currentUrl.indexOf("-")), "storybook");
      var iframe = document.querySelector('iframe#storybook-preview-iframe');
      var elemtClass = root.childNodes[0].className.split(" ").pop();
      var tag = iframe.contentWindow.document.querySelectorAll('[data-styled]');

      var stl = _toConsumableArray(tag).map(function (div) {
        return div.innerHTML;
      });

      var sani = JSON.stringify(stl);
      var middle = sani.slice(sani.indexOf(elemtClass), sani.lastIndexOf('}') + 1).match(/{([^}]+)}/)[1];
      var currenToken = middle.split(";").filter(function (s) {
        return s.includes('var');
      }).reduce(function (a, v) {
        var token = v.split(':')[1].match(/\(([^)]+)\)/)[1];

        var _getTokenValue = getTokenValue(cssVars, token),
            value = _getTokenValue.value,
            type = _getTokenValue.type;

        return [].concat(_toConsumableArray(a), [{
          property: v.split(':')[0],
          token: v.split(':')[1],
          value: value,
          type: type
        }]);
      }, []);
      setTokens(currenToken);
    }
  }, [currentUrl, root]);
  var Table = (0, _react.useMemo)(function () {
    return _theming.styled.table(function (_ref2) {
      var theme = _ref2.theme;
      return {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        minWidth: 700,
        tableLayout: 'fixed',
        textAlign: 'left',
        width: '100%',
        'thead > tr': {
          display: 'flex'
        },
        'tbody > tr': {
          borderTop: "1px solid #eeeeee",
          display: 'flex',
          ':first-of-type': {
            borderTopColor: '#aeaeae'
          },
          ':last-of-type': {
            borderBottom: '1px solid #aeaeae'
          }
        },
        'td, th': {
          border: 'none',
          textOverflow: 'ellipsis',
          verticalAlign: 'middle',
          ':nth-of-type(1)': {
            flexBasis: '25%',
            flexGrow: 1,
            flexShrink: 0
          },
          ':nth-of-type(2)': {
            flexBasis: '40%',
            flexGrow: 0,
            flexShrink: 0
          },
          ':nth-of-type(3)': {
            flexBasis: '35%',
            flexGrow: 0,
            flexShrink: 0
          }
        },
        th: {
          paddingBottom: 12,
          paddingTop: 15,
          paddingLeft: 5
        },
        td: {
          overflow: 'hidden',
          paddingBottom: 8,
          paddingTop: 8,
          alignItems: 'center',
          ':not(:last-of-type)': {
            paddingRight: 15
          },
          svg: {
            maxWidth: '100%',
            maxHeight: '100%'
          },
          span: {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            padding: '5px'
          }
        }
      };
    });
  }, []); // const value = useParameter(ADDON_ID, null);
  // const item = value ? value.data : 'No story parameter defined';

  if (tokens) console.log(tokens[0].value);
  return /*#__PURE__*/_react["default"].createElement(_components.ScrollArea, {
    vertical: true,
    horizontal: true
  }, loading && /*#__PURE__*/_react["default"].createElement("p", null, "Loading tokens..."), /*#__PURE__*/_react["default"].createElement(Table, null, /*#__PURE__*/_react["default"].createElement("thead", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("th", null, "Property"), /*#__PURE__*/_react["default"].createElement("th", null, "Token"), /*#__PURE__*/_react["default"].createElement("th", null, "Value"))), /*#__PURE__*/_react["default"].createElement("tbody", null, tokens && tokens.map(function (tk, index) {
    return /*#__PURE__*/_react["default"].createElement("tr", {
      key: index
    }, /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("span", null, tk.property)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("span", null, tk.token)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("span", null, tk.type === 'color' && /*#__PURE__*/_react["default"].createElement(BoxColor, {
      color: tk.value
    }), tk.value)));
  }))));
};

_addons.addons.register(ADDON_ID, function (api) {
  _addons.addons.add(PANEL_ID, {
    type: _addons.types.PANEL,
    title: 'Tokens',
    render: function render(_ref3) {
      var active = _ref3.active,
          key = _ref3.key;
      return /*#__PURE__*/_react["default"].createElement(_components.AddonPanel, {
        active: active,
        key: key
      }, /*#__PURE__*/_react["default"].createElement(MyPanel, null));
    }
  });
});