// import { stat } from "original-fs";



$(document).on('click', '.edit', function(e) {
  $(this).parent().siblings('td.data').each(function() {
    var indexNum = e.target.parentElement.parentElement.sectionRowIndex;
    var content = fileList[indexNum].stationNumber;

    console.log(content);
    $(this).html('<input class="stationInput" value="' + content + '" />');
  });
  
  $(this).siblings('.save').show();
  $(this).siblings('.delete').hide();
  $(this).hide();
});

$(document).on('click', '.save', function(e) {
  console.log(e);
  var tableRowIndex = e.target.parentElement.parentElement.sectionRowIndex;
  var arrayIndex = tableRowIndex;
  var tableRow = $('.dataRow');
  var tableRowInput = $('#table > tr:nth-child(3) > td.data.stationNumber > input');
  var button = this;
  var station = $('.stationNumber');
  var stationInput = $('.stationInput');
  // console.log(tableRow);
  // console.log(tableRow[0]);
  // console.log($('.dataRow'));
  // console.log($('.dataRow')[0]);
  // console.log($('.stationInput'));
  console.log(tableRowIndex);
  console.log(arrayIndex);
  tableRow.each(function(i) {
  console.log(i);
    // console.log(this);
    // console.log(tableRowIndex);
    if (i === arrayIndex) {      
      // var arrayIndex = e.target.parentNode.childElementCount;
      console.log(this);
      // console.log(e);
      // var content = $(button).val();
      var stationNumber = stationInput["0"].value;
      var content = $(this).val();
      // console.log(content);
      $('input').each(function() {
        console.log(this);
        var content = $(this).val();
        $(this).html(content);
        $(this).contents().unwrap();
      });
      // $(button).html(stationInput);
      // $(button).contents().unwrap();
      fileList[i].stationNumber = stationNumber;
      
      console.log(fileList);
  }
});

  $(this).siblings('.edit').show();
  $(this).siblings('.delete').show();
  $(button).hide();
  // var station = $('.stationNumber');
  // var stationInput = $('.stationInput');
  // console.log(index);
  // console.log(stationInput);
  // console.log(stationInput["0"].value);
  // var content = stationInput[stationIndex].value;
  // stationInput[stationIndex].html(content);
  // stationInput[stationIndex].unwrap();
  
  // console.log(e);
  // console.log(this);
  // console.log(index);
  
  // console.log(station[index]);
  // console.log(station[index].innerHTML);
  // fileList[index].stationNumber = station[index].innerHTML.value;
  removeRunlistItem();
  // var newStationNumber = 
  // fileList[e].stationNumber = 
  
});

// click delete event //
$(document).on('click', '.delete', function() {
  console.log(this);
  console.log(this.childElementCount);
  // remove item from array via splice
  // var itemIndex = this.childElementCount;
  var index = this.childElementCount;
  if (index > -1) {
    fileList.splice(index, 1);
  }
  console.log(fileList);
  $(this).parents('tr').remove();
  console.log($(this));
  removeRunlistItem();
});



fileList = []
var fileDrag = document.getElementById("fileDrag");

let picker = document.getElementById('picker');
let listing = document.getElementById('textarea');
let runList = document.getElementById('input-fileName').value;





fileDrag.addEventListener("dragenter", (e) => {
	e.stopPropagation()
	e.preventDefault()

	fileDrag.classList.add("dragenter") 
}, false)

fileDrag.addEventListener("dragover", (e) => {
	e.stopPropagation()
	e.preventDefault()
}, false)

fileDrag.addEventListener("dragleave", (e) => {
	e.stopPropagation()
	e.preventDefault()

	fileDrag.classList.remove("dragenter")
}, false)


