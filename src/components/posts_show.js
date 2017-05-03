import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  /* this.props.match.params.id is provided to us by React Router. Match is
     a top level object, and params is the object containing all wildcard
     matches, referenced by the name we provided in the Route component. */
  componentDidMount() {
    const { id } = this.props.match.params; // ES6 destructuring
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        >
          Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

/* ES6 destructuring, same as
   mapStateToProps(state) {
     const posts = state.posts;
   }

   ownProps (named this by convention) is a second arg to mapStateToProps
   that we haven't used before. It contains the props object that will be
   assigned to this component. Recall that mapStateToProps gets called
   whenever the state has changed and the Component is about to be
   rendered or re-rendered on the screen. This is the same as this.props
   inside the render() method.

   This lets us just return the single post we want to deal with.
   It's a much cleaner and reusable way -- this way the Component only
   deals with displaying the post it cares about. */
function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost})(PostsShow);
