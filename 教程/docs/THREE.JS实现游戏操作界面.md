<!--
 * @Author: your name
 * @Date: 2021-03-02 23:44:34
 * @LastEditTime: 2021-03-24 21:07:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREE.JS实现游戏操作界面.md
-->

# 1. 案例预览
![](/常用静态资源/img/threejs游戏操作.gif)
此案例实现了人物跟随着移动操作杆进行移动并执行跑步动作，右边的攻击按钮可以实现攻击，短时间内连按可以实现不同的攻击动作。

# 2. 场景的搭建

首先，我们需要把舞台搭建出来，先创建scene场景:

## 2.1 创建scene
![](/常用静态资源/img/initScene.png)

我们创建了场景，并设置了场景一个灰色的背景色。还设置了场景的雾化效果，这个雾的效果主要是针对于场景的相机的距离实现的，三个值分别是雾的颜色、雾的开始距离、完全雾化距离相机的位置。


## 2.2 创建camera

我们创建了一个与地面呈45度角并朝向原点的相机：

![](/常用静态资源/img/initCamera.png)

## 2.3 创建灯光
我们创建了两个灯光：


- 照射全局的环境光 THREE.AmbientLight
- 可以产生阴影的平衡光 THREE.DirectionalLight

![](/常用静态资源/img/initLight.png)

## 2.4 创建草地
我们使用平面几何体创建了一个贴有草皮贴图的材质的模型：

![](/常用静态资源/img/TextureLoader.png)

到这里，场景、灯光、相机、舞台都已经备齐。接下来我们将请出我们主角naruto登场。
# 人物模型和动画
## 添加人物模型
首先我们将模型导入到场景内，注意，案例中的模型比较大，加载和处理需要一定的时间，请小伙伴们耐心等待即可(实际案例里面可以加个loading动画)：

## 添加动画

## 添加操作
### 实现位置移动效果
### 实现攻击效果


# API详解

## Scene.fog

![](/常用静态资源/img/fog类.png)
> 开发Web3D应用有时候需要实现一个雾化的效果，简单说就是场景中越远的位置看起来越模糊，Three.js引擎提供了两个雾Fog和指数雾FogExp2两个类。

> Three.js场景对象Scene具有一个雾化属性.fog,该属性的属性值是雾对象Fog或指数雾对象FogExp2。如果你想模拟一个雾化效果只需要在threejs代码中设置场景对象的.fog属性就可以。

Fog类定义的是线性雾，雾的密度是随着距离线性增大的，即场景中物体雾化效果随着随距离线性变化。

构造函数雾Fog(color,near,far)的三个参数分别对应雾对象Fog的三个属性.color、.near和.far。

.color属性表示雾的颜色，比如设置为红色，场景中远处物体为黑色，场景中最近处距离物体是自身颜色，最远和最近之间的物体颜色是物体本身颜色和雾颜色的混合效果。

```
// 改变雾的颜色为白色
scene.fog.color.set(0xffffff)
```

`.near`属性值表示应用雾化效果的最小距离，距离活动摄像机长度小于.near的物体将不会被雾所影响

`.far`属性值表示应用雾化效果的最大距离，距离活动摄像机长度大于.far的物体将不会被雾所影响

## PerspectiveCamera(透视相机)

透视投影照相机（Perspective Camera）的构造函数是：
```
THREE.PerspectiveCamera(fov, aspect, near, far)
```
![](/常用静态资源/img/透视相机图.png)

透视图中，灰色的部分是视景体，是可能被渲染的物体所在的区域。fov是视景体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。

aspect等于width / height，是照相机水平方向和竖直方向长度的比值，通常设为Canvas的横纵比例。

near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。

## AmbientLight

![](/常用静态资源/img/THREE.AmbientLight.png)

环境光是指场景整体的光照效果，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的。

在设置环境光时，只需要指定光的颜色：
```
THREE.AmbientLight(hex)

```
其中，hex是十六进制的RGB颜色信息，如红色表示为0xff0000。

创建环境光并将其添加到场景中的完整做法是：

```
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);
```

如果此时场景中没有物体，只添加了这个环境光，那么渲染的结果仍然是一片黑

<b>环境光通常使用白色或者灰色，作为整体光照的基础。</b>

##TextureLoader

通过纹理贴图加载器TextureLoader的load()方法加载一张图片可以返回一个纹理对象Texture，纹理对象Texture可以作为模型材质颜色贴图.map属性的值。

材质的颜色贴图属性.map设置后，模型会从纹理贴图上采集像素值，这时候一般来说不需要在设置材质颜色.color。.map贴图之所以称之为颜色贴图就是因为网格模型会获得颜色贴图的颜色值RGB。

![](/常用静态资源/img/TextureLoaderApi.png)

## THREE.FBXLoader()
three.js有官方的fbx插件，可以直接将模型加载至网页，并且支持动画数据，代码量也是最少的。
但是，该格式存在很大弊端：插件对文件格式的规范很严格，换言之，插件支持性不太好。从网上下载的fbx动画，十有八九会加载失败。

首先需要引入FBXLoader.js插件，如果报错 “Error: THREE.FBXLoader: External library Inflate.min.js required, obtain or import from https://github.com/imaya/zlib.js”，则还需引入inflate.min.js文件。

我们可以看一个简单案例

https://wow.techbrood.com/fiddle/55419


# 参考
[ The Making of “The Aviator”: Animating a Basic 3D Scene with Three.js](https://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/) : 使用three.js设计游戏的学习心得与知识分享

[Three.js Making a Game](https://threejsfundamentals.org/threejs/lessons/threejs-game.html)

[16 Three.js 游戏操作案例](https://blog.csdn.net/qq_30100043/article/details/81844947)
