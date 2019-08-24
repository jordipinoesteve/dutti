(function () {

    'use strict';

    angular
        .module('app')
        .factory('ShipsService', ShipsService);

    ShipsService.$inject = ['$http'];
    function ShipsService($http) {

        var service = {GetStarships: GetStarships, ReadStarShip: ReadStarShip};
        return service;

        function GetStarships(url) {

            if (!url) {
                url  ='https://swapi.co/api/starships/'
            }
            return $http.get(url,{
                headers: {
                    'Authorization': 'none'
                }
            }).then(function(res){
                return res.data;
            });

        }

        function ReadStarShip(id) {
            var url  = 'https://swapi.co/api/starships/' + id
            return $http.get(url,{
                headers: {
                    'Authorization': 'none'
                }
            }).then(function(res){
                return res.data;
            });

        }


    }
})();
