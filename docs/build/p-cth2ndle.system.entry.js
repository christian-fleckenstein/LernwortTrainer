System.register(["./p-e2079887.system.js"],(function(e){"use strict";var t,i;return{setters:[function(e){t=e.r;i=e.h}],execute:function(){var n=e("app_home",function(){function e(e){t(this,e);this.zielWert=3;this.toggle=0;this.wortListe=[];this.abfrageListe=[];this.eingabeDavor="";this.loesungAnzeigen=false;this.vorherigesloesungAnzeigen=false;this.synth=window.speechSynthesis;this.voices=[];this.currentVoice=0}e.prototype.abfrageListeNeuAufbauen=function(){var e=this;var t=this.zielWert;this.wortListe.map((function(i){if(i.richtig<t){t=i.richtig;e.abfrageListe=[];e.abfrageListe.push(i)}else if(i.richtig==t&&e.zielWert>i.richtig){e.abfrageListe.push(i)}}));var i=this.abfrageListe.length,n;while(i>0){n=Math.floor(Math.random()*i);i=i-1;var r=this.abfrageListe[i];this.abfrageListe[i]=this.abfrageListe[n];this.abfrageListe[n]=r}};e.prototype.vorlesen=function(e,t){if(this.voices.length==0){this.voices=this.synth.getVoices();var i;for(i=0;i<this.voices.length;i++){if(this.voices[i].lang!="de-DE"){this.voices[i]=this.voices[this.voices.length-1];this.voices.pop();i--}}}if(this.voices.length==0)alert("Dieser Webbrowser kann nicht in Deutsch vorlesen - bitte einen anderen verwenden!");if(t){this.currentVoice+=1;if(this.currentVoice>=this.voices.length)this.currentVoice=0}var n=new SpeechSynthesisUtterance(e);n.voice=this.voices[this.currentVoice];n.pitch=1;n.rate=1;this.synth.speak(n)};e.prototype.zielwertGeaendert=function(e){this.zielWert=e.target.value};e.prototype.woertListeGeaendert=function(e){this.eingabeWortliste=e.target.value};e.prototype.woerterUebernehmen=function(e){e.preventDefault();if(this.eingabeWortliste===undefined)return-1;var t=this.eingabeWortliste.split("\n");this.wortListe=[];for(var i=0,n=t.entries();i<n.length;i++){var r=n[i],s=r[0],a=r[1];var h=a.trim();if(h.indexOf('"')!=-1&&h.indexOf('"')+2<h.lastIndexOf('"')){h=h.substring(h.indexOf('"')+1,h.lastIndexOf('"'))}else{var o=0;a.split(" ").forEach((function(e){if(e.length>o){o=e.length;h=e}}))}var l={wort:a.trim(),richtig:0,index:s,antwort:h};if(a.trim().length>1)this.wortListe.push(l)}this.abfrageListeNeuAufbauen();this.vorlesen(this.abfrageListe[0].wort,false)};e.prototype.eingabeAbgeben=function(e){e.preventDefault();if(this.abfrageListe.length>0)this.vorlesen(this.abfrageListe[0].wort,false);if(this.eingabeDavor==""||this.eingabeDavor!=this.eingabeJetzt){this.eingabeDavor=this.eingabeJetzt}else{this.loesungAnzeigen=true;this.abfrageListe[0].richtig=0}};e.prototype.eingabeEingeben=function(e){this.eingabeJetzt=e.target.value;this.loesungAnzeigen=false;this.vorherigesloesungAnzeigen=false;if(this.abfrageListe[0].antwort==this.eingabeJetzt){this.vorlesen("richtig!",false);this.eingabeDavor=this.eingabeJetzt;this.eingabeJetzt="";this.abfrageListe[0].richtig++;this.abfrageListe.shift();this.vorherigesloesungAnzeigen=true;if(this.abfrageListe.length==0)this.abfrageListeNeuAufbauen();if(this.abfrageListe.length>0)this.vorlesen(this.abfrageListe[0].wort,false)}return-1};e.prototype.render=function(){var e=this;this.toggle=1-this.toggle;if(this.wortListe.length==0){return i("div",{class:"app-home"},i("header",null,i("h1",null,"Lernwort Quiz"),i("button",{onClick:function(){return e.vorlesen("Hallo, verstehst Du mich gut?",true)}},"Stimme wechseln!")),i("p",null,"Bitte hier eine die abzufragenden Wörter eingeben.",i("br",null),"Werden mehrere Wörter pro Zeile eingegeben, so wird alles vorgelesen, aber nicht so genau geprüft.",i("br",null),"D.h. es reicht, das längste Wort richtig einzugeben."),i("datalist",{id:"1bis5"},i("option",{value:"1"}),i("option",{value:"2"}),i("option",{value:"3"}),i("option",{value:"4"}),i("option",{value:"5"})),i("form",{onSubmit:function(t){return e.woerterUebernehmen(t)}},i("label",null,"Benötigte richtige Antworten:",i("input",{type:"number",width:1,min:1,max:5,value:this.zielWert,list:"1bis5",size:1,onInput:function(t){return e.zielwertGeaendert(t)}})),i("br",null),i("textarea",{onInput:function(t){return e.woertListeGeaendert(t)},cols:30,rows:10,minlength:5+this.toggle,spellcheck:true,autoFocus:true}),i("br",null),i("input",{type:"Submit",value:"Übernehmen"})))}else if(this.abfrageListe.length>0){return i("div",{class:"app-home"},i("header",null,i("h1",null,"Lernwort Quiz"),i("button",{onClick:function(){return e.vorlesen(e.abfrageListe[0].wort,true)}},"Stimme wechseln!")),i("p",null,i("div",null,i("form",{onSubmit:function(t){return e.eingabeAbgeben(t)}},i("p",null,"Antwort:",i("input",{type:"text",width:20,value:this.eingabeJetzt,autoFocus:true,minLength:this.toggle*0,onInput:function(t){return e.eingabeEingeben(t)}}),!this.loesungAnzeigen&&!this.vorherigesloesungAnzeigen?"":this.loesungAnzeigen?this.abfrageListe[0].antwort:""+this.vorherigesloesungAnzeigen?this.eingabeDavor:"")))))}else{this.vorlesen("Du hast alle Lernwörter "+this.zielWert+" mal richtig gehabt. Super!",false);return i("div",{class:"app-home"},i("header",null,i("h1",null,"Lernwort Quiz")),i("div",null,i("p",{class:"richtig"},"Geschafft!")))}};Object.defineProperty(e,"style",{get:function(){return".app-home{padding:10px}button,input{background:#3737b8}button,input,textarea{color:#fff;margin:8px;border:none;font-size:13px;font-weight:700;padding:16px 5px;border-radius:2px;-webkit-box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);box-shadow:0 8px 16px rgba(0,0,0,.1),0 3px 6px rgba(0,0,0,.08);outline:0;letter-spacing:.04em;-webkit-transition:all .15s ease;transition:all .15s ease;cursor:pointer}textarea{background:#ffc}button:hover,input:focus{-webkit-box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);box-shadow:0 3px 6px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.1);-webkit-transform:translateY(1px);transform:translateY(1px)}header{background:#5851ff;color:#fff}.richtig,header{height:56px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.26);box-shadow:0 2px 5px 0 rgba(0,0,0,.26)}.richtig{background:#ff2;color:#000}h1{color:#fff}h1,p{font-size:1.7rem;font-weight:500;padding:0 12px}p{color:#000}label,textarea{padding:16 12px}input,label,textarea{font-size:1.7rem;font-weight:500;color:#000}input{background:#ffa;padding:16 px;border:none}"},enumerable:true,configurable:true});return e}())}}}));