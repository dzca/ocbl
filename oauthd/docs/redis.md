redis-cli -h 192.168.2.42 -a 123456 -n 9

hset auth_token AABBCC dustin
hset auth_token AABBDD annie

hkeys auth_token
hget auth_token AABBCC

============================
apt-get install redis-server
sudo nano /etc/redis/redis.conf
To configure the max memory for Redis as well as how Redis will select what to remove when the max memory is reached, add the following lines at the end of the file:

maxmemory 128mb
maxmemory-policy allkeys-lru
In this example, Redis will remove any key according to the LRU algorithm when the max memory of 128mb is reached. Save and close the file, then restart the Redis service:

sudo systemctl restart redis-server.service
Next, enable Redis on system boot:

sudo systemctl enable redis-server.service

Once you see the Redis command prompt, run the following command to purge the cache:

flushall

================================
To install redis follow these steps:

Set up a non-root user with sudo privileges

Install build and test dependencies:

sudo apt update
sudo apt full-upgrade
sudo apt install build-essential tcl
Set up redis:

Download latest copy via this link or with this

curl -O http://download.redis.io/redis-stable.tar.gz
Create a temporary folder for it in say your /home/username/redis-stable directory
Move into created folder and extract it

tar xzvf redis-stable.tar.gz
Change into the folder cd redis-stable and build it with

make
make test
sudo make install
Configure redis:

Create configuration directory:

sudo mkdir /etc/redis
Move sample redis configuration file:

sudo cp /home/george/redis-stable/redis.conf /etc/redis
Edit the file:

sudo nano /etc/redis/redis.conf # or with any other text editor
Make two changes there:
supervised no to supervised systemd
dir to dir /var/lib/redis # for persistent data dump
Set up the systemd unit file:

sudo nano /etc/systemd/system/redis.service
Add the text:

[Unit]
Description=Redis In-Memory Data Store
After=network.target

[Service]
User=redis
Group=redis
ExecStart=/usr/local/bin/redis-server /etc/redis/redis.conf
ExecStop=/usr/local/bin/redis-cli shutdown
Restart=always

[Install]
WantedBy=multi-user.target
Set up redis user, groups and directories:

create redis user and group with same ID but no home directory:

sudo adduser --system --group --no-create-home redis   
sudo mkdir /var/lib/redis   # create directory
sudo chown redis:redis /var/lib/redis   # make redis own /var/lib/redis
sudo chmod 770 /var/lib/redis   # adjust permission
Test redis:

Start redis service:

sudo systemctl start redis
Check status:

systemctl status redis
Result of status if started successfully:

Output
● redis.service - Redis Server
 Loaded: loaded (/etc/systemd/system/redis.service; enabled; vendor preset: enabled)
 Active: active (running) since Wed 2016-05-11 14:38:08 EDT; 1min 43s ago
 Process: 3115 ExecStop=/usr/local/bin/redis-cli shutdown (code=exited, status=0/SUCCESS)
 Main PID: 3124 (redis-server)
 Tasks: 3 (limit: 512)
 Memory: 864.0K
 CPU: 179ms
 CGroup: /system.slice/redis.service
          └─3124 /usr/local/bin/redis-server 127.0.0.1:6379
Test instance:

Connect:

redis-cli
Test connectivity at prompt:

127.0.0.1:6379> ping   # result PONG
Check ability to set keys:

127.0.0.1:6379 set test "It's working!"  # result ok
Get the key just set:

127.0.0.1:6379 get test  # result "It's working!"
Exit redis:

127.0.0.1:6379 exit
Restart redis and then re-run steps 1, 4, and 5 to connect with the client again and confirm that your test value is still available, hence it's working as expected:

sudo systemctl restart redis
Enable redis to start at boot:

sudo systemctl enable redis
Source:


================================

## windows

### server path
C:\a0\redis\2.4.5

### start server
c:\rs.bat

### run client
redis-cli.exe -h 127.0.0.1 -p 6379 -a 123456

### 命令参考
http://www.runoob.com/redis/redis-tutorial.html

redis-cli -p 6379 -a 123456 info | grep redis_version
