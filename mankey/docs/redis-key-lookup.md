https://stackoverflow.com/questions/32474699/redis-find-keys-matching-a-pattern

Keys is specifically noted as a command not to be run in production due to the way it works. What you need here is to create an index of your keys. Use a set for storing the key names of the pattern you want. When you add a new we key, add the name of it to the set. For example:

Set abc:parent1:child1 breakfast
Sadd abc:parent1:index abc:parent1
Then when you need the list:

Smembers abc:parent1
Will give you the list, without the penalties and problems associated with using the "evil" keys command. Additionally you would remove an entry with sremove on key deletion. You also get as a benefit the ability to know how many keys are in the index with a single call.

If you absolutely, positively, MUST avoid using an index use SCAN instead of keys. The only time you should even consider keys is if you are running a debug slave where the only process using it is your debugging process.

