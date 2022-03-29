# MongoDB

## Installation

> Official `Installation Docs` :  
> https://docs.mongodb.com/manual/administration/install-community/

### Linux (Ubuntu)

1. Follow the official Docs shown here as per your ubuntu version :  
   https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

### Windows

1. Go to MongoDB download page : https://www.mongodb.com/try/download
1. Select `MongoDB Community Server`
1. In the download Form,
    - Select `Windows`
    - Select `msi`
1. Download the installer.
1. Run the installer and install MongoDB.

### MacOS

1. Follow the official Docs shown here :  
   https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

<br>
<br>
<br>

## MongoDB Commands

-   The MongoDB installation includes following useful binaries/commands :
    -   `mongod` (MongoDB server)
    -   `mongo` (MongoDB Shell)
    -   `mongodump` (Backup Database)
    -   `mongorestore` (Restore DB Backup)
    -   other commands

<br>

## GUI for Datbase - NoSQLBooster

View [Installing NoSQLBooster](/nosqlbooster#installation) for more details.

<br>

## MongoDB Configuration

> Official Configuration Options Documentation :  
> https://docs.mongodb.com/manual/reference/configuration-options/

### Configuration File Location

| OS               | File Location                        |
| ---------------- | ------------------------------------ |
| Linux            | `/etc/mongod.conf`                   |
| macOS (Intel)    | `/usr/local/etc/mongod.conf`         |
| macOS (Apple M1) | `/opt/homebrew/etc/mongod.conf`      |
| Windows          | `[install-directory]\bin\mongod.cfg` |

### Exposing/Opening MongoDB Server to the network or changin server port

Change the Server Configuration like below :

```yaml
net:
    bindIp: 0.0.0.0
    port: 25001
```

Default config :

```yaml
net:
    bindIp: 127.0.0.1
    port: 27017
```
