import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PostItem from './PostItem'

class PostFeed extends Component {
  render() {
    const { posts } = this.props
    return posts.map(post => <PostItem key={post._id} post={post} />)
  }
}

PostFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps)(PostFeed)