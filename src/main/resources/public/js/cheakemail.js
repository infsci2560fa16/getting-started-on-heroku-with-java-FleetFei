function check_email(email) {
	var xmlhttp;
	if(email.length === 0) {
		document.getElementById("instruction1").innerHTML = "";
		return;
	}
	if(window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {
			document.getElementById("instruction1").innerHTML = xmlhttp.responseText;
		}

	};

	xmlhttp.open("GET", "Checkemail?email=" + email, true);
	xmlhttp.send();

}