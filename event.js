// Your private token
const token = 'IYN3HV2M7CWAYX2J3HX6';  // Replace with your actual private token

// Event ID
const eventId = '1037078207837';

// URL to fetch the event data
const url = `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes,venue`;

// Fetch event data from the Eventbrite API
fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
  .then(response => response.json())
  .then(data => {
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
  })
  .catch(error => {
    console.error('Error fetching event:', error);
    document.getElementById('event-title').textContent = 'Error loading event details.';
  });
