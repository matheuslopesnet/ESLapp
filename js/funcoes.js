var max = questions.length;
var min = 0;
var used = []; //array de valores ja utilizados
var respondido;
var pontos = 0;
var vidas = 3;

$(document).ready(function () {
    loadPhrase();
});

function loadPhrase() {
    var val = randomNumber();
    if (used.includes(val) == true) {
        loadPhrase();
    } else {
        document.getElementById("birl").innerHTML = questions[val].ask; //adiciona valor sorteado a div
        // BACKUP document.getElementById("birl").innerHTML += "<br/>" + questions[val].a1;
        respondido = false;
        loadAnswer(val);
        if(vidas < 1){alert("Game Over");location.reload()}
        loadVidas();
    }

    used.push(val); //adiciona valor ao array used
}

function loadAnswer(i) {
    //var j = Math.floor(Math.random()*(4-1)+1); sortear ordem de respostas
    document.getElementById("resp").innerHTML = "<button class='btn button button-raised' id='btn0' href='#' value='" + questions[i].a1 + "'>" + questions[i].a1 + "</button>" +
        "<button class='btn button button-raised' id='btn1' href='#' value='" + questions[i].a2 + "'>" + questions[i].a2 + "</button>" +
        "<button class='btn button button-raised' id='btn2' href='#' value='" + questions[i].a3 + "'>" + questions[i].a3 + "</button>" +
        "<button class='btn button button-raised' id='btn3' href='#' value='" + questions[i].a4 + "'>" + questions[i].a4 + "</button><br/>"

    verificar(i);
}

function randomNumber() {
    return Math.floor(Math.random() * (max - min) + min); //gerar um numero entre as var min e max
}

function verificar(i) {
    $(".btn").click(function (event) {
        resposta = questions[i].answer;
        texto = $(this).attr("value");
        escolha = this.id;
        if (texto == resposta & respondido == false) {
            document.getElementById(escolha).style.backgroundColor = "green"; //se a resposta estiver certa fica verde
            pontos++; // acrescenta pontos a partida do usuario
            olar(texto, resposta, pontos);
        } else if(respondido == false){
            document.getElementById(escolha).style.backgroundColor = "red"; // se a resposta estiver errada fica vermelho
            vidas --;
            if ((document.getElementById("btn0").value) == resposta) {
                document.getElementById("btn0").style.backgroundColor = "green";
            } else if ((document.getElementById("btn1").value) == resposta) {
                document.getElementById("btn1").style.backgroundColor = "green";
            } else if ((document.getElementById("btn2").value) == resposta) {
                document.getElementById("btn2").style.backgroundColor = "green";
            } else if ((document.getElementById("btn3").value) == resposta) {
                document.getElementById("btn3").style.backgroundColor = "green";
            }
            olar(texto, resposta, pontos);
        }
        respondido = true; //inabilita que o usuario escolha mais de uma resposta
            
    });
}


function loadVidas(){
    var contavida = vidas;
    var hearts ="";
    for(contavida = vidas; contavida >0; contavida--){
        hearts += "<img src='img/hearts.png'>";
    }
    document.getElementById("footer").innerHTML = hearts;
     
}

//framework7
// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'io.framework7.testapp', // App bundle ID
    name: 'Tela', // App name
    theme: 'auto', // Automatic theme detection

});

// Init/Create main view


// Alert
function olar(texto, resposta, pontos) {
    //var username = $$('#my-login-screen [name="username"]').val();

    // Close login screen
    app.loginScreen.close('#my-login-screen');

    // Alert username and password
    app.dialog.alert('Escolha: ' + texto + '<br/> Resposta: ' + resposta + '<br/> Pontos: ' + pontos);
}