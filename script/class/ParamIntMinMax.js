class ParamIntMinMax extends DomElementById
{
    constructor(sIdElement, iMin, iMax) {
        super(sIdElement);
        this.iMin = null;
        this.iMax = null;
        this.setIntMin(iMin);
        this.setIntMax(iMax);
    }

    getIntMin()
    {
        try{
            let oParamCheck = new ParamIntCheck(this.iMin, 'this.iMin');
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.iMin;
    }

    setIntMin(iMin)
    {
        try{
            let oParamCheck = new ParamIntCheck(iMin, 'iMin');
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.iMin = iMin;
    }

    getIntMax()
    {
        try{
            let oParamCheck = new ParamIntCheck(this.iMax, 'this.iMax');
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.iMax;
    }

    setIntMax(iMax)
    {
        try{
            let oParamCheck = new ParamIntCheck(iMax, 'iMax');
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.iMax = iMax;
    }

    setContent(iVal) {
        try{
            let oParamCheck = new ParamIntCheck(iVal, 'iVal').checkMin(this.iMin).checkMax(this.iMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        let o = this.getObjDomElement();
        o.textContent = iVal;
    }

    getContent()
    {
        let o = this.getObjDomElement();
        let iContent = parseInt(o.textContent);
        try{
            let oParamCheck = new ParamIntCheck(iContent, 'iContent').checkMin(this.iMin).checkMax(this.iMax);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(e){
            alert(e.message);
            console.log(e.message);
            console.trace();
            return false;
        }
        return iContent;
    }
}