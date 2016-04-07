module.exports = function(gulp, plugins, src, dist){

	return function() {
		var distBase = dist.base,
			indexFilesPath = plugins.path.join(distBase, '**', '!(' + dist.partials + ')', '*.html');
			folders = plugins.glob(indexFilesPath).map(function(file){
				return file.replace(/\/[^\/]*html/,'');
			}).reduce(function(p, c){
				if(p.indexOf(c) < 0) p.push(c);
				return p;
			}, []),
			jsLibPath = plugins.path.join(distBase, dist.lib, '**', '*.js'),
			cssLibPath = plugins.path.join(distBase, dist.lib, '**', '*.css');

		var folderWiseInject = folders.map(function(folder){

			var target = gulp.src(plugins.path.join(folder, '*.html')),
				jsSources = gulp.src(plugins.path.join(folder,'{,/**}', '*.js')).pipe(plugins.angularFilesort()),
				cssSources = gulp.src(plugins.path.join(folder,'**', '*.css')),
				jsLib = gulp.src(jsLibPath).pipe(plugins.angularFilesort()),
				cssLib = gulp.src(cssLibPath);

			return target
			.pipe(plugins.plumber())
			.pipe(plugins.inject(jsLib,{relative:false, ignorePath: distBase, name:'lib'}))
			.pipe(plugins.inject(cssLib,{relative:false, ignorePath: distBase, name:'lib'}))
			.pipe(plugins.inject(jsSources,{relative:true, name:'src'}))
			.pipe(plugins.inject(cssSources,{relative:true, name:'src'}))
			.pipe(gulp.dest(folder));
		});

		return plugins.es.merge(folderWiseInject);

	}
}