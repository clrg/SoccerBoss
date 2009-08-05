<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.ui.paper.image">
    <ui:box width="42" height="30" cursor="hand">
        <ui:box id="text" align="bottom" fontsize="16" shrink="true" textcolor="#888888" />
        
        thisbox.focused ++= function(v) {
            cascade = v;
            $text.textcolor = v ? "red" : selected ? "black" : "#888888";
        }
        
        thisbox.selected ++= function(v) {
            cascade = v;
            fill = v ? .circle : null;
            $text.textcolor = v ? (focused ? "red" : "black") : "#888888";
        }
        
        thisbox.value ++= function(v) { cascade = v; $text.text = v; }
        
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
