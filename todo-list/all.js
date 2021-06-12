let tasks = [
  {
    task: "把冰箱發霉的檸檬拿去丟",
    done: false,
  },
  {
    task: "打電話叫媽媽匯款給我",
    done: true,
  },
  {
    task: "整理電腦資料夾",
    done: false,
  },
  {
    task: "繳電費水費瓦斯費",
    done: true,
  },
];

const doneTake = (index, task) => `
<div class="list" task-num=${index}>
    <ul class="task done" >
        <li>
            <i class="fa fa-check"></i>
        </li>
        <li class="task-desc">
            <span class="desc">${task}</span>
        </li>
        <li class="delete">
              <i class="fa fa-times fa-lg"></i>
        </li>
    </ul>
  </div>
`;

const undoneTake = (index, task) => `
<div class="list" task-num=${index} ">
    <ul class="task" >
        <li>
          <i class="fa fa-square-o" aria-hidden="true"></i>
        </li>
        <li class="task-desc">
            <span class="desc">${task}</span>
        </li>
        <li ></li>
    </ul>
  </div>
`;

// Footer
const ft = document.querySelector(".content-footer");
function footer(count, key) {
  switch (key) {
    case "undone":
      ft.innerHTML = `
        <div class="counter">
        ${count} 個待完成項目
        </div>
        `;
      break;
    case "done":
      ft.innerHTML = `
         <a href="#" class='clean'>清除已完成項目</a>
      `;
      break;
    default:
      ft.innerHTML = `
        <div class="counter">
        ${count} 個待完成項目
        </div>
        <a href="#" class='clean'>清除已完成項目</a>
      `;
      break;
  }
}

// Default render
const content = document.querySelector(".content");
const contentList = document.querySelector(".content-list");
function rederData() {
  let count = 0;
  let str = "";
  if (tasks.length > 0) {
    tasks.forEach((task, index) => {
      if (task.done) {
        //  Task has done.
        str += doneTake(index, task.task);
      } else {
        // Task has undone.
        str += undoneTake(index, task.task);
        count += 1;
      }
    });
    footer(count);
    contentList.innerHTML = str;
  } else {
    content.style.display = "none";
  }
}

rederData();
let tab = "filter-all";

// Add Task
const addBtn = document.querySelector(".btn");
const text = document.querySelector("input");
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTask = text.value;
  if (newTask == "") {
    alert("Please type your task!!!");
    return;
  }
  tasks.push({
    task: newTask,
    done: false,
  });
  text.value = "";
  content.style.display = "block";
  switchTab();
});

function undoneTaskList() {
  let str = "";
  let count = 0;
  selectTab(filterUndone);
  tasks.forEach((task, index) => {
    if (!task.done) {
      str += undoneTake(index, task.task);
      count += 1;
    }
  });
  contentList.innerHTML = str;
  footer(count, "undone");
  tab = "filter-undone";
}

function doneTaskList() {
  let str = "";
  tasks.forEach((task, index) => {
    selectTab(filterDone);
    if (task.done) {
      str += doneTake(index, task.task);
    }
  });
  contentList.innerHTML = str;
  footer(0, "done");
  tab = "filter-done";
}

// Filter for All
const filterAll = document.querySelector(".filter-all");
filterAll.addEventListener("click", (e) => {
  selectTab(filterAll);
  tab = "filter-all";
  rederData();
});

// Filter for undone
const filterUndone = document.querySelector(".filter-undone");
filterUndone.addEventListener("click", undoneTaskList);

// Filter for done
const filterDone = document.querySelector(".filter-done");
filterDone.addEventListener("click", doneTaskList);

// Change color for chose tab
function selectTab(tab) {
  filterAll.style.color = "#9f9a91";
  filterUndone.style.color = "#9f9a91";
  filterDone.style.color = "#9f9a91";
  tab.style.color = "#333333";
}

// Clickk on task to change status
const list = document.querySelector(".content-list");
list.addEventListener("click", (e) => {
  let key = e.target.getAttribute("class");
  let taskDescIdx = e.target.parentNode.parentNode.getAttribute("task-num");
  let index =
    e.target.parentNode.parentNode.parentNode.getAttribute("task-num");
  switch (key) {
    case "fa fa-times fa-lg":
      // Delete Task
      tasks.splice(index, 1);
      rederData();
      break;
    case "task-desc":
      checkTask(taskDescIdx);
      break;
    case "fa fa-check":
      checkTask(index);
      break;
    case "fa fa-square-o":
      checkTask(index);
      break;
    case "desc":
      checkTask(index);
      break;
    default:
      return;
  }
});

// Change the status of task and keep in same tab
function checkTask(index) {
  tasks.forEach((task, i) => {
    if (i == index) {
      task.done = !task.done;
    }
  });
  switchTab();
}

// Switch tab
function switchTab() {
  switch (tab) {
    case "filter-all":
      rederData();
      break;
    case "filter-undone":
      undoneTaskList();
      break;
    case "filter-done":
      doneTaskList();
      break;
    default:
      rederData();
      break;
  }
}

// Clean up Button
ft.addEventListener("click", (e) => {
  let key = e.target.getAttribute("class");
  if (key == "clean") {
    tasks = tasks.filter((task) => task.done == false);
  }
  switchTab();
});
