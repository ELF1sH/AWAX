"use strict"

import { slider } from "./slider.js"
import { mobileSideMenu } from "./mobileSideMenu.js"
import { TabFilter } from "./TabFilter.js"



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
const tf = new TabFilter(tabsPanel, itemsWrapper)
tf.init() 