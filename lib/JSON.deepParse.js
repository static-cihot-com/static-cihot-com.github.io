'use strict';

{if(typeof JSON.deepParse!=='function'){
function dp(s) {
	// if not stringified json rather a simple string value then JSON.parse will throw error
	// otherwise continue recursion
	if (typeof s === 'string') {
		try {
			return dp(JSON.parse(s));
		} catch (err) {
			return s;
		}
	} else if (Array.isArray(s)) {
		// if an array is received, map over the array and deepParse each value
		return s.map(val => dp(val));
	} else if (typeof s === 'object' && s !== null) {
		// if an object is received then deepParse each element in the object
		// typeof null returns 'object' too, so we have to eliminate that
		return Object.keys(s).reduce((obj, key) => {
			obj[key] = dp(s[key]);
			return obj;
		}, {});
	} else {
		// otherwise return whatever was received
		return s;
	}
}
Object.defineProperty(JSON,'deepParse',{value:dp});
}}