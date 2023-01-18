import {LitElement} from 'lit';
import {customElement} from 'lit/decorators.js';
import {styles} from './home.styles';
import {template} from './home.template';

@customElement('dance-for-everyone-route-home')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Home extends LitElement {
  static override styles = [styles];
  override render() {
    return template;
  }
}
