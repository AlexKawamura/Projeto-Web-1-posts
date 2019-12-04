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
		if (xhttp.readyState == 4 && xhttp.status == "200") {
			Swal.fire({
				title: "Parabens!",
				text: "Post editado com sucesso!",
				icon: "success",
				confirmButtonText: "Aww yeah!",
				onClose: () => {
					document.location.reload(true)// Recarrega a página após o usuário confirmar o cadastro
				}
			});
		} else if (xhttp.status == "404"){
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Não foi encontrado o post, tente buscar um ID!',
			  })
		}
	}
	xhttp.send(json);
}

function procurar(idPost) {
	var titulo = document.getElementById("inputTitle");
	var autor = document.getElementById("inputAuthor");
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "http://localhost:3000/posts/"+idPost, true);
	xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
		var json = JSON.parse(this.response); // Salva um registro na variavel json
		if (json.title === undefined) {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Preencha o campo ID!',
			  })
		} else {
			titulo.value = json.title;
			autor.value = json.author;
		}
		
        } else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Post não encontrado!',
			  })
		}
	}  
    
}

function limpar() {
	document.getElementById("inputTitle").value = "";
	document.getElementById("inputAuthor").value = "";
}