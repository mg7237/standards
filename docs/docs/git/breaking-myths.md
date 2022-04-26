# Breaking the Myths

## 1. Pull Requests

Pull Request is **not a feature of Git** itself. It is **provided by the platforms** like GitHub, Bitbucket, GitLab, etc.

It is a way of submitting **code changes** to existing Git Repository by Repository **contributors or third-party persons**. It allows the **owner/maintainer** of the Git Repo to review and **approve/reject** the **code changes** by the person.

## 2. Releases vs Tags

Releases are **not a feature of Git**. It is **provided by the platforms** like GitHub, Bitbucket, GitLab, etc.
We can create tags using **git-cli** but not releases. Generally, platforms provide releases as **a wrapper to [git tags](/architecture?id=tags)**. When you create a release, corresponding **tag is also created** in the Git Repo. We can add a **release message** at time of creating release.

## 3. Issues

Issues are **not a feature of Git**. It is **provided by the platforms** like GitHub, Bitbucket, GitLab, etc.
We can create issues to start conversations on **bugs, feature requests, discussions, planning, etc.**.

## 3. Code Comments

Code Comments are **not a feature of Git**. It is **provided by the platforms** like GitHub, Bitbucket, GitLab, etc.
Platforms provide a way to collaborate with starting conversations by commenting on a **line of code, code block, commit, pull request, issue, etc**. This is out of the scope of Git.

## 4. CI/CD vs Actions vs Git Hooks

-   **CI/CD** and **Actions** are not part of Git, they are provided by **platform providers**. Only **Git Hooks** are a part of Git.
-   **CI/CD** can be integrated with **Git Hooks** and using **third-party services** which provide such functionalities to **build, test, launch the code**. It can be setup on any platform and can be linked to any third-party CI/CD service.
-   **Actions** is a feature of **GitHub**, which provides automated **CI/CD** + automated control over GitHub **Issues, Releases, Pull Requests**, etc. It is limited to GitHub only.
-   [**Git Hooks**](/architecture?id=hooks) can be useful to run **custom scripts** on local devices when any git related everts occur, like **build, test and launch the code** or do any other custom operations but **in the local device**.
