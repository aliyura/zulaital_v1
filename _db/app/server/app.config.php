<?php
    header("Access-Control-Allow-Origin: *");
    //$hostname= 'https://klassymall.com/app';
    //$con= @new mysqli('160.153.156.33', 'Klassymall','Klassymall@2018', 'klassymall_db');  
    $hostname= 'http://localhost/projects/klassymall.com/app';
    $con= @new mysqli('localhost','root','','klassymall_db');
    $co=$con;
    if(!$con){
     $con=0;
    }else{
     $con=1;
    }
?>




