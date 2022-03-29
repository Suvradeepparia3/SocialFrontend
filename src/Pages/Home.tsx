import React, { Component } from 'react'
import Leftbar from '../Pages/Leftbar'
import MainContent from '../Pages/MainContent'
import RightSide from '../Pages/RightSide'

export default class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3">
                        <Leftbar />
                    </div>
                    <div className="col-lg-6">
                        <MainContent />
                    </div>
                    <div className="col-lg-3">
                        <RightSide />
                    </div>
                </div>        
            </div>
        )
    }
}
