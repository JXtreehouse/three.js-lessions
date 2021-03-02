<!--
 * @Author: your name
 * @Date: 2021-03-02 15:30:18
 * @LastEditTime: 2021-03-02 22:28:52
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

![](/常用静态资源/img/heart.gif)

# 3.  主要组件

# 参考
[从零开始初尝Three.js（大量案例、简单入手）](https://juejin.cn/post/6844904177345232903)

[郭隆邦_技术博客](http://www.yanhuangxueyuan.com/)


