import {html} from 'lit';
import {VideoSearch} from './search';
import "../../share/components/title/title.types";
export const templateRender = function (this: VideoSearch) {
  return html`
    <div class="video-search">
      <section class="video-search__form">
        <!--           placeholder="Search for videos" -->
        <input
          class="video-search__input"
          type="text"
          @change=${this.handleSearchInput}
        />
        <button class="video-search__submit" @click=${this.handleSearchAction}>
          Search
        </button>
      </section>
      ${this.videoSearchTask.render({
        pending: () => html`
          <div class="lazy-loading">
            <div class="lazy-loading__animation"></div>
          </div>
        `,
        complete: (result) => html`
          <div class="video-search__videos">
            ${result.map(
              (video) => html`
                <div
                  class="video-search__video"
                  @click=${() =>
                    (window.location.href = '/dance?v=' + video.id.videoId)}
                >
                  <img
                    src="${video?.snippet?.thumbnails?.high?.url ?? video.snippet.thumbnails.default.url}"
                    alt="${video.snippet.title}"
                  />
                  <p>${video.snippet.title}</p>
                </div>
              `
            )}
          </div>
        `,
        initial: () => html`
          <dance-for-everyone-title>
            <span data-small>Here we</span>
            <span data-big>Dance</span>
            <span data-big>For Everyone</span>
            <span data-small>to enjoy</span>
          </dance-for-everyone-title>
        `,
      })}
    </div>
  `;
};
