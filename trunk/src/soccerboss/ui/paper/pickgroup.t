<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:role="org.vexi.lib.role" xmlns="soccerboss.ui.paper">
    <role:focusable />
    <ui:box redirect=":$content" vshrink="true">
        <ui:box width="20" />
        <ui:box id="content" />
        <ui:box />
        
        thisbox.selected;
        
        thisbox.value ++= function(v) {
            cascade = v;
            if (!selected or v != selected.value) {
                for (var i=0; numchildren>i; i++) {
                    if (thisbox[i].value == v) {
                        selected = thisbox[i];
                        break;
                    }
                }
            }
        }
        
        var itemPress = function(v) { selected = trapee; return; }
        
        thisbox.values ++= function(v) {
            cascade = v;
            for (var i=0; v.length>i; i++) {
                var b = .pickitem(vexi.box);
                b.value = v[i];
                b.Press1 ++= itemPress;
                thisbox[i] = b;
            }
        }
        
        thisbox.focused ++= function(v) {
            cascade = v;
            if (selected) selected.focused = v;
        }
        
        thisbox.selected ++= function(v) {
            if (selected) {
                selected.focused = false;
                selected.selected = false;
            }
            cascade = v;
            if (selected) {
                selected.focused = focused;
                selected.selected = true;
                value = selected.value;
            }
        }
        
        thisbox.KeyPressed ++= function(v) {
            var i = thisbox.indexof(selected);
            switch (v) {
            case "up":
            case "left":
                if (i>0) selected = thisbox[i-1];
                break;
            case "down":
            case "right":
                if (numchildren>i+1) selected = thisbox[i+1];
                break;
            }
            return;
        }
        
    </ui:box>
</vexi>
