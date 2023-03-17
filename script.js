"use strict";

class BoardGame
{
    iCurPlayer;

    static MIN_DICE = 1;
    static MAX_DICE = 6;
    static ID_CURRENT_PLAYER = 'iCurPLayer';

    setIntCurPLayer(iCurPlayer)
    {
        this.iCurPlayer = parseInt(iCurPlayer);
    }
    getIntCurPlayer(){ return parseInt(this.iCurPlayer); }

    initGame()
    {
        this.resetGame();
        this.setPlayerTurn(1);
        this.messageStartingGame();
    }

    resetGame()
    {
        sessionStorage.clear();
        player1.setCurrentScore(0);
        player1.setLapScore(0);
        player2.setCurrentScore(0);
        player2.setLapScore(0);
        this.gameOn = true;
    }

    resumeGame(idPlayerActive)
    {
        player1.setLapScore(window.sessionStorage.getItem(Player.LAP_SCORE + 1));
        player1.setCurrentScore(window.sessionStorage.getItem(Player.CURRENT_SCORE + 1));
        player2.setLapScore(window.sessionStorage.getItem(Player.LAP_SCORE + 2));
        player2.setCurrentScore(window.sessionStorage.getItem(Player.CURRENT_SCORE + 2));
        this.setCurrentPlayer(idPlayerActive);
        this.gameOn = true;
    }

    setPlayerTurn(idPlayer, iLapScore=0)
    {
        this.setCurrentPlayer(idPlayer);
        if(idPlayer === 1) player1.setLapScore(iLapScore);
        if(idPlayer === 2) player2.setLapScore(iLapScore);
        this.setDotPlayerActive(idPlayer);
    }

    setDotPlayerActive(idPlayer)
    {
        if(idPlayer === 1)
        {
            player1.setDotCurrentPlayerOn();
            player2.setDotCurrentPlayerOff();
        } else if(idPlayer === 2) {
            player1.setDotCurrentPlayerOff();
            player2.setDotCurrentPlayerOn();
        }
    }

    setCurrentPlayer(iId)
    {
        this.iCurPlayer = iId;
        window.sessionStorage.setItem(BoardGame.ID_CURRENT_PLAYER, iId);
    }

    endGame()
    {
        this.messagePlayerWin();
        this.gameOn = false;
    }

    //TOAST MESSAGES
    messageNewGame()
    {
        let oToast = new ToastAlert(ToastAlert.INFO, 'The game is over click on "New game" button to restart another game');
    }

    messageStartingGame()
    {
        let oToast = new ToastAlert(ToastAlert.INFO, 'Player 1 begin !');
    }

    messagePlayerWin()
    {
        let sWinner = 'Player 1';
        if(player2.getCurrentScore() >= 100) sWinner = 'Player 2';
        let oToast = new ToastAlert(ToastAlert.SUCCESS, sWinner + ' win !');
    }

    messageSwitchTurn()
    {
        let oToast = new ToastAlert(ToastAlert.INFO, 'You scored 1 the turn passes to the next player');
    }

    rollDiceIcon(iDice)
    {
        //Masquer tous les dés
        let oCtnDice = document.getElementById('ctnDiceResult');
        oCtnDice.querySelectorAll('i').forEach(function(oDice){ oDice.classList.add('hide'); });

        switch(iDice)
        {
            case 1: oCtnDice.querySelector('.fa-dice-one').classList.remove('hide'); break;
            case 2: oCtnDice.querySelector('.fa-dice-two').classList.remove('hide'); break;
            case 3: oCtnDice.querySelector('.fa-dice-three').classList.remove('hide'); break;
            case 4: oCtnDice.querySelector('.fa-dice-four').classList.remove('hide'); break;
            case 5: oCtnDice.querySelector('.fa-dice-five').classList.remove('hide'); break;
            case 6: oCtnDice.querySelector('.fa-dice-six').classList.remove('hide'); break;
            default: oCtnDice.querySelector('.fa-dice-one').classList.remove('hide'); break;
        }
    }

