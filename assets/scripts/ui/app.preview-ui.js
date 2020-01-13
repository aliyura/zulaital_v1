(function(){
   Prepare('input,textarea').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value==''){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
    });   
})();

function colorSelection(e){
 var colors=window.document.querySelectorAll('.colors-btn');  
  foreach(colors,function(color){
        color.removeAttribute('name');
  })
  Prepare(e).setAttribute('name','current-selectedColor');  
}
function sizeSelection(e){
  var sizes=window.document.querySelectorAll('.sizes-btn');  
  foreach(sizes,function(size){
    size.removeAttribute('name');
  })
  $('.colors-btn').removeAttr('name');  
  Prepare(e).setAttribute('name','current-selectedSize');
}

function preparePreviewTabs(e){
    var currentTrigger=Prepare(e),
        triggerList=Prepare('.previewTabsTriggers li'),
        currentLayer=Prepare('$prev-'+currentTrigger.getAttribute('name')+'Layer'),
        layers=Prepare('.previewTab-layers section');

    layers.hide();
    triggerList.removeClass('active');
    currentTrigger.addClass('active');
    currentLayer.show();
}
function previewContityIncrementer(e,itemid){
     var operator=Prepare(e).getAttribute('operator'),
         buyTrigger=Prepare('$buy_'+itemid),
         currPrice=Prepare('$currentItemPrice-view'), 
         contityCounter=Prepare('$previewContityCounter'),
         initialPrice=Prepare('$currentItemPrice-view').getAttribute('initialPrice'),
         contity=Number(contityCounter.getValue()),
         price=currPrice.getText();
    
    price=Number(price.replace(/,/g,''));
    initialPrice=Number(initialPrice.replace(/,/g,''));      

    if(operator=='-'){
        if(price>initialPrice){
          price=price-initialPrice;
          contity=contity-1;
        }
    }else{
       price=price+initialPrice;
       contity=contity+1;
    }
    
    buyTrigger.setAttribute('contity',contity);
    contityCounter.setValue(contity);
    currPrice.setText(price);
}

