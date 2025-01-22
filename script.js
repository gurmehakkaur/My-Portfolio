
document.addEventListener("DOMContentLoaded", function() {
    fetchGitHubStats();
    fetchYouTubeStats();

    var player;

    // This function is called when the YouTube IFrame API is ready
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('youtube-player', {
            height: '315',  // Height of the player
            width: '560',   // Width of the player
            videoId: 'RGh1lfFFUWI',  // YouTube video ID (remove the `&t` part for the timestamp)
            events: {
                'onReady': onPlayerReady  // Trigger onPlayerReady when the player is ready
            }
        });
    }
    
    // This function is called when the player is ready
    function onPlayerReady(event) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                // When the video is at least 50% visible, play it
                if (entry.isIntersecting) {
                    player.playVideo();
                } else {
                    player.pauseVideo();  // Otherwise, pause the video
                }
            });
        }, { threshold: 0.5 });  // Trigger when 50% of the video is visible
    
        // Observe the YouTube player container
        observer.observe(document.getElementById('youtube-player'));
    }
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
    const API_KEY = 'confidential'; 
    const CHANNEL_ID = 'confidential';

    const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const viewCount = data.items[0].statistics.viewCount;

        
        document.getElementById('viewCount').textContent = `Youtube Views: ${viewCount}`;
    } catch (error) {
        console.error('Failed to fetch YouTube stats:', error);
    }
}



