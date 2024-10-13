const token = 'IYN3HV2M7CWAYX2J3HX6';  // Replace with your private token

const eventID = '1037078207837'
const url = `https://www.eventbriteapi.com/v3/events/${eventId}/?expand=ticket_classes,venue`;

fetch(url, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})

.then(response => response.json())
.then(data => {
  // Get the event details container
  const eventDetails = document.getElementById('event-details');

  // Create a div element for the event details
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');

  // Add event name
  const eventName = document.createElement('h2');
  eventName.textContent = data.name.text;
  eventDiv.appendChild(eventName);

  // Add event description
  if (data.description && data.description.text) {
    const eventDescription = document.createElement('p');
    eventDescription.textContent = data.description.text;
    eventDiv.appendChild(eventDescription);
  }

  // Add event start date
  if (data.start && data.start.local) {
    const eventStart = document.createElement('p');
    eventStart.textContent = `Starts: ${new Date(data.start.local).toLocaleString()}`;
    eventDiv.appendChild(eventStart);
  }

  // Add event venue information if available
  if (data.venue) {
    const venue = data.venue;
    const venueInfo = document.createElement('p');
    venueInfo.textContent = `Venue: ${venue.name}, ${venue.address.localized_address_display}`;
    eventDiv.appendChild(venueInfo);
  }

  // Add ticket classes if available
  if (data.ticket_classes) {
    const ticketsHeader = document.createElement('h3');
    ticketsHeader.textContent = 'Available Tickets';
    eventDiv.appendChild(ticketsHeader);

    data.ticket_classes.forEach(ticket => {
      const ticketInfo = document.createElement('p');
      ticketInfo.textContent = `${ticket.name} - ${ticket.quantity_total - ticket.quantity_sold} available`;
      eventDiv.appendChild(ticketInfo);
    });
  }

  // Append the event details to the event-details container
  eventDetails.appendChild(eventDiv);
})
.catch(error => {
  console.error('Error fetching event:', error);
  const eventDetails = document.getElementById('event-details');
  eventDetails.textContent = 'Error loading event details.';
});
