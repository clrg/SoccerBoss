<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui">
    <ui:box />
    
    static.createPlayer = function() {
        return {
            names:static.getRandomName(),
            age:16+vexi.math.ceil(vexi.math.random()*20),
            ability:vexi.math.ceil(vexi.math.random()*99),
            traits:{}
        };
    }
    
    var forenames = [
        "Adam", "Alan", "Alexander", "Alfred", "Alex",
        "Bailey", "Barry", "Ben", "Benjamin", "Brad", "Brian",
        "Charles", "Charlie", "Chris", "Craig",
        "Daniel", "Darrel", "Darren", "David",
        "Edmund", "Edward", "Eric",
        "Frank", "Freddy", "Fredrick",
        "Gary", "Gareth", "Gerry", "Geoff", "George", "Graham", "Grant",
        "Harry", "Henry", "Humphrey",
        "Ian", "Irvin",
        "Jack", "James", "Jim", "John", "Jordan",
        "Karl", "Kevin", "Kris",
        "Larry", "Luke",
        "Matthew", "Michael", "Mike", "Murray",
        "Nathan", "Nicholas", "Nick",
        "Oliver", "Ollie", "Oscar",
        "Paul", "Peter", "Philip",
        "Quentin",
        "Ray", "Raymond", "Rob", "Robert", "Robin",
        "Samuel", "Scott", "Simon", "Steven", "Stephen", "Stewart",
        "Thomas", "Toby", "Tom", "Tony", "Tyrell",
        "Victor",
        "Wayne", "William" ];
    
    var surnames = [
        "Anderson", "Archer", "Armstrong", "Ashall",
        "Ball", "Beckett", "Black", "Bower", "Brown", "Burgess",
        "Campbell", "Clarke", "Cole", "Cooper", "Crouch",
        "Daniels", "Davies", "Dawson", "Dew",
        "Edwards", "Elliot", "Evans",
        "Fletcher", "Flint", "Foster", "Fox",
        "Gardner", "Grant", "Green", "Goodwin",
        "Hall", "Harris", "Harrison", "Hughes", "Hunter",
        "Jackson", "Johnson", "Jones",
        "Lewis", "Long",
        "Marks", "Moore", "Morisson", "Morton",
        "Neville",
        "Owen", "Orville",
        "Potts", "Peterson",
        "Reid", "Roberts", "Robertson", "Robinson", "Rooney",
        "Simpson", "Smith", "Stanley", "Stewart", "Stone", "Strong", "Sturridge", "Sugar",
        "Taylor", "Thompson", "Torville", "Turnbull", "Tyson",
        "Upson",
        "Walker", "Watson", "White", "Wilde", "Williams", "Wilson", "Wright",
        "Young" ];
    
    // micro-optimization ;-)
    var fnlen = forenames.length;
    var snlen = surnames.length;
    
    static.getRandomName = function(player) {
        var n = [];
        var num = vexi.math.ceil(vexi.math.random() * 3);
        for (var i=0; num>i; i++)
            n[i] = forenames[vexi.math.ceil(vexi.math.random()*fnlen)];
        n[num] = surnames[vexi.math.ceil(vexi.math.random()*snlen)];
        return n;
    }
    
</vexi>