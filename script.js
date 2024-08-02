//      Lenis smooth scroll
const lenis = new Lenis()

/*
lenis.on('scroll', (e) => {
  console.log(e)
})
*/

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

//      Utils

const body = document.body;

function toggleScrolling() {
  if (body.style.overflow != "hidden") {
    body.style.height = "100vh";
    body.style.overflow = "hidden";
    lenis.stop();
  } else {
    body.style.height = "unset";
    body.style.overflow = "visible";
    lenis.start();
  }
}

function scrollToTop() {
  lenis.scrollTo(0);
}

//      Custom cursor

const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let lastFrame = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.pageX - 10;
  mouseY = e.pageY - 10;
  cursor.style.display = "inline-block";
});

function animate() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastFrame;
  lastFrame = currentTime;

  const speed = 0.1;
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';

  requestAnimationFrame(animate);
}

animate();

document.addEventListener('click', e => {
  cursor.classList.add("expand");
  setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

//      Menu

const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector("menu");
const menuBackground = document.querySelector(".menu-background");
const closeIcon = document.querySelector(".close-icon");
const canvas = document.querySelector(".canvas");

function openMenu() {
  menu.style.display = "block";
  menuIcon.style.display = "none";
  closeIcon.style.display = "flex";

  toggleScrolling()

  menuBackground.style.display = "block";
  canvas.classList.add("canvas-menu");
}

function closeMenu() {
  menu.style.display = "none";
  menuIcon.style.display = "flex";
  closeIcon.style.display = "none";

  toggleScrolling()

  menuBackground.style.display = "none";
  canvas.classList.remove("canvas-menu");
}

menuIcon.onclick = function() {
  openMenu();
}

closeIcon.onclick = function() {
  closeMenu();
}

const menuLine = document.getElementById("menu-line");
const menuFlex = document.getElementById("menu-flex");

function moveMenuLine(position) {
  menuLine.style.top = position * (menuFlex.clientHeight/menuFlex.childElementCount) + "px";
}

//      Follow links

const linkArrow = document.getElementById("link-arrow");
const socialLinks = document.getElementById("social-links");

function moveLinkArrow(position) {
  linkArrow.style.top = position * (socialLinks.clientHeight/socialLinks.childElementCount) + "px";
  linkArrow.style.paddingTop = "15px";
  linkArrow.style.opacity = "100%";
  linkArrow.style.rotate = "0deg";
}

function resetLinkArrow() {
  linkArrow.style.paddingTop = "50px";
  linkArrow.style.rotate = "90deg";
  linkArrow.style.opacity = "20%";
}

const scrollText = document.getElementById("scroll-text");

document.onscroll = function() {
  let scrollTop = window.scrollY;
  let docHeight = body.offsetHeight;
  let winHeight = window.innerHeight;
  let scrollPercent = scrollTop / (docHeight - winHeight);
  let scrollPercentRounded = Math.round(scrollPercent * 100);

  scrollText.textContent = scrollPercentRounded + "%";
}

//      Animations
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded and parsed");

  gsap.registerPlugin(ScrollTrigger);

  //        Startup
  gsap.fromTo(".startup-anim-left", {
      x: -50,
      opacity: "0%"
    }, {
      x: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 1
    }
  )

  gsap.fromTo(".startup-anim-right", {
      x: 50,
      opacity: "0%"
    }, {
      x: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 1
    }
  )

  gsap.fromTo(".startup-anim-left-slow", {
      x: -20,
      opacity: "0%"
    }, {
      x: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 1.5
    }
  )

  gsap.fromTo(".startup-anim-right-slow", {
      x: 20,
      opacity: "0%"
    }, {
      x: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 1.5
    }
  )

  gsap.fromTo(".startup-anim-top", {
      y: -5,
      opacity: "0%"
    }, {
      y: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 2
    }
  )

  gsap.fromTo(".startup-anim-bottom", {
      y: 5,
      opacity: "0%"
    }, {
      y: 0,
      opacity: "100%",
      ease: "power3.inOut",
      duration: 2
    }
  )

  //      Headers
  let headerElements = gsap.utils.toArray(".animated-header");

  headerElements.forEach(function (header) {
    gsap.fromTo(header, {
        y: 5,
        opacity: "0%"
      }, {
        scrollTrigger: {
          trigger: header,
          start: "top bottom",
          end: "+=0",
          toggleActions: "restart none reverse none"
        },
        y: 0,
        opacity: "100%",
        ease: "power3.inOut",
        duration: 1
      }
    );
  });

  //      Texts
  let textElements = gsap.utils.toArray(".animated-text")

  textElements.forEach(function (text) {
    gsap.fromTo(text, {
        y: 20,
        opacity: "0%"
      }, {
        scrollTrigger: {
          trigger: text,
          start: "top bottom",
          end: "+=0",
          //markers: true,
          toggleActions: "restart none reverse none"
        },
        y: 0,
        opacity: "100%",
        ease: "power1.inOut",
        duration: 1
      },
    );
  });

  //      About photos

  gsap.fromTo(".about-photos img", {
      y: 200,
      opacity: "0%"
    }, {
      scrollTrigger: {
        trigger: ".about-photos",
        start: "15% bottom",
        end: "+=800",
        scrub: true,
        ease: "none"
      },
      stagger: {
        each: 0.2,
        from: "end"
      },
      y: 0,
      opacity: "100%"
    }
  )

  //      Social Links

  //const socialLinks = document.querySelector(".social-links");

  gsap.fromTo("#social-links a", {
      x: -200,
      opacity: "0%"
    }, {
      scrollTrigger: {
        trigger: socialLinks,
        start: "15% bottom",
        end: "+=800",
        scrub: true,
        ease: "none"
      },
      stagger: 0.2,
      x: 0,
      opacity: "100%"
    }
  )

  //      Logo hover
  const logoHoverHitbox = document.getElementById("logo-hover-hitbox");

  logoHoverHitbox.addEventListener("mouseenter", () => gsap.to("#turbulence", {
    attr: { baseFrequency: 0.01 },
    duration: 2,
  }));

  logoHoverHitbox.addEventListener("mouseleave", () => gsap.to("#turbulence", {
    attr: { baseFrequency: 0 },
    duration: 2,
  }));

  gsap.fromTo(".back-to-top", {
      display: "none",
      opacity: "0%",
    }, {
      scrollTrigger: {
        trigger: "#back-to-top-trigger",
        start: "top center",
        //markers: true,
        end: "+=0",
        toggleActions: "restart none reverse none"
      },
      display: "flex",
      opacity: "100%",
      duration: 1
    },
  )

  const button = document.querySelector("button");

  // Init clip path to avoid issues on first hover
  gsap.set(button, {
    clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)",
  });

  button.addEventListener("mouseenter", () => gsap.to("button", {
    clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 5% 50%, 0% 0%)",
    duration: 0.3,
  }));

  button.addEventListener("mouseleave", () => gsap.to("button", {
    clipPath: "polygon(100% 0%, 100% 100%, 0% 100%, 0% 50%, 0% 0%)",
    duration: 0.3,
  }));

  //      Noise overlay
  const ctx = canvas.getContext('2d');

  // Cache width and height
  let width = window.innerWidth;
  let height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;

  window.onresize = () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    if (newWidth !== width || newHeight !== height) {
      width = newWidth;
      height = newHeight;
      canvas.width = width;
      canvas.height = height;
      imageData = ctx.createImageData(width, height);
      buffer32 = new Uint32Array(imageData.data.buffer);
      len = buffer32.length;
    }
  };

  let imageData = ctx.createImageData(width, height);
  let buffer32 = new Uint32Array(imageData.data.buffer);
  let len = buffer32.length;

  function noise() {
    for (let i = 0; i < len; i++) {
      buffer32[i] = Math.random() * 255 << 24;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const fps = 20;
  const interval = 1000 / fps;

  function loop() {
    noise();
    setTimeout(() => {
      requestAnimationFrame(loop);
    }, interval);
  }

  loop();
});