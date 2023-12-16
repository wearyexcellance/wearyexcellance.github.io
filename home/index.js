function display_gamelist(gamename) {
    var gamediv = document.createElement("div");
    var gametext = document.createElement("h3");
    var gamebutton = document.createElement("button"); // Assuming you want to create a button
    var waflashbutton = document.createElement("button"); // Assuming you want to create a button
    var awayflbutton = document.createElement("button"); // Assuming you want to create a button
    var avm2jsbutton = document.createElement("button"); // Assuming you want to create a button
    var suffix = "?swf="+gamename

    gametext.textContent = gamename;
    
    gamebutton.setAttribute("onclick", "window.location.href='../RUFFLE" + suffix + "'");
    gamebutton.textContent = "Ruffle"; // Set the button text
    gamebutton.style.color = "white"; // Set the button text
    gamebutton.style.backgroundColor = "orange";

    
    waflashbutton.setAttribute("onclick", "window.location.href='"  + "../"+"WAFLASH"+ suffix + "'");
    waflashbutton.textContent = "Waflash"; // Set the button text
    waflashbutton.style.color = "white"; // Set the button text
    waflashbutton.style.backgroundColor = "gray";

    awayflbutton.setAttribute("onclick", "window.location.href='"  + "../"+"AWAYFL"+ suffix + "'");
    awayflbutton.textContent = "AwayFL"; // Set the button text
    awayflbutton.style.color = "white"; // Set the button text
    awayflbutton.style.backgroundColor = "red";

    
    avm2jsbutton.setAttribute("onclick", "window.location.href='"  + "../"+"AVM2JS"+suffix + "'");
    avm2jsbutton.textContent = "Avm2js"; // Set the button text
    avm2jsbutton.style.color = "white"; // Set the button text
    avm2jsbutton.style.backgroundColor = "purple";

    document.getElementById("gamelist").appendChild(gamediv);
    gamediv.appendChild(gametext);
    gamediv.appendChild(gamebutton);
    gamediv.appendChild(waflashbutton);
    gamediv.appendChild(awayflbutton);
    gamediv.appendChild(avm2jsbutton);
    
}
