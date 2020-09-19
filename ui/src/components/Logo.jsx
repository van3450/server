import React from 'react';
import {connect} from 'react-redux';
import { setForm, getLog } from '../actions/forms.js';

class Logo extends React.Component {

    componentDidMount() {
        this.props.getLog();
    }

    render() {
        return(         
            <img className='mainLogo' src={require('../../source_icons/icons/logo.png')}></img>
        )
    }
}

const mapStateToProps = state => ({
    forms: state.forms
});
  
const mapDispatchToProps = dispatch => ({
    setForm: formName => dispatch(setForm(formName)),
    getLog: () => dispatch(getLog()),
});
  
export default connect(
mapStateToProps, mapDispatchToProps
)(Logo)
