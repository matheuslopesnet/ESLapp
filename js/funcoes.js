var max = questions.length;
var min = 0;
var used = []; //array de valores ja utilizados
var respondido;
var pontos = 0;

function loadPhrase() {
    var val = randomNumber();
    if (used.includes(val) == true) {
        //alert(val+" - True"); se o numero sorteado ja foi sorteado anteriormente, chame a funcao novamente
        loadPhrase();
    } else {
        //alert(val+" - False"); caso seja falso, adicione os textos a div

        document.getElementById("birl").innerHTML = questions[val].ask; //adiciona valor sorteado a div
        // BACKUP document.getElementById("birl").innerHTML += "<br/>" + questions[val].a1;
        respondido = false;
        loadAnswer(val);

        //alert(val+ " False");
    }


    //document.getElementById("birl").innerHTML = val;

    used.push(val); //adiciona valor ao array used
}

function loadAnswer(i) {
    //var j = Math.floor(Math.random()*(4-1)+1); sortear ordem de respostas
    document.getElementById("resp").innerHTML = "<button class='btn' id='btn0' href='#' value='" + questions[i].a1 + "'>" + questions[i].a1 + "</button>" +
        "<button class='btn' id='btn1' href='#' value='" + questions[i].a2 + "'>" + questions[i].a2 + "</button>" +
        "<button class='btn' id='btn2' href='#' value='" + questions[i].a3 + "'>" + questions[i].a3 + "</button>" +
        "<button class='btn' id='btn3' href='#' value='" + questions[i].a4 + "'>" + questions[i].a4 + "</button><br/>"

    verificar(i);
}

function randomNumber() {
    return Math.floor(Math.random() * (max - min) + min); //gerar um numero entre as var min e max
}

function verificar(i) {
    $(".btn").click(function (event) {
        resposta = questions[i].answer;
        texto = $(this).attr("value");
        choice = this.id;
        if (texto == resposta & respondido == false){
            document.getElementById(choice).style.backgroundColor = "green"; //se a resposta estiver certa fica verde
            pontos++; // acrescenta pontos a partida do usuario
            alert("Resposta escolhida: " + texto + " - Resposta certa: " + resposta + " - Pontos: " + pontos);
        } else {
            document.getElementById(choice).style.backgroundColor = "red"; // se a resposta estiver errada fica vermelho
            if ((document.getElementById("btn0").value) == resposta) {
                document.getElementById("btn0").style.backgroundColor = "green";
            } else if ((document.getElementById("btn1").value) == resposta) {
                document.getElementById("btn1").style.backgroundColor = "green";
            } else if ((document.getElementById("btn2").value) == resposta) {
                document.getElementById("btn2").style.backgroundColor = "green";
            } else if ((document.getElementById("btn3").value) == resposta) {
                document.getElementById("btn3").style.backgroundColor = "green";
            }
        }
respondido = true; //inabilita que o usuario escolha mais de uma resposta
    });
}