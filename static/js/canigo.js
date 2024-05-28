  // Function to open the backdrop
  function openBackdrop() {
    closeBackdrop();
    const backdrop = document.createElement("div");
    backdrop.classList.add('NG-Modal_Backdrop');
    document.body.appendChild(backdrop);
  }

  // Function to close the backdrop
  function closeBackdrop() {
    const backdrop = document.querySelector('.NG-Modal_Backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
	  const searchButton = document.querySelector('.js-search-menu');
    const searchLayer = document.getElementById('NG-search');

    // Function to open the search layer and backdrop
    function openSearchLayer() {
      //searchLayer.style.display = 'block';
      openBackdrop();
	    searchLayer.classList.add('NG-search--expand');
      searchLayer.style.height = "350px";
    }

    // Function to close the search layer and backdrop
    function closeSearchLayer() {
      closeBackdrop();
	    searchLayer.classList.remove('NG-search--expand');
    }

    // Event listener for the search button
    if (searchButton) {
      searchButton.addEventListener("click", function () {
        if (!searchLayer.classList.contains('NG-search--expand')) {
          openSearchLayer();
		      searchButton.classList.add('NG-header__icon-close');
        } else {
          closeSearchLayer();
          searchButton.classList.remove('NG-header__icon-close');
        }
      });
    }

    // Event listener for the backdrop
    document.addEventListener('click', function(event) {
      const backdrop = document.querySelector('.backdrop');
      if (backdrop && !backdrop.contains(event.target)) {
        closeSearchLayer();
      }
    });
  });

/****** PEU ******/

window.addEventListener("resize", function() {
	if (document.querySelectorAll(".footer-bottom__list-item")[0]) {
		separatorHandler();
	}
	if (
		document.querySelectorAll(".footer-bottom")[0] &&
		document.querySelectorAll(".NG-goToTop")[0]
	) {
		var footerH =
			document.querySelector(".footer-bottom").offsetHeight + 15;
		document.querySelector(".NG-goToTop").style.bottom = footerH + "px";
	}
});

//Borrar el último separador de cada salto de línea en el menú del footer
function separatorHandler() {
	var lastItemTop = document.querySelector(".footer-bottom__list-item")
		.offsetTop;
	document.querySelectorAll(".footer-bottom__list-item").forEach(function(el) {
		if (el.offsetTop > lastItemTop) {
			lastItemTop = el.offsetTop;
			el.previousElementSibling.classList.remove("separator");
			el.classList.add("separator");
		} else {
			el.classList.add("separator");
		}
	});
}

var listgroup1 = {
	list: document.querySelector(".list-group1"),
	addclass: function(list) {
		if (!list.parentNode.classList.contains("cerca_xarxes")) {
			list.classList.add("w-45");
		}
	}
};

var fpcaPeu = {
	hoverImage: function() {
		var images = document.getElementsByClassName("js-footer-hover-img");
		if (images !== undefined) {
			for (var i = 0; i < images.length; i++) {
				images[i].addEventListener("mouseover", function() {
					var source = this.getAttribute("data-hover");
					this.src = source;
				});
				images[i].addEventListener("mouseleave", function() {
					var source = this.getAttribute("data-default");
					this.src = source;
				});
			}
		}
	},
	btnScrollVisibility: function(el, num) {
		var scrollTop = document.documentElement.scrollTop;

		if (el !== undefined) {
			if (scrollTop < num) {
				el.style.display = "none";
			} else {
				el.style.display = "block";
			}
		}
	},
	scrollToTop: function() {
		var btn = document.getElementsByClassName("js-NG-goToTop");
		if (btn !== undefined && btn.length > 0) {
			fpcaPeu.btnScrollVisibility(btn[0], 150);
			btn[0].addEventListener("click", function() {
				window.scrollTo({ top: 0, behavior: "smooth" });
			});
		}
		if (btn !== undefined) {
			window.addEventListener("scroll", function() {
				fpcaPeu.btnScrollVisibility(btn[0], 150);
			});
		}
	},
	refresh: function() {},
	init: function() {
		fpcaPeu.hoverImage();
		fpcaPeu.scrollToTop();
	}
};

