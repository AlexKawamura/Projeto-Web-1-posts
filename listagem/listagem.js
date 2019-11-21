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
            var title = document.createElement("td");
            var author = document.createElement("td");
            
            var texto_id = document.createTextNode(json[i].id);
            var texto_title = document.createTextNode(json[i].title);
            var texto_author = document.createTextNode(json[i].author);

            id.appendChild(texto_id);
            title.appendChild(texto_title);
            author.appendChild(texto_author);
            linha.appendChild(id);
            linha.appendChild(title);
            linha.appendChild(author);

            corpo_tabela.appendChild(linha);
        }
        
      }
    };
    xhttp.open("GET", "http://localhost:3000/posts?_page="+ pagina, true);
    xhttp.send();
  }