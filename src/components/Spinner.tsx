import { useEffect } from "react"

import "@/components/spinner.scss"

function Spinner() {
  useEffect(() => {
    document.body.classList.add("no-scroll")

    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [])

  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  )
}

export default Spinner
