const inputField = document.getElementById("esc");
const listContainer = document.getElementById("list-container");
const addButton = document.getElementById("add");

function toDoListCreate() {
  const inputValue = inputField.value.trim();
  if (inputValue === "") {
    alert("Please enter a task!");

  } 
  else 
  {
    const li = document.createElement("li");
    li.classList.add("task-item");
    li.textContent = inputValue;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-task");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      li.remove();
    });

    li.appendChild(deleteBtn);

    let ul = listContainer.querySelector("ul");
    if (!ul) {
      ul = document.createElement("ul");
      listContainer.appendChild(ul);
    }

    ul.appendChild(li);
  }
}

addButton.addEventListener("click", toDoListCreate);
