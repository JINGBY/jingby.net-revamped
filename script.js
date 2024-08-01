// Lenis smooth scroll
const lenis = new Lenis()

/*lenis.on('scroll', (e) => {
  console.log(e)
})*/

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

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

const menuIcon = document.querySelector(".menu-icon");
const menu = document.querySelector("menu");
const closeIcon = document.querySelector(".close-icon");

function openMenu() {
  menu.style.display = "block";
  menuIcon.style.display = "none";
  closeIcon.style.display = "flex";

  toggleScrolling()
}

function closeMenu() {
  menu.style.display = "none";
  menuIcon.style.display = "flex";
  closeIcon.style.display = "none";

  toggleScrolling()
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

  //console.log(socialLinks.clientHeight);
  //console.log(linkArrow.style.top)
}

const linkArrow = document.getElementById("link-arrow");
const socialLinks = document.getElementById("social-links");

function moveLinkArrow(position) {
  linkArrow.style.top = position * (socialLinks.clientHeight/socialLinks.childElementCount) + "px";
  linkArrow.style.paddingTop = "15px";
  linkArrow.style.opacity = "100%";
  linkArrow.style.rotate = "0deg";

  //console.log(socialLinks.clientHeight);
  //console.log(linkArrow.style.top)
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


/*

let mouseX;
let mouseY;

let isHoveringBanner = false;

const maskCentering = 90;

const noiseFilterMask = document.querySelector(".hero-banner-mask");
const bannerCover = document.querySelector("#hero-banner");

document.addEventListener("mousemove", trackMousePosition);

bannerCover.onmouseenter = function() {
  isHoveringBanner = true;
}

bannerCover.onmouseleave = function() {
  isHoveringBanner = false;
}

function trackMousePosition(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (isHoveringBanner) {
    noiseFilterMask.style.webkitMaskPositionX = mouseX - maskCentering + "px";
    noiseFilterMask.style.webkitMaskPositionY = mouseY - 350 - maskCentering + "px";
  }
}

*/

// Animations
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  // Startup
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

  let headersWithAnimTop = gsap.utils.toArray(".scrolltriggered-anim-top");

  headersWithAnimTop.forEach(function (header) {
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

  /*
  var containers = gsap.utils.toArray(".box-container");

  containers.forEach(function (container) {
    gsap.fromTo(
      container.querySelectorAll(".box"),
      { y: -250 },
      {
        y: 0,
        stagger: 0.3,
        scrollTrigger: {
          trigger: container,
          scrub: true,
          start: "top bottom",
          end: "top 20%",
          immediateRender: false,
          markers: true
        }
      }
    );
  });
  */

  // Logo hover

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
        trigger: "#btp-scrolltrigger",
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

  // Animated noise on background
  const canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  }
  resize();
  window.onresize = resize;

  function noise(ctx) {
    let w = ctx.canvas.width,
        h = ctx.canvas.height,
        idata = ctx.createImageData(w, h),
        buffer32 = new Uint32Array(idata.data.buffer),
        len = buffer32.length,
        i = 0;

    for(; i < len;)
        buffer32[i++] = ((255 * Math.random())|0) << 24;
    
    ctx.putImageData(idata, 0, 0);
  }

  // Toggle for 30 fps
  let toggle = true;

  function loop() {
    toggle = !toggle;
    if (toggle) {
        requestAnimationFrame(loop);
        return;
    }
    noise(ctx);
    requestAnimationFrame(loop);
  };

  loop();

  // Text
  gsap.fromTo(".text", {
      y: 20,
    }, {
      scrollTrigger: {
        trigger: "#text-scrolltrigger",
        start: "top bottom",
        end: "+=0",
        //markers: true,
        toggleActions: "restart none reverse none"
      },
      y: 0,
      opacity: "100%",
      ease: "power1.inOut",
      duration: 1
    }
  )


  /*
  let bannerTl = gsap.timeline({repeat: -1})
  bannerTl.timeScale(10);

  let noiseMin = 5;
  let noiseMax = 5.0001;

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  bannerTl.to("#fractal-noise", {
    attr: { baseFrequency: getRandomNumber(noiseMin, noiseMax) },
  });
  */

  /*
  let bannerTl = gsap.timeline({repeat: -1});
  //bannerTl.timeScale(1);

  let noiseMin = 5;
  let noiseMax = 5.00012;

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Function to update the base frequency continuously
  function updateBaseFrequency() {
    let newFrequency = getRandomNumber(noiseMin, noiseMax);
    gsap.set("#fractal-noise", {
      attr: { baseFrequency: newFrequency },
    });
  }

  // Call updateBaseFrequency continuously using GSAP ticker
  gsap.ticker.add(updateBaseFrequency);

  // Start the timeline animation
  bannerTl.to("#fractal-noise", {
    repeat: -1,  // infinite repeat
    onRepeat: updateBaseFrequency // call updateBaseFrequency on each repeat
  });
  */
});