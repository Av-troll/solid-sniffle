var firebaseConfig = {
      apiKey: "AIzaSyDHMulDb38ctDeHHEDoeX1xx2YUkLt43Y0",
      authDomain: "kwitter-46d5a.firebaseapp.com",
      databaseURL: "https://kwitter-46d5a-default-rtdb.firebaseio.com",
      projectId: "kwitter-46d5a",
      storageBucket: "kwitter-46d5a.appspot.com",
      messagingSenderId: "881713368976",
      appId: "1:881713368976:web:0652d8a6a327489904ad15"
    };
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
            console.log(firebase_message_id);
            console.log(message_data)
            user_names = message_data['name'];
            messages = message_data['message'];
            likes = message_data['like'];
            name_tag = "<h4>" + user_names + "<img class = 'user_tick' src = 'tick.png' ></h4>" ;
            message_tag = "<h4 class = 'message_h4' >" + messages + "</h4>";
            button_like = "<button class = 'btn btn-warning' id = " + firebase_message_id + "value = " + likes + "onclick = 'update_like(this.id)'>";
            span_button = "<span class = 'glyphicon glyphicon-thumbs-up'>Like; " + likes + "</span></button><hr>";
            rows = name_tag + message_tag + button_like + span_button;
            document.getElementById("output").innerHTML += rows;
      } });  }); }

getData();

function update_like(message_id){
      button_id = message_id;
      likess = document.getElementById(button_id).value;
      updated_likes = Number(likess) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like:updated_likes
      });
}

function send(){
      var msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
           message: msg,
           like: 0

      });
      document.getElementById("msg").innerHTML = " ";
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace("index.html");
}
