// Function to get query parameters
function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
    return params;
}

const queryParams = getQueryParams();
const lessonPath = queryParams.lesson ? `/lessons/${queryParams.lesson}` : '/lessons/gb.json';
let currentFrame = 0;
let lessonData = null;

async function loadLesson(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading lesson:', error);
    }
}

function renderFrame(frame) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear previous frame

    const frameDiv = document.createElement('div');
    frameDiv.className = 'frame';

    if (frame.type === 'textBall') {
        const textBall = document.createElement('div');
        textBall.className = 'text-ball';
        textBall.style.left = `${frame.x}px`;
        textBall.style.top = `${frame.y}px`;
        textBall.innerText = frame.content;
        frameDiv.appendChild(textBall);
    }

   if (frame.type === 'question') {
    frame.questions.forEach(question => {
        const questionText = document.createElement('p');
        questionText.className = 'question-text';
        
        // Style the question text
        questionText.innerText = question.text;
        questionText.style.color = 'orange'; // Set text color to orange
        questionText.style.fontSize = '2rem'; // Set font size to large (adjust as needed)

        frameDiv.appendChild(questionText);

        // Uniform button styling
        const answerBtns = [];

        const correctBtn = document.createElement('button');
        correctBtn.innerText = question.correctAnswer.text;
        correctBtn.className = 'answer-btn';
        correctBtn.onclick = () => alert('Correct!');
        answerBtns.push(correctBtn);

        question.falseAnswers.forEach(falseAnswer => {
            const falseBtn = document.createElement('button');
            falseBtn.innerText = falseAnswer.text;
            falseBtn.className = 'answer-btn';
            falseBtn.onclick = () => alert('Wrong!');
            answerBtns.push(falseBtn);
        });

        // Append all buttons
        answerBtns.forEach(btn => frameDiv.appendChild(btn));
    });
}

    if (frame.type === 'title') {
        // Update the persistent title
        const title = document.getElementById('title').querySelector('h1');
        title.innerText = frame.content;
    }

if (frame.type === 'infoBall') {
    const infoBall = document.createElement('div');
    infoBall.className = 'info-ball';
    
    // Positioning and sizing the info ball
    infoBall.style.position = 'absolute'; // Make sure to set the position to absolute
    infoBall.style.left = '50%'; // Center horizontally
    infoBall.style.top = '30%'; // Center vertically
    infoBall.style.transform = 'translate(-50%, -50%)'; // Adjust to perfectly center it
    infoBall.style.width = '50%'; // Set width to 50%
    infoBall.style.height = 'auto'; // Set height to auto to fit content
    
    infoBall.innerText = frame.text; // Set the text for the info ball
    frameDiv.appendChild(infoBall); // Append the info ball to the frame
}


    if (frame.type === 'image') {
        const image = document.createElement('img');
        image.src = frame.src; // Ensure your JSON includes 'src' for images
        image.className = 'frame-image';
        frameDiv.appendChild(image);
    }

    app.appendChild(frameDiv);
}

async function init() {
    lessonData = await loadLesson(lessonPath);
    if (lessonData && lessonData.frames && lessonData.frames.length > 0) {
        renderFrame(lessonData.frames[currentFrame]);

        document.getElementById('nextBtn').addEventListener('click', () => {
            if (currentFrame < lessonData.frames.length - 1) {
                currentFrame++;
                renderFrame(lessonData.frames[currentFrame]);
            }
        });

        document.getElementById('prevBtn').addEventListener('click', () => {
            if (currentFrame > 0) {
                currentFrame--;
                renderFrame(lessonData.frames[currentFrame]);
            }
        });
    } else {
        const app = document.getElementById('app');
        app.innerHTML = '<p>No lesson data available.</p>';
    }
}

window.onload = init;
