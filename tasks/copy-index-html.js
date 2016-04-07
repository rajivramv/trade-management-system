module.exports = function(gulp, plugins, src, dist){
  var srcBase = src.base,
    distBase = dist.base,
    indexFilesPath = plugins.path.join(srcBase, '{,/**}', '!(' + src.partials + ')', '*.html');

  return function(){
    return gulp.src(indexFilesPath)
      .pipe(plugins.plumber())
      .pipe(gulp.dest(distBase));
  }
}