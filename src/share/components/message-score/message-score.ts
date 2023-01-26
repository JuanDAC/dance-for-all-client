import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './message-score.styles';
import {renderTemplate} from './message-score.template';

@customElement('dance-for-everyone-message-score')
export class MessageScore extends LitElement {
  static override styles = [...styles];

  @property({attribute: 'data-kind'})
  kind!: 'good' | 'perfect' | 'bad';

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }
  /*   override attributeChangedCallback(
    name: string,
    old: string | null,
    value: string | null
  ): void {
    super.attributeChangedCallback(name, old, value);
    if (name.includes('data-active') && JSON.parse(value ?? 'false')) {
      setTimeout(() => this.setAttribute('data-active', 'false'), 1000);
    }
  }
 */
  /*   override shouldUpdate(changedProperties: Map<string, unknown>) {
    console.log(changedProperties);
    // Only update element if prop1 changed.
    return true;
  } */
}
