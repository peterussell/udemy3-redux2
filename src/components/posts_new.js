import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

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
     eg. onChange={field.input.onChange}, onFocus={field.input.onFocus} etc. */
  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      </div>
    )
  }

  /* Any arbitrary properties added to a Field component are automatically
     attached to the argument passed into renderField (called 'field' by
     convention). */
  render() {
    return (
      <form>
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
})(PostsNew);
