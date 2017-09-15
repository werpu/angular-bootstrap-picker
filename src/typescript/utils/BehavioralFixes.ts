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

//https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from

if (!(<any>Array).from) {
    (<any>Array).from = (function () {
        var toStr = Object.prototype.toString;
        var isCallable = function (fn: Function) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
        };
        var toInteger = function (value: any) {
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
        var toLength = function (value: any) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
        };

        // The length property of the from method is 1.
        return function from(arrayLike: any/*, mapFn, thisArg */) {
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
                } else {
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


export interface SelectableNode extends NodeSelector, HTMLElement {

}

type ClickCallback = (button: SelectableNode) => any;

/**
 * Some bootstrtrap behavioral fixes
 */
export class BehavioralFixes {

    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Array}           The parent elements
     */
    static getParents(elem: SelectableNode, selector?: string): Array<SelectableNode> {

        if (!Element.prototype.matches) {
            Element.prototype.matches =
                (<any>Element.prototype).matchesSelector ||
                (<any>Element.prototype).mozMatchesSelector ||
                Element.prototype.msMatchesSelector ||
                (<any>Element.prototype).oMatchesSelector ||
                (<any>Element.prototype).webkitMatchesSelector ||
                function (s) {
                    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                        i = matches.length;
                    while (--i >= 0 && matches.item(i) !== this) {
                    }
                    return i > -1;
                };
        }

        // Setup parents array
        var parents: Array<SelectableNode> = [];

        // Get matching parent elements
        for (; elem && (<any>elem) !== document; elem = (<any>elem).parentNode) {

            // Add matching parents to array
            if (selector) {
                if (elem.matches && elem.matches(selector)) {
                    parents.push(elem);
                }
            } else {
                parents.push(elem);
            }

        }

        return parents;

    };

    private static isScrollable(node: SelectableNode): boolean {
        return node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight;
    }

    private static trigger(element: SelectableNode, selector: string, trigger: ClickCallback) {
        (<any>Array).from(element.querySelectorAll(selector)).forEach(trigger);

    }

    private static addEventListener(element: SelectableNode, selector: string, trigger: ClickCallback) {
        (<any>Array).from(element.querySelectorAll(selector)).forEach(trigger);

    }

    /**
     * we register some keyboard events
     * to override the default behavior
     *
     * @param $element
     */
    static registerKeyBindings(element: SelectableNode) {


        element.addEventListener("keydown", (event: KeyboardEvent) => {
            /*
             * enter should trigger a form submit
             */
            if (event.keyCode == 13 /*enter*/) {
                event.preventDefault();
                BehavioralFixes.trigger(BehavioralFixes.getParents(element, "form")[0], "input[type=submit]", (button: SelectableNode) => button.click());

                return false;
            }

            /*
             * arrow down should open the date picker
             */
            if (event.keyCode == 40 /*arrow down*/) {
                BehavioralFixes.trigger(element, ".picker-open", (button: SelectableNode) => button.click());

                return false;
            }

            /*
             * escape should close it
             */
            if (event.keyCode == 27 /*escape*/) {
                BehavioralFixes.trigger(element, ".picker-close", (button: SelectableNode) => button.click());

                return false;
            }
        });
    }

    /**
     * for clicks outside of our date picker area
     * the date picker automatically should close
     *
     * @param $element
     * @param controller
     */
    static registerDocumentBindings(element: SelectableNode, controller: any) {
        if (!controller.documentClickHandler) {
            var clickHandler = () => {
                BehavioralFixes.unregisterDocumentBindings(element, controller);
                BehavioralFixes.trigger(element, ".picker-close", (button: SelectableNode) => button.click());
            };

            document.addEventListener("click", clickHandler);
            controller.documentClickHandler = clickHandler;
        }
    }

    /**
     * we also have to unregister global events
     *
     * @param clickHandler
     * @param controller
     */
    static unregisterDocumentBindings(element: SelectableNode, controller: any) {
        if (controller.documentClickHandler) {
            document.removeEventListener("click", controller.documentClickHandler);
            //TODO add parent scroll removal here
            controller.documentClickHandler = null;
        }
        BehavioralFixes.offScroll(element, controller)

    }

    static registerPopupBindings(element: SelectableNode, controller: any) {
        (<any>Array).from(element.querySelectorAll(".picker-popup")).forEach((node: SelectableNode) => {
            node.addEventListener("click", (event: UIEvent) => {
                event.stopImmediatePropagation();
                event.stopPropagation();
            });
        });
    }


    static openDropDown(element: SelectableNode, controller: any) {

        controller.isOpen = true;
        (<any>Array).from(element.querySelectorAll(".dropdown")).forEach((node: SelectableNode) => {
            node.classList.add("open");

        });
        this.repositionPopup(controller, element);


        this.onScroll(controller, element);

    }

    static repositionPopup(controller: any, element: SelectableNode) {
        if (controller.appendToBody) {
            (<any>Array).from(element.querySelectorAll(".dropdown-menu")).forEach((node: SelectableNode) => {
                node.classList.add("fixedPos");
                //node.classList.add("hidden");

                setTimeout(() => {
                    try {
                        let top = element.querySelectorAll("input[type=\"text\"]")[0].getBoundingClientRect().bottom;
                        let left = element.getBoundingClientRect().left + element.clientWidth - node.clientWidth;

                        if(top + node.clientHeight + 10 > window.innerHeight) {
                            top = element.querySelectorAll("input[type=\"text\"]")[0].getBoundingClientRect().top - 5 - node.clientHeight;
                            node.classList.add("top");
                        } else {
                            node.classList.remove("top");
                        }

                        node.style.top = top + "px";
                        node.style.left = left + "px";
                        node.style.right = "auto";
                    } finally {
                       // node.classList.remove("hidden");
                    }

                }, 100);

            });
        }
    }

    static closeDropDown(element: SelectableNode, controller: any) {
        controller.isOpen = false;
        (<any>Array).from(element.querySelectorAll(".dropdown")).forEach((node: SelectableNode) => {
            node.classList.remove("open");
        });
        if (controller.appendToBody) {
            (<any>Array).from(element.querySelectorAll(".dropdown-menu")).forEach((node: SelectableNode) => {
                node.classList.add("fixedPos");
            });
        }

        BehavioralFixes.offScroll(controller, element);
    }

    private static onScroll(controller: any, element: SelectableNode) {

        if (controller.appendToBody && controller.onParentScroll) {
            (<any>Array).from(BehavioralFixes.getParents(element, "*")).forEach((node: SelectableNode) => {
                if (BehavioralFixes.isScrollable(node)) {
                    node.addEventListener("scroll", controller.onParentScroll);
                }
                window.addEventListener("scroll", controller.onParentScroll);
            });
        }
    }

    private static offScroll(controller: any, element: SelectableNode) {
        if (controller.appendToBody && controller.onParentScroll) {
            (<any>Array).from(BehavioralFixes.getParents(element, "*")).forEach(() => (node: SelectableNode) => {
                node.removeEventListener("scroll", controller.onParentScroll);
            });
            window.removeEventListener("scroll", controller.onParentScroll);
        }
    }
}