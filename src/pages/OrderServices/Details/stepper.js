import React from "react"

const Stepper = ({ logs }) => {
  /*
  ==================================================
  FORMAT DATE & TIME
  ==================================================
  */
  const formattedDateTime = date => {
    const createDate = new Date(date)
    const formattedDate = createDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    const formattedTime = createDate.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    const formatted = `${formattedDate} - ${formattedTime}`
    return formatted
  }
  return (
    <div className="md-stepper-horizontal orange">
      <React.Fragment>
        {/* Start */}
        <div
          className={
            logs && logs.started.logDateTime != null
              ? "md-step active"
              : "md-step"
          }
        >
          <div className="md-step-circle">
            {logs && logs.started.logDateTime != null ? (
              <i className="fas fa-check"></i>
            ) : (
              <span>1</span>
            )}
          </div>
          <div className="md-step-title">Checkin</div>
          <div className="md-step-optional">
            {logs && logs.started.logDateTime != null
              ? formattedDateTime(logs.started.logDateTime)
              : ""}
          </div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>

        {/* Diagnose */}
        <div
          className={
            logs && logs.started.logDateTime != null
              ? "md-step active"
              : "md-step"
          }
        >
          <div className="md-step-circle">
            {logs && logs.diagnosed.logDateTime != null ? (
              <i className="fas fa-check"></i>
            ) : (
              <span>2</span>
            )}
          </div>
          <div className="md-step-title">Kiểm tra</div>
          <div className="md-step-optional">
            {logs && logs.diagnosed.logDateTime != null
              ? formattedDateTime(logs.diagnosed.logDateTime)
              : ""}
          </div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>

        {/* Confirm Paid */}
        <div
          className={
            logs && logs.diagnosed.logDateTime != null
              ? "md-step active"
              : "md-step"
          }
        >
          <div className="md-step-circle">
            {logs && logs.confirmAndPaid.logDateTime != null ? (
              <i className="fas fa-check"></i>
            ) : (
              <span>3</span>
            )}
          </div>
          <div className="md-step-title">Thanh toán</div>
          <div className="md-step-optional">
            {logs && logs.confirmAndPaid.logDateTime != null
              ? formattedDateTime(logs.confirmAndPaid.logDateTime)
              : ""}
          </div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>

        {/* Doing */}
        <div
          className={
            logs && logs.confirmAndPaid.logDateTime != null
              ? "md-step active"
              : "md-step"
          }
        >
          <div className="md-step-circle">
            {logs && logs.done.logDateTime != null ? (
              <i className="fas fa-check"></i>
            ) : (
              <span>4</span>
            )}
          </div>
          <div className="md-step-title">Thực hiện</div>
          <div className="md-step-optional">
            {logs && logs.done.logDateTime != null
              ? formattedDateTime(logs.done.logDateTime)
              : ""}
          </div>
          <div className="md-step-bar-left"></div>
          <div className="md-step-bar-right"></div>
        </div>

        {/* Done */}
        <div
          className={
            logs && logs.done.logDateTime != null ? "md-step active" : "md-step"
          }
        >
          <div className="md-step-circle">
            {logs && logs.checkout.logDateTime != null ? (
              <i className="fas fa-check"></i>
            ) : (
              <span>5</span>
            )}
          </div>
          <div>
            <div className="md-step-title">Hoàn thành</div>
            <div className="md-step-optional">
              {logs && logs.checkout.logDateTime != null
                ? formattedDateTime(logs.checkout.logDateTime)
                : ""}
            </div>
            <div className="md-step-bar-left"></div>
            <div className="md-step-bar-right"></div>
          </div>
        </div>
      </React.Fragment>
    </div>
  )
}

export default Stepper
