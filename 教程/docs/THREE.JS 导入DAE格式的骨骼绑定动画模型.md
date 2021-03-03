<!--
 * @Author: your name
 * @Date: 2021-03-01 11:02:15
 * @LastEditTime: 2021-03-02 23:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREE.JS 导入DAE格式的骨骼绑定动画模型.md
-->
# 1.  预览
案例预览:

![](/常用静态资源/img/帝国士兵.gif)

# 2.  案例实现
案例图片会发现一个跳舞的帝国士兵，同样，这个模型也是来自官网。模型引入的方式也差不多，将上一节的STLloader.js 修改为ColladaLoader.js然后使用loader导入模型：

```
 loader.load("../lib/assets/models/collada/stormtrooper/stormtrooper.dae", function (mesh) {
            // 在回调中能够获得对象回调后，不要急于赶紧将模型导入到场景当中，而是先把模型打印一下，查看一下模型的数据结构，然后根据需求获取一下再导入
            console.log("=========查看导入的mesh============",mesh);
 }
```

但是我们从返回的对象里面查看，发现，并不是直接返回了一个object3D的对象，而是含有一些数据的对象：
![](/常用静态资源/img/dae_struct.png)

在对象中，我们发现了scene对象，则是我们需要导入到场景中的object3D对象，而骨骼动画则直接在animations数组当中。
通过查看对象，我们查到了我们需要的数据对象，那我们经过处理,继续导入

```
// 导入模型
var obj = mesh.scene; //获取到模型对象
obj.rotation.z += Math.PI; //让模型转身
scene.add(obj);

```

```
// 创建动画：
//AnimationMixer是场景中特定对象的动画播放器。当场景中的多个对象独立动画时，可以为每个对象使用一个AnimationMixer
mixer = new THREE.AnimationMixer(obj);

//mixer.clipAction 返回一个可以控制动画的AnimationAction对象  参数需要一个AnimationClip 对象
//AnimationAction.setDuration 设置一个循环所需要的时间，当前设置了一秒
//告诉AnimationAction启动该动作
action = mixer.clipAction(mesh.animations[0]);
action.play();

```
# 3. 案例代码

