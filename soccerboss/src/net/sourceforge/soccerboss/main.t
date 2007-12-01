<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <wi:surface />
    <ui:box>
        <wi:cardpane maxwidth="640" maxheight="480">
            <menu id="menu" />
            <game id="game" />
            <load id="load" />
        </wi:cardpane>
        
        vexi.ui.frame = thisbox;
        
        surface.Game = function() { show = $game; }
        surface.Load = function() { show = $load; }
        surface.Menu = function() { show = $menu; }
        
    </ui:box>
</vexi>