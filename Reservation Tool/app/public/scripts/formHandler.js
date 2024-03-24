document.querySelector('#reservationForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const id = document.querySelector('#id').value
  const date = document.querySelector('#date').value
  const time = document.querySelector('#time').value
  const name = document.querySelector('#name').value

  const data = new URLSearchParams()
  data.append('id', id)
  data.append('name', name)
  data.append('date', date)
  data.append('time', time)

  const response = await fetch('/reservation', {
    method: 'POST',
    body: data,
  })

  if (response.ok) {
    openDialog('🗓️ Your reservation is confirmed!', 'You have successfully reserved an item', date, time)
  } else {
    openDialog('❌ Something went wrong', 'There was an error saving your reservation', '', '')
  }
})
