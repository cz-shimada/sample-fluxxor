var gulp = require('gulp');
var browserify = require('browserify');
var watchify   = require('watchify');
var reactify = require('reactify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var jsSrcPath = './app/assets/javascripts';
var jsDestPath = './public/javascripts';

var bandler = browserify({
  entries: [jsSrcPath + '/app.js'],
  transform: [reactify]});

// local server
gulp.task("connect", function(){
    connect.server({
      port: 9000,
    livereload: true
  });
});

var bandlerbase = browserify({
  entries: [jsSrcPath + '/app.js'],
  transform: [reactify]});

gulp.task('browserify', function(){
    return jsCompile(bandlerbase);
});

gulp.task('watchify', function() {
    var bundler = watchify(bandlerbase)
    return jsCompile(bundler);
});

gulp.task("default", ['watchify'], function(){
    gulp.start(["connect"]);
});

function jsCompile(bundler) {
    function rebundle() { return bundler
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./public/javascripts'));
    }
    bundler.on('update', function() {
        rebundle();
    });
    bundler.on( 'log', function(message) {
        console.log(message);
    });
    return rebundle();
}