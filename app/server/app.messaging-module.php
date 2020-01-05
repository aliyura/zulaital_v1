<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
$uid=$app->abs(($_GET['id']));
    
   if($request=='MESSAGE'){
     
      $name=$app->real($_POST['sender-name']);
      $email=$app->real($_POST['sender-email']);
      $mobile=$app->real($_POST['sender-number']);
      $message=$app->real($_POST['message']);
       
      $send=$app->add("{
          sender_id='$uid',
          sender_name='$name',
          sender_email='$email',
          sender_mobile='$mobile',
          message='$message'
      }",'km_user_messages');
       
       $name=$app->abs($name);
       $email=$app->abs($email);
       $mobile=$app->abs($mobile);
       $message=$app->abs($message);
       
      if($send==1){  
          $app->sendSMS('+2348064160204,+2348067135745','Dear Klassy Mall, you have new message from '.$name.': [ '.$message.' ] reply back via '.$mobile);
          echo('success');
      }else{
        echo('Message not Sent !');
      }  
    }
 }
else{
    echo('connection_failed');
}
?>