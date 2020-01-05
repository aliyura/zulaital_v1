/*!
 * AYRAL Framework, A JavaScript Library v1.0
 * Completely free for business and individuals 
 * http://ayral.net/
 *
 * Copyright AYRAL Tecnologies Ltd and other contributors
 * Released under PPT license
 *
 * Date: 2018-12-01T17:24Z
 */
var passwordRegex=/^.*(?=.{4,10})(?=.*\d)(?=.*[a-zA-Z]).*$/,
    urlRegex=/^((([0-9]{1,3}\.){3}[0-9]{1,3})|(([a-zA-Z0-9]+(([\-]?[a-zA-Z0-9]+)*\.)+)*[a-zA-Z]{2,}))$/,
    emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,numberRegex=/^[-+]?\d*\.?\d*$/,
    preBgColor='',preBorderColor='',readyHandlerInstalled = false,
ayralDialog={
    alertDialog:'<div id="ayral-dialogOverlay"></div><div id="ayral-dialogBox"><div class="wrapper"><div id="ayral-dialogHeader"></div><div id="ayral-dialogBody"></div><div id="ayral-dialogFooter"></div></div></div>',
    toastDialog:'<div id="ayral-toastOverlay"><div id="ayral-toastBody"></div></div>'
},
ayralFileChooser,
ayralWindow=window,
ayralDocument=ayralWindow.document,
storage=ayralWindow.localStorage,
ayralNavigator=ayralWindow.navigator,
ayralButton=document.querySelectorAll('button'),
ayralInput=document.querySelectorAll('input'),
ayralSelect=document.querySelectorAll('select'),
ayralTextarea=document.querySelectorAll('textarea'),
ayralSkin=document.querySelector('[actas="ayral-app"]'),
ayralImport=document.querySelectorAll('import'),
ayralActivity=document.querySelectorAll('[actas="activity"]'),
ayralIcon=ayralDocument.querySelectorAll('[icon]'),
ayralTransition=ayralDocument.querySelectorAll('[transition]'),
ayralCheckbox=document.querySelectorAll('checkbox'),
ayralRadio=document.querySelectorAll('radio'),
ayraltoggle=document.querySelectorAll('toggle'),
ayralElements=document.querySelectorAll('*'),
ayralUnknown=["HEAD", "META", "HTML",'SCRIPT','LINK'],
ayralHistoryURL=['categoryActivity'],
appTempraryHistory=[
    "sign.html", 
    "orderActivity",
    "publishedActivity",
    "orderedActivity"
],
appTempraryExplorer=[, 
  "categoryActivity",
  "index"
];

