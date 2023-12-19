const form = document.getElementById("form");
const todos = document.getElementById("todos");
const newTab=document.getElementById('new')
const doneTab=document.getElementById('done')
const removeTab=document.getElementById('removed')
const list =[];
function keyInt(index, event) {
  console.log(index, event.target.value)
  list[index].title=event.target.value
console.log(list);
saveTask()
}
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
  });
  updateDOM();
  saveTask()
  document.querySelector('.todos_clear_btn').classList.remove('hidden')
  document.querySelector('.todos_clear_btn').classList.add('block')
  event.target.input.value = "";
  document.getElementById('todo_btn').classList.remove('bg-stone-400')
  document.getElementById('todo_btn').classList.add('bg-stone-300')
  document.getElementById('new_btn').classList.add('bg-stone-400')
  document.getElementById('new_btn').classList.remove('bg-stone-300')
  document.getElementById('removed_btn').classList.add('bg-stone-400')
  document.getElementById('removed_btn').classList.remove('bg-stone-300')
  document.getElementById('done_btn').classList.add('bg-stone-400')
  document.getElementById('done_btn').classList.remove('bg-stone-300')
};
function complete(index) {
  list[index].isCompleted = !list[index].isCompleted;
console.log(list);
  updateDOM();
}
function newComplete(index) {
  setTimeout(() => {
    list[index].isCompleted = !list[index].isCompleted;
    console.log(list);
      updateDOM();
  }, 3000);
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
    <form>
    <input type="text" value="${el.title}" oninput="keyInt(${index}, event)" id="input_plan" class="w-full bg-inherit outline-none text-3.5xl font-normal
    ${
      el.isCompleted ? "text-gray-200 line-through" : "text-dark"
    }
    "  ${el.isCompleted ? 'readonly' : input.focus()}>
    </form>
  </div>
  <button class="group"  onclick="deleteTask(${index})">
            
              <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
          </button>

          </div>`; 
        if (el.isCompleted==false) {
          newTab.innerHTML+=`
          <div
          class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
          <div class="flex items-center gap-2 ">
              <span onclick="newComplete(${index})" class="cursor-pointer transition-color duration-300 ${
      el.isCompleted
        ? "icon-checked text-orange"
        : "icon-checkbox text-gray-100"
    } text-[64px] text-orange"></span>
    <form>
            <input type="text" value="${el.title}" oninput="keyInt(${index})" class="w-full bg-inherit outline-none text-3.5xl font-normal
            ${
              el.isCompleted ? "text-gray-200 line-through" : "text-dark"
            }
            "  ${el.isCompleted ? 'readonly' : input.focus()}>
          </div>
          <button class="group"  onclick="deleteTask(${index})">
          </form>
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

          </div>`}
  });
  saveTask()
}
function openPan(PlanName, index) {
  if (PlanName!=='todos') {
    document.querySelector('.todos_clear_btn').classList.add('hidden')
    document.getElementById('todo_btn').classList.add('bg-stone-400')
  document.getElementById('todo_btn').classList.remove('bg-stone-300')
  }else{
    document.querySelector('.todos_clear_btn').classList.remove('hidden')
  document.querySelector('.todos_clear_btn').classList.add('block')
  }
  var i;
  var x = document.getElementsByClassName("plan");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  let btns=document.querySelectorAll('.plan__case__btn')
  for (let i = 0; i < btns.length; i++) {
    btns[i].classList.add('bg-stone-400')
    btns[i].classList.remove('bg-stone-300')
    
  }
  document.getElementById(PlanName).style.display = "block";
  document.getElementById(index).classList.remove('bg-stone-400')
  document.getElementById(index).classList.add('bg-stone-300')
}function saveTask() {
  localStorage.setItem("plan", JSON.stringify(list))
  localStorage.setItem("removed", JSON.stringify(removedArr))
}
function getTask() {
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
updateDOM()
removedPlan() 



