/*
 * @Author: your name
 * @Date: 2021-08-25 17:29:17
 * @LastEditTime: 2021-08-25 19:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /webgl-col/src/utils/WebglMaker.js
 */

import glslify from 'glslify';
export class WebglMaker {
    constructor() {
        this.webglInstance = null;  // webgl实例对象
        this.vertexShader = null;  // 顶点着色器
        this.fragmentShader = null; // 片元着色
        this.program = null;
    }
    
    setWebglInstance(webglInstance) {
        this.webglInstance = webglInstance
    }

        /**
     * WebGL创建shader的流程为
    * 1. 首先创建指定类型的shader实例；
    * 2. 将shader源码与实例绑定;
    *  3. 编译shader。
    */
    // 创建一个 WebGLShader 着色器对象
    // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/createShader
    setVertexShader(vertexShaderSource) {
        // 创建顶点着色器对象(创建shader实例)
        this.vertexShader = this.webglInstance.createShader(this.vertexShader, glslify(vertexShaderSource));
         // 将源码分给顶点着色器对象(绑定shader源码)
         this.webglInstance.shaderSource(this.vertexShader, glslify(vertexShaderSource))
         // 编译顶点着色器程序
         this.webglInstance.compileShader(this.vertexShader)
    }

    setFragmentShader(fragmentShaderSource) {
        // 创建片元着色器对象
        this.fragmentShader = this.webglInstance.createShader(this.webglInstance.FRAGMENT_SHADER);
        //将源码分配给片元着色器对象
        this.webglInstance.shaderSource(this.fragmentShader, glslify(fragmentShaderSource));
        // 编译片元着色器
        this.webglInstance.compileShader(this.fragmentShader);
    }
    
    setProgram() {
        
    }
}