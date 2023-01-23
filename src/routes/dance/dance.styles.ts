import {css} from 'lit';

export const hostStyles = css`
  :host {
    position: relative;
  }
`;

export const videoStyles = css`
  .dance__wrapper-video {
    top: 0px;
    left: 0px;
    display: grid;
    place-items: center;
  }

  .dance__wrapper-video > * {
    position: absolute;
    margin: 0px;
    top: 0px;
    left: 0px;
    visibility: hidden;
  }

  .dance__game {
    margin: 0px !important;
    height: auto !important;
    aspect-ratio: 16 / 9;
    visibility: visible !important;
    position: relative !important;
    animation: dance__game--active 5s infinite linear;
    width: calc(100% - 100px) !important;
    max-height: calc(100% - 200px) !important;
  }
`;

export const actionsStyles = css`
  .dance__actions {
    position: absolute;
    height: 100%;
    top: 0px;
    width: 100%;
    display: grid;
    grid-template-columns: 200px 1fr 200px;
  }
`;

export const scoreStyles = css`
  .dance__scores {
    display: flex;
    justify-content: center;
    position: relative;
  }

  .dance__score {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

export const startsStyles = css`
  .dance__starts {
    display: flex;
    list-style: none;
    gap: 4px;
    justify-content: center;
    padding: 0px;
  }

  .dance__start {
    background-image: url(./assets/face_on_star.png);
    background-size: 100% 100%;
    width: 30px;
    height: 30px;
    filter: blur(1.5px) saturate(0);
  }

  .dance__start.--normal {
    filter: hue-rotate(0deg);
  }

  .dance__start.--fantastic {
    filter: hue-rotate(90deg);
  }

  .dance__start.--awesome {
    filter: hue-rotate(220deg);
  }

  .dance__start.--active {
    animation: dance__start--active infinite linear;
  }

  .dance__start.--slow {
    animation-duration: 600ms;
  }
  .dance__start.--normal {
    animation-duration: 400ms;
  }
  .dance__start.--fast {
    animation-duration: 200ms;
  }
`;

export const menuStyles = css`
  .dance__menu {
    display: flex;
    height: 100px;
  }

  .dance__menu-item {
    background: transparent;
    border: none;
    width: 100px;
    text-transform: uppercase;
    font-weight: 900;
    text-shadow: white 0px 0px 2px;
    color: rgb(31 2 56 / 80%);
    transition: all ease-in-out 300ms;
    cursor: pointer;
  }

  .dance__menu-item:hover,
  .dance__menu-item:focus,
  .dance__menu-item:focus-visible,
  .dance__menu-item:focus-within {
    color: rgb(31, 2, 56);
    animation: dance__menu-item--hover infinite linear 0.8s;
    text-shadow: 1px 1px 1px #4af7ff, 1px 1px 1px #165bfb, 2px 1px 1px #4af7ff,
      1px 1px 1px #165bfb, 2px 1px 1px #4af7ff, 2px 2px 1px #165bfb,
      3px 2px 1px #4af7ff, 2px 2px 1px #165bfb, 4px 2px 1px #4af7ff,
      3px 3px 1px #165bfb, 4px 3px 1px #4af7ff, 1px 1px 1px #165bfb,
      4px 3px 1px #4af7ff;
  }
`;

export const animationStyles = css`
  @keyframes dance__game--active {
    0% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
    }
    25% {
      filter: drop-shadow(#165bfb 2px 0px 20px);
    }
    50% {
      filter: drop-shadow(#c736f9 0px 2px 20px);
    }
    75% {
      filter: drop-shadow(#e94aa1 -2px 0px 20px);
    }
    100% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
    }
  }
  @keyframes dance__menu-item--hover {
    0% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
      transform: translate(0px, 1px) skew(0, -5deg);
    }
    25% {
      filter: drop-shadow(#165bfb 2px 0px 20px);
      transform: translate(-1px, 0px) skew(0, -4.9deg);
    }
    50% {
      filter: drop-shadow(#c736f9 0px 2px 20px);
      transform: translate(0px, -1px) skew(0, -5deg);
    }
    75% {
      filter: drop-shadow(#e94aa1 -2px 0px 20px);
      transform: translate(1px, 0px) skew(0, -5.1deg);
    }
    100% {
      filter: drop-shadow(#4af7ff 0px -2px 20px);
      transform: translate(0px, 1px) skew(0, -5deg);
    }
  }

  @keyframes dance__start--active {
    0% {
      filter: drop-shadow(yellow 0px -2px 10px);
      transform: translate(0px, 2px);
    }
    25% {
      filter: drop-shadow(yellow 2px 0px 10px);
      transform: translate(-2px, 0px);
    }
    50% {
      filter: drop-shadow(yellow 0px 2px 10px);
      transform: translate(0px, -2px);
    }
    75% {
      filter: drop-shadow(yellow -2px 0px 10px);
      transform: translate(2px, 0px);
    }
    100% {
      filter: drop-shadow(yellow 0px -2px 10px);
      transform: translate(0px, 2px);
    }
  }
`;

export const styles = [
  hostStyles,
  videoStyles,
  actionsStyles,
  scoreStyles,
  startsStyles,
  menuStyles,
  animationStyles,
];
