let urlBase = "http://152.70.120.67:2109/api/user";
//let urlBase = "http://localhost:8080/api/user";
const expresiones = {
	
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	password: /^.{1,50}$/, // 3 a 12 digitos.
	password2: /^.{1,50}$/ // 3 a 12 digitos.
	
	
};

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const campos = {
	
	name: false,
	email: false,
	password: false,
	password2: false
    
};

const validarFormulario = (e) => {
   
    switch (e.target.name) {
		case "name":
            validarCampo(expresiones.name, e.target, 'name');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break;
		case "password2":
			validarPassword2();
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

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');

	if(inputPassword1.value !== inputPassword2.value){
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
		campos['password2'] = true;
        
	}
};

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();
        const terminos = document.getElementById('terminos');
       console.log(campos);
	if(campos.name && campos.password && campos.email && campos.password2 && terminos.checked ){
                
        console.log("Verificó campos");
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
        formulario.reset();
                
	} else {
		
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
                setTimeout(() => {
                document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
               }, 5000);
               formulario.reset();
	};
     
  });



function validarRegistro() {
    

    let user = {
	name: $("#name").val(),
    email: $("#email").val(),
    password: $("#password").val(),
	password2: $("#password2").val()
    };
    
	console.log(user);

    if ((expresiones.name.test(user.name))===true && (expresiones.email.test(user.email))===true && (expresiones.password.test(user.password))===true){

        console.log("Campos validados correctamente");
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(user),
            url: urlBase + "/new",
            statusCode: {
                201: function (response) {
                    success: {
                        console.log(response);
                        console.log("REGISTRO EXITOSO");
                    }
                }
            
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("Error! ya existe esta cuenta o hay un error de JSON");
				
            }
        });
    } else {
			
    		if ((expresiones.name.test(user.name))===false || (expresiones.email.test(user.email))===false || (expresiones.password.test(user.password))===false ){
                //alert("¡Sigue las instrucciones. Debes rellenar el formulario correctamente");
                
                console.log("CAMPOS VACIOS O NO CORRESPONDEN");
                formulario.reset();
			}
		}
    
}