function sendMessage(e){

     var sender=app.find(e);
             var inName=Prepare('$preview-mName'),
                 inSubject=Prepare('$preview-mSubject'),
                 inBody=Prepare('$preview-mBody'),
             name=inName.getValue(),
             subject=inSubject.getValue(),
             body=inBody.getValue();
             controller=Prepare(e);
    
         var to=controller.getAttribute('to'),
            receiver=controller.getAttribute('receiver'),
            topic=controller.getAttribute('item');
    
         if(name==''){
            inName.setError();
         }else{
            inName.removeError(); 
         }
         if(subject==''){
            inSubject.setError();
         }else{
            inSubject.removeError();
         }
        if(body==''){
            inBody.setError();
         }else{
            inBody.removeError();
         }
    
        if(name!=='' && subject!=='' && body!==''){
            
          if(sessionExist){
              
            controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
            blockProgress();
              
            var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.send-message.php?id='+session+'&to='+to+'&receiver='+receiver+'&topic='+topic,'default',true);
                httpReq.execute(function(response){
                    if(response=='progress'){
                     controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
                    }else{
                        try{
                          var result=response.target.responseText;
                          revokeProgress();
                            
                          if(result.match(/success/)){
                              inSubject.setValue('');
                              inBody.setValue('');
                             
                             notify('Message Sent !');
                             controller.setHtml('Send');
                             controller.setAttribute('disabled','true');
                          }
                          else{
                            controller.setHtml('Try Again');
                            warningAlert(result); 
                          }
                        }
                        catch(error){
                          revokeProgress();
                          controller.setHtml('Try Again');
                          warningAlert('Connection failed !'); 
                        }
                    }
                });
           }else{
            app.render('sign.html');
          }
      }
}
function loadToViewer(img){
     var layer=app.find('$previewFrame-layer');
     layer.setAttribute('style','background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url('+img.src+');');
     Prepare(img).addClass('shake');
    
    setTimeout(function(){
      Prepare(img).removeClass('shake');
    },1000);
}
function addToCart(e,itemID,itemName){
     var layer=app.find('$orderPreview-layer'),
         contity=Prepare('$buy_'+itemID).getAttribute('contity'),
         itemPrice=Prepare('$currentItemPrice-view').getText(), 
         initialPrice=Prepare('$currentItemPrice-view').getAttribute('initialPrice'),
         controller=Prepare(e),
         color='Any', size='Any';
    

   initialPrice=initialPrice.replace(/,/g,'');
   if(document.querySelector('[name="current-selectedColor"]')){
    color=Prepare('$current-selectedColor').getText();
   }
   if(document.querySelector('[name="current-selectedSize"]')){
    size=Prepare('$current-selectedSize').getText();
   }

if(sessionExist){
              
  controller.setHtml('<i class="fa fa-check"></i>&nbsp;Added');  
  controller.setAttribute('disabled','true');
  refreshCartCounter(1,'+');
    
  var httpReq=new ayralHttpRequest('GET',hostname+'/server/app.cart-module.php?request=ADD&id='+session+'&price='+initialPrice+'&contity='+contity+'&color='+color+'&size='+size+'&itemid='+itemID+'&name='+itemName,'default',true);
      httpReq.execute(function(response){
          if(response=='progress'){
           controller.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
          }else{
              try{
                var result=response.target.responseText;
                if(result.match(/success/)){
                    //Toast.show("Added to your cart");
                   controller.removeAttribute('disabled');
                   $(e).removeAttr('disabled');
                   controller.setHtml('<i class="icon-basket"></i>&nbsp;Add to Cart');  
                 }else{
                    Toast.err("Unable to process your request");
                    controller.setHtml('Try Again');
                }
              }
              catch(error){
                revokeProgress();
                controller.setHtml('Try Again');
                warningAlert('Connection failed !'); 
              }
          }
      });
  }else{
    app.render('sign.html');
  }
}
function siyayyaPrview(){
  
   this.displayItem=function(item,save,type){
      
        var item_condition='',businessStamp='',warranty='',
            multiple='',colors='',sizes='',price=0,target='',
            sub_items='',sizesContainer='',colorsContainer='',
            layer=app.find('$itemPreview-layer');
            layer.setAttribute('text-align','left');
    
          if(item.condition=='New'){
              item_condition='<div class="newOld-wrapper new">'+item.condition+'</div>';
          }else if(item.condition=='Used'){
              item_condition='<div class="newOld-wrapper info">'+item.condition+'</div>';
          }else if(item.condition=='Old'){
              item_condition='<div class="newOld-wrapper warning">'+item.condition+'</div>';
          }else if(item.condition=='Hot'){
              item_condition='<div class="newOld-wrapper danger">'+item.condition+'</div>';
          }
       
          if(item.owner_ptype=='2' || item.owner_ptype==2){
              businessStamp='<div class="orderStatusInPreview-wrp success">Sponsored</div>';
          }
          layer.clear();

          var temp=item.samples;
         for(sample in temp){
             sample=temp[sample];
             sub_items +=`<div class="indicators row"><ol class="">`;
             if(sample!='not_set' && sample!='' && sample!=null && typeof sample != typeof undefined){ 
              sub_items=sub_items+`                  
                    <li  class="preview-indicator active"></li>                 
                `;
             }
         }  
              
         sub_items += `</ol></div>`

        if(item.contity=='MULTIPLE'){
          multiple=`
           <!-- addition button -->
           <span><a class="ripple btn btn-floating waves-effect waves-ripple waves-light" onclick="previewContityIncrementer(this,'`+item.id+`');"  operator="-" style="float:left; margin-left: 5px;"><i class="fa fa-minus"></i></a></span>
           <!-- order counter -->
           <span>
           <input type="text" readonly value="1" class="order-counter" name="previewContityCounter">
           </span>
            <!-- minus button -->
           <span><a class="ripple btn btn-floating waves-effect waves-ripple waves-light" onclick="previewContityIncrementer(this,'`+item.id+`');" operator="+" style="float:left; margin-left: 5px; "><i class="fa fa-plus"></i></a></span>
           `;
        }             
       
       var item_colors=item.colors.split(',');
       if(item_colors.length>0 && item.colors!=""){
           for(color in item_colors){
              colors+=`
                <button type="button" class="sizesColors-btn colors-btn" name="any-color" onclick="colorSelection(this);" style="background-color:`+ item_colors[color]+`"></button>
              `;
           }
          //  colorsContainer=`
          //   <div actas="container" class="sizesColors-wrapper">
          //       <p>Available Colors</p>
          //       `+colors+`
          //   </div>
          //   `;
       }
       var item_sizes=item.sizes.split(',');
       if(item_sizes.length>0 && item.sizes!="" && item_sizes !=null){
           for(size in item_sizes){
             
              sizes+=`
                <button type="button" class="sizesColors-btn sizes-btn"  name="any-size"  onclick="sizeSelection(this);" >`+item_sizes[size]+`</button>
              `;
           }
           
           sizesContainer=`
            <div actas="container"  class="sizesColors-wrapper">
                `+sizes+`
            </div>
          `;
       }
    
       
       if(item.price!=item.newPrice){
          price=`
            <span style="color:#ccc;padding-right:5px"><del><span class=""><i class="fa fa-naira"></i></span>`+item.price+`<del></span>
            <span name="currentItemPrice-view" initialPrice="`+item.newPrice+`"><span class=""><i class="fa fa-naira"></i></span>`+item.newPrice+`</span>
          `;
       }else{
          price=`
            <span name="currentItemPrice-view" initialPrice="`+item.price+`"><span class=""><i class="fa fa-naira"></i></span>`+item.price+`</span>
          `;  
       }
       
       
       if(item.owner_id!==session){
           previewControlsHTML=`
             `+colorsContainer+` `+sizesContainer+`
            
             <div class="row fixed checkout-btn-row">
                      <div class="col-sm-6 checkout-btn back-btn">
                       <button type="button" class="toCheckout-btn" onclick="orderActivity(this);" style="float:right; outline:none;"><span><i class="fa fa-arrow-left" style="font-size:14px"></i></span>&nbsp; Back</button>
                      </div>
                       <div class="col-sm-6 checkout-btn checkout-button" >
                        
                `+multiple+`           
                 <!-- buy/add button -->
                <button type="button" class="btn waves-effect waves-light cartbtn  waves-ripple success " style="float:right;height:100%;width:100%;outline:none; " onclick="addToCart(this,'`+item.id+`','`+item.name+`');" name="buy_`+item.id+`" contity="1"><i class="icon-basket"></i>&nbsp;Add to Cart</button>
            
                      </div>
                   </div> 
           
            `;
             publishedByHTML=``;
       }else{
             previewControlsHTML=`
             `;
             publishedByHTML=``;
       }
       
       
        //Target Setup
        if(item.target=="Both"){
          target='';      
        }else{
           target='For '+item.target;
        }
       
       //Warranty Setup
        if(item.warranty!='None' && item.warranty!='Null' && item.warranty!=''){
            warranty='with '+item.warranty;
        }else{
            warranty='';
        }
       
        layer.render(`
         <section actas="preview">
             <div class="banner-section">
             <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                  <div class="item active previewFrame-layer" name="previewFrame-layer" style=" background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+item.sample+`);"  onerror="onImageError(this);"  onclick="showImage('`+item.sample.sample0+`');">
                  `+item_condition+` `+businessStamp+`
                  </div>
                </div>
                </div>	
                <div class="clearfix"> </div>
                 <div class="sub-preview-wrp">
                   `+sub_items+`
                 </div>  
            </div>
          <div class="row">
            <!-- product description -->
            <div class="col-xs-12" style="padding:0; background:none">
              <p class="productname">`+item.name+` `+target+` `+warranty+`</p>
               <!-- product prices -->
              <hr class="divider">
              <div class="">
                <p class="text-center prod-price">
                  `+price+`
                </p>
              </div>
              <!-- product icons for substraction and additkon -->
              <section class="icons-wrp">
                `+previewControlsHTML+`
              
                <!-- specification and review -->
                <div class="row">
                  <div actas="header" class="signup-option" style="padding:2px 10px;">
                    <div actas="group-view" class="group-view specs previewTabsTriggers">
                      <li class="product-tabs active"  name="description" onclick="preparePreviewTabs(this);">
                        Description
                      </li>
                       <li class="product-tabs" name="features" onclick="preparePreviewTabs(this);">
                        Features
                      </li>
                      <li class="product-tabs" name="review" onclick="preparePreviewTabs(this);">
                        Review
                      </li>
                    </div>
                  </div>
                </div> 
                <div class="row previewTab-layers" name="previewTab-layers">
                     <section actas="container" class="description animated slideInLeft" name="prev-descriptionLayer"> 
                       <p>`+item.description+`<p>
                    </section>
                      <section actas="container" class="description animated slideInLeft" name="prev-featuresLayer"> 
                        <p>
                        <li>No Features shared</li>
                        <li>No Features shared</li>
                        <li>No Features shared</li>
                        <li>No Features shared</li>
                        </p>
                    </section>
                    <section actas="container" class="description animated slideInLeft" name="prev-reviewLayer"> 
                        <p>No Review</p>
                    </section>
                    </div>                                                  
                         </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </section> 
        `);
       // storage.setItem('preview_'+item.id,JSON.stringify(item));
    }
}
function previewActivity(itemid,itemName){
    var layer=app.find('$itemPreview-layer');
        layer.setAttribute('text-align','center');
    
     try{
        layer.render(loader);
        app.render('$previewActivity');
        
        var previewHistory=storage.getItem('preview_'+itemid);
        if(previewHistory!=null && previewHistory!='null' && previewHistory!='' && typeof previewHistory != typeof undefined){
            previewHistory=JSON.parse(previewHistory);
            new siyayyaPrview().displayItem(previewHistory,true,1);
        }
       else{
        var url=hostname+'/server/ui/app.preview-ui.php?id='+session+'&itemid='+itemid+'&name='+itemName,
        httpReq=new ayralHttpRequest('GET',url,'default',true);        
        httpReq.execute(function(response){
            if(response!='progress'){
                 try{
                     var result=response.target.responseText;
                    if(upper(result)=='NOT_FOUND'){
                        layer.render(`
                            <div class="RetryActivity-trigger"
                                <img src="assets/images/error.png" class="activityViewError"/> 
                                <p>Not Found </p>
                            </div>
                        `);
                    }else{
                       result=result.toString().replace(/,(?=[^,]*$)/, '');
                       result=result.toString().replace('success:', '');
                       var item=JSON.parse(result);
                       print(item);
                       new siyayyaPrview().displayItem(item,true,1);
                    }
                 }
                 catch(error){
                 print(error);
                   layer.render(`
                       <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="RetryActivity(this,'02');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                            <p>Connection Failed<br/><b>Try Again</b></p>
                        </button>
                  `);
                }
            }
        });
       }
  }catch(error){
      print(error);
  }
}

