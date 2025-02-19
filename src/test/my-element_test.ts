/* eslint-disable @typescript-eslint/ban-ts-comment */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*

import {MyElement} from '../my-element.js';

// @ts-ignore
import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

// @ts-ignore
suite('my-element', () => {
  // @ts-ignore
  test('is defined', () => {
    const el = document.createElement('my-element');
    assert.instanceOf(el, MyElement);
  });

  // @ts-ignore
  test('renders with default values', async () => {
    const el = await fixture(html`<my-element></my-element>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  // @ts-ignore
  test('renders with a set name', async () => {
    const el = await fixture(html`<my-element name="Test"></my-element>`);
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, Test!</h1>
      <button part="button">Click Count: 0</button>
      <slot></slot>
    `
    );
  });

  // @ts-ignore
  test('handles a click', async () => {
    const el = (await fixture(html`<my-element></my-element>`)) as MyElement;
    const button = el.shadowRoot!.querySelector('button')!;
    button.click();
    await el.updateComplete;
    assert.shadowDom.equal(
      el,
      `
      <h1>Hello, World!</h1>
      <button part="button">Click Count: 1</button>
      <slot></slot>
    `
    );
  });

  // @ts-ignore
  test('styling applied', async () => {
    const el = (await fixture(html`<my-element></my-element>`)) as MyElement;
    await el.updateComplete;
    assert.equal(getComputedStyle(el).paddingTop, '16px');
  });
});
 */
