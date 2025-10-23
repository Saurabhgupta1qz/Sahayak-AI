// Load requests from localStorage
let citizenRequests = JSON.parse(localStorage.getItem("citizenRequests")) || [];

function updateOfficialRequests(){
  const ul=document.getElementById("officialRequests");
  ul.innerHTML="";
  citizenRequests.forEach((req,index)=>{
    const li=document.createElement("li");
    li.innerText=req.service + " - ";
    ["Pending","Approved","Rejected"].forEach(status=>{
      const btn=document.createElement("button");
      btn.innerText=status;
      btn.onclick=()=>{
        citizenRequests[index].status=status;
        // Save changes
        localStorage.setItem("citizenRequests", JSON.stringify(citizenRequests));
        updateOfficialRequests();
      };
      li.appendChild(btn);
    });
    ul.appendChild(li);
  });
}

// Initialize
updateOfficialRequests();
