import { auth, firestore, serverTimestamp } from "../../services/firebase";
import * as types from './actionTypes';

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

