import base from './images/base.png';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const baseDalleAPIURL = 'https://tuer77mo5bxyy3erjstxqvo6lu0bxqwr.lambda-url.us-east-1.on.aws/';
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect( () => {
    const fetchResult = async () => {
      try {
        const response = await fetch(baseDalleAPIURL);
        const data = await response.json();
        console.log(data)
        setMinutes(Math.floor((data % 3600) / 60));
        setHours(Math.floor(data / 3600));
        setProgress(Math.min(Math.floor((data / 18000) * 100), 100))
        
      } catch (error) {
        console.error('Error making POST request', error);
      }
    };

    fetchResult();
    const intervalId = setInterval(fetchResult, 10000)
    return () => clearInterval(intervalId);
  }, [])

  return (
    <div style = {{ backgroundColor: "#C757FF", width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", width: "10vw", height: "58vh", top: "7vh", left: "14vw"}}>
        <div style={{ width: "100%", height: `${100-progress}%`, backgroundColor: "#A727E7" }}></div>
        <div style={{ width: "100%", height: `${progress}%`, backgroundColor: "#8EEE00" }}></div>
      </div>  
      
      <img src={base} style={{width: "80vw", height: "63vh", position: "absolute", top: "4vh", left: "6vw" }} />
      <div style={{position: "absolute", top: "18vh", left: "44vw", display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center"}}>
        <div style={{fontSize: "90px", fontWeight: "bold"}}>
          {hours <= 99 ? String(hours).padStart(2, '0') : 99}:{String(minutes).padStart(2, '0')}
        </div>
        <div style={{fontSize: "90px", fontWeight: "bold", marginTop: "-1vh"}}>
          HORAS
        </div>
      </div>   
    </div>
  );
}

export default App;