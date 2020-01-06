 <?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
   $request=$app->upper(($_GET['request'])); 
  
    if($request=='ORDER'){    
        
       $uid=$app->real($_GET['id']); 
       $orderType=$app->upper($app->real($_GET['type'])); 
       $orderRefrenceNumber=$app->real($_GET['ref']);
       $shippingArea=$app->real($_GET['area']);
       $shippingFee=$app->real($_GET['fee']);
        
        $name=$app->real($_POST['name']);         
        $email=$app->real($_POST['email']);
        $mobile=$app->real($_POST['mobile']);
        $AlternativeMobile=$app->real($_POST['amobile']);
        $address1=$app->real($_POST['address1']); 
        $address2=$app->real($_POST['address2']); 
        $zipCode=$app->real($_POST['zipCode']);  
        $who=$app->real($_POST['who']); 
        $when=$app->real($_POST['when']); 
        $description=$app->real($_POST['description']); 
        $orderId=uniqid();
    
        if($name!='' and $email!='' and  $mobile!=''  and $address1!='' and $shippingArea!='' and  $shippingFee!=''){
            
          
            $app->delete("{sender_id='$uid' and status='PP'}",'km_user_orders');
            $app->delete("{owner_id='$uid'}",'km_user_orders_dtl');
            
            $res=$app->add("
            {
              sender_id='$uid',
              order_id='$orderId',
              refrence_number='$orderRefrenceNumber',
              name='$name',
              mobile_number='$mobile',
              alternative_number='',
              email_address='$email',
              order_type='$orderType',
              delivery_area='$shippingArea',
              status='PP',
              zip_code='$zipCode',
              description='$description',
              shipping_fee='$shippingFee',
              payment_status='P',
              location='$shippingArea',
              address_1='$address1',
              address_2='$address2',
              whentr='$when',
              whotr='$who'
            }",'km_user_orders');
            
            if($res==1){ 
                
                if($orderType=='CASH'){
                  $app->sendSMS($mobile,'Dear '.$name.', your cash on delivery order reference number is #'.$orderRefrenceNumber.', we will call you to plan the delivery of the item. Thank you.');
                   $app->sendSMS('+2348064160204,+2348067135745','Dear Klassy Mall, '.$name.' initiated new cash on delivery order now with reference number #'.$orderRefrenceNumber.'. Contact them via '.$mobile);
                }else{
                  $app->sendSMS($mobile,'Dear '.$name.', your order reference number is #'.$orderRefrenceNumber);
                  $app->sendSMS('+2348064160204,+2348067135745','Dear Klassy Mall, '.$name.' initiated new pay online order now with reference number #'.$orderRefrenceNumber.'. Contact them via '.$mobile);
                }
               
                $saveOrderDetails=mysqli_query($co,"INSERT INTO km_user_orders_dtl (ID,ITEM_ID,OWNER_ID,ORDER_ID,ITEM_NAME, ITEM_PRICE, CONTITY, COLOR, SIZE, SHIPPING_AREA, SHIPPING_FEE)SELECT ID,ITEM_ID,OWNER_ID, '$orderId' ORDER_ID,ITEM_NAME,ITEM_PRICE,CONTITY,COLOR,SIZE,SHIPPING_AREA,SHIPPING_FEE FROM km_user_carts WHERE OWNER_ID='$uid'");
                if($saveOrderDetails){
                   $app->delete("{owner_id='$uid'}",'km_user_carts');
                }
                echo('success');
            }else{
                $response='Oops! Failed to initiate this order!';
                echo($response);
            }   
        }
        else{
            echo ('Unable to initiate your order!');
        }
        
    }
}
else{
    echo('connection_failed');
}
?>