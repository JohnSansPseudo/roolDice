class ParamIntCheck extends ParamCheck
{
    constructor(iInt, sVar) {
        super(iInt, sVar);
        if(this.aErr.length < 1)
        {
            this.bIsNaN = this.checkIsNan();
            if(this.aErr.length < 1) this.bIsTypeOf = this.checkIsTypeOf();
        }
    }

    checkIsNan()
    {
        if(isNaN(this.val))
        {
            this.aErr.push(`Error ${this.sVar } : ${this.val } is not a number`);
            return false;
        }
        return true;
    }

    checkMin(iMin)
    {
        if(this.aErr.length > 0) return this;
        if(this.val < iMin)
        {
            this.aErr.push(`Error ${this.sVar} < iMin , ${this.val} < ${iMin}`);
        }
        return this;
    }

    checkMax(iMax)
    {
        if(this.aErr.length > 0) return this;
        if(this.val > iMax)
        {
            this.aErr.push(`Error ${this.sVar} > iMax , ${this.val} > ${iMax}`);
        }
        return this;
    }

    checkIsTypeOf()
    {
        if(!Number.isInteger(this.val))
        {
            this.aErr.push(`Error ${this.sVar } : ${this.val } is not an integer, typeOf ${this.sVar } : ${typeof this.val}`);
            return false;
        }
        return true;
    }
}