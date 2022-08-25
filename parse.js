const csv_rows = [
    // Headers
    ["Student", "CCID", "Email", "Lab Enrollment", "Lecture Enrollment"]
];

// Set it to be a CSV file
let csvContent = "data:text/csv;charset=utf-8,";

// Excludes empty rows
const rows = document.querySelectorAll('tr[id^="user-index-participants-"][class=""]');

rows.forEach(row => {
    // Excludes TAs and Instructors
    if (row.childNodes[4].innerText.trim() === "Student") {

        // student name
        student = row.childNodes[1].innerText;

        // campus computing id
        ccid = row.childNodes[2].innerText;

        // email address
        email = row.childNodes[3].innerText;

        // td element with 2 div children
        enrolled = row.childNodes[7];

        // first child is lab
        lab = enrolled.childNodes[0];

        // excludes the day and time
        lab_enrolled = lab.getAttribute("data-timeenrolled").split(",")[1];

		try {
			// second child is lecture
			lecture = enrolled.childNodes[1];

			// excludes the day and time
			lecture_enrolled = lecture.getAttribute("data-timeenrolled").split(",")[1];
		} 
		catch (err) {
            // for single-section classes
			lecture = lab;
			lecture_enrolled = lab_enrolled;
		}

        // append to csv_rows
        csv_rows.push([student, ccid, email, lab_enrolled, lecture_enrolled]);
    }
});

csv_rows.forEach(function(rowArray) {
    // join them with commas, returns an array as a string
    let row = rowArray.join(",");

    // add it to the csv file
    csvContent += row + "\r\n";
});

// add the number of students to the csv file
csvContent += `Number of Students,${csv_rows.length-1}`

// Used to encode Uniform Resource Identifiers (URIs) by replacing certain characters by one, two, three or four escape sequences representing the UTF-8 encoding of the character.
var encodedUri = encodeURI(csvContent);

// Loads the CSV into the existing browser context, automatically downloads the file
window.open(encodedUri);
