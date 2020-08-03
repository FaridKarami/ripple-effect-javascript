window.onload = () => {
    const selector = '[fk8-ripple]';
    const fk8Ripple = document.querySelectorAll(selector);

    for (const item of fk8Ripple) {
        const self = item;
        item.addEventListener('mousedown', function(e) {
            if(self.classList.contains('disabled')) {
                return;
            }
            if(self.closest(selector)) {
                e.stopPropagation();
            }

            const style = getComputedStyle(self);

            const initPos = style.position;
            const x = e.pageX - self.offsetLeft;
            const y = e.pageY - self.offsetTop;
            const dia = Math.min(this.offsetHeight, this.offsetWidth, 100);

            // create ripple and append
            const rippleAnimate = document.createElement('div');
            rippleAnimate.classList.add('fk8-ripple');
            self.append(rippleAnimate);

            if(!initPos || initPos === "static") {
                self.style.position = 'relative';
            }

            rippleAnimate.classList.add('fk8-wave');
            rippleAnimate.setAttribute('style', [
                `width: ${dia}px`,
                `height: ${dia}px`,
                `left: ${x - (dia/2)}px`,
                `top: ${y - (dia/2)}px`,
            ].join(';'));

            rippleAnimate.addEventListener("animationend", function() {
                rippleAnimate.remove();
            }, false);
        })
    }
}