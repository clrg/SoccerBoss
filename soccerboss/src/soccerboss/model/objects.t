<vexi>
    <ui:box>
        
        // avoid dupes
        var players = {};
        
        var firstnames = ["Alfie", "Brian", "Charlie", "David", "Eric", "Freddie", "Gary", "Harry",
                          "Ian", "John", "Kevin", "Larry", "Matthew", "Nathan", "Oscar", "Quentin",
                          "Peter", "Richard", "Simon", "Tim", "Victor", "William", "Alex", "Adrian",
                          "Barry", "Chris", "Daniel", "Edmund", "Frank", "Gareth", "Humphrey", "Philip",
                          "James", "Karl", "Neville", "Paul", "Raymond", "Stephen", "Wallace"];
                          
        var initials = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        
        var surnames = ["Ball", "Sugar", "Ashall", "James", "Smith", "Crouch", "Simpson",
                        "Harrison", "McDavid", "White", "Black", "Daniels", "Burgess",
                        "Flint", "Bower", "Stewart", "Dew", "Brown", "Beckett", "Marks",
                        "Folkes", "Stone", "Stanley", "Craig", "Morton", "Wilde", "Cole",
                        "Silver", "Blunt", "Sharpe", "Fable", "Potts", "Fox", "Adams"];
        
        thisbox.player = function(v)
        {
            var fi = vexi.math.round(vexi.math.random() * firstnames.length());
            var ii = vexi.math.round(vexi.math.random() * 26);
            var si = vexi.math.round(vexi.math.random() * surnames.length());
            
        }
        
        thisbox.team = f
        
    </ui:box>
</vexi>