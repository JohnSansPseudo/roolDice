class ParamStrCheck extends ParamCheck
{
    static STR_TYPE_OF = 'string';
    constructor(sStr, sVar) {
        super(sStr, sVar);
        if(this.aErr.length < 1)
        {
            if(this.aErr.length < 1) this.bIsTypeOf = this.checkIsTypeOf(ParamStrCheck.STR_TYPE_OF);
        }
    }

    checkIntMaxLength(iMaxLength)
    {

        if(this.aErr.length > 0) return this;
        this.iMaxLength = parseInt(iMaxLength);
        let iValLength = this.val.length;
        if(iValLength > this.iMaxLength) {
            this.aErr.push(`Error the entered value "${this.sVar}" is too long : ${iValLength} > ${ this.iMaxLength }`);
        }
        return this;
    }

    checkIntMinLength(iMinLength)
    {
        if(this.aErr.length > 0) return this;
        this.iMinLength = parseInt(iMinLength);
        let iValLength = this.val.length;
        if(iValLength < this.iMinLength) {
            this.aErr.push(`Error the entered value "${this.sVar}" is too short : ${iValLength} < ${ this.iMinLength }`);
        }
        return this;
    }
}