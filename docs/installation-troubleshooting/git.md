# Git

?> To setup your new **Github** Account, checkout **<a href="/docs/accounts/#/github">Accounts & Access / Github</a>** section.

## Installation

### Linux (Ubuntu)

1. Install `Git CLI` using `apt install git`
1. It will install latest git version.
1. Verify the install by running `git --version`

### Windows

1. Go to Git website : https://git-scm.com/
1. Download Git for Windows from the website home page.
1. Run the installer and install git.
1. Select options to add the `Git Commands to Context Menu` when prompted.
1. Verify the install by opening new `cmd` or `powershell` and run `git --version`

### macOS

1. Install git using Homebrew.
1. Run `brew install git`
1. It will install latest git version.
1. Verify the install by running `git --version`

## Git SSH Setup

There are two ways to use git repositories.

1. with `https` connection
1. with `ssh` connection

### Why use SSH?

-   If you are using `https`, you must enter your `username and password` every time you want to interact with Remote Git Repository.
-   If you are using `ssh`, you don't need to enter username and password when you do the interaction with remote repository.

### Steps to link SSH with GitHub

#### Generating SSH Key

1. Open `Terminal` (Linux / macOS) or `Git CLI` (Windows).
1. Run command `ssh-keygen`.
1. It will ask for user input mulitple times. Press `Enter` key.
1. This command will create 2 files `id_rsa` and `id_rsa.pub`.
1. Location of the file will be printed in the command output.
1. Open the file and copy its content.

#### Linking SSH Key with GitHub account

1. Login to your GitHub account in Browser.
1. Open Settings -> SSH and GPG Keys.
1. Click `New SSH Key` button.
1. Add any `Title` to the key.
1. Paste the `id_rsa.pub` file content in the `Key` textbox.
1. Click on `Add`.
1. Now, your device/PC is linked with GitHub using SSH.

## Git User Details Setup

1. Setup your `name` and `email` for Git. This name and email will be used in commits to identify who did the commit. Setup or change it using below commnds.
    ```shell
    git config --global user.name "[first_name] [last_name]"
    git config --global user.email "[your_email]"
    ```
2. If you want to set a different user details for specific repository, then run the above commands without `--global` in that specific repo directory.
    - Verify the local configuration by checking config file :
        ```shell
        cat .git/config
        ```
