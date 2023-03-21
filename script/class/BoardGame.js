
class BoardGame
{
    iIdCurPlayer;

    static MIN_DICE = 1;
    static MAX_DICE = 6;

    setIntIdCurPlayer(iIdCurPlayer)
    {
        if(!new ParamIntCheck(iIdCurPlayer, 'iIdCurPlayer', 'BoardGame => setIntIdCurPlayer').setMin(1).setMax(2))return false;
        this.iIdCurPlayer = parseInt(iIdCurPlayer);
    }
    getIntIdCurPlayer() { return this.iIdCurPlayer; }

    initGame()
    {
        this.gameOn = true;
        this.messageStartingGame();
        this.player1 = new Player(1);
        this.player2 = new Player(2);
        this.player1.setIntCurrentScore(0);
        this.player1.setIntLapScore(0);
        this.player2.setIntCurrentScore(0);
        this.player2.setIntLapScore(0);
        this.setPlayerTurn(1);
    }

    getObjCurPlayer()
    {
        let oPlayer = this.player1;
        if(this.getIntIdCurPlayer() === 2) oPlayer = this.player2;
        if(!new ParamObjCheck(oPlayer, 'oPlayer', 'BoardGame => getObjCurPlayer'))return false;
        return oPlayer;
    }

    setPlayerTurn(idPlayer)
    {
        if(!new ParamIntCheck(idPlayer, 'idPlayer', 'BoardGame => setPlayerTurn').setMin(1).setMax(2))return false;
        this.setIntIdCurPlayer(idPlayer);
        this.setDotPlayerActive(idPlayer);
    }

    setDotPlayerActive(idPlayer)
    {
        if(!new ParamIntCheck(idPlayer, 'idPlayer', 'BoardGame => setDotPlayerActive').setMin(1).setMax(2))return false;
        if(idPlayer === 1)
        {
            this.player1.setDotCurrentPlayerOn();
            this.player2.setDotCurrentPlayerOff();
        } else if(idPlayer === 2) {
            this.player1.setDotCurrentPlayerOff();
            this.player2.setDotCurrentPlayerOn();
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
        let oToast = new ToastAlert(ToastAlert.INFO, 'The game is over click on "New game" button to restart another game');
    }

    messageStartingGame()
    {
        let oToast = new ToastAlert(ToastAlert.INFO, 'Player 1 begin !');
    }

    messagePlayerWin()
    {
        let sWinner = 'Player 1';
        if(this.player2.getIntCurrentScore() === Player.INT_CURRENT_SCORE_MAX) sWinner = 'Player 2';
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
        //Afficher le dé
        switch(iDice)
        {
            case 1: oCtnDice.querySelector('.fa-dice-one').classList.remove('hide'); break;
            case 2: oCtnDice.querySelector('.fa-dice-two').classList.remove('hide'); break;
            case 3: oCtnDice.querySelector('.fa-dice-three').classList.remove('hide'); break;
            case 4: oCtnDice.querySelector('.fa-dice-four').classList.remove('hide'); break;
            case 5: oCtnDice.querySelector('.fa-dice-five').classList.remove('hide'); break;
            case 6: oCtnDice.querySelector('.fa-dice-six').classList.remove('hide'); break;
            default: alert('Error switch Boardgame => rollDiceIcon'); break;
        }
    }

    getNumberRandom()
    {
        return Math.ceil(Math.random() * ((BoardGame.MAX_DICE  - BoardGame.MIN_DICE) + BoardGame.MIN_DICE));
    }

}