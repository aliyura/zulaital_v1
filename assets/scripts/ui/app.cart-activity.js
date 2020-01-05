var mainTotalPayable=0,overalAmount=0;


function refreshCartCounter(val,op){
  if(document.querySelectorAll('.cart-items .widget')){
    var count=window.document.querySelectorAll('.cart-items .widget').length,
        counter=Prepare('$cartNotification-counter'); 

       if(val>0 && val!='' && val!=null && typeof val != typeof undefined){
           if(op=='-'){
             count=Number(count)-1;
           }
           if(op=='+'){
             count=Number(count)+1; 
           }
       }
       count=app.toMoney(count);
       counter.setText(count);
       counter.show();
       Prepare('$cartItems-counter').setText(count);
   } 
}

var itemToRemove,trigger;
function deleteCartItem(e,item){
    $('#confirmModalAlert').toggle();
    itemToRemove=item;
    trigger=Prepare(e);
}
function removeItemFromCart(){
     trigger.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
     blockProgress();
    $('#confirmModalAlert').toggle();
    
    var httpReq=new ayralHttpRequest('GET',hostname+'/server/app.cart-module.php?request=REMOVE&id='+session+'&cid='+itemToRemove,'default',true);   
     httpReq.execute(function(response){
       if(response!='progress'){
          var result=response.target.responseText;
          revokeProgress();
          if(result.toString().match(/success/)){
              Prepare('$item_'+itemToRemove).hide();
              refreshCartCounter(1,'-');  
              prepareCartActivity();
          }else{
            trigger.setHtml('<img src="assets/images/loader.gif" class="btn-loader">');
            alert('Unable to remove this item from your cart');
          }
       }
     });
}
function orderActivity(){
   var payable= Prepare('$total_PayableAmount').getText(),
       location=Prepare('$shippingArea-desc').getText();
    
    Prepare('$o-prepared-Amount').setHtml(' <i class="fa fa-naira"></i>'+payable);
    Prepare('$orderDeliveryCity').setText(location);
    app.render('$orderActivity');
}
function cartContityManager(e,id){
    var operator=Prepare(e).getText(),
        contity=Number(Prepare('$contity_'+id).getValue()),
        initialPrice=Prepare('$price_'+id).getText(),
        totalDue=Prepare('$total_'+id),
        totalPayableAmount=totalDue.getText();
        initialPrice=app.toNumber(initialPrice);
        contity=app.toNumber(contity);
    
    if(operator=='+'){
        contity=contity+1;
    }else{
        if(contity>1){
          contity=contity-1;
        }
   }  
//Individual Payable Amount for each item
totalPayableAmount=(initialPrice*(contity));
totalPayableAmount=app.toMoney(totalPayableAmount);
totalDue.setText(totalPayableAmount); 

//Main Payable Amount
var cartItems=window.document.querySelectorAll('.cart-items .widget'),
    tmpPayable=0,payable=0;
for(i=0; i<cartItems.length; i++){
   item=cartItems[i];
   tmpPayable=item.querySelector('.totalPayable').textContent;
   tmpPayable=app.toNumber(tmpPayable);
   payable+=tmpPayable;
    
}
var shippingFee=Prepare('$shippingFee').getAttribute('fee');
if(shippingFee!='' && shippingFee!=0 && shippingFee!='null'){
    shippingFee=app.toNumber(shippingFee);
    payable=(payable+shippingFee);
}
payable=app.toMoney(payable);
Prepare('$contity_'+id).setValue(contity);
Prepare('$total_PayableAmount').setText(payable);
Prepare('$o-prepared-Amount').setHtml('<i class="fa fa-naira"></i>'+payable);
Prepare('$total_PayableAmount').setAttribute('payable',payable);
  
 var httpReq=new ayralHttpRequest('GET',hostname+'/server/app.cart-module.php?request=CONTITY&id='+session+'&contity='+contity+'&cid='+id,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
          var result=response.target.responseText;
          //print(result);  
       }
    });
}


