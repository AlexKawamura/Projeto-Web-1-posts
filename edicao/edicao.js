function editar() {
	var id = document.getElementById("inputId").value;
	var data = {};
	data.title = document.getElementById("inputTitle").value;
	data.author  = document.getElementById("inputAuthor").value;
	var json = JSON.stringify(data);

	var xhttp = new XMLHttpRequest();
	xhttp.open("PUT", "http://localhost:3000/posts/"+id, true);
	xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhttp.onload = function () {
		var users = JSON.parse(xhttp.responseText);
		if (xhttp.readyState == 4 && xhttp.status == "200") {
			alert('Edicao feita com sucesso');
		} else {
			alert('Erro ao editar');
		}
	}
	xhttp.send(json);
}