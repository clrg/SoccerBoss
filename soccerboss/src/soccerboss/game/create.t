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
        <ageselect id="age" />
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
        <ui:box shrink="true" />
        <ui:box id="incomplete" align="left" display="false" shrink="true"
            fontsize="14" textcolor="#ff3333" text="Please complete all fields" />
        
        $age.value ++= function(v) {
            cascade = v;
            $retireafter.text = (65 - v)+ " years";
            $skillpoints.text = (20+5*(v-30)*5)+ " skill points";
        }
        
        // fire trap for initial value
        $age.value = $age.value;
        
        $done.Press1 ++= function(v) {
            var fname = $fname.text;
            var sname = $sname.text;
            if (fname == "" or sname == "") {
                $incomplete.display = true;
                return;
            }
            var profile = { forename:$fname.text, surname:$sname.text, age:$age.value };
            /*
            db.create("profiles", profile);
            surface.load("newgame", profile);
            thisbox = null;
            */
            return;
        }
        
    </sheet>
</vexi>
