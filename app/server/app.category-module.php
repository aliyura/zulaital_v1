<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=trim($app->upper(($_GET['request'])));
  
    $categories=$app->find("{code='$request'}",'s_categories');  
    if($app->rows($categories)>0){   
        if($row=$app->fetch($categories)){ 
            
        $result='{
           "categories":"'.$app->abs($row['CATEGORY']).'", 
           "subcategories":"'.$app->abs($row['SUB_CATEGORY']).'" 
         }';
        echo('success:'.$result); 
            
        }
     }
}
else{
    echo('connection_failed');
}
?>