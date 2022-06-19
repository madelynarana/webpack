import './assets/style/index.scss';
import licence from './assets/font/Lato/ofl.txt'; // Licence Lato.

import rick from './assets/img/rick.gif';

import { hello } from './assets/js/component';


const img = document.createElement('img');
img.src =  rick;

document.body.appendChild(img);

console.log(hello);
