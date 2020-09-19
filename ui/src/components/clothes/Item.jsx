import React from 'react';
import { connect } from 'react-redux';
import { changeFocus } from '../../actions/focus.js';
import {closeFormToCloth } from '../../actions/clothing.js';
import { setForm, addForm, closeForm } from '../../actions/forms.js';
import { removeItemsToCloth} from '../../actions/itemsClothes.js';
import Shop from './Shop.jsx';
import Loader from '../Loader.jsx';
import { changePosition } from '../../actions/position.js';

class Item extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            colorPrice: 'white',
            colorIcon: 'white',
            start: 0,
            icon: 'body'
        }
        this.select = this.select.bind(this)
        this.back = this.back.bind(this)
    }

    componentDidMount(){
        const {focus, index} = this.props; 
        this.setImg(this.props.text);
        if(index == focus[0]){
            this.refBut.focus();
        }
    }

    componentDidUpdate(){
        const {focus, index} = this.props; 
        if(index == focus[0]){
            this.refBut.focus();
        } else {
            if(this.state.colorPrice != 'white'){
                this.setState({colorPrice: 'white'})
            }
        }
    }

    select(event){
        event.preventDefault();

        switch(this.props.name){
            case 'back':
                this.changeParams();
                this.back(event);
                break;
            case 'fir':
                this.changeParams();
                this.props.func(event);
                this.props.setForm(<Shop items={this.props.selectItems[0]} />)
                break;
            case 'sec':
                this.changeParams();
                this.props.func(event);
                this.props.setForm(<Shop items={this.props.selectItems[0]} />)
                break;
            case 'third':
                mp.trigger('clothesShopBuy.client', this.props.ind)
                this.props.addForm(<Loader position='50% 170px' size='small' />)
                break;
            case 'exit':
                mp.trigger('clothesShopExit.client');
                this.changeParams();
                this.props.closeForm();
                break;
        }
    }

    changeParams() {
        this.props.changeFocus(0);
        this.props.changePosition(0);
        this.props.closeFormToCloth();
    }

    back(event){
        event.preventDefault();
        this.props.changeFocus(0); 
        this.props.closeFormToCloth();  
        this.props.removeItems();
        if(this.props.itemsClothes.length === 0) {
            mp.trigger('clothesShopExit.client');
        }
        if(this.props.itemsClothes.length === 1){
            mp.trigger('clothesShopMainCategory.client')
        }
        this.props.closeForm();
        if(this.props.itemsClothes.length > 0){
            this.props.prev(event)
            this.props.setForm(<Shop items={this.props.itemsClothes[this.props.itemsClothes.length - 1]} />)
        }
    }

    keyUp(event) {
        event.preventDefault();
        if(this.props.forms.length === 1){
            let code = event.keyCode;
            switch(code) {
                case 27:
                    this.back(event)
                    break;
                default:
                    break;
            }
        }
    }

    keyDown(event){
        event.preventDefault();
        const { focus, position, forms } = this.props;
        let code = event.keyCode;
        if(forms.length === 1){
            if(this.state.colorIcon == 'black') {
                if(code == 38 && focus[0] != 0){
                    this.setState({colorIcon: 'white'})
                }
                if(code == 40 && focus[0] != this.props.clothing.length - 1) {
                    this.setState({colorIcon: 'white'})
                }
            }
            switch(code) {
                case 40: 
                    if(focus[0] != this.props.clothing.length - 1) {
                        this.props.changeFocus(focus[0] + 1);
                        if(focus[0] - position[0] == 4) {
                            this.props.changePosition(position[0] + 1);
                            this.props.slideDown();
                        }
                    }
                    break;
                case 38: 
                    if(focus[0] > position[0]) {
                        this.props.changeFocus(focus[0] - 1);
                        this.getButton();  
                    } else {
                        if(focus[0] > 0) {
                            this.props.changePosition(position[0] - 1)                        
                            this.props.changeFocus(focus[0] - 1)  
                            this.props.slideUp()
                        }
                    }
                    break;
                case 13:
                    this.select(event);
                    break;
                default:
                    break;
            }
        }
    }

    getContent(){
        const {price, icon} = this.props;
        if(price){
            return(
                <span className='spanPrice' style={{color: this.state.colorPrice}}>
                    {price}$
                </span>
            );
        } else if(icon) {
            let im = require(`../../../source_icons/icons/${this.state.icon}_${this.state.colorIcon}.svg`)
            return(
                <img className='iconBlock' src={im}></img>
            )
        }
    }

    setImg(icon){
        switch(icon){
            case 'Ноги':
                this.setState({icon: 'legs'});
                break;
            case 'Тело':
                this.setState({icon: `body`});
                break;
            case 'Обувь':
                this.setState({icon: `footwear`});
                break;
            case 'Сумки':
                this.setState({icon: `bags`});
                break;
            case 'Аксессуары':
                this.setState({icon: `accessories`});
                break;
            case 'Голова':
                this.setState({icon: `head`});
                break;
        }
    }

    focusButton(event){
        event.preventDefault();
        let nameButton = event.target.name;
        if(this.props.name == 'third'){
            mp.trigger('clothesShopShow.client', this.props.ind)
        } else if(this.props.name == 'fir'){
            mp.trigger('clothesShopChoiceCategory.client', nameButton)
        } else if(this.props.name == 'sec'){
            mp.trigger('clothesShopChoiceUndercategory.client', nameButton)
        }
        const { colorPrice, colorIcon} = this.state;
        if(colorPrice == 'white'){
            this.setState({colorPrice: 'black'})
        }
        if(colorIcon == 'white') {
            this.setState({colorIcon: 'black'})
        }
    }

    getButton(){
        return(      
            <button 
                id='but-shop'
                className="btn-block" 
                name={this.props.nameBut}
                ref={(button) => { this.refBut = button; }}
                onKeyDown={this.keyDown.bind(this)}
                onKeyUp={this.keyUp.bind(this)}
                onFocus={this.focusButton.bind(this)}
            >
                {this.props.text}
                {this.getContent()}
            </button>
        );
    }

    render(){
        return(this.getButton())
    }
}

const mapStateToProps = state => ({
    clothing: state.clothing,
    focus: state.focus,
    itemsClothes: state.itemsClothes,
    position: state.position,
    selectItems: state.selectItems,
    forms: state.forms
});

const mapDispatchToProps = dispatch => ({
    changeFocus: index => dispatch(changeFocus(index)),
    setForm: form => dispatch(setForm(form)),
    addForm: form => dispatch(addForm(form)),
    closeForm: () => dispatch(closeForm()),
    closeFormToCloth: () => dispatch(closeFormToCloth()),
    removeItems: () => dispatch(removeItemsToCloth()),
    changePosition: index => dispatch(changePosition(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(Item)