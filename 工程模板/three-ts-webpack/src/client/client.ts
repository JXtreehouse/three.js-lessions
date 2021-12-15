/*
 * @Author: your name
 * @Date: 2021-12-15 16:54:32
 * @LastEditTime: 2021-12-15 19:33:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /three-ts-webpack/src/client/client.ts
 */
import * as THREE from 'three';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';


const scene: THREE.Scene = new THREE.Scene();


// 添加坐标
/** 
 *  Threejs里通过AxesHelper 类，可以创建一个可视化的三维坐标系
 * AxesHelper( size : Number )
 * 参数说明
 *      size -- 轴的线的大小，默认为 1
 * https://www.cnblogs.com/baby123/p/12191637.html
 * @type {*} */
const  axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);


// 添加光源
// https://www.hangge.com/blog/cache/detail_1810.html
var light = new THREE.AmbientLight()
scene.add(light)

// 添加相机
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    1000
);

// 添加渲染器
const renderer: THREE.WebGLRenderer = new THREE.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// const planeGeometry: THREE.PlaneGeometry = new THREE.PlaneGeometry(20, 10)//, 360, 180)
// const plane: THREE.Mesh = new THREE.Mesh(planeGeometry, new THREE.MeshPhongMaterial())
// plane.rotateX(-Math.PI / 2)
// //plane.position.y = -1.75
// scene.add(plane)

// 设置几何体：圆环面
const torusGeometry: THREE.TorusGeometry[] = [
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
    new THREE.TorusGeometry(),
  ];


  // 设置材质
  const material: (
    | THREE.MeshBasicMaterial
    | THREE.MeshLambertMaterial
    | THREE.MeshPhongMaterial
    | THREE.MeshPhysicalMaterial
    | THREE.MeshToonMaterial
  )[] = [
    new THREE.MeshBasicMaterial(),
    new THREE.MeshLambertMaterial(),
    new THREE.MeshPhongMaterial(),
    new THREE.MeshPhysicalMaterial({}),
    new THREE.MeshToonMaterial(),
  ];

  // 设置网格

  const torus: THREE.Mesh[] = [
    new THREE.Mesh(torusGeometry[0], material[0]),
    new THREE.Mesh(torusGeometry[1], material[1]),
    new THREE.Mesh(torusGeometry[2], material[2]),
    new THREE.Mesh(torusGeometry[3], material[3]),
    new THREE.Mesh(torusGeometry[4], material[4]),
  ];

  // 设置纹理
  const texture = new THREE.TextureLoader().load('images/grid_25.jpg');
  material[0].map = texture;
  material[1].map = texture;
  material[2].map = texture;
  material[3].map = texture;
  material[4].map = texture;
  
  torus[0].position.x = -8;
  torus[1].position.x = -4;
  torus[2].position.x = 0;
  torus[3].position.x = 4;
  torus[4].position.x = 8;
  
  scene.add(torus[0]);
  scene.add(torus[1]);
  scene.add(torus[2]);
  scene.add(torus[3]);
  scene.add(torus[4]);
  
  camera.position.z = 7;
  window.addEventListener('resize', onWindowResize, false);
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
    // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
    // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }

const stats = Stats();
document.body.appendChild(stats.dom);

function render () {

}

