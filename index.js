const express = require('express')
const app = express()
const port = 7676;
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

require('dotenv').config()
const CLONE_PATH = process.env.USER_CLONE_PATH;

app.get('/', (req, res) => {
    const repoName = req.url.split('/').pop()
    const gitUrl = req.url.split('/?url=')[1] + '.git';

    // check if repo exists
    if (fs.existsSync(`${CLONE_PATH}/${repoName}`)) {
        console.log('REPO ALREADY EXISTS');
        return res.send('Repo Already Exists.')
    }

    console.log('repoName', repoName)
    console.log('gitUrl', gitUrl)
    console.log('CLONE_PATH', CLONE_PATH)

    // execSync(`git clone ${gitUrl} "${CLONE_PATH}/${repoName}"`)
    execSync(`git clone ${gitUrl} "${CLONE_PATH}/${repoName}"`, { stdio: 'inherit' })
    res.send('Successfully cloned repo.')
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})

// const app = require('express')();
// const path = require('path');
// const { execSync } = require('child_process');
// const CLONE_PATH = process.env.CLONE_PATH;

// app.get('/', (req, res) => {
//     const gitUrl = req.url;
//     execSync(`git clone ${gitUrl}`, {
//         stdio: [0, 1, 2], // we need this so node will print the command output
//         cwd: path.resolve(`${CLONE_PATH}`, ''), // path to where you want to save the file
//     })
//     res.send('Hello World!')
// })
// // randomizing port as well as listening to it, dammmnnnnn.
// const server = app.listen(0, () => {
//     console.log('Listening on port:', server.address().port);
//     console.log(`http://localhost:${server.address().port}`)
// });