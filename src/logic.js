$(document).ready(function () {
    let font_string = "* {font-family: 'Cute Font', cursive;}";
    if (true) {
        let query = (getQueryStringObject());
        if (query.font) {
            let link = $(document.createElement('link'));
            link.on('load', function () {
                font_string = "* {font-family: '" + query.font + "';}";
                init(true);
            });
            link.on('error', function () {
                init(false);
            });
            $('head').append(link);
            link.attr('rel', 'stylesheet');
            link.attr('href', 'https://fonts.googleapis.com/css?family=' + query.font + '&display=swap');
        } else {
            init(false);
        }
    }
    function init(fm) {
        $(document.createElement('style')).text(font_string).appendTo(document.body);
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
    }
});
function summ(aa) {
    let sum = 0;
    aa.split('\n').forEach(a => {
        let ef = [];
        a.split('').forEach(b => {
            let cl = Number(b);
            if (!isNaN(cl) || b === '.') {
                ef.push(b);
            }
        });
        if (ef.length > 0) {
            let fe = Number(ef.join(''));
            if (!isNaN(fe)) {
                sum += fe;
            }
        }
    });
    return sum;
}
function addComma(num) {
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return num.toString().replace(regexp, ',');
}
function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}
