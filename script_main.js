
// TODO hide api key 
var CLIENT_ID = '183857612019-7hr46cble04h91pvglmgecfdpssckm41.apps.googleusercontent.com';
var API_KEY = 'AIzaSyD2Cb8n5HRPmm6TCrxKcyyvMuGpJBZ7Omw';
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

// On load, called to load the auth2 library and API client library.
function handleClientLoad() {
gapi.load('client:auth2', initClient);
}


// Initializes the API client library and sets up sign-in state listeners.
function initClient() {
gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
}).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
}, function(error) {
    console.error(error);
    // appendPre(JSON.stringify(error, null, 2));
});
}

// Called when the signed in status changes, to update the UI appropriately. After a sign-in, the API is called.
function updateSigninStatus(isSignedIn) {
    // formatEvents();
if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
    formatEvents();
    eventsToFloorplan();
    showNavi();
} else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
}
}

// Sign in the user upon button click.
function handleAuthClick(event) {
gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignoutClick(event) {
gapi.auth2.getAuthInstance().signOut();
}

// --------------------- internal navigation --------------------- //

function showNavi() {
  var content = document.querySelector(".nav-calendar")
  // content.innerHTML += '<a class="btn btn-full" href="events_raw.html">let\'s check the calendar!</a><br>'
  content.innerHTML += '<a class="btn btn-no-border btn-no-border-green" href="#schedule">schedule</a>'


}

// --------------------- DISPLAY CALENDARS --------------------- //

function listUpcomingEvents() {
// -------- PRIMARY / PERSONAL CALENDAR -------- //
gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 8,
    'orderBy': 'startTime'
}).then(function(response) {
    var events = response.result.items;
    if (events.length > 0) {
        var content = document.querySelector(".main-container-raw")
        content.innerHTML += '<h2> here are the events on your main calendar</h2>'
        for (i = 0; i < events.length; i++) {
            var event = events[i];
            var when = event.start.dateTime;
            if (!when) { when = event.start.date; }
            content.innerHTML += '<div class="events-raw">' + when + ' ---- ' + event.summary + '</div>'
        }
    } 
    else { 
        content.innerHTML += '<br><p>No upcoming events found.</p>' 
    }
});

// -------- CODE COMMUNITY CALENDAR -------- //
gapi.client.calendar.events.list({
    // 'calendarId': 'codebot@code.berlin',
    // 'calendarId': 'learning-platform-bot@code.berlin',
    'calendarId': 'code.berlin_crt6693rdcpdrrsjlg7gci4qok@group.calendar.google.com',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 8,
    'orderBy': 'startTime'
}).then(function(response) {
    var commEvents = response.result.items;
    if (commEvents.length > 0) {
        var communityContainer = document.querySelector(".community-container-raw")
        communityContainer.innerHTML += '<h2> the CODE Community calendar events </h2>'

        for (i = 0; i < commEvents.length; i++) {
            var commEvent = commEvents[i];
            communityContainer.innerHTML += '<div class="events-raw">' + commEvent.start.dateTime + ' ---- ' + commEvent.summary + '</div>'
        }
    }
},
        function(err) { console.error("Execute error", err); });

// -------- LIST OF OTHER CALENDARS -------- //
gapi.client.calendar.calendarList.list({
    "maxResults": 10
}).then(function(response) {
    var calendars = response.result.items;
    if (calendars.length > 0) {
        var calendarContainer = document.querySelector(".calendar-container-raw")
        calendarContainer.innerHTML += '<h2> and here are some of the other calendars... </h2>'

        for (i = 0; i < calendars.length; i++) {
            var calendar = calendars[i];
            calendarContainer.innerHTML += '<div class="events-raw">' + calendar.summary + '</div>'
        }
    }
},
        function(err) { console.error("Execute error", err); });

}

