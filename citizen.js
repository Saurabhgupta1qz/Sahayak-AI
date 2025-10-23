// Load previous requests from localStorage
let citizenRequests = JSON.parse(localStorage.getItem("citizenRequests")) || [];

// Display requests
function updateRequests(){
  const ul = document.getElementById("citizenRequests");
  ul.innerHTML = "";
  citizenRequests.forEach(req=>{
    let color=req.status==="Approved"?"green":req.status==="Rejected"?"red":"orange";
    const li = document.createElement("li");
    li.innerHTML=`${req.service} - <span style="color:${color}; font-weight:bold">${req.status}</span>`;
    ul.appendChild(li);
  });
}

// Submit a new request
function submitRequest(){
  const service=document.getElementById("serviceSelect").value;
  const identity=document.getElementById("identityUpload").files[0];
  const application=document.getElementById("applicationUpload").files[0];

  if(!identity || !application){ alert("Upload both files!"); return; }

  const request = { service, status:"Pending" };
  citizenRequests.push(request);

  // Save to localStorage
  localStorage.setItem("citizenRequests", JSON.stringify(citizenRequests));

  updateRequests();
}

// Initialize on page load
updateRequests();
