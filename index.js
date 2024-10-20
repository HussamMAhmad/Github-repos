// setting up variables 
let input = document.querySelector(".get-repos input"),
    getButton = document.querySelector(".get-button"),
    data = document.querySelector(".show-data");

getButton.onclick = function () {
    getRepos();
};

function getRepos() {
    if (input.value == '') {
        data.innerHTML = "<span>please enter the url repos</span>";
    } else {
        fetch(`https://api.github.com/users/${input.value}/repos`)
            .then((result) => result.json())
            .then((result) => {
                data.innerHTML = ""
                console.log(result); 
                result.forEach((repo) => {
                    let div = document.createElement('div');
                    let divText = document.createTextNode(repo.name);
                    div.appendChild(divText);
                    div.className = 'repo-box' ; 

                    let urlRepo = document.createElement('a');
                    let urlRepoText = document.createTextNode('visit');
                    urlRepo.setAttribute('href', `https://github.com/${input.value}/${repo.name}`)
                    urlRepo.setAttribute('target', '_blank');
                    urlRepo.appendChild(urlRepoText);

                    let starsSpan = document.createElement('span'); 
                    let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

                    starsSpan.appendChild(starsText); 

                    div.appendChild(starsSpan);
                    div.appendChild(urlRepo);
                    data.appendChild(div);
                });
            })
    }
}