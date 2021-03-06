import React from 'react';
import myEventEmmiter from '../helpers/events.js';
import LogPage from '../components/LogPage.jsx';
import Logo from '../components/Logo.jsx';
import RegPage from '../components/RegPage.jsx';
import Shop from '../components/clothes/Shop.jsx';
import Notification from '../components/Notification.jsx';
import MainMenu from '../components/customs/MainMenu.jsx';
import HouseCart from '../components/houses/HouseCart.jsx';
import BusinessCard from '../components/businesses/BusinessCard.jsx';
import InCall from '../components/phone/InCall.jsx';
import Phone from '../components/phone/Phone.jsx';
import BankMain from '../components/bank/BankMain.jsx';
import ConfirmSell from '../components/phone/house/ConfirmSell.jsx';

export const PlayerEvents = (dispatch, getState) => {

    myEventEmmiter.on('showClientAuth', () => {
        dispatch({
            type: 'SET_FORM',
            payload: <Logo />
        });
    });

    myEventEmmiter.on('showClientRegister', () => {
        dispatch({
            type: 'SET_FORM',
            payload: <RegPage />
        });
    });

    myEventEmmiter.on('checkLoginForm', (param) => {
        dispatch({
            type: 'CHECK_LOG',
            payload: param
        });
    });

    myEventEmmiter.on('closeForm', () => {
        dispatch({
            type: 'CLOSE_FORM'
        })
    });

    myEventEmmiter.on('checkRegForm', (param) => {
        dispatch({
            type: 'CHECK_REG',
            payload: param
        });
    });

    myEventEmmiter.on('showClothingShop', (items) => {
        dispatch({
            type: 'SET_FORM',
            payload: <Shop items={items}/>
        });
    });

    myEventEmmiter.on('addItemsToCloth', (items) => {
        dispatch({
            type: 'ADD_ITEMS_SELECT',
            payload: items
        });
    });

    myEventEmmiter.on('addMessage', (param) => {
        dispatch({
            type: 'CHECK_CLOTHES',
            payload: param
        });
    });

    myEventEmmiter.on('addNotification', (text, type) => {
        dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
                textNot: text,
                typeNot: type,
                form: <Notification textNot={text} typeNot={type} />
            }
        });
    });

    myEventEmmiter.on('closeNotification', (type) => {
        dispatch({
            type: 'CLOSE_NOTIFICATION',
            payload: type
        });
    });

    myEventEmmiter.on('showCustomization', () => {
        dispatch({
            type: 'SET_FORM',
            payload: <MainMenu />
        });
    });

    myEventEmmiter.on('checkCustom', (ans) => {
        dispatch({
            type: 'CHECK_CUSTOM',
            payload: ans
        });
    });

    myEventEmmiter.on('showHouse', (house) => {
        dispatch({
            type: 'SET_FORM',
            payload: <HouseCart house={house}/>
        });
    });

    myEventEmmiter.on('checkHouse', (ans, house) => {
        dispatch({
            type: 'CHECK_HOUSE',
            payload: {
                ans: ans,
                house: house
            }
        });
    });

    myEventEmmiter.on('checkEnter', (ans) => {
        dispatch({
            type: 'CHECK_ENTER',
            payload: ans
        });
    });

    myEventEmmiter.on('checkGarage', (ans) => {
        dispatch({
            type: 'CHECK_GARAGE',
            payload: ans
        });
    });

    myEventEmmiter.on('showBiz', (biz) => {
        dispatch({
            type: 'SET_FORM',
            payload: <BusinessCard biz={biz}/>
        });
    });
    
    myEventEmmiter.on('checkBiz', (ans, biz) => {
        dispatch({
            type: 'CHECK_BIZ',
            payload: {
                ans: ans,
                biz: biz
            }
        });
    });

    myEventEmmiter.on('inCall', (number) => {
        dispatch({
            type: 'ADD_APP',
            payload: <InCall number={number} />
        });
    });

    myEventEmmiter.on('endCall', () => {
        dispatch({
            type: 'CLOSE_APP'
        });
    });

    myEventEmmiter.on('startCallAns', (ans) => {
        dispatch({
            type: 'CHANGE_STATUS',
            payload: ans
        });
    });

    myEventEmmiter.on('loadPhoneInfo', (info) => {
        dispatch({
            type: 'ADD_INFO_TO_PHONE',
            payload: info
        });
    });

    myEventEmmiter.on('showPhone', () => {
        dispatch({
            type: 'SET_FORM',
            payload: <Phone />
        });
    });

    myEventEmmiter.on('setMessagesList', (messagesList) => {
        dispatch({
            type: 'ADD_DIALOGS',
            payload: messagesList
        });
    });

    myEventEmmiter.on('setMessage', (message, number) => {
        dispatch({
            type: 'ADD_MESSAGE',
            payload: {
                number: number,
                text: message,
                isMine: false
            }
        });
    });

    myEventEmmiter.on('addInfoToBank', (info) => {
        dispatch({
            type: 'ADD_BANK_INFO',
            payload: info
        });
    });

    myEventEmmiter.on('bankShow', (bank) => {
        dispatch({
            type: 'SET_FORM',
            payload: <BankMain InfoBank={bank}/>
        });
    });

    myEventEmmiter.on('pushBankAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'push'}
        });
    });

    myEventEmmiter.on('popBankAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'pop'}
        });
    });

    myEventEmmiter.on('pushPhoneAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'phone'}
        });
    });

    myEventEmmiter.on('transferBankAskAns', (ans) => {
        dispatch({
            type: 'ANS_ASK_BANK',
            payload: ans
        });
    });

    myEventEmmiter.on('transferBankAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'transfer'}
        });
    });

    myEventEmmiter.on('pushHouseAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'house'}
        });
    });

    myEventEmmiter.on('pushBizAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'biz'}
        });
    });

    myEventEmmiter.on('pushCashBoxAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'cashbox_push'}
        });
    });

    myEventEmmiter.on('popCashBoxAns', (ans) => {
        dispatch({
            type: 'ANS_BANK',
            payload: {ans, type: 'cashbox_pop'}
        });
    });

    myEventEmmiter.on('addApp', (appName, info) => {
        dispatch({
            type: 'ADD_APP_TO_PHONE',
            payload: {appName, info}
        });
    });

    myEventEmmiter.on('deleteApp', (appName) => {
        dispatch({
            type: 'ADD_APP_TO_PHONE',
            payload: appName
        });
    });

    myEventEmmiter.on('pushChatMessage', (message) => {
        dispatch({
            type: 'ADD_MESSAGE_TO_CHAT',
            payload: message
        });
    });

    myEventEmmiter.on('showChat', (param) => {
        dispatch({
            type: 'SHOW_CHAT',
            payload: param
        });
    });

    myEventEmmiter.on('opacityChat', (opacity) => {
        dispatch({
            type: 'CHANGE_OPACITY_CHAT',
            payload: opacity
        });
    });

    myEventEmmiter.on('removeApp', (appName) => {
        dispatch({
            type: 'DELETE_APP',
            payload: appName
        });
    });

    myEventEmmiter.on('govSellHouseAns', (ans) => {
        dispatch({
            type: 'ANS_APP_HOUSE',
            payload: {ans, type: 'sell'}
        });
    });

    myEventEmmiter.on('sellHouseInfo', (nick, price) => {
        dispatch({
            type: 'SET_APP',
            payload: <ConfirmSell nick={nick} price={price} />
        });
    });

    myEventEmmiter.on('sellHouseAns', (ans) => {
        dispatch({
            type: 'ANS_APP_HOUSE',
            payload: {ans, type: 'sell'}
        });
    });
};




