function randomiseName()
{
	var newName = "";
	var number = Math.floor((Math.random() * 99999) + 1);
	for (var i = 0; i != 2; i++) {
		newName = newName + phonetic(random_character());
	};
	document.getElementById('name').value = newName + number;
}

function phonetic(char)
    {
        var nato = {
            a:"alfa", 
            b:"bravo", 
            c:"charlie", 
            d:"delta", 
            e:"echo", 
            f:"foxtrot", 
            g:"golf", 
            h:"hotel", 
            i:"india", 
            j:"juliett", 
            k:"kilo", 
            l:"lima", 
            m:"mike", 
            n:"november", 
            o:"oscar", 
            p:"papa", 
            q:"quebec", 
            r:"romeo", 
            s:"sierra", 
            t:"tango", 
            u:"uniform", 
            v:"victor", 
            w:"whisky", 
            x:"x-ray", 
            y:"yankee", 
            z:"zulu", 
            };
 
        return nato[char];
    }

    function random_character()
    {
    var chars = "abcdefghijklmnopqurstuvwxyz";
    return chars.substr( Math.floor(Math.random() * 27), 1);
}

function checkChatID()
{
	var chatID = document.getElementById("chatID");
	if(chatID.value == "")
	{
		chatID.value = "chat" + Math.floor((Math.random() * 99999) + 1);
	}
}