async function loadLessons() {
    try {
        const response = await fetch('/lessons/lessons.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.lessons;
    } catch (error) {
        console.error('Error loading lessons:', error);
        return [];
    }
}

function displayLessons(lessons) {
    const container = document.getElementById('lessons-container');
    lessons.forEach(lesson => {
        const lessonButton = document.createElement('button');
        lessonButton.className = 'lesson-btn';
        lessonButton.innerText = lesson.name;
        lessonButton.onclick = () => {
            // Redirect to index.html with the selected lesson file as a query parameter
            window.location.href = `index.html?lesson=${encodeURIComponent(lesson.file)}`;
        };
        container.appendChild(lessonButton);
    });
}

async function init() {
    const lessons = await loadLessons();
    displayLessons(lessons);
}

window.onload = init;
