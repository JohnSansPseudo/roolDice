class Player
{
   constructor(iId)
   {
        this.id = null;
        this.setIdPlayer(iId);
        this.oDotPlayer = new ToggleClassDomElement('dotPlayer' + this.id, 'hide');
        this.oLapScore = new IntDomElement('lapScorePlayer' + this.id, 0, 99);
        this.oCurrentScore = new IntDomElement('currentScorePlayer' + this.id, 0, 100);
    }

    setIdPlayer(iId)
    {
        if(! new ParamIntCheck(iId, 'iId', 'Player => setIdPlayer => ').setMin(1).setMax(2).getStrErr()) return 0;
        this.id = iId;
    }

    getIdPlayer()
    {
        if(! new ParamIntCheck(this.id, 'this.id', 'Player => setIdPlayer => ').setMin(1).setMax(2).getStrErr()) return 0;
        return this.id;
    }


    /** LAP SCORE - ROUND SCORE **/
    increaseIntLapScore(iScore)
    {
        //Le lap score ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        //Le lap score est au maximum fixé dans la classe BoardGame voir MAX_DICE
        let sFunction = 'increaseIntLapScore';
        let oParamIntCheck = new ParamIntCheck(iScore, 'iScore', 'Player => ' + sFunction + ' => ').setMin(2).setMax(BoardGame.MAX_DICE);
        if(Object.values(oParamIntCheck.oErr).length > 0)
        {
            new ToastAlert(ToastAlert.INFO, oParamIntCheck.getStrErrVal());
            this.oLapScore.setIntValue(0);
            return;
        }

        let iLapScore = this.oLapScore.getIntValue();
        iLapScore += parseInt(iScore);
        this.oLapScore.setIntValue(iLapScore);
    }
    /** FIN LAP SCORE **/


    /** CURRENT SCORE -- GLOBAL SCORE**/
    increaseIntCurrentScore(iScore)
    {
        //Le lap score (ici iScore) ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score (ici iScore) ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        //Le lap score (ici iScore) n'a pas de maximum mais on considère que si le joueur obtient un lap score de 100 alors c'est truqué

        let oParamIntCheck = new ParamIntCheck(iScore, 'iScore', 'Player => increaseIntCurrentScore').setMin(2).setMax(this.oLapScore.oParamInt.getIntMax());
        if(Object.values(oParamIntCheck.oErr).length > 0)
        {
            let oToast = new ToastAlert(ToastAlert.INFO, oParamIntCheck.getStrErrVal());
            this.oLapScore.setIntValue(0);
            return;
        }

        let iCurrentScore = this.oCurrentScore.getIntValue();
        iCurrentScore += parseInt(iScore);
        if(iCurrentScore > this.oCurrentScore.oParamInt.getIntMax()) iCurrentScore = this.oCurrentScore.oParamInt.getIntMax();
        this.oCurrentScore.setIntValue(iCurrentScore);
    }
    /** FIN CURRENT SCORE **/

    rollDicePlayer()
    {

        if(iRandomDice === 1) {
            this.oLapScore.setIntValue(0);
            if(this.getIdPlayer() === 1) oBoardGame.setPlayerTurn(2);
            else if(this.getIdPlayer() === 2) oBoardGame.setPlayerTurn(1);
            oBoardGame.messageSwitchTurn();
        } else { this.increaseIntLapScore(iRandomDice); }
        oBoardGame.rollDiceIcon(iRandomDice);
    }


    hold()
    {
        this.increaseIntCurrentScore(this.oLapScore.getIntValue());
        if(this.oCurrentScore.getIntValue() === this.oCurrentScore.getIntMax()) { oBoardGame.endGame(); }
        else {
            this.oLapScore.setIntValue(0);
            if(this.getIdPlayer() === 1) oBoardGame.setPlayerTurn(2);
            else if(this.getIdPlayer() === 2) oBoardGame.setPlayerTurn(1);
            else{
                alert(`Error idPlayer : ${this.getIdPlayer()}`);
                return false;
            }
        }
    }


}

class Dice
{
    constructor() {
        this.oCtnDice = new DomElement('ctnDiceResult');
        this.oParamInt = new IntParam(1, 6);
    }
    rollDice()
    {
        const iRandomDice = this.getNumberRandom();
        this.switchRollDiceIcon(iRandomDice);
        return iRandomDice;
    }