    getNumberRandom()
    {
        return Math.ceil(Math.random() * ((BoardGame.MAX_DICE  - BoardGame.MIN_DICE) + BoardGame.MIN_DICE));
    }





}

class Player
{
    static CURRENT_SCORE = 'currentScorePlayer';
    static LAP_SCORE = 'lapScorePlayer';
    constructor(sId){
        this.id = sId;
        this.oDotPlayer = this.getDotPlayerObj();
        this.oLapScore = this.getLapScoreObj();
        this.oCurrentScore = this.getCurrentScoreObj();
    }


    /** CURRENT SCORE **/
    getCurrentScoreObj() { return document.getElementById('currentScorePlayer' + this.id); }
    getCurrentScore() { return parseInt(this.oCurrentScore.textContent); }
    setCurrentScore(iScore)
    {
        this.oCurrentScore.textContent = iScore;
        window.sessionStorage.setItem('currentScorePlayer' + this.id, iScore);
    }

    increaseCurrentScore(iScore)
    {
        let iCurrentScore = this.getCurrentScore();
        iScore = parseInt(iScore);
        iCurrentScore += iScore;
        this.setCurrentScore(iCurrentScore);
    }
    /** FIN CURRENT SCORE **/

    /** LAP SCORE **/
    getLapScoreObj() { return document.getElementById('lapScorePlayer' + this.id); }
    getLapScore() { return parseInt(this.oLapScore.textContent); }
    setLapScore(iScore)
    {
        this.oLapScore.textContent = iScore;
        window.sessionStorage.setItem('lapScorePlayer' + this.id, iScore);
    }

    increaseLapScore(iScore)
    {
        let iLapScore = this.getLapScore();
        iScore = parseInt(iScore);
        iLapScore += iScore;
        this.setLapScore(iLapScore);
    }
    /** FIN LAP SCORE **/


    /** DOT PLAYER **/
    getDotPlayerObj() { return document.getElementById('dotPlayer'+ this.id); }
    setDotCurrentPlayerOn() { this.oDotPlayer.classList.remove('hide'); }
    setDotCurrentPlayerOff() { this.oDotPlayer.classList.add('hide'); }
    /** FIN DOT PLAYER **/

    rollDice()
    {
        let iRandomDice = oBoardGame.getNumberRandom();
        if(iRandomDice === 1) {
            this.setLapScore(0);
            if(this.id === 1) oBoardGame.setPlayerTurn(2);
            else if(this.id === 2) oBoardGame.setPlayerTurn(1);
            oBoardGame.messageSwitchTurn();
        } else { this.increaseLapScore(iRandomDice); }
        oBoardGame.rollDiceIcon(iRandomDice);
    }

    hold()
    {
        this.increaseCurrentScore(this.getLapScore());
        if(this.getCurrentScore() >= 100) { oBoardGame.endGame(); }
        else {
            if(this.id === 1) oBoardGame.setPlayerTurn(2);
            else if(this.id === 2) oBoardGame.setPlayerTurn(1);
            this.setLapScore(0);
        }
    }
}

class TestPlayerRollDiceGame
{
    initTestPlayer()
    {
        this.testGetDotPlayerObj();
        this.testGetCurrentScoreObj();
        this.testGetLapScoreObj();

        this.testGetNumberRandom();
        this.testSetDotCurrentPlayerOn();
        this.testSetDotCurrentPlayerOff();


        this.testGetCurrentScore();
        this.testGetLapScore();

        //this.testRollDice();
        //this.testHold();
    }

    testGetNumberRandom()
    {
        //Int
        //Max 6
        //Min 1
        let sFunction = 'testGetNumberRandom';
        //Il faut que tout les chiffres soient supprimés du tableau
        let aNumber = [1, 2, 3, 4, 5, 6];
        for(let i =0; i < 1000; i++)
        {
            let iNumber = player1.getNumberRandom();
            if(! new paramIntCheck(player1.getNumberRandom(), 'iRandom', sFunction).setMin(1).setMax(6).getStrErr()) return false;
            aNumber.forEach(function(iNumberTab){
                if(iNumber == iNumberTab)
                {
                    let iIndex = aNumber.indexOf(iNumber)
                    if(iIndex !== -1) aNumber.splice(iIndex, 1);
                }
            });
        }
        if(aNumber.length > 0)
        {
            alert(aNumber.join(", "));
            return false;
        }
    }

