const enum ClickEvent {
    //% block="single"
    SINGLE = 1000,
    //% block="double"
    DOUBLE = 1001
}

/**
 * Clickhandler as custom block
 */
//% weight=10 color=#cc0066 icon="\uf103"
namespace clickhandler {
    let timestampFirstClick = 0;
    let nrOfClicks = 0;
    let eps: number;
    let indexActiveButton: number;
    // arrays in pxt are limited. pxt does not support two-dimonsional arrays properly!
    let singleClickHandlers: (() => void)[] = [];
    let doubleClickHandlers: (() => void)[] = [];

    /**
    * Handling click events for given button.
    * @param clickEvent type of event
    * @param clickButton source of event either button A or button B
    * @param handler action to execute
    */
    //% blockId=on_click_event_handler
    //% block="on %clickEvent=ClickEvent click on button|%clickButton=Button"
    export function onClickEvent(clickEvent: ClickEvent, clickButton: Button, handler: () => void): void {
        if ((clickEvent == ClickEvent.SINGLE) && (clickButton == Button.A)) {
            singleClickHandlers[0] = handler
        } else if ((clickEvent == ClickEvent.DOUBLE) && (clickButton == Button.A)) {
            doubleClickHandlers[0] = handler
        } else if ((clickEvent == ClickEvent.SINGLE) && (clickButton == Button.B)) {
            singleClickHandlers[1] = handler
        } else if ((clickEvent == ClickEvent.DOUBLE) && (clickButton == Button.B)) {
            doubleClickHandlers[1] = handler
        } else if ((clickEvent == ClickEvent.SINGLE) && (clickButton == Button.AB)) {
            singleClickHandlers[2] = handler
        } else if ((clickEvent == ClickEvent.DOUBLE) && (clickButton == Button.AB)) {
            doubleClickHandlers[2] = handler
        }
    }

    function reset() {
        nrOfClicks = 0;
        indexActiveButton = -1;
    }

    function checkAndCallHandler(x: number, y: number) {
        if (y==0) {
            singleClickHandlers[x]()
        } else {
            doubleClickHandlers[x]()
        }
    }

    /**
     * Dispatch to corresponding single-click handler
     */
    control.onEvent(ClickEvent.SINGLE, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
        checkAndCallHandler(indexActiveButton, 0);
        reset();
    })

    /**
     * Dispatch to corresponding double-click handler
     */
    control.onEvent(ClickEvent.DOUBLE, EventBusValue.MICROBIT_BUTTON_EVT_CLICK, function () {
        checkAndCallHandler(indexActiveButton, 1);
        reset();
    })

    function initialize() {
        nrOfClicks += 1
        if (nrOfClicks == 1) {
            timestampFirstClick = input.runningTime()
        }
    }

    // general click handler for button A
    input.onButtonPressed(Button.A, () => {
        initialize();
        indexActiveButton = 0;
    })

    // general click handler for button B
    input.onButtonPressed(Button.B, () => {
        initialize();
        indexActiveButton = 1;
    })

    // general click handler for button AB
    input.onButtonPressed(Button.AB, () => {
        initialize();
        indexActiveButton = 2;
    })

    // run in background to collect click events and fire
    // corresponding event
    control.inBackground(function () {
        while (true) {
            eps = input.runningTime() - timestampFirstClick
            if (eps > 300) {
                if (nrOfClicks == 1) {
                    control.raiseEvent(
                        ClickEvent.SINGLE,
                        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
                    )
                } else if (nrOfClicks == 2) {
                    control.raiseEvent(
                        ClickEvent.DOUBLE,
                        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
                    )
                }
                nrOfClicks = 0;
            }
            basic.pause(50)
        }
    })
}