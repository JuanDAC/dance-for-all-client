import {LitElement, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {choose} from 'lit/directives/choose.js';

export const appName = 'dane-for-all-app';

@customElement(appName)
class App extends LitElement {
  /*     hash: Hash; */

  constructor() {
    super();
    /*       this.hash = Hash(); */
    /*       this.hash.registerListener((hash) => {
      console.log(hash); // new hash
    }); */
    const {pathname} = location;
    this.route = decodeURI(pathname);
  }

  @property()
  route = '';

  @property()
  routes = {
    '/': () => html/*html*/ `<h1>home</h1>`,
    '/404': () => html/*html*/ `<h1>404</h1>`,
    '/dance': () => html/*html*/ `<dance-for-all-route-dance />`,
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

declare global {
  interface HTMLElementTagNameMap {
    'dane-for-all-app': App;
  }
}
