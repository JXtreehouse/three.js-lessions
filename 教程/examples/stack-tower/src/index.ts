/*
 * @Author: AlexZ33
 * @Date: 2021-03-12 16:12:33
 * @LastEditTime: 2021-03-16 19:32:27
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
  rendererParams!: Record<string, any>;
  perspectiveCameraParams!: Record<string, any>;
  orthographicCameraParams!: Record<string, any>;
  cameraPosition!: THREE.Vector3;
  lookAtPosition!: THREE.Vector3;
  renderer!: THREE.WebGLRenderer;
  controls!: OrbitControls;
  mousePos!: THREE.Vector2;
  raycaster!: THREE.Raycaster;
  sound!: THREE.Audio;
  stats!: Stats;
  composer!: EffectComposer;
  constructor(sel: string, debug = false) {
    this.debug = debug;
    this.container = document.querySelector(sel);
    this.perspectiveCameraParams = {
      fov: 75,
      near: 0.1,
      far: 100
    };
    this.orthographicCameraParams = {
      zoom: 2,
      near: -100,
      far: 1000
    };
    this.cameraPosition = new THREE.Vector3(0, 3, 10);
    this.lookAtPosition = new THREE.Vector3(0, 0, 0);
    this.rendererParams = {
      outputEncoding: THREE.LinearEncoding,
      config: {
        alpha: true,
        antialias: true
      }
    };
    this.mousePos = new THREE.Vector2(0, 0);
  }
  // 初始化
  init() {
    this.createScene();
    this.createPerspectiveCamera();
    this.createRenderer();
    this.createMesh({});
    this.createLight();
    this.createOrbitControls();
    this.addListeners();
    this.setLoop();
  }
  // 创建场景
  createScene() {
    const scene = new THREE.Scene();
    if (this.debug) {
      scene.add(new THREE.AxesHelper());
      const stats = Stats();
      this.container!.appendChild(stats.dom);
      this.stats = stats;
    }
    this.scene = scene;
  }
  // 创建透视相机
  createPerspectiveCamera() {
    const { perspectiveCameraParams, cameraPosition, lookAtPosition } = this;
    const { fov, near, far } = perspectiveCameraParams;
    const aspect = calcAspect(this.container!);
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.copy(cameraPosition);
    camera.lookAt(lookAtPosition);
    this.camera = camera;
  }
  // 创建正交相机
  createOrthographicCamera() {
    const { orthographicCameraParams, cameraPosition, lookAtPosition } = this;
    const { left, right, top, bottom, near, far } = orthographicCameraParams;
    const camera = new THREE.OrthographicCamera(
      left,
      right,
      top,
      bottom,
      near,
      far
    );
    camera.position.copy(cameraPosition);
    camera.lookAt(lookAtPosition);
    this.camera = camera;
  }
  // 更新正交相机参数
  updateOrthographicCameraParams() {
    const { container } = this;
    const { zoom, near, far } = this.orthographicCameraParams;
    const aspect = calcAspect(container!);
    this.orthographicCameraParams = {
      left: -zoom * aspect,
      right: zoom * aspect,
      top: zoom,
      bottom: -zoom,
      near,
      far,
      zoom
    };
  }
  // 创建渲染
  createRenderer() {
    const { rendererParams } = this;
    const { outputEncoding, config } = rendererParams;
    const renderer = new THREE.WebGLRenderer(config);
    renderer.setSize(this.container!.clientWidth, this.container!.clientHeight);
    renderer.outputEncoding = outputEncoding;
    this.resizeRendererToDisplaySize();
    this.container?.appendChild(renderer.domElement);
    this.renderer = renderer;
    this.renderer.setClearColor(0x000000, 0);
  }
  // 允许投影
  enableShadow() {
    this.renderer.shadowMap.enabled = true;
  }
  // 调整渲染器尺寸
  resizeRendererToDisplaySize() {
    const { renderer } = this;
    if (!renderer) {
      return;
    }
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const { clientWidth, clientHeight } = canvas;
    const width = (clientWidth * pixelRatio) | 0;
    const height = (clientHeight * pixelRatio) | 0;
    const isResizeNeeded = canvas.width !== width || canvas.height !== height;
    if (isResizeNeeded) {
      renderer.setSize(width, height, false);
    }
    return isResizeNeeded;
  }
  // 创建网格
  createMesh(
    meshObject: MeshObject,
    container: THREE.Scene | THREE.Mesh = this.scene
  ) {
    const {
      geometry = new THREE.BoxGeometry(1, 1, 1),
      material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#d9dfc8")
      }),
      position = new THREE.Vector3(0, 0, 0)
    } = meshObject;
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    container.add(mesh);
    return mesh;
  }
  // 创建光源
  createLight() {
    const dirLight = new THREE.DirectionalLight(
      new THREE.Color("#ffffff"),
      0.5
    );
    dirLight.position.set(0, 50, 0);
    this.scene.add(dirLight);
    const ambiLight = new THREE.AmbientLight(new THREE.Color("#ffffff"), 0.4);
    this.scene.add(ambiLight);
  }
  // 创建轨道控制
  createOrbitControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    const { lookAtPosition } = this;
    controls.target.copy(lookAtPosition);
    controls.update();
    this.controls = controls;
  }
  // 监听事件
  addListeners() {
    this.onResize();
  }
  // 监听画面缩放
  onResize() {
    window.addEventListener("resize", (e) => {
      if (this.camera instanceof THREE.PerspectiveCamera) {
        const aspect = calcAspect(this.container!);
        const camera = this.camera as THREE.PerspectiveCamera;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
      } else if (this.camera instanceof THREE.OrthographicCamera) {
        this.updateOrthographicCameraParams();
        const camera = this.camera as THREE.OrthographicCamera;
        const {
          left,
          right,
          top,
          bottom,
          near,
          far
        } = this.orthographicCameraParams;
        camera.left = left;
        camera.right = right;
        camera.top = top;
        camera.bottom = bottom;
        camera.near = near;
        camera.far = far;
        camera.updateProjectionMatrix();
      }
      this.renderer.setSize(
        this.container!.clientWidth,
        this.container!.clientHeight
      );
    });
  }
  // 动画
  update() {
    console.log("animation");
  }
  // 渲染
  setLoop() {
    this.renderer.setAnimationLoop(() => {
      this.resizeRendererToDisplaySize();
      this.update();
      if (this.controls) {
        this.controls.update();
      }
      if (this.stats) {
        this.stats.update();
      }
      if (this.composer) {
        this.composer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
    });
  }
  // 创建文本
  createText(
    text = "",
    config: THREE.TextGeometryParameters,
    material: THREE.Material = new THREE.MeshStandardMaterial({
      color: "#ffffff"
    })
  ) {
    const geo = new THREE.TextGeometry(text, config);
    const mesh = new THREE.Mesh(geo, material);
    return mesh;
  }
  // 创建音效源
  createAudioSource() {
    const listener = new THREE.AudioListener();
    this.camera.add(listener);
    const sound = new THREE.Audio(listener);
    this.sound = sound;
  }
  // 加载音效
  loadAudio(url: string): Promise<AudioBuffer> {
    const loader = new THREE.AudioLoader();
    return new Promise((resolve) => {
      loader.load(url, (buffer) => {
        this.sound.setBuffer(buffer);
        resolve(buffer);
      });
    });
  }
  // 加载模型
  loadModel(url: string): Promise<THREE.Object3D> {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          resolve(model);
        },
        undefined,
        (err) => {
          console.log(err);
          reject();
        }
      );
    });
  }
  // 加载FBX模型
  loadFBXModel(url: string): Promise<THREE.Object3D> {
    const loader = new FBXLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (obj) => {
          resolve(obj);
        },
        undefined,
        (err) => {
          console.log(err);
          reject();
        }
      );
    });
  }
  // 加载字体
  loadFont(url: string): Promise<THREE.Font> {
    const loader = new THREE.FontLoader();
    return new Promise((resolve) => {
      loader.load(url, (font) => {
        resolve(font);
      });
    });
  }
  // 创建点选模型
  createRaycaster() {
    this.raycaster = new THREE.Raycaster();
    this.trackMousePos();
  }
  // 追踪鼠标位置
  trackMousePos() {
    window.addEventListener("mousemove", (e) => {
      this.setMousePos(e);
    });
    window.addEventListener("mouseout", () => {
      this.clearMousePos();
    });
    window.addEventListener("mouseleave", () => {
      this.clearMousePos();
    });
    window.addEventListener(
      "touchstart",
      (e: TouchEvent) => {
        e.preventDefault();
        this.setMousePos(e.touches[0]);
      },
      { passive: false }
    );
    window.addEventListener("touchmove", (e: TouchEvent) => {
      this.setMousePos(e.touches[0]);
    });
    window.addEventListener("touchend", () => {
      this.clearMousePos();
    });
  }
  // 设置鼠标位置
  setMousePos(e: MouseEvent | Touch) {
    const { x, y } = getNormalizedMousePos(e);
    this.mousePos.x = x;
    this.mousePos.y = y;
  }
  // 清空鼠标位置
  clearMousePos() {
    this.mousePos.x = -100000;
    this.mousePos.y = -100000;
  }
  // 获取点击物
  getInterSects(): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    const intersects = this.raycaster.intersectObjects(
      this.scene.children,
      true
    );
    return intersects;
  }
  // 选中点击物时
  onChooseIntersect(target: THREE.Object3D) {
    const intersects = this.getInterSects();
    const intersect = intersects[0];
    if (!intersect || !intersect.face) {
      return null;
    }
    const { object } = intersect;
    return target === object ? intersect : null;
  }
}

class Stack extends Base {
  box: THREE.Mesh;
  colorOffset: number; // 颜色偏移量
  boxParams: Record<string, any>; // 方块属性参数
  level: number; // 关卡
  moveLimit: number; // 移动上限
  moveAxis: "x" | "z"; // 移动所沿的轴
  moveEdge: "width" | "depth"; // 移动的边
  currentY: number; // 当前的y轴高度
  state: string; // 状态：paused - 静止；running - 运动
  speed: number; // 移动速度
  speedInc: number; // 速度增量
  speedLimit: number; // 速度上限
  gamestart: boolean; // 游戏开始
  gameover: boolean; // 游戏结束
  constructor(sel: string, debug: boolean) {
    super(sel, debug);
    this.colorOffset = ky.randomIntegerInRange(0, 255);
    this.boxParams = {
      width: 1,
      height: 0.2,
      depth: 1,
      x: 0,
      y: 0,
      z: 0,
      color: new THREE.Color("#d9dfc8")
    };
    this.cameraPosition = new THREE.Vector3(2, 2, 2);
    this.updateOrthographicCameraParams();
    this.level = 0;
    this.moveLimit = 1.2;
    this.moveAxis = "x";
    this.moveEdge = "width";
    this.currentY = 0;
    this.state = "paused";
    this.speed = 0.02;
    this.speedInc = 0.0005;
    this.speedLimit = 0.05;
    this.gamestart = false;
    this.gameover = false;
  }
  // 初始化
  init() {
    this.createScene();
    this.createOrthographicCamera();
    this.createRenderer();
    this.updateColor();
    this.createBase();
    this.createLight();
    this.addListeners();
    this.setLoop();
  }
  // 创建盒子
  createBox(boxParams: Record<string, any>) {
    const { width, height, depth, x, y, z, color } = boxParams;
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshToonMaterial({
      color,
      flatShading: true
    });
    const position = new THREE.Vector3(x, y, z);
    const box = this.createMesh({
      geometry,
      material,
      position
    });
    return box;
  }
  // 创建底座
  createBase() {
    const baseParams = { ...this.boxParams };
    const baseHeight = 2.5;
    baseParams.height = baseHeight;
    baseParams.y -= (baseHeight - this.boxParams.height) / 2;
    const base = this.createBox(baseParams);
    this.box = base;
  }
  // 更新颜色
  updateColor() {
    const { level, colorOffset } = this;
    const colorValue = (level + colorOffset) * 0.25;
    const r = (Math.sin(colorValue) * 55 + 200) / 255;
    const g = (Math.sin(colorValue + 2) * 55 + 200) / 255;
    const b = (Math.sin(colorValue + 4) * 55 + 200) / 255;
    this.boxParams.color = new THREE.Color(r, g, b);
  }
  // 开始游戏
  start() {
    title.classList.add("opacity-0");
    start.classList.add("opacity-0");
    this.gamestart = true;
    this.startNextLevel();
  }
  // 开始下一关
  startNextLevel() {
    this.level += 1;
    score.textContent = `${this.level - 1}`;
    // 确定移动轴和移动边：奇数x；偶数z
    this.moveAxis = ky.isOdd(this.level) ? "x" : "z";
    this.moveEdge = ky.isOdd(this.level) ? "width" : "depth";
    // 增加方块生成的高度
    this.currentY += this.boxParams.height;
    // 增加方块的速度
    if (this.speed <= this.speedLimit) {
      this.speed += this.speedInc;
    }
    this.updateColor();
    const boxParams = { ...this.boxParams };
    boxParams.y = this.currentY;
    const box = this.createBox(boxParams);
    this.box = box;
    // 确定初始移动位置
    this.box.position[this.moveAxis] = this.moveLimit * -1;
    this.state = "running";
    if (this.level > 1) {
      this.updateCameraHeight();
    }
  }
  // 更新相机高度
  updateCameraHeight() {
    this.cameraPosition.y += this.boxParams.height;
    this.lookAtPosition.y += this.boxParams.height;
    gsap.to(this.camera.position, {
      y: this.cameraPosition.y,
      duration: 0.4
    });
    gsap.to(this.camera.lookAt, {
      y: this.lookAtPosition.y,
      duration: 0.4
    });
  }
  // 动画
  update() {
    if (this.state === "running") {
      const { moveAxis } = this;
      this.box.position[moveAxis] += this.speed;
      // 移到末端就反转方向
      if (Math.abs(this.box.position[moveAxis]) > this.moveLimit) {
        this.speed = this.speed * -1;
      }
    }
  }
  // 事件监听
  addListeners() {
    this.onResize();
    if (this.debug) {
      this.onKeyDown();
    } else {
      this.onClick();
    }
  }
  // 监听点击
  onClick() {
    this.renderer.domElement.addEventListener("click", () => {
      if (this.level === 0) {
        this.start();
      } else {
        this.detectOverlap();
      }
    });
  }
  // 监听键盘（调试时使用：空格下一关；P键暂停；上下键控制移动）
  onKeyDown() {
    document.addEventListener("keydown", (e) => {
      const code = e.code;
      if (code === "KeyP") {
        this.state = this.state === "running" ? "paused" : "running";
      } else if (code === "Space") {
        if (this.level === 0) {
          this.start();
        } else {
          this.detectOverlap();
        }
      } else if (code === "ArrowUp") {
        this.box.position[this.moveAxis] += this.speed / 2;
      } else if (code === "ArrowDown") {
        this.box.position[this.moveAxis] -= this.speed / 2;
      }
    });
  }
  // 检测重叠部分
  // 难点：1. 重叠距离计算 2. 重叠方块位置计算 3. 切掉方块位置计算
  async detectOverlap() {
    const that = this;
    const { boxParams, moveEdge, box, moveAxis, currentY, camera } = this;
    const currentPosition = box.position[moveAxis];
    const prevPosition = boxParams[moveAxis];
    const direction = Math.sign(currentPosition - prevPosition);
    const edge = boxParams![moveEdge];
    // 重叠距离 = 上一个方块的边长 + 方向 * (上一个方块位置 - 当前方块位置)
    const overlap = edge + direction * (prevPosition - currentPosition);
    if (overlap <= 0) {
      this.state = "paused";
      this.dropBox(box);
      gsap.to(camera, {
        zoom: 0.6,
        duration: 1,
        ease: "Power1.easeOut",
        onUpdate() {
          camera.updateProjectionMatrix();
        },
        onComplete() {
          if (that.level - 1 > highScore) {
            highScore = that.level;
            localStorage.setItem("high-score", highScore - 1);
          }
          that.gameover = true;
          retry.classList.remove("hidden");
          retry.classList.remove("opacity-0");
        }
      });
    } else {
      // 创建重叠部分的方块
      const overlapBoxParams = { ...boxParams };
      const overlapBoxPosition = currentPosition / 2 + prevPosition / 2;
      overlapBoxParams.y = currentY;
      overlapBoxParams[moveEdge] = overlap;
      overlapBoxParams[moveAxis] = overlapBoxPosition;
      this.createBox(overlapBoxParams);
      // 创建切掉部分的方块
      const slicedBoxParams = { ...boxParams };
      const slicedBoxEdge = edge - overlap;
      const slicedBoxPosition =
        direction *
        ((edge - overlap) / 2 + edge / 2 + direction * prevPosition);
      slicedBoxParams.y = currentY;
      slicedBoxParams[moveEdge] = slicedBoxEdge;
      slicedBoxParams[moveAxis] = slicedBoxPosition;
      const slicedBox = this.createBox(slicedBoxParams);
      this.dropBox(slicedBox);
      this.boxParams = overlapBoxParams;
      this.scene.remove(box);
      this.startNextLevel();
    }
  }
  // 使方块旋转下落
  dropBox(box: THREE.Mesh) {
    const { moveAxis } = this;
    const that = this;
    gsap.to(box.position, {
      y: "-=3.2",
      ease: "power1.easeIn",
      duration: 1.5,
      onComplete() {
        that.scene.remove(box);
      }
    });
    gsap.to(box.rotation, {
      delay: 0.1,
      x: moveAxis === "z" ? ky.randomNumberInRange(4, 5) : 0.1,
      y: 0.1,
      z: moveAxis === "x" ? ky.randomNumberInRange(4, 5) : 0.1,
      duration: 1.5
    });
  }
  // 状态
  get status() {
    const { level, gamestart, gameover } = this;
    return {
      level,
      gamestart,
      gameover
    };
  }
}

let stack = null;
let status = null;
highScore = localStorage.getItem("high-score");
highScoreText.innerHTML = highScore;

const startGame = async () => {
  stack = new Stack(".stack", false);
  stack.init();
};

const restartGame = async () => {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.remove();
  }
  stack = null;
  status = null;
  retry.classList.add("hidden");
  retry.classList.add("opacity-0");
  score.textContent = "";
  title.classList.remove("opacity-0");
  start.classList.remove("opacity-0");
  highScore = localStorage.getItem("high-score");
  highScoreText.innerHTML = highScore;
  await startGame();
};

retry.addEventListener("click", () => {
  restartGame();
});

startGame();

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
