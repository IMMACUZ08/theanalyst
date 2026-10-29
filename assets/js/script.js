(function(){
var d=portfolioData,$=function(i){return document.getElementById(i)};
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function ul(a){return "<ul>"+a.map(function(x){return "<li>"+esc(x)+"</li>"}).join("")+"</ul>"}
function closeMenu(){$("links").classList.remove("open");$("burger").setAttribute("aria-expanded","false")}
$("hName").textContent=d.name;$("hTitle").textContent=d.title;$("hTag").textContent=d.tagline;$("hLoc").textContent=d.location;$("hYrs").textContent=d.years;
["nLi","hLi"].forEach(function(i){$(i).href=d.linkedin});["nGh","hGh"].forEach(function(i){$(i).href=d.github});
$("fName").textContent=d.name;$("yr").textContent=new Date().getFullYear();
$("aboutText").innerHTML=d.bio.map(function(p){return "<p>"+esc(p)+"</p>"}).join("");
$("exp").innerHTML=d.experience.map(function(e){return "<li><h3>"+esc(e.role)+"</h3><p class='meta'>"+esc(e.org)+" · "+esc(e.place)+" · "+esc(e.dates)+"</p><p>"+esc(e.summary)+"</p>"+ul(e.points)+(e.impact?"<p class='imp'><strong>Impact:</strong> "+esc(e.impact)+"</p>":"")+"</li>"}).join("");
$("skillGrid").innerHTML=Object.keys(d.skills).map(function(k){return "<div class='sg'><h3>"+esc(k)+"</h3><div class='chips'>"+d.skills[k].split("|").map(function(s){return "<span class='chip'>"+esc(s)+"</span>"}).join("")+"</div></div>"}).join("");
$("cards").innerHTML=d.projects.map(function(p,i){return "<article class='card'>"+(p.img?"<img loading='lazy' src='"+p.img+"' alt='Dashboard for "+esc(p.title)+"'>":"<div class='ph' aria-hidden='true'>"+esc(p.cat)+"</div>")+"<div class='cb'><span class='cat'>"+esc(p.cat)+"</span><h3>"+esc(p.title)+"</h3><p>"+esc(p.desc)+"</p><p class='small'><strong>Tools:</strong> "+esc(p.tools.join(", "))+"</p><p class='small'><strong>Skills:</strong> "+esc(p.skills.join(", "))+"</p><button class='btn' data-p='"+i+"'>View Case Study</button></div></article>"}).join("");
$("cList").innerHTML="<li>Email: <a href='mailto:"+d.email+"'>"+esc(d.email)+"</a></li><li>Phone: <a href='tel:"+d.phone+"'>"+esc(d.phone)+"</a></li><li>LinkedIn: <a target='_blank' rel='noopener' href='"+d.linkedin+"'>"+esc(d.linkedin.replace("https://www.",""))+"</a></li><li>GitHub: <a target='_blank' rel='noopener' href='"+d.github+"'>"+esc(d.github.replace("https://",""))+"</a></li><li>Location: "+esc(d.location)+"</li>";
$("cards").addEventListener("click",function(e){var b=e.target.closest("[data-p]");if(!b)return;var p=d.projects[b.dataset.p];
$("dBody").innerHTML="<h2>"+esc(p.title)+"</h2><p class='muted'>"+esc(p.cat)+" · Role: "+esc(p.role)+"</p>"+(p.img?"<img src='"+p.img+"' alt='"+esc(p.title)+" dashboard'>":"")+
"<h3>Business problem</h3><p>"+esc(p.problem)+"</p><h3>Objective</h3>"+ul(p.objective)+"<h3>Approach</h3>"+ul(p.approach)+"<h3>Analysis</h3>"+ul(p.analysis)+"<h3>Findings</h3>"+ul(p.findings)+"<h3>Recommendations</h3>"+ul(p.recs)+"<h3>Outcome</h3><p>"+esc(p.outcome)+"</p><h3>Business impact</h3><p>"+esc(p.impact)+"</p><p class='small'><strong>Tools:</strong> "+esc(p.tools.join(", "))+"</p>";
$("dlg").showModal();$("dlg").scrollTop=0});
document.addEventListener("click",function(e){var r=e.target.closest("[data-resume]");if(r){e.preventDefault();closeMenu();$("cvf").src=d.resume+"#toolbar=0&navpanes=0";$("cv").showModal()}
if(e.target.closest("[data-close]"))e.target.closest("dialog").close();else if(e.target.tagName=="DIALOG")e.target.close()});
$("cv").addEventListener("close",function(){$("cvf").src="about:blank"});
$("burger").onclick=function(){var o=$("links").classList.toggle("open");this.setAttribute("aria-expanded",o)};
$("links").addEventListener("click",function(e){if(e.target.tagName=="A")closeMenu()});
$("theme").onclick=function(){var r=document.documentElement,dark=(r.dataset.theme||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"))=="dark",n=dark?"light":"dark";r.dataset.theme=n;try{localStorage.setItem("theme",n)}catch(e){}};
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.05});
document.querySelectorAll(".reveal").forEach(function(s){io.observe(s)});
var f=$("form"),st=$("status");f.action=d.formspreeEndpoint;
f.addEventListener("submit",function(e){e.preventDefault();
if(!f.checkValidity()){f.reportValidity();st.textContent="Please complete all fields with a valid email.";return}
var b=$("send");b.disabled=true;b.textContent="Sending…";st.textContent="";
fetch(f.action,{method:"POST",body:new FormData(f),headers:{Accept:"application/json"}}).then(function(r){
if(r.ok){f.reset();st.textContent="Thank you, your message has been sent."}else throw 0}).catch(function(){st.textContent="Sorry, something went wrong. Please email "+d.email+" directly."}).finally(function(){b.disabled=false;b.textContent="Send message"})});
})();
