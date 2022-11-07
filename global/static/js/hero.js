var camera;
var scene;
var renderer;
var mesh;
var mouseX = 0;
var mouseY = 0;
var objScale = 40;
var rotateSpeed = 0.005;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var objUrl = "/static/obj/earth.obj";
// var objUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/66496/low-poly-earth.obj';

init();
animate();

function init() {
  //---------------------------------------------------------------
  // Create and position camera
  //---------------------------------------------------------------
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;

  //---------------------------------------------------------------
  // Create the scene
  //---------------------------------------------------------------
  scene = new THREE.Scene();

  //---------------------------------------------------------------
  // Create the Load Manager
  //---------------------------------------------------------------
  var manager = new THREE.LoadingManager();
  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
  };

  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = (xhr.loaded / xhr.total) * 100;
      console.log(Math.round(percentComplete, 2) + "% downloaded");
    }
  };

  var onError = function (xhr) {};

  //---------------------------------------------------------------
  // Load the object
  //---------------------------------------------------------------
  var loader = new THREE.OBJLoader(manager);
  var material = new THREE.MeshBasicMaterial({
    // wireframe: true,
    color: 0x0066b2,
    polygonOffset: true,
    polygonOffsetFactor: 6, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
  });

  loader.load(
    objUrl,
    function (object) {
      object.traverse(function (child) {
        if (child instanceof THREE.Mesh) {
          var helper = new THREE.WireframeHelper(child);
          helper.material.color.set(0xffffff);
          helper.material.linewidth = 1;
          child.material = material;
          scene.add(helper);
        }
      });

      mesh = object;
      mesh.scale.x = mesh.scale.y = mesh.scale.z = objScale;
      scene.add(mesh);
    },
    onProgress,
    onError
  );

  //---------------------------------------------------------------
  // Controls
  //---------------------------------------------------------------
  document.addEventListener("mousemove", onDocumentMouseMove, false);
  document.addEventListener("touchstart", onDocumentTouchStart, false);
  document.addEventListener("touchmove", onDocumentTouchMove, false);

  //---------------------------------------------------------------
  // Create the Renderer
  //---------------------------------------------------------------
  renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x0066b2, 1);
  document.getElementById("hero").appendChild(renderer.domElement);

  //---------------------------------------------------------------
  // Listen for the window to resize
  //---------------------------------------------------------------
  window.addEventListener("resize", onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function updateCamera() {
  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart(event) {
  if (event.touches.length > 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function onDocumentTouchMove(event) {
  if (event.touches.length == 1) {
    event.preventDefault();

    mouseX = event.touches[0].pageX - windowHalfX;
    mouseY = event.touches[0].pageY - windowHalfY;
  }
}

function animate() {
  requestAnimationFrame(animate);

  if (mesh) mesh.rotation.y += rotateSpeed;

  updateCamera();

  renderer.render(scene, camera);
}
