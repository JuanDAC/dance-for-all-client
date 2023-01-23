import {html} from 'lit';
import {Title} from './title';

export function renderTemplate(this: Title) {
  return html`
    <h1 class="dance-title">${this.bigSlots}</h1>
    ${this.smallSlots}
  `;
}

export const smallTemplate = ($span: Element) => {
  const {textContent} = $span;
  const index = $span.getAttribute('data-index');
  const after = !$span.hasAttribute('data-begin');
  return html` <span
    class="dance-title__small"
    data-text="${textContent ?? ''}"
    style="order: ${index}; 
          ${after ? 'padding-inline-start: 1rem;' : ''}"
    >${textContent}</span
  >`;
};

export const bigTemplate = ($span: Element) => {
  const {textContent} = $span;
  const index = $span.getAttribute('data-index');
  return html`<span data-text="${textContent ?? ''}" style="order: ${index};"
    >${textContent}</span
  >`;
};
