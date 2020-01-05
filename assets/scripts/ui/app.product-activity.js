var controller;
(function(){
  $('#confirmModalAlert .No').click(function(){
    $('#confirmModalAlert').hide();
  });

  $('#confirmModalAlert .Yes').click(function(){
    deleteProduct(controller,'yes');
  });

})();

function deleteProduct(e,param){
    var switchEngine=app.find(e),
        item=e.getAttribute('item');
        controller=e;
        $('#confirmModalAlert').toggle();
 
        if(param=='yes'){
            switchEngine.render('<img src="assets/loaders/loader_2.gif" style="height:10px;"/>');
            var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.product-controller.php?request=002&id='+session+'&itemid='+item,'default',true);
               httpReq.execute(function(response){
                if(response!='progress'){
                     try{
                        var result=response.target.responseText;
                        Prepare('$product'+item).hide();
                        //print(result);
                    }catch(error){
                      errorAlert('Unable to delete this Item, please try again');
                    }
                }
            });
        }
}
function productSwitch(e){
    var switchEngine=app.find(e),
        state=e.getAttribute('state'),
        item=e.getAttribute('item');

    if(state=='ON'){
       switchEngine.setAttribute('state','OFF'); 
       switchEngine.setText('OFF');
    }else{
      switchEngine.setAttribute('state','ON'); 
      switchEngine.setText('ON');
    }
 var httpReq=new ayralHttpRequest('POST',hostname+'/server/app.product-controller.php?request=001&id='+session+'&itemid='+item+'&state='+state,'default',true);
    httpReq.execute(function(response){
     if(response!='progress'){
          try{
             var result=response.target.responseText;
              if(result.match(/success/)){
                // print(result);   
              }else{
                 warningAlert('Unable to switch '+state+' this product, please try again later');
              }
         }catch(error){
           errorAlert('Unable to switch '+state+' this product, please try again later');
         }
     }
 });
}

