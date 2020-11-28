let menuToggle = document.querySelector("#menu-toggle");
let menu = document.querySelector('.sidebar');

menuToggle.addEventListener('click', function (event) {
    event.preventDefault();
    menu.classList.toggle('visible');
})

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector(".login")
const loginForm = document.querySelector(".login-form")
const emailInput = document.querySelector(".login-email")
const passwordInput = document.querySelector(".login-password")
const loginSignup = document.querySelector(".login-signup")

const userElem = document.querySelector('.user')
const userNameElem = document.querySelector('.user-name')

const exitElem = document.querySelector('.exit')
const editElem = document.querySelector('.edit')
const editContainer = document.querySelector('.edit-container')
const editBtnElem = document.querySelector('.edit-btn')

const editUsername = document.querySelector('.edit-username')
const editPhoto = document.querySelector('.edit-photo')

const userAvatarElem = document.querySelector('.user-avatar')

const listUsers = [
    {
        email: 'admin@gmail.com',
        password: 'ADMIN',
        displayName: 'ADMIN'
    },
    {
        email: 'user@gmail.com',
        password: 'user',
        displayName: 'user'
    },
];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) return alert('email не валиден')
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными ненайден!')
        }
    },
    logOut(handler) {
        this.user = null;
        handler();
    },
    signUp(email, password, handler) {
        if(!email.trim() || !password.trim()){
            alert("Ведите данные!")
            return
        }
        if (!regExpValidEmail.test(email)) return alert('email не валиден')
        if(!this.getUser(email)){
            const user = {email, password, displayName: email};
            listUsers.push(user)
            this.authUser(user)
            handler();
        } else{
            alert('Пользователь с такой почтой уже существует!')
        }
    },
    editUser(userName, userPhotoURL, handler) {
        if(userName) {
            this.user.displayName = userNameElem.innerHTML;
        }
        if(userPhotoURL) {
            this.user.photo = userPhotoURL;
        }
        handler();
    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authUser(user) {
        this.user = user;
    }
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    if(user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    }
    else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
};

loginForm.addEventListener('submit', event => {
    event.preventDefault();
    setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
});

loginSignup.addEventListener('click', event => {
    event.preventDefault();
    setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
    loginForm.reset();
});


exitElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
});

editElem.addEventListener('click', event => {
    event.preventDefault();
    editContainer.classList.toggle("visibletwo");
});

editBtnElem.addEventListener('click', event => {
    event.preventDefault();
    setUsers.editUser(editUsername.value, editPhoto.value, toggleAuthDom);
});

toggleAuthDom();
