<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:db="vexi.dj" xmlns="soccerboss.interface">
    <paper title="Personel Application Form">
        <line id="fname" text="Forename" />
        <line id="sname" text="Surname" />
        <line id="nname" text="Nickname" />
        <select id="done" text="Complete" />
        
        $done.action ++= function(v) {
            var profile = { forename:$fname.text, surname:$sname.text, nickname:$nname.text };
            /*
            db.create("profiles", profile);
            surface.load("newgame", profile);
            thisbox = null;
            */
            return;
        }
        
    </paper>
</vexi>
