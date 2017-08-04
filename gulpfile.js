const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
const image = require('gulp-image');

var paths = {
    css: {
        src: ['app/Resources/web/sass/**/*.scss'],
        dest: 'web/css/main',
        watch: ['app/Resources/web/sass/**/*.scss']
    },
    js: {
        src: [''],
        dest: [''],
        watch: ['']
    },
    html: {
        src: [''],
        dest: [''],
        watch: ['app/Resources/views/**/*']
    },
    img: {
        src: ['app/Resources/web/img/**/*'],
        dest: 'web/img',
        watch: ['app/Resources/web/img/**/*']
    }
};

var autoprefixerOptions = {
    browsers: [
        'last 3 versions',
        'not ie <= 8'
    ],
    cascade: false
};


/*TASKS*/

/*DEFAULT*/
gulp.task(
    'default', [
        'sass'
    ]);


/*SASS*/
gulp.task(
    'sass', function () {
        return gulp.src(paths.css.src)
            .pipe(sourcemaps.init())
            .pipe(sass({
                includePaths: [paths.css.src],
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(cssnano())
            .pipe(concat('styles.min.css'))
            .pipe(gulp.dest(paths.css.dest))
            .pipe(browserSync.stream());
    });

/* IMAGES*/
gulp.task(
    'image', function () {
        gulp.src(paths.img.src)
            .pipe(image())
            .pipe(gulp.dest(paths.img.dest));
    });


/*SERVE*/
gulp.task('serve', ['sass', 'image'], function () {
    browserSync.init({
        proxy: "wankul.dev/app_dev.php"
    });
    gulp.watch(paths.css.watch, ['sass']);
    gulp.watch(paths.img.watch, ['image']);
    gulp.watch(paths.html.watch);
});