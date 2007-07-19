<vexi>
    <ui:box>
        
        thisbox.teams = function()
        {
            var ret = [];
            for (var i=0; defs.length>i; i++)
                ret[i] = defs[i].name;
            return ret;
        }
        
    </ui:box>
    
    static.definitions =
    [
        {
            name: "Arsenal",
            nick: "Gunners",
            manager: { firstname: "Arsene", surname: "Wenger", skill: 9, traits: [] },
            players:
            [
                { firstname: "Jens", surname: "Lehman", age: 38, positions: ["G"] },
                { firstname: "Emmanuel", surname: "Eboue", age: 22, positions: ["RB"] },
                { firstname: "Justin", surname: "Hoyte", age: 20, positions: ["RB"] },
                { firstname: "Gael", surname: "Clichy", age: 21, positions: ["LB"] },
                { firstname: "Sini", surname: "Traore", age: 18, positions: ["LB"] },
                { firstname: "Kolo", surname: "Toure", age: 24, positions: ["CD"] },
                { firstname: "Philip", surname: "Senderos", age: 23, positions: ["CD"] },
                { firstname: "Cesc", surname: "Fabregas", age: 19, positions: ["M"] },
                { firstname: "Abou", surname: "Dialby", age: 19, positions: ["M"] },
                { firstname: "Thierry", surname: "Henry", age: 29, positions: ["F"] },
                { firstname: "Robin", surname: "Van Persie", age: 23, positions: ["F"] },
            ]
        },
        {
            name: "Aston Villa",
            nick: "the Villans"
        },
        {
            name: "Blackburn Rovers",
            nick: "Rovers"
        },
        {
            name: "Bolton Wanderers",
            nick: "Wanders"
        },
        {
            name: "Charlton Athletic",
            nick: "Blah"
        },
        {
            name: "Chelsea",
            nick: "the Blues"
        },
        {
            name: "Everton",
            nick: "the Toffees"
        },
        {
            name: "Liverpool",
            nick: "LFC"
        },
        {
            name: "Manchester United",
            nick: "the Red Devils"
        },
        {
            name: "Sheffield United",
            nick: "the Blades"
        },
        {
            name: "Tottenham Hotspur",
            nick: "Spurs"
        },
        {
            name: "Watford",
            nick: "the Hornets"
        },
        {
            name: "West Ham",
            nick: "the Hammers",
        }
    ];
    
</vexi>