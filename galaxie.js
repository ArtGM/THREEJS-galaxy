var galaxie = document.getElementById('galaxie');

var renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
galaxie.appendChild(renderer.domElement);

var scene = new THREE.Scene();
scene.add(new THREE.AmbientLight(0xffffff));


//glowing scene
//var effetBrillant = new THREE.Scene();
//effetBrillant.add(new THREE.AmbientLight(0xffffff));
var camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
camera.position.set(1, 20, 40);
camera.rotation.x = -30 * Math.PI / 180;
scene.add(camera);

function random() {
	return Math.random() * 2 - 1;
};

function creerSpirale(amount, step) {

	var sommets = [];

	for (var i = 2000; i < amount; i += step) {

		var angle = -i / 1200;
		var distance = i / 800;
		var progression = (i / amount) * 3 + 0.5;

		sommets.push(
			progression * random() * random() + Math.sin(angle) * distance,
			progression * random() * random(),
			progression * random() * random() + Math.cos(angle) * distance
		);

	};

	var spirale = new THREE.BufferGeometry();
	spirale.addAttribute('position', new THREE.Float32BufferAttribute(sommets, 3));

	return spirale;

};

function creerTexture(from, to) {
	var canvas = document.createElement('canvas');
	canvas.width = 16;
	canvas.height = 16;
	var context = canvas.getContext('2d');
	var degrade = context.createRadialGradient(8, 8, 0, 8, 8, 8);
	degrade.addColorStop(0, from);
	degrade.addColorStop(1, to);
	context.fillStyle = degrade;
	context.fillRect(0, 0, canvas.width, canvas.height);
	return new THREE.CanvasTexture(canvas);
}

//
var galaxy = new THREE.Object3D();
var texture = new THREE.TextureLoader();
//
// Brouillard
//
var spirale = creerSpirale(20000, 10);
var material = new THREE.PointsMaterial({
	size: 4,
	map: creerTexture('rgba( 91,50,230,0.3 )', 'rgba( 0,0,0,0 )'),
	depthWrite: false,
	transparent: true

});

var points = new THREE.Points(spirale, material);

galaxy.add(points);

var spirale = creerSpirale(20000, 10);
var material = new THREE.PointsMaterial({
	size: 4,
	map: creerTexture('rgba( 91,50,230,0.3 )', 'rgba( 0,0,0,0 )'),
	depthWrite: false,
	transparent: true
});

var points = new THREE.Points(spirale, material);
points.rotation.y = Math.PI;
galaxy.add(points);
//
//moyenne étoiles
//
var spirale = creerSpirale(20000, 4);
var material = new THREE.PointsMaterial({
	size: 0.4,
	map: creerTexture('rgba( 255,255,255,1 )', 'rgba( 0,0,0,0 )'),
	blending: THREE.AdditiveBlending,
	depthWrite: false,
	transparent: true
});

var points = new THREE.Points(spirale, material);

galaxy.add(points);

var spirale = creerSpirale(20000, 4);
var material = new THREE.PointsMaterial({
	size: 0.4,
	map: creerTexture('rgba(255,255,255,1)', 'rgba(0,0,0,0)'),
	blending: THREE.AdditiveBlending,
	depthWrite: false,
	transparent: true
});

var points = new THREE.Points(spirale, material);
points.rotation.y = Math.PI;
galaxy.add(points);

//

//

var spirale = creerSpirale(20000, 0.2);
var material = new THREE.PointsMaterial({
	size: 0.25,
	map: creerTexture('rgba(209,64,9,1)', 'rgba(0,0,0,0)'),
	blending: THREE.AdditiveBlending,
	depthWrite: false,
	transparent: true
});

var points = new THREE.Points(spirale, material);

galaxy.add(points);

var spirale = creerSpirale(20000, 0.2);

var material = new THREE.PointsMaterial({
	size: 0.25,
	map: creerTexture('rgba(209,64,9,1)', 'rgba(0,0,0,0)'),
	blending: THREE.AdditiveBlending,
	depthWrite: false,
	transparent: true
});

