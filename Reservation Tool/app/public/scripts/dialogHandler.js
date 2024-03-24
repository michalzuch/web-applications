function closeDialog() {
  window.location.href = '/'
}

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
    const confirmationModal = document.querySelector('#reservationConfirmationDialog')
    confirmationModal.open = true
  } else {
    // Handle the error case
  }
})