    switchRollDiceIcon(iDice)
    {
        //Masquer tous les dés
        let oCtnDice = this.oCtnDice.getObjDomElement();
        oCtnDice.querySelectorAll('i').forEach(function(oDice){ oDice.classList.add('hide'); });
        //Afficher le bon dé
        switch(iDice)
        {
            case 1: oCtnDice.querySelector('.fa-dice-one').classList.remove('hide'); break;
            case 2: oCtnDice.querySelector('.fa-dice-two').classList.remove('hide'); break;
            case 3: oCtnDice.querySelector('.fa-dice-three').classList.remove('hide'); break;
            case 4: oCtnDice.querySelector('.fa-dice-four').classList.remove('hide'); break;
            case 5: oCtnDice.querySelector('.fa-dice-five').classList.remove('hide'); break;
            case 6: oCtnDice.querySelector('.fa-dice-six').classList.remove('hide'); break;
            default: alert('Error switch Dice => switchRollDiceIcon'); break;
        }
    }

    getNumberRandom()
    {
        const i = Math.ceil(Math.random() * ((this.oParamInt.iMax  - this.oParamInt.iMin) + this.oParamInt.iMin));
        if(!new ParamIntCheck(i, 'i', 'Dice => getNumberRandom').setMin(this.oParamInt.iMin).setMax(this.oParamInt.iMax)) return false;
        return i;
    }
}

class DomElement
{
    constructor(sIdElement)
    {
        this.sIdElement = null;
        this.oObject = null;

        this.setIdElement(sIdElement);
        this.setObjDomElement(this.findObjDomElement());
    }

    setIdElement(sIdElement)
    {
        //ParamString check
        this.sIdElement = sIdElement;
    }

    findObjDomElement()
    {
        let o = document.getElementById(this.sIdElement);
        if(! new ParamObjCheck(o, 'o', 'DomElement => getObjElement =>').getStrErr())return false;
        return o
    }

    setObjDomElement(oObj)
    {
        if(! new ParamObjCheck(oObj, 'oObj', 'DomElement => setObjDomElement =>').getStrErr())return false;
        this.oObject = oObj;
    }

    getObjDomElement()
    {
        if(! new ParamObjCheck(this.oObject, 'this.oObject', 'DomElement => getObjDomElement =>').getStrErr())return false;
        return this.oObject;
    }
}

class IntParam
{
    constructor(iMin, iMax) {
        this.iMin = null;
        this.iMax = null;
        this.setIntMin(iMin);
        this.setIntMax(iMax);
    }

    getIntMin()
    {
        if(!new ParamIntCheck(this.iMin, 'this.iMin', 'IntDomElement => getIntMin').getStrErr()) return false;
        return this.iMin;
    }

    setIntMin(iMin)
    {
        if(!new ParamIntCheck(iMin, 'iMin', 'IntDomElement => setIntMin').getStrErr()) return false;
        this.iMin = iMin;
    }

    getIntMax()
    {
        if(!new ParamIntCheck(this.iMax, 'this.iMax', 'IntDomElement => getIntMax').getStrErr()) return false;
        return this.iMax;
    }

    setIntMax(iMax)
    {
        if(!new ParamIntCheck(iMax, 'iMax', 'IntDomElement => setIntMax').getStrErr()) return false;
        this.iMax = iMax;
    }
}

class IntDomElement extends DomElement
{
    constructor(sIdElement, iMin, iMax) {
        super(sIdElement);
        this.oParamInt = new IntParam(iMin, iMax);
    }

    getIntValue()
    {
        let o = this.getObjDomElement();
        let i = parseInt(o.textContent);
        if(!new ParamIntCheck(i, 'iVal', 'IntDomElement => setIntValue').setMin(this.iMin).setMax(this.iMax).getStrErr()) return false;
        return i;
    }

    setIntValue(iVal)
    {
        if(!new ParamIntCheck(iVal, 'iVal', 'IntDomElement => setIntObjElementValue').setMin(this.iMin).setMax(this.iMax).getStrErr()) return false;
        let o = this.getObjDomElement();
        o.textContent = iVal;
    }
}



class ToggleClassDomElement extends DomElement
{
    constructor(oObject, sClassToggle) {
        super(oObject);
        this.sClassToggle = null;

        //PARAM STRING CHECK
        this.sClassToggle = sClassToggle;
    }

    setToggleClass(sClassToggle)
    {
        //PARAM STR CHECK
        this.sClassToggle = sClassToggle;
    }

    addClass() { this.oObject.classList.add(this.sClassToggle); }
    removeClass() { this.oObject.classList.remove(this.sClassToggle); }
}
