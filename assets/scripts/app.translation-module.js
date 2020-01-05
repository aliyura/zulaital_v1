var dictionary=new Dictionary({
    header:['-en','-ha'],
    data:[ 
    'Now','Yanzu','Login','Shiga','Items','Kayayyaki','Phones','Wayoyi','Phone','Waya','Mobiles','Wayoyi','mobile','Waya',
    'Vegetables','Kaynlambu','e.g','Kamarsu','Caps','Huluna','Food','Abinci','Lugagge','Kaya','Computers','Na`urori',
    'Bas','Jakunkuna','Sport','Kaynwasa','Electronics','Lantarki','Wears','Kaynsawa','Bag','Jaka','Cars','Motoci',
    'Shoes','Takalma', 'Shoe','Takalmi','Carpets','Shimfida','Register','Rajista','What','Menene',
    'Who','Waye','World','Dunia','Search','Binciko','Business','Kasuwa',
    'Businesess','Kasuwanni','New','Sabo','Used','Tsoho','Renting','Haya','All','Duka','Market','Kasuwa','Forgot','Manta',
    'Keep','Abar','Me','Ni','In','Aciki','Already','Dama','Have','Akwai','Have','Akwai','Bags','Jakunkuna','Change',
    'Chanja','Language','Yare','English','Turanci','Language','Yare','Product','Kaya','Products','Kayayyaki',
    'Advertise','Tallata', 'Ladies','Mata', 'Boy','Namiji', 'Boys','Maza', 'From','Daga','Whatches','Agoguna','Inners','Enciki','Accessories','Kaya','Kids','Yara','Fruits','Marmari','Houses','Gidaje','Land','Feelaye','Fabrics','Atamfofi'
    ]
}); 
function LanguageManager(language){
    this.initilize=function(){
        
          if(language=='HAUSA'){
              dictionary.translate('[*]','-en','-ha');
          }else{
            dictionary.translate('[*]','-ha','-en');
          }
          storage.setItem('language',language); //save selected language
         
        if(ayralWindow.location.href.match(/index.html/)){
             Prepare('.languageChange-trigger .check').setOpacity(0);
             Prepare('.languageChange-trigger').removeClass('active'); 
             Prepare('.languageChange-trigger').removeAttribute('disabled');
        
            
             if(language=='HAUSA'){
                Prepare('.languageChange-trigger.hausaLanguage .check').setOpacity(1);
                 Prepare('.languageChange-trigger.hausaLanguage').addClass('active'); 
                 Prepare('.languageChange-trigger.hausaLanguage').setAttribute('disabled','true');
             }else{
               Prepare('.languageChange-trigger.englishLanguage .check').setOpacity(1);   
                 Prepare('.languageChange-trigger.englishLanguage').addClass('active'); 
                 Prepare('.languageChange-trigger.englishLanguage').setAttribute('disabled','true');   
             }
        }
    }
}
var selectedLanguage='ENGLISH';

if(initialLanguage!='' && initialLanguage!='null' && initialLanguage!=null && typeof initialLanguage != typeof undefined){
    selectedLanguage=initialLanguage;     
}else{
   selectedLanguage='ENGLISH';
}

if(selectedLanguage=='HAUSA'){    
  new LanguageManager(selectedLanguage).initilize();
}else{
     Prepare('.languageChange-trigger .check').setOpacity(0);
     Prepare('.languageChange-trigger').removeClass('active');
     Prepare('.languageChange-trigger').removeAttribute('disabled');
        
     Prepare('.languageChange-trigger.englishLanguage .check').setOpacity(1);
     Prepare('.languageChange-trigger.englishLanguage').addClass('active');   
     Prepare('.languageChange-trigger.englishLanguage').setAttribute('disabled','true'); 
}

(function(){
    
    app.find('.languageChange-trigger').on('click',function(){
        var language=Prepare(this).getAttribute('lang');
        selectedLanguage=language;
         //invoke new saved language
        new LanguageManager(selectedLanguage).initilize();
    });
    
    app.find('$launcher3Trigger').on('click',function(){
        var launcher=Prepare('.launcher');
            Prepare('$app').setAttribute('state','active');
            Prepare('$mainBody').scrollTo(0);
        
            storage.setItem('launch','true');
            launcher.hide(); 
    });
})();
