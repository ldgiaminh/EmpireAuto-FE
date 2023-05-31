import React, { useRef, useState } from "react"
import {
  Button,
  CardSubtitle,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
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

  const fileInputRef = useRef(null)

  const handleChange = e => {
    const value = e.target.value
    setBrand({ ...brand, [e.target.name]: value })
  }

  const handleChangeImage = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const resetForm = () => {
    setBrand({
      name: "",
      photo: "",
    })
    if (fileInputRef.current) {
      fileInputRef.current.value = null // Reset the file input field
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
      })
    })
    resetForm()
  }
  return (
    <div>
      <CardTitle>Thương hiệu xe</CardTitle>
      <CardSubtitle className="mb-3">Fill all information below</CardSubtitle>
      <Form onSubmit={saveBrand}>
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <Label htmlFor="formrow-email-Input">Tên thương hiệu</Label>
              <Input
                type="text"
                className="form-control"
                placeholder="Nhập tên hãng"
                name="name"
                onChange={e => handleChange(e)}
                value={brand.name}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <Label htmlFor="formrow-password-Input">Logo</Label>
              <Input
                className="form-control"
                type="file"
                id="formFile"
                name="image"
                onChange={handleChangeImage}
                ref={fileInputRef}
              />
            </div>
          </Col>
        </Row>
        <FormGroup row>
          <Col md="6">
            <Button color="primary" className="btn btn-primary mt-3">
              Xác nhận
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  )
}

export default AddNewCarBrand
