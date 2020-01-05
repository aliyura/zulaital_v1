<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
$uid=$app->real($_GET['id']);
    
    if($request=='PAY'){
         $name=$app->real($_POST['cc-name']);
         $number=md5($app->real($_POST['cc-number'])); 
         $cvv=md5($app->real($_POST['cc-cvv']));
         $expiry=$app->real($_POST['cc-expiry']);
         $ref=$app->real($_POST['cc-ref']);
         $number=$number.uniqid();
         md5($number);
         $date=date("m/d/Y h:i:s a", time());

        if($name!='' and $number!='' and $cvv!='' and $ref!=''){
             $ref=trim(substr($ref,1,strlen($ref)));
             $addPayment=$app->update("{
             account_name='$name',
             account_number='$number',
             total_amount='*',
             payment_date='$date',
             payment_status='P' ?=@ sender_id='$uid' and refrence_number='$ref' and status='PP'}",'km_user_orders');
             if($addPayment==1){  
                  echo('success');
             }else{
                echo ("Unable to process your payment: ".$addPayment);
             }
        }else{
            echo ("Unable to process your payment: ".$addPayment);
        }
    } 
    else if($request=='PAYMENT-STATUS'){
         $ref=$app->real($_GET['ref']);
         $trans=$app->real($_GET['trans']); 
         $name=$app->real($_GET['name']);
         $mobile=$app->real($_GET['mobile']);
       
        if($ref!='' and $trans!=''){
            
             $varifyPayment=$app->update("{
             status='AC',
             payment_status='AC',
             payment_remarks='Payment Successful',
             refrence_number='$ref',
             transection_id='$trans' ?=@ sender_id='$uid' and refrence_number='$ref' and status='PP' and payment_status='P'}",'km_user_orders');
            
            if($varifyPayment==1){  
                
                  $app->sendSMS('+2348064160204,+2348067135745','Dear Klassy Mall, '.$name.' made payment for order no.'.$ref.' with transection no. '.$trans.'. Please notify the customer when payment alert received.');
                
                  $app->sendSMS($mobile,'Dear '.$name.',  your transection no. is '.$trans.' and order no. '.$ref.'. We will call you to plan the delivery of the order. Thank you.');
                
                  echo('success');
             }else{
                echo ("Unable to varify your payment: ".$addPayment);
             }
            
        }else{
            echo ("Unable to varify your payment: ".$addPayment);
        }
    }
    else{
         //Request with no Params.
          echo('Unknown Request !');
    }
}
else{
    echo('connection_failed');
}
?>