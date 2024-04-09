document.querySelector('#reservationForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const item = document.querySelector('#item').value
  const reservation_date = document.querySelector('#reservation_date').value
  const reservation_time = document.querySelector('#reservation_time').value
  const name = document.querySelector('#name').value

  const data = new URLSearchParams()
  data.append('item', item)
  data.append('name', name)
  data.append('reservation_date', reservation_date)
  data.append('reservation_time', reservation_time)

  const response = await fetch('/reservation', {
    method: 'POST',
    body: data,
  })

  if (response.ok) {
    openDialog(
      '🗓️ Your reservation is confirmed!',
      'You have successfully reserved an item',
      reservation_date,
      reservation_time
    )
  } else {
    openDialog('❌ Something went wrong', 'There was an error saving your reservation', '', '')
  }
})
