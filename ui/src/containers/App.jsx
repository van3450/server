import React from 'react';
import {connect} from 'react-redux';

import { setForm, addForm, closeForm } from '../actions/forms.js';
import UIconstructor from '../UIconstructor';

class App extends React.Component {
  render() {
    return(
      <div>
        <UIconstructor />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setForm: formName => dispatch(setForm(formName))
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App)