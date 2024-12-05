"use strict";


// Game Play
document.getElementById('guess-button').addEventListener('click', () => {
  const userGuess = parseInt(document.getElementById('user-guess').value);
  const randomNumber = Math.floor(Math.random() * 10) + 1;
  const resultMessage = userGuess === randomNumber
    ? `You guessed ${userGuess}. Correct! Enter your email or phone number in the contact form to recieve your special offer.`
    : `You guessed ${userGuess}. The correct number was ${randomNumber}. Try again!`;
  document.getElementById('game-result').textContent = resultMessage;
});

// Contact Form Validation
document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const email = document.getElementById('email').value.trim();
  const comments = document.getElementById('comments').value.trim();
  const contactMethod = document.querySelector('input[name="contact-method"]:checked').value;

  const phoneRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!firstName || !lastName || !comments) {
    alert('Please fill out all required fields.');
    return;
  }

  if (contactMethod === 'phone' && (!phone || !phoneRegex.test(phone))) {
    alert('Please provide a valid 10-digit phone number.');
    return;
  }

  if (contactMethod === 'email' && (!email || !emailRegex.test(email))) {
    alert('Please provide a valid email address.');
    return;
  }

  const user = { firstName, lastName, phone, email, comments, contactMethod };
  document.getElementById('form-result').textContent = `Thank you, ${user.firstName} ${user.lastName}! We will contact you via ${user.contactMethod}.`;
});


// Get references to the theme toggle button and body
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;
const aboutSection = document.getElementById('about');
const productsSection = document.getElementById('products');
const gameSection = document.getElementById('game');
const formSection = document.querySelector('form');


if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode'); 
  aboutSection.classList.add('dark-section');
  productsSection.classList.add('dark-section');
  gameSection.classList.add('dark-section');
  formSection.classList.add('dark-section');
  themeToggleButton.textContent = '🔆'; 
}

// Toggle theme between light and dark
themeToggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');


  aboutSection.classList.toggle('dark-section');
  productsSection.classList.toggle('dark-section');
  gameSection.classList.toggle('dark-section');
  formSection.classList.toggle('dark-section');

  
  const darkMode = body.classList.contains('dark-mode');
  const inputs = document.querySelectorAll('form input, form textarea');
  inputs.forEach(input => {
    if (darkMode) {
      input.classList.add('dark-input');
    } else {
      input.classList.remove('dark-input');
    }
  });


  if (darkMode) {
    document.querySelectorAll('form input, form textarea').forEach(input => {
      input.style.backgroundColor = 'white';  
      input.style.color = '#333';          
    });
  } else {
    document.querySelectorAll('form input, form textarea').forEach(input => {
      input.style.backgroundColor = 'white'; 
      input.style.color = '#333';            
    });
  }

  // Update the theme preference in localStorage
  if (darkMode) {
    localStorage.setItem('theme', 'dark');
    themeToggleButton.textContent = '🔆'; 
  } else {
    localStorage.removeItem('theme');
    themeToggleButton.textContent = '🌙'; 
  }
});


const products = document.querySelectorAll('.product');
const productDetailSection = document.getElementById('product-detail');
const productDetailImage = document.getElementById('product-detail-image');
const productDetailTitle = document.getElementById('product-detail-title');
const productDetailShortDescription = document.getElementById('product-detail-short-description');
const productDetailLongDescription = document.getElementById('product-detail-long-description');

products.forEach(product => {
  product.addEventListener('click', () => {
    
    productDetailSection.style.display = 'block'; 

    // Get product information from the clicked product
    const title = product.querySelector('h3').textContent;
    const shortDescription = product.querySelector('p').textContent;
    const imageSrc = product.querySelector('img').src;

    
    productDetailTitle.textContent = title;
    productDetailShortDescription.textContent = shortDescription;
    productDetailImage.src = imageSrc;

    
    productDetailLongDescription.textContent = "At Marbliss, we work closely with our customers to bring their unique visions to life. From initial consultations to the final creation, we ensure that every detail aligns with your ideas. Pricing can vary based on factors such as design complexity, material choice, and size, and we provide transparent estimates tailored to your project. Contact us today for a design consultation and let us help you create a custom marble piece that perfectly fits your needs and budget.";


  });
});


const backToProducts = document.createElement('button');
backToProducts.textContent = 'Back to Products';
backToProducts.addEventListener('click', () => {
  productDetailSection.style.display = 'none';
  document.getElementById('products').style.display = 'flex';
});

