<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.ui.paper"
    xmlns:db="vexi.dj" xmlns:wi="vexi.widget">
    <sheet cols="2" title="Personnel Application Form">
        <text colspan="2" text="Please fill in your personal details and sign below." />
        <label text="Forename" />
        <entry id="fname" />
        <label text="Surname" />
        <entry id="sname" />
        <label text="Starting Age" />
        <ui:box id="age" align="left" shrink="true">
            <ui:box width="20" />
            <age agevalue="30" />
            <age agevalue="35" />
            <age agevalue="40" />
            <age agevalue="45" />
            <age agevalue="50" />
        </ui:box>
        <label text="Experience Bonus" />
        <ui:box>
            <ui:box width="20" />
            <text id="skillpoints" text="" />
        </ui:box>
        <label text="Expected Career" />
        <ui:box>
            <ui:box width="20" />
            <text id="retireafter" text="" />
        </ui:box>
        <ui:box shrink="true" />
        <ui:box />
        <ui:box shrink="true" />
        <signature id="done" />
        
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
        
    </sheet>
</vexi>
