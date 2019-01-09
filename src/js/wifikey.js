(function() {
    if (!window.wifikey) window.wifikey = {};
    var Util = {
        extend: function(dist, src) {
            for (var name in src) {
                dist[name] = src[name]
            }
            return dist
        },
        clone: function(src) {
            return Util.extend({},
            src)
        },
        query: function() {
            var query = {};
            var search = window.location.search;
            if (!search || search.length == 0) return query;
            var ss = search.substring(1).split("&");
            for (i = 0; i < ss.length; i++) {
                var p = ss[i].split("=");
                query[p[0]] = p.length == 2 ? p[1] : null
            }
            return query
        },
        isFunction: function(object) {
            return typeof object === "function"
        },
        isString: function(object) {
            return typeof object === "string"
        },
        isNumber: function(object) {
            return typeof object === "number"
        },
        isArray: function(object) {
            return typeof object === "array"
        },
        evalJSON: function(str) {
            if (String.prototype.evalJSON) {
                return str.evalJSON()
            }
            if (window.JSON) {
                return window.JSON.parse(str)
            }
        },
        toJSON: function(obj) {
            if (Object.toJSON) {
                return Object.toJSON(obj)
            }
            if (window.JSON) {
                return window.JSON.stringify(obj)
            }
        },
        toArray: function(obj) {
            var result = [];
            for (var i = 0; i < obj.length; i++) {
                result.push(obj[i])
            }
            return result
        },
        getStyle: function(element, style) {
            var value = element.style[style];
            if (!value || value == "auto") {
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null
            }
            return value
        }
    };
    var Base64 = function() {
        "use strict";
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var _utf8_encode = function(string) {
            var utftext = "",
            c, n;
            string = string.replace(/\r\n/g, "\n");
            for (n = 0; n < string.length; n++) {
                c = string.charCodeAt(n);
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode(c >> 6 | 192);
                    utftext += String.fromCharCode(c & 63 | 128)
                } else {
                    utftext += String.fromCharCode(c >> 12 | 224);
                    utftext += String.fromCharCode(c >> 6 & 63 | 128);
                    utftext += String.fromCharCode(c & 63 | 128)
                }
            }
            return utftext
        };
        var _utf8_decode = function(utftext) {
            var string = "",
            i = 0,
            c = 0,
            c1 = 0,
            c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++
                } else if (c > 191 && c < 224) {
                    c1 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode((c & 31) << 6 | c1 & 63);
                    i += 2
                } else {
                    c1 = utftext.charCodeAt(i + 1);
                    c2 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode((c & 15) << 12 | (c1 & 63) << 6 | c2 & 63);
                    i += 3
                }
            }
            return string
        };
        var _hexEncode = function(input) {
            var output = "",
            i;
            for (i = 0; i < input.length; i++) {
                output += input.charCodeAt(i).toString(16)
            }
            return output
        };
        var _hexDecode = function(input) {
            var output = "",
            i;
            if (input.length % 2 > 0) {
                input = "0" + input
            }
            for (i = 0; i < input.length; i = i + 2) {
                output += String.fromCharCode(parseInt(input.charAt(i) + input.charAt(i + 1), 16))
            }
            return output
        };
        var encode = function(input) {
            var output = "",
            chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
            input = _utf8_encode(input);
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = (chr1 & 3) << 4 | chr2 >> 4;
                enc3 = (chr2 & 15) << 2 | chr3 >> 6;
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }
                output += _keyStr.charAt(enc1);
                output += _keyStr.charAt(enc2);
                output += _keyStr.charAt(enc3);
                output += _keyStr.charAt(enc4)
            }
            return output
        };
        var decode = function(input) {
            var output = "",
            chr1, chr2, chr3, enc1, enc2, enc3, enc4, i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++));
                enc2 = _keyStr.indexOf(input.charAt(i++));
                enc3 = _keyStr.indexOf(input.charAt(i++));
                enc4 = _keyStr.indexOf(input.charAt(i++));
                chr1 = enc1 << 2 | enc2 >> 4;
                chr2 = (enc2 & 15) << 4 | enc3 >> 2;
                chr3 = (enc3 & 3) << 6 | enc4;
                output += String.fromCharCode(chr1);
                if (enc3 !== 64) {
                    output += String.fromCharCode(chr2)
                }
                if (enc4 !== 64) {
                    output += String.fromCharCode(chr3)
                }
            }
            return _utf8_decode(output)
        };
        var decodeToHex = function(input) {
            return _hexEncode(decode(input))
        };
        var encodeFromHex = function(input) {
            return encode(_hexDecode(input))
        };
        return {
            encode: encode,
            decode: decode,
            decodeToHex: decodeToHex,
            encodeFromHex: encodeFromHex
        }
    } ();
    var Logger = {
        log: function(value) {
            if (!window.console) return;
            try {
                console.log(value + " [" + window.location.toString() + "]")
            } catch(e) {}
        }
    };
    var Method = {
        bind: function(fun, target) {
            var args = arguments.length > 2 ? Util.toArray(arguments).slice(2) : [];
            return function() {
                fun.apply(target, args.concat(Util.toArray(arguments)))
            }
        },
        argumentNames: function(fun) {
            var names = fun.toString().match(/^[\s\(]*function[^(]*\(([^)]*)\)/)[1].replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, "").replace(/\s+/g, "").split(",");
            return names.length == 1 && !names[0] ? [] : names
        },
        top: function() {
            var _counter = (new Date).getTime();
            return function(fun, autoDestroy) {
                if (!fun) return null;
                var name = "__top_fun_" + _counter++;
                top[name] = function() {
                    fun.apply(null, arguments);
                    if (autoDestroy !== false) delete top[name]
                };
                return name
            }
        } ()
    };
    var Collection = {
        remove: function(array, item) {
            var i = array.indexOf(item);
            if (i >= 0) array.splice(i, 1);
            return i
        },
        each: function(collection, fun) {
            for (var i = 0; i < collection.length; i++) {
                fun(collection[i])
            }
        },
        filter: function(collection, fun) {
            for (var i = 0; i < collection.length; i++) {
                if (fun(collection[i])) return collection[i]
            }
            return undefined
        }
    };
    var Event = {
        observe: function(target, type, listener) {
            if (target.addEventListener) {
                target.addEventListener(type, listener, false)
            } else {
                target.attachEvent("on" + type, listener)
            }
        },
        stopObserving: function(target, type, listener) {
            if (target.addEventListener) {
                target.removeEventListener(type, listener, false)
            } else {
                target.detachEvent("on" + type, listener)
            }
        },
        onDocLoad: function(fun) {
            if (document.body) fun();
            else Event.observe(window, "load", fun)
        }
    };
    var Class = {
        create: function() {
            var constructor = function() {
                if (this.initialize) this.initialize.apply(this, arguments)
            };
            var addMethods = function(methods) {
                for (var name in methods) {
                    var fun = methods[name];
                    addMethod(name, fun)
                }
            };
            var addMethod = function(name, fun) {
                var names = Method.argumentNames(fun);
                if (names.length > 0 && names[0] == "$super") {
                    var _super = constructor.prototype[name];
                    if (!_super) throw "can not find super method for " + name;
                    var _fun = fun;
                    fun = function() {
                        var _this = this;
                        var args = Util.toArray(arguments);
                        args.unshift(function() {
                            return _super.apply(_this, arguments)
                        });
                        return _fun.apply(_this, args)
                    }
                }
                constructor.prototype[name] = fun
            };
            for (var i = 0; i < arguments.length; i++) {
                var arg = arguments[i];
                if (Util.isFunction(arg)) arg = arg.prototype;
                addMethods(arg)
            }
            return constructor
        },
        singleton: function(clazz, lazzy) {
            return function() {
                var instance = null;
                if (lazzy === false) instance = new clazz;
                clazz.getInstance = function() {
                    if (instance == null) instance = new clazz;
                    return instance
                };
                return clazz.getInstance
            } ()
        }
    };
    var EventDispatcher = {
        addEventListener: function(name, listener) {
            var listeners = this.getListeners(name);
            listeners.push(listener);
            var cacheEvents = this.getCacheEvents();
            for (var i = 0; i < cacheEvents.length; i++) {
                if (name == "*" || cacheEvents[i].name == name) listener(cacheEvents[i])
            }
        },
        removeEventListener: function(name, listener) {
            var listeners = this.getListeners(name);
            var i = listeners.indexOf(listener);
            if (i >= 0) listeners.splice(i, 1)
        },
        dispatchEvent: function(event, cache) {
            if (!event.name) event = {
                name: event
            };
            var listeners = this.getListeners(event.name);
            listeners = listeners.concat(this.getListeners("*"));
            for (var i = 0; i < listeners.length; i++) {
                listeners[i](event)
            }
            if (cache) this.getCacheEvents().push(event)
        },
        getCacheEvents: function() {
            if (!this.cacheEvents) this.cacheEvents = [];
            return this.cacheEvents
        },
        getListeners: function(name) {
            if (!this.listenerMap) {
                this.listenerMap = {}
            }
            var listeners = this.listenerMap[name];
            if (!listeners) {
                listeners = [];
                this.listenerMap[name] = listeners
            }
            return listeners
        }
    };
    Util.extend(wifikey, {
        init: function(options) {
            Logger.log("sdk init");
            this.doInvoke("init", {
                success: Method.top(options.success),
                error: Method.top(options.error),
                auth: Method.top(options.auth),
                appId: options.appId,
                timestamp: options.timestamp,
                sign: options.sign
            })
        },
        getUserInfo: function(options) {
            var self = this;
            this.doInvoke("getUserInfo", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        hasUserLogin: function(options) {
            var self = this;
            this.doInvoke("hasUserLogin", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        isGuest: function(options) {
            var self = this;
            this.doInvoke("isGuest", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        register: function(options) {
            var self = this;
            this.doInvoke("register", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        shareInfo: function(options) {
            var self = this;
            this.doInvoke("shareInfo", {
                target: options.target,
                type: options.type,
                title: options.title,
                content: options.content,
                image: options.image,
                url: options.url,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        isWXSupported: function(options) {
            var self = this;
            this.doInvoke("isWXSupported", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        openBrowser: function(options) {
            this.doInvoke("openBrowser", {
                url: options.url
            })
        },
        closeBrowser: function(options) {
            this.doInvoke("closeBrowser")
        },
        closeBannerAd: function(options) {
            this.doInvoke("closeBannerAd")
        },
        forward: function(options) {
            this.doInvoke("forward", {
                step: options.step
            })
        },
        backward: function(options) {
            this.doInvoke("backward", {
                step: options.step
            })
        },
        showOptionMenu: function(options) {
            this.doInvoke("showOptionMenu")
        },
        hideOptionMenu: function(options) {
            this.doInvoke("hideOptionMenu")
        },
        showActionBar: function(options) {
            this.doInvoke("showActionBar")
        },
        hideActionBar: function(options) {
            this.doInvoke("hideActionBar")
        },
        getNetworkStatus: function(options) {
            var self = this;
            this.doInvoke("getNetworkStatus", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        getDeviceInfo: function(options) {
            var self = this;
            this.doInvoke("getDeviceInfo", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        getDeviceBasicInfo: function(options) {
            var self = this;
            this.doInvoke("getDeviceBasicInfo", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        openAppStore: function(options) {
            this.doInvoke("openAppStore")
        },
        openAppDetail: function(options) {
            this.doInvoke("openAppDetail", {
                storeId: options.storeId,
                title: options.title,
                readableId: options.readableId,
                pageIndex: options.pageIndex,
                position: options.position,
                dPos: options.dPos,
                packageName: options.packageName,
                appHid: options.appHid,
                icon: options.icon
            })
        },
        isAppInstalled: function(options) {
            var self = this;
            this.doInvoke("isAppInstalled", {
                packageName: options.packageName,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        readAppStatus: function(options) {
            var self = this;
            this.doInvoke("readAppStatus", {
                apps: options.apps,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        downloadApp: function(options) {
            this.doInvoke("downloadApp", {
                storeId: options.storeId,
                title: options.title,
                readableId: options.readableId,
                pageIndex: options.pageIndex,
                position: options.position,
                dPos: options.dPos,
                packageName: options.packageName,
                appHid: options.appHid,
                icon: options.icon,
                tab: options.tab,
                apkURL: options.apkURL,
                completedURL: options.completedURL,
                installedURL: options.installedURL
            })
        },
        pauseDownload: function(options) {
            this.doInvoke("pauseDownload", {
                packageName: options.packageName,
                appHid: options.appHid
            })
        },
        resumeDownload: function(options) {
            this.doInvoke("resumeDownload", {
                packageName: options.packageName,
                appHid: options.appHid
            })
        },
        installApp: function(options) {
            this.doInvoke("installApp", {
                packageName: options.packageName,
                appHid: options.appHid
            })
        },
        openApp: function(options) {
            this.doInvoke("openApp", {
                packageName: options.packageName,
                appHid: options.appHid
            })
        },
        addEventListener: function(options) {
            var id = this.doInvoke("addEventListener", {
                type: options.type,
                listener: Method.top(function(str) {
                    var result = Util.evalJSON(Base64.decode(str));
                    var fun = options.listener || options.handler;
                    fun(result)
                },
                false)
            });
            return id
        },
        removeEventListener: function(options) {
            this.doInvoke("removeEventListener", {
                id: options.id
            })
        },
        dispatchEvent: function(options) {
            this.doInvoke("dispatchEvent", {
                type: options.type,
                data: options.data
            })
        },
        getJsApiVersion: function(options) {
            return this.doInvoke("getJsApiVersion")
        },
        order: function(options) {
            var self = this;
            this.doInvoke("order", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        sendSMS: function(options) {
            var self = this;
            this.doInvoke("sendSMS", {
                phoNum: options.phoNum,
                msg: options.msg,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        getWifiNodes: function(options) {
            var self = this;
            this.doInvoke("getWifiNodes", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        getLocation: function(options) {
            var self = this;
            this.doInvoke("getLocation", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        scanBarcode: function(options) {
            var self = this;
            this.doInvoke("scanBarcode", {
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        trace: function(options) {
            this.doInvoke("trace", {
                type: options.type,
                data: options.data
            })
        },
        setShareData: function(options) {
            this.doInvoke("setShareData", options)
        },
        getShareData: function(options) {
            return this.doInvoke("getShareData", options)
        },
        fetchInfo: function(options) {
            var self = this;
            this.doInvoke("fetchInfo", {
                data: options.data,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        startComponent: function(options) {
            this.doInvoke("startComponent", options)
        },
        appointmentDownload: function(options) {
            this.doInvoke("appointmentDownload", options)
        },
        createShortCut: function(options) {
            this.doInvoke("createShortCut", options)
        },
        getImagesInfo: function(options) {
            this.doInvoke("getImagesInfo", options)
        },
        getImageBox: function(options) {
            this.doInvoke("getImageBox", options)
        },
        checkJsApi: function(options) {
            var self = this;
            this.doInvoke("checkJsApi", {
                data: options,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        activateApp: function(options) {
            var self = this;
            this.doInvoke("activateApp", options)
        },
        getAppStatus: function(options) {
            var self = this;
            this.doInvoke("getAppStatus", {
                data: options,
                onResult: Method.top(function(str) {
                    self.parseResult(options, str)
                })
            })
        },
        doInvoke: function(method, param) {
            return window.prompt("__jsi:" + Util.toJSON({
                service: "wifikey",
                method: method,
                param: Util.toJSON(param)
            }))
        },
        parseResult: function(options, str) {
            var result = Util.evalJSON(Base64.decode(str));
            if (result.status == 0 && options.success) {
                options.success(result.data)
            } else if (result.status == 1 && options.error) {
                options.error(result.data)
            } else if (result.status == 2 && options.calcel) {
                options.cancel(result.data)
            }
        }
    });
    Util.extend(wifikey, {
        Util: Util,
        Event: Event,
        Method: Method,
        Logger: Logger,
        Class: Class,
        Collection: Collection,
        EventDispatcher: EventDispatcher
    });
    if (typeof define === "function" && define.amd) {
        define(function() {
            return wifikey
        })
    } else if (typeof module === "object" && module.exports) {
        module.exports = wifikey
    } else {
        window.wifikey = wifikey
    }
})();