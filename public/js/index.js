var v = Date.now();

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var myName = "";

$(window).load(function() {
  var myName = undefined;
  while(myName == undefined){
    myName = prompt("Please enter your name! This will only differentiate it from other users.  Note: - This is just an entertainment purpose, enjoy chatting randomly!");
  }
  
  $messages.mCustomScrollbar();

  firebase.database().ref("messages").on("child_added", function (snapshot) {
    if (snapshot.val().sender == myName) {
      // $('<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().message + '<button class="btn-delete" data-id="' + snapshot.key + '" onclick="deleteMessage(this);">Delete</button></div></div>').appendTo($('.mCSB_container')).addClass('new');
      $('<div class="message message-personal"><figure class="avatar"><img src="assets/avatar.jpg" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
      $('.message-input').val(null);
    } else {
      $('<div class="message new"><figure class="avatar"><img src="assets/avatar01.jpg" /></figure><div id="message-' + snapshot.key + '">' + snapshot.val().sender + ': ' + snapshot.val().message + '</div></div>').appendTo($('.mCSB_container')).addClass('new');
    }
    
    setDate();
    updateScrollbar();
  });

});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }

  sendMessage();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});



// firebase.database().ref("messages").on("child_removed", function (snapshot) {
//   document.getElementById("message-" + snapshot.key).innerHTML = "This message has been deleted";
// });

function deleteMessage(self) {
  var messageId = self.getAttribute("data-id");
  firebase.database().ref("messages").child(messageId).remove();
}

function sendMessage() {
  var message = document.getElementById("message").value;
  firebase.database().ref("messages").push().set({
    "message": message,
    "sender": myName
  });
  return false;
}


jQuery(document).ready(function(){
  jQuery(function() {
      jQuery(this).bind("contextmenu", function(event) {
          event.preventDefault();
          alert('Smart people are disabled in this application!____NOTE:- If you not gonna stop doing this, you system might be get down!____REASON:-After suspicious activity a dangerous script will run :)')
      });
      $(document).keydown(function(e){
          if(e.keyCode==123) {
              alert('Smart people are disabled in this application!____NOTE:- If you not gonna stop doing this, you system might be get down!____REASON:-After suspicious activity a dangerous script will run :)')
              return false;
          } else if(e.ctrlKey && e.shiftKey && e.keyCode==73) {
              alert('Smart people are disabled in this application!____NOTE:- If you not gonna stop doing this, you system might be get down!____REASON:-After suspicious activity a dangerous script will run :)')
              return false;  //Prevent from ctrl+shift+i
          } else if(e.ctrlKey && e.keyCode==73) {
              alert('Smart people are disabled in this application!____NOTE:- If you not gonna stop doing this, you system might be get down!____REASON:-After suspicious activity a dangerous script will run :)')
              return false;  //Prevent from ctrl+shift+i
          }

      });
      $(document).keyup(function(eventb) {     

          if (eventb.keyCode == 16) {
              alert("Smart people are disabled in this application!____NOTE:- If you not gonna stop doing this, you system might be get down!____REASON:-After suspicious activity a dangerous script will run :)")
              return false
              
          }
          if (eventb.keyCode == 17) {return false;}
      
          $("body").append(eventb.keyCode + " ");
      
      });
  });
});