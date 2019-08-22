angular.module('app').directive('noImage', function() {
    return {
            restrict:"A",
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    attrs.$set('src', attrs.noImage);
                });
            }
    }
});
/*
    Funcionamiento:
        En esta directiva se enlaza el evento de error del elemento imagen en el caso de que el enlace de la misma devuelva un 404.
        En el caso de que salte el evento de error del elemento, se modifica el atributo src de la imagen por una imagen por defecto.
        Se restringe de manera que solo pueda utilizarse la directiva como atributo de un elemento.
*/
