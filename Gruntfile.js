module.exports = function(grunt) {

/**
 * Load required Grunt tasks. These are installed based on the versions listed
 * in `package.json` when you do `npm install` in this directory.
 */	
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-rename');
  grunt.loadNpmTasks('grunt-ant-sfdc');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
	
  // project configuration.
  grunt.initConfig({
      /**
       * We read in our `package.json` file so we can access the package name and
       * version. It's already there, so we don't repeat ourselves here.
       */
	pkg: grunt.file.readJSON('package.json'),
	
    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      build: [
    	  'gruntfile.js', 
    	  'src/**/*.js',
    	  '!src/tests/utils/**/*.js'
    	  ]
    },
    concat: {
        options: {
          separator: ';'
        },
        build: {
          src: ['src/**/*.js', '!src/tests/**/*.js'],
          dest: 'tmp/js/<%= pkg.name %>.js'
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy */\n'
        },
        build: {
          files: {
            'tmp/js/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
          }
        }
      },
	compress: {
      // example build target for static resources
      main: {
		options: {
			archive: 'build/staticresources/<%= pkg.name %>.zip'
		},
		expand: true,
		cwd : 'tmp/',
		src: ['**/*']
      }
    },
	rename: {
	  main: {
		src: ['<%= compress.main.options.archive %>'], 
		dest: 'build/staticresources/<%= pkg.name %>.resource'
	  }
	},
    copy: {
      main: {
        files: [
          { expand: true, cwd: 'src/', src: ['img/*'], dest: 'tmp/' }
        ]
      }
    },
    antdeploy: {
      // define global options for all deploys
      options: {
        root: 'build/',
        version: '27.0'
      },
      // create individual deploy targets. these can be 
      // individual orgs or even the same org with different packages
      dev1:  {
        options: {
          user: 'test@test.com', // storing my un/pw as env vars for security
          pass: 'test1234', // storing my un/pw as env vars for security
        },
        pkg: {
          staticresource: ['*']
        }
      }
    },
    clean: {
      build: ['tmp', 'build/package.xml']
    },
    watch: {
    	files: ['src/**/*.js'],
        tasks: ['jshint']
    },
    karma: {
        options: {
          // point all tasks to karma config file
          configFile: 'karma.conf.js'
        },
        unit: {
          // run tests once instead of continuously
          singleRun: true
        }
    }
  });
 
  // custom task to write the -meta.xml file for the metadata deployment
  grunt.registerTask('write-meta', 'Write the required salesforce metadata', function() {
    grunt.log.writeln('Writing metadata...');
    var sr = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">',
      '  <cacheControl>Public</cacheControl>',
      '  <contentType>application/zip</contentType>',
      '  <description>angularResource Description</description>',
      '</StaticResource>'
    ];
    var dest = grunt.template.process('<%= rename.main.dest %>') + '-meta.xml';
    grunt.file.write(dest, sr.join('\n'));
    
  });

  // default task (no deploy)
  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'copy', 'compress', 'rename', 'write-meta' ]);
  grunt.registerTask('nohint', ['clean', 'concat', 'uglify', 'copy', 'compress', 'rename', 'write-meta' ]);
  
  //test task (no uglify)
  grunt.registerTask('dev', ['clean', 'jshint', 'concat', 'copy', 'compress', 'rename', 'write-meta' ]);
  grunt.registerTask('devall', ['test', 'antdeploy']);
  
  grunt.registerTask('test', ['jshint', 'karma']);
  
  // 'all' task including deploy
  grunt.registerTask('all', ['default', 'antdeploy']);
  
  //register watch events
  grunt.event.on('watch', function(action, filepath, target) {
	  grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
  });
  
};
