import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap"

import Dropzone from "react-dropzone"
import Breadcrumbs from "../../components/Common/Breadcrumb"

import { useSelector, useDispatch } from "react-redux"

import {
  addNewCarsBrand as onAddNewCarBrand,
  getCarsBrandDetail as onGetCarBrandDetail,
} from "store/actions"

import { Link, withRouter } from "react-router-dom"

//Firebase
import { ref as sRef } from "firebase/storage"
import { storage } from "helpers/firebase"
import { getDownloadURL, uploadBytes } from "firebase/storage"
import Loader from "components/Loader/Loader"

const EditCarBrand = props => {
  const dispatch = useDispatch()

  const { isLoading, carsBrandDetail } = useSelector(state => ({
    isLoading: state.brands.isLoading,
    carsBrandDetail: state.brands.carsBrandDetail,
  }))

  const [brand, setBrand] = useState({
    name: carsBrandDetail.name || "",
    photo: carsBrandDetail.photo || "",
  })

  const [selectedFile, setSelectedFile] = useState(null)
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    match: { params },
  } = props

  useEffect(() => {
    if (params && params.id) {
      dispatch(onGetCarBrandDetail(params.id))
    }
  }, [params, onGetCarBrandDetail, dispatch])

  useEffect(() => {
    setBrand(prevBrand => ({
      ...prevBrand,
      name: carsBrandDetail.name || "",
      photo: carsBrandDetail.photo || "",
    }))
  }, [carsBrandDetail])

  const handleChange = e => {
    const value = e.target.value
    setBrand({ ...brand, [e.target.name]: value })
    setIsFormValid(false)
  }

  const resetForm = () => {
    setBrand({
      name: carsBrandDetail.name,
      photo: carsBrandDetail.photo,
    })
  }

  function handleAcceptedFiles(files) {
    if (files.length > 0) {
      const file = files[0]
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
      setSelectedFile(file)
      setIsFormValid(false)
    }
  }

  /**
   * Formats the size
   */
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const saveBrand = e => {
    e.preventDefault()

    // Check if brand is empty
    if (brand.name.trim() === "") {
      setIsFormValid(true)
      return
    }

    if (brand && selectedFile) {
      const imageRef = sRef(storage, `brand/${selectedFile.name}`)
      uploadBytes(imageRef, selectedFile).then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          const newBrand = {
            ...brand,
            photo: url,
          }
          dispatch(onAddNewCarBrand(newBrand, props.history))
        })
      })
      setIsSubmitting(true)
    } else {
      setIsFormValid(true)
    }
  }

  const handleReset = () => {
    resetForm()
    setSelectedFile(null)
    setIsFormValid(false)
  }

  return (
    <div className="page-content">
      {isLoading && <Loader />}
      <Container fluid>
        <Breadcrumbs title="Thương hiệu" breadcrumbItem="Cập nhật" />

        <Row style={{ justifyContent: "center" }}>
          <Col xl={6} md={10}>
            <Card>
              <CardBody>
                <CardTitle>Cập nhật thương hiệu</CardTitle>
                <CardSubtitle className="mb-4">
                  {" "}
                  Nhập vào chỗ trống bên dưới để cập nhật
                </CardSubtitle>
                {isFormValid ? (
                  <Alert color="danger">Vui lòng điền đầy đủ dữ liệu</Alert>
                ) : null}
                <Form onSubmit={saveBrand}>
                  <div className="mb-3">
                    <Label htmlFor="formrow-email-Input">Tên thương hiệu</Label>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Nhập tên thương hiệu"
                      name="name"
                      onChange={e => handleChange(e)}
                      value={brand.name}
                    />
                  </div>

                  <div>
                    <Label htmlFor="formrow-email-Input">Hình ảnh (Logo)</Label>
                    <Dropzone
                      onDrop={acceptedFiles => {
                        handleAcceptedFiles(acceptedFiles)
                      }}
                      accept="image/*"
                      maxFiles={1}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone">
                          <div
                            className="dz-message needsclick mt-2"
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            <div className="mb-3">
                              <i className="display-4 text-muted bx bxs-cloud-upload" />
                            </div>
                            <h4>Kéo thả ảnh tại đây hoặc nhấp để tải ảnh</h4>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                    <div className="dropzone-previews mt-3" id="file-previews">
                      {selectedFile && (
                        <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={selectedFile.name}
                                  src={selectedFile.preview}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {selectedFile.name}
                                </Link>
                                <p className="mb-0">
                                  <strong>{selectedFile.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )}
                      {brand && (
                        <Card className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete">
                          <div className="p-2">
                            <Row className="align-items-center">
                              <Col className="col-auto">
                                <img
                                  data-dz-thumbnail=""
                                  height="80"
                                  className="avatar-sm rounded bg-light"
                                  alt={brand.photo}
                                  src={brand.photo}
                                />
                              </Col>
                              <Col>
                                <Link
                                  to="#"
                                  className="text-muted font-weight-bold"
                                >
                                  {brand.photo}
                                </Link>
                                <p className="mb-0">
                                  <strong>{brand.formattedSize}</strong>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        </Card>
                      )}
                    </div>
                  </div>

                  <div className="d-flex flex-grap gap-2 justify-content-end text-center mt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary"
                    >
                      Tạo mới
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleReset}
                    >
                      Hủy
                    </button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

EditCarBrand.propTypes = {
  match: PropTypes.object,
  isLoading: PropTypes.bool,
}

export default withRouter(EditCarBrand)
