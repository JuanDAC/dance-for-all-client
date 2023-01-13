
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
import { _ as __decorate, e as e$1, s, y } from './query-assigned-elements-c9e89c8d.js';
import { e } from './property-e4014f26.js';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o=(o,r,n)=>{for(const n of r)if(n[0]===o)return (0, n[1])();return null==n?void 0:n()};

const appName = 'dane-for-all-app';
let App = class App extends s {
    /*     hash: Hash; */
    constructor() {
        super();
        this.route = '';
        this.routes = {
            '/': () => y /*html*/ `<h1>home</h1>`,
            '/404': () => y /*html*/ `<h1>404</h1>`,
            '/dance': () => y /*html*/ `<dance-for-all-route-dance />`,
            '/upload': () => y /*html*/ `<h1>upload</h1>`,
            '/search': () => y /*html*/ `<h1>search</h1>`,
        };
        /*       this.hash = Hash(); */
        /*       this.hash.registerListener((hash) => {
          console.log(hash); // new hash
        }); */
        const { pathname } = location;
        this.route = decodeURI(pathname);
    }
    /*     static override styles = css`
      span {
        color: green;
      }
    `; */
    render() {
        return o(this.route, Object.entries(this.routes), this.routes['/404']);
    }
};
__decorate([
    e()
], App.prototype, "route", void 0);
__decorate([
    e()
], App.prototype, "routes", void 0);
App = __decorate([
    e$1(appName)
], App);

export { appName };
