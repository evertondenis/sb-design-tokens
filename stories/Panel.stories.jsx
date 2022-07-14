import React from 'react';

import { Panel } from './Panel';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Panel',
  component: Panel,
  //👇 Creates specific parameters for the story
  parameters: {
    myaddon: {
      data: 'this data is passed to the addon',
    },
  },
};

export const Default = (args) => <Panel {...args} />;
