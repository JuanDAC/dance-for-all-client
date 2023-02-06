import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './starts-score.styles';
import {renderTemplate} from './starts-score.template';

/* type StartsColor = 'normal' | 'fantastic' | 'awesome';
type StartsVelocity = 'middle' | 'slow' | 'fast'; */

/**
 * @element dance-for-everyone-starts-score
 * @prop {number} data-scores - Scores of the user in the current level
 */
@customElement('dance-for-everyone-starts-score')
export class StartsScore extends LitElement {
  static override styles = [...styles];


  @property({attribute: 'data-score', type: Number})
  score = 0;

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }

  override attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value);
    console.log(name, value);
    this.requestUpdate();
  }
}
