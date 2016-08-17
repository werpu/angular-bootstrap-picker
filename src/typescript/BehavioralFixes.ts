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

/**
 * Some bootstrtrap behavioral fixes
 */
export class BehavioralFixes {
    /**
     * we register some keyboard events
     * to override the default behavior
     *
     * @param $element
     */
    static registerKeyBindings($element: JQuery) {

        $element.on("keydown", (event: JQueryEventObject, controller: any) => {
            /*
             * enter should trigger a form submit
             */
            if (event.keyCode == 13 /*enter*/) {
                event.preventDefault();
                $element.parents("form").find("input[type=submit]").click();
                return false;
            }

            /*
             * arrow down should open the date picker
             */
            if (event.keyCode == 40 /*arrow down*/) {
                $element.find(".picker-open").click();
                return false;
            }

            /*
             * escape should close it
             */
            if (event.keyCode == 27 /*escape*/) {
                $element.find(".picker-close").click();
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
    static registerDocumentBindings($element: JQuery, controller: any) {
        if (!controller.documentClickHandler) {
            var clickHandler = () => {

                //if event target not child of element we close
                var target = event.target;
                var isChild = false;
                $element.find(".picker-popup, .picker-popup *").each((cnt, element) => {
                    isChild = isChild || element == target;
                    if(isChild) {
                        return false;
                    }
                });

                if(!isChild) {
                    BehavioralFixes.unregisterDocumentBindings(controller);
                    $element.find(".picker-close").click();
                }

            };
            angular.element(document).bind("click", clickHandler);
            controller.documentClickHandler = clickHandler;
        }
    }

    /**
     * we also have to unregister global events
     *
     * @param clickHandler
     * @param controller
     */
    static unregisterDocumentBindings(controller: any) {
        if (controller.documentClickHandler) {
            angular.element(document).unbind("click", controller.documentClickHandler);
            controller.documentClickHandler = null;
        }
    }
}