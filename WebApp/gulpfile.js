'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync').create();

// Static server using browser-sync
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
    // gulp.watch tasks watch the filesystem and trigger the compile tasks
    gulp.watch('./src/*.scss', ['sass:watch']);
    gulp.watch('./src/**/*.scss', ['sass:watch']);
    gulp.watch('./src/*.jade', ['jade:watch']);
    gulp.watch('./src/**/*.jade', ['jade:watch']);
    gulp.watch('./src/**/*', ['assets']);
    gulp.watch('./src/**/*', ['assets']);
});

/**
 * We decorate the sass and jade compile tasks to have them complete (as dependencies) before
 * reloading the browser
 *
 * See: https://en.wikipedia.org/wiki/Decorator_pattern
 * And: https://medium.com/@dave_lunny/task-dependencies-in-gulp-b885c1ab48f0#.g306xoxea
 * */
gulp.task('sass:watch',['sass'], browserSync.reload);
gulp.task('jade:watch', ['jade'], browserSync.reload);

 /**
  * Gulp sass task compiles sass files in /src/scss and pipes them to /build
  * See: http://www.sitepoint.com/simple-gulpy-workflow-sass/
  */
gulp.task('sass', function () {
  return gulp.src('./src/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/'));
});

gulp.task('jade', function() {
  var YOUR_LOCALS = {};
  gulp.src('./src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./build/'));
});

/**
 * Gulp assets task - probably the most simple gulp task you can make.
 * It streams /src/assets into /build, effectively copying the directory.
 *
 * You could set up a file watcher for the directory if you want to.
 * This is left as an exercise for the reader.
 */
gulp.task('assets', function(){
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./build/assets/'));
    gulp.src('./src/**/*')
        .pipe(gulp.dest('./build/'));
});

/**
 * This is the main gulp task. If you check the package.json file, you'll
 * see that it is called by the start script, so 'npm start' will call this task
 */
gulp.task('dev', ['assets', 'jade', 'sass', 'browser-sync']);

/**
 * This task builds the site. Maybe better ways to do this, but I've chained everything
 * as dependencies to have it complete in Codeship before the Codeship test task tries
 * to copy it to s3.
 */
gulp.task('build:assets', ['assets']);
gulp.task('build:sass', ['build:assets', 'sass']);
gulp.task('build:jade', ['build:sass', 'jade']);
gulp.task('build', ['build:jade'], function(){
  console.log('Done!');
});