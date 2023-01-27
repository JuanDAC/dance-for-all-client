import {LitElement, html} from 'lit';
import {customElement} from 'lit/decorators.js';
import {Routes} from '@lit-labs/router';
import '../routes/home/home.types';
import '../routes/dance/dance.types';
import '../routes/search/search.types';

export const appName = 'dance-for-everyone-app';

@customElement(appName)
export class App extends LitElement {
  routes: Routes = new Routes(this, [
    {
      path: '/',
      render: () =>
        html`<dance-for-everyone-route-home .routes=${this.routes} />`,
    },
    {
      path: '/dance',
      render: () =>
        html`<dance-for-everyone-route-dance .routes=${this.routes} />`,
    },
    {
      path: '/upload',
      render: () => html`<h1>upload</h1>`,
    },
    {
      path: '/search',
      render: () =>
        html`<dance-for-everyone-route-video-search .routes=${this.routes} />`,
    },
    {
      path: '/*',
      render: () => html`<h1>404</h1>`,
    },
  ]);

  override connectedCallback() {
    super.connectedCallback();
    const min = 0;
    const max = 9;
    document.body.style.setProperty(
      'background-image',
      `url(./background/W0${Math.floor(Math.random() * (max - min) + min)}.jpg),
      linear-gradient(142deg, rgb(63 161 251 ) 0%, rgb(252 70 168 ) 100%)`
    );
    this.routes.goto(location.pathname);
  }

  override render() {
    return this.routes.outlet();
  }
}
