import React, { useRef, useState } from "react";
import "./css/app.css";
import img2 from "./images/blur1.jpg";
import img1 from "./images/focus1.jpg";
import img3 from "./images/cloud-computing.png";
import process from "./images/process.png"
import download from "./images/45162.png"
import Loading from "./images/loading.gif";

export default function App() {
  const bottomRef = useRef(null);
  const [file, setFile] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const [clearImage, setClearImage] = useState(null);
  const [isClick, setIsClick] = useState(false);

  const scroll = ()=>{
   setIsImage(true);
   setTimeout(()=>{
    bottomRef.current.scrollIntoView({
      behaviour:"smooth"
    });
   },700)
  }
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
        <h1 className="heading">Super Resolution</h1>
      </div>
      <div className="sub-div">
        <div id="shadow" className="content-div">
          A <b>Machine Learning powered </b>
          <br />
          <br />
          Web application for images
          <br />
          <br />
          those are torn out or was <br />
          <br />
          taken in bad quality to turn <br />
          <br />
          into an enhanced image Using <br />
          <br />
          ESRGAN as a core model,
          <br />
          <br />
          <b>React.js</b> for front-end <br />
          <br />
          and to establish communication
          <br />
          <br />
          between two an backend server <br />
          <br />
          built with <b>FastAPI</b>.
        </div>

        <div className="main-div">
          <div className="sub-div img-div">
            <div>
              <img className="image" src={img2} alt="not Fount..!" />
              <p className="size">
                <b>240 X 360</b>
              </p>
            </div>
            <div>
              <img className="image" src={img1} alt="not found..!" />
              <p className="size">
                <b>960 X 1440</b>
              </p>
            </div>
          </div>

          <div className="upload-btn">
            <label className="btn">
              <img src={img3} className="icon" alt="not Found..!" />
              <span className="upload-txt">Upload Image</span>
              <input
                type="file"
                name="myfile"
                className="input"
                onChange={(e) => {
                  fetchData(e.target.files[0]);
                  setFile(URL.createObjectURL(e.target.files[0]));
                  scroll();
                }}
              />
            </label>
          </div>

          <div ref={bottomRef} className="sub-div uploded-div">
            {isImage && (
              <>
                <div className="display-div">
                  <img
                    className="display-image "
                    src={file}
                    alt="Not Found..!"
                  />
                </div>

                {isClick && (
                  <div className="display-div">
                    {clearImage ? (
                      <>
                        <img
                          className="display-image"
                          src={clearImage}
                          alt="Not Found..!"
                        />
                      </>
                    ) : (
                   <image src={Loading} alt="Not Found..!" />
                    )} 
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="button-div">
        <div>
          {isImage && (
            <button
            className="btn"
              onClick={() => {
                setIsClick(true);
                getdata();
              }}
            >
              <img src={process} alt="ups" className="icon"/>
              Process 
            </button>
          )}
        </div>
        <div className="download">
          {clearImage && (
            <a className="btn link" href={clearImage} download><img src={download} alt="ups" className="icon"/>Download</a>
          )}
        </div>
      </div>
    </>
  );
}
