<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <ui:box orient="vertical" fill=".image.stadium2" maxwidth="640" maxheight="480">
        <ui:box height="40" />
        <ui:box align="top" fill=".image.logo_black" shrink="true" />
        <wi:border border="yellow" orient="vertical" depth="1" fill="#88000000" margin="40 20 20 20" padding="20">
            <ui:box>
                <widget.label text="Manager Name: " />
                <widget.entry id="name" text="Charles Goodwin" />
            </ui:box>
            <ui:box height="20" shrink="true" />
            <ui:box>
                <widget.label text="Gender: " />
                <widget.entry id="gen" text="Male" />
            </ui:box>
            <ui:box height="20" shrink="true" />
            <ui:box>
                <widget.label text="Nationality: " />
                <widget.entry id="nat" text="English" />
            </ui:box>
            <ui:box height="20" shrink="true" />
            <ui:box>
                <widget.label text="Team: " />
                <widget.entry id="team" text="Arsenal"  />
            </ui:box>
            <ui:box height="20" shrink="true" />
            <ui:box>
                <widget.link id="back" text="Go Back" />
                <widget.link id="start" text="Start Game" />
            </ui:box>
        </wi:border>
        
        $back.action ++= function(v) { surface.Menu(); }
        $start.action ++= function(v) { surface.Menu(); }
        
    </ui:box>
</vexi>