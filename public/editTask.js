const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const taskIDDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");
const taskCompletedDOM = document.querySelector(".task-edit-completed");

// 1つのタスクを取得する
const showTask = async function () {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { completed, _id, name } = task;
    taskIDDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};

showTask();

// タスクの編集
editFormDOM.addEventListener("submit", async function (e) {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "編集が成功しました";
    formAlertDOM.classList.add("text-success");
    setTimeout(function () {
      formAlertDOM.style.display = "none";
      formAlertDOM.classList.remove("text-success");
    }, 3000);
  } catch (err) {
    console.log(err);
  }
});
