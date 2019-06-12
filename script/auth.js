
// listen for auth status changes(verified)
//let binary;
//let user1
 auth.onAuthStateChanged(user => {
     if (user) {
         db.collection('events').onSnapshot(snapshot => {
             hostevents(snapshot.docs);
             //binary=1;
             user1=user;
             setupUI(user);
             
           }).catch(err => {
             console.log(err.message);
           });
     } else {
         console.log('user logged out');
         hostevents([]);
         //binary=0;
         setupUI(user);
     }
   }) 
  
//TOP LAYER
//if(binary){
//  setupUI(user1);
//}
//else{
//  setupUI();
//}


// HOST BUTTON (verified)
const createForm = document.querySelector('#host-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('events').add({
    sport: createForm.sport.value,
    allowed_members: createForm.allowed_members.value,
    location: createForm.location.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#hostModal');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
    const modal = document.querySelector('#hostModal');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  });
});

//JOIN BUTTON 
/*const createForm = document.querySelector('#join-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  return db.collection('users').set({
    eventid : db.collection('events').doc('user.uid').
    
  }).catch(err => {
    console.log(err.message);
    
  });
});*/

// signup(VERIFIED)
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  //const username1 = signupForm['username'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
        username: signupForm['username'].value,
        rating : 0,
        dob : null,
        phonenumber : null,
        gender: null,
        sportInterested:  null,
    });
  }).then(() =>{
    const modal = document.querySelector('#signupModal');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});


// logout(verified)
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log('user signed out');
  }).catch(err => {
    console.log(err.message);
  });
});

// login(verified)
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    //console.log(cred.user);
    // close the signup modal & reset form
    const modal = document.querySelector('#loginModal');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  }).catch(err => {
    console.log(err.message);
    const modal = document.querySelector('#loginModal');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    alert('Login Failed');
  });

});