    testGetDotPlayerObj()
    {
        //obj length 1
        let sFunction = 'testGetDotPlayerObj';
        if(! new paramObjCheck(player1.getDotPlayerObj(), 'oDotPlayer', sFunction).getStrErr()) return false;
    }

    testGetLapScoreObj()
    {
        let sFunction = 'testGetLapScoreObj';
        if(! new paramObjCheck(player1.getLapScoreObj(), 'oLapScore', sFunction).getStrErr()) return false;
    }

    testGetCurrentScoreObj()
    {
        let sFunction = 'testGetCurrentScoreObj';
        if(! new paramObjCheck(player1.getCurrentScoreObj(), 'OCurrentScore', sFunction).getStrErr()) return false;
    }

    testGetCurrentScore()
    {
        let sFunction = 'testGetCurrentScore';
        if(! new paramIntCheck(player1.getCurrentScore(), 'iCurrentScore', sFunction).setMin(0).setMax(100).getStrErr()) return false;
    }

    testGetLapScore()
    {
        let sFunction = 'testGetLapScore';
        if(! new paramIntCheck(player1.getLapScore(), 'iLapScore', sFunction).setMin(0).getStrErr()) return false;
    }

    testSetCurrentScore()
    {
        let sFunction = 'testSetCurrentScore';
        let iInitialScore =  player1.getCurrentScore();
        player1.setCurrentScore(10);
        let iNewScore = player1.getCurrentScore();
        if(iInitialScore === iNewScore){
            alert('Error ' + sFunction + ' isn\'t working in HTML! ');
            return false;
        }

        iInitialScore = window.sessionStorage.getItem(Player.CURRENT_SCORE + 1);
        player1.setCurrentScore(11);
        iNewScore = window.sessionStorage.getItem(Player.CURRENT_SCORE + 1);
        if(iInitialScore === iNewScore){
            alert('Error ' + sFunction + ' isn\'t working in sessionStorage! ');
            return false;
        }
    }

    testSetLapScore()
    {
        let sFunction = 'testSetLapScore';
        let iInitialScore =  player1.getLapScore();
        player1.setLapScore(10);
        let iNewScore = player1.getLapScore();
        if(iInitialScore === iNewScore) {
            alert('Error ' + sFunction + ' isn\'t working in HTML! ');
            return false;
        }

        iInitialScore = window.sessionStorage.getItem(Player.LAP_SCORE + 1);
        player1.setLapScore(11);
        iNewScore = window.sessionStorage.getItem(Player.LAP_SCORE + 1);
        if(iInitialScore === iNewScore){
            alert('Error ' + sFunction + ' isn\'t working in sessionStorage! ');
            return false;
        }
    }

    testSetDotCurrentPlayerOn()
    {
        let sFunction = 'testSetDotCurrentPlayerOn';
        player1.getDotPlayerObj().classList.add('hide');
        player1.setDotCurrentPlayerOn();
        player1.getDotPlayerObj().classList.forEach(function(sClass){
            if(sClass === 'hide'){
                alert('Error ' + sFunction + ' isn\'t working ');
                return false;
            }
        });
    }

    testSetDotCurrentPlayerOff()
    {
        let sFunction = 'testSetDotCurrentPlayerOff';
        player1.getDotPlayerObj().classList.remove('hide');
        player1.setDotCurrentPlayerOff();
        let bClass = false;
        player1.getDotPlayerObj().classList.forEach(function(sClass){
            if(sClass === 'hide') bClass = true;
        });

        if(!bClass) {
            alert('Error ' + sFunction + ' isn\'t working ');
            return false;
        }
    }

