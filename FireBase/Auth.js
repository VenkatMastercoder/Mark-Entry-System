const firebaseConfig = {
  apiKey: "AIzaSyAJgYMXTGoicJK4YcMxcBMqmkF7jjNCTs4",
  authDomain: "infoland-a1179.firebaseapp.com",
  projectId: "infoland-a1179",
  storageBucket: "infoland-a1179.appspot.com",
  messagingSenderId: "729961145341",
  appId: "1:729961145341:web:db00b75fb00389950e2f94",
  measurementId: "G-09PPXEZ35T"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const signInSection = document.getElementById("signInsection");
const signoutSection = document.getElementById("signOutHodSection");
const HeadingChange = document.getElementById("changehead");


const btncreate = document.getElementById("btn_create");
const btnsignIn = document.getElementById("btn_sign");
const btnsignOut = document.getElementById("btn_signOut");

const emailEle = document.getElementById("txt_userEmail");
const passEle = document.getElementById("txt_userPassword");
const messageEle = document.getElementById("message");

btnsignIn.onclick = () => {

  var email = emailEle.value;
  var password = passEle.value;

  auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    // Signed in
    
    if (email === "Hod@cit.net") {
      signInSection.hidden = true;
      signoutSection.hidden = false;
      messageEle.hidden = false;
    }
    
    else {
      alert("fnadoj")
    }
  }).catch((error) => {
    messageEle.hidden = false;
    messageEle.innerHTML = error.message;
  });
}


btnsignOut.onclick = () => {

  auth.signOut();

  btnsignOut.href="index.html";

}


btncreate.onclick = () => {
  alert("running");

  var email = emailEle.value;
  var password = passEle.value;

  HeadingChange.textContent = "Sign in";
  auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    
    messageEle.innerHTML = "Sucessfully Created Account";
    messageEle.hidden = false;

  }).catch((error) => {
    messageEle.innerHTML = error.message;
    messageEle.hidden = false;
  });


}





