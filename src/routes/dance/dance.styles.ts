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
  }

  #dance__video {
    width: calc(100% - 100px);
    height: calc(100% - 100px);
    margin: 50px;
  }
`;

export const actionsStyles = css`
  .dance__actions {
    position: absolute;
    height: 100%;
    top: 0px;
    width: 100%;
    display: grid;
    grid-template-columns: 200px 1fr 300px;
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

export const messageStyles = css`
  .dance__message {
    position: absolute;
    top: 20px;
    transform: scale(0);
  }

  .dance__message.--active {
    animation: dance__message--active ease-in-out 1s;
  }

  .dance__message.--good {
    filter: hue-rotate(295deg);
  }

  .dance__message.--perfect {
    filter: hue-rotate(0deg);
  }

  .dance__message.--bad {
    filter: hue-rotate(84deg);
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
    width: 150px;
  }
`;

export const animationStyles = css`
  @keyframes dance__message--active {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0.75) rotate(-1deg);
    }
    37.5% {
      transform: scale(0.75) rotate(1deg);
    }
    50% {
      transform: scale(0.75) rotate(-1deg);
    }
    62.5% {
      transform: scale(0.75) rotate(1deg);
    }
    75% {
      transform: scale(0.75) rotate(-1deg);
    }
    100% {
      transform: scale(0);
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
