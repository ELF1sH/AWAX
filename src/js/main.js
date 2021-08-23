"use strict"

import { slider } from "./slider.js"
import { mobileSideMenu } from "./mobileSideMenu.js"
import { TabFilter } from "./TabFilter.js"
import { Gallery } from "./cardSlider.js"
import { NavBar } from "./NavBarHandle.js"
import { ScrollAnim } from "./scrollAnim.js"



const sliderWrapper = document.getElementById("slider-wrapper")
const s = new slider(sliderWrapper, "slider-btn-disabled", "slider-btn-active")
s.init()



const sideMenuBtnOpen = document.getElementById("side-menu-btn-open")
const sideMenuBtnClose = document.getElementById("side-menu-btn-close")
const sideMenuMobile = document.getElementById("side-menu-mobile")
const sideMenu = new mobileSideMenu(sideMenuBtnOpen, sideMenuBtnClose, sideMenuMobile)
sideMenu.init()



const tabsPanel = document.getElementById("tabs-panel")
const itemsWrapper = document.getElementById("items-wrapper")
const tf = new TabFilter({
    tabsPanel: tabsPanel,
    itemsWrapper: itemsWrapper
})
tf.init() 



const galleryWrapper = document.getElementById("gallery-wrapper")
const g = new Gallery({
    galleryWrapper: galleryWrapper,
    sliderBtnClassName: "slider-btn-disabled",
    sliderBtnActiveClassName: "slider-btn-active"
})
g.init()



const navLinksWrapper = document.getElementById("nav-links-wrapper")
const nb = new NavBar({
    navLinksWrapper: navLinksWrapper
})
nb.init()



const sa = new ScrollAnim([
    {
        element: document.getElementById("about-us-text-wrapper"), 
        anim: "leftToRight"
    },
    {
        element: document.getElementById("about-us-video-wrapper"), 
        anim: "rightToLeft"
    },
    {
        element: document.getElementById("service-item-1"),
        anim: "turnOver"
    },
    {
        element: document.getElementById("service-item-2"),
        anim: "turnOver"
    },
    {
        element: document.getElementById("service-item-3"),
        anim: "turnOver"
    },
    {
        element: document.getElementById("service-item-4"),
        anim: "turnOver"
    }
])
sa.init()