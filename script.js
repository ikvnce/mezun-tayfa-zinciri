document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.getElementById("calendar");
    const activityModal = document.getElementById("activityModal");
    const closeModal = document.getElementById("closeModal");
    const activityText = document.getElementById("activityText");
    const editBtn = document.getElementById("editBtn");
    const saveBtn = document.getElementById("saveBtn");

    const startDate = new Date(2024, 7); // Ağustos 2024
    const endDate = new Date(2025, 5, 30); // Haziran 2025

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        dayDiv.textContent = d.toDateString();
        dayDiv.dataset.date = d.toISOString().split('T')[0];
        calendar.appendChild(dayDiv);

        dayDiv.addEventListener("click", function () {
            const selectedDate = this.dataset.date;
            const savedActivity = localStorage.getItem(selectedDate) || '';
            activityText.value = savedActivity;
            activityText.disabled = true;
            saveBtn.disabled = true;
            activityModal.style.display = "block";

            editBtn.onclick = function () {
                activityText.disabled = false;
                saveBtn.disabled = false;
            };

            saveBtn.onclick = function () {
                localStorage.setItem(selectedDate, activityText.value);
                activityText.disabled = true;
                saveBtn.disabled = true;
            };
        });
    }

    closeModal.addEventListener("click", function () {
        activityModal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target === activityModal) {
            activityModal.style.display = "none";
        }
    };
});
