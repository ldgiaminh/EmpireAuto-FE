import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"

const formatDate = (date, format) => {
  const dateFormat = format ? format : "DD MMM Y"
  const date1 = moment(new Date(date)).format(dateFormat)
  return date1
}

const OrderId = cell => {
  return (
    <Link to="#" className="text-body fw-bold">
      {cell.value ? cell.value : ""}
    </Link>
  )
}

const Name = cell => {
  return cell.value ? cell.value : ""
}

const DateCell = cell => {
  return cell.value ? formatDate(cell.value, "DD/MM/YYYY") : "" // format the date value using the formatDate function
}

const ModalCar = cell => {
  return cell.value ? cell.value : ""
}

const Plate = cell => {
  return cell.value ? cell.value : ""
}

export { OrderId, Name, DateCell, ModalCar, Plate }
