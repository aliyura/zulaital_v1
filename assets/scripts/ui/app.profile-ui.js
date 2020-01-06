function sayayyaProfiles(){
    
    this.createProfile=function(profile){
        
        var layer=app.find('$profileView');
        layer.setAttribute('text-align','left');
        layer.render(loader);

        var editorTrigger1='',
            editorTrigger2='';
        
      profile.dp=profile.dp.toString().replace('..','');
      if(profile.dp.startsWith('/')){
         profile.dp=hostname+profile.dp;
      } 

      if(profile.profile==1){
          editorTrigger2=`
            <div class="wrapper">
              <button type="button" class="profile-todo danger ripple" state="inactive"><i class="icon icon-phone"></i></button> 
              <button type="button"  target="$editProfileActivity"  class="profile-todo danger ripple"><i class="icon-pencil"></i> Edit Profile</button>
              <button type="button" target="$cartActivity" class="profile-todo danger ripple"><i class="icon-basket"></i> My Cart</button>
            </div>`;
      }
      if(profile.profile==2){
          editorTrigger2=`
            <div class="wrapper">
              <button type="button" class="profile-todo danger ripple" state="inactive"><i class="icon icon-phone"></i></button> 
              <button type="button" target="$cartActivity" class="profile-todo danger ripple"><i class="icon-plus"></i> Add New Item</button>
              <button type="button"  target="$editProfileActivity"  class="profile-todo danger ripple"><i class="icon-pencil"></i> Edit Profile</button>
            </div>`;
      }

      layer.render(`
       <div actas="panel" class="profile-header profilePhoto_bg" text-align="center" style="background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.72)),url(`+profile.dp+`);">
            <div actas="content" class="profile-photo-wrp">
            `+editorTrigger1+`
                <img class="profilePhoto-view" src="`+profile.dp+`" width="110px" height="110px" shape="circle" onerror="profilePhotoError(this)" onclick="showImage(this);">
                <h4>`+profile.name+`</h4>
                <span target="map:`+profile.city+`"><i class="icon-location-pin"></i>`+profile.city+`</span>
            </div>
        </div>
        <div actas="panel" class="profile-info-list">
            <div actas="content">
                <div actas="data" class="data-list next">
                    <div class="data">
                        <div class="inner-data-ico"><i class="icon-user"></i></div>
                        <div class="inner-data"> `+profile.username+`</div>
                      </div> 
                </div> 
                <div actas="data" class="data-list">
                   <div class="data">
                      <div class="inner-data-ico" target="tel:`+profile.mobile+`"><i class="icon-phone"></i> </div>
                      <div class="inner-data"> (+234) `+profile.mobile+`</div>
                    </div>
                </div>
                <div actas="data" class="data-list next">
                    <div class="data">
                        <div class="inner-data-ico" target="mailto:`+profile.email+`">
                            <i class="icon-envelope"></i></div>
                        <div class="inner-data"> `+profile.email+`</div>
                      </div> 
                </div> 

                <div actas="data" class="data-list">
                   <div class="data">
                       <div class="inner-data-ico" target="map:`+profile.address+`"><i class="icon-home"></i></div>
                       <div class="inner-data"> `+profile.address+`</div>
                    </div>
                </div> 
                <div actas="data" class="data-list next">
                    <div class="data">
                      <div style="min-height:100px; max-height:300px; overflow-y:auto"> `+profile.description+`</div>
                    </div>
                </div>
            </div>
        </div>
       `+editorTrigger2);   
      }

};
function otherProfile(otherID){
     var layer=app.find('$profileView');
         layer.setAttribute('text-align','left');

       var profileHistory=storage.getItem('profile_'+otherID);
       if(profileHistory!=null && profileHistory!='null' && profileHistory!='' && typeof profileHistory != typeof undefined){
            profileHistory=JSON.parse(profileHistory);
            new sayayyaProfiles().createProfile(profileHistory);
        }
       else{
         layer.render(loader);
          var url=hostname+'/server/ui/app.profile-ui.php?request=2&id='+session+'&other='+otherID,
              httpReq=new ayralHttpRequest('GET',url,'default',true);
                httpReq.execute(function(response){
                if(response!='progress'){
                     try{
                       var result=response.target.responseText;
                       if(result.match(/success:/)){
                             var profileDetails=result.substr(result.indexOf(':')+1,result.length);
                             var profile = JSON.parse(profileDetails);
                           
                             new sayayyaProfiles().createProfile(profile);
                             storage.setItem('profile_'+profile.id, JSON.stringify(profile));
                       }else{
                            layer.render(`
                               <div type="button" class="RetryActivity-trigger">
                                 <img src="assets/images/error.png" class="activityViewError"/> 
                                 <p>Not Available </p>
                               </div>
                           `);
                       }
                    }catch(error){
                        layer.render(`
                           <button type="button" class="RetryActivity-trigger"  url="`+url+`" onclick="RetryActivity(this,'03');">
                            <img src="assets/images/error.png" class="activityViewError"/> 
                            <p>Connection Failed<br/><b>Try Again</b></p>
                          </button>`);
                    }
                }
            });
       }
  app.render('$profileActivity');    
}
function myProfile(triggered){
    var layer=app.find('$profileView');
     layer.setAttribute('text-align','left');

    if(triggered==1){
      app.render('$profileActivity');
      layer.render(loader);
    }
    if(sessionExist){
      new sayayyaProfiles().createProfile(user);
    }else{
      layer.render(`
       <button type="button" class="RetryActivity-trigger" >
          <img src="assets/images/error.png" class="activityViewError"/> 
         <p>Not Available</p>
       </button>
     `);
    } 
}
myProfile();