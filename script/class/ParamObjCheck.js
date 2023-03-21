class ParamObjCheck
{
    constructor(obj, sVar, sFunction)
    {
        this.oErr = { };
        this.sVar = sVar;
        this.sFunction = sFunction;
        this.value = obj;
        this.undef = this.checkUndefined();
        this.bObject = false;
        this.bLength0 = 0;
        if(this.undef === false)
        {
            this.bObject = this.checkIsObject();
            if(this.bObject) this.bLength0 = this.checkLength();
        }
    }

    /** Retour de l'erreur **/
    getStrErr(sRetour="\n\n")
    {
        if(Object.values(this.oErr).length > 0)
        {
            let sErr = '';
            Object.values(this.oErr).forEach(function(el) { sErr += el + sRetour });
            alert(sErr);
            return false;
        }
        return true;
    }
    /** FIN Retour de l'erreur **/

    checkUndefined(){
        if(this.value == undefined)
        {
            this.oErr.undef = `Error param, object "${this.sVar}" from function "${ this.sFunction }" is undefined`;
            return true;
        }
        else return false;
    }

    checkLength(){
        if(this.value.length == 0) this.oErr.length = `Error param length, object "${this.sVar}" from function "${ this.sFunction }" is empty`;
        return this;
    }

    checkIsObject(){
        if((typeof this.value === 'object') === false)
        {
            this.oErr.isObject = `Error param : ${this.value } is not type of object`;
            return false;
        }
        return true;
    }

    getBoolValidParam()
    {
        if(this.bObject === false || this.undef === true || this.bLength0 === true) return false;
        else return true;
    }

}