<!--
 * @Author: your name
 * @Date: 2021-03-25 16:46:30
 * @LastEditTime: 2021-03-25 16:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /three.js-lessions/教程/docs/THREEJS中的数学计算.md
-->

# 坐标转换
将屏幕坐标转变成threejs空间坐标：

```
function transform (x,y) {
    let mouse = new THREE.Vector2();
    mouse.x = x -window.innerWidth / 2;
    mouse.y = window.innerHeight / 2 -y; 
    return mouse;
}

```

## 坐标增量转换
x方向增量，屏幕坐标和threejs坐标中相同，y增量相反。

```

let offset = {
    x:x - preX,
    y:preY - y
}
```

# 向量计算
https://teakki.com/pe/58b8e2fff0d40775548f376b