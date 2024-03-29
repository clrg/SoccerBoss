<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:lay="vexi.layout" xmlns="soccerboss.ui.paper">
    <ui:box redirect=":$content" align="topleft" layout="layer">
        <lay:margin margin="50 0 0 50">
            <ui:box width="1" fill="#888888" />
            <ui:box align="topleft" layout="layer">
                <ui:box orient="vertical">
                    <ui:box height="40" fill="white" layout="place">
                        <ui:box align="left" width="800">
                            <ui:box id="title" fontsize="14" textcolor="#ff7171" />
                        </ui:box>
                    </ui:box>
                    <ui:box fill=":.image.paper_line" tile="true">
                        <ui:box width="120" hshrink="true" />
                        <ui:box orient="vertical">
                            <ui:box height="1" />
                            <lay:grid id="content" cols="1" vshrink="true" />
                            <ui:box /> 
                        </ui:box>
                    </ui:box>
                </ui:box>
                <ui:box fill="#7171ff" width="2" x="100" />
                <ui:box height="1" fill="#888888" />
            </ui:box>
        </lay:margin>
        <ui:box fill=":.image.pencil_black" shrink="true" x="20" y="20" />
        
        $content.Children ++= function(v) {
            cascade = v;
            if (v) v.height = 30 * (v.rowspan ? v.rowspan : 1);
        }
        
        thisbox.cols ++= function(v) { $content.cols = v; return; }
        
        thisbox.title ++= function(v) {
            if (v) v = v.toUpperCase();
            $title.text = v;
            return;
        }
        
    </ui:box>
</vexi>
