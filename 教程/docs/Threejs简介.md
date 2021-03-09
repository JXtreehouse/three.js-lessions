<!--
 * @Author: your name
 * @Date: 2021-03-02 15:30:18
 * @LastEditTime: 2021-03-09 19:35:33
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
基于canvas、svg等方式进行web可视化，没有基于WebGL技术实现性能更好![](/常用静态资源/
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
OrthographicCamera#webgl2_rendertarget_texture2darray)

![](/常用静态资源/img/heart.gif)
# 3、3D 场景前置知识
![](/常用静态资源/img/3D场景前置知识.png)
# ４、 Three.js主要组件

使用threejs绘制3D图形，一般绘制的结果都是通过canvas元素生成，对于平面、3D效果、视角变化和交互、动画这一块，使用threejs可以快速便捷地帮助我们完成工作，而不必一步一步创建canvas，获取context再逐条绘制。threejs有一些基本概念在使用之前必须要了解。

　　核心三大块：场景、相机、渲染器。作用分别为：在canvas中展示所有内容的3D容器、显示3D容器中可见区域的投影框、画面选定后进行拍照展示的渲染器。所有渲染器渲染时需要确定场景和相机。
　　在实际进行绘制更加丰富的内容时，threejs提供了许多对象可以很快的完成一个复杂的3D图形，并且对于3D图像的灵活多变的调整。这些对象包括有几何形状、材料、光线、计时器、射线、辅助线、动画、音频、模型加载器、控制器等，除此之外还有例如矩阵、四元数等等一些进阶的运算，简单应用都不会涉及。

## 场景(Scene)

![](/常用静态资源/img/场景Scene.png)
对于一个3D应用，场景应当是唯一的，所有相关的内容都应当添加到唯一的场景中，不管是要显示还是不显示的，显示的画面是通过调整相机角度决定的。所有场景就是所有具体内容的容器。

```
const scene = new THREE.Scene();
```
场景的初始化可以自定义其中一些内容，Scene接收对象形式的参数，比较有用属性的包括：

-  fog: 表示是否在场景中添加雾气效果，在3D空间中会变成一个有可见度的空间，默认值为null，可以设置一个Fog对象
-  overrideMaterial：默认值是null，可以设定一个Material对象，这样场景中所有的物体被渲染出来就会是设定的材料
## 相机(Camera)

![](/常用静态资源/img/相机Camera.png)
相机用于控制3D空间显示的区域，通常会采用显示距离的透视相机和显示投影的正交相机，当然以可以直接使用相机，并配置合适的参数来实现相应的相机。透视相机会根据场景中物体默认Z轴的深度进行近大远小的显示，而正交投影相机则会将远近不同的物体按正常的比例进行显示。

Three.js 中提供以下几种摄像机类型，最为常用的是 PerspectiveCamera 透视摄像机，其他了解下即可。

- ArrayCamera 阵列摄像机
一个 ArrayCamera 会包含多个子摄像机，通过这一组子摄像机渲染出实际效果，适用于 VR 场景。
- CubeCamera 立方摄像机
创建六个 PerspectiveCamera（透视摄像机），适用于镜面场景。
- StereoCamera 立体相机
双透视摄像机适用于 3D 影片、视差效果。


###　OrthographicCamera 正交摄像机

OrthographicCamera（正交摄像机）定义了一个矩形可视区域，物体只有在这个区域内才是可见的，另外物体无论距离摄像机是远或事近，物体都会被渲染成一个大小，所以这种摄像机类型适用于 2.5D 场景（例如斜 45 度游戏）。

![](/常用静态资源/img/OrthographicCamera.jpg)

### PerspectiveCamera 透视摄像机

最为常用的摄像机类型，模拟人眼的视觉，根据物体距离摄像机的距离，近大远小。默认情况下，摄像机的初始位置 X、Y、Z 都为 0，摄像机方向是从正 Z 轴向负 Z 轴看去。通过 Near 和 Far 定义最近和最远的可视距离，Fov 定义可视的角度。

![](/常用静态资源/img/PerspectiveCamera.jpg)


　　普通相机直接使用：`const camera = new THREE.Camera();`
　　3D场景汇总常用透视相机， 如果是生成一个透视相机，那么对于3D空间内同样大小但是Z轴距离不容的两个物体在相机中同时显示，更远的物体显示更小。

```
const camera = new THREE.PerspectiveCamera(45, 1, 1, 100);
```
　透视相机默认接受4个参数，分别表示视角、截面纵横比， 近截面距离，远截面距离（具体参数解释看上面那个链接，还有模型可看）

## 网格(Mesh)
有了场景和摄像头就可以看到 3D 场景中的物体，场景中的我们最为常用的物体称为网格。

网格由两部分组成：几何体和材质



### Geometry 几何体
记录了渲染一个 3D 物体所需要的基本数据：Face 面、Vertex 顶点等信息。

![](/常用静态资源/img/mesh.jpg)

例如下面这个网格是由三角形组成，组成三角形的点称为顶点，组成的三角形称为面。

![](/常用静态资源/img/vertex_face.jpg)



### Material 材质

材质就像是物体的皮肤，决定了几何体的外表。 外表的定义可以让一个物体看起来是否有镜面金属感、暗淡、纯色、或是透明与否等效果。

![](/常用静态资源/img/material.jpg)

##  光源(Light)

光源相当于在密闭空间里的一盏灯，对于场景是必不可少的

在 Three.js 常用的有这几种光源：

![](/常用静态资源/img/light.jpg)

### AmbientLight 环境光源

属于基础光源，为场景中的所有物体提供一个基础亮度。


### DirectionalLight 平行光源
效果类似太阳光，发出的光源都是平行的。

![](/常用静态资源/img/DirectionalLight.jpg)

### HemisphereLight 半球光源
只有圆球的半边会发出光源。

![](/常用静态资源/img/HemisphereLight.jpg)

### PointLight 点光源

![](/常用静态资源/img/PointLight.jpg)

### SpotLight 聚光灯光源

一个圆锥体的灯光

![](/常用静态资源/img/SpotLight.jpg)

### Shadow 阴影

另外要注意并不是每一种光源都能产生阴影，目前只有三种光源可以：

- DirectionalLight 平行光源
- PointLight 点光源
- SpotLight 聚光灯光源

另外如果要开启模型的阴影的话，模型是由多个 Mesh 组成的，只开启父的 Mesh 的阴影是不行的，还需要遍历父 Mesh 下所有的子 Mesh 为其开启投射阴影 castShadow 和接收投射阴影 receiveShadow。

```
// 遍历子 Mesh 开启阴影
object.traverse(function(child) {
  if (child instanceof THREE.Mesh) {
    child.castShadow = true
    child.receiveShadow = true
  }
})
```

## 渲染器(renderer)

![](/常用静态资源/img/渲染器Renderer.png)
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

- [Three官方文档](https://threejs.org/)

- [从零开始初尝Three.js（大量案例、简单入手）](https://juejin.cn/post/6844904177345232903)

- [郭隆邦_技术博客](http://www.yanhuangxueyuan.com/)

- [使用threejs绘制简单的3D图形](https://www.cnblogs.com/zzmiaow/p/9098086.html)

- [十分钟打造 3D 物理世界](https://jelly.jd.com/article/5c3409fed7aa2c0055d09a75)


