//let urlBase = "http://localhost:8080/api/user";
let urlBase = "http://152.70.120.67:2109/api/user";

const expresiones = {
	
	
	password: /^.{1,50}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	
};

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const campos = {
	
	
	password: false,
	email: false
	
};

const validarFormulario = (e) => {

    switch (e.target.name) {
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			
		break;
		
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		
	}; 
        
        
};

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
               
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
        
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});




function validarLogin() {
    
    let user = {
		email: $("#email").val(),
        password: $("#password").val(),
	
    };

    if ((expresiones.email.test(user.email))===true && (expresiones.password.test(user.password))===true) {

        console.log("Validacion de campos ok");
		console.log(user);
        $.ajax({
            datatype: 'json',
			url: urlBase + "/" + user.email + "/" + user.password,
			type: "GET",
            
            success: function (response) {
				console.log(response);
				let items = response;
				console.log(items);
				console.log(items.id);
				alert("Has iniciado sesion correctamente");
				if (items.id != null) {
					console.log("true");
					alert("Hola" + " " + items.name + ", ya puedes disfrutar de nuestro catálogo de productos y servicios.")
					
					console.log(items.name);
					console.log("Has ingresado correctamente");
					//alert("Te validado correctamente");
					return true;
				} else {
					alert("Por favor verifica los datos ingresados");
					console.log("contraseña incorrecta");
					let opc = confirm('¡No existe un usuario! Si deseas crear un usuario haz clic en Aceptar, de lo contrario haz clic en Cancelar y verifica tu contraseña.');
					
				}
				
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert("¡No existe un usuario! Por favor verifique su correo electrónico y contraseña");
				//window.location.href = "login.html";
			}
		});
	}
	
    
    if ((expresiones.email.test(user.email))===false || (expresiones.password.test(user.password))===false ){
        console.log("RECUERDE INGRESAR UN EMAIL Y UNA CONTRASEÑA CORRECTA");         
		alert("¡Sigue las instrucciones. RECUERDE INGRESAR UN EMAIL Y UNA CONTRASEÑA CORRECTA");
                
                
    }
    
}