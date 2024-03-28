var currentVersion = "Beta-1.1.0";

CheckForNewerVersion();

function CheckForNewerVersion() {
    var storedVersion = localStorage.getItem("currentVersion");
    var changeLogsApp = document.getElementById("shortcut_changelogs");
    if(storedVersion != currentVersion) {
        localStorage.setItem("currentVersion", currentVersion);
        var infoBadge = document.createElement("infoBadge");
        var badgeText = document.createElement("p")
        infoBadge.className = "infoBadge";
        infoBadge.id = "changelogs_badge"
        badgeText.innerText = "News"
        infoBadge.appendChild(badgeText);
        changeLogsApp.appendChild(infoBadge);
    }
}