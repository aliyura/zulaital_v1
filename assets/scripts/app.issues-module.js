(function(){
    
     app.find('$re-userid').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || count(value)<9){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
        Prepare(this).setValue(value.replace(/[^a-zA-Z0-9-]/g,'-'));
    }); 
    
    app.find('$sendComplain-trigger').on('click',function(){

         var inSubject=Prepare('$co-subject'),
             inDescription=Prepare('$co-description'),
             subject=inSubject.getValue(),
             description=inDescription.getValue(),
             controller=Prepare(this);
      
         if(subject=='' || count(subject)<3){
            inSubject.setError();
         }else{
            inSubject.removeError(); 
         }
        
        if(description=='' || count(description)<3){
            inDescription.setError();
         }else{
            inDescription.removeError(); 
         }

      if(subject!='' && count(subject)>=3 && description!='' && count(description)>03){
          
          controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
          blockProgress();
          
                  var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.issues-module.php?request=COMPLAIN&id='+session,'default',true);
                  httpReq.execute(function(response){
                    if(response=='progress'){
                      controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                            var result=response.target.responseText;
                            revokeProgress();
                            
                            if(result.match(/success/)){
                                controller.setHtml('Send');
                                inDescription.setValue('');
                                inSubject.setValue('');
                                notify('<i class="fa fa-check"></i>Sent Successfully');
                             }
                            else if(result.match(/connection_failed/)){
                                controller.setHtml('Try Again');
                                errorAlert('Connection failed !'); 
                            }
                            else{
                              controller.setHtml('Try Again');
                              warn(result); 
                            }
                     }
                     catch(error){
                        revokeProgress();
                        controller.setHtml('Try Again');
                        errorAlert('Connection failed !'); 
                     }
                   }
            });
          }      
      }); 
    
     app.find('$reportSomeone-trigger').on('click',function(){

         var inUsername=Prepare('$re-username'),
             inUserid=Prepare('$re-userid'),
             inSubject=Prepare('$re-subject'),
             inDescription=Prepare('$re-description'),
             username=inUsername.getValue(),
             userid=inUserid.getValue(),
             subject=inSubject.getValue(),
             description=inDescription.getValue(),
             controller=Prepare(this);
      
         if(username=='' || count(username)<3){
            inUsername.setError();
         }else{
            inUsername.removeError(); 
         } 
         if(userid=='' || count(userid)<9){
            inUserid.setError();
         }else{
            inUserid.removeError(); 
         }
        if(subject=='' || count(subject)<3){
            inSubject.setError();
         }else{
            inSubject.removeError(); 
        }
        if(description=='' || count(description)<3){
            inDescription.setError();
         }else{
            inDescription.removeError(); 
         }

      if(username!='' && count(username)>=3 && userid!='' && count(userid)>8 && subject!='' && count(subject)>=3 && description!='' && count(description)>03){
          
          controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
          blockProgress();
          
                  var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.issues-module.php?request=REPORT&id='+session,'default',true);
                  httpReq.execute(function(response){
                    if(response=='progress'){
                      controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                            var result=response.target.responseText;
                            revokeProgress();
                            
                            if(result.match(/success/)){
                                controller.setHtml('Report');
                                inUsername.setValue('');
                                inUserid.setValue('');
                                inDescription.setValue('');
                                inSubject.setValue('');
                                notify('<i class="fa fa-check"></i>Reported Successfully');
                             }
                            else if(result.match(/connection_failed/)){
                              controller.setHtml('Try Again');
                              errorAlert('Connection failed !'); 
                            }
                            else{
                              controller.setHtml('Try Again');
                              warn(result); 
                            }
                     }
                     catch(error){
                        revokeProgress();
                        controller.setHtml('Try Again');
                        errorAlert('Connection failed !'); 
                     }
                   }
            });
          }      
      });
    
})();