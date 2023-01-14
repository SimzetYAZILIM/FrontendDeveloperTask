function createListElement(checklistId,value,elementText, check){
    let checklist= document.getElementById(checklistId);
    let checked= check? "checked" :"";
    checklist.insertAdjacentHTML('beforeend', `
    <div class="all-row">
        <div class="task-row">
            <input ${checked} id="dcheckTask${value}" type="checkbox" >
            <label id="dlabelId${value}" for="dcheckTask${value}" >${elementText}</label>
        </div>
        <img  onclick="deleteTask(this)" style=" cursor:pointer" src="assets/delete-icon.png" width="18px" height="18px">
    </div>
    <hr>
    `);
}
function createNewList(baslik,dbName){
    let listElement= document.createElement("check-list");
    let listClass = document.createAttribute("class");
    let listBaslik = document.createAttribute("baslik");
    let listdbName = document.createAttribute("list");
    let listPlaceholder = document.createAttribute("placeholder");
    let listId = document.createAttribute("id");
    listClass.value="checkList noPrint";
    listBaslik.value= baslik;
    listdbName.value=dbName;
    listPlaceholder.value="Yazınız...";
    listId.value = baslik;
    listElement.setAttributeNode(listClass);
    listElement.setAttributeNode(listBaslik);
    listElement.setAttributeNode(listdbName);
    listElement.setAttributeNode(listPlaceholder);
    listElement.setAttributeNode(listId);

    listElement.innerHTML= `<div class="headerElement">
                                <h4 style="width: 90%;">${baslik}</h4>
                                <img onclick="addTask(this)" style=" margin-top:14px; background: white; cursor:pointer" src="assets/add_icon.png" height="24" width="24">
                                <img onclick="printPage(this)" src="assets/print.png" style="margin-left:1vw; margin-top:14px; cursor:pointer"  height="24" width="24"></img>
                            </div>
                            `;
    return listElement;
    
}
function createNavElement(e){
    let addNewList=document.querySelector('.addNewList');
    addNewList.insertAdjacentHTML("beforebegin", `<li onclick="clickMenuItem(this)" class=""><a href="#${e}">${e}</a></li>`);
}
var keyNames = Object.keys(veritabani);
		let valueCount=0;
		keyNames.forEach(e => {
			createNavElement(e);
			document.getElementById('main').appendChild(createNewList(e, e));
			
			let obj= veritabani[e];
			var value = Object.values(obj);
			
			value.forEach(element => {
				
				createListElement(e,valueCount,element.veri,element.secim);
				valueCount++;
			});
		});

        