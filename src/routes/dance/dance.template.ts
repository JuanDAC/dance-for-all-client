import {html} from 'lit';
import {Dance} from './dance';
import '../../share/components/title/title.types';
import '../../share/components/message-score/message-score.type';

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
          <dance-for-everyone-message-score
            .dance-active=${false}
            .dance-kind=${'perfect'}
          ></dance-for-everyone-message-score>
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
