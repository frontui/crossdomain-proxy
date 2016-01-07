var gulp = require('gulp')
var zip  = require('gulp-zip')

var files = [
	'./**/**',
	'!.gitignore',
	'!node_modules/',
	'!node_modules/**/**',
	'!package.json',
	'!README.md',
	'!gulpfile.js',
	'!*.idea'
]

gulp.task('default', function() {
	return gulp.src(files)
				.pipe(zip('archive.zip'))
				.pipe(gulp.dest('./'))
})