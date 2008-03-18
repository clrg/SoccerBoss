<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss">
    <ui:box align="left" cursor="hand" shrink="true">
        <ui:box width="40" height="20">
            <ui:box id="active" display="false" fill=":.image.tick" shrink="true" />
        </ui:box>
        <ui:box id="text" fontsize="16" />
        
        Enter ++= function(v) { $active.display = true; return; }
        Leave ++= function(v) { $active.display = false; return; }
        
        text ++= function(v) { $text.text = v; return; }
        
    </ui:box>
</vexi>
