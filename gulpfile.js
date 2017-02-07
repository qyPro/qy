var gulp = require('gulp');
var less = require('gulp-less');
// var clean = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var watch = require('gulp-watch');
gulp.task('default',['look','concatjs'],function(){
	return connect.server({
		root:'./',
		port:'8800'
	});
})
gulp.task('less',function(){
	gulp.src('./less/*.less')
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest('./dest'))
})

gulp.task('look',["less"],function(){
	gulp.watch('less/*.less',['less']);
})
gulp.task('look',['less'],function(){
	gulp.watch('./less/*.less',['less']);
	// watch('./less',['less']);

});

gulp.task('concatjs',function(){
	gulp.src(['bower_components/jquery/dist/jquery.js','bower_components/seajs/dist/sea.js','bower_components/seajs-text/dist/seajs-text.js','bower_components/underscore/underscore.js','js/public.js'])
	.pipe(concat('global.js'))
	.pipe(gulp.dest('./'))
});