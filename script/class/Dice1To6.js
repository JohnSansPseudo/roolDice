
class Dice1To6
{
    static STR_CLASS_HIDE = 'hide';
    constructor(sIdElement) {
        this.oCtnDice = new DomElementById(sIdElement);
        this.iDiceMin = 1;
        this.iDiceMax = 6;
        this.iVal = null;

    }

    setIntValDice() { this.iVal = this.getNumberRandom(); }
    getIntValDice() { return this.iVal; }

    rollDice()
    {
        this.setIntValDice();
        this.switchRollDiceIcon(this.getIntValDice());
        return this.getIntValDice();
    }

    switchRollDiceIcon(iDice)
    {
        //Masquer tous les dés
        let oCtnDice = this.oCtnDice.getObjDomElement();
        oCtnDice.querySelectorAll('i').forEach(function(oDice){ oDice.classList.add(Dice1To6.STR_CLASS_HIDE); });
        //Afficher le bon dé
        switch(iDice)
        {
            case 1: oCtnDice.querySelector('.fa-dice-one').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            case 2: oCtnDice.querySelector('.fa-dice-two').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            case 3: oCtnDice.querySelector('.fa-dice-three').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            case 4: oCtnDice.querySelector('.fa-dice-four').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            case 5: oCtnDice.querySelector('.fa-dice-five').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            case 6: oCtnDice.querySelector('.fa-dice-six').classList.remove(Dice1To6.STR_CLASS_HIDE); break;
            default: alert('Error switch Dice => switchRollDiceIcon'); break;
        }
    }

    getNumberRandom()
    {
        const i = Math.ceil(Math.random() * ((this.iDiceMax  - this.iDiceMin) + this.iDiceMin));
        try{
            let oParamCheck = new ParamIntCheck(i, 'i').checkMin(this.iDiceMin).checkMax(this.iDiceMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return i;
    }
}