function eventsToFloorplan() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date("2020-06-15T10:00:00+02:00")).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 20,
        'orderBy': 'startTime'
    }).then(function(response) {
        var roomPaths = document.querySelector('.plan')
        var tempList = document.querySelector('.temp-list')
        const events = response.result.items;

        for(let k = 0; k < 20; k++) {
          let event = events[k];

          if (event.location) { var room = event.location; } 
          else { var room = 'remote' }

          if (room.includes("Rock")) { room = 'ROCK' }
          if (room.includes("Paper")) { room = 'PAPER' }
          if (room.includes("Scissors")) { room = 'SCISSORS' }
          if (room.includes("Spock")) { room = 'SPOCK' }
          if (room.includes("Roomy")) { room = 'ROOMY' }
          if (room.includes("kitchen")) {room = 'KITCHEN'}
          if (room.includes("Jungle")) { room = 'JUNGLE' }
          if (room.includes("Lab")) { room = 'LAB' }

          if (room.includes("X")) { room = 'X' }
          if (room.includes("Room Y")) { room = 'ROOM Y' }
          
          if (room.includes("Cinema")) { room = 'CINEMA' }
          if (room.includes("Wildenbruch")) { room = 'WILDENBRUCH' }

          if (room.includes("Lexis")) { room = 'LEXIS' }
          if (room.includes("Caf")) { room = 'CAFE' }
   
          if (room.includes("zoom")) { room = 'remote' }
  

          // if event is happening now, show it at rooms
          var fakeDate = (new Date("2020-06-15T15:15:00+02:00")).toISOString()

          if (event.start.dateTime < fakeDate && fakeDate < event.end.dateTime ) {
            console.log (event.summary, room)
            if (room.includes("PAPER")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="290" y="2070" width="660" height="280"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("ROCK")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="980" y="2070" width="660" height="280" font-size="30"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("SCISSORS")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="1820" y="2070" width="384" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("SPOCK")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="2490" y="2070" width="384" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("ROOMY")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event room_name-vertical" x="4440" y="1740" width="584" height="593"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("KITCHEN")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event room_name-light" x="4270" y="2070" width="384" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("JUNGLE")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="4950" y="2070" width="384" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("LAB")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="6930" y="1910" width="284" height="193"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("X")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="7330" y="1980" width="484" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            if (room.includes("ROOM Y")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="7790" y="1980" width="484" height="93"><p>'
              + event.summary + ' </p></foreignObject></switch>'}
            // if (room.includes("CINEMA")) {
            //   roomPaths.innerHTML += '<switch><foreignObject class="room_event" ><p>'
            //   + event.summary + ' </p></foreignObject></switch>'}
            // if (room.includes("WILDENBRUCH")) {
            //   roomPaths.innerHTML += '<switch><foreignObject class="room_event" ><p>'
            //   + event.summary + ' </p></foreignObject></switch>'}

          }
          else  {
            tempList.innerHTML += '<span>' + room + ' ----- ' +  event.start.dateTime + ' ----- ' + event.summary + '</span><br>'

            if (room.includes("PAPER")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="290" y="2070" width="660" height="280"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("ROCK")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="980" y="2070" width="660" height="280" font-size="30"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("SCISSORS")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="1820" y="2070" width="384" height="93"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("SPOCK")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="2490" y="2070" width="384" height="93"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("ROOMY")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event room_name-vertical" x="4440" y="1740" width="584" height="593"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("KITCHEN")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event room_name-light" x="4270" y="2070" width="384" height="93"><p>' +
              'FREE NOW </p></foreignObject></switch>'}
            // if (room.includes("JUNGLE")) {
            //   roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="4950" y="2070" width="384" height="93"><p>' + 
            //   'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("LAB")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="6930" y="1910" width="284" height="193"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("X")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="7330" y="1980" width="484" height="93"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
            if (room.includes("ROOM Y")) {
              roomPaths.innerHTML += '<switch><foreignObject class="room_event" x="7790" y="1980" width="484" height="93"><p>' + 
              'FREE NOW </p></foreignObject></switch>'}
          }
         

        } 
    })
}

