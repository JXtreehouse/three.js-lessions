/*
 * @Author: your name
 * @Date: 2021-08-26 17:28:47
 * @LastEditTime: 2021-08-27 14:26:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/src/engine/utils.js
 */

/**
 * check if context is WebGL2(gl)
 * @param {}
*/

function isWebGL2(gl) {
    // This is the correct check but it is slow
    // return  gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0
}

function isWebGL1(gl) {

}

const glEnumToString = (function() {
    const haveEnumsForType = Object.createProper
}());