import {apiUrl} from "../helpers/conts.js";
// Login
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmation = document.getElementById("confirmation");
const btnLogin = document.getElementById("login");

// Register
const emailRegister = document.getElementById("adressEmail");
const passwordRegister = document.getElementById("passwordRegister");
const passwordRegisterConfirmation = document.getElementById(
  "passwordConfirmation"
);
const btnRegister = document.getElementById("register");
const btnCerrar = document.getElementById("btnModalCerrar");

btnRegister.addEventListener("click", (e) => {
  e.preventDefault();
  createUser();
  btnModalCerrar.click();
});

// Create user
async function createUser() {
  try {
    const userExist = await fetch(
      `${apiUrl}/users?email=${emailRegister.value}`
    );

    const data = await userExist.json();

    if (data.length > 0) {
      console.log("usuario YA registrado ");
      return;
    }

    const user = {
      email: emailRegister.value,
      password: passwordRegister.value,
      role: "user",
    };

    if (passwordRegister.value === passwordRegisterConfirmation.value) {
      const createUser = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return;
    }
    console.log("Las contraseñas NO coinciden");
  } catch (error) {
    console.log(error.message);
  }
}

// Login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  validateLogin();
});

async function validateLogin() {
  try {
    console.log(email.value);
    const login = await fetch(`${apiUrl}/users?email=${email.value}`);
    const data = await login.json();
    if (data.length < 1) {
      console.log("user no creado");
      return;
    }

    if (email.value === data[0].email && password.value === data[0].password) {
      if (data[0].email === "samiAdmin@sami.com") {
        window.open("../../admin.html", "_blank");
      }

      if (data[0].email !== "samiAdmin@sami.com") {
        console.log("Entro");
        window.location.href = "../../user-page.html";
      }
      localStorage.setItem("userSami", JSON.stringify(data[0]));
    }
    console.log("correo y/o contrasena incorrecta");
  } catch (error) {
    console.log(error.message);
  }
}
