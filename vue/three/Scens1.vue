<template>
  <div ref="root" class="Scen0_root" >
    <div ref='test' class='test'>
        
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import './MTLLoader.js'
import './OBJLoader.js'
import './OrbitControls.js'
export default {
  data: () => {
    return {
      dataSet:
      {
        normal: [
          {
            out: 312,
            temp: 65,
            step: 0.3,
            sum: 0.6
          },
          {
            out: 312,
            temp: 65,
            step: 0.3,
            sum: 0.6
          },
          {
            out: 312,
            temp: 65,
            step: 0.3,
            sum: 0.6
          }
        ],
        guan: {
          now: -54,
          normal: -54
        },
        cun: [
            { tatal: 433.84 }
        ]
      },
      width: 1549,
      height: 1449,
      renderer: null,
      renderer1: null,
      scene: null,
      light: [],
      cameraG: null,
      camera: null,
      camera1: null,
      orbitControl: null,
      planeS: [],
      nodes: [],
      tipObjects: [],
      lines: [],
      dotActive: [],
      T: 0,
      step: 0.02
    }
  },
  mounted () {
    this.init()
    this.animate()
  },
  methods: {
    init () {
      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({ antialias: true })
      this.renderer1 = new THREE.WebGLRenderer({ antialias: true })
      this.renderer.setSize(this.width, this.height)
      this.renderer1.setSize(this.width / 5, this.height / 5)
      this.$refs.root.style.maxWidth = this.width + 'px'
      this.$refs.root.style.maxHeight = this.height + 'px'
      this.$refs.root.style.position = 'relative'
      this.$refs.root.appendChild(this.renderer.domElement)
      this.$refs.test.appendChild(this.renderer1.domElement)
      this.$refs.test.style.maxWidth = this.width / 5 + 'px'
      this.$refs.test.style.maxHeight = this.height / 5 + 'px'
      this.$refs.test.style.top = '5px'
      this.$refs.test.style.left = (this.width * 4 / 5 - 5) + 'px'
      // 创建场景
      var scene = new THREE.Scene()
      scene.background = new THREE.Color(0x000000)
      // 构建灯光
      this.light = []
      var amblight = new THREE.AmbientLight(0xffffff, 0.7)
      var light = new THREE.DirectionalLight('#FFF', 0.8)
      light.position.set(1000, 2000, 0)
      this.light.push(amblight)
      this.light.push(light)
      scene.add(amblight)
      scene.add(light)
      // 构建地面网
      var gridHelper = new THREE.GridHelper(1400, 20, 0x00251e, 0x00251e)
      gridHelper.position.set(-700, -5, 0)
      var gridHelper1 = new THREE.GridHelper(1400, 20, 0x00251e, 0x00251e)
      gridHelper1.position.set(700, -5, 0)
      scene.add(gridHelper)
      scene.add(gridHelper1)
      // 构建相机
      var cameraG = new THREE.Group()
      var camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 200000)
      this.camera1 = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 200000)
      this.camera1.position.set(500, 500, 600)
      this.camera1.lookAt(scene.position)
      camera.position.set(1500, 1000, 1500)
      camera.lookAt(scene.position)
      this.camera = camera
      cameraG.add(camera)
      this.cameraG = cameraG
      scene.add(cameraG)
      // 添加小汽车
      new THREE.MTLLoader().load('./static/models/car.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/car.obj', function (object) {
          object.position.set(0, 0, -1200)
          object.scale.x = 100
          object.scale.y = 100
          object.scale.z = 100
          object.name = 'car1'
          var object1 = object.clone()
          object1.position.set(960, 0, 1200)
          scene.add(object)
          scene.add(object1)
        })
      })

    // 添加公交汽车
      new THREE.MTLLoader().load('./static/models/125/125.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/125/125.obj', function (object) {
          object.position.set(200, 0, -1100)
          object.scale.x = 50
          object.scale.y = 50
          object.scale.z = 50
          object.name = 'car2'
          var object1 = object.clone()
          object1.position.set(800, 0, 1200)
          scene.add(object)
          scene.add(object1)
        })
      })
    // 添加加气桩
      var mtlLoader = new THREE.MTLLoader()
      mtlLoader.load('./static/models/123/123.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/123/123.obj', function (object) {
          object.position.set(1000, 0, 900)
          object.scale.x = 50
          object.scale.y = 50
          object.scale.z = 50
          object.rotateY(0.5 * Math.PI)
          var object1 = object.clone()
          object.rotateY(Math.PI)
          object.name = 'car1'
          object1.position.set(0, 0, -900)
          scene.add(object1)
          scene.add(object)
        })
      })

        // 添加储气罐
      var guan0 = new THREE.Group()
      new THREE.MTLLoader().load('./static/models/129/129.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/129/129.obj', function (object) {
          object.position.set(0, 0, 0)
          object.scale.x = 80
          object.scale.y = 80
          object.scale.z = 80
          var object1 = object.clone()
          object1.position.set(0, 0, 240)

          guan0.add(object)
          guan0.add(object1)
          guan0.position.set(-1000, 0, -400)
          scene.add(guan0)
        })
      })
        // 添加楼
      new THREE.MTLLoader().load('./static/models/128/110.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/128/110.obj', function (object) {
          console.log('aaaa', object)
          object.scale.x = 20
          object.scale.y = 20
          object.scale.z = 20
          object.position.set(-30, 0, 450)
          scene.add(object)
        })
      })
         // 添加油罐车
      new THREE.MTLLoader().load('./static/modeles/youguanche.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/youguanche.obj', function (object) {
          object.scale.x = 0.8
          object.scale.y = 0.8
          object.scale.z = 0.8
          object.rotateY(Math.PI)
          object.position.set(1000, 0, -200)
          scene.add(object)
        })
      })
        // 添加燃气管
      new THREE.MTLLoader().load('./static/models/131/131.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/131/131.obj', function (object) {
          object.scale.x = 25
          object.scale.y = 25
          object.scale.z = 25
          object.position.set(-1200, 0, 400)
          var object1 = object.clone()
          object1.position.x += 300
          scene.add(object1)
          scene.add(object)
        })
      })
         // 添加罐
      new THREE.MTLLoader().load('./static/models/130/130.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/130/130.obj', function (object) {
          var groupG = new THREE.Group()
          var group = new THREE.Group()
          object.scale.x = 60
          object.scale.y = 60
          object.scale.z = 60
          var object1 = object.clone()
          object1.position.set(-220, 0, 0)
          group.add(object)
          group.add(object1)
          group.position.set(150, 0, -300)
          groupG.add(group)
          var groupa = group.clone()
          groupa.position.z -= 100
          groupG.add(groupa)
          var groupG1 = groupG.clone()
          groupG1.position.set(950, 0, 750)
          scene.add(groupG)
          scene.add(groupG1)
        })
      })
         // 添加灰色路带
      var planesG = new THREE.Group()
      var geometry = new THREE.PlaneGeometry(300, 1000, 32)
      var material = new THREE.MeshBasicMaterial({color: 0x333333, side: THREE.DoubleSide})
      var plane = new THREE.Mesh(geometry, material)
        //  plane.rotateZ(0.5*Math.PI)
        //  plane.rotateY(0.5*Math.PI)
      plane.rotateX(0.5 * Math.PI)
      var plane11 = plane.clone()
      plane11.position.set(-1000, 0, 0)
      planesG.add(plane11)
      var plane12 = plane.clone()
      plane12.position.set(0, 0, 0)
      planesG.add(plane12)
      var plane13 = plane.clone()
      plane13.position.set(1000, 0, 0)
      planesG.add(plane13)
      plane.rotateZ(0.5 * Math.PI)
      var plane0 = plane.clone()
      plane.position.set(-650, 0, 450)
      planesG.add(plane)
      plane0.position.set(500, 0, -350)
      planesG.add(plane0)
         //

      scene.add(planesG)
      var materialLine = new THREE.LineBasicMaterial({
        color: 0x968C2C
      })
      var Dotes = [
          [new THREE.Vector3(-1000, 3, -100), new THREE.Vector3(-1000, 3, 400)],
          [new THREE.Vector3(-1000, 3, 400), new THREE.Vector3(0, 3, 400)],
          [new THREE.Vector3(0, 3, 400), new THREE.Vector3(0, 3, -350)],
          [new THREE.Vector3(0, 3, -350), new THREE.Vector3(0, 3, -850)],
          [new THREE.Vector3(0, 3, -350), new THREE.Vector3(1000, 3, -350)],
          [new THREE.Vector3(1000, 3, -350), new THREE.Vector3(1000, 3, 400)],
          [new THREE.Vector3(1000, 3, 400), new THREE.Vector3(1000, 3, 900)]
      ]
      var lines = []
      Dotes.map(function (d) {
        lines.push(new THREE.Line3(d[0], d[1]))
      })
      var linesMesh = []
      Dotes.map(function (d) {
        var geometry = new THREE.Geometry()
        geometry.vertices = d
        linesMesh.push(linesMesh)
        scene.add(new THREE.Line(geometry, materialLine))
      })
      var dotActive = []

      var sphere = new THREE.SphereGeometry(10, 16, 8)

      lines.map(function (d) {
        var dot = new THREE.PointLight(0x02F66C, 2, 100)
        dot.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x02F66C })))
        d.at(0, dot.position)
        scene.add(dot)
        dotActive.push(dot)
      })
      this.lines = lines
      this.dotActive = dotActive
      // 添加浮动框
      var nodes = this.nodes
      var tipObjects = this.tipObjects
      for (var i = 0; i < 5; i++) {
        var element = document.createElement('div')
        element.className = 'tag'
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
        this.$refs.root.appendChild(element)
        nodes.push(element)
        tipObjects.push(new THREE.Object3D())
        scene.add(tipObjects[i])
      }
      this.updateNodeText(nodes, this.dataSet)
      // scene.add(particle);
      // 添加提示
      tipObjects[0].position.set(-30, 530, 450)
      tipObjects[1].position.set(150, 200, -300)
      tipObjects[2].position.set(-1000, 300, 400)

      // 加气桩
      tipObjects[3].position.set(900, 320, 1000)
      tipObjects[4].position.set(0, 320, -1000)

      this.orbitControl = new THREE.OrbitControls(camera)
      this.scene = scene
    },
    animate () {
      requestAnimationFrame(this.animate.bind(this))
      this.T += this.step
      this.T %= 1
      this.lines.map((d, i) => {
        d.at(this.T, this.dotActive[i].position)
      })
      this.updateNode(this.nodes, this.tipObjects, this)
      this.cameraG.rotation.y -= 0.002
      this.renderer.setViewport(0, 0, this.width, this.height)
      this.renderer.render(this.scene, this.camera)
      this.renderer1.render(this.scene, this.camera1)
    },
    getNode (d, type) {
      if (type === 'normal') {
        return '<div class="number">出气压力:120Mpa</div>' +
          '<div class="number">温度:80°C</div>' +
          '<div class="number">瞬时流量:0.3MIm³</div>' +
          '<div class="number">累计流量:0.3MIm³</div>'
      } else if (type === 'guan') {
        return '<div class="number">水露点</div>' +
          '<div class="number">当前值:' + d.now + '</div>' +
          '<div class="number">标准值:' + d.normal + '</div>'
      } else if (type === 'cun') {
        return '<div class="number">储存量:' + d.tatal + 'm³</div>'
      }
    },
    updateNodeText (nodes, dataSet) {
      // 当数据更新时,可调用统一更新
      nodes[2].innerHTML = this.getNode(dataSet.guan, 'guan')

      nodes[0].innerHTML = this.getNode(dataSet.normal[0], 'normal') // 楼
      nodes[4].innerHTML = this.getNode(dataSet.normal[1], 'normal') // 右下加气
      nodes[3].innerHTML = this.getNode(dataSet.normal[2], 'normal')
      nodes[1].innerHTML = this.getNode(dataSet.cun[0], 'cun')
    },
    move (obj, type, M, step) {
      if (step > 0) {
        if (obj.position[type] > M[1] || obj.position[type] < M[0]) {
          obj.position[type] = M[0]
        }
      } else {
        if (obj.position[type] >= M[1] || obj.position[type] <= M[0]) {
          obj.position[type] = M[1]
        }
      }
      obj.position[type] += step
    },
    updateNode (nodes, tipObjects, self) {
      var vector
      var x = 0
      var y = 0
      // 处理图层顺序
      var layout = []
      nodes.forEach(function (d, i) {
        vector = tipObjects[i].getWorldPosition().project(self.camera)
        x = Math.round(vector.x * self.width / 2 + self.width / 2 - 75)
        y = Math.round(-vector.y * self.height / 2 + self.height / 2 - 45)
        if (x > self.width || x < -1 || y < -1 || y > self.height) {
          d.style.display = 'none'
        } else {
          d.style.display = 'inline'
        }
        d.style.top = y + 'px'
        d.style.left = x + 'px'
        layout.push({
          index: i,
          dis: tipObjects[i].getWorldPosition().distanceToSquared(self.camera.position)
        })
      })
      layout.sort(function (a, b) {
        return b.dis - a.dis
      })
      layout.forEach(function (item, i) {
        nodes[item.index].style.zIndex = i + 2
      })
    }
  }
}
</script>
<style>
.Scen0_root{
  position: 'relative'
}
.tag{
    width:150px;
    top:0px;
    left:200px;
    font-size: 2px;
    border:3px solid #09F;
     background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
    color: rgb(236, 234, 234);
    position:absolute;
    border-radius: 5px;
    z-index: 1;
}
.test{
    border: 1px solid #09F;
    position:absolute;
}
</style>
