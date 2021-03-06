import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true
})
export class AppHome {

  @State() zielWert: number = 3;
  @State() toggle: number = 0;

  @State() eingabeWortliste: string;

  @State() wortListe: any[] = [];
  @State() abfrageListe: any[] = [];

  @State() eingabeJetzt: string;
  @State() eingabeDavor: string = "";
  @State() loesungAnzeigen: boolean = false;
  @State() vorherigesloesungAnzeigen: boolean = false;
  
  @State() synth = window.speechSynthesis;
  @State() voices = [];
  @State() currentVoice = 0;

  abfrageListeNeuAufbauen() {
    var schlechteste = this.zielWert;
    this.wortListe.map((wort) => {
      if (wort.richtig < schlechteste) {
        schlechteste = wort.richtig;
        this.abfrageListe = [];
        this.abfrageListe.push(wort);
      } else if (wort.richtig == schlechteste && this.zielWert > wort.richtig) {
        this.abfrageListe.push(wort);
      }
    });

    // durchmischen

    var z = this.abfrageListe.length, i;
    while (z > 0) {
      i = Math.floor(Math.random() * z);
      z = z - 1;
      var wort = this.abfrageListe[z];
      this.abfrageListe[z] = this.abfrageListe[i];
      this.abfrageListe[i] = wort;
    }
  }

  vorlesen(text, stimmeWechseln) {
    if (this.voices.length == 0) {
      this.voices = this.synth.getVoices();
      var i: number;
      for (i = 0; i < this.voices.length; i++) {
        if (this.voices[i].lang != "de-DE") {
          this.voices[i] = this.voices[this.voices.length - 1];
          this.voices.pop();
          i--;
        }
      }
    }

    if (this.voices.length == 0)
      alert("Dieser Webbrowser kann nicht in Deutsch vorlesen - bitte einen anderen verwenden!");

    if (stimmeWechseln) {
      this.currentVoice += 1;
      if (this.currentVoice >= this.voices.length)
        this.currentVoice = 0;
    }

    var utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = this.voices[this.currentVoice];
    utterThis.pitch = 1.0;
    utterThis.rate = 1.0;
    this.synth.speak(utterThis);
  }


  zielwertGeaendert(event) {
    this.zielWert = event.target.value;
  }

  woertListeGeaendert(event) {
    this.eingabeWortliste = event.target.value;
  }

  woerterUebernehmen(event) {
    event.preventDefault();
    if (this.eingabeWortliste === undefined) return -1;

    var tmpWoerter = this.eingabeWortliste.split("\n");
    this.wortListe = [];
    for (const [index, value] of tmpWoerter.entries()) {
      var antwort = value.trim();
      if (antwort.indexOf("\"") != -1 && antwort.indexOf("\"") + 2 < antwort.lastIndexOf("\"")) {
        // Antwort in Anführungszeichen?
        antwort = antwort.substring(antwort.indexOf("\"") + 1, antwort.lastIndexOf("\""));
      } else {
        // Sonst längstes Teilwort
        var maxLen = 0;
        value.split(" ").forEach(part => { if (part.length > maxLen) { maxLen = part.length; antwort = part; } })
      }
      var wort = { wort: value.trim(), richtig: 0, index: index, antwort: antwort };
      if (value.trim().length > 1) this.wortListe.push(wort);
    }

    // Abfrageliste neu aufbauen
    this.abfrageListeNeuAufbauen();
    this.vorlesen(this.abfrageListe[0].wort, false);

  }

eingabeAbgeben(event) {
  event.preventDefault();
  // three options:
  // No input yet: Say word
  // With input, first submit: say word
  // With input, 2nd submit: show word, reset counter

  // Always vorlesen
  if (this.abfrageListe.length > 0)
  this.vorlesen(this.abfrageListe[0].wort, false);
  if (this.eingabeDavor == "" ||  this.eingabeDavor != this.eingabeJetzt) {
      this.eingabeDavor = this.eingabeJetzt;

  } else {
    // Show word only if 2x enter after entering something
      this.loesungAnzeigen = true;
      this.abfrageListe[0].richtig = 0;
  }
}

eingabeEingeben(event) {
  this.eingabeJetzt = event.target.value;
  this.loesungAnzeigen = false;
  this.vorherigesloesungAnzeigen = false;

  if (this.abfrageListe[0].antwort == this.eingabeJetzt) {
    this.vorlesen("richtig!", false);
    this.eingabeDavor = this.eingabeJetzt;
    this.eingabeJetzt = "";
    this.abfrageListe[0].richtig++;
    this.abfrageListe.shift();
    this.vorherigesloesungAnzeigen = true;
    if (this.abfrageListe.length == 0) this.abfrageListeNeuAufbauen();
    if (this.abfrageListe.length > 0) this.vorlesen(this.abfrageListe[0].wort, false);
  } 

  return -1;
}

render() {
  this.toggle = 1 - this.toggle;
  //Eingabe der abzufragenden Wörter:
  if (this.wortListe.length == 0) {
    return (
      <div class='app-home'>
        <header>
          <h1>Lernwort Quiz</h1><button onClick={() => this.vorlesen("Hallo, verstehst Du mich gut?", true)}>Stimme wechseln!</button>
        </header>
        <p>
          Bitte hier eine die abzufragenden Wörter eingeben.
            <br />Werden mehrere Wörter pro Zeile eingegeben, so wird alles vorgelesen, aber nicht so genau geprüft.
            <br />D.h. es reicht, das längste Wort richtig einzugeben.
          </p>
        <datalist id="1bis5">
          <option value="1" />
          <option value="2" />
          <option value="3" />
          <option value="4" />
          <option value="5" />
        </datalist>
        <form onSubmit={(e) => this.woerterUebernehmen(e)}>
          <label>Benötigte richtige Antworten:
              <input type="number" width={1} min={1} max={5} value={this.zielWert} list={"1bis5"} size={1}
              onInput={(event) => this.zielwertGeaendert(event)} />
          </label>
          <br />
          <textarea onInput={(event) => this.woertListeGeaendert(event)} cols={30} rows={10} minlength={5+this.toggle} spellcheck={true} autoFocus={true}/>
          <br />
          <input type="Submit" value="Übernehmen" />          
        </form>

      </div>
    )
  } else if (this.abfrageListe.length > 0) {
    // noch Wörter in der Anfrage Liste ?
      return (
        <div class='app-home'>
        <header>
          <h1>Lernwort Quiz</h1>
          <button onClick={() => this.vorlesen(this.abfrageListe[0].wort, true)}>Stimme wechseln!</button>
        </header>
        <p>
          <div>
            <form onSubmit={(e) => this.eingabeAbgeben(e)}>
              <p>Antwort:
              <input type="text" width={20} value={this.eingabeJetzt} autoFocus={true} minLength = {this.toggle *0}
                  onInput={(event) => this.eingabeEingeben(event)} />
              {(!this.loesungAnzeigen  && !this.vorherigesloesungAnzeigen)?"":(this.loesungAnzeigen?this.abfrageListe[0].antwort:""+this.vorherigesloesungAnzeigen?this.eingabeDavor:"")}</p>
            </form>
          </div>
          </p>
        </div>
      )
    } else {
      // Abfrage beendet
      this.vorlesen("Du hast alle Lernwörter " + this.zielWert + " mal richtig gehabt. Super!", false);
      return (
        <div class='app-home'>
        <header>
          <h1>Lernwort Quiz</h1>
        </header>
          <div>
            <p class="richtig">
              Geschafft!
            </p>
          </div>
        </div>
      )
    }
  }
}