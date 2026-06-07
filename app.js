let globalTasks = [];
let currentSelectedPrio = "High";
let editingTaskId = null;

// Gọi hàm fetch dữ liệu từ file data.json
document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromJson();
    setupFormEvents();
});

// Hàm đọc dữ liệu tĩnh từ tệp data.json bằng Fetch API
function loadTasksFromJson() {
    fetch("./data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải tập tin data.json");
            }
            return response.json();
        })
        .then(data => {
            globalTasks = data; // Gán dữ liệu từ file JSON vào biến toàn cục
            drawTasks(globalTasks); // Vẽ giao diện
        })
        .catch(error => {
            console.error("Lỗi dòng dữ liệu:", error);
            globalTasks = [
                { id: 1, name: "Go to gym", priority: "High", status: "To Do" },
                { id: 2, name: "Read a book", priority: "Low", status: "Done" },
                { id: 3, name: "Go to market", priority: "Medium", status: "In Progress" }
            ];
            drawTasks(globalTasks);
        });
}

function setupFormEvents() {
    const actionButtons = document.querySelectorAll("#prioBtnGroup button");
    actionButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            actionButtons.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");
            currentSelectedPrio = e.target.getAttribute("data-prio");
        });
    });

    document.getElementById("taskForm").addEventListener("submit", handleFormSubmit);
}

// XỬ LÝ VALIDATION VÀ LƯU DỮ LIỆU
function handleFormSubmit(e) {
    e.preventDefault();
    
    const inputField = document.getElementById("inputTaskName");
    const errorText = document.getElementById("inputTaskError");
    const val = inputField.value.trim();

    // Reset trạng thái lỗi trước khi kiểm tra
    inputField.classList.remove("is-invalid");
    if (errorText) errorText.innerText = "";

    // 1. Kiểm tra không được để trống
    if (val === "") {
        inputField.classList.add("is-invalid");
        if (errorText) errorText.innerText = "Tên task không được để trống!";
        return;
    }

    // 2. Kiểm tra độ dài không quá 100 ký tự
    if (val.length > 100) {
        inputField.classList.add("is-invalid");
        if (errorText) errorText.innerText = "Tên task không được vượt quá 100 ký tự!";
        return;
    }

    // Nếu hợp lệ, xử lý Thêm/Sửa
    if (editingTaskId !== null) {
        // CẬP NHẬT (SỬA)
        const statusField = document.getElementById("inputStatus");
        globalTasks = globalTasks.map(task => {
            if (task.id === editingTaskId) {
                return { ...task, name: val, priority: currentSelectedPrio, status: statusField.value };
            }
            return task;
        });
        editingTaskId = null;
    } else {
        // THÊM MỚI
        const freshTask = {
            id: Date.now(),
            name: val,
            priority: currentSelectedPrio,
            status: "To Do"
        };
        globalTasks.push(freshTask);
    }

    drawTasks(globalTasks);
    resetFormState();
}

// HÀM VẼ GIAO DIỆN
function drawTasks(list) {
    const listContainer = document.getElementById("tasksWrapper");
    if (!listContainer) return;
    
    listContainer.innerHTML = "";

    if (list.length === 0) {
        listContainer.innerHTML = `<div class="text-center text-muted py-4 fw-semibold">Danh sách trống. Hãy thêm task mới!</div>`;
        return;
    }

    let htmlBuffer = "";

    list.forEach(item => {
        let prioClass = "prio-text-high";
        if (item.priority === "Medium") prioClass = "prio-text-medium";
        if (item.priority === "Low") prioClass = "prio-text-low";

        let statusIconStructure = "";
        if (item.status === "To Do") {
            statusIconStructure = `<i class="far fa-circle status-icon icon-todo"></i>`;
        } else if (item.status === "In Progress") {
            statusIconStructure = `<i class="fas fa-circle-notch fa-spin status-icon icon-progress"></i>`;
        } else if (item.status === "Done") {
            statusIconStructure = `<i class="far fa-dot-circle status-icon icon-done"></i>`;
        }

        htmlBuffer += `
            <div class="task-row shadow-sm">
                <div style="flex: 2.2; min-width: 150px;" class="text-truncate">
                    <span class="lbl-title">Task</span>
                    <span class="lbl-value">${item.name}</span>
                </div>

                <div style="flex: 0.8;">
                    <span class="lbl-title">Priority</span>
                    <span class="${prioClass}">${item.priority}</span>
                </div>

                <div style="flex: 1; text-align: left;">
                    <span class="status-block">${item.status}</span>
                </div>

                <div class="action-group">
                    <div>${statusIconStructure}</div>
                    
                    <button type="button" class="btn-action-icon" onclick="triggerEdit(${item.id})" title="Sửa">
                        <i class="far fa-edit"></i>
                    </button>
                    
                    <button type="button" class="btn-action-icon btn-action-trash" onclick="removeTask(${item.id})" title="Xóa">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    listContainer.innerHTML = htmlBuffer;
}

// Xử lý Xóa
function removeTask(id) {
    if (confirm("Bạn có chắc chắn muốn xóa task này không?")) {
        globalTasks = globalTasks.filter(task => task.id !== id);
        drawTasks(globalTasks);
        if (editingTaskId === id) resetFormState();
    }
}

// Xử lý Sửa
function triggerEdit(id) {
    const targetTask = globalTasks.find(task => task.id === id);
    if (!targetTask) return;

    editingTaskId = id;
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("formTitle").innerText = "Update Task";
    document.getElementById("btnSubmitForm").innerText = "Update";
    document.getElementById("statusSelectGroup").style.display = "block";

    document.getElementById("inputTaskName").value = targetTask.name;
    document.getElementById("inputStatus").value = targetTask.status;

    currentSelectedPrio = targetTask.priority;
    const actionButtons = document.querySelectorAll("#prioBtnGroup button");
    actionButtons.forEach(b => {
        if (b.getAttribute("data-prio") === targetTask.priority) b.classList.add("active");
        else b.classList.remove("active");
    });

    document.getElementById("inputTaskName").focus();
}

function openFormForAdd() {
    resetFormState();
    document.getElementById("formContainer").style.display = "block";
    document.getElementById("inputTaskName").focus();
}

function hideFormContainer() {
    document.getElementById("formContainer").style.display = "none";
}

function resetFormState() {
    editingTaskId = null;
    document.getElementById("taskForm").reset();
    document.getElementById("formTitle").innerText = "Add Task";
    document.getElementById("btnSubmitForm").innerText = "Add";
    document.getElementById("statusSelectGroup").style.display = "none";

    currentSelectedPrio = "High";
    const actionButtons = document.querySelectorAll("#prioBtnGroup button");
    actionButtons.forEach(b => b.classList.remove("active"));
    
    const defaultBtn = document.querySelector("[data-prio='High']");
    if (defaultBtn) defaultBtn.classList.add("active");
    
    const inputField = document.getElementById("inputTaskName");
    if (inputField) inputField.classList.remove("is-invalid");
}