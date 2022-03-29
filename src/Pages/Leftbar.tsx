import React, { Component } from 'react'
import $ from 'jquery'
import '../Style/Style.css'
import { Redirect } from 'react-router-dom'

interface State {
    name : string,
    loggedIn: boolean
}

export default class Leftbar extends Component<{},State> {

    constructor(props: any){
        super(props)

        this.state = {
            name: "",
            loggedIn: true
        }

        this.signOut = this.signOut.bind(this)
    }

    componentDidMount(){
        this.createUser()
    }

    createUser(){
        // Name setUp
        let userName = localStorage.getItem('user')
        this.setState({name: userName !== null ? userName: 'User'})
        // // DP making
        setTimeout(()=>{
            let intials = this.state.name.charAt(0)
            // eslint-disable-next-line
            let profileImage = $('#profileImage').text(intials)
        }, 1000)     
    }

    signOut(){
        this.setState({loggedIn: false})
        localStorage.clear()
    }

    render() {

        if(!this.state.loggedIn) return <Redirect to="/" />

        return (  
            <div className="box">
                <div id="profileImage"></div>
                <div className="content">
                    <h3>{this.state.name}</h3>
                </div>
                <button type="button" onClick={this.signOut} className="btn btn-dark floatBtm">Sign Out</button>
            </div>
        )
    }
}
