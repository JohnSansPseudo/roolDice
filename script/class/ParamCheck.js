class ParamCheck
{
    constructor(mVal, sVar, sFunction)
    {
        if (this.constructor === ParamCheck) {
            throw new TypeError('Abstract class "ParamCheck" cannot be instantiated directly');
        }
        this.aErr = [];
        this.sVar = sVar;
        this.val = mVal;
        this.bIsTypeOf = null;
        this.bIsUndefined = this.checkUndefined();
        if(this.aErr.length < 1) this.bIsNull = this.checkIsNull();
    }

    /** Retour de l'erreur **/
    getBoolError() { return this.aErr.length <= 0; }
    getStrErr(sRetour="\n\n")
    {
        if(!this.getBoolError()) return this.aErr.join(sRetour);
        return '';
    }

    /** FIN Retour de l'erreur **/

    checkUndefined()
    {
        if(this.val === undefined)
        {
            this.aErr.push(`Error "${this.sVar}" is undefined`);
            return true;
        }
        else return false;
    }

    checkIsNull()
    {
        if(this.val === null)
        {
            this.aErr.push(`Error "${this.sVar}" is null`);
            return true;
        }
        else return false;
    }

    checkIsTypeOf(sType)
    {
        let sTypeOf = typeof this.val;
        if(sTypeOf !== sType)
        {
            this.aErr.push(`Error ${this.sVar } : ${this.val } is not type of ${sType}, typeOf ${this.sVar } : ${sTypeOf}`);
            return false;
        }
        return true;
    }
}