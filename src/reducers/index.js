import { combineReducers } from 'redux';

import auth from './user/auth';
import tasks from './todoManagement/tasks';
import taskLists from './todoManagement/tasksLists';

const rootReducer = combineReducers({
    auth,
    tasks,
    taskLists
});

export default rootReducer;