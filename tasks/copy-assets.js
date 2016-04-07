module.exports = function(gulp, plugins, src, dist){
   var srcBase = src.base,
    distBase = dist.base,
    assetsPath = plugins.path.join(srcBase, '**', src.assets, '**', '*.*'),
    folders = plugins.glob(assetsPath).map(function(file){

      var regex = new RegExp(src.assets + '(.)*');
      return file.replace(regex, src.assets);
    }).reduce(function(p, c){
      if(p.indexOf(c) < 0) p.push(c);
      return p
    },[]);
  console.log(folders);
  return function(){
    folderWiseCopy = folders.map(function(folder){
      return gulp.src(folder + '/**/*.*')
      .pipe(plugins.plumber())
      .pipe(plugins.rename({
        dirname: folder.slice(srcBase.length + 1)
      }))
      .pipe(gulp.dest(distBase));
    });
    return plugins.es.merge(folderWiseCopy);
  }
}