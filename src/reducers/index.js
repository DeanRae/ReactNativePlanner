import { combineReducers } from 'redux';

import auth from './user/auth';
import tasks from './todoManagement/tasks';

const rootReducer = combineReducers({
    auth,
    tasks
});

export default rootReducer;