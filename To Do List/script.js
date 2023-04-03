let gorevListesi = [];

if(localStorage.getItem("gorevListesi") !== null) {
    gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
}

let editId;
let isEditTask = false;
const taskInput = document.querySelector("#txtTaskName");
const btnClear = document.querySelector("#btnClear");
const filters = document.querySelectorAll(".filters span");

displayTasks("all");

// Listeyi Görüntüleme

function displayTasks(filter) {
    let ul = document.getElementById("task-list");

    ul.innerHTML = "";
    
    if(gorevListesi.length == 0) {
        
        ul.innerHTML = "<p class='p-3 m-0'>Görev Listeniz Boş.</p>";
    } else {

        for(let gorev of gorevListesi) {

            let completed = gorev.durum == "completed" ? "checked" : "";
    
            if(filter == gorev.durum || filter == "all") {

                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" onClick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${completed}>
                            <label for="${gorev.id}" class="form-check-label ${completed}">${gorev.gorevAdi}
                        </div>
                        <div class="dropdown">
                            <button class="dropdown-toggle btn btn-link" id="dropdownButton" data-bs-toggle="dropdown" type="button" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownButton">
                                <li><a onClick="deleteTask(${gorev.id})" href="#" class="dropdown-item"><i class="fa-solid fa-trash-can me-1"></i>Sil</a></li>
                                <li><a onClick="editTask(${gorev.id}, '${gorev.gorevAdi}')" href="#" class="dropdown-item"><i class="fa-solid fa-pen me-1"></i>Düzenle</a></li>
                            </ul>
                        </div>
                    </li>    
                `;
        
                ul.insertAdjacentHTML("beforeend", li);
            }
    
        }
    }

}



document.querySelector("#btnAddNewTask").addEventListener("click", newTask);
document.querySelector("#btnAddNewTask").addEventListener("keypress", (event) => {
    if(event.key == "Enter") {
        document.getElementById("#btnAddNewTask").click();
    }
})

// Filtreleme

for(let span of filters) {
    span.addEventListener("click", function() {
        document.querySelector("span.active").classList.remove("active");
        span.classList.add("active");
        displayTasks(span.id);
        console.log(gorevListesi);
    })
}
    
// Ekleme

function newTask(event) {
    
    if(taskInput.value == ""){
        alert("Görev Girmelisiniz!");
    } else {
        if(!isEditTask) {
            gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": taskInput.value, "durum": "pending"});
        } else {
            for(let gorev of gorevListesi) {
                if(gorev.id == editId) {
                    gorev.gorevAdi = taskInput.value;
                }
                isEditTask = false;
            }
        }
        taskInput.value = "";
        displayTasks(document.querySelector("span.active").id);
        localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    }

    event.preventDefault();
}

// Silme

function deleteTask(id) {
    for(let index in gorevListesi) {
        if(gorevListesi[index].id == id) {
            deletedId = index;
        }
    }

    // deletedId = gorevListesi.findIndex(function(gorev) {
    //     return gorev.id == id;
    // })

    // deletedId = gorevListesi.findIndex(gorev => gorev.id == id);

    gorevListesi.splice(deletedId, 1);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    displayTasks(document.querySelector("span.active").id);
}

// Güncelleme

function editTask(taskId, taskName) {
    editId = taskId;
    isEditTask = true;
    taskInput.value = taskName;
    taskInput.focus();
    taskInput.classList.add("active");
}
 
// Hepsini Silme

btnClear.addEventListener("click", function() {
    
    gorevListesi.splice(0, gorevListesi.length);
    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    displayTasks("all");
})


// btnClear.addEventListener("click", clearSome);

// function clearSome() {
//     let spanId;
//     for(let span of filters) {
//         if(span.classList.contains("active")) {
//             spanId = span.id;
//         } 
//     }
//     for(let gorev of gorevListesi) {
//         if(gorev.durum == spanId) {
//             gorevListesi.splice(gorevListesi.findIndex(x => x.durum == spanId), 1);
//         } else {
//             gorevListesi.splice(0, gorevListesi.length);
//         }
//     }
    
//     console.log(spanId);
//     displayTasks(spanId);
// }

 

//Durum

function updateStatus(selectedTask) {
    console.log(selectedTask.parentElement.lastElementChild);
    let label = selectedTask.nextElementSibling;
    let durum;

    if(selectedTask.checked) {
        label.classList.add("checked");
        durum = "completed";
    } else {
        label.classList.remove("checked");
        durum = "pending";
    }

    for(let gorev of gorevListesi) {
        if(gorev.id == selectedTask.id) {
            gorev.durum = durum;
        }
    }

    localStorage.setItem("gorevListesi", JSON.stringify(gorevListesi));
    displayTasks(document.querySelector("span.active").id);
    console.log(gorevListesi);
}