```
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style type="text/css">
        html, body {
            margin: 0;
            height: 100%;
        }

        canvas {
            display: block;
        }
    </style>
</head>

<body onload="draw();">
</body>
<script src="../lib/three.js"></script>
<script src="../lib/js/libs/inflate.min.js"></script>
<script src="../lib/js/loaders/ColladaLoader.js"></script>
<script src="../lib/js/controls/OrbitControls.js"></script>
<script src="../lib/js/libs/stats.min.js"></script>
<script src="../lib/js/libs/dat.gui.min.js"></script>
<script src="../lib/js/libs/Detector.js"></script>

<script>
    var renderer, camera, scene, gui, light,stats, controls,meshHelper, mixer,action;
    var clock = new THREE.Clock();
    console.log(clock)
    console.table(clock)
   
   function initRender() {
      renderer= new THREE.WebGLRenderer({
         antialias: true
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xeeeeee);
      renderer.shadowMap.enabled =  true;
      //告诉渲染器需要阴影效果
      document.body.appendChild(renderer.domElement);
   }

   function initCamera () {
      camera =  new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
      camera.position.set(5, 10, 15 );
   }

   function initScene() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xa0a0a0 );
        scene.fog = new THREE.Fog( 0xa0a0a0, 20, 100 );
    }

    //初始化dat.GUI简化试验流程
    function initGui() {
       // 声明一个保存需求修改的相关数据对象
       gui = {
         animation: true,
         helper: true //模型辅助线
       };
       var datGui = new dat.GUI();
       //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
       datGui.add(gui, "animation").onChange(function(e) {
           console.log('gui animation=============1', e)
          if(e) {
            action.play();
          } else {
             action.stop();
          }
       })

       datGui.add(gui, "helper").onChange(function (e) {
       console.log('gui helper=============2', e)
            meshHelper.visible = e;
        })

    }

    function initLight() {
        scene.add(new THREE.AmbientLight(0x444444));

        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 20, 10 );

        light.castShadow = true;
        light.shadow.camera.top = 10;
        light.shadow.camera.bottom = -10;
        light.shadow.camera.left = -10;
        light.shadow.camera.right = 10;

        //告诉平行光需要开启阴影投射
        light.castShadow = true;

        scene.add(light);
    }

 function initModel() {

        //辅助工具
        var helper = new THREE.AxesHelper(50);
        scene.add(helper);

        // 地板
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 200, 200 ), new THREE.MeshPhongMaterial( { color: 0xffffff, depthWrite: false } ) );
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );

        //添加地板割线
        var grid = new THREE.GridHelper( 200, 50, 0x000000, 0x000000 );
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add( grid );
        //加载模型
        var loader = new THREE.ColladaLoader();
       loader.load("../lib/assets/models/collada/stormtrooper/stormtrooper.dae", function (mesh) {
            // 在回调中能够获得对象回调后，不要急于赶紧将模型导入到场景当中，而是先把模型打印一下，查看一下模型的数据结构，然后根据需求获取一下再导入
            console.log("=========查看导入的mesh============",mesh);
            // 导入模型
            var obj = mesh.scene; //获取到模型对象

            //添加骨骼辅助
            meshHelper = new THREE.SkeletonHelper(obj);
            scene.add(meshHelper);

            //设置模型的每个部位都可以投影
            obj.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );

            // 创建动画:
            //AnimationMixer是场景中特定对象的动画播放器。当场景中的多个对象独立动画时，可以为每个对象使用一个AnimationMixer
            mixer = obj.mixer = new THREE.AnimationMixer(obj);

            //mixer.clipAction 返回一个可以控制动画的AnimationAction对象  参数需要一个AnimationClip 对象
            //AnimationAction.setDuration 设置一个循环所需要的时间，当前设置了一秒
            //告诉AnimationAction启动该动作
            action = mixer.clipAction(mesh.animations[0]);
            action.play();

            obj.rotation.z += Math.PI;

            scene.add(obj);
        });
    }

//初始化性能插件
    function initStats() {
        stats = new Stats();
        document.body.appendChild(stats.dom);
    }

    function initControls() {

        controls = new THREE.OrbitControls(camera, renderer.domElement);
        //设置控制器的中心点
        //controls.target.set( 0, 100, 0 );
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        //设置相机距离原点的最远距离
        controls.minDistance = 1;
        //设置相机距离原点的最远距离
        controls.maxDistance = 2000;
        //是否开启右键拖拽
        controls.enablePan = true;
    }

    function render() {

        var time = clock.getDelta();
        if (mixer) {
            mixer.update(time);
        }

        controls.update();
    }

    //窗口变动触发的函数
    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function animate() {
        //更新控制器
        render();

        //更新性能插件
        stats.update();

        renderer.render(scene, camera);

        requestAnimationFrame(animate);
    }
  function draw(){
     //兼容性判断
        if (!Detector.webgl) Detector.addGetWebGLMessage();

        initGui();
        initRender();
        initScene();
        initCamera();
        initLight();
        initModel();
        initControls();
        initStats();

        animate();
        window.onresize = onWindowResize;

  }

</script>
</html>
```
代码仓库: 　https://github.com/JXtreehouse/three.js-lessions/blob/develop/%E6%95%99%E7%A8%8B/examples/10_import_dae_bone_binding_animation_model.html

关于此段知识相关解释可直接看 <b>标题6 加载外部模型骨骼动画</b>
# 4. DAE模型
DAE是一种3D模型

DAE,即Collada，collada是一个开放的标准，最初用于3D软件数据交换，由SCEA发起，现在则被许多著名厂家支持如Autodesk、XSI等。目前的3D工具，如3dsmax、maya、blender等均支持导出collada格式文件,你需要做的是下载对应工具的导出插件

3Dmax 与 maya 需要安装 dae输出 插件才可 输出成后缀为.dae的文件


