function loginValidate()
{		
	var vname=document.loginform.username.value;
	var vpass=document.loginform.password.value;
	if(vname==""||vpass==""){
		showAlert("Please fill in all fields",'error');
		document.loginform.username.focus();
		return false;
	}
}

	var img1=new Image(50,50);
	img1.src="images/close_n.gif";		
	var img2=new Image(50,50);
	img2.src="images/close_h.gif";

function closeThis(){
	var e=document.getElementById("alert");
	e.innerHTML="";
	e.className="";
	e.style.height="0px"
}

function showAlert(message,type){
	var location=document.getElementById("alert");
	location.innerHTML='<table class="'+type+'"><tr><td width="50px"><img src="images/'+type+'.gif"></td><td style="padding:5px" valign="top">'+message+'</td><td valign="top" width="20px"><a href="javascript:closeThis()" class="close" ></a></td></tr></table>';
}

function showWindow(){
	window.open("appAgreement.php","","HEIGHT=500,WIDTH=600,menubar=no,scrollbars=yes,status=no,resizable=no");
}

function createRequestObject(){
			var request=false;
			if(window.XMLHttpRequest){
				request=new XMLHttpRequest();	
			}else if(window.ActiveXObject){
				request=new ActiveXObject("Microsoft.XMLHTTP");	
			}
			return request;
}


function FPassValidate(){
	for(var i=0;i<document.fpass.elements.length;i++){
		if(document.fpass.elements[i].value==""){
			showAlert("Please fill in all fields",'error');
			document.fpass.elements[i].focus();
			return false;
		}
	}
	if(!isValidEmail(document.fpass.email)){
		return false;
	}else{
		return true;
	}
}

function mappValidate(){		
	for(var i=0;i<document.mapp.elements.length;i++){
		var name=document.mapp.elements[i].name;
		if(document.mapp.elements[i].value=="" && name!="middlename" && name!="imgfile" && name!="availability"&& name!="currentemp" && name!="fexplain"){
			showAlert("Please fill in all fields",'error');
			return focusItem(document.mapp.elements[i]);
		}
	}	
	if(!isValidEmail(document.mapp.email)){
		return false;
	}
	if(document.mapp.zipcode.value.length<5){
		showAlert('Invalid Zipcode.','error');
		return focusItem(document.mapp.zipcode);
	}
	var tmp=parseInt(document.mapp.dd.value);
		if(tmp<1 || tmp>31 || tmp+""=="NaN"){
			showAlert("Invalid date",'error');
			return focusItem(document.mapp.dd);
		}
		tmp=parseInt(document.mapp.mm.value);
		if(tmp<1 || tmp>12 || tmp+""=="NaN"){
			showAlert("Invalid month",'error');
			return focusItem(document.mapp.mm);
		}
		tmp=parseInt(document.mapp.yyyy.value);
		if(tmp<1900 || tmp+""=="NaN" ||document.mapp.yyyy.value.length<4){
			showAlert("Invalid date",'error');
			return focusItem(document.mapp.yyyy);
		}
		if(!document.mapp.felony[0].checked && !document.mapp.felony[1].checked){
			showAlert("Please check in all fields",'error');
			return focusItem(document.mapp.felony[0]);
	}
	if(!document.mapp.legal[0].checked && !document.mapp.legal[1].checked){
		location.href="#alert";
			showAlert("Please check in all fields",'error');
			return false;
	}
	if(!document.mapp.employed[0].checked && !document.mapp.employed[1].checked){
		location.href="#alert";
			showAlert("Please check in all fields",'error');
			return false;
	}
	if(document.mapp.imgfile.value!=""){
		var fileTypes=["bmp","gif","png","jpg","jpeg"];
		var flag=false;
		var source=document.mapp.imgfile.value;
  		var ext=source.substring(source.lastIndexOf(".")+1,source.length).toLowerCase();
  		for (var i=0; i<fileTypes.length; i++){
			if (fileTypes[i]==ext){ 
				flag=true;
				break;
			}
		}
		if(!flag){
			location.href="#alert";
			showAlert("Select a valid image file eg:- "+fileTypes.join(","),"warning");	
			return false;
		}
	}
	if(!document.mapp.agree.checked){
		location.href="#alert";
		showAlert("You must agree with our tearms and conditions to proceed further","warning");
		return false;
	}
	return true;
}


