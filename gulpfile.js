import { task, src, watch, parallel } from 'gulp';
import { reload, init } from 'browser-sync';

task('js', function () {
  return src('./js/*.js').pipe(reload({ stream: true }));
});

task('browser-sync', function () {
  init({
    server: { baseDir: './' }
  });
});

task('watch', function () {
  watch('./js/*.js', parallel('js'));
});

task('default', parallel('browser-sync', 'watch'));
