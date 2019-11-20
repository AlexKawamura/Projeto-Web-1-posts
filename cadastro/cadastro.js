//função para efetuar o cadastro no JSON
function cadastrar() {
    if(validar()) {
        //Define o formulário e armazena os campos em um tipo FormData
        var elementos = document.getElementsByClassName("form-control sm-3");
        formData = new FormData();
        for(var i=0; i<elementos.length; i++)
        {
            formData.append(elementos[i].name, elementos[i].value);
        }
        //Transforma esse FormData em um formato JSON
        var json = JSON.stringify(Object.fromEntries(formData));
        //Faz a requisição AJAX para o servidor JSON e cadastra o formulário preenchido
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:3000/posts", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.onload = function () {
            var posts = JSON.parse(xhttp.responseText);
            if (xhttp.readyState == 4 && xhttp.status == "201") {
                console.table(posts);
            } else {
                console.error(posts);
            }
        }
        xhttp.send(json);
        //Evita que a página atualize para mostrar o SweetAlert
        event.preventDefault();
        Swal.fire({
            title: "Parabens!",
            text: "Cadastrado com sucesso!",
            icon: "success",
            confirmButtonText: "Aww yeah!",
            onClose: () => {
                document.location.reload(true)//Recarrega a página após o usuário confirmar o cadastro
            }
        });
    } else {
        event.preventDefault();
    }
}

//função para validação
function validar() {
    var title = postCad.title.value;
    var author = postCad.author.value;

    if (title == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha o campo título!',
          })
        return false;
    } else if (author == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Preencha o campo autor!',
          })
        return false;
    } else {
        return true;
    }
}



