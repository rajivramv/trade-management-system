module.exports = function(gulp, plugins, src, dist){
	return function() {
		var distFolder = plugins.path.resolve(dist.base);
  	return plugins.del([distFolder + '/**', '!' + distFolder, '!' + distFolder + '/.git{,/**}']);
  }
}