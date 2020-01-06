<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();

if($con){


$request='none';
$uid=$app->real($_GET['id']);
$filter='ALL';
$location='Nigeria';
$maxRows=20;
$nextRows=0;
$rowTemplate='';

if(isset($_GET['request'])){
    $request=trim($app->real(($_GET['request'])));
}
$treq=$request;
$subRequest=substr($request,0,strlen($request)-1);

    if(isset($_GET['itemid'])){
        $itemid=$_GET['itemid'];
        $items=$app->find("{status='AC' and  upload_id='$itemid' order by PRICE desc limit 1}",'km_items');
    }else{
       $items=$app->find("{ 1!=1 order by PRICE desc limit 1}",'km_items');    
    }


    if($app->rows($items)>0){       
        $user_name='Klasymall';  
        $user_email='order@klassymall.com';
        $user_mobile='+2348000000000';
        $sampleCount=1;
        $samples='';
           
        while($row=$app->fetch($items)){
            
            $item_name=$app->abs($app->capitalize($row['ITEM_NAME']));
            $item_absName=$item_name;
            $item_category=$app->abs($app->capitalize($row['CATEGORY']));
            $item_location=$app->abs($app->capitalize($row['LOCATION']));
            $item_price=$app->abs($app->capitalize($row['PRICE'])); 
            $item_condition=$app->abs($app->capitalize($row['ITEM_CONDITION']));
            $item_published_date=$app->abs($app->capitalize($row['DATE']));
            $item_published_date=$app->abs($app->capitalize($row['DATE']));
            $item_condition=$app->abs($app->capitalize($row['ITEM_CONDITION']));
            $item_description=$app->abs($app->capitalize($row['DESCRIPTION']));  
            $item_colors=$app->abs($row['COLORS']); 
            $item_sizes=$app->abs($row['SIZES']); 
            $item_gender=$app->abs($app->capitalize($row['GENDER']));
            $item_target=$app->abs($app->capitalize($row['TARGET'])); 
            $item_warranty=$app->abs($app->capitalize($row['WARRANTY'])); 
            $item_discount=intval($app->abs($row['DISCOUNT']));
            $item_quantity=$app->abs($app->upper($row['QUANTITY']));
            $item_owner_id=$app->abs($row['ID']); 
            $item_upload_id=$app->abs($row['UPLOAD_ID']);
            $rowcount=$app->abs($row['COUNT']); 
            $myday = new DateTime($item_published_date);
            $date_ago= $myday->format('Y-m-d H:i:s');
            $daysAgo=time_elapsed_string($date_ago);
            $item_name=substr($item_name,0,50);
            $sample=$app->abs($row['SAMPLE_1']);
            $samplesDir=$hostname.'/samples/'.$item_owner_id.'/';
            $itemsSamples=array($app->abs($row['SAMPLE_1']),$app->abs($row['SAMPLE_2']),
                                $app->abs($row['SAMPLE_2']),$app->abs($row['SAMPLE_3']),
                                $app->abs($row['SAMPLE_4']),$app->abs($row['SAMPLE_5']),
                                $app->abs($row['SAMPLE_6']),$app->abs($row['SAMPLE_7']),
                                $app->abs($row['SAMPLE_8']));
            
             $sampleCount=0;
             $samples='';
             for($i=0; $i<count($itemsSamples); $i++){
                  if($itemsSamples[$i]!=='' and $itemsSamples[$i]!==null && $itemsSamples[$i]!='not_set'){
                    $sampleCount++;
                  }
              }
             
             if($sampleCount>1){
                 for($i=0; $i<count($itemsSamples); $i++){
                      if($itemsSamples[$i]!=='' and $itemsSamples[$i]!==null && $itemsSamples[$i]!='not_set'){
                        $samples=$samples.'"sample'.$i.'": "'.$samplesDir.$itemsSamples[$i].'",';
                      }
                 }
             }else{
                  $samples=$samples.'"sample1": "'.$samplesDir.$sample.'",';
             }
              
             $samples=trim($samples);
             if(substr($samples, -1, 1) == ','){
               $samples = substr($samples, 0, -1);
             }
            
             if(!$item_price){
                $item_price=0;
             }
             $oldPrice=$newPrice=0;
            
             if($item_discount=='0' or $item_discount==0 or $item_discount=='' or $item_discount=='None' ){
                $oldPrice=$item_price;
                $newPrice=$item_price;
             }else{
                 $oldPrice=$item_price;
                 $newPrice=round($item_price*((100-$item_discount)/100),2);
             }
            
                
             $user_info=$app->find("{id='$item_owner_id' order by created_date desc limit 1}",'km_users');
             if($app->count($user_info)>0){
                if($row=$app->fetch($user_info)){
                    $user_name=$app->abs($app->capitalize($row['NAME']));  
                    $user_email=$app->abs($app->capitalize($row['EMAIL_ADDRESS']));
                    $user_mobile=$app->abs($app->capitalize($row['MOBILE_NUMBER']));
                }
             }
             
          
            if($item_colors=='' and $item_colors==null and $item_colors='null'){
                $item_colors='none';
            }
            if($item_sizes=='' and $item_sizes==null and $item_sizes='null'){
                $item_sizes='none';
            }
            
            echo('success:
             {
             "id": "'.$item_upload_id.'", 
             "name": "'.$item_name.'",
             "request": "'.$request.'",
             "price": "'.number_format($item_price).'", 
             "oldPrice": "'.number_format($oldPrice).'", 
             "newPrice": "'.number_format($newPrice).'",  
             "category": "'.$item_category.'",
             "location": "'.$item_location.'", 
             "condition": "'.$item_condition.'",
             "discount": "'.$item_discount.'", 
             "sample": "'.$samplesDir.$sample.'",
             "samples": {'.$samples.'},
             "request": "'.$app->capitalize($request).'",
             "location": "'.$item_location.'",
             "condition": "'.$item_condition.'",
             "description": "'.$item_description.'",
             "colors": "'.$item_colors.'",
             "sizes": "'.$item_sizes.'",
             "gender": "'.$item_gender.'",
             "target": "'.$item_target.'",
             "warranty": "'.$item_warranty.'",
             "contity": "'.$item_quantity.'", 
             "date": "'.$daysAgo.'",
             "count": "'.$sampleCount.'",  
             "rownum": "'.$rowcount.'",
             "rows": "'.number_format($app->rows($items)).'",
             "owner_id": "'.$item_owner_id.'",
             "owner_name": "'.$user_name.'",
             "owner_email": "'.$user_email.'",
             "owner_mobile": "'.$user_mobile.'",
             }
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