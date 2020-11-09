var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var cp = require('child_process');
var gcmq = require('gulp-group-css-media-queries');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll and page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

// Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['sass', 'img', 'jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        notify: false
    });
});

// Compile files
gulp.task('sass', function () {
    return gulp.src('_sass/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            onError: browserSync.notify
        }))
        .pipe(gcmq())
        .pipe(prefix(['last 15 versions', '> 1%'], { cascade: true }))
        // .pipe(cleanCSS({
        //     level: 2
        // }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

// Js
gulp.task('js', function() {
    return gulp.src('js/*.js')
        .pipe(gulp.dest('_site/js'))
        .pipe(browserSync.reload({stream:true}));        
});

// Compression images
gulp.task('img', function() {
	return gulp.src('images/**/*')
	// .pipe(cache(imagemin()))
	.pipe(gulp.dest('_site/images'))
    .pipe(browserSync.reload({stream:true}));
});

// Build Minify CSS
gulp.task('mincss', function() {
    return gulp.src('css/main.css')
        .pipe(rename({suffix: '.min', prefix : ''}))
        .pipe(cleanCSS({
          level: 2
        }))
        .pipe(gulp.dest('_site/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('css'));
});

// Watch html, scss, js, img files
gulp.task('watch', function () {
    gulp.watch('_sass/**/*.scss', ['sass']);
    gulp.watch('js/*.js', ['jekyll-rebuild']);
    gulp.watch('images/**/*', ['img']);
    gulp.watch(['*.html', '_layouts/*.html', '_includes/*.html', '_pages/*.html', '_posts/*'], ['jekyll-rebuild']);
});

//  Default task
gulp.task('default', ['browser-sync', 'watch']);
