import { useEffect, useState } from 'react'
import ll from './assets/ll.png'
import dgu from './assets/dgu.png'
import './App.css'
import axios from "axios";

const API = axios.create({
  baseURL: "http://15.165.4.227",
  headers:{
      "Content-Type": "application/json",
  },
});

function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const onChange = (e) => {
    setText(e.target.value)	
  }

  const onReset = () => {			
    setText("")			
  }

  const getData = async() => {
    try{
      const data = await API.get("/api")
      console.log(data);
    }catch(error){

    }
  }

  const sendPost = async() => {
    const data = {
      "writer" : text
    }
    try{
        await API.post('/api', data).then(
            response => {
                //setInfo(response.data)
            }
        )
    } catch(error){
        console.log(error)
    }
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
    <>
      <div>
        <a href="https://www.likelion.net/" target="_blank">
          <img src={ll} className="logo" alt="LikeLion logo" />
        </a>
        <a href="https://likeliondgu.oopy.io/" target="_blank">
          <img src={dgu} className="logo react" alt="DGU LikeLion logo" />
        </a>
      </div>
      <h1>AWS Deployment Session</h1>
      <div className="card">
        <form>
          <input onChange={onChange} placeholder='Write Your Content' />
          <button onClick={() => setCount((count) => count + 1)}>
          Post request is {count}
          </button>
        </form>
        <p>
          Enter the content and send a Post request
        </p>
      </div>
      <p className="read-the-docs">
        Click on the LikeLion and LikeLion-DGU logos to more information
      </p>
    </>
  )
}

export default App
