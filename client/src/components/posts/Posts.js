import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from './../common/Spinner'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import {getPosts} from "../../actions/postActions";

class Post extends Component {

  componentDidMount() {
    this.props.onGetPosts()
  }

  render() {
    const { posts, loading } = this.props.post
    let postContent
    if (posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    return(
      <div className='feed'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <PostForm/>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onGetPosts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

const mapDispatchToProps = dispatch => {
  return {
    ...getPosts(dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)