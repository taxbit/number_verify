import './item.css';

export default class Item {
    constructor(domElement, mapEventHandlersToEvent = {}) {
        this.domElement = domElement;

        for (const event in mapEventHandlersToEvent) {
            this.domElement.addEventListener(
                event,
                mapEventHandlersToEvent[event]
            );
        }
    }
}