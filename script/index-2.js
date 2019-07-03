 // DOM elements
 const eventList = document.querySelector('.events');
 const loggedOutLinks = document.querySelectorAll('.logged-out');
 const loggedInLinks = document.querySelectorAll('.logged-in');
 const accountDetails = document.querySelector('.account-details');

 
 let setupUI = (user) => {
   if (user) {
    //setting up default profile


     db.collection('users').doc(user.uid).get().then(doc => {
           // account info
           let html = `
             <div>Logged in as ${doc.data().emailId}</div>
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
 let event_information=[];
  // HOST EVENTS
  const hostevents = (data) => {
  if (data.length){
      let html = '<div class="container-fluid "><div class="row" ><div class="ritekhed-fixture-table-slider ">';
    data.forEach(doc => {
      const event = doc.data();
      const li = `
        <div class="ritekhed-fixture-table-slider-layer">
          <time class="ritekhed-bgcolor-two" datetime="2008-02-14 20:00">August 28, 2019 <br>20:00</br></time>
          <ul class="ritekhed-bgcolor joinEvents">
            <li>Sport: ${doc.data().sport}</li>
            <li>Gender: ${doc.data().gender}</li>
            <li>Members Limit: ${doc.data().memberslimit}</li>
            <li>AGE:  ${doc.data().lowerage} - ${doc.data().upperage}</li>
            <li>Time: ${doc.data().time}</li>
            <li>Description: ${doc.data().description}</li>
            <li class="donotshow">id: ${doc.id}
            <input  id="document_id" type="text" value=" ${doc.id}*" onblur="if(this.value == '') { this.value =' ${doc.id}*'; }" onfocus="if(this.value ==' ${doc.id}*') { this.value = ''; }" required>
            </li>
            <li class="ritekhed-bordercolor ritekhed-color "> <button class="joinEvents"  name="event_name" type="submit" value=" ${doc.id}" onclick="joinEvents(value)">Join</button></li>  
          </ul>
        </div>
      `;
      html += li;
      event_information.push(doc.id);
    });
    html+=`</div></div></div>`;
    eventList.innerHTML = html;
    //console.log(event_information);
  }else{
    const li =`
    <div class="ritekhed-fixture-table-slider-layer">
          <h5>Login <span>to view Details</span></h5>
        </div>
    `;
    eventList.innerHTML=li
  }
  };
//Join Button
  function joinEvents(event_id){
    console.log(event_id);
        db.collection('events').doc(event_id).collection('participants').add({
          ParticipantId:user_id,
        });
        db.collection('users').doc(user_id).collection('joinEvents').add({
          eventId: event_id,
        }).catch(err => {
        console.log(err.message);
        });
  }
  const should_remove = document.querySelectorAll('.donotshow');
  should_remove.css({"display": "block"});
    
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

//JOIN BUTTON 

/*for(let i=0;i<joinForm.length;i++)
{
  console.log(joinForm[i]['document_id'].value);
}*/
/*for(let i=0;i<joinForm.length;i++)
{
  joinForm[i].addEventListener('submit', (e) => {
    e.preventDefault();
    let event_id=joinForm['document_id'].value;
    
    
  });
}*/


  //SETTING UP USER PROFILE FOR THE FIRST TIME(DEFAULT VALUES)
 /*let profile = (cred) => {
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
};*/