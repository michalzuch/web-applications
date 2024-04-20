const dateInput = document.getElementById('reservation_date')
const timeSelect = document.getElementById('reservation_time')

dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value
  timeSelect.innerHTML = ''

  let hour_string;
  if (selectedDate) {
    timeSelect.disabled = false

    const reservedHours = reservations
        .filter((item) => item.reservation_date === selectedDate)
        .map((item) => item.reservation_time)

    for (let hour = 8; hour < 21; hour++) {
      const option = document.createElement('option')
      hour_string = `${hour}:00`
      option.value = hour_string
      option.textContent = hour_string

      if (reservedHours.includes(hour_string)) {
        option.disabled = true
      }

      timeSelect.appendChild(option)
    }
  } else {
    timeSelect.disabled = true
  }
})
