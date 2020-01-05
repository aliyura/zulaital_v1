<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();

if($con){
$request=$app->upper($app->real(($_GET['request'])));
$uid=$app->real($_GET['id']);
$order_id=$app->real($_GET['orderid']);
    
    $orderItems=$app->find("{order_id='$order_id' order by date desc limit 1}",'km_user_orders');  
    if($app->rows($orderItems)>0){     
        
        $itemNames='';
        $itemSamples=''; 
        $orderedItems='';
        $totalPrice=0;
        $userDP='';
        $oldPrice=0;
        $newPrice=0;
        $orderAvailable
        =$customerAvailable
        =$orderDetailsAvailable
        =$shippingDetailsAvailable
        =$itemsAvailable=false;
    
         if($row=$app->fetch($orderItems)){

              $order_id=$app->abs($row['ORDER_ID']); 
              $order_type=$app->upper($app->abs($row['ORDER_TYPE']));  
              $order_status=$app->upper($app->abs($row['STATUS'])); 
              $order_date=$app->upper($app->abs($row['DATE']));
              $order_reference_number=$app->abs($row['REFRENCE_NUMBER']);
              $sender_id=$app->abs($row['SENDER_ID']); 
              $name=$app->capitalize($app->abs($row['NAME'])); 
              $address_line1=$app->capitalize($app->abs($row['ADDRESS_1']));
              $address_line2=$app->capitalize($app->abs($row['ADDRESS_1']));  
              $mobile_number=$app->capitalize($app->abs($row['MOBILE_NUMBER']));
              $email_address=$app->capitalize($app->abs($row['EMAIL_ADDRESS']));  
              $delivery_area=$app->capitalize($app->abs($row['DELIVERY_AREA'])); 
              $payment_status=$app->upper($app->abs($row['PAYMENT_STATUS'])); 
              $orderAvailable=true;
             
              $myday = new DateTime($order_date);
              $date_ago= $myday->format('Y-m-d H:i:s');
              $daysAgo=time_elapsed_string($date_ago);
             
              $getProfile=$app->find("{id='$sender_id' and status not in('ER')}",'km_users');
              if($app->rows($getProfile)>0){     
                  if($get=$app->fetch($getProfile)){
                       $userDP=$app->abs($get['DP']);
                       $customerAvailable=true;
                  }
              }
             
              $orderDetails=$app->find("{order_id='$order_id' and owner_id='$sender_id'}",'km_user_orders_dtl');
              if($app->rows($orderDetails)>0){     
                  
                  $orderedItems=$app->rows($orderDetails);
                  $orderDetailsAvailable=true;
        
                  while($get=$app->fetch($orderDetails)){
                      
                      $itemNames.=$app->capitalize($app->abs($get['ITEM_NAME'])); 
                      $order_id=$app->abs($get['ORDER_ID']); 
                      $owner_id=$app->abs($get['OWNER_ID']); 
                      $item_id=$app->abs($get['ITEM_ID']); 
                      $contity=intval($app->abs($get['CONTITY'])); 
                      $color=$app->abs($app->capitalize($get['COLOR']));
                      $size=$app->abs($get['SIZE']); 
                      $shippingArea=$app->abs($get['SHIPPING_AREA']); 
                      $shippingFee=$app->abs($get['SHIPPING_FEE']);
                      
                    $items=$app->find("{upload_id='$item_id'}",'km_items');
                    if($app->rows($items)>0){ 
                
                        if($row=$app->fetch($items)){
                            
                            $item_name=$app->abs($app->capitalize($row['ITEM_NAME']));
                            $item_absName=$item_name;
                            $item_price=$app->abs($app->capitalize($row['PRICE'])); 
                            $item_vendor=$app->abs($app->capitalize($row['VENDOR'])); 
                            $item_duration=$app->abs($app->capitalize($row['DURATION']));   
                            $item_discount=intval($app->abs($row['DISCOUNT']));
                            $item_owner_id=$app->abs($row['ID']); 
                            $item_upload_id=$app->abs($row['UPLOAD_ID']);
                            $samplesDir=$hostname.'/samples/'.$item_owner_id.'/';
                            $itemsSample=$samplesDir.$app->abs($row['SAMPLE_1']);
                            $itemSamples.=$itemsSample.','; 
                            $oldPrice=$newPrice=0;
                            $itemsAvailable=true;

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
                                     $shippingDetailsAvailable=true;
                                  }
                               }else{
                                  //if no location selected
                                   $shippingFee='null';
                                   $shippingCode='null';
                                   $shippingArea='null';
                               }

                             $totalPrice=$totalPrice+$newPrice;
                        }
                    }
                  }
              }
            }
        
             if(substr($itemNames, strlen($itemNames)-1, strlen($itemNames))==','){
                $itemNames=substr($itemNames, 0, -1);
             }    
             if(substr($itemSamples, strlen($itemSamples)-1, strlen($itemSamples))==','){
                $itemSamples=substr($itemSamples, 0, -1);
             }

        //check wheather one of the  above failed.
        if($orderAvailable and $itemsAvailable and $customerAvailable and $orderDetailsAvailable  and $shippingDetailsAvailable){
            
            if($item_vendor==''){
                $item_vendor='Klassy Mall';
            }
            
             echo('
             {
               "id":"'.$order_id.'",
               "sender_id":"'.$sender_id.'", 
               "item_names":"'.$itemNames.'", 
               "items_count":"'.$orderedItems.'",
               "type":"'.$order_type.'", 
               "status":"'.$order_status.'", 
               "ref":"'.$order_reference_number.'",
               "delivery_city":"'.$delivery_area.'", 
               "payment_status":"'.$payment_status.'", 
               "customer_name":"'.$name.'",  
               "customer_address_line1":"'.$address_line1.'", 
               "customer_address_line2":"'.$address_line2.'",
               "customer_mobile_number":"'.$mobile_number.'", 
               "customer_email_address":"'.$email_address.'",
               "customer_DP":"'.$userDP.'",
               "order_date":"'.$daysAgo.'",
               "total":"'.$totalPrice.'",
               "shipping_fee":"'.$shippingFee.'",
               "shipping_area":"'.$shippingArea.'",
               "shipping_code":"'.$shippingCode.'",
               "selected_color":"'.$color.'",
               "selected_size":"'.$size.'",
               "item_id":"'.$item_upload_id.'",
               "owner_id":"'.$item_owner_id.'", 
               "vendor":"'.$item_vendor.'",
               "samples":"'.$itemSamples.'",  
               "color":"'.$color.'",  
               "size":"'.$size.'"
               
             }');
        }else{
           echo('not_found'); 
        }
        
    }else{
        echo('not_found');
    }
}
else{
    echo('connection_failed');
}

?>