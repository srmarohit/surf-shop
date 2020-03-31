 let postEditForm = document.getElementById('postEditForm');
	  postEditForm.addEventListener('submit',(e)=>{
	  	  let uploadImage = document.getElementById('uploadImage').files.length;
          let existingImage = document.querySelectorAll('.imageDeletion').length;
          let deleteImage = document.querySelectorAll(".imageDeletion:checked").length;
           let imageAmount = uploadImage + existingImage - deleteImage ; 
              if(imageAmount > 4){
              	   e.preventDefault();
              	    let removeAmount = imageAmount - 4 ;
              	   alert(` You need to delete  ${removeAmount} more image${removeAmount === 1 ? '':'s'} `);
              } 
	  });