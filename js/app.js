'use strict';

var mermoryGame = angular.module('mermoryGame', []);

mermoryGame.service('game', function() {
    var tileName = ['black', 'blue', 'pink', 'red', 'navy', 'green', 'purple', 'teal'];
    return new Game(tileName);
});

mermoryGame.controller('gameCtrl', function gameCtrl($scope, game) {
    $scope.game = game;
});
