var controller,
    selectedCount=0;
    
function uploading(){
    Prepare('$uploadLoader-img').setAttribute('src','assets/loaders/loader_2.gif'); 
    Prepare('#chooser-btn').removeAttribute('name');
}
function uploadRevoked(){
    Prepare('$uploadLoader-img').setAttribute('src','assets/images/f-chooser-ico.png'); 
    Prepare('#chooser-btn').setAttribute('name','item-chooser-trigger');
}
function choosePhoto(e){
     var currentView=Prepare(e), 
     currentIMG=Prepare(currentView.getChildren('img')),
     viewIndex=Number(currentIMG.getAttribute('vindex')),
     viewLoader=Prepare('.uploadPreview-wrapper .loader'+(viewIndex)),
     nextView=Prepare('.uploadPreview-wrapper.view'+(viewIndex+1)),
     viewURL=currentIMG.url,
     formart=false;
    
if(sessionExist){                
        var chooser=new FileChooser('image/*','SINGLE');
        chooser.on('change',function(res){

          if(res.length>0){

           if(res.data.type.match(/^image\//)){
            selectedCount++;  

                      currentIMG.setSRC(URL.createObjectURL(res.data));
                      viewLoader.setSRC('assets/images/camera.png');
                      viewLoader.show();
                      currentView.removeAttribute('onclick');

                      var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.upload-module.php?request=CHOOSER&id='+session+'&vindex='+viewIndex,'default',true);
                       httpReq.execute(function(response){
                           if(response!=='progress'){
                               try{
                                   var result=response.target.responseText;
                                   currentView.setAttribute('onclick','choosePhoto(this)');

                                   if(result.match(/success/)){
                                      ///nothing
                                       if((viewIndex)<8){
                                         viewLoader.hide();  
                                          nextView.addClass('active');
                                          nextView.setAttribute('onclick','choosePhoto(this)'); 
                                       }              
                                   }else{
                                         print(result);
                                     viewLoader.setSRC('assets/images/error.png');
                                     errorAlert('Unable to upload this item, Please try again');
                                   }
                               }catch(error){
                                   print(error);
                                   viewLoader.setSRC('assets/images/error.png');
                                   errorAlert('Unable to upload this sample, Please try again');
                               }
                           }
                     });
              }else{
                errorAlert('Oops! Selected  file formart not supported !');
                formart=false;
              }

              }else{
                 selectedCount=0;
              }

        });
    }
  else{
        app.render('sign.html?backup=true&return=sellActivity');
  }
}
ayral.prepare(function(){
    //Upload Controller 
    var selectedColor=[];
	var selectedSize=[];

    app.find('input,textarea').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value==''){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
    });
    app.find('$i-description').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || value.length<20){
            Prepare(this).setBorder('1px solid #d9534f');
        }else{
            Prepare(this).setBorder('1px solid #ccc');
        }
    });  
    app.find('$i-price').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value=='' || notNumbers(value)){
              Prepare(this).setError();
        }else{
           Prepare(this).removeError();
        }
        Prepare(this).setValue(value.replace(/[^0-9]/g,''));
    }); 

