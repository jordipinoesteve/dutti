(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipController', ShipController);

    ShipController.$inject = ['ShipsService', '$scope', '$cookies','$routeParams','$location'];

    function ShipController(ShipsService, $scope, $cookies,$routeParams,$location) {

        var _this = this;

        _this.fetchInfo = function () {
            $("#loading2").attr("style", "display:block;");

            //Método de lectura de nave pasando parámetro id
            ShipsService.ReadStarShip($routeParams.id)
                .then(function (data) {
                    _this.starship = data;
                    $("#loading2").attr("style", "display:none;");
                })
                .catch(function (err) {
                    //Si la nave no existe, por ejemplo, accediendo a traves de url con un id inexistente, redirige a ships.
                    $location.url("/ships")
                    $("#loading2").attr("style", "display:none;");
                })
        }
        _this.lastResponse = {};
        _this.starship = {};
        _this.fetchInfo();
        _this.id = $routeParams.id;


    }
})();
