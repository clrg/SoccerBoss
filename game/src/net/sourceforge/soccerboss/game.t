<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <ui:box cols="1" maxwidth="640" maxheight="480">
        <ui:box packed="false" fill=".image.stadium2" />
        <ui:box height="40" />
        <ui:box align="top" fill=".image.logo_black" shrink="true" />
        <wi:border border="yellow" cols="2" depth="1" fill="#88000000" margin="40 20 20 20" padding="20">
            <widget.label text="Manager Name: " />
            <widget.entry id="name" text="Charles Goodwin" />
            <ui:box colspan="2" height="20" />
            <widget.label text="Gender: " />
            <widget.entry id="gen" text="Male" />
            <ui:box colspan="2" height="20" />
            <widget.label text="Nationality: " />
            <widget.entry id="nat" text="English" />
            <ui:box colspan="2" height="20" />
            <widget.label text="Team: " />
            <widget.entry id="team" text="Arsenal"  />
            <ui:box colspan="2" height="20" />
            <ui:box colspan="2">
                <widget.link id="back" text="Go Back" />
                <widget.link id="start" text="Start Game" />
            </ui:box>
        </wi:border>
        
        $back.action ++= function(v) { surface.Menu(); }
        $start.action ++= function(v) { surface.Menu(); }
        
    </ui:box>
</vexi>