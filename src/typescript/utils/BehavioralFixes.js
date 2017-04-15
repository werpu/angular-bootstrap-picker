/*
 Copyright (c) 2016 Werner Punz

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files
 (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from
if (!Array.from) {
    Array.from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) {
                return 0;
            }
            if (number === 0 || !isFinite(number)) {
                return number;
            }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
        };
        var maxSafeInteger = Math.pow(2, 53) - 1;
        var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };
        // The length property of the from method is 1.
        return function from(arrayLike /*, mapFn, thisArg */) {
            // 1. Let C be the this value.
            var C = this;
            // 2. Let items be ToObject(arrayLike).
            var items = Object(arrayLike);
            // 3. ReturnIfAbrupt(items).
            if (arrayLike == null) {
                throw new TypeError("Array.from requires an array-like object - not null or undefined");
            }
            // 4. If mapfn is undefined, then let mapping be false.
            var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
            var T;
            if (typeof mapFn !== 'undefined') {
                // 5. else
                // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                }
                // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                if (arguments.length > 2) {
                    T = arguments[2];
                }
            }
            // 10. Let lenValue be Get(items, "length").
            // 11. Let len be ToLength(lenValue).
            var len = toLength(items.length);
            // 13. If IsConstructor(C) is true, then
            // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
            // 14. a. Else, Let A be ArrayCreate(len).
            var A = isCallable(C) ? Object(new C(len)) : new Array(len);
            // 16. Let k be 0.
            var k = 0;
            // 17. Repeat, while k < len… (also steps a - h)
            var kValue;
            while (k < len) {
                kValue = items[k];
                if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                }
                else {
                    A[k] = kValue;
                }
                k += 1;
            }
            // 18. Let putStatus be Put(A, "length", len, true).
            A.length = len;
            // 20. Return A.
            return A;
        };
    }());
}
/**
 * Some bootstrtrap behavioral fixes
 */
var BehavioralFixes = (function () {
    function BehavioralFixes() {
    }
    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Array}           The parent elements
     */
    BehavioralFixes.getParents = function (elem, selector) {
        debugger;
        // Element.matches() polyfill
        if (!Element.prototype.matches) {
            Element.prototype.matches =
                Element.prototype.matchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector ||
                    Element.prototype.oMatchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    function (s) {
                        var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
                        while (--i >= 0 && matches.item(i) !== this) { }
                        return i > -1;
                    };
        }
        // Setup parents array
        var parents = [];
        // Get matching parent elements
        for (; elem && elem !== document; elem = elem.parentNode) {
            // Add matching parents to array
            if (selector) {
                if (Element.matches(selector)) {
                    parents.push(elem);
                }
            }
            else {
                parents.push(elem);
            }
        }
        return parents;
    };
    ;
    BehavioralFixes.trigger = function (element, selector, trigger) {
        Array.from(element.querySelectorAll(selector)).forEach(trigger);
    };
    BehavioralFixes.addEventListener = function (element, selector, trigger) {
        Array.from(element.querySelectorAll(selector)).forEach(trigger);
    };
    /**
     * we register some keyboard events
     * to override the default behavior
     *
     * @param $element
     */
    BehavioralFixes.registerKeyBindings = function (element) {
        element.addEventListener("keydown", function (event) {
            /*
             * enter should trigger a form submit
             */
            if (event.keyCode == 13 /*enter*/) {
                event.preventDefault();
                BehavioralFixes.trigger(BehavioralFixes.getParents(element, "form")[0], "input[type=submit]", function (button) { return button.click(); });
                return false;
            }
            /*
             * arrow down should open the date picker
             */
            if (event.keyCode == 40 /*arrow down*/) {
                BehavioralFixes.trigger(element, ".picker-open", function (button) { return button.click(); });
                return false;
            }
            /*
             * escape should close it
             */
            if (event.keyCode == 27 /*escape*/) {
                BehavioralFixes.trigger(element, ".picker-close", function (button) { return button.click(); });
                return false;
            }
        });
    };
    /**
     * for clicks outside of our date picker area
     * the date picker automatically should close
     *
     * @param $element
     * @param controller
     */
    BehavioralFixes.registerDocumentBindings = function (element, controller) {
        if (!controller.documentClickHandler) {
            var clickHandler = function () {
                BehavioralFixes.unregisterDocumentBindings(controller);
                BehavioralFixes.trigger(element, ".picker-close", function (button) { return button.click(); });
            };
            document.addEventListener("click", clickHandler);
            controller.documentClickHandler = clickHandler;
        }
    };
    /**
     * we also have to unregister global events
     *
     * @param clickHandler
     * @param controller
     */
    BehavioralFixes.unregisterDocumentBindings = function (controller) {
        if (controller.documentClickHandler) {
            document.removeEventListener("click", controller.documentClickHandler);
            controller.documentClickHandler = null;
        }
    };
    BehavioralFixes.registerPopupBindings = function (element) {
        Array.from(element.querySelectorAll(".picker-popup")).forEach(function (node) {
            node.addEventListener("click", function (event) {
                event.stopImmediatePropagation();
                event.stopPropagation();
            });
        });
    };
    BehavioralFixes.openDropDown = function (element, controller) {
        controller.isOpen = true;
        Array.from(element.querySelectorAll(".dropdown")).forEach(function (node) {
            node.classList.add("open");
        });
    };
    BehavioralFixes.closeDropDown = function (element, controller) {
        controller.isOpen = false;
        Array.from(element.querySelectorAll(".dropdown")).forEach(function (node) {
            node.classList.remove("open");
        });
    };
    return BehavioralFixes;
}());
exports.BehavioralFixes = BehavioralFixes;
