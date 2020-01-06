var initialiBanners={
    "header":{
        "one":"Advertise Product",
        "two":"Buy & Sale Online",
        "three":"Google Integration"
    },
    "body":{
        "one":"You Have A Target, And We Will Help You Reach Them. We Can Deliver You A High Volume Of Sales At Zero Costs Completly Free",
        "two":"Stay On Top Of Everything, Even When You are Away. With Klassy Mall App Everything Is Posible, Buy And Sale Your Products With Your Smartphone",
        "three":"We Offer Search Engine Integration To Our High Value Businesses, To Be Visible On Clients Global Search On Google And Social Media Platforms."
    },
    "banner":{
        "one":"/assets/ads/banner1.jpg",
        "two":"/assets/ads/banner2.jpg",
        "three":"/assets/ads/banner3.jpg"
    }           
}
function LogoLayerInit(){
   Prepare('$appLogo-view').render(`
    <app-name style="font-size:16px;">
     <div class="logo-btn" target="redirectBack(this);">
      
       <div class="actionbar-favicon">
          <img src="assets/images/ico.png" class="faviconLogo-img">
       </div>
       <span class="title">Klassy <b style="color:#2ecc71; font-weight:bold">M</b>all</span>
     </div>
    </app-name>
   `);
}
function ExploreLayerInit(uri){
    
    var title=uri.replace(/Activity/,'');
       title=capitalize(title);
    
    if(title=='Sell'){
        title='Add New Item';
    }
    if(title=='Cart'){
        title='My Cart';
    }  
    if(title=='PayAtBank'){
        title='Pay At Bank';
    } 
    if(title=='PayOnline'){
        title='Pay Online';
    }  
    if(title=='TransferPayment'){
        title='Pay by Transfer';
    } 
    if(title=='Payment'){
        title='Add Payment';
    }
    if(title=='PaymentCanceled'){
        title='Payment Canceled';
    } 
    if(title=='PaymentFailed'){
        title='Payment Failed';
    } 
    if(title=='PaymentSuccessful'){
        title='Transection Successful';
    } 
    
    Prepare('$appLogo-view').render(`
   <app-name style="font-size:16px;">
    <div class="explore-btn" target="redirectBack(this);">
     
      <div class="actionbar-backbtn">
         <i class="fa fa-angle-left"></i>
      </div>
      <span class="title">`+title+`</span>
    </div>
    </app-name>
   `);
}

