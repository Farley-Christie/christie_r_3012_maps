// JavaScript Doc
(function(){
"use strict";
console.log("js loaded");
var headerNav= document.querySelector("#topNav"),
burger = document.querySelector("#burger"), 
httpRequest;

function setUp(){
	var splash = document.querySelector("#splash");
	//console.log(splash);
	if (splash!=null){
		splash.style.height= (window.innerHeight)+"px";
	}
}
function showMenu(){
	if(headerNav.style.display=="block"){
		headerNav.style.display="none";
	}else{
		headerNav.style.display="block";
	}
}
window.onload = setUp();
burger.addEventListener("click",showMenu,false);
})();