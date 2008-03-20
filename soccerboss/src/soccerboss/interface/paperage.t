<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.image">
    <ui:box width="42" height="30" cursor="hand">
        <ui:box id="text" fontsize="16" textcolor="#888888" />
        
        thisbox.agevalue ++= function(v) { cascade = v; $text.text = v; }
        thisbox.selected ++= function(v) { cascade = v; fill = v ? .circle : null; }
        
        thisbox.Enter ++= function(v) {
            if (!selected) $text.textcolor = "red";
            return;
        }
        
        thisbox.Leave ++= function(v) {
            $text.textcolor = selected ? "black" : "#888888";
            return;
        }
        
    </ui:box>
</vexi>
