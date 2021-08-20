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

        
    }

    setActive(i) {
        for (let i = 0; i < this.linksNumber; i++) {
            this.navLinks[i].classList.remove("nav-bar-link__active")
        }
        this.navLinks[i].classList.add("nav-bar-link__active")
    }
}