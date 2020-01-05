<?php
include ( "Nexmo/NexmoMessage.php" );
class Application{
   private function dbCon(){ 
       return @new mysqli('localhost','root','','klassymall_db');
    // return @new mysqli('160.153.156.33', 'Klassymall','Klassymall@2018', 'klassymall_db'); 
   }
  public function sendSMS($to,$message){   
      if(preg_match("~^0\d+$~", $to)) {
        $to='+234'.substr($to,1,strlen($to));
      }
      $apiKey = urlencode('eQHfzeOUJ+A-LOKrm0Em2d0YIifqtJtoqmABC6KsX1');
      $numbers = urlencode($to);
      $sender = urlencode('Klassy Mall');
      $message = rawurlencode($message);
      $data = 'apikey=' . $apiKey . '&numbers=' . $numbers . "&sender=" . $sender . "&message=" . $message;

      $ch = curl_init('https://api.txtlocal.com/send/?' . $data);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $response = curl_exec($ch);
      curl_close($ch);
      return $response; 
   }
   public function real($request){
        $that=new Application();
        $connection=$that->dbCon();
        $string=preg_replace('/,/', "<!>",$request);
        return mysqli_real_escape_string($connection,$string);
   }
   public function abs($string){
        $string=str_replace("<!>",",",$string);
        $string= preg_replace( "/\r|\n/", "<br/>", $string);
        return($string);
    } 
   public function to_array($string){
        $resultArr = [];
        $strLength = strlen($string);
        $delimiter = ',';
        $j = 0;
        $tmp = '';
        for ($i = 0; $i < $strLength; $i++) {
            if($delimiter === $string[$i]) {
                $j++;
                $tmp = '';
                continue;
            }
            $tmp .= $string[$i];
            $resultArr[$j] = $tmp;
        }
        return $resultArr;
      }
   public function add($collection,$table){
        $collection=str_replace("{","", $collection);
        $collection=str_replace("}","", $collection);
        $req=Application::to_array(trim($collection));
        $absRows=$cols=$rows='';
        for($i=0; $i<count($req); $i++){
           $cols.=substr($req[$i],0,strpos($req[$i],'=')).',';
           $rows.=substr($req[$i],strpos($req[$i],'='),strlen($req[$i]));
           $rows=str_replace("=",",", $rows);
           $absRows=trim(substr($rows,1,strlen($rows)));
           $absCols=trim(substr($cols,0,strlen($cols)-1));
        }
        try{
          $that=new Application();      
          $connection=$that->dbCon();
          $statement="INSERT INTO ".$table."(".$absCols.")VALUES(".$absRows.");";
          $sql=mysqli_query($connection,$statement);
          if($sql){
            return($sql);
          }else{
            return('Error occurred '.mysqli_error($connection));
          }
            
        }catch(Exception $error){
          return ($error);
        }
    }
   public function find($condition,$table){
        $condition=str_replace("{","", $condition);
        $condition=str_replace("}","", $condition);
        $absConditions='';
       
           if(!preg_match('/match/',strtolower($condition)) && 
              !preg_match('/against/',strtolower($condition))){
                $req=Application::to_array(trim($condition));
                for($i=0; $i<count($req); $i++){
                   $absConditions.=trim($req[$i]); 
                   if($i<count($req)-1){
                     $absConditions=$absConditions.' AND ';
                   }else{
                    $absConditions=$absConditions; 
                   }
                }
           }else{
               $absConditions=$condition;
           }
        try{
         $that=new Application();     
         $connection=$that->dbCon();
         $statement="SELECT * FROM ".$table." WHERE ".$absConditions;
         $sql=mysqli_query($connection,$statement);
         if($sql){
            return($sql);
         }else{
            return('Error occurred '.mysqli_error($connection));
          }
       }catch(Exception $error){
         return ($error);
       }
    } 
   public function delete($condition,$table){
        $condition=str_replace("{","", $condition);
        $condition=str_replace("}","", $condition);
        $req=Application::to_array(trim($condition));
        $absConditions='';
        for($i=0; $i<count($req); $i++){
           $absConditions.=trim($req[$i]); 
           if($i<count($req)-1){
             $absConditions=$absConditions.' AND ';
           }else{
            $absConditions=$absConditions; 
           }
        }
        try{
         $that=new Application();     
         $connection=$that->dbCon();
         $statement="DELETE FROM ".$table." WHERE ".$absConditions;
         $sql=mysqli_query($connection,$statement);
         if($sql){
            return($sql);
          }else{
            return('Error occurred '.mysqli_error($connection));
          }
       }catch(Exception $error){
         return ($error);
       }
    }
   public function update($condition,$table){
        $condition=str_replace("{","", $condition);
        $condition=str_replace("}","", $condition);
        $req=Application::to_array(trim($condition));
        $updateData=$conditions=$request='';
        for($i=0; $i<count($req); $i++){
             if($i<count($req)-1){
               $request.=trim($req[$i]).',';
             }else{
                $request.=trim($req[$i]); 
             }
             $updateData=substr($request,0,strpos($request,'?=@')); 
             $updateCondition=substr($request,strpos($request,'?=@')+3,strlen($request));
             $updateCondition=str_replace(","," AND ", $updateCondition);
        }
        try{
           $that=new Application();  
           $connection=$that->dbCon();
           $statement="UPDATE $table SET $updateData WHERE ".$updateCondition;
           $sql=mysqli_query($connection,$statement);
          if($sql){
            return($sql);
          }else{
            return('Error occurred '.mysqli_error($connection));
          }
        }
        catch(Exception $error){
           return ($error);
        }
   }
    //brodcast new mysql query
   public function execute($connection,$x){
        return mysqli_query($connection,$x);
    }
    //find mysql num rows
   public function count($x){
        return mysqli_num_rows($x);
    }
   public function get($get){
        return $_GET[$post];
    }
   public function post($post){
        return $_POST[$post];
    }
     //find mysql num rows
   public function rows($x){
        return mysqli_num_rows($x);
    }
   public function fetch($x){
        return mysqli_fetch_array($x);
    }
   public function file($x, $y){
        return $_FILES[$x][$y];
    }
   public function upper($string){
        return strtoupper($string);
    }
   public function lower($string){
        return strtolower($string);
    } 
   public function capitalize($string){
        return ucwords(strtolower($string));
    }

}
