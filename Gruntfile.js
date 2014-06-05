module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		markdown: {
			all: {
				files: [
				{
					expand: true,
					flatten: true,
					src: 'stg/markdown/*.md',
					dest: 'stg/markup/',
					ext: '.html'
				}
				]
			}
		},
		'compile-handlebars': {
			allStatic: {
				preHTML: 'stg/templates/pre-html.html',
				postHTML: 'stg/templates/post-html.html',
				template: 'stg/templates/template.handlebars',
				templateData: 'stg/templates/data/data.json',
				output: 'stg/allStatic.html'
			}
		},
		copy: {
			stg: {
				expand: true, 
				src: ['scss/**'], 
				dest: 'stg/', 
				flatten: true,
				filter: 'isFile',
				options: {
					process: function (content, srcpath) {
						return content.replace(/\/\*(...*)\*\//s, " ");
					}
				}
			},
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-markdown');
	grunt.loadNpmTasks('grunt-compile-handlebars');

	grunt.registerTask('default', ['compile-handlebars']);
};