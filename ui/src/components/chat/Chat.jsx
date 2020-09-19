import React from 'react';
import { connect } from 'react-redux';
import { changeOpacityChat, showChat } from '../../actions/chat.js';

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            cur: '',
            opacity: 1,
            type: 0,
            index: 0
        }
        this.words = [];
        this.history = [];

        this.sendMessage = this.sendMessage.bind(this);
        this.keyDownInput = this.keyDownInput.bind(this);
        this.keyUpInput = this.keyUpInput.bind(this);
        this.pastePrevMessage = this.pastePrevMessage.bind(this);
        this.pasteNextMessage = this.pasteNextMessage.bind(this);
    }

    componentDidUpdate() {
        const objDiv = this.refList;
        objDiv.scrollTop = objDiv.scrollHeight;
        if(this.props.chat.isFocus) {
            this.refList.style.overflowY = 'auto'
        } else {
            this.refList.style.overflowY = 'hidden'
        }
    }

    getType() {
        const { type } = this.state;

        switch (type) {
            case 0:
                return <span style={{color: '#ffffff'}} className='typeChat'>Сказать:</span>
            case 1:
                return <span style={{color: '#ffdfa8'}} className='typeChat'>Крикнуть:</span>
            case 2:
                return <span style={{color: '#33cc66'}} className='typeChat'>Рация:</span>
            case 3:
                return <span style={{color: '#c6c695'}} className='typeChat'>НонРП:</span>
            case 4:
                return <span style={{color: '#dd90ff'}} className='typeChat'>Действие:</span>
            case 5:
                return <span style={{color: '#82dbff'}} className='typeChat'>Пояснение:</span>
            case 6:
                return <span style={{color: '#ddff82'}} className='typeChat'>Попытка:</span>
        
            default:
                break;
        }
    }

    getFormatMessage(index, message) {
        let reg = /!{#\w+}/g
        let regCol = /#\w+/g
        let arrayColors = []
        let oneReg;
        var arrayText = message.split(reg);
        while ((oneReg = reg.exec(message)) != null) {
            arrayColors.push(oneReg)
        }    

        for(let i = 0; i < arrayColors.length; i++) {
            arrayColors[i] = arrayColors[i][0].match(regCol)[0];
        }

        for(let i = 0; i < this.props.chat.messages.length; i++) {
            this.words[i] = []
            for(let j = 0; j < arrayText.length; j++) {
                this.words[i][j] = null;
            }
        }

        this.words[index][0] = (<span style={{color: `${arrayColors[0]}`}} className='wordChat'>{arrayText[0]}</span>)
        for(let i = 1; i < arrayText.length; i++) {
            this.words[index][i] = (<span style={{color: `${arrayColors[i - 1]}`}} className='wordChat'>{arrayText[i]}</span>)
        }
    }

    getMessage(index, message) {
        {this.getFormatMessage(index, message)}
        return (
            <div key={index} className='messageChat'>
                {this.words[index].map((word, index) => <span key={index}>{word}</span>)}
            </div>
        )
    }

    sendMessage(event) {
        event.preventDefault();
        let message = this.refInput.value;
        this.props.showChat(false);
        this.props.changeOpacityChat(this.state.opacity)
        mp.trigger('closeChat.client');
        if(message && message.length <= 100) {
            this.history.push(message);
            this.setState({index: this.history.length})
            mp.trigger('getChatMessage.client', this.state.type, message)
            this.refInput.value = ''
        }
    }

    pastePrevMessage() {
        const { index } = this.state;

        if(index > 0) {
            if(index == this.history.length) {
                this.setState({cur: this.refInput.value})
            }
            this.refInput.value = this.history[index - 1]
            this.setState({index: index - 1})
        }
    }

    pasteNextMessage() {
        const { index } = this.state;
        if(index < this.history.length - 1) {
            this.refInput.value = this.history[index + 1]
            this.setState({index: index + 1})
        } else if(index == this.history.length - 1){
            this.setState({index: index + 1})
            this.refInput.value = this.state.cur;
        }
    }

    changeType() {
        const { type } = this.state;
        if(type < 6) {
            this.setState({type: type + 1});
        } else {
            this.setState({type: 0})
        }
    }

    keyDownInput(event) {
        let code = event.keyCode;
        switch (code) {
            case 13:
                this.sendMessage(event)
                break;
            case 38:
                event.preventDefault()
                this.pastePrevMessage()
                break;
            case 40:
                event.preventDefault()
                this.pasteNextMessage()
                break;
            case 9:
                event.preventDefault();
                this.changeType();
                break;
        }
    }

    keyUpInput(event) {
        event.preventDefault();
        let code = event.keyCode;
        if(code === 27) {
            this.props.showChat(false)
            this.props.changeOpacityChat(this.state.opacity)
            mp.trigger('closeChat.client');
        }
    }

    focusInput(event) {
        this.setState({opacity: this.props.chat.opacity})
        this.props.changeOpacityChat(1);
    }

    render() {
        const { chat } = this.props;
        return (
            <div className='formChat' style={{opacity: chat.opacity}}>
                <div className='messageListChat' ref={(list) => {this.refList = list}}>
                    {chat.messages.map((message, index) => (this.getMessage(index, message)))}
                </div>
                {chat.isFocus &&
                    <div className='fieldInputChat'>
                    <div className='typeBlockChat'>{this.getType()}</div>
                    <input 
                        type='text' 
                        ref={(input) => {this.refInput = input}} 
                        placeholder='Введите сообщение' 
                        className='inputChat'
                        onKeyDown={this.keyDownInput}
                        onKeyUp={this.keyUpInput}
                        maxLength='100'
                        onFocus={this.focusInput.bind(this)}
                        onBlur={() => {this.refInput.focus()}}
                        autoFocus={true}
                    >
                    </input>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    chat: state.chat
});

const mapDispatchToProps = dispatch => ({
    changeOpacityChat: opacity => dispatch(changeOpacityChat(opacity)),
    showChat: param => dispatch(showChat(param))
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat)