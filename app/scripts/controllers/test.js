'use strict';

/**
 * @ngdoc function
 * @name fortunetellerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fortunetellerApp
 */
angular.module('fortunetellerApp')
  .controller('TestCtrl', ['$scope', '$http','$timeout',
    function ($scope, $http, $timeout) {

      $scope.predictions = [];
      $scope.pageSize = 5;
      $scope.curPage = 0;

      $scope.getPreds = function(){
        $http.get('http://localhost:3000/predictions')
          .success(function (response) {
            $scope.predictions = response;
            $scope.numberOfPages = function() {
              return Math.ceil($scope.predictions.length / $scope.pageSize);
            };
          });
      };

      $scope.getCategories = function(){
        $http.get('http://localhost:3000/categories')
          .success(function (response) {
            $scope.categories = response;

          });
      };

      $timeout(function(){
        $scope.getPreds();
        }, 3000);

      $scope.addPred = function () {

        var dataObj = {
          name: $scope.title,
          title: $scope.name
        };

        var preds = $scope.predictions;

        $http({
          url: 'http://localhost:3000/predictions/add',
          method: 'POST',
          crossDomain: true,
          headers: {'Content-Type': 'application/json'},
          data: dataObj
        }).success(function () {
          preds.push({
            owner: $scope.owner,
            predDate: $scope.predDate
          });
        });
      };

      $scope.newOne = function () {
        $scope.edit = true;
      };


      $scope.removePreds = function (pred) {

        var dataObj = {
          owner: pred.owner,
          predId: pred._id
        };

        $http({
          url: 'http://localhost:3000/predictions/remove',
          method: 'POST',
          crossDomain: true,
          headers: {'Content-Type': 'application/json'},
          data: dataObj
        }).success(function () {
          var index = $scope.predictions.indexOf(pred);
          $scope.predictions.splice(index, 1);
        });
      };

      $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
      ];

      $scope.status = {
        isopen: false
      };

      $scope.toggled = function(open) {
        console.log('Dropdown is now: ', open);
      };

      $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
      };

      $scope.getPreds();
      $scope.getCategories();

    }]).filter('pagination', function()
  {
    return function(input, start)
    {
      start = +start;
      return input.slice(start);
    };
  });
