import firebase, {auth} from './Firebase';

const authentication = {};
authentication.provider = new firebase.auth.GoogleAuthProvider(); 
authentication.signInWithRedirect = () => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            reject();
            return;
        }
        auth.signInWithRedirect(authentication.provider);
        auth.getRedirectResult()
        .then(function(result) {
            if (!result.user) {
                reject();
                return;
            }
            resolve(result.user);    
        })
        .catch(function(error) {
            reject();
        }); 
    });
}
authentication.signInWithPopup = () => {
    return new Promise((resolve, reject) => {
        if (auth.currentUser) {
            reject();
            return;
        }
        auth.signInWithPopup(authentication.provider)
        .then(function(result) {
            const user = result.user;
            if (!user) {
                reject();
                return;
            }

            const uid = user.uid;
            if (!uid) {
                reject();
                return;
            }

            resolve(user);
        })
        .catch(function(error) {
            reject();
        });
    });    
}
  
authentication.signInAnonymously = () => {
    auth.signInAnonymously().catch(function(error) {
        console.log(error.code);
        console.log(error.mesagge);
    });  
}
  
authentication.onAuthStateChanged = () => {
    return new Promise((resolve, reject) => {
        auth.onAuthStateChanged(function(user) {
            resolve(user);
        })
        .catch(error => reject(error));
    });  
}

authentication.signOut = () => {
    return new Promise((resolve, reject) => {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        reject();
        return;
      }
  
      auth.signOut()
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
    });
  };

export default authentication;