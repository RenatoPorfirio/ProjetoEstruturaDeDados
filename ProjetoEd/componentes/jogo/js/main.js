var map = new Map();
map.initialize();
var countBombs = 0;

function pushB(s){
  let im = map.get(s);
  let but = document.getElementById(s);
  if(im == null){
    but.innerHTML = '<img class="img" src="../imagens/splash.png"/>';
  }
  else{
    if(im == '<img class="img" src="../imagens/bomb.png"/>') countBombs++;
    but.innerHTML = im;
    if(countBombs == 1) endGame();
  }
}

function endGame(){
  for(let i = 97; i < 107; i++){
    let line = String.fromCharCode(i);
    for(let j = 0; j < 10; j++){
      let str = line + j;
      let but = document.getElementById(str);
      but.setAttribute("disabled","true");
    }
  }
  let r = confirm("Você Perdeu!\n Deseja tentar novamente?");
  if(r)
    window.location.href = "https://projetoed.camilosantos1.repl.co/componentes/jogo/jogo.html?jogador=";
  else
     window.location.href = "https://ProjetoEd.camilosantos1.repl.co";
}