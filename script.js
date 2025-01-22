
document.addEventListener("DOMContentLoaded", function() {
    fetchGitHubStats();
    fetchYouTubeStats();

    var player;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('youtube-player', {
            height: '315',  
            width: '560',   
            videoId: 'RGh1lfFFUWI',  
            events: {
                'onReady': onPlayerReady
            }
        });
    }
    
    
    function onPlayerReady(event) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                
                if (entry.isIntersecting) {
                    player.playVideo();
                } else {
                    player.pauseVideo();  
                }
            });
        }, { threshold: 0.5 });  
    
        
        observer.observe(document.getElementById('youtube-player'));
    }
}); 
       
       
    
function fetchGitHubStats() {
    fetch('https://api.github.com/users/gurmehakkaur')
        .then(response => response.json())
        .then(data => {
            document.getElementById('stars').innerText = `Total Stars Earned: ${data.public_repos}`;
            
         
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



