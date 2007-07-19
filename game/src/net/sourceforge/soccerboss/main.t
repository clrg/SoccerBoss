<vexi xmlns="net.sourceforge.soccerboss" xmlns:ui="vexi://ui" xmlns:wi="vexi.widget">
    <wi:surface />
    <wi:cardpane cols="1" maxwidth="640" maxheight="480">
        <menu id="menu" />
        <game id="game" />
        <load id="load" />
        
        vexi.ui.frame = thisbox;
        
        surface.Game = function() { show = $game; }
        surface.Load = function() { show = $load; }
        surface.Menu = function() { show = $menu; }
        
    </wi:cardpane>
</vexi>