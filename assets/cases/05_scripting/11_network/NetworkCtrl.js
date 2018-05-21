const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    properties: {
        xhr: cc.Label,
        xhrAB: cc.Label,
        xhrTimeout: cc.Label,
        websocket: cc.Label,
        socketIO: cc.Label,
        
        xhrResp: cc.Label,
        xhrABResp: cc.Label,
        xhrTimeoutResp: cc.Label,
        websocketResp: cc.Label,
        socketIOResp: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this._wsiSendBinary = null;
        
        this.xhrResp.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.1";
        this.xhrABResp.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.2";
        this.xhrTimeoutResp.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.2";
        this.websocketResp.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.3";
        this.socketIOResp.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.4";
        
        this.sendXHR();
        this.sendXHRAB();
        this.sendXHRTimeout();
        this.prepareWebSocket();
        this.sendSocketIO();
    },
    
    sendXHR: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, 'GET');

        xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        if (cc.sys.isNative) {
            xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        }

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout

        xhr.send();
    },
    
    sendXHRAB: function () {
        var xhr = cc.loader.getXMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrAB, this.xhrABResp, "POST");

        xhr.open("POST", "https://httpbin.org/post");
        //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
        xhr.setRequestHeader("Content-Type","text/plain");
        // Uint8Array is an ArrayBufferView
        xhr.send(new Uint8Array([1,2,3,4,5]));
    },
    
    sendXHRTimeout: function () {
        var xhr = new XMLHttpRequest();
        this.streamXHREventsToLabel(xhr, this.xhrTimeout, this.xhrTimeoutResp, 'GET');

        xhr.open("GET", "https://192.168.22.222", true);

        // note: In Internet Explorer, the timeout property may be set only after calling the open()
        // method and before calling the send() method.
        xhr.timeout = 5000;// 5 seconds for timeout
        xhr.send();
    },
    
    prepareWebSocket: function () {
        var self = this;
        var websocketLabel = this.websocket;
        var respLabel = this.websocketResp;
        this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");
        this._wsiSendBinary.binaryType = "arraybuffer";
        this._wsiSendBinary.onopen = function(evt) {
            websocketLabel.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.5";
        };

        this._wsiSendBinary.onmessage = function(evt) {
            var binary = new Uint16Array(evt.data);
            var binaryStr = 'response bin msg: ';

            var str = '';
            for (var i = 0; i < binary.length; i++) {
                if (binary[i] === 0)
                {
                    str += "\'\\0\'";
                }
                else
                {
                    var hexChar = '0x' + binary[i].toString('16').toUpperCase();
                    str += String.fromCharCode(hexChar);
                }
            }

            binaryStr += str;
            respLabel.string = binaryStr;
            websocketLabel.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.6";
        };

        this._wsiSendBinary.onerror = function(evt) {
            websocketLabel.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.7";
        };

        this._wsiSendBinary.onclose = function(evt) {
            websocketLabel.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.8";
            // After close, it's no longer possible to use it again, 
            // if you want to send another request, you need to create a new websocket instance
            self._wsiSendBinary = null;
        };
        
        this.scheduleOnce(this.sendWebSocketBinary, 1);
    },

    sendWebSocketBinary: function(sender)
    {
        if (!this._wsiSendBinary) { return; }
        if (this._wsiSendBinary.readyState === WebSocket.OPEN)
        {
            this.websocket.textKey = "cases/05_scripting/11_network/NetworkCtrl.js.9";
            var buf = "Hello WebSocket中文,\0 I'm\0 a\0 binary\0 message\0.";
            
            var arrData = new Uint16Array(buf.length);
            for (var i = 0; i < buf.length; i++) {
                arrData[i] = buf.charCodeAt(i);
            }
            
            this._wsiSendBinary.send(arrData.buffer);
        }
        else
        {
            var warningStr = "send binary websocket instance wasn't ready...";
            this.websocket.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.10") + warningStr;
            this.scheduleOnce(function () {
                this.sendWebSocketBinary();
            }, 1);
        }
    },

    // Socket IO callbacks for testing
    testevent: function(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " says 'testevent' with data: " + data;
        this.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.11") + msg;
    },

    message: function(data) {
        if (!this.socketIO) { return; }

        var msg = this.tag + " received message: " + data;
        this.socketIOResp.string = msg;
    },

    disconnection: function() {
        if (!this.socketIO) { return; }

        var msg = this.tag + " disconnected!";
        this.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.12") + msg;
    },
    
    sendSocketIO: function () {
        var self = this;
        if (typeof io === 'undefined') {
            cc.error('You should import the socket.io.js as a plugin!');
            return;
        }
        //create a client by using this static method, url does not need to contain the protocol
        var sioclient = io.connect("ws://tools.itharbors.com:4000", {"force new connection" : true});
        this._sioClient = sioclient;

        //if you need to track multiple sockets it is best to store them with tags in your own array for now
        this.tag = sioclient.tag = "Test Client";
        
        //register event callbacks
        //this is an example of a handler declared inline
        sioclient.on("connect", function() {
            if (!self.socketIO) { return; }

            var msg = sioclient.tag + " Connected!";
            self.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.13") + msg;

            // Send message after connection
            self._sioClient.send("Hello Socket.IO!");
        });

        //example of a handler that is shared between multiple clients
        sioclient.on("message", this.message.bind(this));

        sioclient.on("echotest", function (data) {
            if (!self.socketIO) { return; }

            cc.log("echotest 'on' callback fired!");
            var msg = self.tag + " says 'echotest' with data: " + data;
            self.socketIO.string = i18n.t("cases/05_scripting/11_network/NetworkCtrl.js.14") + msg;
        });

        sioclient.on("testevent", this.testevent.bind(this));

        sioclient.on("disconnect", this.disconnection.bind(this));
    },
    
    streamXHREventsToLabel: function ( xhr, eventLabel, label, method, responseHandler ) {
        var handler = responseHandler || function (response) {
            return method + " Response (30 chars): " + response.substring(0, 30) + "...";
        };
        
        var eventLabelOrigin = eventLabel.string;
        // Simple events
        ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
            xhr["on" + eventname] = function () {
                eventLabel.string = eventLabelOrigin + "\nEvent : " + eventname;
                if (eventname === 'timeout') {
                    label.string = '(timeout)';
                }
            };
        });
    
        // Special event
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
                label.string = handler(xhr.responseText);
            }
        };
    }
});
