const input = document.getElementById('input')
const grid = document.getElementsByClassName('grid')[0];
const popularsearch = 'https://api.unsplash.com/search/photos/?query=popular&per_page=21&client_id=RuTMPM-enOFhrnQu94cJ4cJKP-By74oqPNfgTP3qm1g';

window.addEventListener('load',dayNightMode)
window.addEventListener('load',loadImg("Recent"));

input.addEventListener('keyup',()=>{
    if(event.key === "Enter"){
        loadImg(input.value);
    }
})

function loadImg(input){
    removeImages();
    const url = 'https://api.unsplash.com/search/photos/?query='+input+'&per_page=20&client_id=RuTMPM-enOFhrnQu94cJ4cJKP-By74oqPNfgTP3qm1g'
    fetch(url)
    .then(response => {
        // console.log(response)
        if(response.ok){
            return response.json();
        }
        else{
            alert(response.status)
        }
    })
    .then(data => {
        const imageNodes = [];
        for(let i =0;i<data.results.length;i++){
            imageNodes[i]= document.createElement('div');
            imageNodes[i].className = 'img';
            imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.regular+')';
            imageNodes[i].addEventListener('click',()=>{
                window.open(data.results[i].links.download,'_blank');
            })
            grid.appendChild(imageNodes[i]);
        }
    })
}

function removeImages(){
    const images = document.querySelectorAll('.img');
    for(let i =0;i<images.length;i++){
        images[i].remove();
        }
}

function dayNightMode(){
    const date = new Date();
    const hour = date.getHours();

    if(hour >= 6 && hour <= 19){
        document.body.style.backgroundColor = 'whitesmoke';
        document.body.style.color = 'black';
    }
    else{
        document.body.style.backgroundColor = 'black';  
        document.body.style.color = 'white';
    }
}
