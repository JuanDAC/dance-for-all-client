import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './message-score.styles';
import {renderTemplate} from './message-score.template';

/**
 * @element dance-for-everyone-message-score
 * @prop {string} data-kind - Kind of message
 */
@customElement('dance-for-everyone-message-score')
export class MessageScore extends LitElement {
  static override styles = [...styles];

  @property({attribute: 'data-kind'})
  kind!: 'good' | 'perfect' | 'bad' | 'ok';

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }
}
