<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();

if($con){
$request=trim($app->real(($_GET['request'])));
$subRequest=substr($request,0,strlen($request)-1);
$uid=$app->real($_GET['id']);
$maxRows=10;
$nextRows=0;
$rowTemplate='';
if(isset($_GET['next'])){
  $nextRows=$_GET['next'];
  $rowTemplate=' and count<'.($nextRows);
}

    if($request=='' || $request==1 || $request=='1'){
       $items=$app->find("{status <>'ER' and id='$uid' $rowTemplate order by date desc limit $maxRows}",'s_items');
    }else{
      $items=$app->find("{id='$uid' $rowTemplate and (ITEM_NAME like '%$request%' or ITEM_NAME like '%$subRequest%' or CATEGORY like '%$request%' or CATEGORY like '%$subRequest%' or SUB_CATEGORY like '%$request%' or SUB_CATEGORY like '%$subRequest%' or LOCATION like '%$request%' or LOCATION like '%$subRequest%' or PRICE like '%$request%' or PRICE like '%$subRequest%' or DATE like '%$request%' or DATE like '%$subRequest%' or DESCRIPTION like '%$request%' or DESCRIPTION like '%$subRequest%') order by date desc limit $maxRows}",'s_items');
    }
    
     if($app->rows($items)>0){     
        $user_name='Siyayya';  
        $user_email='order@siyayya.com';
        $user_mobile='+2348000000000';
            
        while($row=$app->fetch($items)){
            
            $item_name=$app->abs($app->capitalize($row['ITEM_NAME']));
            $item_absName=$item_name;
            $item_category=$app->abs($app->capitalize($row['CATEGORY']));
            $item_location=$app->abs($app->capitalize($row['LOCATION']));
            $item_price=$app->abs($app->capitalize($row['PRICE']));
            $item_status=$app->abs($app->upper($row['STATUS']));
            $rowcount=$app->abs($row['COUNT']); 
            $item_condition=$app->abs($app->capitalize($row['ITEM_CONDITION']));
            $item_published_date=$app->abs($app->capitalize($row['DATE']));
            $item_owner_id=$app->abs($row['ID']); 
            $item_upload_id=$app->abs($row['UPLOAD_ID']);
            $myday = new DateTime($item_published_date);
            $date_ago= $myday->format('Y-m-d H:i:s');
            $daysAgo=time_elapsed_string($date_ago);
            $item_name=$item_category.'<br/>'.$item_name;
            $item_name=substr($item_name,0,50);
            $sample=$app->abs($row['SAMPLE_1']);
            $samplesDir=$hostname.'/samples/'.$item_owner_id.'/';
            $itemsSamples=array($app->abs($row['SAMPLE_1']),$app->abs($row['SAMPLE_2']),$app->abs($row['SAMPLE_2']),$app->abs($row['SAMPLE_3']),$app->abs($row['SAMPLE_4']),$app->abs($row['SAMPLE_5']),$app->abs($row['SAMPLE_6']),$app->abs($row['SAMPLE_7']),$app->abs($row['SAMPLE_8']));
            if(!$item_price){
                $item_price=0;
            }
            $abs_Price=($item_price/100*80);
            if(strpos($abs_Price,'.')>0){
              $abs_Price=substr($abs_Price,0,strpos($abs_Price,'.'));
            }
            
               $sampleCount=0;
              for($i=0; $i<count($itemsSamples); $i++){
                if($itemsSamples[$i]!=='' and $itemsSamples[$i]!==null && $itemsSamples[$i]!='not_set'){
                  $sampleCount++;
                 }
               }
         

            if(strlen($item_name)>50){
                $item_name=$item_name.'...';
            }
       
             $user_info=$app->find("{id='$item_owner_id' order by created_date desc limit 1}",'s_users');
             if($app->count($user_info)>0){
                if($row=$app->fetch($user_info)){
                    $user_name=$app->abs($app->capitalize($row['NAME']));  
                    $user_email=$app->abs($app->capitalize($row['EMAIL_ADDRESS']));
                    $user_mobile=$app->abs($app->capitalize($row['MOBILE_NUMBER']));
                }
             }
            
            echo('
             {
             "id": "'.$item_upload_id.'", 
             "name": "'.$item_name.'",
             "price": "'.number_format($item_price).'", 
             "category": "'.$item_category.'",
             "location": "'.$item_location.'", 
             "condition": "'.$item_condition.'", 
             "status": "'.$item_status.'", 
             "sample": "'.$samplesDir.$sample.'",
             "request": "'.$app->capitalize($request).'",
             "date": "'.$daysAgo.'",
             "count": "'.$sampleCount.'",
             "rownum": "'.$rowcount.'",
             "rows": "'.number_format($app->rows($items)).'",
             "owner_id": "'.$item_owner_id.'",
             "owner_name": "'.$user_name.'",
             "owner_email": "'.$user_email.'",
             "owner_mobile": "'.$user_mobile.'"
             },
            ');
           
        }
     }else{ 
        
        if($request=='' || $request==1 || $request=='1'){
            echo('not_found');
        }else{
            echo('not_match');
        }   
     }        
}
else{
    echo('connection_failed');
}
?>