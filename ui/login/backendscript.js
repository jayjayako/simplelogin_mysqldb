async function login() {
  var username = document.getElementById("usernametext").value;
  var password = document.getElementById("passwordtext").value;
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  axios
    .post("/api/authentication/login", formData)
    .then((response) => {
      if (response.data[0].id != "invalid") {
        location.replace("../dashboard");
      } else {
        alert("Invalid");
      }
    })
    .catch((error) => {
      alert("Invalid");
    });
}

async function checkuser() {
  try {
    let response = await fetch("/api/authentication/checkuser", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "loggedin") {
      location.replace("../dashboard");
    }
  } catch (error) {
    alert("Error occured hays");
  }
}
checkuser();

function register() {
  location.replace("../register");
}
