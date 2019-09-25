import * as types from '../../actions/todoManagement/actionTypes';
import _ from 'lodash';

const initialState = {
    tasks: {
        byId: {},
        allIds: [],
    },
    taskOperationLoading: false,
    taskOperationError: null
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case types.TASKS_FETCHED:
            return { ...state, tasks: action.tasks, taskOperationLoading: false };
        case types.TASK_DELETION_SUCCESS:
            if (!action.taskId && !action.tasks) {
                return {...state, taskOperationLoading: false };
            }

            const newById = Object.entries(state.tasks.byId).reduce((object, entry) => {
                if (action.taskId) {
                    // for a singular task 
                    if (entry[0] != action.taskId) {
                        object[entry[0]] = entry[1];
                    }
                } else {
                    // for more than one task (i.e. batch delete)
                    if (!_.includes(action.tasks, entry[0])) {
                        object[entry[0]] = entry[1];
                    }
                }

                return object
            }, {});

            const newAllIds = action.tasks ? state.tasks.allIds.filter(task => task != action.taskId) : state.tasks.allIds.filter(task => !_.includes(action.tasks, task));

            return { ...state, tasks: { byId: newById, allIds: newAllIds }, taskOperationLoading: false };
        case types.TASK_OPERATION_ERROR:
            return { ...state, taskOperationError: action.error, taskOperationLoading: false };
        case types.TASK_MODIFIED:
            if (action.task) {
                const editedTask = { ...state.tasks.byId[action.task.id] };
                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        byId: { ...state.tasks.byId, [action.task.id]: { ...editedTask, ...action.task } }
                    },
                    taskOperationLoading: false
                }

            } else {
                if (action.tasks.length == 0) {
                    return {...state, taskOperationLoading: false};
                }
                const editedTasks = action.tasks.reduce((object, taskId) => {
                    object[taskId] = { ...state.tasks.byId[taskId], listId: '' };
                    return object
                }, {});

                return {
                    ...state,
                    tasks: {
                        ...state.tasks,
                        byId: { ...state.tasks.byId, ...editedTasks }
                    },
                    taskOperationLoading: false
                }
            }
        case types.TASK_ADDED:
            return {
                ...state,
                tasks: {
                    byId: { ...state.tasks.byId, [action.task.id]: action.task }, allIds: [...state.tasks.allIds, action.task.id]
                },
                taskOperationLoading: false
            }
        case types.TASK_OPERATION_LOADING:
            return {
                ...state,
                taskOperationLoading: true
            }
        case types.ERROR_ACKNOWLEDGED:
            return {
                ...state,
                taskOperationError: null
            };
        default:
            return state;
    }
};

export default tasks;