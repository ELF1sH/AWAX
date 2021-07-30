"use strict"

// .slider-wrapper
//     .tape
//         .slider-item * n
//     .points-wrapper
//         .point * n

export class slider {

    translateRegExp = /[-0-9.]+(?=px)/
    CURRENT_SLIDE = 0
    timerId

    constructor(sliderWrapper, sliderBtnClassName, sliderBtnActiveClassName) {
        this.sliderWrapper = sliderWrapper
        this.sliderBtnClassName = sliderBtnClassName
        this.sliderBtnActiveClassName = sliderBtnActiveClassName
        this.tape = sliderWrapper.children[0]
        this.sliderItems = this.tape.children
        this.slideNumber = this.tape.children.length
        this.slideWidth = sliderWrapper.offsetWidth
    }

    init() {
        this.createStyleSheet()
        this.setClasses()
        this.createBtns()
        this.dragSwitcher()
        this.autoSwitching(3000)

        this.setActive(0)
    }

    createStyleSheet() {
        let style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `
            .--slider-wrapper {
                position: relative;
                overflow: hidden;
            }
            .--tape {
                position: relative;
                height: 100%;
            }
            .--slider-item {
                width: 100%;
                height: 100%;
                position: absolute;
            }
            .--points-wrapper {
                position: absolute;
                top: 100%;
                transform: translate(-50%, -140%);
                left: 50%;
                display: flex;
            }
            .--point {
                margin: 0 3px;
                cursor: pointer;
            }   
        `
        document.getElementsByTagName('head')[0].appendChild(style)
    }

    setClasses() {
        this.sliderWrapper.classList += " --slider-wrapper"
        this.tape.classList += " --tape"

        this.tape.style.transform = "translateX(0px)"
        this.tape.style.transition = ".5s transform"

        for (let i = 0; i < this.tape.children.length; i++) {
            this.tape.children[i].classList += " --slider-item"
        }

        for (let i = 0; i < this.sliderItems.length; i++) {
            this.sliderItems[i].style.left = `${i * this.slideWidth}px`
        }

        // disable selection of text
        this.tape.ondblclick = function() {return false}
        this.tape.onselectstart = function() {return false}
    }

    createBtns() {
        const btnsWrapper = document.createElement("div")
        btnsWrapper.classList += " --points-wrapper"

        for (let i = 0; i < this.slideNumber; i++) {
            const btn = document.createElement("div")
            btn.classList += ` --point ${this.sliderBtnClassName}`
            btnsWrapper.append(btn)
        }
        this.sliderWrapper.append(btnsWrapper)

        this.btnsArray = btnsWrapper.children
        for (let i = 0; i < this.btnsArray.length; i++) {
            this.btnsArray[i].addEventListener("click", () => {
                this.openSlide(i)
                clearInterval(this.timerId)
            })
        }
    }

    setDisabled(index) {
        this.btnsArray[index].classList.remove(`${this.sliderBtnActiveClassName}`)
        this.btnsArray[index].classList.add(`${this.sliderBtnClassName}`)
    }

    setActive(index) {
        this.btnsArray[index].classList.remove(`${this.sliderBtnClassName}`)
        this.btnsArray[index].classList.add(`${this.sliderBtnActiveClassName}`)
    }

    dragSwitcher() {
        let xStart
        let globalDiff = 0
        let mouseMoveBeh

        this.sliderWrapper.addEventListener("mousedown", (event) => {
            xStart = event.offsetX
            this.tape.style.transition = "" // removing transition for mouse dragging

            mouseMoveBeh = (event) => {
                const transform = this.tape.style.transform
                const curTranslate = +transform.match(this.translateRegExp)[0]
                
                let diff = xStart - event.offsetX
                globalDiff += diff
                if (curTranslate - diff < 0 && curTranslate - diff > -this.slideWidth * 2) {
                    this.tape.style.transform = `translateX(${curTranslate - diff}px)`
                }
            }

            this.sliderWrapper.addEventListener("mousemove", mouseMoveBeh)
        })

        this.sliderWrapper.addEventListener("mouseup", () => {
            this.sliderWrapper.removeEventListener("mousemove", mouseMoveBeh)

            if (Math.abs(globalDiff) > this.slideWidth / 7) {
                clearInterval(this.timerId)
                if (globalDiff > 0) this.openSlide(this.CURRENT_SLIDE + 1)
                else if (globalDiff < 0) this.openSlide(this.CURRENT_SLIDE - 1)
            }
            else {
                this.openSlide(this.CURRENT_SLIDE)
            }
            globalDiff = 0

            this.tape.style.transition = ".5s transform" // getting transition back
        })
    }

    autoSwitching(timeDelay) {
        const openSlideHandler = () => {
            if (this.CURRENT_SLIDE === this.slideNumber - 1) this.openSlide(0)
            else this.openSlide(this.CURRENT_SLIDE + 1)
        }
        this.timerId = setInterval(openSlideHandler, timeDelay)
    }

    openSlide(number) {
        if (number < 0 || number > this.slideNumber - 1) return

        this.setDisabled(this.CURRENT_SLIDE)
        this.setActive(number)
        this.tape.style.transform = `translateX(-${number * this.slideWidth}px)`
        this.CURRENT_SLIDE = number
    }
}