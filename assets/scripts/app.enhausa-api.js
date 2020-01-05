/*!
 * AYRAL Translator, A JavaScript Library v1.0
 * Completely free for business and individuals 
 * http://ayral.net/
 *
 * Copyright AYRAL Tecnologies Ltd and other contributors
 * Released under PPT license
 *
 * Date: 2018-12-01T17:24Z
 */
function lowerOf(text){
  if (!text) return text;
   return text.toLowerCase();
}
function upperOf(text){
  if (!text) return text;
   return text.toString().toUpperCase();
}
function capitalizeOf(text) {
  if (!text) return text;
   return text.toLowerCase().split(' ').map(value => {
    return value.charAt(0).toUpperCase() + value.substring(1);
  }).join(' ');
}

function Dictionary(dictionary,caseType){
     var translatorDocument=window.document,dump,
         textNodes=[],valueElems=[],hintElems=[],childNodes=[],
         translatorBody=translatorDocument.body,xname,yname;
         elements=translatorBody.querySelectorAll("body,body *");
         dictionary || 'empty';
    
    if(!(dictionary instanceof Object))throw "Invalid Dictionary";
      dictionary.header?xname=dictionary.header[0]:xname=0; 
      dictionary.header?yname=dictionary.header[1]:yname=0; 
      dictionary.data?dictionary=dictionary.data:dictionary=[];
      caseType?caseType=caseType:caseType='capitalize';
    
    
    var prepareIndexOf= function(searchElement) {
      var object = Object(dictionary);
      var length = object.length >>> 0;
      var fromIndex = arguments.length > 2 ? arguments[2] >> 0 : 0;
      if (length < 1 || typeof searchElement !== 'string' || fromIndex >= length) {
        return -1;
      }

      if (fromIndex < 0) {
        fromIndex = Math.max(length - Math.abs(fromIndex), 0);
      }
      var search = searchElement.toLowerCase();
      for (var index = fromIndex; index < length; index += 1) {
        if (index in object) {
          var item = object[index];
          if (typeof item === 'string' && search === item.toLowerCase()) {
            return index;
          }
        }
      }
      return -1;
    };

    this.prepareComponents=function(){
        textNodes=valueElems=hintElems=childNodes=[];
        for(x in elements){
             if(!(elements[x] instanceof HTMLScriptElement) && !(elements[x] instanceof HTMLStyleElement)){
                 if(elements[x].childNodes){
                     childNodes=elements[x].childNodes[0];
                     if(elements[x].hasChildNodes() && childNodes.nodeType == 3){
                        textNodes.push(childNodes);
                     }
                 }
                 if(elements[x].placeholder){
                   hintElems.push(elements[x]);
                 }
                 if(elements[x].value){
                   valueElems.push(elements[x]);
                 }
             }
        } 
    }
    this.interpret=function(from,to){
       for(x in textNodes){
           if(typeof textNodes[x].textContent != typeof undefined){
              dump=textNodes[x].textContent.toString().split(' ');
              textNodes[x].nodeValue=this.getTranslation(dump,from,to);
           }
       } 
      for(x in hintElems){
          if(hintElems[x].placeholder){
               dump=hintElems[x].placeholder.toString().split(' ');
               hintElems[x].placeholder='';
               hintElems[x].placeholder=this.getTranslation(dump,from,to);
          }
      } 
      for(x in valueElems){
           if(!(textNodes[x] instanceof HTMLSelectElement)){
              if(valueElems[x].value){
                dump=valueElems[x].value.toString().split(' ');
                valueElems[x].value='';
                valueElems[x].value=this.getTranslation(dump,from,to);
              }
           }
       }
    }
    this.perapreTranslation=function(word){
        dump='';
      if(caseType==0 || caseType=='0' || lowerOf(caseType.toString())=='lower'){
        dump+=lowerOf(word)+' ';
      }
      else if(caseType==1 || caseType=='1' || lowerOf(caseType.toString())=='upper'){
        dump+=upperOf(word)+' ';
      }else{
        dump+=capitalizeOf(word)+' ';  
      }
      return (dump);
    };
    this.getTranslation=function(tmp,from,to){ 
        var i,j;
            i=j=0;
            dump='';
        
        if(typeof caseType== typeof undefined){
          caseType='capitalize';
        }
        
        for(y=0; y<tmp.length; y++){
            
          if(prepareIndexOf(lowerOf(tmp[y])>-1)){
            i=prepareIndexOf(tmp[y]);
            if(i>0){
                   if(from===xname && to===yname){
                        if((i%2)==0){
                          j=i+1;
                        }else{
                          j=i-1;
                        }
                     dump+=this.perapreTranslation(dictionary[j]);
                    } 
                    else if(from===yname && to===xname){
                        if((i%2)==0){
                          j=i+1;
                        }else{
                          j=i-1;
                        }
                        dump+=this.perapreTranslation(dictionary[j]);
                    }else{
                        if((i%2)==0){
                            j=i+1;
                            dump+=this.perapreTranslation(dictionary[j]);
                        }   
                        else{
                            j=i-1;
                           dump+=this.perapreTranslation(dictionary[j]);
                        }
                    }
                }else{
                   dump+=tmp[y]+' ';    
                }
          }else{
             dump+=tmp[y]+' '; 
          }
        }
       return (dump);
    }
    this.translate=function(selector,from,to){
        
        if(selector!=null && typeof selector!=typeof undefined && selector!=''){
            
            if(selector.toString().match(/^\[/) && selector.toString().match(/\]$/)){
                if(selector!='[*]'){
                    selector=selector.toString().replace(/\[/g,'');
                    selector=selector.toString().replace(/\]/g,'');
                    elements=translatorBody.querySelectorAll('body '+selector);
                }
                this.prepareComponents();
                this.interpret(from,to);
                translatorBody.style.opacity=1;
                return ('success');
            }else{
                dump=selector.toString().split(' ');
                return(this.getTranslation(dump));
            }
        }
        else{
            console.error('Oops! translate method require 1 parameter for the [selector] or text to translate');
        }
    }
}