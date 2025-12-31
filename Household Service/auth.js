// alert()
document.addEventListener("DOMContentLoaded", function () {
  const auth_button = document.getElementById("auth-button");
  const token = localStorage.getItem("token");

  if (token) {
    auth_button.innerHTML = `
            <button onclick="handleProfile(event)" type="button" class="bg-indigo-500 border-2 border-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold cursor-pointer">
                Profile
            </button>
            
            <button type="button" onclick="handleLogout(event)" class="bg-red-500 hover:bg-red-600 border-2 border-red-500 hover:border-red-600 px-4 py-2 text-white rounded-full font-semibold cursor-pointer transition-colors duration-200"><a href="">Logout</a></button>
        `;
  } else {
    auth_button.innerHTML = `
            <button class="bg-indigo-500 border-2 border-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold cursor-pointer"><a href="login.html">Sign In</a></button>
            <button class="hover:bg-indigo-500 border-2 border-indigo-500 px-4 py-2 hover:text-white rounded-full font-semibold cursor-pointer transition-colors duration-200"><a href="register.html">Sign Up</a></button>
        `;
  }
});

const handleProfile = (event) => {
  event.preventDefault();
  if (localStorage.getItem("role") === "customer") {
    window.location.href = "customer_dashboard.html";
  } else {
    window.location.href = "admin_dashboard.html";
  }
};

// // auth.js
const handleRegistration = (event) => {
  event.preventDefault();
  if (localStorage.getItem("token")) {
    alert("You are already logged in.");
    window.location.href = "index.html";
  }

  const getValue = (id) => document.getElementById(id).value;

  const username = getValue("username");
  const first_name = getValue("first_name");
  const last_name = getValue("last_name");
  const email = getValue("email");
  const phone = getValue("phone");
  const address = getValue("address");
  const password = getValue("password");
  const confirm_password = getValue("confirm_password");

  if (password !== confirm_password) {
    alert("Passwords do not match!");
    return;
  }

  const info = {
    username,
    first_name,
    last_name,
    email,
    phone,
    address,
    password,
    confirm_password,
  };

  console.log("Sending registration data:", info);

  fetch("https://swiftservice-api.onrender.com/auth/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert(
        "Registration successful! Please check your email to verify your account."
      );
      document.getElementById("registration-form").reset();
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again later.");
    });
};

const handleLogin = (event) => {
  event.preventDefault();
  if (localStorage.getItem("token")) {
    alert("You are already logged in.");
    window.location.href = "index.html";
  }

  const getValue = (id) => document.getElementById(id).value;

  const username = getValue("username");
  const password = getValue("password");

  const info = {
    username,
    password,
  };

  console.log("Sending registration data:", info);

  fetch("https://swiftservice-api.onrender.com/auth/login/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      // console.log(data.token);
      // console.log(data.user_id);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_id", data.user_id);
      if (data.token && data.customer_id) {
        localStorage.setItem("customer_id", data.customer_id);
        localStorage.setItem("role", "customer");
        alert("Login successful!");
        document.getElementById("login-form").reset();
        window.location.href = "customer_dashboard.html";
      } else if (data.token) {
        localStorage.setItem("role", "admin");
        alert("Login successful!");
        document.getElementById("login-form").reset();
        window.location.href = "admin_dashboard.html";
      } else {
        alert(data.error);
        document.getElementById("login-form").reset();
        window.location.href = "login.html";
      }
    });
};

const handleLogout = (event) => {
  event.preventDefault();

  fetch("https://swiftservice-api.onrender.com/auth/logout/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      localStorage.clear();
      alert("Logout successful!");
      window.location.href = "index.html";
    });
};

const handleChangePassword = (event) => {
  event.preventDefault();
  const getValue = (id) => document.getElementById(id).value;
  const old_password = getValue("old_password");
  const new_password = getValue("new_password");
  const confirm_password = getValue("confirm_password");
  if (new_password !== confirm_password) {
    alert("New password & Confirm password do not match!");
    return;
  }
  const info = {
    old_password,
    new_password,
    confirm_password,
  };
  console.log("Sending change password data:", info);
  fetch("https://swiftservice-api.onrender.com/auth/change-password/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("Password changed successfully!");
      document.getElementById("change-password-form").reset();
      window.location.href = "customer_dashboard.html";
    })
    .catch((error) => {
      console.error("Change password error:", error);
      alert("Password change failed. Please try again later.");
    });
};
