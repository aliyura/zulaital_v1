<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){

 $request=$app->upper(($_GET['request']));
 $uid=$app->real($_GET['id']);

if($request=='DELIVERY-FEE'){
      
   $deliveryDetails=$app->find("{1}",'km_fees');
    if($app->count($deliveryDetails)>0){
       while($row=$app->fetch($deliveryDetails)){
           
            $fee=$app->abs($row['DELIVERY_FEE']);
            $code=$app->abs($row['LOCATION_CODE']);  
            $desc=$app->abs($app->capitalize($row['LOCATION_DESC'])); 

             echo('
             {
             "fee": "'.$fee.'",
             "code": "'.$code.'",
             "desc": "'.$desc.'"
             },');
       }
    }
  }
  else if($request=='SHIPPING'){
      $shippingFee=$app->real($_GET['fee']);
      $shippingArea=$app->real($_GET['area']);
         
    $deliveryDetails=$app->find("{location_code='$shippingArea'}",'km_fees');
    if($app->count($deliveryDetails)>0){
       if($row=$app->fetch($deliveryDetails)){
           
         $fee=$app->abs($row['DELIVERY_FEE']);
         $code=$app->abs($row['LOCATION_CODE']);
      
         $updateShipping=$app->update("{shipping_area='$code',shipping_fee='$fee' ?=@ owner_id='$uid'}",'s_cart');
         if($updateShipping==1){
              echo('success');
         }else{
           echo('Unabl to  update shipping city');
         }
      }
    }else{
        echo('Delivery location not recognized');
    }   
  }
  else{
     //Request with no Params.
      echo('Unknown Request !');
  }
}
else{
    echo('connection_failed');
}
?>