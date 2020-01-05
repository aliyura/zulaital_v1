<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();

if($con){
$request=trim($app->real(($_GET['request'])));
$subRequest=substr($request,0,strlen($request)-1);
$uid=$app->real($_GET['id']);
$filter='ALL';
$treq=$request;
$location='Nigeria';
$maxRows=20;
$nextRows=0;
$rowTemplate='';
    
if(isset($_GET['filter'])){
    $filter=$_GET['filter'];
}
if(isset($_GET['location'])){
    $location=$_GET['location'];
}
if(isset($_GET['treq'])){
    $treq=$_GET['treq'];
}
if(isset($_GET['next'])){
  $nextRows=$_GET['next'];
}

    if($request=='TOP'){
          $items=$app->find("{status='AC' order by PRICE desc limit 6}",'km_items');
    }else{
        if($filter!='ALL' and $filter!='1'){
            
            if($request=='' || $request==1 || $request=='1'){
                
               $items=$app->find("{status='AC' and $rowTemplate (item_condition='$filter' or market_option='$filter')  and (country like '%$location%' or location like '%$location%' or area like '%$location%')  order by date desc limit $maxRows}",'km_items');
            }else{
              $items=$app->find("{status='AC'  $rowTemplate and (country like '%$location%' or location like '%$location%' or area like '%$location%') and  (ITEM_NAME like '%$request%' or ITEM_NAME like '%$subRequest%'  or AREA like '%$request%' or AREA like '%$subRequest%'  or CATEGORY like '%$request%' or CATEGORY like '%$subRequest%' or SUB_CATEGORY like '%$request%' or SUB_CATEGORY like '%$subRequest%' or LOCATION like '%$request%' or LOCATION like '%$subRequest%' or PRICE like '%$request%' or PRICE like '%$subRequest%' or DATE like '%$request%' or DESCRIPTION like '%$request%' or MARKET_OPTION like '%$request%' or ITEM_CONDITION like '%$request%') or (ITEM_NAME like '%$treq%' or AREA like '%$treq%' or CATEGORY like '%$treq%' or SUB_CATEGORY like '%$treq%' or LOCATION like '%$treq%' or PRICE like '%$treq%' or DATE like '%$treq%' or DESCRIPTION like '%$treq%' or MARKET_OPTION like '%$treq%' or ITEM_CONDITION like '%$treq%') and (item_condition='$filter' or market_option='$filter') order by date desc limit $maxRows}",'km_items');
            }

        }else{
            if($request=='' || $request==1 || $request=='1'){
               $items=$app->find("{status='AC' $rowTemplate and (country like '%$location%' or location like '%$location%' or area like '%$location%') order by date desc limit $maxRows}",'km_items');
            }else{
              $items=$app->find("{status='AC'  $rowTemplate and (country like '%$location%' or location like '%$location%' or area like '%$location%') and (ITEM_NAME like '%$request%' or ITEM_NAME like '%$subRequest%'   or AREA like '%$request%' or AREA like '%$subRequest%'  or CATEGORY like '%$request%' or CATEGORY like '%$subRequest%' or SUB_CATEGORY like '%$request%' or SUB_CATEGORY like '%$subRequest%' or LOCATION like '%$request%' or LOCATION like '%$subRequest%' or PRICE like '%$request%' or PRICE like '%$subRequest%' or DATE like '%$request%' or DESCRIPTION like '%$request%' or MARKET_OPTION like '%$request%' or ITEM_CONDITION like '%$request%') or (ITEM_NAME like '%$treq%' or AREA like '%$treq%' or CATEGORY like '%$treq%' or SUB_CATEGORY like '%$treq%' or LOCATION like '%$treq%' or PRICE like '%$treq%' or DATE like '%$treq%' or DESCRIPTION like '%$treq%' or MARKET_OPTION like '%$treq%' or ITEM_CONDITION like '%$treq%') order by date desc limit $maxRows}",'km_items');
            }
        }
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
            $item_vendor=$app->abs($app->capitalize($row['VENDOR'])); 
            $item_duration=$app->abs($app->capitalize($row['DURATION']));   
            $item_target=$app->abs($app->capitalize($row['TARGET'])); 
            $item_warranty=$app->abs($app->capitalize($row['WARRANTY'])); 
            $item_discount=intval($app->abs($row['DISCOUNT']));
            $item_quantity=$app->abs($app->upper($row['QUANTITY']));
            $item_owner_id=$app->abs($row['ID']); 
            $item_upload_id=$app->abs($row['UPLOAD_ID']);
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
            
            echo('
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
             "vendor": "'.$item_vendor.'",
             "duration": "'.$item_duration.'",
             "target": "'.$item_target.'",
             "warranty": "'.$item_warranty.'",
             "contity": "'.$item_quantity.'", 
             "date": "'.$daysAgo.'",
             "count": "'.$sampleCount.'",  
             "rownum": "0",
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