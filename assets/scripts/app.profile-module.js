function updateProfilePhoto(e){
    
     var chooser=new FileChooser('image/*;capture=camera','SINGLE'),
          profileView=Prepare('.profilePhoto-view'),
         profileBG=Prepare('.profilePhoto_bg'),
          controller=Prepare(e);

            if(sessionExist){
                
                chooser.on('change',function(res){
                    if(res.length>0){
                        
                      if(res.data.type.match(/^image\//)){
                        var selectedPhoto=app.createURL(res.data);        
                        
                         controller.setHtml('<img src="assets/loaders/loader_2.gif"  style="border:none; box-shadow:none; -webkit-box-shadow:none;  margin:0; padding:0">');
                         blockProgress();
                        
                           var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.profile-module.php?request=PHOTO&id='+session,'default',true);
                            httpReq.execute(function(response){
                                if(response!=='progress'){
                                    try{
                                     var result=response.target.responseText;
                                     controller.setHtml('<img src="assets/images/camera.png"  style="border:none; box-shadow:none; -webkit-box-shadow:none;  margin:0; padding:0"></button>');
                                     revokeProgress();
                                
                                     if(result.match(/success:/)){  
                                        closeAlert();
                                         var newProfileBG='background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url('+selectedPhoto+');';
                                         
                                        profileView.setAttribute('src',selectedPhoto);
                                        profileBG.setAttribute('style',newProfileBG); 
                                        var resultSet=result.substr(result.indexOf(':')+1,result.length);
                                        var newDP = JSON.parse(resultSet);
                                        user.dp=newDP.dp;
                                        localStorage.setItem('info', JSON.stringify(user));

                                     }else{
                                         profileView.setAttribute('src',user.dp);
                                         errorAlert(result);
                                     }
                                        
                                    }catch(error){
                                        revokeProgress();
                                        controller.setHtml('<img src="assets/images/camera.png"  style="border:none; box-shadow:none; -webkit-box-shadow:none;  margin:0; padding:0"></button>');
                                        profileView.setAttribute('src',user.dp);
                                        errorAlert('Failed to update your profile photo, Please try latter');
                                    }
                                }
                            });
                      }else{
                         errorAlert('Oops! Selected  file formart not supported !');
                      }
                 }
              });
           }
}

function updateProfileDetails(e){
    
         var inName=Prepare('$ep-name'),
           inEmail=Prepare('$ep-email'),
           inNumber=Prepare('$ep-number'),
           inAddress=Prepare('$ep-address'),
           inDescription=Prepare('$ep-description'),
           name=inName.getValue(),
           email=inEmail.getValue(),
           number=inNumber.getValue(),
           address=inAddress.getValue(),
           description=inDescription.getValue();
           controller=Prepare(e);

        if(name=='' || count(name)<3){
            inName.setError();
         }else{
            inName.removeError(); 
         }if(email=='' || count(email)<3 || notMail(email)){
            inEmail.setError();
         }else{
            inEmail.removeError(); 
         }if(number=='' || count(number)<11 || notNumbers(number)){
            inNumber.setError();
         }else{
            inNumber.removeError(); 
         }if(address=='' || count(address)<6){
            inAddress.setError();
         }else{
            inAddress.removeError(); 
         }if(description=='' || count(description)<6){
            inDescription.setError();
         }else{
            inDescription.removeError(); 
         }
    
        if(name!=='' && count(name)>3 && email!=='' && count(email)>3 && isMail(email) && number!=='' && count(number)>10 && isNumbers(number) && address!=='' && count(address)>6 && description!=='' && count(description)>6){
            
                controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                blockProgress();
            
                  var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.profile-module.php?request=UPDATE-PROFILE&id='+session,'default',true);
                  httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                        var result=response.target.responseText;
                        revokeProgress();
                            
                        if(result.match(/success/)){
                            
                           var info=storage.getItem('info'),
                                xuser=JSON.parse(info)
                            xuser.name=name;
                            xuser.email=email;
                            xuser.mobile=number;
                            xuser.address=address;
                            xuser.description=description;
                            storage.setItem('info',JSON.stringify(xuser));
                       
                            
                            controller.setHtml('<i class="fa fa-check"></i> Saved');
                            notify('Updated Successfully');
                             setTimeout(function(){
                               controller.setHtml('Save Changes');
                            },3000);
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
}
