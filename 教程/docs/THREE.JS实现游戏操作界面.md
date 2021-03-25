<!--
 * @Author: your name
 * @Date: 2021-03-02 23:44:34
 * @LastEditTime: 2021-03-25 19:30:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREE.JS实现游戏操作界面.md
-->

# 1. 案例预览
![](/常用静态资源/img/threejs游戏操作.gif)
此案例实现了人物跟随着移动操作杆进行移动并执行跑步动作，右边的攻击按钮可以实现攻击，短时间内连按可以实现不同的攻击动作。

在线查看：https://jxtreehouse.github.io/three.js-lessions/%E6%95%99%E7%A8%8B/examples/12_game_operation.html

![](/常用静态资源/img/game.gif)

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
# 3 人物模型和动画
## 3.1 添加人物模型
首先我们将模型导入到场景内，注意，案例中的模型比较大，加载和处理需要一定的时间，请小伙伴们耐心等待即可(实际案例里面可以加个loading动画)：

```
var loader = new THREE.FBXLoader();
        loader.load("../js/models/fbx/Naruto.fbx", function (mesh) {
            scene.add(mesh);
        });
```

我们不单单只是将模型添加到场景，还对模型的阴影和位置做了一下调整：
![](/常用静态资源/img/对模型添加阴影.png)
调整模型的位置，站立在草地上面

![](/常用静态资源/img/站在草地上.png)

设置灯光一直照射模型：

![](/常用静态资源/img/设置光线焦点模型.png)



##3.2 添加动画
![](/常用静态资源/img/fbx_naruto.png)

这个模型里面含有27个骨骼动画，我们可以通过设置不同的动画，来实现一整套的动作来实现相应的比如攻击效果，移动效果等。接下来我们通过模型的数据生成一下所需的动画：
![](/常用静态资源/img/创建动画.png)

模型加载成功后，我们需要让模型执行一个普通的站立效果：

![](/常用静态资源/img/模型站立.png)
## 3.3 添加操作
<b>我们主要添加了两种操作：模型位置移动操作和攻击效果。</b>

操作按钮为了方便，直接使用的dom标签模拟出来的。
模型位置移动操作中，我们需要模型的位置的变动和模型的朝向以及修改站立动画和奔跑动画的切换。
攻击效果则是实现攻击并且根据点击速度实现一整套的攻击动作切换。
### 3.3.1实现位置移动效果

在实现位置移动效果中，我们为按钮绑定了三个事件：鼠标按下，鼠标移动，鼠标抬起。
在鼠标按下时，我们获取到了当前操作圆盘的中心点的位置，让模型进入跑步动画，绑定了鼠标的移动和抬起事件。重要的是更新模型的移动方向和移动速度。

![](/常用静态资源/img/addStick.png)

上面的dop类是封装的一个兼容多端的事件库，github地址: https://github.com/johnson2heng/dop
在鼠标移动回调事件中，我们更新模型的移动方向和移动速度。

```
function move(event) {
    getRadian(event);
}
```
最后在鼠标抬起事件中，我们解绑事件，将按键复原，并停止掉模型的移动状态，将模型动画恢复到站立状态。
```
function up() {
    doc.remove("move", move);
    doc.remove("up", up);

    //按钮复原
    bar.style.marginTop = 0;
    barWrap.style.transform = `translate(-50%, -50%) rotate(0deg)`;
    bar.style.transform = `translate(-50%, -50%) rotate(0deg)`;

    //设置移动距离为零
    characterMove(new THREE.Vector2(), 0);

    //鼠标抬起切换站立状态
    state.skills === 0 && gui["action" + 24]();
}

```
三个事件绑定完成后，我们需要将在回调中获得的值求出当前的偏转方向和移动速度：
首先我们获取一下当前鼠标的位置：

```
if (media === "pc") {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}
else {
    mouse.x = event.touches[0].clientX;
    mouse.y = event.touches[0].clientY;
}

```
根据位置求出距离操作圆盘中心的位置，并保证最大值也不会超出圆盘的半径：
```
let distance = center.distanceTo(mouse);
distance >= parseFloat(dop.getFinalStyle(control, "width")) / 2 && (distance = parseFloat(dop.getFinalStyle(control, "width")) / 2);

```
计算出来当前位置和中心的夹角，并修改dom的位置：

```

//计算两点之间的夹角
mouse.x = mouse.x - center.x;
mouse.y = mouse.y - center.y;

//修改操作杆的css样式
bar.style.marginTop = `-${distance}px`;
bar.style.transform = `translate(-50%, -50%) rotate(-${(mouse.angle() / Math.PI * 180 + 90) % 360}deg)`;
barWrap.style.transform = `translate(-50%, -50%) rotate(${(mouse.angle() / Math.PI * 180 + 90) % 360}deg)`;

```
函数的最后，则调用的characterMove方法，将按钮数据转换成为模型实际需要移动的距离。
```
//修改当前的移动方向和移动速度
characterMove(mouse.normalize(), distance / (parseFloat(dop.getFinalStyle(control, "width")) / 2));
```

