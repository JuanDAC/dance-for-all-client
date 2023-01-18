import {css} from 'lit';

export const debuggerStyles = css`
  [debugger],
  [debugger] * {
    box-shadow: 0 0 0 1px inset red;
  }

  [debugger-only-children] > * {
    box-shadow: 0 0 0 1px inset red;
  }

  [debugger-children] * {
    box-shadow: 0 0 0 1px inset red;
  }
`;
