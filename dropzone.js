var images = [];
var imagesresponse = [];

var dropzone = function() {
	var dropelement = document.getElementById("dropzone");

	var paragraph = document.createElement("p");
	paragraph.className = "dropzone-paragraph";
	var paragraphtext = document.createTextNode("Click or drops file here to upload");	
	paragraph.appendChild(paragraphtext);

	var inputfile = document.createElement("input");
	inputfile.setAttribute("type", "file");
	inputfile.setAttribute("id", "dropzone-input-file");
	inputfile.setAttribute("multiple", "multiple");

	var contentDrop = document.createElement("div");
	contentDrop.setAttribute("id", "dropContentGeral");
	contentDrop.setAttribute("class", "dropContent");
		
	dropelement.appendChild(paragraph);
	dropelement.appendChild(inputfile);
	dropelement.appendChild(contentDrop);

	dropelement.ondrop = function(event){
		showFiles(event.dataTransfer.files);
		this.className = "dropzone";
		return false;
	}

	dropelement.ondragover = function(){
		this.className = "dropzone dragover";
		return false;
	}   	

	dropelement.ondragleave = function(){
		this.className = "dropzone";
		return false;
	}

	document.getElementById("dropzone-input-file").addEventListener("change", function(event){
		showFiles(event.target.files);						
	});

	function showFiles(files){
		paragraph.setAttribute("style", "display: none;");
	
		for(var i = 0; i < files.length; i++){
			var tmppath = URL.createObjectURL(files[i]);

			var imgDiv = document.createElement("div");
			imgDiv.setAttribute("class", "container-image");

			var img = document.createElement("img");
			img.setAttribute("src", tmppath);

			imgDiv.appendChild(img);							
			contentDrop.appendChild(imgDiv);

			images.push(tmppath);
			imagesresponse.push(false);
		}

		contentDrop.setAttribute("style", "width: " + (20 + (images.length * 270)) + "px;");
	}
}

var uploadStatus = function() {
	var contentDrop = document.getElementById("dropContentGeral");
	for(var i = 0; i < contentDrop.childNodes.length; i++){
		contentDrop.childNodes[i].childNodes[0].setAttribute("class", "image-gray-scale");
		if(imagesresponse[i] === false){
			var errorSvg = document.createElement("div");
			errorSvg.setAttribute("class", "svg-error");
			errorSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 51.976 51.976" style="enable-background:new 0 0 51.976 51.976;" xml:space="preserve" width="512px" height="512px"><g><path d="M44.373,7.603c-10.137-10.137-26.632-10.138-36.77,0c-10.138,10.138-10.137,26.632,0,36.77s26.632,10.138,36.77,0   C54.51,34.235,54.51,17.74,44.373,7.603z M36.241,36.241c-0.781,0.781-2.047,0.781-2.828,0l-7.425-7.425l-7.778,7.778   c-0.781,0.781-2.047,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828l7.778-7.778l-7.425-7.425c-0.781-0.781-0.781-2.048,0-2.828   c0.781-0.781,2.047-0.781,2.828,0l7.425,7.425l7.071-7.071c0.781-0.781,2.047-0.781,2.828,0c0.781,0.781,0.781,2.047,0,2.828   l-7.071,7.071l7.425,7.425C37.022,34.194,37.022,35.46,36.241,36.241z" fill="#eb264a"/></g></svg>';
			contentDrop.childNodes[i].appendChild(errorSvg);
		}
		else{
			var successSvg = document.createElement("div");
			successSvg.setAttribute("class", "svg-success");
			successSvg.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve" width="512px" height="512px"><g><path d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M40.495,17.329l-16,18   C24.101,35.772,23.552,36,22.999,36c-0.439,0-0.88-0.144-1.249-0.438l-10-8c-0.862-0.689-1.002-1.948-0.312-2.811   c0.689-0.863,1.949-1.003,2.811-0.313l8.517,6.813l14.739-16.581c0.732-0.826,1.998-0.9,2.823-0.166   C41.154,15.239,41.229,16.503,40.495,17.329z" fill="#91DC5A"/></g></svg>';
			contentDrop.childNodes[i].appendChild(successSvg);
		}
	}
}