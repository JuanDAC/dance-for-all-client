import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';
import '../routes/home/home.types';
import '../routes/dance/dance.types';

export const appName = 'dance-for-everyone-app';

@customElement(appName)
export class App extends LitElement {
  constructor() {
    super();
    const {pathname} = location;
    this.route = decodeURI(pathname);
    const min = 0,
      max = 9;
    document.body.style.setProperty(
      'background-image',
      `url(./background/W0${Math.floor(Math.random() * (max - min) + min)}.jpg),
      linear-gradient(142deg, rgb(63 161 251 ) 0%, rgb(252 70 168 ) 100%)`
    );
  }

  static override styles = css/*css*/ ``;

  @property()
  route = '';

  @property()
  routes = {
    '/': () => html/*html*/ `<dance-for-everyone-route-home />`,
    '/404': () => html/*html*/ `<h1>404</h1>`,
    '/dance': () => html/*html*/ `<dance-for-everyone-route-dance />`,
    '/upload': () => html/*html*/ `<h1>upload</h1>`,
    '/search': () => html/*html*/ `<h1>search</h1>`,
  };

  /*     static override styles = css`
    span {
      color: green;
    }
  `; */

  override render() {
    return choose(this.route, Object.entries(this.routes), this.routes['/404']);
  }
}
