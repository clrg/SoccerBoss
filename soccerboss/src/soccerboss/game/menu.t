<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns="soccerboss">
    <ui:box orient="vertical">
        <ui:box orient="vertical" shrink="true">
            <ui:box fill=":.image.logo_black" shrink="true" />
            <ui:box height="50" />
            <interface.button id="hiscores" text="High Scores" />
            <interface.button id="startnew" text="New Career" />
            <interface.button id="contgame" text="Continue Game" />
            <interface.button id="dbeditor" text="Game Editor" />
        </ui:box>
        
        $startnew.action ++= function(v) { surface.load("create"); return; }
        $contgame.action ++= function(v) { surface.load("profiles"); return; }
        $dbeditor.action ++= function(v) { /*surface.load("profiles");*/ return; }
        
    </ui:box>
</vexi>
