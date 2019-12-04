var itens_por_pag = 3;
var json = {};

// Função para listar os Posts cadastrados
function listar(pagina) {
  // Fazendo o request AJAX para o json-server
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response); // Salva um registro na variavel json
      var i;

      var corpo_tabela = document.querySelector("tbody");
      var nova_tabela = document.createElement('tbody');

      // For para preencher a tabela com base na página e na quantidade de itens por página
      for (var i = (pagina-1) * itens_por_pag; i < (pagina * itens_por_pag) && i < json.length; i++) {
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
        nova_tabela.appendChild(linha);
      }
      // Substitui a tabela atiga pela nova
      corpo_tabela.parentNode.replaceChild(nova_tabela, corpo_tabela);

      var btn_anterior = document.getElementById("anterior");
      var btn_proximo = document.getElementById("proximo");
      var numPaginas = Math.ceil(json.length / itens_por_pag);

      // Desabilita o botão anterior quando chegar na primeira página
      if (pagina == 1) {
        btn_anterior.setAttribute("class", "page-item disabled");
      } else {
        btn_anterior.setAttribute("class", "page-item");
      }
      // Desabilita o botão próximo quando chegar na última página
      if (pagina == numPaginas) {
        btn_proximo.setAttribute("class", "page-item disabled");
      } else {
        btn_proximo.setAttribute("class", "page-item");
      }

    }
  };
  xhttp.open("GET", "http://localhost:3000/posts", true);
  xhttp.send();
}

function deletar(idBotao) { // Id do botão passado como parametro
  var delBotao = document.getElementById(idBotao); // Pega o elemento do id
  var linha = delBotao.closest("tr").childNodes; // Pega a linha mais próxima do botão
  var idPost = linha[0].textContent // Pega o conteudo da coluna th onde está o id
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
    if (result.value) { // Começa o DELETE no json
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

// Ao carregar a página
window.onload = function() {
  var xhttp = new XMLHttpRequest();
  
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      json = JSON.parse(this.response);

      // Listagem da primeria página
      listar(1);
      // Função para calcular e criar o número de páginas
      calcPages(json);
    }
  };
  xhttp.open("GET", "http://localhost:3000/posts", true);
  xhttp.send();
}

function calcPages(json) {
  var pages = Math.ceil(json.length / itens_por_pag); // Calcula a quantidade de páginas
  var i;

  // For para criar a paginação
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