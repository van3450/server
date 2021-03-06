import React from 'react';
import Menu from './Menu.jsx';
import Loader from '../LoaderBank.jsx';
import { money } from '../../source/bank.js';

export default class PayPop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined
        }
    }

    clickNext(event) {
        event.preventDefault();
        const { bank } = this.props;
        event.preventDefault();
        let num = this.refNum.value;
        let reg = /[\d]/;
        if(num) {
            let h = true;
            for(let i = 0; i < num.length; i++) {
                if(!reg.test(num[i])) {
                    h = false;
                }
            }
            if(h) {
                num = Number(num);
                if(num < bank.money) {
                    money[0] = num;
                    this.props.addForm(<Loader position='42% 35%' size='small' />);
                    mp.trigger('popBank.client', num);
                    this.refNum.value = ''
                    this.setState({error: ''});
                } else {
                    this.setState({error: 'Недостаточно денег на счете'});
                    this.refNum.style.borderColor = 'red'
                    return;
                }
            } else {
                this.setState({error: 'Некорректное значение'});
                this.refNum.style.borderColor = 'red'
                return;
            }
        } else {
            this.setState({error: 'Поле не заполнено'});
            this.refNum.style.borderColor = 'red'
            return;
        }
    }

    back(event) {
        event.preventDefault();
        this.props.setPage(<Menu />)
    }

    render() {
        return (
            <div className='pageBank'>
                <div className='titlePageBank'>Снятие средств со счета</div>
                <div className='blockPayBank'>
                    <div>Введите сумму снятия</div>
                    <div className='inputPayBankBlock'>
                        <input type='text' ref={(input) => {this.refNum = input}} className='inputPayBank'></input>
                        <button onClick={this.clickNext.bind(this)} id='buttonPayBank'>OK</button>
                    </div>
                    <div>
                        <button onClick={this.back.bind(this)} id='buttonBackBank'>Назад</button>
                    </div>
                    <div style={{width: '100%', textAlign: 'center', color: 'red', marginTop: '10px'}}>
                        {this.state.error}
                    </div>
                </div>
            </div>
        )
    }
}