(function(factory) {
	if (typeof global == 'object') {
		if(module.parent) {
			module.exports = factory('nodejs');
		}else{
			global.md5=factory('nodejs');
		}
	} else if (typeof window !== 'undefined') {
		window.md5 = factory('brouwser');
	}
})(function(type, undefined) {
	var md5=function(){};
	md5.chunk=2097152;
	if(type==='nodejs') {
		const sparkmd5=require('spark-md5');
		var fs=require('fs');
		// 同步计算文件md5
		md5.file=function md5file(path, onprogress) {
			var fd=fs.openSync(path, 'r'),
			size=fs.statSync(path).size,
			chunkSize=md5.chunk,
			len=Math.ceil(size/chunkSize),
			i=0, spark, buf, pos, clip;
			spark=new sparkmd5.ArrayBuffer();
			buf=Buffer.alloc(chunkSize);
			while(i<len) {
				pos=chunkSize*i;
				clip=fs.readSync(fd,buf,0,chunkSize,pos);
				if(clip<chunkSize) buf=buf.slice(0,clip);
				spark.append(buf);
				i++;
				if(onprogress) onprogress(i, len, buf);
			}
			fs.closeSync(fd);
			return spark.end();
		}

		md5.string=function md5string(str, onprogress) {
			var size=str.length,
			chunkSize=md5.chunk,
			buf,
			len=Math.ceil(size/chunkSize),
			i=0,
			spark=new sparkmd5.ArrayBuffer(),
			clip;
			while(i<len) {
				clip=str.substr(chunkSize*i, chunkSize);
				buf=Buffer.from(clip, 'utf8');
				spark.append(buf);
				i++;
				if(onprogress) onprogress(i,len,clip);
			}
			return spark.end();
		}

	}else if(type==='brouwser') {
		md5.file=function(file,onprogress,onend){
			var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
			chunkSize = md5.chunk,
			chunks = Math.ceil(file.size / chunkSize),
			currentChunk=0,
			spark=new SparkMD5.ArrayBuffer(),
			fileReader=new FileReader();
			if(onend===undefined){
				onend=onprogress;
				onprogress=undefined;
			}
			window.fr=fileReader;
			fileReader.onload=function (e) {
				// console.log('read chunk nr', currentChunk + 1, 'of', chunks);
				spark.append(e.target.result);
				currentChunk++;
				if (currentChunk < chunks) {
					loadNext();
					if(onprogress) onprogress(currentChunk, chunks, e.target.result);
				} else {
					var result=spark.end(),
					_e=new Event('end');
					_e.data=e.target.md5=result;
					e.target.dispatchEvent(_e);
					if(onprogress) onprogress(currentChunk, chunks, result);
					if(onend) onend(result);
					// console.log('finished loading');
					// console.info('computed hash', spark.end());  // Compute hash
				}
			};
			function loadNext() {
				var start=currentChunk * chunkSize,
				end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
				fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
			}
			loadNext();
			return fileReader;
		}

		md5.string=function md5string(str, onprogress) {
			var size=str.length,
			chunkSize=md5.chunk,
			buf,
			len=Math.ceil(size/chunkSize),
			i=0,
			spark=new sparkmd5.ArrayBuffer(),
			clip;
			while(i<len) {
				clip=str.substr(chunkSize*i, chunkSize);
				buf=new Blob([clip]);
				spark.append(buf);
				i++;
				if(onprogress) onprogress(i,len,clip);
			}
			return spark.end();
		}
		return window.md5=md5;
	}
	return md5;
});