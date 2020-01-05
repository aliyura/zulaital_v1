function viewOrder(e){
 document.querySelector('[name="dispatchPanel-trigger"]').click();
 app.render('$ordersActivity');
}

function preparePayment(){
    var payable= Prepare('$total_PayableAmount').getText();
    Prepare('.addPayment-total').setHtml('<i class="fa fa-naira"></i>'+payable);                            
}
function payOnline(e){
    preparePayment();
    app.render('$payOnlineActivity');
}
function payAtBank(e){
    preparePayment();
    app.render('$payAtBankActivity');
}
function transferPayment(e){
    preparePayment();
    app.render('$transferPaymentActivity');
}
function ModfyOrderWidget(trigger,selector,param,action,clear){

    if(action=='CALL'){
        ayralWindow.location.href='tel:'+param;
    }
    else if(action=='MAP'){
        app.render('$mapActivity');
    }else{    
         if(clear==1){
              var ordersWrapper=document.querySelectorAll('.ordersPanel-wrp'),
                  currentOrderWrapper=document.querySelectorAll(selector);

               foreach(currentOrderWrapper,function(element){
                   Prepare(element).remove();
               });
               foreach(ordersWrapper,function(element){
                   if(element.firstElementChild){
                     if(!element.firstElementChild.className.match(/orderWidget/)){
                         Prepare(element).render(`
                           <div class="RetryActivity-trigger">
                             <img src="assets/images/error.png" class="activityViewError"/> 
                             <p>No Orders Found</p>
                           </div>
                        `);
                     }
                   }else{
                     Prepare(element).render(`
                       <div class="RetryActivity-trigger">
                         <img src="assets/images/error.png" class="activityViewError"/> 
                         <p>No Orders Found</p>
                       </div>
                    `);
                   }
               });
         }else{
               var statusElement= $('.status_'+selector),
                   controllerElement= $('.controller_'+selector);

               if(action.match(/APROVE/)){
                    statusElement.replaceWith('<div class="orderStatus-wrp status_'+selector+'  success">Aproved</div>');
                    if(selector==session){
                         controllerElement.replaceWith(`
                         <button type="button" class="btn ordersControl-btn info" shape="circle" onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','MAP');"> <i class="icon-location-pin"></i> Track</button>

                         <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','CALL');"> <i class="icon-phone"> </i>Call</button>
                        `);
                    }else{
                          controllerElement.replaceWith(`
                          <button type="button"  class="btn ordersControl-btn info" shape="circle" onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','APROVED-CLOSURE');"> <i class="fa fa-times"></i> Close</button>

                          <button type="button" class="btn ordersControl-btn success" shape="circle"  onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','CALL');"> <i class="icon-phone"> </i>Call
                          </button>
                        `);
                    }
               }
               else if(action.match(/CANCEL/)){
                   statusElement.replaceWith('<div class="orderStatus-wrp status_'+selector+' warning">Canceled</div>');
                   controllerElement.replaceWith(`
                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>

                        <button type="button" class="btn ordersControl-btn danger" shape="circle" onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                    `);
               }  
               else if(action.match(/REJECT/)){
                   statusElement.replaceWith('<div class="orderStatus-wrp status_'+selector+'  info">Rejected</div>');
                   controllerElement.replaceWith(`
                        <button type="button" class="btn ordersControl-btn success" shape="circle" onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','CALL');"> <i class="icon-phone"> </i>Call
                        </button>

                       <button type="button" class="btn ordersControl-btn danger" shape="circle"  onclick="ManageOrderStatus(this,'`+selector+`','`+param+`','REJECTED-CLOSURE');"><i class="fa fa-times"></i> Close</button>
                    `);
               }else{
                   print(action+' not configured');
               }
         }
    }
}
function ManageOrderStatus(e,orderid,param,action){
   var controller=Prepare(e),
       controllerBody=controller.getHtml(),
       url=hostname+'/server/app.order-module.php?request=CONTROL&orderid='+orderid+'&id='+session+'&action='+action,
       httpReq=new ayralHttpRequest('POST',url,'default',true);

       if(action.match(/CLOSURE/)){
         ModfyOrderWidget(e,'.order_'+orderid,param,action,1);
       }else{
         ModfyOrderWidget(e,orderid,param,action,0);
       }
    
       httpReq.execute(function(response){
       if(response!='progress'){
            try{
               var result=response.target.responseText;
               if(result.match(/success/)){
                   print(result);
               }
               else{
                   print(result);
                   controller.setHtml('Try Again');
                   warningAlert('Unable to modify this order, please try again');
               }
            revokeProgress();
           }catch(error){
               print(error);
               revokeProgress();
               controller.setHtml('Try Again');
               errorAlert('Connection failed !'); 
           }
       }
   });
}
(function(){

    app.find('.placeOrder-trigger').on('click',function(){
        var paymentMethod=Prepare(this).getAttribute('method'), 
            itemid=Prepare(this).getAttribute('itemid'),
            contity=Prepare(this).getAttribute('contity'),
            inName=Prepare('$o-prepared-name'),
            inAddress=Prepare('$o-prepared-address1'),
            termsChecked=$('[name="o-terms"]').is(':checked'),
            name=inName.getValue(),
            address=inAddress.getValue();
            controller=Prepare(this);
        
            if(name=='' || count(name)<3){
                inName.setError();
             }else{
                inName.removeError(); 
             }
            if(address=='' || count(address)<3){
                inAddress.setError();
             }else{
                inAddress.removeError(); 
             }

             if(name!=='' && count(name)>3 && address!=='' && count(address)>3){
                if(termsChecked==true){
                   app.render('$paymentActivity');
                   controller.setHtml('Continue');
                }else{
                    warn('Accept our terms & condition to proceed!');
                    controller.setHtml('Try Again');
                }
            }
        });
})();

  