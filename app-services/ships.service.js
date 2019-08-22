(function () {

    'use strict';

    angular
        .module('app')
        .factory('ShipsService', ShipsService);

    ShipsService.$inject = ['$http'];
    function ShipsService($http) {

        var service = {GetStarships: GetStarships};
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


    }
})();
