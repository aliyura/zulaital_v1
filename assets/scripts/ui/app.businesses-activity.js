function sayayyaBusinesses(){
    
    this.createBusiness=function(items,save,type){
        var layer=app.find('$businessesView'),
            open='',counter=0,masterWidget='',
            uri=storage.getItem('businessURI');
     
       layer.clear();
       for(i=0; i<items.length; i++){
           
         item=items[i];
         
        if(item.oc.match(/24\/7/)){
             open=' <span actas="badge" class="primary closeOpen-flag">Open</span>';
         } 
         else{
             var openingTime=item.oc.substring(0,item.oc.indexOf('AM'));
             var closingTime=(item.oc.substring(item.oc.indexOf('-')+1,item.oc.length));
             closingTime=closingTime.replace(/AM/g,''); 
             closingTime=closingTime.replace(/PM/g,''); 
             openingTime=closingTime.replace(/AM/g,''); 
             openingTime=closingTime.replace(/PM/g,'');
             openingTime=Number(openingTime);
             closingTime=Number(closingTime);
             
              if(new Date().getHours()<openingTime){
                   open=' <span actas="badge" class="danger closeOpen-flag">Closed</span>'; 
              }else{
                   open=' <span actas="badge" class="success closeOpen-flag">Open</span>';
              }
         }

          item.dp=item.dp.toString().replace('..','');
          if(item.dp.startsWith('/')){
            item.dp=hostname+item.dp
          } 
          if(item.dp.match(/default\//)){ 
            item.dp='assets/images/no_sample_preview.jpg';
          }
           
          Prepare('.businessWidget').removeAttribute('businessMaster');
          if(counter==(i)){
              masterWidget='businessMaster="master"';
          }
            
         layer.append(`
             <div actas="widget" `+masterWidget+` number="`+item.rownum+`" class="businessWidget">
              <div class="businessList-profile">
                 `+open+`
                 <div class="businessList-profile-ico ripple" target="otherProfile(`+item.id+`);"style=" background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+item.dp+`);"></div>
                <div class="shopBaskt " onclick="loadBusinessProducts('`+item.id+`','`+item.name+`');">
                  <i class="icon-basket"></i>  
                    <p>Shop</p>
                </div>
              </div>
              <div actas="footer" class="footer">
                  <section class="businessName-wrp">
                      <div class="company-name">`+item.name+`</div>
                      <div><i class="icon-location-pin"></i> `+item.city+`</div>
                  </section> 
                  <section class="businessRate-wrp">
                      <span class="customersCounter"><b>02</b></span><span> Customers</span>
                  </section>
              </div>
             </div>  
           `);
       }
      storage.setItem('businesses',JSON.stringify(items));
   }; 
}

function refreshBusinessesActivity(){
    var layer=app.find('$businessesView'),
        location=storage.getItem('location'),
        url=hostname+'/server/ui/app.businesses-activity.php?request=1&id='+session,
        location=Prepare('$marketActivity').getAttribute('location');
       layer.render(loader);
         

    if(location!=1 && typeof location != typeof undefined && location!='null' && location!=''){
       url=url+'&location='+location;   
    }
    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
              var result=response.target.responseText;
              if(result.match(/not_found/)){
                  if(location!='Nigeria' && location!='null'){
                   layer.render(`
                       <div type="button" class="RetryActivity-trigger">
                         <img src="assets/images/error.png" class="activityViewError"/> 
                         <p>No Business Found in  `+location+` </p>
                       </div>
                   `);
                  }else{
                     layer.render(`
                       <div type="button" class="RetryActivity-trigger">
                         <img src="assets/images/error.png" class="activityViewError"/> 
                         <p>No Business Available </p>
                       </div>
                   `);   
                  }
                  
               }else{
                   if(result.match(/:/)){
                       layer.clear();
                       storage.setItem('businessURI',url);
                       result=result.toString().replace(/,(?=[^,]*$)/, '');
                       var items=JSON.parse(`[`+result+`]`);
                       new sayayyaBusinesses().createBusiness(items,'true',1);
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
function businessesActivity(flag,open){
    var layer=app.find('$businessesView');
    layer.setAttribute('text-align','center');
    var url=hostname+'/server/ui/app.businesses-activity.php?request=1&id='+session;

    if(open!='init'){
        app.render('$businessesActivity');
    }
    
    try{
        if(flag==1){
             refreshBusinessesActivity();
        }else{
            layer.render(loader);
            var Businesses=storage.getItem('businesses');
            if(Businesses!=null && Businesses!='null' && Businesses!='' && typeof Businesses != typeof undefined){
                 Businesses=JSON.parse(Businesses);
                 new sayayyaBusinesses().createBusiness(Businesses,'true',1);
            }else{
               refreshBusinessesActivity(); 
            }   
        }
  }catch(error){
      print(error);
       layer.render(`
          <button type="button" class="RetryActivity-trigger"   url="`+url+`"  onclick="RetryActivity(this,'03');">
              <img src="assets/images/error.png" class="activityViewError"/> 
              <p>Connection Failed<br/><b>Try Again</b></p>
          </button>
      `);
  }
}
refreshBusinessesActivity();