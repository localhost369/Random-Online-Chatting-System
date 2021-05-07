var v = Date.now();

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

var myName = "";

$(window).load(function() {
  while(myName == ""){
    myName = prompt("Enter your name! This will just seperate form outher user");
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


// web app Firebase configuration
var custom = {
  apiKey: "AIzaSyD7Wa4tK_p44FPAUSbUlAZDrV7D0caZ0Ew",
  authDomain: "fir-chat-app-boilerplate.firebaseapp.com",
  databaseURL: "https://fir-chat-app-boilerplate-default-rtdb.firebaseio.com",
  projectId: "fir-chat-app-boilerplate",
  storageBucket: "fir-chat-app-boilerplate.appspot.com",
  messagingSenderId: "297591293023",
  appId: "1:297591293023:web:63c02c837b488d8b9c07ea"
};
// Initialize Firebase
firebase.initializeApp(custom);

firebase.database().ref("messages").on("child_removed", function (snapshot) {
  document.getElementById("message-" + snapshot.key).innerHTML = "This message has been deleted";
});

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