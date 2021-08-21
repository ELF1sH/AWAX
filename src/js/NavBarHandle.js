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
        const navbarHeight = this.topNavbar.offsetHeight
        const elemPosition = elem.offsetTop

        const adjustedPosition = elemPosition - navbarHeight;
    
        window.scrollTo({
            top: adjustedPosition,
            behavior: "smooth"
        });
    }

    setActive(i) {
        for (let i = 0; i < this.linksNumber; i++) {
            this.navLinks[i].classList.remove("nav-bar-link__active")
        }
        this.navLinks[i].classList.add("nav-bar-link__active")
    }
}