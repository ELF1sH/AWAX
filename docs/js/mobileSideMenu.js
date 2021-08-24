"use strict"

export class mobileSideMenu {
    constructor(btnOpen, btnClose, menuWrapper) {
        this.btnOpen = btnOpen
        this.btnClose = btnClose
        this.menuWrapper = menuWrapper
    }

    init() {
        this.setListeners()
    }

    setListeners() {
        this.btnOpen.addEventListener("click", () => {
            this.menuWrapper.style.animation = "sideMenuOpening 1s ease forwards"
        })
        this.btnClose.addEventListener("click", () => {
            this.menuWrapper.style.animation = "sideMenuClosing .5s ease forwards"
        })
    }
}