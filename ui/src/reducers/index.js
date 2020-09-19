import { combineReducers } from 'redux';
import forms from './forms.js';
import clothing from './clothing.js';
import selectItems from './selectItems.js';
import itemsClothes from './itemsClothes.js';
import focus from './focus.js';
import position from './position.js';
import notifications from './notifications.js';
import phone from './phone.js';
import phoneInfo from './phoneInfo.js';
import dialogs from './dialogs.js';
import bank from './bank.js';
import bankPages from './bankPages.js';
import chat from './chat.js';

export default combineReducers({
    forms,
    selectItems,
    clothing,
    itemsClothes,
    focus,
    position,
    notifications,
    phone,
    phoneInfo,
    dialogs,
    bank,
    bankPages,
    chat
});