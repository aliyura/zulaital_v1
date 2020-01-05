<?php
include('AppController.php');
include('app.config.php');
$app=new Application();

if($con){  
    $request=$app->upper($_GET['request']);
    if($request=='ADD'){
        
        $itemName=$app->real($_GET['name']);
        $itemId=$app->real($_GET['itemid']);
        $contity=$app->real($_GET['contity']);
        $color=$app->real($_GET['color']);
        $size=$app->real($_GET['size']);
        $uid=$app->real($_GET['id']);

        if($itemId!='' and $itemName!=''  and $uid!='none'){

              $cartID=uniqid();
              $res=$app->add("
              {
                id='$cartID',
                item_id='$itemId', 
                owner_id='$uid', 
                item_name='$itemName',
                contity='$contity',
                color='$color', 
                size='$size'
              }",'km_user_carts');            

            if($res==1){ 
                echo('success');
            }else{
              echo('Unable to add '.$itemName.' to cart');   
            }
        }
    }
    else if($request=='CONTITY'){
        $contity=intval($_GET['contity']); 
        $id=$_GET['cid'];
        
        if($contity==0 or $contity==''){
            $contity=1;
        }

        $modify=$app->update("{contity='$contity' ?=@ id='$id'}",'km_user_carts');
         if($modify==1){
              echo('success');
         }else{
           echo('Unabl to  modify contity of this item');
         }
    } 
    else if($request=='SIZE'){
        $size=$_GET['size']; 
        $id=$_GET['cid'];
    
         $modify=$app->update("{size='$size' ?=@ id='$id'}",'km_user_carts');
         if($modify==1){
              echo('success');
         }else{
           echo('Unabl to  modify size of this item');
         }
    } 
    else if($request=='COLOR'){
        $color=$_GET['color']; 
        $id=$_GET['cid'];
    
         $modify=$app->update("{color='$color' ?=@ id='$id'}",'km_user_carts');
         if($modify==1){
              echo('success');
         }else{
           echo('Unabl to  modify color of this item');
         }
    } 
    else if($request=='REMOVE'){
        $cid=$_GET['cid']; 
        $removeItem=$app->delete("{id='$cid'}",'km_user_carts');
         if($removeItem==1){
              echo('success');
         }else{
           echo('Unabl remove this item from your cart');
         }
    }
}
else{
    echo('connection_failed');
}
?>