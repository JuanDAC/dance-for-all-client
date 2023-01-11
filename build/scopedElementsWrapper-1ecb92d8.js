
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { S, s } from './my-element-6025f644.js';

const appliedClassMixins = new WeakMap();

/** Vefify if the Mixin was previously applyed
 * @private
 * @param {function} mixin      Mixin being applyed
 * @param {object} superClass   Class receiving the new mixin
 * @returns {boolean}
 */
function wasMixinPreviouslyApplied(mixin, superClass) {
  let klass = superClass;
  while (klass) {
    if (appliedClassMixins.get(klass) === mixin) {
      return true;
    }
    klass = Object.getPrototypeOf(klass);
  }
  return false;
}

/** Apply each mixin in the chain to make sure they are not applied more than once to the final class.
 * @export
 * @param {function} mixin      Mixin to be applyed
 * @returns {object}            Mixed class with mixin applied
 */
function dedupeMixin(mixin) {
  return superClass => {
    if (wasMixinPreviouslyApplied(mixin, superClass)) {
      return superClass;
    }
    const mixedClass = mixin(superClass);
    appliedClassMixins.set(mixedClass, mixin);
    return mixedClass;
  };
}

/**
 * @typedef {import('./types').RenderOptions} RenderOptions
 * @typedef {import('./types').ScopedElementsMixin} ScopedElementsMixin
 * @typedef {import('./types').ScopedElementsHost} ScopedElementsHost
 * @typedef {import('./types').ScopedElementsMap} ScopedElementsMap
 * @typedef {import('@lit/reactive-element').CSSResultOrNative} CSSResultOrNative
 */

// @ts-ignore
const supportsScopedRegistry = !!ShadowRoot.prototype.createElement;

/**
 * @template {import('./types').Constructor<HTMLElement>} T
 * @param {T} superclass
 * @return {T & import('./types').Constructor<ScopedElementsHost>}
 */
const ScopedElementsMixinImplementation = superclass =>
  /** @type {ScopedElementsHost} */
  class ScopedElementsHost extends superclass {
    /**
     * Obtains the scoped elements definitions map if specified.
     *
     * @returns {ScopedElementsMap}
     */
    static get scopedElements() {
      return {};
    }

    /**
     * Obtains the ShadowRoot options.
     *
     * @type {ShadowRootInit}
     */
    static get shadowRootOptions() {
      return this.__shadowRootOptions;
    }

    /**
     * Set the shadowRoot options.
     *
     * @param {ShadowRootInit} value
     */
    static set shadowRootOptions(value) {
      this.__shadowRootOptions = value;
    }

    /**
     * Obtains the element styles.
     *
     * @returns {CSSResultOrNative[]}
     */
    static get elementStyles() {
      return this.__elementStyles;
    }

    static set elementStyles(styles) {
      this.__elementStyles = styles;
    }

    // either TS or ESLint will complain here
    // eslint-disable-next-line no-unused-vars
    constructor(..._args) {
      super();
      /** @type {RenderOptions} */
      this.renderOptions = this.renderOptions || undefined;
    }

    /**
     * Obtains the CustomElementRegistry associated to the ShadowRoot.
     *
     * @returns {CustomElementRegistry}
     */
    get registry() {
      // @ts-ignore
      return this.constructor.__registry;
    }

    /**
     * Set the CustomElementRegistry associated to the ShadowRoot
     *
     * @param {CustomElementRegistry} registry
     */
    set registry(registry) {
      // @ts-ignore
      this.constructor.__registry = registry;
    }

    createRenderRoot() {
      const { scopedElements, shadowRootOptions, elementStyles } =
        /** @type {typeof ScopedElementsHost} */ (this.constructor);

      const shouldCreateRegistry =
        !this.registry ||
        // @ts-ignore
        (this.registry === this.constructor.__registry &&
          !Object.prototype.hasOwnProperty.call(this.constructor, '__registry'));

      /**
       * Create a new registry if:
       * - the registry is not defined
       * - this class doesn't have its own registry *AND* has no shared registry
       */
      if (shouldCreateRegistry) {
        this.registry = supportsScopedRegistry ? new CustomElementRegistry() : customElements;
        for (const [tagName, klass] of Object.entries(scopedElements)) {
          this.defineScopedElement(tagName, klass);
        }
      }

      /** @type {ShadowRootInit} */
      const options = {
        mode: 'open',
        ...shadowRootOptions,
        customElements: this.registry,
      };

      const createdRoot = this.attachShadow(options);
      if (supportsScopedRegistry) {
        this.renderOptions.creationScope = createdRoot;
      }

      if (createdRoot instanceof ShadowRoot) {
        S(createdRoot, elementStyles);
        this.renderOptions.renderBefore = this.renderOptions.renderBefore || createdRoot.firstChild;
      }

      return createdRoot;
    }

    createScopedElement(tagName) {
      const root = supportsScopedRegistry ? this.shadowRoot : document;
      // @ts-ignore polyfill to support createElement on shadowRoot is loaded
      return root.createElement(tagName);
    }

    /**
     * Defines a scoped element.
     *
     * @param {string} tagName
     * @param {typeof HTMLElement} klass
     */
    defineScopedElement(tagName, klass) {
      const registeredClass = this.registry.get(tagName);
      if (registeredClass && supportsScopedRegistry === false && registeredClass !== klass) {
        // eslint-disable-next-line no-console
        console.error(
          [
            `You are trying to re-register the "${tagName}" custom element with a different class via ScopedElementsMixin.`,
            'This is only possible with a CustomElementRegistry.',
            'Your browser does not support this feature so you will need to load a polyfill for it.',
            'Load "@webcomponents/scoped-custom-element-registry" before you register ANY web component to the global customElements registry.',
            'e.g. add "<script src="/node_modules/@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js"></script>" as your first script tag.',
            'For more details you can visit https://open-wc.org/docs/development/scoped-elements/',
          ].join('\n'),
        );
      }
      if (!registeredClass) {
        return this.registry.define(tagName, klass);
      }
      return this.registry.get(tagName);
    }

    /**
     * @deprecated use the native el.tagName instead
     *
     * @param {string} tagName
     * @returns {string} the tag name
     */
    // eslint-disable-next-line class-methods-use-this
    getScopedTagName(tagName) {
      return tagName;
    }

    /**
     * @deprecated use the native el.tagName instead
     *
     * @param {string} tagName
     * @returns {string} the tag name
     */
    // eslint-disable-next-line class-methods-use-this
    static getScopedTagName(tagName) {
      return tagName;
    }
  };

