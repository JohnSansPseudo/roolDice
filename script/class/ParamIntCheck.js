class ParamIntCheck
{
    constructor(iInt, sVar, sFunction) {
        this.oErr = {};
        this.sVar = sVar;
        this.sFunction = sFunction;
        this.val = iInt;
        this.bIsUndefined = this.checkUndefined();
        this.bIsNaN = true;
        this.bIsNumber = false;
        if(!this.bIsUndefined)
        {
            this.bIsNaN = this.checkIsNan();
            if(this.bIsNaN) this.bIsNumber = this.checkIsNumber();
            else return true;
        }
    }

    /** Retour de l'erreur **/
    getStrErr(sRetour="\n\n"){
        let sErr = this.getStrErrVal(sRetour);
        if(Object.values(this.oErr).length > 0)
        {
            alert(sErr);
            return false;
        }
        return true;
    }
    /** FIN Retour de l'erreur **/

    getStrErrVal(sRetour="\n\n")
    {
        let sErr = '';
        if(Object.values(this.oErr).length > 0)
        {
            Object.values(this.oErr).forEach(function(el) { sErr += el + sRetour });
        }
        return sErr;
    }

    checkUndefined(){
        if(this.val == undefined)
        {
            this.oErr.undef = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is undefined`;
            return true;
        }
        else return false;
    }

    checkIsNan()
    {
        if(isNaN(this.val))
        {
            this.oErr.isNaN = `Error param ${this.sVar } : ${this.val } from function "${ this.sFunction }" is not a number`;
            return false;
        }
        return true;
    }

    checkIsNumber(){
        if((typeof this.val === 'number') === false)
        {
            this.oErr.isNumber = `Error param ${this.sVar } : ${this.val } from function "${ this.sFunction }" is not type of number`;
            return false;
        }
        return true;
    }

    setMin(iMin)
    {
        if(this.bIsUndefined || !this.bIsNaN || !this.bIsNumber) return this;
        if(this.val < iMin)
        {
            this.oErr.setMin = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is < ${iMin}`;
        }
        return this;
    }


    setMax(iMax)
    {
        if(this.bIsUndefined || !this.bIsNaN || !this.bIsNumber) return this;
        if(this.val > iMax)
        {
            this.oErr.setMin = `Error param, int : "${this.sVar}" from function : "${ this.sFunction }" is > ${iMax}`;
        }
        return this;
    }
}