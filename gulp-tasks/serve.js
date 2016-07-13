'use strict';

function serve(gulp, $){

 var browserSync = require('browser-sync'),
    reload = browserSync.reload;   

  function serve(){

  	browserSync({
  		port:5000,
        server: {
        	baseDir: './dist'
        }
    });
	gulp.watch(['app/styles/**/*.scss  ','app/routes/**/*.scss','app/components/**/*.scss'],['styles', reload]);
	gulp.watch(['app/*.html','app/**/*.html'],['html', reload]);
	gulp.watch(['app/components/**/*.js','app/*.js','app/routes/**/*.js','app/services/*.js'], ['scripts', reload]); 

  }

  return {
    serve: serve
  };
}

module.exports = serve;
