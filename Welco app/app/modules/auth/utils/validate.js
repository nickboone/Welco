export function isEmpty(str) {
    return (!str || 0 === str.length);
}

export function validateEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (filter.test(email)) return true;

    return false;
}

export function validatePassword(password) {
    if (password.length > 6) return true;

    return false;
}

export function confirmPassword(c_password, password) {
    if (c_password === password) return true;

    return false;
}

export function validate(form) {
    let error = {};
    let success = true;

    var keys = Object.keys(form);
    var length = keys.length;

    keys.slice(0, length).map(field => {
        if (field !== "error"){
            var { type, value, key } = form[field];
            if (isEmpty(value) && key =="username"){
                error[field] = 'Het ' + field + ' veld is verplicht';
                success = false;
            }else{
                error[field] = '';

                if (type === "email" && !validateEmail(value)) {
                    error[field] = 'Voer een geldig emailadres in';
                    success = false;
                }else if (type === "password" && !validatePassword(value)) {
                    error[field] = 'Het paswoord moet minstens 6 karakters hebben';
                    success = false;
                }else if (type === "confirm_password" && !confirmPassword(value, form["password"]['value'])) {
                    error[field] = 'Paswoorden zijn niet gelijk';
                    success = false;
                }
            }
        }
    });

    return {success, error};
}