    testRollDice()
    {
        let sFunction = 'testRollDice';
        //ON test si le lancer effectue 10 fois le même score
        let iLance = 10;
        let aDice = [];
        for(let i=0;i<iLance;i++)
        {
            aDice.push(player1.rollDice());
        }


        for(let i=1;i<7;i++)
        {
            let b = aDice.every((j) => j === i);

            if(b)
            {
                alert('Error' + sFunction + ' le score est ' + iLance + ' fois le même !');
                return false;
            }
        }

    }

    testHold()
    {
        let sFunction = 'testHold';
        //ON test si le current score est le même avant et après que le joueur ait cliqué sur hold et après avoir lancé le dé

        let iInitialVal = player1.getCurrentScore();
        while(player1.getLapScore() === 0)
        {
            player1.rollDice();
        }

        player1.hold();
        let iNewVal = player1.getCurrentScore();

        if(iInitialVal === iNewVal)
        {
            alert('Error ' + sFunction);
            return false;
        }
    }

}

class paramObjCheck
{
    constructor(obj, sVar, sFunction)
    {
        this.oErr = { };
        this.sVar = sVar;
        this.sFunction = sFunction;
        this.value = obj;
        this.undef = this.checkUndefined();
        this.bObject = false;
        this.bLength0 = 0;
        if(this.undef === false)
        {
            this.bObject = this.checkIsObject();
            if(this.bObject) this.bLength0 = this.checkLength();
        }
    }

    /** Retour de l'erreur **/
    getStrErr(sRetour="\n\n")
    {
        if(Object.values(this.oErr).length > 0)
        {
            let sErr = '';
            Object.values(this.oErr).forEach(function(el) { sErr += el + sRetour });
            alert(sErr);
            return false;
        }
        return true;
    }
    /** FIN Retour de l'erreur **/

    checkUndefined(){
        if(this.value == undefined)
        {
            this.oErr.undef = `Error param, object "${this.sVar}" from function "${ this.sFunction }" is undefined`;
            return true;
        }
        else return false;
    }

    checkLength(){
        if(this.value.length == 0) this.oErr.length = `Error param length, object "${this.sVar}" from function "${ this.sFunction }" is empty`;
        return this;
    }

    checkIsObject(){
        if((typeof this.value === 'object') === false)
        {
            this.oErr.isObject = `Error param : ${this.value } is not type of object`;
            return false;
        }
        return true;
    }

    getBoolValidParam()
    {
        if(this.bObject === false || this.undef === true || this.bLength0 === true) return false;
        else return true;
    }

}


class paramIntCheck
{
    constructor(iInt, sVar, sFunction) {
        this.oErr = {};
        this.sVar = sVar;
        this.sFunction = sFunction;
        this.val = iInt;
        this.bIsUndefined = this.checkUndefined();
        this.bIsNaN = true;
        this.bIsNumber = false;
        if(!this.bIsUndefined)
        {
            this.bIsNaN = this.checkIsNan();
            if(this.bIsNaN) this.bIsNumber = this.checkIsNumber();
            else return true;
        }
    }

    /** Retour de l'erreur **/
    getStrErr(sRetour="\n\n"){
        if(Object.values(this.oErr).length > 0)
        {
            let sErr = '';
            Object.values(this.oErr).forEach(function(el) { sErr += el + sRetour });
            alert(sErr);
            return false;
        }
        return true;
    }
    /** FIN Retour de l'erreur **/

    checkUndefined(){
        if(this.val == undefined)
        {
            this.oErr.undef = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is undefined`;
            return true;
        }
        else return false;
    }

    checkIsNan()
    {
        if(isNaN(this.val))
        {
            this.oErr.isNaN = `Error param ${this.sVar } : ${this.val } from function "${ this.sFunction }" is not a number`;
            return false;
        }
        return true;
    }

    checkIsNumber(){
        if((typeof this.val === 'number') === false)
        {
            this.oErr.isNumber = `Error param ${this.sVar } : ${this.val } from function "${ this.sFunction }" is not type of number`;
            return false;
        }
        return true;
    }

    setMin(iMin)
    {
        if(this.bIsUndefined || !this.bIsNaN || !this.bIsNumber) return this;
        if(this.val < iMin)
        {
            this.oErr.setMin = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is < ${iMin}`;
        }
        return this;
    }


