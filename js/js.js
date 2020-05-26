$(document).ready(()=>{

	//variables globales
	var camisas = $("#camisas");
	var pantalones = $("#pantalones");
	var detalles = $("#detalles");

	var menu = $("#menu");
	var data = null;
	//check de click sobre camisas

	camisas.click(function(){
		show("camisas");
		defa();
		listener_ropa();
	});

	//check de click sobre pantalones
	pantalones.click(function(){
		show("pantalones");
	});

	//check de click sobre detalles
	detalles.click(function(){
		show("detalles");
	});	

	function show(seccion){
		if( seccion == "camisas"){
			data = [cuellos, botones, mangas];
		}
		else if( seccion == "pantalones" ){
			data = [bolsas, cortes, detallines];
		}
		else if( seccion == "detalles" ){
			//console.log("detalles");
		}
		menu.html(`
		<div class="info">
		</div>
		`);
		for (i in data){
			//console.log(data[i]);
			$(`<h3>${data[i][0].padre}</h3>
				<div id="${data[i][0].padre}"></div>`).appendTo(".info");
			for (j in data[i]){
				$(`<li id="${data[i][j].id}" class="${data[i][j].class}">${data[i][j].nombre}</li>`).appendTo(`#${data[i][0].padre}`);
			}
		}
		$(".info").accordion();
	}

	//muestra por default lo que se tiene que hacer
	function defa(){
		var muestras = $("#muestras");	
		//esto es para desplegar el ultimo conjunto posible
		muestras.html(`<div id="ropa"></div>`);
		$(`<img src ='img/${data[i][0].carpeta}/${data[i][0].carpeta}_base.png'>`).appendTo("#ropa");
		localStorage.setItem(`base_${data[i][0].carpeta}`, `img/${data[i][0].carpeta}/${data[i][0].carpeta}_base.png`);
		for (i in data){
			var parte_actual = localStorage.getItem(`${data[i][0].class}`);
			//console.log(`${data[i][0].class}`);
			$(`<img id="parte_${data[i][0].class}" src="img/${data[i][0].carpeta}/${parte_actual}.png">`)
			.appendTo("#ropa");
		}
		$("#pdf").show();
	}

	function listener_ropa(){
		//despliegue de conjunto
		for (i in data){
			$(`.${data[i][0].class}`).click(function(){
				let image = this.getAttribute("id");
				let clase = this.getAttribute("class");
				$(`#parte_${clase}`).attr("src",`img/${data[i][0].carpeta}/`+image+`.png`);
				let imagen = `img/${data[i][0].carpeta}/`+image+`.png`;
				localStorage.setItem(clase, image);
				//localStorage.setItem(`imagen_${clase}`, imagen);
			});
		}
	}

	$("#pdf").click(function(){
		$("#HTMLtoPDF").html("");
		$(`<h1>Datos de uso</h1><br>`).appendTo("#HTMLtoPDF");
		for(var i =0; i < localStorage.length; i++){
		   let ruta = localStorage.getItem(localStorage.key(i));
		   if(ruta[0] != 'i'){
		   		$(`<p>${ruta}</p>`).appendTo("#HTMLtoPDF");
		   }
		}
		HTMLtoPDF();
	});
});