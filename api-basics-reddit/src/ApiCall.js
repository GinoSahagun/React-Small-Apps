import React, { Component } from 'react';
import axios from 'axios';
class ApiCall extends Component {
    constructor (props){
        super(props);

        this.state = {
         posts: [],
         subr: 'space',

        };
        this.getReddit = this.getReddit.bind(this);
    }
    getReddit () {
        axios.get(`https://www.reddit.com/.json`)
        .then(res => {
            const posts = res.data.data.children.map(obj => obj.data);
            this.setState({posts});
        })
        .catch(err => {
           console.log(err.message); 
        });
    }
    componentWillMount() {
        this.getReddit();

    }
    render() {
        return (
            <div>
                <h1>{`/r/${this.state.subr}`}</h1>
                <ul>
                    {this.state.posts.map(post => 
                    <li key ={post.id} >{post.title}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default ApiCall;