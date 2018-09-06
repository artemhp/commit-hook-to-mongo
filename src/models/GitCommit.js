var mongoose = require('mongoose')

module.exports = mongoose.model('GitCommit', {
    message: String, // git log -1 --pretty=%B
    hash: String, // git log -1 --pretty=%H
    log: String, // git log -1 --stat
    files: String, // git show -1 --pretty="" --name-only
    repo: String, // basename -s .git `git config --get remote.origin.url`
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})