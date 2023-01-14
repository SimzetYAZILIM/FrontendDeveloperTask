document.querySelector('#allList').firstElementChild.classList.add("active");

		let checklistHeight=document.querySelector('.checkList').offsetHeight;
		let offset=-50;
		
		window.addEventListener("scroll", () => {
			if (window.scrollY >= checklistHeight+offset) {
				let nextElement=document.querySelector(".active").nextElementSibling;
				document.querySelector(".active").classList.remove("active");
				nextElement.classList.add("active");
				offset+=checklistHeight;
			}
			if(window.scrollY < offset-checklistHeight+60){
				let beforeElement=document.querySelector(".active").previousElementSibling;
				document.querySelector(".active").classList.remove("active");
				beforeElement.classList.add("active");
				offset-=checklistHeight;
			} 
		});

		let menuClickControl = true;
		let navBar=document.querySelector(".navBar")
		let checkList=document.querySelectorAll(".checkList");
		let navBarWidth;
		let iconLeftValue;
		function menuClick(e){
			
			iconLeftValue = parseFloat(e.style.left);
			if(menuClickControl){
				navBar.style.display="block";
				navBarWidth = navBar.getBoundingClientRect().width;
				console.log(navBarWidth);
				for(let list of checkList){
					
					list.style.left=navBarWidth+50;
					list.style.margin="20 0 0 0 ";
				}
				e.style.left=e.offsetWidth+navBarWidth;
				menuClickControl = false;
			}else{
				navBar.style.display="none";
				for(let list of checkList){
					list.style.left="0";
					list.style.margin="auto";
				}
				e.style.left=parseFloat(e.style.left)-navBarWidth;
				menuClickControl = true;
			}
			
			
		}

		function onClickAddList(e){
			e.placeholder='Liste Ad Giriniz...';
			document.getElementById('checkIcon').style.display="block";
		}

		function onClickCheck(e){
			let addListInput = document.querySelector('.addListInput');
			let element=createNewList(addListInput.value, addListInput.value);
			element.style.left=navBarWidth+20;
			document.getElementById('main').appendChild(element);
			let addNewList=document.querySelector('.addNewList');
			addNewList.insertAdjacentHTML("beforebegin", `<li onclick="clickMenuItem(this)" class=""><a href="#${addListInput.value}">${addListInput.value}</a></li>`);
			addListInput.value = '';
			document.getElementById('checkIcon').src="assets/check-icon-inactive.png";
			document.querySelector(".addListInput").placeholder='Yeni Liste';
		}
	
		
		function clickMenuItem(e){
			
			document.querySelector(".active").classList.remove("active");
			e.classList.add("active");
			let allList=document.getElementById("allList").children;
			for(let i=0; i<allList.length-1; i++){
				if(allList[i]==document.querySelector(".active")){
					offset=8+checklistHeight*0.02 + i *checklistHeight; 
				}
			}
			if(!menuClickControl){
				navBar.style.display="none";
			}
			
			for(let list of checkList){
					list.style.left="0";
					list.style.margin="auto";
				}
				document.querySelector('.menuIcon').style.left=parseFloat(document.querySelector('.menuIcon').style.left)-navBarWidth;
				menuClickControl = true;
						
		}

		document.querySelector('.addListInput').addEventListener('keyup', updateValue);
		function updateValue(e) {
			if(e.target.value!=""){
				document.getElementById('checkIcon').src="assets/check-icon.png";
			}
			else{
				document.getElementById('checkIcon').src="assets/check-icon-inactive.png";
			}
		}

	
		let count=0;	
		function addTask(e){
			e.closest('.headerElement').closest('.checkList').insertAdjacentHTML('beforeend', `
			<div class="all-row">
				<div class="task-row">
					<input id="checkTask${count}" type="checkbox" style="display:none">
					<label id="labelId${count}" for="checkTask${count}" style="display:none"></label>
					<input id="taskName${count}" class="addTask" type="text" placeholder="Yazınız...">
				</div>
				<img onclick="deleteTask(this)" style=" cursor:pointer" src="assets/delete-icon.png" width="18px" height="18px">
			</div>
			<hr>
			`);
			
			let textId="#taskName"+count;
			let checkBoxId="checkTask"+count;
			let labelId="labelId"+count;
			document.querySelector(textId).addEventListener("keyup", () => {
			document.getElementById(checkBoxId).style.display="block";
			document.getElementById(labelId).style.display="block";
			document.querySelector(textId).style.padding=0;
			if(document.querySelector(textId).value==""){
				document.getElementById(checkBoxId).style.display="none";
				document.getElementById(labelId).style.display="none";
			}
		});
		count++;
		}
		function deleteTask(e){
			e.parentElement.nextElementSibling.remove();
			e.parentElement.remove();
		}
		function printPage(e){
			var printContents1 = e.closest(".headerElement")
			var printContents = e.closest(".headerElement").closest(".checkList");
			console.log(printContents);
			printContents.classList.remove("noPrint");
			printContents1.style.position="static";
			window.print();
			printContents.classList.add("noPrint");
			printContents1.style.position="sticky";
		}