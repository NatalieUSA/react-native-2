import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  currentUser,
  getAuth,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authLogOut } = authSlice.actions;

export const authRegistration =
  ({ email, password, login: nickName }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;
       console.log("USEEEER", user);
      await updateProfile(user, { displayName: nickName });
  
  //const userSuccess = await auth.currentUser;
      const { uid, displayName } = await auth.currentUser;
      const data = {
        userId: uid,
        nickName: displayName,
        userEmail: email,
        //  userAvatar: userSuccess.photoURL,
      };
        console.log("datatt", data);
        
         dispatch(updateUserProfile(data));
         dispatch(authStateChange(true));
    
    } catch (error) {
      // throw error;
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/email-already-in-use") {
        alert("The email already in use");
      } else if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
        };
export const authStateChangeUser = () => async (dispatch, getState) => {
    try { await onAuthStateChanged(auth, user => {
        if (user) {
            dispatch(
                authSlice.actions.updateUserProfile({
                    userId: user.uid,
                    nickName: user.displayName,
                    // userEmail: user?.email,
                })
            );
           dispatch(authStateChange(true));
        }
    })
        
    } catch (error) {
           alert(error.message);
    }
   
};

export const authLogout = () => async (dispatch, getState) => {
    try {
        await signOut(auth);
        dispatch(authLogOut());
    } catch (error) {
        alert(error.message)
    }
}

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("userLogin", user);
         const data = {
           userId: user.user.uid,
           nickName: user.user.displayName,
           userEmail: user?.user?.email,
        //    userAvatar: user?.user?.photoURL,
      };
      // dispatch(authSlice.actions.updateUserProfile(data));
      //    dispatch(authSlice.actions.authStateChange(true));
         dispatch(updateUserProfile(data));
         dispatch(authStateChange(true));
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == "auth/wrong-password") {
        alert("The password ==> wrong");
      } else if (errorCode == "auth/user-not-found") {
        alert(`User with email ==> ${email} <== not found`);
      } else {
        alert(errorMessage);
      }
      console.log(error);
      alert(error.message)
    }
  };
