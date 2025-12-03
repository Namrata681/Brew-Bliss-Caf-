document.addEventListener("DOMContentLoaded", () => {

  /* --------------------- SEARCH --------------------- */
  const searchBox = document.querySelector(".search-container");
  const searchIcon = document.getElementById("searchIcon");

  searchIcon.addEventListener("click", () => {
    searchBox.classList.toggle("search-open");
  });


  /* --------------------- MOBILE MENU --------------------- */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.style.display =
      mobileMenu.style.display === "flex" ? "none" : "flex";
  });


  /* --------------------- LOGIN MODAL --------------------- */
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const closeLogin = document.getElementById("closeLogin");

  loginBtn.addEventListener("click", () => {
    loginModal.style.display = "flex";
  });

  closeLogin.addEventListener("click", () => {
    loginModal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === loginModal) loginModal.style.display = "none";
  });


  /* --------------------- REMEMBER ME (LOCAL STORAGE) --------------------- */
  const savedEmail = localStorage.getItem("rememberedEmail");
  if (savedEmail) {
    document.querySelector("#loginModal input[type='text']").value = savedEmail;
    document.getElementById("rememberMe").checked = true;
  }

  document.querySelector(".login-submit").addEventListener("click", () => {
    const emailInput = document.querySelector("#loginModal input[type='text']");
    const remember = document.getElementById("rememberMe").checked;

    if (remember) {
      localStorage.setItem("rememberedEmail", emailInput.value);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  });


  /* --------------------- CART (LOCAL STORAGE) --------------------- */
  let cart = JSON.parse(localStorage.getItem("cafeCart")) || [];

  function saveCart() {
    localStorage.setItem("cafeCart", JSON.stringify(cart));
  }

  const cartBtn = document.getElementById("cartBtn");
  const cartModal = document.getElementById("cartModal");
  const closeCart = document.getElementById("closeCart");
  const cartList = document.getElementById("cartList");
  const cartTotal = document.getElementById("cartTotal");

  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.push({
        name: btn.dataset.name,
        price: Number(btn.dataset.price)
      });
      saveCart();
      alert("Added to cart!");
    });
  });

  cartBtn.addEventListener("click", () => {
    cartModal.style.display = "flex";

    cartList.innerHTML = cart
      .map(item => `<li>${item.name} - $${item.price}</li>`)
      .join("");

    const total = cart.reduce((a, b) => a + b.price, 0);
    cartTotal.innerHTML = cart.length
      ? `Total: $${total.toFixed(2)}`
      : "Your cart is empty";
  });

  closeCart.addEventListener("click", () =>
    cartModal.style.display = "none"
  );


  /* --------------------- SESSION STORAGE OFFER --------------------- */
  const offerBanner = document.getElementById("offerBanner");
  const closeOffer = document.getElementById("closeOffer");

  if (!sessionStorage.getItem("offerShown")) {
    offerBanner.style.display = "block";
  }

  closeOffer.addEventListener("click", () => {
    offerBanner.style.display = "none";
    sessionStorage.setItem("offerShown", "yes");
  });


  /* --------------------- SLIDESHOW --------------------- */
  let slideIndex = 0;
  const slides = document.getElementsByClassName("fade");

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3500);
  }

  showSlides();

});
