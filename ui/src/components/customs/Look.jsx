import React from 'react';
import { source, refs, values, indexes, starts, arrays, colors, indexesFemale, indexesMale } from '../../source/customize.js';
import { connect } from 'react-redux';
import { setForm } from '../../actions/forms.js';
import MainMenu from './MainMenu.jsx';

const styleForm = {
    height: '375px', 
    width: '435px', 
    padding: 0, 
    right: '50px',
    top: '200px',
    position: 'absolute'
}

const styleTitle = {
    color:'#ffdf29', 
    fontSize:'35px', 
    textAlign: 'center',
    marginBottom: '20px'
}

const left = '211px';

class Look extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            leng: undefined,
            styles: styleForm,
            index: 0,
            start: 0,
            colorUp: undefined,
            colorDown: undefined,
            colorLeft: undefined,
            colorRight: undefined,
            value: 0,
            min: undefined,
            max: undefined,
            sel: undefined,
            colorIndex: 0,
            startColor: 0,
            items: undefined,
            ind: 0,
            trigger: undefined
        }

        this.arr = []
        this.buttons = []
    }

    componentDidMount(){
        let leng;
        if(this.props.gender === 0) {
            leng = source.buttonsMale.length;
            for(let i = 0; i < leng; i++) {
                this.buttons[i] = source.buttonsMale[i]
            }
        } else {
            leng = source.buttonsFemale.length;
            for(let i = 0; i < leng; i++) {
                this.buttons[i] = source.buttonsFemale[i]
            }
        }
        this.setState({leng: leng});
        if(indexes.length == 0) {
            for(let i = 0; i < leng; i++) {
                indexes[i] = 0;
                starts[i] = 0;
                values[i] = 10;
            }
            for(let i = 0; i < source.hairMale.length; i++) {
                indexesMale[i] = i
            }
            indexesMale[source.hairMale.length - 2] = 72;
            indexesMale[source.hairMale.length - 1] = 73;
            for(let i = 0; i < source.hairFemale.length; i++) {
                indexesFemale[i] = i
            }
            indexesFemale[source.hairFemale.length - 2] = 76;
            indexesFemale[source.hairFemale.length - 1] = 77;
        }

        if(refs.length == 0) {
            for(let i = 0; i < leng; i++) {
                refs[i] = []
                for(let j = 0; j < leng; j++) {
                    refs[i][j] = null;
                }
            }
        }

        for(let i = 0; i < this.buttons.length; i++) {
            this.showPart(this.buttons[i], i);
        }

        if(this.arr[0]) {
            this.arr[0].focus();
        }
        this.changeColor();     
    }

    componentDidUpdate(prevState, prevProps){
        this.arr[this.state.index].focus();
        if(refs[this.state.index][this.state.colorIndex]) {
            refs[this.state.index][this.state.colorIndex].style.border = 'yellow 2px solid'
            for(let i = 0; i < refs[this.state.index].length; i++) {
                if(refs[this.state.index][i] && i != this.state.colorIndex) {
                    refs[this.state.index][i].style.border = 'black 1px solid'
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
        const { colorUp, colorDown, colorLeft, colorRight, start, startColor } = this.state;
        if(this.state.leng - start > 5){
            if(colorDown != '#ffdf29') {
                this.setState({colorDown: '#ffdf29'});
            } 
        } else {
            if(colorDown != '#49505a') {
                this.setState({colorDown: '#49505a'})
            }
        }
        if(start == 0){
            if(colorUp != '#49505a') {
                this.setState({colorUp: '#49505a'});
            } 
        } else {
            if(colorUp != '#ffdf29') {
                this.setState({colorUp: '#ffdf29'})
            }
        }

        if(this.state.sel === 'color') {
            if(this.state.items.length - startColor > 7){
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
    }

    select(name){
        const {index} = this.state;
        switch(name){
            case 'Прическа':
                if(this.props.gender === 0) {
                    arrays[this.state.index] = source.hairMale;
                    this.setState({sel: 'choose', items: source.hairMale, ind: indexes[this.state.index],
                    trigger: this.buttons[this.state.index].trigger});
                    mp.trigger(`${this.buttons[index].trigger}.client`, indexesMale[indexes[index]])
                } else {
                    this.setState({sel: 'choose', items: source.hairFemale, ind: indexes[this.state.index],
                    trigger: this.buttons[this.state.index].trigger});
                    arrays[this.state.index] = source.hairFemale
                    mp.trigger(`${this.buttons[index].trigger}.client`, indexesFemale[indexes[index]])
                }
                break;
            case 'Брови':
                this.setState({sel: 'choose', items: source.eyebrows, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.eyebrows    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Волосы на лице':
                this.setState({sel: 'choose', items: source.facialHair, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.facialHair    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Помада':
                this.setState({sel: 'choose', items: source.lipstick, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.lipstick    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Дефекты кожи':
                this.setState({sel: 'choose', items: source.blemishes, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.blemishes   
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Повреждение кожи':
                this.setState({sel: 'choose', items: source.sunDamage, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.sunDamage    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Волосы на теле':
                this.setState({sel: 'choose', items: source.chestHair, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.chestHair   
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index], true)
                break;
            case 'Родинки и веснушки':
                this.setState({sel: 'choose', items: source.freckles, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.freckles    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;
            case 'Старение кожи':
                this.setState({sel: 'choose', items: source.ageing, ind: indexes[this.state.index],
                trigger: this.buttons[this.state.index].trigger}) 
                arrays[this.state.index] = source.ageing    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;

            case 'Цвет волос':
            case 'Дополнительный цвет волос':
            case 'Цвет волос на лице':
            case 'Цвет бровей':
            case 'Цвет помады':
            case 'Цвет волос на теле':
                this.setState({sel: 'color', items: source.colorHair, colorIndex: indexes[this.state.index], 
                    startColor: starts[this.state.index], trigger: this.buttons[this.state.index].trigger})
                colors[this.state.index] = source.colorHair    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index]) 
                break;

            case 'Цвет глаз':
                this.setState({sel: 'color', items: source.eyeColors, colorIndex: indexes[this.state.index], 
                startColor: starts[this.state.index], trigger: this.buttons[this.state.index].trigger})
                colors[this.state.index] = source.eyeColors    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])   
                break;

            case 'Цвет помады':
                this.setState({sel: 'color', items: source.colorLip, colorIndex: indexes[this.state.index], 
                    startColor: starts[this.state.index], trigger: this.buttons[this.state.index].trigger})
                colors[this.state.index] = source.colorLip    
                mp.trigger(`${this.buttons[index].trigger}.client`, indexes[index])
                break;

            case 'Высота бровей':
            case 'Глубина бровей':
            case 'Размер глаз':
            case 'Глубина переносицы':
            case 'Высота расположения носа':
            case 'Ширина носа':
            case 'Длина кончика носа':
            case 'Высота кончика носа':
            case 'Ширина скул':
            case 'Глубина щек':
            case 'Сдвиг переносицы':
            case 'Толщина губ':
            case 'Ширина челюсти':
            case 'Высота подбородка':
            case 'Глубина подбородка':
            case 'Ширина подбородка':
            case 'Выступ подбородка':
            case 'Ширина шеи':
            case 'Высота кончика носа':
            case 'Ширина скул':
            case 'Форма челюсти':
                this.setState({sel: 'slider', min: 0, max: 20, value: values[this.state.index], 
                    trigger: this.buttons[this.state.index].trigger})
                    mp.trigger(`${this.buttons[index].trigger}.client`, values[index])
                break;

            case 'Назад':
                this.setState({sel: undefined})
                break;
        }
    }

    keyDown(event) {
        const {index, start, max, min, value, colorIndex, startColor, ind, sel} = this.state;
        event.preventDefault();
        let code = event.keyCode;
        let name = event.target.name;

        switch(code){
            case 40:
                if(this.arr[index + 1]) {
                    this.setState({index: index + 1, trigger: this.buttons[index + 1].trigger})
                } else if(index != this.buttons.length - 1){
                    this.setState({index: index + 1, start: start + 1, trigger: this.buttons[this.state.index + 1].trigger})      
                }
                break;
            case 38:
                if(index > start) {
                    this.setState({index: index - 1, trigger: this.buttons[this.state.index - 1].trigger})
                } else {
                    if(index > 0){
                        this.setState({index: index - 1, start: start - 1, trigger: this.buttons[this.state.index - 1].trigger}) 
                    }              
                }
                break;
            case 13:
                this.select(name)
                if(name == 'Назад'){
                    mp.trigger('headCreator.client', false)
                    this.props.setForm(<MainMenu />)
                }
                break;
            case 39:
                if(this.state.sel == 'slider') {
                    if(value < max) {
                        this.setState({value: value + 1})
                        values[index]++
                        mp.trigger(`${this.state.trigger}.client`, values[index])
                    }
                } else if(this.state.sel == 'color'){
                    if(refs[index][colorIndex + 1]) {
                        this.setState({colorIndex: colorIndex + 1})
                        indexes[index]++
                        mp.trigger(`${this.state.trigger}.client`, indexes[index])
                        refs[index][colorIndex].style.border = 'black 1px solid'
                    } else if(colorIndex != this.state.items.length - 1){
                        this.setState({colorIndex: colorIndex + 1, startColor: startColor + 1})  
                        indexes[index]++
                        mp.trigger(`${this.state.trigger}.client`, indexes[index])
                        starts[index]++
                        refs[index][colorIndex].style.border = 'black 1px solid'   
                    }
                } else if(this.state.sel == 'choose') {
                    if(ind < this.state.items.length - 1) {
                        this.setState({ind: ind + 1})
                        indexes[index]++
                        if(index === 0) {
                            if(this.props.gender === 1) {
                                mp.trigger(`${this.state.trigger}.client`, indexesFemale[indexes[index]])
                            } else {
                                mp.trigger(`${this.state.trigger}.client`, indexesMale[indexes[index]])
                            }
                        } else {
                            if(name !== 'Волосы на теле') {
                                mp.trigger(`${this.state.trigger}.client`, indexes[index])
                            } else {
                                mp.trigger(`${this.state.trigger}.client`, indexes[index], true)
                            }
                        }
                    }
                }
                break;
            case 37:
                if(this.state.sel == 'slider') {
                    if(value > min) {
                        this.setState({value: value - 1})
                        values[index]--
                        mp.trigger(`${this.state.trigger}.client`, values[index])
                    }
                } else if(this.state.sel == 'color'){
                    if(colorIndex > startColor) {
                        this.setState({colorIndex: colorIndex - 1})
                        indexes[index]--
                        mp.trigger(`${this.state.trigger}.client`, indexes[index])
                        refs[index][colorIndex].style.border = 'black 1px solid'
                    } else {
                        if(colorIndex > 0){
                            this.setState({colorIndex: colorIndex - 1, startColor: startColor - 1}) 
                            indexes[index]--
                            mp.trigger(`${this.state.trigger}.client`, indexes[index])
                            starts[index]--
                            refs[index][colorIndex].style.border = 'black 1px solid'
                        }              
                    }
                } else if(this.state.sel == 'choose') {
                    if(ind > 0) {
                        this.setState({ind: ind - 1})
                        indexes[index]--;
                        if(index === 0) {
                            if(this.props.gender === 1) {
                                mp.trigger(`${this.state.trigger}.client`, indexesFemale[indexes[index]])
                            } else {
                                mp.trigger(`${this.state.trigger}.client`, indexesMale[indexes[index]])
                            }
                        } else {
                            if(name !== 'Волосы на теле') {
                                mp.trigger(`${this.state.trigger}.client`, indexes[index])
                            } else {
                                mp.trigger(`${this.state.trigger}.client`, indexes[index], true)
                            }
                        }
                    }
                }
                break;
            case 27:
                this.props.setForm(<MainMenu />);
                mp.trigger('headCreator.client', false)
                break;
        }
    }

    getButtons(){
        return(
            this.buttons.map(this.showPart.bind(this))
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

        if(this.buttons.length <= maxInd){
            end = this.buttons.length - 1;
            start = end - 4;
        } else {
            end = maxInd - 1;
        }

        if(index >= start  && index <= end){
            switch(but.name) {
                case 'Высота бровей':
                case 'Глубина бровей':
                case 'Размер глаз':
                case 'Глубина переносицы':
                case 'Сдвиг переносицы':
                case 'Высота расположения носа':
                case 'Ширина носа':
                case 'Длина кончика носа':
                case 'Высота кончика носа':
                case 'Ширина скул':
                case 'Глубина щек':
                case 'Толщина губ':
                case 'Ширина челюсти':
                case 'Высота подбородка':
                case 'Глубина подбородка':
                case 'Ширина подбородка':
                case 'Выступ подбородка':
                case 'Ширина шеи':
                case 'Высота кончика носа':
                case 'Ширина скул':
                case 'Форма челюсти':
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
                case 'Прическа':
                case 'Брови':
                case 'Волосы на лице':
                case 'Румяна':
                case 'Помада':
                case 'Дефекты кожи':
                case 'Повреждение кожи':
                case 'Волосы на теле':
                case 'Родинки и веснушки':
                case 'Старение кожи':
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
                case 'Цвет волос':
                case 'Дополнительный цвет волос':
                case 'Цвет волос на лице':
                case 'Цвет бровей':
                case 'Цвет глаз':
                case 'Цвет румян':
                case 'Цвет помады':
                case 'Цвет волос на теле':
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
                            key={index}
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
        if(colors[i] != null) {
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
                            backgroundColor: colors[i][indexes[i]],
                            marginTop: '0px'
                        }}
                    >
                    </div>
                </div>
            )
        }
    }

    getValue(i) {
        if(values[i] != null) {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '30px', 
                        display: 'inline', 
                        textAlign: 'right'
                    }}
                >
                    {values[i]}
                </div>
            )
        }
    }

    getItem(i) {
        if(arrays[i] != null) {
            return(
                <div 
                    style={{
                        position: 'absolute', 
                        right: '30px', 
                        display: 'inline', 
                        textAlign: 'right'
                    }}
                >
                    {arrays[i][indexes[i]]}
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
                    ref={(button) => {refs[this.state.index][index] = button;}}
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
                    <div className='containerSlider'>
                        <div className='sliderLookL'><span className='parentSpan'>{this.buttons[index].left}</span></div>
                        <input 
                            type='range' 
                            className='slider' 
                            min={min} 
                            max={max} 
                            value={value}
                            onChange={this.changeValue.bind(this)} 
                            ref={(slider) => {this.refSlider = slider;}}
                            style={{width: '240px', marginLeft: '-10px'}}
                        />
                        <div className='sliderLookR' style={{float: 'right'}}><span className='parentSpan' >{this.buttons[index].right}</span></div>
                    </div>
                )
            case 'color':               
                return(
                    <div className='containerSlider'>
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
                    <div className='containerSlider' style={{textAlign: 'center', paddingTop: '10px'}}>
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
                    <div style={styleTitle}>Внешность</div>
                    <div className='slideUp' 
                        style={{
                            borderBottomColor: this.state.colorUp, 
                            left: left, 
                        }}></div>
                    <div id='customButtons'>
                        {this.getButtons()}
                    </div>
                    <div className='slideDown' 
                        style={{
                            borderTopColor: this.state.colorDown,
                            left: left
                        }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Look)