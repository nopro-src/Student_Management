// lấy element của trang
const formsignupElement =document.getElementById('formsignup')
const userNameElement =document.getElementById('userName')
const phoneNumberElement =document.getElementById('phoneNumber')
const emailAddressElement =document.getElementById('emailAddress')
const passwordElement =document.getElementById('password')
const rePasswordElement =document.getElementById('rePassword')
const addressElement =document.getElementById('address')
const genderElement =''

// lấy data from local
const userLocal =JSON.parse(localStorage.getItem('users')) || []
console.log(userLocal)
// tạo user admin
// Khởi tạo user mới
const userAd = {
    userId : '00000',
    userName : 'Vũ Trung Kiên',
    phoneNumber : '0334174402',
    emailAddress : 'trungkien@gmail.com',
    password : 'kien2004',
    address : 'Hà Nam'
}

// Lấy dữ liệu từ localStorage, nếu chưa có thì khởi tạo mảng rỗng
let userLocalAd = JSON.parse(localStorage.getItem('usersAd')) || [];

// Kiểm tra xem userAd đã tồn tại hay chưa dựa trên userId
const isUserExists = userLocalAd.some(user => user.userId === userAd.userId);

// Chỉ thêm user nếu chưa tồn tại trong localStorage
if (!isUserExists) {
    userLocalAd.push(userAd);
    localStorage.setItem('usersAd', JSON.stringify(userLocalAd));
}

// lắng nghe sự kiện form đăng kí
formsignupElement.addEventListener('submit',function(e){
    // ngăn chạn load trang
    e.preventDefault();
    // validate data
    // userName
    if(!userNameElement.value){
        document.getElementById('userNameError').style.display="block"
        document.getElementById('userNameError').innerHTML='Không được để trống họ và tên!'
    }
    // else{
    //     document.getElementById('userNameError').style.display="none"
    // }
    if(userNameElement.value.length > 30){
        document.getElementById('userNameError').style.display="block"
        document.getElementById('userNameError').innerHTML='Tên đặt tối đa 30 kí tự!'
    }
    else{
        document.getElementById('userNameError').style.display='none'
    } 
    phoneNumber
    if(!phoneNumberElement.value){
        document.getElementById('phoneNumberError').innerHTML='Không được để trống số điện thoại!'
        if(phoneNumberElement.value.length >9){
            document.getElementById('phoneNumberError').innerHTML='số điện thoại đặt tối đa 10!'
        }
    }
    if(passwordElement.value!==rePasswordElement.value){
         document.getElementById("rePasswordError").style.display='block'
        document.getElementById("rePasswordError").innerHTML='Xác nhận mật khẩu không khớp!'
    }
    if(passwordElement.value===rePasswordElement.value){
         document.getElementById("rePasswordError").style.display='none'
    }
    /**
     * 
     * @param {*} email 
     * @returns validate email
     */
    function validateEmail (email) {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    if(!validateEmail){
        document.getElementById('emailAddressError').innerHTML='Mật khẩu sai định dạng'
    }
    if(userNameElement.value && phoneNumberElement.value && emailAddressElement.value && passwordElement.value){
        // lấy dữ liệu 
        const user = {
            userId : Math.ceil(Math.random()*100000000),
            userName : userNameElement.value,
            phoneNumber : phoneNumberElement.value,
            emailAddress : emailAddressElement.value,
            password : passwordElement.value,
            class :"",
            point :"",
            address : addressElement.value
        }
        // push data into local
        userLocal.push(user)
        localStorage.setItem('users',JSON.stringify(userLocal))
        console.log(user)
         // push data admin into local 
        // userLocalAd.push(userAd)
        // localStorage.setItem('usersAd',JSON.stringify(userLocalAd))
        // console.log(user)

        // chuyển hướng về đăng nhập
        setTimeout(function(){
            window.location.href='SignIn.html'
        },2000)
        
       
    }
}); 

