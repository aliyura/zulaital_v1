var angular = angular.module('app',['ngSanitize']),
    initialLanguage=storage.getItem('language'),
    initialLocation=storage.getItem('location'),
    hostname= 'https://www.klassymall.com/app/',
    session=storage.getItem('session'), 
    launcher=storage.getItem('launch'),
    sessionExist=false,
    info=storage.getItem('info'),
    user=JSON.parse(info),
    loader=`
    <!--loader !-->
     <div class="loader loader--style2 activityLoader" title="1">
       <svg version="1.1" id="loader-1"  x="0px" y="0px"
          width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
       <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
         <animateTransform attributeType="xml"
           attributeName="transform"
           type="rotate"
           from="0 25 25"
           to="360 25 25"
           dur="0.6s"
           repeatCount="indefinite"/>
         </path>
       </svg>
     </div>`;

//prepare session 
if(session!=='' && session!==null && session!=='null' && typeof session !== typeof undefined && session.length>1){
    sessionExist=true;
}else{
    sessionExist=false;
}

if(initialLocation=='null' || initialLocation==null || typeof initialLocation == typeof undefined || initialLocation==''){
   storage.setItem('location','Nigeria');
}
Prepare('$app').setHeight(window.innerHeight+'px');


if($('#ayralApp')){
    $('#ayralApp').attrchange({
        trackValues: true, /* Default to false, if set to true the event object is 
                    updated with old and new value.*/
        callback: function (event) { 
          if(event.newValue=='disabled'){
              $('body').css('overflow-y','hidden');
              $('body').css('position','fixed');
              $(this).css('overflow-y','hidden');
          }else{
              $('.body').css('overflow-y','auto'); 
              $('body').css('position','relative');
              $(this).css('overflow-y','auto');
          }
        }
    });
}



if(!ayralWindow.location.href.match(/sign.html/)){
    if(launcher=='true'){
       Prepare('$app').setAttribute('state','active');
       Prepare('.launcher').hide();
    }else{ 
       Prepare('$app').setAttribute('state','inactive');
       Prepare('$launcher1View').show();
    }  
    
    if(sessionExist){
     Prepare('$o-prepared-name').setValue(user.name);
     Prepare('$o-prepared-address1').setValue(user.address);
    }
                                
}else{
    //sign in redirection
    var uri=window.location.hash;
    if(uri!='' && uri!=null && typeof uri !== typeof undefined){
       uri=uri.replace(/^#/,'$').toLowerCase();
       app.render(uri);
    }else{
       app.render('$signin'); 
    }
}

function onMapError(e){
  Prepare(e).setStyle('background', 'assets/images/no_sample_preview.jpg');
}
function onImageError(e){
  Prepare(e).setAttribute('src', 'assets/images/no_sample_preview.jpg');
}
function profilePhotoError(e){
  Prepare(e).setAttribute('src', 'assets/images/avatar.jpg');
}
function onBannerError(e){
  Prepare(e).setAttribute('src', 'assets/images/banner.jpg');
}
function previewTabsManager(e,tab,ownerId){
    foreach(app.find('$previewTabs-view').getChildren('section'),function(current){
      Prepare(current).hide();
    });
    app.find('.product-tabs').removeClass('active');
    app.find(e).addClass('active');
    app.find('$'+tab).show();
}

function warn(warnning){
    app.find('.warnningAlert').setHtml(warnning);
    app.find('.warnningAlert').show();
    setTimeout(function(){
        app.find('.warnningAlert').hide();
    },10000);
}
function notify(success){
    app.find('.successAlert').setHtml(success);
    app.find('.successAlert').show();
    setTimeout(function(){
        app.find('.successAlert').hide();
    },10000);
}
function closeAlert(){
 if(ayralWindow.document.querySelector('.ja_wrap')){
    ayralWindow.document.querySelector('.ja_wrap').outerHTML='';
 }
}
function revokeProgress(){
 if(ayralWindow.document.querySelector('.ja_wrap')){
    ayralWindow.document.querySelector('.ja_wrap').outerHTML='';
 }
}
function blockProgress(){
 imageAlert('assets/images/progressBar.gif','30');
 app.find('.ja_close').hide(); 
 app.find('.jAlert').hide();          
}

function logout(param){
 storage.setItem('session',null);
 storage.setItem('info',null);
 if(param!='' && param!=null && typeof param != typeof undefined){
     app.render('sign.html#signup');
 }else{
    app.render('sign.html#signin');
 }
}
