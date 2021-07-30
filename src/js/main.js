"use strict"

import { slider } from "./slider.js"

const sliderWrapper = document.getElementById("slider-wrapper")

const s = new slider(sliderWrapper, "slider-btn-disabled", "slider-btn-active")
s.init()