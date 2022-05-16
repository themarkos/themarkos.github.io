let scene, camera, renderer;

document.addEventListener("DOMContentLoaded", function()
{
  initializeScene()

  // Adding ambient lighting
  scene.add(new THREE.AmbientLight(0xffffff,0.01))

  // Left point light
  const pointLightLeft = new THREE.PointLight(0xff4422, 1)
  pointLightLeft.position.set(1,1,2)
  scene.add(pointLightLeft)

  // Right point light
  const pointLightRight = new THREE.PointLight(0x44ff88, 1)
  pointLightRight.position.set(1,2,3)
  scene.add(pointLightRight)

  // Top point light
  const pointLightTop = new THREE.PointLight(0xdd3311, 1)
  pointLightTop.position.set(0,3,2)
  scene.add(pointLightTop)

  THREE.ImageUtils.crossOrigin = '';
 // texture 
    const texture = new THREE.TextureLoader().load( "GC Coin Render 3.0 (1).png" );

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness:0.4,
    roughness:0.6,
  })
 // geometry shape 
  var geometry = new THREE.CylinderGeometry(2, 2, 0.2, 40);
  const mesh = new THREE.Mesh(geometry,material)

  scene.add(mesh)
  camera.position.set(0, -4, 10)
  
  
   // geometry shape rotation
  mesh.rotation.x = 2
  mesh.rotation.y = 1.5

  function animate()
  {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.00
      mesh.rotation.z += 0.00
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }

  animate()
})

function initializeScene()
{
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({alpha: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  scene.background = new THREE.Color( 0x000000 );
}
