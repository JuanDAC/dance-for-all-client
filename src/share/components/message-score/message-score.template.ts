import {html} from 'lit';
import '../title/title.types';
import {MessageScore} from './message-score';

export const renderTemplate = function (this: MessageScore) {
  return html`
    <div class="dance__message  --${this.kind}">
      <dance-for-everyone-title>
        <span data-big>${this.kind}</span>
      </dance-for-everyone-title>
    </div>
  `;
};
