import {css} from 'lit';

export const messageStyles = css`
  :host {
    width: 100%;
    height: 100px;
    position: relative;
  }

  .dance__message {
    position: absolute;
    top: -40px;
    left: -20%;
    transform: scale(0);
  }

  .dance__message.--good {
    filter: hue-rotate(295deg);
    animation: dance__message--active ease-in-out 1s;
  }

  .dance__message.--perfect {
    filter: hue-rotate(0deg);
    animation: dance__message--active ease-in-out 1s;
  }

  .dance__message.--bad {
    filter: hue-rotate(84deg);
    animation: dance__message--active ease-in-out 1s;
  }
`;

export const animationStyles = css`
  @keyframes dance__message--active {
    0% {
      transform: scale(0);
    }
    25% {
      transform: scale(0.75) rotate(-2deg);
    }
    37.5% {
      transform: scale(0.75.1) rotate(2deg);
    }
    50% {
      transform: scale(0.75) rotate(-2deg);
    }
    62.5% {
      transform: scale(0.75.1) rotate(2deg);
    }
    75% {
      transform: scale(0.75) rotate(-2deg);
    }
    100% {
      transform: scale(0);
    }
  }
`;

export const styles = [messageStyles, animationStyles];
