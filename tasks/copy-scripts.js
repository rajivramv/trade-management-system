module.exports = function(gulp, plugins, src, dist){
  var srcBase = src.base,
    distBase = dist.base,
    jsPath = plugins.path.join(srcBase, '{,/**}', src.js, '{,/**}', '*.js'),
    folders = plugins.glob(jsPath).map(function(file){
      return file.replace(/js(.*)/,'js');
    }).reduce(function(p, c){
      if(p.indexOf(c) < 0) p.push(c);
      return p
    },[]);

  return function(){

    folderWiseConcat = folders.map(function(folder){
      return gulp.src(plugins.path.join(folder, '**', '*.js'))
      .pipe(plugins.plumber())
      // .pipe(plugins.debug({title:'js -->'}))
      .pipe(plugins.angularFilesort())
      .pipe(plugins.ngAnnotate())
      .pipe(plugins.concat('index.js'))
      .pipe(plugins.uglify())
      .pipe(plugins.rename({
          dirname: folder.slice(srcBase.length + 1),
          suffix: '.min'
        }))
      .pipe(gulp.dest(distBase));
    });
    return plugins.es.merge(folderWiseConcat);
  }
}