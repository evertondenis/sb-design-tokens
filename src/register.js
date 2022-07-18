import React, { useEffect, useMemo, useState } from 'react';

import { addons, types } from '@storybook/addons';
import { AddonPanel, ScrollArea } from '@storybook/components';
import { styled } from '@storybook/theming';

import { useLocation } from './use-location';

import { getAllCSSVariables } from "./get-all-css-variables";

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const setIframePreviewWhenReady = (setIframePreview) => {
  const iframePreview = document.getElementById('storybook-preview-iframe')

  if (!iframePreview) {
    setTimeout(() => setIframePreviewWhenReady(setIframePreview), 2000)
    return
  }

  setIframePreview(iframePreview)
}

const getTokenValue = (tokens, token) => {
  const value = tokens.find((o, i) => {
      if (o.key === token) {
          return true;
      }
  });
  return value;
}

const BoxColor = ({ color }) => {
  const Color = useMemo(
    () =>
      styled.div(() => ({
        background: color,
        borderRadius: 2,
        height: 20,
        width: 20,
        marginRight: 5,
        border: '1px solid #eeeeee'
      })),
    [color]
  );

  return <Color></Color>;
};

const MyPanel = () => {
  const [iframePreview, setIframePreview] = useState(null);
  const [root, setRoot] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [cssVars, setCssVars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState(null);

  const { local } = useLocation();
  const localRef = local.href;
  
  setTimeout(() => setIframePreviewWhenReady(setIframePreview), 2000);
  
  useEffect(() => {
    
    if (!iframePreview) return;

    const variables = getAllCSSVariables(iframePreview.contentWindow.document);
    const iframe = document.querySelector('iframe#storybook-preview-iframe');

    setCurrentUrl(localRef.substring(localRef.indexOf('story/') + 6));
    setRoot(iframe.contentWindow.document.querySelector('#root'));
    setCssVars(variables);
    setLoading(false);
  }, [iframePreview, localRef]);

  useEffect(() => {
    if (typeof currentUrl === 'string') {
      // const compClass = currentUrl.replace(currentUrl.substring(0, currentUrl.indexOf("-")), "storybook");
      const iframe = document.querySelector('iframe#storybook-preview-iframe');
      const elemtClass = root.childNodes[0].className.split(" ").pop();
      const tag = iframe.contentWindow.document.querySelectorAll('[data-styled]');
      const stl = [...tag].map(div => div.innerHTML);
      const sani = JSON.stringify(stl);

      const middle = sani.slice(
        sani.indexOf(elemtClass),
        sani.lastIndexOf('}') + 1,
      ).match(/{([^}]+)}/)[1];

      const currenToken = middle.split(";")
      .filter(s => s.includes('var'))
      .reduce((a, v) => {
        const token = v.split(':')[1].match(/\(([^)]+)\)/)[1];
        const {value, type} = getTokenValue(cssVars, token);
        return [...a, {property: v.split(':')[0], token: v.split(':')[1], value, type}];
    }, []);

      setTokens(currenToken);
    }
  }, [currentUrl, root])

  const Table = useMemo(
    () =>
      styled.table(({ theme }) => ({
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
          borderTop: `1px solid #eeeeee`,
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
          paddingLeft: 5,
          
          
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
      })),
    []
  );

  // const value = useParameter(ADDON_ID, null);
  // const item = value ? value.data : 'No story parameter defined';
  if (tokens)  console.log(tokens[0].value);
  return (
    <ScrollArea vertical horizontal>
      {loading && <p>Loading tokens...</p>}
      {tokens &&
        <Table>
          <thead >
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((tk, index) => (
              <tr key={index} >
                <td>
                  <span>
                    {tk.property}
                  </span>
                </td>
                <td>
                  <span>
                    {tk.token}
                  </span>
                </td>
                <td>
                  <span>
                    {tk.type === 'color' && <BoxColor color={tk.value}/>}
                    {tk.value}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      }
    </ScrollArea>
  );
};


addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Tokens',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <MyPanel />
      </AddonPanel>
    ),
  });
});