var gulp = require('gulp');
var less = require('gulp-less');
// var clean = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var connect = require('gulp-connect');

gulp.task('default',['look'],function(){
	return connect.server({
		root:'./',
		port:'8800'
	});
})
gulp.task('less',function(){
	gulp.src('less/*.less')
	.pipe(less())
	.pipe(autoprefixer())
	.pipe(gulp.dest('./dest'))
})
gulp.task('look',function(){
	gulp.watch('less/*.less',['less']);
})
// gulp.clean('clean',function(){
// 	gulp.src('dest/*')
// 	.pipe(clean());
// })