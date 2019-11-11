let blobs = new Map();
let urls = new Map();

function createURL(code) {
	let blob, url;

	blob = blobs.get(code);
	if(!blob) {
		blob = new Blob([code]);
		blobs.set(code, blob);
	}

	url = urls.get(blob);
	if(!url) {
		url = URL.createObjectURL(blob);
		urls.set(blob, url);
	}

	return url;
}

function createWorker(code) {
	return new Worker(createURL(code));
}

export { createURL, createWorker };
export default createWorker;