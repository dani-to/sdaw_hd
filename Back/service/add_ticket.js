$(document).ready(function(){
    var id_cliente;
    
    $("#fmr-costumer").on("submit", function(e){
        var combo = document.getElementById("tipo");
        var selected = combo.options[combo.selectedIndex].text;
        if($("#producto").val()!='Selecciona el articulo' && $("#nombre").val()!='' && $("#lastName1").val()!='' && $("#lastName2").val()!='' && $("#eMail").val()!='' 
            && $("#telephone").val()!='' && $("#about").val()!='' && selected!='Elige una opción' && $("#about").val()!='...'){
            var formData = new FormData(document.getElementById("fmr-costumer"));
            formData.append("nombre", $("#nombre").val());
            formData.append("apaterno", $("#lastName1").val());
            formData.append("amaterno", $("#lastName2").val());
            $.ajax({
                url: "../Back/webhook/add_cliente.php",
                type: "post",
                dataType: "html",
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            })
            .done(function(res){
                console.log(res);
                if(res==1){
                    $.ajax({
                        url: "../Back/webhook/consulta_cliente_id.php",
                        type: "post",
                        dataType: "html",
                        cache: false,
                        contentType: false,
                        processData: false
                    })
                    .done(function (res) {
                        let CLIENTE = JSON.parse(res);
                        $("#id_cliente").val(CLIENTE[0].id_clientes);
                        console.log($   ("#id_cliente").val());
                        formData.append("id_cliente", $("#id_cliente").val());
                        formData.append("correo", $("#eMail").val());
                        $.ajax({
                            url: "../Back/webhook/add_correo.php",
                            type: "post",
                            dataType: "html",
                            data: formData,
                            cache: false,
                            contentType: false,
                            processData: false
                        })
                        .done(function(res){
                            console.log(res);
                            if($("#eMail2").val()!=''){
                                formData.append("correo", $("#eMail2").val());
                                $.ajax({
                                    url: "../Back/webhook/add_correo.php",
                                    type: "post",
                                    dataType: "html",
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    processData: false
                                })
                                .done(function(res){
                                    console.log(res);
                                    formData.append("telefono", $("#telephone").val());
                                    $.ajax({
                                        url: "../Back/webhook/add_telefono.php",
                                        type: "post",
                                        dataType: "html",
                                        data: formData,
                                        cache: false,
                                        contentType: false,
                                        processData: false
                                    })
                                    .done(function(res){
                                        console.log(res);
                                        if($("#telephone2").val()!=''){
                                            formData.append("telefono", $("#telephone2").val());
                                            $.ajax({
                                                url: "../Back/webhook/add_telefono.php",
                                                type: "post",
                                                dataType: "html",
                                                data: formData,
                                                cache: false,
                                                contentType: false,
                                                processData: false
                                            })
                                            .done(function(res){
                                                console.log(res);
                                                var combo = document.getElementById("tipo");
                                                var selected = combo.options[combo.selectedIndex].text;
                                                console.log(selected);
                                                formData.append("tipo", selected);
                                                    $.ajax({
                                                        url: "../Back/webhook/add_incidente.php",
                                                        type: "post",
                                                        dataType: "html",
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false
                                                    })
                                                    .done(function(res){
                                                        console.log(res);
                                                        if(res==1){
                                                            $.ajax({
                                                                url: "../Back/webhook/consulta_incidente_id.php",
                                                                type: "post",
                                                                dataType: "html",
                                                                cache: false,
                                                                contentType: false,
                                                                processData: false
                                                            })
                                                            .done(function (res){
                                                                let INCIDENTE = JSON.parse(res);
                                                                var files = $('#imagen')[0].files[0];
                                                                formData.append('imagen',files);
                                                                console.log(INCIDENTE[0].id_incidente);
                                                                $("#id_incidente").val(INCIDENTE[0].id_incidente);
                                                                formData.append("idventa", $("#idTicket").val());
                                                                formData.append("id_incidente", $("#id_incidente").val());
                                                                formData.append("id_cliente", $("#id_cliente").val());
                                                                formData.append("descripcion", $("#about").val());
                                                                formData.append("producto", $("#producto").val());
                                                                $.ajax({
                                                                    url: "../Back/webhook/add_ticket.php",
                                                                    type: "post",
                                                                    data: formData,
                                                                    cache: false,
                                                                    contentType: false,
                                                                    processData: false
                                                                })
                                                                .done(function(res){
                                                                    console.log(res);
                                                                    if(res==1){
                                                                        $.ajax({
                                                                            url: "../Back/webhook/consulta_ticket_id.php",
                                                                            type: "post",
                                                                            dataType: "html",
                                                                            cache: false,
                                                                            contentType: false,
                                                                            processData: false
                                                                        })
                                                                        .done(function(res){
                                                                            let TICKET = JSON.parse(res);
                                                                            $("#folio").val("Tu folio de seguimiento es: "+TICKET[0].folio);
                                                                            formData.append("folio", TICKET[0].folio);
                                                                            formData.append("correo", $("#eMail").val());
                                                                            $.ajax({
                                                                                url: "../Back/webhook/correo_cliente.php",
                                                                                type: "post",
                                                                                dataType: "html",
                                                                                data: formData,
                                                                                cache: false,
                                                                                contentType: false,
                                                                                processData: false
                                                                            })
                                                                            .done(function(res){
                                                                                console.log(res);
                                                                            })
                                                                        })
                                                                    }else{
                                                                        $("#folio").val("No se guardo el ticket");
                                                                    }
                                                                })
                                                            })
                                                        }else{
                                                            $("#folio").val("No se guardo el incidente");
                                                        }
                                                    })
                                            })
                                        }else{
                                            var combo = document.getElementById("tipo");
                                            var selected = combo.options[combo.selectedIndex].text;
                                            console.log(selected);
                                            formData.append("tipo", selected);
                                            $.ajax({
                                                url: "../Back/webhook/add_incidente.php",
                                                type: "post",
                                                dataType: "html",
                                                data: formData,
                                                cache: false,
                                                contentType: false,
                                                processData: false
                                            })
                                            .done(function(res){
                                                console.log(res);
                                                if(res==1){
                                                    $.ajax({
                                                        url: "../Back/webhook/consulta_incidente_id.php",
                                                        type: "post",
                                                        dataType: "html",
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false
                                                    })
                                                    .done(function (res){
                                                        let INCIDENTE = JSON.parse(res);
                                                        var files = $('#imagen')[0].files[0];
                                                                formData.append('imagen',files);                                                              console.log(INCIDENTE[0].id_incidente);
                                                        $("#id_incidente").val(INCIDENTE[0].id_incidente);
                                                        formData.append("idventa", $("#idTicket").val());
                                                        formData.append("id_incidente", $("#id_incidente").val());
                                                        formData.append("id_cliente", $("#id_cliente").val());
                                                        formData.append("descripcion", $("#about").val());
                                                        formData.append("producto", $("#producto").val());
                                                        $.ajax({
                                                            url: "../Back/webhook/add_ticket.php",
                                                            type: "post",
                                                            dataType: "html",
                                                            data: formData,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false
                                                        })
                                                        .done(function(res){
                                                            console.log(res);
                                                            if(res==1){
                                                                $.ajax({
                                                                    url: "../Back/webhook/consulta_ticket_id.php",
                                                                    type: "post",
                                                                    dataType: "html",
                                                                    cache: false,
                                                                    contentType: false,
                                                                    processData: false
                                                                })
                                                                .done(function(res){
                                                                    let TICKET = JSON.parse(res);
                                                                    $("#folio").val("Tu folio de seguimiento es: "+TICKET[0].folio);
                                                                    formData.append("folio", TICKET[0].folio);
                                                                    formData.append("correo", $("#eMail").val());
                                                                    $.ajax({
                                                                        url: "../Back/webhook/correo_cliente.php",
                                                                        type: "post",
                                                                        dataType: "html",
                                                                        data: formData,
                                                                        cache: false,
                                                                        contentType: false,
                                                                        processData: false
                                                                    })
                                                                    .done(function(res){
                                                                        console.log(res);
                                                                    })
                                                                })
                                                            }
                                                        })
                                                    })
                                                }
                                            })
                                        }
                                    })

                                })
                            }else{
                            formData.append("telefono", $("#telephone").val());
                                $.ajax({
                                    url: "../Back/webhook/add_telefono.php",
                                    type: "post",
                                    dataType: "html",
                                    data: formData,
                                    cache: false,
                                    contentType: false,
                                    processData: false
                                })
                                .done(function(res){
                                    console.log(res);
                                    if($("#telephone2").val()!=''){
                                        formData.append("telefono", $("#telephone2").val());
                                        $.ajax({
                                            url: "../Back/webhook/add_telefono.php",
                                            type: "post",
                                            dataType: "html",
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false
                                        })
                                        .done(function(res){
                                            console.log(res);
                                            var combo = document.getElementById("tipo");
                                            var selected = combo.options[combo.selectedIndex].text;
                                            console.log(selected);
                                            formData.append("tipo", selected);
                                            $.ajax({
                                                url: "../Back/webhook/add_incidente.php",
                                                type: "post",
                                                dataType: "html",
                                                data: formData,
                                                cache: false,
                                                contentType: false,
                                                processData: false
                                            })
                                            .done(function(res){
                                                console.log(res);
                                                if(res==1){
                                                    $.ajax({
                                                        url: "../Back/webhook/consulta_incidente_id.php",
                                                        type: "post",
                                                        dataType: "html",
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false
                                                    })
                                                    .done(function (res){
                                                        let INCIDENTE = JSON.parse(res);                                                                console.log(INCIDENTE[0].id_incidente);
                                                        $("#id_incidente").val(INCIDENTE[0].id_incidente);
                                                        var files = $('#imagen')[0].files[0];
                                                                formData.append('imagen',files);
                                                        formData.append("idventa", $("#idTicket").val());
                                                        formData.append("id_incidente", $("#id_incidente").val());
                                                        formData.append("id_cliente", $("#id_cliente").val());
                                                        formData.append("descripcion", $("#about").val());
                                                        formData.append("producto", $("#producto").val());
                                                        $.ajax({
                                                            url: "../Back/webhook/add_ticket.php",
                                                            type: "post",
                                                            dataType: "html",
                                                            data: formData,
                                                            cache: false,
                                                            contentType: false,
                                                            processData: false
                                                        })
                                                        .done(function(res){
                                                            console.log(res);
                                                            if(res==1){
                                                                $.ajax({
                                                                    url: "../Back/webhook/consulta_ticket_id.php",
                                                                    type: "post",
                                                                    dataType: "html",
                                                                    cache: false,
                                                                    contentType: false,
                                                                    processData: false
                                                                })
                                                                .done(function(res){
                                                                    let TICKET = JSON.parse(res);
                                                                    $("#folio").val("Tu folio de seguimiento es: "+TICKET[0].folio);
                                                                    formData.append("folio", TICKET[0].folio);
                                                                    formData.append("correo", $("#eMail").val());
                                                                    $.ajax({
                                                                        url: "../Back/webhook/correo_cliente.php",
                                                                        type: "post",
                                                                        dataType: "html",
                                                                        data: formData,
                                                                        cache: false,
                                                                        contentType: false,
                                                                        processData: false
                                                                    })
                                                                    .done(function(res){
                                                                        console.log(res);
                                                                    })
                                                                })
                                                            }else{
                                                                $("#folio").val("No se guardo el ticket");
                                                            }
                                                        })
                                                    })
                                                }else{
                                                    $("#folio").val("No se guardo el incidente");
                                                }
                                            })
                                        })
                                    }else{
                                        var combo = document.getElementById("tipo");
                                        var selected = combo.options[combo.selectedIndex].text;
                                        console.log(selected);
                                        formData.append("tipo", selected);
                                        $.ajax({
                                            url: "../Back/webhook/add_incidente.php",
                                            type: "post",
                                            dataType: "html",
                                            data: formData,
                                            cache: false,
                                            contentType: false,
                                            processData: false
                                        })
                                        .done(function(res){
                                            console.log(res);
                                            if(res==1){
                                                $.ajax({
                                                    url: "../Back/webhook/consulta_incidente_id.php",
                                                    type: "post",
                                                    dataType: "html",
                                                    cache: false,
                                                    contentType: false,
                                                    processData: false
                                                })
                                                .done(function (res){
                                                    let INCIDENTE = JSON.parse(res);                                                                console.log(INCIDENTE[0].id_incidente);
                                                    $("#id_incidente").val(INCIDENTE[0].id_incidente);
                                                    formData.append("idventa", $("#idTicket").val());
                                                    formData.append("id_incidente", $("#id_incidente").val());
                                                    formData.append("id_cliente", $("#id_cliente").val());
                                                    formData.append("descripcion", $("#about").val());
                                                    formData.append("producto", $("#producto").val());
                                                    var files = $('#imagen')[0].files[0];
                                                                formData.append('imagen',files);
                                                    $.ajax({
                                                        url: "../Back/webhook/add_ticket.php",
                                                        type: "post",
                                                        dataType: "html",
                                                        data: formData,
                                                        cache: false,
                                                        contentType: false,
                                                        processData: false
                                                    })
                                                    .done(function(res){
                                                        console.log(res);
                                                        if(res==1){
                                                            $.ajax({
                                                                url: "../Back/webhook/consulta_ticket_id.php",
                                                                type: "post",
                                                                dataType: "html",
                                                                cache: false,
                                                                contentType: false,
                                                                processData: false
                                                            })
                                                            .done(function(res){
                                                                console.log(res);
                                                                let TICKET = JSON.parse(res);
                                                                $("#folio").val("Tu folio de seguimiento es: "+TICKET[0].folio);
                                                                formData.append("folio", TICKET[0].folio);
                                                                formData.append("correo", $("#eMail").val());
                                                                $.ajax({
                                                                    url: "../Back/webhook/correo_cliente.php",
                                                                    type: "post",
                                                                    dataType: "html",
                                                                    data: formData,
                                                                    cache: false,
                                                                    contentType: false,
                                                                    processData: false
                                                                })
                                                                .done(function(res){
                                                                    console.log(res);
                                                                })
                                                            })
                                                        }else{
                                                            $("#folio").val("No se guardo el ticket");
                                                        }
                                                    })
                                                })
                                            }else{
                                                $("#folio").val("No se guardo el incidente");
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    })
                }else{
                    $("#folio").val("No se guardo el cliente");
                }            
            });
    }else{
        $("#folio").val("Favor de llenar los campos y/o revisar que el sea correcto");
    }e.preventDefault();
    });
});

function consultaprod(){
    var x = document.getElementById("idTicket").value;
    var a =0;
    var settings ={ 
        'url': "https://sdaw-production.up.railway.app/sales/show_api/2",
        "method": "GET",
        "crossDomain": true,
        "async": true,
        "cache": false,
        "headers": {
            "contentType": "application/json",
            "accept": "application/json",
            "Access-Control-Allow-Origin":"*"
        }
    }
    $.ajax(settings).done(function(res){
        var pa=0;
        var seguir=0;
        for(var i in res){
            a++;
        }
        console.log(res.products);
        let template="";
        if($("#idTicket").val()==''){

                document.getElementById('producto').style.color = 'black';
            template +=`<option selected>Selecciona el articulo</option>`;
        }else{
            do{
                if(res.products[pa].id==$("#idTicket").val()){
                    console.log(res.products[pa].name);
                    template += `<option value="${pa}">${res.products[pa].name}</option>`; seguir=1; pa++;
                    console.log(seguir);
                }else{
                    seguir=0; pa++; console.log(seguir);
                }
            }while(seguir==0 && pa<a);
            console.log(seguir);
            if(seguir==0){
                template+= `<option selected>El ticket no existe</option>`;
                document.getElementById('producto').style.color = 'red';
            }else{
                document.getElementById('producto').style.color = 'black';
            }
        }
        $("#producto").html(template);
    })
    .fail(function(data){
        alert("Try again champ!");
    });
}