/**************************************************************************************************
 * MENU DECLARATION                                                                               *
 *                                                                                                *
 * a_menu = generateMenu(menuItemsArray)                                                          *
 *                                                                                                *
 *                   /------> MENU <-------\                                                      *
 * menuItemsArray = [menuItem, ..., menuItem]                            /-----> SUBMENU <-----\  *
 * menuItem = ['title', 'link', 'description', 'target', 'path_to_icon', menuItem, ..., menuItem] *
 *************************************************************************************************/

menu1 = generateMenu([
	[' Home', 'index.html', null, null, 'home.gif'],
	['Introduction', 'index.html#Introduction'],
	['How to',
		// >> SUBMENU >>
		['Create a menu', 'index.html#howtomenu'],
		['Create a new theme', 'index.html#howtotheme']	
		// << SUBMENU <<
	],
	_split,
	['Menu themes',
		['Default', "index.html?menu1=ZMDefaultTheme"],
		['Silver', "index.html?menu1=ZMSilverTheme"],
		['Gold', "index.html?menu1=ZMGoldTheme"],
		['White', "index.html?menu1=ZMWhiteTheme"],
		['Black', "index.html?menu1=ZMBlackTheme"],
		['Mini green', "index.html?menu1=ZMMiniGreenTheme"],
		['Office XP', "index.html?menu1=ZMOfficeXPTheme"],
		['Office 2003', "index.html?menu1=ZMOffice2003Theme"],
		['Simple gray', 'index.html?menu1=ZMSimpleGrayTheme'],
		_split,
		['Right menu themes',
			['Default ', "index.html?menu2=ZMDefaultTheme"],
			['Silver ', "index.html?menu2=ZMSilverTheme"],
			['Gold ', "index.html?menu2=ZMGoldTheme"],
			['White ', "index.html?menu2=ZMWhiteTheme"],
			['Black ', "index.html?menu2=ZMBlackTheme"],
			['Mini green ', "index.html?menu2=ZMMiniGreenTheme"],
			['Office XP ', "index.html?menu2=ZMOfficeXPTheme"],
			['Office 2003 ', "index.html?menu2=ZMOffice2003Theme"],
			['Simple gray ', "index.html?menu2=ZMSimpleGrayTheme"]			
		]
	]
]);


menu2 = generateMenu([
 	['Home', "index.html",null,null,"blankv.gif"],
	_split,
	['Menu themes',
		['Default', "index.html?menu2=ZMDefaultTheme"],
		['Silver', "index.html?menu2=ZMSilverTheme"],
		['Gold', "index.html?menu2=ZMGoldTheme"],
		['White', "index.html?menu2=ZMWhiteTheme"],
		['Black', "index.html?menu2=ZMBlackTheme"],
		['Mini green','index.html?menu2=ZMMiniGreenTheme'],
		['Office XP','index.html?menu2=ZMOfficeXPTheme'],
		['Office 2003','index.html?menu2=ZMOffice2003Theme'],
		['Simple gray','index.html?menu2=ZMSimpleGrayTheme']		
	],
	_split,
	['Linux sites',
		['www.linux.org','http://www.linux.org','Linux.org','_blank'],
		['www.linux.com','http://www.linux.com','Linux.com','_blank'],
		['Distrowatch','http://distrowatch.com','Distrowatch','_blank',
			['Ubuntu'],
			['PCLinuxOS'],
			['OpenSuse'],
			['Debian','http://www.debian.org',
				['Debian 3.0'],
				['Debian 4.0',
					['Download']
				]
			]
		],
		_split,
		['Linux-Watch','http://www.linux-watch.com','Linux-Watch','_blank'],
		// if you have identical titles in the same menu, add a space
		['Linux-Watch'],
		['Linux-Watch'],
		['Linux-Watch']
	]
]);

mymenu=generateMenu([

  ['MenuItem1', 'http://www.google.com', 'Link to Google', '_self', null,
    // >> submenu >>
    ['Submenu1Item1'],
    ['Submenu1Item2'],
    _split,
    ['Title'],
    ['Title'],
    ['Title']
    // << submenu <<
  ],
  _split,
  ['MenuItem2'],
  ['MenuItem3']

]);