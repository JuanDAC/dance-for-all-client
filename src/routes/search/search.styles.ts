import {css} from 'lit';

export const styles = [
  css`
    /* BEM-style CSS for the component */
    :host {
      display: block;
    }
    .video-search {
      /* Just Dance colors */
      font-weight: 900;
      display: grid;
      place-items: center;
      color: white;
    }

    .video-search > dance-for-everyone-title {
      padding-block-start: 20%;
    }
    .video-search__form {
      /* Minimalist styles */
      padding: 1rem;
      box-shadow: 0px 0px 0px 1px inset rgb(255 127 15);
      align-items: center;
      width: 100vw;
      display: flex;
      justify-content: center;
    }
    .video-search__input {
      /* Minimalist styles */
      border: none;
      box-shadow: 0px 0px 0px 1px inset rgb(255 127 15);
      background-color: transparent;
      color: white;
      font-size: 1rem;
      padding: 0.5rem;
      font-weight: 500;
      text-shadow: 0px 0px 5px black;
    }
    .video-search__submit {
      /* Minimalist styles */
      background-color: transparent;
      font-weight: 900;
      box-shadow: 0px 0px 0px 1px inset rgb(255 127 15);
      color: #ff7f0f;
      font-size: 1rem;
      padding: 0.5rem;
      border: none;
    }
    .video-search__videos {
      /* Minimalist styles */
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .video-search__video {
      /* Minimalist styles */
      width: 20%;
      padding: 1rem;
    }

    .video-search__video > * {
      cursor: pointer;
      animation: none;
    }
    .video-search__video:hover > * {
      animation: dance__menu-item--hover infinite linear 0.8s;
    }
    .video-search__video img {
      width: 100%;
      aspect-ratio: 16 / 9;
      filter: saturate(1.2) drop-shadow(0px 0px 1px white);
    }

    .video-search__video p {
      margin-block-start: 0.2rem;
      font-weight: 500;
      text-shadow: 0px 0px 5px black;
    }
    /* Lazy loading styles */
    .lazy-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 10rem;
    }
    .lazy-loading__animation {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      border: 0.5rem solid white;
      border-top-color: #ff7f0f;
      animation: loading 1s infinite linear;
    }
    @keyframes loading {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes dance__menu-item--hover {
      0% {
        filter: drop-shadow(#4af7ff 0px -2px 20px);
        transform: translate(0px, 1px) scale(1.01);
      }
      25% {
        filter: drop-shadow(#165bfb 2px 0px 20px);
        transform: translate(-1px, 0px) scale(1.02);
      }
      50% {
        filter: drop-shadow(#c736f9 0px 2px 20px);
        transform: translate(0px, -1px) scale(1.01);
      }
      75% {
        filter: drop-shadow(#e94aa1 -2px 0px 20px);
        transform: translate(1px, 0px) scale(1.02);
      }
      100% {
        filter: drop-shadow(#4af7ff 0px -2px 20px);
        transform: translate(0px, 1px) scale(1.01);
      }
    }
  `,
];
