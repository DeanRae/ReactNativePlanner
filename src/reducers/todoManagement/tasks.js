import * as types from '../../actions/todoManagement/actionTypes';

const initialState = {
    tasks: {
        byId: {},
        allIds: []
    }
};

const tasks = (state = initialState, action) => {
    switch (action.type) {
        case types.TASKS_FETCHED:
            return { ...state, tasks: action.tasks, loading: false };
        case types.TASK_DELETION_SUCCESS:
            const newById = Object.keys(state.tasks.byId).reduce((object, key) => {
                if (key !== 'one') {
                    object[key] = state.tasks.byId[key]
                }
                return object
            }, {});

            return { ...state, tasks: { byId: newById, allIds: initialState.tasks.allIds.filter(task => task !== action.taskId) }, loading: false };
        case types.TASK_OPERATION_ERROR:
            return { ...state, error: action.error, loading: false };
        case types.TASK_MODIFIED:
            return {
                ...state,
                tasks: {
                    byId: { ...state.tasks.byId, [action.task.id]: action.task }, allIds: [...state.tasks.allIds]
                },
                loading: false
            }
        case types.TASK_ADDED:
            return {
                ...state,
                tasks: {
                    byId: { ...state.tasks.byId, [action.task.id]: action.task }, allIds: [...state.tasks.allIds, action.task.id]
                },
                loading: false
            }
        default:
            return state;
    }
};

export default tasks;