<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){  
    $request=$app->upper($_GET['request']);
    if($request=='CHANGE'){
        
        $area=$app->real($_GET['area']);
        $fee=$app->real($_GET['fee']);
        $uid=$app->real($_GET['id']);

        if($area!='' and $fee!=''  and $uid!='none'){
             $modify=$app->update("{SHIPPING_AREA='$area',SHIPPING_FEE='$fee' ?=@ owner_id='$uid'}",'km_user_carts');
             if($modify==1){
                  echo('success');
             }else{
               echo('Unabl to  change your shipping address');
             }
        }
    }
}
else{
    echo('connection_failed');
}
?>