
class DomElementById extends DomElementId
{
    constructor(sIdElement)
    {
        super(sIdElement);
        this.oObject = null;
        this.setObjDomElement(this.findObjDomElement());
    }

    findObjDomElement()
    {
        let o = document.getElementById(this.getStrIdElement());
        try{ if(o === null) throw new Error('Error '); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return o
    }

    setObjDomElement(oObj)
    {
        try {
            let oParamCheck = new ParamObjCheck(oObj, 'oObj').checkDomElementById(this.getStrIdElement());
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.oObject = oObj;
    }

    getObjDomElement()
    {
        try{
            let oParamCheck = new ParamObjCheck(this.oObject, 'this.oObject').checkDomElementById(this.getStrIdElement());
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.oObject;
    }

    getContent()
    {
        const oEl = this.getObjDomElement();
        return oEl.innerHTML();
    }

    setContent(sContent)
    {
        const oEl = this.getObjDomElement();
        oEl.innerHTML(sContent);
    }
}