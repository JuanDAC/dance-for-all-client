import {LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {styles} from './starts-score.styles';
import {renderTemplate} from './starts-score.template';

type StartsColor = 'normal' | 'fantastic' | 'awesome';
type StartsVelocity = 'middle' | 'slow' | 'fast';

@customElement('dance-for-everyone-starts-score')
export class StartsScore extends LitElement {
  static override styles = [...styles];

  @property({attribute: 'data-color'})
  color: StartsColor[] = [];

  @property({attribute: 'data-velocity'})
  velocity: StartsVelocity[] = [];

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }
}
