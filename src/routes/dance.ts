import {LitElement, css, html} from 'lit';
import {customElement, query} from 'lit/decorators.js';

@customElement('dance-for-all-route-dance')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Dance extends LitElement {
  /*     hash: Hash; */

  static override styles = css/*css*/ `
    :host {
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    #dance-for-all-route-dance__video {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
  `;

  @query('#dance-for-all-route-dance__video')
  $video!: HTMLVideoElement;

  override render() {
    console.log(this.$video);
    return html` <video id="dance-for-all-route-dance__video"></video> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'dance-for-all-route-dance': Dance;
  }
}
