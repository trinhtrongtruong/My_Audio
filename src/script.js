const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const player = $('.player')
const playList = $('.playlist')
const header = $('header h2')
const cd = $('.cd')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const btnRepeat = $('.btn-repeat')
const btnPrev = $('.btn-prev')
const btnPlay = $('.btn-toggle-play')
const btnNext = $('.btn-next')
const btnRandom = $('.btn-random')
const progress = $('.progress')


const web = {
    currentIndex: 0,
    isPlaying:false,
    isRepeat:false,
    isRandom:false,
    songs: [
        {
            name:"Chúng ta không thuộc về nhau",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/ChungTaKhongThuocVeNhau.mp3',
            image:'https://stc-id.nixcdn.com/v11/images/video-default.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
            //https://c3-ex-swe.nct.vn/NhacCuaTui2035/1111-MiiNaDREAMeRRIN9DREAMeRVietNam-8721776.mp3?st=kGXHwjRbLTxDBSPHscXmog&e=1700396520&t=1699795588821
        },
        {
            name:"Muộn rồi mà sao còn",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/MuonRoiMaSaoCon.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/playlist/2021/04/29/f/c/d/5/1619691184570.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        },
        {
            name:"Lạc trôi",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/LacTroiTripleDRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2017/09/08/e/2/7/8/1504877746360.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        },
        {
            name:"Chạy ngay đi",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/ChayNgayDi.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/05/12/e/8/6/f/1526059033533.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        },
        {
            name:"Em của ngày hôm qua",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/EmCuaNgayHomQua.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2017/11/19/e/6/c/1/1511029438465.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        },
        {
            name:"Hãy trao cho anh",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/HayTraoChoAnh.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        },  
        {
            name:"Buông đôi tay nhau ra",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/BuongDoiTayNhauRa.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/01/29/b/d/d/e/1517214332010.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        }, 
        {
            name:"Nơi nay có anh",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/NoiNayCoAnhRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/01/11/a/6/9/9/1515661840242.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        }, 
        {
            name:"Nắng ấm xa dần",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/NangAmXaDanOfficialRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2023/02/07/4/2/c/a/1675754232577.jpg',
            link:'href=https://c1-ex-swe.nixcdn.com/NhacCuaTui1024/DeVuong-DinhDungACV-7121634.mp3?st=CX8cyLauI9Qlp9-Pp2APTg&e=1649040138&download=true'
        }, 
    ],
    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
                <div class="thumb" style="background-image: url('${song.image}');"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <a class="option" target= "_blank" href=${song.link.split('href=')[1]}>
                    <i class="fa-solid fa-download"></i>
                </a>
            </div>
                `;
        })
        playList.innerHTML = htmls.join("")
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong',{
            get:function() {
                return this.songs[this.currentIndex]
            }
        })
        
    },
    loadSong: function() {
        header.textContent = this.currentSong.name   
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth


        const cdThumbRotate = cdThumb.animate([{
            transform: 'rotate(360deg)'
        }
        ],{
            duration:10000, 
            iterations:Infinity
        })
        cdThumbRotate.pause()

        //Play or pause song
        btnPlay.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            }
            else{   
                audio.play()
            }
        }
        
        //audio play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbRotate.play()
        }

        //audio pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbRotate.pause()
        }

        //progress song
        audio.ontimeupdate = function() {
            if(audio.duration > 0) {
                const timeRun = Math.floor(audio.currentTime / audio.duration * 100)  
                progress.value = timeRun  
            }
        }

        //rewind song width progress change 
        progress.onchange = function(e) {
            const timeChange = audio.duration * e.target.value / 100
            audio.currentTime = timeChange
        }

        //prev song
        btnPrev.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.currentIndex--
                if(_this.currentIndex < 0){
                    _this.currentIndex = _this.songs.length - 1
                }
                _this.loadSong()
            }
            _this.activeSong()
            audio.play()
            _this.render()
        }

        //next song
        btnNext.onclick = function() {
            if(_this.isRandom){
                _this.playRandomSong()
            }
            else{
                _this.currentIndex++
                if(_this.currentIndex >= _this.songs.length){
                    _this.currentIndex = 0
                }
                _this.loadSong()
            }
            audio.play()
            _this.render()
            _this.activeSong()
        }

        //replay when end current song
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }
            else{
                btnNext.click()
            }
        }

        //repeat song
        btnRepeat.onclick = function(e) {
            if(_this.isRepeat){
                _this.isRepeat = false
                this.classList.remove('active')
            }
            else{
                _this.isRepeat = true
                this.classList.add('active')
            }
        }
        //random song
        btnRandom.onclick = function(e) {
            if(_this.isRandom){
                _this.isRandom = false
                this.classList.remove('active')
            }
            else{
                _this.isRandom = true
                this.classList.add('active')
            }
        }

        //click song
        playList.onclick = function(e) {
            const change = e.target.closest('.song:not(.active)')
            const option = e.target.closest('.option')
            if(change ){
                if(change){
                    if(true){
                        $('.song.active').classList.remove('active')
                        _this.currentIndex = Number(change.dataset.index)  
                        if(_this.currentIndex == change.dataset.index){
                            change.classList.add('active')
                        }
                    }
                    _this.loadSong()
                    _this.activeSong()  
                    _this.render
                    audio.play()
                }
                else if(option){
                    
                }
            }
        }

    },
    //song active
    activeSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior:'smooth',
                block:'end',
                inline:'nearest'
            })
        },500)
    },

    playRandomSong: function() {
        let randomIndex
        do{
            randomIndex = Math.floor(Math.random() * this.songs.length)
        }while(randomIndex === this.currentIndex)
        this.currentIndex = randomIndex
        this.loadSong()
    },
    run: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadSong()
        this.render()
    }
}
web.run()