if(!ayralDocument.querySelector('[name="viewport"]')){
    var meta=document.createElement('meta');
    meta.name='viewport';
    meta.content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no';
    ayralDocument.querySelector('head').appendChild(meta);
}
function XMLRequest(){
   var ayralRequest; 
   try{
      ayralRequest = new XMLHttpRequest();
   }catch (e){
      try{
         ayralRequest = new ActiveXObject("Msxml2.XMLHTTP");
      }catch (e) {
         try{
           ayralRequest = new ActiveXObject("Microsoft.XMLHTTP");
         }catch (e){
            alert("Your browser broke!");
            return false;
         }
      }
   }
   return ayralRequest;
};
function ayralHttpRequest(method,url,formdata,asyncron){
    
  if(method!==null && typeof method !== typeof undefined  && url!==null && typeof url !== typeof undefined ){
            var ayralServerRequest;  // The variable that makes Ajax possible!
               try{
                  // Opera 8.0+, Firefox, Safari
                  ayralServerRequest = new XMLHttpRequest();
               }catch (e){

                  // Internet Explorer Browsers
                  try{
                     ayralServerRequest = new ActiveXObject("Msxml2.XMLHTTP");
                  }catch (e) {

                     try{
                        ayralServerRequest = new ActiveXObject("Microsoft.XMLHTTP");
                     }catch (e){
                        // Something went wrong
                        alert("Your browser broke!");
                        return false;
                     }
                  }
            }
        try{
            ayralServerRequest.open(method,url, asyncron);  
        }catch(error){
            alert(error);
        } 
            this.execute=function(callback){
                try{
                    ayralServerRequest.addEventListener('error',function(e){
                      callback('Error:'+e);
                    }); 
                    ayralServerRequest.upload.addEventListener('progress',function(e){
                      callback('progress');
                    });
                    ayralServerRequest.addEventListener('load', function(e){
                       callback(e);
                    }); 
                    if(formdata==null || formdata=='null'){
                        ayralServerRequest.send(formdata);
                    }else if(formdata== typeof undefined || formdata==''){
                        ayralServerRequest.send(null);
                    }else if(formdata.toString().toUpperCase()=='DEFAULT' || formdata==true){
                           try{
                             ayralServerRequest.send(new FormData($('form')[0]));
                           }catch(error){
                               callback('failed'+error);
                           }
                    }else{
                     ayralServerRequest.send(new FormData(formdata));   
                    }
                }catch(error){
                  callback('failed'+error);
                }
            };
    }else{
      return XMLRequest();
    }
};
function Ayral(){  
    this.prepare=function(callback){ 
       callback(callback);
    };
    this.parse=function(str){
        try {
            var dump= JSON.parse(str);
            if (dump && typeof dump === "object") {
                return dump;
            }
        }
        catch (e) { }
     return false;
    };
    this.write=function(data){ 
      ayralDocument.write(data);
    }; 
    this.append=function(data){ 
      ayralDocument.innerHTML+=data;
    };
    this.alert=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-alert','ayral-alertDialogOk');
    };
    this.confirm=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-confirm','ayral-confirmDialogYes');
    };
    this.prompt=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-prompt','ayral-promptDialogOk');
    };
    this.input=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-prompt','ayral-promptDialogOk');
    };
    this.err=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-errorAlert','ayral-alertDialogOk');
    };
    this.warn=function(message,title,callback){ 
      dialogRenderingInit(message,title,callback,'-warningAlert','ayral-alertDialogOk');
    }; 
    this.on=function(eventType,callback){
        if(eventType=='swipe'){
          this.onSwipe(callback);   
        }else if(eventType=='swipeLeft'){
          this.onSwipeLeft(callback);  
        }else if(eventType=='swipeRight'){
          this.onSwipeRight(callback);  
        }else if(eventType=='connection'){
            this.onConnection(callback); 
        }else if(eventType=='init'){
            this.onConnection(callback); 
        }else if(eventType=='scroll'){
           return  ayralConfig.prepareEvent(window,'scroll',callback);  
        }else if(eventType=='orientation'){
          this.detectOrientation(callback);
        }else if(eventType=='resize'){
           return ayralConfig.prepareEvent(window,'resize',callback); 
        }else if(eventType=='ready'){
            return  ayralConfig.prepareEvent(window,'unload',callback); 
        }else{
           return  ayralConfig.prepareEvent(window,eventType,callback);
        }
    }
    this.onScroll=function(callBack){
      return  ayralConfig.prepareEvent(window,'scroll',callback); 
    }
    this.onResize=function(callback){
      return  ayralConfig.prepareEvent(window,'resize',callback); 
    }  
    this.onReady=function(callback){
      return  ayralConfig.prepareEvent(window,'unload',callback); 
    }
    this.detectOrientation=function(callback){
      window.addEventListener("resize", function(){
          setTimeout(function(){
              if(window.outerWidth>window.outerHeight){
                callback(
                  {
                      code:90,
                      status:'landscape'
                  }
                );
              }else{
                callback(
                  {
                      code:0,
                      status:'portrait'
                  }
                );  
              }
        },100);
      }, true);  
    };
    this.onSwipe=function(callback){
         if(ayral.element!==null){
            var xDown = null;                                                        
            var yDown = null; 
           
           window.addEventListener('touchstart', function(event){
                xDown = event.touches[0].clientX;                                      
                yDown = event.touches[0].clientY;     
            });    
            
           window.addEventListener('touchmove', function(event){
                    if( ! xDown || ! yDown ) {
                        return;
                    }
                    var xUp = event.touches[0].clientX;                                    
                    var yUp = event.touches[0].clientY;

                    var xDiff = xDown - xUp;
                    var yDiff = yDown - yUp;

                    if(Math.abs( xDiff ) > Math.abs( yDiff )) {
                          if (xDiff > 0 ) {
                             callback({status:"right",code:1});
                          } else {
                            callback({status:"left",code:0});
                          }    
                    }
                    xDown = null;
                    yDown = null;  
            }, true); 
         }else{
             ayral.printError('Ayral: Target element not found');
         }
    }    
    this.onSwipeLeft=function(element,callback){
         if(ayral.element!==null){
            var xDown = null;                                                        
            var yDown = null; 
           
            if(typeof element !== undefined && typeof element !== 'function' && element !==null){
              element.addEventListener('touchstart', function(event){
                    xDown = event.touches[0].clientX;                                      
                    yDown = event.touches[0].clientY;     
               });    

               element.addEventListener('touchmove', function(event){
                        if( ! xDown || ! yDown ) {
                            return;
                        }
                        var xUp = event.touches[0].clientX;                                    
                        var yUp = event.touches[0].clientY;

                        var xDiff = xDown - xUp;
                        var yDiff = yDown - yUp;

                        if(Math.abs( xDiff ) > Math.abs( yDiff )) {
                              if (xDiff > 5 ) {
                                callback(false);
                              } else {
                                callback(true);
                              }    
                        }
                        xDown = null;
                        yDown = null;  
                }, true); 
            }else{
               callback=element;
               window.addEventListener('touchstart', function(event){
                    xDown = event.touches[0].clientX;                                      
                    yDown = event.touches[0].clientY;     
               });    

               window.addEventListener('touchmove', function(event){
                        if( ! xDown || ! yDown ) {
                            return;
                        }
                        var xUp = event.touches[0].clientX;                                    
                        var yUp = event.touches[0].clientY;

                        var xDiff = xDown - xUp;
                        var yDiff = yDown - yUp;

                        if(Math.abs( xDiff ) > Math.abs( yDiff )) {
                              if (xDiff > 5 ) {
                                callback(false);
                              } else {
                                callback(true);
                              }    
                        }
                        xDown = null;
                        yDown = null;  
                }, false); 
            }
             
         }else{
             ayral.printError('Ayral: Target element not found');
         }
    } 
    this.onSwipeRight=function(element,callback){
         if(ayral.element!==null){
            var xDown = null;                                                        
            var yDown = null; 
           
             if(typeof element !== undefined && typeof element !== 'function' && element !==null){
               element.addEventListener('touchstart', function(event){
                    xDown = event.touches[0].clientX;                                      
                    yDown = event.touches[0].clientY;     
                });    

               element.addEventListener('touchmove', function(event){
                        if( ! xDown || ! yDown ) {
                            return;
                        }
                        var xUp = event.touches[0].clientX;                                    
                        var yUp = event.touches[0].clientY;

                        var xDiff = xDown - xUp;
                        var yDiff = yDown - yUp;

                        if(Math.abs( xDiff ) > Math.abs( yDiff )) {
                              if (xDiff > 0 ) {
                                callback(true);
                              } else {
                                callback(false);
                              }    
                        }
                        xDown = null;
                        yDown = null;  
                }, false); 
             }else{
                callback=element;
                window.addEventListener('touchstart', function(event){
                    xDown = event.touches[0].clientX;                                      
                    yDown = event.touches[0].clientY;     
                });    

                window.addEventListener('touchmove', function(event){
                        if( ! xDown || ! yDown ) {
                            return;
                        }
                        var xUp = event.touches[0].clientX;                                    
                        var yUp = event.touches[0].clientY;

                        var xDiff = xDown - xUp;
                        var yDiff = yDown - yUp;

                        if(Math.abs( xDiff ) > Math.abs( yDiff )) {
                              if (xDiff > 0 ) {
                                callback(true);
                              } else {
                                callback(false);
                              }    
                        }
                        xDown = null;
                        yDown = null;  
                }, false); 
             }
         }else{
             ayral.printError('Ayral: Target element not found');
         }
    }
    this.onOrientation=function(callback){
      this.detectOrientation(callback);
    };
    this.print=function(value){
       console.log(value);  
    };
    this.printError=function(error){
       console.error(error);
    };
    this.onConnection=function(callback){
        try{
          var con=new ayralHttpRequest();
          con.onreadystatechange=function(){
             if(con.readyState==4){
               callback({code:con.readyState,status:'connected'});
             }
          };
          con.open("POST","http://ayral.net/connection");
          con.send();
         
        }catch(err){
          callback({code:0,status:'not connected'});    
        }
    };
    this.loadContentTo=function(element,url){
         try{
             var url=ayralConfig.getAbsoluteURL(url); 
             var request=new ayralHttpRequest();
             request.open('GET',url);
             request.onreadystatechange=function(result){
                 if(request.readyState==0){
                    printError('Ayral Can not establish the connection, " '+request.status+', '+request.statusText);
                 }
                 else if(request.status==200 && request.readyState==4 ){
                     ayralConfig.initializeTemplate(element,result.target.responseText);
                 }  
             };
             request.send();
        }catch(err){
            ayral.printError('Ayral: Can not connect to the target  '+url); 
        }   
    };
    this.render=function(selector){
      ayralConfig.prepareNavigation(window,selector);
    };
    this.find=function(selector){
        return Prepare(selector);
    }; 
    this.selfFind=function(selector){
        if(typeof selector =='string'){
         if(selector.match(/^$/)){
            selector=selector.replace(/\$/g,'');
            selector=ayralDocument.querySelector('[name='+selector+']');
         }else if(selector.match(/^#/)){
             selector=ayralDocument.querySelector(selector);
         }else if(selector.match(/^\*/)){
             selector=ayralDocument.querySelectorAll('body '+selector);
         }else if(selector.match(/^./)){
             selector=ayralDocument.querySelectorAll(selector);
         }else{
            selector=ayralDocument.querySelector(selector);
         } 
        }else{
           return selector; 
        }
      return   selector;
    };
    this.findAyral=function(attribute, value){
      var All = ayralDocument.querySelectorAll('*');
      foreach(All,function(all){
            if(all.getAttribute(attribute)===value) { 
                return all;
            }
       });
    };
    this.createEelement=function(type,content){
            var elem=null; 
            if(type.toUpperCase().match(/INPUT/)){
                 if(type.match(/-/)){
                     absName=type.substring(type.indexOf('-')+1,type.length);
                     absType=type.substring(type.indexOf('-'),0);
                     elem = ayralDocument.createElement(abstype.toUpperCase()); 
                     elem.type=absType;

                 }else{
                    elem = ayralDocument.createElement(type.toUpperCase()); 
                 }

                if(content!=='' && content!==null && typeof content !== typeof undefined){     
                  elem.content=content;
                }
            }
            else{
                elem = ayralDocument.createElement(type.toUpperCase()); 
                if(content!=='' && content!==null && typeof content !== typeof undefined){   
                    if(content.toUpperCase().match(/</)){
                        elem.htmContent=content;
                    }else{
                      content=ayralDocument.createTextNode(content);
                      elem.appendChild(content);
                    }
                }
            }
     return elem; 
    }; 
    this.toMoney=function(num){
        var number=0; 
        if(num!=0 && num!='' && !isNaN(num)){
             number=num.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'NGN',
                           });
            if(number.toString().match(/./)){
               number=number.toString().substr(0,number.toString().indexOf('.'));
            }
            number=number.toString().replace(/NGN/g,'');
          
        }
      return(number);
    }
    this.toNumber=function(num){
      num=Number(num.toString().replace(/,/g,''));
     return(num);
    }
    this.show=function(element){
       ayralConfig.show(element);
    };  
    this.hide=function(element){
       ayralConfig.hide(element);
    };  
    this.toggle=function(elem){
       ayralConfig.toggle(element);
    };
    this.remove=function(elem){
        try{
          if(typeof elem !== 'string'){
             elem.outerHTML='';
          }else{
             var absElem=ayral.selfFind(elem); 
            absElem.outerHTML='';
          }
        }catch(err){
            ayral.printError('Ayral: Target object '+elem+' not found '+err);
        }
    }; 
    this.clear=function(selector){
        try{
          if(typeof elem !== 'string'){
             selector.innerHTML='';
          }else{
            var absElem=ayral.selfFind(selector); 
            absElem.innerHTML='';
          }
        }catch(err){
            ayral.printError('Ayral: Target object '+elem+' not found '+err);
        }
    };
    this.generateID=function(){
         function s4() {
            var date=new Date(),           now=date.getUTCDate()+''+date.getUTCMonth()+''+date.getFullYear()+''+date.getUTCHours()+''+date.getUTCMinutes()+''+date.getUTCSeconds()+''+date.getUTCMilliseconds();

            return Math.floor((1 + Math.random()+now) * 0x10000)
              .toString(16)
              .substring(1);
          }
       return s4() + s4() + s4() +s4() + s4() + s4() + s4() + s4();
    };
    this.getTime=function(){
        return new Date()  
    };
    this.getTimeAgo=function(date){
         if(date!=='' && date!==null && typeof date !== typeof undefined){
               var date=new Date(date);
               var hours = date.getHours();
               var minutes = date.getMinutes();
               var ampm = hours >= 12 ? ' PM' : ' AM';
               hours = hours % 12;
               hours = hours ? hours : 12; // the hour '0' should be '12'
               minutes = minutes < 10 ? '0'+minutes : minutes;
               var strTime = hours + ':'+ minutes + '' + ampm;
               return strTime;  

         }else{
               var date=new Date();
               var hours = date.getHours();
               var minutes = date.getMinutes();
               var ampm = hours >= 12 ? 'pm' : 'am';
               hours = hours % 12;
               hours = hours ? hours : 12; // the hour '0' should be '12'
               minutes = minutes < 10 ? '0'+minutes : minutes;
               var strTime = hours + ':'+ minutes + '' + ampm;
             return strTime;  
         } 
    };
    this.createURL=function(blob){
        if(blob!=='' && typeof blob !== typeof undefined && blob!==null){
          return URL.createObjectURL(blob);
        }
    };
    
   this.dispatch= function(type) {
    var orig = history[type];
      return function() {
        var rv = orig.apply(this, arguments);
        var e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return rv;
    };
   };
}
function FileChooser(type,contity){
    if(type!=='' && typeof type !== typeof undefined && type!==null){
        type=type;
    }else{
        type="*";
    }if(contity!=='' && typeof contity !== typeof undefined && contity!==null){
        if(upper(contity)=="MULTIPLE" || upper(contity)=="MULT"){
            contity='multiple';
        }else{
          contity='single';   
        }
    }else{
      contity='single';   
    }
    ayralFileChooserWrapper=ayralDocument.createElement('section');
    ayralFileChooser=ayralDocument.createElement('input');
    ayralFileChooser.setAttribute('type','file');
    ayralFileChooser.setAttribute('accept',type);
    ayralFileChooser.setAttribute(contity,'true');
    ayralFileChooser.setAttribute('id','fileChooser');
    ayralFileChooser.setAttribute('hidden','true'); 
    ayralFileChooser.setAttribute('style','display:none');
    var form=ayralDocument.body.querySelector('form');
    if(contity=='multiple'){
       ayralFileChooser.setAttribute('name','fileChooser[]');  
    }else{
      ayralFileChooser.setAttribute('name','fileChooser'); 
    }
    if(form!==null && typeof form !== typeof undefined){
        ayralFileChooserWrapper.append(ayralFileChooser);
        form.append(ayralFileChooserWrapper);
    }
    ayralFileChooser.click();
    this.on=function(event,callback){
       if(event!=='' && typeof event !== typeof undefined && event!==null){
            if(upper(event)=='FILE' || upper(event)=='CHANGE'){
               ayralFileChooser.addEventListener('change',function(){
                   if(count(this.files)>0){
                       if(count(this.files)==1){
                         callback({
                             length:1,
                             data:this.files[0]
                         });
                       }else{
                         var agentfiles=new Array();
                         foreach(ayralFileChooser.files,function(absFile){
                            agentfiles.push(absFile);
                         });
                         callback({
                             length:count(ayralFileChooser.files),
                             data:agentfiles
                           });
                       }
                   }else{
                    callback({
                      length:0,
                      data:null
                     });
                   }
               }); 
            }
       }
    }
};
function ayralconfiguration(){
 
    this.initializeTemplate=function(layout,template){
         layout.innerHTML=template;
    };
    this.packActivities=function(){
        ayralActivity=document.querySelectorAll('[actas="activity"');
        foreach(ayralActivity,function(currElem){
             ayral.hide(currElem);
             if(currElem.hasAttribute('state')){
                 if(currElem.getAttribute('state')=='1' || currElem.getAttribute('state')=='active'){
                     ayral.show(currElem);
                     currElem.removeAttribute('state');
                     currElem.setAttribute('master','true');
                 }
             }
        });
    };
    this.disableDrawers=function(){
        var drawer=ayralDocument.querySelectorAll('[actas="drawer"]');
        foreach(drawer, function(elem){
            if(elem.hasAttribute('actas')){
              if(elem.getAttribute('actas')=='drawer'){
                   ayral.selfFind('#ayralApp').setAttribute('state','enabled'); 
                  if(ayral.selfFind('[actas="overlay"]')){
                    ayral.remove('[actas="overlay"]');
                  }
               }
            }
          ayral.hide(elem);
        }); 
        var dropdown=ayralDocument.querySelectorAll('[actas="dropdown"]');
        foreach(dropdown, function(elem){
            if(elem.hasAttribute('actas')){
              if(elem.getAttribute('actas')=='dropdown'){
                   ayral.selfFind('#ayralApp').setAttribute('state','enabled'); 
                  if(ayral.selfFind('[actas="overlay"]')){
                    ayral.remove('[actas="overlay"]');
                  }
               }
            }
          ayral.hide(elem);
        });        
    };    
    this.disableTabs=function(){
        var tabs=ayralDocument.querySelectorAll('[actas="tabs-item"]');
        foreach(tabs, function(tab){
          tab.removeAttribute('state');
        });      
    };   
    this.prepareActivity=function(url){
      var absUri=url.replace(/\$/g,'');
      if(ayralDocument.querySelector('[name="'+absUri+'"]')){
          ayralConfig.packActivities();
            var currentActivity=ayralDocument.querySelector('[name="'+absUri+'"]');
             if(currentActivity.hasAttribute('start')){
               if(lower(currentActivity.getAttribute('start'))=='top'){
                   $('#ayralApp').scrollTop(0)
                   $('body').scrollTop(0);
                   $(window).scrollTop(0);
               }
             }
            //Temprary
          
             this.disableTabs();
             if(absUri.match(/businessesActivity/)){
                ayral.find('$businessTab').setAttribute('state','active');
             }
             if(absUri.match(/categoryActivity/)){
                ayral.find('$categoryTab').setAttribute('state','active');
             } 
             if(absUri.match(/marketActivity/)){
                ayral.find('$marketTab').setAttribute('state','active'); ayral.find('$marketActivity').setAttribute('url','$'+absUri);
                ayral.find('$marketActivity').setAttribute('business','*'); ayral.find('$marketActivity').setAttribute('businessName','*'); ayral.find('$marketActivity').setAttribute('filter','*');
             }
             if(appTempraryHistory.indexOf(absUri) <= -1){
                  ayralWindow.location.hash=absUri;
                
             }
              if(appTempraryExplorer.indexOf(absUri) <= -1 || absUri.toString().match(/index/)){
                 if(ayralWindow.location.href.match(/index/)){
                  ExploreLayerInit(absUri);
                 }
              }else{
                LogoLayerInit(absUri);
              }
              ayralHistoryURL.push(absUri);
            ayral.show(currentActivity);
          
          
      }else{
        ayral.printError('Ayral: Target  '+absUri+' is not defined');
      }
    }; 
    
    this.prepareDialog=function(body,header,type){
        var dialogFooter=ayral.selfFind('#ayral-dialogFooter'),
            dialogHeader=ayral.selfFind('#ayral-dialogHeader'),
            dialogBody=ayral.selfFind('#ayral-dialogBody');
 
        if(type=='-errorAlert'){
             dialogHeader.style.backgroundColor='rgb(255, 210, 214)';
             dialogHeader.style.borderColor='rgb(197, 130, 136)';
             dialogHeader.style.color='#721c24';
        }
        if(type=='-warningAlert'){
             dialogHeader.style.backgroundColor='#fff3cd';
             dialogHeader.style.borderColor='rgb(216, 189, 110)';
             dialogHeader.style.color='#856404';
        }
         
      if(body!=='' && body!==null && typeof body!==typeof undefined){
       if(header!=='' && header!==null && typeof header !== typeof undefined){
              dialogHeader.innerHTML =header;
              dialogBody.innerHTML = body;
          }else{
            dialogHeader.innerHTML ='Ayral Alert';
            dialogBody.innerHTML =body; 
          }   
      }else{
        dialogHeader.innerHTML ='Ayral Alert';
        dialogBody.innerHTML ='';    
      }
      dialogFooter.innerHTML = '<button id="ayral-alertDialogOk">OK</button>';
    }
    this.renderAlert = function(body,header,type){

        var winWidth = window.innerWidth,
            winHeight = window.innerHeight;
        
        
         if(!ayralDocument.body.innerHTML.match(/ayral-dialogManagement-console/)){
             var elem = ayralDocument.createElement('DIV'); 
             elem.id='ayral-dialogManagement-console';
             if(elem.outerHTML!=='' && elem.outerHTML!==null && !ayralDocument.getElementById('ayral-dialogManagement-console')){
                ayralDocument.body.innerHTML=ayralDocument.body.innerHTML+elem.outerHTML;
             }
         }
         ayralDocument.querySelector('#ayral-dialogManagement-console').innerHTML=ayralDialog.alertDialog;
         var dialogOverlay = ayral.selfFind('#ayral-dialogOverlay'),
            dialogBox= ayral.selfFind('#ayral-dialogBox');

         dialogOverlay.style.height = winHeight+"px";
         dialogBox.style.width=(winWidth/1.1)+'px'; 
         dialogBox.style.maxWidth='400px';
         dialogBox.style.margin='auto';
         dialogBox.style.top = "150px";
         dialogBox.style.left='0';
         dialogBox.style.right='0';
         dialogBox.style.margin='5% auto';
    
        var dialogFooter=ayral.selfFind('#ayral-dialogFooter'),
            dialogHeader=ayral.selfFind('#ayral-dialogHeader'),
            dialogBody=ayral.selfFind('#ayral-dialogBody');
 
        
        switch(type){ 
            case "-alert":
               this.prepareDialog(body,header,type);
            break; 
            case "-errorAlert":
                this.prepareDialog(body,header,type);
            break;
            case "-warningAlert":
                this.prepareDialog(body,header,type);
            break;
            case "-confirm":
                if(body!=='' && body!==null && typeof body!==typeof undefined){
                    if(header!=='' && header!==null && typeof header !== typeof undefined){
                         dialogHeader.innerHTML =header;
                         dialogBody.innerHTML = body;
                    }else{
                       dialogHeader.innerHTML ='Ayral Alert';
                       dialogBody.innerHTML =body; 
                    }   
                }else{
                   dialogHeader.innerHTML ='Ayral Confirm';
                   dialogBody.innerHTML ='Untitle';    
                }
               dialogFooter.innerHTML ='<button id="ayral-confirmDialogYes">Yes</button><button id="ayral-confirmDialogNo">No</button';
        
            break;
            case "-prompt":
                if(body!=='' && body!==null && typeof body!==typeof undefined){
                    
                     
                    
                    if(header!=='' && header!==null && typeof header !== typeof undefined){
                         dialogHeader.innerHTML =header;
                         dialogBody.innerHTML ='<input type="text" placeholder="'+body+'" id="ayral-promptInput"/>';
                    }else{
                       dialogHeader.innerHTML ='Ayral Prompt';
                       dialogBody.innerHTML ='<input type="text" placeholder="'+body+'" id="ayral-promptInput"/>'; 
                    }   
                }else{
                   dialogHeader.innerHTML ='Ayral Alert';
                   dialogBody.innerHTML ='<input type="text" id="ayral-promptInput"/>';    
                }
               dialogFooter.innerHTML ='<button id="ayral-promptDialogCancel" >Cancel</button><button id="ayral-promptDialogOk">Ok</button>';
            break;
        }

        dialogOverlay.style.display = "block";
        dialogBox.style.display = "block";
        
    }
    this.renderToast = function(type,body,lengthLong){
        
        var winWidth = window.innerWidth,
            winHeight = window.innerHeight;
   
         if(!ayralDocument.body.innerHTML.match(/ayral-toastManagement-console/)){
             var elem = ayralDocument.createElement('DIV'); 
              elem.id='ayral-toastManagement-console';
              if(elem.outerHTML!=='' && elem.outerHTML!==null && !ayralDocument.getElementById('ayral-toastManagement-console')){
                ayralDocument.body.innerHTML=ayralDocument.body.innerHTML+elem.outerHTML;
             }
         }
         ayralDocument.querySelector('#ayral-toastManagement-console').innerHTML=ayralDialog.toastDialog;
            var toastOverlay = ayral.selfFind('#ayral-toastOverlay'),
            toastBody = ayral.selfFind('#ayral-toastBody');
    

        
        
        if(body!=='' && body!==null && typeof body!==typeof undefined){
           toastBody.innerHTML=body;
        }else{
           toastBody.innerHTML='Untitle';   
        }
 
         switch(type){ 
             case "-show":
                 toastOverlay.style.backgroundColor='#24292e';
                 toastOverlay.style.border='1px solid #24292e';
                break;
             case "-info":
                 toastOverlay.style.backgroundColor='#0275d8';
                 toastOverlay.style.border='1px solid #0275d8';
                break;
             case "-warnning":
                 toastOverlay.style.backgroundColor='#fff3cd';
                 toastOverlay.style.color='#856404';
                 toastOverlay.style.border='1px solid #ffeeba';
                 break;
             case "-error":
                 toastOverlay.style.backgroundColor='#f8d7da';
                 toastOverlay.style.color='#721c24';
                 toastOverlay.style.border='1px solid #f5c6cb';
                 break;
         }
        toastOverlay.style.display = "block"; 
        var resetToast=setTimeout(function(){
          toastOverlay.style.display = "none"; 
        },lengthLong);
    }
    
    this.prepareEvent=function(element,type,event){
        try{
            if(element!==null && element!=='null' && typeof element !== typeof undefined){
              if(element.length>0){
                 foreach(element,function(elem){
                    type=type.toLowerCase();
                    elem.addEventListener(type,event);
                 });
              }else{
                type=type.toLowerCase();
                element.addEventListener(type,event);
              }
            }
        }catch(err){
           // ayral.printError('Ayral: Couldn\'t  add '+type+' event to '+element);
        }
      return element;
    };
    this.getAbsoluteURL=function(url){
        if(!url.match(/^http:/) && !url.match(/^https:/) && !url.match(/^www./)){
            
             if(!url.match(/\./)){
               url=url+'.html';
             }
             if(url.match(/^\//)){
                url=url;
             }else if (url.match(/layouts/)){
                url='/'+url;
             }else{
                 url='/layouts/'+url;
             }   
             url=url.replace(/\//,'');
        }
      return (url);    
    }
    this.prepareNavigation=function(target,targetUri){
    
        if(!targetUri.match(/^!/)){
            
             if(targetUri.match(/^\$/)){
                  ayralConfig.prepareActivity(targetUri);
             }
             else if(targetUri.match(/^#/)){
                 var absUri=targetUri.replace(/\#/g,'');
                 var elem=ayralDocument.querySelector('[name="'+absUri+'"]');
                 var open=elem.style.display;
                 ayralConfig.disableDrawers();
               
                     if(elem.hasAttribute('position')){
                         
                         var actionBar=document.querySelector('[actas="action-bar"]');  
                         var actionBarTop=document.querySelector('[actas="action-bar-top"]');
                         var actionBarBottom=document.querySelector('[actas="action-bar-bottom"]');
                         
                         if(elem.getAttribute('position')=='left'){
                              elem.children.className='animated slideInLeft';
                         } 
                         if(elem.getAttribute('position')=='right'){
                              elem.children.className='animated slideInRight';
                         }
                         if(elem.getAttribute('position')=='top' || elem.getAttribute('position')=='up'|| elem.getAttribute('position')=='top right' || elem.getAttribute('position')=='up right' || elem.getAttribute('position')=='top left' || elem.getAttribute('position')=='up left'|| elem.getAttribute('position')=='right top' || elem.getAttribute('position')=='right up' || elem.getAttribute('position')=='left top' || elem.getAttribute('position')=='left up'){
                             if(actionBar){
                                if(actionBar.offsetTop<10){
                                   elem.style.marginTop=actionBar.offsetHeight+'px';
                                }
                             }
                             if(actionBarTop){
                                if(actionBarTop.offsetTop<10){
                                  elem.style.marginTop=actionBarTop.offsetHeight+'px';
                                }
                             }
                             elem.className='animated slideInDown';
                         }
                         if(elem.getAttribute('position')=='bottom' || elem.getAttribute('position')=='down' || elem.getAttribute('position')=='bottom right' || elem.getAttribute('position')=='down right' || elem.getAttribute('position')=='bottom left' || elem.getAttribute('position')=='down left' || elem.getAttribute('position')=='right bottom' || elem.getAttribute('position')=='right down' || elem.getAttribute('position')=='left bottom' || elem.getAttribute('position')=='left down'){
                             if(actionBarBottom){
                                if(actionBarBottom.offsetTop>window.innerHeight-100){
                                  elem.style.marginBottom=actionBarBottom.offsetHeight+'px';
                                }
                             }
                              elem.className='animated slideInUp';
                         }
                     } 
              
                  if(open=='none' || open=='' || open==null) {
                      if(elem.hasAttribute('actas')){
                          if(elem.getAttribute('actas')=='drawer'){
                             ayral.selfFind('#ayralApp').setAttribute('state','disabled'); 
                             if(!ayral.selfFind('[actas="overlay"]')){
                                ayralDocument.body.insertAdjacentHTML('beforeend','<section actas="overlay"></section>');
                             }
                          }
                      }
                    ayral.show(elem);
                  }else {
                      if(elem.hasAttribute('actas')){
                          if(elem.getAttribute('actas')=='drawer'){
                              ayral.selfFind('#ayralApp').setAttribute('state','enabled'); 
                              if(ayral.selfFind('[actas="overlay"]')){
                                ayral.remove('[actas="overlay"]');
                              }
                          }
                      }
                     ayral.hide(elem);
                  }
            }
            else if(targetUri.match(/^:\//) || targetUri.match(/^:/)){
                 var absUri=targetUri.substring(targetUri.indexOf(':')+1, targetUri.length);
                 var app=null;
        
                 var activities=ayralDocument.querySelectorAll('[actas="activity"]');
                 foreach(activities,function(activity){
                    if(activity.hasAttribute('style')){
                        if(activity.getAttribute('style').match(/block/)){
                           app=activity;
                        }
                    }
                 });
                 
                 if(app!==null && typeof app!== typeof undefined){
                      new Ayral().loadContentTo(app,absUri);
                 }
             }
             else if(targetUri.match(/\)$/) || targetUri.match(/\);$/) ||targetUri.match(/\);$/) || targetUri.match(/\)$/)){
                 var absUri=targetUri.substring(0, targetUri.indexOf('('));
                 var params=targetUri.substring(targetUri.indexOf('(')+1, targetUri.indexOf(')'));
                 ayralWindow[absUri](params);
             }
             else{
                 window.location.href=targetUri;
             }
         }
     }
    this.show=function(element){
        try{
          if(typeof element !== 'string'){
            if(element.length>0){
                foreach(element, function(element){
                    element.style.display='block';
                });
            }else{
             element.style.display='block'; 
            }
          }else{
             var absElem=ayral.selfFind(element); 
              absElem.style.display='block';
          }
        }catch(err){
            ayral.printError('Ayral: Target object '+element+' not found');
        }
    }; 
    this.hide=function(element){
        try{
          if(typeof element !== 'string'){
            if(element.length>0){
                foreach(element, function(element){
                    element.style.display='none';
                });
            }else{
             element.style.display='none'; 
            }
          }else{
             var absElem=ayral.selfFind(element); 
              absElem.style.display='none';
          }
        }catch(err){
            ayral.printError('Ayral: Target object '+element+' not found');
        }
    };  
    this.toggle=function(elem){
        var absElement=elem;
        try{
              if(typeof elem == 'string'){
                  absElement=ayral.selfFind(elem); 
              }
            
            if(absElement.style.display=='block' || absElement.style.display==''){
                this.hide(absElement);
            }else{
                this.show(absElement);
            }

        }catch(err){
            ayral.printError('Ayral: Target object '+elem+' not found');
        }
    };
};
function ayralToastManagement(){   
    
   this.show=function(info,type,lengthLong){
      if(lengthLong!=='' && lengthLong!==null && typeof lengthLong != typeof undefined){
           if(type!=='' && type!==null && typeof type != typeof undefined){
                ayralConfig.renderToast('-'+type,info,lengthLong);
           }else{
             ayralConfig.renderToast('-show',info,lengthLong);   
           }
      }else{
          
          if(type!=='' && type!==null && typeof type != typeof undefined){
                ayralConfig.renderToast('-'+type,info,4000);
           }else{
             ayralConfig.renderToast('-show',info,4000);   
           }
      }
   };
  this.err=function(error,lengthLong){
    if(error!=='' && error!==null && typeof error != typeof undefined){
        
       if(lengthLong!=='' && lengthLong!==null && typeof lengthLong != typeof undefined){
                ayralConfig.renderToast('-error',error,lengthLong);
       }else{
             ayralConfig.renderToast('-error',error,4000);   
      }
    }else{
      ayralConfig.renderToast('-error','Untitle',4000);   
    }
   }; 
  this.notify=function(info,lengthLong){
      if(info!=='' && info!==null && typeof info != typeof undefined){
        
       if(lengthLong!=='' && lengthLong!==null && typeof lengthLong != typeof undefined){
                ayralConfig.renderToast('-info',info,lengthLong);
       }else{
             ayralConfig.renderToast('-info',info,4000);   
      }
    }else{
      ayralConfig.renderToast('-info','Untitle',4000);   
    }
   };
  this.warn=function(warnning,lengthLong){
        if(warnning!=='' && warnning!==null && typeof warnning != typeof undefined){
        
       if(lengthLong!=='' && lengthLong!==null && typeof lengthLong != typeof undefined){
                ayralConfig.renderToast('-warnning',warnning,lengthLong);
       }else{
             ayralConfig.renderToast('-warnning',warnning,4000);   
      }
    }else{
      ayralConfig.renderToast('-warnning','Untitle',4000);   
    }
   };
}
function Prepare(selector){
    
     var ayral={};
 
     try{
         if(ayral.selector=='[object document]' || ayral.selector=='app' || ayral.selector=='page'){
             ayral.element=ayralDocument.querySelector('document');
         }else{
             if(typeof  selector!== typeof 'string' && selector!==null){
                ayral.element=selector; 
             }else{   
                if(selector.match(/^\$/)){
                    selector=selector.replace(/\$/g,'');
                    if(selector.match(/,/)){
                        var selectors = selector.split(','),
                            selectorsCollections='';
                        
                        foreach(selectors,function(selector){
                           selectorsCollections+='[name='+selector+'],';
                        });
                        absSelectors=selectorsCollections.substr(0,selectorsCollections.length-1)
                        ayral.element=ayralDocument.querySelectorAll(absSelectors);
                    }else{
                      ayral.element=ayralDocument.querySelector('[name='+selector+']');
                    }
                       
                }else if(selector.match(/^#/)){
                  ayral.element=ayralDocument.querySelectorAll(selector);
                }else if(selector.match(/^\*/)){
                  ayral.element=ayralDocument.querySelectorAll('body '+selector);
                }else{
                 ayral.element=ayralDocument.querySelectorAll(selector);
                } 
                
             }
         }
     }catch(err){
        printError('Ayral: can not find target '+selector+'');  
     }

         
      /*
         DOM MANUPLATION
     */
      ayral.parent=function(){
        return Prepare(ayral.element.parentElement);
     };
      ayral.render=function(content){
         if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
              element.innerHTML=content;
          });
        }else{
         ayral.element.innerHTML=content;
        }
      };
      ayral.getHtml=function(){
      return ayral.element.innerHTML;
      };
      ayral.getData=function(){
          return ayral.element.innerHTML;
      };
      ayral.getText=function(){
          return ayral.element.textContent;
      };
      ayral.getValue=function(){
          return ayral.element.value;
      };
      ayral.getTagName=function(){
          return ayral.element.tagName;
      };
      ayral.getAttribute=function(attr){
          if(attr!=='' && attr!==null && typeof attr !== typeof undefined){
               return ayral.element.getAttribute(attr);
          }else{
             ayral.printError('Ayral: getAttribute require 1 parameter');
             return 'null';   
          }
      };
     ayral.getLength=function(){
        return ayral.element.length;
     };
     ayral.getCount=function(){
        return ayral.element.innerHTML.length;
     };
     ayral.indexOf=function(value){
         if(value!=='' && value!==null && typeof value !== typeof undefined){
           return ayral.element.indexOf(value);
         }else{
            ayral.printError('Ayral: indexOf require exactly 1 parameter, character');
           return '';
         }
     };
     ayral.lastIndexOf=function(value){
          if(value!=='' && value!==null && typeof value !== typeof undefined){
              ayral.element.lastIndexOf(value);
          }else{
            ayral.printError('Ayral: lastIndexOf require exactly 1 parameter, character');
             return 'null';
          }
     }; 
     ayral.setDisplay=function(property){
          if(ayral.element) if(ayral.element.length>0){
            foreach(ayral.element, function(element){
              element.style.display=property;
            });
          }else{
             ayral.element.style.display=property;
          }
     };  
     ayral.setPosition=function(property){
          if(ayral.element) if(ayral.element.length>0){
            foreach(ayral.element, function(element){
              element.style.position=property;
            });
          }else{
             ayral.element.style.position=property;
          }
     };  
    ayral.setOpacity=function(value){
          if(ayral.element) if(ayral.element.length>0){
            foreach(ayral.element, function(element){
              element.style.opacity=value;
            });
          }else{
             ayral.element.style.opacity=value;
          }
     };  
     ayral.hide=function(){
        if(ayral.element)
        ayralConfig.hide(ayral.element);
     }; 
     ayral.show=function(){
        if(ayral.element)
        ayralConfig.show(ayral.element);
     };
     ayral.toggle=function(){
        if(ayral.element)
        ayralConfig.toggle(ayral.element);
     };
     
    ayral.setHtml=function(html){
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
           element.innerHTML=html;
          });
        }else{
         ayral.element.innerHTML=html;
        }     
     };
     ayral.setData=function(data){
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
           element.innerHTML=data;
          });
        }else{
        ayral.element.innerHTML=data;
        }
         
     };
     ayral.setText=function(text){
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
           element.textContent=text;
          });
        }else{
        ayral.element.textContent=text;
        }
     }; 
     ayral.setValue=function(value){
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
              if(ayral.element[curr].tagName=='TEXTAREA' || ayral.element[curr].tagName=='INPUT'){
                 element.value=value;
              }
          });
        }else{
             if(ayral.element.tagName=='TEXTAREA' || ayral.element.tagName=='INPUT'){
                ayral.element.value=value;
             }else{
               ayral.element.innerHTML=value;
             }
        }
     };
    ayral.setAttribute=function(attr,value){
     if(attr!=='' && attr!==null && typeof attr !== typeof undefined){ 
         if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
           element.setAttribute(attr,value);
          });
        }else{
         ayral.element.setAttribute(attr,value);
        }
      }else{
         ayral.printError('Ayral: setAttribute require 2 parameters'); 
     }
    }; 
    ayral.removeAttribute=function(attr){
     if(attr!=='' && attr!==null && typeof attr !== typeof undefined){ 
          foreach(ayral.element, function(element){
            element.removeAttribute(attr);
          });
      }else{
         ayral.printError('Ayral: removeAttribute require 1 parameters'); 
      }
    }; 
    ayral.addClass=function(className){
     if(className!=='' && className!==null && typeof className !== typeof undefined){ 
           if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
                element.classList.add(className);
              });
           }else{
             ayral.element.classList.add(className); 
           }
      }else{
         ayral.printError('Ayral: addClass require 1 parameter'); 
      }
    }; 
    ayral.removeClass=function(className){
     if(className!=='' && className!==null && typeof className !== typeof undefined){ 
         if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
            element.classList.remove(className);
          });
         }else{
           ayral.element.classList.remove(className); 
         }
      }else{
         ayral.printError('Ayral: removeClass require 1 parameter'); 
      }
    }; 
    ayral.replaceClass=function(className,replacementString){
     if(className!=='' && className!==null && typeof className !== typeof undefined){ 
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
                element.classList.remove(className);
                element.classList.add(replacementString);
          });
        }else{
            ayral.element.classList.remove(className);
            ayral.element.classList.add(replacementString);
        }
      }else{
         ayral.printError('Ayral: replaceClass require 2 parameters'); 
      }
    };
    ayral.load=function(url){
       new Ayral().loadContentTo(ayral.element,url);
    };
    ayral.setWarnning=function(){
        preBgColor=this.getStyle('background-color');
        preBorderColor=this.getStyle('border-color');
        
        if(ayral.element) if(ayral.element.length>0){
          foreach(ayral.element, function(element){
            element.style.backgroundColor='#f0ad4e';
            element.style.borderColor='#eea236';
         });
        }else{
           ayral.element.style.backgroundColor='#f0ad4e';
           ayral.element.style.borderColor='#eea236';
        }
    };
    
    
      
    /*
       DOM MANUPLATION
    */
    ayral.createEelement=function(type,content){
       if(selector!=='' && selector!==null && typeof selector !== typeof undefined){
         ayral.element.addElement(ayral.createEelement(type,content)); 
       }else{
          ayral.printError('Ayral: createEelement require 1 parameter');
       }
    };    
    ayral.appendEelement=function(type,content){
       if(selector!=='' && selector!==null && typeof selector !== typeof undefined){
        ayral.element.appendChild(ayral.createEelement(type,content)); 
       }else{
           ayral.printError('Ayral: appendEelement require 1 parameter');
       }
    }; 
    ayral.removeElement=function(selector){
         if(selector!=='' && selector!==null && typeof selector !== typeof undefined){
            var elem=ayral.selfFind(selector);
           if(elem!==null){
             ayral.element.removeChild(elem.nodeValue);
           }
         }else{
            ayral.printError('Ayral: removeElement require 1 parameter');
         }
     }; 
     ayral.append=function(html){
         if(html!=='' && html!==null && typeof html !== typeof undefined){
            if(ayral.element) if(ayral.element.length>0){
                foreach(ayral.element, function(element){
                  element.innerHTML+=html; ;
                });
            }else{
              ayral.element.innerHTML+=html; 
            }
         }else{
            ayral.printError('Ayral: append require 1 parameter');
         }
     };
     ayral.remove=function(){
       ayral.remove(ayral.element);
     }; 
     ayral.clear=function(){
        if(ayral.element.tagName=='TEXTAREA' || ayral.element.tagName=='INPUT'){
           ayral.element.value='';
        }else{
          ayral.element.innerHTML='';
        }
     };
     ayral.removeSRC=function(){
        ayral.element.src=null;
     };
    ayral.setSRC=function(sorce){
        ayral.element.src=sorce;
     };
    ayral.get6SRC=function(){
        return ayral.element.src;
     };

    /*
       STYLE MANUPLATION
    */

    
    ayral.scrollTo=function(scroll){
        if(scroll!==null && typeof scroll !== undefined && scroll!==''){
           var app=ayralDocument.getElementById('ayralApp');
           app.scroll({
              top: scroll,
              behavior: 'smooth'
           });
        }else{
          ayral.printError('Ayral: scrollTo require 1 parameter');
        }
    };    
    ayral.scrollToView=function(){
      ayral.element.scrollIntoView();
    };    
    ayral.setStyle=function(property, value){
        if(property!==null && typeof property !== undefined && property!==''){
            if(value!==null && typeof value !== undefined && value!==''){
                ayral.element.style.setProperty(property,value);
            }else{
             ayral.printError('Ayral: setStyle value parameter');
            }
        }else{
          ayral.printError('Ayral: setStyle require 2 parameters, property and value');
        }
    };
    ayral.setBackground=function(background){
        if(background!=='' && background!==null && typeof background !== typeof undefined){
             ayral.element.style.setProperty('background',background);
        }else{
            ayral.printError('Ayral: setBackground require at list 1 parameter');
        }
    };  
    ayral.setBackgroundColor=function(color){
        if(color!=='' && color!==null && typeof color !== typeof undefined){
             ayral.element.style.setProperty('background-color',color);
        }else{
            ayral.printError('Ayral: setBackgroundColor require at list 1 parameter');
        }
    }; 
    ayral.setBackgroundImage=function(url){
        if(url!=='' && url!==null && typeof url !== typeof undefined){
            ayral.element.style.backgroundImage=url;
        }else{
            ayral.printError('Ayral: setBackgroundImage require at list 1 parameter');
        }
    };
    ayral.setBorder=function(border, position){
       if(border!==''  && typeof border !== typeof undefined && position !==null){
            if(position!=='' &&  typeof position !== typeof undefined  && position!==null){
                var absPosition=lower(position);
                if(absPosition=='top'){  ayral.element.style.borderTop=border; }
                if(absPosition=='bottom'){  ayral.element.style.borderBottom=border; }
                if(absPosition=='left'){  ayral.element.style.borderLeft=border; }
                if(absPosition=='right'){  ayral.element.style.borderRight=border; }
            }else{
                ayral.element.style.border=border;
            }
       }else{
         ayral.printError('Ayral: setBorder require at list 1 parameter');
       }
    };
    ayral.setBorderColor=function(color){
       if(color!==''  && typeof color !== typeof undefined && color !==null){
           ayral.setStyle('border-color',color);
       }else{
         ayral.printError('Ayral: setBorderColor require 1 parameter');
       }
    };  
    ayral.setPadding=function(padeValue, position){
       if(padeValue!==''  && typeof padeValue !== typeof undefined && padeValue !==null){
            if(position!=='' &&  typeof position !== typeof undefined  && position!==null){
                var absPosition=lower(position);
                if(absPosition=='top'){  ayral.element.style.paddingTop=padeValue; }
                if(absPosition=='bottom'){  ayral.element.style.paddingBottom=padeValue; }
                if(absPosition=='left'){  ayral.element.style.paddingLeft=padeValue; }
                if(absPosition=='right'){  ayral.element.style.paddingRight=padeValue; }
            }else{
                ayral.element.style.padding=padeValue;
            }
       }else{
         ayral.printError('Ayral: setBorder require at list 1 parameter');
       }
    }; 
    ayral.setRadius=function(radius, position){
       if(radius!==''  && typeof radius !== undefined && radius !==null){
            if(position!=='' &&  typeof position !== undefined  && position!==null){
                var absPosition=lower(position);
                if(absPosition=='top'){  
                    ayral.element.style.borderTopLeftRadius=radius;
                    ayral.element.style.borderTopRightRadius=radius; 
                }if(absPosition=='bottom'){  
                    ayral.element.style.borderBottomLeftRadius=radius;
                    ayral.element.style.borderBottomRightRadius=radius; 
                }if(absPosition=='right'){  
                    ayral.element.style.borderTopRightRadius=radius;
                    ayral.element.style.borderTopRightRadius=radius; 
                }if(absPosition=='left'){  
                    ayral.element.style.borderBottomLeftRadius=radius;
                    ayral.element.style.borderBottomLeftRadius=radius; 
                }
            }else{
                ayral.element.style.borderRadius=radius;
            }
       }else{
         ayral.printError('Ayral: setRadius require at list 1 parameter');
       }
    };
    ayral.setMargin=function(margeValue, position){
       if(margeValue!==''  && typeof margeValue !== typeof undefined && margeValue !==null){
            if(position!=='' &&  typeof position !== typeof undefined  && position!==null){
                var absPosition=lower(position);
                if(absPosition=='top'){  ayral.element.style.marginTop=margeValue; }
                if(absPosition=='bottom'){  ayral.element.style.marginBottom=margeValue; }
                if(absPosition=='left'){  ayral.element.style.marginLeft=margeValue; }
                if(absPosition=='right'){  ayral.element.style.marginRight=margeValue; }
            }else{
                ayral.element.style.margin=margeValue;
            }
       }else{
         ayral.printError('Ayral: setBorder require at list 1 parameter');
       }
    }; 
    ayral.setHeight=function(value){
        if(value!=='' && value!==null && typeof value !== typeof undefined){
            if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
               element.style.height=value;
              });
            }else{
            ayral.element.style.height=value;
            }
        }else{
            ayral.printError('Ayral: setHeght require at list 1 parameter for the height value');
        }
    };
    ayral.setWidth=function(value){
        if(value!=='' && value!==null && typeof value !== typeof undefined){
            if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
               element.style.width=value;
              });
            }else{
              ayral.element.style.width=value;
            }
        }else{
            ayral.printError('Ayral: setWidth require at list 1 parameter for the height value');
        }
    };
    ayral.setSize=function(width, height){
        if(width!=='' && width!==null && typeof width !== typeof undefined){
            
            if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
                if(width!=='' && typeof height== typeof undefined){
                   element.style.fontSize=width;
                }else{
                 element.style.width=width;
                 element.style.height=height;
                }
              });
            }else{             
                if(width!=='' && typeof height== typeof undefined){
                   element.style.width=width;
                   element.style.height=width;
                }else{
                  ayral.element.style.width=width;
                  ayral.element.style.height=height;
                }
            }
        }else{
            ayral.printError('Ayral: setSize require at list 1 parameter for size or 2 patamers for width and height');
        }
    };
    ayral.setFontSize=function(size){
        if(size!=='' && size!==null && typeof size !== typeof undefined){
            ayral.element.style.setProperty('font-size',size);
        }else{
            ayral.printError('Ayral: setFontSize require 1 parameter');
        }
    };
    ayral.setLocation=function(x, y){
        if(x!=='' && x!==null && typeof x !== typeof undefined && y!=='' && y!==null && typeof y !== typeof undefined){
             if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
                element.style.marginLeft=x;
                element.style.marginTop=y;
              });
             }else{
               ayral.element.style.marginLeft=x;
               ayral.element.style.marginTop=y;  
             }
        }else{
            ayral.printError('Ayral: setLocation require 2 parameters 1 for X and second for Y');
        }
    };   
    ayral.setOffset=function(x, y){
        if(x!=='' && x!==null && typeof x !== typeof undefined && y!=='' && y!==null && typeof y !== typeof undefined){
             if(ayral.element) if(ayral.element.length>0){
              foreach(ayral.element, function(element){
                element.style.marginLeft=x;
                element.style.marginTop=y;
              });
             }else{
               ayral.element.style.marginLeft=x;
               ayral.element.style.marginTop=y;  
             }
        }else{
            ayral.printError('Ayral: setOffset require 2 parameters 1 for X and second for Y');
        }
    };  
    ayral.setColor=function(color){
        if(color!=='' && color!==null && typeof color !== typeof undefined){
           if(ayral.element) if(ayral.element.length>0){
                foreach(ayral.element, function(element){
                  element.style.color=color;
                });
            }else{
              ayral.element.style.color=color;
            }
        }else{
            ayral.printError('Ayral: setColor require at list 1 parameter');
         }
       }; 
       ayral.getStyle=function(styleProperty){
        if(styleProperty!==null && typeof styleProperty !== typeof undefined && styleProperty!==''){
            var value, defaultView = (ayral.element.ownerDocument || document).defaultView;
              // W3C standard way:
              if (defaultView && defaultView.getComputedStyle) {
                // sanitize property name to css notation
                // (hypen separated words eg. font-Size)
                styleProperty = styleProperty.replace(/([A-Z])/g, "-$1").toLowerCase();
                return defaultView.getComputedStyle(ayral.element, null).getPropertyValue(styleProperty);
              } else if (ayral.element.currentStyle) { // IE
                // sanitize property name to camelCase
                styleProperty = styleProperty.replace(/\-(\w)/g, function(str, letter) {
                  return letter.toUpperCase();
                });
                value = ayral.element.currentStyle[styleProperty];
                // convert other units to pixels on IE
                if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
                  return (function(value) {
                    var oldLeft = ayral.element.style.left, oldRsLeft = ayral.element.runtimeStyle.left;
                    ayral.element.runtimeStyle.left = el.currentStyle.left;
                    ayral.element.style.left = value || 0;
                    value =ayral.element.style.pixelLeft + "px";
                    ayral.element.style.left = oldLeft;
                    ayral.element.runtimeStyle.left = oldRsLeft;
                    return value;
                  })(value);
                }
                return value;
             }  
        }else{
          return  ayral.element.style;  
        }
      };
     ayral.getMargin =function(position){
        if(position!=='' &&  typeof position !== typeof undefined  && position!==null){
          var absPosition=lower(position);
          if(absPosition=='top'){ return ayral.getStyle('margin-top');}
          if(absPosition=='bottom'){ return ayral.getStyle('margin-bottom'); }
          if(absPosition=='left'){  return ayral.getStyle('margin-left'); }
          if(absPosition=='right'){  return ayral.getStyle('margin-right'); }
         }else{
           return ayral.getStyle('margin');
        }
     };
    ayral.getPadding =function(position){
        if(position!=='' &&  typeof position !== typeof undefined  && position!==null){
          var absPosition=lower(position);
          if(absPosition=='top'){ return ayral.getStyle('padding-top');}
          if(absPosition=='bottom'){ return ayral.getStyle('padding-bottom'); }
          if(absPosition=='left'){  return ayral.getStyle('padding-left'); }
          if(absPosition=='right'){  return ayral.getStyle('padding-right'); }
         }else{
           return ayral.getStyle('padding');
        }
     };
     ayral.getOffset=function() {
       var rect = ayral.element.getBoundingClientRect();
       return {
        X: rect.left + window.scrollX,
        Y: rect.top + window.scrollY
      };
    }
    ayral.getColor=function(){
       return ayral.getStyle('color');
     }; 
     ayral.getBorder=function(){
       return ayral.getStyle('border');
     };
    ayral.getBorderColor=function(){
       return ayral.getStyle('border-color');
     };
     ayral.getRadius=function(position){
         if(typeof position !== typeof undefined && position !== null && position !==''){
              var absPosition=lower(position);
              if(absPosition=='top'){ 
                  return {
                    left:ayral.getStyle('border-top-left-radius'),
                    right:ayral.getStyle('border-top-right-radius')     
                  };
              }
              if(absPosition=='bottom'){
                   return {
                    left:ayral.getStyle('border-bottom-left-radius'),
                    right:ayral.getStyle('border-bottom-right-radius')     
                  }; 
              }
              if(absPosition=='left'){  
                 return {
                    top:ayral.getStyle('border-top-left-radius'),
                    bottom:ayral.getStyle('border-bottom-left-radius')     
                  };
              }
              if(absPosition=='right'){  
                   return {
                    top:ayral.getStyle('border-top-right-radius'),
                    bottom:ayral.getStyle('border-bottom-right-radius')     
                  };
              }  
         }else{
           return ayral.getStyle('border-radius');
         }
     }; 
    ayral.getChildren=function(selector){
        var elements={};
        if(typeof selector != typeof undefined && selector!=''){
            elements=ayral.element.querySelectorAll(selector);
        }else{
          elements=ayral.element.querySelectorAll('*');
        }
        for(i in elements){
          return(elements[i]);
        }
    } 
    ayral.getCount=function(selector){
        var elements={};
        if(typeof selector != typeof undefined && selector!=''){
            elements=ayral.element.querySelectorAll(selector);
        }else{
          elements=ayral.element.querySelectorAll('*');
        }
        return (elements.length);
    } 
    ayral.getParent=function(){
      return ayral.element.parentElement;
    }
    ayral.getBackground=function(){
       return ayral.getStyle('background');
     };
     ayral.getBackgroundColor=function(){
       return ayral.getStyle('background-color');
     };
     ayral.getBackgroundImage=function(){
       return ayral.getStyle('background-image');
     }; 
     ayral.getOpacity=function(){
       return ayral.getStyle('opacity');
     };  
     ayral.getDisplay=function(){
       return ayral.getStyle('display');
     }; 
     ayral.getPosition=function(){
       return ayral.getStyle('position');
     }; 
     ayral.getLocation=function(){
       return ayral.getOffset();
     }; 
    ayral.getSize=function(){
       return {
           width: ayral.getStyle('width'),
           height:ayral.getStyle('height')
       }
     };
    ayral.getFontSize=function(){
       return ayral.getStyle('font-size');
     };
    ayral.getHeight=function(){
      return ayral.element.clientHeight;
    };
    ayral.getWidth=function(){
      return ayral.element.clientWidth;
    };
    
    /*
       EVENT HANDLERS
    */
      ayral.performClick=function(){
          if(ayral.element!=null && typeof ayral.element !== typeof undefined){
              if(ayral.element.length>0){
                  foreach(ayral.element,function(element){
                       ayral.element[0].click();
                  });
              }
          }
      }
      ayral.on=function(eventType,callback){
        if(eventType=='swipe'){
          ayral.swipe(ayral.element,callback);   
        }else if(eventType=='swipeLeft'){
          ayral.swipeLeft(ayral.element,callback);  
        }else if(eventType=='swipeRight'){
          ayral.swipeRight(ayral.element,callback);  
        }else{
           return ayralConfig.prepareEvent(ayral.element,eventType,callback);
        }
          
      };
    
      ayral.onSwipe=function(callback){
        ayral.onSwipe(ayral.element,callback);
      }; 
      ayral.onSwipeLeft=function(callback){
         ayral.swipeLeft(ayral.element,callback);
      }; 
      ayral.onSwipeRight=function(callback){
         ayral.swipeRight(ayral.elementm,callback);
      };
      ayral.onClick=function(event){
         return  ayralConfig.prepareEvent(ayral.element,'click',event);
      };
      ayral.onDoubleClick=function(event){
          return ayralConfig.prepareEvent(ayral.element,'dblclick',event);
      };
      ayral.onFocus=function(event){
          return ayralConfig.prepareEvent(ayral.element,'focus',event);
      };
      ayral.onFocusIn=function(event){
          return ayralConfig.prepareEvent(ayral.element,'focusin',event);
      };
      ayral.onFocusOut=function(event){
          return ayralConfig.prepareEvent(ayral.element,'focusout',event);
      };
      ayral.onInput=function(event){
          return ayralConfig.prepareEvent(ayral.element,'input',event);
      };
      ayral.onKeyDown=function(event){
          return ayralConfig.prepareEvent(ayral.element,'keydown',event);
      }; 
      ayral.onKeyPress=function(event){
          return ayralConfig.prepareEvent(ayral.element,'keypress',event);
      };
      ayral.onKeyUp=function(event){
          return ayralConfig.prepareEvent(ayral.element,'keyup',event);
      }; 
      ayral.onMouseDown=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mousedown',event);
      };
      ayral.onMouseEnter=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mouseenter',event);
      };
      ayral.onMouseLeave=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mouseleave',event);
      };
      ayral.onMouseMove=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mousemove',event);
      };
      ayral.onMouseOut=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mouseout',event);
      };
      ayral.onMouseOver=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mouseover',event);
      };
      ayral.onMouseUp=function(event){
          return ayralConfig.prepareEvent(ayral.element,'mouseup',event);
      };
      ayral.onResize=function(event){
          return ayralConfig.prepareEvent(ayral.element,'resize',event);
      }; 
      ayral.onScroll=function(event){
          return ayralConfig.prepareEvent(ayral.element,'scroll',event);
      };
      ayral.onSelect=function(event){
          return ayralConfig.prepareEvent(ayral.element,'select',event);
      };
      ayral.onReady=function(event){
          return ayralConfig.prepareEvent(window,'unload',event);
      }; 
      ayral.onWheel=function(event){
          return ayralConfig.prepareEvent(ayral.element,'wheel',event);
      };
      ayral.onChange=function(event){
          return ayralConfig.prepareEvent(ayral.element,'change',event);
      }; 
      ayral.onSelection=function(event){
         return ayralDocument.onselectionchange = function() {
             event(event);
         };
      };
    
    ayral.canRefresh=function(){
       if(ayral.element.hasAttribute('src') || ayral.element.hasAttribute('init')){
           
           try{
               var targetUri='';
               if(ayral.element.hasAttribute('src')){
                  targetUri= ayral.element.getAttribute('src');
               }if(ayral.element.hasAttribute('init')){
                  targetUri= ayral.element.getAttribute('init');
               }
               
            var url=ayralConfig.getAbsoluteURL(targetUri);
            var ref=new ayralHttpRequest();
            ref.onreadystatechange=function(){
               if(ref.readyState==4){
                    return true;
               }
             };
             ref.open("POST",url);
             ref.send();
               
           }catch(err){
               return false;
           }

        }else{
             return false;
       }
    };
    ayral.refresh=function(){
       if(ayral.element.hasAttribute('src') || ayral.element.hasAttribute('init')){
           var targetUri='';
           if(ayral.element.hasAttribute('src')){
              targetUri= ayral.element.getAttribute('src');
           }if(ayral.element.hasAttribute('init')){
              targetUri= ayral.element.getAttribute('init');
           }
           
           var url=ayralConfig.getAbsoluteURL(targetUri);
           ayralConfig.prepareNavigation(ayral.element,':/'+url);
           return true;
       }else{
         return false;
       }
    }; 
    ayral.setError=function(){
        if(preBgColor==''){
          preBgColor=this.getStyle('background-color');
        }
        if(preBorderColor==''){
          preBorderColor=this.getStyle('border-color');
        }
        ayral.element.parentElement.style.borderColor='#d9534f';
        ayral.element.style.borderColor='#d9534f';
        ayral.element.focus();
    };

    ayral.removeError=function(){
        ayral.element.parentElement.style.borderColor='#b7b7b7';
        ayral.element.style.borderColor='#b7b7b7';
    };
    ayral.remove=function(){
        ayral.element.outerHTML='';
    }; 
    ayral.replace=function(html){
        ayral.element.outerHTML=html;
    };
    ayral.clear=function(){
        ayral.element.innerHTML='';
    }; 
    ayral.URL=function(){
      return  URL.createObjectURL(ayral.element); 
    };
   
 return ayral;
}
function print(value){
   console.log(value);
  return true;
}
function printError(error){
   ayral.printError(error);
   return true;
}
function count(value){
  if(value!=='' && typeof value!== typeof undefined && value!==null){
    return value.length;
  }
}
function lower(value){
    if(value!=='' && value!==null && typeof value !== typeof undefined){
       if(typeof value !== 'string'){
           if(value instanceof HTMLInputElement){
               return (value.value.toLowerCase());
           }else{
             return (value.innerHTML.toLowerCase());
           }
       }else{
             if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                  return (absValue.value.toLowerCase());
               }
              else{
                return (absValue.innerHTML.toLowerCase());  
              }
            }else{
               return (value.toLowerCase());  
            }
       }
    }else{
      ayral.printError('Ayral: lower require at list 1 parameter'); 
    }
}
function capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function upper(value){
    if(value!=='' && value!==null && typeof value !== typeof undefined){
       if(typeof value !== 'string'){
           if(value instanceof HTMLInputElement){
               return (value.value.toLowerCase());
           }else{
             return (value.innerHTML.toUpperCase());
           }
       }else{
             if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                  return (absValue.value.toUpperCase());
               }
              else{
                return (absValue.innerHTML.toUpperCase());  
              }
            }else{
               return (value.toUpperCase());  
            }
       }
    }else{
      ayral.printError('Ayral: lower require at list 1 parameter'); 
    }
}
//email address regex
function isMail(value){  
    if(value!=='' && value!==null && typeof value !== typeof undefined){
       if(typeof value !== 'string'){

           if(value instanceof HTMLInputElement){
              return emailRegex.test(value.value);
          
           }else{
             return emailRegex.test(value.innerHTML);
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                 return emailRegex.test(absValue.value);
               }
              else{
                return emailRegex.test(absValue.innerHTML);  
              }
            }else{
               return emailRegex.test(value);   
            }
       }
    }else{
        ayral.printError('Ayral: isMail require at list 1 parameter');
    }                                           
};
function notMail(value){
    if(value!=='' && value!==null && typeof value !== typeof undefined){

        if(typeof value !== 'string'){
            
           if(value instanceof HTMLInputElement){
                if(emailRegex.test(value.value)==false){
                    return true;
                }else{
                    return false;
                }
           }else{  
                if(emailRegex.test(value.innerHTML)==false){
                    return true;
                }else{
                    return false;
                }
            }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                    if(emailRegex.test(absValue.value)==false){
                        return true;
                    }else{
                        return false;
                    }
               }
              else{
                if(emailRegex.test(absValue.innerHTML)==false){
                    return true;
                }else{
                    return false;
                }
              }
            }else{
               if(emailRegex.test(value)==false){
                    return true;
                }else{
                    return false;
                }   
            }
       }
    }else{
        ayral.printError('Ayral: notMail require at list 1 parameter');
    } 
    
};
//password regex
function isPassword(value){
    if(value!=='' && value!==null && typeof value !== typeof undefined){
         if(typeof value !== 'string'){
             
           if(value instanceof HTMLInputElement){
              return passwordRegex.test(value.value); 
          
           }else{
             return passwordRegex.test(value.innerHTML);
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
               if(absValue instanceof HTMLInputElement){
                 return passwordRegex.test(absValue.value);
               }
              else{
                return passwordRegex.test(absValue.innerHTML);
              }
            }else{
               return passwordRegex.test(value);  
            }
       }
    
    }else{
        ayral.printError('Ayral: isMail require at list 1 parameter');
    }  
};
function notPassword(value){
 if(value!=='' && value!==null && typeof value !== typeof undefined){   
     if(typeof value !== 'string'){
           if(value instanceof HTMLInputElement){
                if(passwordRegex.test(value.value)==false){
                    return true;
                }else{
                    return false;
                }
          
           }else{
                if(passwordRegex.test(value.innerHTML)==false){
                    return true;
                }else{
                    return false;
                }
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                   if(passwordRegex.test(absValue.value)==false){
                        return true;
                    }else{
                        return false;
                    }
               }
              else{
                 if(passwordRegex.test(absValue.innerHTML)==false){
                    return true;
                }else{
                    return false;
                }
              }
            }else{
                 if(passwordRegex.test(value)==false){
                    return true;
                }else{
                    return false;
                }  
            }
       }
 }else{
   ayral.printError('Ayral: notPassword require at list 1 parameter');   
 }
};
function isNumbers(value){
  if(value!=='' && value!==null && typeof value !== typeof undefined){
          if(typeof value !== 'string'){
             
           if(value instanceof HTMLInputElement){
                if(!(numberRegex.test(value.value))){
                       return false;
                }else{
                    return true;
                } 
           }else{
                if(!(numberRegex.test(value.innerHTML))){
                  return false;
                }else{
                    return true;
                } 
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                    if(!(numberRegex.test(absValue.value))){
                        return false;
                    }else{
                        return true;
                    } 
               }
              else{
                   if(!(numberRegex.test(absValue.innerHTML))){
                        return false;
                    }else{
                        return true;
                    } 
              }
            }else{
                   if(!(numberRegex.test(value))){
                        return false;
                    }else{
                        return true;
                    } 
            }
       }
    
  }else{
   ayral.printError('Ayral: isNumbers require at list 1 parameter');   
 }
};
function notNumbers(value){
  if(value!=='' && value!==null && typeof value !== typeof undefined){
        if(typeof value !== 'string'){     
           if(value instanceof HTMLInputElement){
                 if((numberRegex.test(value.value))){
                    return false;
                }else{
                    return true;
                }
          
           }else{
                if((numberRegex.test(value.innerHTML))){
                    return false;
                }else{
                    return true;
                }
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                    if((numberRegex.test(absValue.value))){
                        return false;
                    }else{
                        return true;
                    }
               }
              else{
                if((numberRegex.test(absValue.innerHTML))){
                    return false;
                }else{
                    return true;
                }
              }
            }else{
                if((numberRegex.test(value))){
                    return false;
                }else{
                    return true;
                }  
            }
       }
  }else{
   ayral.printError('Ayral: notNumbers require at list 1 parameter');   
 }
};
function isUrl(value){
  if(value!=='' && value!==null && typeof value !== typeof undefined){
         if(typeof value !== 'string'){     
           if(value instanceof HTMLInputElement){
                 if((urlRegex.test(value.value))){
                    return true;
                }else{
                    return false;
                }
          
           }else{
                if((urlRegex.test(value.innerHTML))){
                    return true
                }else{
                    return false;
                }
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                    if((urlRegex.test(absValue.value))){
                        return true;
                    }else{
                        return false;
                    }
               }
              else{
                if((urlRegex.test(absValue.innerHTML))){
                    return true
                }else{
                    return false;
                }
              }
            }else{
                if((urlRegex.test(value))){
                    return true
                }else{
                    return false;
                }  
            }
       }
  }else{
    ayral.printError('Ayral: isUrl require at list 1 parameter');   
  }
}
function notUrl(value){
  if(value!=='' && value!==null && typeof value !== typeof undefined){
        if(typeof value !== 'string'){     
           if(value instanceof HTMLInputElement){
                 if((urlRegex.test(value.value))){
                    return false;
                }else{
                    return true;
                }
          
           }else{
                if((urlRegex.test(value.innerHTML))){
                    return false;
                }else{
                    return true;
                }
           }
       }else{
            if(value.match(/^:/)){
                var absValue=value.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                    if((urlRegex.test(absValue.value))){
                        return false;
                    }else{
                        return true;
                    }
               }
              else{
                if((urlRegex.test(absValue.innerHTML))){
                    return false;
                }else{
                    return true;
                }
              }
            }else{
                if((urlRegex.test(value))){
                    return false;
                }else{
                    return true;
                }  
            }
       }
  }else{
   ayral.printError('Ayral: notNumbers require at list 1 parameter');   
 }
};
function isEmpty(selector){
  if(selector!==null && typeof selector !== typeof undefined){
        if(typeof selector !== 'string'){     
           if(selector instanceof HTMLInputElement){
              return selector.value=='';
           }else{
             return selector.innerHTML=='';
           }
       }else{
            if(selector.match(/^:/)){
                var absValue=selector.replace(/:/g,'');
                absValue=ayral.selfFind(absValue);
                
              if(absValue instanceof HTMLInputElement){
                   return absValue.value=='';
               }
              else{
                return absValue.innerHTML=='';
              }
            }else{
                return selector=='';
            }
       }
  }else{
    ayral.printError('Ayral: isEmpty require at list 1 parameter');   
 }
}
function notEmpty(selector){
  if(selector!==null && typeof selector !== typeof undefined){
        if(typeof selector !== 'string'){     
           if(selector instanceof HTMLInputElement){
              if(selector.value==''){
                  return false;
              }else{
                  return true;
              }
           }else{
             if(selector.innerHTML==''){
                  return false;
              }else{
                  return true;
              }
           }
       }else{
            if(selector.match(/^:/)){
                var absValue=selector.replace(/:/g,'');
                absValue=ayralDocument.querySelector(absValue);
                
              if(absValue instanceof HTMLInputElement){
                  if(absValue.value==''){
                      return false;
                  }else{
                      return true;
                  }
               }
              else{
                  if(absValue.innerHTML==''){
                      return false;
                  }else{
                      return true;
                  }
              }
            }else{
              if(selector.value==''){
                  return false;
              }else{
                  return true;
              }
            }
       }
  }else{
    ayral.printError('Ayral: isEmpty require at list 1 parameter');   
 }
};

