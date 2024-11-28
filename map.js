function move_review(datavalue) {
    var menu = document.getElementsByClassName("workplace-search")[0];
    menu.style.width = 500 + 'px';

    var list = document.getElementsByClassName("wp-search-result")[datavalue];
    list.style.width = 450 + 'px';
    list.style.height = 500 + 'px';
    list.style.backgroundColor = 'rgba(' + 256 + ', ' + 256 + ', ' + 256 + ',' + 0.7 + ')';

    var i = 0;
    for (i = 0; i < 5; i++) {
        if (i != datavalue) {
            document.getElementsByClassName("wp-search-result")[i].style.display = 'none';

        }
    }

    document.getElementsByClassName("wp-buttons")[datavalue].style.display = 'none';

    //var img = document.getElementsByClassName("wp-image")[datavalue];
    //img.style.display = 'none';


    document.getElementsByClassName("wp-reviews-list")[datavalue].style.display = 'block';

    document.getElementsByClassName("wp-review-upload-btn")[datavalue].style.display = 'block';


}


function move_writing(datavalue) {
    document.getElementsByClassName("wp-reviews-list")[datavalue].style.display = 'none';
    document.getElementsByClassName("wp-reviews-writingspace")[datavalue].style.display = 'block';

    const btn = document.getElementsByClassName("wp-review-upload-btn")[datavalue];
    btn.addEventListener('click', () => {
        upload_writing(datavalue)
    });

}

function upload_writing(datavalue) {
    document.getElementsByClassName("wp-reviews-writingspace")[datavalue].style.display = 'none';

    move_main(datavalue);
}

function move_star(datavalue) {
    var menu = document.getElementsByClassName("workplace-search")[0];
    menu.style.width = 500 + 'px';

    var list = document.getElementsByClassName("wp-search-result")[datavalue];
    list.style.width = 450 + 'px';
    list.style.height = 500 + 'px';
    list.style.backgroundColor = 'rgba(' + 256 + ', ' + 256 + ', ' + 256 + ',' + 0.7 + ')';

    var i = 0;
    for (i = 0; i < 5; i++) {
        if (i != datavalue) {
            document.getElementsByClassName("wp-search-result")[i].style.display = 'none';

        }
    }

    document.getElementsByClassName("wp-buttons")[datavalue].style.display = 'none';
    //var img = document.getElementsByClassName("wp-image")[datavalue];
    //img.style.display = 'none';


    document.getElementsByClassName("wp-star-rating")[datavalue].style.display = 'block';


}

function move_main(datavalue) {
    var menu = document.getElementsByClassName("workplace-search")[0];
    menu.style.width = 350 + 'px';

    var list = document.getElementsByClassName("wp-search-result")[datavalue];
    list.style.width = 300 + 'px';
    list.style.height = 280 + 'px';
    list.style.backgroundColor = 'rgba(' + 256 + ', ' + 256 + ', ' + 256 + ',' + 1 + ')';
    var i = 0;
    for (i = 0; i < 5; i++) {
        if (i != datavalue) {
            document.getElementsByClassName("wp-search-result")[i].style.display = 'block';

        }
    }

    document.getElementsByClassName("wp-buttons")[datavalue].style.display = 'block';


    //var img = document.getElementsByClassName("wp-image")[datavalue];
    //img.style.display = 'block';


    document.getElementsByClassName("wp-reviews-list")[datavalue].style.display = 'none';

    document.getElementsByClassName("wp-review-upload-btn")[datavalue].style.display = 'none';

    document.getElementsByClassName("wp-star-rating")[datavalue].style.display = 'none';



}



async function fetchNearbyCafes(latitude, longitude) {
    try {
        const response = await fetch('/cafes/nearby/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ latitude, longitude })
        });

        if (!response.ok) {
            throw new Error('API 요청 실패');
        }

        const cafes = await response.json();
        renderCafeList(cafes);
        // 지도에 카페 마커 추가
        cafes.forEach(cafe => {
            const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(cafe.latitude, cafe.longitude),
                map: map,
                title: cafe.name
            });
            /*
            const infoWindow = new naver.maps.InfoWindow({
                content: `<div style="padding:10px;">${cafe.name}<br>${cafe.address}</div>`
            });
            */
            naver.maps.Event.addListener(marker, 'click', () => {
                infoWindow.open(map, marker);
            });
        });
    } catch (error) {
        console.error('카페 데이터를 가져오는 중 오류 발생:', error);
    }
}

function renderCafeList(cafes) {
    const resultContainer = document.querySelector('.wp-search-result');
    resultContainer.innerHTML = ''; // 기존 데이터를 초기화

    cafes.forEach(cafe => {
      //  const cafeItem = document.createElement('div');
      //  cafeItem.classList.add('wp-cafe-item');

        cafeItem.innerHTML = `
            <div class="wp-name">${cafe.name}</div>
            <div class="wp-open">${cafe.is_open}</div>
        `;

       // resultContainer.appendChild(cafeItem);
    });
}
