var records_per_page = 2;
var json = {};

//Função para listar os Posts cadastrados
function listar(pagina) {
  //Fazendo o request AJAX para o json-server
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response); //Salva um registro na variavel json
      console.log(json);
      var i;

      var corpo_tabela = document.querySelector("tbody");
      var new_tbody = document.createElement('tbody');

      for(var i = (pagina-1) * records_per_page; i < (pagina * records_per_page) && i < json.length; i++){//For para preencher a tabela
        var linha = document.createElement("tr");
        var id = document.createElement("th");
        var title = document.createElement("td");
        var author = document.createElement("td");
        var del = document.createElement("td");
        var icon_del = document.createElement("button");
            
        var texto_id = document.createTextNode(json[i].id);
        var texto_title = document.createTextNode(json[i].title);
        var texto_author = document.createTextNode(json[i].author);

        id.setAttribute("id","idParaDelete"+i);
        icon_del.setAttribute("id","delBotao"+i);
        icon_del.setAttribute("class", "fa fa-trash btn btn-danger");
        icon_del.setAttribute("onclick", "deletar(this.id)");

        id.appendChild(texto_id);
        title.appendChild(texto_title);
        author.appendChild(texto_author);
        del.appendChild(icon_del);
        linha.appendChild(id);
        linha.appendChild(title);
        linha.appendChild(author);
        linha.appendChild(del);
        new_tbody.appendChild(linha);
      }
      console.log(corpo_tabela.parentNode);
      corpo_tabela.parentNode.replaceChild(new_tbody, corpo_tabela);

    }
  };
  xhttp.open("GET", "http://localhost:3000/posts", true);
  xhttp.send();
}

function deletar(idBotao) { // id do botão passado como parametro
  var delBotao = document.getElementById(idBotao); // pega o elemento do id
  var linha = delBotao.closest("tr").childNodes; // pega a linha mais próxima do botão
  var idPost = linha[0].textContent // pega o conteudo da coluna th onde está o id
  console.log(idPost);
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
    if (result.value) { // começa o DELETE no json
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", "http://localhost:3000/posts/"+idPost, true);
      xhr.onload = function () {
        var posts = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
          console.table(posts);
        } else {
          console.error(posts);
        }
      }
      xhr.send(null);
      Swal.fire(
        'Deletado!',
        'O Post foi deletado',
        'success',
        'Beleza!'
      )
      
    }
  })
}

window.onload = function() {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response);

      console.log(json);

      listar(1);
      calcPages(json);
    }
  };
  xhttp.open("GET", "http://localhost:3000/posts", true);
  xhttp.send();
}

function calcPages(json) {
  console.log(json);
  console.log(records_per_page);
  var pages = Math.ceil(json.length / records_per_page);
  console.log('pages'+pages);
  var i;

  for(i = pages; i >= 1; i--) {
    var page_item = document.createElement('li');
    var page_link = document.createElement('a');

    var numPage = document.createTextNode(i);

    page_item.setAttribute("class", "page-item");
    page_link.setAttribute("class", "page-link");
    page_link.setAttribute("href", "javascript:listar("+i+")");

    page_link.appendChild(numPage);
    page_item.appendChild(page_link);

    var listaPage = document.getElementById("pagination");
    listaPage.insertBefore(page_item, listaPage.childNodes[3]);
  }

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