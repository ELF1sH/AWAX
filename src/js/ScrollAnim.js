"use strict"

export class ScrollAnim {
    constructor(options) {
        this.elemArr = options
        console.log(this.elemArr)
    }

    init() {
        this.windowHeight = document.documentElement.clientHeight

        this.setDefaultStyles()
        this.setElemStatus()
        this.scrollHandle()
    }

    setDefaultStyles() {
        this.elemArr.forEach(item => {
            switch (item.anim) {
                case "leftToRight":
                    item.element.style.opacity = "0"
                    item.element.style.transform = "translateX(-150px)"
                    break
                case "rightToLeft":
                    item.element.style.opacity = "0"
                    item.element.style.transform = "translateX(150px)"
                    break
                case "bottomToTop":
                    item.element.style.opacity = "0"
                    item.element.style.transform = "translateY(150px)"
                    break
                case "turnOver":
                    item.element.style.transform = "scaleX(0)"
                    break
                case "scaleIncreasing":
                    item.element.style.transform = "scale(0.6)"
                    item.element.style.opacity = "0"
                    break
            }
        })
    }

    setElemStatus() {
        this.targetsCoord = []
        this.elemArr.forEach((item, index) => {
            // const offsetTop = item.element.offsetTop
            // const offsetHeight = item.element.offsetHeight
            // const target = offsetTop + offsetHeight - this.windowHeight

            const rect = item.element.getBoundingClientRect();
            const target = rect.top + window.scrollY - this.windowHeight * 0.9

            // targetsCoord is a particular scroll coordinates where animations mush be played
            this.targetsCoord[index] = target
        })
    }

    scrollHandle() {
        window.addEventListener("scroll", () => {
            const curScroll = window.scrollY

            this.elemArr.forEach((item, index) => {
                if (curScroll >= this.targetsCoord[index]) {
                    console.log(item.element)
                    const delay = typeof this.elemArr[index].delay === "undefined" ? 400 : 400 + this.elemArr[index].delay

                    switch (item.anim) {
                        case "leftToRight":
                            setTimeout(() => {
                                item.element.style.animation = `${item.anim} .6s ease-out forwards`
                            }, delay)
                            break
                        case "rightToLeft":
                            setTimeout(() => {
                                item.element.style.animation = `${item.anim} .6s ease-out forwards`
                            }, delay)
                            break
                        case "bottomToTop":
                            setTimeout(() => {
                                item.element.style.animation = `${item.anim} .6s ease-out forwards`
                            }, delay)
                            break
                        case "turnOver":
                            setTimeout(() => {
                                item.element.style.animation = `${item.anim} .5s ease-in-out forwards`
                            }, delay)
                        break   
                        case "scaleIncreasing":
                            setTimeout(() => {
                                item.element.style.animation = `${item.anim} .6s ease-in-out forwards`
                            }, delay)
                            break     
                        case "counter":
                            const goalNumber = item.element.innerHTML
                            let curNumber = 0;
                            const animDuration = 2000  //ms
                            const addPerMs = goalNumber / animDuration;
                            for (let i = 0; i < animDuration; i++) {
                                setTimeout(() => {
                                    curNumber += addPerMs
                                    item.element.innerHTML = Math.round(curNumber)
                                }, i)
                            }   
                            break
                    }
                    
                    // removing element from arrays if animation has been played
                    this.targetsCoord.splice(index, 1)
                    this.elemArr.splice(index, 1)
                }
            })
        })
    }
}