<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();
if($con){
    $request=trim($app->real(($_GET['request'])));
    $uid=$app->real($_GET['id']);

    if($request=='DETAILS'){

      $payableAmount=0;
      $shippingArea='';
        

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

                            $item_owner_id=$app->abs($row['ID']); 
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
                            $total=($newPrice*$contity);
                            $newPrice=number_format($newPrice);
                            $payableAmount=$payableAmount+$total;
                          }else{
                            $total=$newPrice;
                            $newPrice=number_format($newPrice);
                            $payableAmount=$payableAmount+$total;  
                          }
                      
                          
                          
                           $result='{
                           "id":"'.$cart_id.'",
                           "owner_id":"'.$owner_id.'", 
                           "item_id":"'.$item_id.'", 
                           "name":"'.$item_name.'", 
                           "price":"'.$newPrice.'",
                           "total":"'.number_format($total).'", 
                           "payable":"'.$payableAmount.'",
                           "contity":"'.$contity.'", 
                           "colors":"'.$item_colors.'",
                           "sizes":"'.$item_sizes.'",
                           "selected_color":"'.$color.'", 
                           "selected_size":"'.$size.'",  
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