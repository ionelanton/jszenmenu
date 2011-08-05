/*
	JSZenMenu 1.2.1
	http://github.com/ionelanton/jszenmenu/
*/

var delay        = 345;
var zindex       = 1000;
var prefix       = 'jszenmenu_';
_split           = ['_split'];
var str          = '';
menusQueue       = new Array();


function menu(title, link, description, target, leftIcon, submenu) {
	if (null != submenu) {
		this.submenu = new Array();
		for (var i = 0; i < submenu.length; i++) {
		  	this.submenu[i] = submenu[i];
		}
		if (null == leftIcon) {
	  		this.leftIcon = 'folder.gif';
		} else {
	  		this.leftIcon = leftIcon;
		}
		this.rightIcon = 'arrowv.gif';
	} else {
		this.submenu = null;
		if (null == leftIcon) {
	  		this.leftIcon = 'link.gif';
	   } else {
	  		this.leftIcon = leftIcon;
	   }
		this.rightIcon = 'blank.gif';		
	}
	if (null == link || '' == link) {
   	this.link = '#';
   } else {
   	this.link = link;
   }
	if (null == description) {
   	this.description = title;
   } else {
   	this.description = description;
   }
	if (null == target) {
   	this.target = '_self';
   } else {
   	this.target = target;
   }
	this.title = title;
	this.type = 0; /* 0 == horizontal, 1 == vertical */
	this.id = zindex++ + title.replace(/;/g, '').replace(/&/g, '').replace(/#/g, '').replace(/ /g, '');
}

function generateHtml(menu, menuTheme, menuName, menuType){
	var tr = "", _tr = "", tdtable = "", _table_td = "", vd = "V", horizontalSplit = " colspan=\"3\"", verticalSplit = "";
	if (0 == menuType) {
		tr = "<tr>";
		_tr = "</tr>";
		tdtable = "<td class=\"" + menuTheme + "TD\"><table class=\"" + menuTheme + "TABLE\" cellspacing=\"0\">";
		_table_td = "</table></td>";
		vd = "H";
		horizontalSplit = "";
		verticalSplit = "|";
	}
	if (null != menu.submenu) {
		if ('' == menu.title) {
			menu.title = menuName;
		}
		str += "<div id=\""+ prefix + menu.submenu[0].id + menuName + "\" class=\"" + menuTheme + "DIV\" onMouseOver=\"clearMenuTimeout('" + menuName + "');\" onMouseOut=\"setMenuTimeout('" + menuName + "','" + menuTheme + "');\" style=\"z-index:" + (zindex++) + ";\"><table id=\"table" + menu.submenu[0].id + menuName + "\" class=\"" + menuTheme + "TABLE" + vd + "\" cellspacing=\"0\"><tr><td class=\"" + menuTheme + "TD" + vd + "\"><table class=\"" + menuTheme + "TABLE\" cellspacing=\"0\">" + tr;
		
		for (var i = 0; i < menu.submenu.length; i++) {
			tmpArr = new Array("<img src=\"" + menuTheme + "/" + menu.submenu[i].leftIcon + "\">",	menu.submenu[i].title, "<img src=\"" + menuTheme + "/" + menu.submenu[i].rightIcon + "\">");
			if (0 == menuType) {
		 		menu.submenu[i].menuType = 0;
		   }
			var _onClick = "";
			if (menu.submenu[i].link != "#") {
		 		_onClick = '#onClick#';
		   }
			str += tdtable + "<tr id=\"" + menu.submenu[i].id + menuName + "\" class=\"" + menuTheme + "\" #onMouseOver# " + _onClick + " >";
			if (null != menu.submenu[i].submenu) {
				if (0 == menuType) {
					tmpArr[2] = "<img src=\"" + menuTheme + "/" + 'arrowh.gif' + "\">";
				}
				for (var t = 0; t < 3; t++) {
					str += "<td id=\"" + menu.submenu[i].id + menuName + (t + 1) + "\" class=\"" + menuTheme + "TD" + (t + 1) + "\" title=\"" + menu.submenu[i].description + "\">" + tmpArr[t] + "</td>";
				}
			}
			else {
				if (menu.submenu[i].title == _split[0]) {
					menu.submenu[i].title += menu.submenu[i - 1].id;
					menu.submenu[i].id = menu.submenu[i].title;
					str += "<td id=\"" + menu.submenu[i].id + menuName + "\" class=\"" + menuTheme + "\" " + horizontalSplit + "><div class=\"" + menuTheme + "SPLIT" + vd + "\"><img src=\"" + menuTheme + "/" + 'blank.gif' + "\">" + verticalSplit + "</div></td>";
				}
				else {
					for (var t = 0; t < 3; t++) {
			   		str += "<td id=\"" + menu.submenu[i].id + menuName + (t + 1) + "\" class=\"" + menuTheme + "TD" + (t + 1) + "\" title=\"" + menu.submenu[i].description + "\">" + tmpArr[t] + "</td>";
			   	}
				}
			}
			str += "</tr>" + _table_td;
		}
		str += _tr + "</table></td></tr></table></div>";
		for (var i = 0; i < menu.submenu.length; i++) {
			generateHtml(menu.submenu[i], menuTheme, menuName, null);
		}
	}
}

function getX(Obj)
{
	var x = 0 ;
	do {
		x += Obj.offsetLeft ;
		Obj = Obj.offsetParent ;
	} while(Obj) ;
	return x ;
}

function getY(Obj)
{
	var y = 0 ;
	do {
		y += Obj.offsetTop ;
		Obj = Obj.offsetParent ;
	} while(Obj) ;
	return y ;
}

function getObj(id)
{
	if (document.all)
		return document.all[id];
	return document.getElementById(id);
}

function setMenuTimeout(menuName, menuTheme) {
	var found = 0;
	menuTimeout = new Array(menuName, setTimeout("hideAll(" + menuName + ", '"+ menuTheme +"', '', '" + menuName + "')", delay) );
	for (var k = 0; k < menusQueue.length; k++) {
   	if (menuName == menusQueue[k][0]) {
   		menusQueue[k][1] = menuTimeout[1];
   		found = 1;
			break;
   	}
   }
	if (0 == found) {
   	menusQueue.push(menuTimeout);
   }
}

function clearMenuTimeout(menuName) {
	for (var k = 0; k < menusQueue.length; k++) {
		if (menuName == menusQueue[k][0]) {
			clearTimeout(menusQueue[k][1]);
		}
	}
}

function generateMenu(array) {
	submenu = new Array();
	switch(submenuPosition(array)) {
		case 0: return new menu('', null, null, null, null, getSubmenu(array, submenu));
		case 1: return new menu(array[0], null, null, null, null, getSubmenu(array, submenu));
		case 2: return new menu(array[0], array[1], null, null, null, getSubmenu(array, submenu));
		case 3: return new menu(array[0], array[1], array[2], null, null, getSubmenu(array, submenu));
		case 4: return new menu(array[0], array[1], array[2], array[3], null, getSubmenu(array, submenu));
		case 5: return new menu(array[0], array[1], array[2], array[3], array[4], getSubmenu(array, submenu));
	  default: return new menu(array[0], array[1], array[2], array[3], array[4]);
	}
}

function submenuPosition(array) {
	for (var i = 0; i < array.length; i++) {
   	if (array[i] instanceof Array) {
	  		return i;
	   }
   }
	return null;
}

function getSubmenu(array, submenu) {
	var j=0;
	for (var i = submenuPosition(array); i < array.length; i++) {
   	submenu[j++] = generateMenu(array[i]);
   }
	return submenu;
}

function showMe(menu, menuName){
	if (null != menu.submenu) {
   	getObj(prefix + menu.submenu[0].id + menuName).style.visibility = 'visible';
   }
}

function setClass(menu, menuTheme, menuClass, menuName){
	for (var j = 1; j < 4; j++) {
   	getObj(menu.id + (menuName + j)).className = menuTheme + menuClass + j;
   }
}

function hideMe(menu, menuTheme, menuId, menuName) {
	if (menuId == menu.id + menuName) {
   	window.open(menu.link, menu.target);
   }
	if (menu.submenu != null) {
   	for (var i = 0; i < menu.submenu.length; i++) {
   		getObj(prefix + menu.submenu[0].id + menuName).style.visibility = 'hidden';
   		if (menu.submenu[i].title.substring(0, _split[0].length) != _split[0]) {
		 		setClass(menu.submenu[i], menuTheme, 'TD', menuName);
		   }
   		hideMe(menu.submenu[i], menuTheme, menuId, menuName);
   	}
   }
}

function hideAll(menu, menuTheme, menuId, menuName){
	if (null != menu.submenu) {
   	for (var i = 0; i < menu.submenu.length; i++) {
   		if (menu.submenu[i].title.substring(0, _split[0].length) != _split[0]) {
		 		setClass(menu.submenu[i], menuTheme, 'TD', menuName);
		   }
   		hideMe(menu.submenu[i], menuTheme, menuId, menuName);
   	}
   }
}

function showMeHideRest(menu, menuId, menuTheme, menuName){
   if (menuId == menu.id + menuName){
		showMe(menu.id, menuName);
	}
	if (menu.submenu != null) {
   	for (var i = 0; i < menu.submenu.length; i++) {
   		if (menuId == menu.submenu[i].id + menuName) {
   			showMe(menu.submenu[i], menuName);
   			if (menu.submenu[i].title.substring(0, _split[0].length) != _split[0]) {
   				setClass(menu.submenu[i], menuTheme, 'TDV', menuName);
   				if (0 == menu.submenu[i].menuType) {
   					setClass(menu.submenu[i], menuTheme, 'TDH', menuName);
   				}
   			}
   		}
   		else {
   			hideMe(menu.submenu[i], menuTheme, '', menuName);
   			if (menu.submenu[i].title.substring(0, _split[0].length) != _split[0]) {
					setClass(menu.submenu[i], menuTheme, 'TD', menuName);
				}
   		}
   	}
   }
}

function createMenu(menu, menuId, menuName, menuTheme, menuType, menuPosition){ // createMenu(menu,id,menuName,menuTheme,menuType,pos,orient)
	if(null == menuTheme)
		menuTheme = defTh;
	try{
		if(getTh(menuName,menuTheme ) != '')
			menuTheme = getTh(menuName, menuTheme);
	}catch(e){}
	generateHtml(menu, menuTheme, menuName, menuType);
	if (null != menu.submenu){
		var Obj = getObj(menuId);
		Obj.innerHTML = str.replace(/#onClick#/g, " onClick=\"hideAll(" + menuName + ",'" + menuTheme + "', this.id, '" + menuName + "');\" ").replace(/#onMouseOver#/g, " onMouseOver=\"playMenu(" + menuName + ", this.id, '" + menuTheme+"', '" + menuName + "');\"  ");
		getObj(prefix + menu.submenu[0].id + menuName).style.visibility = 'visible';
		if (null == menuPosition) {
	  		position = 'static';
	   } else {
		position = menuPosition;
		}
		getObj(prefix + menu.submenu[0].id + menuName).style.position = position;
	}
	str='';
}

function playMenu(menu, menuId, menuTheme, menuName){
	if (menuId == menu.id + menuName) {
		var X, Y;
		if (0 == menu.menuType) {
			X = getX(getObj(menuId));
			Y = getY(getObj(menuId)) + getObj(menuId).offsetHeight - 1;
		}
		else {
			X = getX(getObj(menuId)) + getObj(menuId).offsetWidth;
			Y = getY(getObj(menuId));
		}
		if (null != menu.submenu) {
			if (X + getObj(prefix + menu.submenu[0].id + menuName).offsetWidth > browserWidth())
				X = getX(getObj(menuId)) - getObj(prefix + menu.submenu[0].id + menuName).offsetWidth;
			getObj(prefix + menu.submenu[0].id + menuName).style.left = X + 'px';
			getObj(prefix + menu.submenu[0].id + menuName).style.top= Y + 'px';
		}
	}
	if(null != menu.submenu)
		for (var i = 0; i < menu.submenu.length; i++) {
			playMenu(menu.submenu[i], menuId, menuTheme, menuName);
			if (menuId == menu.submenu[i].id + menuName) {
				showMeHideRest(menu, menuId, menuTheme, menuName);
				return;
			}
		}
}

function browserWidth(){
	if (window.innerWidth instanceof Number) {
   	return window.innerWidth;
   }
	else if (document.documentElement.clientWidth > 0) {
   	return document.documentElement.clientWidth;
   }
	else if (document.body.clientWidth > 0) {
   	return document.body.clientWidth;
   }
	return 0;
}
