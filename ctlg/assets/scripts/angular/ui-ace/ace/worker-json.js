"no use strict";(function(a){if(void 0===a.window||!a.document){a.console=function(){var a=Array.prototype.slice.call(arguments,0);postMessage({type:"log",data:a})},a.console.error=a.console.warn=a.console.log=a.console.trace=a.console,a.window=a,a.ace=a,a.onerror=function(a,b,c,d,e){postMessage({type:"error",data:{message:a,file:b,line:c,col:d,stack:e.stack}})},a.normalizeModule=function(b,c){if(-1!==c.indexOf("!")){var d=c.split("!");return a.normalizeModule(b,d[0])+"!"+a.normalizeModule(b,d[1])}if("."==c.charAt(0)){var e=b.split("/").slice(0,-1).join("/");for(c=(e?e+"/":"")+c;-1!==c.indexOf(".")&&f!=c;){var f=c;c=c.replace(/^\.\//,"").replace(/\/\.\//,"/").replace(/[^\/]+\/\.\.\//,"")}}return c},a.require=function(b,c){if(c||(c=b,b=null),!c.charAt)throw new Error("worker.js require() accepts only (parentId, id) as arguments");c=a.normalizeModule(b,c);var d=a.require.modules[c];if(d)return d.initialized||(d.initialized=!0,d.exports=d.factory().exports),d.exports;var e=c.split("/");if(!a.require.tlns)return console.log("unable to load "+c);e[0]=a.require.tlns[e[0]]||e[0];var f=e.join("/")+".js";return a.require.id=c,importScripts(f),a.require(b,c)},a.require.modules={},a.require.tlns={},a.define=function(b,c,d){if(2==arguments.length?(d=c,"string"!=typeof b&&(c=b,b=a.require.id)):1==arguments.length&&(d=b,c=[],b=a.require.id),"function"!=typeof d)return void(a.require.modules[b]={exports:d,initialized:!0});c.length||(c=["require","exports","module"]);var e=function(c){return a.require(b,c)};a.require.modules[b]={exports:{},factory:function(){var a=this,b=d.apply(this,c.map(function(b){switch(b){case"require":return e;case"exports":return a.exports;case"module":return a;default:return e(b)}}));return b&&(a.exports=b),a}}},a.define.amd={},a.initBaseUrls=function(a){require.tlns=a},a.initSender=function(){var b=a.require("ace/lib/event_emitter").EventEmitter,c=a.require("ace/lib/oop"),d=function(){};return function(){c.implement(this,b),this.callback=function(a,b){postMessage({type:"call",id:b,data:a})},this.emit=function(a,b){postMessage({type:"event",name:a,data:b})}}.call(d.prototype),new d};var b=a.main=null,c=a.sender=null;a.onmessage=function(d){var e=d.data;if(e.command){if(!b[e.command])throw new Error("Unknown command:"+e.command);b[e.command].apply(b,e.args)}else if(e.init){initBaseUrls(e.tlns),require("ace/lib/es5-shim"),c=a.sender=initSender();var f=require(e.module)[e.classname];b=a.main=new f(c)}else e.event&&c&&c._signal(e.event,e.data)}}})(this),ace.define("ace/lib/oop",["require","exports","module"],function(a,b,c){"use strict";b.inherits=function(a,b){a.super_=b,a.prototype=Object.create(b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}})},b.mixin=function(a,b){for(var c in b)a[c]=b[c];return a},b.implement=function(a,c){b.mixin(a,c)}}),ace.define("ace/lib/event_emitter",["require","exports","module"],function(a,b,c){"use strict";var d={},e=function(){this.propagationStopped=!0},f=function(){this.defaultPrevented=!0};d._emit=d._dispatchEvent=function(a,b){this._eventRegistry||(this._eventRegistry={}),this._defaultHandlers||(this._defaultHandlers={});var c=this._eventRegistry[a]||[],d=this._defaultHandlers[a];if(c.length||d){"object"==typeof b&&b||(b={}),b.type||(b.type=a),b.stopPropagation||(b.stopPropagation=e),b.preventDefault||(b.preventDefault=f),c=c.slice();for(var g=0;g<c.length&&(c[g](b,this),!b.propagationStopped);g++);return d&&!b.defaultPrevented?d(b,this):void 0}},d._signal=function(a,b){var c=(this._eventRegistry||{})[a];if(c){c=c.slice();for(var d=0;d<c.length;d++)c[d](b,this)}},d.once=function(a,b){var c=this;b&&this.addEventListener(a,function d(){c.removeEventListener(a,d),b.apply(null,arguments)})},d.setDefaultHandler=function(a,b){var c=this._defaultHandlers;if(c||(c=this._defaultHandlers={_disabled_:{}}),c[a]){var d=c[a],e=c._disabled_[a];e||(c._disabled_[a]=e=[]),e.push(d);var f=e.indexOf(b);-1!=f&&e.splice(f,1)}c[a]=b},d.removeDefaultHandler=function(a,b){var c=this._defaultHandlers;if(c){var d=c._disabled_[a];if(c[a]==b){c[a];d&&this.setDefaultHandler(a,d.pop())}else if(d){var e=d.indexOf(b);-1!=e&&d.splice(e,1)}}},d.on=d.addEventListener=function(a,b,c){this._eventRegistry=this._eventRegistry||{};var d=this._eventRegistry[a];return d||(d=this._eventRegistry[a]=[]),-1==d.indexOf(b)&&d[c?"unshift":"push"](b),b},d.off=d.removeListener=d.removeEventListener=function(a,b){this._eventRegistry=this._eventRegistry||{};var c=this._eventRegistry[a];if(c){var d=c.indexOf(b);-1!==d&&c.splice(d,1)}},d.removeAllListeners=function(a){this._eventRegistry&&(this._eventRegistry[a]=[])},b.EventEmitter=d}),ace.define("ace/range",["require","exports","module"],function(a,b,c){"use strict";var d=function(a,b){return a.row-b.row||a.column-b.column},e=function(a,b,c,d){this.start={row:a,column:b},this.end={row:c,column:d}};(function(){this.isEqual=function(a){return this.start.row===a.start.row&&this.end.row===a.end.row&&this.start.column===a.start.column&&this.end.column===a.end.column},this.toString=function(){return"Range: ["+this.start.row+"/"+this.start.column+"] -> ["+this.end.row+"/"+this.end.column+"]"},this.contains=function(a,b){return 0==this.compare(a,b)},this.compareRange=function(a){var b,c=a.end,d=a.start;return b=this.compare(c.row,c.column),1==b?(b=this.compare(d.row,d.column),1==b?2:0==b?1:0):-1==b?-2:(b=this.compare(d.row,d.column),-1==b?-1:1==b?42:0)},this.comparePoint=function(a){return this.compare(a.row,a.column)},this.containsRange=function(a){return 0==this.comparePoint(a.start)&&0==this.comparePoint(a.end)},this.intersects=function(a){var b=this.compareRange(a);return-1==b||0==b||1==b},this.isEnd=function(a,b){return this.end.row==a&&this.end.column==b},this.isStart=function(a,b){return this.start.row==a&&this.start.column==b},this.setStart=function(a,b){"object"==typeof a?(this.start.column=a.column,this.start.row=a.row):(this.start.row=a,this.start.column=b)},this.setEnd=function(a,b){"object"==typeof a?(this.end.column=a.column,this.end.row=a.row):(this.end.row=a,this.end.column=b)},this.inside=function(a,b){return 0==this.compare(a,b)&&(!this.isEnd(a,b)&&!this.isStart(a,b))},this.insideStart=function(a,b){return 0==this.compare(a,b)&&!this.isEnd(a,b)},this.insideEnd=function(a,b){return 0==this.compare(a,b)&&!this.isStart(a,b)},this.compare=function(a,b){return this.isMultiLine()||a!==this.start.row?a<this.start.row?-1:a>this.end.row?1:this.start.row===a?b>=this.start.column?0:-1:this.end.row===a?b<=this.end.column?0:1:0:b<this.start.column?-1:b>this.end.column?1:0},this.compareStart=function(a,b){return this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.compareEnd=function(a,b){return this.end.row==a&&this.end.column==b?1:this.compare(a,b)},this.compareInside=function(a,b){return this.end.row==a&&this.end.column==b?1:this.start.row==a&&this.start.column==b?-1:this.compare(a,b)},this.clipRows=function(a,b){if(this.end.row>b)var c={row:b+1,column:0};else if(this.end.row<a)var c={row:a,column:0};if(this.start.row>b)var d={row:b+1,column:0};else if(this.start.row<a)var d={row:a,column:0};return e.fromPoints(d||this.start,c||this.end)},this.extend=function(a,b){var c=this.compare(a,b);if(0==c)return this;if(-1==c)var d={row:a,column:b};else var f={row:a,column:b};return e.fromPoints(d||this.start,f||this.end)},this.isEmpty=function(){return this.start.row===this.end.row&&this.start.column===this.end.column},this.isMultiLine=function(){return this.start.row!==this.end.row},this.clone=function(){return e.fromPoints(this.start,this.end)},this.collapseRows=function(){return 0==this.end.column?new e(this.start.row,0,Math.max(this.start.row,this.end.row-1),0):new e(this.start.row,0,this.end.row,0)},this.toScreenRange=function(a){var b=a.documentToScreenPosition(this.start),c=a.documentToScreenPosition(this.end);return new e(b.row,b.column,c.row,c.column)},this.moveBy=function(a,b){this.start.row+=a,this.start.column+=b,this.end.row+=a,this.end.column+=b}}).call(e.prototype),e.fromPoints=function(a,b){return new e(a.row,a.column,b.row,b.column)},e.comparePoints=d,e.comparePoints=function(a,b){return a.row-b.row||a.column-b.column},b.Range=e}),ace.define("ace/anchor",["require","exports","module","ace/lib/oop","ace/lib/event_emitter"],function(a,b,c){"use strict";var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=b.Anchor=function(a,b,c){this.$onChange=this.onChange.bind(this),this.attach(a),void 0===c?this.setPosition(b.row,b.column):this.setPosition(b,c)};(function(){d.implement(this,e),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.$insertRight=!1,this.onChange=function(a){var b=a.data,c=b.range;if((c.start.row!=c.end.row||c.start.row==this.row)&&!(c.start.row>this.row||c.start.row==this.row&&c.start.column>this.column)){var d=this.row,e=this.column,f=c.start,g=c.end;"insertText"===b.action?f.row===d&&f.column<=e?f.column===e&&this.$insertRight||(f.row===g.row?e+=g.column-f.column:(e-=f.column,d+=g.row-f.row)):f.row!==g.row&&f.row<d&&(d+=g.row-f.row):"insertLines"===b.action?(f.row!==d||0!==e||!this.$insertRight)&&f.row<=d&&(d+=g.row-f.row):"removeText"===b.action?f.row===d&&f.column<e?e=g.column>=e?f.column:Math.max(0,e-(g.column-f.column)):f.row!==g.row&&f.row<d?(g.row===d&&(e=Math.max(0,e-g.column)+f.column),d-=g.row-f.row):g.row===d&&(d-=g.row-f.row,e=Math.max(0,e-g.column)+f.column):"removeLines"==b.action&&f.row<=d&&(g.row<=d?d-=g.row-f.row:(d=f.row,e=0)),this.setPosition(d,e,!0)}},this.setPosition=function(a,b,c){var d;if(d=c?{row:a,column:b}:this.$clipPositionToDocument(a,b),this.row!=d.row||this.column!=d.column){var e={row:this.row,column:this.column};this.row=d.row,this.column=d.column,this._signal("change",{old:e,value:d})}},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.attach=function(a){this.document=a||this.document,this.document.on("change",this.$onChange)},this.$clipPositionToDocument=function(a,b){var c={};return a>=this.document.getLength()?(c.row=Math.max(0,this.document.getLength()-1),c.column=this.document.getLine(c.row).length):a<0?(c.row=0,c.column=0):(c.row=a,c.column=Math.min(this.document.getLine(c.row).length,Math.max(0,b))),b<0&&(c.column=0),c}}).call(f.prototype)}),ace.define("ace/document",["require","exports","module","ace/lib/oop","ace/lib/event_emitter","ace/range","ace/anchor"],function(a,b,c){"use strict";var d=a("./lib/oop"),e=a("./lib/event_emitter").EventEmitter,f=a("./range").Range,g=a("./anchor").Anchor,h=function(a){this.$lines=[],0===a.length?this.$lines=[""]:Array.isArray(a)?this._insertLines(0,a):this.insert({row:0,column:0},a)};(function(){d.implement(this,e),this.setValue=function(a){var b=this.getLength();this.remove(new f(0,0,b,this.getLine(b-1).length)),this.insert({row:0,column:0},a)},this.getValue=function(){return this.getAllLines().join(this.getNewLineCharacter())},this.createAnchor=function(a,b){return new g(this,a,b)},0==="aaa".split(/a/).length?this.$split=function(a){return a.replace(/\r\n|\r/g,"\n").split("\n")}:this.$split=function(a){return a.split(/\r\n|\r|\n/)},this.$detectNewLine=function(a){var b=a.match(/^.*?(\r\n|\r|\n)/m);this.$autoNewLine=b?b[1]:"\n",this._signal("changeNewLineMode")},this.getNewLineCharacter=function(){switch(this.$newLineMode){case"windows":return"\r\n";case"unix":return"\n";default:return this.$autoNewLine||"\n"}},this.$autoNewLine="",this.$newLineMode="auto",this.setNewLineMode=function(a){this.$newLineMode!==a&&(this.$newLineMode=a,this._signal("changeNewLineMode"))},this.getNewLineMode=function(){return this.$newLineMode},this.isNewLine=function(a){return"\r\n"==a||"\r"==a||"\n"==a},this.getLine=function(a){return this.$lines[a]||""},this.getLines=function(a,b){return this.$lines.slice(a,b+1)},this.getAllLines=function(){return this.getLines(0,this.getLength())},this.getLength=function(){return this.$lines.length},this.getTextRange=function(a){if(a.start.row==a.end.row)return this.getLine(a.start.row).substring(a.start.column,a.end.column);var b=this.getLines(a.start.row,a.end.row);b[0]=(b[0]||"").substring(a.start.column);var c=b.length-1;return a.end.row-a.start.row==c&&(b[c]=b[c].substring(0,a.end.column)),b.join(this.getNewLineCharacter())},this.$clipPosition=function(a){var b=this.getLength();return a.row>=b?(a.row=Math.max(0,b-1),a.column=this.getLine(b-1).length):a.row<0&&(a.row=0),a},this.insert=function(a,b){if(!b||0===b.length)return a;a=this.$clipPosition(a),this.getLength()<=1&&this.$detectNewLine(b);var c=this.$split(b),d=c.splice(0,1)[0],e=0==c.length?null:c.splice(c.length-1,1)[0];return a=this.insertInLine(a,d),null!==e&&(a=this.insertNewLine(a),a=this._insertLines(a.row,c),a=this.insertInLine(a,e||"")),a},this.insertLines=function(a,b){return a>=this.getLength()?this.insert({row:a,column:0},"\n"+b.join("\n")):this._insertLines(Math.max(a,0),b)},this._insertLines=function(a,b){if(0==b.length)return{row:a,column:0};for(;b.length>2e4;){var c=this._insertLines(a,b.slice(0,2e4));b=b.slice(2e4),a=c.row}var d=[a,0];d.push.apply(d,b),this.$lines.splice.apply(this.$lines,d);var e=new f(a,0,a+b.length,0),g={action:"insertLines",range:e,lines:b};return this._signal("change",{data:g}),e.end},this.insertNewLine=function(a){a=this.$clipPosition(a);var b=this.$lines[a.row]||"";this.$lines[a.row]=b.substring(0,a.column),this.$lines.splice(a.row+1,0,b.substring(a.column,b.length));var c={row:a.row+1,column:0},d={action:"insertText",range:f.fromPoints(a,c),text:this.getNewLineCharacter()};return this._signal("change",{data:d}),c},this.insertInLine=function(a,b){if(0==b.length)return a;var c=this.$lines[a.row]||"";this.$lines[a.row]=c.substring(0,a.column)+b+c.substring(a.column);var d={row:a.row,column:a.column+b.length},e={action:"insertText",range:f.fromPoints(a,d),text:b};return this._signal("change",{data:e}),d},this.remove=function(a){if(a instanceof f||(a=f.fromPoints(a.start,a.end)),a.start=this.$clipPosition(a.start),a.end=this.$clipPosition(a.end),a.isEmpty())return a.start;var b=a.start.row,c=a.end.row;if(a.isMultiLine()){var d=0==a.start.column?b:b+1,e=c-1;a.end.column>0&&this.removeInLine(c,0,a.end.column),e>=d&&this._removeLines(d,e),d!=b&&(this.removeInLine(b,a.start.column,this.getLine(b).length),this.removeNewLine(a.start.row))}else this.removeInLine(b,a.start.column,a.end.column);return a.start},this.removeInLine=function(a,b,c){if(b!=c){var d=new f(a,b,a,c),e=this.getLine(a),g=e.substring(b,c),h=e.substring(0,b)+e.substring(c,e.length);this.$lines.splice(a,1,h);var i={action:"removeText",range:d,text:g};return this._signal("change",{data:i}),d.start}},this.removeLines=function(a,b){return a<0||b>=this.getLength()?this.remove(new f(a,0,b+1,0)):this._removeLines(a,b)},this._removeLines=function(a,b){var c=new f(a,0,b+1,0),d=this.$lines.splice(a,b-a+1),e={action:"removeLines",range:c,nl:this.getNewLineCharacter(),lines:d};return this._signal("change",{data:e}),d},this.removeNewLine=function(a){var b=this.getLine(a),c=this.getLine(a+1),d=new f(a,b.length,a+1,0),e=b+c;this.$lines.splice(a,2,e);var g={action:"removeText",range:d,text:this.getNewLineCharacter()};this._signal("change",{data:g})},this.replace=function(a,b){if(a instanceof f||(a=f.fromPoints(a.start,a.end)),0==b.length&&a.isEmpty())return a.start;if(b==this.getTextRange(a))return a.end;if(this.remove(a),b)var c=this.insert(a.start,b);else c=a.start;return c},this.applyDeltas=function(a){for(var b=0;b<a.length;b++){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);"insertLines"==c.action?this.insertLines(d.start.row,c.lines):"insertText"==c.action?this.insert(d.start,c.text):"removeLines"==c.action?this._removeLines(d.start.row,d.end.row-1):"removeText"==c.action&&this.remove(d)}},this.revertDeltas=function(a){for(var b=a.length-1;b>=0;b--){var c=a[b],d=f.fromPoints(c.range.start,c.range.end);"insertLines"==c.action?this._removeLines(d.start.row,d.end.row-1):"insertText"==c.action?this.remove(d):"removeLines"==c.action?this._insertLines(d.start.row,c.lines):"removeText"==c.action&&this.insert(d.start,c.text)}},this.indexToPosition=function(a,b){for(var c=this.$lines||this.getAllLines(),d=this.getNewLineCharacter().length,e=b||0,f=c.length;e<f;e++)if((a-=c[e].length+d)<0)return{row:e,column:a+c[e].length+d};return{row:f-1,column:c[f-1].length}},this.positionToIndex=function(a,b){for(var c=this.$lines||this.getAllLines(),d=this.getNewLineCharacter().length,e=0,f=Math.min(a.row,c.length),g=b||0;g<f;++g)e+=c[g].length+d;return e+a.column}}).call(h.prototype),b.Document=h}),ace.define("ace/lib/lang",["require","exports","module"],function(a,b,c){"use strict";b.last=function(a){return a[a.length-1]},b.stringReverse=function(a){return a.split("").reverse().join("")},b.stringRepeat=function(a,b){for(var c="";b>0;)1&b&&(c+=a),(b>>=1)&&(a+=a);return c};var d=/^\s\s*/,e=/\s\s*$/;b.stringTrimLeft=function(a){return a.replace(d,"")},b.stringTrimRight=function(a){return a.replace(e,"")},b.copyObject=function(a){var b={};for(var c in a)b[c]=a[c];return b},b.copyArray=function(a){for(var b=[],c=0,d=a.length;c<d;c++)a[c]&&"object"==typeof a[c]?b[c]=this.copyObject(a[c]):b[c]=a[c];return b},b.deepCopy=function(a){if("object"!=typeof a||!a)return a;var c=a.constructor;if(c===RegExp)return a;var d=c();for(var e in a)"object"==typeof a[e]?d[e]=b.deepCopy(a[e]):d[e]=a[e];return d},b.arrayToMap=function(a){for(var b={},c=0;c<a.length;c++)b[a[c]]=1;return b},b.createMap=function(a){var b=Object.create(null);for(var c in a)b[c]=a[c];return b},b.arrayRemove=function(a,b){for(var c=0;c<=a.length;c++)b===a[c]&&a.splice(c,1)},b.escapeRegExp=function(a){return a.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},b.escapeHTML=function(a){return a.replace(/&/g,"&#38;").replace(/"/g,"&#34;").replace(/'/g,"&#39;").replace(/</g,"&#60;")},b.getMatchOffsets=function(a,b){var c=[];return a.replace(b,function(a){c.push({offset:arguments[arguments.length-2],length:a.length})}),c},b.deferredCall=function(a){var b=null,c=function(){b=null,a()},d=function(a){return d.cancel(),b=setTimeout(c,a||0),d};return d.schedule=d,d.call=function(){return this.cancel(),a(),d},d.cancel=function(){return clearTimeout(b),b=null,d},d.isPending=function(){return b},d},b.delayedCall=function(a,b){var c=null,d=function(){c=null,a()},e=function(a){null==c&&(c=setTimeout(d,a||b))};return e.delay=function(a){c&&clearTimeout(c),c=setTimeout(d,a||b)},e.schedule=e,e.call=function(){this.cancel(),a()},e.cancel=function(){c&&clearTimeout(c),c=null},e.isPending=function(){return c},e}}),ace.define("ace/worker/mirror",["require","exports","module","ace/document","ace/lib/lang"],function(a,b,c){"use strict";var d=a("../document").Document,e=a("../lib/lang"),f=b.Mirror=function(a){this.sender=a;var b=this.doc=new d(""),c=this.deferredUpdate=e.delayedCall(this.onUpdate.bind(this)),f=this;a.on("change",function(a){if(b.applyDeltas(a.data),f.$timeout)return c.schedule(f.$timeout);f.onUpdate()})};(function(){this.$timeout=500,this.setTimeout=function(a){this.$timeout=a},this.setValue=function(a){this.doc.setValue(a),this.deferredUpdate.schedule(this.$timeout)},this.getValue=function(a){this.sender.callback(this.doc.getValue(),a)},this.onUpdate=function(){},this.isPending=function(){return this.deferredUpdate.isPending()}}).call(f.prototype)}),ace.define("ace/mode/json/json_parse",["require","exports","module"],function(a,b,c){"use strict";var d,e,f,g,h={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"},i=function(a){throw{name:"SyntaxError",message:a,at:d,text:f}},j=function(a){return a&&a!==e&&i("Expected '"+a+"' instead of '"+e+"'"),e=f.charAt(d),d+=1,e},k=function(){var a,b="";for("-"===e&&(b="-",j("-"));e>="0"&&e<="9";)b+=e,j();if("."===e)for(b+=".";j()&&e>="0"&&e<="9";)b+=e;if("e"===e||"E"===e)for(b+=e,j(),"-"!==e&&"+"!==e||(b+=e,j());e>="0"&&e<="9";)b+=e,j();if(a=+b,!isNaN(a))return a;i("Bad number")},l=function(){var a,b,c,d="";if('"'===e)for(;j();){if('"'===e)return j(),d;if("\\"===e)if(j(),"u"===e){for(c=0,b=0;b<4&&(a=parseInt(j(),16),isFinite(a));b+=1)c=16*c+a;d+=String.fromCharCode(c)}else{if("string"!=typeof h[e])break;d+=h[e]}else d+=e}i("Bad string")},m=function(){for(;e&&e<=" ";)j()},n=function(){switch(e){case"t":return j("t"),j("r"),j("u"),j("e"),!0;case"f":return j("f"),j("a"),j("l"),j("s"),j("e"),!1;case"n":return j("n"),j("u"),j("l"),j("l"),null}i("Unexpected '"+e+"'")},o=function(){var a=[];if("["===e){if(j("["),m(),"]"===e)return j("]"),a;for(;e;){if(a.push(g()),m(),"]"===e)return j("]"),a;j(","),m()}}i("Bad array")},p=function(){var a,b={};if("{"===e){if(j("{"),m(),"}"===e)return j("}"),b;for(;e;){if(a=l(),m(),j(":"),Object.hasOwnProperty.call(b,a)&&i('Duplicate key "'+a+'"'),b[a]=g(),m(),"}"===e)return j("}"),b;j(","),m()}}i("Bad object")};return g=function(){switch(m(),e){case"{":return p();case"[":return o();case'"':return l();case"-":return k();default:return e>="0"&&e<="9"?k():n()}},function(a,b){var c;return f=a,d=0,e=" ",c=g(),m(),e&&i("Syntax error"),"function"==typeof b?function a(c,d){var e,f,g=c[d];if(g&&"object"==typeof g)for(e in g)Object.hasOwnProperty.call(g,e)&&(f=a(g,e),void 0!==f?g[e]=f:delete g[e]);return b.call(c,d,g)}({"":c},""):c}}),ace.define("ace/mode/json_worker",["require","exports","module","ace/lib/oop","ace/worker/mirror","ace/mode/json/json_parse"],function(a,b,c){"use strict";var d=a("../lib/oop"),e=a("../worker/mirror").Mirror,f=a("./json/json_parse"),g=b.JsonWorker=function(a){e.call(this,a),this.setTimeout(200)};d.inherits(g,e),function(){this.onUpdate=function(){var a=this.doc.getValue(),b=[];try{a&&f(a)}catch(a){var c=this.doc.indexToPosition(a.at-1);b.push({row:c.row,column:c.column,text:a.message,type:"error"})}this.sender.emit("annotate",b)}}.call(g.prototype)}),ace.define("ace/lib/es5-shim",["require","exports","module"],function(a,b,c){function d(){}function e(a){try{return Object.defineProperty(a,"sentinel",{}),"sentinel"in a}catch(a){}}function f(a){return a=+a,a!==a?a=0:0!==a&&a!==1/0&&a!==-1/0&&(a=(a>0||-1)*Math.floor(Math.abs(a))),a}Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError("Function.prototype.bind called on incompatible "+b);var c=o.call(arguments,1),e=function(){if(this instanceof e){var d=b.apply(this,c.concat(o.call(arguments)));return Object(d)===d?d:this}return b.apply(a,c.concat(o.call(arguments)))};return b.prototype&&(d.prototype=b.prototype,e.prototype=new d,d.prototype=null),e});var g,h,i,j,k,l=Function.prototype.call,m=Array.prototype,n=Object.prototype,o=m.slice,p=l.bind(n.toString),q=l.bind(n.hasOwnProperty);if((k=q(n,"__defineGetter__"))&&(g=l.bind(n.__defineGetter__),h=l.bind(n.__defineSetter__),i=l.bind(n.__lookupGetter__),j=l.bind(n.__lookupSetter__)),2!=[1,2].splice(0).length)if(function(){function a(a){var b=new Array(a+2);return b[0]=b[1]=0,b}var b,c=[];if(c.splice.apply(c,a(20)),c.splice.apply(c,a(26)),b=c.length,c.splice(5,0,"XXX"),c.length,b+1==c.length)return!0}()){var r=Array.prototype.splice;Array.prototype.splice=function(a,b){return arguments.length?r.apply(this,[void 0===a?0:a,void 0===b?this.length-a:b].concat(o.call(arguments,2))):[]}}else Array.prototype.splice=function(a,b){var c=this.length;a>0?a>c&&(a=c):void 0==a?a=0:a<0&&(a=Math.max(c+a,0)),a+b<c||(b=c-a);var d=this.slice(a,a+b),e=o.call(arguments,2),f=e.length;if(a===c)f&&this.push.apply(this,e);else{var g=Math.min(b,c-a),h=a+g,i=h+f-g,j=c-h,k=c-g;if(i<h)for(var l=0;l<j;++l)this[i+l]=this[h+l];else if(i>h)for(l=j;l--;)this[i+l]=this[h+l];if(f&&a===k)this.length=k,this.push.apply(this,e);else for(this.length=k+f,l=0;l<f;++l)this[a+l]=e[l]}return d};Array.isArray||(Array.isArray=function(a){return"[object Array]"==p(a)});var s=Object("a"),t="a"!=s[0]||!(0 in s);if(Array.prototype.forEach||(Array.prototype.forEach=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=arguments[1],e=-1,f=c.length>>>0;if("[object Function]"!=p(a))throw new TypeError;for(;++e<f;)e in c&&a.call(d,c[e],e,b)}),Array.prototype.map||(Array.prototype.map=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=c.length>>>0,e=Array(d),f=arguments[1];if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");for(var g=0;g<d;g++)g in c&&(e[g]=a.call(f,c[g],g,b));return e}),Array.prototype.filter||(Array.prototype.filter=function(a){var b,c=F(this),d=t&&"[object String]"==p(this)?this.split(""):c,e=d.length>>>0,f=[],g=arguments[1];if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");for(var h=0;h<e;h++)h in d&&(b=d[h],a.call(g,b,h,c)&&f.push(b));return f}),Array.prototype.every||(Array.prototype.every=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=c.length>>>0,e=arguments[1];if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");for(var f=0;f<d;f++)if(f in c&&!a.call(e,c[f],f,b))return!1;return!0}),Array.prototype.some||(Array.prototype.some=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=c.length>>>0,e=arguments[1];if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");for(var f=0;f<d;f++)if(f in c&&a.call(e,c[f],f,b))return!0;return!1}),Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=c.length>>>0;if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");if(!d&&1==arguments.length)throw new TypeError("reduce of empty array with no initial value");var e,f=0;if(arguments.length>=2)e=arguments[1];else for(;;){if(f in c){e=c[f++];break}if(++f>=d)throw new TypeError("reduce of empty array with no initial value")}for(;f<d;f++)f in c&&(e=a.call(void 0,e,c[f],f,b));return e}),Array.prototype.reduceRight||(Array.prototype.reduceRight=function(a){var b=F(this),c=t&&"[object String]"==p(this)?this.split(""):b,d=c.length>>>0;if("[object Function]"!=p(a))throw new TypeError(a+" is not a function");if(!d&&1==arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var e,f=d-1;if(arguments.length>=2)e=arguments[1];else for(;;){if(f in c){e=c[f--];break}if(--f<0)throw new TypeError("reduceRight of empty array with no initial value")}do{f in this&&(e=a.call(void 0,e,c[f],f,b))}while(f--);return e}),Array.prototype.indexOf&&-1==[0,1].indexOf(1,2)||(Array.prototype.indexOf=function(a){var b=t&&"[object String]"==p(this)?this.split(""):F(this),c=b.length>>>0;if(!c)return-1;var d=0;for(arguments.length>1&&(d=f(arguments[1])),d=d>=0?d:Math.max(0,c+d);d<c;d++)if(d in b&&b[d]===a)return d;return-1}),Array.prototype.lastIndexOf&&-1==[0,1].lastIndexOf(0,-3)||(Array.prototype.lastIndexOf=function(a){var b=t&&"[object String]"==p(this)?this.split(""):F(this),c=b.length>>>0;if(!c)return-1;var d=c-1;for(arguments.length>1&&(d=Math.min(d,f(arguments[1]))),d=d>=0?d:c-Math.abs(d);d>=0;d--)if(d in b&&a===b[d])return d;return-1}),Object.getPrototypeOf||(Object.getPrototypeOf=function(a){return a.__proto__||(a.constructor?a.constructor.prototype:n)}),!Object.getOwnPropertyDescriptor){Object.getOwnPropertyDescriptor=function(a,b){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError("Object.getOwnPropertyDescriptor called on a non-object: "+a);if(q(a,b)){var c,d,e;if(c={enumerable:!0,configurable:!0},k){var f=a.__proto__;a.__proto__=n;var d=i(a,b),e=j(a,b);if(a.__proto__=f,d||e)return d&&(c.get=d),e&&(c.set=e),c}return c.value=a[b],c}}}if(Object.getOwnPropertyNames||(Object.getOwnPropertyNames=function(a){return Object.keys(a)}),!Object.create){var u;u=null===Object.prototype.__proto__?function(){return{__proto__:null}}:function(){var a={};for(var b in a)a[b]=null;return a.constructor=a.hasOwnProperty=a.propertyIsEnumerable=a.isPrototypeOf=a.toLocaleString=a.toString=a.valueOf=a.__proto__=null,a},Object.create=function(a,b){var c;if(null===a)c=u();else{if("object"!=typeof a)throw new TypeError("typeof prototype["+typeof a+"] != 'object'");var d=function(){};d.prototype=a,c=new d,c.__proto__=a}return void 0!==b&&Object.defineProperties(c,b),c}}if(Object.defineProperty){var v=e({}),w="undefined"==typeof document||e(document.createElement("div"));if(!v||!w)var x=Object.defineProperty}if(!Object.defineProperty||x){Object.defineProperty=function(a,b,c){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError("Object.defineProperty called on non-object: "+a);if("object"!=typeof c&&"function"!=typeof c||null===c)throw new TypeError("Property description must be an object: "+c);if(x)try{return x.call(Object,a,b,c)}catch(a){}if(q(c,"value"))if(k&&(i(a,b)||j(a,b))){var d=a.__proto__;a.__proto__=n,delete a[b],a[b]=c.value,a.__proto__=d}else a[b]=c.value;else{if(!k)throw new TypeError("getters & setters can not be defined on this javascript engine");q(c,"get")&&g(a,b,c.get),q(c,"set")&&h(a,b,c.set)}return a}}Object.defineProperties||(Object.defineProperties=function(a,b){for(var c in b)q(b,c)&&Object.defineProperty(a,c,b[c]);return a}),Object.seal||(Object.seal=function(a){return a}),Object.freeze||(Object.freeze=function(a){return a});try{Object.freeze(function(){})}catch(a){Object.freeze=function(a){return function(b){return"function"==typeof b?b:a(b)}}(Object.freeze)}if(Object.preventExtensions||(Object.preventExtensions=function(a){return a}),Object.isSealed||(Object.isSealed=function(a){return!1}),Object.isFrozen||(Object.isFrozen=function(a){return!1}),Object.isExtensible||(Object.isExtensible=function(a){if(Object(a)===a)throw new TypeError;for(var b="";q(a,b);)b+="?";a[b]=!0;var c=q(a,b);return delete a[b],c}),!Object.keys){var y=!0,z=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],A=z.length;for(var B in{toString:null})y=!1;Object.keys=function(a){if("object"!=typeof a&&"function"!=typeof a||null===a)throw new TypeError("Object.keys called on a non-object");var b=[];for(var c in a)q(a,c)&&b.push(c);if(y)for(var d=0,e=A;d<e;d++){var f=z[d];q(a,f)&&b.push(f)}return b}}Date.now||(Date.now=function(){return(new Date).getTime()});var C="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff";if(!String.prototype.trim||C.trim()){C="["+C+"]";var D=new RegExp("^"+C+C+"*"),E=new RegExp(C+C+"*$");String.prototype.trim=function(){return String(this).replace(D,"").replace(E,"")}}var F=function(a){if(null==a)throw new TypeError("can't convert "+a+" to object");return Object(a)}});