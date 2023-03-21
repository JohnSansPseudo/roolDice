class TestPlayerRollDiceGame
{
    initTestPlayer()
    {
        /** DOT PLAYER **/
        this.testGetDotPlayerObj();
        this.testSetDotCurrentPlayerOn();
        this.testSetDotCurrentPlayerOff();
        /** FIN DOT PLAYER **/

        /** LAP SCORE -- ROUND SCORE**/
        this.testGetLapScoreObj();
        this.testGetLapScore();
        this.testSetLapScore();
        this.testIncreaseLapScore();
        /** FIN - LAP SCORE -- ROUND SCORE**/

        /** CURRENT SCORE -- GLOBAL SCORE**/
        /*this.testGetCurrentScoreObj();
        this.testGetCurrentScore();
        this.testSetCurrentScore();
        this.testIncreaseCurrentScore();*/
        /** FIN CURRENT SCORE **/

        /*this.testRollDice();
        this.testHold();*/
    }


    /** DOT PLAYER **/
    testGetDotPlayerObj()
    {
        //Test que la fonction renvoie bien un objet après initiation du jeu
        let sFunction = 'testGetDotPlayerObj';
        if(! new ParamObjCheck(player1.getDotPlayerObj(), 'oDotPlayer', sFunction).getStrErr()) return false;
    }
    testSetDotCurrentPlayerOn()
    {
        let sFunction = 'testSetDotCurrentPlayerOn';

        player1.getDotPlayerObj().classList.add('hide');
        player1.setDotCurrentPlayerOn();

        if(player1.getDotPlayerObj().classList.contains('hide')){
            alert('Error ' + sFunction + ' isn\'t working ');
            return false;
        }
    }
    testSetDotCurrentPlayerOff()
    {
        let sFunction = 'testSetDotCurrentPlayerOff';
        player1.oDotPlayer.classList.remove('hide');
        player1.setDotCurrentPlayerOff();
        if(!player1.getDotPlayerObj().classList.contains('hide')){
            alert('Error ' + sFunction + ' isn\'t working ');
            return false;
        }
    }
    /** FIN DOT PLAYER **/


    /** LAP SCORE -- ROUND SCORE**/
    testGetLapScoreObj()
    {
        //Test que la fonction renvoie bien un objet
        let sFunction = 'testGetLapScoreObj';
        let oLapScore = player1.getLapScoreObj();
        if(! new ParamObjCheck(oLapScore, 'oLapScore', sFunction).getStrErr()) return false;
        if(oLapScore.id !== 'lapScorePlayer1'){ console.log('Error ' + sFunction + ' id dosen\'t match'); }
    }

    testGetLapScore()
    {
        let sFunction = 'testGetLapScore';
        if(! new ParamIntCheck(player1.getIntLapScore(), 'iLapScore', sFunction).setMin(0).getStrErr()) return false;
    }

    testSetLapScore()
    {
        let sFunction = 'testSetLapScore';
        let iInitialScore =  player1.getIntLapScore();
        player1.setIntLapScore(10);
        let iNewScore = player1.getIntLapScore();
        if(iInitialScore === iNewScore) {
            alert('Error ' + sFunction + ' isn\'t working in HTML! ');
            return false;
        }
        player1.setIntLapScore(0);
    }

    testIncreaseLapScore()
    {
        //CASE 0
        player1.setIntLapScore(0);
        player1.increaseIntLapScore(0);
        if(player1.getIntLapScore() > 0) alert('Error lapScore can\'t be > 0 while the dice score is 0');

        //CASE DICE == 1
        player1.setIntLapScore(0);
        player1.increaseIntLapScore(1);
        if(player1.getIntLapScore() === 1) alert('Error lapScore can\'t be equal to 1');

        //MAX DICE +1
        player1.setIntLapScore(0);
        player1.increaseIntLapScore(BoardGame.MAX_DICE + 1);
        if(player1.getIntLapScore() === BoardGame.MAX_DICE + 1) alert('Error, dice score can\'t be equal to ' + (BoardGame.MAX_DICE + 1) + ' and lapscore shoud not be equal too');

        //Normal case
        player1.setIntLapScore(0);
        player1.increaseIntLapScore(6);
        if(player1.getIntLapScore() !== 6) alert('Error lapscore should be equal to 6 as score dice');

        player1.setIntLapScore(0);
    }
    /** FIN - LAP SCORE -- ROUND SCORE**/


    /** CURRENT SCORE -- GLOBAL SCORE**/
    testGetCurrentScoreObj()
    {
        //Test que la fonction renvoie bien un objet
        let sFunction = 'testGetCurrentScoreObj';
        if(! new ParamObjCheck(player1.getCurrentScoreObj(), 'OCurrentScore', sFunction).getStrErr()) return false;
    }

    testGetCurrentScore()
    {
        //Test que la fonction renvoie bien un "number" compris entre 0 et 100 inclus
        let sFunction = 'testGetCurrentScore';
        if(! new ParamIntCheck(player1.getIntCurrentScore(), 'iCurrentScore', sFunction).setMin(0).setMax(100).getStrErr()) return false;
    }

    testSetCurrentScore()
    {
        let sFunction = 'testSetCurrentScore';
        player1.setIntCurrentScore(0);
        let iInitialScore =  player1.getIntCurrentScore();
        player1.setIntCurrentScore(10);
        let iNewScore = player1.getIntCurrentScore();
        if(iInitialScore === iNewScore){
            console.log('Error ' + sFunction + ' isn\'t working in HTML! ');
            return false;
        }

        iInitialScore = window.sessionStorage.getItem(Player.ID_CURRENT_SCORE + 1);
        player1.setIntCurrentScore(11);
        iNewScore = window.sessionStorage.getItem(Player.ID_CURRENT_SCORE + 1);
        if(iInitialScore === iNewScore){
            console.log('Error ' + sFunction + ' isn\'t working in sessionStorage! ');
            return false;}
    }

    testIncreaseCurrentScore()
    {
        //Le lap score (ici iScore) ne peut pas être de 1 puisque quand le joueur fait 1 il passe son tour et son lap score passe à 0
        //Le lap score (ici iScore) ne peut pas être de 0 ça ne sert à rien d'ajouter 0 au score global
        //Le lap score (ici iScore) n'a pas de maximum mais on considère que si le joueur obtient un lap score de 100 alors c'est truqué

        //Forbidden score - facultatif car ajouté 0 ne pose pas de problème au score mais est contraire au sens du jeu
        player1.setIntCurrentScore(0);
        player1.increaseIntCurrentScore(0);
        if(player1.getIntCurrentScore() > 0) console.log('Error lapScore can\'t be > 0 while the dice score is 0');

        //Forbidden score
        player1.setIntCurrentScore(0);
        player1.increaseIntCurrentScore(1);
        if(player1.getIntCurrentScore() === 1) console.log('Error it is not possible to add score 1 to current score');

        //Max score + 1
        player1.setIntCurrentScore(0);
        player1.increaseIntCurrentScore(100);
        if(player1.getIntCurrentScore() === 100) console.log('Error current score can\'t be > 99');

        //Noraml case
        player1.setIntCurrentScore(0);
        player1.increaseIntCurrentScore(10);
        if(player1.getIntCurrentScore() !== 10)console.log('Error current score should be equal to 10 as lap score');

        player1.setIntCurrentScore(0);
    }
    /** FIN CURRENT SCORE **/


    testRollDice()
    {
        let sFunction = 'testRollDice';
        //TEST avec un dé de 1
        player1.rollDice(1);
        if(player1.getIntLapScore() !== 0) console.log('Error' + sFunction + ' lapScore should be equal to 0');

        //On remet le jeu côté joueur 1;
        oBoardGame.setPlayerTurn(1);

        //Les autres fonctions  concernent la class board
    }

    testHold()
    {
        alert('todo testHold');
        return false;

        let sFunction = 'testHold';
        //ON test si le current score est le même avant et après que le joueur ait cliqué sur hold et après avoir lancé le dé

        let iInitialVal = player1.getIntCurrentScore();
        while(player1.getIntLapScore() === 0)
        {
            player1.rollDice(oBoardGame.getNumberRandom());
        }

        player1.hold();
        let iNewVal = player1.getIntCurrentScore();

        if(iInitialVal === iNewVal)
        {
            console.log('Error ' + sFunction);
            return false;
        }
    }

}