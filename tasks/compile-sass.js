module.exports = function(gulp, plugins, src, dist){
	var srcBase = src.base,
		sassPath = plugins.path.join(srcBase, '/**', src.sass, '/*.scss');
	return function(){
		return gulp.src(sassPath)
		.pipe(plugins.plumber())
		.pipe(plugins.sass())
		.pipe(plugins.rename(function(path){
			path.dirname = plugins.path.join(path.dirname, plugins.path.relative(src.sass, '.'), src.css);
		}))
		.pipe(gulp.dest(srcBase));
	}
}