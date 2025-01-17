
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Dashboard = () => {

   const waves = useSelector((state: RootState) => state.createWaves);
  console.log("Waves State:", waves);

  
  return (
    <div>
      
    </div>
  )
}

export default Dashboard;
