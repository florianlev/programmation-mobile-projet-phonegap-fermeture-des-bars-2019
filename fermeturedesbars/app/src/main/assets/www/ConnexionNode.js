function ConnexionNode(){
    function initialiser() {
        connexion = io.connect('http://158.69.113.110:2000');
    }

    initialiser();

}