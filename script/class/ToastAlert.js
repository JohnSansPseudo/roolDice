class ToastAlert
{
    static INFO = 'info';
    static SUCCESS = 'success';
    static WARNING = 'warning';
    static DANGER = 'danger';
    static CLASS_CTN_TOASTER = 'ctnToaster';

    constructor(type, message)
    {
        document.querySelectorAll(ToastAlert.CLASS_CTN_TOASTER).forEach(function(el){
            el.remove();
        })

        this.message = message;
        this.sIcon = '<i class="fa-regular fa-face-meh"></i>';
        this.sClass = 'errorToast';

        switch(type)
        {
            case ToastAlert.INFO:
                this.sIcon = '<i class="fa-solid fa-circle-info"></i>';
                this.sClass = 'infoToast';
                break;
            case ToastAlert.SUCCESS:
                this.sIcon = '<i class="fa-solid fa-circle-check"></i>';
                this.sClass = 'successToast';
                break;
            case ToastAlert.WARNING:
                this.sIcon = '<i class="fa-solid fa-triangle-exclamation"></i>',
                    this.sClass = 'warningToast';
                break
            case ToastAlert.DANGER:
                this.sIcon = '<i class="fa-solid fa-skull-crossbones"></i>';
                this.sClass = 'dangerToast'
                break;
            default:
                alert('Error switch class ToastAlert');
        }

        document.getElementById('boxCtnToast').prepend(this.getHtmlToaster());
        setTimeout(this.toastDisappear, 2500);
    }

    getHtmlToaster()
    {
        let el = document.createElement('div');
        el.classList.add(this.sClass, ToastAlert.CLASS_CTN_TOASTER);
        el.innerHTML = this.sIcon + '<span>' + this.message + '</span>';
        return el;
    }

    toastDisappear() {
        let el = document.getElementsByClassName(ToastAlert.CLASS_CTN_TOASTER);
        if(el.length > 0) el.item(0).remove();
    }

    //DESTRUCTION DE L'OBJET ??
}