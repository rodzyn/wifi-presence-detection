This is an example how to simple analyze LAN packets using Node.js
===

### Description

I'm using node_pcap library with Node.js and NowJS for data syncing.
It's just yet another project just fun and to test interesting technologies.

### Installation
You need node, ofc. 
For OSX users:

	brew install node

If you don't have node packet manager:

	curl http://npmjs.org/install.sh | sh

Install NowJS (global recommended):

	npm install -g nowjs
Install node_pcap (global recommended):

	npm install -g node_pcap

Run webserver:

    sudo node webserver.js (yes, it requires root privileges)

You may have troubles with env variables because of sudoing, try this:

	sudo env NODE_PATH=$NODE_PATH && node webserver.js

Breaks still? Make sure that your NODE_PATH is correct, it should be something like that (with default node installation):

	export NODE_PATH=/usr/local/lib/node_modules

In case of troubles with node_pcap installation (here is a tricky part). Right now, node_pcap library is not compatible with node 0.6.x
But I found a minimum workaround (full compatibility pull request going to be merged soon)
Go to your node modules:

	cd $NODE_PATH // for me
	git clone https://github.com/mranney/node_pcap.git

Remove 2 lines from pcap_binding.cc

	#include <node_events.h>
	#include <ev.h>

Then:

	node-wf configure build // build a module

Everything should go fine:

	cd build
	mkdir default
	cp ./Release/* ./default/*
	cd ..
	mv node_pcap pcap

That's all.

Edit team.js - it contains mac addresses and photos of users that you want to detect.

### Contributing

Whatever comes to your mind... Feel free to make a pull request :)

### Resources
[Node.js](http://nodejs.org/)
[node_pcap](https://github.com/mranney/node_pcap)
[NowJS](http://nowjs.com/)
