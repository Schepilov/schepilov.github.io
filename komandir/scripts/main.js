$(function () {
	'use strict';

	var city = $( '#input_city' ),
		from = $( '#input_from' ),
		to   = $( '#input_to' );

	from.kladr({
		token: '51dfe5d42fb2b43e3300006e',
		key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
		type: $.kladr.type.street,
		parentType: $.kladr.type.city,
		parentId: city.val()
	});

	to.kladr({
		token: '51dfe5d42fb2b43e3300006e',
		key: '86a2c2a06f1b2451a87d05512cc2c3edfdf41969',
		type: $.kladr.type.street,
		parentType: $.kladr.type.city,
		parentId: city.val()
	});

	city.change(function(){
		from.kladr('parentId', city.val());
		to.kladr('parentId', city.val());
	});
});

$(function () {

	var citySelect = $('.city__choice');

	citySelect.fancySelect();
	citySelect.trigger('enable.fs');
});

$('input#input_from').focus(function() {
    $('.input#from').addClass("focus");
});
 
$('input#input_from').blur(function() {
    $('.input#from').removeClass("focus");
});

$('input#input_to').focus(function() {
    $('.input#to').addClass("focus");
});
 
$('input#input_to').blur(function() {
    $('.input#to').removeClass("focus");
});

$('input#input_name').focus(function() {
    $('.input#input_name').addClass("focus");
});
 
$('input#input_name').blur(function() {
    $('.input#input_name').removeClass("focus");
});

$('input#input_phone').focus(function() {
    $('.input#input_phone').addClass("focus");
});
 
$('input#input_phone').blur(function() {
    $('.input#input_phone').removeClass("focus");
});


