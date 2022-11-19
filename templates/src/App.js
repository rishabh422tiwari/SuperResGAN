import React, { useState } from "react";
import "./css/app.css";
import img2 from "./images/blur1.jpg";
import img1 from "./images/focus1.jpg";
export default function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(false);
  const [getData, setGetData] = useState("");

  const fetchData = async () => {
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Image: file }),
    };
    const data = await fetch("http://localhost:5000/", request);
    const images = await data.json();
    setGetData(images);
  };

  return (
    <>
      <div>

        {/* heading */}
        <div className="body sub-div">
          <h1 className="heading">🆂🆄🅿🅴🆁 🆁🅴🆂</h1>
        </div>
        
        {/* sub-div */}
        <div className="sub-div">

          {/* images */}
              <div className="img-div sub-div">
                <img className="image" src={img2} alt="not Fount..!" />
                <img className="image" src={img1} alt="not found..!" />
              </div>

          {/* button and result */}
              <div>
                <div className="sub-div">
                  <div className="upload-btn-wrapper result-div">
                    <button className="btn">upload Image</button>
                    <input
                        type="file"
                        name="myfile"
                        onChange={(e) => {
                          setFile(URL.createObjectURL(e.target.files[0]));
                          setResult(true);
                        }}
                      />
                  </div>
                  <div className="btn2">
                  <input
                      className="btn"
                      type="input"
                      name="upload url"
                      placeholder="upload url"
                      onChange={(e) => {
                        setFile(e.target.value);
                      }}
                    />
                  </div>
                
                </div>

                {result && (
                  <div className="display-div div-size result-div">
                    <img className="display-image" src={file} alt="Not Found..!" />
                  </div>
                )}
             </div>
            </div>
      </div>
    </>
  );
}