const ScopedElementsMixin = dedupeMixin(ScopedElementsMixinImplementation);

/** @typedef {import('@open-wc/scoped-elements').ScopedElementsMap} ScopedElementsMap */
/** @typedef {import('lit/html.js').TemplateResult} TemplateResult */

/**
 * Regarding the @ts-expect-error, it is caused by having '& typeof ScopedElementsHost' on ScopedElementsMixin.
 * This type intersection is necessary though, in order to access static props of the mixin. For example:
 *
 * static get scopedElements() {
 *   return {
 *     ...super.scopedElements, // <-- this will error without '& typeof ScopedElementsHost'
 *   }
 * }
 *
 * However, a new type error is created --> Base constructors must all have the same return type.ts(2510)
 * But this can be ignored, and then at least you do get the super static props typed properly.
 */
// @ts-ignore https://github.com/microsoft/TypeScript/issues/40110 , not using expect-error, because in some TS versions it does not throw
class ScopedElementsTestWrapper extends ScopedElementsMixin(s) {
  static get properties() {
    return {
      scopedElements: { type: Object },
      template: { type: Object },
    };
  }

  constructor(scopedElement, template) {
    super();

    /** @type {ScopedElementsMap} */
    this.scopedElements = scopedElement;

    /** @type {import('./renderable').LitHTMLRenderable} */
    // eslint-disable-next-line no-unused-expressions
    this.template = template;
  }

  firstUpdated(_changed) {
    super.firstUpdated(_changed);

    Object.keys(this.scopedElements).forEach(key =>
      // @ts-ignore
      this.defineScopedElement(key, this.scopedElements[key]),
    );
  }

  render() {
    return this.template;
  }
}

/**
 * Obtains a unique tag name for the test wrapper
 * @param {number} [counter=0]
 * @returns {string}
 */
const getWrapperUniqueName = (counter = 0) => {
  const tag = `scoped-elements-test-wrapper-${counter}`;

  if (customElements.get(tag) !== undefined) {
    return getWrapperUniqueName(counter + 1);
  }

  return tag;
};

/**
 * Wraps the template inside a scopedElements component
 *
 * @param {import('./renderable').LitHTMLRenderable} template
 * @param {ScopedElementsMap} scopedElements
 * @return {HTMLElement}
 */
function getScopedElementsTemplate(template, scopedElements) {
  const wrapperTagName = getWrapperUniqueName();
  class Scope extends ScopedElementsTestWrapper {}

  // @ts-ignore
  customElements.define(wrapperTagName, Scope);

  /** @type {ScopedElementsTestWrapper} */
  const scope = new Scope(scopedElements, template);

  return scope;
}

/** @typedef {typeof getScopedElementsTemplate} ScopedElementsTemplateGetter */

export { getScopedElementsTemplate };
