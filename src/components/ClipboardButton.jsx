import React from 'react';
import useClipboard from "react-use-clipboard";

const ClipboardButton = ({ button, value }) => {
  const [_, setCopied] = useClipboard(value);

  return <span onClick={setCopied}>{button}</span>;
};

export default ClipboardButton;