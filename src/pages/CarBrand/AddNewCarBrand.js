import React, { useState } from "react"
import {
  Button,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"

import { useDispatch } from "react-redux"

import { addNewCarsBrand as onAddNewCarBrand } from "store/actions"

//Firebase
import { ref as sRef } from "firebase/storage"
import { storage } from "helpers/firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"

const AddNewCarBrand = () => {
  const dispatch = useDispatch()

  const [brand, setBrand] = useState({
    name: "",
    photo: "",
  })

  const [image, setImage] = useState("")

  const handleChange = e => {
    const value = e.target.value
    setBrand({ ...brand, [e.target.name]: value })
  }

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const saveBrand = e => {
    e.preventDefault()

    const imageRef = sRef(storage, `brand/${image.name}`)
    uploadBytes(imageRef, image).then(snapshot => {
      getDownloadURL(snapshot.ref).then(url => {
        const newBrand = {
          ...brand,
          photo: url,
        }
        dispatch(onAddNewCarBrand(newBrand))
        setBrand({
          name: "",
          photo: "",
        })
      })
    })
  }
  return (
    <div>
      <CardTitle>Thương hiệu xe</CardTitle>
      <CardSubtitle className="mb-3">Fill all information below</CardSubtitle>
      <Form onSubmit={saveBrand}>
        <FormGroup className="mb-4" row>
          <Label htmlFor="billing-name" md="2" className="col-form-label">
            Tên hãng xe
          </Label>
          <Col md="10">
            <input
              className="form-control"
              type="text"
              placeholder="Nhập tên hãng"
              name="name"
              onChange={e => handleChange(e)}
              value={brand.name}
            />
          </Col>
        </FormGroup>
        <FormGroup className="mb-2" row>
          <Label
            htmlFor="billing-email-address"
            md="2"
            className="col-form-label"
          >
            Hình ảnh
          </Label>
          <Col md="10">
            <Input
              className="form-control"
              type="file"
              id="formFile"
              name="image"
              onChange={handleChangeImage}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col md="10">
            <Button color="success" className="btn btn-success mt-3">
              Xác nhận
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
}

export default AddNewCarBrand
