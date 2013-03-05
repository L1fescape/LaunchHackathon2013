var bindings = {
	bind : function() {
		$(".letsDJ").click(function(){
			$(".frame").animate({opacity : 0}, "slow" );
			$(".frame").css({display : "none"});
			$(".app_main").animate({width : "1000px"}, "slow" );
			$(".letsDJ").animate({opacity : 1}, "slow");
			$(".closeDJ").animate({opacity : 0.5}, "slow");
			$(".interfaceDJ").animate({opacity : 1, top : "100px"}, 1000);
			$(".letsDJ").animate({opacity : 0.4}, "slow");
			$(".dim").animate({opacity : 0.7}, 500 );
		});
		$(".closeDJ").click(function(){
			$(".app_main").animate({width : "600px"}, "slow" );
			$(".letsDJ").animate({opacity : 0.5}, "slow");
			$(".frame").css({display : "block"});
			$(".frame").animate({opacity : 1}, "slow" );
			$(".closeDJ").animate({opacity : 0}, "slow");
			$(".interfaceDJ").animate({opacity : 0}, "fast");
			$(".interfaceDJ").animate({top : "1000px"}, "fast");
			$(".dim").animate({opacity : 0}, "slow" );
			$(".app_roomlist").animate({opacity : 1}, "slow" );
			$(".slider").css({left : 0});
		});
		$(".aboutButton").click(function(){
			$(".app_main").animate({top : "-1000px"}, 500 );
			$(".aboutButton").animate({opacity : 0}, "slow" );
			$(".aboutButton").css({display : "none"});
			$(".aboutX").css({display : "block"});
			$(".aboutX").animate({opacity : 0.8}, "slow" );
		});
		$(".aboutClose").click(function(){
			$(".app_main").animate({top : "0px"}, 500 );
			$(".aboutX").animate({opacity : 0}, "slow" );
			$(".aboutX").css({display : "none"});
			$(".aboutButton").css({display : "block"});
			$(".aboutButton").animate({opacity : 1}, "slow" );
		});
		$(".aboutX").click(function(){
			$(".app_main").animate({top : "0px"}, 500 );
			$(".aboutX").animate({opacity : 0}, "slow" );
			$(".aboutX").css({display : "none"});
			$(".aboutButton").css({display : "block"});
			$(".aboutButton").animate({opacity : 1}, "slow" );
		});
		$("input[type='submit']").click(function() {
			$.post("/login", {"lol" : "lolz"}, function(output) {
				console.log(output)
				output = $.parseJSON(output);
				if (output['error']) {
					alert("There was an error logging you in :(");
				}
				else {
					$("input.username").val("");
					$("input.password").val("");
					window.location.hash = "/user/" + output['name'];
				}
				console.log(output);
			});
			return false;
		});
	$("input.password").keydown(function(e) {
		if (e.which == 13)
			$("input[type='submit']").click();
	});
	}
};
