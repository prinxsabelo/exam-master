
setCookie("CSDeviceName", 'DigitalPersona', 7);
setCookie("CABEngineName", 'FPFF02', 7);
setCookie("CSTempalteFormat", 'ISO', 7);

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function failCall(status) {
    document.getElementById('lblMessage').innerHTML = status;
}