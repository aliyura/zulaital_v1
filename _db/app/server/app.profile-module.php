<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){
$request=$app->upper(($_GET['request']));
$uid=$app->abs(($_GET['id']));
    
 if($request=='PHOTO'){
     
      if(isset($_FILES['fileChooser']['tmp_name'])){
          
             $profilePhoto=$_FILES['fileChooser']['tmp_name'];
             $photoName=$_FILES['fileChooser']['name'];
             $photoType=$_FILES['fileChooser']['type'];
             $unique_file_name=$uid.'.jpg';
             $valid_ext = array('png','jpeg','jpg','gif');
             $file_extension = pathinfo($photoName, PATHINFO_EXTENSION);
             $file_extension = strtolower($file_extension);


        if(in_array($file_extension,$valid_ext)){
 
            $folder='../dps/dp';
            if(!is_dir($folder)){
               mkdir($folder); 
            }
            $tobeSavedFileName=$folder.'/'.$unique_file_name;
            $dumpName='/dps/dp/'.$unique_file_name;
        
             $uploaded=move_uploaded_file($profilePhoto,$tobeSavedFileName);
             if($uploaded==true){
                 
        
                $update=mysqli_query($co,"UPDATE s_users SET dp='$dumpName' WHERE id='$uid'");
                if($update){
                    
                      $result='{
                        "dp":"'.$tobeSavedFileName.'"
                       }';
                      echo('success:'.$result);
                }
                else{
                    echo('Unable to update your Profile Photo, Please try latter !');
                }
            }else{
              echo('Unable to update your Profile Photo, Please try another picture! ');
            }
        }else{
            echo('Oops! Selected  file formart not supported !');
        }
    }
 }
 else if($request='UPDATE-PROFILE'){
     
      $name=$app->real($_POST['ep-name']);
      $email=$app->real($_POST['ep-email']);
      $number=$app->real($_POST['ep-number']);
      $address=$app->real($_POST['ep-address']); 
      $description=$app->real(htmlspecialchars($_POST['ep-description']));
     
          $update=$app->update("{
          name='$name',
          email_address='$email',
          mobile_number='$number',
          address='$address',
          description='$description':id='$uid'
          }",'s_users');
          if($update==1){
              echo('success');
          }else{
           $response='Unabl to update your Profile !'.mysqli_error($con);
           echo($response);
          }
      }
 }
else{
    echo('connection_failed');
}
?>