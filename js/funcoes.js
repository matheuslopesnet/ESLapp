//variaveis globais
var max = questions.length;
var min = 0;
var used = []; //array de valores ja utilizados
var respondido;
var pontos = 0;
var vidas = 3;

//chama funcao de frase ao carregar a pagina
$(document).ready(function () {
    loadPhrase();
});

//chama funcao de sorteio e carrega uma frase conforme array mencionada no doc html
function loadPhrase() {
    if(used.length == questions.length){
      gameover();
   }
    else{
    var val = randomNumber();
    if (used.includes(val) == true) {
        loadPhrase();
    } else {
        if(vidas < 1){gameover()}
        else{
        document.getElementById("pergunta").innerHTML = questions[val].ask; //adiciona valor sorteado a div
        // BACKUP document.getElementById("pergunta").innerHTML += "<br/>" + questions[val].a1;
        respondido = false;
        loadAnswer(val);        
        loadVidas();
        used.push(val); //adiciona valor ao array used
    }}

    }
}

//carrega respostas disponiveis
function loadAnswer(i) {
    //var j = Math.floor(Math.random()*(4-1)+1); sortear ordem de respostas
    document.getElementById("resposta").innerHTML = "<button class='btn button button-raised' id='btn0' href='#' value='" + questions[i].a1 + "'>" + questions[i].a1 + "</button>" +
        "<button class='btn button button-raised' id='btn1' href='#' value='" + questions[i].a2 + "'>" + questions[i].a2 + "</button>" +
        "<button class='btn button button-raised' id='btn2' href='#' value='" + questions[i].a3 + "'>" + questions[i].a3 + "</button>" +
        "<button class='btn button button-raised' id='btn3' href='#' value='" + questions[i].a4 + "'>" + questions[i].a4 + "</button><br/>"

    verificar(i);
}

//sorteia numero
function randomNumber() {
    return Math.floor(Math.random() * (max - min) + min); //gerar um numero entre as var min e max
}

//verifica resposta se esta correta
function verificar(i) {
    $(".btn").click(function (event) {
        resposta = questions[i].answer;
        texto = $(this).attr("value");
        escolha = this.id;
        if (texto == resposta & respondido == false) {
            document.getElementById(escolha).style.backgroundColor = "green"; //se a resposta estiver certa fica verde
            pontos++; // acrescenta pontos a partida do usuario
            alerta(texto, resposta, pontos);
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
            alerta(texto, resposta, pontos);
        }
        respondido = true; //inabilita que o usuario escolha mais de uma resposta
            
    });
}

//sistema de vidas
function loadVidas(){
    var contavida = vidas;
    var hearts ="";
    for(contavida = vidas; contavida >0; contavida--){
        hearts += "<img src='img/hearts.png'>";
    }
    document.getElementById("footer").innerHTML = hearts;
     
}

//alerta framework7
var app = new Framework7({
    root: '#app',
    id: 'io.framework7.testapp', 
    name: 'ESLApp',
    theme: 'auto', 
});

//alerta
function alerta(texto, resposta, pontos) {
    // Alert username and password
    app.dialog.alert('Escolha: ' + texto + '<br/> Resposta: ' + resposta + '<br/> Pontos: ' + pontos);
}



//tela de gameover com opção para fechar e compartilhar app no Facebook
function gameover(){
    meta();
    var dynamicPopup = app.popup.create({
  content: '<div class="popup">'+
              '<div class="block">'+
                '<h1>Pontuação</h1>'+
                'Você acertou '+ pontos + ' de ' + (used.length) + ' perguntas' + 
                '<p><a href="#" class="link popup-close">Fechar</a></p>'+
        '<iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&layout=button_count&size=large&mobile_iframe=true&width=157&height=28&appId" width="157" height="28" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>'+
              '</div>'+
            '</div>',
});
    dynamicPopup.open();
}

function meta(){
    document.getElementsByTagName("head").textContent += "<meta property='og:url' content='https://www.your-domain.com/your-page.html'/>"+
  "<meta property='og:type' content='website' />"+
  "<meta property='og:title' content='Your Website Title' />"+
  "<meta property='og:description' content='Fiz " + pontos + " no ESLApp'/>"+
  "<meta property='og:image' content='https://www.your-domain.com/path/image.jpg' />";
}