<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();
if($con){
$request=trim($app->real(($_GET['request'])));

    $getAdverts=$app->find("{1}",'s_adverts');
     if($app->rows($getAdverts)>0){     
         if($row=$app->fetch($getAdverts)){
               
              $header1=$app->abs($app->capitalize($row['HEADER_1'])); 
              $header2=$app->abs($app->capitalize($row['HEADER_2'])); 
              $header3=$app->abs($app->capitalize($row['HEADER_3'])); 
              $body1=$app->abs($app->capitalize($row['BODY_1']));
              $body2=$app->abs($app->capitalize($row['BODY_2']));
              $body3=$app->abs($app->capitalize($row['BODY_3']));
              $banner1=$app->abs($app->capitalize($row['BANNER_1'])); 
              $banner2=$app->abs($app->capitalize($row['BANNER_2'])); 
              $banner3=$app->abs($app->capitalize($row['BANNER_3'])); 
        
             
               $result='{
                   "header":{
                    "one": "'.$header1.'",
                      "two": "'.$header2.'",
                        "three": "'.$header3.'"
                   },
                   "body":{
                    "one": "'.$body1.'",
                      "two": "'.$body2.'",
                        "three": "'.$body3.'"
                   }, 
                   "banner":{
                    "one": "'.$banner1.'",
                      "two": "'.$banner2.'",
                        "three": "'.$banner3.'"
                   }
               },';
             
             echo($result);   
         }
     }else{
         echo('no_advert');
     }
}
else{
    echo('connection_failed');
}
?>