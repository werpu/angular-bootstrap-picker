export interface SelectableNode extends NodeSelector, HTMLElement {
}
/**
 * Some bootstrtrap behavioral fixes
 */
export declare class BehavioralFixes {
    /**
     * Get all of an element's parent elements up the DOM tree
     * @param  {Node}   elem     The element
     * @param  {String} selector Selector to match against [optional]
     * @return {Array}           The parent elements
     */
    static getParents(elem: SelectableNode, selector?: string): Array<SelectableNode>;
    private static isScrollable(node);
    private static trigger(element, selector, trigger);
    private static addEventListener(element, selector, trigger);
    /**
     * we register some keyboard events
     * to override the default behavior
     *
     * @param $element
     */
    static registerKeyBindings(element: SelectableNode): void;
    /**
     * for clicks outside of our date picker area
     * the date picker automatically should close
     *
     * @param $element
     * @param controller
     */
    static registerDocumentBindings(element: SelectableNode, controller: any): void;
    /**
     * we also have to unregister global events
     *
     * @param clickHandler
     * @param controller
     */
    static unregisterDocumentBindings(element: SelectableNode, controller: any): void;
    static registerPopupBindings(element: SelectableNode, controller: any): void;
    static openDropDown(element: SelectableNode, controller: any): void;
    static repositionPopup(controller: any, element: SelectableNode): void;
    static closeDropDown(element: SelectableNode, controller: any): void;
    private static onScroll(controller, element);
    private static offScroll(controller, element);
}
