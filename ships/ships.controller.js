(function () {
        'use strict';

        angular
            .module('app')
            .controller('ShipsController', ShipsController);

        ShipsController.$inject = ['ShipsService', '$scope', '$cookies'];

        function ShipsController(ShipsService, $scope, $cookies) {

            $(window).off('scroll', windowscroll) // Si venimos de otra vista, hay que quitar el evento
            window.scrollTo(0, 0); //Empezar siempre listado desde arriba.

            var windowscroll = function () {
                if ($(window).scrollTop() == 0 || ($(document).height()) - $(window).height() < 0) {
                    return
                }
                if ($(window).scrollTop() >= ($(document).height()) - $(window).height()) {
                    $(window).off('scroll', windowscroll)
                    $("#next").click(); //Parte de correcciones, se pone en vez de _this.fetchNext()

                    if($("#next").html() == undefined){
                        $(window).on('scroll', windowscroll) //caso en que el botón no esté disponible
                    }


                }
            }

            var _this = this;
            var cancel = false; //Variable de control cancelar en caso de que no hayan más naves.
            var page = 1;

            _this.fetchNext = function () {
                if (cancel) {
                    return
                }; //Cancelar llamada en caso de que no hayan más naves para mostrar.

                var url = _this.lastResponse ? _this.lastResponse.next : null;

                if ($cookies.get("localAPI" + page)) {
                    _this.fillData(JSON.parse(localStorage.getItem("page" + page)));

                } else {
                    $("#loading").attr("style", "display:block");
                    ShipsService.GetStarships(url)
                        .then(function (data) {

                            //Borrar localstorage en caso de que la llamada sea exitosa.
                            localStorage.removeItem("page" + page);

                            //Guardar cookie de caducidad 5 minutos para no atacar constantemente a la API.
                            _this.setTimer(data, page)

                            _this.fillData(data)
                            $("#loading").attr("style", "display:none");
                        })
                        .catch(function () {
                            // Si falla la API, comprobar si tiene datos en localstorage aunque la cookie esté caducada, considerando que es mejor mostrar datos a un mensaje de error.
                            if (localStorage.getItem("page" + page)) {
                                _this.fillData(JSON.parse(localStorage.getItem("page" + page)));
                                $("#loading").attr("style", "display:none");
                            } else {
                                _this.error = true;
                                $("#loading").attr("style", "display:none");
                            }


                            $scope.$digest();
                        })
                }




            }

            _this.fillData = function (data) {
                //Evitar naves duplicadas en la vista en el caso de que se hagan las peticiones a API muy seguidas.
                if (_this.lastResponse.next != data.next) {
                    _this.starships = _this.starships.concat(data.results);
                    _this.lastResponse = data;
                    page = page + 1;
                }

                if (data.next == null) {
                    cancel = true; //cancelar más llamadas a API.
                    $(window).off('scroll', windowscroll)

                }

                $scope.$digest;


                window.scrollTo(0, $(document).height() - $(window).height() - 10)

                $(window).on('scroll', windowscroll)

        }

        _this.setTimer = function (data, page) {
            localStorage.setItem("page" + page, JSON.stringify(data))
            var cookieExp = new Date((new Date()).getTime() + 1000 * 60 * 5);
            $cookies.put('localAPI' + page, 'true', {
                expires: cookieExp
            });
        }

        _this.error = undefined;
        _this.lastResponse = {};
        _this.starships = [];


        $(window).off('scroll', windowscroll)
        _this.fetchNext();

    }
})();
