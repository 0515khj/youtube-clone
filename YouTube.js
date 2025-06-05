"use strict";

const $mainCon1 = document.querySelector('.mainCon1');
const $videoList = document.querySelector('.videoList');
const $mainTop = document.querySelector('.top');
const $asideLi = document.querySelectorAll('.side ul li');
const $videoSearch = document.querySelector('.videoSearch');
const $secondBtn = document.querySelector('.secondBtn');
const $tooltip = document.querySelector('.tooltip');

let khj = 10;

$secondBtn.addEventListener('mouseenter',e=>{
    $tooltip.style.display = 'block'
});
$secondBtn.addEventListener('mouseleave',e=>{
    $tooltip.style.display = 'none'
});

async function mainTop() {
    const reponse = await fetch('./youtube.json');
    const data = await reponse.json();

    const typeSet = new Set();

    data.forEach(btn =>{
        typeSet.add(btn.type);
        
    });
    //Set을 배열로 변환 후 forEach 함
    typeSet.forEach(type => {
        const topBtn = document.createElement('button');
        topBtn.textContent = type;
        $mainTop.append(topBtn)

        topBtn.addEventListener('click',e=>{

            const topButton = document.querySelectorAll('.top button');
            topButton.forEach(btn => btn.classList.remove('topBtn'))

            topBtn.classList.add('topBtn');

           const filterVideo = allData.filter(a=> a.type === type);
           renderVideo(filterVideo);
        })

    })
} // mainTop end



$asideLi.forEach(li =>{
    li.addEventListener('click',e=>{
        $asideLi.forEach(a => a.classList.remove('clickBtn'));
    e.currentTarget.classList.add('clickBtn')
})
})/////

let allData = [];

/* 초기화면 및 렌더링  */
const fetchVideo = async() =>{
    const reponse = await fetch('./youtube.json');
    const data = await reponse.json();
    allData = data;

    renderVideo(allData);
}

const renderVideo = async(videos) =>{
    $videoList.innerHTML='';
    
    videos.forEach(video =>{
        const li = document.createElement('li');
        const mainProfile = document.createElement('div');
        mainProfile.classList.add('mainProfile');
        const leftProfile = document.createElement('div');
        const circle = document.createElement('button');
        circle.classList.add('circleBtn');
        const rightProfile = document.createElement('div');
        
        const img = document.createElement('img');
        const title = document.createElement('p');
        const channel = document.createElement('p');
        const views = document.createElement('span');
        views.classList.add('views')
        const time = document.createElement('span');

        title.textContent = video.title;
        title.style.fontWeight = "bold";
        channel.style.color ="#616161";
        views.style.color ="#616161";
        time.style.color ="#616161";
        
        channel.textContent = video.channel;
        views.textContent = video.views;
        time.textContent = video.time;
        
        img.src= `https://img.youtube.com/vi/${video.img}/mqdefault.jpg`;
        img.alt = video.title;

        const link = document.createElement('a');
        link.href = `https://www.youtube.com/watch?v=${video.img}`
        link.target='_blank';

        link.append(img)
        
        leftProfile.append(circle);
        rightProfile.append(title , channel , views , time);
        mainProfile.append(leftProfile,rightProfile);
        li.append(link,mainProfile);
        $videoList.append(li);

        
    })
}

/* 검색 */
$videoSearch.addEventListener('keydown',async(e)=>{
    if(e.key === "Enter"){
        e.preventDefault();
        const searchValue = $videoSearch.value.toLowerCase();

        /* 값없으면 동작 x */
        if(!searchValue){
            return;
        }
        const searchFilter = allData.filter(a => 
            a.title.toLowerCase().includes(searchValue) ||
            a.channel.toLowerCase().includes(searchValue) ||
            a.type.toLowerCase().includes(searchValue) 
        );
        console.log('검색 결과:', searchFilter); // 여기 추가
        renderVideo(searchFilter);
    }
})

mainTop();
fetchVideo();


