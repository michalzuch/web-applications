const dateInput = document.getElementById('date')
const timeSelect = document.getElementById('time')

dateInput.addEventListener('change', () => {
  const selectedDate = dateInput.value
  timeSelect.innerHTML = ''

  if (selectedDate) {
    timeSelect.disabled = false

    const reservedHours = reservations
      .filter((item) => item.reservation_date === selectedDate)
      .map((item) => item.reservation_time)

    for (let hour = 8; hour < 21; hour++) {
      const option = document.createElement('option')
      option.value = hour
      option.textContent = `${hour}:00`

      if (reservedHours.includes(`${hour}:00`)) {
        option.disabled = true
      }

      timeSelect.appendChild(option)
    }
  } else {
    timeSelect.disabled = true
  }
})
