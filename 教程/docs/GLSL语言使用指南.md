<!--
 * @Author: your name
 * @Date: 2021-03-17 10:17:23
 * @LastEditTime: 2021-03-18 20:10:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit https://www.jianshu.com/p/66b10062bd67
 * @FilePath: /three.js-lessions/教程/docs/GLSL语言使用指南.md
-->
GLSL(OpenGL着色语言OpenGL Shading Language)语法跟C语言很类似，在可编程管线中我们必须要纯手写顶点和片源着色器，这里就要求必须使用GLSL，自行编译，链接，使用，本片

GLSL中提供了许多内建的函数，来方便我们的使用。可以在官方手册中查找相关的函数

- [官方手册](http://www.opengl.org/sdk/docs/man/): http://www.opengl.org/sdk/docs/man/
- [GLSL指南](http://www.opengl.org/registry/doc/GLSLangSpec.Full.1.20.8.pdf): http://www.opengl.org/registry/doc/GLSLangSpec.Full.1.20.8.pdf

在图形编程中我们经常用GLSL编写shader. 它可以在GPU上运行
# GLSL基础语法

## 注释
```
单行注释：//
多行注释：/* */
```

## 变量
GLSL的变量命名方式与C语言类似。变量的名称可以使用字母，数字以及下划线，但变量名不能以数字开头，还有变量名不能以gl_作为前缀，这个是GLSL保留的前缀，用于GLSL的内部变量。当然还有一些GLSL保留的名称是不能够作为变量的名称的。

## 装饰符
变量的声明可以使用如下装饰符
装饰符|描述|
--|:--:|
const|常量值必须在声明时初始化。它是只读的不可修改的|
atribute|表示只读的顶点数据，只用在顶点着色器中。数据来自当前的顶点状态或者顶点数组。它必须是全局范围声明的，不能是在函数内部。一个attribute可以是浮点数类型的标量，向量，或者矩阵。不可以是数组或结构体|
uniform|一致变量。在着色器执行期间一致变量的值是不变的。与const常量不同的是，这个值在编译时期是未知的是由着色器外部初始化的。一致变量在顶点着色器和片段着色器之间是共享的。它也只能在全局范围进行声明。|
varving| 顶点着色器的输出。例如颜色或者纹理坐标，（插值后的数据）作为片段着色器的只读输入数据。必须是全局范围声明的全局变量。可以是浮点数类型的标量，向量，矩阵。不能是数组或者结构体。|

## 内置变量
内置变量可以与固定函数功能进行交互。在使用前不需要声明。顶点着色器可用的内置变量如下表：

名称|类型|描述
--|:--:|--:
gl_Color|vec4|输入属性-表示顶点的主颜色
gl_SecondaryColor|vec4|输入属性-表示顶点的辅助颜色
gl_Normal|vec3|输入属性-表示顶点的法线值
gl_Vertexl|vec4|输入属性-表示物体空间的顶点位置
gl_MultiTexCoordn|vec4|输入属性-表示顶点的第n个纹理的坐标
gl_FogCoord|float|输入属性-表示顶点的雾坐标
gl_Positionl|vec4|输出属性-变换后的顶点的位置，用于后面的固定的裁剪等操作。所有的顶点着色器都必须写这个值。
gl_ClipVertex|vec4|输出坐标，用于用户裁剪平面的裁剪
gl_PointSize|float|点的大小