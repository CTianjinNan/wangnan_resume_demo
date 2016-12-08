/**
 * Created by Administrator on 2016/11/17.
 */
// Helper function to add an event listener
function addEvent (el, event, callback) {
    if('addEventListener' in el){
        el.addEventListener(event, callback, false);
    }else{
        el['e' + event + callback] = callback;
        el[event + callback] = function () {
            el['e' + event + callback](window.event);
        };
        el.attachEvent('on'+ event, el[event + callback]);
    }
}
// Helper function to remove an event listener
function removeEvent(el, event, callback){
    if('removeEventListener' in el){
        el.removeEventListener(event, callback, false);
    }else{
        el.detachEvent('on'+event, el[event + back]);
        el[el + event] = null;
        el['e'+ event + callback] = null;
    }
}

(function() {
    if ('placeholder' in document.createElement('input')){
        return;
    }

    var length = document.forms.length;
    for(var i=0; i<length; i++){
        showPlaceholder(document.forms[i].elements);
    }

    function showPlaceholder(elements){
        for(var i = 0,l=elements.length; i < l; i++){
            var el = elements[i];

            if(!el.placeholder){
                continue;
            }

            el.style.color = '#666666';
            el.value = el.placeholder;

            addEvent(el, 'focus', function () {
                if (this.value === this.placeholder){
                    this.value = '';
                    this.style.color = '#000000';
                }
            });

            addEvent(el, 'blur', function () {
                if(this.value = ''){
                    this.value = this.placeholder;
                    this.style.css = '#666666';
                }
            });
        }
    }

}());

(function(){
    var password = document.getElementById('password');
    var passwordConfirm = document.getElementById('conf-password');

    function setErrorHighlighter(e) {
        var target = e.target || e.srcElement;
        if(target.value.length < 8 ){
            target.className = 'fail';
        }
        else{
            target.className = 'pass';
        }
    }

    function removeErrorHighlighter(e) {
        var target = e.target || e.srcElement;
        if(target.className === 'fail'){
            target.className = '';
        }
    }

    function passwordMatch(e){
        var target = e.target || e.srcElement;
        if(password.value === target.value){
            target.className = 'pass';
        }else{
            target.className = 'fail';
        }
    }

    addEvent(password, 'focus', removeErrorHighlighter);
    addEvent(password, 'blur', setErrorHighlighter);
    addEvent(passwordConfirm, 'focus', removeErrorHighlighter);
    addEvent(passwordConfirm, 'blur', passwordMatch);
}());

(function(){
    var $birth = $('#birthday');                         // D-O-B input
    var $young = $('#young');         // Consent checkbox
    var $youngContainer = $('#youngContainer');     // Checkbox container

    // Create the date picker using jQuery UI
    $birth.prop('type', 'text').data('type', 'date').datepicker({
        dateFormat: 'yy-mm-dd'
    });

    $birth.on('blur change', checkDate);                 // D-O-B loses focus

    function checkDate() {                               // Declare checkDate()
        var dob = this.value.split('-');                   // Array from date
        // Pass toggleParentsConsent() the date of birth as a date object
        toggleParentsConsent(new Date(dob[0], dob[1] - 1, dob[2]));
    }

    function toggleParentsConsent(date) {                 // Declare function
        if (isNaN(date)) return;                            // Stop if date invalid
        var now = new Date();                               // New date obj: today
        // If diff less than 13 years (ms * seconds * mins * hours * days * years)
        // does not account for leap years!
        // if the user is less than 13 we show parents consent tickbox
        if ((now - date) < (1000 * 60 * 60 * 24 * 365 * 13)) {
            $youngContainer.removeClass('hide');            // Remove hide class
            $young.focus();                          // Give it focus
        } else {                                            // Otherwise
            $youngContainer.addClass('hide');               // Add hide to class
            $young.prop('checked', false);           // Set checked to false
        }
    }
}());

(function () {
    var bio = $('#bio');
    var bioCounter = $('#bio-count');

    // show the counter when the field is focused and update the class
    // depending on amount of characters left
    bio.on('focus', updateCounter);
    bio.on('keyup', updateCounter);

    // when we leave the textarea, we hide the counter unless there are too
    // many characters
    bio.on('blur', function () {
        if (bioCounter.text() >= 0) {
            bioCounter.addClass('hide');
        }
    });


    function updateCounter(e) {
        var count = 140 - bio.val().length;
        var status = '';
        if (count < 0) {
            status = 'error';
        } else if (count <= 15) {
            status = 'warn';
        } else {
            status = 'good';
        }

        // remove previous classes
        bioCounter.removeClass('error warn good hide');
        // add new class
        bioCounter.addClass(status);
        bioCounter.text(count);
    }

}());