function formatEvents() {
    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 8,
        'orderBy': 'startTime'
    }).then(function(response) {
        const events = response.result.items;
        var today = new Date();
        // var today = new Date("2020-02-01T08:00:00+02:00"); 
        var current_date = today.toISOString();

        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // for loop for rendering events one by one to the frontend
        for(let k = 0; k < 15; k++) {
            let event = events[k];
            var mainContainer = document.querySelector(".main-container")

            if (event.end.dateTime) {
                var eventName = event.summary
                var when = new Date(event.start.dateTime)
                var whenEnds = new Date(event.end.dateTime)
                var date = when.getDate()
                if (date<10){
                  date = "0" + date
                }
                var month = when.getMonth()
                for (var i=0; i <= 12; i++) {
                  if (month == i){
                    month = monthNames[i]
                  } 
                }
                var day = when.getDay()
                for (var i=0; i < 7; i++) {
                  if (day == i){
                    day = dayNames[i]
                  } 
                }
                var hour = when.getHours()
                if (hour<10){
                  hour = "0" + hour
                }
                var minutes = when.getMinutes()
                if (minutes<10){
                  minutes = "0" + minutes
                }
                
                var endHour = whenEnds.getHours()
                if (endHour<10){
                  endHour = "0" + endHour
                }
        
                var endMinutes = whenEnds.getMinutes()
                if (endMinutes<10){
                  endMinutes = "0" + endMinutes
                }

            }

            if (!when) {
                when = event.start.date;
              } // to show full day events
        
              if(event.location) {
                var room = event.location;
                var room_info ="";
              } 
        
              else {
                var room_info ="";
                var room=""
              }
        
              if (room.includes("Amy")) {
                room = 'AFF'
              }
              else if (room.includes("Rock")) {
                room = 'ROCK'
              }
        
              else if (room.includes("Cinema")) {
                room = 'CINEMA'
              }
        
              else if (room.includes("kitchen")) {
                room = 'KITCHEN'
              }
        
              else if (room.includes("Caf")) {
                room = 'CAFE'
              }
        
              else if (room.includes("Lexis")) {
                room = 'LEXIS'
              }
              else if (room.includes("Jungle")) {
                room = 'JUNGLE'
              }
              else if (room.includes("New School Kitchen")) {
                room = 'NSKitchen'
              }
              else if (room.includes("Brunnen")) {
                room = 'Mein Haus am See'
              }
        
              else {
                room = 'location'
                room_info = 'room/'
              }
        
              var event_name = event.summary;
              
              var event_type = "";
        
              if (event_name.includes("[OS LU]")) {
                event_name = event_name.replace("[OS LU] " , "");
                event_type = "LEARNING UNIT"
              } 
              else if (event_name.includes("[OS Info Session]")) {
                event_name = event_name.replace("[OS Info Session]" , "");
                event_type = "INFO SESSION"
              } 
              else {
                event_type ="category and tags"
              }
              // ['a', 'b', 'c'].includes('b')
        
          
              let date_and_day = '<div class="grid-element date">' + date + " " + month + ", " + day + '</div>'
              let time = '<div class="grid-element time">' + hour + ":" + minutes + " - " + endHour + ":" + endMinutes + '</div>'
              let type = '<div class="grid-element type">' + event_type + '</div>'
              let title = '<div class="grid-element title">' + event_name + '</div>'
              let location = '<div class="grid-element location">' + room + '</div>'
              let status = '<div class="grid-element status"> status comes here </div>'
        
              let eventAll = '<div class="grid-container-browser grid--areas">' + date_and_day + time + type + title + location + status + '</div>'
              mainContainer.innerHTML += eventAll

              


        }
    })
    .catch(error => console.error(error));
};
    


