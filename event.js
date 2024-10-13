// Your private token
const token = 'IYN3HV2M7CWAYX2J3HX6';  // Replace with your actual private token

// List of Seattle venue IDs
const eventIds = ['1037843837857', '882323532437', '874787592237', '943237226937','999721222087']; // Replace with actual Seattle venue IDs

// Function to get a random venue ID
function getRandomEventId() {
  return eventIds[Math.floor(Math.random() * eventIds.length)];
}

// Fetch event data for a random venue in Seattle
function fetchEvent() {
    const eventId = getRandomEventId();
    const url = `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes,venue`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data) {
            // Pick a random event from the list of events
            // Replace the event image
            if (data.logo && data.logo.url) {
                document.getElementById('event-image').src = data.logo.url;
            }

            // Replace the event title
            if (data.name && data.name.text) {
                document.getElementById('event-title').textContent = data.name.text;
            }

            // Replace the event date and venue (if available)
            if (data.start && data.start.local && data.venue && data.venue.name) {
                const eventDate = new Date(data.start.local).toLocaleString();
                const venue = data.venue.name;
                document.getElementById('event-date').textContent = `${eventDate}, ${venue}`;
            }

            // Replace the event description
            if (data.description && data.description.text) {
                document.getElementById('event-description').textContent = data.description.text;
            }
        } else {
            document.getElementById('event-title').textContent = 'No events found for this venue.';
        }
    })
    .catch(error => {
        console.error('Error fetching event:', error);
        document.getElementById('event-title').textContent = 'Error loading event details.';
    });
}

// Call the function to fetch a random event\

fetchEvent()