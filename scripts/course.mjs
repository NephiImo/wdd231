import { renderSections } from "./output.mjs";

const byuiCourse = {
    code: "WDD231",
    name: "Web Frontend Development I",
    sections: [
        {
            sectionNumber: 1,
            enrolled: 88,
            instructor: "Brother Bingham",
        },
        {
            sectionNumber: 2,
            enrolled: 81,
            instructor: "Sister Shultz",
        },
        {
            sectionNumber: 3,
            enrolled: 95,
            instructor: "Sister Smith",
        },
    ],
    changeEnrollment: function (sectionNumber, add = true) {
        // Find the section with the given section number
        const sectionIndex = this.sections.findIndex(
            (section) => section.sectionNumber == sectionNumber
        );
        if (sectionIndex >= 0) {
            if (add) {
                this.sections[sectionIndex].enrolled++;
            } else {
                this.sections[sectionIndex].enrolled--;
            }
        }
    },
};

document.querySelector("#enrollStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
    const sectionNum = Number(document.querySelector("#sectionNumber").value);
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

export default byuiCourse;