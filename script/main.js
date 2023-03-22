"use strict";


let oBoardGame = new BoardGame();

const player1 = new Player(1);
const player2 = new Player(2);


window.addEventListener('load', function(){

    /*oBoardGame.initGame();

    if(!oBoardGame.player1.id || !oBoardGame.player2.id || !oBoardGame.gameOn) {
        alert('Error init game please contact an administrator.');
        return false;
    }

    //TEST
    let oTestPlayer = new TestPlayerRollDiceGame();
    oTestPlayer.testGetDotPlayerObj();
    //oTestPlayer.initTestPlayer();*/

    //TODO FINIR LES TEST ET RELIRE LE COURS + OBJECTIF COURS + CLASS ET HERITAGE EN JS AVEC PROTOTYPE !!
    //TODO REGARDER POUR LES NOTIONS DE PRIVE ET PUBLIC EN JS CLASS

    // FIN TEST


    document.getElementById('btnNewGame').addEventListener('click', function(){ oBoardGame.initGame(); });
    document.getElementById('btnRollDice').addEventListener('click', function(){
        if(oBoardGame.gameOn === false){ oBoardGame.messageNewGame();}
        else {
            let idCurPlayer = oBoardGame.getIntIdCurPlayer();
            if(idCurPlayer === 1){ oBoardGame.player1.rollDice(oBoardGame.getNumberRandom()); }
            else if(idCurPlayer === 2) { oBoardGame.player2.rollDice(oBoardGame.getNumberRandom()); }
        }
    });
    document.getElementById('btnHold').addEventListener('click', function(){
        if(oBoardGame.gameOn === false){ oBoardGame.messageNewGame();}
        else{
            let idCurPlayer = oBoardGame.getIntIdCurPlayer();
            if(idCurPlayer === 1){ oBoardGame.player1.hold(); }
            else if(idCurPlayer === 2) { oBoardGame.player2.hold(); }
        }
    });

    document.getElementById('boxCtnToast').addEventListener('click', function (e){
        if(e.target.classList.contains(ToastAlert.CLASS_CTN_TOASTER)) e.target.remove();
    });

});
