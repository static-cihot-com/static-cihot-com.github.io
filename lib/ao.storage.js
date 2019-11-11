function Storage(prefix) {
	this.prefix = prefix || (location && location.search) || '';
}

Storage.prototype.save = function save(k, v) {
	return localStorage.setItem(k + this.prefix, v);
};

Storage.prototype.load = function load(k) {
	return localStorage.getItem(k + this.prefix);
};


Storage.prototype.saveTemp = function save(k, v) {
	return localStorage.setItem(k + this.prefix, v);
};

Storage.prototype.loadTemp = function load(k) {
	return localStorage.getItem(k + this.prefix);
};


