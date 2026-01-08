cost Selections = document.querySelectorAll("section");
Selections.forEach(section=>{
    section.addEventListener("mouseenter",()=>{
        section.style.backgroundcolor="#f9f9f9";
    });
    section.addEventListener("mouseleave",()=>{
        section.style.backgroundcolor="white";
    });
});
 