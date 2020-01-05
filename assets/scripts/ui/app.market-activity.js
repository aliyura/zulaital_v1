function sayayyaMarket(){
    
    this.createItems=function(items,url,type){
        var layer=app.find('$marketView');
        language=storage.getItem('language'),
        item_condition='',  masterWidget='',
        counter=1;

       if(!url.match(/&next/)){
           if(type==1){
               layer.render(`
               <div actas="wrapper"  class="result-counter-view-found">
                   <h4 name="searchResultCounter">Latest items <i actas="badge" class="danger"> 
                   <span name="marketResultCounter-value">`+items[0].rows+`</span> Found</i></h4>
               </div>
               `);
           }else{
               layer.render(`
               <div actas="wrapper" class="result-counter-view-found">
                   <h4 name="searchResultCounter">`+items[0].request+` <i actas="badge" class="danger">
                   <span name="marketResultCounter-value">`+items[0].rows+`</span> Match</i></h4>
               </div>
               `);
           }
       }
    
       for(i=0; i<items.length; i++){
          item=items[i];
           
          if(item.condition=='New'){
              item_condition='<div class="newOld-wrapper new">'+item.condition+'</div>';
          }else if(item.condition=='Used'){
              item_condition='<div class="newOld-wrapper info">'+item.condition+'</div>';
          }else if(item.condition=='Old'){
              item_condition='<div class="newOld-wrapper warning">'+item.condition+'</div>';
          }else if(item.condition=='Hot'){
              item_condition='<div class="newOld-wrapper danger">'+item.condition+'</div>';
          }
           
          Prepare('.widget').removeAttribute('marketMaster');
          if(counter==(i)){
            masterWidget='marketMaster="master"';
          }
        
           if(lower(item.location.toString())=='null' || item.location==null){
                item.location='Not Specified' 
           }

     
          layer.append(`
          <section actas="widget" class="widget" `+masterWidget+` number="`+item.rownum+`" id="item`+item.id+`">
              <div  class="item-layout" >
                 <div actas="group-item" class="sample-view"  style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.68)),url(`+item.sample+`);" onclick="previewActivity('`+item.id+`','`+item.name+`');">
                     `+item_condition+`
                     <div class="oneOfCounter-wrapper success">1/`+item.count+`</div>
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
        Prepare('$marketResultCounter-value').render(rows);
     }
        
     storage.setItem('items',JSON.stringify(items));   
   
  };
}

function initializeMarketProducts(url,open,business){
    var filter='Latest',
        layer=app.find('$marketView'),
        location=storage.getItem('location'),
        businessName=Prepare('$marketActivity').getAttribute('businessName');
           
    if(location=='' || location=='null'){
        location='Nigeria';
    }
    
    if(open=='OPEN'){
      app.render('$marketActivity');
    }else{
      if(open!=1 && typeof open != typeof undefined && open!=null){
        filter=open.toLowerCase();
      }
    }
    layer.render(loader);

    if(location!=1 && typeof location != typeof undefined && location!=null){
       url=url+'&location='+location;   
    }
    
     if(typeof business != typeof undefined && business!=null){
         var hint='Search items from '+business.name;
         if(initialLanguage=='HAUSA'){
           document.querySelector('#marketSearch-in').placeholder=dictionary.translate(hint);
         }else{
          document.querySelector('#marketSearch-in').placeholder=hint;   
         }
     }else{
         var hint='Search items';
         if(initialLanguage=='HAUSA'){
           document.querySelector('#marketSearch-in').placeholder=dictionary.translate(hint);
         }else{
          document.querySelector('#marketSearch-in').placeholder=hint;   
         }  
     }
        
    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
            try{
               var result=response.target.responseText;
                     if(typeof business != typeof undefined && business!=null){
                        Prepare('$marketActivity').setAttribute('business',business.id);
                        Prepare('$marketActivity').setAttribute('businessName',business.name);
                        businessName=business.name;
                     }
                        
                   if(result.match(/not_found/) || result.match(/not_match/)){
                       if(location!='Nigeria' && location!='Nigeria' && location!='' && location!='null' && location!=null){
                           
                           if(filter!='' && typeof filter !=typeof undefined){
                             filter=filter.replace(/'/g,'');      
                           }
                           
                           if(businessName!='*'){
                              layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">`+filter+` Items <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No `+filter+` Items  Available from `+businessName+` in `+location+` </p>
                                </div>                           
                             `);
                          }else{
                            layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">New Items <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No `+filter+` Items  Available in `+location+`</p>
                                </div>                           
                             `); 
                          }
                       }else{
                          if(businessName!='*'){
                              layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">`+filter+` Items <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No `+filter+` Items  Available from `+businessName+`</p>
                                </div>                           
                             `);
                          }else{
                            layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">New Items <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No  `+filter+` Item Available</p>
                                </div>                           
                             `); 
                          }  
                       }
                    }
                   else{
                       if(result.match(/:/)){
                         storage.setItem('marketURI',url);
                         result=result.toString().replace(/,(?=[^,]*$)/, '');
                         var items=JSON.parse(`[`+result+`]`);
                         new sayayyaMarket().createItems(items,url,1);
                       }else{
                          print('Failed:'+result);
                       }
                   }
         
          } 
           catch(error){
               print(error);
              layer.render(`
                   <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="RetryActivity(this,'01');">
                       <img src="assets/images/error.png" class="activityViewError"/> 
                        <p>Connection Failed<br/><b>Try Again</b></p>
                   </button>
             `);
           }
       }
    });
}
function getMarketByFilter(filter){
               var layer=Prepare('$marketView');
               Prepare('$marketActivity').setAttribute('url',filter);
               
    
       var url=hostname+'/server/ui/app.market-activity.php?request=1&id='+session+'&filter='+filter,
           business=Prepare('$marketActivity').getAttribute('business');
    
       if(business!=1 && typeof business != typeof undefined && business!=null){
           if(business!='*'){
              url=url+'&business='+business;
           }
       }   
   initializeMarketProducts(url,filter);
}
function loadBusinessProducts(businessID, businessName){
               var layer=Prepare('$marketView'),
                   filter=Prepare('$marketActivity').getAttribute('filter');
             
       var url=hostname+'/server/ui/app.market-activity.php?request=1&id='+session,
           business=businessID;
    
       if(filter!=1 && typeof filter != typeof undefined && filter!=null){
           if(filter!='*'){
              url=url+'&filter='+filter;
           } 
       }
       if(business!=1 && typeof business != typeof undefined && business!=null){
           if(business!='*'){
              url=url+'&business='+business;
           }
       }   
 initializeMarketProducts(url,'OPEN',{name:businessName,id:businessID});
}

function loadGeneralProducts(param,option){
               var layer=Prepare('$marketView'),
                   filter=Prepare('$marketActivity').getAttribute('filter'),
                   url=hostname+'/server/ui/app.market-activity.php?request=1&id='+session;
                   
                   
    //initialize business url 
    Prepare('$marketActivity').setAttribute('business','*');
    Prepare('$marketActivity').setAttribute('businessname','*');
    Prepare('$marketActivity').setAttribute('filter','*');

    if(param=='OPEN' || option=='OPEN'){
      app.render('$marketActivity');
    }
    
    if(param=='1'){
           layer.render(loader);
           var oldItems=storage.getItem('items');
            if(oldItems!=null && oldItems!='null' && oldItems!='' && typeof oldItems != typeof undefined){
                 oldItems=JSON.parse(oldItems);
                 new sayayyaMarket().createItems(oldItems,'true',1);
            }else{
               initializeMarketProducts(url,'OPEN');
            }  
    }else{
      initializeMarketProducts(url,param);
    }
}
function initializeMoreItems(url){
    var moreLoader=$('#moreLoader-wrapper');
    moreLoader.show();
    
    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
            
              var result=response.target.responseText;
            
              if(!result.match(/not_found/) && !result.match(/not_match/)){
                if(result.match(/:/)){
                    result=result.toString().replace(/,(?=[^,]*$)/, '');
                    var items=JSON.parse(`[`+result+`]`);
                    new sayayyaMarket().createItems(items,url,1);
                    moreLoader.hide();
                
                }else{
                  moreLoader.hide();
                }
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
    var moreLoader=$('#market-moreLoader');
    
    locationUri=window.location.href;
    if(locationUri.toString().match(/marketActivity/)){
        
        if(($(this).scrollTop()+$(this).height())+5 == (getDocHeight('marketActivity'))){ 
            uri=storage.getItem('marketURI');
            if(document.querySelector('[marketMaster="master"]')){
               number=document.querySelector('[marketMaster="master"]').getAttribute('number');
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
                        initializeMoreItems(uri);
                        previous=number;
                       
                    }else{
                        moreLoader.hide();
                    }
                }
            }
        }
    }
});
loadGeneralProducts();
    
