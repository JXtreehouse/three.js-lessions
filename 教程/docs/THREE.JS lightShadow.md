<!--
 * @Author: your name
 * @Date: 2021-03-25 10:51:04
 * @LastEditTime: 2021-03-25 11:01:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREE.JS lightShadow.md
-->


#  THREE.PointLight(点光源)


点光源是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗。

点光源可以投射阴影

点光源的构造函数是：


# [LightShadow](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/lights/shadows/LightShadow)

在 PointLights 内部用于计算阴影，也可用作其他阴影类的基类。