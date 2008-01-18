<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui">
    <ui:box />
    
    static.createPlayer = function() {
        return {
            names:static.getRandomName(),
            age:vexi.math.ceil(vexi.math.random()*15),
            ability:vexi.math.ceil(vexi.math.random()*99),
            traits:{}
        };
    }
    
    var forenames = [
        "Adam", "Alan", "Alexander", "Alfred",
        "Bailey", "Barry", "Ben", "Benjamin",
        "Charles", "Charlie", "Chris",
        "Darrel", "Daniel", "David",
        "Eric", "Edward",
        "Freddy", "Fredrick",
        "Gary", "Gerry", "Geoff", "George"
        "Harry", "Henry",
        "Jack", "James", "John", "Jordan",
        "Kevin",
        "Luke",
        "Matthew", "Michael", "Mike", "Murray",
        "Nathan",
        "Oliver", "Oscar",
        "Paul", "Peter",
        "Rob", "Robert", "Robin",
        "Samuel", "Scott", "Stewart",
        "Thomas", "Toby", "Tom", "Tony",
        "Wayne", "William" ];
    
    var surnames = [
        "Anderson", "Archer", "Armstrong",
        "Brown",
        "Campbell", "Clarke", "Cooper",
        "Davies",
        "Edwards", "Elliot", "Evans",
        "Fletcher", "Foster",
        "Gardner", "Grant", "Green",
        "Hall", "Harris", "Hughes", "Hunter",
        "Jackson", "Johnson", "Jones",
        "Lewis",
        "Moore", "Morisson",
        "Neville",
        "Owen",
        "Reid", "Roberts", "Robertson", "Robinson", "Rooney",
        "Smith", "Strong",
        "Taylor", "Thompson", "Turnbull",
        "Upson",
        "Walker", "Watson", "White", "Williams", "Wilson", "Wright",
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