export function mobileValidation (mobile, issubmit)  {
    if (issubmit == true) {
        if (mobile=='') {
            return 'Please enter mobile number'
        } else if (!mobile.match(/^[0-9]{10,10}$/)) {
            return 'Please enter valid mobile number'
        } else {
           return 'ok'
        }
    }
}

export const RequiredValidation =(text,issubmit)=>{

    if(issubmit==true)
    {
        if(text=='')
        {
            return true; 
        }
    }
    return false; 
}