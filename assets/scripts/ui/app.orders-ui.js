function getLayer(){
   var  layer=app.find('$orderPanel');
 return (layer);
}
function sayayyaOrders(){
    this.createOrder=function(items,type){
        var layer=getLayer();
        layer.setAttribute('text-align','center');
        layer.clear();
 
        var actionHtml='';
        for(item in items){
          item=items[item];
            
          if(item.sender.id==session){
              
                if(item.status=='OC' || item.status=='OE' || item.status=='OR'){
                      actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>

                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
                else if(item.status=='PM'){
                        actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','CALL');"> <i class="icon-phone"> </i>Call</button>

                        <button type="button" orderid="`+item.id+`"  class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','CANCEL');"><i class="fa fa-times"></i> Cancel</button>
                        `; 
                }
                else if(item.status=='OA'){
                       actionHtml=`
                        <button type="button" class="btn ordersControl-btn info" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.address+`','MAP');"> <i class="icon-location-pin"></i> Track</button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>`; 
                }
                else if(item.status=='AC'){
                       actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>

                        <button type="button"  class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.owner.mobile+`','FINAL-CLOSURE');"> <i class="fa fa-times"></i> Remove</button>
                        `; 
                }else{
                     actionHtml=`
                     <div class="ordersControl-btn" shape="circle" style="opacity:0" hidden>None</div>`; 
                }
              
          }else{
                if(item.status=='OR'){
                      actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','APROVE');"><i class="fa fa-check"></i> Aprove</button>

                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
                else if(item.status=='OC'){
                        actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>
                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','CANCELED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                        `; 
                }
              else if(item.status=='PM'){
                        actionHtml=`
                        <button type="button"  class="btn ordersControl-btn danger" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','REJECT');"> <i class="fa fa-times"> </i> Reject
                        </button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','APROVE');"><i class="fa fa-check"></i> Aprove</button>
                        `; 
                }
                else if(item.status=='OA'){
                       actionHtml=`
                        <button type="button"  class="btn ordersControl-btn info" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','APROVED-CLOSURE');"> <i class="fa fa-times"></i> Close</button>

                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>`; 
                }
               else if(item.status=='AC'){
                       actionHtml=`
                        <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>

                        <button type="button"  class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+item.id+`','`+item.sender.mobile+`','FINAL-CLOSURE');"> <i class="fa fa-times"></i> Remove</button>
                        `; 
                }else{
                     actionHtml=`
                     <div class="ordersControl-btn" shape="circle" style="opacity:0">None</div>`; 
                }
          }
            
        if(item.sender.dp.startsWith('/')){
         item.sender.dp=hostname+'/'+item.sender.dp;
        }
            
        if(item.status=='OC'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+' warning">Canceled</div>';
        }
        else if(item.status=='OE'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  warning">Explored</div>';
        }
        else if(item.status=='OA'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  success">Aproved</div>';
        }
        else if(item.status=='OR'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  info">Rejected</div>';
        } 
        else if(item.status=='PM'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  info">Pending</div>';
        }
        else if(item.status=='AC'){
            orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  success">Completed</div>';
        }else{
           orderStatusHTML='<div class="orderStatus-wrp status_'+item.id+'  info">Pending</div>';
        }

        layer.append(`
         <div actas="widget" class="card orderWidget order_`+item.id+`">
            <header actas="list-view">
              <div actas="list-item" class="profileDetails-wrp" target="otherProfile(`+item.sender.id+`);">
                  <div actas="wrapper" target="otherProfile(`+item.sender.id+`);">
                      <img src="`+item.sender.dp+`" shape="circle" width="35" height="35">
                  </div>
                  <div actas="wrapper">
                      <h3><b>`+item.sender.name+`</b></h3>
                      <small>SO`+item.pid+`,&nbsp; &nbsp; `+item.date+`</small>
                  </div>
              </div>
              </header>
            <div actas="body" class="widget-body">
                <div actas="img" class="img" onclick="orderPreviewActivity('`+item.id+`','`+item.item.name+`');" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+item.item.sample+`);">
                  <div class="orderContity success">`+item.order_contity+`</div>
                  `+orderStatusHTML+`
                </div>
               <div class="orderInfor-wrp">
                 `+item.order_description+`
              </div>
            </div>
            <footer actas="footer" class="ordersFooter-wrp">
                <div class="orderDue-wrp" position="left">
                   <span>₦ `+(item.item.price)+`</span>
                 </div>
                 <div class="orderControls controller_`+item.id+`">
                   `+actionHtml+`
                  </div>
            </footer>
          </div>
        `);
      }    
     storage.setItem(type+'_order_'+session,JSON.stringify(items));
   }; 
}

function getNewOrders(){
    var layer=getLayer(),
        url=hostname+'/server/ui/app.orders-ui.php?request=1&id='+session;

    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
               var result=response.target.responseText;
               if(result.match(/not_found/)){
                     layer.render(`
                       <div class="RetryActivity-trigger">
                         <img src="assets/images/error.png" class="activityViewError"/> 
                         <p>No Orders Found</p>
                       </div>
                   `);
               } 
               else{
                   result=result.toString().replace(/,(?=[^,]*$)/, '');
                   var items=JSON.parse('['+result+']');
                   new sayayyaOrders().createOrder(items,flag);
               }
         } 
         catch(error){
              layer.render(`
                   <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="ordersActivity(1,1);">
                       <img src="assets/images/error.png" class="activityViewError"/> 
                       <p>Connection Failed<br/><b>Try Again</b></p>
                   </button>
             `);
           }
       }
    });
}
function ordersActivity(flag,open){
     var layer=getLayer(),
         url=hostname+'/server/ui/app.orders-ui.php?request=1&id='+session+'&type='+flag;
         layer.setAttribute('text-align','center');
         layer.render(loader);
    
      if(open=='1' || open==1){
         app.render('$ordersActivity'); 
      }
      getNewOrders();
}
ordersActivity();