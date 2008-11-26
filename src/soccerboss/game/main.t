<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns:sb="soccerboss.game">
    <wi:surface />
    <ui:box framewidth="800" frameheight="600" titlebar="Soccer Boss 0.1dev">
        <wi:cardpane id="view">
            <sb:menu id="menu" />
        </wi:cardpane>
        
        var views = { menu:$menu, start:$start };
        
        surface.load = function(v, args) {
            var s = views[v];
            if (s == null) {
                s = sb[v](vexi.box);
                $view[$view.numchildren] = s;
            }
            if (args) s.open(args);
            $view.show = s;
        }
        
        vexi.ui.frame = thisbox;
        
    </ui:box>
</vexi>
