import { firestore, serverTimestamp } from "../../services/firebase"; 
import * as types from './actionTypes';

export const getAllTasks = () => (dispatch, getState) => {
    dispatch(taskOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    
    console.log("in get all tasks ", user);
    let newTasks = {
        byId: {},
        allIds: []
    };

    firestore()
        .collection(`/userProfile/${user.uid}/tasks`)
        .get()
        .then(allTasks => {
            if (!allTasks.empty) {
                allTasks.forEach(task => {
                    let taskData = task.data();
                    newTasks.byId[task.id] = {
                        id: task.id,
                        title: taskData.title,
                        description: taskData.description,
                        location: taskData.location,
                        listId: taskData.listId,
                        startDate: taskData.startDate,
                        endDate: taskData.endDate,
                        completionRate: taskData.completionRate,
                        isCompleted: taskData.isCompleted,
                        subtasks: taskData.subtasks,
                        createdTimestamp: taskData.createdTimestamp,
                        updatedTimestamp: taskData.updatedTimestamp
                    };

                    newTasks.allIds.push(task.id);
                });
            }

            dispatch(tasksFetched(newTasks));

        })
        .catch( error => {           
            dispatch(taskOperationError(error.message));
        });
}

export const addTask = (task) => (dispatch, getState) => {
    dispatch(taskOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    const timestamp = serverTimestamp();

    let newTask = {};

    const newTaskRef = firestore()
        .collection(`/userProfile/${user.uid}/tasks`).doc();

        newTaskRef
        .set({...task, createdTimestamp: timestamp, id: newTaskRef.id})
        .then(() => {
            newTask = {...task, id: newTaskRef.id, createdTimestamp: timestamp};
            dispatch(taskAdded(newTask));
        })
        .catch( error => {            
            dispatch(taskOperationError(error.message));
        });
}

export const editTask = (taskId, editedContents) => (dispatch, getState) => {
    dispatch(taskOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};
    const timestamp = serverTimestamp();

    firestore()
        .collection(`/userProfile/${user.uid}/tasks`)
        .doc(taskId)
        .update({
            ...editedContents,
            updatedTimestamp: timestamp
        })
        .then(() => {
            dispatch(taskModified({...editedContents, updatedTimestamp: timestamp, id: taskId}));
        })
        .catch( error => {          
            dispatch(taskOperationError(error.message));
        });
}

export const deleteTask = (taskId) => (dispatch, getState) => {
    dispatch(taskOperationLoading());

    const {auth} = getState();
    const user = {...auth.user};

    firestore()
        .collection(`/userProfile/${user.uid}/tasks`)
        .doc(taskId)
        .delete()
        .then(() => {
            dispatch(taskDeleted(taskId));
        })
        .catch( error => {          
            dispatch(taskOperationError(error.message));
        });
}

export const errorDisplayed = () => dispatch => {
    dispatch(errorAcknowledged());
}


const tasksFetched = tasks => ({
    type: types.TASKS_FETCHED,
    tasks
});

const taskModified = task => ({
    type: types.TASK_MODIFIED,
    task
});

const taskAdded = task => ({
    type: types.TASK_ADDED,
    task
})

const taskDeleted = taskId => ({
    type: types.TASK_DELETION_SUCCESS,
    taskId
});

const taskOperationError = error => ({
    type: types.TASK_OPERATION_ERROR,
    error
});

const taskOperationLoading = () => ({
    type: types.TASK_OPERATION_LOADING
});

const errorAcknowledged = () => ({
    type: types.ERROR_ACKNOWLEDGED
});

