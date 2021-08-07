"use strict"

export class TabFilter {
    constructor(tabsPanel, itemsWrapper) {
        this.tabsPanel = tabsPanel
        this.itemsWrapper = itemsWrapper
    }

    init() {
        this.removeAllCards()
    }

    removeAllCards() {
        const animTime = 1000  //ms
        const cards = this.itemsWrapper.children
        for (const card of cards) {
            card.style.animation = `disappearing ${animTime / 1000}s ease forwards`
        }
    }
}