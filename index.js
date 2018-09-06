var mongoose = require('mongoose');
const exec = require('await-exec');

var User = require('./src/models/User.js');
var GitCommit = require('./src/models/GitCommit.js');

function recordCommit (author, db) {
    mongoose.Promise = Promise;

    mongoose.connect(`mongodb://${db.user}:${db.password}@${db.server}/${db.name}`, { useNewUrlParser: true } (err) => {
        if (err) {
            console.log('Error connecting to mongo');
            process.exit(1);
        }

    })

    mongoose.connection.on('connected', async () => {
        const postData = { 'author': author }

        postData.message = (await exec(`git log -1 --pretty=%B`)).stdout.trim();
        postData.hash =  (await exec(`git log -1 --pretty=%H`)).stdout.trim();
        postData.log =  (await exec(`git log -1 --stat`)).stdout.trim();
        postData.files =  (await exec(`git show -1 --pretty="" --name-only`)).stdout.trim();
        postData.repo =  (await exec(`basename -s .git \`git config --get remote.origin.url\``)).stdout.trim();

        const gitCommit = new GitCommit(postData)

        gitCommit.save((err, result) => {
            if (err) { process.exit(1); }
            process.exit();
        });
    })
}

module.exports = recordCommit;