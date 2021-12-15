<!--
 * @Author: your name
 * @Date: 2021-12-15 18:57:15
 * @LastEditTime: 2021-12-15 19:00:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /docs/THREE.JS更新机制.md
-->
在大多数场景下，Threejs渲染的时候很多数据不需要每次渲染都要更新，只是在特定的情况下才更新。为了更好的渲染性能，Threejs设置了一套默认的更新机制，对于一些不经常更新的对象，three.js默认是不更新，如果有相关的更新发生，可以手动更新。

官方文档: [如何更新场景（How to update things）](https://threejs.org/docs/index.html#manual/zh/introduction/How-to-update-things)