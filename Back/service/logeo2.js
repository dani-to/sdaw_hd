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
                    if(res.user.roles=='Admin'){
                        window.location = "./Front/indexManager.html?nombre="+res.user.name+"&imagen="+res.user.profile_photo_path;
                    }else if(res.user.roles=='Empleado'){
                        window.location = "./Front/index.html?nombre="+res.user.name+"&id="+res.user.id+"&imagen="+res.user.profile_photo_path;
                    }else{
                        alert("Usuario o contraseña incorrecta");
                    }
            }).fail(function(data){
            $("#aviso").html("Usuario o contraseña incorrecta");
            document.getElementById('aviso').style.color = 'red';
            })
        }else{
            console.log("no sale");
        }
    });
}