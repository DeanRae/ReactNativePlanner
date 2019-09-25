import { firestore, serverTimestamp } from "../../services/firebase"; 
import * as types from './actionTypes';

export const getAllTaskLists = () => (dispatch, getState) => {
    dispatch(listOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    
    let newLists = {
        byId: {},
        allIds: []
    };

    firestore()
        .collection(`/userProfile/${user.uid}/taskLists`)
        .get()
        .then(allLists => {
            if (!allLists.empty) {
                allLists.forEach(list => {
                    let listData = list.data();
                    newLists.byId[list.id] = {
                        id: list.id,
                        title: listData.title,
                        createdTimestamp: listData.createdTimestamp,
                        updatedTimestamp: listData.updatedTimestamp
                    };

                    newLists.allIds.push(list.id);
                });
            }

            dispatch(listsFetched(newLists));

        })
        .catch( error => {          
            dispatch(listOperationError(error.message));
        });
}

export const addList = (list) => (dispatch, getState) => {
    dispatch(listOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    const timestamp = serverTimestamp();

    let newList = {};

    firestore()
        .collection(`/userProfile/${user.uid}/taskLists`)
        .add({...list, createdTimestamp: timestamp})
        .then(docRef => {
            newList = {...list, id: docRef.id, createdTimestamp: timestamp};
            dispatch(listAdded(newList));
        })
        .catch( error => {           
            dispatch(listOperationError(error.message));
        });
}

export const editList = (listId, editedContents) => (dispatch, getState) => {
    dispatch(listOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    const timestamp = serverTimestamp();

    firestore()
        .collection(`/userProfile/${user.uid}/taskLists`)
        .doc(listId)
        .update({
            ...editedContents,
            updatedTimestamp: timestamp
        })
        .then(() => {
            dispatch(listModified({...editedContents, updatedTimestamp: timestamp, id: listId}));
        })
        .catch( error => {           
            dispatch(listOperationError(error.message));
        });
}

export const deleteList = (listId) => (dispatch, getState) => {
    dispatch(listOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};

    firestore()
        .collection(`/userProfile/${user.uid}/taskLists`)
        .doc(listId)
        .delete()
        .then(() => {
            dispatch(listDeleted(listId));
            
        })
        .catch( error => {           
            dispatch(listOperationError(error.message));
        });
}

export const errorDisplayed = () => dispatch => {
    dispatch(errorAcknowledged());
}


const listsFetched = lists => ({
    type: types.LISTS_FETCHED,
    lists
});

const listModified = list => ({
    type: types.LIST_MODIFIED,
    list
});

const listAdded = list => ({
    type: types.LIST_ADDED,
    list
})

const listDeleted = listId => ({
    type: types.LIST_DELETION_SUCCESS,
    listId
});

const listOperationError = error => ({
    type: types.LIST_OPERATION_ERROR,
    error
});

const listOperationLoading = () => ({
    type: types.LIST_OPERATION_LOADING
});

const errorAcknowledged = () => ({
    type: types.ERROR_ACKNOWLEDGED
});

