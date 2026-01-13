const filterButtons = document.querySelectorAll("[data-filter]");
const projects = document.querySelectorAll("#projects article");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        projects.forEach(project => {
            project.hidden =
                filter !== "all" &&
                project.dataset.category !== filter;
        });
    });
});
