import loadScriptOnce from 'load-script-once';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class DaumPostcode {
    constructor(options) {
        this.options = options;
    }
    get hasLoader() {
        const loader = window.daum && window.daum.postcode;
        return loader !== undefined && typeof loader === 'function';
    }
    get loaded() {
        const lib = window.daum && window.daum.Postcode;
        return lib !== undefined && typeof lib === 'function';
    }
    loadlib() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.hasLoader) {
                yield loadScriptOnce('https://ssl.daumcdn.net/dmaps/map_js_init/postcode.v2.js?autoload=false');
            }
            if (!this.loaded) {
                yield new Promise((resolve) => {
                    window.daum.postcode.load(resolve);
                });
            }
        });
    }
    open(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadlib();
            return new Promise((resolve) => {
                new window.daum.Postcode(Object.assign({}, this.options, { oncomplete: resolve, onclose: (_) => resolve() })).open(options);
            });
        });
    }
    embed(container, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadlib();
            return new Promise((resolve) => {
                new window.daum.Postcode(Object.assign({}, this.options, { oncomplete: resolve, onclose: (_) => resolve() })).embed(container, options);
            });
        });
    }
}

export { DaumPostcode };
