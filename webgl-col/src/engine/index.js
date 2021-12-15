/*
 * @Author: your name
 * @Date: 2021-08-26 10:45:59
 * @LastEditTime: 2021-08-27 12:06:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/src/engine/index.js
 */
/**
 * 我们知道WebGL框架或者引擎按照定位可以分为三种类型
 *  WebGL 封装，定位是简化 WebGL 开发，最大的特点是必须自己写 GLSL 才能用。
* 渲染引擎，定位是三维物体及场景展示，一般会抽象出场景、相机、灯光等概念，上手门槛低，不需要自己写 GLSL。
*  游戏引擎，定位是游戏开发，在前面的渲染引擎基础上，还提供了骨骼动画、物理引擎、AI、GUI 等功能，以及可视化编辑器来设计关卡，支撑大型游戏的开发。
 * 
 * 本引擎是第一中，只做WebGL封装主要解决问题是WebGL 的 API 过于繁琐
*/

export * from './WebglMaker';
export * as context  from './context';
// export * from 
