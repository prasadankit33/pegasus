 // DOM elements
 const eventList = document.querySelector('.events');
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
 
  // HOST EVENTS
  const hostevents = (data) => {
  if (data.length){
      let html = '';
    data.forEach(doc => {
      const event = doc.data();
      const li = `
        <div class="ritekhed-fixture-table-slider-layer">
          <time class="ritekhed-bgcolor-two" datetime="2008-02-14 20:00">August 28, 2019 <br>20:00</br></time>
          <ul class="ritekhed-bgcolor">
            <li>${event.sport}<span>${event.allowed_members}</span></li>
            <li>${event.location}</li>
            <li class="ritekhed-fixture-addtext">FullBook</li>
          </ul>
        </div>
      `;
      html += li;
    });
    eventList.innerHTML = html
  }else{
    const li =`
    <div class="ritekhed-fixture-table-slider-layer">
          <h5>Login <span>to view Details</span></h5>
        </div>
    `;
    eventList.innerHTML=li
  }
  };
    
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
 