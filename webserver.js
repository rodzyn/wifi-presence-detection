var fs = require('fs');
//Loading config
eval(fs.readFileSync(__dirname + '/team.json', 'ascii'));
//Setting up server
var html = fs.readFileSync(__dirname + '/applicakers.html', 'utf8');
var server = require('http').createServer(function(req, res) {
  res.writeHead(200, { 'Content-type': 'text/html' });
  res.end(html);
})
server.listen(8000);

//Initializing NowJS
var nowjs = require('now');
var everyone = nowjs.initialize(server);

//Initializing pcap session
var pcap = require('pcap')
var pcap_session = pcap.createSession();

//Harvesting data and updating view
everyone.now.harvesterOn = function() {
  pcap_session.on('packet', function (raw_packet) {
    if (raw_packet != undefined) {
      //hwaddr filtering by simple regexp
      var packet = pcap.decode.packet(raw_packet);
      var printed_packet = pcap.print.packet(packet);
      var pattern = /^(.*?) ->/;
      var matched = printed_packet.match(pattern);
      var hwaddr = matched[matched.length - 1]
      for (member in team) {
	if (team[member].hwaddr == hwaddr) {
	  var date = new Date();
	  //Remembering time to detect inactive team members
	  team[member].time = date.getTime();
	}
      }
      //Updating view
      everyone.now.updateTeam(team);
    }
  });
}
