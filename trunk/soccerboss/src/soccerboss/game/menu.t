<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns="soccerboss">
    <ui:box orient="vertical">
        <ui:box orient="vertical" shrink="true">
            <ui:box fill=":.image.logo_black" shrink="true" />
            <ui:box height="50" />
            <interface.button id="newgame" text="New Game" />
            <interface.button id="profile" text="Profiles" />
        </ui:box>
        
        $newgame.action ++= function(v) { surface.load("start"); return; }
        $profile.action ++= function(v) { surface.load("profiles"); return; }
        
    </ui:box>
</vexi>
