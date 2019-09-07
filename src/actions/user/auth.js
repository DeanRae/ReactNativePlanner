import { auth, firestore, serverTimestamp } from "../../services/firebase";
import * as types from './actionTypes';
/**
 * Code adapted from: 
 * https://github.com/skantus/react-native-firebase-redux-authentication/blob/master/app/actions/session/actions.js
 */


/**
 * Registers the user and if successful, adds user credentials to the firestore
 * database and then dispatches signupSuccess. Else on error dispatches
 * sessionError
 * @param {*} data expected data received should include email, password, 
 *                 and name (name may be an empty string)
 */
export const signupUser = (data) => (dispatch) => {
    const { email, password, name } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then(newUserCredential => {
            // add user info to firestore database.
            firestore
                .doc(`/userProfile/${newUserCredential.user.uid}`)
                .set({ email, name });

            dispatch(signupSuccess(newUserCredential));
        })
        .catch(error => {
            console.log(error);
            dispatch(sessionError(error.message));
        });

}

/**
 * Logs in the user. If successful, dispatches session success else
 * on failure, dispatches session error
 * @param {*} email 
 * @param {*} password 
 */
export const loginUser = (data) => dispatch => {
    const {email, password} = data;
    auth
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(sessionSuccess(user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};



