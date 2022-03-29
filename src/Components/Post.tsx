import React, { Component } from 'react'
import '../Style/Style.css'
import axios from 'axios'

interface State {
    postData : {
        _id: string,
        title : string,
        imgUrl : string,
        date : string,
        description : string
    }[],
    editData : {
        _id: string,
        title : string,
        imgUrl : string,
        date : string,
        description : string
    },
    loading: boolean
    submitted: boolean,
    token: string | null,
    modalMsg: string
}
interface Props {   
}

export default class Post extends Component<Props, State> {

    constructor(props : any) {
        super(props)

        this.state = {
            postData : [
                {
                    _id: "",
                    title : "",
                    imgUrl : "",
                    date: "",
                    description: ""
                }
            ],
            editData : {
                _id: "",
                title : "",
                imgUrl : "",
                date : "",
                description : ""
            },
            loading: false,
            submitted: false,
            token: '',
            modalMsg: ''
        }

        this.onHandleChange = this.onHandleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.fetchAllData()
    }

    fetchAllData(){
        const token = localStorage.getItem("token")
        axios.get('http://localhost:8080/post/home',
        {
            headers: {
                'auth-token' : `${token}`
            }
        })
        .then((res: any) => {
            this.setState({postData: res.data})
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    deletePost(id: string){
        axios.delete('http://localhost:8080/post/' + id)
        .then((res: any) => {
            this.fetchAllData()
        })
        .catch((err: any) => {
            console.log(err)
        })
    }

    editCliked(post: any){
        this.setState({
            editData : {
                _id: post._id,
                title : post.title,
                imgUrl : post.imgUrl,
                date : post.date,
                description : post.description
            },
            modalMsg: ''
        })
    }

    onHandleChange(e :any){
        this.setState(preState => ({
            editData : {
                ...preState.editData,
                [e.target.name] : e.target.value
            }
        }))
    }

    onSubmit(id: any){
        this.setState({loading : true, submitted: true})
        axios.patch('http://localhost:8080/post/' + id, {
            title: this.state.editData.title,
            description: this.state.editData.description,
            date: this.state.editData.date,
            imgUrl: this.state.editData.imgUrl
        })
        .then((res: any) => {
            this.fetchAllData()
            this.setState({loading: false, modalMsg:'Post successfylly updated.'})
        })
        .catch((err: any) => {
            console.log(err)
        })
    }


    render() {
        return (
            <div className="container-fluid">

                {/* Posts */}

                {
                    this.state.postData.length > 0 ?
                        this.state.postData.map( (post, key) => { 
                            return (
                                <div key={key}>
                                    <div className="row">
                                        <div className="col-12">
                                            <img className="imgDiv" src={post.imgUrl} alt="" />
                                        </div>
                                    </div>    
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="description">
                                                <div className="jumbotron">
                                                    <p className="date mt-3">{post.date.split("T")[0]}</p>
                                                    <h3 className="display-6 mt-3">{post.title}</h3>   
                                                    <p> {post.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="btnDiv">
                                                <button className="btn btn-secondary" 
                                                        type="button" data-toggle="modal" 
                                                        data-target="#exampleModalCenter"
                                                        onClick={() => this.editCliked(post)}>
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                        <div className="col-6 mb-5">
                                            <div className="btnDiv">
                                                <button className="btn btn-danger" onClick={() => this.deletePost(post._id)} type="button">Delete</button>
                                            </div>
                                        </div>
                                    </div>  
                                </div>
                            ) 
                        }) 
                    : <h3>Create your first post</h3>
                }

                {/* Modal */}

                <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Edit your post</h5>
                            </div>
                            <div className="modal-body">
                                {
                                    this.state.submitted ?
                                    this.state.loading ? 
                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only"></span>
                                        </div>
                                    </div> :
                                    <p style={{textAlign: 'center'}}>{this.state.modalMsg}</p> : null
                                }
                            
                                <form>
                                    <div className="form-group">
                                        <label >Title</label>
                                        <input type="text" className="form-control" name="title" value={this.state.editData.title} onChange={this.onHandleChange} placeholder="Title" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label >Description</label>
                                        <textarea className="form-control" name="description" value={this.state.editData.description} onChange={this.onHandleChange} placeholder="Description" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label >Image URL</label>
                                        <input type="text" className="form-control" name="imgUrl" value={this.state.editData.imgUrl} onChange={this.onHandleChange} placeholder="Image URL" />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label >Date</label>
                                        <input type="text" className="form-control" name="date" value={this.state.editData.date.split("T")[0]} onChange={this.onHandleChange} placeholder="Date" />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={() => this.onSubmit(this.state.editData._id)} className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
        
}
