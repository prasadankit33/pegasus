let user_id=null;
// listen for auth status changes(verified)
//let binary;
//let user1
 auth.onAuthStateChanged(user => {
     if (user) {
        user_id=user.uid;
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
    console.log(cred.user.uid);
    user_id=cred.user.uid;
    db.collection('users').doc(cred.user.uid).collection('address').add({
        HouseDetails:null,
        country:null,
        locality:null,
        pincode:null,
        state:null,
        street:null
    });
    return db.collection('users').doc(cred.user.uid).set({
        username: signupForm['username'].value,
        rating : 0,
        dob : null,
        phonenumber : null,
        gender: null,
        sportInterested:  null,
        emailId: cred.user.email
        
    });
  }).then(() =>{
    
    const modal = document.querySelector('#signupModal');
    signupForm.reset();
    M.Modal.getInstance(modal).close();
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
    // close the login modal & reset form
    user_id=cred.user.uid;
    const modal = document.querySelector('#loginModal');
    loginForm.reset();
    M.Modal.getInstance(modal).close();
    
  }).catch(err => {
    console.log(err.message);
    const modal = document.querySelector('#loginModal');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    alert('Login Failed');
  });

});

// HOST BUTTON (verified)
const createForm = document.querySelector('#host-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let docRef=db.collection('events').doc()
  
    db.collection('users').doc(user_id).collection('hostEvents').doc(docRef.id).set({
      eventId: docRef.id
    });
    return db.collection('events').doc(docRef.id).set({
      country:null,
      city:null,
      date:null,
      landmark: null,
      latitude:null,
      longitude:null,
      participated:null,
      pincode:null,
      state:null,
      gender:       createForm.gender.value,
      lowerage:     createForm.lowerage.value,
      upperage:     createForm.upperage.value,
      memberslimit: createForm.memberslimit.value,
      organiserId:  user_id,
      sport:        createForm.sport.value,
      time:         createForm.time.value,
      description:  createForm.description.value
    }).then(() => {
      // close the create modal & reset form
      const modal = document.querySelector('#hostModal');
      createForm.reset();
      M.Modal.getInstance(modal).close();
      
    }).catch(err => {
      console.log(err.message);
      const modal = document.querySelector('#hostModal');
      createForm.reset();
      M.Modal.getInstance(modal).close();
      
    });
  });

//JOIN BUTTON 
/*const joinForm = document.getElementsByClassName('joinEvents');

for(let i=0;i<joinForm.length;i++)
{
  console.log(joinForm[i]['document_id'].value);
}*/
/*for(let i=0;i<joinForm.length;i++)
{
  joinForm[i].addEventListener('submit', (e) => {
    e.preventDefault();
    let event_id=joinForm['document_id'].value;
    db.collection('events').doc(event_id).collection('participants').doc().add({
        ParticipantId:user_id,
    });
    db.collection('users').doc(user_id).collection('joinEvents').doc().add({
        eventId: event_id,
    }).catch(err => {
      console.log(err.message);
    });
  });
}*/
let event_info=null;
function joiningevents(event_id){
  console.log(typeof event_id);
  let info = String(event_id);
  event_info=String(event_id);
  console.log(typeof info);

  /*db.collection('events').onSnapshot(snapshot => {
    snapshot.docs.forEach(doc => {
      const event = doc.data();
      if (doc.id == event_id)
      {
        console.log("FINALLY SOMETHING");
        doc.collection('participants').add({
          participantId: user_id,
        });
      }
      event_information.push(doc.id);
    });
    
    
  }).catch(err => {
    console.log(err.message);
  });*/

 /* db.collection('users').doc(user_id).collection('joinEvents').add({
    eventId: event_id,
  });*/
  last_chance();
  
  /*db.collection('users').doc(user_id).collection('joinEvents').add({
    eventId: event_id,
  });*/
  /*db.collection('events').doc(info).collection('participants').doc().set({
    participantId: user_id,
  }, { merge: true }).then(() => {
    // close the create modal & reset form
    console.log('YEAHHHHHH');

  });*/
}


function last_chance(){
  console.log('6xEQLocgLyxFuW4yFwmm'.length);
  console.log(event_info.length);
  let imp=db.collection('events').doc(event_info.slice(1,event_info.length));
  imp.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("Document data:", doc.data());
    }
    
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}

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

