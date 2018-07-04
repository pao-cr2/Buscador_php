/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
//playVideoOnScroll();


$(document).ready(()=> {
//funcion que inserta las opciones desde el archivo data-1 hasta la vista
    var insertarOpciones = function(respuesta, control){ $(control).append(respuesta).material_select(); };
    Req("paginas/Lista_ciudades.php", {}, "selectCiudad", false, insertarOpciones);
    Req("paginas/Lista_Tipo.php", {}, "selectTipo", false, insertarOpciones);

    //seleccionar los datos del archivo data-1 y mostrarlos en el archivo Mostrar_resultado
    $("#submitButton").click((event)=>{
      event.preventDefault();
      let Filtro_1 = true;
      let Filtro_Ciudad = $("#selectCiudad").val();
      let Filtro_Tipo = $("#selectTipo").val();
      let Filtro_precio_ini = $("#rangoPrecio").val().split(";")[0];
      let Filtro_precio_fin = $("#rangoPrecio").val().split(";")[1];
      Req("paginas/Mostrar_resultado.php", {Fil1: Filtro_1,
                                    Filciudad: Filtro_Ciudad,
                                    Filtipo: Filtro_Tipo,
                                    Filprecioini: Filtro_precio_ini,
                                    Filpreciofin: Filtro_precio_fin
                                  });
    });
    //opcion mostrar todos permite visualizar todo el contenido de la data
    $("#mostrarTodos").click((event)=>{
      let Filtro_precio_ini = $("#rangoPrecio").val().split(";")[0];
      let Filtro_precio_fin = $("#rangoPrecio").val().split(";")[1];
      Req("paginas/Mostrar_resultado.php", {
        Filprecioini: Filtro_precio_ini,
        Filpreciofin: Filtro_precio_fin
      });
    });

  });

//controlador de datos
  function Req(urlReq, Submit, View="wraperInmuebles", load=true, callback){
      callback = callback || function(){};
      $.ajax({
        method: "POST",
        url: urlReq,
        data: Submit
      })
        .done(function( respuesta) {
          let $control = $( "#" + View );
          if(load){
            $control.html( respuesta );
          }
          callback(respuesta, $control);
        })
        .fail(function( jqXHR, textStatus ) {
          alert( "Request failed: " + textStatus );
        });
  }
