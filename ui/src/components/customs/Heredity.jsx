import React from 'react';
import {source, refCols, cols, inds, mothers, motherNames, fatherNames, fathers, arrs, startSkin, genderUser} from '../../source/customize.js';
import {connect} from 'react-redux';
import { setForm } from '../../actions/forms.js';
import MainMenu from './MainMenu.jsx';

const styleForm = {
    height: '320px', 
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

class Heredity extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            styles: styleForm,
            index: 0,
            start: 0,
            value: 50,
            min: undefined,
            max: undefined,
            sel: undefined,
            colorLeft: undefined,
            colorRight: undefined,
            startColor: 0,
            colorIndex: 0,
            startColor: 0,
            items: undefined,
            ind: 0,
            trigger: undefined
        }

        this.arr = []
    }

    componentDidMount(){
        if(inds.length == 0) {
            for(let i = 0; i < source.heredity.length; i++) {
                inds[i] = 0;
            }
            if(genderUser[0] === 'Мужской') {
                inds[2] = 100
            } else {
                inds[2] = 0
            }
            startSkin[0] = 0;
        }

        if(refCols.length == 0) {
            for(let i = 0; i < source.heredity.length; i++) {
                refCols[i] = null
            }
        }

        this.arr[0].focus();    
    }

    componentDidUpdate(prevState, prevProps){
        this.arr[this.state.index].focus();
        if(refCols[this.state.colorIndex]) {
            refCols[this.state.colorIndex].style.border = 'yellow 2px solid'
            for(let i = 0; i < refCols.length; i++) {
                if(refCols[i] && i != this.state.colorIndex) {
                    refCols[i].style.border = 'black 1px solid'
                }
            }
        }
        this.changeColor();
    }

    changeValue(event){
        event.preventDefault();
        this.setState({value: event.target.value})
    }

    changeColor(){
        const { colorLeft, colorRight, startColor } = this.state;

        if(source.skinColors.length - startColor > 7){
            if(colorRight != '#ffdf29') {
                this.setState({colorRight: '#ffdf29'});
            } 
        } else {
            if(colorRight != '#49505a') {
                this.setState({colorRight: '#49505a'})
            }
        }
        if(startColor == 0){
            if(colorLeft != '#49505a') {
                this.setState({colorLeft: '#49505a'});
            } 
        } else {
            if(colorLeft != '#ffdf29') {
                this.setState({colorLeft: '#ffdf29'})
            }
        }
    }

    select(name){
        const {index} = this.state
        switch(name){
            case 'Мать':
                this.setState({sel: 'choose', items: motherNames, ind: inds[this.state.index],
                trigger: source.heredity[this.state.index].trigger}) 
                arrs[this.state.index] = motherNames 
                mp.trigger(`${source.heredity[index].trigger}.client`, mothers[inds[index]]) 
                break;
            case 'Отец':
                this.setState({sel: 'choose', items: fatherNames, ind: inds[this.state.index],
                trigger: source.heredity[this.state.index].trigger}) 
                arrs[this.state.index] = fatherNames 
                mp.trigger(`${source.heredity[index].trigger}.client`, fathers[inds[index]])   
                break;

            case 'Цвет кожи':
                this.setState({sel: 'color', items: source.skinColors, colorIndex: inds[this.state.index], 
                    startColor: startSkin[0], trigger: source.heredity[this.state.index].trigger})
                cols[0] = source.skinColors      
                mp.trigger(`${source.heredity[index].trigger}.client`, source.skinIds[inds[index]])
                break;

            case 'Сходство':
                this.setState({sel: 'slider', min: 0, max: 100, value: inds[this.state.index], 
                    trigger: source.heredity[this.state.index].trigger})
                    mp.trigger(`${source.heredity[index].trigger}.client`, inds[index])
                break;
            
            case 'Назад':
                this.setState({sel: undefined})
        }
    }

    keyDown(event) {
        const {index, start, max, min, value, colorIndex, startColor, ind} = this.state;
        event.preventDefault();
        let code = event.keyCode;
        let name = event.target.name;

        switch(code){
            case 40:
                if(this.arr[index + 1]) {
                    this.setState({index: index + 1, trigger: source.heredity[index + 1].trigger})
                } else if(index != source.heredity.length - 1){
                    this.setState({index: index + 1, start: start + 1, trigger: source.heredity[index + 1].trigger})      
                }
                break;
            case 38:
                if(index > start) {
                    this.setState({index: index - 1, trigger: source.heredity[index - 1].trigger})
                } else {
                    if(index > 0){
                        this.setState({index: index - 1, start: start - 1, trigger: source.heredity[index - 1].trigger}) 
                    }              
                }
                break;
            case 13:
                this.select(name)
                if(name == 'Назад'){
                    this.props.setForm(<MainMenu />)
                }
                break;
            case 39:
                if(this.state.sel == 'slider') {
                    if(value < max) {
                        this.setState({value: value + 25})
                        inds[index] += 25;
                        mp.trigger(`${source.heredity[index].trigger}.client`, inds[index])
                    }
                } else if(this.state.sel == 'color'){
                    if(refCols[colorIndex + 1]) {
                        this.setState({colorIndex: colorIndex + 1})
                        inds[index]++
                        mp.trigger(`${source.heredity[index].trigger}.client`, source.skinIds[inds[index]])
                        refCols[colorIndex].style.border = 'black 1px solid'
                    } else if(colorIndex != this.state.items.length - 1){
                        this.setState({colorIndex: colorIndex + 1, startColor: startColor + 1})  
                        inds[index]++
                        mp.trigger(`${source.heredity[index].trigger}.client`, source.skinIds[inds[index]])
                        startSkin[0]++
                        refCols[colorIndex].style.border = 'black 1px solid'   
                    }
                } else if(this.state.sel == 'choose') {
                    if(ind < this.state.items.length - 1) {
                        this.setState({ind: ind + 1})
                        inds[index]++
                        if(index === 0) {
                            mp.trigger(`${source.heredity[index].trigger}.client`, mothers[inds[index]])
                        } else {
                            mp.trigger(`${source.heredity[index].trigger}.client`, fathers[inds[index]])
                        }
                    }
                }
                break;
            case 37:
                if(this.state.sel == 'slider') {
                    if(value > min) {
                        this.setState({value: value - 25})
                        inds[index] -=25;
                        mp.trigger(`${source.heredity[index].trigger}.client`, inds[index])
                    }
                } else if(this.state.sel == 'color'){
                    if(colorIndex > startColor) {
                        this.setState({colorIndex: colorIndex - 1})
                        inds[index]--
                        mp.trigger(`${source.heredity[index].trigger}.client`, source.skinIds[inds[index]])
                        refCols[colorIndex].style.border = 'black 1px solid'
                    } else {
                        if(colorIndex > 0){
                            this.setState({colorIndex: colorIndex - 1, startColor: startColor - 1}) 
                            inds[index]--
                            mp.trigger(`${source.heredity[index].trigger}.client`, source.skinIds[inds[index]])
                            startSkin[0]--
                            refCols[colorIndex].style.border = 'black 1px solid'
                        }              
                    }
                } else if(this.state.sel == 'choose') {
                    if(ind > 0) {
                        this.setState({ind: ind - 1})
                        inds[index]--
                        if(index === 0) {
                            mp.trigger(`${source.heredity[index].trigger}.client`, mothers[inds[index]])
                        } else {
                            mp.trigger(`${source.heredity[index].trigger}.client`, fathers[inds[index]])
                        }
                    }
                }
                break;
            case 27:
                this.props.setForm(<MainMenu />);
                break;
        }
    }

    getButtons(){
        return(
            source.heredity.map(this.showPart.bind(this))
        )
    }

    show(event) {
        event.preventDefault();
        let name = event.target.name;
        this.select(name)
    }

    showPart(but, index){
        var start = this.state.start;
        var end;
        var maxInd = start + 5;

        if(source.heredity.length <= maxInd){
            end = source.heredity.length - 1;
            start = end - 4;
        } else {
            end = maxInd - 1;
        }

        if(index >= start  && index <= end){
            switch(but.name) {
                case 'Сходство':
                    return(
                        <button 
                            key={index}
                            id='butCust'
                            name={but.name}
                            ref={(button) => {this.arr[index] = button;}}
                            onKeyDown={this.keyDown.bind(this)}
                            onFocus={this.show.bind(this)}
                        >
                            {but.name}
                            {this.getValue(index)}
                        </button>
                    )

                case 'Мать':
                case 'Отец':
                    return(
                        <button
                            key={index}
                            id='butCust'
                            name={but.name}
                            ref={(button) => {this.arr[index] = button;}}
                            onKeyDown={this.keyDown.bind(this)}
                            onFocus={this.show.bind(this)}
                        >
                            {but.name}
                            {this.getItem(index)}
                        </button>
                    )

                case 'Цвет кожи':
                    return(
                        <button
                            key={index} 
                            id='butCust'
                            name={but.name}
                            ref={(button) => {this.arr[index] = button;}}
                            onKeyDown={this.keyDown.bind(this)}
                            onFocus={this.show.bind(this)}
                        >
                            {but.name}
                            {this.getColor(index)}
                        </button>
                    )
                case 'Назад':
                    return(
                        <button 
                            id='butCust'
                            name={but.name}
                            ref={(button) => {this.arr[index] = button;}}
                            onKeyDown={this.keyDown.bind(this)}
                            onFocus={this.show.bind(this)}
                        >
                            {but.name}
                        </button>
                    )
            }
        }
    }

    getColor(i) {
        if(cols[0] != null) {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '20px', 
                        display: 'inline', 
                        textAlign: 'right',
                    }}
                >
                    <div 
                        className='colorBlock' 
                        key={i} 
                        tabIndex={i} 
                        style={{
                            backgroundColor: cols[0][inds[i]],
                            marginTop: '0px'
                        }}
                    >
                    </div>
                </div>
            )
        } else {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '20px', 
                        display: 'inline', 
                        textAlign: 'right',
                    }}
                >
                    <div 
                        className='colorBlock' 
                        key={i} 
                        tabIndex={i} 
                        style={{
                            backgroundColor: '#e0c2aa',
                            marginTop: '0px'
                        }}
                    >
                    </div>
                </div>
            )
        }
    }

    getValue(i) {
        if(inds[i] != null) {
            if(inds[i] === 50) {
                return(
                    <div 
                        style={{
                            position: 'absolute', 
                            right: '30px', 
                            display: 'inline', 
                            textAlign: 'right'
                        }}
                    >
                        {inds[i]}%
                    </div>
                )
            } else if(inds[i] > 50) {
                return(
                    <div 
                        style={{
                            position: 'absolute', 
                            right: '30px', 
                            display: 'inline', 
                            textAlign: 'right'
                        }}
                    >
                        {inds[i]}% с папой
                    </div>
                )
            } else {
                return(
                    <div 
                        style={{
                            position: 'absolute', 
                            right: '30px', 
                            display: 'inline', 
                            textAlign: 'right'
                        }}
                    >
                        {100 - inds[i]}% с мамой
                    </div>
                )
            }
        }
    }

    getItem(i) {
        if(arrs[i] != null) {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '30px', 
                        display: 'inline', 
                        textAlign: 'right'
                    }}
                >
                    {arrs[i][inds[i]]}
                </div>
            )
        } else {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '30px', 
                        display: 'inline', 
                        textAlign: 'right'
                    }}
                >
                    {fatherNames[0]}
                </div>
            )
        }
    }

    showPartColors(col, index){
        var start = this.state.startColor;
        var end;
        var maxInd = start + 7;

        if(this.state.items.length <= maxInd){
            end = this.state.items.length - 1;
            start = end - 6;
        } else {
            end = maxInd - 1;
        }

        if(index >= start  && index <= end){
            return(
                <div 
                    className='colorBlock' 
                    key={index} 
                    tabIndex={index} 
                    ref={(button) => {refCols[index] = button;}}
                    style={{
                        backgroundColor: col
                    }}
                >
                </div>
            );
        }
    }

    getSelector(type){
        const { min, max, value, items, index } = this.state;

        switch(type) {
            case 'slider':             
                return(
                    <div className='containerSlider' style={{top: '530px'}}>
                        <span className='parentSpan'>Мама</span>
                        <input 
                            type='range' 
                            className='slider' 
                            min={min} 
                            max={max} 
                            value={value}
                            onChange={this.changeValue.bind(this)} 
                            ref={(slider) => {this.refSlider = slider;}}
                            style={{width: '70%', left: '17px'}}
                        />
                        <span className='parentSpan' style={{float: 'right'}}>Папа</span>
                    </div>
                )
            case 'color':
                return(
                    <div className='containerSlider' style={{top: '530px'}}>
                        <div 
                            className='slideLeft' 
                            style={{
                                borderRightColor: this.state.colorLeft 
                            }}>
                        </div>
                        <div style={{marginLeft: '45px'}}>
                            {items.map(this.showPartColors.bind(this))}
                        </div>
                        <div 
                            className='slideRight' 
                            style={{
                                borderLeftColor: this.state.colorRight 
                            }}>
                        </div>
                    </div>
                )
            case 'choose':
                return(
                    <div className='containerSlider' style={{textAlign: 'center', paddingTop: '10px', top: '530px'}}>
                        <div className='leftItem'><span >{ items[this.state.ind - 1]}</span></div>
                        <div className='centerItem'><span >{ items[this.state.ind]}</span></div>
                        <div className='rightItem'><span>{ items[this.state.ind + 1]}</span></div>
                    </div>
                )
        }
    }

    render() {
        return(      
            <div className="shop-dark">
                <form className="form-shop" style={this.state.styles}>
                    <div style={styleTitle}>Наследственность</div>
                    <div id='customButtons'>
                        {this.getButtons()}
                    </div>
                </form>
                {this.getSelector(this.state.sel)}
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

export default connect(mapStateToProps, mapDispatchToProps)(Heredity)