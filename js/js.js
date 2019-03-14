// Shake on error in login paramaeters

$('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e){
  $('form').delay(200).removeClass('error-shake');
});

var logged_in = false;
//
// Handle Modal Login
$(window).load(function(){        
    if (!logged_in) {
        $('#login-modal').modal('show');
        logged_in = true;
    }
    }); 

$('#modal-btn-login').click(function() {
    email = $('#login_username').val();
    password = $('#login_password').val();
    if(email === 'test' || email === ''){
        console.log('SUCCESS!');
        logged_in = true;
        $('#login-modal').modal('hide');
        $('#login-link').text('Logout');
    } else {
        $('form').addClass('error-shake');
        $('#login_username').val(null);
        $('#login_password').val(null);
        logged_in = false;
        $('#login-link').setText(Logout);
        return;
    }
});

var sect3_header = 'Section 3: Environmental Policy';
var sect2_header = 'Section 2: Quality Assurance';
var completed = 'Questionnaire Complete';

function set_section_header(section) {
    if (section == 'sect3') {
        _section = sect3_header;
    }
    else if (section == 'sectdone') {
        _section = completed;
    }
    $( "div#sectheader>h3" ).text(_section);
}

$(document).on('click', '.browse', function(){
  var file = $(this).parent().parent().parent().find('.file');
  file.trigger('click');
});

$(document).on('change', 'input:radio', get_radio_state)

// returns true or false depending on whether 'yes' or 'no' radio is checked respectively
function get_radio_state() {
    var radio_state = 0;
    if($('input:radio:checked').val() == "No") {
        $('.form-control.input-lg').prop("disabled", true);
        $('.browse').prop("disabled", true);
    }
    else if($('input:radio:checked').val() == "Yes") {
        $('.form-control.input-lg').prop("disabled", false); 
        $('.browse').prop("disabled", false);
        radio_state = 1;
    }
    else {
        radio_state = 2;
    }
    return radio_state;
}

var next_page = 0;
var in_question_mode = false;
var current_page = 0;

$( ".btn-cont" ).click(function rt() {

    // check if we've started the question section and set id accordingly
    if (in_question_mode == true){
        id_to_grab = '#qu-'.concat(current_page.toString());
    } else {
        id_to_grab = "#qu-21";
        in_question_mode = true;
    }

    var current_page_id = parseInt(($(id_to_grab).attr("class")));
    current_page = current_page_id;

    var radiostate = get_radio_state();
    var ERROR = 2;
    console.log(radiostate);
    if (current_page_id != 28) {
    
        if(radiostate == ERROR) {
            alert("You must choose yes or no");
            return;
        }
    }
    // Answering yes in these special cases means you jump the entire section
    if (current_page_id == 21 || current_page_id == 31){
        if (radiostate == 1) {
            next_page = current_page + 10;
            if (current_page_id == 31) {
                set_section_header('sectdone');
            } else {

                set_section_header('sect3');
            }
        }
        else {
            console.log("current page:",current_page);
            console.log("next page:", next_page);
            next_page = current_page + 1;
        }
    } 
    
    else if (current_page_id == 28) {
            set_section_header('sect3');
            next_page = 31;
    }
    
    else if (current_page_id == 36) {
            set_section_header('sectdone');
            next_page = 40;
    }

    else {
            next_page = current_page + 1;
    }

    console.log("next page is going to be: ", next_page);

    target_page_id = '#qu-'.concat(next_page.toString());
    id_to_hide = '#qu-'.concat(current_page.toString());
    
    $(target_page_id).removeClass("hidden");
    $(id_to_hide).addClass("hidden");

    current_page = next_page;

    // Make sure the radio buttons are reset for each section load
    $('input[name=radio]').attr('checked',false);
});

$( ".btn-secondary" ).click(function rt() {
    the_id = $(this).parent().attr("id");
    console.log(the_id);
});

