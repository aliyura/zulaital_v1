<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();
if($con){
    
$request=trim($app->real(($_GET['request'])));
$uid=$app->real($_GET['id']);

if($request=='TOTAL'){

  $payableAmount=0;
  $items="";
  $count=0;
    
  $cartItems=$app->find("{owner_id='$uid'}",'km_user_carts');  
   if($app->rows($cartItems)>0){     
       
         while($row=$app->fetch($cartItems)){
             
              $item_id=$app->abs($row['ITEM_ID']); 
              $contity=intval($app->abs($row['CONTITY'])); 
              $shippingFee=$app->abs($row['SHIPPING_FEE']); 
              $shippingArea=$app->abs($row['SHIPPING_AREA']); 
              $total=0;
              $count++;
             
             $itemDetails=$app->find("{upload_id='$item_id'}",'km_items');
              if($app->rows($itemDetails)>0){     
                  
                  if($get=$app->fetch($itemDetails)){
                      
                        $item_price=$app->abs($app->capitalize($get['PRICE']));
                        $item_name=$app->abs($app->capitalize($get['ITEM_NAME']));
                        $item_discount=intval($app->abs($get['DISCOUNT']));
                        $oldPrice=$newPrice=0;

                      if($item_discount=='0' or $item_discount==0 or $item_discount=='' or $item_discount=='None' ){
                          $oldPrice=$item_price;
                          $newPrice=$item_price;
                      }else{
                           $oldPrice=$item_price;
                           $newPrice=round($item_price*((100-$item_discount)/100),2);
                      }
                      $payableAmount=$payableAmount+intval($newPrice);
                      $items=$items.','.$item_name;
                }
            }
         }
                      //get shipping detaills
       $deliveryDetails=$app->find("{location_desc like '%$shippingArea%'}",'km_fees');
       if($app->count($deliveryDetails)>0){
           if($have=$app->fetch($deliveryDetails)){
               $shippingFee=$app->abs($have['DELIVERY_FEE']);
            }
         }else{
             $shippingFee=0;
         }
    
       if($contity>0 and $contity!='0' and $contity!=''){
          $payableAmount=intval($payableAmount*$contity);
       }
       
       if($shippingFee!='null' and $shippingFee!=null and $shippingFee!=''){
           $payableAmount=($payableAmount+intval($shippingFee));
       }
    
       $items=substr($items,1,strlen($items));
       echo('
         success:
         {
         "name":"'.$items.'",
         "total":"'.$payableAmount.'",
         "count":"'.$count.'"
         }
       ');
   }
   else{
       echo('-1');
   }
}else{
    
   $cartItems=$app->find("{owner_id='$uid' order by date desc}",'km_user_carts');  
   if($app->rows($cartItems)>0){     
       
         while($row=$app->fetch($cartItems)){

              $cart_id=$app->abs($row['ID']); 
              $owner_id=$app->abs($row['OWNER_ID']); 
              $item_id=$app->abs($row['ITEM_ID']); 
              $contity=intval($app->abs($row['CONTITY'])); 
              $color=$app->abs($app->capitalize($row['COLOR']));
              $size=$app->abs($row['SIZE']); 
              $shippingArea=$app->abs($row['SHIPPING_AREA']); 
              $shippingFee=$app->abs($row['SHIPPING_FEE']); 
              $total=0;
             
              $itemDetails=$app->find("{upload_id='$item_id'}",'km_items');
              if($app->rows($itemDetails)>0){     
                  
                  if($get=$app->fetch($itemDetails)){
                      
                        $item_owner_id=$app->abs($get['ID']); 
                        $item_name=$app->abs($app->capitalize($get['ITEM_NAME']));
                        $item_price=$app->abs($app->capitalize($get['PRICE']));
                        $item_condition=$app->abs($app->capitalize($get['ITEM_CONDITION']));
                        $item_colors=$app->abs($get['COLORS']); 
                        $item_sizes=$app->abs($get['SIZES']); 
                        $item_discount=intval($app->abs($get['DISCOUNT']));
                        $sample=$app->abs($get['SAMPLE_1']);
                        $samplesDir=$hostname.'/samples/'.$item_owner_id.'/';
                        $oldPrice=$newPrice=0;

                      if($item_discount=='0' or $item_discount==0 or $item_discount=='' or $item_discount=='None' ){
                          $oldPrice=$item_price;
                          $newPrice=$item_price;
                      }else{
                           $oldPrice=$item_price;
                           $newPrice=round($item_price*((100-$item_discount)/100),2);
                      }
                      
                      if($contity>0 and $contity!='0' and $contity!=""){
                        $total=intval($newPrice*$contity);
                        $newPrice=($newPrice);
                      }else{
                         $total=$newPrice;
                         $newPrice=($newPrice);  
                      }
                      
                      //get shipping detaills
                      $deliveryDetails=$app->find("{location_desc like '%$shippingArea%'}",'km_fees');
                      if($app->count($deliveryDetails)>0){
                         if($have=$app->fetch($deliveryDetails)){
                             
                             $shippingFee=$app->abs($have['DELIVERY_FEE']);
                             $shippingCode=$app->abs($have['LOCATION_CODE']);
                             $shippingArea=$app->abs($have['LOCATION_DESC']);
                          }
                       }else{
                          //if no location selected
                           $shippingFee='null';
                           $shippingCode='null';
                           $shippingArea='null';
                       }
                       
                        if($item_colors=='' and $item_colors==null and $item_colors='null'){
                            $item_colors='none';
                        }
                        if($item_sizes=='' and $item_sizes==null and $item_sizes='null'){
                            $item_sizes='none';
                        }
                       
                       $result='{
                       "id":"'.$cart_id.'",
                       "owner_id":"'.$owner_id.'", 
                       "item_id":"'.$item_id.'", 
                       "name":"'.$item_name.'", 
                       "price":"'.$newPrice.'",
                       "total":"'.$total.'", 
                       "contity":"'.$contity.'", 
                       "colors":"'.$item_colors.'",
                       "sizes":"'.$item_sizes.'",
                       "selected_color":"'.$color.'", 
                       "selected_size":"'.$size.'",  
                       "shipping_code":"'.$shippingCode.'",  
                       "shipping_area":"'.$shippingArea.'", 
                       "shipping_fee":"'.$shippingFee.'",
                       "sample":"'.$samplesDir.$sample.'"
                       },';
                      echo($result);   
                  }
                  
              }else{
                  echo('not_found');  
              }
        } 
   }else{ 
     echo('not_found');    
   }      
}
    
}
else{
    echo('connection_failed');
}
?>