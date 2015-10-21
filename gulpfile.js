var gulp = require('gulp');
var duration = require('gulp-duration');
var gutil = require('gulp-util');
var browserify = require('browserify');
var watchify   = require('watchify');
var uglify = require('gulp-uglify');
var objectAssign = require('object-assign');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var cssify = require('cssify');
var less = require('gulp-less');
var path = require('path');

var jsSrcPath = './app/assets/javascripts';
var jsDestPath = './public/javascripts';

var cssSrcPath = './app/assets/stylesheets';
var cssDestPath = './public/stylesheets';

var customOption = {
    entries: [jsSrcPath + '/app.js']
};

var option = objectAssign(watchify.args, customOption);

var bundler = browserify(option)
    .on('update', jsCompile)
    .on('error', function(err) {
        console.log(gutil.colors.red("Oops! you have ERROR! \n" + err.message));
        this.emit('end');
    });

gulp.task('browserify', function(){
    return jsCompile(bundler);
});

gulp.task('watchify', function() {
    return jsCompile(watchify(bundler));
});

gulp.task("default", function(){
    gulp.start(["browserify" , "less"]);
});

gulp.task('less', function () {
    return gulp.src(cssSrcPath + '/main.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task("compile", function(){
    gulp.start(["browserify" , "less"]);
});

gulp.task('compress', function() {
    return gulp.src('./public/javascripts/bundle.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task("run", function(){
    gulp.start(["less" , "watchify"]);
    gulp.watch(cssSrcPath + '/main.less', ['less']);
});

function jsCompile() {
    console.log('Compiling Start on ' + gutil.date('mmm d, yyyy h:MM:ss TT Z'));
    return bundler
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(duration('compiled bundle.js'))
        .pipe(gulp.dest('./public/javascripts'))
}
