<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns="soccerboss">
    <ui:box orient="vertical">
        <ui:box orient="vertical" shrink="true">
            <ui:box fill=":.image.logo_black" shrink="true" />
            <ui:box height="50" />
            <interface.button id="newgame" text="New Game" />
            <!--interface.button id="endgame" text="End Game" /-->
        </ui:box>
        
        $newgame.action ++= function(v) { surface.load("start"); return; }
        
    </ui:box>
</vexi>