function foreach(arrayObject,callback){
  for(curr=0; curr<arrayObject.length; curr++){
    callback(arrayObject[curr]);
  }  
}
var app=new Ayral(),
    ayral=new Ayral(),
    Toast=new ayralToastManagement();
    ayralConfig=new ayralconfiguration(),
    ayralConfig.packActivities();

function dialogRenderingInit(message,title,callback,type,dialogResult){
    var renderingTitle='Ayral Alert',renderingBody='Untitle';
    
   if(typeof message == 'string'  &&  typeof title!== 'string'){
       renderingBody=message;
   }
   if(typeof message == 'string' && typeof title=='string'){
       renderingTitle=title;
       renderingBody=message;
   }
   ayralConfig.renderAlert(renderingBody,renderingTitle,type);

    
   if(type=='-prompt' || type=='-input'){
       
        ayralDocument.getElementById(dialogResult).addEventListener('click',function(){
        var overlay=ayral.selfFind('#ayral-dialogOverlay'),
            dialog=ayral.selfFind('#ayral-dialogBox');

             if(callback!=='' && callback!==null &&  typeof callback !== typeof undefined){
                 callback({value:ayral.selfFind('#ayral-promptInput').value});
             }
             if(message!=='' && message!==null &&  typeof message !== typeof undefined && typeof message !=='string'){
                message({value:ayral.selfFind('#ayral-promptInput').value});
             }
             if(title!=='' && title!==null &&  typeof title !== typeof undefined && typeof title !=='string'){
                title({value:ayral.selfFind('#ayral-promptInput').value});
             }
          dialog.style.display='none';
          overlay.style.display='none';
       });
       
      ayral.selfFind('#ayral-promptDialogCancel').addEventListener('click',function(){
      var overlay=ayral.selfFind('#ayral-dialogOverlay'),
            dialog=ayral.selfFind('#ayral-dialogBox');

             if(callback!=='' && callback!==null &&  typeof callback !== typeof undefined){
                 callback(false);
             }
             if(message!=='' && message!==null &&  typeof message !== typeof undefined && typeof message !=='string'){
                message(false);
             }
             if(title!=='' && title!==null &&  typeof title !== typeof undefined && typeof title !=='string'){
                title(false);
             }
          dialog.style.display='none';
          overlay.style.display='none';
       });  
   }else if(type=='-confirm'){
        ayralDocument.getElementById(dialogResult).addEventListener('click',function(){
        var overlay=ayral.selfFind('#ayral-dialogOverlay'),
            dialog=ayral.selfFind('#ayral-dialogBox');

             if(callback!=='' && callback!==null &&  typeof callback !== typeof undefined){
                 callback({code:1,status:"yes"});
             }
             if(message!=='' && message!==null &&  typeof message !== typeof undefined && typeof message !=='string'){
                message({code:1,status:"yes"});
             }
             if(title!=='' && title!==null &&  typeof title !== typeof undefined && typeof title !=='string'){
                title({code:1,status:"yes"});
             }
          dialog.style.display='none';
          overlay.style.display='none';
       });
       
      ayral.selfFind('#ayral-confirmDialogNo').addEventListener('click',function(){
      var overlay=ayral.selfFind('#ayral-dialogOverlay'),
            dialog=ayral.selfFind('#ayral-dialogBox');

             if(callback!=='' && callback!==null &&  typeof callback !== typeof undefined){
                 callback({code:0,status:"no"});
             }
             if(message!=='' && message!==null &&  typeof message !== typeof undefined && typeof message !=='string'){
                message({code:0,status:"no"});
             }
             if(title!=='' && title!==null &&  typeof title !== typeof undefined && typeof title !=='string'){
                title({code:0,status:"no"});
             }
          dialog.style.display='none';
          overlay.style.display='none';
       });
   }else{
       ayralDocument.getElementById(dialogResult).addEventListener('click',function(){
        var overlay=ayral.selfFind('#ayral-dialogOverlay'),
            dialog=ayral.selfFind('#ayral-dialogBox');

             if(callback!=='' && callback!==null &&  typeof callback !== typeof undefined){
                 callback({code:1,status:"yes"});
             }
             if(message!=='' && message!==null &&  typeof message !== typeof undefined && typeof message !=='string'){
                message({code:1,status:"yes"});
             }
             if(title!=='' && title!==null &&  typeof title !== typeof undefined && typeof title !=='string'){
                title({code:1,status:"yes"});
             }
          dialog.style.display='none';
          overlay.style.display='none';
       }); 
   }
}

