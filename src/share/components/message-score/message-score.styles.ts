import {css} from 'lit';

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
`;

export const styles = [messageStyles, animationStyles];
