import React from 'react';
import { connect } from 'react-redux';
import { addFormToCloth, closeFormToCloth } from '../../actions/clothing.js';
import { addItemsToCloth, removeItemsToCloth } from '../../actions/itemsClothes.js';
import {lastItems} from '../../source/shop.js';
import Item from './Item.jsx';

const styleForm = {
    height: '450px', 
    width: '435px', 
    padding: 0, 
    right: '60px',
    top: '25%'
}

const left = '213px';

class Shop extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isReady: true,
            start: this.props.position[0],
            colorSliderDown: undefined,
            colorSliderUp: undefined,
            title: undefined
        }
        this.getItems = this.getItems.bind(this)
    }

    componentDidUpdate(prevState, prevProps){
        if(this.props.forms.length == 1) {
            this.refForm.style.filter = `none`
        } else {
            this.refForm.style.filter = `blur(2px)`
        }
        this.changeColor();
    }

    changeColor(){
        const { colorSliderDown, colorSliderUp, start } = this.state;
        if(this.props.clothing.length - start > 5){
            if(colorSliderDown != '#ffdf29') {
                this.setState({colorSliderDown: '#ffdf29'});
            } 
        } else {
            if(colorSliderDown != '#49505a') {
                this.setState({colorSliderDown: '#49505a'})
            }
        }
        if(start == 0){
            if(colorSliderUp != '#49505a') {
                this.setState({colorSliderUp: '#49505a'});
            } 
        } else {
            if(colorSliderUp != '#ffdf29') {
                this.setState({colorSliderUp: '#ffdf29'})
            }
        }
    }
    
    showPartItems(block, index){
        const {clothing} = this.props;
        var start = this.state.start;
        var end;
        var maxInd = start + 5;

        if(clothing.length <= maxInd){
            end = clothing.length - 1;
            start = end - 4;
        } else {
            end = maxInd - 1;
        }

        if(index >= start  && index <= end){
            return(
                <div 
                    className="divBut" 
                    key={index} 
                >
                    {block}
                </div>
            );
        }
    }

    changeState(event){
        event.preventDefault();
        this.setState({isReady: true, start: 0})
    }

    back(event){
        event.preventDefault();
        this.setState({isReady: true, start: 0})
    }

    changeStartPosition(newStart){
        this.setState({start: newStart})
    }

    slideDown(){
        if(this.state.start < this.props.clothing.length - 5){
            this.setState(prevState => ({
                start: prevState.start + 1
            }));
        }
        this.getItems(this.props.items)
    }

    slideUp(){
        if(this.state.start > 0){
            this.setState(prevState => ({
                start: prevState.start - 1
            }));
        }
        this.getItems(this.props.items)
    }

    getFirst(items){  
        this.props.closeFormToCloth();
        this.setState({title: items.shop})
        if(this.props.itemsClothes.length == 0){
            this.props.addItemsToCloth(items);
        }
        for(let i = 0; i < items.categ.length; i++){
            this.props.addFormToCloth(
                <Item 
                    name='fir'
                    nameBut={items.categ[i]}
                    text={items.categ[i]}
                    index={i}
                    func={this.changeState.bind(this)}
                    position={this.changeStartPosition.bind(this)}
                    count={items.categ.length}
                    slideDown={this.slideDown.bind(this)}
                    slideUp={this.slideUp.bind(this)}
                    start={this.state.start}
                    icon={true}
                />
            );
        }
        this.props.addFormToCloth(
            <Item
                name='exit'
                text='Выход'
                index={items.categ.length}
                slideDown={this.slideDown.bind(this)}
                slideUp={this.slideUp.bind(this)}
                start={this.state.start}
            />
        );
        this.setState({isReady: false})
    }

    getSecond(items){
        this.props.closeFormToCloth();
        if(this.props.itemsClothes.length == 1){
            this.props.addItemsToCloth(items);
        }
        for(let i = 0; i < items.length; i++){
            this.props.addFormToCloth(
                <Item 
                    name='sec'
                    nameBut={items[i]}
                    text={items[i]}
                    index={i}
                    func={this.changeState.bind(this)}
                    position={this.changeStartPosition.bind(this)}
                    count={items.length}
                    slideDown={this.slideDown.bind(this)}
                    slideUp={this.slideUp.bind(this)}
                    start={this.state.start}
                    prev={this.back.bind(this)}
                />
            );
        }
        this.props.addFormToCloth(
            <Item
                name='back'
                text='Назад'
                index={items.length}
                slideDown={this.slideDown.bind(this)}
                slideUp={this.slideUp.bind(this)}
                start={this.state.start}
                prev={this.back.bind(this)}
            />
        );
        this.setState({isReady: false})
    }

    getThird(items){
        this.props.closeFormToCloth();
        if(this.props.itemsClothes.length == 2){
            this.props.addItemsToCloth(items);
        }
        for(let i = 0; i < items.length; i++){
            this.props.addFormToCloth(
                <Item 
                    name='third'
                    nameBut={items[i].name}
                    text={items[i].name}
                    price={items[i].price}
                    index={i}
                    position={this.changeStartPosition.bind(this)}
                    count={items.length}
                    slideDown={this.slideDown.bind(this)}
                    slideUp={this.slideUp.bind(this)}
                    start={this.state.start}
                    ind={items[i].index}
                    prev={this.back.bind(this)}
                />
            );
        }
        this.props.addFormToCloth(
            <Item
                name='back'
                text='Назад'
                index={items.length}
                slideDown={this.slideDown.bind(this)}
                slideUp={this.slideUp.bind(this)}
                prev={this.back.bind(this)}
            />
        );
        this.setState({isReady: false, isAdd: false})
    }

    getItems(items){
        switch(typeof items[0]){
            case 'undefined':
                this.getFirst(items);
                break;
            case 'string':
                this.getSecond(items);
                break;
            case 'object':
                this.getThird(items);
                break;
            default:
                break;
        }
    }

    getTitle(){
        let im;
        if(this.state.title){
            im = require(`../../../source_icons/clothes_shops/${this.state.title}.png`)
        } else if(this.props.items.shop){
            im = require(`../../../source_icons/clothes_shops/${this.props.items.shop}.png`)
        }
        else if(this.props.itemsClothes[0].shop){
            im = require(`../../../source_icons/clothes_shops/${this.props.itemsClothes[0].shop}.png`)
        }
        return(
            <img className='shop-logo' src={im}></img>
        )
    }

    getForm(items){
        const {clothing} = this.props;
        lastItems[0] = this.props.items;
        this.state.isReady && this.getItems(items)
        return(      
            <div className="shop-dark">
                <form className="form-shop" style={styleForm} ref={(form) => {this.refForm = form}} >
                    <div className="shop-ill" style={{marginBottom: '20px'}}>
                            {this.getTitle()}
                    </div>
                    <div className='slideUp' style={{
                        borderBottomColor: this.state.colorSliderUp,
                        left: left
                        }}></div>
                    <div className="form-group-shop">
                        {clothing.map(this.showPartItems.bind(this))}
                    </div>
                    <div className='slideDown' style={{
                        borderTopColor: this.state.colorSliderDown,
                        left: left
                        }}></div>
                </form>
            </div>
        );
    }

    render(){
        return(
            this.getForm(this.props.items)
        )
    }
}

const mapStateToProps = state => ({
    clothing: state.clothing,
    itemsClothes: state.itemsClothes,
    position: state.position,
    focus: state.focus,
    forms: state.forms
});

const mapDispatchToProps = dispatch => ({
    addFormToCloth: form => dispatch(addFormToCloth(form)),
    addItemsToCloth: items => dispatch(addItemsToCloth(items)),
    closeFormToCloth: () => dispatch(closeFormToCloth()),
    removeItems: () => dispatch(removeItemsToCloth())
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)