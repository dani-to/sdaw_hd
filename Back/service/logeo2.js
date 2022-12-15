$(document).ready(function(){
    var roles, id, name;
    logear();
});

function logear(){
    $("#login").on("submit", function(e){
        e.preventDefault();
        if($("#correo").val()!='' && $("#pass").val()!=''){
            $.ajax({
                url: "https://dashboard-app-sdaw-ii-ecsml.ondigitalocean.app/api/login",
                type: "post",
                data: {email: $("#correo").val(),
                        password: $("#pass").val() },
                headers: {
                    "contentType": "application/json",
                    "accept": "application/json",
                    "Access-Control-Allow-Origin":"*"
                } 
            })
            .done(function(res){
                console.log(res);
                console.log(res.user.id);
                    if(res.user.roles=='Admin'){
                        window.location = "./Front/indexManager.html?nombre="+res.user.name;
                    }else if(res.user.roles=='Empleado'){
                        window.location = "./Front/index.html?nombre="+res.user.name+"&id="+res.user.id;
                    }else{
                        console.log("Error con recibir datos");
                    }
            }).fail(function(data){
            alert("Try again champ!");
            })
        }else{
            console.log("no sale");
        }
    });
}