import React, { useContext } from 'react'
import "./index.css"
import UserContext from '../Context';

function FailureView() {

  const {isLightModeActive} = useContext(UserContext)
  const btnTextColor = isLightModeActive ? "btn-light-mode" : "btn-dark-mode";
  return (
    <div className="failure-view-container">
      <h1>Some thing Went wrong</h1>
      <button className={`retry-btn ${btnTextColor}`}>Retry</button>
    </div>
  )
}

export default FailureView