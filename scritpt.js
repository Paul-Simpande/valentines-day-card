$(document).ready(function(){
    var envelope = $("#envelope");
    var btn_open = $("#open");
    var btn_reset = $("#reset");

    envelope.click(function(){
        openEnvelope();
    });
    btn_open.click(function(){
        openEnvelope();
    });
    btn_reset.click(function(){
        closeEnvelope();
    });

    function openEnvelope(){
        envelope.addClass("open")
            .removeClass("close");
    }

    function closeEnvelope(){
        envelope.addClass("close")
            .removeClass("open");
    }
});

document.addEventListener("click", function() {
    var audio = document.getElementById("backgroundMusic");
    audio.play().then(() => {
        console.log("Music is playing!");
    }).catch((error) => {
        console.error("Error playing music:", error);
    });
}, { once: true });

$(document).ready(function () {
    const $canvas = $("#heartsCanvas");
    const canvas = $canvas[0];
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    $(window).resize(function () {
        resizeCanvas();
        hearts.length = 0;
        createHearts();
    });

    const hearts = [];

    function Heart(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.opacity = Math.random() * 0.5 + 0.5;
        this.color = `rgba(255, 0, 100, ${this.opacity})`;

        this.draw = function () {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.size, this.size);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-1, -1, -3, 2, 0, 4);
            ctx.bezierCurveTo(3, 2, 1, -1, 0, 0);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        };

        this.update = function () {
            this.y -= this.speed;
            this.x += Math.sin(this.y / 20) * 2;
            if (this.y < -10) {
                this.y = canvas.height + 10;
                this.x = Math.random() * canvas.width;
            }
            this.draw();
        };
    }
    function createHearts() {
        for (let i = 0; i < 100; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = Math.random() * 1.5 + 2;
            const speed = Math.random() * 1 + 0.5;
            hearts.push(new Heart(x, y, size, speed));
        }
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((heart) => heart.update());
        requestAnimationFrame(animate);
    }
    createHearts();
    animate();
});
