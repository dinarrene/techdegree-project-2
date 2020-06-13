/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing




let studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;
const studentNames = document.querySelectorAll('li h3');

/*** 
   showPage function uses itemsPerPage variable to display designated amount of records per page
***/

function showPage(list, page) {
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage - 1;

   for(let i = 0; i < list.length; i++){
      list[i].style.display = 'none';
      if(i >= startIndex && i <= endIndex){
         list[i].style.display = 'list-item';
      }
   }  
}

/*** 
   appendPageLinks function generates and appends pagination buttons. also adds class to links for css and functionality
***/

function appendPageLinks(list) {
      const numberOfPagesNeed = Math.ceil(list.length / itemsPerPage);

      let parentDiv = document.getElementsByClassName('page')[0];
      let div = document.createElement('div');
      div.setAttribute('class', 'pagination')
      parentDiv.appendChild(div);
      let ul = document.createElement('ul');
      div.appendChild(ul);

      for(let i = 1; i <= numberOfPagesNeed; i++){
      let li = document.createElement('li');
      ul.appendChild(li); 
      
      let a = document.createElement('a');
      li.appendChild(a);
      ul.childNodes[0].childNodes[0].setAttribute('class', 'active');
      a.setAttribute('href', "#")
      a.textContent = i; 
      a.addEventListener('click', (e) => {
         let pageValue; 
         pageValue = a.textContent; 
         showPage(list, pageValue); 
      });

      ul.addEventListener('click', (e) => {
         let activeLink = document.querySelector('.active')
         if(activeLink){
         activeLink.removeAttribute('class')
         }
         let a = event.target;
         a.setAttribute('class', 'active');
      });
    }
   }

/*** 
   searchField function creates search input and button used to search records
***/

function searchField(){
   let headerDiv = document.getElementsByClassName('page-header')[0];
   let searchDiv = document.createElement('div');
   headerDiv.appendChild(searchDiv);
   searchDiv.setAttribute('class', 'student-search');
   let input = document.createElement('input');
   searchDiv.appendChild(input);
   input.setAttribute('placeholder', 'Search for students...');
   let button = document.createElement('button');
   searchDiv.appendChild(button);
   button.textContent = 'Search';
}

searchField();

const search = document.querySelector('input');
const submit = document.querySelector('button');

/*** 
   searchFunc shows list results matching input query, or prints "no match" message if no records match
***/

function searchFunc(searchInput, searchList, displayList) { 
   let searchResults = [];
   let pageNum;   
   for(let i = 0; i < searchList.length; i++) {
      displayList[i].style.display = 'none';
      if(searchList[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
         displayList[i].style.display = 'list-item';
         searchResults.push(displayList[i])  
      } 
      if(searchInput.value.length == 0){
         pageNum = parseInt(document.querySelector('.active').textContent); 
         showPage(studentList, pageNum);     
      }  
   } 
   if(searchResults.length === 0){
      let parentDiv = document.getElementsByClassName('page')[0];
      let div = document.createElement('div');
      parentDiv.appendChild(div);
      div.textContent = "We couldn't find any records that match your search.";
   }

   appendPageLinks(searchResults);
   console.log(searchResults);
}

submit.addEventListener('click', (e) =>{
   e.preventDefault();
   searchFunc(search, studentNames, studentList);
});

search.addEventListener('keyup', () => {
   searchFunc(search, studentNames, studentList);
});

showPage(studentList, 1);
appendPageLinks(studentList);

