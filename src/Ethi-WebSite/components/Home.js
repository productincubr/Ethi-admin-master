import React from 'react'
import "./Home.css"
import Footer from './Footer'
import Header from './Header'

function HomePage() {
  return (
    <div>
      <Header/>
      <div className='home_page'>
        <div className='home_page_container'>
          <div className='home_page_wrapper'>
            <div className='welcome_screen'>
              <div className='coming_soon_text'>
                <p>WE ARE</p>
                <h1>COMING SOON</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default HomePage