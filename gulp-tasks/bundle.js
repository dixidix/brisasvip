function bundle(gulp, $){

	var browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	glob = require('glob'),
	path = require('path');
	$.paths.bundle = {
		resources: [
		// './bower_components/bootstrap/dist/js/bootstrap.min.js',
		'./node_modules/angular/angular.js',
		'./node_modules/angular-ui-router/release/angular-ui-router.min.js',
		'./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
		'./node_modules/angular-animate/angular-animate.min.js',
		'./node_modules/angular-sanitize/angular-sanitize.min.js',
		'./bower_components//angular-rangeslider/angular.rangeSlider.js',
		],
		app: [
		'./app/*.js',
		'./app/components/**/*.js',
		'./app/routes/**/*.js',
		'./app/services/*.js'
		]
	};


	function buildLibs(){
		return browserify($.paths.bundle.resources)
		.bundle()
		.pipe(source("libs.bundle.js"))
		.pipe(gulp.dest("./dist"));
	}

	function buildApp(){
		var files = glob.sync('./app/*.js','./app/**/**/*.js');
		return browserify({entries: files})
		.bundle()
		.pipe(source("app.bundle.js"))
		.pipe(gulp.dest("./dist"));
	}	

	return {
		buildLibs: buildLibs,
		buildApp: buildApp
	};
}

module.exports = bundle;