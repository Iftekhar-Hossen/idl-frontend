import { useState, useEffect } from "react";

const useFetchSVG = (url) => {
  console.log(url)
  console.log("hi")

  useEffect(() => {
    fetch("https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg")
  .then(response => response.text())
  }, [])

  return <h1>Hi</h1>

}
export default useFetchSVG;