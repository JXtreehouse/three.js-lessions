<!--
 * @Author: your name
 * @Date: 2021-03-02 15:30:18
 * @LastEditTime: 2021-03-03 15:10:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/Threejs简介.md
-->

随着当今时期前端地愈来愈普及，页面实现的效果真的是越来越棒！
随着数字图像处理、人工智能技术的发展
展示给用户的视觉效果便不局限于平面的2D视觉效果
开始注重于全方位的3D立体展示效果
力求对于商品的361度地无死角供用户认识了解
今天~就跟着大大初尝一下优秀的三维引擎 Three.js

比如我们看一个相机展示页面:

![](/常用静态资源/img/相机.gif)

# 一、Three.js相关概念
> Three.js是基于原生WebGL封装运行的三维引擎，在所有WebGL引擎中，Three.js是国内文资料最多、使用最广泛的三维引擎。


<b>1.1 Three.JS</b>
Three.JS是基于WebGL的Javascript开源框架，简言之，就是能够实现3D效果的JS库。

<b>1.2 WebGL</b>
WebGL是一种Javascript的3D图形接口，把JavaScript和OpenGL ES 2.0结合在一起。

<b>1.3 OpenGL</b>
OpenGL是开放式图形标准，跨编程语言、跨平台，Javascript、Java 、C、C++ 、 python 等都能支持OpenG ，OpenGL的Javascript实现就是WebGL，另外很多CAD制图软件都采用这种标准。OpenGL ES 2.0是OpenGL的子集，针对手机、游戏主机等嵌入式设备而设计。

<b>1.4 Canvas</b>
Canvas是HTML5的画布元素，在使用Canvas时，需要用到Canvas的上下文，可以用2D上下文绘制二维的图像，也可以使用3D上下文绘制三维的图像，其中3D上下文就是指WebGL

![](/常用静态资源/img/关系.png)

# 二、Three.js应用场景

Threejs是一款WebGL三维引擎，它可以用来做什么许多许多地场景应用

利用Three.JS可以制作出很多酷炫的3D动画，并且Three.js还可以通过鼠标、键盘、拖拽等事件形成交互，在页面上增加一些3D动画和3D交互可以产生更好的用户体验。

## 2.1 物联网3D可视化

随着物联网的发展,工业、建筑等各个领域与物联网相关Web项目网页交互界面都会呈现出
3D化的趋势。
3D的方式更为直观，当然开发成本也比较大
而Three.js可以将开发成本大大降低

