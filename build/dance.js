
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { s, i as i$1, y, _ as __decorate, e } from './query-assigned-elements-c9e89c8d.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i(i,n){return o({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

let Dance = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class Dance extends s {
    /*     hash: Hash; */
    static { this.styles = i$1 /*css*/ `
    :host {
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    #dance-for-all-route-dance__video {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
  `; }
    render() {
        console.log(this.$video);
        return y ` <video id="dance-for-all-route-dance__video"></video> `;
    }
};
__decorate([
    i('#dance-for-all-route-dance__video')
], Dance.prototype, "$video", void 0);
Dance = __decorate([
    e('dance-for-all-route-dance')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], Dance);
