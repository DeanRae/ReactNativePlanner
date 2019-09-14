import * as types from '../../actions/todoManagement/actionTypes';

const initialState = {
    tasks: {
        byId: {},
        allIds: []
    },
    taskOperationLoading: false,
    taskOperationError: null
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case types.TASKS_FETCHED:
            return { ...state, tasks: action.tasks, taskOperationLoading: false };
        case types.TASK_DELETION_SUCCESS:
            const newById = Object.keys(state.tasks.byId).reduce((object, key) => {
                if (key !== action.taskId) {
                    object[key] = state.tasks.byId[key]
                }
                return object
            }, {});

            return { ...state, tasks: { byId: newById, allIds: initialState.tasks.allIds.filter(task => task !== action.taskId) }, taskOperationLoading: false };
        case types.TASK_OPERATION_ERROR:
            return { ...state, taskOperationError: action.error, taskOperationLoading: false };
        case types.TASK_MODIFIED:
            const editedTask = {...state.tasks.byId[action.task.id]};
            return {
                ...state,
                tasks: {
                    byId: { ...state.tasks.byId, [action.task.id]: {...editedTask, ...action.task} }, allIds: [...state.tasks.allIds]
                }, 
                taskOperationLoading: false
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