const $=(s,root=document)=>root.querySelector(s);const $$=(s,root=document)=>[...root.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();
const menu=$('.menu-toggle'),nav=$('.nav');menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});$$('.nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.textContent='☰'}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}else{e.target.classList.remove('visible')}}),{threshold:.16,rootMargin:'0px 0px -5% 0px'});$$('.reveal').forEach(el=>observer.observe(el));
$$('.tab').forEach(tab=>tab.addEventListener('click',()=>{$$('.tab').forEach(t=>t.classList.toggle('active',t===tab));$('#admissionForm').classList.toggle('hidden',tab.dataset.tab!=='admission');$('#visitForm').classList.toggle('hidden',tab.dataset.tab!=='visit')}));
async function submitForm(form,url,opts={}){const status=$('.form-status',form);status.textContent='Submitting…';status.classList.remove('error');try{let res;if(opts.multipart){res=await fetch(url,{method:'POST',body:new FormData(form)});}else{const data=Object.fromEntries(new FormData(form).entries());res=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});}const out=await res.json();if(!res.ok)throw new Error(out.error||'Something went wrong.');status.textContent=out.message||'Submitted successfully.';form.reset();}catch(e){status.textContent=e.message;status.classList.add('error')}}
$('#admissionForm')?.addEventListener('submit',e=>{e.preventDefault();submitForm(e.currentTarget,'/api/enquiries')});$('#visitForm')?.addEventListener('submit',e=>{e.preventDefault();submitForm(e.currentTarget,'/api/visits')});$('#jobForm')?.addEventListener('submit',e=>{e.preventDefault();submitForm(e.currentTarget,'/api/jobs',{multipart:true})});

async function loadPublicEvents(){const root=$('#dynamicEvents');if(!root)return;try{const r=await fetch('/api/events');const events=await r.json();root.innerHTML=events.filter(e=>e.title!=='Annual Day 2027').map(e=>`<article class="dynamic-event"><small>${e.event_date?new Date(e.event_date).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}):'SCHOOL EVENT'}</small><h4>${String(e.title||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</h4><p>${String(e.description||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}</p></article>`).join('')}catch(e){root.innerHTML=''}}loadPublicEvents();

// Dynamic public gallery and editable homepage content
const escHtml=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let galleryItems=[];
async function renderGallery(){const root=$('#publicGallery');if(!root)return;try{const r=await fetch('/api/gallery');galleryItems=await r.json();const active=$('.gallery-filter.active')?.dataset.galleryFilter||'All';const list=active==='All'?galleryItems:active==='Programmes'?galleryItems.filter(x=>String(x.category).startsWith('Programmes')):active==='Activities'?galleryItems.filter(x=>['Activities','Classroom','Facilities','Learning Materials'].includes(x.category)):galleryItems.filter(x=>x.category===active);root.innerHTML=list.length?list.map((x,i)=>`<a class="gallery-item ${i===0?'large':''} reveal" href="${escHtml(x.image_path)}" target="_blank" rel="noopener"><img loading="lazy" src="${escHtml(x.image_path)}" alt="${escHtml(x.title)}"><span>${escHtml(x.title)} <b>↗</b></span></a>`).join(''):'<p class="gallery-loading">No photos in this section yet. More school photographs will be added soon.</p>';root.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}catch(e){root.innerHTML='<p class="gallery-loading">School photographs will appear here soon.</p>'}}
$$('.gallery-filter').forEach(b=>b.addEventListener('click',()=>{$$('.gallery-filter').forEach(x=>x.classList.toggle('active',x===b));renderGallery()}));renderGallery();
async function renderProgrammes(){
 const root=$('#programmesGrid');if(!root)return;
 const defaults=[
  {title:'Playgroup',desc:'A gentle first step into routines, play, discovery, and social confidence.',age:'2–3 years',label:'FIRST DISCOVERIES',meta:'FOUNDATION STAGE'},
  {title:'Nursery',desc:'Language, creativity, movement, and early concepts through engaging activities.',age:'3–4 years',label:'EXPLORE & CREATE',meta:'EARLY EXPLORERS'},
  {title:'Junior KG',desc:'Developing early literacy, number sense, communication, and independence.',age:'4–5 years',label:'BUILD THE BASICS',meta:'GROWING SKILLS'},
  {title:'Senior KG',desc:'Strengthening foundations and confidence for the next step in learning.',age:'5–6 years',label:'READY TO GROW',meta:'CONFIDENT LEARNERS'}
 ];
 const slots=['Playgroup','Nursery','Junior KG','Senior KG'];
 const pexels='https://images.pexels.com/photos/8617938/pexels-photo-8617938.jpeg?auto=compress&cs=tinysrgb&w=1920';
 let rows=[];try{const r=await fetch('/api/gallery');if(r.ok)rows=await r.json()}catch(e){}
 root.innerHTML=defaults.map((d,i)=>{
  const matches=rows.filter(x=>String(x.category)==='Programmes - '+slots[i]);
  const photo=matches[0]||null;
  const src=photo?photo.image_path:pexels;
  return `<article class="programme-card reveal"><div class="programme-photo"><img loading="lazy" src="${escHtml(src)}" alt="Children learning in the ${d.title} programme" onerror="this.onerror=null;this.src='/assets/school-event-${i+1}.jpg'"><span class="programme-level">${d.label}</span></div><div class="programme-info"><div class="programme-meta">0${i+1} <span>${d.meta}</span></div><h3>${d.title}</h3><p>${d.desc}</p><div class="programme-facts"><span><small>AGE GROUP</small><strong>${d.age}</strong></span><span><small>SCHOOL DAYS</small><strong>Confirm with school</strong></span><span><small>HOURS PER DAY</small><strong>9 AM – 12 PM · 3 hours</strong></span></div><a href="#contact">Enquire about admission <span>↗</span></a></div></article>`
 }).join('');root.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}renderProgrammes();

fetch('/api/content').then(r=>r.json()).then(c=>{const h=$('.hero-copy h1');if(h&&c.hero_title&&c.hero_title!=='Small steps today. Brighter futures tomorrow.')h.textContent=c.hero_title;const p=$('.hero-copy>p');if(p&&c.hero_description)p.textContent=c.hero_description;const ann=$('.announcement h2');if(ann&&c.announcement&&c.announcement!=='A new branch is planned for the 2027–2028 academic year, offering Playgroup to Standard 5.')ann.textContent=c.announcement;const loc=$('.announcement p');if(loc&&c.branch_location&&c.branch_location!=='Location to be announced')loc.textContent=c.announcement+' Location: '+c.branch_location+'.';const credit=$('#footerCredit');if(credit&&c.footer_credit)credit.textContent=c.footer_credit;}).catch(()=>{});
