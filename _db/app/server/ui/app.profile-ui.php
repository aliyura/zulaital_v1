<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();

if($con){
 $uid=trim($app->real($_GET['id']));
 $request=trim($app->real(($_GET['request'])));
    
    if($request==2){
       $other=trim($app->real($_GET['other']));
       $getProfile=$app->find("{id='$other' and status not in('ER')}",'km_users');
    }else{
      $getProfile=$app->find("{id='$uid' and status not in('ER')}",'km_users');
    }
    if($app->count($getProfile)>0){
                    
           if($row=$app->fetch($getProfile)){
            
              $DP=$app->abs($row['DP']);
              $MSISDN=preg_replace('/^0/', '', $row['MOBILE_NUMBER'], 1);
              $description=$app->capitalize($app->abs($row['DESCRIPTION']));
              if($description=='' or $description==null){
                 $description='No Description';
              }
              $result='{
              "id":"'.$app->abs($row['ID']).'",
              "other":'.$request.', 
              "name":"'.$app->capitalize($app->abs($row['NAME'])).'", 
              "email":"'.$app->capitalize($app->abs($row['EMAIL_ADDRESS'])).'", 
              "mobile":"'.$MSISDN.'", 
              "address":"'.$app->capitalize($app->abs($row['ADDRESS'])).'", 
              "description":"'.$description.'", 
              "username":"'.$app->abs($row['USERNAME']).'", 
              "offer":"'.$app->upper($app->abs($row['OFFER_CODE'])).'",
              "oc":"'.$app->upper($app->abs($row['OC_FLAG'])).'", 
              "dob":"'.$app->upper($app->abs($row['DOB'])).'", 
              "city":"'.$app->capitalize($app->abs($row['CITY'])).'", 
              "category":"'.$app->capitalize($app->abs($row['CATEGORY'])).'", 
              "profile":"'.$app->capitalize($app->abs($row['PROFILE_TYPE'])).'",
              "dp":"'.$DP.'"
              }';
             echo('success:'.$result);
           }
    }else{
        echo('not_found');
    }
}
else{
    echo('connection_failed');
}
?>