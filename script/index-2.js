 // DOM elements
 //const eventList = document.querySelector('.guides');
 const loggedOutLinks = document.querySelectorAll('.logged-out');
 const loggedInLinks = document.querySelectorAll('.logged-in');
 const accountDetails = document.querySelector('.account-details')
 
 const setupUI = (user) => {
   if (user) {
     db.collection('users').doc(user.uid).get().then(doc => {
           // account info
           const html = `
             <div>Logged in as ${user.email}</div>
             <div>BIO :  ${doc.data().bio}</div>
           `;
           accountDetails.innerHTML = html;
     })
     
     // toggle user UI elements
     loggedInLinks.forEach(item => item.style.display = 'block');
     loggedOutLinks.forEach(item => item.style.display = 'none');
   } else {
     // hide account info
     const html = ``;
     accountDetails.innerHTML = html;
     // toggle user elements
     loggedInLinks.forEach(item => item.style.display = 'none');
     loggedOutLinks.forEach(item => item.style.display = 'block');
   }
 };
 
//  // HOST EVENTS
//  const hostevents = (data) => {
//  if (data.length){
//    let html = '';
//    data.forEach(doc => {
//      const event = doc.data();
//      const li = `
//        <li>
//          <div class="collapsible-header grey lighten-4"> ${event.sport} </div>
//          <div class="collapsible-body white"> ${event.allowed_members} </div>
//          <div class="collapsible-body white"> ${event.location} </div>
//        </li>
//      `;
//      html += li;
//    });
//    eventList.innerHTML = html
//  }else{
//    eventList.innerHTML='<h5 class="center-align">Login to view Hosted Matches</h5>';
//  }
//  };
    
 // setup materialize components
 document.addEventListener('DOMContentLoaded', function() {
 
     var modals = document.querySelectorAll('.modal');
     M.Modal.init(modals);
   
     var items = document.querySelectorAll('.collapsible');
     M.Collapsible.init(items);
   
   });
 
   document.addEventListener('DOMContentLoaded', function() {
     var elems = document.querySelectorAll('select');
     var instances = M.FormSelect.init(elems);
   });
 