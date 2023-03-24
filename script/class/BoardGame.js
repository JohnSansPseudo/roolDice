class BoardGame
{
    iIdCurPlayer;
    static INT_MAX_WIN_CURRENT_SCORE = 100;
    static INT_LAP_SCORE_MAX = 99;

    constructor()
    {
        this.oDice = new Dice1To6('ctnDiceResult');
        this.initGame();
    }

    initGame()
    {
        this.gameOn = true;
        this.oPlayer1 = new Player(1, 'Player 1');
        this.oPlayer2 = new Player(2, 'Player 2');
        this.messageStartingGame();
        this.oPlayer1.oIntCurrentScore.setContent(0);
        this.oPlayer1.oIntLapScore.setContent(0);
        this.oPlayer2.oIntCurrentScore.setContent(0);
        this.oPlayer2.oIntLapScore.setContent(0);
        this.setPlayerTurn(1);
    }

    setIntIdCurPlayer(iIdCurPlayer)
    {
        try{
            let oParamCheck = new ParamIntCheck(iIdCurPlayer, 'iIdCurPlayer').checkMin(this.oPlayer1.iIdMin).checkMax(this.oPlayer1.iIdMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.iIdCurPlayer = parseInt(iIdCurPlayer);
    }

    getCurPlayer()
    {
        let oCurPlayer = this.oPlayer1;
        if(this.getIntIdCurPlayer() === 2) oCurPlayer = this.oPlayer1;
        return oCurPlayer;
    }

    getIntIdCurPlayer()
    {
        try{
            let oParamCheck = new ParamIntCheck(this.iIdCurPlayer, 'this.iIdCurPlayer').checkMin(this.oPlayer1.iIdMin).checkMax(this.oPlayer1.iIdMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.iIdCurPlayer;
    }

    rollDiceBoard()
    {
        let oCurPlayer = this.getCurPlayer();
        const iRandomDice = this.oDice.rollDice();
        if(iRandomDice === 1) {
            oCurPlayer.oIntLapScore.setContent(0);
            this.switchPlayerTurnByScored1();
        } else { oCurPlayer.increaseIntLapScore(iRandomDice); }
    }

    hold()
    {
        let oCurPlayer = this.getCurPlayer();
        oCurPlayer.increaseIntCurrentScore();
        if(oCurPlayer.oIntCurrentScore.getContent() === oCurPlayer.oIntCurrentScore.getIntMax()) this.endGame();
        else {
            oCurPlayer.oIntLapScore.setContent(0);
            this.switchPlayerTurn();
        }
    }

    switchPlayerTurnByScored1()
    {
        let idNewCurPlayer = 0;
        if(this.getIntIdCurPlayer() === 1) idNewCurPlayer = 2;
        else if(this.getIntIdCurPlayer() === 2) idNewCurPlayer = 1;
        this.setPlayerTurn(idNewCurPlayer);
        this.messageSwitchTurnByScored1();
    }

    switchPlayerTurn()
    {
        let idNewCurPlayer = 0;
        if(this.getIntIdCurPlayer() === 1) idNewCurPlayer = 2;
        else if(this.getIntIdCurPlayer() === 2) idNewCurPlayer = 1;
        this.setPlayerTurn(idNewCurPlayer);
        this.messageSwitchTurn();
    }

    setPlayerTurn(idPlayer)
    {
        this.setIntIdCurPlayer(idPlayer);
        this.setDotPlayerActive(idPlayer);
    }

    setDotPlayerActive(idPlayer)
    {
        try{
            let oParamCheck = new ParamIntCheck(idPlayer, 'idPlayer').checkMin(this.oPlayer1.iIdMin).checkMax(this.oPlayer1.iIdMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }

        if(idPlayer === 1)
        {
            this.oPlayer1.oDotPlayer.removeClass();
            this.oPlayer2.oDotPlayer.addClass();
        } else if(idPlayer === 2) {
            this.oPlayer1.oDotPlayer.addClass();
            this.oPlayer2.oDotPlayer.removeClass();
        }
    }

    endGame()
    {
        this.messagePlayerWin();
        this.gameOn = false;
    }

    //TOAST MESSAGES
    messageNewGame()
    {
        new ToastAlert(ToastAlert.INFO, 'The game is over click on "New game" button to restart another game');
    }

    messageStartingGame()
    {
        new ToastAlert(ToastAlert.INFO, this.oPlayer1.getPlayerName() + ' begin !');
    }

    messagePlayerWin()
    {
        let sWinner = this.oPlayer1.getPlayerName();
        if(this.oPlayer2.oIntCurrentScore.getContent() === BoardGame.INT_MAX_WIN_CURRENT_SCORE) sWinner = this.oPlayer2.getPlayerName();
        new ToastAlert(ToastAlert.SUCCESS, sWinner + ' win !');
    }

    messageSwitchTurnByScored1()
    {
        new ToastAlert(ToastAlert.INFO, 'You scored 1 the turn passes to the next player');
    }

    messageSwitchTurn()
    {
        new ToastAlert(ToastAlert.INFO, 'The turn passes to the next player');
    }
}