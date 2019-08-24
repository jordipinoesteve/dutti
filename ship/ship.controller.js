(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipController', ShipController);

    ShipController.$inject = ['ShipsService', '$scope', '$cookies','$routeParams'];

    function ShipController(ShipsService, $scope, $cookies,$routeParams) {

        var _this = this;

        _this.fetchInfo = function () {
            $("#loading2").attr("style", "display:block;");
            ShipsService.ReadStarShip($routeParams.id)
                .then(function (data) {
                    _this.starship = data;
                    $("#loading2").attr("style", "display:none;");
                    $scope.$digest();

                })
                .catch(function () {
                    _this.error = true;
                    $scope.$digest();
                    $("#loading2").attr("style", "display:none;");
                })
        }
        _this.error = undefined;
        _this.lastResponse = {};
        _this.starship = {};
        _this.fetchInfo();
        _this.id = $routeParams.id;


    }
})();
