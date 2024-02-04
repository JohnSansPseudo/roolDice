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
        this.oIntLapScore = new IntDomElementById('lapScorePlayer' + this.id, 0, BoardGame.INT_LAP_SCORE_MAX);
        this.oIntCurrentScore = new IntDomElementById('currentScorePlayer' + this.id, 0, BoardGame.INT_MAX_WIN_CURRENT_SCORE);
    }

    setPlayerName(sPlayerName)
    {
        try{ new ParamStrCheck(sPlayerName, 'sPlayerName').checkMinLen(3).checkMaxLen(20); }
        catch (e){
            alert(e.message);
            console.error(e.message);
            console.trace();
            return false;
        }

        return this.sName = sPlayerName;
    }

    getPlayerName()
    {
        try { new ParamStrCheck(this.sName, 'this.sName').checkMinLen(3).checkMaxLen(20);}
        catch (e){
            alert(e.message);
            console.error(e.message);
            console.trace();
            return false;
        }
        return this.sName;
    }

    setIdPlayer(iId)
    {
        try { new ParamIntCheck(iId, 'iId').checkMin(this.iIdMin).checkMax(this.iIdMax);}
        catch (e){
            alert(e.message);
            console.error(e.message);
            console.trace();
            return false;
        }
        this.id = iId;
        return this.id;
    }

    getIdPlayer()
    {
        try { new ParamIntCheck(this.id, 'this.id').checkMin(this.iIdMin).checkMax(this.iIdMax);}
        catch (e){
            alert(e.message);
            console.error(e.message);
            console.trace();
            return false;
        }
        return this.id;
    }

    /** LAP SCORE - ROUND SCORE **/
    increaseIntLapScore(iDiceScore)
    {
        //Le lap score ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global

        try { new ParamIntCheck(iDiceScore, 'iDiceScore').checkMin(2); }
        catch (e){
            alert(e.message);
            console.error(e.message);
            console.trace();
            this.oIntLapScore.setContent(0);
            return false;
        }

        let iLapScore = this.oIntLapScore.getContent();
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

        new ParamIntCheck(iLapScore, 'your lap score').checkMin(1).checkMax(this.oIntLapScore.getIntMax());

        let iCurrentScore = this.oIntCurrentScore.getContent();
        iCurrentScore += iLapScore;
        if(iCurrentScore > this.oIntCurrentScore.getIntMax()) iCurrentScore = this.oIntCurrentScore.getIntMax();
        this.oIntCurrentScore.setContent(iCurrentScore);
        this.oIntLapScore.setContent(0);

    }
    /** FIN CURRENT SCORE **/
}