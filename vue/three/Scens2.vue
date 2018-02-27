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
      dataSet: {
        sell: [ // 售气机
          {
            level: 2, // 0 正常，1低等，2中等,3高等
            thick: 0.00
          },
          {
            level: 2, // 0 正常，1低等，2中等,3高等
            thick: 0.00
          },
          {
            level: 2, // 0 正常，1低等，2中等,3高等
            thick: 0.00
          },
          {
            level: 2, // 0 正常，1低等，2中等,3高等
            thick: 0.00
          }
        ],
        door: {
          state: true,
          openDate: '2017-12-08 09:31:01',
          openPerson: '张三'
        },
        well: {
          max: 0.00,
          min: 0.00,
          isLeak: false
        },
        compressor: { // 压缩机
          in: 0.00,
          out: 0.00,
          level: 2, // 0 正常，1低等，2中等,3高等
          thick: 0.06
        }
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
      this.camera1.position.set(0, 500, -330)
      this.camera1.lookAt(new THREE.Vector3(0, 100, -600))
      camera.position.set(1000, 1000, 1000)
      camera.lookAt(scene.position)
      this.camera = camera
      cameraG.add(camera)
      this.cameraG = cameraG
      scene.add(cameraG)
        // 添加汽井

      new THREE.MTLLoader().load('./static/modeles/jin.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/jin.obj', function (object) {
          object.position.set(-1100, 50, -600)
          object.scale.x = 100
          object.scale.y = 100
          object.scale.z = 100
          var object1 = object.clone()
          object1.position.set(-900, 50, -600)
          scene.add(object)
          scene.add(object1)
        })
      })

    // 添加拱门
      new THREE.MTLLoader().load('./static/modeles/men.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/men.obj', function (object) {
          object.position.set(-1100, 0, 480)
          object.scale.x = 20
          object.scale.y = 20
          object.scale.z = 20
          var object1 = object.clone()
          object1.position.set(1000, 0, 480)
          scene.add(object1)
          scene.add(object)
        })
      })
       // 房子
      new THREE.MTLLoader().load('./static/modeles/fangzi.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/fangzi.obj', function (object) {
          object.position.set(0, 0, 80)
          object.rotateY(Math.PI)
          object.scale.x = 40
          object.scale.y = 30
          object.scale.z = 40
          console.log(object)
          object.children.map(function (item) {
            item.material.side = THREE.DoubleSide
          })
          scene.add(object)
        })
      })
        // 压缩机
      new THREE.MTLLoader().load('./static/modeles/yasuoji.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/yasuoji.obj', function (object) {
          object.position.set(0, 0, -600)
          object.rotateY(0.5 * Math.PI)
          object.scale.x = 5
          object.scale.y = 5
          object.scale.z = 5
          console.log(object)
          object.children.map(function (item) {
            item.material.side = THREE.DoubleSide
          })
          scene.add(object)
        })
      })
        // 油罐车
      new THREE.MTLLoader().load('./static/modeles/youguanche.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/modeles/youguanche.obj', function (object) {
          object.position.set(800, 0, -600)
          object.rotateY(-0.5 * Math.PI)
          object.scale.x = 0.8
          object.scale.y = 0.8
          object.scale.z = 0.8
          console.log(object)
          object.children.map(function (item) {
            item.material.side = THREE.DoubleSide
          })
          scene.add(object)
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
      plane11.position.set(-1100, 0, 0)
      planesG.add(plane11)
      var plane13 = plane.clone()
      plane13.position.set(1000, 0, 0)
      planesG.add(plane13)
      plane.rotateZ(0.5 * Math.PI)
      var plane0 = plane.clone()
      plane.position.set(-550, 0, -350)
      planesG.add(plane)
      plane0.position.set(400, 0, -350)
      planesG.add(plane0)
      scene.add(planesG)

         // 添加加气桩
      new THREE.MTLLoader().load('./static/models/123/123.mtl', function (materials) {
        materials.preload()
        var objLoader = new THREE.OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load('./static/models/123/123.obj', function (object) {
          object.scale.x = 50
          object.scale.y = 50
          object.scale.z = 50
          object.position.set(-800, 40, 550)
          var object1 = object.clone()
          object1.position.set(300, 40, 550)
          var object2 = object.clone()
          object2.position.set(-200, 40, 550)
          var object3 = object.clone()
          object3.position.set(700, 40, 550)
          scene.add(object1)
          scene.add(object)
          scene.add(object2)
          scene.add(object3)
        })
      })
      scene.add(planesG)

      // 添加浮动框

      var nodes = this.nodes
      var tipObjects = this.tipObjects
      for (var i = 0; i < 7; i++) {
        var element = document.createElement('div')
        element.className = 'tag'
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')'
        this.$refs.root.appendChild(element)
        nodes.push(element)
        tipObjects.push(new THREE.Object3D())
        scene.add(tipObjects[i])
      }
      this.updateNodeText(nodes, this.dataSet)
      // 添加提示
      tipObjects[0].position.set(-1100, 200, -600)
      tipObjects[1].position.set(0, 400, 80)
      tipObjects[2].position.set(0, 480, -600)

      // 加气桩
      tipObjects[3].position.set(-800, 340, 550)
      tipObjects[4].position.set(300, 340, 550)
      tipObjects[5].position.set(-200, 340, 550)
      tipObjects[6].position.set(700, 340, 550)

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
    getNode (d, type) {
      if (type === 'sell') {
        return '<div class="number">泄漏警报:' + d.level + '</div>' +
          '<div class="number">气体浓度:' + d.thick * 100 + '%</div>'
      } else if (type === 'door') {
        var state = d.state ? '开' : '关'
        return '<div class="number">门禁状态:' + state + '</div>' +
          '<div class="number">上次开门时间:' + d.openDate + '</div>' +
          '<div class="number">上次开门人员:' + d.openPerson + '</div>'
      } else if (type === 'well') {
        var isLeak = d.isLeak ? '有' : '无'
        return '<div class="number">高压井(Mpa):' + d.max + '</div>' +
          '<div class="number">低压井(Mpa):' + d.min + '</div>' +
          '<div class="number">有无泄漏:' + isLeak + '</div>'
      } else if (type === 'compressor') {
        return '<div class="number">进气压力:' + d.in + '</div>' +
          '<div class="number">出气压力:' + d.out + '</div>' +
          '<div class="number">泄漏警报:' + d.level + '</div>' +
          '<div class="number">气体浓度:' + d.thick * 100 + '%</div>'
      }
    },
    updateNodeText (nodes, dataSet) {
      // 当数据更新时,可调用统一更新
      nodes[0].innerHTML = this.getNode(dataSet.door, 'door')
      nodes[1].innerHTML = this.getNode(dataSet.well, 'well')
      nodes[2].innerHTML = this.getNode(dataSet.compressor, 'compressor')

      nodes[3].innerHTML = this.getNode(dataSet.sell[0], 'sell')
      nodes[4].innerHTML = this.getNode(dataSet.sell[1], 'sell')
      nodes[5].innerHTML = this.getNode(dataSet.sell[2], 'sell')
      nodes[6].innerHTML = this.getNode(dataSet.sell[3], 'sell')
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
    padding: 10px;
    font-size: 2px;
    border:3px solid #09F;
    background-color: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
    color: rgb(236, 234, 234);
    position:absolute;
    border-radius: 10px;
    z-index: 1;
}
.test{
    border: 1px solid #09F;
    position:absolute;
}
</style>
