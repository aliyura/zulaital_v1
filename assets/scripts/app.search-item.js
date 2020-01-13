function searchItem(url,req){
    var layer=Prepare('$marketView'),
        counter=Prepare('$searchResultCounter'),
        location=Prepare('$marketActivity').getAttribute('location');
        req=req.replace(/ /g,'');
        Prepare('.marketSearch-master').setValue(req);
      
        if(location!=1 && typeof location != typeof undefined && location!=null){
          url=url+'&location='+location;   
        }
        layer.render(loader);

        url = url.replace(/ {1,}/g," ");
        var httpReq=new ayralHttpRequest('GET',url,'default',true);
             httpReq.execute(function(response){
             if(response!='progress'){
                 try{
                     var result=response.target.responseText;
                     var businessName=Prepare('$marketActivity').getAttribute('businessName');
                     
                      if(result.match(/not_found/)){
                       if(location!='Nigeria'){
                          if(businessName!='*'){
                              layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">New Arrivals</h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Items Available from `+businessName+` in `+location+` </p>
                                </div>                           
                             `);
                          }else{
                            layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">New Arrivals</h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Items Available in `+location+`</p>
                                </div>                           
                             `); 
                          }
                       }else{
                          if(businessName!='*'){
                              layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">Business Items <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Items Available from `+businessName+`</p>
                                </div>                           
                             `);
                          }else{
                            layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">New Arrivals</h4>
                                </div>
                                <div  class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Items Available</p>
                                </div>                           
                             `); 
                          }  
                       }
                     }
                     else if(result.match(/not_match/)){
                        if(location!='Nigeria'){ 
                           if(businessName!='*'){
                                layer.render(`
                                <div actas="wrapper" class="result-counter-view">
                                    <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                </div>
                                <div class="RetryActivity-trigger">
                                   <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">`+req+` not Available in `+businessName+`, `+location+`</p>
                                </div>
                             `);
                            }else{
                                layer.render(`
                                    <div actas="wrapper" class="result-counter-view">
                                        <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                    </div>
                                    <div class="RetryActivity-trigger">
                                       <img src="assets/images/error.png" class="activityViewError"/> 
                                       <p style="opacity: 0.5">`+req+` not Available in `+location+`</p>
                                    </div>
                                 `);
                            }
                        }else{
                          if(businessName!='*'){
                                layer.render(`
                                <div actas="wrapper" class="result-counter-view">
                                    <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                </div>
                                <div class="RetryActivity-trigger">
                                   <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">`+req+` not Available in `+businessName+`</p>
                                </div>
                             `);
                            }else{
                                layer.render(`
                                    <div actas="wrapper" class="result-counter-view">
                                        <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                    </div>
                                    <div class="RetryActivity-trigger">
                                       <img src="assets/images/error.png" class="activityViewError"/> 
                                       <p style="opacity: 0.5">`+req+` not Available</p>
                                    </div>
                                 `);
                            }    
                        }
                     }else{
                        layer.clear();
                        storage.setItem('marketURI',url);
                        result=result.toString().replace(/,(?=[^,]*$)/, '');
                        var items=JSON.parse(`[`+result+`]`);
                        new sayayyaMarket().createItems(items,'true',2);
                     }
                 }catch(error){
                     print(error);
                   layer.render(`
                        <button type="button" class="RetryActivity-trigger" url="`+url+`"  onclick="RetryActivity(this,'01');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                            <p>Connection Failed<br/><b>Try Again</b></p>
                        </button>
                  `);
                 }
             }else{
              layer.render(loader);
             }
         });
}
function searchBusiness(req){
   var layer=app.find('$businessesView'),
       location=Prepare('$marketActivity').getAttribute('location');
 
    if(req!='' && req.length>2 && req!='1'){
        
      layer.clear();
      layer.render(loader);
        
        if(location!=1 && typeof location != typeof undefined && location!=null){
           url=url+'&location='+location;   
        }
        
         if(req=='' || typeof req === typeof undefined){
            req='1';
         }
         var tmpReq=dictionary.translate(req);
        
         var url=hostname+'/server/ui/app.businesses-activity.php?request='+req+'&treq='+tmpReq+'&id='+session,
             httpReq=new ayralHttpRequest('GET',url,'default',true);
             httpReq.execute(function(response){
             if(response!='progress'){
                 try{
                     var result=response.target.responseText;
            
                     if(result.match(/not_found/)){
                         if(location!='Nigeria'){
                            layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">Top Businesses <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div type="button" class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Businesess Found Around `+location+` </p>
                                </div>                           
                             `);
                         }else{
                             layer.render(`
                                <div actas="wrapper"  class="result-counter-view">
                                    <h4 name="searchResultCounter">Top Businesses <i actas="badge" class="danger">0 Found</i></h4>
                                </div>
                                <div type="button" class="RetryActivity-trigger">
                                  <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">No Businesess Available</p>
                                </div>                           
                             `);   
                         }
                     }
                     else if(result.match(/not_match/)){
                        if(location!='Nigeria'){
                             layer.render(`
                                <div actas="wrapper" class="result-counter-view">
                                    <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                </div>
                                <div type="button" class="RetryActivity-trigger">
                                   <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">`+req+` not Available Around `+location+`</p>
                                </div>
                             `);
                        }else{
                            layer.render(`
                                <div actas="wrapper" class="result-counter-view">
                                    <h4 name="searchResultCounter">`+req+` <i actas="badge" class="danger">0 Match</i></h4>
                                </div>
                                <div type="button" class="RetryActivity-trigger">
                                   <img src="assets/images/error.png" class="activityViewError"/> 
                                   <p style="opacity: 0.5">`+req+` not Available</p>
                                </div>
                             `);   
                        }
                     }else{
                       layer.clear();
                       storage.setItem('businessURI',url);
                       result=result.toString().replace(/,(?=[^,]*$)/, '');
                       var items=JSON.parse(`[`+result+`]`);
                       new sayayyaBusinesses().createBusiness(items,'true',1);
                     }
                 }catch(error){
                     print(error);
                   layer.render(`
                        <button type="button" class="RetryActivity-trigger" url="`+url+`"  onclick="RetryActivity(this,'03');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                              <p>Connection Failed<br/><b>Try Again</b></p>
                        </button>
                  `);
                 }
             }else{
              layer.render(loader);
             }
         });
    }
}
ayral.prepare(function(){ 
    
    //business search configurations
    app.find('$businessSearch-in').on('keyup',function(){
      var req=Prepare(this).getValue(); 
       if(req!='' && count(req)>2){
         searchBusiness(req);
       }
   });
   app.find('$businessSearch-trigger').on('click',function(){
      var req=Prepare('$businessSearch-in').getValue(); 
       if(req!='' && count(req)>2){
         searchBusiness(req);
       }
   }); 
    
     //products search configurations
    app.find('$productSearch-in').on('keyup',function(){
      var req=Prepare(this).getValue(); 
       if(req!='' && count(req)>2){
         refreshProducts(req);
       }
   });
   app.find('$productSearch-trigger').on('click',function(){
      var req=Prepare('$businessSearch-in').getValue(); 
       if(req!='' && count(req)>2){
        refreshProducts(req);
       }
   });
    
    //market search configurations
    app.find('.category').on('click',function(){
        var req=Prepare(this).getText();
        req=req.toString().trim();
        var tmpReq=dictionary.translate(req);
        var url=hostname+'/server/ui/app.market-items-ui.php?request='+req+'&treq='+tmpReq+'&id='+session;    
        searchItem(url,req);
        app.render('$marketActivity');
   });
    
   app.find('$searchItems-trigger').on('click',function(){
      var req=Prepare('$mainSearchInput').getValue(); 
       if(req!='' && count(req)>2){
           
         req=req.toString().trim();
         var tmpReq=dictionary.translate(req);
         var url=hostname+'/server/ui/app.market-items-ui.php?request='+req+'&treq='+tmpReq+'&id='+session;    
         searchItem(url,req);
         app.render('$marketActivity');
       }
   }); 
    
   app.find('$marketSearch-trigger').on('click',function(){
      var req=Prepare('$marketSearch-in').getValue(); 
       if(req!='' && count(req)>2){
          
           req=req.toString().trim();
           //get current configurations
          var business=Prepare('$marketActivity').getAttribute('business'),
              filter=Prepare('$marketActivity').getAttribute('filter'),
              tmpReq=dictionary.translate(req),
              url=hostname+'/server/ui/app.market-items-ui.php?request='+req+'&treq='+tmpReq+'&id='+session;
           
           
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
           searchItem(url,req);
       }
   }); 
    app.find('$marketSearch-in').on('keyup',function(){
      var req=Prepare('$marketSearch-in').getValue(); 
      if(req!='' && count(req)>2){
          
          req=req.toString().trim();
           //get current configurations
            var business=Prepare('$marketActivity').getAttribute('business'),
              filter=Prepare('$marketActivity').getAttribute('filter'),
              tmpReq=dictionary.translate(req),
              url=hostname+'/server/ui/app.market-items-ui.php?request='+req+'&treq='+tmpReq+'&id='+session;
           
           
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
           searchItem(url,req);
   
       }
   });
});
