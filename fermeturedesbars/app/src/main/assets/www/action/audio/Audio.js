var Audio = function()
{
  this.chanson;
  this.rammaserBiere;
  this.voiture;
  this.vomi;
  this.heurterVoiture;
  this.heurterCone;
    function initialiser()
    {
            this.chanson = new Howl({
            src: ['action/audio/sons/bensound-badass.mp3'],
            volume : 0.3,
            loop: true
          });
          this.rammaserBiere = new Howl({
              src:['action/audio/sons/BoireBierre.mp3'],
              volume: 0.3,
              loop: false
          });
          this.vomi = new Howl({
              src: ['action/audio/sons/Vomi.mp3'],
              volume: 0.3,
              loop: false
          });
          this.heurterVoiture = new Holw({
              src: ['action/audio/sons/HeurterVoiture.mp3'],
              volume: 0.3,
              loop: false
          });
          this.voiture = new Holw({
            src: ['action/audio/sons/Voiture.mp3'],
            volume: 0.3,
            loop: false
        });
        this.heurterCone = new Holw({
            src: ['action/audio/sons/HeurterCone.mp3'],
            volume: 0.3,
            loop: false
        });


    }


    initialiser();
}
