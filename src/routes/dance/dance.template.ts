import {html, TemplateResult} from 'lit';
import {Dance} from './dance';
import '../../share/components/title/title.types';
import '../../share/components/message-score/message-score.type';
import '../../share/components/starts-score/starts-score.type';
import {when} from 'lit/directives/when.js';

export interface Template {
  initial: (this: Dance) => TemplateResult<1>;
  pending: (this: Dance) => TemplateResult<1>;
  complete: (this: Dance, url: string) => TemplateResult<1>;
  error: (this: Dance, error: unknown) => TemplateResult<1>;
  render: (this: Dance) => TemplateResult<1>;
}

export const template: Template = {
  initial() {
    return html`
      <section
        style="width: ${this.videoWidth}px; height: ${this
          .videoHeight}px; display: grid; place-items: center;"
      >
        <dance-for-everyone-title>
          <span data-big>Choreography...</span>
        </dance-for-everyone-title>
      </section>
    `;
  },
  error(error) {
    console.log(error);
    return html`
      <section
        style="width: ${this.videoWidth}px; height: ${this
          .videoHeight}px; display: grid; place-items: center;"
      >
        <dance-for-everyone-title>
          <span data-small>Now we have an error</span>
          <span data-small>try to</span>
          <span data-big>Reload</span>
          <span data-small>or contact with us</span>
        </dance-for-everyone-title>
      </section>
    `;
  },
  pending(this: Dance) {
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
  complete(this: Dance, url: string) {
    return html`
      <section
        style="width: ${this.videoWidth}px; height: ${this.videoHeight}px"
        class="dance__wrapper-video"
      >
        <video
          id="dance__video"
          src=${url}
          preload="metadata"
          @play=${this.playDance.bind(this)}
          @ended=${this.endDance.bind(this)}
          @pause=${this.pauseDance.bind(this)}
        ></video>
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
        ${when(
          this.startVideo,
          () => html`
            <button
              class="dance__play ${(this.$video ?? {paused: true}).paused
                ? ''
                : '--active'}"
              @click=${this.playVideo.bind(this)}
            >
              <dance-for-everyone-title>
                <span data-big>Play</span>
              </dance-for-everyone-title>
            </button>
          `,
          () => html`
            <button
              class="dance__play ${(this.$video ?? {paused: true}).paused
                ? ''
                : '--active'}"
              @click=${this.startDance.bind(this)}
            >
              <dance-for-everyone-title>
                <span data-big>Press here to Dance!</span>
              </dance-for-everyone-title>
            </button>
          `
        )}
      </section>
    `;
  },
  render(this: Dance) {
    return this.apiTask.render({
      initial: this.initial,
      pending: this.pending,
      complete: this.complete,
      error: this.error,
    }) as TemplateResult<1>;
  },
};
