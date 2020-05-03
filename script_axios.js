//axios GET
console.log('whats goood')

// will only work when my code calendar is set to public! 
const fetchCalendar = () => {
  axios.get('https://www.googleapis.com/calendar/v3/calendars/kinga.janossy@code.berlin/events?key=AIzaSyBukHk_dPkq5FZB4nvTzRKxZ67QL2pP9e4')
    .then(response => {
      const events = response.data.items;
    //   console.log(`GET events`, events)

    //   const eventName = events[0].summary;
      var today = new Date();
      var current_date = today.toISOString();

      console.log(today)
      console.log(current_date)
      console.log("events in this calendar: " + events.length)

      var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      function comparison(a, b) {
        const aa = a.start.dateTime;
        const bb = b.start.dateTime;
        let compare = 0;
        if (aa > bb) {
          compare = 1;
        } else if (aa < bb) {
          compare = -1;
        }
        return compare;
      }
      
      // empty list to store future events only
      let filteredEvents = [];

      // main loop for processing all events
      if (events.length > 0) {
          for (i = 0; i < events.length; i++) {
            var event = events[i];

            // filter current and future events
            if(event.start){
              if (event.start.dateTime > current_date) {
                filteredEvents.push(event) ;
                // console.log(filteredEvents)
            }}
          }

          // sort all future events, compare start.dateTime
          filteredEvents.sort(comparison)

          // for loop for rendering events one by one to the frontend
          for(let k = 0; k < 15; k++) {
            let event = filteredEvents[k];
            if (event.end.dateTime) {
                var eventName = event.summary

            }


            var mainContainer = document.querySelector(".main-container")
          mainContainer.innerHTML += '<li>' +  eventName + '</li>'

          }

          

    }


      

    // all the work comes above this line
    })
    .catch(error => console.error(error));
};

fetchCalendar();