ayralDocument.body.addEventListener('click',function(e){

    try{
        var target=e.target;   
        ayralConfig.disableDrawers();
        
        if(target.hasAttribute('actas') || target.parentElement.hasAttribute('actas')){
            
            if(target.getAttribute('actas')=='menu' || target.getAttribute('actas')=='option' || target.getAttribute('actas')=='menu-item' || target.getAttribute('actas')=='tabs-item'||target.getAttribute('actas')=='list-item'|| target.getAttribute('actas')=='overlay'){
               ayralConfig.disableDrawers();
            }
            
            if(target.getAttribute('actas')==='tab' || target.parentElement.getAttribute('actas')==='tab' || target.getAttribute('actas')==='tabs-item' || target.parentElement.getAttribute('actas')==='tabs-item' || target.getAttribute('actas')=='overlay'){
                var app=null;
                
                if(target.getAttribute('actas')=='tab') { app=target; } 
                if(target.getAttribute('actas')=='tabs-item') { app=target; }
                if(target.parentElement.getAttribute('actas')=='tab') { app=target.parentElement; }
                if(target.parentElement.getAttribute('actas')=='tabs-item') { app=target.parentElement; } if(target.getAttribute('actas')=='overlay') { app=target; }
                
                ayralConfig.disableTabs();
                if(app!==null){
                    app.setAttribute('state','active');
                }   
            }            
        }
    
        if(target.hasAttribute('target') || target.parentElement.hasAttribute('target')){
            var targetUri='';        
            if(target.parentElement.hasAttribute('target')){
              targetUri=target.parentElement.getAttribute('target');
            }else{
              targetUri=target.getAttribute('target');
            }
            ayralConfig.prepareNavigation(target,targetUri);
        }
    }catch(err){
      //  ayral.printError('Ayral: '+err);
    }
});
  