function AdvertManager(){

    this.createAdvert=function(item,type){
       var layer=Prepare('$slideBannerLayer'),
           path=hostname;

            print(type);
      if(type==false){
          path='';  
      }
        
      if(sessionExist){
            //SIGNED BANNER
          var template=``;
          if(user.profile=='2'){
              template=`
                <button type="button" target="$sellActivity" class="ripple"><i icon="plus"></i> Add New Item</button>`; 
          }else{
               template=`
                <button type="button" onclick="loadGeneralProducts('OPEN');" style="text-transform:none"class="ripple"> <b><span class="" style="background-color:#333;padding:5px; border-radius:99px; padding-top:0; padding-bottom:0; color:#fff"> <i class="fa fa-check" style="font-size:12px;"></i></span></b> Shop Now</button>`;
          }

           layer.render(`
             <div class="item active">
             <img class="first-slide" src="`+path+item.banner.one+`" onerror="onBannerError(this);" alt="First slide">
             <div class="container">
                 <div class="carousel-caption">
                      <h1>`+item.header.one+`</h1>
                        <p>`+item.body.one+`</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <img class="second-slide" src="`+path+item.banner.two+`" onerror="onBannerError(this);"  alt="Second slide">
                <div class="container">
                    <div class="carousel-caption">
                        <h1>`+item.header.two+`</h1>
                        <p>`+item.body.two+`</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <img class="third-slide" src="`+path+item.banner.three+`" onerror="onBannerError(this);"  alt="Third slide">
                <div class="container">
                    <div class="carousel-caption">
                        <h1>`+item.header.three+`</h1>
                        <p>`+item.body.three+`</p>
                    </div>
                </div>
            </div>
           <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
           <span class="glyphicon fa fa-chevron-left" aria-hidden="true"></span>
           <span class="sr-only">Previous</span>
           </a>
           <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
               <span class="glyphicon fa fa-chevron-right" aria-hidden="true"></span>
               <span class="sr-only">Next</span>
           </a>
             <div actas="layout" class="login-sigup-layout" style="text-align:center; padding-left:5%;color:#d9534f;">
                `+template+`
             </div>
             <div class="clearfix"> </div>
             </div>
             </div>
             `);
      }
      else{
           //BANNER
         layer.render(`
             <div class="item active">
             <img class="first-slide" src="`+path+item.banner.one+`" onerror="onBannerError(this);" alt="First slide">
             <div class="container">
                 <div class="carousel-caption">
                      <h1>`+item.header.one+`</h1>
                        <p>`+item.body.one+`</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <img class="second-slide" src="`+path+item.banner.two+`" onerror="onBannerError(this);"  alt="Second slide">
                <div class="container">
                    <div class="carousel-caption">
                        <h1>`+item.header.two+`</h1>
                        <p>`+item.body.two+`</p>
                    </div>
                </div>
            </div>
            <div class="item">
                <img class="third-slide" src="`+path+item.banner.three+`" onerror="onBannerError(this);"  alt="Third slide">
                <div class="container">
                    <div class="carousel-caption">
                        <h1>`+item.header.three+`</h1>
                        <p>`+item.body.three+`</p>
                    </div>
                </div>
            </div>
            <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
            <span class="glyphicon fa fa-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                <span class="glyphicon fa fa-chevron-right" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
            <div actas="layout" class="login-sigup-layout" style="text-align:center; padding-left:5%;color:#d9534f;">  
            <div actas="wrapper" class="loginOrRegister-wrapper">
            <button type="button" class="ripple" target="logout('1');"> Register  &nbsp;</button>|
            <button type="button" class="ripple" target="logout();"> &nbsp;Login</button> 
            </div>
            </div>	
            `); 
         }
        storage.setItem('banner',JSON.stringify(item)); //saved for feature use
    }
}
ayral.prepare(function(){
    //get active language
var initialLanguage=storage.getItem('language'),
    oldIBanners=storage.getItem('banner');

angular.controller('main', function ($scope, $sce) {    
        
    if(sessionExist){
        //ACTIONBAR
        if(user.profile=='2'){
            $scope.actionBarLayer=$sce.trustAsHtml(`
               <div actas="logo-view" name="appLogo-view" target="$categoryActivity" style="margin-top:-5px;">
               <app-name style="font-size:16px;">
                 <div class="logo-btn" target="redirectBack(this);">
                   <div class="actionbar-favicon">
                      <img src="assets/images/ico.png" class="faviconLogo-img">
                   </div>
                   <span class="title">Zulai<b style="color:#2ecc71; font-weight:bold;">tal</b></span>
                 </div>
                </app-name>
               </div>
               <ul actas="option-bar" class="option-bar" position="right" style="margin-top:-4px">
                 <div actas="option" target="$sellActivity">
                     <i class="icon-plus" style="font-size:22px;"></i>
                  </div> 
                  <div actas="option" target="#myDrawer" style="margin-top:-1px">
                      <i class="icon-options-vertical" name="drawerTrigger"></i>
                  </div>
               </ul>
            `);
        }else{
         $scope.actionBarLayer=$sce.trustAsHtml(`
           <div actas="logo-view" name="appLogo-view" target="$categoryActivity" style="margin-top:-5px;">
            <app-name style="font-size:16px;">
             <div class="logo-btn" target="redirectBack(this);">
               <div class="actionbar-favicon">
                  <img src="assets/images/ico.png" class="faviconLogo-img">
               </div>
               <span class="title">Zulai<b style="color:#2ecc71; font-weight:bold;">tal</b></span>
             </div>
            </app-name>
           </div>
           <ul actas="option-bar" class="option-bar" position="right" style="margin-top:-4px">
             <div actas="option" onclick="prepareCartActivity(1);">
                 <span actas="badge" class="success notificationBadge" name="cartNotification-counter" state="0">0</span>
                 <i class="icon-handbag" style="font-size:22px;"></i>
              </div> 
              <div actas="option" target="#myDrawer" style="margin-top:-1px">
                  <i class="icon-options-vertical" name="drawerTrigger"></i>
              </div>
           </ul>
        `);
        }
        
        var template=``;
        if(user.profile=='2'){
            template=`
                  <li actas="menu-item"  target="$sellActivity">
                        <i class="icon-plus"></i> Add New Item
                   </li>
                    <li actas="menu-item" target="showProducts(1);">
                        <i class="icon-handbag"></i> Manage Products
                   </li>`;
        }else{
           template=`
                   <li actas="menu-item"  onclick="ordersActivity(1,1);" >
                     <i class="icon-bag"></i> Manage Orders
                   </li> `;  
        }
        
        //DRAWER
        $scope.drawerLayer =$sce.trustAsHtml(`
         <!-- *** DRAWER START****   !-->
         <section actas="drawer" class="user-drawer" name="myDrawer" position="left" state="inactive">
            <div actas="layer">
             <div actas="panel" class="drawer-header"  text-align="center" target="myProfile(1);">
                 <img class="profilePhoto-view drawerProfilePhoto" src="`+user.dp+`" width="100" height="100" shape="circle" onerror="profilePhotoError(this)">
                 <h2>`+user.name+`</h2>
                 <span><i class="icon-location-pin"></i>`+user.city+`</span>
             </div>
             <ul actas="menu-view" class="menu-view menuList-layer">
                   <li actas="menu-item" target="$categoryActivity"><i class="icon-home"></i> Home</li>
                    <li actas="menu-item" onclick="prepareCartActivity(1);">
                     <i class="icon-handbag"></i> Cart</li>

                   <li actas="menu-item" onclick="loadGeneralProducts('OPEN');">
                   <i class="icon-basket"></i> Market</li>
                    <li actas="menu-item" target="$aboutActivity"><i class="icon-info"></i> About Us</li>
                        <li actas="menu-item" target="$contactActivity"><i class="icon-envelope"></i> Contact Us</li> 
                    <li actas="menu-item" target="$editProfileActivity">
                    <i class="icon-note"></i> Edit Profile</li> 
                    `+template+`
                     <li actas="menu-item" target="$complainActivity"><i class="icon-question"></i> Complain</li>
                   <li actas="menu-item" target="logout();"><i class="icon-login"></i> Logout</li> 
             </ul>
          </div>
         </section>
        `);
        
      //EDIT ROFILE
        $scope.editProfileLayer =$sce.trustAsHtml(`
           <div actas="panel" class="profile-header profilePhoto_bg" text-align="center" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+user.dp+`);" >
                <div actas="content" class="profile-photo-wrp">
                    <button type="button" class="editProfile-cameraChooser-btn" onclick="updateProfilePhoto(this);">
                    <img src="assets/images/camera.png"  style="border:none; box-shadow:none; -webkit-box-shadow:none;  margin:0; padding:0"></button></button>
                    <img class="profilePhoto-view" src="`+user.dp+`" width="110px" height="110px" shape="circle" onerror="profilePhotoError(this)" onclick="showImage(this);">
                    <h4>`+user.name+`</h4>
                    <span><i class="icon-location-pin"></i>`+user.city+`</span>
                </div>
            </div>
            <div actas="panel" class="profile-info-list editProfile-info">
                <div actas="content">
                    <div actas="data" class="data-list next">
                        <p class="heading">Name</p>
                        <input type="text" class="editProfile-input next capitalize" name="ep-name"  value="`+user.name+`">
                    </div> 
                    <div actas="data" class="data-list">
                        <p class="heading">Mobile</p>
                        <input type="tel" class="editProfile-input"  name="ep-number" maxlength="11" value="`+user.mobile+`">
                    </div>
                    <div actas="data" class="data-list next">
                        <p class="heading">Email</p>
                        <input type="email" class="editProfile-input next capitalize"  name="ep-email"  value="`+user.email+`">
                    </div> 
                    <div actas="data" class="data-list">
                        <p class="heading">Address</p>
                       <textarea class="editProfile-textarea capitalize"  name="ep-address" >`+user.address+`</textarea>
                    </div> 
                    <div actas="data" class="data-list next">
                        <p class="heading">About</p>
                        <textarea class="editProfile-textarea next" max-length="500"  name="ep-description" >`+user.description+`</textarea>
                    </div>
                    <div actas="data" class="data-list">
                        <div class="alert alert-warning warnningAlert"transition="shake" role="alert" >
                                  This is a warning alert—check it out!
                         </div>
                        <div class="alert alert-success successAlert " transition="shake" role="alert">
                                    This is a warning alert—check it out!
                         </div>
                    <div>
                    <div actas="data" class="data-list" style="text-align:right">
                        <button type="button" class="success saveProfile-editor-trigger ripple" onclick="updateProfileDetails(this);">Save Changes</button>
                    </div>
                </div>
            </div>
            <div class="wrapper"></div>
        `);
        
           $scope.tabsPanel =$sce.trustAsHtml(`
                 <ul actas="tabs-view" class="tabs-view bottomTabs-view ">
                        <li actas="tabs-item" target="$profileActivity"  class="menu-item"  name="businessTab">
                            <i class="icon-user" ></i>
                        </li>
                        <li actas="tabs-item" state="active" target="$categoryActivity" class="menu-item"   name="categoryTab">
                            <i class="icon-home" ></i>
                        </li>
                        <li actas="tabs-item"  onclick="loadGeneralProducts('1','OPEN');" ondblclick="loadGeneralProducts('OPEN');"  class="menu-item active"  name="marketTab">
                            <i class="icon-basket"></i>
                        </li>
                    </ul>
             `);


         }else{

            //ACTIONBAR
             $scope.actionBarLayer=$sce.trustAsHtml(`
             <div actas="logo-view" name="appLogo-view" target="$categoryActivity" style="margin-top:-3px;">
                
                <app-name style="font-size:16px;">
                <div class="logo-btn" target="redirectBack(this);">
                  <div class="actionbar-favicon">
                     <img src="assets/images/ico.png" class="faviconLogo-img">
                  </div>
                  <span class="title">Zulai<b style="color:#2ecc71; font-weight:bold">tal</b></span>
                </div>
                </app-name>
               </div>
               <ul actas="option-bar" class="option-bar" position="right">
                  <div actas="option" target="#myDrawer">
                      <i class="icon-options-vertical"></i>
                  </div>
               </ul>
            `);

             
            //DRAWER
            $scope.drawerLayer =$sce.trustAsHtml(`
                 <!-- *** DRAWER START****   !-->
                <section actas="drawer" class="user-drawer" name="myDrawer" position="left" state="inactive">
                 <div actas="layer">
                 <ul actas="menu-view" class="menu-view">
                       <li actas="menu-item" target="$categoryActivity" ><i class="icon-home"></i> Home</li>
                       <li actas="menu-item" onclick="loadGeneralProducts('OPEN');">
                        <i class="icon-basket"></i> Market</li>
                        <li actas="menu-item" target="$aboutActivity"><i class="icon-info"></i> About Us</li>
                        <li actas="menu-item" target="$contactActivity"><i class="icon-envelope"></i> Contact Us</li>     
                        <li actas="menu-item" target="logout();"><i class="icon-login"></i> Login</li> 
                 </ul>
                </div>
                 </section>
            `);
             $scope.tabsPanel =$sce.trustAsHtml(`
                 <ul actas="tabs-view" class="tabs-view bottomTabs-view ">
                        <li actas="tabs-item"  target="logout();"  class="menu-item"  name="businessTab">
                            <i class="icon-handbag" ></i>
                        </li>
                        <li actas="tabs-item" state="active" target="$categoryActivity" class="menu-item"   name="categoryTab">
                            <i class="icon-home" ></i>
                        </li>
                        <li actas="tabs-item"  onclick="loadGeneralProducts('1','OPEN');" ondblclick="loadGeneralProducts('OPEN');"  class="menu-item active"  name="marketTab">
                            <i class="icon-basket"></i>
                        </li>
                    </ul>
                `);
            }
    
    
            $scope.loadingBody =$sce.trustAsHtml(`
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
              </div>
            `);


            $scope.publishedActivity =$sce.trustAsHtml(`
                 <div actas="sign-view" class="info-view">
                 <div actas="container" style="padding:1em;padding-bottom: 10px;  margin-top:2em; color: #4caf50;
                  font-weight: bold">
                    <p><i class="fa fa-check"></i> Published Successfully</p>
                 </div>
                  <div actas="container" style="padding:1em;padding-bottom: 10px; text-align: left">
                    <span>The item has been published to market successfully.</span>
                  </div>
                   <div actas="footer" class="footer links">
                        <span actas="link" class="link"  target="$sellActivity"><i class="fa fa-plus"></i> Add More</span>
                        <span actas="link" class="link" onclick="loadGeneralProducts('OPEN');">Thanks</span>
                      </div>
                    </div>
                  </div>
                `);
             
      });
    

    //banner setup
    if(oldIBanners!=null && oldIBanners!='null' && oldIBanners!=''){
        
        oldIBanners=app.parse(oldIBanners);

        if(oldIBanners!=false){
          new AdvertManager().createAdvert(oldIBanners,true);
        }else{
          new AdvertManager().createAdvert(initialiBanners,false);
        }
    }else{
         new AdvertManager().createAdvert(initialiBanners,false);
    }

    var url=hostname+'/server/ui/app.advert-banners.php?request=1';
    var httpReq=new ayralHttpRequest('GET',url,'default',true);
    httpReq.execute(function(response){
        if(response!='progress'){
            try{
                var result=response.target.responseText;
                if(result.match(/:/)){
                  result=result.toString().replace(/,(?=[^,]*$)/, '');
                  var ads=app.parse(result);
                  if(ads!=false){
                    storage.setItem('banner',JSON.stringify(ads)); //saved for feature use
                  }else{
                       print('Unable to convert advert object'); 
                  }
                }else{
                   print('No Advert Available');
                }
            }
            catch(error){
                print(error);     
            }
        }
    }); 
});