import { auth, firestore, serverTimestamp, credential, currentUser } from "../../services/firebase";
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
export const signupUser = (data) => dispatch => {
    dispatch(sessionLoading());
    const { email, password, name } = data;

    auth().createUserWithEmailAndPassword(email, password)
        .then(newUserCredential => {
            // add user info to firestore() database.
            firestore()
                .doc(`/userProfile/${newUserCredential.user.uid}`)
                .set({ email, name });

            // do the same to actual firebase user object
            newUserCredential.user.updateProfile({
                displayName: name
            });

            dispatch(signupSuccess(newUserCredential.user));
        })
        .catch(error => {
            console.log(error.message);
            dispatch(sessionError(error.message));
        });

}

/**
 * Logs in the user. If successful, dispatches session success else
 * on failure, dispatches session
 * @param {*} email 
 * @param {*} password 
 */
export const loginUser = (data) => dispatch => {
    dispatch(sessionLoading());

    const { email, password } = data;

    auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
            dispatch(sessionSuccess(user.user));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const errorDisplayed = () => dispatch => {
    dispatch(errorAcknowledged());
}

export const restoreSession = () => dispatch => {
    dispatch(sessionLoading());
    dispatch(sessionRestoring());

    auth()
        .onAuthStateChanged(user => {

            if (user) {

                dispatch(sessionSuccess(user));

            } else {

                dispatch(sessionLogout());
            }
        });
};

export const logoutUser = () => dispatch => {
    dispatch(sessionLoading());

    auth()
        .signOut()
        .then(() => {
            dispatch(sessionLogout());
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const updateUserName = (name) => (dispatch, getState) => {
    const { auth } = getState();
    const user = { ...auth.user };

    user
        .updateProfile({
            displayName: name
        }).
        then(() => {
            firestore()
                .doc(`/userProfile/${user.uid}`)
                .update({ name })
                .then(() => {
                    dispatch(userProfileModified({ name: name }));
                });
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};

export const updateUserEmail = (newEmail, password) => (dispatch, getState) => {
    const { auth } = getState();
    const user = { ...auth.user };

    const cred = credential(user, password);

    user
        .reauthenticateAndRetrieveDataWithCredential(cred)
        .then(() => {
            user.updateEmail(newEmail).then(() => {
                firestore()
                    .doc(`/userProfile/${user.uid}`)
                    .update({ email: newEmail });
            });
            dispatch(userProfileModified({ email: newEmail }));
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });
};


export const updatePassword = (newPassword, oldPassword) => (dispatch, getState) => {
    const { auth } = getState();
    const user = { ...auth.user };

    const cred = credential(user, password);

    user
        .reauthenticateAndRetrieveDataWithCredential(cred)
        .then(() => {
            this.currentUser.updatePassword(newPassword).then(() => {
                dispatch(userProfileModified(null));
            });
        })
        .catch(error => {
            dispatch(sessionError(error.message));
        });

};

const userProfileModified = data => ({
    type: types.USER_PROFILE_MODIFIED,
    data
})

const sessionRestoring = () => ({
    type: types.SESSION_RESTORING
});

const sessionLoading = () => ({
    type: types.SESSION_LOADING
});

const sessionSuccess = user => ({
    type: types.SESSION_SUCCESS,
    user
});

const signupSuccess = user => ({
    type: types.SIGNUP_SUCCESS,
    user
});

const sessionError = error => ({
    type: types.SESSION_ERROR,
    error
});

const errorAcknowledged = () => ({
    type: types.ERROR_ACKNOWLEDGED
});

const sessionLogout = () => ({
    type: types.SESSION_LOGOUT
});




