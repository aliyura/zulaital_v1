 <?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
    
    if($request=='SIGNUP_VALIDATION'){
         $objective=$app->real($_GET['objective']);
         if($objective=='1'){
             //individual
              $email=$app->real($_POST['p-email']);
              $number=$app->real($_POST['p-number']);                          
         }else{
             //business
              $email=$app->real($_POST['b-email']);
              $number=$app->real($_POST['b-number']);
         }
          $checkEmail=$app->find("{email_address='$email'}",'km_users');
          $checkMobile=$app->find("{mobile_number='$number'}",'km_users');
          if($app->count($checkEmail)>0){
              echo('EAE');
          }else if($app->count($checkMobile)>0){
              echo('MAE');
          }
          else{
             echo('success');
          }
    }
    if($request=='SIGNUP'){
         
        $name=$app->real($_POST['p-name']);         
        $email=$app->real($_POST['p-email']);
        $number=$app->real($_POST['p-number']);
        $password=$app->real($_POST['p-password']); 
        $username=$app->real($_POST['p-new_username']);
        $location=$app->real($_POST['p-location']); 
        $area=$app->real($_POST['p-area']);
        $gender=$app->real($_POST['p-gender']);
        $dob=$app->real($_POST['p-dob']);
        $address=$app->real($_POST['p-address']);  
         
        
         $password=md5($password);
         $uid=uniqid();
         $pin=mt_rand(100000,999999); 
         $pid=mt_rand(100000,999999);
        
          $checkUsername=$app->find("{username='$username'}",'km_users'); 
          $checkEmail=$app->find("{email_address='$email'}",'km_users');
          $checkMobile=$app->find("{mobile_number='$number'}",'km_users');
          if($app->count($checkUsername)>0){
              echo('UAE');
          }else if($app->count($checkEmail)>0){
              echo('EAE');
          }else if($app->count($checkMobile)>0){
              echo('MAE');
          }
          else{
              
              if($name!='' and $number!='' and $password!='' and $username!=''){
                  $res=$app->add("
                  {
                    id='$uid',
                    pin='$pin', 
                    pid='S-$pid', 
                    max_sales='10',
                    offer_code='STD0010',
                    dp='/dps/default/dp.jpg',
                    name='$name',
                    email_address='$email',
                    mobile_number='$number',
                    username='$username', 
                    location='$location', 
                    city='$area',
                    password='$password',
                    category='$gender',
                    profile_type='$objective',
                    status='IA',
                    dob='$dob',
                    address='$address'
                  }",'km_users');
                  if($res==1){  
                     $app->execute($con,"UPDATE s_users t1, km_default t2 SET t1.DP=t2.Content WHERE t1.ID='$uid';");
                     $app->sendSMS($number,'Dear '.$name.', your activation code is '.$pin);
                  
                      echo('success');
                      
                  }else{
                      $response='Unabl to create your account !';
                      echo($response);
                  }
              }else{
                 $response='Unabl to create your account !';   
              }
          }
    }
    else if($request=='LOGIN'){
        // signin here
         $username=$app->real($_POST['username']);
         $password=md5($app->real($_POST['password']));
    
          $checkUsername=$app->find("{username='$username' or mobile_number='$username' or email_address='$username'}",'km_users');
          $checkPassword=$app->find("{password='$password'}",'km_users');
          $checkActivation=$app->find("{password='$password' and username='$username' or mobile_number='$username' or email_address='$username' and status in('AC','SP','ER','IA')}",'km_users'); 
          if($app->count($checkUsername)<=0){
              echo('IU');
          }
          else if($app->count($checkPassword)<=0){
              echo('IP');
          }
          else{
              
             if($app->count($checkActivation)>0){
                 
                if($row=$app->fetch($checkActivation)){
                    $status=strtoupper($row['STATUS']);
                    if($status=='AC'){
    
                       $DP=$app->abs($row['DP']);
                       $MSISDN=preg_replace('/^0/', '', $row['MOBILE_NUMBER'], 1);
                       $description=$app->capitalize($app->abs($row['DESCRIPTION']));
                       if($description=='' or $description==null){
                          $description='No Description';
                       }
                        
                        session_start();
                        $_SESSION['token']=$app->abs($row['ID']); 
                        $_SESSION['user-role']=$app->abs($row['PROFILE_TYPE']);
                        
                         
                          $location=$row['LOCATION'];
                          $deliveryDetails=$app->find("{location_desc like '%$location%'}",'km_fees');
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


                        $result='{
                          "id":"'.$app->abs($row['ID']).'", 
                          "name":"'.$app->capitalize($app->abs($row['NAME'])).'", 
                          "email":"'.$app->capitalize($app->abs($row['EMAIL_ADDRESS'])).'", 
                          "mobile":"'.$MSISDN.'", 
                          "address":"'.$app->capitalize($app->abs($row['ADDRESS'])).'", 
                          "description":"'.$description.'", 
                          "username":"'.$app->abs($row['USERNAME']).'", 
                          "offer":"'.$app->upper($app->abs($row['OFFER_CODE'])).'",
                          "oc":"'.$app->upper($app->abs($row['OC_FLAG'])).'", 
                          "city":"'.$app->capitalize($app->abs($row['CITY'])).'",  
                          "country":"'.$app->capitalize($app->abs($row['COUNTRY'])).'", 
                          "location":"'.$app->capitalize($app->abs($row['LOCATION'])).'", 
                          "location_fee":"'.$shippingFee.'", 
                          "location_code":"'.$shippingCode.'", 
                          "dob":"'.$app->upper($app->abs($row['DOB'])).'", 
                          "category":"'.$app->capitalize($app->abs($row['CATEGORY'])).'", 
                          "profile":"'.$app->capitalize($app->abs($row['PROFILE_TYPE'])).'",
                          "dp":"'.$DP.'"
                          }';
                        echo('success:'.$result);   
                        
                    }
                    else{
                       echo($status);
                    }
                }
            }
            else{
                echo('ILC');
            }
        }
    } 
    else if($request=='ACTIVATION_CODE'){
          $username=$app->real($_GET['username']);
         
          $testUsername=$app->find("{username='$username' order by CREATED_DATE asc limit 1}",'km_users');
          if($app->count($testUsername)>0){
              
                if($row=$app->fetch($testUsername)){
                   
                   $uid=$app->abs($row['ID']); 
                   $umobile=$app->abs($row['MOBILE_NUMBER']);
                   $pin=mt_rand(100000,999999);
                    
                   $sendPIN=$app->update("{pin='$pin' ?=@ id='$uid' and username='$username'}",'km_users');
                   if($sendPIN==1){  
                       $app->sendSMS($umobile,'Your new activation pin is '.$pin);
                       echo('success');
                   }else{
                    $response='Unabl to send you new  a Activation PIN !';
                    echo($response);
                   }
                }
          }
    }
    else if($request=='ACTIVATION'){
         $username=$app->real($_POST['a-username']);
         $vcode=$app->real($_POST['a-code']);
    
          $testUsername=$app->find("{username='$username'}",'km_users');
          $testBoth=$app->find("{pin='$vcode' and username='$username'}",'km_users');
   
          if($app->count($testUsername)<=0){
              echo('IU');
          }
          else{
             if($app->count($testBoth)>0){
                if($row=$app->fetch($testBoth)){
                   $uid=$app->abs($row['ID']);
                   $activated=uniqid();
                    
                   $activate=$app->update("{status='AC',pin='$activated'  ?=@ id='$uid' and pin='$vcode'}",'km_users');
                
                   if($activate==1){
                       echo('success');
                   }else{
                    $response='Unabl to activate your account !';
                    echo($response);
                   }
                }
             }else{
               echo('IC');
             }
         }
    } 
    else if($request=='RECOVER'){
        
          $username=$app->real($_POST['r-username']);
          $mobile=$app->real($_POST['r-mobile']);
    
          $checkUsername=$app->find("{username='$username'}",'km_users');
          $checkMobile=$app->find("{mobile_number='$mobile'}",'km_users');
          $checkCredentials=$app->find("{username='$username' and mobile_number='$mobile'}",'km_users'); 
          if($app->count($checkUsername)<=0){
              echo('IU');
          }
          else if($app->count($checkMobile)<=0){
              echo('IM');
          }
          else{
              
             if($app->count($checkCredentials)>0){
                 
                if($row=$app->fetch($checkCredentials)){
                   $pin=mt_rand(100000,999999);
                   $uid=$row['ID']; 
                   $name=$row['NAME'];
                    
                   $sendPIN=$app->update("{pin='$pin' ?=@ id='$uid' and username='$username' and mobile_number='$mobile'}",'km_users');
                   if($sendPIN==1){  
                        $app->sendSMS($mobile,'Your password recovery key is '.$pin);
                       echo('success:'.$uid);
                   }else{
                    $response='Unabl to recover your Account !';
                    echo($response);
                   }
                    
                }
            }
            else{
                echo('IC');
            }
        }
    }   
    else if($request=='RESET'){
        
        $newPassword=md5($app->real($_POST['r-new-password'])); 
        $uid=trim($app->real($_GET['id']));     
        
           $checkCredentials=$app->find("{id='$uid'}",'km_users'); 
           if($app->count($checkCredentials)>0){
                 
              $updatePassword=$app->update("{password='$newPassword' ?=@ id='$uid'}",'km_users');
              if($updatePassword==1){  
                  echo('success');
              }else{
               $response='Unabl to reset your Password !';
               echo($response);
              }
              
            }
            else{
                echo('Unable to reset password, Account not found !');
            }
    }  
    else if($request=='RESEND_KEY'){
        
         $uid=trim($app->real($_GET['id']));   
         $checkCredentials=$app->find("{id='$uid'}",'km_users'); 
         if($app->count($checkCredentials)>0){
           if($row=$app->fetch($checkCredentials)){
                $pin=mt_rand(100000,999999);
                $mobile=$row['MOBILE_NUMBER'];
                $email=$row['EMAIL_ADDRESS'];
             
               $sendPIN=$app->update("{pin='$pin' ?=@ id='$uid'}",'km_users');
               if($sendPIN==1){  
                   $app->sendSMS($mobile,'Your password recovery key is '.$pin);
                   echo('success');
               }else{
                echo('Unabl to send your password recovery key !');
               }
           }
         }else{
           echo('Unable to send your password recovery key, Account not found !');   
         }
    }
    else{
       // any other here
    }
}
else{
    echo('connection_failed');
}
?>