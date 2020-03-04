var gulp = require('gulp'),
 less = require('gulp-less'),
 browserSync = require('browser-sync'),
  plumber      = require('gulp-plumber'),
   rename       = require('gulp-rename'),
   cleanCSS     = require('gulp-clean-css');
   autoprefixer = require('gulp-autoprefixer');


gulp.task('less', function(){ // Создаем таск "less"
return gulp.src('less/style.less') // Берем источник
.pipe(plumber())
.pipe(less())
.pipe(cleanCSS())
.pipe(rename(function (path) {
  path.dirname += "/../css";
  path.extname = ".min.css";
}))
.pipe(autoprefixer({overrideBrowserslist: ['last 5 versions']}))
.pipe(cleanCSS({compatibility: 'ie10', keepSpecialComments: 1}))
 // Преобразуем Sass в CSS посредством gulp-less
    .pipe(gulp.dest('css')) // Выгружаем результата в папку 
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
  browserSync({ // Выполняем browserSync
      server: { // Определяем параметры сервера
          baseDir: './' // Директория для сервера 
      },
      notify: false // Отключаем уведомления
  });
});

// Watch
gulp.task('watch',  function() {
  gulp.watch('less/**/*.less', gulp.parallel('less'));
    gulp.watch(['index.html']);
    gulp.watch(['img/**/*']);
   // Наблюдение за другими типами файлов
});

// Default task

gulp.task('default', gulp.parallel("less", 'browser-sync', 'watch'));