<b>dae是纯文本的模型格式，其本质就是一个单纯的xml文件。相比fbx，对dae格式模型的载入我们拥有非常高的自由控制，但是我们也必须承担读取和分析数据信息这一工作——这也是最复杂的地方。</b>

另外　dae模型文件支持3D动画的编辑和写入。

谷歌地球的模型就是DAE。

类似模型除了自己制作也可以到一些免费网站下载（无版权纠纷）
- https://free3d.com/



# 5. 骨骼动画
![](/常用静态资源/img/骨骼动画.gif)

所谓骨骼动画，以人体为例简单地说，人体的骨骼运动，骨骼运动会带动肌肉和人体皮肤的空间移动和表面变化，下面将会提到的蒙皮概念你可以类比人体的皮肤。

Threejs骨骼动画需要通过骨骼网格模型类[SkinnedMesh](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/SkinnedMesh)来实现，一般来说骨骼动画模型都是3D美术创建，然后程序员通过threejs引擎加载解析，为了让大家更深入理解骨骼动画，下面就通过threejs程序编写一个简易的骨骼动画。

- 蒙皮网格（SkinnedMesh）文档: http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/SkinnedMesh

![](/常用静态资源/img/skinedmesh.png)


## 5.1 相关类

直接使用Threejs编写一个骨骼动画还是比较复杂的，你首先应该了解骨头关节[Bone](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Bone)、骨骼网格模型[SkinnedMesh](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/SkinnedMesh)、骨架对象[Skeleton](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Skeleton)这三个骨骼相关的类，除此之外还需要了解几何体[Geometry](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/core/Geometry)和骨骼动画相关的顶点数据。

![](/常用静态资源/img/bone.png)

![](/常用静态资源/img/skinedmeshtree.png)

## 5.2  Bone

通过Bone类可以实例化一个骨关节对象，然后通过多个骨关节对象可以构成一个骨骼层级系统，Bone基类是Object3D,可以通过add方法给一个骨关节对象Bone添加一个子骨关节Bone

```
var Bone1 = new THREE.Bone(); //关节1，用来作为根关节
var Bone2 = new THREE.Bone(); //关节2
var Bone3 = new THREE.Bone(); //关节3

// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);
// 设置关节之间的相对位置
//根关节Bone1默认位置是(0,0,0)
Bone2.position.y = 60; //Bone2相对父对象Bone1位置
Bone3.position.y = 40; //Bone3相对父对象Bone2位置
```

## 5.2  骨架Skeleton

Threejs通过[Skeleton](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/Skeleton)类可以把所有骨关节对象Bone包含进来。

```
// 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
var skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]); //创建骨骼系统
// 查看.bones属性中所有骨关节Bone
console.log(skeleton.bones);
// 返回所有关节的世界坐标
skeleton.bones.forEach(elem => {
  console.log(elem.getWorldPosition(new THREE.Vector3()));
});

```
![](/常用静态资源/img/skeleton.png)

## 5.3 Geometry(.skinWeights和.skinIndices属性)

几何体Geometry的属性`.skinWeights`和`.skinIndices`主要作用是用来设置几何体的顶点位置是如何受骨关节运动影响的。比如几何体Geometry的顶点位置数据是你皮肤上的一个个点位，如果你的骨关节运动了，你的皮肤外形会跟着变化，就相当于Geometry的顶点坐标需要跟着骨关节变化，这时候需要注意，关节外面包裹的一层皮肤，不同区域变形程度不同，那也就是说如果骨关节Bone变化了，几何体Geometry顶点要像皮肤一样不同区域的顶点变化程度不同。这也正是.skinWeights和.skinIndices属性出现的原因，.skinWeights的字面意思就是设置骨骼蒙皮的权重。

![](/常用静态资源/img/.skinweight.png)

## 5.4 骨骼网格模型SkinnedMesh
[SkinnedMesh](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/SkinnedMesh)类的字面意思就是骨骼网格模型，骨骼网格模型SkinnedMesh的基类是普通网格模型Mesh，SkinnedMesh和Mesh一样都是网格模型，只是一个有骨骼动画功能，一个没有骨骼动画功能。

