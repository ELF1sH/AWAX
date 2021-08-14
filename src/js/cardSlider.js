"use strict"

// .gallery-wrapper
//     .items-wrapper
//         .slider-item * n

export class Gallery {
    CURRENT_SLIDE = 0
    anim_length = 200  // ms

    constructor(options) {
        this.galleryWrapper = options.galleryWrapper
        this.slides = this.galleryWrapper.children[0].children
        this.slideNumber = this.slides.length
        this.sliderBtnClassName = options.sliderBtnClassName
        this.sliderBtnActiveClassName = options.sliderBtnActiveClassName
        for (let i = 1; i < this.slides.length; i++) {
            this.slides[i].style.display = "none"
        }
    }

    init() {
        this.createStyleSheet()
        this.createBtns()
        this.dragSwitcher()

        this.setActive(this.CURRENT_SLIDE)
    }

    openSlide(index) {
        this.hideSlide(this.CURRENT_SLIDE).then(() => {
            this.showSlide(index)
            this.CURRENT_SLIDE = index
        })
    }

    hideSlide(index) {
        return new Promise((resolve) => {
            this.slides[index].style.animation = `disappearing ${this.anim_length / 1000}s linear forwards`
            this.setDisabled(index)
            setTimeout(() => {
                this.slides[index].style.display = "none"
                resolve()
            }, this.anim_length)
        })
    }
    showSlide(index) {
        this.slides[index].style.opacity = "0"
        this.slides[index].style.display = "block"
        this.slides[index].style.animation = `appearing ${this.anim_length / 1000}s linear forwards`
        this.setActive(index)
    }

    setDisabled(index) {
        this.btnsArray[index].classList.remove(`${this.sliderBtnActiveClassName}`)
        this.btnsArray[index].classList.add(`${this.sliderBtnClassName}`)
    }

    setActive(index) {
        this.btnsArray[index].classList.remove(`${this.sliderBtnClassName}`)
        this.btnsArray[index].classList.add(`${this.sliderBtnActiveClassName}`)
    }


    createStyleSheet() {
        let style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `
            .--gallery-wrapper {
                position: relative;
            }
            .--gallery-slider-item {
                width: 100%;
                height: 100%;
                position: absolute;
            }
            .--gallery-points-wrapper {
                position: absolute;
                top: 107%;
                transform: translateX(-50%);
                left: 50%;
                display: flex;
            }
            .--gallery-point {
                margin: 0 3px;
                cursor: pointer;
            }   
        `
        document.getElementsByTagName('head')[0].appendChild(style)
    }


    createBtns() {
        this.galleryWrapper.classList.add("--gallery-wrapper")
        const btnsWrapper = document.createElement("div")
        btnsWrapper.classList += " --gallery-points-wrapper"

        for (let i = 0; i < this.slideNumber; i++) {
            const btn = document.createElement("div")
            btn.classList += `${this.sliderBtnClassName}`
            btnsWrapper.append(btn)
        }
        this.galleryWrapper.append(btnsWrapper)

        this.btnsArray = btnsWrapper.children
        for (let i = 0; i < this.btnsArray.length; i++) {
            this.btnsArray[i].addEventListener("click", () => {
                this.openSlide(i)
            })
        }

        this.galleryWrapper.ondblclick = function() {return false}
        this.galleryWrapper.onselectstart = function() {return false}
    }


    dragSwitcher() {
        let xStart
        let xEnd
        let diff
        const wrapperWidth = this.galleryWrapper.offsetWidth

        this.galleryWrapper.addEventListener("mousedown", (event) => {
            xStart = event.offsetX
        })

        this.galleryWrapper.addEventListener("mouseup", (event) => {
            xEnd = event.offsetX
            diff = xEnd - xStart
            if (Math.abs(diff) > wrapperWidth / 5) {
                if (diff < 0 && this.CURRENT_SLIDE !== this.slideNumber - 1) {
                    this.openSlide(this.CURRENT_SLIDE + 1)
                }
                else if (diff > 0 && this.CURRENT_SLIDE !== 0) {
                    this.openSlide(this.CURRENT_SLIDE - 1)
                }
            }
        })
    }
}