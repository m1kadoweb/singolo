const anchors = document.querySelectorAll('a[href*="#"]')
const portfolio_tabs = document.querySelectorAll('.portfolio-buttons button');
const section = document.querySelectorAll("body section");
const vertical_phone = document.querySelector(".iphone-vertical-bg");
const horizontal_phone = document.querySelector(".iphone-horizontal-bg");
const portfolio_imgs = document.querySelector(".portfolio-imgs");

//navigation
for (let anchor of anchors) {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        const blockID = anchor.getAttribute('href')
        document.querySelector('' + blockID).scrollIntoView({
            behavior: "smooth",
            block: "start"
        })        
    })  
}

var onClick = function (event) {
    event.preventDefault();
    
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].classList.remove('active');
    }
    
    event.currentTarget.classList.add('active');
  };
  
  for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', onClick, false);
  }


// scroll navigation
document.addEventListener("scroll", onScroll);
function onScroll(event) {
  const CURRENT_POSITION = window.scrollY;
  section.forEach(el => {
    if (
      el.offsetTop <= CURRENT_POSITION &&
      el.offsetTop + el.offsetHeight > CURRENT_POSITION
    ) {
      anchors.forEach(a => {
        a.classList.remove("active");
        if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
          a.classList.add("active");
        }
      });
    }
  });
}


//slider
var slideIndex = 1;
showSlides(slideIndex);
var background = document.getElementsByClassName('slider-section');
function plusSlide() {
    
    showSlides(slideIndex += 1);
    
    background[0].classList.toggle('slider-section-blue');
}

function minusSlide() {
    showSlides(slideIndex -= 1);  
    background[0].classList.toggle('slider-section-blue');
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slider-item");
    if (n > slides.length) {
      slideIndex = 1
      
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

// show / hide
vertical_phone.addEventListener("click", () => {
  vertical_phone.classList.toggle("screen-off");
});

horizontal_phone.addEventListener("click", () => {
  horizontal_phone.classList.toggle("screen-off");
});






//portfolio
var onClick = function (event) {
    event.preventDefault();
    shufflePics();
    for (var i = 0; i < portfolio_tabs.length; i++) {
        portfolio_tabs[i].classList.remove('active_tab');
    }
    
    event.currentTarget.classList.add('active_tab');
  };
  
  for (var i = 0; i < portfolio_tabs.length; i++) {
    portfolio_tabs[i].addEventListener('click', onClick, false);
  }


  const shufflePics = () => {
    let img = Array.from(document.querySelectorAll(".portfolio-imgs img"))
    let parent = document.querySelector(".portfolio-imgs")
  
    document.querySelectorAll(".portfolio-imgs img").forEach(e => e.remove())
    while (img.length) {
  
      parent.appendChild(img.splice(Math.floor(Math.random() * img.length), 1)[0])
    }
  };


  portfolio_imgs.addEventListener('click', (event) =>{
    if(event.target.tagName === 'IMG'){
      portfolio_imgs.querySelectorAll('img').forEach(el => {
            if(el === event.target) {
                console.log(el.classList.toggle('img_active'));
            }else{
                el.classList.remove('img_active');
            }
            
        });
    } 
})


//get

function validInput(inputElement, regex, hintElement, hintMessage){

  let inputText = inputElement.value;

  if(inputElement.hasAttribute('required') && inputText === ''){
      hintElement.innerText = 'Заполните поле';
      hintElement.classList.add('active');
      return false;
  }

  if(!regex.test(inputText)){
      hintElement.innerText = hintMessage;
      hintElement.classList.add('active');
      return false;
  }

  hintElement.classList.remove('active');
  return true;
}

function validTextarea(textarea, maxlength, hintElement){
  let textLength = textarea.value.toString().length;

  if(textLength > maxlength){
      hintElement.innerText = `Допустимо не более ${maxlength} символов`;
      hintElement.classList.add('active');
      return false;
  }

  hintElement.classList.remove('active');
  return true;
}

function fillModal(subject, description){

  if(subject === ''){
      subject = 'Without subject';
  }
  
  if(description === ''){
      description = 'Without description';
  }

  document.querySelector('#resalt_subject').innerText = subject;
  document.querySelector('#resalt_description').innerText = description;
}

function  cleanForm(form){
  form.reset();
}

document.querySelector('#button_send').addEventListener('click', function(event){

  event.preventDefault();

  let nameInput = document.querySelector('#name');
  let nameHint = document.querySelector('#name-hint')
  let emailInput = document.querySelector('#email');
  let emailHint = document.querySelector('#email-hint');
  let description = document.querySelector('#description');
  let descriptionHint = document.querySelector('#description-hint');

  if( validInput(nameInput, new RegExp(`[A-Za-z ]+`), nameHint, 'Поле должно содержать только буквы и пробелы') && 
      validInput(emailInput, new RegExp(`^(\\w+([\\.-]?\\w+)*@\\w+\\.[A-Za-z]+)$`), emailHint, 'Поле должно иметь формат template@gmail.com')&&
      validTextarea(description, 10000, descriptionHint)){

      let subject = document.querySelector('#subject').value.toString();
      let description = document.querySelector('#description').value.toString();


      fillModal(subject, description);
      cleanForm(document.querySelector('#quote-form'));
      
      document.querySelector('.modal').classList.add('active');
  }
})