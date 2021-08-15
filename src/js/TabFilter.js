"use strict"

export class TabFilter {
    constructor(options) {
        this.tabsPanel = options.tabsPanel
        this.itemsWrapper = options.itemsWrapper
        this.cards = this.itemsWrapper.children
        this.btns = this.tabsPanel.children

        this.animTime = 300
    }

    init() {
        this.createStyleSheet()
        this.setListeners()

        this.btns[0].classList.add("btn-underline")
    }

    createStyleSheet() {
        let style = document.createElement('style')
        style.type = 'text/css'
        style.innerHTML = `
            .btn-underline {
                border-bottom: 6px solid #B88B58;
            }
            .btn-underline:hover {
                border-bottom: 0px;
            }
        `
        document.getElementsByTagName('head')[0].appendChild(style)
    }

    setListeners() {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].addEventListener("click", () => {
                const filter = this.btns[i].children[0].getAttribute("data-type-btn")
                this.hideAllCards()
                this.delay(this.animTime + 1).then(() => this.showCardsByFilter(filter))

                this.setUnderline(this.btns[i])
            })
        }
    }

    setUnderline(btn) {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].classList.remove("btn-underline")
        }
        btn.classList.add("btn-underline")
    }

    showCardsByFilter(filter) {
        for (let i = 0; i < this.cards.length; i++) {
            if (filter === "all" || this.cards[i].getAttribute("data-type") === filter) {
                this.cards[i].style.display = "block"
                this.cards[i].style.animation = `appearing ${this.animTime / 1000}s linear forwards`
            }
        }
    }

    hideAllCards() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].style.animation = `disappearing ${this.animTime / 1000}s linear forwards`
        }
        this.delay(this.animTime).then(() => {
            return new Promise(resolve => {
                for (let i = 0; i < this.cards.length; i++) {
                    this.cards[i].style.display = "none"
                }
                resolve()
            })
        })
    }

    delay(ms) {
        return new Promise(resolve => {
            setTimeout(() => resolve(), ms)
        })
    }
}