
class TestBoardRollDiceGame
{
    initTestPlayer()
    {

        this.testGetNumberRandom();

    }

    testGetNumberRandom()
    {
        //Int
        //Max 6
        //Min 1
        let sFunction = 'testGetNumberRandom';
        //Il faut que tout les chiffres soient supprimés du tableau
        let aNumber = [1, 2, 3, 4, 5, 6];
        //ON fait 1000 tests sur la fonction getNumberRandom on vérifie à chaque que le chiffre est un number compris en 1 et 6 inclus
        for(let i =0; i < 1000; i++)
        {
            let iNumber = oBoardGame.getNumberRandom();
            if(! new ParamIntCheck(oBoardGame.getNumberRandom(), 'iRandom', sFunction).setMin(1).setMax(6).getStrErr()) return false;
            aNumber.forEach(function(iNumberTab){
                if(iNumber == iNumberTab)
                {
                    let iIndex = aNumber.indexOf(iNumber)
                    if(iIndex !== -1) aNumber.splice(iIndex, 1);
                }
            });
        }
        //SI le tableau aNumber contient un des chiffre alors on considère que le tableau ne fonctionne pas bien
        if(aNumber.length > 0)
        {
            alert(aNumber.join(", "));
            return false;
        }
    }
}