import {html} from 'lit';
import {StartsScore} from './starts-score';

export const renderTemplate = function (this: StartsScore) {
  return html`
    <ul class="dance__starts">
      ${Array.from({length: 5}, (_, i) => {
        const color = this.color.at(i) ?? '';
        const velocity = this.velocity.at(i) ?? '';
        return html` <li class="dance__start --${color} --${velocity}"></li> `;
      })}
    </ul>
  `;
};
