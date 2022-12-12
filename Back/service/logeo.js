$(document).ready(function(){
    var roles, id, name;
    $("#login").on("submit", function(e){
        if($("#correo").val()!='' && $("#pass").val()!=''){
            var formData = new FormData(document.getElementById("login"));
            formData.append("email", $("#correo").val());
            formData.append("password", $("#pass").val());
            $.ajax({
                url: "https://dashboard-app-sdaw-ii-ecsml.ondigitalocean.app/api/login",
                type: "post",
                dataType: "html",
                data: formData,
                contentType: "application/json",
                headers: {
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":"*"
                }

            })
            .done(function(res){
                console.log(res);
                let USUARIO = JSON.parse(res);
                    name = USUARIO[0].name;
                    id = USUARIO[0].id;
                    roles = USUARIO[0].roles;
                    if(roles=="Admin"){
                        window.location = "./indexManager.html";
                    }else if(roles=="Cliente"){
                        window.location.href = "./indexCostumer.html";
                    }else if(roles=="Empleado"){
                        window.location.href = "./index.html?idempleado=${USUARIO[0].id}?name=${USUARIO[0].name}";
                    }else{
                        console.log("Error con api cesar");
                    }
            })
        }else{
            console.log("no sale");
        }
        e.preventDefault();
    });
});

