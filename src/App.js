import './App.css';
import React,{useState} from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

function App() {

  const [rows, setRows] = useState([]) 

  
  const fetchRows = async () => {



    const url = "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const data = await fetch(url);

    const dataJson = await data.json();

    return dataJson;
    
  }
  
  useEffect( () => {

  fetchRows().then(dataJson => setRows(dataJson));    

  }, [])
  

  return (
    <>
    <Home rows = {rows} setRows = {setRows} />
    </>
  );
}

export default App;
