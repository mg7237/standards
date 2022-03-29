# Architecture

Git comprises of following components :

-   [Git Repository](#git-repository)
-   [Local Repository](#local-repository)
-   [Remote Repository](#remote-repository)
-   [Branches](#branches)
-   [Local Branches](#local-branches)
-   [Remote Branches](#remote-branches)
-   [Commits](#commits)
-   [Local Commits](#local-commits)
-   [Remote Commits](#remote-commits)
-   [Untracked Changes](#untracked-changes)
-   [Staged Changes](#staged-changes)
-   [Stash](#stash)
-   [Tags](#tags)
-   [Local Tags](#local-tags)
-   [Remote Tags](#remote-tags)
-   [Hooks](#hooks)

### Git Repository

Git Respository consists of both the **code** and the **code history** and version **tracking files**.

### Local Repository

It is the repository which is in the contributor's **local device**. There can be **multiple contributors** having different **local repositories** in their devices. Local repository is **linked** to **remote repository** via `origin` configuration.

### Remote Repository

It is the repository which is in a **central location**, common between all the **contributors**. They work in their **local repository** and `push` the **code changes** to the remote repository. So, other contributors can `pull` the changes done by each other.

### Branches

A **branch** is like a separate version of code which has **new/old** code then the **main/master** branch. `main/master` branch is the **root** latest current version of the code pointed by `HEAD`. <br>Branches can be **created/removed** as the project moves forward. <br><br>**Examples:** `v1.0`, `v2.0`, `bug-fix`, `staging`.

### Local Branches

Local branches are in the contributor's **local device**. These might not be available in the remote repository because contributor has to manually `push` the local branches to remote.

### Remote Branches

Local branches are in the contributor's **local device**. These might not be available in the remote repository because contributor has to manually `push` the local branches to remote.

### Commits

Commits are the _references_/_snapshots_ to the specific code changes which are **recorded** by any contributor at a particular **time** in a particular **branch**. <br><br>**Note:** Commits are not really attached to any branch.

### Local Commits

Local commits are in the **local device** of the contributor. These might not be available in the remote repository because contributor has to manually `push` the commits to remote branch.

### Remote Commits

Remote commits are in the **remote repository**. These might not be available in the contributor's local repository because contributor has to manually `pull` the remote commits to local.

### Untracked Changes

Untracked changes are the code changes which are not added to the `staging` of git for a new commit. <br><br>These can be either `reset` or `added` in the git staging tree.

### Staged Changes

Staged changes are the code changes which are added in the git `staging` for a new commit. These changes will be recorded in the next commit done by the contributor. <br><br>These changes can either be `commited` or `untracked`.

### Stash

Git Stash is a space where you can move your code changes for safekeeping. It discards the changes from current files and mvoes to another space. Stash is in your **local device** and cannot be pushed to remote. <br><br>Stashed changes can be either be `re-applied` or `dropped`.

### Tags

Tags are special **references** created by any contributor to point to a **specific commit** in time. These can be used for indicating release **versions**.

### Local Tags

Local tags are in the **local device** of the contributor. These might not be available in the remote repository because contributor has to manually `push` the tags to remote branch.

### Remote Tags

Remote tags are in the **remote repository**. These might not be available in the contributor's local repository because contributor has to manually `pull` the remote tags to local.

### Hooks

Git Hooks are useful to **trigger external scripts** when there is any **event** is fired in the git workflow. <br><br>**Example :** launching new version on production server when pushed in master branch or tag is created.
