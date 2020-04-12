let newPasswordValue ;
let confirmPasswordValue ;

const submitBtn = document.getElementById('submit-btn');
 const newPassword = document.getElementById('newPassword');
 const confirmPassword = document.getElementById('confirmPassword');
 const validationMessage = document.getElementById('validationMessage');

 function validation(message, add, remove){
    validationMessage.textContent = message ;
    validationMessage.classList.add(add);
    validationMessage.classList.remove(remove);
 }

 confirmPassword.addEventListener('input',e => {
 	e.preventDefault();
 	   newPasswordValue  = newPassword.value ;
 	   confirmPasswordValue = confirmPassword.value ;
     if(newPasswordValue !== confirmPasswordValue){
     	         validation('passwords must matched','color-red','color-green');
     	         submitBtn.setAttribute('disabled',true);
     }else{
     	         validation('password matched !','color-green','color-red');
              	         submitBtn.removeAttribute('disabled');

     }
 });

 /*form.addEventListener('submit',e => {
 	  if(newPasswordValue !== confirmPasswordValue){
 	  	 e.preventDefault();
 	  	 const error = document.getElementById('error');
 	  	 if(!error){
 	  	    const flashError = document.createElement('h2');
 	  	    flashError.textContent = "Passwords must match .";
 	  	    flashError.classList.add('color-red');
 	  	    flashError.setAttribute('id','error');
 	  	    
 	  	    const navBar = document.getElementById('navBar');
           navBar.parentNode.insertBefore(flashError, navBar.nextSibling);
 	  	 }
 	  }
 });*/
