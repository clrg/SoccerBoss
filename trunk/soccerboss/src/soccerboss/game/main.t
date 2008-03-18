<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns="soccerboss.game">
    <wi:surface />
    <ui:box framewidth="800" frameheight="600" titlebar="Soccer Boss 0.1dev">
        <wi:cardpane id="view">
            <menu id="menu" />
            <start id="start" />
            <!--team id="team" /-->
        </wi:cardpane>
        
        var views = { menu:$menu, start:$start, team:$team };
        
        surface.load = function(v, args) {
            var s = views[v];
            if (s == null) throw "unknown view '"+v+"'";
            $view.show = s;
            if (args) s.open(args);
        }
        
        vexi.ui.frame = thisbox;
        
    </ui:box>
</vexi>