var points = new THREE.Points(spirale, material);
points.rotation.y = Math.PI;
galaxy.add(points);

//Centre galaxie

var dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
dirLight.position.set(0, 0, 0).normalize();
galaxy.add(dirLight);

dirLight.color.setHSL(0.1, 0.7, 0.5);

var textureFlare0 = texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/centre-galaxie.png");

function addLight(h, s, l, x, y, z) {

	var light = new THREE.PointLight(0xffffff, 1.5, 2000);
	light.color.setHSL(h, s, l);
	light.position.set(x, y, z);
	galaxy.add(light);

	var flareColor = new THREE.Color(0xffffff);
	flareColor.setHSL(h, s, l + 0.2);

	var lensFlare = new THREE.LensFlare(textureFlare0, 1150, 0.0, THREE.AdditiveBlending, flareColor);

	lensFlare.position.copy(light.position);

	galaxy.add(lensFlare);

}
addLight(1, 0.8, 0.8, 0, -0.8, 0);

//Ajout des systèmes cliquables

var systemeLight = new THREE.PointLight(0xffffff, 1.5, 1000);

//systeme Vert

var systemeVert = new THREE.Object3D();
var lensVert = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/vert.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeVert.add(systemeLight, lensVert);
systemeVert.position.set(-5, -0.8, 15);



// systeme Bleu

var systemeBleu = new THREE.Object3D();
var lensBleu = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/bleu.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeBleu.add(systemeLight, lensBleu);
systemeBleu.position.set(17, -0.8, 0);

// systeme Rouge

var systemeRouge = new THREE.Object3D();
var lensRouge = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/rouge.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeRouge.add(systemeLight, lensRouge);
systemeRouge.position.set(-13, -0.8, 6);
// systeme jaune
var systemeJaune = new THREE.Object3D();
var lensJaune = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/jaune.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeJaune.add(systemeLight, lensJaune);
systemeJaune.position.set(9, -0.4, -18);

//systeme bleu clair

var systemeBleuClair = new THREE.Object3D();
var lensBleuClair = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/bleucl.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeBleuClair.add(systemeLight, lensBleuClair);
systemeBleuClair.position.set(11, 0.4, 13);

//systeme blanc

var systemeBlanc = new THREE.Object3D();
var lensBlanc = new THREE.LensFlare(
	texture.load("http://www.marklorofficiel.com/wp-content/uploads/2017/12/blanc.png"),
	100,
	0.0,
	THREE.AdditiveBlending
);
systemeBlanc.add(systemeLight, lensBlanc);
systemeBlanc.position.set(-11, 0.4, -13);

/*************************************/
/*********** starfield ****************/
/****************************************/

var starsGeometry = new THREE.Geometry();

for (var i = 0; i < 20000; i++) {

	var star = new THREE.Vector3();
	star.x = THREE.Math.randFloatSpread(2000);
	star.y = THREE.Math.randFloatSpread(2000);
	star.z = THREE.Math.randFloatSpread(2000);

	starsGeometry.vertices.push(star);

}

var starsMaterial = new THREE.PointsMaterial({
	size: 8,
	map: texture.load('http://www.marklorofficiel.com/wp-content/uploads/2017/12/blanc.png'),
	blending: THREE.AdditiveBlending,
	transparent: true

});

var starField = new THREE.Points(starsGeometry, starsMaterial);

scene.add(starField);

// ajout des objets à leurs parents

galaxy.add(systemeRouge, systemeVert, systemeBleu, systemeJaune, systemeBleuClair, systemeBlanc);

scene.add(galaxy);

//rotation galaxie

function animateGalaxy() {
	requestAnimationFrame(animateGalaxy);

	galaxy.rotation.y += 1 / 2000;
	renderer.render(scene, camera);
}

animateGalaxy();

// fonction adaptation à l'écran

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

};

window.addEventListener('resize', onWindowResize, false);
