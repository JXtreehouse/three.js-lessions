<!--
 * @Author: your name
 * @Date: 2021-03-23 11:11:10
 * @LastEditTime: 2021-03-23 17:23:10
 * @LastEditors: Please set LastEditors
 * @Reference: https://webglfundamentals.org/webgl/lessons/zh_cn/webgl-fundamentals.html
 * https://blog.csdn.net/l461316334/article/details/105124863/
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/WebGL基础.md
-->

# 

首先WebGL并不是3D API, 它仅仅是光栅化引擎。

它可以根据你的代码绘制出点，线和三角形。 想要利用WebGL完成更复杂任务，取决于你能否提供合适的代码，组合使用点，线和三角形代替实现。

WebGL在电脑的GPU中运行。因此你需要使用能够在GPU上运行的代码。 这样的代码需要提供成对的方法。每对方法中一个叫顶点着色器， 另一个叫片断着色器，并且使用一种和C或C++类似的强类型的语言 GLSL。 (GL着色语言)。 每一对组合起来称作一个 program（着色程序）。
# 
了解WebGL 1.0（后面简称WebGL）中的类体系结构
![](/常用静态资源/img/WebGL类.png)
- WebGLObject类是各种渲染资源的基类
  


我们将使用WebGL（实际是指WebGLRenderingContext对象，简称WebGL）绘制一些基本几何图元，从而学习整个WebGL的绘制流程，
一旦掌握该流程及一些细节方法，我们就能毫无压力地推广到各种复杂场景或骨骼动画等绘制中。