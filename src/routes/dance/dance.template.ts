import {html} from 'lit';
import {Dance} from './dance';
import '../../share/components/title/title.types';
import '../../share/components/message-score/message-score.type';
import '../../share/components/starts-score/starts-score.type';

export function template(this: Dance) {
  return this.apiTask.render({
    pending: () => {
      return html`
        <section
          style="width: ${this.videoWidth}px; height: ${this
            .videoHeight}px; display: grid; place-items: center;"
        >
          <dance-for-everyone-title>
            <span data-big>Loading choreography...</span>
          </dance-for-everyone-title>
        </section>
      `;
    },
    complete: (url) => html`
      <section
        style="width: ${this.videoWidth}px; height: ${this.videoHeight}px"
        class="dance__wrapper-video"
      >
        <video id="dance__video" src=${String(url)} preload="metadata"></video>
      </section>
      <section class="dance__actions">
        <article class="dance__slide"></article>
        <article class="dance__scores">
          <div class="dance__score">
            <dance-for-everyone-starts-score
              .data-color=${this.danceColor}
              .data-velocity=${this.danceVelocity}
            >
            </dance-for-everyone-starts-score>
            <dance-for-everyone-message-score
              data-kind=${this.danceKind}
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
        <button
          class="dance__play ${(this.$video ?? {paused: true}).paused
            ? ''
            : '--active'}"
          @click=${this.startDance.bind(this)}
        >
          <dance-for-everyone-title>
            <span data-big>Play to Dance!</span>
          </dance-for-everyone-title>
        </button>
      </section>
    `,
  });
}
