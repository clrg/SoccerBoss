<vexi xmlns:ui="vexi://ui">
    <org.vexi.lib.role.clickable />
    <ui:box fontsize="16" textcolor="yellow" shrink="true">
        active ++= function(v) { textcolor = "orange"; }
        hover  ++= function(v) { textcolor = "red"; }
        normal ++= function(v) { textcolor = "yellow"; }
    </ui:box>
</vexi>