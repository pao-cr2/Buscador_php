<?php
try
{
  $data = file_get_contents("data-1.json");
  $viviendas = json_decode($data);
  $tipos = [];

  //recorrer los tipos de vivienda en el archivo data-1.json
  foreach ($viviendas as $key => $json) {
    $tipos[] = $json->Tipo;
  }

  $tipos = array_unique($tipos);
  $Opciones_tip = "";

  //imprimir las opciones tipo
  foreach ($tipos as $tipo) {
    $Opciones_tip .= "<option value=\"$tipo\">$tipo</option>";
  }
  echo $Opciones_tip;
}
catch(Exception $e)
{
  echo $e->getMessage();
}
?>
