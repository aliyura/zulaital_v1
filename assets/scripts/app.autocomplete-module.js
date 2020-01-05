function reloadDumpedAutocomplete(){
  var auto=new autocompleteManager(),
   category=document.querySelector('#i-category'),
   searchInput=document.querySelector('#search-in'),
   marketSearch=document.querySelector('#marketSearch-in'), 
   autoDump=JSON.parse(storage.getItem('search'));
    
  auto.setAutocomplete(category,autoDump)
  auto.setAutocomplete(searchInput,autoDump);
  auto.setAutocomplete(marketSearch,autoDump);
}
function reloadAutocomplete(flag){
    
   var auto=new autocompleteManager(),
   category=document.querySelector('#i-category'),
   searchInput=document.querySelector('#search-in'),
   marketSearch=document.querySelector('#marketSearch-in');
    
    if(flag==1){
    
        var url=hostname+'/server/app.autocomplete-module.php?request=002',
            httpReq=new ayralHttpRequest('GET',url,'default',true);
        
          httpReq.execute(function(response){
              if(response!='progress'){
                   try{
                      var result=response.target.responseText;
                      if(result.match(/failed_to_fetch_autocomplete_dump/)){
                        reloadDumpedAutocomplete();
                      }else if(result.match(/connection_failed/)){
                         reloadDumpedAutocomplete();
                      }else{
                         var autoDump=result.trim().split(',');
                         auto.setAutocomplete(category,autoDump)
                         auto.setAutocomplete(searchInput,autoDump);
                         auto.setAutocomplete(marketSearch,autoDump);
                         storage.setItem('search',JSON.stringify(autoDump));
                      }
                  }catch(error){
                    reloadDumpedAutocomplete();
                  }
               }
           });
     }else{
     reloadDumpedAutocomplete();
    }
}
reloadAutocomplete(1);
