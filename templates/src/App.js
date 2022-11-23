import React, { useState } from "react";
import "./css/app.css";
import img2 from "./images/blur1.jpg";
import img1 from "./images/focus1.jpg";
import Loading from "./images/loading.gif";
export default function App() {
  const [file, setFile] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [clearImage, setClearImage] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const fetchData = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    console.log(file);
    const request = {
      method: "POST",
      body: formData,
    };
    const data = await fetch("http://127.0.0.1:8000/upload", request);
    const images = await data.json();
    console.log(images);
  };

  const getdata = async () => {
    const data = await fetch("http://127.0.0.1:8000/convert");
    const result = await data.blob();
    setClearImage(URL.createObjectURL(result));
  };

  return (
    <>
      <div>
        <div className="body sub-div">
          <h1 className="heading">🆂🆄🅿🅴🆁 🆁🅴🆂</h1>
        </div>
        <div className="sub-div">
          <div className="img-div sub-div">
            <img className="image" src={img2} alt="not Fount..!" />
            <img className="image" src={img1} alt="not found..!" />
          </div>
          <div>
            <div className="sub-div">
              <div className="upload-btn-wrapper result-div">
                <button className="btn">upload Image</button>
                <input
                  type="file"
                  name="myfile"
                  onChange={(e) => {
                    // fetchData(e.target.files[0]);
                    setFile(URL.createObjectURL(e.target.files[0]));
                    setIsImage(true);
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
            {isImage && (
              <div className="display-div div-size result-div">
                <img className="display-image" src={file} alt="Not Found..!" />
                <button onClick={() => setIsClick(true)}>click</button>
              </div>
            )}
            <div>
              {isClick && (
                <div className="display-div div-size result-div">
                  {clearImage ? (
                    <>
                      <image
                        className="display-image"
                        src={clearImage}
                        alt="Not Found..!"
                      />
                      <a href={clearImage} download>
                        {" "}
                        Download{" "}
                      </a>
                    </>
                  ) : (
                    <image src={Loading} alt="Not Found..!" />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
