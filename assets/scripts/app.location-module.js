function initializeArea(city){
    var  areaElement=window.document.querySelector('.area-input'),
         areaCollection=[];
if(city!='' && city.length>2){
   city=lower(city.toString());

    if(city.match(/^adamawa/)){
          areaCollection=new Array('Demsa','Fufore','Ganye','Gayuk','Girei','Gombi','Guyuk','Hong','Jada','Lamurde','Madagali','Maiha','Mayo Belwa','Michika','Mubi North','Mubi South','Numan','Shelleng','Song, Nigeria','Toungo','Yola North','Yola South');
    } 
    else if(city.match(/^bauchi/)){
        areaCollection=new Array('Alkaleri','Bauchi','Bogoro','Damban','Darazo','Dass','Gamawa','Ganjuwa','Giade','Itas/Gadau','Jamaare','Katagum','Kirfi','Misau','Ningi','Shira','Tafawa Balewa','Toro','Warji','Zaki');

    }
    else if(city.match(/^niger'/)){
        areaCollection=new Array('Agaie','Agwara','Bida','Borgu','Bosso','Chanchaga','Edati','Gbako','Gurara','Katcha','Kontagora','Lapai','Lavun','Magama','Mariga','Mashegu','Mokwa','Munya','Paikoro','Rafi','Rijau','Shiroro','Suleja','Tafa','Wushishi');

    }
   else if(city.match(/^borno/)){
       areaCollection=new Array('Abadam','Askira/Uba','Bama','Bayo','Biu','Chibok','Damboa','Dikwa','Gubio','Guzamala','Gwoza','Hawul','Jere, Borno','Kaga','Kala/Balge','Konduga','Kukawa','Kwaya Kusar','Mafa','Magumeri','Maiduguri','Marte','Mobbar','Monguno','Ngala','Nganzai','Shani');
    }
    else if(city.match(/^gombe/)){
         areaCollection=new Array('Akko','Balanga','Billiri','Dukku','Funakaye','Gombe','Kaltungo','Kumo','Kwami','Nafada','Shongom','Yamaltu/Deba');
    }
    else if(city.match(/^jigawa/)){
        areaCollection=new Array('Auyo','Babura','Biriniwa','Birnin Kudu','Buji','Dutse','Gagarawa','Garki','Gumel','Guri','Gwaram','Gwiwa','Hadejia','Jahun','Kafin Hausa','Kaugama','Kazaure','Kiri Kasama','Kiyawa','Maigatari','Malam Madori','Miga','Ringim','Roni','Sule Tankarkar','Taura','Yankwashi');
    }
    else if(city.match(/^kaduna/)){
        areaCollection=new Array('Birnin Gwari','Chikun','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia','Kaduna North','Kaduna South','Kagarko','Kajuru','Kaura','Kauru','Kubau','Kudan','Lere','Makarfi','Sabon Gari','Sanga,','Soba','Zangon','Kataf','Zaria');
    }
    else if(city.match(/^kano/)){
        areaCollection=new Array('Ajingi','Albasu','Bagwai','Bebeji','Bichi','Bunkure','Dala, Kano','Dambatta','Dawakin Kudu','Dawakin Tofa','Doguwa','Fagge','Gabasawa','Garko','Garun Mallam','Gaya','Gezawa','Gwale','Gwarzo','Garo','Kabo','Kano Municipal','Karaye','Kibiya','Kiru','Kumbotso','Kunchi','Kura','Madobi','Makoda','Minjibir','Nasarawa','Rano','Rimin Gado','Rogo','Shanono','Sumaila','Takai','Tarauni','Tofa','Tsanyawa','Tudun Wada','Ungogo','Warawa','Wudil');

    }
    else if(city.match(/^katsina/)){
       areaCollection=new Array('Bakori','Batagarawa','Batsari','Baure','Bindawa','Charanchi','Dan Musa','Dandume','Danja','Daura','Dutsin-Ma','Faskari','Funtua','Ingawa','Jibia','Kafur','Kaita','Kankara','Kankia','Katsina','Kurfi','Kusada','Mai Adua','Malumfashi','Mani','Mashi','Matazu','Musawa','Rimi','Sabuwa','Safana','Sandamu','Tsagem','Zango');
    }
    else if(city.match(/^nasarawa/)){
        areaCollection=new Array('Karu','Akwanga','Awe','Keffi','Nasarawa','Egon','Doma','Kokona','Wamba','Keana','Nasarawa','Lafia','Toto','Obi');
    }
    else if(city.match(/^kebbi/)){
       areaCollection=new Array('Aleiro','Arewa Dandi','Argungu','Augie','Bagudo','Birnin Kebbi','Bunza','Dandi','Fakai','Gwandu','Jega','Kalgo','Koko/Besse','Maiyama','Ngaski','Sakaba','Shanga','Suru','Wasagu/Danko','Yauri','Zuru');
    }
    else if(city.match(/^kogi/)){
       areaCollection=new Array('Adavi','Ajaokuta','Ankpa','Bassa','Dekina','Ibaji','Idah','Igalamela-Odolu','Ijumu','Kabba/Bunu','Lokoja','Mopa-Muro','Ofu','Okehi','Okene','Olamaboro','Omala','Yagba East','Yagba West');
    }
    else if(city.match(/^kwara/)){
       areaCollection=new Array('Asa','Baruten','Edu','Ekiti','Ifelodun','Ilorin East','Ilorin South','Ilorin West','Irepodun,','Isin','Kaiama','Moro','Offa','Oke Ero','Oyun','Pategi');

    }
    else if(city.match(/^plateau/)){
        areaCollection=new Array('Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu, Nigeria','Mikang','Pankshin','Quaan Pan','Riyom','Shendam','Wase');
    }
    else if(city.match(/^taraba/)){
        areaCollection=new Array('Ardo Kola','Bali','Donga','Gashaka','Gassol','Ibi','Jalingo','Karim Lamido','Kurmi','Lau','Sardauna','Takum','Ussa','Wukari','Yorro','Zing');
    } 
    else if(city.match(/^yobe/)){
       areaCollection=new Array('Bursari','Damaturu','Geidam','Bade','Gujba','Gulani','Fika','Fune','Karasuwa','Machina','Nangere','Nguru','Potiskum','Tarmuwa','Yunusari','Yusufari');
    } 
    else if(city.match(/^zamfara/)){
        areaCollection=new Array('Anka','Bakura','Birnin Magaji/Kiyaw','Bukkuyum','Bungudu','Tsafe','Gummi','Gusau','Kaura Namoda','Maradun','Maru','Shinkafi','Talata Mafara','Zurmi');
    } 
    else if(city.match(/^sokoto/)){ 
        areaCollection=new Array('Binji','Bodinga','Dange Shuni','Gada','Goronyo','Gudu','Gwadabawa','Illela','Isa','Kebbe','Kware','Rabah','Sabon Birni','Shagari','Silame','Sokoto North','Sokoto South','Tambuwal','Tangaza','Tureta','Wamako','Wurno','Yabo');
    } 

    if(areaCollection!=null){
     new autocompleteManager().setAutocomplete(areaElement,areaCollection);
    }
 }    
}
app.prepare(function(){
    
    $('.area-input').on('focus',function() {
       $('.area-input').html('');
       var city=$('.city-input').val();
       initializeArea(city);
     });
    $('.city-input').each(function() {
        var elem = $(this);
        elem.data('oldVal', elem.val());
        elem.bind("propertychange change click keyup input paste", function(event){
          // If value has changed...
           if(elem.data('oldVal') != elem.val()) {
   
             elem.data('oldVal', elem.val());
              $('.area-input').html('');
              var city=elem.val();
              initializeArea(city);
            }
         });
      });


    $('.city-chooser').change(function(){
       var state=$(this).val();
           state=state.toString().trim();
           storage.setItem('location',state);
           $('[name="marketActivity"]').attr('location',state);
     
       if(state== "Adamawa")
        {
           $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Demsa','Fufore','Ganye','Gayuk','Girei','Gombi','Guyuk','Hong','Jada','Lamurde','Madagali','Maiha','Mayo Belwa','Michika','Mubi North','Mubi South','Numan','Shelleng','Song, Nigeria','Toungo','Yola North','Yola South');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=='Bauchi')
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Alkaleri','Bauchi','Bogoro','Damban','Darazo','Dass','Gamawa','Ganjuwa','Giade','Itas/Gadau','Jamaare','Katagum','Kirfi','Misau','Ningi','Shira','Tafawa Balewa','Toro','Warji','Zaki');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
       else if(state=='Niger')
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Agaie','Agwara','Bida','Borgu','Bosso','Chanchaga','Edati','Gbako','Gurara','Katcha','Kontagora','Lapai','Lavun','Magama','Mariga','Mashegu','Mokwa','Munya','Paikoro','Rafi','Rijau','Shiroro','Suleja','Tafa','Wushishi');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
       
      else if(state=="Borno")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Abadam','Askira/Uba','Bama','Bayo','Biu','Chibok','Damboa','Dikwa','Gubio','Guzamala','Gwoza','Hawul','Jere, Borno','Kaga','Kala/Balge','Konduga','Kukawa','Kwaya Kusar','Mafa','Magumeri','Maiduguri','Marte','Mobbar','Monguno','Ngala','Nganzai','Shani');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
  
        else if(state=="Gombe")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Akko','Balanga','Billiri','Dukku','Funakaye','Gombe','Kaltungo','Kumo','Kwami','Nafada','Shongom','Yamaltu/Deba');
              for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
             
        else if(state=="Jigawa")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Auyo','Babura','Biriniwa','Birnin Kudu','Buji','Dutse','Gagarawa','Garki','Gumel','Guri','Gwaram','Gwiwa','Hadejia','Jahun','Kafin Hausa','Kaugama','Kazaure','Kiri Kasama','Kiyawa','Maigatari','Malam Madori','Miga','Ringim','Roni','Sule Tankarkar','Taura','Yankwashi');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Kaduna")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Birnin Gwari','Chikun','Giwa','Igabi','Ikara','Jaba','Jemaa','Kachia','Kaduna North','Kaduna South','Kagarko','Kajuru','Kaura','Kauru','Kubau','Kudan','Lere','Makarfi','Sabon Gari','Sanga,','Soba','Zangon','Kataf','Zaria');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
         else if(state=="Kano")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ajingi','Albasu','Bagwai','Bebeji','Bichi','Bunkure','Dala, Kano','Dambatta','Dawakin Kudu','Dawakin Tofa','Doguwa','Fagge','Gabasawa','Garko','Garun Mallam','Gaya','Gezawa','Gwale','Gwarzo','Kabo / Garo','Kano Municipal','Karaye','Kibiya','Kiru','Kumbotso','Kunchi','Kura','Madobi','Makoda','Minjibir','Nasarawa','Rano','Rimin Gado','Rogo','Shanono','Sumaila','Takai','Tarauni','Tofa','Tsanyawa','Tudun Wada','Ungogo','Warawa','Wudil');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Katsina")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Bakori','Batagarawa','Batsari','Baure','Bindawa','Charanchi','Dan Musa','Dandume','Danja','Daura','Dutsin-Ma','Faskari','Funtua','Ingawa','Jibia','Kafur','Kaita','Kankara','Kankia','Katsina','Kurfi','Kusada','Mai Adua','Malumfashi','Mani','Mashi','Matazu','Musawa','Rimi','Sabuwa','Safana','Sandamu','Tsagem','Zango');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Nasarawa")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Karu','Akwanga','Awe','Keffi','Nasarawa','Egon','Doma','Kokona','Wamba','Keana','Nasarawa','Lafia','Toto','Obi');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Kebbi")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Aleiro','Arewa Dandi','Argungu','Augie','Bagudo','Birnin Kebbi','Bunza','Dandi','Fakai','Gwandu','Jega','Kalgo','Koko/Besse','Maiyama','Ngaski','Sakaba','Shanga','Suru','Wasagu/Danko','Yauri','Zuru');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Kogi")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Adavi','Ajaokuta','Ankpa','Bassa','Dekina','Ibaji','Idah','Igalamela-Odolu','Ijumu','Kabba/Bunu','Lokoja','Mopa-Muro','Ofu','Okehi','Okene','Olamaboro','Omala','Yagba East','Yagba West');
            for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
            
        else if(state=="Kwara")
        {
            $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select);
            var localArea=new Array('Asa','Baruten','Edu','Ekiti','Ifelodun','Ilorin East','Ilorin South','Ilorin West','Irepodun,','Isin','Kaiama','Moro','Offa','Oke Ero','Oyun','Pategi');
             for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
             
         else if(state=="Plateau")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Barkin Ladi','Bassa','Bokkos','Jos East','Jos North','Jos South','Kanam','Kanke','Langtang North','Langtang South','Mangu, Nigeria','Mikang','Pankshin','Quaan Pan','Riyom','Shendam','Wase');
            for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
         
         else if(state=="Taraba")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ardo Kola','Bali','Donga','Gashaka','Gassol','Ibi','Jalingo','Karim Lamido','Kurmi','Lau','Sardauna','Takum','Ussa','Wukari','Yorro','Zing');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
         else if(state=="Yobe")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Bursari','Damaturu','Geidam','Bade','Gujba','Gulani','Fika','Fune','Karasuwa','Machina','Nangere','Nguru','Potiskum','Tarmuwa','Yunusari','Yusufari');
            for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
         else if(state=="Zamfara")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Anka','Bakura','Birnin Magaji/Kiyaw','Bukkuyum','Bungudu','Tsafe','Gummi','Gusau','Kaura Namoda','Maradun','Maru','Shinkafi','Talata Mafara','Zurmi');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Sokoto")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Binji','Bodinga','Dange Shuni','Gada','Goronyo','Gudu','Gwadabawa','Illela','Isa','Kebbe','Kware','Rabah','Sabon Birni','Shagari','Silame','Sokoto North','Sokoto South','Tambuwal','Tangaza','Tureta','Wamako','Wurno','Yabo');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Abuja")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Abaji','Abuja','Gwagwalada','Kuje','Kwali Area Council');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }
        else if(state=="Abia")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Aba North','Aba South','Arochukwu','Bende','Ikwuano','Isiala Ngwa North','Isiala Ngwa South','Isuikwuato','Obi Ngwa','Ohafia','Osisioma Ngwa','Ugwunagbo','Ukwa East','Ukwa West','Umuahia North','Umuahia South','Umu Nneochi');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Akwa Ibom")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Abak','Eastern Obolo','Eket','Esit Eket','Essien Udim','Etim Ekpo','Etinan','Ibeno','Ibesikpo Asutan','Ibiono-Ibom','Ika, Akwa Ibom','Ikono','Ikot Ekpene','Ikot-Abasi','Ini, Akwa Ibom','Itu, Akwa Ibom','Mbo, Akwa Ibom','Mkpat-Enin','Nsit-Atai','Nsit-Ibom','Nsit-Ubium','Obot-Akara','Okobo, Akwa Ibom','Onna','Oron, Akwa Ibom','Oruk Anam','Udung-Uko','Ukanafun','Uruan','Urue-Offong/Oruko','Uyo');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }   
        else if(state=="Anambra")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Aguata','Anambra East','Anambra West','Anaocha','Awka North','Awka South','Ayamelum','Dunukofia','Ekwusigo','Idemili North','Idemili South','Ihiala','Njikoka','Nnewi North','Nnewi South','Ogbaru','Onitsha North','Onitsha South','Orumba North','Orumba South');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Bayelsa")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Brass, Nigeria','Ekeremor','Kolokuma/Opokuma','Nembe','Ogbia','Sagbama','Southern Ijaw','Yenagoa');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Bayelsa")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ado, Benue','Agatu','Apa, Nigeria','Buruku','Gboko','Guma, Nigeria','Gwer East','Gwer West','Katsina-Ala','Konshisha','Kwande','Logo, Nigeria','Makurdi','Obi, Nigeria','Ogbadibo','Ohimini','Oju, Nigeria','Okpokwu','Otukpo','Tarka, Nigeria','Ukum','Ushongo','Vandeiky');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Cross Rivers")
        {
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('kom','Akamkpa','Etung','Obanliku','Calabar South','Biase','Akpabuyo','Calabar Municipal','Ogoja','Odukpani','Obudu','Yakuur','Obubra','Boki','Bekwarra','Yala','Yakurr');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Delta"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ndokwa East','Ughelli South','Ethiope East','Ndokwa West','Oshimili South','Ethiope West','Isoko North','Udu, Nigeria','Ika South','Ughelli North','Aniocha North','Warri North','Aniocha South','Ika North East','Uvwie','Oshimili North','Patani, Delta','Warri South West','Warri');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Ebonyi"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ikwo','Ohaukwu','Onicha','Afikpo North','Ishielu','Ezza South','Ezza North','Ohaozara','Ivo, Ebonyi','Ebonyi, Ebon');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Edo"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Uhunmwonde','Oredo','Etsako West','Igueben','Ovia North-East','Etsako Central','Egor','Ovia South-West','Esan South-East','Esan West','Esan Central','Owan West','Ikpoba Okha','Orhionmwon','Owan East');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Ekiti"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ekiti East','Ekiti West','Ekiti South-West','Ise/Orun','Ido-Osi','Gbonyin','Oye','Ilejemeje','Irepodun/Ifelodun','Moba');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Enugu"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Nkanu East','Enugu North','Ezeagu','Isi Uzo','Aninri','Uzo Uwani','Udenu','Igbo Eze North','Enugu South','Igbo Eze South','Enugu East','Igbo Etiti');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Imo"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ikeduru','Mgbidi','Nwangele','Ngor Okpala','Obowo','Ehime Mbano','Ezinihitte-Mbaise','Ahiazu Mbaise','Oru West','Orsu','Owerri Municipal','Ohaji/Egbema','Ihitte/Uboma','Owerri West','Owerri North','Isiala Mbano','Ideato North');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Lagos"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Alimosho','Ajeromi-Ifelodun','Kosofe','Mushin','Oshodi-Isolo','Ojo','Ikorodu','Surulere','Agege','Ifako-Ijaiye','Shomolu','Amuwo-Odofin','Lagos Mainland','Ikeja','Eti-Osa','Badagry','Apapa','Lagos Island','Epe','Ibeju-Lekki');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Ogun"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Ogun Waterside','Ijebu North','Yewa South','Yewa North','Obafemi Owode','Ewekoro','Remo North','Ijebu North East','Ijebu East','Imeko Afon','Abeokuta North');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }   
        else if(state=="Ondo"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Odigbo','Ondo West','Ifedore','Ese Odo','Akure North','Ilaje','Akoko North-East','Ose, Nigeria','Ondo East');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Osun"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Boripe','Ola Oluwa','Orolu','Ede North','Ife North','Atakunmosa East','Ife South','Ilesa West','Ife East','Obokun','Irepodun','Olorunda','Isokan','Irewole','Aiyedire','Ede South','Odo Otin','Aiyedaade','Ifedayo','Boluwaduro','Ilesa East','Ife Central','Egbedore','Atakunmosa West','Ifelodun','Ila');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else if(state=="Oyo"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Oluyole','Surulere','Atisbo','Ibadan North','Ibadan North-West','Ona Ara','Akinyele','Ibarapa Central','Oyo West','Saki East','Kajola','Saki West','Itesiwaju','Ogo Oluwa','Olorunsogo','Ogbomosho North','Ibadan South-West','Ibadan South-East','Ibarapa East','Lagelu, Oyo','Orelope','Iwajowa','Oyo East','Ibarapa North','Irepo','Atiba','Ogbomosho South','Ibadan North-East','Idogz','Ori Ire');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        }  
        else if(state=="Rivers"){
             $('.area-chooser').html(''); 
             var select= $('<option value="null" selected>Select Region</option>');
             $('.area-chooser').append(select); 
            var localArea=new Array('Abua Odual','Ahoada East','Ahoada West','Akuku Toru','Andoni','Asari Toru','Bonny','Degema','Eleme','Emuoha','Etche','Gokana','Ikwerre','Khana','Obio/Akpor','Ogba Egbema Ndoni','Ogu Bolo','Okrika','Omumma','Opobo','Oyigbo','Port-Harcourt','Tai');
           for (i=0; i<localArea.length; i++) {  
             var select= $('<option value="'+localArea[i]+'">'+localArea[i]+'</option>');
             $('.area-chooser').append(select);
            }
        } 
        else
        {
             $('.area-chooser').html(''); 
             var select= $('<option>Select Region</option>');
             $('.area-chooser').append(select);
        }
       
    });
});