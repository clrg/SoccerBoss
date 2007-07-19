<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <ui:box cols="1" maxwidth="640" maxheight="480">
        <ui:box packed="false" fill=".image.offseason1" />
        <ui:box align="top" fill=".image.logo_black" packed="false" shrink="true" y="40" />
        <wi:border border="yellow" cols="1" depth="1" fill="#88000000" padding="20" shrink="true">
            <widget.label text="Nothing here yet!" />
            <ui:box height="20" />
            <widget.link id="back" text="Go Back" />
        </wi:border>
        
        $back.action ++= function(v) { surface.Menu(); }
        
    </ui:box>
</vexi>