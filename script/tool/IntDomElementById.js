class IntDomElementById extends DomElementById
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
        try{ new ParamIntCheck(this.iMin, 'this.iMin'); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.iMin;
    }

    setIntMin(iMin)
    {
        try{ new ParamIntCheck(iMin, 'iMin'); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.iMin = iMin;
    }

    getIntMax()
    {
        try{ new ParamIntCheck(this.iMax, 'this.iMax'); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.iMax;
    }

    setIntMax(iMax)
    {
        try{ new ParamIntCheck(iMax, 'iMax'); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.iMax = iMax;
    }

    setContent(iVal) {
        try{ new ParamIntCheck(iVal, 'iVal').checkMin(this.iMin).checkMax(this.iMax); }
        catch(oErr){
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
        try{ new ParamIntCheck(iContent, 'iContent').checkMin(this.iMin).checkMax(this.iMax); }
        catch(e){
            alert(e.message);
            console.log(e.message);
            console.trace();
            return false;
        }
        return iContent;
    }
}