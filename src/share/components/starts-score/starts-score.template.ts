import {html} from 'lit';
import {StartsScore} from './starts-score';

export const renderTemplate = function (this: StartsScore) {

  const score = this.score;
  const color = score >= 6 ? 'awesome' : score >= 5 ? 'fantastic' : 'normal';
  const velocity = score >= 6 ? 'fast' : score >= 5 ? 'middle' : 'slow';

  const danceVelocity = Array(score).fill(velocity) as Array<string>;

  return html`
    <ul class="dance__starts --${color}">
      ${Array.from({length: 5}, (_, i) => {
        const velocity = danceVelocity.at(i) ?? '';
        return html` <li class="dance__start --${velocity}"></li> `;
      })}
    </ul>
  `;
};
