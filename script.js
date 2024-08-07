document.addEventListener("DOMContentLoaded", function() {
    fetchGitHubStats();
    fetchYouTubeStats();
    // Add more functions for other platforms as needed
}); 

function fetchGitHubStats() {
    fetch('https://api.github.com/users/gurmehakkaur')
        .then(response => response.json())
        .then(data => {
            document.getElementById('stars').innerText = `Total Stars Earned: ${data.public_repos}`;
            /*document.getElementById('followers').innerText = `followers ${data.followers}`;
            document.getElementById('views').innerText = `views ${data.public_gists}`;*/
         
        });

    fetch('https://api.github.com/users/gurmehakkaur/repos')
        .then(response => response.json())
        .then(data => {
            let commits = 0;
            data.forEach(repo => {
                fetch(repo.commits_url.replace('{/sha}', ''))
                    .then(response => response.json())
                    .then(commitsData => {
                        commits += commitsData.length;
                        document.getElementById('commits').innerText = `Total Commits (2024): ${commits}`;
                    });
            });
        });
}
async function fetchYouTubeStats() {
    const API_KEY = 'secret'; 
    const CHANNEL_ID = 'secret';

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const viewCount = data.items[0].statistics.viewCount;

        // Display the view count on your webpage
        document.getElementById('viewCount').textContent = `Youtube Views: ${viewCount}`;
    } catch (error) {
        console.error('Failed to fetch YouTube stats:', error);
    }
}

// Call the function to fetch and display the stats
fetchYouTubeStats();
