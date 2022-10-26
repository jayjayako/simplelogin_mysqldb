async function register() {
  var username = document.getElementById("usernametext").value;
  var password = document.getElementById("passwordtext").value;
  var lastname = document.getElementById("lastnametext").value;
  var firstname = document.getElementById("firstnametext").value;
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("lastname", lastname);
  formData.append("firstname", firstname);
  axios
    .post("/api/register/register", formData)
    .then((response) => {
      if (response.data[0].id != "invalid") {
        alert("Successfully Registered");
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
setTimeout(checkuser, 500);

function loginpage() {
  location.replace("../login");
}
