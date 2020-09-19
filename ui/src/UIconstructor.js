import React from 'react';
import {connect} from 'react-redux';
import { addForm } from './actions/forms.js';
import Chat from './components/chat/Chat.jsx';


class UIconstructor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    getChat() {
        return (
            <Chat />
        )
    }

    getForms(){
        const { forms } = this.props;
        return(
            forms.map((block, index) => <div key={index*10}>{block}</div>)
        )
    }

    getNotes(){
        const { forms, notifications } = this.props;
        if(forms.length == 0){
            return(
                <div>{notifications[notifications.length - 1]}</div>
            )
        }
    }

    render() {
        const { forms, notifications } = this.props;
        return(  
            <div>
                {this.getChat()}
                {this.getForms()}
                {this.getNotes()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
  });
  
const mapDispatchToProps = dispatch => ({
    addForm: formName => dispatch(addForm(formName)),
  });

export default connect(
    mapStateToProps, mapDispatchToProps
  )(UIconstructor)
