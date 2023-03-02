// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEpVRMTFDfLSHSZtTqHgJgKSFy80U7AdQ",
  authDomain: "student-mark-entry-system.firebaseapp.com",
  databaseURL: "https://student-mark-entry-system-default-rtdb.firebaseio.com",
  projectId: "student-mark-entry-system",
  storageBucket: "student-mark-entry-system.appspot.com",
  messagingSenderId: "596956330864",
  appId: "1:596956330864:web:c9c4e9703e4dca2e272db5",
  measurementId: "G-RTSFDSFYTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {getDatabase,ref,get,update,set,child,remove,onValue} 
from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const db = getDatabase();

$(document).ready(function () {
  $('#example1').DataTable();
  $('#example2').DataTable();
  $('#example3').DataTable();
});


var AllValueTable = document.getElementById("tb1");
var AllFailValueTable = document.getElementById("tb2");
var AllTopperValueTable = document.getElementById("tb3");

function addItemsToTable(name,roll,marks,section,td_id) {
  
  console.log(td_id);
  let a = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  let td4 = document.createElement("td");
  let td5 = document.createElement("td");

  td1.innerHTML = ++sno;
  td2.innerHTML = roll;
  td3.innerHTML = name;
  td4.innerHTML = marks;
  td5.innerHTML = section;

  a.appendChild(td1);
  a.appendChild(td2);
  a.appendChild(td3);
  a.appendChild(td4);
  a.appendChild(td5);

  td_id.appendChild(a);
}

function AddAllItemsToTable(stt,table_Object) {
  sno = 0;
  table_Object.innerHTML = "";
  let td_id = table_Object;
  
  stt.forEach(element => {

    addItemsToTable(element.Name,element.Roll_No,element.Marks.IA_1.TOC,element.Section,td_id);
    
  });
}

function AddAllFailToTable(stt,table_Object) {
  sno = 0;
  table_Object.innerHTML = "";

  let td_id = table_Object;

  console.log(stt);
  stt.forEach(element => {

    if (element.Marks.IA_1.TOC < 25) {
      addItemsToTable(element.Name,element.Roll_No,element.Marks.IA_1.TOC,element.Section,td_id);
    }
  });
}

function AddAllTopperToTable(stt,table_Object) {
  sno = 0;
  table_Object.innerHTML = "";
  let td_id = table_Object;

  let topArray = [];
  
  for (let a of stt) {
    
    let ArrayValue = {
      Marks : a.Marks.IA_1.TOC,
      Roll_No : a.Roll_No,
      Name : a.Name,
      Section : a.Section
    }

    topArray.push(ArrayValue);
    
  }
  
 let TopperList = topArray.sort(
 (p1, p2) => (p1.Marks < p2.Marks) ? 1 : (p1.Marks > p2.Marks ) ? -1 : 0);


 let count = 0;

 TopperList.forEach(element => {

  if (count < 10) {
    addItemsToTable(element.Name,element.Roll_No,element.Marks,element.Section,td_id);
  }
    
    count += 1;     
  });
}

var sno = 0;

var st = [];

function GetAllDataRealTime() {

    const dbref1 = ref(db,"CSE-A");
    const dbref2 = ref(db,"CSE-B");
    const dbref3 = ref(db,"CSE-C");

    

    onValue(dbref1,(snapshot)=>{
      
        snapshot.forEach(childSnapshot => {
            st.push(childSnapshot.val());   
        });

    })

    onValue(dbref2,(snapshot)=>{
      
      snapshot.forEach(childSnapshot => {
          st.push(childSnapshot.val());

         
      });

    })

    onValue(dbref3,(snapshot)=>{
      
      snapshot.forEach(childSnapshot => {
          st.push(childSnapshot.val());
      });

    })

}

let getAnalyticsbtn = document.getElementById("getAnalyticsBtn");
  
getAnalyticsbtn.onclick = function() {
  AddAllItemsToTable(st,AllValueTable);

  AddAllFailToTable(st,AllFailValueTable);

  AddAllTopperToTable(st,AllTopperValueTable);  
}

window.onload = GetAllDataRealTime;