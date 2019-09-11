import { firestore, serverTimestamp } from "../../services/firebase"; 
import * as types from './actionTypes';

export const getAllTasks = () => (dispatch, getState) => {
    dispatch(loading());

    const { user } = getState();
    let tasks = {
        byId: {},
        allIds: []
    };

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .get()
        .then(allTasks => {
            if (!allTasks.empty()) {
                allTasks.forEach(task => {
                    let taskData = task.data();
                    tasks.byId[taskData.id] = {
                        id: taskData.id,
                        title: taskData.title,
                        description: taskData.description,
                        location: taskData.location,
                        listId: taskData.listId,
                        startTime: taskData.startTime,
                        endTime: taskData.endTime,
                        allDay: taskData.allDay,
                        completionRate: taskData.completionRate,
                        isCompleted: taskData.isCompleted,
                        createdTimestamp: taskData.createdTimestamp,
                        updatedTimestamp: taskData.updatedTimestamp
                    };

                    tasks.allIds.push(taskData.id);
                });
            }

            dispatch(tasksFetched(tasks));

        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const addTask = (task) => (dispatch, getState) => {
    dispatch(loading());

    const { user } = getState();
    let newTask = {};

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .add(...task)
        .then(docRef => {
            newTask = {...task, id: docRef.id};
            dispatch(taskAdded(newTask));
        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const editTask = (taskId, editedContents) => (dispatch, getState) => {
    dispatch(loading());

    const { user } = getState();
    let editedTask = {};

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .doc(taskId)
        .update({
            ...editedContents
        })
        .then(() => {
            editedTask = {...editedContents};
            dispatch(taskModified(editedTask));
        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const deleteTask = (taskId) => (dispatch, getState) => {
    dispatch(loading());

    const { user } = getState();

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .doc(taskId)
        .delete()
        .then(() => {
            dispatch(taskDeleted(taskId));
        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const errorDisplayed = () => dispatch => {
    dispatch(errorAcknowledged());
}



const tasksFetched = tasks => ({
    type: types.TASK_FETCHED,
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

const loading = () => ({
    type: types.LOADING
});

const errorAcknowledged = () => ({
    type: types.ERROR_ACKNOWLEDGED
});

