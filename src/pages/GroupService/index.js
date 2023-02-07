import React from "react"
import { Container } from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const GroupService = () => {
  //meta title
  document.title = "Các dịch vụ | Empire Admin"
  return (
    <>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Dịch vụ" breadcrumbItem="Danh sách các dịch vụ" />
          {/* write Html code or structure */}
        </Container>
      </div>
    </>
  )
}

export default GroupService
