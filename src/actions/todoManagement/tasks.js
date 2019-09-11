import { firestore, serverTimestamp } from "../../services/firebase"; 
import * as types from './actionTypes';

export const getAllTasks = () => (dispatch, getState) => {
    dispatch(loading);

    const { user } = getState();
    let tasks = {};

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .get()
        .then(allTasks => {
            if (!allTasks.empty()) {
                allTasks.forEach(task => {
                    let taskData = task.data();
                    tasks[taskData.id] = {
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
                    }
                });
            }

            dispatch(taskOperationSuccess(tasks));

        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const addTask = (task) => (dispatch, getState) => {
    dispatch(loading);

    const { user } = getState();
    let newTask = {};

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .add(task)
        .then(docRef => {
            newTask[docRef.id] = {...task, id: docRef.id};
            dispatch(taskOperationSuccess(newTask));
        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}

export const editTask = (taskId, editedContents) => (dispatch, getState) => {
    dispatch(loading);

    const { user } = getState();
    let editedTask = {};

    firestore
        .collection(`/userProfile/${user.uid}/tasks`)
        .doc(taskId)
        .update({
            editedContents
        })
        .then(() => {
            editedTask[taskId] = {...editedContents};
            dispatch(taskOperationSuccess(editedTask));
        })
        .catch( error => {
            console.log("error ", error.message);
            dispatch(taskOperationError(error.message));
        });
}



const taskOperationSuccess = tasks => ({
    type: types.TASK_OPERATION_SUCCESS,
    tasks
})

const taskOperationError = error => ({
    type: types.TASK_OPERATION_ERROR,
    error
});