    setMax(iMax)
    {
        if(this.bIsUndefined || !this.bIsNaN || !this.bIsNumber) return this;
        if(this.val > iMax)
        {
            this.oErr.setMin = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is > ${iMax}`;
        }
        return this;
    }
}

class ToastAlert
{
    static INFO = 'info';
    static SUCCESS = 'success';
    static WARNING = 'warning';
    static DANGER = 'danger';
    static CLASS_CTN_TOASTER = 'ctnToaster';

    constructor(type, message)
    {
        this.message = message;
        this.sIcon = '<i class="fa-regular fa-face-meh"></i>';
        this.sClass = 'errorToast';

        switch(type)
        {
            case ToastAlert.INFO:
                this.sIcon = '<i class="fa-solid fa-circle-info"></i>';
                this.sClass = 'infoToast';
                break;
            case ToastAlert.SUCCESS:
                this.sIcon = '<i class="fa-solid fa-circle-check"></i>';
                this.sClass = 'successToast';
                break;
            case ToastAlert.WARNING:
                this.sIcon = '<i class="fa-solid fa-triangle-exclamation"></i>',
                this.sClass = 'warningToast';
                break
            case ToastAlert.DANGER:
                this.sIcon = '<i class="fa-solid fa-skull-crossbones"></i>';
                this.sClass = 'dangerToast'
                break;
            default:
                alert('Error switch class ToastAlert');
        }

        document.body.prepend(this.getHtmlToaster());
        //this.ObjHtmlToast = this.getNodeHtmlToast();
        //console.log(this.ObjHtmlToast);
        setTimeout(this.toastDisappear, 3000);
    }

    getHtmlToaster()
    {
        let el = document.createElement('div');
        el.classList.add(this.sClass, ToastAlert.CLASS_CTN_TOASTER);
        el.innerHTML = this.sIcon + '<span>' + this.message + '</span>';
        return el;
    }

    toastDisappear() {
        let el = document.getElementsByClassName(ToastAlert.CLASS_CTN_TOASTER);
        el.item(0).remove();
    }

    //DESTRUCTION DE L'OBJET ??
}


let player1 = new Player(1);
let player2 = new Player(2);
let oBoardGame = new BoardGame();
oBoardGame.initGame();

let oTestPlayer = new TestPlayerRollDiceGame();
//oTestPlayer.initTestPlayer();

if(window.sessionStorage.getItem(Player.LAP_SCORE + 1) && window.sessionStorage.getItem(Player.CURRENT_SCORE + 1) && window.sessionStorage.getItem(Player.LAP_SCORE + 2) && window.sessionStorage.getItem(Player.CURRENT_SCORE + 2) && window.sessionStorage.getItem(BoardGame.ID_CURRENT_PLAYER)) {

    let idCurPlayer = window.sessionStorage.getItem(BoardGame.ID_CURRENT_PLAYER);
    oBoardGame.resumeGame(idCurPlayer);

} else{ oBoardGame.initGame(); }

document.getElementById('btnNewGame').addEventListener('click', function(){ oBoardGame.initGame(); });
document.getElementById('btnRollDice').addEventListener('click', function(){
    if(oBoardGame.gameOn === false){ oBoardGame.messageNewGame();}
    else {
        let idCurPlayer = oBoardGame.getIntCurPlayer();
        if(idCurPlayer === 1){ player1.rollDice(); }
        else if(idCurPlayer === 2) { player2.rollDice(); }
    }

});
document.getElementById('btnHold').addEventListener('click', function(){
    if(oBoardGame.gameOn === false){ oBoardGame.messageNewGame();}
    else{
        let idCurPlayer = oBoardGame.getIntCurPlayer();
        if(idCurPlayer === 1){ player1.hold(); }
        else if(idCurPlayer === 2) { player2.hold(); }
    }
});




