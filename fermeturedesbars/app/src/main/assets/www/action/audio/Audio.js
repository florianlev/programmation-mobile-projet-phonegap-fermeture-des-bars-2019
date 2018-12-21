var Audio = function()
{
  this.chanson = new Howl({
    src: ['action/audio/sons/bensound-badass.mp3'],
    volume : 0.3,
    loop: true,  
    });
  this.rammaserBiere = new Howl({
    src:['action/audio/sons/BoireBierre.mp3'],
    volume: 0.8
    });
  this.voiture = new Howl({
    src: ['action/audio/sons/Voiture.mp3'],
    volume: 0.3
    });
  this.vomi = new Howl({
    src: ['action/audio/sons/Vomi.mp3'],
    volume: 0.3   
    });
  this.heurterVoiture = new Howl({
    src: ['action/audio/sons/HeurterVoiture.mp3'],
    volume: 0.3
    });;
  this.heurterCone =  new Howl({
    src: ['action/audio/sons/HeurterCone.mp3'],
    volume: 0.3
    });

}
