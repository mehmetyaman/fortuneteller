'use strict';

/**
 * @ngdoc function
 * @name fortunetellerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fortunetellerApp
 */
angular.module('fortunetellerApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
