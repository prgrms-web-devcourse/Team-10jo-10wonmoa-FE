import { css } from '@emotion/react';
import theme from './theme';
import animation from './animation';

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 16px;
    font: inherit;
    vertical-align: baseline;
    font-family: 'Noto Sans KR', sans-serif;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote {
    &:before,
    &:after {
      content: '';
      content: none;
    }
  }

  q {
    &:before,
    &:after {
      content: '';
      content: none;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // customized

  a {
    text-decoration: none;

    &,
    &:visited {
      color: inherit;
    }
  }

  body {
    width: 100vw;
    overflow-x: hidden;
    color: ${theme.$text_black};
  }

  svg,
  path {
    pointer-events: none;
  }

  // font - size

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    font-size: 16px;
  }

  h1 {
    font-size: 40px;
    font-weight: bold;
  }
  h2 {
    font-size: 32px;
    font-weight: bold;
  }
  h3 {
    font-size: 28px;
    font-weight: bold;
  }
  h4 {
    font-size: 24px;
    font-weight: bold;
  }
  label {
    font-size: 16px;
  }
  button {
    font-size: 16px;
  }

  address,
  em {
    font-style: normal;
  }

  a {
    color: inherit;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
  }

  button,
  input {
    -webkit-border-radius: 0;
    border-radius: 0;
    background: 0 0;
  }

  body {
    overflow: hidden;
    touch-action: none;
  }

  button {
    color: inherit;
  }

  input {
    color: black;
  }

  html {
    box-sizing: border-box;
  }

  @media screen and (max-width: 576px) {
    html {
      font-size: 14px;
    }
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  ${animation}
`;

export default reset;
