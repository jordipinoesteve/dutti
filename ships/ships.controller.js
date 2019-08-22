(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipsController', ShipsController);

    ShipsController.$inject = ['ShipsService', '$scope'];
    function ShipsController(ShipsService,$scope) {
        var _this = this;


        _this.fetchNext = function ()  {
            var url = _this.lastResponse ? _this.lastResponse.next : null;

            ShipsService.GetStarships(url)
            .then(function (data) {
                _this.starships = _this.starships.concat(data.results);
                _this.lastResponse = data;
                $scope.$digest;
            })
            .catch(function () {
                _this.error = true;
                $scope.$digest();
            })
        }
        _this.error = undefined;
        _this.lastResponse = {};
        _this.starships = [];



        _this.fetchNext();

    }
})();
