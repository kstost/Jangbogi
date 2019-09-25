$(document).ready(function () {
    let body = $(document.body);
    body.css({
        background: '#54245c',
        overflow: 'hidden',
    });
    //--
    let div = $('<span>');
    div.css({
        color: 'yellow',
        position: 'absolute',
        top: 0,
        left: 0
    });
    body.append(div);
    //--
    let text = $('<textarea>');
    text.css({
        color: 'yellow',
        outline: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        'font-size': '40px',
        background: 'transparent',
        width: '100%',
        height: '100%',
    });
    text.on('keyup', function () {
        localStorage.setItem('item', $(text).val());
        let sum = summ($(text).val());
        div.text(addComma(sum));
        let font_size = 1;
        let back = 0;
        div.css({ 'font-size': font_size });
        div.css({
            'display': 'inline',
            position: 'absolute',
        });
        while (text.outerWidth() / 2 > div.outerWidth()) {
            back = font_size;
            font_size += 10;
            div.css({ 'font-size': font_size });
        }
        div.css({ 'font-size': back });
        div.css({
            'text-align': 'right',
            'display': 'block',
            position: '',
        });
    });
    body.append(text);

    console.log(localStorage.getItem('item'));
    if (!localStorage.getItem('item')) {
        let list = [];
        list.push('라면4200')
        list.push('비누 2000');
        list.push('500');
        list.push('땅콩1000');
        text.text(list.join('\n'));
    } else {
        text.text(localStorage.getItem('item'));
    }
    text.focus();
    text.trigger('keyup');
});
function summ(aa) {
    let sum = 0;
    aa.split('\n').forEach(a => {
        let ef = [];
        a.split('').forEach(b => {
            let cl = Number(b);
            if (!isNaN(cl)) {
                ef.push(b);
            }
        });
        if (ef.length > 0) {
            sum += Number(ef.join(''));
        }
    });
    return sum;
}
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}
