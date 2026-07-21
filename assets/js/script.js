const ageGate=document.getElementById("ageGate");
const enterButton=document.getElementById("enterSite");
if(sessionStorage.getItem("bjb-age-confirmed")==="yes"){
  ageGate.classList.add("hidden");
}else{
  document.body.classList.add("gate-open");
}
enterButton.addEventListener("click",()=>{
  sessionStorage.setItem("bjb-age-confirmed","yes");
  ageGate.classList.add("hidden");
  document.body.classList.remove("gate-open");
});
const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".site-nav");
toggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded",String(open));
});
nav.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded","false");
}));
document.getElementById("year").textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));