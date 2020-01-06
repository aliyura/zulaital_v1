<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

function updateAutocompletion($connection,$position,$new){
     //update auto complete dump
  $app=new Application();
  $prev=$app->find("{AUTOCOMPLETE_CODE='$position'}",'km_autocomplete');
  if($app->rows($prev)>0){   
    if($row=$app->fetch($prev)){ 

        $base=$row['AUTOCOMPLETE_TEXT'];
        $absBase=$row['AUTOCOMPLETE_TEXT'];
        $temp_base=explode(',',trim($base));
        for($i=0; $i<count($temp_base); $i++){
           if(strpos($base,$new)<=0){
               $base=$base.$new.',';
           }
        }
       mysqli_query($connection,"UPDATE km_autocomplete SET AUTOCOMPLETE_TEXT='$base' WHERE AUTOCOMPLETE_CODE='$position'");
    }
  }
}

if($con){
    
$request=$app->upper(($_GET['request']));
$uid=$app->real($_GET['id']);
    
 if($request=='CHOOSER'){

  if(isset($_FILES['fileChooser']['tmp_name'])){
        $fileName='not_set';
        $uid=$app->real($_GET['id']); 
        $vindex=$app->real($_GET['vindex']);
        $file ='';

        $folder='../samples/'.$uid;
        if(!is_dir($folder)){
           mkdir($folder); 
        }
        $dir= $folder.'/';

         $upload_status=0;
         $upload_id=uniqid();
         $unique_file_name='KM-'.uniqid();


          $originalFileName=$_FILES['fileChooser']['name'];
          $file=$_FILES['fileChooser']['tmp_name']; 
          $valid_ext = array('png','jpeg','jpg','gif');
          $file_extension = pathinfo($originalFileName, PATHINFO_EXTENSION);
          $file_extension = strtolower($file_extension);

        if(in_array($file_extension,$valid_ext)){

               $fileName=$unique_file_name.'.jpg';
               $tobeSavedFileName=$unique_file_name.'.jpg';              

               $uploadCondition=move_uploaded_file($file,$dir.$tobeSavedFileName);
               if($uploadCondition==true){
                  $upload_status=1;
               }else{
                   $upload_status=0;
               }

            if($upload_status>0){

                   $exist=$app->find("{id='$uid' and status='UP'}",'km_upload_master');
                      if($app->count($exist)<=0){

                       $res=$app->add("
                        {
                        id='$uid', 
                        upload_id='$upload_id', 
                        path='".$app->real($dir)."',
                        status='UP',
                        file_1='$fileName'
                        }",'km_upload_master');

                      if($res==1){  
                        echo('success');
                      }else{
                         echo('Unable to upload this sample 3'.$originalFileName);
                      }
                  }else{
                         $res=$app->update("
                         {
                            file_$vindex='$fileName' ?=@ status='UP' and id='$uid'
                         }",'km_upload_master');

                       if($res==1){  
                          echo('success');
                       }else{
                          echo('Unable to upload this sample 3'.$originalFileName);
                       }      
                 }
            }else{
              echo('Unable to upload this sample 3'.$originalFileName);
            }
        }else{
            echo('Oops! Selected  file formart not supported !');
        }
  }
}
else if($request=='DETAILS'){
    
   
      $name=$app->capitalize($app->real($_POST['i-name'])); 
      $category=$app->capitalize($app->real($_POST['i-category']));
      $subcategory=$app->capitalize($_POST['i-category']); 
      $quantity=$app->upper($_POST['i-quantity']);
      $price=$app->capitalize($app->real($_POST['i-price'])); 
      $condition=$app->upper($app->real($_POST['i-condition']));
      $warranty=$app->upper($app->real($_POST['i-warranty']));
      $target=$app->upper($app->real($_POST['i-target'])); 
      $duration=$app->upper($_POST['i-duration']);
      $vendor=$app->upper($_POST['i-vendor']);
      $discount=$app->real($_POST['i-discount']); 
      $description=$app->capitalize($app->real(htmlspecialchars($_POST['i-description'])));
      $getUploads=$app->find("{id='$uid' and status='UP'}",'km_upload_master');
      if($app->rows($getUploads)>0){   
        if($row=$app->fetch($getUploads)){             
            
            if($description==''){
                $description='No Description';
            }
          
            if($name!='' and $category!='' and $price!=''){
              
                $uploadID=$row['UPLOAD_ID'];
                $res=$app->add("
                {
                path='".$row['PATH']."',
                id='$uid',
                upload_id='".$uploadID."',
                item_name='$name',
                item_condition='$condition',
                category='$category',
                sub_category='$subcategory',
                price='$price', 
                quantity='$quantity',
                description='$description',
                status='PA',
                market_option='SALE',   
                discount='$discount',
                warranty='$warranty',   
                vendor='$vendor', 
                duration='$duration', 
                target='$target', 
                sample_1='".$row['FILE_1']."',
                sample_2='".$row['FILE_2']."',
                sample_3='".$row['FILE_3']."',
                sample_4='".$row['FILE_4']."',
                sample_5='".$row['FILE_5']."',
                sample_6='".$row['FILE_6']."',
                sample_7='".$row['FILE_7']."',
                sample_8='".$row['FILE_8']."'
                }",'km_items');
                
              if($res==1){  
                      $app->delete("
                      {
                        id='$uid',
                        status='UP'
                      }",'km_upload_master');

                    updateAutocompletion($co,'002',$category);
                    updateAutocompletion($co,'002',$subcategory);
                    echo('success:'.$uploadID);
              }else{
                  $response='Unabl to upload item '.$res;
                  echo($response);
              }
            }else{
               $response='Unabl to upload item '.$res;
            }
          }
       }else{
           echo('NSS');
       }
  }
 else if($request=="OPTIONS"){
      $colors=$app->upper($app->real($_POST['i-colors']));  
      $sizes=$app->upper($app->real($_POST['i-sizes'])); 
     
      if($colors==''){
        $colors='Null';  
      }
      if($sizes==''){
        $sizes='Null';  
      }
   
        $modify=mysqli_query($co,"update km_items set status='AC', colors='$colors', sizes='$sizes' where id='$uid' and status='PA'");
         if($modify){
              echo('success');
         }else{
          echo('Unabl to  modify the options of this item');
         }  
  }
}
else{
  echo('connection_failed');
}
?>