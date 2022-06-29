const fetch = require('node-fetch');

async function __getUserRepoNames(username){
    let repoNames = [];

    let repos = await fetch(`https://api.github.com/users/${username}/repos`);
    repos = await repos.json();

    for(let repo of repos){
        repoNames.push(repo.name);
    }
    
    return repoNames;
}

async function __getRepoLanguages(username, repoName){
    let languages = [];

    let repoLangs = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    repoLangs = await repoLangs.json();

    for(let lang in repoLangs){
        languages.push(lang);
    }
    return languages;
}

async function main(username){
    let repoNames = await __getUserRepoNames(username);
    let languages = [];

    for(let repoName of repoNames){
        let repoLangs = await __getRepoLanguages(username, repoName);

        for(let lang of repoLangs){
            if(!languages.includes(lang)){
                languages.push(lang);
            }
        }
    }

    return languages;
}

module.exports = main;