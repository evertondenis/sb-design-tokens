import React, { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

import { addons, types } from '@storybook/addons';
import { AddonPanel, Icons, ScrollArea, TooltipNote, WithTooltip } from '@storybook/components';
import { styled } from '@storybook/theming';

import { ClipboardButton, ToolButton, Input, Table, Container } from './components';
// import { ToolButton } from './components/ToolButton';
// import { Input } from './components/Input';
// import { Table } from './components/Table';
// import { Container } from './components/Container';
import { useLocation } from './use-location';

import { getAllCSSVariables } from "./get-all-css-variables";

const ADDON_ID = 'myaddon';
const PANEL_ID = `${ADDON_ID}/panel`;

const setIframePreviewWhenReady = (setIframePreview) => {
  const iframePreview = document.getElementById('storybook-preview-iframe');

  if (!iframePreview) {
    setTimeout(() => setIframePreviewWhenReady(setIframePreview), 1000);
    return;
  };

  flushSync(() => {
    setIframePreview(iframePreview);
  });
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
        height: 32,
        width: '100%',
        marginRight: 5,
        border: '1px solid #eeeeee'
      })),
    [color]
  );

  return <Color></Color>;
};

const Loader = ({ children }) => {
  const Loading = styled.p(() => ({
    fontSize: '1rem',
    padding: '0 1rem'
  }));

  return <Loading>{children}</Loading>;
};

const Panel = () => {
  const [iframePreview, setIframePreview] = useState(null);
  const [iframe, setIframe] = useState(null);
  const [root, setRoot] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [cssVars, setCssVars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState(null);

  const { local } = useLocation();
  const localRef = local.href;
  
  setTimeout(() => setIframePreviewWhenReady(setIframePreview), 1000);
  
  useEffect(() => {
    if (!iframePreview) return;

    const variables = getAllCSSVariables(iframePreview.contentWindow.document);
    const iframe = document.querySelector('iframe#storybook-preview-iframe');

    setCurrentUrl(localRef.substring(localRef.indexOf('story/') + 6));
    setIframe(iframe);
    setRoot(iframe.contentWindow.document.querySelector('#root'));
    setCssVars(variables);
    setLoading(false);

  }, [iframePreview, localRef]);

  useEffect(() => {
    setLoading(true);
    setTokens(null);

    if (typeof currentUrl === 'string') {

      // TODO Remove this setTimeout.
      setTimeout(() => { // Is necessary for react 18
      if (root.childNodes.length) {
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
          return [...a, {property: v.split(':')[0], token, value, type}];
        }, []);

        setTokens(currenToken);
        setLoading(false);
      };
    }, 500);
    }
  }, [currentUrl]);

  return (
    <ScrollArea vertical horizontal>
      {loading && <Container>Loading tokens...</Container>}
      
      {tokens && tokens.length ?
        <Table>
          <thead >
            <tr>
              <th>Property</th>
              <th>Token</th>
              <th>Value</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((tk, index) => (
              <tr key={index} >
                <td>
                  <span>
                    <strong>{tk.property}</strong>
                  </span>
                </td>
                <td>
                  <span>
                  {tk.token}
                  <WithTooltip
                    hasChrome={false}
                    tooltip={<TooltipNote note="Copy token" />}
                  >
                    <ClipboardButton
                      button={<ToolButton><Icons icon="copy" /></ToolButton>}
                      value={tk.token}
                      />
                  </WithTooltip>
                  </span>
                </td>
                <td>
                  <span>
                    <Input
                      readOnly
                      value={tk.type === 'color' ? tk.value.toUpperCase() : tk.value}
                    />
                  </span>
                </td>
                <td>
                  <span>
                    {tk.type === 'color' && <BoxColor color={tk.value}/>}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      : !loading && <Container>No tokens are being used in this component!</Container>}
    </ScrollArea>
  );
};


addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Tokens',
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Panel />
      </AddonPanel>
    ),
  });
});