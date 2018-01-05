function Slider(G, n, H, e) {
    function z(a) {
        if (h)
            for (var b = 0; b < h; b++)
                if (a <= k[b]) {
                    var f = k[b - 1];
                    return (b - 1 + (a - f) / (k[b] - f)) * l / (h - 1) - d / 2 >> 0
                }
        return (a - m) / (p - m) * l - d / 2 >> 0
    }

    function t(a, b) {
        a = parseFloat(a || u.val());
        c = a < m ? -d / 2 : a > p ? l - d / 2 : z(a);
        g.css("left", c);
        A(a, b)
    }

    function A(a, b) {
        if (I) {
            var f = q ? B : g,
                c = q ? g : C,
                f = f.position().left;
            w.css({
                left: f + d / 2,
                width: c.position().left - f
            })
        }
        D && !b && D(a)
    }

    function E(a) {
        a.preventDefault();
        a = a.clientX - x + c >> 0;
        q && q.left() > a ? a = q.left() : y && y.left() < a ? a = y.left() : a < -d / 2 ? a = -d / 2 >> 0 : a > l - d / 2 && (a = l -
            d / 2 >> 0);
        if (a !== c) {
            x += a - c;
            c = a;
            g.css("left", c);
            a = c;
            if (h) {
                a = (a + d / 2) / l;
                var b = a * (h - 1) >> 0,
                    f = k[b];
                a = (f + (a - b / (h - 1)) * (h - 1) * ((k[b + 1] || p) - f)).toFixed(1 / v / 10 >> 0)
            } else a = parseFloat((Math.round(((a + d / 2) / l * (p - m) + m) / v) * v).toFixed(Math.log(1 / v) / Math.log(10) >> 0));
            u.val(a);
            A(a)
        }
    }

    function F() {
        $("body").removeClass("nosel");
        $(document).off("vmousemove", E).off("vmouseup", F)
    }
    e = e || {};
    n = $(n);
    var u = $(G),
        r, m = e.min || 0,
        p = e.max || 100,
        v = e.step || 1,
        D = e.update,
        I = e.fill,
        l = e.sliderWidth || 200,
        d = e.markWidth || 20,
        k = e.medians || [],
        h = k.length;
    h && (m = k[0], p = k[h - 1]);
    var g = $("<div/>", {
            "class": "mark m" + H
        }),
        x, q, y, B, C, w, c = z(u.val());
    n.hasClass("slider") ? (r = n.find(".slide-bar"), r.append(g), w = n.find(".fill")) : (w = $('<div class="fill">'), n.addClass("slider"), r = $("<div/>", {
        "class": "slide-bar",
        width: l
    }), r.append(w).append(g), n.append(r));
    g.css("left", c);
    this.min = function(a) {
        a && (m = a, t());
        return m
    };
    this.max = function(a) {
        a && (p = a, t());
        return p
    };
    this.marker = function() {
        return g
    };
    this.leftBound = function(a) {
        q = a;
        B = a.marker()
    };
    this.rightBound = function(a) {
        y = a;
        C = a.marker()
    };
    this.left = function() {
        return c
    };
    this.set = function(a, b) {
        var c = Math.log(1 / v) / Math.log(10) >> 0;
        a = Math.round(a * Math.pow(10, c)) / Math.pow(10, c);
        u.val(a);
        t(a, b)
    };
    this.setBG = function(a) {
        r.css("background", a)
    };
    this.update = t;
    u.change(function() {
        t()
    });
    g.on("vmousedown", function(a) {
        c = parseInt(g.css("left"));
        x = a.clientX;
        $("body").addClass("nosel");
        cancelEvent(a);
        $(document).on("vmousemove", E).on("vmouseup", F)
    })
};