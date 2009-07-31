<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:lay="vexi.layout" xmlns="org.vexi.lib">
    <role.focusable />
    <widget.textfield />
    <ui:box>
        <ui:box width="20" />
        <ui:box layout="layer">
            <text.default id="edit" align="left" fontsize="16" minwidth="50" vshrink="true" />
            <ui:box id="shadow" align="left" text="(empty)" textcolor="#888888" />
        </ui:box>
        
        thisbox.th_cursor   = $edit.th_cursor;
        thisbox.v_edit      = $edit.v_edit;
        thisbox.th_shadowtext = $shadow;
        thisbox.th_shadowwrap = $shadow;
        thisbox.th_view     = $edit;
        thisbox.th_viewport = thisbox;
        
        $edit.cursorcolor = "darkgray";
        $edit.highlightcolor = "black";
        $edit.highlightfill = "#BBBBBB";
        $edit.v_edit.fontsize = 16;
        
        thisbox.text ++= function(v) { $edit.text = v; return; }
        thisbox.text ++= function()  { return $edit.text; }
        
    </ui:box>
</vexi>