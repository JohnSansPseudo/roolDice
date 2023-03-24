class TestBoardRollDiceGame
{
    constructor() { this.oBoardGame = new BoardGame(); }

    testGame()
    {
        while(this.getMaxCurrentScore() < BoardGame.INT_MAX_WIN_CURRENT_SCORE)
        {
            console.log(this.getMaxCurrentScore());
            console.log('Actual player : ' + this.oBoardGame.getIntIdCurPlayer());
            //PLayer 1
            setTimeout(this.playerPlay(3), 10000);

            //Player 2
            console.log('Actual player : ' + this.oBoardGame.getIntIdCurPlayer());
            setTimeout(this.playerPlay(5), 10000);
        }
    }

    playerPlay(iTourMax)
    {
        console.log('playerPlay');
        for(let i=0; i<iTourMax; i++)
        {
            //Click PLayer ROll Dice btn
            console.log('roll dice');
            this.oBoardGame.rollDiceBoard();

            //Si on fait un on sort de la boucle et fin de la fonction
            console.log('dice value =' + this.oBoardGame.oDice.getIntValDice())
            if(this.oBoardGame.oDice.getIntValDice() === 1) return ;
        }
        //CLick PLayer Hold Btn
        this.oBoardGame.hold();
        console.log('hold');
    }

    getMaxCurrentScore()
    {
        let iMax = this.oBoardGame.oPlayer1.oIntCurrentScore.getContent();
        if(this.oBoardGame.oPlayer2.oIntCurrentScore.getContent() > iMax) iMax = this.oBoardGame.oPlayer2.oIntCurrentScore.getContent();
        return iMax;
    }
}