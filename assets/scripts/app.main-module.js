function  RetryActivity(e,code){
    var uri=Prepare(e).getAttribute('url');
    if(code=='01'){
          var layer=app.find('$marketView');
          layer.setAttribute('text-align','center');
    }
    if(code=='02'){
          var layer=app.find('$itemPreview-layer');
         layer.setAttribute('text-align','center');
    }
    if(code=='03'){
          var layer=app.find('$businessesView');
         layer.setAttribute('text-align','center');
    } 
    try{
        layer.render(loader);
         var httpReq=new ayralHttpRequest('GET',uri,'default',true);
         httpReq.execute(function(response){
            if(response!='progress'){
                 try{
                    var result=response.target.responseText;
                    if(upper(result).match(/NOT_FOUND/)){
                        layer.render(`
                            <button type="button" class="RetryActivity-trigger"  url="`+uri+`">
                                <img src="assets/images/error.png" class="activityViewError"/> 
                                <p>Not Available</p>
                            </button>
                            `);
                    }else{
                      result=result.toString().replace(/,(?=[^,]*$)/, '');
                      var items=JSON.parse(`[`+result+`]`);
                      new sayayyaMarket().createItems(items,true,1);
                    }
                }catch(error){
                   layer.render(`
                        <button type="button" class="RetryActivity-trigger"  url="`+uri+`" onclick="RetryActivity(this,'`+code+`');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                             <p>Connection Failed<br/><b>Try Again</b></p>
                        </button>
                  `);
                }
            }
        });
  }catch(error){
       layer.render(`
          <button type="button" class="RetryActivity-trigger"   url="`+uri+`"  onclick="RetryActivity(this,'`+code+`');">
              <img src="assets/images/error.png" class="activityViewError"/> 
               <p>Connection Failed<br/><b>Try Again</b></p>
          </button>
      `);
  }
}
function redirectBack(e){
    var url=ayralWindow.location.href;
    if(url.match(/#categoryActivity/)){
      app.render('#myDrawer');
    }else{
       var url='categoryActivity';
        if(ayralHistoryURL.length>3){
           url=ayralHistoryURL[ayralHistoryURL.length-3]
        }else{
           url='categoryActivity'; 
        }
        app.render('$'+url);
        ayralHistoryURL.pop();
    }
}
function showImage(image){
    if(typeof image == typeof 'string'){
     imageAlert(image);
    }else{
      imageAlert(image.src,'100%');
    }
}

function getDocHeight(activity){
    var D = document.querySelector('[name="'+activity+'"]');
    return Math.max(
        D.scrollHeight, D.scrollHeight,
        D.offsetHeight, D.offsetHeight,
        D.clientHeight, D.clientHeight
    );
}
function luncherRelease(e){
  $('.launcher').hide();
  storage.setItem('launch','true');
}
(function(){
 
    var pos=0;
    $('input,textarea').bind('focusin',function(){
        $('#action-bar-bottom').addClass('slideOutDown').css('position','-55px');
        pos= $('#ayralApp').scrollTop();
    });
    $('input,textarea').on('click',function(){
        $('#action-bar-bottom').addClass('slideOutDown').css('bottom','-55px');
        pos= $('#ayralApp').scrollTop();
    });
    $('input,textarea').bind('blur',function(){
         $('#action-bar-bottom').removeClass('slideOutDown').css('bottom','0');
    });
    $('#ayralApp').scroll(function(){
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > pos || iCurScrollPos < pos) {
        $('#action-bar-bottom').removeClass('slideOutDown').css('bottom','0');
        }
    });
    
    var iScrollPos = 0;
    app.find('$drawerTrigger').on('click',function(){
        ayralConfig.prepareNavigation(this,'#myDrawer');
    });
    app.find('$launcher1Trigger').on('click',function(){
        var launcher2View=Prepare('$launcher2View');
        launcher2View.addClass('fadeInRight');
        launcher2View.show();
    }); 
    
    app.find('$launcher2Trigger').on('click',function(){
        var launcher3View=Prepare('$launcher3View');
        launcher3View.addClass('fadeInRight');
        launcher3View.show();
    }); 

})();