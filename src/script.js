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
            image:'https://stc-id.nixcdn.com/v11/images/video-default.jpg'
        },
        {
            name:"Muộn rồi mà sao còn",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/MuonRoiMaSaoCon.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/playlist/2021/04/29/f/c/d/5/1619691184570.jpg'
        },
        {
            name:"Lạc trôi",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/LacTroiTripleDRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2017/09/08/e/2/7/8/1504877746360.jpg'
        },
        {
            name:"Chạy ngay đi",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/ChayNgayDi.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/05/12/e/8/6/f/1526059033533.jpg'
        },
        {
            name:"Em của ngày hôm qua",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/EmCuaNgayHomQua.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2017/11/19/e/6/c/1/1511029438465.jpg'
        },
        {
            name:"Hãy trao cho anh",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/HayTraoChoAnh.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2019/07/03/7/5/b/e/1562137543919.jpg'
        },  
        {
            name:"Buông đôi tay nhau ra",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/BuongDoiTayNhauRa.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/01/29/b/d/d/e/1517214332010.jpg'
        }, 
        {
            name:"Nơi nay có anh",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/NoiNayCoAnhRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2018/01/11/a/6/9/9/1515661840242.jpg'
        }, 
        {
            name:"Nắng ấm xa dần",
            singer:"Sơn Tùng M-TP",
            path:'src/audio/NangAmXaDanOfficialRemix.mp3',
            image:'https://avatar-ex-swe.nixcdn.com/song/2023/02/07/4/2/c/a/1675754232577.jpg'
        }, 
    ],
    render: function() {
        const htmls = this.songs.map((song) => {
            return `
            <div class="song">
                <div class="thumb" style="background-image: url('${song.image}');"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fa-solid fa-ellipsis"></i>
                </div>
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
        cdThumbRotate.play()

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
            _this.currentIndex--
            if(_this.currentIndex < 0){
                _this.currentIndex = _this.songs.length - 1
            }
            _this.loadSong()
            _this.render()
            audio.play()
        }

        //next song
        btnNext.onclick = function() {
            _this.currentIndex++
            if(_this.currentIndex >= _this.songs.length){
                _this.currentIndex = 0
            }
            _this.loadSong()
            _this.render()
            audio.play()
        }

        //repeat song
        btnRepeat.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            this.classList.toggle('active',_this.isRepeat)
        }
        //random song
        btnRandom.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            this.classList.toggle('active',_this.isRandom)
          }
        

    },
    run: function() {
        this.defineProperties()
        this.handleEvents()
        this.loadSong()
        this.render()
    }
}
web.run()