function focusItem(element){
	location.href="#alert";
	element.focus();
	return false;
}

function isValidEmail(element)
{
	var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(!element.value.match(emailRegEx)){
		showAlert('Please enter a valid email address.','error');
		location.href="#alert";
		element.focus();
		return false;
	}else{
		return true;
	}
}

function registerValidate(){
	for(var i=0;i<document.registration.elements.length;i++){
		if(document.registration.elements[i].value==""){
			showAlert("Please fill in all fields",'error');
			return focusItem(document.registration.elements[i]);
		}
	}
	if(!isValidEmail(document.registration.email)){
		return false;
	}
	var p1=document.registration.pw;
	var p2=document.registration.cpw;
	if(p1.value!=p2.value){
		p1.value=p2.value="";
		showAlert("Password Mismatch...!!",'error');
		return focusItem(p1);
	}
	var len=document.registration.UN.value.length;
	if(len>15||len<5){
		showAlert("username must be 5 to 15 characters.",'warning');
		return focusItem(document.registration.UN);
	}
	if(p1.value.length<6){
		p1.value=p2.value="";
		showAlert("Password must be greater than 5 characters...!!",'warning');
		return focusItem(p1);
	}
	if(available==false)
	{
		p1.value=p2.value="";
		showAlert("Username '"+ document.registration.UN.value +"' is not available...!!", 'warning');
		return focusItem(document.registration.UN);
	}
}

var available=true;

function checkAvailability(name){
	var req=createRequestObject();
    if(req){
	    req.open('get', 'ajax.php?name='+name);
	    req.onreadystatechange = function(){
				if (req.readyState == 4) {
		        	if (req.status == 200 || req.status == 304) {
		        	    var resp=req.responseText;
						if(resp=="1"){
						   available=false;
						}else{
							available=true;
						}
					}
				}
		};
		req.send(null);
    }
}

function LoadGallery(pictureName,imageFile,titleCaption,captionText){
  var picture = document.getElementById(pictureName);
  if (picture.filters){
    picture.style.filter="blendTrans(duration=1)";
    picture.filters.blendTrans.Apply();
  }
  picture.src = imageFile;
  if (picture.filters){
    picture.filters.blendTrans.Play();
  }
  document.getElementById(titleCaption).innerHTML=captionText;
}


function sndReq(vote,id,model_id) {
	var theUL = document.getElementById('unit_ul'+id); // the UL
	var xmlhttp=createRequestObject();
        var img3=new Image(16,16);
	img3.src="images/working.gif";

	theUL.innerHTML = '<div class="loading"><img src="'+img3.src+'" /></div>';
    xmlhttp.open('get', 'ajaxVote.php?v='+vote+'&u='+id+'&m='+model_id);
    xmlhttp.onreadystatechange = function(){
    	if(xmlhttp.readyState == 4){
    		if (xmlhttp.status == 200){
    			var response = xmlhttp.responseText;
                        //alert(response);
    			var update = new Array();
    			if(response.indexOf('|') != -1) {
    				update = response.split('|');
    				changeText(update[0], update[1]);
    			}
    		}
        }
	};
    xmlhttp.send(null);	
}

//function handleResponse() {
//  if(xmlhttp.readyState == 4){
//		if (xmlhttp.status == 200){
//       	
//        var response = xmlhttp.responseText;
//        var update = new Array();
//
//        if(response.indexOf('|') != -1) {
//            update = response.split('|');
//            changeText(update[0], update[1]);
//        }
//		}
//    }
//}

function changeText( div2show, text ) {
    // Detect Browser
    var IE = (document.all) ? 1 : 0;
    var DOM = 0; 
    if (parseInt(navigator.appVersion) >=5) {DOM=1};

    // Grab the content from the requested "div" and show it in the "container"
    if (DOM) {
        var viewer = document.getElementById(div2show);
        viewer.innerHTML = text;
    }  else if(IE) {
        document.all[div2show].innerHTML = text;
    }
}




