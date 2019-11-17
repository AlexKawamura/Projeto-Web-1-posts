function cadastrar() {
    var elementos = document.getElementsByClassName("form-control sm-3");
    formData = new FormData();
    for(var i=0; i<elementos.length; i++)
    {
        formData.append(elementos[i].name, elementos[i].value);
    }
    
    var json = JSON.stringify(Object.fromEntries(formData));
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
    event.preventDefault();
    Swal.fire({
        title: "Parabens!",
        text: "Cadastrado com sucesso!",
        icon: "success",
        confirmButtonText: "Aww yeah!",
        onClose: () => {
            document.location.reload(true)
          }
      });
}