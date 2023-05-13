import React from "react"

const Stepper = ({ logs }) => {
  return (
    <div className="md-stepper-horizontal orange">
      {logs.map(log => (
        <React.Fragment key={log.orderServiceStatusId}>
          <div className="md-step active done">
            <div className="md-step-circle">
              <span>1</span>
            </div>
            <div className="md-step-title">Checkin</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
          <div className="md-step">
            <div className="md-step-circle">
              <span>2</span>
            </div>
            <div className="md-step-title">Kiểm tra</div>
            <div className="md-step-optional">11/05/2023, 15:30</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
          <div className="md-step">
            <div className="md-step-circle">
              <span>3</span>
            </div>
            <div className="md-step-title">Thanh toán</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
          <div className="md-step">
            <div className="md-step-circle">
              <span>4</span>
            </div>
            <div className="md-step-title">Lấy xe</div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
          <div className="md-step">
            <div className="md-step-circle">
              <span>5</span>
            </div>
            <div>
              <div className="md-step-title">Hoàn thành</div>
              <div className="md-step-bar-left"></div>
              <div className="md-step-bar-right"></div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Stepper
