var corpo_tabela = document.querySelector("tbody");

function listar() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.response);
        var i;
        for(i = 0; i < json.length; i++){
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
    xhttp.open("GET", "http://localhost:3000/posts", true);
    xhttp.send();
  }