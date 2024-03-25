function closeDialog() {
  window.location.href = '/'
}

function openDialog(title, text, date, time) {
  const statusDialog = document.querySelector('#statusDialog')
  statusDialog.open = true
  const dialogTitle = statusDialog.querySelector('#dialogTitle')
  dialogTitle.innerHTML = '<strong>' + title + '</strong>'
  const dialogText = statusDialog.querySelector('#dialogText')
  dialogText.innerHTML = text
  if (date !== '' && time !== '') {
    const additionalInfo = statusDialog.querySelector('#additionalInfo')
    const dateString = 'Date: ' + formatDate(date)
    const timeString = 'Time: ' + createHourRange(time)
    additionalInfo.innerHTML = '<li>' + dateString + '</li><li>' + timeString + '</li>'
  }
}

function createHourRange(hour) {
  const [startingHour] = hour.split(':')
  const endingHour = parseInt(startingHour) + 1

  return `${hour} - ${endingHour}:00`
}

function formatDate(dateString) {
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options)
  return formattedDate
}
