import React from 'react';
import {connect} from 'react-redux';
import RegPage from './RegPage.jsx';
import Loader from './Loader.jsx';
import { setForm, addForm, closeForm } from '../actions/forms.js';

const styleForm = {
    height: '530px', 
    width: '480px', 
    padding: '40px'
}

class LogPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          login: undefined,
          password: undefined,
          error: this.props.error,
          isDisabled: false
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.singIn = this.singIn.bind(this);
    }

    handleChangeInput(event) {
        if(event.target.name === 'login'){
            this.setState({login: event.target.value});
            this.logInput.style.borderBottomColor = 'white';
        }
        if(event.target.name === 'password'){
            this.setState({password: event.target.value});
            this.passInput.style.borderBottomColor = 'white';
        }
    }

    validateLogin(login) {
        if(login) {
            this.logInput.style.borderBottomColor = 'white';
            return true;
        } else 
            this.setState({error: 'Не все поля заполнены'});
            this.logInput.style.borderBottomColor = 'red';
            return false;
    }

    validatePassword(password) {
        if(password) {
            this.passInput.style.borderBottomColor = 'white';
            return true;
        } else 
            this.setState({error: 'Не все поля заполнены'});
            this.passInput.style.borderBottomColor = 'red';
            return false;
    }

    singIn(event){
        event.preventDefault();

        if(this.validateLogin(this.state.login) && this.validatePassword(this.state.password)){
            mp.trigger('login.client', this.state.login, this.state.password);
            this.props.setForm(<Loader position='center' size='large'/>);
        }
    }

    singUp(event){
        event.preventDefault();
        this.props.setForm(<RegPage />);
    }

    render() {
        console.log(this.state);
        return (
            <div className="login-dark">
                <form method="post" style={styleForm} autoComplete='off'>
                    <div className="illustration">
                        <img src={require('../../source_icons/icons/logo.png')} className='logo' style={{
                            width: '189px',
                            height: '100px',
                            // background: url('')
                        }}></img>
                    </div>
                    <div className="form-group">
                        <input 
                            ref={(input) => {this.logInput = input}} 
                            className="form-control" 
                            type="text" 
                            name="login" 
                            maxLength="50"
                            placeholder="Логин" 
                            style={{
                                margin: '0 0 30px 0',
                            }} 
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            ref={(input) => {this.passInput = input}} 
                            className="form-control" 
                            type="password" 
                            name="password" 
                            maxLength="50"
                            placeholder="Пароль" 
                            style={{
                                margin: '0 0 30px 0',
                            }} 
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <button
                            id='idBut'
                            className="btn btn-primary btn-block" 
                            type="button" 
                            style={{margin: '35px 0 0 0'}}
                            onClick={this.singIn}
                            >
                            Войти
                        </button>
                        <button 
                            id='idBut'
                            className="btn btn-primary btn-block" 
                            type="button"
                            onClick={this.singUp.bind(this)}
                            style={{
                                backgroundColor: 'transparent', 
                                borderColor: '#ffdf29', 
                                borderStyle: 'solid',
                                borderRadius: '5px',
                                color: '#ffdf29'
                            }}
                            >
                            Регистрация
                        </button>
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }} ><label>{this.state.error}</label></div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    forms: state.forms
  });
  
  const mapDispatchToProps = dispatch => ({
    setForm: formName => dispatch(setForm(formName)),
    addForm: formName => dispatch(addForm(formName)),
    closeForm: () => dispatch(closeForm())
  });
  
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(LogPage)