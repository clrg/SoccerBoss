<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.ui.paper"
    xmlns:role="org.vexi.lib.role">
    <role:focusable />
    <ui:box id="age" align="left" shrink="true">
        <ui:box width="20" />
        <age value="30" />
        <age value="35" />
        <age value="40" />
        <age value="45" />
        <age value="50" />
        
        thisbox.agebox ++= function(v) {
            if (agebox) agebox.selected = false;
            cascade = v;
            agebox.selected = true;
            value = agebox.value;
        }
        
        thisbox.focused ++= function(v) {
            cascade = v;
            for (var i=1; numchildren>i; i++)
                thisbox[i].focused = v;
        }
        
        thisbox.KeyPressed ++= function(v) {
            var i = thisbox.indexof(agebox);
            switch (v) {
            case "up":
            case "left":
                if (i>1) agebox = thisbox[i-1];
                break;
            case "down":
            case "right":
                if (numchildren>i+1) agebox = thisbox[i+1];
                break;
            }
            return;
        }
        
        var agePress = function(v) { agebox = trapee; return; }
        for (var i=1; numchildren>i; i++) thisbox[i].Press1 ++= agePress;
        
        agebox = thisbox[2];
        
    </ui:box>
</vexi>