function sayayyaProduct(){
    
   this.createProducts=function(items,url,type){
        var layer=app.find('$productView');
        layer.setAttribute('text-align','left'),
        product_status='',counter=1,masterWidget='',
        uri=storage.getItem('productURI');
    
       if(!url.match(/&next/)){
            if(type==1){
                layer.render(`
                <div actas="wrapper"  class="result-counter-view-found" style="margin-top:5px;">
                    <h4 name="searchResultCounter">All Products <i actas="badge" class="danger">
                    <span name="productResultCounter-value">`+items[0].rows+`</span> Found</i></h4>
                </div>
                `);
            }else{
                layer.render(`
                <div actas="wrapper" class="result-counter-view-found" style="margin-top:5px;">
                    <h4 name="searchResultCounter">`+items[0].request+`<i actas="badge" class="danger">
                 <span name="productResultCounter-value">`+items[0].rows+`</span> Match</i></h4>
                </div>
                `);
            }
       }
       
       for(i=0; i<items.length; i++){
          item=items[i];
           if(item.status=='PA'){
               product_status=`<button type="button" item="`+item.id+`" state="PA" class="toggle disablingSwitch ripple" disabled>PA</button>`;
           }else{
              if(item.status=='IA'){
               product_status=`
               <button type="button" onclick="productSwitch(this);" item="`+item.id+`" state="OFF" class="toggle disablingSwitch ripple">ON</button>`;  
              }else{
                product_status=`
               <button type="button" onclick="productSwitch(this);" item="`+item.id+`" state="ON" class="toggle disablingSwitch ripple">OFF</button>`;  
              }
           }
               
          Prepare('.widget').removeAttribute('productMaster');
          if(counter==(i)){
            masterWidget='productMaster="master"';
          }
           
          if(lower(item.location.toString())=='null' || item.location==null){
                item.location='Not Specified' 
          }
           
           
          layer.append(`
            <section actas="widget" class="widget" `+masterWidget+` number="`+item.rownum+`" name="product`+item.id+`">
                  <div actas="group-view" class="item-layout" >
                     <div actas="group-item" class="sample-view" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.68)),url(`+item.sample+`);">
                        <div class="newOld-wrapper trashLayer"  item="`+item.id+`"  onclick="deleteProduct(this);">
                         <i class="fa fa-trash-o"></i>
                        </div>
                         <div class="oneOfCounter-wrapper success">1/`+item.count+`</div>
                        `+product_status+`
                      </div> 
                      <div actas="group-item" class="sample-info">
                        <div class="item-name">`+item.name+`</div>

                        <div class="upload-info"> 
                            <p class="price">
                            <sapn>₦`+item.price+`</sapn></p>
                        </div>
                      </div>    
                  </div>
               </section>
         `);
      }    
       
     if(url.match(/&next/)){
         var rows=layer.getCount('.widget');
         Prepare('$productResultCounter-value').render(rows);
     }
     storage.setItem('products',JSON.stringify(items));
  }
}
function refreshProducts(searchValue){
  var layer=app.find('$productView');
      layer.setAttribute('text-align','center');
      layer.render(loader);
    
        try{
            if(typeof searchValue == typeof undefined || searchValue=='' || searchValue==null){
                searchValue='1';
            }
        
            var url=hostname+'/server/ui/app.product-activity.php?request='+searchValue+'&id='+session;
            var httpReq=new ayralHttpRequest('GET',url,'default',true);
            httpReq.execute(function(response){
                if(response!='progress'){
                     try{
                        var result=response.target.responseText;
                        if(result.match(/not_found/)){
                            layer.render(`
                                  <div type="button" class="RetryActivity-trigger">
                                     <img src="assets/images/error.png" class="activityViewError"/> 
                                     <p>No Product Found</p>
                                   </div>
                            `);
                        } 
                        else if(result.match(/not_match/)){
                            layer.render(`
                                   <div type="button" class="RetryActivity-trigger">
                                     <img src="assets/images/error.png" class="activityViewError"/> 
                                     <p>`+searchValue+` not Available</p>
                                   </div>
                            `);
                        }else{
                              if(result.match(/:/)){
                                  storage.setItem('productURI',url);
                                  result=result.toString().replace(/,(?=[^,]*$)/, '');
                                  var items=JSON.parse(`[`+result+`]`);
                                  new sayayyaProduct().createProducts(items,'true',1);
                              }else{
                                  print('Failed:'+result);
                              }
                        }
                 
                }catch(error){
                       print(error);
                       layer.render(`
                         <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="RetryActivity(this,'03');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                            <p>Connection Failed<br/><b>Try Again</b></p>
                         </button>
                      `);
                    }
                }
            });
  }
  catch(error){
       layer.render(`
          <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="RetryActivity(this,'03');">
            <img src="assets/images/error.png" class="activityViewError"/> 
            <p>Connection Failed<br/><b>Try Again</b></p>
          </button>
      `);
  }  
}
function loadProducts(flag){
    var layer=app.find('$productView');
      layer.setAttribute('text-align','center');

 if(sessionExist){

   if(flag==1){
     refreshProducts();
   }else{
       var oldProducts=storage.getItem('products');
       if(oldProducts!=null && oldProducts!='null' && oldProducts!='' && typeof oldProducts != typeof undefined){
            oldProducts=JSON.parse(oldProducts);
            new sayayyaProduct().createProducts(oldProducts,'true',1);
       }else{
          refreshProducts(); 
       }   
   } 
 }
}
//use for redirection
function showProducts(flag){
    var layer=app.find('$productView');
    layer.setAttribute('text-align','center');

   layer.render(loader);
   app.render('$productActivity');     
    if(flag==1){
         loadProducts(1);    
    }else{
       loadProducts(); 
    }
}
function initializeMoreProducts(url){
    var moreLoader=$('#product-MoreLoader');
    moreLoader.show();

    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
            
              var result=response.target.responseText;
              if(result.match(/:/)){
                result=result.toString().replace(/,(?=[^,]*$)/, '');
                var items=JSON.parse(`[`+result+`]`);
                new sayayyaProduct().createProducts(items,url,1);
                moreLoader.hide();
              }else{
                 moreLoader.hide();
              }
        
         }
         catch(error){
             moreLoader.hide();
             print(error);
         }
       }else{
           moreLoader.show();
       }
    });
}
var locationUri,uri,number=0,previous=0;
$('#ayralApp').scroll(function(){
    var moreLoader=$('#product-MoreLoader');
    locationUri=window.location.href;
    
    if(locationUri.toString().match(/productActivity/)){
        if(($(this).scrollTop()+$(this).height())+5 == (getDocHeight('productActivity'))){ 
            uri=storage.getItem('productURI');
            if(document.querySelector('[productMaster="master"]')){
               number=document.querySelector('[productMaster="master"]').getAttribute('number');
            }
            if(typeof number != typeof undefined && number>0){
                
                if(uri!='' && uri!=null){
                   
                    if(number!=previous){
                        if(uri.match(/&next/)){
                            uri=uri.substr(0,uri.indexOf('&next')-1);
                        }
                        moreLoader.show();
                        uri=uri+'&next='+number;
                        uri=uri.replace(/ /g,'');
                        initializeMoreProducts(uri);
                        previous=number;
                       
                    }else{
                        moreLoader.hide();
                    }
                }
            }
        }
    }
});
loadProducts(1);