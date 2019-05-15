import { auth, database, provider } from "../../config/firebase";

//Register the user using email and password
export function register(data, callback) {
    const { email, password, username } = data;
    auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => createUser({ username, uid:resp.user.uid }, callback))
        .catch((error) => callback(false, null, error));
}

//Create the user object in realtime database
export function createUser(data, callback) {
    const userRef = database.ref().child('/users/' + data.user.uid);
    const userData = JSON.stringify(data.user);
    const updates = {};
    updates['uid'] = data.user.uid;
    updates['username'] = data.user.displayName;
    userRef
      .update(updates)
      .then(() => callback(true, data.user, null))
      .catch(error => callback(false, null, { message: error }));
  }

//Sign the user in with their email and password
export function login(data, callback) {
    const { email, password } = data;
    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => getUser(resp.user, callback))
        .catch((error) => callback(false, null, error));
}

//Get the user object from the realtime database
export function getUser(user, callback) {
    database.ref('users').child(user.uid).once('value')
        .then(function(snapshot) {

            const exists = (snapshot.val() !== null);

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val();

            const data = { exists, user }
            callback(true, data, null);
        })
        .catch(error => callback(false, null, error));
}

//Send Password Reset Email
export function resetPassword(data, callback) {
    const { email } = data;
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error));
}

export function signOut(callback) {
    auth.signOut()
      .then(() => {
        if (callback) callback(true, null, null);
      })
      .catch(error => {
        if (callback) callback(false, null, error);
      });
  }


//Sign user in using Facebook
export function signInWithFacebook(fbToken, callback) {
    const credential = provider.credential(null, fbToken);
    auth.signInAndRetrieveDataWithCredential(credential)
      .then(user => createUser(user, callback))
      .catch(error => callback(false, null, error));
  }
  