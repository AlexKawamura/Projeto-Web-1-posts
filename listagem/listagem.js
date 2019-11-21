var corpo_tabela = document.querySelector("tbody");

//Função para listar os Posts cadastrados
function listar(pagina) {
    //Fazendo o request AJAX para o json-server
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.response); //Salva um registro na variavel json
        var i;
        var _pag;
        if (json.length % 10 == 0){
          _pag = Math.trunc(json.length/10);
        } else {
          _pag = Math.trunc(json.length/10) + 1;
        }
        
        console.log(_pag);
        for(i = 0; i < json.length; i++){//For para preencher a tabela 
            var linha = document.createElement("tr");
            var id = document.createElement("th");
            id.setAttribute("id","idParaDelete"+i);
            var title = document.createElement("td");
            var author = document.createElement("td");
            var del = document.createElement("td");
            
            var texto_id = document.createTextNode(json[i].id);
            var texto_title = document.createTextNode(json[i].title);
            var texto_author = document.createTextNode(json[i].author);
            var icon_del = document.createElement("i");
            icon_del.setAttribute("class", "fa fa-trash");
            icon_del.setAttribute("onclick", "deletar()");

            id.appendChild(texto_id);
            title.appendChild(texto_title);
            author.appendChild(texto_author);
            del.appendChild(icon_del);
            linha.appendChild(id);
            linha.appendChild(title);
            linha.appendChild(author);
            linha.appendChild(del);

            corpo_tabela.appendChild(linha);
        }
        
      }
    };
    xhttp.open("GET", "http://localhost:3000/posts?_page="+ pagina, true);
    xhttp.send();
  }

  function deletar() {
    
    Swal.fire({
      title: 'O Arquivo será deletado. Tem certeza disso?',
      text: "Não será possível reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deletado!',
          'O Post foi deletado',
          'success'
        )
      }
    })
  }
//   function apaga(idDel) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("DELETE", "http://localhost:3000/posts/"+idDel, true);
//     xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
//     xhttp.onload = function () {

// 		if (xhttp.readyState == 4 && xhttp.status == "200") {
// 			Swal.fire({
// 				title: "Parabens!",
// 				text: "Post editado com sucesso!",
// 				icon: "success",
// 				confirmButtonText: "Aww yeah!",
// 				onClose: () => {
// 					document.location.reload(true)//Recarrega a página após o usuário confirmar o cadastro
// 				}
// 			});
// 	}
// 	xhttp.send(json);
// }