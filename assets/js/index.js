window.addEventListener("DOMContentLoaded", main);

function main() {
    window.addEventListener("hashchange", onHashChange);

    // Change the page for the initial load
    let currentPage = location.hash.slice(1);
    showPage(currentPage);
    showDate();

    document.getElementById("mainPicture").addEventListener("mouseover", onMouseOver);
    document.getElementById("mainPicture").addEventListener("mouseout", onMouseOut);
    document.getElementById("myForm").addEventListener("submit", subscribe);

    let inputs = document.querySelectorAll('#myForm > input.formInput');
    inputs.forEach(function (input) {
        input.addEventListener("blur", onInputChange);
    });

    let articles = document.querySelectorAll(".article > img");
    articles.forEach(function (img) {
        img.addEventListener("click", displayOrHide);
    });

    document.getElementById("yourStory").addEventListener("submit", print);

    input.addEventListener("blur", onInputChange2);

    showSlides();
}

function onHashChange() {
    let page = location.hash.slice(1);
    showPage(page);
}

function showPage(page) {
    let homePage = document.getElementById("homePage");
    let galleryPage = document.getElementById("galleryPage");
    let interestingPage = document.getElementById("interestingPage");
    let historyPage = document.getElementById("historyPage");

    switch (page) {
        case "home":
            homePage.style.display = "block";
            galleryPage.style.display = "none";
            interestingPage.style.display = "none";
            historyPage.style.display = "none";
            break;
        case "gallery":
            homePage.style.display = "none";
            galleryPage.style.display = "block";
            interestingPage.style.display = "none";
            historyPage.style.display = "none";
            break;
        case "interesting":
            homePage.style.display = "none";
            galleryPage.style.display = "none";
            interestingPage.style.display = "block";
            historyPage.style.display = "none";
            break;
        case "history":
            homePage.style.display = "none";
            galleryPage.style.display = "none";
            interestingPage.style.display = "none";
            historyPage.style.display = "block";
            break;
        default:
            homePage.style.display = "block";
            galleryPage.style.display = "none";
            interestingPage.style.display = "none";
            historyPage.style.display = "none";
            break;
    }
}

function showDate() {
    let date = new Date();
    document.getElementById("date").innerHTML = date.toDateString();
}

function onMouseOver(e) {
    e.target.style.width = "600px";
}

function onMouseOut(e) {
    e.target.style.width = "500px";
}

function subscribe(e) {
    e.preventDefault();
    
    document.getElementById('fname').value = "";
    document.getElementById('email').value = "";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("inputMessage").innerText = "Успешно се подписа";
    
}

function validateData(data) {
    if (data.length > 4 && data.length < 25) {
        return true;
    }
    return false;
}

function onInputChange(ev) {
    let messageElement = document.getElementById("inputMessage");
    
    if (validateData(ev.target.value) === false) {
        messageElement.innerText = "Грешно име или имейл";
        document.getElementById("submitButton").style.display = "none";
    } else {
        document.getElementById("submitButton").style.display = "block";
        messageElement.innerText = "";
    }
}

function displayOrHide(e) {
    let text = e.target.nextElementSibling;
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function print(event) {
    event.preventDefault();
    let imageContainer = document.getElementById("imageContainer");
    let myDiv = createBlock("div");
    imageContainer.append(myDiv);

    let img = createImageElement(input.value);
    myDiv.append(img);

    let text = createElement("p", textarea.value);
    myDiv.append(text);
}

function createImageElement(url) {
    let img = document.createElement('img');
    img.src = url;
    return img;
}

function createElement(type, text = '') {
    let el = document.createElement(type);
    el.innerHTML = text;
    return el;
}

function createBlock(type) {
    let myDiv = document.createElement(type);
    return myDiv;
}


function validateUrl(url) {
    if (url.length > 6) {
        return true;
    }
    return false;
}

function onInputChange2(ev) {
    let messageElement = document.getElementById("errorMessage");

    if (validateUrl(ev.target.value) === false) {
        messageElement.innerText = "Грешен линк";
    } else {
        messageElement.innerText = "";
    }
}

let slideIndex = 0;
let slides,dots,timer;

function showSlides() {
    var i;
    slides = document.getElementsByClassName("mySlides");
    dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex> slides.length) {slideIndex = 1}    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    //put the timeout in the timer variable
    timer = setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function plusSlides(position) {
    //clear/stop the timer
    clearTimeout(timer);
    slideIndex +=position;
    if (slideIndex> slides.length) {slideIndex = 1}
    else if(slideIndex<1){slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
    //create a new timer
    timer = setTimeout(showSlides, 3000);
}

function currentSlide(index) {
    //clear/stop the timer
    clearTimeout(timer);
    if (index> slides.length) {index = 1}
    else if(index<1){index = slides.length}
    //set the slideIndex with the index of the function
    slideIndex = index;
    for (i = 0; i < slides.length; i++) {
       slides[i].style.display = "none";  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[index-1].style.display = "block";  
    dots[index-1].className += " active";
    //create a new timer
    timer = setTimeout(showSlides, 3000);
}
