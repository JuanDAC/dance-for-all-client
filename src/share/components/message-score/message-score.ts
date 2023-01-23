import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './message-score.styles';
import {renderTemplate} from './message-score.template';

@customElement('dance-for-everyone-message-score')
export class MessageScore extends LitElement {
  static override styles = [...styles];

  @property({attribute: 'dance-kind'})
  kind!: 'good' | 'active' | 'bad';

  @property({attribute: 'dance-active'})
  active = false;

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }
}
