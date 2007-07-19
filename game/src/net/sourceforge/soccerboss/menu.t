<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <ui:box cols="1" maxwidth="640" maxheight="480">
        <ui:box packed="false" shrink="true" text="Loading..." textcolor="white" />
        <ui:box packed="false" fill=".image.match1" />
        <ui:box align="top" fill=".image.logo_white" packed="false" shrink="true" y="40" />
        <wi:border border="yellow" cols="1" depth="1" fill="#88000000" padding="20" shrink="true">
            <widget.link id="game" text="New Game" />
            <ui:box height="20" />
            <widget.link id="load" text="Load Saved Game" />
            <ui:box height="20" />
            <widget.link id="quit" text="Quit" />
        </wi:border>
        
        $game.action ++= function(v) { surface.Game(); }
        $load.action ++= function(v) { surface.Load(); }
        $quit.action ++= function(v) { surface.Close = true; }
        
    </ui:box>
</vexi>