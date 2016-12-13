// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var mainBowerFiles = require('main-bower-files');

// Copy dependencies
gulp.task('bower', function () {
    return gulp.src(mainBowerFiles(), {
        base: 'bower_components'
    }).pipe(gulp.dest('../assets/vendor'));
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('../assets/css'));
});
gulp.task('sass-style', function() {
    return gulp.src('./style.scss')
        .pipe(sass())
        .pipe(gulp.dest('../assets/'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('../assets/js'));
});

// Default Task
gulp.task('default', ['bower', 'lint', 'sass', 'sass-style', 'scripts']);

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['lint', 'scripts']);
    gulp.watch('./scss/*.scss', ['sass']);
});