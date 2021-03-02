<!--
 * @Author: your name
 * @Date: 2021-03-01 11:02:15
 * @LastEditTime: 2021-03-01 21:24:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREE.JS 导入DAE格式的骨骼绑定动画模型.md
-->

# 1. DAE模型
DAE是一种3D模型

DAE,即Collada，collada是一个开放的标准，最初用于3D软件数据交换，由SCEA发起，现在则被许多著名厂家支持如Autodesk、XSI等。目前的3D工具，如3dsmax、maya、blender等均支持导出collada格式文件,你需要做的是下载对应工具的导出插件

3Dmax 与 maya 需要安装 dae输出 插件才可 输出成后缀为.dae的文件


<b>dae是纯文本的模型格式，其本质就是一个单纯的xml文件。相比fbx，对dae格式模型的载入我们拥有非常高的自由控制，但是我们也必须承担读取和分析数据信息这一工作——这也是最复杂的地方。</b>

另外　dae模型文件支持3D动画的编辑和写入。

谷歌地球的模型就是DAE。

类似模型除了自己制作也可以到一些免费网站下载（无版权纠纷）
- https://free3d.com/

## 

# 2. 骨骼动画
![](/常用静态资源/img/骨骼动画.gif)

所谓骨骼动画，以人体为例简单地说，人体的骨骼运动，骨骼运动会带动肌肉和人体皮肤的空间移动和表面变化，下面将会提到的蒙皮概念你可以类比人体的皮肤。

Threejs骨骼动画需要通过骨骼网格模型类SkinnedMesh来实现，一般来说骨骼动画模型都是3D美术创建，然后程序员通过threejs引擎加载解析，为了让大家更深入理解骨骼动画，下面就通过threejs程序编写一个简易的骨骼动画。

- 蒙皮网格（SkinnedMesh）文档: http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/objects/SkinnedMesh

![](/常用静态资源/img/skinedmesh.png)
