import cytoscape from "cytoscape";
import cxtmenu from "cytoscape-cxtmenu";
import cola from 'cytoscape-cola';

cytoscape.use(cxtmenu);
cytoscape.use(cola);

var $ = require('jquery');

class NodeType {
    static WirelessDevice = new NodeType({name: "wirelessDevice", color: "#43AA8B"});
    static WiredDevice = new NodeType({name: "wirelessDevice", color: "#4D908E"});
    static Service = new NodeType({name: "service", color: "#F94144"});
    static Port = new NodeType({name: "port", color: "#F8961E"});
    static WirelessNetwork = new NodeType({name: "wirelessNetwork", color: "#F9844A"});
    static NetworkGear = new NodeType({name: "networkGear", color: "#577590"});
    static Compound = new NodeType({name: "compound", color: "#000000"});

    constructor(data) {
        this.data = data;
    }
}

window.addEventListener('DOMContentLoaded', function () {
    var cy = window.cy = cytoscape({

        container: document.getElementById('cy'), // container to render in

        ready: function () {
            this.nodes().forEach(function (node) {
                // console.log(node);
                if (node._private.edges.length == 0) {
                    node.css("width", 6);
                    node.css("height", 6);
                } else {
                    node.css("width", node._private.edges.length * 10);
                    node.css("height", node._private.edges.length * 10);
                }
                // console.log(node._private.data.nodeType.data.color);
                if (node._private.data.nodeType.data.name != "compound") {
                    node.style("background-color", node._private.data.nodeType.data.color)
                }

            });
            this.layout({ name: 'cola', nodeDimensionsIncludeLabels: true, maxSimulationTime: 20000 }).run();
        },

        elements: {
            nodes: [
                { data: { id: 'internet', name: 'Internet', nodeType: NodeType.Service } },

                { data: { id: 'modem', name: 'Spectrum Modem', nodeType: NodeType.NetworkGear } },
                { data: { id: 'router', name: 'Netgear Router', nodeType: NodeType.NetworkGear } },
                { data: { id: 'switch', name: 'Netgear Switch', nodeType: NodeType.NetworkGear } },

                { data: { id: 'nickPC', name: 'PC (Nick)', nodeType: NodeType.WiredDevice } },
                { data: { id: 'alexPC', name: 'PC (Alex)', nodeType: NodeType.WiredDevice } },
                { data: { id: 'nathanielPC', name: 'PC (Nathaniel)', nodeType: NodeType.WiredDevice } },
                { data: { id: 'testificate', name: 'Testificate', nodeType: NodeType.WiredDevice } },
                { data: { id: 'raspi', name: 'Raspberry Pi', nodeType: NodeType.WiredDevice } },

                { data: { id: 'http', name: 'Http (80)', nodeType: NodeType.Port } },
                { data: { id: 'ssl', name: 'SSL (443)', nodeType: NodeType.Port } },
                { data: { id: 'wireguard', name: 'Wireguard (51820)', nodeType: NodeType.Port } },

                { data: { id: 'nuhtan', name: 'nuhtan (5Ghz)', nodeType: NodeType.WirelessNetwork } },
                { data: { id: '5ghz', name: 'Syc5 (5Ghz)', nodeType: NodeType.WirelessNetwork } },
                { data: { id: '24ghz', name: 'Syc2.4 (2.4Ghz)', nodeType: NodeType.WirelessNetwork } },
                
                { data: { id: 'services', name: 'Services', nodeType: NodeType.Compound} },
                { data: { id: 'internalService', name: 'Internal Services', nodeType: NodeType.Compound, parent: 'services' } },

                { data: { id: 'nas', name: 'Samba NAS', nodeType: NodeType.Service, parent: 'internalService' } },
                { data: { id: 'vpn', name: 'Wireguard VPN', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'caddy', name: 'Caddy', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'tautulli', name: 'Tautulli', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'sonarr', name: 'Sonarr', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'plex', name: 'Plex', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'deluge', name: 'Deluge', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'grafana', name: 'Grafana', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'organizr', name: 'Organizr', nodeType: NodeType.Service, parent: 'services' } },
                { data: { id: 'influx', name: 'InfluxDB', nodeType: NodeType.Service, parent: 'internalService' } },
                { data: { id: 'sshd', name: 'SSHD', nodeType: NodeType.Service, parent: 'internalService' } },
                { data: { id: 'varken', name: 'Varken', nodeType: NodeType.Service, parent: 'internalService' } },
                { data: { id: 'telegraf', name: 'Telegraf', nodeType: NodeType.Service, parent: 'internalService' } },
                { data: { id: 'vaultwarden', name: 'Vaultwarden', nodeType: NodeType.Service, parent: 'internalService' } },

                { data: { id: 'chromecast', name: 'Chromecast', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'sonos', name: 'Sonos Speaker', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'ps4', name: 'PS4', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'xboxAlex', name: 'XBox (Alex)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'xboxCalvin', name: 'XBox (Calvin)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'googleHomeAlex', name: 'Google Home Mini (Alex)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'lgtv', name: 'LG TV', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'firestick', name: 'Amazon Firestick', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'switchCalvin', name: 'Switch (Calvin)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'switchAlex', name: 'Switch (Alex)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'switchNick', name: 'Switch (Nick)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'iphoneNick', name: 'IPhone (Nick)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'iphoneCalvin', name: 'IPhone (Calvin)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'iphoneAlex', name: 'IPhone (Alex)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'macbook', name: 'Macbook', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'surfaceLaptop', name: 'Surface Laptop', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'xps15', name: 'Dell XPS 15', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'ipadNick', name: 'IPad (Nick)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'ipadNathaniel', name: 'IPad (Nathaniel)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'booxLeaf', name: 'Boox Leaf', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'oculus', name: 'Oculus Quest 2', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'pixel', name: 'Pixel 5', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'galaxyS9', name: 'Samsung Galaxy S9+', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'switchNathaniel', name: 'Switch (Nathaniel)', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'razerBlade', name: 'Razer Blade 15', nodeType: NodeType.WirelessDevice } },
                { data: { id: 'googleHomeNathaniel', name: 'Google Home Mini (Nathaniel)', nodeType: NodeType.WirelessDevice } },
            ],

            edges: [
                { data: { source: 'internet', target: 'modem' } },

                { data: { source: 'modem', target: 'router' } },
                
                { data: { source: 'router', target: 'chromecast' } },
                { data: { source: 'router', target: 'switch' } },
                { data: { source: 'router', target: 'nickPC' } },
                { data: { source: 'router', target: 'alexPC' } },
                { data: { source: 'router', target: '24ghz' } },
                { data: { source: 'router', target: '5ghz' } },
                
                { data: { source: '5ghz', target: 'sonos' } },
                { data: { source: '5ghz', target: 'ps4' } },
                { data: { source: '5ghz', target: 'xboxAlex' } },
                { data: { source: '5ghz', target: 'xboxCalvin' } },
                { data: { source: '5ghz', target: 'googleHomeAlex' } },
                { data: { source: '5ghz', target: 'switchCalvin' } },
                { data: { source: '5ghz', target: 'switchAlex' } },
                { data: { source: '5ghz', target: 'switchNick' } },
                { data: { source: '5ghz', target: 'iphoneNick' } },
                { data: { source: '5ghz', target: 'iphoneCalvin' } },
                { data: { source: '5ghz', target: 'iphoneAlex' } },
                { data: { source: '5ghz', target: 'macbook' } },
                { data: { source: '5ghz', target: 'surfaceLaptop' } },
                { data: { source: '5ghz', target: 'xps15' } },
                { data: { source: '5ghz', target: 'ipadNick' } },
                { data: { source: '5ghz', target: 'lgtv' } },
                { data: { source: '5ghz', target: 'firestick' } },


                { data: { source: 'switch', target: 'nathanielPC' } },
                { data: { source: 'switch', target: 'testificate' } },
                { data: { source: 'switch', target: 'raspi' } },

                { data: { source: 'raspi', target: 'nas' } },
                { data: { source: 'raspi', target: 'vpn' } },

                { data: { source: 'vpn', target: 'internalService' } },

                { data: { source: 'router', target: 'http' } },
                { data: { source: 'router', target: 'ssl' } },
                { data: { source: 'router', target: 'wireguard' } },

                { data: { source: 'http', target: 'testificate' } },
                { data: { source: 'ssl', target: 'testificate' } },
                { data: { source: 'wireguard', target: 'raspi' } },

                { data: { source: 'testificate', target: 'caddy' } },

                { data: { source: 'caddy', target: 'tautulli' } },
                { data: { source: 'caddy', target: 'sonarr' } },
                { data: { source: 'caddy', target: 'deluge' } },
                { data: { source: 'caddy', target: 'grafana' } },
                { data: { source: 'caddy', target: 'vaultwarden' } },
                { data: { source: 'caddy', target: 'influx' } },
                { data: { source: 'caddy', target: 'organizr' } },

                { data: { source: 'nathanielPC', target: 'nuhtan' } },
                
                { data: { source: 'nuhtan', target: 'ipadNathaniel' } },
                { data: { source: 'nuhtan', target: 'booxLeaf' } },
                { data: { source: 'nuhtan', target: 'oculus' } },
                { data: { source: 'nuhtan', target: 'pixel' } },
                { data: { source: 'nuhtan', target: 'galaxyS9' } },
                { data: { source: 'nuhtan', target: 'switchNathaniel' } },
                { data: { source: 'nuhtan', target: 'razerBlade' } },
                { data: { source: 'nuhtan', target: 'googleHomeNathaniel' } },

                { data: { source: 'influx', target: 'grafana' } },
                { data: { source: 'telegraf', target: 'influx' } },
                { data: { source: 'varken', target: 'influx' } },
                { data: { source: 'sonarr', target: 'varken' } },
                { data: { source: 'tautulli', target: 'varken' } },
                { data: { source: 'sonarr', target: 'plex' } },
                { data: { source: 'sonarr', target: 'deluge' } },
                { data: { source: 'deluge', target: 'sonarr' } },
                { data: { source: 'plex', target: 'tautulli' } },

                { data: { source: 'plex', target: 'organizr' } },
                { data: { source: 'sonarr', target: 'organizr' } },

                { data: { source: 'sshd', target: 'raspi' } },
                { data: { source: 'sshd', target: 'testificate' } },
            ]

        },

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(name)'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#aaa',
                    'target-arrow-color': '#aaa',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],

        layout: {
            name: 'grid',
            rows: 1
        }

    });
});