import {html} from 'lit';
import {Dance} from './dance';
import '../../share/title/title.types';

export function template(this: Dance) {
  return html`
    <section
      style="width: ${this.videoWidth}px; height: ${this.videoHeight}px"
      class="dance__wrapper-video"
    >
      <video
        id="dance__video"
        src="./videos/Downtown _ EASY Choreography-fSPsQ_f8OrE.mp4"
        autoplay
        muted
        controls
      ></video>
    </section>
    <section class="dance__actions">
      <article class="dance__slide"></article>
      <article class="dance__scores">
        <div class="dance__score">
          <ul class="dance__starts">
            <li class="dance__start --active"></li>
            <li class="dance__start"></li>
            <li class="dance__start"></li>
            <li class="dance__start"></li>
            <li class="dance__start"></li>
          </ul>
          <div class="dance__message --good">
            <dance-for-everyone-title>
              <span data-big>good</span>
            </dance-for-everyone-title>
          </div>
          <div class="dance__message --perfect">
            <dance-for-everyone-title>
              <span data-big>perfect</span>
            </dance-for-everyone-title>
          </div>
          <div class="dance__message --bad">
            <dance-for-everyone-title>
              <span data-big>bad</span>
            </dance-for-everyone-title>
          </div>
        </div>
      </article>
      <nav class="dance__menu">
        <button class="dance__menu-item">
          <span data-small>Go galery</span>
        </button>
        <button class="dance__menu-item">
          <span data-small>Add player</span>
        </button>
      </nav>
    </section>
  `;
}