骨骼网格模型SkinnedMesh绑定骨骼系统。

```
//骨骼关联网格模型
SkinnedMesh.add(Bone1); //根骨头关节添加到网格模型
SkinnedMesh.bind(skeleton); //网格模型绑定到骨骼系统
```

## 5.5 程序创建一个骨骼动画
下面的的代码通过SkinnedMesh构造函数创建一个骨骼动画，如果你想深入理解骨骼动画可以研究一下下面的代码，下面代码还是比较复杂的，涉及到的知识点比较多，如果不想深入研究，可以大致看下有个印象，直接学习下一节，实际开发的时候，只需要会加载解析骨骼动画就可以。

```
/**
 * 创建骨骼网格模型SkinnedMesh
 */
// 创建一个圆柱几何体，高度120，顶点坐标y分量范围[-60,60]
var geometry = new THREE.CylinderGeometry(5, 10, 120, 50, 300);
geometry.translate(0, 60, 0); //平移后，y分量范围[0,120]
console.log("name", geometry.vertices); //控制台查看顶点坐标
//
/**
 * 设置几何体对象Geometry的蒙皮索引skinIndices、权重skinWeights属性
 * 实现一个模拟腿部骨骼运动的效果
 */
//遍历几何体顶点，为每一个顶点设置蒙皮索引、权重属性
//根据y来分段，0~60一段、60~100一段、100~120一段
for (var i = 0; i < geometry.vertices.length; i++) {
  var vertex = geometry.vertices[i]; //第i个顶点
  if (vertex.y <= 60) {
    // 设置每个顶点蒙皮索引属性  受根关节Bone1影响
    geometry.skinIndices.push(new THREE.Vector4(0, 0, 0, 0));
    // 设置每个顶点蒙皮权重属性
    // 影响该顶点关节Bone1对应权重是1-vertex.y/60
    geometry.skinWeights.push(new THREE.Vector4(1 - vertex.y / 60, 0, 0, 0));
  } else if (60 < vertex.y && vertex.y <= 60 + 40) {
    // Vector4(1, 0, 0, 0)表示对应顶点受关节Bone2影响
    geometry.skinIndices.push(new THREE.Vector4(1, 0, 0, 0));
    // 影响该顶点关节Bone2对应权重是1-(vertex.y-60)/40
    geometry.skinWeights.push(new THREE.Vector4(1 - (vertex.y - 60) / 40, 0, 0, 0));
  } else if (60 + 40 < vertex.y && vertex.y <= 60 + 40 + 20) {
    // Vector4(2, 0, 0, 0)表示对应顶点受关节Bone3影响
    geometry.skinIndices.push(new THREE.Vector4(2, 0, 0, 0));
    // 影响该顶点关节Bone3对应权重是1-(vertex.y-100)/20
    geometry.skinWeights.push(new THREE.Vector4(1 - (vertex.y - 100) / 20, 0, 0, 0));
  }
}
// 材质对象
var material = new THREE.MeshPhongMaterial({
  skinning: true, //允许蒙皮动画
  // wireframe:true,
});
// 创建骨骼网格模型
var SkinnedMesh = new THREE.SkinnedMesh(geometry, material);
SkinnedMesh.position.set(50, 120, 50); //设置网格模型位置
SkinnedMesh.rotateX(Math.PI); //旋转网格模型
scene.add(SkinnedMesh); //网格模型添加到场景中

/**
 * 骨骼系统
 */
var Bone1 = new THREE.Bone(); //关节1，用来作为根关节
var Bone2 = new THREE.Bone(); //关节2
var Bone3 = new THREE.Bone(); //关节3
// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);
// 设置关节之间的相对位置
//根关节Bone1默认位置是(0,0,0)
Bone2.position.y = 60; //Bone2相对父对象Bone1位置
Bone3.position.y = 40; //Bone3相对父对象Bone2位置

// 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
var skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]); //创建骨骼系统
// console.log(skeleton.bones);
// 返回所有关节的世界坐标
// skeleton.bones.forEach(elem => {
//   console.log(elem.getWorldPosition(new THREE.Vector3()));
// });
//骨骼关联网格模型
SkinnedMesh.add(Bone1); //根骨头关节添加到网格模型
SkinnedMesh.bind(skeleton); //网格模型绑定到骨骼系统
console.log(SkinnedMesh);
/**
 * 骨骼辅助显示
 */
var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
scene.add(skeletonHelper);

// 转动关节带动骨骼网格模型出现弯曲效果  好像腿弯曲一样
skeleton.bones[1].rotation.x = 0.5;
skeleton.bones[2].rotation.x = 0.5;
```

