import './assets/styles/index.scss';

import rick from './assets/img/rick.gif'

import { hello } from './assets/js/component';


const img = document.createElement("img");
img.src =  rick;

document.body.appendChild(img);

console.log(hello);
