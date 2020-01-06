(function(){
   app.find('input,textarea').on('keyup',function(){
        var value=Prepare(this).getValue();
        if(value==''){
            Prepare(this).setError();
        }else{
            Prepare(this).removeError();
        }
    }); 

})();
function siyayyaOrderPrview(){
    
   this.displayOrder=function(item,save,type){
      
        var item_condition='',
            multiple='',
            sub_items='',
            actionHtml='',
            layer=app.find('$orderPreview-layer');
            layer.setAttribute('text-align','left');
          
          if(item.item.condition=='New'){
              item_condition='<div class="newOld-wrapper new">'+item.item.condition+'</div>';
          }else if(item.item.condition=='Used'){
              item_condition='<div class="newOld-wrapper info">'+item.item.condition+'</div>';
          }else if(item.item.condition=='Old'){
              item_condition='<div class="newOld-wrapper warning">'+item.item.condition+'</div>';
          }else if(item.item.condition=='Hot'){
              item_condition='<div class="newOld-wrapper danger">'+item.item.condition+'</div>';
          }
          layer.clear();
        
         var temp= [item.item.sample.sample0,item.item.sample.sample1,item.item.sample.sample2,item.item.sample.sample3,item.item.sample.sample4,item.item.sample.sample5,item.item.sample.sample6,item.item.sample.sample7];
         for(sample in temp){
             sample=temp[sample];
             if(sample!='not_set' && sample!='' && sample!=null && typeof sample != typeof undefined){ 
              sub_items=sub_items+`
                <div class="item active">
                  <img class="first-slide animated" onerror="onImageError(this);" onclick="loadToViewer(this);" src="`+sample+`" alt="`+item.item.name+`">
                </div>`;
             }
         } 
       
        if(item.status=='OC'){
            orderStatusHTML='<div class="orderStatusInPreview-wrp warning">Canceled</div>';
        }
        else if(item.status=='OE'){
            orderStatusHTML='<div class="orderStatusInPreview-wrp  warning">Explored</div>';
        }
        else if(item.status=='OA'){
            orderStatusHTML='<div class="orderStatusInPreview-wrp  success">Aproved</div>';
        }
        else if(item.status=='OR'){
            orderStatusHTML='<div class="orderStatusInPreview-wrp  info">Rejected</div>';
        } 
        else if(item.status=='PM'){
            orderStatusHTML='<div class="orderStatusInPreview-wrp  info">Pending</div>';
        }else{
           orderStatusHTML='<div class="orderStatusInPreview-wrp  info">Pending</div>';
        }
       
       if(item.sender.id==session){
              
                if(item.status=='OC' || item.status=='OE' || item.status=='OR'){
                      actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  target="tel:`+item.owner.mobile+`"> <i class="icon-phone"> </i>Call
                        </button>

                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
                else if(item.status=='PM'){
                        actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  target="tel:`+item.owner.mobile+`"> <i class="icon-phone"> </i>Call
                        </button>
                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','CANCEL');"><i class="fa fa-times"></i> Cancel</button>
                        `; 
                }
                else if(item.status=='OA'){
                       actionHtml=`
                        <button type="button" class="btn ordersControl-btn info" shape="circle" location="`+item.owner.location+`" target="$mapActivity"> <i class="icon-location-pin"></i> Track</button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle"  target="tel:`+item.owner.mobile+`"> <i class="icon-phone"> </i>Call
                        </button>`; 
                }else{
                     actionHtml=`
                     <div class="ordersControl-btn" shape="circle" style="opacity:0" hidden>None</div>`; 
                }
              
          }else{
                if(item.status=='OR'){
                      actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','APROVE');"><i class="fa fa-check"></i> Aprove</button>

                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
                else if(item.status=='OC'){
                        actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  target="tel:`+item.sender.mobile+`"> <i class="icon-phone"> </i>Call
                        </button>
                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','CANCELED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
              else if(item.status=='PM'){
                        actionHtml=`
                        <button type="button" class="btn ordersControl-btn danger" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','REJECT');"> <i class="fa fa-times"> </i> Reject
                        </button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','APROVE');"><i class="fa fa-check"></i> Aprove</button>
                        `; 
                }
                else if(item.status=='OA'){
                       actionHtml=`
                        <button type="button" class="btn ordersControl-btn info" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','APROVED-CLOSURE');"> <i class="fa fa-times"></i> Close</button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle"  target="tel:`+item.sender.mobile+`"> <i class="icon-phone"> </i>Call
                        </button>`; 
                }else{
                     actionHtml=`
                     <div class="ordersControl-btn" shape="circle" style="opacity:0" hidden>None</div>`; 
                }
          }
            
       if(item.sender.id==session){
        sendButtonHTML=`
            <button type="button" shape="circle" class="ripple danger post-btn" style="padding-left:10px;padding-right:10px; float:right" onclick="sendMessage(this);" receiver="`+item.owner.id+`" item="`+item.item.id+`" to="`+item.owner.email+`">Send</button>
        `;
         senderOwnerTabHTML=`
           <li class="product-tabs active" name="description" onclick="preparePreviewTabs(this);">
              Description
            </li>
            <li class="product-tabs" name="payment"  onclick="preparePreviewTabs(this);">
              Payment
            </li>
            <li class="product-tabs" name="owner" onclick="preparePreviewTabs(this);">
              Owner
            </li>`;
           
          senderOwnerTabsContentHTML=` 
             <div actas="content">
                 <div actas="data" class="data-list">
                 <div class="data">
                         <div class="inner-data">`+item.owner.pid+`</div>
                       </div> 
                 </div>
                 <div actas="data" class="data-list next" >
                     <div class="data">
                         <div class="inner-data">`+item.owner.name+`</div>
                       </div> 
                 </div> 
                 <div actas="data" class="data-list">
                    <div class="data" target="tel:`+item.owner.mobile+`">
                       <div class="inner-data"> (+234) `+item.owner.mobile+`</div>
                     </div>
                 </div>
                 <div actas="data" class="data-list next">
                     <div class="data" target="mailto:`+item.owner.email+`">
                         <div class="inner-data"> `+item.owner.email+`</div>
                       </div> 
                 </div> 
                 <div actas="data" class="data-list">
                    <div class="data" target="map:`+item.owner.address+`">
                        <div class="inner-data"> `+item.owner.address+`</div>
                     </div>
                 </div> 
                   <div actas="data" class="data-list next">
                       <div class="data">
                         <div class="inner-data" style="min-height:100px">`+item.owner.description+`</div>
                       </div>
                   </div>
             </div>`;
       }else{
          sendButtonHTML=`
            <button type="button" shape="circle" class="ripple danger post-btn" style="padding-left:10px;padding-right:10px; float:right" onclick="sendMessage(this);" receiver="`+item.sender.id+`" item="`+item.sender.id+`" to="`+item.sender.email+`">Send</button>
          `;
           
           
          senderOwnerTabHTML=`
            <li class="product-tabs active" name="description" onclick="preparePreviewTabs(this);">
              Description
            </li>
            <li class="product-tabs" name="owner"  onclick="preparePreviewTabs(this);">
              Sender
            </li>
            <li class="product-tabs" name="payment" onclick="preparePreviewTabs(this);">
              Payment
            </li>`;
           
            
           senderOwnerTabsContentHTML=` 
             <div actas="content">
                 <div actas="data" class="data-list">
                 <div class="data">
                         <div class="inner-data">`+item.sender.pid+`</div>
                       </div> 
                 </div>
                 <div actas="data" class="data-list next" >
                     <div class="data">
                         <div class="inner-data">`+item.sender.name+`</div>
                       </div> 
                 </div> 
                 <div actas="data" class="data-list">
                    <div class="data" target="tel:`+item.sender.mobile+`">
                       <div class="inner-data"> (+234) `+item.sender.mobile+`</div>
                     </div>
                 </div>
                 <div actas="data" class="data-list next">
                     <div class="data" target="mailto:`+item.sender.email+`">
                         <div class="inner-data"> `+item.sender.email+`</div>
                       </div> 
                 </div> 
                 <div actas="data" class="data-list">
                    <div class="data" target="map:`+item.sender.address+`">
                        <div class="inner-data"> `+item.sender.address+`</div>
                     </div>
                 </div> 
                   <div actas="data" class="data-list next">
                       <div class="data">
                         <div class="inner-data" style="min-height:100px">`+item.sender.description+`</div>
                       </div>
                   </div>
             </div>`;
       }
        
       if(item.order_payment_method=='001'){
           item.order_payment_method='Cash on Delivery';
       }else{
          item.order_payment_method='No Payment';  
       }
       
        layer.render(`
         <section actas="preview">
             <div class="banner-section">
             <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner" role="listbox">
                  <div class="item active previewFrame-layer" name="previewFrame-layer" style=" background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+item.item.sample.sample0+`);"  onerror="onImageError(this);"  onclick="showImage('`+item.item.sample.sample0+`');">
                   `+item_condition+` `+orderStatusHTML+`
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
            <div class="col-xs-12" style="padding:0; background:#fff">
              <p class="productname"> `+item.order_contity+` `+item.item.name+`</p>
               <!-- product prices -->
              <hr class="divider">
              <div class="">
                <p class="text-center prod-price">
                  <span class=""><i class="fa fa-naira"></i></span> 
                  <span initialPrice="`+item.item.price+`">`+item.item.price+`</span>
                </p>
              </div>
              <!-- product icons for substraction and additkon -->
              <section class="icons-wrp">
                `+actionHtml+`  
                  <div class="row">
                    <section actas="container" style="margin-bottom:2em;" > 
                        <div actas="header">
                            `+item.order_description+`
                        </div>
                    </section>
                 </div>
                <!-- specification and review -->
                <div class="row">
                  <div actas="header" class="signup-option">
                    <div actas="group-view" class="group-view specs previewTabsTriggers" name="previewTabsTriggers">
                      `+senderOwnerTabHTML+`
                    </div>
                  </div>
                </div> 
                <div class="row previewTab-layers" name="previewTab-layers">
                    <section actas="container" class="description animated slideInLeft" name="prev-descriptionLayer"> 
                        <p>`+item.order_comment+`</p>
                    </section>
                    <section actas="container"  class="description  animated slideInLeft" name="prev-paymentLayer"> 
                        <p>`+item.order_payment_method+`</p>
                    </section>
                     <section actas="container"  class="description  animated slideInLeft" name="prev-ownerLayer">
                       <div actas="panel" class="profile-info-list">
                          `+senderOwnerTabsContentHTML+`
                            </div>
                     </section>
                </div>
                  <div class="row" >
                    <section actas="container" class="location-view"  state="1" target="$mapActivity">
                     <iframe class="map" src="https://www.google.com/maps/embed? pb=!1m10!1m8!1m3!1d15856.471218200293!2d3.6167148!3d6.50676905!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1547966632964" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
                    </section>
                  </div>
                        <div class="row">
                        <div actas="container" class="comment-container">
                             <div actas="header" class="upload-header">
                                 <div actas="wrapper" class="upload-icon-desc">
                                   <h2 style="text-align:center; font-weight:bold">Send Message</h2>
                                </div>
                             </div>
                            <div actas="body" class="comment-body">
                                <input type="text" name="preview-mName" icon="user" placeholder="Name" value="`+user.name+`"> 
                                <input type="text" name="preview-mSubject"  icon="wallet" placeholder="Subject">
                                <textarea name="preview-mBody"  class="description" wrap="hard" placeholder="Type Message"></textarea>
                                 <div class="alert alert-warning warnningAlert " transition="shake" role="alert">
                                    This is a warning alert—check it out!
                                </div>
                                 <div class="alert alert-success successAlert " transition="shake" role="alert">
                                      This is a warning alert—check it out!
                                </div>
                                `+sendButtonHTML+`
                            </div>
                         </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </section> 
        `);
      //  storage.setItem('orderPreview_'+item.id,JSON.stringify(item));
    }
}
function orderPreviewActivity(orderid,itemid){
    var layer=app.find('$orderPreview-layer'),
        url=hostname+'/server/ui/app.orderPreview-activity.php?id='+session+'&orderid='+orderid+'&itemid='+itemid;
    
     layer.setAttribute('text-align','center');
    
     try{
        layer.render(loader);
        app.render('$orderPreviewActivity');
        var httpReq=new ayralHttpRequest('GET',url,'default',true);        
        httpReq.execute(function(response){
            if(response!='progress'){
                try{
                     var result=response.target.responseText;
                    if(result.match(/not_found/)){
                        layer.render(`
                            <div class="RetryActivity-trigger"
                                <img src="assets/images/error.png" class="activityViewError"/> 
                                <p>Not Found </p>
                            </div>
                        `);
                    }else{
                       result=result.toString().replace(/,(?=[^,]*$)/, '');
                       var item=JSON.parse(result);
                       new siyayyaOrderPrview().displayOrder(item,true,1);
                    }
                 }
                 catch(error){
                   print(error);
                   layer.render(`
                       <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="orderPreviewActivity('`+orderid+`','`+itemid+`');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                            <p>Connection Failed<br/><b>Try Again</b></p>
                        </button>
                  `);
                }
            }
        });
         
  }catch(error){
      print(error);
       layer.render(`
        <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="orderPreviewActivity('`+orderid+`','`+itemid+`');">
           <img src="assets/images/error.png" class="activityViewError"/> 
            <p>Connection Failed<br/><b>Try Again</b></p>
         <button>
      `);
  }
}

