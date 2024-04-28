async function mapItemIdsToNames(reservations, items) {
  const itemsMap = new Map(items.map((item) => [item.id, item.name]))
  reservations.forEach((reservations) => {
    const itemName = itemsMap.get(reservations.item)
    if (itemName) {
      reservations.item_name = itemName
    }
  })

  return reservations
}

async function filterReservationsByDate(reservations) {
  const today = new Date().toISOString().split('T')[0]
  return reservations.filter((reservation) => reservation.reservation_date >= today)
}

async function filterReservationsByItem(reservations, itemID) {
  return await reservations.filter((reservation) => parseInt(reservation.item) === parseInt(itemID))
}

module.exports = {
  mapItemIdsToNames,
  filterReservationsByDate,
  filterReservationsByItem,
}