function ready() {
	document.addEventListener("DOMContentLoaded", function() {
		fpcaPeu.init();
		window.addEventListener("resize", function() {});
	});
}

ready();
/******** PEU *********/

// 'use strict';

// Polyfills



/**
 * detect Touch device
 */
function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}


/****************************************************************
 ************************** CAPCALERA ****************************
 ****************************************************************/


//******************** Init Document *******************/
function _openBackdrop(){
  _closeBackdrop();
  var ngBackdrop = document.createElement("div");
  ngBackdrop.classList.add('NG-Modal_Backdrop');
  document.documentElement.appendChild(ngBackdrop);
}
function _closeBackdrop(){
  var ngBackdrop = document.querySelectorAll('.NG-Modal_Backdrop');

  ngBackdrop.forEach(function(ngBackdrop){
    ngBackdrop.remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.querySelector('.NG-navbar');
  var search = document.querySelector('.NG-search');
  var icon_menu = document.querySelector('.NG-header__icon');
  var icon_search = document.querySelector('.NG-header__icon2');
  // var rotateicon = document.querySelector('#rotate_icon');
  var menuIdioma =  document.querySelector('.js-NG-menu-idioma');
  var listIdioma =  document.querySelector('.NG-navbar__list-language');
  //var $megaMenu =  document.querySelector('.NG-megamenu');
  var $body = document.querySelector('html');

  // code...

  var closeAllMenus = function(){
    L3offset = 0;
    L4offset = 0;
    //megamenuIE.initIEAnimation(NG_ISIE);
    if (search != null) {
      search.classList.remove('NG-search--expand');
      search.setAttribute('aria-expanded', false);
    }
    if (icon_menu != null){
      icon_menu.classList.remove('NG-header__icon-close');
      icon_menu.setAttribute('aria-expanded', false);
    }
    if (icon_search != null){
      icon_search.classList.remove('NG-header__icon-close');
      icon_search.setAttribute('aria-expanded', false);
    }
    _closeBackdrop();

    if (navbar != null){
      navbar.classList.remove('NG-navbar-expand');
    }
    if (listIdioma != null){
      listIdioma.classList.remove('.NG-navbar__list-language--expanded')
    }
    if (menuIdioma != null){
      menuIdioma.classList.remove('NG-navbar__link--active');
      menuIdioma.setAttribute('aria-expanded', false);
    }
    //if ($megaMenu != null){
      //megamenu.closeAllMegamenus();
      //megamenu.closeAllSubmenus($megaMenu);
      //_maxHeightNavMobile(false);
    //}
  }


  //left - toggle Burguer menu
  if (icon_menu != null) {
    icon_menu.addEventListener("click", function () {
      var expanded = icon_menu.getAttribute('aria-expanded') === "true";
      var open = false;
      // console.log(icon_menu.getAttribute('aria-expanded'));
      // icon_menu.setAttribute('aria-expanded', !expanded);
      if(!expanded) {
        closeAllMenus();
        // console.log("!expanded", expanded);
        icon_menu.classList.add('NG-header__icon-close');
        icon_menu.setAttribute('aria-expanded', true);
        navbar.classList.add('NG-navbar-expand');
        open = true;
        $body.classList.remove('NG-body-lock');
        $body.classList.add('NG-body-lock');
        _openBackdrop();
      } else {
        // console.log("expanded", expanded);
        icon_menu.classList.remove('NG-header__icon-close');
        icon_menu.setAttribute('aria-expanded', false);
        navbar.classList.remove('NG-navbar-expand');
        open = false;
        $body.classList.remove('NG-body-lock');
        _closeBackdrop();
      }
      _maxHeightNavMobile(open);

    });
    icon_menu.addEventListener("keyup", function(event) {
      // event.preventDefault();
      if (event.keyCode === 13) {
        icon_menu.click();
      }
    });

  }

  function _maxHeightNavMobile(open) {
    var upHeader = document.querySelector('.NG-header__container');
    var navBar = document.querySelector('.NG-navbar');
    var navBarMenu = document.querySelector('.js-navbar__menu');

    if (navBar != null && upHeader != null) {
      if(window.innerWidth < 1025) {
        var headerHeight = upHeader.querySelector('.NG-main').offsetHeight;
        if(open) {
          navBar.style.maxHeight = "calc(100vh - " + headerHeight + "px)";
          navBarMenu.style.height = "auto";
          navBarMenu.classList.remove("NG-navbar__menu--visible");
          navBarMenu.classList.add("NG-navbar__menu--visible");
        } else {
          navBar.style.maxHeight = "";
          navBarMenu.style.height = "";
          navBarMenu.classList.remove("NG-navbar__menu--visible");
        }
      }
    }
  }
  // right - Toggle Search
  if (icon_search != null) {
    icon_search.addEventListener("click", function () {
      var expanded = icon_search.getAttribute('aria-expanded') === "true";
      // console.log(icon_search.getAttribute('aria-expanded'));
      // icon_menu.setAttribute('aria-expanded', !expanded);
      if(!expanded) {
        closeAllMenus();
        search.classList.add('NG-search--expand');
        search.style.height = "350px";
        icon_search.classList.add('NG-header__icon-close');
        icon_search.setAttribute('aria-expanded', true);
        _openBackdrop();
        if(window.innerWidth < 1025) {
          $body.classList.remove('NG-body-lock');
          $body.classList.add('NG-body-lock');
        }

      } else {
        search.classList.remove('NG-search--expand');
        icon_search.classList.remove('NG-header__icon-close');
        icon_search.setAttribute('aria-expanded', false);
        $body.classList.remove('NG-body-lock');
        _closeBackdrop();
      }

    });

    document.addEventListener('click', function(event) {
      if(document.querySelector('.NG-search--expand') != null){
        var modal = document.querySelector('.NG-Modal_Backdrop');
        var isClickInside = modal.contains(event.target);
        if (isClickInside && window.innerWidth > 1024) {

          //the click was outside the specifiedElement, do something
          search.classList.remove('NG-search--expand');
          icon_search.classList.remove('NG-header__icon-close');
          icon_search.setAttribute('aria-expanded', false);
          $body.classList.remove('NG-body-lock');
          _closeBackdrop();
        }

      }
    });

    icon_search.addEventListener("keyup", function(event) {
      // event.preventDefault();
      if (event.keyCode === 13) {
        icon_search.click();
      }
    });

    // close on escape
    document.addEventListener('keydown', function(evt) {
      var expanded = icon_search.getAttribute('aria-expanded');
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        if(expanded){
          search.classList.remove('NG-search--expand');
          icon_search.classList.remove('NG-header__icon-close');
          icon_search.setAttribute('aria-expanded', false);
          $body.classList.remove('NG-body-lock');
          _closeBackdrop();
        }
      }
    });
  }


  
});
//******************** END Init Document *******************/

