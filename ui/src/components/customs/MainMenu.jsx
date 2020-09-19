import React from 'react';
import {connect} from 'react-redux';
import { setForm, closeForm } from '../../actions/forms.js';
import Look from './Look.jsx';
import Gender from './Gender.jsx';
import Heredity from './Heredity.jsx';
import * as all from '../../source/customize.js';

const styleForm = {
    height: '350px', 
    width: '435px', 
    padding: 0, 
    right: '50px',
    top: '200px',
    position: 'absolute'
}

const styleTitle = {
    color:'#ffdf29', 
    fontSize:'35px', 
    textAlign: 'center'
}

class MainMenu extends React.Component {
    constructor(props){
        super(props);

        this.arr = []
        this.refEx = []

        this.state = {
            index: 0,
            exit: false,
            reset: false,
            indExit: 0,
            help: all.help[0],
            gender: all.genderUser[0]
        }
    }

    componentDidMount(){
        this.arr[0].focus();
    }

    componentDidUpdate(prevState, prevProps){
        if(this.state.exit) {
            this.refEx[this.state.indExit].focus()
        } else {
            this.arr[this.state.index].focus();
        }
    }

    select(name){
        switch(name){
            case 'Внешность':
                mp.trigger('headCreator.client', true)
                if(this.state.gender === 'Мужской') {
                    this.props.setForm(<Look gender={0}/>)
                } else {
                    this.props.setForm(<Look gender={1}/>)
                }
                break;
            case 'Наследственность':
                this.props.setForm(<Heredity />)
                break;
            case 'Пол':
                break;
            case 'Далее':
                mp.trigger('charCreatorContinue.client');
                this.props.setForm(<Gender />)
                break;
            case 'Сбросить':
                this.setState({exit: true, reset: true})
                break;
            case 'Выйти':
                this.setState({exit: true})
                break;
        }
    }

    callExit() {
        if(this.state.exit) {
            return(
                <div className='containerSlider' style={{top: '560px', height: '90px'}}>
                    <button
                        name='Нет'
                        id='butCust' 
                        ref={(button) => {this.refEx[0] = button;}}
                        onKeyDown={this.keyExit.bind(this)}
                    >
                        Нет
                    </button>

                    <button 
                        name='Да'
                        id='butCust' 
                        ref={(button) => {this.refEx[1] = button;}}
                        onKeyDown={this.keyExit.bind(this)}
                    >
                        Да
                    </button>
                </div>
            )
        }
    }

    keyExit(event) {
        event.preventDefault();
        let code = event.keyCode;
        let name = event.target.name;

        switch(code) {
            case 40:
                if(name === 'Нет'){
                    this.setState({indExit: 1})
                }
                break;
            case 38:
                if(name === 'Да'){
                    this.setState({indExit: 0})
                }
                break;
            case 13:
                if(name === 'Нет') {
                    this.setState({exit: false, reset: false});
                } else {
                    this.clearData();
                    all.genderUser[0] = 'Мужской'
                    this.setState({gender: 'Мужской'})
                    mp.trigger('charCreatorReset.client')
                    if(!this.state.reset) {
                        this.props.closeForm();
                        mp.trigger('charCreator.client', false)
                    }
                    this.setState({exit: false, reset: false});
                }
        }
    }

    keyDown(event) {
        const {index} = this.state;
        event.preventDefault();
        let code = event.keyCode;
        let name = event.target.name;
        this.setState({help: false})
        all.help[0] = false;
        if(!this.state.help) {
            switch(code){
                case 40:
                    if(index != this.arr.length - 1){
                        this.setState({index: index + 1})
                    }
                    break;
                case 38:
                    if(index != 0){
                        this.setState({index: index - 1})
                    }
                    break;
                case 37:
                case 39:
                    if(name === 'Пол') {
                        if(this.state.gender !== 'Женский') {
                            this.setState({gender: 'Женский'})
                            all.genderUser[0] = 'Женский'
                            mp.trigger('setGender.client', 1)
                            this.clearData();
                        } else {
                            this.setState({gender: 'Мужской'})
                            all.genderUser[0] = 'Мужской'
                            mp.trigger('setGender.client', 0)
                            this.clearData();
                        } 
                    }
                    break;
                case 13:
                    this.select(name)
                    break;
                case 27:
                    this.setState({exit: true})
            }
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

    getForm() {
        return(
            <form className="form-shop" style={styleForm}>
                <div style={styleTitle}>Главное меню</div>
                <div id='customButtons'>
                    <button 
                        key={0}
                        id='butCust' 
                        name='Пол'
                        ref={(button) => {this.arr[0] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                    Пол
                    <span style={{float: 'right', marginRight: '20px'}}>{this.state.gender}</span>
                    </button>

                    <button 
                        key={1}
                        id='butCust'
                        name='Наследственность' 
                        ref={(button) => {this.arr[1] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                        Наследственность
                    </button>

                    <button 
                        id='butCust' 
                        key={2}
                        name='Внешность'
                        ref={(button) => {this.arr[2] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                        Внешность
                    </button>

                    <button 
                        id='butCust'
                        key={3}
                        name='Далее' 
                        ref={(button) => {this.arr[3] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                        Сохранить и продолжить
                    </button>

                    <button 
                        id='butCust'
                        key={4}
                        name='Сбросить' 
                        ref={(button) => {this.arr[4] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                        Сбросить все изменения
                    </button>

                    <button 
                        id='butCust'
                        key={5}
                        name='Выйти' 
                        ref={(button) => {this.arr[5] = button;}}
                        onKeyDown={this.keyDown.bind(this)}
                    >
                        Выйти без сохранения
                    </button>
                </div>
            </form>
        )
    }

    showHelp() {
        if(this.state.help) {
            return(
                <div className='helpWindow'>
                    <div style={{position: 'absolute', right: '820px', bottom: '315px', textAlign: 'center'}}>Используйте <br/>подсказки</div>
                    <img src={require('../../../source_icons/icons/strel2.png')} className='helpStr'
                        style={{
                            position: 'absolute', bottom: '80px', right: '610px', height: '400px', overflow: 'hidden'
                        }}>
                    </img>
                </div>
            )
        }
    }

    render() {
        return(      
            <div className="shop-dark" ref={(form) => {this.refForm = form}}>
                {this.getForm()}
                {this.callExit(this.state.exit)}
                {this.showHelp()}
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
    setForm: form => dispatch(setForm(form)),
    closeForm: () => dispatch(closeForm())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)