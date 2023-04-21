let camera, scene, renderer, clock;
let uniforms;

function init() {
	const container = document.getElementById("shader");

	clock = new THREE.Clock();
	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	const geometry = new THREE.PlaneBufferGeometry(2, 2);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
	};

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
	uniforms.u_time.value = clock.getElapsedTime();
	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}

/* Get the documentElement (<html>) to display the page in fullscreen */
var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
	console.info("openFullscreen")
  if (elem.requestFullscreen) {
	console.info("requestFullscreen")
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

init();
animate();

// Add event listener on keydown
document.addEventListener('keydown', (event) => {
	const code = event.code;
	if(event.code === 'KeyF') {
		openFullscreen();
	} 
}, false);