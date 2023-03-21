class Player
{
    static ID_DOT_PLAYER = 'dotPlayer';
    static CLASS_TOGGLE_DOT_PLAYER = 'hide';

    static ID_LAP_SCORE = 'lapScorePlayer';
    static INT_LAP_SCORE_MAX = 99;
    static INT_LAP_SCORE_MIN = 0;

    static ID_CURRENT_SCORE = 'currentScorePlayer';
    static INT_CURRENT_SCORE_MAX = 100;
    static INT_CURRENT_SCORE_MIN = 0;


    constructor(iId){
        if(! new ParamIntCheck(iId, 'iId', 'Player => constructor => ').setMin(1).setMax(2).getStrErr()) return false;
        this.id = iId;
        this.oDotPlayer = this.getDotPlayerObj();
        this.oLapScore = this.getLapScoreObj();
        this.oCurrentScore = this.getCurrentScoreObj();
    }

    /** DOT PLAYER **/
    getDotPlayerObj()
    {
        if(! new ParamIntCheck(this.id, 'this.id', 'Player => getDotPlayerObj => ').getStrErr()) return false;
        let oDotPlayer = document.getElementById(Player.ID_DOT_PLAYER + this.id);
        if(! new ParamObjCheck(oDotPlayer, 'oDotPlayer', 'Player => getDotPlayerObj => ').getStrErr()) return false;
        return oDotPlayer;
    }

    setDotCurrentPlayerOn()
    {
        if(! new ParamObjCheck(this.oDotPlayer, 'this.oDotPlayer', 'Player => setDotCurrentPlayerOn => ').getStrErr()) return false;
        this.oDotPlayer.classList.remove(Player.CLASS_TOGGLE_DOT_PLAYER);
    }
    setDotCurrentPlayerOff()
    {
        if(! new ParamObjCheck(this.oDotPlayer, 'this.oDotPlayer', 'Player => setDotCurrentPlayerOff => ').getStrErr()) return false;
        this.oDotPlayer.classList.add(Player.CLASS_TOGGLE_DOT_PLAYER);
    }
    /** FIN DOT PLAYER **/


    /** LAP SCORE - ROUND SCORE **/
    getLapScoreObj()
    {
        if(! new ParamIntCheck(this.id, 'this.id', 'Player => getLapScoreObj =>  ').getStrErr()) return false;
        let oLapScorePlayer = document.getElementById(Player.ID_LAP_SCORE + this.id);
        if(! new ParamObjCheck(oLapScorePlayer, 'oLapScorePlayer', 'Player => getLapScoreObj =>  ').getStrErr()) return false;
        return oLapScorePlayer;
    }
    getIntLapScore()
    {
        if(! new ParamObjCheck(this.oLapScore, 'this.oLapScore', 'Player => getIntLapScore => ').getStrErr()) return false;
        return parseInt(this.oLapScore.textContent);
    }
    setIntLapScore(iScore)
    {
        if(! new ParamIntCheck(iScore, 'iScore', 'Player => setIntLapScore => ').setMin(Player.INT_LAP_SCORE_MIN).setMax(Player.INT_LAP_SCORE_MAX).getStrErr()) return false;
        if(! new ParamObjCheck(this.oLapScore, 'this.oLapScore', 'Player => setIntLapScore => ').getStrErr()) return false;
        this.oLapScore.textContent = iScore;
    }

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
            this.setIntLapScore(0);
            return;
        }

        let iLapScore = this.getIntLapScore();
        if(! new ParamIntCheck(iLapScore, 'iLapScore', 'Player => ' + sFunction + ' => ').getStrErr()) return false;
        iScore = parseInt(iScore);
        iLapScore += iScore;
        this.setIntLapScore(iLapScore);
    }
    /** FIN LAP SCORE **/



    /** CURRENT SCORE -- GLOBAL SCORE**/
    getCurrentScoreObj()
    {
        if(! new ParamIntCheck(this.id, 'this.id').getStrErr()) return false;
        let oCurrentScorePlayer = document.getElementById('currentScorePlayer' + this.id);
        if(! new ParamObjCheck(oCurrentScorePlayer, 'oCurrentScorePlayer', 'Player => getCurrentScoreObj => ').getStrErr()) return false;
        return oCurrentScorePlayer;
    }

    getIntCurrentScore()
    {
        let oCurrentScore = this.oCurrentScore;
        if(! new ParamObjCheck(oCurrentScore, 'oCurrentScore', 'Player => getIntCurrentScore => ').getStrErr()) return false;
        return parseInt(this.oCurrentScore.textContent);
    }

    setIntCurrentScore(iScore)
    {
        //Ici il est possible de mettre le current score à 0 si le jeu l'exige, pour l'initiation du jeu par exemple.
        let oParam = new ParamIntCheck(iScore, 'iScore' ,'Player => setIntCurrentScore => ');
        oParam.setMin(Player.INT_CURRENT_SCORE_MIN).setMax(Player.INT_CURRENT_SCORE_MAX).getStrErr();
        if(! oParam.setMin(Player.INT_CURRENT_SCORE_MIN).setMax(Player.INT_LAP_SCORE_MAX).getStrErr()) return false;
        this.oCurrentScore.textContent = iScore;
    }

    increaseIntCurrentScore(iScore)
    {
        //Le lap score (ici iScore) ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score (ici iScore) ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        //Le lap score (ici iScore) n'a pas de maximum mais on considère que si le joueur obtient un lap score de 100 alors c'est truqué

        let oParamIntCheck = new ParamIntCheck(iScore, 'iScore', 'Player => increaseIntCurrentScore').setMin(2).setMax(Player.INT_LAP_SCORE_MAX);
        if(Object.values(oParamIntCheck.oErr).length > 0)
        {
            let oToast = new ToastAlert(ToastAlert.INFO, oParamIntCheck.getStrErrVal());
            this.setIntLapScore(0);
            return;
        }

        let iCurrentScore = this.getIntCurrentScore();
        iCurrentScore += parseInt(iScore);
        if(iCurrentScore > Player.INT_CURRENT_SCORE_MAX) iCurrentScore = Player.INT_CURRENT_SCORE_MAX;
        this.setIntCurrentScore(iCurrentScore);
    }
    /** FIN CURRENT SCORE **/

    rollDice(iRandomDice)
    {
        if(!new ParamIntCheck(iRandomDice, 'iRandomDice', 'Player => rollDice').setMin(BoardGame.MIN_DICE).setMax(BoardGame.MAX_DICE)) return false;
        if(iRandomDice === 1) {
            this.setIntLapScore(0);
            if(this.id === 1) oBoardGame.setPlayerTurn(2);
            else if(this.id === 2) oBoardGame.setPlayerTurn(1);
            oBoardGame.messageSwitchTurn();
        } else { this.increaseIntLapScore(iRandomDice); }
        oBoardGame.rollDiceIcon(iRandomDice);
    }

    hold()
    {
        if(!new ParamIntCheck(this.getIntLapScore(), 'this.getIntLapScore()', 'Player => hold')) return false;
        this.increaseIntCurrentScore(this.getIntLapScore());

        if(!new ParamIntCheck(this.getIntCurrentScore(), 'this.getIntCurrentScore()', 'Player => hold')) return false;
        if(this.getIntCurrentScore() === Player.INT_CURRENT_SCORE_MAX) { oBoardGame.endGame(); }
        else {
            if(!new ParamIntCheck(this.id, 'this.id', 'Player => hold')) return false;
            if(this.id === 1) oBoardGame.setPlayerTurn(2);
            else if(this.id === 2) oBoardGame.setPlayerTurn(1);
            this.setIntLapScore(0);
        }
    }

}