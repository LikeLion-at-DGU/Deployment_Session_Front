import { useEffect, useState } from 'react'
import ll from './assets/ll.png'
import dgu from './assets/dgu.png'
import './App.css'
import axios from "axios";
import {useForm} from "react-hook-form"


const PAPI = axios.create({
  baseURL: "http://15.165.4.227",
  headers:{
      "Content-Type": "application/json",
  },
});


function App() {
  const {register, handleSubmit, setValue} = useForm();
  const [text, setText] = useState('')
  const [data, setData] = useState([])

  const onChange = (e) => {
    setText(e.target.value)	
  }

  const getData = async() => {
    try{
      const data = await PAPI.get("/api/")
      const rd = data.data.reverse()
      setData(rd);
    }catch(error){
      console.log(error)
    }
  }

  const sendPost = async() => {
    const data = {
      "writer" : text
    }
    try{
        await PAPI.post('/api/', data).then(
            response => {
                window.alert(`${response.data.message}`)
            }
        )
        setValue("content" , "")
        setText("")
        getData();
    } catch(error){
        console.log(error)
    }
    
  }

  useEffect(()=>{
    getData();
  }, [])

  return (
    <>
      <div className='logo__box'>
        <a href="https://www.likelion.net/" target="_blank">
          <img src={ll} className="logo" alt="LikeLion logo" />
        </a>
        <a href="https://likeliondgu.oopy.io/" target="_blank">
          <img src={dgu} className="logo react" alt="DGU LikeLion logo" />
        </a>
      </div>
      <h1>AWS Deployment Session</h1>
      <div className="data__list">
        {data.map(i => (
          <div key={i.id} className='data__item'>
            <div className='data__item__text'>{i.writer}</div>
            <div className='data__item__time'>{i.created_at.substr(0,10)}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <form onSubmit={handleSubmit(sendPost)}> 
          <input {...register("content", {required : true, maxLength: 7 })} onChange={onChange} placeholder='Write Your Name' />
          <button >
          Post request is {text.length > 0 ? `"${text}"` : ``}
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
