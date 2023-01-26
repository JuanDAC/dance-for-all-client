import {Routes} from '@lit-labs/router';
import {LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {styles} from './home.styles';
import {template} from './home.template';
import {property} from 'lit/decorators.js';

@customElement('dance-for-everyone-route-home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Home extends LitElement {
  static override styles = [styles];

  @property()
  routes!: Routes;

  override render() {
    return template;
  }
  override connectedCallback() {
    super.connectedCallback();
    setTimeout(() => {
      this.routes.goto('/dance');
    }, 6000);
  }
}
