import * as THREE from 'three'
import { LensflareElement } from './Lensflare'

var galaxie = document.getElementById('galaxie')
var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000)
galaxie.appendChild(renderer.domElement)

var scene = new THREE.Scene()
scene.add(new THREE.AmbientLight(0xffffff))

var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000)
camera.position.set(1, 20, 40)
camera.rotation.x = -30 * Math.PI / 180
scene.add(camera)

function random () {
  return Math.random() * 2 - 1
}

function createSpiral (amount, step) {
  var sommets = []

  for (var i = 2000; i < amount; i += step) {
    var angle = -i / 1200
    var distance = i / 800
    var progression = i / amount * 3 + 0.5

    sommets.push(
      progression * random() * random() + Math.sin(angle) * distance,
      progression * random() * random(),
      progression * random() * random() + Math.cos(angle) * distance
    )
  }

  var spirale = new THREE.BufferGeometry()
  spirale.addAttribute('position', new THREE.Float32BufferAttribute(sommets, 3))

  return spirale
}

function createTexture (from, to) {
  var canvas = document.createElement('canvas')
  canvas.width = 16
  canvas.height = 16
  var context = canvas.getContext('2d')
  var degrade = context.createRadialGradient(8, 8, 0, 8, 8, 8)
  degrade.addColorStop(0, from)
  degrade.addColorStop(1, to)
  context.fillStyle = degrade
  context.fillRect(0, 0, canvas.width, canvas.height)
  return new THREE.CanvasTexture(canvas)
}

//
const galaxy = new THREE.Object3D()
const texture = new THREE.TextureLoader()

function createBranch (pointsNb, pointsSize, materialSize, materialColor, additiveBlending, isInvert) {
  let spiral = createSpiral(pointsNb, pointsSize)
  let material = new THREE.PointsMaterial({
    size: materialSize,
    map: createTexture(materialColor[0], materialColor[1]),
    depthWrite: false,
    transparent: true,
    blending: additiveBlending ? THREE.AdditiveBlending : THREE.NormalBlending
  })
  let points = new THREE.Points(spiral, material)
  points.rotation.y = isInvert ? Math.PI : ''
  galaxy.add(points)
}

/* -------------------------------------------------------------------------- */
/*                                     Fog                                    */
/* -------------------------------------------------------------------------- */

createBranch(20000, 15, 4, [ 'rgba(255, 255, 255, 0.2)', 'rgba(0,0,0,0)' ], false, false)

createBranch(20000, 10, 4, [ 'rgba(234, 196, 213, 0.3)', 'rgba(0,0,0,0)' ], false, true)

/* -------------------------------------------------------------------------- */
/*                                Medium stars                                */
/* -------------------------------------------------------------------------- */

createBranch(20000, 4, 0.4, [ 'rgba(255, 255, 255, 1)', 'rgba(0,0,0,0)' ], true, false)

createBranch(20000, 4, 0.4, [ 'rgba(255, 255, 255, 1)', 'rgba(0,0,0,0)' ], true, true)

/* -------------------------------------------------------------------------- */
/*                                Smalls stars                                */
/* -------------------------------------------------------------------------- */

createBranch(20000, 0.2, 0.25, [ 'rgba(141, 169, 183,1)', 'rgba(0,0,0,0)' ], true, false)

createBranch(20000, 0.2, 0.25, [ 'rgba(234,228,119,1)', 'rgba(0,0,0,0)' ], true, true)

/* -------------------------------------------------------------------------- */
/*                                Galaxy Center                               */
/* -------------------------------------------------------------------------- */

var dirLight = new THREE.DirectionalLight(0xffffff, 0.05)
dirLight.position.set(0, 0, 0).normalize()
galaxy.add(dirLight)

dirLight.color.setHSL(0.1, 0.7, 0.5)

var textureFlare0 = texture.load('https://s13.postimg.org/mdpx2hlt3/centre-galaxie-256x256.png')

function addLight (h, s, l, x, y, z) {
  var light = new THREE.PointLight(0xffffff, 1.5, 2000)
  light.color.setHSL(h, s, l)
  light.position.set(x, y, z)
  galaxy.add(light)

  var flareColor = new THREE.Color(0xffffff)
  flareColor.setHSL(h, s, l + 0.2)

  var lensFlare = new LensflareElement(textureFlare0, 1150, 0.0, THREE.AdditiveBlending, flareColor)

  console.log(lensFlare)

  //lensFlare.position.set(x, y, z)

  galaxy.add(lensFlare)
}

addLight(1, 0.8, 0.8, 0, -0.8, 0)

//Ajout des systèmes cliquables

var systemeLight = new THREE.PointLight(0xffffff, 1.5, 1000)

//systeme Vert

var systemeVert = new THREE.Object3D()
var lensVert = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeVert.add(systemeLight, lensVert)
systemeVert.position.set(-5, -0.8, 15)

// systeme Bleu

var systemeBleu = new THREE.Object3D()
var lensBleu = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeBleu.add(systemeLight, lensBleu)
systemeBleu.position.set(17, -0.8, 0)

// systeme Rouge

var systemeRouge = new THREE.Object3D()
var lensRouge = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeRouge.add(systemeLight, lensRouge)
systemeRouge.position.set(-13, -0.8, 6)
// systeme jaune
var systemeJaune = new THREE.Object3D()
var lensJaune = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeJaune.add(systemeLight, lensJaune)
systemeJaune.position.set(9, -0.4, -18)

//systeme bleu clair

var systemeBleuClair = new THREE.Object3D()
var lensBleuClair = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeBleuClair.add(systemeLight, lensBleuClair)
systemeBleuClair.position.set(11, 0.4, 13)

//systeme blanc

var systemeBlanc = new THREE.Object3D()
var lensBlanc = new LensflareElement(
  texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  100,
  0.0,
  THREE.AdditiveBlending
)
systemeBlanc.add(systemeLight, lensBlanc)
systemeBlanc.position.set(-11, 0.4, -13)

/*************************************/
/*********** starfield ****************/
/****************************************/

var starsGeometry = new THREE.Geometry()

for (var i = 0; i < 20000; i++) {
  var star = new THREE.Vector3()
  star.x = THREE.Math.randFloatSpread(2000)
  star.y = THREE.Math.randFloatSpread(2000)
  star.z = THREE.Math.randFloatSpread(2000)

  starsGeometry.vertices.push(star)
}

var starsMaterial = new THREE.PointsMaterial({
  size: 8,
  map: texture.load('https://s13.postimg.org/klwy7kuqf/blanc.png'),
  blending: THREE.AdditiveBlending,
  transparent: true
})

var starField = new THREE.Points(starsGeometry, starsMaterial)

scene.add(starField)

// ajout des objets à leurs parents

galaxy.add(systemeRouge, systemeVert, systemeBleu, systemeJaune, systemeBleuClair, systemeBlanc)

scene.add(galaxy)

//rotation galaxie

function animateGalaxy () {
  requestAnimationFrame(animateGalaxy)

  galaxy.rotation.y += 1 / 2000
  renderer.render(scene, camera)
}

animateGalaxy()

// fonction adaptation à l'écran

function onWindowResize () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onWindowResize, false)
