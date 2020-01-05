<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
$items=$app->find("{AUTOCOMPLETE_CODE='$request'}",'km_autocomplete');
    if($app->rows($items)>0){   
        if($row=$app->fetch($items)){ 
                $base='';
                $dump=explode(',',$row['AUTOCOMPLETE_TEXT']);
                for($i=0; $i<count($dump); $i++){
                    if($dump[$i]!==''){
                        if(strpos($base,$dump[$i])<=0){
                           $base=$base.$dump[$i].',';
                        }
                    }
                }
             echo(trim($base));
        }
    }else{
      echo('failed_to_fetch_autocomplete_dump'); 
     }
}
else{
    echo('connection_failed');
}
?>