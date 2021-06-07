var ftH, nowftH;
var ftDown = true;
var vUrl = '01';

$(document).ready(function() {
    Adjustment()
})

$(window).resize(function() {
    ftDown = true;
    $('#ft .ftCnt').css("transform", `translateY(0px)`);
    Adjustment()
});

$('#downBtn').click(function() {
    ftDown = !ftDown;
    if (ftDown) {
        ftH = nowftH
        $('#ft .ftCnt').css("transform", `translateY(0px)`);
    } else {

        nowftH = ftH / 3
        $('#ft .ftCnt').css("transform", `translateY(${nowftH}px)`);
    }
    Adjustment()
})

$('#navBar').click(function() {
    $(this).toggleClass('on')
})

$('#menu li').click(function() {
    var index = $('#menu li').index(this);
    switch (index) {
        case 0:
            chVideo();
            break;
        case 1:
            $('#stationList').addClass('on');
            break;
    }
})

$('#stationList li').click(function() {
    $('#stationList').removeClass('on')
    var index = $('#stationList li').index(this);
    vUrl = PrefixInteger(index + 1, 2);
    chVideo();

    $('#showStation p').text(`SLOT ${vUrl}`)
})

// ===== 函式 =====
// 調整顯示範圍
function Adjustment() {
    ftH = $('#ft').height();
    var countW = $('#count').width();
    var countH = $('#count').height();
    var calc;
    if (countW / countH < 0.68) {
        calc = countW / 440
    } else {
        calc = countH / 620;
    }
    $('#hidden').css('transform', `scale(${calc})`);
}

// 影片串流
function chVideo() {
    $('#videoBox canvas').remove()
    $('#videoBox').html(`<canvas id="video1" width="500" height="300"></canvas>`)
    var player;

    NodePlayer.load(() => {
        player = new NodePlayer() 
        player.setView('video1')
        player.setScaleMode(0)
        player.setBufferTime(500)
        player.start(`ws://cck.sofun-live.com:8000/live/csn${vUrl}.flv`)
        console.log(player)
    })
}

chVideo()




// 字串補0
function PrefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}