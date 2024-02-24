import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particalTexture = textureLoader.load("/textures/particles/2.png")


//particles
const particlesGeometry = new THREE.BufferGeometry()
const count = 5000;

const positionArray = new Float32Array(count * 3);
const colorArray = new Float32Array(count * 3)
for (let i = 0; i < count * 3; i++) {
    positionArray[i] = (Math.random() - .5) * 10
    colorArray[i] = Math.random();
}
particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
)
particlesGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colorArray, 3)
)
const particlesMaterial = new THREE.PointsMaterial(
    {
        size: .1,
        sizeAttenuation: true,
        // color: "#ff88cc",
        transparent: true,
        alphaMap: particalTexture,
        // alphaTest: .001,
        // depthTest: false
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true


    }
)
const partical = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(partical)
/**
 * Test cube
 */


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    // console.log(elapsedTime);
    // update particles
    // partical.rotation.y = elapsedTime * .02
    for (let i = 0; i < count; i++) {
        const i3 = i * 3
        const x = particlesGeometry.attributes.position.array[i3]
        console.log(x);
        particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x)
    }
    particlesGeometry.attributes.position.needsUpdate = true

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()