(function () {
    'use strict';

    angular
        .module('app')
        .controller('ShipsController', ShipsController);

    ShipsController.$inject = ['ShipsService', '$scope'];
    function ShipsController(ShipsService,$scope) {
        var _this = this;
        var cancel = false; //Variable de control cancelar en caso de que no hayan más naves.

        _this.fetchNext = function ()  {

            if (cancel) {return}; //Cancelar llamada en caso de que no hayan más naves para mostrar.

            var url = _this.lastResponse ? _this.lastResponse.next : null;

            ShipsService.GetStarships(url)
            .then(function (data) {

                //Evitar naves duplicadas en la vista en el caso de que se hagan las peticiones a API muy seguidas.
                if (_this.lastResponse.next != data.next){
                    _this.starships = _this.starships.concat(data.results);
                    _this.lastResponse = data;
                }


                if(data.next == null){
                    cancel = true; //cancelar más llamadas a API.
                }

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
