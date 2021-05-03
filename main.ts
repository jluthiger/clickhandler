radio.setGroup(0)

clickhandler.onClickEvent(ClickEvent.SINGLE, Button.A, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(1)
    radio.sendString("1:L")
})
clickhandler.onClickEvent(ClickEvent.DOUBLE, Button.A, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(2)
    radio.sendString("2:L")
})
clickhandler.onClickEvent(ClickEvent.SINGLE, Button.B, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(3)
    radio.sendString("1:R")
})
clickhandler.onClickEvent(ClickEvent.DOUBLE, Button.B, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(4)
    radio.sendString("2:R")
})
clickhandler.onClickEvent(ClickEvent.SINGLE, Button.AB, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(5)
    radio.sendString("0:S")
})
clickhandler.onClickEvent(ClickEvent.DOUBLE, Button.AB, function () {
    basic.clearScreen()
    basic.pause(50)
    basic.showNumber(6)
    radio.sendString("0:E")
})
