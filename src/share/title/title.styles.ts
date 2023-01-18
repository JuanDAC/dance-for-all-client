import {css} from 'lit';

export const hostStyles = css`
  :host {
    display: grid;
    align-items: center;
    justify-content: center;
    animation: dance__title--active infinite linear 0.8s;
  }
`;

export const titleStyles = css`
  .dance-title__small {
    text-align: center;
    display: block;
    color: #fff;
    font-size: clamp(1rem, 4vw, 1.5rem);
  }

  .top-title {
    margin-bottom: 0.5rem;
    padding-right: 2rem;
  }

  .bottom-title {
    margin-top: 2rem;
    padding-left: 2rem;
  }

  .dance-title {
    order: 2;
    color: #fde9ff;
    font-weight: 900;
    text-transform: uppercase;
    font-size: clamp(3rem, 10vw, 6rem);
    line-height: 0.75em;
    text-align: center;
    margin-block: 1rem;
    text-shadow: 3px 1px 1px #4af7ff, 2px 2px 1px #165bfb, 4px 2px 1px #4af7ff,
      3px 3px 1px #165bfb, 5px 3px 1px #4af7ff, 4px 4px 1px #165bfb,
      6px 4px 1px #4af7ff, 5px 5px 1px #165bfb, 7px 5px 1px #4af7ff,
      6px 6px 1px #165bfb, 8px 6px 1px #4af7ff, 7px 7px 1px #165bfb,
      9px 7px 1px #4af7ff;
  }

  span {
    display: block;
    position: relative;
    white-space: nowrap;
  }

  .dance-title span:before {
    content: attr(data-text);
    position: absolute;
    text-shadow: 2px 2px 1px #e94aa1, -1px -1px 1px #c736f9,
      -2px 2px 1px #e94aa1, 1px -1px 1px #f736f9;
    z-index: 1;
    white-space: nowrap;
  }

  .dance-title span:nth-child(1) {
    padding-right: 2.25rem;
  }

  .dance-title span:nth-child(2) {
    padding-left: 2.25rem;
  }
`;

export const animationStyles = css`
  @keyframes dance__title--active {
    0% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
      transform: translate(0px, 1px) skew(0, -10deg);
    }
    25% {
      filter: drop-shadow(#165bfb 2px 0px 20px);
      transform: translate(-1px, 0px) skew(0, -9.9deg);
    }
    50% {
      filter: drop-shadow(#c736f9 0px 2px 20px);
      transform: translate(0px, -1px) skew(0, -10deg);
    }
    75% {
      filter: drop-shadow(#e94aa1 -2px 0px 20px);
      transform: translate(1px, 0px) skew(0, -10.1deg);
    }
    100% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
      transform: translate(0px, 1px) skew(0, -10deg);
    }
  }
`;
