import './App.css';
import { useState } from 'react';
import {BrowserRouter, Link, Routes,Route} from 'react-router-dom'
import MainPage from './Pages/MainPage';
import Navigate from './Components/Navigate';
import LivePage from './Pages/LivePage';
import MyPage from './Pages/MyPage';
import PayPage from './Pages/PayPage';
import React from 'react';


function App() {
  const [liveData, setLiveData] = useState(null)

  return (
    <div className='App'>
    <BrowserRouter>
    <Navigate />
    <Routes>
      <Route path = "/" element={<MainPage setLiveData={setLiveData} />}></Route>
      <Route path = "/live" element={<LivePage liveData={liveData} />}></Route>
      <Route path = "/mypage" element={<MyPage />}></Route>
      <Route path = "/paypage" element={<PayPage />}></Route>
    </Routes>
    </BrowserRouter> 
    </div>
  );
}

export default App;