import React, { Component } from 'react'
import Post from '../Components/Post'
import '../Style/Style.css'
import { Redirect } from 'react-router-dom'

interface State {
    loggedIn: boolean
}

export default class MainContent extends Component<{}, State> {

    constructor(props: any){
        super(props)

        this.state = {
            loggedIn: true
        }
    }

    componentDidMount(){
        const token = localStorage.getItem('token')
        if(token == null){
            this.setState({loggedIn: false})
        } 
    }

    render() {

        if(!this.state.loggedIn) return <Redirect to='/' /> 

        return (
            <div className="mainBox">
                <Post />
            </div>
        )
    }
}
