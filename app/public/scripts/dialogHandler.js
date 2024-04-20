function closeDialog() {
  window.location.href = '/'
}

function escapeHTML(str) {
  var div = document.createElement('div')
  div.appendChild(document.createTextNode(str))
  return div.innerHTML
}

function openDialog(title, text, reservation_date, reservation_time) {
  const statusDialog = document.querySelector('#statusDialog')
  statusDialog.open = true
  const dialogTitle = statusDialog.querySelector('#dialogTitle')
  dialogTitle.innerHTML = '<strong>' + title + '</strong>'
  const dialogText = statusDialog.querySelector('#dialogText')
  dialogText.innerHTML = text
  if (reservation_date !== '' && reservation_time !== '') {
    const additionalInfo = statusDialog.querySelector('#additionalInfo')
    const dateString = 'Date: ' + formatDate(reservation_date)
    const timeString = 'Time: ' + createHourRange(reservation_time)
    additionalInfo.innerHTML = '<li>' + escapeHTML(dateString) + '</li><li>' + escapeHTML(timeString) + '</li>'
  }
}

function createHourRange(hour) {
  const [startingHour] = hour.split(':')
  const endingHour = parseInt(startingHour) + 1

  return `${hour} - ${endingHour}:00`
}

function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
