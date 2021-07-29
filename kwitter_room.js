user_name = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome " + user_name;

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

    function addRoom(){
          room_name = document.getElementById("room_key").value;
          firebase.database().ref("/").child(room_name).update({
                purpose:"adding room name"
          });
          localStorage.setItem("room_name",room_name);
          window.location = "kwitter_page.html";
    }

  

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("Room_name - " + Room_names);

      row = "<div class='room_name' id="+ Room_names +" onclick='redirectToRoomName(this.id)'>#"+ Room_names +"</div><hr>";
      document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location.replace("index.html");
}
