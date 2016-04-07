module.exports = function(gulp, plugins, src, dist){
  var srcBase = src.base,
	distBase = dist.base,
	partialsPath = plugins.path.join(srcBase, '**', src.partials, '**', '*.html');

  return function(){
	  return gulp.src(partialsPath)
    .pipe(plugins.plumber())
	  .pipe(gulp.dest(distBase));
  }
}