ayral.prepare(function(){

    var categoryIn=Prepare('.category');
      //  subCategoryIn=Prepare('.sun-catgeory');  --not active for first release
    
    var url=hostname+'/server/app.category-module.php?request=001',
     httpReq=new ayralHttpRequest('GET',url,'default',true);      

      httpReq.execute(function(response){
          if(response!='progress'){
               try{
                  var result=response.target.responseText;
                  if(result.match(/success:/)){
                      var categ=result.substr(result.indexOf(':')+1,result.length);
                      categ=JSON.parse(categ);
                                            
                      var categories=categ.categories.split(','),
                         subcatgories=categ.subcategories.split(','),
                         dump='';
   
                      for(category in categories){
                         dump+='<option>'+categories[category]+'</option>\n';
                      }
            
                     categoryIn.render(dump);
                      
                  }else{
                      print(result);
                  }
              }catch(error){
                  print(error);
              }
           }
       });
    
    
});