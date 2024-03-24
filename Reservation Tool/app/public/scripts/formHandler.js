document.querySelector('#reservationForm').addEventListener('submit', async (event) => {
  event.preventDefault()

  const data = new URLSearchParams()
  data.append('id', document.querySelector('#id').value)
  data.append('name', document.querySelector('#date').value)
  data.append('date', document.querySelector('#time').value)
  data.append('time', document.querySelector('#name').value)

  const response = await fetch('/reservation', {
    method: 'POST',
    body: data,
  })

  if (response.ok) {
    openDialog()
  } else {
    // Handle the error case
  }
})
