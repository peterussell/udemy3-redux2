import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../actions';

/* 'Link' is the React Router component used instead of an anchor tag, which
   allows us to change the components being displayed rather than actually
   navigating to a different URL. */

class PostsIndex extends Component {
  /* componentDidMount is a 'react lifecycle event'. It gets called
     automatically by react when the component is loaded into the DOM.
     This makes it a perfect place to go and fetch some data.

     A note on async operations: why load the data *after* the component
     has already been shown on the screen? Because the data fetch is async,
     even if we kicked off the data fetch call before the component loaded,
     the data would be fetched asynchronously, and React would automatically
     move on to displaying the component as soon as the request has kicked
     off.

     There's no capability to tell React "wait until this data has
     been loaded, then render the component", so we might as well load it
     when the component has already been loaded into the DOM.

     The corresponding lifecycle event would be 'componentWillMount', which
     gets called before the component is loaded into the DOM. */
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    /* Note: rendering an object, so we can't use the built in array 'map' -
       we can use lodash's version of map instead, which works with objects. */
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a Post
          </Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    )
  }
}

/* Previously we've been hooking up action creators using mapStateToProps,
   allowing the action creator to be used in the component.

   As a shortcut, we can pass the action creator itself (fetchPosts) to the
   second arg of connect. This second arg would be { fetchPosts: fetchPosts }.

   Therefore we can also use some ES6 to reduce { fetchPosts: fetchPosts } to
   just { fetchPosts } (works if the key and value have the same name).

   The reason we introduced the other method earlier is because there are times
   where you want to use a separate function, eg. if you want to do any
   computation on how the action creator gets called ahead of time. It also
   more clearly demonstrates how it works.

   In this case, connect still calls this function, just that connect is
   taking care of this for us. In general we'll use this new format, unless
   there's any need to explicitly call a function so we can operate on the
   value(s) beforehand, as we've done before.
*/

function mapStateToProps(state) {
  return { posts: state.posts };
}
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
