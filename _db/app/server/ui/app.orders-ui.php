<?php
include('../app.config.php');
include('../AppController.php');
include('../date_generator.php');
$app=new Application();
if($con){
    
$request=$app->upper($app->real(($_GET['request'])));
$uid=$app->real($_GET['id']);
   
    if($request=='HISTORY'){
          $orderItems=$app->find("{status in('AP','RE') order by date desc limit 25}",'km_user_orders'); 
    }else{
      $orderItems=$app->find("{status in('AC','PP') order by date desc limit 25}",'km_user_orders');
    }
    
    if($app->rows($orderItems)>0){     
       
         $orderedItems=1;
         while($row=$app->fetch($orderItems)){

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
              $orderedItems=1;
              $itemNames='';
              $userDP='';
             
              $myday = new DateTime($order_date);
              $date_ago= $myday->format('Y-m-d H:i:s');
              $daysAgo=time_elapsed_string($date_ago);
             
             
              $orderDetails=$app->find("{order_id='$order_id' and owner_id='$sender_id'}",'km_user_orders_dtl');
              if($app->rows($orderDetails)>0){     
                  $orderedItems=$app->rows($orderDetails);
                  while($get=$app->fetch($orderDetails)){
                        $itemNames.=$app->capitalize($app->abs($get['ITEM_NAME'])); 
                  }
              }
             
              $getProfile=$app->find("{id='$sender_id' and status not in('ER')}",'km_users');
              if($app->rows($getProfile)>0){     
                  if($get=$app->fetch($getProfile)){
                       $userDP=$app->abs($get['DP']);
                  }
              }

             if(substr($itemNames, strlen($itemNames)-1, strlen($itemNames))==','){
                $itemNames=substr($itemNames, 0, -1);
             }
    
             $result='{
             "id":"'.$order_id.'",
             "sender_id":"'.$sender_id.'", 
             "item_names":"'.$itemNames.'", 
             "items_count":"'.$orderedItems.'",
             "order_type":"'.$order_type.'", 
             "order_status":"'.$order_status.'", 
             "order_date":"'.$order_date.'", 
             "order_ref":"'.$order_reference_number.'",
             "delivery_city":"'.$delivery_area.'", 
             "payment_status":"'.$payment_status.'", 
             "customer_name":"'.$name.'",  
             "customer_address_line1":"'.$address_line1.'", 
             "customer_address_line2":"'.$address_line2.'",
             "customer_mobile_number":"'.$mobile_number.'", 
             "customer_email_address":"'.$email_address.'",
             "customer_DP":"'.$userDP.'",
             "order_date":"'.$daysAgo.'"
             },';
            echo($result);  
         }
       
   }else{
       echo('not_found'); 
   }
}
else{
    echo('connection_failed');
}
?>