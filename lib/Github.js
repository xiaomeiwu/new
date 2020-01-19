const GithubApi = require('github-api')
class Github {
    constructor({ username, password }) {
        this.auth = {
            username,
            password
        }
        this.github = new GithubApi(this.auth)
        this.user = this.github.getUser()
    }
    getRepo(repoName) {
        return this.github.getRepo(this.auth.username, repoName)
    }
    createRepo(repoConfig) {
        return this.user.createRepo(repoConfig)
    }
    deleteRepo(repoName) {
        const repo = this.getRepo(repoName)
        return repo.deleteRepo()
    }
    createBranch(repoName, oldBranch, newBranch) {
        const repo = this.getRepo(repoName)
        return repo.createBranch(oldBranch, newBranch)
    }
    setDefaultBranch(repoName, default_branch) {
        const repo = this.getRepo(repoName)
        return repo.updateRepository({ default_branch })
    }
}

module.exports = exports = Github