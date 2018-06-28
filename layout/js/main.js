//Document ready
$(document).ready(function() {

	/********************************
	    - Hide loader on mobile -
	********************************/
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		$(".player").hide();
    	$(".player-controls").hide();
	}
	
	/************************
	    - Scroll reveal -
	************************/
   	window.sr = new scrollReveal({
	  	reset:true,
	  	move:"10px",
	  	mobile:false
	});
	

	
	/***********************
	    - Contact form -
	***********************/
    $('#submit').click(function() {   	
		//Подтвердить и обработать форму
    	$("#ajax-contact-form").validate({             
			rules:{			
				name:{
					required:true,
				},
							
				email:{
					required:true,
					email:true,
				},
							
				message:{
					required:true,
				},
			},
			
			messages:{			
				name:{
					required:"<i class='fa fa-exclamation-triangle name'></i>",
				},
			
				email:{
					required:"<i class='fa fa-exclamation-triangle email'></i>",
					email:"<i class='fa fa-exclamation-triangle email'></i>",
				},
			
				message:{
					required:"<i class='fa fa-exclamation-triangle message'></i>",
				},
			
			},

            //Submit form
           	submitHandler:function(form) {
		 		//Создание переменных из формы
		 		var name = $('input#name').val(); 
		 		var email = $('input#email').val();  
		 		var message = $('textarea#message').val();

               	//Создайте переменные, которые будут отправлены в строке URL-адреса в contact.php
              	var dataString = '&name='+name+'&email='+email+'&message='+message;
        		
				$.ajax({
                	type: "POST",
                   	url: "contact.php",
                    data: dataString,
                    success: function(data) {
                    	if(data==='ok') { 
							$("#ajax-contact-form").find('input[type=text], input[type=email], textarea').val(""); 
						} 
                        
						if(data=='ok') {
                        	result = '<div class="notification_ok"><i class="fa fa-check"></i> Your email was sent. Thanks!</div>';
                       	} else {
                        	result = data;
                        }
                        
						$('#note').html(result);
           			}                         
              	});
					  
				return false;
        	}
		});
    });

	/*************************
	    - Ajax mailchimp -
	*************************/
    $('#ajaxChimp').ajaxChimp({
      	language:'eng',
      	url:'http://xxx.xxx.list-manage.com/subscribe/post?u=xxx&id=xxx'
    });

    $.ajaxChimp.translations.eng = {
      	'submit':'Submitting...',
      	0:'<i class="fa fa-check"></i> We will be in touch soon!',
      	1:'<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
      	2:'<i class="fa fa-warning"></i> E-mail address is not valid.',
      	3:'<i class="fa fa-warning"></i> E-mail address is not valid.',
      	4:'<i class="fa fa-warning"></i> E-mail address is not valid.',
      	5:'<i class="fa fa-warning"></i> E-mail address is not valid.'
    }
	
	/*************************
	    - Youtube player -
	*************************/
    $(".player").mb_YTPlayer();
    
   	//Player контроль
    $('#play').on("click", function(){
    	$('.player').playYTP();
	});

  	$('#pause').on("click", function(){
    	$('.player').pauseYTP();
	});
	
	//Google Maps
	googleMaps();
	
});

/**********************
	- Window load -
**********************/
$(window).load(function() {
    $(".page-loader").delay(700).fadeOut("slow");
 
	setTimeout(function() {
		$(".logo").delay(1000).css({display: 'none'}).fadeIn(1000);
		$("h1").delay(1000).css({display: 'none'}).fadeIn(1000);
		$("p").delay(1000).css({display: 'none'}).fadeIn(1000);
		$(".countdown").delay(1000).css({display: 'none'}).fadeIn(1000);
		$(".mouse").delay(1000).css({display: 'none'}).fadeIn(1000);
    });
});

/**********************
	- Google Maps -
**********************/
function googleMaps() {
	//переменные
	var title = arrMap.title;
	var latitude = arrMap.latitude;
	var longitude = arrMap.longitude;
	var zoom = arrMap.zoom;
	
	//Маркер icon
	var marker_url = arrMap.marker;
	
	//Главный цвет
	var main_color = arrMap.color;
	
	//Насыщенность и яркость
	var saturation_value = -20;
	var brightness_value = 5;

	//Стиль карты
	var style= [ 
		{//Установите насыщенность для меток на карте
			elementType:"labels",
			stylers:[
				{saturation:saturation_value},
			]
		}, 
		
		{ 
			featureType:"poi",
			elementType:"labels",
			stylers:[
				{visibility:"off"},
			]
		},
		
		{//Скрыть ярлыки шоссе на карте
			featureType:'road.highway',
			elementType:'labels',
			stylers:[
				{visibility:"off"},
			]
		}, 
	
		{//Скрыть местные дорожные знаки на карте
			featureType:"road.local", 
			elementType:"labels.icon", 
			stylers:[
				{visibility:"off"}, 
			] 
		},
		
		{
			featureType:"road.arterial", 
			elementType:"labels.icon", 
			stylers:[
				{visibility:"off"},
			] 
		},
	
		{//Скрыть дорожные метки на карте
			featureType:"road",
			elementType:"geometry.stroke",
			stylers:[
				{visibility:"off"},
			]
		},
		
		{//Стиль различных элементов на карте
			featureType:"transit", 
			elementType:"geometry.fill", 
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		}, 
		
		{
			featureType:"poi",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"poi.government",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"poi.sport_complex",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"poi.attraction",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"poi.business",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"transit",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"transit.station",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"landscape",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]	
		},
		
		{
			featureType:"road",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
	
		{
			featureType:"road.highway",
			elementType:"geometry.fill",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		},
		
		{
			featureType:"water",
			elementType:"geometry",
			stylers:[
				{hue:main_color},
				{visibility:"on"}, 
				{lightness:brightness_value}, 
				{saturation:saturation_value},
			]
		}
	];
	
	//Настройка параметров карты google
	var map_options = {
		center:new google.maps.LatLng(latitude, longitude),
		zoom:zoom,
		panControl:false,
		zoomControl:false,
		mapTypeControl:false,
		streetViewControl:false,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		scrollwheel:false,
		styles:style
	}
	
	//Инициализация карты
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);
 
	//Добавить пользовательский маркер на карту        
	var marker = new google.maps.Marker({
		position:new google.maps.LatLng(latitude, longitude),
		map:map,
		title:title,
		visible:true,
		icon:marker_url
	});

	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});

	//Добавление пользовательских кнопок для увеличения / уменьшения масштаба на карте
	if (arrMap.zoomControlDiv==undefined) {		
		function customZoomControl(controlDiv, map) {
			//Grap the zoom elements from the DOM and insert them in the map 
			var controlUIzoomIn = document.getElementById('zoom-in'),
			controlUIzoomOut = document.getElementById('zoom-out');
		  
			controlDiv.appendChild(controlUIzoomIn);
			controlDiv.appendChild(controlUIzoomOut);
	
			//Setup the click event listeners and zoom-in or out according to the clicked element
			google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
				map.setZoom(map.getZoom()+1);
			});
			
			google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
				map.setZoom(map.getZoom()-1);
			});
		}
	
		var zoomControlDiv = document.createElement('div');		
		var zoomControl = new customZoomControl(zoomControlDiv, map);
		arrMap.zoomControlDiv = zoomControlDiv;
	}
		
	//Вставить масштабируемый div в левом верхнем углу карты
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(arrMap.zoomControlDiv);
}