接下来我们查看一下characterMove方法，在这个方法中，我们计算出了模型每一帧需要移动的距离。这里有一个问题，我们所谓的操作杆向前让模型移动前方，其实是相机朝向的前方。所以我们需要先求出相机的前方矢量，再通过相机的前方矢量为基础，计算出来模型实际方向。
我们首先声明了两个变量，一个是旋转矩阵，另一个是移动矢量：
```
let direction = new THREE.Matrix4(); //当前移动的旋转矩阵
let move = new THREE.Vector3(); //当前位置移动的距离
```
在characterMove函数内，我们根据相机的四元数获得了旋转矩阵：
```
/重置矩阵
direction.identity();

//通过相机的四元数获取到相机的旋转矩阵
let quaternion = camera.quaternion;
direction.makeRotationFromQuaternion(quaternion);
```
然后通过旋转矩阵和当前的操作杆的方向通过相乘计算出来实际模型移动的方向：

```

//获取到操作杆的移动方向
move.x = vector.x;
move.y = 0;
move.z = vector.y;

//通过相机方向和操作杆获得最终角色的移动方向
move.applyMatrix4(direction);
move.normalize();
```

最后，通过比例和方向得出当前模型每一帧移动的距离，因为我们不需要修改模型y轴，所以实际上也只是修改两个轴的位置：

```
move.x = move.x * ratio * 10;
move.z = move.z * ratio * 10;
```

我们获取到了模型的每一帧移动的距离，还需要在帧循环中调用：

```
//如果模型添加成功，则每帧都移动角色位置
if (naruto) {
    //获取当前位置
    position.x += move.x;
    position.z += move.z;

    //修改模型位置
    naruto.position.x = position.x;
    naruto.position.z = position.z;

    //修改平衡光的位置
    light.position.x = position.x;
    light.position.z = position.z + 100;

    //修改相机位置
    camera.position.x = position.x;
    camera.position.z = position.z - 800;
}

```
当前的模型，灯光，和相机都会跟随移动，实现了，我们上面动图中的模型移动的效果。
### 3.3.2 实现攻击效果

在实现攻击效果时，我没有只是简单的实现一个普通的攻击，而是直接实现一套连招。
这一套连招是通过五个动作组成，在执行一个攻击动画时如果再次点击了攻击按钮，执行完这个攻击动画将不会切换到站立动画，而是直接切换到连招的下一个攻击动画中。
只要连续点按攻击按钮，模型将完成一整套的动作。实现这个效果，我们只是使用了一个简单的定时器即可实现，接下来我们通过代码了解一下实现过程。

在实现动画前，先设置一个连招的数组，将需要的动作添加到数组当中。我这里添加了五个手部攻击的效果：

```
let attackList = [12, 13, 14, 15, 16]; //连招的循序
let attackCombo = false; //是否连招，接下一个攻击
```
我们还设置了attackCombo设置当前是否可以连招的变量，这个变量state.skills值不为0时，将变为true。定时器每一次更新的时候，将判断attackCombo是否为true，在为true的状态下，将执行连招的下一个动作。否则，将停止连招。

```
//attackIndex 等于0，当前不处于攻击状态  不等于，当前处于攻击状态
if(state.skills === 0){
    state.skills++;
    gui["action" + attackList[state.skills-1]]();
    attackInterval = setInterval(function () {
        if(attackCombo){
            //如果设置了连招，上一个攻击动作完成后，进行下一个攻击动作
            state.skills++;
            //如果整套攻击动作已经执行完成，则清除定时器
            if(state.skills-1 >= attackList.length){
                closeAttack();
                return;
            }

            //进行下一个动作
            gui["action" + attackList[state.skills-1]]();

            attackCombo = false;
        }
        else{
            closeAttack();
        }
    }, naruto.animations[attackList[state.skills-1]].duration*1000);
}
else{
    attackCombo = true;
}

```
在关闭掉攻击动画的函数内，我们首先将state.skills设置为0，然后恢复到移动或者站立动画，最后清除掉定时器：

```
//关闭攻击状态
function closeAttack() {
    state.skills = 0;
    //根据状态设置是移动状态还是站立状态
    state.move ? gui["action" + 3]() :gui["action" + 24](); //回到站立状态
    clearInterval(attackInterval);
}

```

通过很简单的一些代码，我们就实现了一个复杂的连招效果。是不是很有成就感，这就是在最前面看到的那个操作gif的效果的案例
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
