<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
$itemid=$app->real($_GET['itemid']);
$uid=$app->real($_GET['id']);
// reset previous unfinish upload items
 if($request=='DELETE'){
    
     $items=$app->find("{upload_id='$itemid'}",'km_items');
     if($app->rows($items)>0){   
               
           if($row=$app->fetch($items)){ 
                $sample=$app->abs($row['SAMPLE_1']);
                $samplesDir=$hostname.'/samples/'.$uid.'/';
                $itemsSamples=array($app->abs($row['SAMPLE_1']),$app->abs($row['SAMPLE_2']),
                                    $app->abs($row['SAMPLE_2']),$app->abs($row['SAMPLE_3']),
                                    $app->abs($row['SAMPLE_4']),$app->abs($row['SAMPLE_5']),
                                    $app->abs($row['SAMPLE_6']),$app->abs($row['SAMPLE_7']),
                                    $app->abs($row['SAMPLE_8']));
            
               for($i=0; $i<count($itemsSamples); $i++){
                 if(file_exists($samplesDir.$itemsSamples[$i])){
                     unlink($samplesDir.$itemsSamples[$i]);                                              
                 }
               }
               
               $res= $app->delete("{upload_id='$itemid'}",'km_items');
               if($res==1){
                 echo('success');
               }else{
                   echo('Unable to delete this item!');
               }
           }
         
     }else{
          echo('This item is no longer available!');
     }
  }
}
else{
    echo('connection_failed');
}
?>