## 5.5 程序实现骨骼动画

通过骨骼骨骼系统代码实现骨骼动画效果。

```

var n = 0;
var T = 50;
var step = 0.01;
// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  n += 1;
  if (n < T) {
    // 改变骨关节角度
    skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x - step;
    skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x + step;
    skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x + 2 * step;
  }
  if (n < 2 * T && n > T) {
    skeleton.bones[0].rotation.x = skeleton.bones[0].rotation.x + step;
    skeleton.bones[1].rotation.x = skeleton.bones[1].rotation.x - step;
    skeleton.bones[2].rotation.x = skeleton.bones[2].rotation.x - 2 * step;
  }
  if (n === 2 * T) {
    n = 0;
  }
}
render()
```

## 5.6 解析外部骨骼动画模型

开发的时候，3D美术如果导出一个包含骨骼动画数据的三维模型，你可以通过下面的代码进行加载解析，查看骨骼动画的运动效果。

骨骼动画除了需要创建一个骨骼动画模型SkinnedMesh外，还需要通过帧动画存储相关的关节动画数据。

```
var mixer = null; //声明一个混合器变量
loader.load("./marine_anims_core.json", function(obj) {
  console.log(obj)
  scene.add(obj); //添加到场景中
  //从返回对象获得骨骼网格模型
  var SkinnedMesh = obj.children[0];
  //骨骼网格模型作为参数创建一个混合器
  mixer = new THREE.AnimationMixer(SkinnedMesh);
  // 查看骨骼网格模型的帧动画数据
  // console.log(SkinnedMesh.geometry.animations)
  // 解析跑步状态对应剪辑对象clip中的关键帧数据
  var AnimationAction = mixer.clipAction(SkinnedMesh.geometry.animations[1]);
  // 解析步行状态对应剪辑对象clip中的关键帧数据
  // var AnimationAction = mixer.clipAction(SkinnedMesh.geometry.animations[3]);
  AnimationAction.play();

  // 骨骼辅助显示
  // var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
  // scene.add(skeletonHelper);
})
```
```
// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 渲染函数
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);

  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}
render();
```

## 5.7 皮肤顶点权重属性.skinWeights
.skinWeights表示的是几何体顶点权重数据，当使用骨骼动画网格模型SkinnedMesh的时候, 每个顶点最多可以有4个骨关节Bone影响它. skinWeights属性是一个权重值数组，对应于几何体中顶点的顺序。 例如，第一个skinWeight将对应于几何体中的第一个顶点. 由于每个顶点可以被4个骨关节Bone修改，因此使用四维向量对象Vector4表示一个顶点的权重.

四维向量Vector4每个分量的值通常应在0和1之间。当设置为0时，骨关节Bone变换将不起作用；设置为0.5时，将产生50％的影响；设置为100％时，会产生100％的影响。 如果只有一个骨关节Bone与顶点关联，那么你只需要考虑设置四维向量Vector4的第一个分量，其余分量的可以忽略并设置为0.

## 5.8 顶点索引属性.skinIndices
顶点索引属性.skinIndices就像skinWeights属性一样，skinIndices的值对应几何体的顶点. 每个顶点最多可以有4个与之关联的骨关节Bone。

