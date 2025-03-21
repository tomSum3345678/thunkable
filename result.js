window.onload = function() {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const score = urlParams.get('score') || 0;
    const totalTime = urlParams.get('time') || 0.0;

    // Display the score and time
    document.getElementById('score-display').textContent = `Score: ${score}/10`;
    document.getElementById('time-display').textContent = `Total Time: ${totalTime} sec`;
};

// Function to return to the main menu
function returnToMain() {
    window.location.href = "index.html";
}