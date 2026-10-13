const walks = [];

const form = document.getElementById("walkForm");
const walkList = document.getElementById("walkList");

form.addEventListener("submit", function(event)
{
    event.preventDefault();

    const dogName = document.getElementById("dogName").value;
    const walkDate = document.getElementById("walkDate").value;
    const walkTime = document.getElementById("walkTime").value;
    const walkNotes = document.getElementById("walkNotes").value;

    if (dogName === "" || walkDate === "" || walkTime === "")
    {
        alert("Please fill out the dog name date and walk time.");
        return;
    }

    const dog =
    {
        name: dogName
    };

    const walk =
    {
        dog: dog,
        date: walkDate,
        time: walkTime,
        notes: walkNotes
    };

    walks.push(walk);

    showWalks();

    form.reset();
});

function showWalks()
{
    walkList.innerHTML = "";

    if (walks.length === 0)
    {
        walkList.innerHTML = "<p>No walks added yet.</p>";
        return;
    }

    for (let i = 0; i < walks.length; i++)
    {
        const walk = walks[i];

        const walkItem = document.createElement("div");

        walkItem.classList.add("border", "rounded", "p-3", "mb-2");

        walkItem.innerHTML = `
            <h4>${walk.dog.name}</h4>
            <p>Date: ${walk.date}</p>
            <p>Walk Time: ${walk.time} minutes</p>
            <p>Notes: ${walk.notes || "No notes"}</p>
        `;

        walkList.appendChild(walkItem);
    }
}

async function loadWalks()
{
    try
    {
        const response = await fetch("walks.json");
        const savedWalks = await response.json();

        for (let i = 0; i < savedWalks.length; i++)
        {
            walks.push(savedWalks[i]);
        }

        showWalks();
    }
    catch (error)
    {
        console.log("Could not load example walks.");
    }
}

$("#clearWalks").click(function()
{
    walks.length = 0;

    showWalks();
});

loadWalks();