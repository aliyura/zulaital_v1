<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();
if($con){
 //get available shipping addresses
    $addresess='';
     $shippingAddresess=$app->find("{1}",'km_fees');
     if($app->count($shippingAddresess)>0){
        while($val=$app->fetch($shippingAddresess)){

            $Fee=$app->abs($val['DELIVERY_FEE']);
            $Code=$app->abs($val['LOCATION_CODE']);
            $Area=$app->abs($val['LOCATION_DESC']);
            $addresess=$addresess.''.$Area.':'.$Fee.',';
         }
     }else{
       $addresess='null';  
      }

     if($addresess!='null'){
       $addresess=substr($addresess,0,strlen($addresess)-1);
     }
   echo($addresess);   
}
else{
    echo('connection_failed');
}
?>