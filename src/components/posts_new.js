import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions';

/* reduxForm is a function which is very similar to the connect() helper
   from react-redux. It allows our component to communicate with the
   additional form: reducer we've wired into reducers/index.js. */

/* Field's props:
    - name: name of the piece of state this Field will produce.
    - component: a function or another Component that will be used to display
                 the field. It's a function which returns some JSX to tell
                 us how to show the field. */
class PostsNew extends Component {
  /* The 'field' arg is a reference to the Field component we're being
     called from, and contains events that we need to wire up.

     {...field.input} - field.input contains a number of the input field
     event handlers, like onChange, onFocus, etc. (eg. field.input.onChange).
     This ES6 syntax is equivalent to writing them all out as props
     eg. onChange={field.input.onChange}, onFocus={field.input.onFocus} etc.

     field.meta.error is automatically added to our field object by our
     validation function. The names added to the 'errors' object are actually
     keys used by redux-form in this renderField. If the errors object has
     a property matching the 'title' of this field, then that error
     will get passed to this renderField message.

     Long story short, the key in the errors object must match the title
     of the field it should match.

     Showing validation errors: the field has three states:
      1. pristine
      2. touched
      3. invalid
     When the form loads, the validation will fail because the fields are
     empty. However, we don't want to show any error messages until the
     user has 'touched' the field (entered some input) and tabbed or clicked
     away. Therefore, we check for the 'touched' state *and* the presence
     of a validation error, otherwise don't show an error.

     const { meta: { touched, error } }
     This is ES6 called 'destructuring'. It pulls the 'meta' property off
     the 'field' object and assigns it to a meta const. It can also be used
     to pull sub-properties off the 'meta' object, which is the syntax
     meta: { touched, error } - it assigns these to consts 'touched and
     'error'. */
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    )
  }

  /* Because this Component is being rendered by React Router, we get passed
     a bunch of props by React Router which we can use for navigation. One
     of these is this.props.history, and push('/') automatically navigates
     back to the root route (/).

     However, we want to wait until createPost has got a successful response
     from the back-end API *before we redirect. To do this we pass a callback
     as the second arg to createPost. Then inside our Action Creator we can
     call the callback only once the API call has completed. */
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });

  }

  /* Any arbitrary properties added to a Field component are automatically
     attached to the argument passed into renderField (called 'field' by
     convention). In our case, we're doing this with the 'label' prop.

     onSubmit: recall that we've wired up this Component to ReduxForm in the
     same way that we've previously used connect. The result is we have
     additional props on this component, ie. this.props.
     One of those props is 'handleSubmit', which we get from redux-form.
     We pull this prop off this.props and assign it to handleSubmit (which
     is the ES6 used in the line at the top of render). We then pass this
     function (again, which was passed as a prop by redux-form) to be
     called by the onSubmit event handler.

     Finally, onSubmit requires two things to happen: redux-form to call its
     validation function, which is handleSubmit. Then, if that's successful
     we want handleSubmit to call *our* function which handles the submission
     of the form. This is the 'this.onSubmit.bind(this)' arg passed in to
     the handleSubmit function. It allows handleSubmit to call our 'onSubmit'
     function (above) if validation succeeds. Finally, we need to bind
     our onSubmit function to the context inside render so it gets the correct
     values, as it's being called from a different context (ie. it's getting
     called from inside handleSubmit, and would otherwise have that context
     bound to the call if we didn't bind the context inside render(),
     which is our Component). */
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link className="btn btn-danger" to="/">Cancel</Link>
      </form>
    );
  }
}

/* Validate recieves one arg which by convention we call 'values'. It's an
   object containing all the values submitted in the form, with their
   field name as the key.

   We return an object which we create, in order to communicate whether the
   validation succeeded, and any errors raised. If we return an empty object,
   then redux-form assumes validation succeeded. Otherwise redux-form assumes
   the form failed validation and it should not be submitted. */
function validate(values) {
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }

  if (!values.categories) {
    errors.categories = "Enter one or more categories";
  }

  if (!values.content) {
    errors.content = "Enter some content";
  }

  return errors;
}

/* In the case of connect, we pass in either mapStateToProps or
   mapDispatchToProps. In the case of reduxForm we pass in a function
   (object? video says function...) with a number of configuration options.

   The 'form:' property can be thought of as the name of the form. This is
   useful if we want to show multiple forms on a single page.

   Recall that in ES6 that if the key and value are the same we can just
   type the term once. ie. 'validate: validate' becomes just 'validate'. */
export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  connect(null, { createPost})(PostsNew)
);
