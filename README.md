# Documentación sprint
    Se realizan un total de 15 puntos y correcciones de errores detectados.

## Nuevas librerías / actualizaciones
    - Se actualiza la librería de bootstrap a la versión 4.
    - Se añade angular animate.
    - Se añade angular filter.

### Preprocesadores
    - Se trabaja con el fichero sass/main.scss mediante sass.

#### Tareas Realizadas    
    - Correcciones de carga infinita de naves, carga de imagen por defecto si una nave no tiene imagen y redirección al listado de naves cuando la url es /.
    
    - Implementar sistema de cache para evitar las mismas peticiones de forma repetida. Se escoge realizar esta tarea porque mientras se realizó un estudio de la documentación de la API, la misma se cayó en varias ocasiones y cuando se levantaba de nuevo, las peticiones tardaban mucho. Además, la API tiene, aunque muy elevado, un límite de peticiones, lo que podría dejar de funcionar la web en el caso de que se llegue al límite y la implementación de la cache retrasa la llegada al mismo. **5 puntos**.

    - Modernización del site. Se realiza esta tarea porque se considera que teniendo el mismo código a implementar en la web de Massimo Dutti, si se inspecciona el código, facilita mucho el trabajo. Se implementa un sistema de filtrado en la lista de naves para que el diseño se parezca al listado de productos de Massimo Dutti. Se añade también, carga automática de productos al realizar scroll hacia abajo, como en Massimo Dutti. **5 puntos**.
    
    - Creación de una ficha de detalle de la nave. Se realiza esta tarea debido a que esta potenciaba la segunda tarea realizada, en el sentido de que accedes primero al listado de elementos y luego puedes pulsar sobre ese elemento para ver el detalle. **5 puntos**.