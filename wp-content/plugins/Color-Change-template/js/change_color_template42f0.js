jQuery(document).ready(function ($) {
		function clearColor(){
			$('body').removeClass('color-green color-blue color-orange color-sienna color-turquoise color-lightblue')
		}

		
		$('body').prepend('<div class="demo-rtl"><a class="rtldemo" href="?d=rtl" target="_blank">RTL</a></div><div class="demo-ltr"><a class="ltrdemo" href="?d=ltr" target="_blank">LTR</a></div><div class="tools"><span class="toggle"><img src="'+ changetemplatecolor_object.changetemplatecolor_ajax_url +'" class="img-responsive" alt=""></span><a href="#" class="color-blue">Blue</a><a href="#" class="color-green">Green</a><a href="#" class="color-orange">Orange</a><a href="#" class="color-sienna">Sienna</a><a href="#" class="color-turquoise">Turquoise</a><a href="#" class="color-lightblue">Light-Blue</a></div>')
		var $cookievar=readCookie('comtemplate');
		if(typeof($cookievar)!='undefined' && $cookievar!='' ){
			$('body').addClass($cookievar)
		}
		
		$(document).on('click','.tools a', function(e){
			e.preventDefault();
			var $this = $(this);
			var $logo = $("#logo");
			if ($this.hasClass('color-blue')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_blue ); 
				$('body').addClass('color-blue')
				createCookie('comtemplate','color-blue',1);
			}
			if ($this.hasClass('color-green')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_grean ); 
				$('body').addClass('color-green')
				createCookie('comtemplate','color-green',1);
			}
			if ($this.hasClass('color-orange')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_orange );
				$('body').addClass('color-orange')
				createCookie('comtemplate','color-orange',1);
			}
			if ($this.hasClass('color-sienna')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_sienna );
				$('body').addClass('color-sienna')
				createCookie('comtemplate','color-sienna',1);
			}
			if ($this.hasClass('color-turquoise')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_turquoise );
				$('body').addClass('color-turquoise')
				createCookie('comtemplate','color-turquoise',1);
			}
			if ($this.hasClass('color-lightblue')){
				clearColor();
				$logo.attr('src', changetemplatecolor_object.changetemplate_logo_lightblue );
				$('body').addClass('color-lightblue')
				createCookie('comtemplate','color-lightblue',1);
			}
		})
	
	})
	
	
	function createCookie(name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			expires = "; expires=" + date.toUTCString();
		}
		document.cookie = name + "=" + value + expires + "; path=/";
	}
	
	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}