var config = {
    apiKey: "AIzaSyDZFJ-Cj9FfeHZAqxVlsNRFWGSnlkzXEg4",
    authDomain: "rps-online-6a959.firebaseapp.com",
    databaseURL: "https://rps-online-6a959.firebaseio.com",
    projectId: "rps-online-6a959",
    storageBucket: "",
    messagingSenderId: "447726848085"
};
firebase.initializeApp(config);
var player1;
var player2;
var database=firebase.database();
var playersRef = database.ref("/players");
var player1Identification;
var player2Identification;

$(document).ready(function(){
    loadEmptyPlayer1();
    loadEmptyPlayer2();
    $('#nameChosen').on("click", function() {
        if(!player1||!player2){
            if(!player1&&!player2Identification){
                player1Identification=true;
                player1 = {
                    name: $('#playerName').val(),
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: '',
                    connectionStatus: $('#playerName').val()+' is connected'
                };
                database.ref().child("/players/player1").set(player1);
                database.ref("/players/player1").onDisconnect().remove();
                $('#playerName').val('');
            }else if(!player2&&!player1Identification){
                player2Identification=true;
                player2 = {
                    name: $('#playerName').val(),
                    win: 0,
                    loss: 0,
                    tie: 0,
                    choice: '',
                    connectionStatus: $('#playerName').val()+' is connected'
                };
                database.ref().child("/players/player2").set(player2);
                database.ref("/players/player2").onDisconnect().remove();
                $('#playerName').val('');
            }
        }
    })
    $('#player1ChoiceRock').on('click',function(){
        if(player1Identification&&!player1.choice){
            player1.choice='rock';
            database.ref().child("/players/player1").set(player1);
        }
    })  
    $('#player1ChoicePaper').on('click',function(){
        if(player1Identification&&!player1.choice){
            player1.choice='paper';
            database.ref().child("/players/player1").set(player1);
        }
    })
    $('#player1ChoiceScissors').on('click',function(){
        if(player1Identification&&!player1.choice){
            player1.choice='scissors';
            database.ref().child("/players/player1").set(player1);
        }
    })
    $('#player2ChoiceRock').on('click',function(){
        if(player2Identification&&!player2.choice){
            player2.choice='rock';
            database.ref().child("/players/player2").set(player2);
        }
    })  
    $('#player2ChoicePaper').on('click',function(){
        if(player2Identification&&!player2.choice){
            player2.choice='paper';
            database.ref().child("/players/player2").set(player2);
        }
    })
    $('#player2ChoiceScissors').on('click',function(){
        if(player2Identification&&!player2.choice){
            player2.choice='scissors';
            database.ref().child("/players/player2").set(player2);
        }
    })
    $('#sendMessage').on('click',function(){
        event.preventDefault();
        if(player1Identification){
            database.ref('/chat').push(player1.name+' : '+$('#chatInput').val())
        }else if(player2Identification){
            database.ref('/chat').push(player2.name+' : '+$('#chatInput').val())
        }
        $('#chatInput').val('')
    })
});
function loadEmptyPlayer1(){
    $('#player1Name').text('Waiting on player1');
    $('#player1Wins').text('');
    $('#player1Losses').text('');
    $('#player1Tie').text('');
    $('#player1ConnectionStatus').text(``);
    player1Identification=false;
};
function loadEmptyPlayer2(){
    $('#player2Name').text('Waiting on player2');
    $('#player2Wins').text('');
    $('#player2Losses').text('');
    $('#player2Tie').text('');
    $('#player2ConnectionStatus').text(``);
    player2Identification=false;
}


// var playersRef = database.ref("/players");
// var connectedRef = database.ref(".info/connected");
// connectedRef.on("value", function(snap) {
//     if (snap.val()) {
//         console.log(playersRef.child('/player1'))
//       if(!playersRef.child('/player1')){
//         var con = playersRef.child('/player1').set(player1);
//       }else if(!playersRef.child('/player2')){
//         var con = playersRef.child('/player2').set(player2);
//       }
//     }
    
//   });

database.ref("/players/").on("value", function(snapshot) {
    if (snapshot.child("player1").exists()) {
        player1 = snapshot.val().player1;
        $("#player1Name").text(player1.name);
        $('#player1Wins').text(player1.win);
        $('#player1Losses').text(player1.loss);
        $('#player1Tie').text(player1.tie);
        $('#player1ConnectionStatus').text(player1.connectionStatus);
        if(snapshot.val().player1.choice){
            $('#player1Choice').text(player1.name+' has made his choice!')
        }else{$('#player1Choice').text('')}
    }else{
        player1=null;
        loadEmptyPlayer1();
        $('#player1Choice').text('')
    };
    if (snapshot.child("player2").exists()) {
        player2 = snapshot.val().player2;
        $("#player2Name").text(player2.name);
        $('#player2Wins').text(player2.win);
        $('#player2Losses').text(player2.loss);
        $('#player2Tie').text(player2.tie);
        $('#player2ConnectionStatus').text(player2.connectionStatus);
        if(snapshot.val().player2.choice){
            $('#player2Choice').text(player2.name+' has made his choice!')
        }else{$('#player2Choice').text('')}
    }else{
        player2=null;
        loadEmptyPlayer2();
        $('#player2Choice').text('')
    }
    if (player1 && player2) {
		$('#bothPlayersStatus').text('Both players are connected!!! Time to choose your destiny!!!!:)(ROCK PAPER SCISSORS!!!!)')
    }else{$('#bothPlayersStatus').text('')}
    if (snapshot.child("player1").exists()&&snapshot.child("player2").exists()) {
        if(snapshot.val().player1.choice&&snapshot.val().player2.choice){playRound()}
    }
    if (!player1 && !player2) {
		database.ref("/chat/").remove();
    }
})
function playRound(){
    if (player1.choice == player2.choice) {
            $('#result').text('Last round: It`s a tie!!!');
            player1.tie+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.tie+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2); 
        } else if (player1.choice == "rock"&&player2.choice == "scissors") {
            $('#result').text('Last round: '+player1.name+' wins!!!');
            player1.win+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.loss+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        } else if (player1.choice == "rock"&&player2.choice == "paper") {
            $('#result').text('Last round: '+player2.name+' wins!!!');
            player1.loss+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.win+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        } else if (player1.choice == "paper"&&player2.choice == "scissors") {
            $('#result').text('Last round: '+player2.name+' wins!!!');
            player1.loss+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.win+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        } else if (player1.choice == "paper"&&player2.choice == "rock") {
            $('#result').text('Last round: '+player1.name+' wins!!!');
            player1.win+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.loss+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        } else if (player1.choice == "scissors"&&player2.choice == "rock") {
            $('#result').text('Last round: '+player2.name+' wins!!!');
            player1.loss+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.win+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        } else if (player1.choice == "scissors"&&player2.choice == "paper") {
            $('#result').text('Last round: '+player1.name+' wins!!!');
            player1.win+=1;
            player1.choice='';
            database.ref().child("/players/player1").set(player1);
            player2.loss+=1;
            player2.choice='';
            console.log(player1,player2)
            database.ref().child("/players/player2").set(player2);
        }
}
 database.ref("/chat/").on("child_added", function(snapshot) {
     var message=$('<div>').text(snapshot.val());
     message.attr('class','messageClass');
    $('#chatDisplay').prepend(message);
 })
