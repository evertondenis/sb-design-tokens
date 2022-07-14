import React from 'react';

import { Text } from './Text';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Text',
  component: Text,
  //👇 Creates specific parameters for the story
  parameters: {
    myaddon: {
      data: 'this data is passed to the addon',
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <Text {...args} />;

export const Primary = Template.bind({});