foreach(ayralElements,function(currElem){
    
       /****SWIPE EVENT****/ 
    if(currElem.hasAttribute('onswipe')){
        
        if(currElem.getAttribute('onswipe')!=='' && currElem.getAttribute('onswipe')!==null && typeof currElem.getAttribute('onswipe')!== typeof undefined){
        
            var xDown = null;                                                        
            var yDown = null; 
            var fn=currElem.getAttribute('onswipe');
            
            currElem.addEventListener('touchstart', function(event){
                xDown = event.touches[0].clientX;                                      
                yDown = event.touches[0].clientY;     
            });     
            
            currElem.addEventListener('touchmove', function(event){
                    if( ! xDown || ! yDown ) {
                        return;
                    }
                    var xUp = event.touches[0].clientX;                                    
                    var yUp = event.touches[0].clientY;

                    var xDiff = xDown - xUp;
                    var yDiff = yDown - yUp;

                    if(Math.abs( xDiff ) > Math.abs( yDiff )){
                          var asbFN=fn.substring(fn.indexOf('('),0);
        
                          if (xDiff > 0 ) {
                             window[asbFN]('right');
                          } else {
                            window[asbFN]('left');
                          }    
                        
                    }
                    xDown = null;
                    yDown = null;  
            }, false); 
        }
    }
    try{
     /****TEMPLATING****/ 
      if(currElem.hasAttribute('init')||currElem.hasAttribute('import')){
          
          var initUri='';
          if(currElem.hasAttribute('init')){
             initUri =currElem.getAttribute('init');
          }
          if(currElem.hasAttribute('import')){
             initUri =currElem.getAttribute('import');
          }
        
          if(initUri!=='' && initUri!=null && initUri!=='self' && initUri!=='false' && initUri!=='0'){
              
              if(initUri.match(/^\[$/) && initUri.match(/]$/)){
                  var absUri=initUri.substring(initUri.indexOf('[')+1,initUri.length-1),
                      newLayout=ayral.findAyral('actas',absUri);
              }
              else{
                    if(currElem.hasAttribute('sync')){
                        var sync=currElem.getAttribute('sync');
                        if(sync=='true' || sync==true){
                            var interval=1000;
                            if(currElem.hasAttribute('interval')){
                              interval=Number(currElem.getAttribute('interval'));
                            }
                            new Ayral().loadContentTo(currElem,initUri); 
                            setInterval(function(){
                               new Ayral().loadContentTo(currElem,initUri);  
                            },interval);
                        }
                    }else{
                       new Ayral().loadContentTo(currElem,initUri);  
                    }
              }
          }
      }
      
       /****SMARTNESS****/ 
}catch(err){
      if(err.toString().match(/Cannot read property/)){
        ayral.printError('Ayral: Target object not found');
      }else{
           ayral.printError('Ayral:'+err);
      }
  }  
});
foreach(ayralInput,function(currElem){
    if(currElem.hasAttribute('icon')){

       if(currElem instanceof HTMLInputElement || currElem instanceof HTMLTextAreaElement){
           currElem.classList.add('field');
           var backupElem=currElem.outerHTML,
               iconURI=currElem.getAttribute('icon'),
               absIconURI=iconURI;
          
           if(iconURI!=='' && iconURI!==null && typeof iconURI !== typeof undefined){
                if(iconURI.match(/^fa fa-/)){
                   absIconURI='<i class="icon '+iconURI+'"></i>';
                }
                else if(iconURI.match(/.jpg$/) || iconURI.match(/.jpeg$/) || iconURI.match(/.png$/)|| iconURI.match(/.gif/)){
                   absIconURI='<img class="icon" src="'+iconURI+'"></img>';      
                }else{
                   iconURI=iconURI.replace(/ /g,'');
                   absIconURI='<i class="icon icon-'+iconURI+'"></i>';  
                }
               currElem.outerHTML='<div class="input-container">'+absIconURI+' '+backupElem+'</div>';
           }
           
       }       
    }
});
foreach(ayralSelect,function(currElem){
    
    if(currElem.hasAttribute('icon')){
       if(currElem instanceof HTMLSelectElement){
           currElem.classList.add('field');
           var backupElem=currElem.outerHTML,
               iconURI=currElem.getAttribute('icon'),
               absIconURI=iconURI;
          
           if(iconURI!=='' && iconURI!==null && typeof iconURI !== typeof undefined){
                if(iconURI.match(/^fa fa-/)){
                   absIconURI='<i class="icon '+iconURI+'"></i>';
                }
                else if(iconURI.match(/.jpg$/) || iconURI.match(/.jpeg$/) || iconURI.match(/.png$/)|| iconURI.match(/.gif/)){
                   absIconURI='<img class="icon" src="'+iconURI+'"></img>';      
                }else{
                   iconURI=iconURI.replace(/ /g,'');
                   absIconURI='<i class="icon icon-'+iconURI+'"></i>';  
                }
               currElem.outerHTML='<div class="input-container">'+absIconURI+' '+backupElem+'</div>';
           }
           
       }       
    }
});
foreach(ayralImport,function(currElem){
     if(ayralUnknown.indexOf(currElem.tagName>-1)){
        try{
            if(currElem.hasAttribute('src')){
              absUri=currElem.getAttribute('src');
                
              if(currElem.hasAttribute('sync')){
                  var sync=currElem.getAttribute('sync');
                  if(sync=='true' || sync==true){
                      var interval=1000;
                      if(currElem.hasAttribute('interval')){
                        interval=Number(currElem.getAttribute('interval'));
                      }
                      new Ayral().loadContentTo(currElem,absUri); 
                      setInterval(function(){
                         new Ayral().loadContentTo(currElem,absUri);  
                      },interval);
                  }
              }else{
                new Ayral().loadContentTo(currElem,absUri);  
              }
            } 
       }catch(err){
          ayral.printError('Ayral:'+err);
       }
    }
 });
