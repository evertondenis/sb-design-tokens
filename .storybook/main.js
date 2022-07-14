module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@bissolli/storybook-css-properties",
    "../src/preset.js" //👈 Our addon registered here
  ],
  "framework": "@storybook/react"
}