import React from 'react'
import AboutBanner from './components/AboutBanner'
import WhoWeAre from '../home/components/WhoWeAre'
import HomeStats from '../home/components/HomeStats'

const AboutComponent = () => {
  return (
    <div>
        <AboutBanner/>
        <WhoWeAre/>
        <HomeStats/>
    </div>
  )
}

export default AboutComponent