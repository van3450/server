import React from 'react';
import {connect} from 'react-redux';
import { setForm } from '../../actions/forms.js';
import MainMenu from './MainMenu.jsx';
import Loader from '../Loader.jsx';
import * as all from '../../source/customize.js';

const styleEnter ={
    height: '360px', 
    width: '435px', 
    padding: 0, 
    right: '50px',
    top: '200px',
    position: 'absolute'
}

const styleTitle = {
    color:'#ffdf29', 
    fontSize:'35px', 
    marginBottom: '20px',
    textAlign: 'center'
}

class Gender extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: this.props.error,
            indEnter: 0
        }
        this.refEnter = []
    }

    componentDidMount(){
        if(!this.state.error) {
            this.refEnter[0].focus();
            this.refForm.style.filter = `none`
        } else {
            this.refForm.style.filter = `blur(2px)`
        }
    }

    componentDidUpdate(prevState, prevProps) {
        if(!this.state.error) {
            this.refEnter[this.state.indEnter].focus();
            this.refForm.style.filter = `none`
        } else {
            this.refForm.style.filter = `blur(2px)`
        }
    }

    click(event) {
        event.preventDefault();
        this.setState({error: undefined})
    }

    handleChangeInput(event) {
        const { indEnter } = this.state;
        this.refEnter[this.state.indEnter].style.borderColor = '#ffdf29'
        let code = event.keyCode;
        switch(code) {
            case 40:
            case 13:
                event.preventDefault();
                this.setState({indEnter: indEnter + 1})
                break;
            case 38:
                if(indEnter !== 0) {
                    this.setState({indEnter: indEnter - 1})
                }
                break;
            case 27:
                this.props.setForm(<MainMenu />);
                break;
        }
    }

    keyEnter(event) {
        const {indEnter} = this.state;
        event.preventDefault();
        let code = event.keyCode;
        let name = event.target.name;

        switch(code) {
            case 40:
                if(indEnter != this.refEnter.length - 1){
                    this.setState({indEnter: indEnter + 1})
                }
                break;
            case 38:
                if(indEnter != 0){
                    this.setState({indEnter: indEnter - 1})
                }
                break;
            case 13:
                if(name === 'Назад') {
                    mp.trigger('charCreatorBack.client');
                    this.props.setForm(<MainMenu />);
                } else if(name === 'Принять'){
                    if(this.validateName() && this.validateSur()) {
                        let firstName = String(this.refEnter[0].value);
                        let surName = String(this.refEnter[1].value);
                        mp.trigger('setNick.client', firstName, surName)
                        this.props.setForm(<Loader position='center' size='large' />)
                    }  
                    if(!this.validateName()){
                        this.refEnter[0].style.borderColor = 'red';
                        this.setState({indEnter: 0})
                    }  
                    if(!this.validateSur()) {
                        this.refEnter[1].style.borderColor = 'red';
                        this.setState({indEnter: 1})
                    }
                }
                break;
            case 27:
                mp.trigger('charCreatorBack.client');
                this.props.setForm(<MainMenu />);
                break;
        }
    }

    validateName() {
        let name = String(this.refEnter[0].value);
        let reg = /[a-zA-Z]/
        if(name) {
            if(name.length >= 2) {
                let h = true;
                for(let i = 0; i < name.length; i++) {
                    if(!reg.test(name[i])) {
                        h = false;
                    }
                }
                if(h) {
                    return true;
                } else {
                    this.setState({error: 'Имя должно состоять из английских букв'})
                    return false;
                }
            } else {
                this.setState({error: 'Имя должно быть не короче 2-х символов'})
                return false;
            }
        } else {
            this.setState({error: 'Имя не заполнено'})
            return false;
        }
    }

    validateSur() {
        let sur = String(this.refEnter[1].value);
        let reg = /[a-zA-Z]/
        if(sur) {
            if(sur.length >= 2) {
                let h = true;
                for(let i = 0; i < sur.length; i++) {
                    if(!reg.test(sur[i])) {
                        h = false;
                    }
                }
                if(h) {
                    return true;
                } else {
                    this.setState({error: 'Фамилия должна состоять из английских букв'})
                    return false;
                }
            } else {
                this.setState({error: 'Фамилия должна быть не короче 2-х символов'})
                return false;
            }
        } else {
            this.setState({error: 'Фамилия не заполнена'})
            return false;
        }
    }

    getForm() {
        return(
            <form className="form-shop" style={styleEnter} ref={(form) => {this.refForm = form}}>
                <div style={styleTitle}>Имя персонажа</div>
                <input 
                    ref={(input) => {this.refEnter[0] = input}} 
                    id='inpName'
                    type="text" 
                    name="Имя" 
                    maxLength="12"
                    placeholder="Имя" 
                    tabIndex='0'
                    style={{
                        margin: '30px 0 0 30px',
                        width: '83%'
                    }} 
                    onKeyDown={this.handleChangeInput.bind(this)}
                />
                <input 
                    ref={(input) => {this.refEnter[1] = input}} 
                    id='inpFam'
                    type="text" 
                    name="Фамилия" 
                    maxLength="12"
                    placeholder="Фамилия" 
                    tabIndex='1'
                    style={{
                        margin: '30px 0 30px 30px',
                        width: '83%'
                    }} 
                    onKeyDown={this.handleChangeInput.bind(this)}
                />
                <button
                    name='Принять'
                    id='butCust' 
                    tabIndex='2'
                    ref={(button) => {this.refEnter[2] = button;}}
                    onKeyDown={this.keyEnter.bind(this)}
                    style={{textAlign: 'center'}}
                >
                    Принять
                </button>

                <button 
                    name='Назад'
                    id='butCust'
                    tabIndex='3' 
                    ref={(button) => {this.refEnter[3] = button;}}
                    onKeyDown={this.keyEnter.bind(this)}
                    style={{textAlign: 'center'}}
                >
                    Назад
                </button>              
            </form>
        )
    }

    getError() {
        if(this.state.error) {
            return(
                <form 
                    className='textBlock' 
                    onKeyDown={this.click.bind(this)} 
                    ref={c => (this.form = c)}
                    style={{height: '230px', top: '270px', textAlign: 'center', right: '115px'}}
                >
                    <div style={{color: 'white', textAlign: 'center', margin: '20px 0 20px 0'}}><span>{this.state.error}</span></div>
                    <span style={{color: '#ffdf29', marginBottom: '20px'}}>
                            Нажмите любую кнопку для продолжения
                    </span>
                    <img src={require('../../../source_icons/houses/err.png')} style={{height: '40px', width: '40px', marginTop: '25px', display: 'block', position: 'absolute', left: 0, right: 0, marginLeft: 'auto', marginRight: 'auto'}}></img>
                    <button autoFocus='true' style={{backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute'}}></button>
                </form>
            )
        }
    }

    clearData() {
        all.indexes.length = 0
        all.refs.length = 0
        all.starts.length = 0
        all.values.length = 0
        all.arrays.length = 0
        all.arrs.length = 0
        all.inds.length = 0
        all.cols.length = 0
        all.refCols.length = 0
        all.startSkin.length = 0
    }

    render(){
        return(
            <div className='shop-dark'>
                {this.getForm()}
                {this.getError()}
                <div className='blockButtonsHelp'>
                    <div className='helpButtons' style={{marginTop: '10px'}}>
                        <img src={require('../../../source_icons/icons/strelki.png')} className='strelki'></img>
                        Навигация по меню
                    </div>
                    <div className='helpButtons'>
                        <div className='test'><div className='butHelpPanel' style={{width: '27px', height: '27px', paddingTop: '3px'}}>A</div></div>
                        <div className='test' style={{marginLeft: '10px'}}><div className='butHelpPanel' style={{width: '27px', height: '27px', paddingTop: '3px'}}>D</div></div>
                        <div style={{display: 'block', marginTop: '5px'}}>Поворот тела</div>
                    </div>
                    <div className='helpButtons'>
                        <div className='butHelpPanel' style={{width: '60px', height: '27px', paddingTop: '3px'}}>Enter</div>
                        <div style={{display: 'block', marginTop: '5px'}}>Выбрать</div>
                    </div>
                    <div className='helpButtons'>
                        <div className='butHelpPanel' style={{width: '40px', height: '27px', paddingTop: '3px'}}>Esc</div>
                        <div style={{display: 'block', marginTop: '5px'}}>Назад</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    forms: state.forms
});

const mapDispatchToProps = dispatch => ({
    setForm: form => dispatch(setForm(form))
})

export default connect(mapStateToProps, mapDispatchToProps)(Gender)
