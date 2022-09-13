# GIT CLONER
Pressing `ctrl+DownArrow` will clone the repository currently opened in the current tab.

For this you need a nodejs server running in background, and a scirpt for violentmonkey that will listen to `ctrl+DownArrow` on github repos.

### ViolentMonkey script source code
Paste the following script in your violent monkey. This could work in other similar extensions such as greasemonkey, tampermonkey, etc although I have not tested against them.
The source code except the initial top-comments might remain same throughout these extensions.

```javascript
// ==UserScript==
// @name        Git Repo Cloner
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*/*
// @grant       none
// @version     1.0
// @author      -
// @grant       GM_xmlhttpRequest
// @description 13/09/2022, 13:05:53
// ==/UserScript==

document.onkeydown = (e)=>{
  if(e.ctrlKey && e.key === 'ArrowDown'){
    let url = window.location.href
    hit(url);
  }
}

function hit(url){
    GM_xmlhttpRequest({
    method: "GET",
    url: `http://localhost:7676/?url=${url}`,
    headers: {
      "Content-Type": "application/json"
    },
    onload: function (responseDetails) {
      console.log(responseDetails?.responseText);
    }
  });
}
```

### Changing .env file

Change this `USER_CLONE_PATH` path according to your choice in the .env file.

If you cannot figure out the `full path` of the directory that you want to put your all clones then run the following command in the `same directory` in which you want to clone.
```bash
pwd
```
This will give you your path.

Then change the following in .env file.

```
USER_CLONE_PATH="/home/dev/Desktop/pro/clones"
```

### Running the server

Make sure your port `7676` is free, else specify the port you want in both index.js file and in the violent monkey script as well.

```bash
git clone https://github.com/arun0808rana/git-cloner.git
cd git-cloner
npm install
node index.js
```