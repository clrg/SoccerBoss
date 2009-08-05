<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns="soccerboss.ui.paper"
    xmlns:role="org.vexi.lib.role">
    <role:focusable />
    <ui:box align="left" cursor="hand" shrink="true">
        <ui:box id="text" fontsize="16" shrink="true" text="Signature" />
        <ui:box align="bottom" layout="layer" width="150">
            <ui:box id="underline" fill="#333333" height="2" />
            <ui:box id="active" display="false" fill=":.image.signature" shrink="true" />
        </ui:box>
        
        Enter ++= function(v) { $active.display = true; return; }
        Leave ++= function(v) { $active.display = false or focused; return; }
        
        focused ++= function(v) { cascade = v; $active.display = v; $underline.fill = v ? "red" : "#333333"; }
        text ++= function(v) { $text.text = v; return; }
        
    </ui:box>
</vexi>