//funcion para cambiar imagenes

function change_img(id, image1, image2) {
  imgsrc = document.getElementById(id).src;

  if (imgsrc.indexOf(image1) != -1) {
    document.getElementById("header_icon-image").src = image2;
  } else {
    document.getElementById("header_icon-image").src = image1;
  }
}


/****************************************************************
 ************************ CAPCALERA NAV **************************
 ****************************************************************/
// Navbar
var navbarCapcalera = {
  isLarge: function(){
    var navbar = document.querySelector('.js-navbar__menu');
    var hasClass = false;

    hasClass = navbar.classList.contains('NG-navbar__menu--isLarge');
    return hasClass;
  },
  ifLarge: function(){
    var navbar = document.querySelector('.js-navbar__menu');
    if(navbar != undefined){
      navbar.classList.remove('NG-navbar__menu--isLarge');
      var navbarWidth = navbar.offsetWidth - 30;
      var totalWidth = 0;
      var totalElements = navbar.children.length;
      var menuIteration = function(){
        totalWidth = 0;
        for (var index = 0; index < navbar.children.length; index++) {
            totalWidth = totalWidth + (navbar.children[index].offsetWidth);
        }
        // console.log(totalWidth, navbarWidth);
        return totalWidth;
      }

      totalWidth = menuIteration();

      if(totalWidth > navbarWidth){

        if((totalWidth - navbarWidth) > 0 && (totalWidth - navbarWidth) < (totalElements * 38)){
          navbar.classList.remove('NG-navbar__menu--isMedium');
          navbar.classList.add('NG-navbar__menu--isMedium');
          totalWidth = menuIteration();
          if(totalWidth > navbarWidth){
            navbar.classList.remove('NG-navbar__menu--isMedium');
            navbar.classList.remove('NG-navbar__menu--isLarge');
            navbar.classList.add('NG-navbar__menu--isLarge');
          }

        }else if(totalWidth > navbarWidth){
          navbar.classList.remove('NG-navbar__menu--isLarge');
          navbar.classList.add('NG-navbar__menu--isLarge');
        }
      }
      return false;

    }
  },
  hoverElement: function(){
    var navbar = document.querySelector('.js-navbar__menu');
    // console.log(navbar != undefined);
    if(navbar != undefined){
      for (var index = 0; index < navbar.children.length; index++) {
        navbar.children[index].addEventListener("mouseover", function(event){
          navbar.classList.remove('NG-navbar__menu--hover');
          navbar.classList.add('NG-navbar__menu--hover');
        });
        navbar.children[index].addEventListener("mouseout", function(event){
          navbar.classList.remove('NG-navbar__menu--hover');
        });
      }
    }
  },
  refresh: function(){
    navbarCapcalera.ifLarge();
  },
  init: function(){
    //navbarCapcalera.hoverElement();
    navbarCapcalera.ifLarge();
  }
}

