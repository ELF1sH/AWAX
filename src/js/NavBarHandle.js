"use strict"

export class NavBar {
    constructor(options) {
        this.navLinksWrapper = options.navLinksWrapper
    }

    init() {
        this.navLinks = []
        for (let i = 0; i < this.navLinksWrapper.children.length; i++) {
            this.navLinks.push(this.navLinksWrapper.children[i].children[0])
        }
        this.linksNumber = this.navLinks.length

        this.topNavbar = document.getElementById("top-navbar")
        this.anchorsElems = []

        this.setListeners()
        this.linkUnderliner()
    }

    setListeners() {
        const anchorsNames = []
        for (let i = 0; i < this.linksNumber; i++) {
            anchorsNames[i] = this.navLinks[i].getAttribute("data-anchor")
            this.anchorsElems[i] = document.getElementById(anchorsNames[i])
        }
        for (let i = 0; i < this.linksNumber; i++) {
            this.navLinks[i].addEventListener("click", () => {
                this.scrollToElement(this.anchorsElems[i])
            })
        }
    }

    scrollToElement(elem) {
        const adjustedPosition = this.getAdjustedPosition(elem)
    
        window.scrollTo({
            top: adjustedPosition + 1, // "+1" for corrert working of linkUnderliner func
            behavior: "smooth"
        });
    }

    getAdjustedPosition(elem) {
        const navbarHeight = this.topNavbar.offsetHeight
        const elemPosition = elem.offsetTop

        return elemPosition - navbarHeight
    }

    linkUnderliner() {
        const navbarHeight = this.topNavbar.offsetHeight
        
        window.addEventListener("scroll", () => {
            for (let i = 0; i < this.anchorsElems.length - 1; i++) {
                const curPos = this.anchorsElems[i].getBoundingClientRect().top - navbarHeight
                const nextPos = this.anchorsElems[i + 1].getBoundingClientRect().top - navbarHeight
                if (curPos < 0 && nextPos >= 0) {
                    this.setActive(i)
                }
                else if (i === this.anchorsElems.length - 2 && nextPos < 0) {
                    this.setActive(i + 1)   // considering a case of the last anchor
                }
            }
        })
    }

    setActive(i) {
        for (let i = 0; i < this.linksNumber; i++) {
            this.navLinks[i].classList.remove("nav-bar-link__active")
        }
        this.navLinks[i].classList.add("nav-bar-link__active")
    }
}