app.find('$continue-trigger').on('click',function(){

        var inName=Prepare('$i-name'),
            inCategory=Prepare('$i-category'),
            inLocatiion=Prepare('$i-location'), 
            inPrice=Prepare('$i-price'), 
            inDescription=Prepare('$i-description'),
                name=inName.getValue(),
                category=inCategory.getValue(),
                price=inPrice.getValue(),
                description=inDescription.getValue(),
                controller=Prepare(this);
                SampleChoosers=Prepare('.uploadPreview-wrapper img');
        
      if(selectedCount>0){
        
         if(name==''){
            inName.setError();
         }else{
            inName.removeError(); 
         }
         if(category==''){
            inCategory.setError();
         }else{
            inCategory.removeError(); 
         }
         if(price==''){
            inPrice.setError();
         }else{
            inPrice.removeError(); 
         }
         if(name!=='' && category!=='' && price!==''){
             
             if(notNumbers(price)){
                inPrice.setValue('');
                inPrice.setError();   
                errorAlert('Price format not Supported !');
             } 
             else{
                inPrice.removeError(); 
                inDescription.setBorder('1px solid #ccc');
      
                    if(sessionExist){  
                        app.render('$moreActivity');
                        controller.setHtml('Continue');
                    }else{
                          app.render('sign.html?backup=true&return=sellActivity');
                    }
             }
         }
       }else{
         revokeProgress()
         controller.setHtml('Try Again');
         errorAlert('No sample Selected');
       }
    });
 	
	
  app.find('$noneColor').on('click',function() {
      selectedColor=[];
      $('.colorsManager .mycheckbox').prop("checked", false);
      Prepare('$i-colors').setValue(selectedColor.toString());
  }); 
     
  app.find('$noneSize').on('click',function() {
  	 selectedSize=[];
     $('.sizesManager .mycheckbox').prop("checked", false);
     Prepare('$i-sizes').setValue(selectedSize.toString());
  });
  
  app.find('.colorsManager .mycheckbox').on('click',function() {
     var checked=$(this).is(':checked'),
         val=$(this).parent('.inline-check').children('.text').text();
     if(checked==true){
         selectedColor.push(val);
     }else{
         for(i =0; i<selectedColor.length; i++){
             if(val==selectedColor[i]){
                selectedColor[i]=selectedColor[selectedColor.length-1];
                selectedColor.pop();
             }
         }
     }
     $('#noneColor').prop("checked", false);
     Prepare('$i-colors').setValue(selectedColor.toString());
  });
  
  //when any size selected
  app.find('.sizesManager .mycheckbox').on('click',function() {
     var checked=$(this).is(':checked'),
         val=$(this).parent('.inline-check').children('.text').text();
     if(checked==true){
         selectedSize.push(val);
     }else{
         for(i =0; i<selectedSize.length; i++){
             if(val==selectedSize[i]){
                selectedSize[i]=selectedSize[selectedSize.length-1];
                selectedSize.pop();
             }
         }
     }
     $('#noneSize').prop("checked", false);
     Prepare('$i-sizes').setValue(selectedSize.toString());
  	
  });
  app.find('$publish-item-trigger').on('click',function(){
      var controller=Prepare(this),
          inName=Prepare('$i-name'),
          inCategory=Prepare('$i-category'),
          inLocatiion=Prepare('$i-location'), 
          inPrice=Prepare('$i-price'), 
          inDescription=Prepare('$i-description'),
          SampleChoosers=Prepare('.uploadPreview-wrapper img');
          httpReq=new ayralHttpRequest('POST',hostname+'/server/app.upload-module.php?request=DETAILS&id='+session,'default',true);
      
      
       if(selectedCount>0){
         controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');          
         blockProgress();
           
        httpReq.execute(function(response){
        if(response!=='progress'){
           try{
                var result=response.target.responseText;
                revokeProgress();

                 if(result.match(/success/)){
                        app.render('$publishedActivity');
                        controller.setHtml('Publish');
                        inName.setValue('');
                        inCategory.setValue('');
                        inPrice.setValue('');
                        Prepare('$fileChooser').setValue('');
                        Prepare('$i-description').setValue(''); 
                        Prepare('.uploadPreview-wrapper').removeAttribute('onclick'); Prepare('.uploadPreview-wrapper').removeClass('active');
                        Prepare('.uploadPreview-wrapper img').setAttribute('src','assets/images/camera.png');
                        Prepare('.uploadPreview-wrapper:first-child').setAttribute('onclick','choosePhoto(this)');
                        $('.sizesManager .mycheckbox').prop("checked", false);
                        $('.colorsManager .mycheckbox').prop("checked", false);
                        selectedSize=[];
                        selectedColor=[];
                        selectedCount=0;  
                        Prepare('$i-sizes').setValue('');
                        Prepare('$i-colors').setValue('');
                  }else{
                          controller.setHtml('Try Again');
                          if(result.match(/NSS/)){
                             errorAlert('No Sample Selected');
                          }else{
                             print(result);
                             errorAlert('Unable to upload this item');
                          }
                      }
               }catch(error){
                    print(error);
                    revokeProgress();
                    controller.setHtml('Try Again');
                    errorAlert('Connection failed !');  
                } 
            }
         });
       }else{
         revokeProgress()
         controller.setHtml('Try Again');
         warningAlert('No sample Selected');   
       }
  });



});