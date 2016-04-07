'use strict';

var src = require('./tasks/folder-names/src.js'),
	dist = require('./tasks/folder-names/dist.js'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')();

// Wiring non-gulp modules to be used as plugins
plugins.del = require('del');
plugins.path = require('path');
plugins.mainBowerFiles = require('main-bower-files');
plugins.runSequence = require('run-sequence');
plugins.glob = require('glob').sync;
plugins.es = require('event-stream');

function getTask(task) {
  return require('./tasks/' + task)(gulp, plugins, src, dist);
}

gulp.task('clean-dist', getTask('clean-dist'));
gulp.task('compile-sass', getTask('compile-sass'));
gulp.task('copy-library', getTask('copy-library'));
gulp.task('copy-scripts', getTask('copy-scripts'));
gulp.task('copy-css', ['compile-sass'], getTask('copy-css'));
gulp.task('copy-partials', getTask('copy-partials'));
gulp.task('copy-assets', getTask('copy-assets'));
gulp.task('copy-index-html', getTask('copy-index-html'));
gulp.task('inject-files', getTask('inject-files'));

gulp.task('build-dist',function(done){
	plugins.runSequence(
		'clean-dist',
		['copy-scripts', 'copy-css', 'copy-library', 'copy-partials', 'copy-index-html','copy-assets'],
		'inject-files',
		done
	)
});

gulp.task('watch',function(){
	gulp.watch(plugins.path.join(src.base, '**', '*.scss'), ['copy-css']);
	gulp.watch(plugins.path.join(src.base, '**', '*.js'),['copy-scripts']);
	gulp.watch(plugins.path.join(src.base, '**', '*.html'), function(){
		plugins.runSequence(['copy-partials', 'copy-index-html'], 'inject-files');
	});
	gulp.watch(plugins.path.join(src.base, '**', '!(*.js|*.html|*.css|*.scss)'),['copy-assets']);
});

gulp.task('serve-dist', function(done){
	require('./server');
	done();
});

gulp.task('default',function(done){
	plugins.runSequence('build-dist', 'watch', 'serve-dist', done);
});