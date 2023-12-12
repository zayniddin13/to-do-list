const form = document.getElementById("form");
const todos = document.getElementById("todos");
const newTab=document.getElementById('new')
const doneTab=document.getElementById('done')
const removeTab=document.getElementById('removed')
const fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi");
console.log(fruits);

const list =[];
 document.querySelector('.todos_clear_btn').classList.add('hidden')
const add = (event) => {
  newTab.style.display = "none"
  doneTab.style.display = "none"
  removeTab.style.display="none"
  todos.style.display="block"
  event.preventDefault();
  list.unshift({
    title: event.target.input.value,
    isCompleted: false,
    // status: "removed" | "new" | "done",
  });
  updateDOM();
  saveTask()
  document.querySelector('.todos_clear_btn').classList.remove('hidden')
  document.querySelector('.todos_clear_btn').classList.add('block')
  event.target.input.value = "";
};



function complete(index) {
  let planInput=document.querySelectorAll("#planInput")
  newEl={
  title:  planInput[index].value,
  isCompleted: false,
  }
  list.splice((index), 1, newEl)
  list[index].isCompleted = !list[index].isCompleted;
console.log(list);
  updateDOM();
}
let removedArr=[]
function deleteTask(index) {
let newArr=list.splice(index, 1);
removedArr.push(newArr)
  updateDOM();
  removedPlan();
  saveTask()
}
function removedTask(index) {
  removedArr.splice(index, 1)
  removedPlan();
  saveTask()
}
function removedPlan() {
  removeTab.innerHTML=""
  removedArr.forEach((el, index)=> {
    removeTab.innerHTML+=`<div
    class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
    <div class="flex items-center gap-2 ">
        <span onclick="complete(${index})" class="cursor-pointer transition-color duration-300 text-[64px] text-orange"></span>
      <h2 class="text-3.5xl font-normal">
          ${el[0].title}
      </h2>
    </div>
    <button class="group"  onclick="removedTask(${index})">
        <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
    </button>

    </div>`
  });

}

function clearTasks() {
  list.splice(0, list.length)
  todos.innerHTML = "";
  removeTab.innerHTML="";
  newTab.innerHTM=""
  document.querySelector('.todos_clear_btn').classList.remove('block')
  document.querySelector('.todos_clear_btn').classList.add('hidden')
  saveTask()
  localStorage.clear()
}

function updateDOM() {
  todos.innerHTML = "";
  newTab.innerHTML = "";
  doneTab.innerHTML="";
  list.forEach((el, index) => {
    todos.innerHTML += `
          <div
          class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
          <div class="flex items-center gap-2 ">
              <span onclick="complete(${index})" class="cursor-pointer transition-color duration-300 ${
      el.isCompleted
        ? "icon-checked text-orange"
        : "icon-checkbox text-gray-100"
    } text-[64px] text-orange"></span>
            <input type="text" value="${el.title}" id="planInput" class="w-full bg-inherit outline-none text-3.5xl font-normal
            ${
              el.isCompleted ? "text-gray-200 line-through" : "text-dark"
            }
            "  ${el.isCompleted ? 'readonly' : input.focus()}>
          </div>
          <button class="group"  onclick="deleteTask(${index})">
              <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
          </button>

          </div>
          `;
          
        if (el.isCompleted==false) {
          console.log(el);
          
          newTab.innerHTML+=`
          <div
          class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
          <div class="flex items-center gap-2 ">
              <span onclick="complete(${index})" class="cursor-pointer transition-color duration-300 ${
      el.isCompleted
        ? "icon-checked text-orange"
        : "icon-checkbox text-gray-100"
    } text-[64px] text-orange"></span>
            <input type="text" value="${el.title}" id="planInput" class="w-full bg-inherit outline-none text-3.5xl font-normal
            ${
              el.isCompleted ? "text-gray-200 line-through" : "text-dark"
            }
            "  ${el.isCompleted ? 'readonly' : input.focus()}>
          </div>
          <button class="group"  onclick="deleteTask(${index})">
              <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
          </button>

          </div>
          `
          
        }else{
          doneTab.innerHTML+=`
          <div
          class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
          <div class="flex items-center gap-2 ">
              <span onclick="complete(${index})" class="cursor-pointer transition-color duration-300 text-[64px] text-orange"></span>
            <h2 class="text-3.5xl font-normal">
                ${el.title}
            </h2>
          </div>
          <button class="group"  onclick="deleteTask(${index})">
              <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
          </button>

          </div>
          `
        }
  });
  saveTask()
}


function openCity(cityName) {
  if (cityName!=='todos') {
    document.querySelector('.todos_clear_btn').classList.add('hidden')
  }else{
    document.querySelector('.todos_clear_btn').classList.remove('hidden')
  document.querySelector('.todos_clear_btn').classList.add('block')
  }
  var i;
  var x = document.getElementsByClassName("plan");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(cityName).style.display = "block";
}
function saveTask() {
  localStorage.setItem("plan", JSON.stringify(list))
  localStorage.setItem("removed", JSON.stringify(removedArr))
  localStorage.setItem("data", todos.innerHTML);
  localStorage.setItem("removedData", removeTab.innerHTML)
  localStorage.setItem("doneTab", doneTab.innerHTML)
  localStorage.setItem("newTab", newTab.innerHTML)

}
function getTask() {
 todos.innerHTML= localStorage.getItem("data")
 removeTab.innerHTML=localStorage.getItem("removedData")
 doneTab.innerHTML=localStorage.getItem("doneTab")
 newTab.innerHTML=localStorage.getItem("newTab")
let localPlan=JSON.parse(localStorage.getItem("plan"))
localPlan.forEach(item => {
list.push(item)
});
let removedPlan=JSON.parse(localStorage.getItem("removed"))
removedPlan.forEach(item => {
  removedArr.push(item)
});
}
getTask() 



