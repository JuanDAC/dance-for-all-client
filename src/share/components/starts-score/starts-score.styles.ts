import {css} from 'lit';

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

  .dance__start.--active {
    animation: dance__start--active infinite linear;
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

  .dance__start.--slow {
    animation-duration: 600ms;
  }

  .dance__start.--middle {
    animation-duration: 400ms;
  }

  .dance__start.--fast {
    animation-duration: 200ms;
  }
`;

export const animationStyles = css`
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

export const styles = [startsStyles, animationStyles];
