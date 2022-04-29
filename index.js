// sol url : https://api.nasa.gov/mars-photos/api/v1/rovers/ROVER_NAME/photos?sol=SOL_NUM&api_key=API_KEY
// earth date url : https://api.nasa.gov/mars-photos/api/v1/rovers/ROVER_NAME/photos?earth_date=YEAR_MONTH_DAY&api_key=API_KEY
// manifest url : https://api.nasa.gov/mars-photos/api/v1/manifests/ROVER_NAME/?api_key=API_KEY

const express = require('express');
const app = express();
const fetch = require('node-fetch');
const _ = require('underscore');
app.set("view engine", "ejs");
app.use(express.static("public"));
const API_KEY = process.env['API_KEY']

// var CURIOSITY_MANIFEST, PERSEVERANCE_MANIFEST, SPIRIT_MANIFEST, OPPORTUNITY_MANIFEST;

// async function getManifests() {
// 	CURIOSITY_MANIFEST = await fetchData('https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?api_key=API_KEY');
// 	PERSEVERANCE_MANIFEST = await fetchData('https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance/?api_key=API_KEY');
// 	SPIRIT_MANIFEST = await fetchData('https://api.nasa.gov/mars-photos/api/v1/manifests/spirit/?api_key=API_KEY');
// 	OPPORTUNITY_MANIFEST = await fetchData('https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/?api_key=API_KEY');

// 	// CURIOSITY_MANIFEST = CURIOSITY_MANIFEST.photo_manifest;
// 	// PERSEVERANCE_MANIFEST = PERSEVERANCE_MANIFEST.photo_manifest;
// 	// SPIRIT_MANIFEST = SPIRIT_MANIFEST.photo_manifest;
// 	// OPPORTUNITY_MANIFEST = OPPORTUNITY_MANIFEST.photo_manifest;
// }

// getManifests();

app.get('/', async (req, res) => {
	res.render('home')
});

app.get('/perseverance', async (req, res) => {
	console.log('loading perseverance page...');

	let start_sol = req.query.sol;
	let cam = req.query.camera;
	
	let manifest = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/manifests/perseverance/?api_key=${API_KEY}`);
	manifest = manifest.photo_manifest;

	if(cam == undefined) {
		cam = manifest.photos[manifest.photos.length-1].cameras[0];
	}

	if(start_sol == undefined) {
		start_sol = manifest.max_sol;
	}

	let photos = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${start_sol}&camera=${cam}&api_key=${API_KEY}`);
	photos = _.shuffle(photos.photos)

	let cameras = [];
	for(let elem of manifest.photos) {
		if(elem.sol == start_sol) {
			cameras = elem.cameras;
			break;
		}
	}

	let errorMsg = "";
	if(cameras.length == 0) {
		errorMsg = `Error: no data found for sol ${start_sol}. Please try a different sol.`;
	} else if(photos[0] == undefined) {
		errorMsg = `Error: camera unavailable for sol ${start_sol}. Please try a different camera.`;
	}
	
	res.render('perseverance', {'manifest':manifest, 'photo':photos[0], 'cameras':cameras, 'start_sol':start_sol, "errorMsg":errorMsg});
});

app.get('/curiosity', async (req, res) => {
console.log('loading curiosity page...');

	let start_sol = req.query.sol;
	let cam = req.query.camera;
	
	let manifest = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?api_key=${API_KEY}`);
	manifest = manifest.photo_manifest;

	if(cam == undefined) {
		cam = manifest.photos[manifest.photos.length-1].cameras[0];
	}

	if(start_sol == undefined) {
		start_sol = manifest.max_sol;
	}

	let photos = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${start_sol}&camera=${cam}&api_key=${API_KEY}`);
	photos = _.shuffle(photos.photos)

	let cameras = [];
	for(let elem of manifest.photos) {
		if(elem.sol == start_sol) {
			cameras = elem.cameras;
			break;
		}
	}

	let errorMsg = "";
	if(cameras.length == 0) {
		errorMsg = `Error: no data found for sol ${start_sol}. Please try a different sol.`;
	} else if(photos[0] == undefined) {
		errorMsg = `Error: camera unavailable for sol ${start_sol}. Please try a different camera.`;
	}
	
	res.render('curiosity', {'manifest':manifest, 'photo':photos[0], 'cameras':cameras, 'start_sol':start_sol, "errorMsg":errorMsg});
});

app.get('/opportunity', async (req, res) => {
	console.log('loading opportunity page...');

	let start_sol = req.query.sol;
	let cam = req.query.camera;
	
	let manifest = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/?api_key=${API_KEY}`);
	manifest = manifest.photo_manifest;

	if(cam == undefined) {
		cam = manifest.photos[manifest.photos.length-1].cameras[0];
	}

	if(start_sol == undefined) {
		start_sol = manifest.max_sol;
	}

	let photos = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${start_sol}&camera=${cam}&api_key=${API_KEY}`);
	photos = _.shuffle(photos.photos)

	let cameras = [];
	for(let elem of manifest.photos) {
		if(elem.sol == start_sol) {
			cameras = elem.cameras;
			break;
		}
	}

	let errorMsg = "";
	if(cameras.length == 0) {
		errorMsg = `Error: no data found for sol ${start_sol}. Please try a different sol.`;
	} else if(photos[0] == undefined) {
		errorMsg = `Error: camera unavailable for sol ${start_sol}. Please try a different camera.`;
	}
	
	res.render('opportunity', {'manifest':manifest, 'photo':photos[0], 'cameras':cameras, 'start_sol':start_sol, "errorMsg":errorMsg});
});

app.get('/spirit', async (req, res) => {
	console.log('loading spirit page...');

	let start_sol = req.query.sol;
	let cam = req.query.camera;
	
	let manifest = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/manifests/spirit/?api_key=${API_KEY}`);
	manifest = manifest.photo_manifest;

	if(cam == undefined) {
		cam = manifest.photos[manifest.photos.length-1].cameras[0];
	}

	if(start_sol == undefined) {
		start_sol = manifest.max_sol;
	}

	let photos = await fetchData(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=${start_sol}&camera=${cam}&api_key=${API_KEY}`);
	photos = _.shuffle(photos.photos)

	let cameras = [];
	for(let elem of manifest.photos) {
		if(elem.sol == start_sol) {
			cameras = elem.cameras;
			break;
		}
	}

	let errorMsg = "";
	if(cameras.length == 0) {
		errorMsg = `Error: no data found for sol ${start_sol}. Please try a different sol.`;
	} else if(photos[0] == undefined) {
		errorMsg = `Error: camera unavailable for sol ${start_sol}. Please try a different camera.`;
	}
	
	res.render('spirit', {'manifest':manifest, 'photo':photos[0], 'cameras':cameras, 'start_sol':start_sol, "errorMsg":errorMsg});
});

app.listen(3000, () => {
	console.log('server started');
});

async function fetchData(url) {
	let response = await fetch(url);
	let data = await response.json();
	return data;
}