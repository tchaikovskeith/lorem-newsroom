/* Ang Layag: spreadsheet-to-website adapter. Active only after setting SITE_CONFIG.editorialFeedUrl. */
(function(){
'use strict';
var raw=String(SITE_CONFIG.editorialFeedUrl||'').trim();if(!raw)return;
var endpoint;try{endpoint=new URL(raw);if(endpoint.protocol!=='https:'||endpoint.hostname!=='script.google.com'||!/^\/macros\/s\/[^/]+\/exec$/.test(endpoint.pathname))throw Error('Invalid deployment URL');}catch(e){console.warn('Ang Layag: invalid feed URL',e);return;}
var map={Balita:'news',Pananaw:'editorial',Tampok:'feature',Pampalakasan:'sports'},live=false,homepage={},cache=new Map(),seq=0;
function query(action,id){return new Promise(function(resolve,reject){
 var name='angLayagCallback_'+Date.now().toString(36)+'X'+(++seq).toString(36)+'C12345678',script=document.createElement('script'),url=new URL(endpoint.href),done=false;
 url.searchParams.set('action',action);url.searchParams.set('callback',name);if(id)url.searchParams.set('mediaId',id);
 var t=setTimeout(function(){finish(Error('Content feed timeout'));},18000);
 function finish(err,data){if(done)return;done=true;clearTimeout(t);delete window[name];script.remove();err?reject(err):resolve(data);}
 window[name]=function(data){finish(null,data);};script.onerror=function(){finish(Error('Feed could not be reached.'));};script.src=url.href;document.head.appendChild(script);
});}
function fetchImage(id){if(!/^MEDIA-[A-F0-9]{12}$/.test(id))return Promise.reject(Error('Bad photo ID'));if(!cache.has(id))cache.set(id,query('image',id).then(function(r){if(!r||!r.ok||r.mime!=='image/jpeg'||!r.data)throw Error('Unapproved image');return 'data:image/jpeg;base64,'+r.data;}).catch(function(e){cache.delete(id);throw e;}));return cache.get(id);}
var style=document.createElement('style');style.textContent='.story-image.cms-photo img{width:100%;height:100%;object-fit:cover;display:block;aspect-ratio:4/3}.story-image.cms-photo.media-hero img{aspect-ratio:16/9}.story-image.cms-photo.media-wide img{aspect-ratio:16/10}.story-image.cms-photo.media-squarish img{aspect-ratio:1/1}.writer-photo.cms-photo img{width:100%;height:100%;object-fit:cover;display:block}.cms-empty{padding:25px;background:var(--surface);border-top:3px solid var(--red);color:var(--ink-soft)}';document.head.appendChild(style);
function injectPhoto(frame,id,alt){if(!frame||!id||frame.dataset.mediaId===id)return;frame.dataset.mediaId=id;fetchImage(id).then(function(src){if(!frame.isConnected||frame.dataset.mediaId!==id)return;var img=document.createElement('img');img.src=src;img.alt=alt||'Larawang pangbalita';img.loading='lazy';frame.classList.add('cms-photo');frame.replaceChildren(img);}).catch(function(){});}
function hydrate(){if(!live)return;document.querySelectorAll('.story-image').forEach(function(frame){var anchor=frame.closest('a[href^="#"]'),id=anchor?anchor.getAttribute('href').slice(1):'',s=STORIES.find(function(item){return item.id===id;});if(s&&s.mediaId)injectPhoto(frame,s.mediaId,s.alt||s.title);});var story=STORIES.find(function(s){return s.id===location.hash.slice(1);});if(story){injectPhoto(document.querySelector('.article-figure .story-image'),story.mediaId,story.alt||story.title);if(!story.isMainEditorial)injectPhoto(document.querySelector('.writer-profile .writer-photo'),story.writerPhotoMediaId,'Larawan ni '+story.byline);}}
var oldHome=renderHome;
renderHome=function(){if(!live)return oldHome();
 function pick(section,key){return STORIES.find(function(s){return s.section===section&&s.id===homepage[key];})||STORIES.find(function(s){return s.section===section&&s.featured;})||STORIES.find(function(s){return s.section===section;});}
 var lead=pick('news','news'),more=[pick('feature','feature'),pick('editorial','editorial'),pick('sports','sports')];
 var leadHtml=lead?'<article class="home-main-story">'+linkMedia(lead,'16:9','media-hero')+'<span class="story-kicker">EKSKLUSIBO / BALITA</span><h2><a href="#'+h(lead.id)+'">'+h(lead.title)+'</a></h2><p class="story-dek">'+h(lead.excerpt)+'</p>'+byline(lead)+readMore(lead)+'</article>':'<article class="home-main-story cms-empty"><h2>Wala pang nailathalang pangunahing balita.</h2></article>';
 var moreHtml=more.map(function(s,i){return s?homeMini(s):'<article class="home-mini cms-empty"><span class="story-kicker">'+['TAMPOK','PANANAW','PAMPALAKASAN'][i]+'</span><p>Wala pang nailathalang artikulo.</p></article>';}).join('');
 return '<div class="page home-page"><div class="page-intro"><div class="page-intro-top"><span class="section-eyebrow">ESTADO NG REHIYON NGAYON</span><span class="edition-index">ANG LAYAG / PANGUNAHING EDISYON</span></div><h1>Apat na kuwentong dapat mong malaman.</h1><p>Maaasahan. Mapanindigan. Makatotohanan.</p></div><section class="home-four">'+leadHtml+'<div class="home-secondary">'+moreHtml+'</div></section><div class="home-extra-grid">'+homeWeather()+homeTikTok()+'</div></div>';
};
var oldCategory=renderCategory;
renderCategory=function(section){if(!live||STORIES.some(function(s){return s.section===section;}))return oldCategory(section);var meta=SECTIONS.find(function(s){return s.id===section;});return '<div class="page category-page"><div class="page-intro"><h1>'+h(meta.label)+'</h1><p>'+h(meta.description)+'</p></div><div class="cms-empty">Wala pang nailathalang artikulo.</div>'+sectionExtras(section)+'</div>';};
var oldArticle=renderArticle;
renderArticle=function(s){var html=oldArticle(s);if(!live||!s.cms)return html;var t=document.createElement('template');t.innerHTML=html;
 var body=t.content.querySelector('.article-body');if(body){var lines=String(s.body||'').split(/\n\s*\n|\n/).map(function(p){return p.trim();}).filter(Boolean);body.innerHTML=lines.length?lines.map(function(p){return '<p>'+h(p)+'</p>';}).join(''):'<p>Walang nilalaman ang artikulong ito.</p>';}
 var fig=t.content.querySelector('.figcaption');if(fig)fig.textContent=[s.photoCaption,s.photoCredit].filter(Boolean).join(' · ')||'Larawan ng Ang Layag';
 var profile=t.content.querySelector('.writer-profile');if(s.isMainEditorial){if(profile)profile.remove();var by=t.content.querySelector('.article-meta .byline');if(by)by.textContent='Lupon ng Patnugutan, Ang Layag · '+s.date;}else if(profile){var role=profile.querySelector('.writer-role'),bio=profile.querySelector('.writer-bio');if(role)role.textContent=s.writerRole||'Mamamahayag';if(bio)bio.textContent=s.writerBio||'Wala pang nailathalang bionote.';}
 return t.innerHTML;};
window.addEventListener('hashchange',function(){requestAnimationFrame(hydrate);});
query('feed').then(function(data){if(!data||!data.ok||!Array.isArray(data.articles))throw Error('Invalid feed');
 homepage=data.homepage||{};var counts={news:0,editorial:0,feature:0,sports:0};
 STORIES=data.articles.filter(function(s){return s&&map[s.section]&&/^[A-Za-z0-9_-]{3,60}$/.test(String(s.id||''))&&s.title;}).map(function(s){var section=map[s.section],body=String(s.body||'');return {id:String(s.id),section:section,n:++counts[section],title:String(s.title),excerpt:String(s.excerpt||''),body:body,byline:String(s.byline||'Ang Layag Newsroom'),date:String(s.date||''),reading:Math.max(1,Math.ceil(body.split(/\s+/).length/200)),mediaId:String(s.mediaId||''),writerPhotoMediaId:String(s.writerPhotoMediaId||''),writerRole:String(s.writerRole||''),writerBio:String(s.writerBio||''),alt:String(s.alt||''),photoCaption:String(s.photoCaption||''),photoCredit:String(s.photoCredit||''),featured:!!s.featured,isMainEditorial:!!s.isMainEditorial,cms:true};});
 STORIES.forEach(function(s){if(!s.isMainEditorial)WRITER_PROFILES[s.id]={name:s.byline,role:s.writerRole||'Mamamahayag',bio:s.writerBio||'Wala pang nailathalang bionote.',photo:''};});
 live=true;render();hydrate();
}).catch(function(e){console.warn('Ang Layag CMS: approved feed unavailable, retaining demo content.',e);});
})();