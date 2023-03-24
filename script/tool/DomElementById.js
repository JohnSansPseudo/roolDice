class DomElementById
{
    constructor(sIdElement)
    {
        this.iMinLenIdEl = 3;
        this.iMaxLenIdEl = 30;
        this.sIdElement = null;
        this.setStrIdElement(sIdElement);
        this.oObject = null;
        this.setObjDomElement(this.findObjDomElement());
    }

    getStrIdElement()
    {
        try{ new ParamStrCheck(this.sIdElement, 'this.sIdElement').checkMinLen(this.iMinLenIdEl).checkMaxLen(this.iMaxLenIdEl); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return '';
        }
        return this.sIdElement;
    }

    setStrIdElement(sIdElement)
    {
        try{ new ParamStrCheck(sIdElement, 'sIdElement').checkMinLen(this.iMinLenIdEl).checkMaxLen(this.iMaxLenIdEl); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return '';
        }
        this.sIdElement = sIdElement;
    }

    findObjDomElement()
    {
        let o = document.getElementById(this.getStrIdElement());
        try{ new ParamObjCheck(o, 'o'); }
        catch(oErr) {
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return o;
    }

    setObjDomElement(oObj)
    {
        try { new ParamObjCheck(oObj, 'oObj').checkDomElementById(this.getStrIdElement()); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.oObject = oObj;
    }

    /**
     *
     * @returns {object|boolean}
     */
    getObjDomElement()
    {
        try{ new ParamObjCheck(this.oObject, 'this.oObject').checkDomElementById(this.getStrIdElement()); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return null;
        }
        return this.oObject;
    }

    /**
     * @var oEl Element
     * @returns {*}
     */
    getContent()
    {
        const oEl = this.getObjDomElement();
        return oEl.innerHTML;
        //let o = document.getElementById(this.getStrIdElement());
        //return o.innerHTML;
    }

    setContent(sContent)
    {
        let oEl = this.getObjDomElement();
        oEl.innerHTML = sContent;
        //let o = document.getElementById(this.getStrIdElement());
        //o.innerHTML = sContent;
    }
}