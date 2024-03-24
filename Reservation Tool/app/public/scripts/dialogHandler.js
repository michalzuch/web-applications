function closeDialog() {
  window.location.href = '/'
}

function openDialog() {
  const confirmationModal = document.querySelector('#reservationConfirmationDialog')
  confirmationModal.open = true
}
