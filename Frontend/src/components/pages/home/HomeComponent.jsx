import React from 'react'
import HomeBanner from './components/HomeBanner'
import DonationProcess from './components/DonationProcess'
import HomeStats from './components/HomeStats'
import WhoWeAre from './components/WhoWeAre'

const HomeComponent = () => {
  return (
    <div>
        <HomeBanner/>
        <DonationProcess/>
        <WhoWeAre/>
        <HomeStats/>
    </div>
  )
}

export default HomeComponent