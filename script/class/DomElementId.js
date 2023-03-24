class DomElementId
{
    constructor(sIdElement) {
        this.iMinLenIdEl = 3;
        this.iMaxLenIdEl = 30;
        this.sIdElement = null;
        this.setStrIdElement(sIdElement);
    }

    getStrIdElement()
    {
        try{
            let oParamCheck = new ParamStrCheck(this.sIdElement, 'this.sIdElement').checkIntMinLength(this.iMinLenIdEl).checkIntMaxLength(this.iMaxLenIdEl);
            if(oParamCheck.aErr.length > 0) throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return '';
        }
        return this.sIdElement;
    }

    setStrIdElement(sIdElement)
    {
        try{
            let oParamCheck = new ParamStrCheck(sIdElement, 'sIdElement').checkIntMinLength(this.iMinLenIdEl).checkIntMaxLength(this.iMaxLenIdEl);
            if(oParamCheck.aErr.length > 0) throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return '';
        }
        this.sIdElement = sIdElement;
    }
}