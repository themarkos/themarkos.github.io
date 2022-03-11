import './style.css'

import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';

import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    geometry = new THREE.SphereGeometry(1, 64, 64),
    material = new THREE.MeshBasicMaterial({ color: 0xa2a9b0 }),
    sphere = new THREE.Mesh(geometry, material),
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000),
    starArray = [];
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
let space = {
    dimensions: {
        x: 2000,
        y: 2000,
        z: 2000,
    },
    createStar: function () {
        let obj = new THREE.Mesh(geometry, material)
        let coordinates = this.getRandCoordinates()
        let velocity = this.getRandMovement()
        for (let vect in coordinates) {
            obj.position[vect] = coordinates[vect]
        }
        obj["movement"] = {}
        for (let vect in velocity) {
            obj.movement[vect] = velocity[vect]
        }
        return obj
    },
    getLifespan: function () {
        return Math.floor(Math.random() * 20000 + 10000) //ms
    },
    getRandMovement: function () {
        let vectorV = {
            x: 0,
            y: 0,
            z: 0,
        }
        for (let vect in vectorV) {
            let randNum = Math.floor(Math.random() - 0.5) / 100
            if (randNum < 0) {
                randNum -= 0.005
            } else if (randNum > 0) {
                randNum += 0.005
            } else if (randNum == 0) {
                randNum = 0.005
            }
            vectorV[vect] = randNum
        }
        return vectorV
    },
    getRandCoordinates: function () {
        let vector = {
            x: 0,
            y: 0,
            z: 0,
        }
        for (let vect in this.dimensions) {
            vector[vect] = Math.floor(Math.random() * this.dimensions[vect] * 100) / 100 - (this.dimensions[vect] / 2)
        }
        return vector
    },
}
const starCount = 1000
function init() {
    for (let i = 0; i < starCount; i++) {
        starArray.push(space.createStar())
        scene.add(starArray[i])
    }
    console.log(starArray)
    controls.update()
}
document.body.appendChild(renderer.domElement)
camera.position.z = 400;
function animate() {
    requestAnimationFrame(animate)
    for (let i = 0; i < starArray.length; i++) {
        let moveVector = starArray[i]
        for (let vect in moveVector.movement) {
            moveVector.position[vect] += moveVector.movement[vect]
        }
    }
    controls.update()
    renderer.render(scene, camera)
}
animate()
init()
