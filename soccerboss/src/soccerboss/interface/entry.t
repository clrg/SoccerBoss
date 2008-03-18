<vexi xmlns:ui="vexi://ui" xmlns:layout="vexi.layout" xmlns="org.vexi.lib">
    <role.focusable />
    <widget.textfield />
    <layout:border layout="place">
        <layout:pad id="inset" padding="3">
            <text.default id="edit" align="left" fontsize="16" textcolor="white" vshrink="true" />
        </layout:pad>
        
        thisbox.th_cursor   = $edit.th_cursor;
        thisbox.th_edit     = $edit;
        thisbox.th_view     = $edit;
        thisbox.th_viewport = thisbox;
        
        $inset.height ++= function(v) { minheight = v; }
        
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
        
    </layout:border>
</vexi>