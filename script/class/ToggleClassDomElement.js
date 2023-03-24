class ToggleClassDomElement extends DomElementById
{
    constructor(oObject, sClassToggle) {
        super(oObject);
        this.sClassToggle = null;
        this.setToggleClass(sClassToggle);
    }

    setToggleClass(sClassToggle)
    {
        try{
            let oParamCheck = new ParamStrCheck(sClassToggle, 'sClassToggle').checkIntMinLength(3).checkIntMaxLength(30);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
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
        try{
            let oParamCheck = new ParamStrCheck(this.sClassToggle, 'this.sClassToggle').checkIntMinLength(3).checkIntMaxLength(30);
            if(oParamCheck.aErr.length > 0)throw new Error(oParamCheck.getStrErr());
        } catch(oErr){
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
