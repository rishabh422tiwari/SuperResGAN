import React, { useState } from 'react'
import './css/app.css'
import img1 from'./images/m6.png'
export default function App() {

  const [data,setData] = useState("");
  const [file,setFile] = useState();

  return (
    <>
    <div className='main-box'>
      <div className='body sub-div'>
     
        <h1 className="heading">🆂🆄🅿🅴🆁 🆁🅴🆂</h1>
      </div> 
      
      <div className=' body sub-div'>
      <div className="upload-btn-wrapper margin">
          <button className="btn">upload Image</button>
          
          <input type="file" name="myfile" onChange={(e)=>{setFile(e.target.files[0]) }}/>
      </div>
          <input className='btn' type="input" name="upload url" placeholder="upload url" 
          onChange={(e)=>{setData(e.target.value)}}/>
     </div>
     <div className='img-bg'>
     <img className='image' src={img1} alt="not found..!" />

     </div>
     </div>
    </>
  )
}
