import React from 'react';

class Notification extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            output: undefined
        }
    }

    getContent(){
        const {textNot} = this.props;

        let text = String(textNot);
        let s = '$';
        let index = text.indexOf(s);
        let img;
        if(index != -1){
            img = this.setSymbol(text[index + 1])
            let first = text.slice(0, index);
            let second = text.slice(index + 2, text.length);
            return(
                <div>{first} {img} {second}</div>
            )
        } else {
            return (
                <div>{text}</div>
            )
        }
    }

    setSymbol(symbol){
        return(<div className='classSymbol'>{symbol}</div>)
    }

    render(){
        const {textNot} = this.props;
        return(
            <form 
                className='notBlock' 
            >
                {this.getContent()}          
            </form>
        );
    }
}

export default Notification