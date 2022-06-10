import './styles/index.scss';

import rick from './images/rick.gif';
import hello from './images/hello.svg';
import heart from './images/heart.png';

console.log('Hello world');


const img = document.createElement("img");

img.src = hello;

const block = document.getElementById("heart");
block.appendChild(img);