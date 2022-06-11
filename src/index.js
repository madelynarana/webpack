import './assets/styles/index.scss';
import { hello } from './assets/js/component';

import imgGif from './assets/img/rick.gif';
import imgSvg from './assets/img/hello.svg';
import imgPng from './assets/img/heart.png';

console.log( hello );


const img = document.createElement("img");

img.src = imgPng;
img.src = imgGif;
img.src = imgSvg;

const block = document.getElementById("heart");

block.appendChild(img);