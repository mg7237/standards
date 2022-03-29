# Redis

## Installation

> Official `Installation Docs` :
> https://redis.io/download

### Linux (Ubuntu)

1. Install via `apt` using following commands.
    ```shell
    sudo add-apt-repository ppa:redislabs/redis
    sudo apt update
    sudo apt install redis
    ```
1. Test the installation by connecting to local redis server.
    ```shell
    redis-cli
    ```
1. After connected to Local Redis server, run following command.
    ```shell
    PING
    ```

### MacOS

1. Install via `homebrew` using following commands.
    ```shell
    brew install redis
    ```
1. Test the installation by connecting to local redis server.
    ```shell
    redis-cli
    ```
1. After connected to Local Redis server, run following command.
    ```shell
    PING
    ```

### Windows

!> Unfortunately, Redis is **not officially supported** on Windows. But microsoft has created a **PORT** of older Redis versions which can be used. It is recommended to use Redis in **Linux**.

1. Go to GitHub Release page here : https://github.com/microsoftarchive/redis/releases
1. Download the release and extract the zip file.
1. Run the `.msi` installer.
1. This will install redis on your device/PC.
1. Test the installation by connecting to local redis server.
    ```shell
    redis-cli
    ```
1. After connected to Local Redis server, run following command.
    ```shell
    PING
    ```

## Redis Configuration

1. Find the Redis Config file `redis.conf` based on your OS and installation method.
    - In Linux (Ubuntu), it is generally located at `/etc/redis.conf`
1. To expose the redis server to other network devices. Change `bind` value like below.

```conf
bind 0.0.0.0
# default 127.0.0.1
```

1. To change the redis-server connection port. Change `port` value like below.

```conf
port 8757
# default 6379
```
