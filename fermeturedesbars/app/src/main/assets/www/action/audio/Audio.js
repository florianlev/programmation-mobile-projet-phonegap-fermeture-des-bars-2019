var Audio = function()
{
    this.chanson = chanson;
    this.rammaserBiere = rammaserBiere;
    this.voiture = voiture;
    this.vomi = vomi;
    this.heurterVoiture = heurterVoiture;
    this.heurterCone = heurterCone;
    initialiser()
    {
            chanson = new Howl({
            src: ['action/audio/sons/bensound-badass.mp3'],
            volume : 0.3,
            loop: true
          });
          rammaserBiere = new Howl({
              src:['action/audio/sons/BoireBierre.mp3'],
              volume: 0.3,
              loop: false
          });
          vomi = new Howl({
              src: ['action/audio/sons/Vomi.mp3'],
              volume: 0.3,
              loop: false 
          });
          heurterVoiture = new Holw({
              src: ['action/audio/sons/HeurterVoiture.mp3'],
              volume: 0.3,
              loop: false
          });
          voiture = new Holw({
            src: ['action/audio/sons/Voiture.mp3'],
            volume: 0.3,
            loop: false
        });
        heurterCone = new Holw({
            src: ['action/audio/sons/HeurterCone.mp3'],
            volume: 0.3,
            loop: false
        });


    }


    initialiser();
}