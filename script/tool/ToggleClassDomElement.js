class ToggleClassDomElement extends DomElementById
{
    constructor(oObject, sClassToggle) {
        super(oObject);
        this.sClassToggle = null;
        this.setToggleClass(sClassToggle);
    }

    setToggleClass(sClassToggle)
    {
        try{ new ParamStrCheck(sClassToggle, 'sClassToggle').checkMinLen(3).checkMaxLen(30); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.sClassToggle = sClassToggle;
        return this;
    }

    getToggleClass()
    {
        try{ new ParamStrCheck(this.sClassToggle, 'this.sClassToggle').checkMinLen(3).checkMaxLen(30); }
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.sClassToggle;
    }

    addClass() { this.oObject.classList.add(this.sClassToggle); }
    removeClass() { this.oObject.classList.remove(this.sClassToggle); }
}
