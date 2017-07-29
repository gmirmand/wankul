const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    css: {
        src: ['app/Resources/web/sass/main.scss'],
        dest: 'web/public/css/main',
        watch: ['app/Resources/web/sass/**/*.scss']
    },
    js: {
        src:[''],
        dest:[''],
        watch:['']
    },
    html: {
        src:[''],
        dest:[''],
        watch:['']
    }
};

var autoprefixerOptions = {
    browsers: [
        'last 3 versions',
        'not ie <= 8'
    ],
    cascade: false
};
gulp.task(
    'default', [
        'sass'
    ]);

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        proxy: "wankul.dev/app_dev.php"
    });

    gulp.watch(paths.css.watch, ['sass']);
});

gulp.task(
    'sass', function () {
        return gulp.src(paths.css.src)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(sourcemaps.write())
            .pipe(autoprefixer(autoprefixerOptions))
            .pipe(cssnano())
            .pipe(concat('styles.min.css'))
            .pipe(gulp.dest(paths.css.dest))
            .pipe(browserSync.stream());
    });