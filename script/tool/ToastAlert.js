class ToastAlert
{
    static INFO = 'info';
    static SUCCESS = 'success';
    static WARNING = 'warning';
    static DANGER = 'danger';
    static CLASS_CTN_TOAST_ALERT = 'ctnToaster';
    static CLASS_BOX_TOAST_ALERT = 'boxCtnToast';
    static TIME_TOAST_DISP = 2500;

    constructor(sType, sMess)
    {
        this.sClassTypeToast = '';
        this.oBoxCtnToaster = new DomElementById(ToastAlert.CLASS_BOX_TOAST_ALERT);
        this.setMessage(sMess);
        this.switchTypeAlert(sType);
        this.oBoxCtnToaster.setContent(this.getHtmlToaster());
        setTimeout(this.toastDisappear, ToastAlert.TIME_TOAST_DISP);
    }

    emptyBoxCtnToast()
    {
        /*document.querySelectorAll(ToastAlert.CLASS_CTN_TOASTER).forEach(function(el){
            el.remove();
        })*/
    }

    setMessage(sMess)
    {
        try{ new ParamStrCheck(sMess, 'sMess').checkMinLen(3).checkMaxLen(500);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.sMess = sMess;
        return this;
    }

    getMessage()
    {
        try{ new ParamStrCheck(this.sMess, 'this.sMess').checkMinLen(3).checkMaxLen(500);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.sMess;
    }

    setHtmlIcon(sHtml)
    {
        try{ new ParamStrCheck(sHtml, 'sHtml').checkMinLen(3).checkMaxLen(500);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.sHtmlIcon = sHtml
        return this;
    }

    getHtmlIcon()
    {
        try{new ParamStrCheck(this.sHtmlIcon, 'this.sHtmlIcon').checkMinLen(3).checkMaxLen(500);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.sHtmlIcon;
    }

    getClassTypeToast()
    {
        try{new ParamStrCheck(this.sClassTypeToast, 'this.sClassTypeToast').checkMinLen(3).checkMaxLen(20);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        return this.sClassTypeToast;
    }

    setClassTypeToast(sClassTypeToast)
    {
        try{new ParamStrCheck(sClassTypeToast, 'sClassTypeToast').checkMinLen(3).checkMaxLen(20);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }
        this.sClassTypeToast = sClassTypeToast
        return this;
    }

    switchTypeAlert(sType)
    {
        try{new ParamStrCheck(sType, 'sType').checkMinLen(3).checkMaxLen(20);}
        catch(oErr){
            alert(oErr.message);
            console.log(oErr.message);
            console.trace();
            return false;
        }

        let sHtmlICo = '';
        let sClassToast = '';
        switch(sType)
        {
            case ToastAlert.INFO:
                sHtmlICo = '<i class="fa-solid fa-circle-info"></i>';
                sClassToast = 'infoToast';
                break;
            case ToastAlert.SUCCESS:
                sHtmlICo = '<i class="fa-solid fa-circle-check"></i>';
                sClassToast = 'successToast';
                break;
            case ToastAlert.WARNING:
                sHtmlICo = '<i class="fa-solid fa-triangle-exclamation"></i>';
                sClassToast = 'warningToast';
                break
            case ToastAlert.DANGER:
                sHtmlICo = '<i class="fa-solid fa-skull-crossbones"></i>';
                sClassToast = 'dangerToast'
                break;
            default:
                sHtmlICo = '<i class="fa-regular fa-face-meh"></i>';
                sClassToast = '';
        }
        this.setHtmlIcon(sHtmlICo);
        this.setClassTypeToast(sClassToast);
    }

    getHtmlToaster()
    {
        let el = document.createElement('div');
        el.classList.add(this.getClassTypeToast(), ToastAlert.CLASS_CTN_TOAST_ALERT);
        el.innerHTML = this.getHtmlIcon() + '<span>' + this.getMessage() + '</span>';
        return el.outerHTML;
    }

    toastDisappear()
    {
        let el = document.getElementsByClassName(ToastAlert.CLASS_CTN_TOAST_ALERT);
        if(el.length > 0)
        {
            let iLastItem = el.item.length - 1;
            el.item(iLastItem).remove();
        }
    }

}