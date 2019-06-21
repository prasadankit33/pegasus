 // DOM elements
 const eventList = document.querySelector('.events');
 const loggedOutLinks = document.querySelectorAll('.logged-out');
 const loggedInLinks = document.querySelectorAll('.logged-in');
 const accountDetails = document.querySelector('.account-details')
 
 let setupUI = (user) => {
   if (user) {
    //setting up default profile


     db.collection('users').doc(user.uid).get().then(doc => {
           // account info
           let html = `
             <div>Logged in as ${user.email}</div>
             <div>USERNAME :  ${doc.data().username}</div>`;
            if (doc.data().sportInterested!=null)
            {
              html += `<div>Sport Interested : ${doc.data().sportInterested}</div>`
            }
             html+=`<div>Rating : ${doc.data().rating}</div>`;
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
      let html = '<div class="container-fluid "><div class="row" ><div class="ritekhed-fixture-table-slider ">';
    data.forEach(doc => {
      const event = doc.data();
      const li = `
        <div class="ritekhed-fixture-table-slider-layer" id="${event.organiserId}">
          <time class="ritekhed-bgcolor-two" datetime="2008-02-14 20:00">August 28, 2019 <br>20:00</br></time>
          <ul class="ritekhed-bgcolor">
            <li>Sport: ${event.sport}</li>
            <li>Gender: ${event.gender}</li>
            <li>Members Limit: ${event.memberslimit}</li>
            <li>AGE:  ${event.lowerage} - ${event.upperage}</li>
            <li>Time: ${event.time}</li>
            <li>Description: ${event.description}</li>
            <li class="ritekhed-bordercolor ritekhed-color"><i></i> <a href="#"  id="join">Join</a></li>  
          </ul>
        </div>
      `;
      html += li;
    });
    html+=`</div></div></div>`
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




  //SETTING UP USER PROFILE FOR THE FIRST TIME(DEFAULT VALUES)
 let profile = (cred) => {
  let userId=cred.user.uid;
  db.collection('users').doc(userId).collection('address').doc('permanent').set({
    HouseDetails: null,
    country:null,
    district:null,
    locality: null,
    pincode:null,
    state:null,
    street:null
  });
  db.collection('users').doc(userId).collection('hostEvents').doc('newevent').set({
    eventId:null
  });
  db.collection('users').doc(userId).collection('joinEvents').doc('newevent').set({
    eventId:null
  });
  
};