// Navbar Position and Height
function setNavbarPosition(){
  var upHeader = document.querySelector('.NG-header__container');
  var navBar = document.querySelector('.NG-navbar');

  if (navBar != null && upHeader != null) {
    if(window.innerWidth > 1024){
      navBar.style.top = "";
    } else {
      var headerHeight = upHeader.querySelector('.NG-main').offsetHeight;
      navBar.style.top = (headerHeight - 1) + "px";
    }
  }
}

// Main menu displacement
var mainMenuDisplacement = {
  mainMenu: function(){
    var menu = document.getElementsByClassName('js-NG-navbar__menu');
    return menu;
  },
  desplacement: function(){

    var desktopWrapper = document.getElementsByClassName('NG-navbar__menu-desktop--wrapper');
    var mobileWrapper = document.getElementsByClassName('NG-navbar__menu-mobile--wrapper');
    var menu = mainMenuDisplacement.mainMenu();

    var w = window.innerWidth;
    if(w < 1025){
      var menuDetached = menu[0];
      menu[0].parentNode.removeChild(menu[0]);
      mobileWrapper[0].appendChild(menuDetached);
    } else {
      var menuDetached = menu[0];
      menu[0].parentNode.removeChild(menu[0]);
      desktopWrapper[0].appendChild(menuDetached);
    }

    //Remove hide-mobile class to show elements
    desktopWrapper[0].classList.remove("hide-mobile");
  }
}

function ready2() {
  if (document.readyState != 'loading'){

  } else {
    document.addEventListener('DOMContentLoaded', function(){
      navbarCapcalera.init();
      //megamenu.init();
      mainMenuDisplacement.desplacement();
      setNavbarPosition();
      //megamenuIE.initIEAnimation(NG_ISIE);
      //capcaleraSticky.initCapcaleraHeader();

      window.addEventListener('resize', function(){
        if(window.innerWidth > 1024){
          navbarCapcalera.refresh();
        }

        mainMenuDisplacement.desplacement();
        //megamenu.refreshResize();
        setNavbarPosition();
        //capcaleraSticky.debounce(//capcaleraSticky.stickyHeaderMobile());
      });

    });
  }
};

ready2();