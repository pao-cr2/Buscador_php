<?php
try
{
  $data = file_get_contents("data-1.json");
  $viviendas = json_decode($data);
  $ciudades = [];
  //recorrer las ciudades de la data
  foreach ($viviendas as $key => $json) {
    $ciudades[] = $json->Ciudad;
  }

  $ciudades = array_unique($ciudades);
  $Opciones_ciu = "";
  //imprimir las opciones encontradas en la data con un ciclo
  foreach ($ciudades as $ciudad) {
    $Opciones_ciu .= "<option value=\"$ciudad\">$ciudad</option>";
  }
  echo $Opciones_ciu;
}
catch(Exception $e)
{
  echo $e->getMessage();
}
?>
