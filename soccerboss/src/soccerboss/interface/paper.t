<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:lay="vexi.layout" xmlns="soccerboss">
    <ui:box redirect=":$content" layout="layer">
        <lay:margin margin="50 0 0 50">
            <ui:box width="1" fill="#888888" />
            <ui:box layout="layer">
                <ui:box orient="vertical">
                    <ui:box height="40" fill="white">
                        <ui:box width="400" />
                        <ui:box id="title" align="left" fontsize="14" textcolor="#ff7171" />
                    </ui:box>
                    <ui:box fill=":.image.paper_line" tile="true">
                        <ui:box width="120" hshrink="true" />
                        <ui:box orient="vertical">
                            <ui:box height="1" />
                            <ui:box id="content" orient="vertical" vshrink="true" />
                            <ui:box /> 
                        </ui:box>
                    </ui:box>
                </ui:box>
                <ui:box fill="#7171ff" width="2" x="100" align="left" />
                <ui:box height="1" fill="#888888" align="top" />
            </ui:box>
        </lay:margin>
        <ui:box fill=":.image.pencil_black" shrink="true" align="topleft" x="20" y="20" />
        
        $content.Children ++= function(v) {
            cascade = v;
            if (v) v.height = 30;
        }
        
        thisbox.title ++= function(v) {
            if (v) v = v.toUpperCase();
            $title.text = v;
            return;
        }
        
    </ui:box>
</vexi>
