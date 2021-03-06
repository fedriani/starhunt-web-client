module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
      '* WorldWide Telescope Web Client\n' +
      '* Copyright 2014-2020 .NET Foundation\n' +
      '* Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
      '**/\n',

    // Task configuration.

    concat: {
      options: {
        banner: '<%= banner %>'
      },
      webclient: {
        src: [
          'ext/intro.js',
          'ext/angular-intro.js',
          'app.js',
          'directives/Scroll.js',
          'directives/Localize.js',
          'directives/ContextMenu.js',
          'directives/EditSlideValues.js',
          'directives/Movable.js',
          'directives/CopyToClipboard.js',
          'factories/appstate.js',
          'factories/autohidepanels.js',
          'factories/localization.js',
          'factories/FinderScope.js',
          'factories/ThumbList.js',
          'factories/Util.js',
          'factories/UILibrary.js',
          'factories/SearchUtil.js',
          'factories/Skyball.js',
          'factories/HashManager.js',
          'factories/MediaFile.js',
          'dataproxy/Places.js',
          'dataproxy/Tours.js',
          'dataproxy/SearchData.js',
          'dataproxy/Astrometry.js',
          'dataproxy/Community.js',
          'controllers/ContextPanelController.js',
          'controllers/MainController.js',
          'controllers/IntroController.js',
          'controllers/MobileNavController.js',
          'controllers/LayerManagerController.js',
          'controllers/tabs/AdsController.js',
          'controllers/tabs/ExploreController.js',
          'controllers/tabs/SearchController.js',
          'controllers/tabs/SettingsController.js',
          'controllers/tabs/ViewController.js',
          'controllers/tabs/ToursController.js',
          'controllers/tabs/CommunityController.js',
          'controllers/tabs/CurrentTourController.js',
          'controllers/modals/TourSlideText.js',
          'controllers/modals/ShareController.js',
          'controllers/modals/OpenItemController.js',
          'controllers/modals/ObservingTimeController.js',
          'controllers/modals/SlideSelectionController.js',
          'controllers/modals/VoConeSearchController.js',
          'controllers/modals/VOTableViewerController.js',
          'controllers/modals/colorpickerController.js',
          'controllers/modals/refframeController.js',
          'controllers/modals/GreatCircleController.js',
          'controllers/modals/DataVizController.js',
          'controllers/modals/EmbedController.js',
          'controllers/modals/ObservingLocationController.js',
          'controllers/LoginController.js',
          'controls/move.js',
          'controls/util.js'
        ],
        dest: 'wwtwebclient.js'
      },
    },

    uglify: {
      options: {
        preserveComments: 'some',
        banner: '<%= banner %>'
      },
      webclient: {
        src: '<%= concat.webclient.dest %>',
        dest: 'wwtwebclient.min.js'
      },
      searchData: {
        src: 'searchdataraw.js',
        dest: 'searchdata.min.js'
      },
    },

    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'webclient.css.map',
          sourceMapFilename: 'css/webclient.css.map'
        },
        src: 'css/webclient.less',
        dest: 'css/webclient.css'
      }
    },

    autoprefixer: {
      options: {
        browsers: [
          "Android 2.3",
          "Android >= 4",
          "Chrome >= 20",
          "Firefox >= 24",
          "Explorer >= 10",
          "iOS >= 6",
          "Opera >= 12",
          "Safari >= 6"
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'css/webclient.css'
      }
    },

    cssmin: {
      options: {
        compatibility: 'ie10',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore: {
        src: 'css/webclient.css',
        dest: 'css/webclient.min.css'
      }
    }
  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask('dist-js', ['concat:webclient', 'uglify:webclient']);
  grunt.registerTask('dist-searchdata', ['uglify:searchData']);
  grunt.registerTask('dist-css', ['less:compileCore', 'autoprefixer:core', 'cssmin:minifyCore']);
};
