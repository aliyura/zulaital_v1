var checked=0,
    today = new Date(),
    dd = today.getDate(),
    mm = today.getMonth()+1, 
    yyyy = today.getFullYear();

if(dd<10){
        dd='0'+dd
} 
if(mm<10){
        mm='0'+mm
} 
today = yyyy+'-'+mm+'-'+dd;
Prepare('$b-bed,$p-dob').setAttribute("max", today);
var storedLastUsername=storage.getItem('username');
if(storedLastUsername!='null' && storedLastUsername!=null && storedLastUsername!=''){
    Prepare('$username,$r-username').setValue(storedLastUsername);
}


Prepare('$p-terms,$b-terms').on('click',function(){
   var parent=Prepare(this).getParent();
       var checkbox=Prepare(parent).getChildren('.checkbox');
    if(Prepare(checkbox).getHtml().match(/::after/)){
        //print('checked');
    }else{
        //print('unchecked');
    }
    
});

var user= storage.getItem('pin');
if(user!=='null' && user){
    var userActivation=JSON.parse(user);
    if(userActivation.pin=="true"){
      Prepare('$v-username').setValue(userActivation.username);
      Prepare('$v-username').setAttribute('readonly','true');
      app.render('$account_varification');
    }
}
function resendActivationPIN(e){
    var inUsername=Prepare('$v-username'),
        username=inUsername.getValue();
    
     if(username=='' || count(username)<8){
        inUsername.setError();
     }else{
        inUsername.removeError(); 
     }
    
    if(username!=='' && count(username)>=8){
        Prepare(e).setText('Resending...');
        activateAccount(username);
    }
}
function resendResetKey(e){
  var rid=storage.getItem('rid');
    if(rid!='null' && rid!='' && rid!=null){
        Prepare(e).setText('Resending..');
        var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=RESEND_KEY&id='+rid,'default',true);
             httpReq.execute(function(response){
                 if(response=='progress'){
                   Prepare(e).setText('Resending..');
                 }else{
                  try{
                   var result=response.target.responseText;
                       revokeProgress();
                     
                     if(result.match(/success/)){
                           Prepare(e).setText('Resend');
                           alert('Sent Successfully');
                     }else{
                        Prepare(e).setText('Resend');
                        errorAlert('Unable to send your password recovery key !'); 
                     }
                 }
                 catch(error){
                    Prepare(e).setText('Resend');
                    errorAlert('Connection failed !'); 
                 }
             }
         });
    }else{
        Prepare(e).setText('Resend');
        warningAlert('Unable to send your password recovery key !');
    }
}
function activateAccount(username){
    Prepare('.closejAlert').performClick();
    Prepare('$v-username').setValue(username);
    Prepare('$v-username').setAttribute('readonly','true');
    app.render('$account_varification');
    storage.setItem('pin','{"username":"'+username+'","pin":"true"}');
    
    var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=ACTIVATION_CODE&username='+username+'&id=sdfj7jk9j4874dxs','default',true);
    httpReq.execute(function(response){
        if(response!='progress'){
          try{
              var result=response.target.responseText; 
              Prepare('$pinResendStatus').setHtml('&nbsp;&nbsp;<i class="fa fa-check"></i>Sent</span>');
              Prepare('$resendActivation-trigger').setText('Resend');
              
           }catch(error){
             errorAlert('Connection failed !');     
           }
        }
    });
}
(function(){
     
    //Login Controller 
    var controller;
    app.find('input,textarea').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value==''){
            Prepare(this).setError();
        }else{
            app.find('.warnningAlert').hide();
            Prepare(this).removeError();
        }
    }); 
    app.find('$p-number,$b-number,$r-mobile').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || count(value)<11 || notNumbers(value)){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
    }); 
    app.find('$p-email,$b-email').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || notMail(value)){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
    });
    app.find('$username,$p-new_username,$b-new_username,$v-username,$r-username').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || count(value)<8){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
        Prepare(this).setValue(value.replace(/[^a-zA-Z0-9]/g,'_'));
    }); 
    app.find('$password,$b-password,$p-password,$p-confirm,$b-confirm').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || count(value)<6){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
        Prepare(this).setValue(value.replace(/[^a-zA-Z0-9@]/g,'_'));
    });
    
    app.find('$login-trigger').on('click',function(){
         var inUsername=Prepare('$username'),
             inPassword=Prepare('$password'),
             username=inUsername.getValue(),
             password=inPassword.getValue();
             controller=Prepare(this);
    
         if(username=='' || count(username)<8){
            inUsername.setError();
         }else{
            inUsername.removeError(); 
         }
         if(password=='' || count(password)<6){
            inPassword.setError();
         }else{
            inPassword.removeError();
         }

        
        if(username!=='' && count(username)>=8 && password!=='' && count(password)>6){
            
            controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
            blockProgress();
            
                var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=SIGNIN','default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                          var result=response.target.responseText;
                            
                          if(!result.match(/success:/)){ revokeProgress();}
                              
                          if(result.match(/success:/)){
                              var session=result.substr(result.indexOf(':')+1,result.length);
                              var logger = JSON.parse(session);
                              storage.setItem('username',username); 
                              storage.setItem('session',logger.id); 
                              storage.setItem('info', JSON.stringify(logger));
                              storage.setItem('launch','true');
                              storage.setItem('pin',null);
                              var backup=window.location.href.toString();
                              if(backup.match(/backup=true/)){
                                  var backupURI=backup.substr(backup.indexOf('return=')+7,backup.length);
                                  backupURI=backupURI.replace('#signin','');
                                app.render('index.html#'+backupURI);
                              }else{
                                 app.render('index.html');
                              }
                          }
                          else if(result.match(/ILC/)){
                             inUsername.setValue('');
                             inUsername.setError(); 
                             inPassword.setValue('');
                             inPassword.setError(); 
                             controller.setHtml('Try Again');
                             warn('Invalid Login Credentials !');
                          }
                          else if(result.match(/IU/)){
                             inUsername.setValue('');
                             inUsername.setError(); 
                             controller.setHtml('Try Again');
                             warn('Invalid Username !');
                          } 
                          else if(result.match(/SP/)){
                             inUsername.setError(); 
                             inPassword.setError();
                             controller.setHtml('Try Again');
                             warningAlert('This Account has been suspended, please contact customer support! <br/><br/><b target="tel:80000000000">+(234) 80000000000</b>');
                          }  
                         else if(result.match(/ER/)){
                             inUsername.setError(); 
                             inPassword.setError();
                             controller.setHtml('Try Again');
                              warningAlert('This Account has been Terminated. Please contact customer support for resolution! <br/><br/><b target="tel:80000000000">+(234) 80000000000</b>');
                          } 
                         else if(result.match(/IA/)){
                             inUsername.setError(); 
                             inPassword.setError();
                             controller.setHtml('Try Again');
                             warningAlert( `This Account is currently not active, please click activate now to proceed <br/>
                                          <button class="alert-success" onclick="activateAccount('`+username+`');"  style="margin-top:7px; padding:1px; text-decoration:none; padding-left:5px; border-radius:2px; font-size:10px; padding-right:5px">Activate Now</button>`);
                          } 
                          else if(result.match(/IP/)){
                             inPassword.setValue('');
                             inPassword.setError(); 
                             controller.setHtml('Try Again');
                             warn('Invalid Password !');
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
    
    //## Signup Controller
    app.find('.signup-trigger').on('click',function(){
         var objective=Prepare(this).getAttribute('objective'),
             termsChecked=false,
             inName=Prepare('$p-name'),
             inEmail=Prepare('$p-email'),
             inNumber=Prepare('$p-number'),
             inPassword=Prepare('$p-password'),
             inConfirm=Prepare('$p-confirm'),
             inTerms=Prepare('$p-terms'),
             name=inName.getValue(),
             email=inEmail.getValue(),
             number=inNumber.getValue(),
             password=inPassword.getValue(),
             termsChecked=$('[name="p-terms"]').is(':checked'),
             confirm=inConfirm.getValue(); confirm=inConfirm.getValue();
             controller=Prepare(this);
            
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
         }if(password=='' || count(password)<6){
            inPassword.setError();
         }else{
            inPassword.removeError(); 
         }if(confirm=='' || count(confirm)<6){
            inConfirm.setError();
         }else{
            inConfirm.removeError(); 
         }
        
    
        if(name!=='' && count(name)>3 && email!=='' && count(email)>3 && number!=='' && count(number)>3 && password!=='' && count(password)>6 && confirm!=='' && count(confirm)>6){
            
            if(confirm!==password){
                inConfirm.setError();
            }else{
                inConfirm.removeError();
            }
            
            if(isMail(email) && isNumbers(number) && password===confirm){
         
                if(termsChecked==true){
                //test terms
                    controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    blockProgress();

                      var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?objective=1&request=SIGNUP_VALIDATION','default',true);
                      httpReq.execute(function(response){
                        if(response=='progress'){
                         controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                        }else{
                          try
                           {
                                var result=response.target.responseText;
                                revokeProgress();

                                if(result.match(/success/)){
                                    app.render('$more-personal-info');
                                    controller.setHtml('Continue');  
                                }
                                else if(result.match(/EAE/)){
                                   inEmail.setValue('');
                                   inEmail.setError(); 
                                   controller.setHtml('Try Again');
                                   warn('Email address is already exist !');
                                } 
                                else if(result.match(/MAE/)){
                                   inNumber.setValue('');
                                   inNumber.setError(); 
                                   controller.setHtml('Try Again');
                                   warn('Mobile number is already exist !');
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
                }else{
                    controller.setHtml('Try Again');
                    warn('Accept our terms & condition to proceed !'); 
                }
            }
        }
    });
    
    app.find('.complete-signup-trigger').on('click',function(){
       var objective=Prepare(this).getAttribute('objective'),
           termsChecked=false,
           inUsername=Prepare('$p-new_username'),
           inGender=Prepare('$p-gender'),
           inDOB=Prepare('$p-dob'), 
           inAddress=Prepare('$p-address'),
           username=inUsername.getValue(),
           gender=inGender.getValue(),
           dob=inDOB.getValue(),
           address=inAddress.getValue();
           controller=Prepare(this);
             
         if(username=='' || count(username)<8){
            inUsername.setError();
         }else{
            inUsername.removeError(); 
         }
         if(dob=='' || dob==0  || dob==null || !Date.parse(dob)){
            inDOB.setError();
         }else{
            inDOB.removeError(); 
         }
         if(address=='' || count(address)<3){
            inAddress.setError();
         }else{
            inAddress.removeError(); 
         }
        
         if(username!=='' && count(username)>=8 && Date.parse(dob) && dob!==null && dob!=='' && dob!==0 && address!=='' && count(address)>2){
             
           controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
           blockProgress();
             
           var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?objective='+objective+'&request=SIGNUP','default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                            var result=response.target.responseText;
                             revokeProgress();
                            
                                if(result.match(/success/)){
                                  Prepare('$v-username').setValue(username);
                                  app.render('$account_varification');  
                                  controller.setHtml('Continue');
                                }
                                else if(result.match(/UAE/)){
                                   inUsername.setValue('');
                                   inUsername.setError(); 
                                   controller.setHtml('Try Again');
                                   warn('Username is already exist !');
                                } 
                                else if(result.match(/connection_failed/)){
                                  controller.setHtml('Try Again');
                                  errorAlert('Connection failed !'); 
                                }
                                else{
                                  controller.setHtml('Try Again');
                                  warn(result); 
                            }
                       }catch(error){
                        revokeProgress();
                        controller.setHtml('Try Again');
                        errorAlert('Connection failed !');     
                       }
                    }
                });
         }
        
    });
    app.find('$varify-account-trigger').on('click',function(){
        var inUsername=Prepare('$v-username'),
            inCode=Prepare('$v-code'),
            username=inUsername.getValue(),
            code=inCode.getValue(),
            controller=Prepare(this);
        
         if(username=='' || count(username)<8){
            inUsername.setError();
         }else{
            inUsername.removeError(); 
         }
         if(code=='' || count(code)<4 ||  notNumbers(code)){
            inCode.setError();
         }else{
            inCode.removeError(); 
         }
         if(username!=='' && count(username)>=8 && code!=='' && count(code)>=4 && isNumbers(code)){
             
         controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
         blockProgress();
             
           var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=VARIFICATION','default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                            var result=response.target.responseText;
                            revokeProgress();
                            
                            if(result.match(/success/)){
                              storage.setItem('pin',null);
                              app.render('$signin');  
                              controller.setHtml('Varify');
                            }
                            else if(result.match(/IU/)){
                               inUsername.setValue('');
                               inUsername.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Username !');
                            } 
                            else if(result.match(/IVC/)){
                               inUsername.setError(); 
                               inCode.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Credential !');
                            } 
                            else if(result.match(/IC/)){
                               inCode.setValue('');
                               inCode.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Varification Code !');
                            } 
                            else if(result.match(/connection_failed/)){
                              controller.setHtml('Try Again');
                              errorAlert('Connection failed !'); 
                            }
                            else{
                              controller.setHtml('Try Again');
                              warn(result); 
                            }
                        }catch(error){
                            revokeProgress();
                            controller.setHtml('Try Again');
                            errorAlert('Connection failed !');  
                        }
                    }
                });
         }
    });

    app.find('$recover-password-trigger').on('click',function(){
         var inUsername=Prepare('$r-username'),
             inMobile=Prepare('$r-mobile'),
             username=inUsername.getValue(),
             mobile=inMobile.getValue();
             controller=Prepare(this);
    
         if(username=='' || count(username)<8){
            inUsername.setError();
         }else{
            inUsername.removeError(); 
         }
         if(mobile=='' || count(mobile)<11){
            inMobile.setError();
         }else{
            inMobile.removeError();
         }

        if(username!=='' && count(username)>=8 && mobile!=='' && count(mobile)>10){
            
            controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
            blockProgress();
            
                var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=RECOVER','default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                          var result=response.target.responseText;
                              revokeProgress();
                            
                            if(result.match(/success/)){
                                var key=result.substr(result.indexOf(':')+1,result.length);
                                storage.setItem('rid',key); 
                                app.render('$reset');
                                inUsername.clear();
                                inMobile.clear();
                                controller.setHtml('Continue');
                            }
                            else if(result.match(/IU/)){
                               inUsername.setValue('');
                               inUsername.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Username Specified !');
                            } 
                            else if(result.match(/IM/)){
                               inMobile.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Mobile Number !');
                            } 
                            else if(result.match(/IC/)){
                               inUsername.setError();  
                               inMobile.setError(); 
                               controller.setHtml('Try Again');
                               warn('Invalid Credentials!');
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
                            print(error);
                        controller.setHtml('Try Again');
                         errorAlert('Connection failed !'); 
                        }
                    }
                });
        }
    }); 
    app.find('$reset-password-trigger').on('click',function(){
         var inKey=Prepare('$r-key'),
             inPassword=Prepare('$r-new-password'), 
             inCPassword=Prepare('$r-new-cpassword'),
             key=inKey.getValue(),
             password=inPassword.getValue(), 
             cpassword=inCPassword.getValue(),
             uid=storage.getItem('rid');
             controller=Prepare(this);
    
         if(key=='' || count(key)<6){
            inKey.setError();
         }else{
            inKey.removeError(); 
         }
         if(password=='' || count(password)<6){
            inPassword.setError();
         }else{
            inPassword.removeError();
         }
         if(cpassword=='' || count(cpassword)<6){
            inCPassword.setError();
         }else{
            inCPassword.removeError();
         }

        if(key!=='' && count(key)>=6 && password!=='' && count(password)>=6 && cpassword!=='' &&  count(cpassword)>=6){
            
            if(cpassword===password){
                
                controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                blockProgress();

                var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.sign-module.php?request=RESET&id='+uid,'default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                          var result=response.target.responseText;
                              revokeProgress();
                            
                            if(result.match(/success/)){
                                app.render('$signin');
                                inPassword.clear();
                                inCPassword.clear(); 
                                inKey.clear();
                                controller.setHtml('Reset');
                            }else{
                                print(error);
                                controller.setHtml('Again');
                                errorAlert(result); 
                            }
                        }
                        catch(error){
                           controller.setHtml('Try Again');
                           print(error);
                           errorAlert('Connection failed !'); 
                        }
                    }
                });
            }else{
               inCPassword.setError();
               inCPassword.clear();
               controller.setHtml('Try Again');
               warn('Password did not Match !'); 
            }
        }
    });
    
})();