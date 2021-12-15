/*
 * @Author: your name
 * @Date: 2021-08-24 20:43:08
 * @LastEditTime: 2021-08-27 12:06:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/src/examples/circle/index.js
 */

import vertexShaderSource from './shader.vert';
import fragmentShaderSource from './shader.frag';

import { WebglMaker, context } from '../../engine';

import '../circle/index.less';

const canvas = document.querySelector('#canvas');
// const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

const gl = context.create3DContext(canvas);
console.log("2", gl)
