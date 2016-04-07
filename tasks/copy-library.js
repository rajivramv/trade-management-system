module.exports = function(gulp, plugins, src, dist){

	var jsFilter = plugins.filter(['*.js', '!*bootstrap*'] ,{restore: true}),
		cssFilter = plugins.filter('*.css', {restore: true}),
		fontFilter = plugins.filter(['*.eot', '*.woff','*.woff2', '*.svg', '*.ttf'],{restore: true});

	return function(){

	var distBase = dist.base,
		libPath = plugins.path.join(distBase, dist.lib),
		jsPath = plugins.path.join(libPath, dist.js),
		cssPath = plugins.path.join(libPath, dist.css),
		fontsPath = plugins.path.join(libPath, dist.fonts);
		// grab vendor js files from bower_components, minify and push it into libPath/js
		return gulp.src(plugins.mainBowerFiles({
			overrides: {
				'bootstrap-sass': {
					main: [
				    'assets/fonts/bootstrap/*.*'
				  ]
				}
			}
		}))
		.pipe(plugins.plumber())
		.pipe(jsFilter)
		// .pipe(plugins.uglify())
		.pipe(plugins.sourcemaps.write())
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(jsPath))
		.pipe(jsFilter.restore)

		// grab vendor css files from bower_components, minify and push it into libPath/css
		.pipe(cssFilter)
		.pipe(plugins.minifyCss())
		.pipe(plugins.sourcemaps.write())
		.pipe(plugins.rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(cssPath))
		.pipe(cssFilter.restore)

		// grab vendor font files from bower_components, and push it into libPath/fonts
		.pipe(fontFilter)
		.pipe(gulp.dest(fontsPath))
		.pipe(fontFilter.restore);
	}
}