// drop event //
fileDrag.addEventListener("drop", (e) => {
  // console.log(e)
	e.stopPropagation()
	e.preventDefault()
	fileDrag.classList.remove("dragenter")

	let files = e.target.files || e.dataTransfer.files;
  
 
  for (let file of Array.from(files)) {
    let item = document.createElement('li');
    item.textContent = file.path;
    // console.log(file);
    // replace all forward slash with double back slash
    let b = item.textContent.replace(/\//g, '\\\\');
    file.path = b;
    console.log(b);
    file.stationNumber = fileList.length + 1;
    listing.innerHTML += "\n" + b + "     " + file.stationNumber;
    fileList.push(file);
    console.log(fileList);
  };
  
  handleFiles(files);
	
}, false)

// remove runlist item text and rebuild from fileList array //
function removeRunlistItem() {
  listing.innerHTML = "ArtPro Nested S&R Layout V1.0" + "\n";
  console.log(listing);
  for (let file of Array.from(fileList)) {
    let item = document.createElement('li');
    item.textContent = file.path;
    listing.innerHTML += "\n" + file.path + "     " + file.stationNumber;
  };
}

function handleFiles(files) {

	let list = document.getElementById("list")
	let imageType = /^image\//;
	let pdfType = 'pdf';
  
  for (let i=0; i<files.length; i++) {
    
    let file = files[i];
  
    let fileType = file.type;
    // console.log(file)

		let li = document.createElement("li")
		let thumbWrapper = document.createElement("div")
		
		// remove folders
		if (file.type == "") {
			alert("Bad File Type!");
		}
		// check if the file type is image
    // else if (imageType.test(file.type) || fileType.includes(pdfType)) { // used this for safari, can not utilize blob of PDF for preview, will use text
      else if (imageType.test(file.type)) {
			console.log(file.type);

		  img = document.createElement("img")
			img.file = file

			thumbWrapper.appendChild(img)

			// read image content
			let reader = new FileReader()
			reader.readAsDataURL(file)

			reader.onload = ((aImg) => {

				return (e) => {
					console.log(e);
					aImg.src = e.target.result
          // var uploadedImg = e.target.result;
				}

			})(img)
		}
		// other file types
		else {
			console.log(file.type);
			console.log(file);
			let divThumb = document.createElement("div")
			divThumb.classList.add("thumb-ext")
			divThumb.innerText = file.name.split('.').pop().toUpperCase();
			thumbWrapper.appendChild(divThumb)
		}

		thumbWrapper.classList.add("thumb-wrapper")
		li.appendChild(thumbWrapper)

		let divInfo = document.createElement("div")
		let divName = document.createElement("div")
		let divSize = document.createElement("div")
		let divLastModified = document.createElement("div")

		divName.innerText = file.name
		divSize.innerText = `Size: ${file.size} bytes`
		divLastModified.innerText = `Last modified date: ${file.lastModifiedDate}`

		divInfo.classList.add("file-info")
		divInfo.appendChild(divName)
		divInfo.appendChild(divSize)
		divInfo.appendChild(divLastModified)
		li.appendChild(divInfo)
    
    var val = Math.floor(1000 + Math.random() * 9000);
    

		// list.appendChild(li)
    
    document.getElementById('table').insertAdjacentHTML('beforeend', `
     <tr class="dataRow">
       <td id="imgFile ${val}" class="imgFile">

       </td>
       <td class="data stationNumber">${file.stationNumber}</td>
       <td class="actions">
         <button class="save">Save</button>
         <button class="edit">Edit</button>
         <button class="delete">Remove</button>
       </td>
    </tr>`);
        
    document.getElementById('imgFile ' + val).appendChild(li);

	};
}

$("button").click(function(){
	if($(this).hasClass("confirm")){
    $('.delete').click();
    alert("Files are cleared - Let's build a new runlist!");
		$(this).addClass("done");
		$("span").text("All Files Removed!");
	} else {
		$(this).addClass("confirm");
		$("span").text("Are you sure?");
	}
});

// Reset
$("button").on('mouseout', function(){
	if($(this).hasClass("confirm") || $(this).hasClass("done")){
		setTimeout(function(){
			$("button").removeClass("confirm").removeClass("done");
			$("span").text("Remove All Files and Reset?");
		}, 1000);
	}
});

$("#btn-save").click( function() {
  var text = $("#textarea").val();
  var filename = $("#input-fileName").val()
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  saveAs(blob, filename+".txt");
});