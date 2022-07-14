const cssKeyToJsKey = (key) =>
key.replace('--', '').replace(/-./g, (x) => x.toUpperCase()[1]);

const getAllCSSVariableNames = (styleSheets) => {
  const cssVars = [];

  Array.from(styleSheets).forEach((styleSheet) => {
    return Array.from(styleSheet.cssRules).forEach((rule) => {
      if (!rule || !rule['style']) {
        return;
      }

      Array.from(rule['style']).forEach((style) => {
        if (style.startsWith('--') && cssVars.indexOf(style) == -1) {
          cssVars.push(style);
        }
      });
    });
  });

  return cssVars;
};

const getType = (value) => {
  if (CSS.supports('color',value) ) {
    return 'color'
  }

  return 'text'
}

const getElementCSSVariables = (
  allCSSVars,
  element,
  pseudo = ''
  ) => {
    const elStyles = window.getComputedStyle(element, pseudo);
    const cssVars = [];

    allCSSVars.forEach((key) => {
      const value = elStyles.getPropertyValue(key);

      if (value) {
        cssVars.push({
          key,
          value: value.trim(),
          name: cssKeyToJsKey(key),
          type: getType(value)
        })
      }
    });

    return cssVars;
  };


  export const getAllCSSVariables = (storyDocument) => {
    const cssVars = getAllCSSVariableNames(storyDocument.styleSheets);
    return getElementCSSVariables(cssVars, storyDocument.documentElement);
  };