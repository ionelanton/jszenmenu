function setCookie(name, value)
{
	if(name != '') 
		document.cookie = name + '=' + value +';';
	//window.location.replace(window.location);
}

function getCookie(name)
{
	if(name == '')
    	return('');
         
	start = document.cookie.indexOf(name + '=');
         
         if(start == -1)
            return('');
    
	value =  document.cookie.substr(start + name.length + 1, document.cookie.length);
	

	end = value.indexOf(';');
	if(end != -1)
		value = value.substr(0, end);

	return(value);
}

function clearCookie(name)
{                  
	y = new Date();
	document.cookie = name + '=0' + '; expires=' + y.setYear(y.getYear() - 1); 		 
}

function getTh(name,th) {
	var str1=window.location.search.substr(1).split("?").toString();
	var nr=str1.search(eval("/"+name+"=/i"));
	var str2=str1.substr(nr+name.length+1);
	if(nr!= -1) {
		if(str2!='') {
			if(getCookie(name)!=str2) {
				setCookie(name,str2);
				return str2;
			}
		}
		if(getCookie(name)=='') {
			setCookie(name,th);
			return th;
		}
	}
	if(getCookie(name)=='')
		setCookie(name,th);
	return getCookie(name);
}
