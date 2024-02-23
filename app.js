var texEnc = "";
var texEncTransf = "";
var noEnc = true;
var transfTexDesencr = "";
var texDesenc = "";
var texto = "";

/*Habilito el encriptado al presionar el boton */
document.getElementsByClassName("operacionEncriptar")[0].onclick = (encriptar);

/*Habilito el desencriptado al presionar el boton */
document.getElementsByClassName("operacionDesencriptar")[0].onclick = (desencriptar);

/* Transfiero el mensaje encriptado al campo de texto central para desencriptar*/
document.getElementsByClassName("copiar")[0].onclick = (transferirTexto);

function encriptar() {
    /*Limpio la Pagina*/
    document.getElementById("verMensaje").style.visibility = "hidden";
    texEncTransf = "";
    document.getElementsByClassName("tex")[0].value = "";

    /* Paso el texto a minusculas*/
    texEnc = (document.getElementById("texenc").value).toString();

    /* Si intenta codificar un texto en blanco activo el mensaje*/
    if (texEnc === "") {
        document.getElementById("verMensaje").style.visibility = "visible";
    }

    /* Busco si existen palabras con acentos y/o caracteres especiales y dor el alerta*/
    for (let index = 0; index < texEnc.length; index++) {
        if ((texEnc.charCodeAt(index) >= 33) && (texEnc.charCodeAt(index) <= 47)) {
            document.getElementById("texenc").value = "";
            alert("Sin mayusculas, acentos ni Simbolos especiales");
            noEnc = false;
            break;
        } else if ((texEnc.charCodeAt(index) >= 58) && (texEnc.charCodeAt(index) <= 96)) {
            document.getElementById("texenc").value = "";
            alert("Sin mayusculas,  acentos ni Simbolos especiales");
            noEnc = false;
            break;
        } else if (texEnc.charCodeAt(index) >= 123) {
            document.getElementById("texenc").value = "";
            alert("Sin mayusculas,  acentos ni Simbolos especiales");
            noEnc = false;
            break;
        }
    }
    /* Si no cumplo las condiciones no encripto*/
    if (noEnc) {

        /* encripto el mensaje*/
        for (let i = 0; i < texEnc.length; i++) {

            if ((texEnc[i] != "a") && (texEnc[i] != "e") && (texEnc[i] != "i") && (texEnc[i] != "o") && (texEnc[i] != "u")) {
                texEncTransf = texEncTransf.concat(texEnc[i]);
            } else if (texEnc[i] == "e") {
                texEncTransf = texEncTransf.concat("enter");
            } else if (texEnc[i] == "o") {
                texEncTransf = texEncTransf.concat("ober");
            } else if (texEnc[i] == "a") {
                texEncTransf = texEncTransf.concat("ai");
            } else if (texEnc[i] == "u") {
                texEncTransf = texEncTransf.concat("ufat");
            } else if (texEnc[i] == "i") {
                texEncTransf = texEncTransf.concat("imes");
            }


        }

    }
    /* muestro la encriptacion */
    document.getElementsByClassName("tex")[0].innerHTML = texEncTransf;


    /* Limpio el campo de ingreso de Mensaje a Codificar/Decodificar*/
    document.getElementById("texenc").value = "";
    noEnc = true;
}

function transferirTexto() {
    /*Borro mensaje de falta de texto*/
    document.getElementById("verMensaje").style.visibility = "hidden";

    /* Limpio el campo de ingreso de Mensaje a Codificar/Decodificar*/
    document.getElementById("texenc").value = "";

    /* Preparo el mensaje a decodificar  y lo envio al campo de ingreso de Texto a Codificar/Decodificar */
    transfTexDesencr = document.getElementsByClassName("tex")[0].innerHTML;
    document.getElementsByClassName("tex")[0].innerHTML = "";
    /* Si intenta decodificar un texto en blanco; activo el mensaje*/
    if ((transfTexDesencr == "") || (transfTexDesencr == " ")) {
        document.getElementById("verMensaje").style.visibility = "visible";
    } else {
        document.getElementById("texenc").value = transfTexDesencr;
    }

}

function desencriptar() {
    /*Limpio la Pagina*/
    document.getElementById("verMensaje").style.visibility = "hidden";

    /* Cargo el texto a Desencriptar*/
    texDesenc = (document.getElementById("texenc").value).toLowerCase().toString();

    /* Si intenta decodificar un texto en blanco; activo el mensaje*/
    if ((texDesenc == "") || (texDesenc == " ")) {
        document.getElementById("verMensaje").style.visibility = "visible";
    } else {
        /* Operaciòn de desencriptado*/
        let expcomp = ["ai", "enter", "imes", "ober", "ufat"];
        let letras = ["a", "e", "i", "o", "u"];
        let cadenaa = desencrip(texDesenc, expcomp[0], letras[0]);
        let cadenae = desencrip(cadenaa, expcomp[1], letras[1]);
        let cadenai = desencrip(cadenae, expcomp[2], letras[2]);
        let cadenao = desencrip(cadenai, expcomp[3], letras[3]);
        let cadenau = desencrip(cadenao, expcomp[4], letras[4]);

        /* Limpio el campo de ingreso de Mensaje a Codificar/Decodificar*/
        document.getElementById("texenc").value = "";

        document.getElementsByClassName("tex")[0].innerHTML = cadenau;
    }
}

function desencrip(cadena, expresion, letra) {
    while (cadena.search(expresion) != -1) {
        cadena = cadena.replace(expresion, letra);
    }
    return cadena
}


