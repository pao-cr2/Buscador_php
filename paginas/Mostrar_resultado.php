<?php
$data = file_get_contents("data-1.json");
$viviendas = json_decode($data);
$filtro1 = (isset($_POST["Fil1"]) && boolval($_POST["Fil1"]));

$Filtroprecioini = $_POST["Filprecioini"];
$Filtropreciofin = $_POST["Filpreciofin"];
$marcarCiudad = true;
$marcarTipo = true;
$marcarPrecio = true;

try {
  //recorrer archivo data
  foreach($viviendas as $key => $json) {
    //alamacenar variable precio
    $precio = str_ireplace(["$",","], "", $json->Precio);
    $precio = intval($precio);
    //condicional de precio
    $marcarPrecio = ($precio >= intval($Filtroprecioini) && $precio <= intval($Filtropreciofin));
    //si se habilitan los filtros
    if($filtro1){
      $marcarCiudad =  ($marcarCiudad=="" || (!empty($Filtro_Ciudad) && $json->Ciudad == $Filtro_Ciudad));
      $marcarTipo = ($marcarTipo=="" || (!empty($Filtro_Tipo) && ($json->Tipo == $Filtro_Tipo)));
    }
    //Al aplicar un filtro que no coincide continua el ciclo
    if($filtro1 && !($marcarCiudad && $marcarTipo && $marcarPrecio)){
      continue;
    }
?>
 <div class="row">
   <div class="col m12">
      <div class="card horizontal itemMostrado">
        <img src="img/home.jpg" width="120px" height="120px">
        <div class="card-stacked">
          <div class="card-content">
            <?php
              foreach($json as $keyProp => $prop){
                $class = ($keyProp=="Precio") ? 'class="precioTexto"' : null;
                if($keyProp=="Id"){ continue; }
                echo "<p><strong>$keyProp:</strong> <span $class>$prop</span><p>";
              }
             ?>
          </div>
          <div class="card-action">
            <a href="#" class="precioTexto">Ver mas</a>
          </div>
        </div>
      </div>
    </div>
 </div>
<?php
  }
}catch (Exception $e) {
  echo $e->getMessage();
}
?>
