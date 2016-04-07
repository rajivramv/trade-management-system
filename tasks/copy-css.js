module.exports = function(gulp, plugins, src, dist){
	 var srcBase = src.base,
    distBase = dist.base,
    cssPath = plugins.path.join(srcBase, '**', src.css, '**', '*.css'),
    folders = plugins.glob(cssPath).map(function(file){
      return file.replace(/css(.*)/,'css');
    }).reduce(function(p, c){
      if(p.indexOf(c) < 0) p.push(c);
      return p
    },[]);
  return function(){
    folderWiseConcat = folders.map(function(folder){
      return gulp.src(folder + '/**/*.css')
      .pipe(plugins.plumber())
      .pipe(plugins.concat('index.css'))
      .pipe(plugins.minifyCss())
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.rename({
          dirname: folder.slice(srcBase.length + 1),
          suffix: '.min'
      }))
      .pipe(gulp.dest(distBase));
    });
    return plugins.es.merge(folderWiseConcat);
  }
}