- [物联网粮仓3D可视化案例](http://www.yanhuangxueyuan.com/3D/liangcang/index.html?_blank)

![](/常用静态资源/img/keshihua.gif)

## 2.2 产品720在线预览

随着WebGL技术的持续推广，5G技术的持续推广，各种产品在线3D展示将会变得越来越普及
比如一家汽车公司的新款轿车可以在官网上在线预览
也许有一天一些电商平台会通过3D模型取代2D图片
现在你朋友推荐推荐给你一款新衣服，你会说发一张图片看看
也许将来你会说发来一个3D模型链接看看

- [沙发在线预览](http://app.xuanke3d.com/apps/trayton/#/show?_blank)

- [服装在线预览](http://suit.xuantech.cn/?_blank)

- [洗衣机在线交互预览](https://cdn.weshape3d.com/hir001/1021/web/index.html?_blank)
- [在线看房](http://www.yanhuangxueyuan.com/3D/houseDesign/index.html)

## 2.3 数据可视化
与webgl相关的数据可视化主要是两方面
一方面是海量超大数据的可视化，另一方面是与3D相关的数据可视化。
对于超大的海量数据而言
基于canvas、svg等方式进行web可视化，没有基于WebGL技术实现性能更好
对于3D相关的数据可视化基于WebGL技术

[解析GeoJOSN数据中国GDP数据可视化](http://www.yanhuangxueyuan.com/3D/geojsonChina/index.html?_blank)

##2.4  H5/微信小游戏

非常火的微信小游戏跳一跳就是使用Three.js引擎开发的
开发3D类的H5小游戏或者微信小游戏，Three.js引擎是非常好的选择噢 无需下载，方便传播，目前的生态非常和小游戏开发。

![](/常用静态资源/img/threejs游戏操作.gif)

案例实现了人物跟随着移动操作杆进行移动并执行跑步动作，右边的攻击按钮可以实现攻击，短时间内连按可以实现不同的攻击动作

- [飞行游戏](http://hexgl.bkcore.com/play/)

![](/常用静态资源/img/fly.gif)
## 2.5 科教领域
在科教领域通过3D方式展示特定的知识相比较图像更为直观。

- [科研平台-蛋白质结构可视化案例](http://www.rcsb.org/3d-view/2JEN/1?_blank)
- [化学相关——分子结构可视化](http://www.yanhuangxueyuan.com/3D/fenzi/index.html?_blank)
- [地理天文相关——太阳系3D预览](http://www.yanhuangxueyuan.com/3D/solarSystem/index.html?_blank)

![](/常用静态资源/img/star.gif)

## 2.6 机械领域

Onshape是一款机械领域的三维建模软件
如果熟悉Solidworks、UG等CAD软件，那么你可以把Onshape理解为云Solidworks。 
[机械模型在线预览demo](http://www.yanhuangxueyuan.com/3D/jixiezhuangpei/index.html?_blank)

![](/常用静态资源/img/machine.gif)
## 2.7 医疗领域
[心脏](http://www.yanhuangxueyuan.com/3D/heart.html)

[scan head data](https://threejs.org/examples/#webgl2_rendertarget_texture2darray)

![](/常用静态资源/img/heart.gif)
# 3. 3D 场景前置知识
![](/常用静态资源/img/3D场景前置知识.png)
# 3. １ Three.js主要组件

使用threejs绘制3D图形，一般绘制的结果都是通过canvas元素生成，对于平面、3D效果、视角变化和交互、动画这一块，使用threejs可以快速便捷地帮助我们完成工作，而不必一步一步创建canvas，获取context再逐条绘制。threejs有一些基本概念在使用之前必须要了解。

　　核心三大块：场景、相机、渲染器。作用分别为：在canvas中展示所有内容的3D容器、显示3D容器中可见区域的投影框、画面选定后进行拍照展示的渲染器。所有渲染器渲染时需要确定场景和相机。
　　在实际进行绘制更加丰富的内容时，threejs提供了许多对象可以很快的完成一个复杂的3D图形，并且对于3D图像的灵活多变的调整。这些对象包括有几何形状、材料、光线、计时器、射线、辅助线、动画、音频、模型加载器、控制器等，除此之外还有例如矩阵、四元数等等一些进阶的运算，简单应用都不会涉及。

## 场景(Scene)
对于一个3D应用，场景应当是唯一的，所有相关的内容都应当添加到唯一的场景中，不管是要显示还是不显示的，显示的画面是通过调整相机角度决定的。所有场景就是所有具体内容的容器。

```
const scene = new THREE.Scene();
```
场景的初始化可以自定义其中一些内容，Scene接收对象形式的参数，比较有用属性的包括：

-  fog: 表示是否在场景中添加雾气效果，在3D空间中会变成一个有可见度的空间，默认值为null，可以设置一个Fog对象
-  overrideMaterial：默认值是null，可以设定一个Material对象，这样场景中所有的物体被渲染出来就会是设定的材料
## 相机(Camera)

相机用于控制3D空间显示的区域，通常会采用显示距离的透视相机和显示投影的正交相机，当然以可以直接使用相机，并配置合适的参数来实现相应的相机。透视相机会根据场景中物体默认Z轴的深度进行近大远小的显示，而正交投影相机则会将远近不同的物体按正常的比例进行显示。
　　普通相机直接使用：`const camera = new THREE.Camera();`
　　3D场景汇总常用透视相机， 如果是生成一个透视相机，那么对于3D空间内同样大小但是Z轴距离不容的两个物体在相机中同时显示，更远的物体显示更小。

```
const camera = new THREE.PerspectiveCamera(45, 1, 1, 100);
```
　透视相机默认接受4个参数，分别表示视角、截面纵横比， 近截面距离，远截面距离（具体参数解释看上面那个链接，还有模型可看）
## 渲染器(renderer)

浏览器中3D效果展示是基于webGL的API，使用渲染器从名字上能够体现这一点:
```
const renderer = new THREE.WebGLRenderer()
```
初始化是可以配备参数的：

- canvas: 传递一个canvas的dom元素，如果不传入，那么会新增画布，通过renderer.domElement来获取，画布用于展示绘制的内容
- alpha： 画布默认是黑色背景，有时候我们只想要显示的内容有颜色，那么这一项就要设置为true
- antialias：抗锯齿效果，顾名思义，默认为false
- logarithmicDepthBuffer：这个值默认为false，是采用对数深度检测的内容，场景中物体离视野的距离不一，一般情况下在物体重叠时显示近的物体，特殊情况有可能深度判定有问题，前后材料有重叠破损的表现，此时就需要设置为true
# 参考
[从零开始初尝Three.js（大量案例、简单入手）](https://juejin.cn/post/6844904177345232903)

[郭隆邦_技术博客](http://www.yanhuangxueyuan.com/)

[使用threejs绘制简单的3D图形](https://www.cnblogs.com/zzmiaow/p/9098086.html)


