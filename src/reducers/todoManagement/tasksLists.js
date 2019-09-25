import * as types from '../../actions/todoManagement/actionTypes';

const initialState = {
    taskLists: {
        byId: {},
        allIds: [],
    },
    listOperationLoading: false,
    listOperationError: null
};

const taskLists = (state = initialState, action) => {
    switch (action.type) {
        case types.LISTS_FETCHED:
            return { ...state, taskLists: action.lists, listOperationLoading: false };
        case types.LIST_DELETION_SUCCESS:
            const newById = Object.keys(state.taskLists.byId).reduce((object, key) => {
                if (key !== action.listId) {
                    object[key] = state.taskLists.byId[key]
                }
                return object
            }, {});

            return { ...state, taskLists: { byId: newById, allIds: state.taskLists.allIds.filter(list => list != action.listId) }, listOperationLoading: false };
        case types.LIST_OPERATION_ERROR:
            return { ...state, listOperationError: action.error, listOperationLoading: false };
        case types.LIST_MODIFIED:
            const editedList = {...state.taskLists.byId[action.list.id]};
            return {
                ...state,
                taskLists: {
                    ...state.taskLists,
                    byId: { ...state.taskLists.byId, [action.list.id]: {...editedList, ...action.list} }
                }, 
                listOperationLoading: false
            }
        case types.LIST_ADDED:
            return {
                ...state,
                taskLists: {
                    byId: { ...state.taskLists.byId, [action.list.id]: action.list }, allIds: [...state.taskLists.allIds, action.list.id]
                },
                listOperationLoading: false
            }
        case types.LIST_OPERATION_LOADING:
            return {
                ...state,
                listOperationLoading: true
            }
        case types.ERROR_ACKNOWLEDGED:
            return {
                ...state,
                listOperationError: null
            };
        default:
            return state;
    }
};

export default taskLists;