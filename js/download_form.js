// Disable the download button until the user enters an email address.
document.querySelector('button[type="submit"]').disabled = true;
document.querySelector('input[type="email"]').addEventListener('input', function() {
    document.querySelector('button[type="submit"]').disabled = !this.value;
});

function submitForm (event) {
    // Prevent form submition
    event.preventDefault();

    // Get Parameters
    var customerEmail = document.querySelector('input[type="email"]').value;

    var queryString  = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var docName = urlParams.get('d');

    if (docName !== null) {
        var docUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/' + docName;

        // Send Request EMAIL
        axios.post('https://api.emailjs.com/api/v1.0/email/send',{
            "user_id":"7YgymW2R-zMevNyTG",
            "service_id":"service_akowfcc",
            "template_id":"template_1jjhpoo",
            "template_params":{
                "customer_email": customerEmail,
                "customer_name":"Customer",
                "doc_url": docUrl,
                "doc_name": docName
            }
        })
            .then(function(res) {
                document.querySelector('input[type="email"]').value = '';
                history.back();
            });

    }
}
