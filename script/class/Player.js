class Player
{
    static STR_CLASS_HIDE = 'hide';
    constructor(iId, sPlayerName)
    {
        this.id=null;
        this.sName = null;
        this.iIdMin = 1;
        this.iIdMax = 2;
        this.setIdPlayer(iId);
        this.setPlayerName(sPlayerName);
        this.oDotPlayer = new ToggleClassDomElement('dotPlayer' + this.id, Player.STR_CLASS_HIDE);
        this.oIntLapScore = new ParamIntMinMax('lapScorePlayer' + this.id, 0, BoardGame.INT_LAP_SCORE_MAX);
        this.oIntCurrentScore = new ParamIntMinMax('currentScorePlayer' + this.id, 0, BoardGame.INT_MAX_WIN_CURRENT_SCORE);
    }

    setPlayerName(sPlayerName)
    {
        try{
            let oParamCheck = new ParamStrCheck(sPlayerName, 'sPlayerName').checkIntMinLength(3).checkIntMaxLength(20);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.sName = sPlayerName;
    }

    getPlayerName()
    {
        try{
            let oParamCheck = new ParamStrCheck(this.sName, 'this.sName').checkIntMinLength(3).checkIntMaxLength(20);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.sName;
    }

    setIdPlayer(iId)
    {
        try{
            let oParamCheck = new ParamIntCheck(iId, 'iId').checkMin(this.iIdMin).checkMax(this.iIdMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.id = iId;
    }

    getIdPlayer()
    {
        try{
            let oParamCheck = new ParamIntCheck(this.id, 'this.id').checkMin(this.iIdMin).checkMax(this.iIdMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return 0;
        }
        return this.id;
    }

    /** LAP SCORE - ROUND SCORE **/
    increaseIntLapScore(iDiceScore)
    {
        //Le lap score ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        try{
            let oParamCheck = new ParamIntCheck(iDiceScore, 'iDiceScore').checkMin(2);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            this.oIntLapScore.setContent(0);
            return false;
        }

        let iLapScore = this.oIntLapScore.getIntMax();
        iLapScore += parseInt(iDiceScore);
        this.oIntLapScore.setContent(iLapScore);
    }
    /** FIN LAP SCORE **/


    /** CURRENT SCORE -- GLOBAL SCORE**/
    increaseIntCurrentScore()
    {
        let iLapScore = this.oIntLapScore.getContent();
        //iLapScore ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //iLapScore ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        //iLapScore n'a pas de maximum mais on considère que si le joueur obtient un lap score > BoardGame.INT_MAX_LAP_SCORE alors c'est truqué
        try{
            let oParamCheck = new ParamIntCheck(iLapScore, 'iLapScore').checkMin(2).checkMax(this.oIntLapScore.getIntMax());
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            this.oIntLapScore.setContent(0);
            return false;
        }

        let iCurrentScore = this.oIntCurrentScore.getContent();
        iCurrentScore += iLapScore;
        if(iCurrentScore > this.oIntCurrentScore.getIntMax()) iCurrentScore = this.oIntCurrentScore.getIntMax();
        this.oIntCurrentScore.setContent(iCurrentScore);
    }
    /** FIN CURRENT SCORE **/
}