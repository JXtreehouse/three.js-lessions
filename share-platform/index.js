//import THREE from 'three'
window.onload = function () {
  console.log("this Root verion:", THREE.REVISION)
  const IW = 1000, IH = 2000;
  var Root = {
    W: window.innerWidth,
    H: window.innerHeight,
    Root: document.getElementById('root'),
  }
  window.onresize = function () {
    Root.W = window.innerWidth;
    Root.H = window.innerHeight;
  }

  var renderer = new THREE.WebGLRenderer({ antialias: true})
  var renderer1 = new THREE.WebGLRenderer({ antialias: true })
  renderer.setPixelRatio( window.devicePixelRatio );

  //建议设置大小，否则会出现锯齿
  renderer.setSize(Root.W, Root.H);
  renderer1.setSize(Root.W/5, Root.H/5);

  var testDom = document.getElementById('test');
  testDom.style.top = '5px';
  testDom.style.left = (Root.W*4/5-5) + "px"
  testDom.appendChild( renderer1.domElement);
  Root.Root.appendChild(renderer.domElement)
  renderer.autoClear = false;


  // 创建场景
  var scene = new THREE.Scene();
  var group1 = new THREE.Group();
  scene.add(group1);

  // 设置场景背景色

  scene.background = new THREE.Color(0x111111);
  var amblight = new THREE.AmbientLight(0xffffff, 0.7);

  scene.add(amblight);
  var light = new THREE.DirectionalLight('#FFF',1);
  light.position.set(0, 2000, 0);
  scene.add(light);

  var gridHelper = new THREE.GridHelper( 700, 20, 0x00251e, 0x00251e );
  gridHelper.position.y = -5;
  gridHelper.position.x = -700;
  group1.add(gridHelper);

  var gridHelper1 = new THREE.GridHelper( 700, 20, 0x00251e, 0x00251e );
  gridHelper1.position.x = 700;
  gridHelper1.position.y = -5;
  group1.add( gridHelper1);

  var cameraG = new THREE.Group();
  var camera = new THREE.PerspectiveCamera(60, Root.W / Root.H, 0.1, 200000);
  var cameraMin = new THREE.PerspectiveCamera(60, Root.W / Root.H, 0.1, 200000);
  cameraMin.position.set(500,500,600);
  cameraMin.lookAt(scene.position);
  camera.position.set(1500, 1000, 1500);
  camera.lookAt(scene.position);

  //整个场景旋转的组
  cameraG.add(camera);
  scene.add(cameraG);


  //构建三个object对象，用于显示对话框
  var tipObjects = [];
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())
  tipObjects.push(new THREE.Object3D())

  //添加页面
  var nodes=[]
  for(var i=0;i<5;i++){
    var element = document.createElement( 'div' );
    element.className = 'tag';
    element.style.backgroundColor = 'rgba(0,127,127,' + ( Math.random() * 0.5 + 0.25 ) + ')';

    var number = document.createElement( 'div' );
    number.className = 'number';
    number.textContent = "出气压力:120Mpa";
    element.appendChild( number );
    var symbol = document.createElement( 'div' );
    symbol.className = 'symbol';
    symbol.textContent = "温度:80°C";
    element.appendChild( symbol );
    var details = document.createElement( 'div' );
    details.className = 'details';
    details.innerHTML = "瞬时流量:0.3MIm³" + '累计流量:0.3MIm³'+i;
    element.appendChild( details );
    Root.Root.appendChild(element)
    nodes.push(element);
  }
  //添加一个控制器
  var orbitControl = new THREE.OrbitControls(camera);


  function updateNode(){
    var vector
    var x=0,y=0
    nodes.forEach(function(d,i){
      vector = tipObjects[i].getWorldPosition().project(camera)
      x=Math.round(vector.x * Root.W/2 + Root.W/2 -80)
      y=Math.round(-vector.y * Root.H/2 + Root.H/2 -40 )
      d.style.top=y+'px';
      d.style.left=x+'px';
    })
  }
}