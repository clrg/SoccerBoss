<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.interface"
    xmlns:db="vexi.dj" xmlns:wi="vexi.widget">
    <paper cols="2" title="Personnel Application Form">
        <papertext colspan="2" text="Please fill in your personal details and sign below." />
        <paperlabel text="Forename" />
        <paperentry id="fname" />
        <paperlabel text="Surname" />
        <paperentry id="sname" />
        <paperlabel text="Starting Age" />
        <ui:box id="age" align="left" shrink="true">
            <ui:box width="20" />
            <paperage agevalue="30" />
            <paperage agevalue="35" />
            <paperage agevalue="40" />
            <paperage agevalue="45" />
            <paperage agevalue="50" />
        </ui:box>
        <paperlabel text="Experience Bonus" />
        <ui:box>
            <ui:box width="20" />
            <papertext id="skillpoints" text="" />
        </ui:box>
        <paperlabel text="Expected Career" />
        <ui:box>
            <ui:box width="20" />
            <papertext id="retireafter" text="" />
        </ui:box>
        <ui:box shrink="true" />
        <ui:box />
        <ui:box shrink="true" />
        <papersignature id="done" />
        
        thisbox.agebox ++= function(v) {
            if (agebox) agebox.selected = false;
            cascade = v;
            agebox.selected = true;
            $retireafter.text = (65 - agebox.agevalue)+ " years";
            $skillpoints.text = (20+5*(agebox.agevalue-30)*5)+ " skill points";
        }
        
        agebox = $age[2];
        
        var agePress = function(v) { agebox = trapee; return; }
        
        for (var i=1; $age.numchildren>i; i++) {
            $age[i].Press1 ++= agePress;
        }
        
        $done.Press1 ++= function(v) {
            var profile = { forename:$fname.text, surname:$sname.text, age:agebox.agevalue };
            /*
            db.create("profiles", profile);
            surface.load("newgame", profile);
            thisbox = null;
            */
            return;
        }
        
    </paper>
</vexi>
