import {css} from 'lit';

export const styles = css`
  .header {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 4rem);
  }

  .disclaimer {
    width: 100%;
    height: 2rem;
    text-align: center;
    color: #fff;
  }

  .disclaimer a {
    color: #fff;
  }
`;
