<!-- Copyright 2008 GPLv3 - see COPYING for details -->

<vexi xmlns:ui="vexi://ui" xmlns:wi="vexi.widget" xmlns="soccerboss.interface">
    <paper title="Profile Manager">
        <line text="Select profile" />
        <select text="Create New" />
        
        visible ++= function(v) {
            cascade = v;
            while (thisbox[2]) thisbox[2] = null;
            //for (var i=0; profiles.length>i; i++) {
            //}
        }
        
    </paper>
</vexi>
