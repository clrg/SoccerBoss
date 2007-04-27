<vexi xmlns:ui="vexi://ui" xmlns="org.vexi.lib">
    <role.focusable />
    <widget.textfield />
    <img.border>
        <img.pad padding="3">
            <ui:box id="inset">
                <text.default id="edit" align="left" fontsize="16" packed="false" textcolor="white" vshrink="true" />
            </ui:box>
        </img.pad>
        
        thisbox.th_cursor   = $edit.th_cursor;
        thisbox.th_edit     = $edit;
        thisbox.th_view     = $edit;
        thisbox.th_viewport = thisbox;
        
        $edit.cursorcolor = "white";
        $edit.highlightcolor = "black";
        $edit.highlightfill = "yellow";
        
        thisbox.text ++= function(v) { $edit.text = v; }
        thisbox.text ++= function()  { return $edit.text; }
        
        thisbox.focused ++= function(v)
        {
            border = v ? "#bbbbbb" : null;
            fill = v ? "#444444" : null;
        }
        
    </img.border>
</vexi>