function sayayyaCarts(){
    this.createCart=function(items){
        var layer=app.find('$cartPanel'),
            itemCounter=0,colors='',sizes='',selected=0,
            shippingArea='Shipping Area',shippingFee=0;
            layer.clear();
    
        for(item in items){
          itemCounter=item;
          item=items[item];
        
         if(item.selected_size!='Any' && item.selected_size!='')
            selected++;
         if(item.selected_color!='Any' && item.selected_color!='')
            selected++;
            
         if(selected==1){
             selected='100%';
         }else{
             selected='47%;';
         }
         
         if(item.shipping_fee!='null' && item.shipping_fee!='' && item.shipping_fee!=null){
            shippingFee=app.toNumber(item.shipping_fee);
            shippingArea=item.shipping_area;
         }else{
            shippingFee=0; 
            shippingArea='Shipping Area';
         }
  
          
         if(item.selected_size!='Any' && item.selected_size!=''){
            sizes=`
            <div class="total selectedSizeColor-wrp" style="width:`+selected+`">
                <strong>Size</strong>
                <p style="background-color:#ccc; padding:3px; font-size:5px">`+item.selected_size+`</p>
            </div>
            `;
         }      
         if(item.selected_color!='Any' && item.selected_color!=''){
            colors=`
            <div class="total selectedSizeColor-wrp" style="width:`+selected+`">
                <strong>Color</strong>
                <p style="background-color:`+item.selected_color+`; padding:3px; font-size:5px">`+item.selected_color+`</p>
            </div>
            `;
         }
            
       
          layer.append(`
             <div  actas="widget" class="layout-inline row widget" name="item_`+item.id+`">
              <div class="col col-pro layout-inline">
                <img src="`+item.sample+`" onerror="onImageError(this);" style="border:1px solid #fdfdfd" class="cart-item-img" alt="`+item.name+`" />
                <p>`+item.name+`</p>
              </div>
              <div class="col col-price col-numeric align-left ">
                <p name="price_`+item.id+`">`+item.price+`</p>
                  <div class="total" style="display:block;">
                    <strong>Total</strong>
                    <p style="font-size:8px;">
                    <span><i class="fa fa-naira"></i><b class="totalPayable" name="total_`+item.id+`">`+item.total+`</b></span>
                    </p>
                  </div>
                    `+sizes+` `+colors+`
              </div>
              <div class="col col-qty layout-inline">
                <span class="fa fa-trash deleteCart-item danger" onclick="deleteCartItem(this,'`+item.id+`');" ></span>
                <button type="button" class="qty qty-minus" onclick="cartContityManager(this,'`+item.id+`');">-</button>
                <input type="numeric" name="contity_`+item.id+`" value="`+item.contity+`" />
                <button type="button" class="qty qty-plus" onclick="cartContityManager(this,'`+item.id+`');">+</button>
              </div>
             
            </div>
          `);
            
          mainTotalPayable+=Number(item.total.toString().replace(/,/g,''));        
          if(itemCounter==items.length-1){
    
            var absoulutePayable=mainTotalPayable;
            mainTotalPayable=(mainTotalPayable+shippingFee);
            mainTotalPayable=app.toMoney(mainTotalPayable);
            shippingFee=app.toMoney(shippingFee);
              
             layer.append(`
               <div class="tf">
                 <div class="row layout-inline">
                    <div class="col">
                     <p>0.00</p>
                   </div>
                   <div class="col">
                     <p>VAT</p>
                   </div>
                   <div class="col"></div>
                 </div>
                 <div class="row layout-inline">
                   <div class="col">
                     <p name="shippingFee" fee="`+shippingFee+`">`+shippingFee+`</p>
                   </div>
                   <div class="col">
                     <p>Shipping</p>
                   </div>
                   <div class="col"></div>
                 </div>
                  <div class="row layout-inline">
                   <div class="col">
                     <p style="font-weight:bold; font-size:20px;">
                        <i class="fa fa-naira"></i>
                        <b name="total_PayableAmount" payable="`+absoulutePayable+`">`+mainTotalPayable+`</b>
                    </p>
                   </div>
                   <div class="col">
                     <p>Total</p>
                   </div>
                   <div class="col"></div>
                 </div> 
                <div class="row layout-inline">
                   <div class="col">
                       <p name="shippingArea-desc">`+shippingArea+`</p>
                       <select class="deliveryLocations cartDeliveryLocations" name="deliveryLocations"  onchange="deliveryLocationSelected(this);" style="font-size:12px;"></select>
                   </div>
                   <div class="col"></div>
                 </div>
                     <button type="button" class="toCheckout-btn success" onclick="orderActivity(this);" style="float:right; outline:none; margin-top: 1em;"> Proceed to Checkout &nbsp; <i class="icon-arrow-right" style="font-size:14px"></i></button>
               </div> 
                `);
          }
            
        }
   }; 
}
function prepareCartActivity(target){
    var layer=app.find('$cartPanel'),
        url=hostname+'/server/ui/app.cart-activity.php?request=1&id='+session;
        mainTotalPayable=0;

    if(target=='1' || target==1){
        app.render('$cartActivity');
        layer.render(loader);
        
    }
    var  httpReq=new ayralHttpRequest('GET',url,'default',true);   
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
               var result=response.target.responseText;
               if(result.match(/not_found/)){
                     layer.render(`
                       <div class="RetryActivity-trigger">
                         <img src="assets/images/error.png" class="activityViewError"/> 
                         <p>No Items Available in Your Cart</p>
                       </div>
                   `);
               } 
               else{
                   result=result.toString().replace(/,(?=[^,]*$)/, '');
                   var items=JSON.parse('['+result+']');
                   new sayayyaCarts().createCart(items);
                   prepareDeliveryFee();
                    setTimeout(function(){
                     refreshCartCounter();
                   },500);
               }
         } 
         catch(error){
             print(error);
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
function prepareDeliveryFee(){
    var  url=hostname+'/server/app.delivery-module.php?request=DELIVERY-FEE&id='+session,
         httpReq=new ayralHttpRequest('GET',url,'default',true),
         layer=app.find('.deliveryLocations'),
         jsLayer=document.querySelectorAll('.deliveryLocations');
    
    
    httpReq.execute(function(response){
       if(response!='progress'){
         try{
               var result=response.target.responseText,
                   result=result.toString().replace(/,(?=[^,]*$)/, ''),
                   items=JSON.parse('['+result+']');
             
             layer.setHtml('<option value="null" selected>Delivery City</option>');
             for(i in items){
                 item=items[i];
                 jsLayer[0].innerHTML+=`<option value="`+item.fee+`|`+item.code+`">`+item.desc+`</option>`;
                 jsLayer[1].innerHTML+=`<option value="`+item.fee+`|`+item.code+`">`+item.desc+`</option>`;
             }
         } 
         catch(error){
             print(error);
           }
       }
    });
}

function deliveryLocationSelected(e){
    var shippingLocaction=Prepare(e).getValue(),
        totalPayable=Prepare('$total_PayableAmount').getAttribute('payable'),
        tempPayable=app.toNumber(totalPayable),
        shippingFee=shippingLocaction.substr(0,shippingLocaction.indexOf('|')),
        shippingCode=shippingLocaction.substr(shippingLocaction.indexOf('|')+1,shippingLocaction.length);
        shippingFee=app.toNumber(shippingFee);
        Prepare('$shippingArea-desc').setText(shippingCode);
        Prepare('$orderDeliveryCity').setText(shippingCode);
    
    var overalAmount=(tempPayable+shippingFee);
    overalAmount=app.toMoney(overalAmount);
    Prepare('$total_PayableAmount').setText(overalAmount); 
    Prepare('$o-prepared-Amount').setHtml('<i class="fa fa-naira"></i>'+overalAmount);
    Prepare('$shippingFee').setText(app.toMoney(shippingFee));
    Prepare('$shippingFee').setAttribute('fee',shippingFee);
   
    
     var httpReq=new ayralHttpRequest('GET',hostname+'/server/app.delivery-module.php?request=SHIPPING&id='+session+'&area='+shippingCode+'&fee='+shippingFee,'default',true);   
     httpReq.execute(function(response){
       if(response!='progress'){
          var result=response.target.responseText;
         // print(result);  
       }
     });
     
}
prepareCartActivity();