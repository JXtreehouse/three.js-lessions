/*
 * @Author: AlexZ33
 * @Date: 2021-03-12 16:12:33
 * @LastEditTime: 2021-03-12 17:24:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @Reference: https://codepen.io/AlexZ33/pen/KKNbvvW?editors=1010
 * @FilePath: /three.js-lessions/教程/examples/stack-tower/src/index.ts
 */
// add styles
import './style.css';
// three.js
import * as THREE from 'three';
import gsap from "gsap";
import ky from "kyouka"
import {OrbitControls} from '@three-ts/orbit-controls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "https://cdn.skypack.dev/three@0.124.0/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import Stats from "three/examples/jsm/libs/stats.module";

const title = document.querySelector(".title");
const start = document.querySelector(".start")
const score = document.querySelector(".score");
const retry = document.querySelector(".retry");
const highScoreText = document.querySelector(".high-score");
let highScore = 0;

const calcAspect = (el: HTMLElement) => el.clientWidth / el.clientHeight;

class Base {
  debug: boolean;
  container: HTMLElement | null;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  rendererParams!:Record<string, any>;
  persp
  
}
// // create the scene
// const scene = new THREE.Scene();

// // create the camera
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer();

// // set size
// renderer.setSize(window.innerWidth, window.innerHeight);

// // add canvas to dom
// document.body.appendChild(renderer.domElement);

// // add axis to the scene
// const axis = new THREE.AxesHelper(10);

// scene.add(axis);

// // add lights
// const light = new THREE.DirectionalLight(0xffffff, 1.0);

// light.position.set(100, 100, 100);

// scene.add(light);

// const light2 = new THREE.DirectionalLight(0xffffff, 1.0);

// light2.position.set(-100, 100, -100);

// scene.add(light2);

// const material = new THREE.MeshBasicMaterial({
//   color: 0xaaaaaa,
//   wireframe: true,
// });

// // create a box and add it to the scene
// const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);

// scene.add(box);

// box.position.x = 0.5;
// box.rotation.y = 0.5;

// camera.position.x = 5;
// camera.position.y = 5;
// camera.position.z = 5;

// camera.lookAt(scene.position);

// function animate(): void {
//   requestAnimationFrame(animate);
//   render();
// }

// function render(): void {
//   const timer = 0.002 * Date.now();
//   box.position.y = 0.5 + 0.5 * Math.sin(timer);
//   box.rotation.x += 0.1;
//   renderer.render(scene, camera);
// }

// animate();