foreach(ayralIcon, function(currElem){
    if(ayralUnknown.indexOf(currElem.tagName>-1)){
      var icon=currElem.getAttribute('icon');
        if(upper(currElem.tagName)!=='INPUT' && upper(currElem.tagName)!=='TEXTAREA'){
            var iconURI=icon;
            if(icon.match(/fa-/g)){
                if(icon.match(/ /g)){
                   iconURI=icon.substring(3,icon.length);
                }
                currElem.classList.add('fa');
                currElem.classList.add(iconURI);
            }else{
                currElem.classList.add('icon-'+iconURI);   
            }
        }
    }
});
foreach(ayralTransition, function(currElem){
    if(ayralUnknown.indexOf(currElem.tagName>-1)){
       if(currElem.hasAttribute('transition')){
         var tran=currElem.getAttribute('transition');
         currElem.classList.add('animated'); 
         currElem.classList.add(tran);
       }
    }
});
foreach(ayraltoggle,function(currElem){
  elementName=elemenID=elementClass=elementActas=elementShape='ayral-toggle';    
  currElem.hasAttribute('name')?elementName=currElem.getAttribute('name'):'ayral-toggle';
  currElem.hasAttribute('class')?elementClass=currElem.getAttribute('class'):'ayral-toggle';
  currElem.hasAttribute('id')?elemenID=currElem.getAttribute('id'):'ayral-toggle';    
  currElem.hasAttribute('actas')?elementActas=currElem.getAttribute('actas'):'ayral-toggle';
  currElem.hasAttribute('shape')?elementShape=currElem.getAttribute('shape'):'ayral-toggle';  
  
  currElem.removeAttribute('class');
  currElem.removeAttribute('actas');
  currElem.removeAttribute('id'); 
  currElem.removeAttribute('name');
  
  currElem.innerHTML='<label actas="switch"><input type="checkbox" id="'+elemenID+'" name="'+elementName+'" actas="'+elementActas+'"><span actas="slider" class="'+elementClass+'" shape="'+elementShape+'"></span></label>';
    
 });
