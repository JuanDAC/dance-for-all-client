import {LitElement, PropertyValues} from 'lit';
import {customElement} from 'lit/decorators.js';
import {animationStyles, hostStyles, titleStyles} from './title.styles';
import {bigTemplate, renderTemplate, smallTemplate} from './title.template';

@customElement('dance-for-everyone-title')
export class Title extends LitElement {
  static override styles = [hostStyles, titleStyles, animationStyles];

  constructor() {
    super();
    this.render = renderTemplate.bind(this);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setIndexOrder();
    this.setBeginSlots();
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    changedProperties.forEach(console.log);
    this.setIndexOrder();
    this.setBeginSlots();
  }

  get slots() {
    return [...this.children];
  }

  private setIndexOrder() {
    this.slots.forEach(($span, index) => {
      $span.setAttribute('data-index', `${index + 1}`);
    });
  }

  private setBeginSlots() {
    this.slots.some(($span) => {
      $span.setAttribute('data-begin', `true`);
      return $span.hasAttribute('data-big');
    });
  }

  get smallSlots() {
    return this.slots
      .filter(($span) => $span.hasAttribute('data-small'))
      .map(smallTemplate);
  }

  get bigSlots() {
    return this.slots
      .filter(($span) => $span.hasAttribute('data-big'))
      .map(bigTemplate);
  }
}
