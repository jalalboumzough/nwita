import React from 'react'
import './note_post.css'
import Epingleicon from '../src/img/epingle.png'

export default function Note_post() {
  return (
    //n_p => note_post
    <div className="n_p_div">
        <div className="n_p_head">
        <div className="n_p_picprofile"></div>
        <span>Name publisher </span>
        </div>
        <div className="n_p_content">
            <span className='Epingle_Btn'><img src={Epingleicon} alt="epingle"/></span>
        </div>
        {/* <div className="n_p_commantaire">
            <input type="text" placeholder='Commentarie' />
        </div> */}
    </div>
  )
}
