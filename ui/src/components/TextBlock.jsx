import React from 'react';
import { connect } from 'react-redux';
import { closeForm, addForm } from '../actions/forms.js';

class TextBlock extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    click(event){
        event.preventDefault();
        this.props.closeForm()
    }

    componentDidMount() {
        this.form.focus();
    }

    render(){
        const {mes} = this.props;
        if(mes === 'Предмет успешно добавлен в инвентарь') {
            return(
                <form 
                    className='textBlock' 
                    onKeyDown={this.click.bind(this)} 
                    ref={c => (this.form = c)}
                    style={{height: '190px'}}
                >
                    <div>
                        <span>
                            {mes}<br></br>
                            <div style={{borderBottom: 'gray 1px solid', width: '100%', margin: '5px 0 5px 0'}}></div>
                            <span style={{color: 'yellow'}}>
                                Нажмите любую кнопку для продолжения
                            </span>
                        </span>
                    </div>
                    <img src={require('../../source_icons/houses/suc.png')} style={{height: '40px', width: '40px', marginTop: '15px'}}></img>
                    <button autoFocus='true' style={{backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute'}}></button>       
                </form>
            );
        } else if(mes === 'У Вас недостаточно средств для покупки') {
            return(
                <form 
                    className='textBlock' 
                    onKeyDown={this.click.bind(this)} 
                    ref={c => (this.form = c)}
                    style={{height: '190px'}}
                >
                    <div>
                        <span>
                            {mes}<br></br>
                            <div style={{borderBottom: 'gray 1px solid', width: '100%', margin: '5px 0 5px 0'}}></div>
                            <span style={{color: '#F0D941'}}>
                                Нажмите любую кнопку для продолжения
                            </span>
                        </span>
                    </div>
                    <img src={require('../../source_icons/houses/err.png')} style={{height: '40px', width: '40px', marginTop: '15px'}}></img>
                    <button autoFocus='true' style={{backgroundColor: 'transparent', outline: 'none', border: 'none', position: 'absolute'}}></button>       
                </form>
            );
        }
    }
}

const mapStateToProps = state => ({
    forms: state.forms,
    itemsClothes: state.itemsClothes
});

const mapDispatchToProps = dispatch => ({
    addForm: form => dispatch(addForm(form)),
    closeForm: () => dispatch(closeForm()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TextBlock)