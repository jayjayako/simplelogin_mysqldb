const socket = io();

socket.on("chat-message", (msg) => {
  alert(msg);
  console.log(msg);
});

function sendrealtime() {
  socket.emit("message", {
    message: "this is from client socket",
  });
}

async function dashboard() {
  try {
    let response = await fetch("/api/user1/dashboard/dashboard", {
      method: "GET",
    });
    let myresult = await response.json();
    if (myresult[0].id == "invalid") {
      location.replace("../login");
    } else {
      document.getElementById("titleid").innerHTML = myresult[0].name;
    }
  } catch (error) {
    alert("Error occured hays");
  }
}

async function uploadfile() {
  var fileid = document.getElementById("file1");
  let formData = new FormData();
  formData.append("file1", fileid.files[0]);
  let response = await fetch("/api/user1/dashboard/fileupload", {
    method: "POST",
    body: formData,
  });
  let myresult = await response.json();
  if (myresult[0].id == "invalid") {
    alert("Invalid");
  } else {
    alert("File Upload Success");
  }
}

function logout() {
  fetch("/api/authentication/logout", {
    method: "GET",
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  location.replace("../login");
}

setTimeout(dashboard, 500);
