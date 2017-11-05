import React, { Component } from 'react';

//post-preview component
import PostPreview from './post-preview';
class PostContainer extends Component {
    state = {  }
    render() {
        return (
            <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <PostPreview />
                <hr />
                <PostPreview />
                <hr />
                <PostPreview />
                <hr />
                <div className="clearfix">
                  <a className="btn btn-primary float-right" href="#">Older Posts &rarr;</a>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default PostContainer;