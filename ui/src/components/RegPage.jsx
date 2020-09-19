import React from 'react';
import {connect} from 'react-redux';
import LogPage from './LogPage.jsx';
import Loader from './Loader.jsx'; 
import { setForm } from '../actions/forms.js';

const styleForm = {
    height: '650px',
    width: '480px', 
    padding: '40px'
}

class RegPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          login: undefined,
          password: undefined,
          email: undefined,
          repeat: undefined,
          error: this.props.error,
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
    }

    handleChangeInput(event) {
        if(event.target.name === 'email'){
            this.setState({email: event.target.value});
            this.emailInput.style.borderBottomColor = 'white';
        }
        if(event.target.name === 'login'){
            this.setState({login: event.target.value});
            this.logInput.style.borderBottomColor = 'white';
        }
        if(event.target.name === 'password'){
            this.setState({password: event.target.value});
            this.passInput.style.borderBottomColor = 'white';
        }
        if(event.target.name === 'repeat'){
            this.setState({repeat: event.target.value});
            this.repInput.style.borderBottomColor = 'white';
        }
    }

    validateEmail(email) {
        let strMail = String(email);
        var re = /\S+@\S+\.\S+/;
        if(email){
            if(!re.test(email)){
                this.setState({error: 'Некорректный e-mail'});
                this.emailInput.style.borderBottomColor = 'red';
                return false;
              }
              if(strMail.length > 100) {
                this.setState({error: 'Слишком длинный e-mail'});
                this.emailInput.style.borderBottomColor = 'red';
                return false;
            }
        } else {
            this.setState({error: 'Не все поля заполнены'});
            this.emailInput.style.borderBottomColor = 'red';
            return false;
        }
        this.emailInput.style.borderBottomColor = 'white';
        return true;
    }

    validateLogin(login) {
        let log = String(login);
        var re = /[^\w]/;
        var re2 = /[a-zA-Z]/;
        if(login) {
            if(log.length >= 6 && log.length <= 32) {
                if(!re.test(log)) {
                    if(re2.test(log)) {
                        this.setState({error: ''});
                        this.logInput.style.borderBottomColor = 'white';
                        return true;
                    } else {
                        this.setState({error: 'Логин должен содержать хотя бы одну букву'});
                        this.logInput.style.borderBottomColor = 'red';
                        return false;
                    }
                } else {
                    this.setState({error: 'Логин должен состоять из английских букв и цифр'});
                    this.logInput.style.borderBottomColor = 'red';
                    return false;
                }
            } else {
                this.setState({error: 'Логин должен быть 6-32 символа'});
                this.logInput.style.borderBottomColor = 'red';
                return false;
            }
        } else {
            this.setState({error: 'Не все поля заполнены'});
            this.logInput.style.borderBottomColor = 'red';
            return false;
        }
    }

    validatePassword(password, repeat) {
        var pass = String(password);
        var rep = String(rep);
        var re = /[^\w]/;
        var re2 = /[a-zA-Z]/;
        if(password && repeat) {
            if(pass.length >= 6 && pass.length <= 32) {
                if(!re.test(pass)) {
                    if(re2.test(pass)) {
                        if(password == repeat) {
                            this.setState({error: ''});
                            this.passInput.style.borderBottomColor = 'white';
                            this.repInput.style.borderBottomColor = 'white';
                            return true;
                        } else {
                            this.setState({error: 'Пароли не совпадают'});
                            this.passInput.style.borderBottomColor = 'red';
                            this.repInput.style.borderBottomColor = 'red';
                            return false;
                        }
                    } else {
                        this.setState({error: 'Пароль должен содержать хотя бы одну букву'});
                        this.passInput.style.borderBottomColor = 'red';
                        return false;
                    }
                } else {
                    this.setState({error: 'Пароль должен состоять из английских букв и цифр'});
                    this.passInput.style.borderBottomColor = 'red';
                    return false;
                }
            } else {
                this.setState({error: 'Пароль должен быть 6-32 символа'});
                this.passInput.style.borderBottomColor = 'red';
                return false;
            }
        } else {
            this.setState({error: 'Не все поля заполнены'});
            if(!password) {
                this.passInput.style.borderBottomColor = 'red';
            }
            if(!repeat) {
                this.repInput.style.borderBottomColor = 'red';
            }
            return false;
        }
    }

    createNewUser(event){
        event.preventDefault();

        if(this.validateEmail(this.state.email) && 
        this.validateLogin(this.state.login) && 
        this.validatePassword(this.state.password, this.state.repeat)) {
            mp.trigger('register.client', this.state.login, this.state.password, this.state.email);
            this.props.setForm(<Loader position='center' size='large'/>);
        }  
    }

    cancel(event){
        event.preventDefault();
        this.props.setForm(<LogPage />);
    }

    render() {
        console.log(this.state);
        return (
            <div className="login-dark">
                <form method="post" style={styleForm} autoComplete='off'>
                    <div className="illustration">
                        <div className='logo' style={{
                            width: '189px',
                            height: '100px'
                        }}></div>
                    </div>
                    <div className="form-group">
                        <input
                            ref={(input) => {this.emailInput = input}}
                            className="form-control" 
                            type="email" 
                            name="email" 
                            maxLength="50"
                            placeholder="E-mail" 
                            style={{
                                margin: '0 0 30px 0',
                            }} 
                            onChange={this.handleChangeInput}
                        />
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
                        <input 
                            ref={(input) => {this.repInput = input}}
                            className="form-control" 
                            type="password" 
                            name="repeat" 
                            maxLength="50"
                            placeholder="Повторите пароль" 
                            style={{
                                margin: '0 0 30px 0',
                            }} 
                            onChange={this.handleChangeInput}
                        />
                    </div>
                    <div className="form-group">
                        <button 
                            id='idBut'
                            className="btn btn-block" 
                            type="button" 
                            style={{margin: '35px 0 0 0'}}
                            onClick={this.createNewUser}>
                            Зарегистрироваться
                        </button>
                        <button 
                            id='idBut'
                            className="btn btn-block" 
                            type="button"
                            onClick={this.cancel.bind(this)}
                            style={{
                                backgroundColor: 'transparent', 
                                borderColor: '#ffdf29', 
                                borderStyle: 'solid',
                                borderRadius: '5px',
                                color: '#ffdf29'
                            }}
                            >
                            Отмена
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
    setForm: formName => dispatch(setForm(formName))
  });
  export default connect(
    mapStateToProps, mapDispatchToProps
  )(RegPage)