foreach(ayralCheckbox,function(currElem){
  var value=currElem.innerHTML,
  elementName=elemenID=elementClass=elementActas='ayral-checkbox';    
  currElem.hasAttribute('name')?elementName=currElem.getAttribute('name'):'ayral-checkbox';
  currElem.hasAttribute('class')?elementClass=currElem.getAttribute('class'):'ayral-checkbox';
  currElem.hasAttribute('id')?elemenID=currElem.getAttribute('id'):'ayral-checkbox';    
  currElem.hasAttribute('actas')?elementActas=currElem.getAttribute('actas'):'ayral-checkbox';  
  currElem.hasAttribute('selected')?elementSelected=currElem.getAttribute('selected'):'ayral-checkbox';  
 
  currElem.removeAttribute('class');
  currElem.removeAttribute('actas');
  currElem.removeAttribute('id'); 
  currElem.removeAttribute('name');

  currElem.innerHTML='<label actas="checkbox-container"><input type="checkbox" id="'+elemenID+'" name="'+elementName+'" actas="'+elementActas+'"><span actas="checkmark" class="'+elementClass+'"></span>'+value+'</label>';
 });

foreach(ayralRadio, function(currElem){
  var value=currElem.innerHTML,elementChecked='false';
  elementName=elemenID=elementClass=elementActas='ayral-checkbox';    
  currElem.hasAttribute('name')?elementName=currElem.getAttribute('name'):'ayral-checkbox';
  currElem.hasAttribute('class')?elementClass=currElem.getAttribute('class'):'ayral-checkbox';
  currElem.hasAttribute('id')?elemenID=currElem.getAttribute('id'):'ayral-checkbox';    
  currElem.hasAttribute('actas')?elementActas=currElem.getAttribute('actas'):'ayral-checkbox';  
   currElem.hasAttribute('checked')?elementChecked=currElem.getAttribute('checked'):'ayral-checkbox';  
 
  currElem.removeAttribute('class');
  currElem.removeAttribute('actas');
  currElem.removeAttribute('id'); 
  currElem.removeAttribute('name');
    
  if(elementChecked=='true'){
      currElem.innerHTML='<label actas="radio-container" ><input checked="true" type="radio" id="'+elemenID+'"  actas="'+elementActas+'"><span actas="checkmark" '+elementChecked+'="true" class="'+elementClass+'"></span>'+value+'</label>';
  }else{     
      currElem.innerHTML='<label actas="radio-container" ><input type="radio" id="'+elemenID+'" name="'+elementName+'" actas="'+elementActas+'"><span actas="checkmark" '+elementChecked+'="true" class="'+elementClass+'"></span>'+value+'</label>';
  }
});
ayralWindow.onhashchange = function(e) {
    if(typeof window.location.hash !== 'undefined' && window.location.hash!==''){
        var uri=ayralWindow.location.hash;
        uri=uri.substr(1,uri.length);
        ayralConfig.prepareActivity(uri);
    }else{
        var masterActivity=ayral.selfFind('[actas=activity][master=true]')[0];
        if(masterActivity){
           ayralConfig.packActivities();
           LogoLayerInit();
           ayral.show(masterActivity);
        }
    }
}