## 5.9 骨骼动画顶点数据
骨骼动画的相关的一些顶点数据，主要是描述几何体表面的顶点数据是如何受骨骼系统关节运动影响的。加载外部模型你可以访问骨骼动画网格模型的几何体对象查看骨骼动画相关顶点数据。网格模型的几何体类型可能是Geometry,也可能是BufferGeometry，一般是缓冲类型的几何体BufferGeometry比较常见。

Geometry的骨骼动画顶点数据，直接查看.skinWeights和.skinIndices属性

```
console.log('骨骼动画皮肤顶点权重数据',SkinnedMesh.geometry.skinWeights);
console.log('骨骼动画皮肤顶点索引数据',SkinnedMesh.geometry.skinIndices);
```
BufferGeometry的骨骼动画顶点数据，如果你熟悉BufferGeometry的结构，应该都知道该几何体通过.attributes属性存储各种顶点数据。

```
console.log('骨骼动画皮肤顶点权重数据',SkinnedMesh.geometry.attributes.skinWeights);
console.log('骨骼动画皮肤顶点索引数据',SkinnedMesh.geometry.attributes.skinIndices);
```
#6 . 加载外部模型骨骼动画
上面讲了通过Threejs程序创建一个骨骼动画然后解析播放，这里讲加载解析一个外部的骨骼动画模型文件。本章最开始就是导入的一个DAE格式的文件，这里换一个格式，使用json格式

![](/常用静态资源/img/run.gif)

## 6.1 查看骨骼动画数据
在解析模型骨骼动画之前，先加载外部的三维模型，查看骨骼动画相关的数据，这样便于大家理解

```
// 通过加载器ObjectLoader加载./marine_anims_core.json模型文件
var loader = new THREE.ObjectLoader();
loader.load("./marine_anims_core.json", function(obj) {
  console.log(obj);//浏览器控制台查看加载返回的结果
  scene.add(obj); //添加到场景中
})
```

你可以在上面回调函数中分别插入下面代码进行测试。

```
//从返回对象获得骨骼网格模型
SkinnedMesh = obj.children[0];
// 查看骨头关节Bone
console.log(SkinnedMesh.skeleton.bones);
```

```
// 骨骼辅助显示
var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
scene.add(skeletonHelper);
```

```

// 遍历骨骼模型中的骨关节Bone，并获得世界坐标
SkinnedMesh.traverse(function(elem) {
  if (elem.type === 'Bone') {
    console.log(elem.getWorldPosition(new THREE.Vector3()));
  }
});
```

## 6.2 解析渲染骨骼动画

下面关于骨骼动画解析的代码

```

var loader = new THREE.ObjectLoader(); //创建一个加载器
var mixer = null; //声明一个混合器变量
loader.load("./marine_anims_core.json", function(obj) {
  scene.add(obj); //添加到场景中
  //从返回对象获得骨骼网格模型
  var SkinnedMesh = obj.children[0];
  //骨骼网格模型作为参数创建一个混合器
  mixer = new THREE.AnimationMixer(SkinnedMesh);
  // 查看骨骼网格模型的帧动画数据
  // console.log(SkinnedMesh.geometry.animations)
  // 解析跑步状态对应剪辑对象clip中的关键帧数据
  var AnimationAction = mixer.clipAction(SkinnedMesh.geometry.animations[1]);
  // 解析步行状态对应剪辑对象clip中的关键帧数据
  // var AnimationAction = mixer.clipAction(SkinnedMesh.geometry.animations[3]);
  AnimationAction.play();

  // 骨骼辅助显示
  // var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
  // scene.add(skeletonHelper);
})
```

```
// 创建一个时钟对象Clock
var clock = new THREE.Clock();
// 渲染函数
function render() {
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  if (mixer !== null) {
    //clock.getDelta()方法获得两帧的时间间隔
    // 更新混合器相关的时间
    mixer.update(clock.getDelta());
  }
}
render();
```

# 参考
[Three.js零基础入门](http://www.yanhuangxueyuan.com/Three.js/)

[官方文档Loading 3D models](https://threejs.org/docs/#manual/en/introduction/Loading-3D-models)