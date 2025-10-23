


let citizenRequests = [];

// Login function
function login() {
  const role = document.getElementById("roleSelect").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(username && password) {
    document.getElementById("login-page").classList.remove("active");
    document.getElementById("navbar").classList.remove("hidden");

    if(role === "citizen") showSection("citizen-dashboard");
    else showSection("official-dashboard");

    updateNavbar(role);
  } else {
    alert("Please enter username and password!");
  }
}

// Show section & hide others
function showSection(sectionId) {
  const dashboards = document.querySelectorAll(".dashboard");
  dashboards.forEach(d => d.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// Update Navbar
function updateNavbar(role) {
  const navLinks = document.getElementById("nav-links");
  navLinks.innerHTML = "";

  const links = [];
  if(role === "citizen") {
    links.push({name: "Home", section: "citizen-dashboard"});
    links.push({name: "Contact", section: "contact-dashboard"});
  } else {
    links.push({name: "Home", section: "official-dashboard"});
    links.push({name: "About", section: "about-dashboard"});
  }
  links.push({name: "Logout", action: () => logout()});

  links.forEach(link => {
    const a = document.createElement("a");
    a.href = "#";
    a.innerText = link.name;
    if(link.section) a.onclick = () => showSection(link.section);
    else if(link.action) a.onclick = link.action;
    navLinks.appendChild(a);
  });
}

// Logout
function logout() { location.reload(); }

// Citizen submits request
function submitRequest() {
  const service = document.getElementById("serviceSelect").value;
  const identity = document.getElementById("identityUpload").files[0];
  const application = document.getElementById("applicationUpload").files[0];

  if(!identity || !application) { alert("Please upload both files!"); return; }

  const request = { id: Date.now(), service, status: "Pending" };
  citizenRequests.push(request);

  updateCitizenRequests();
  updateOfficialRequests();
}

// Update citizen requests
function updateCitizenRequests() {
  const ul = document.getElementById("citizenRequests");
  ul.innerHTML = "";
  citizenRequests.forEach(req => {
    const li = document.createElement("li");
    li.innerText = `${req.service} - ${req.status}`;
    ul.appendChild(li);
  });
}

// Update official requests
function updateOfficialRequests() {
  const ul = document.getElementById("officialRequests");
  ul.innerHTML = "";

  citizenRequests.forEach(req => {
    const li = document.createElement("li");
    li.innerText = req.service + " - ";

    ["Pending","Approved","Rejected"].forEach(status => {
      const btn = document.createElement("button");
      btn.innerText = status;
      btn.onclick = () => {
        req.status = status;
        updateCitizenRequests();
        updateOfficialRequests();
      };
      li.appendChild(btn);
    });

    ul.appendChild(li);
  });
}

// Generate ETA
function generateETA() {
  const eta = Math.floor(Math.random() * 10) + 1;
  document.getElementById("etaTime").innerText = `${eta} Days`;
}

// Contact form
function submitContact(event) {
  event.preventDefault();
  alert("Message sent! We'll contact you soon.");
  event.target.reset();
}
