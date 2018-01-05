(function(g, V, ta, Y, Ba) {
    function ma(f, c, k, g) {
        function J() {
            A.hide();
            $(V).off("click", J)
        }

        function C(c) {
            L.val(c);
            f.css("background", c);
            J();
            g(c)
        }

        function G(f) {
            return function() {
                C(k[f])
            }
        }
        f.addClass("picker");
        for (var A = $("<div/>", {
                "class": "pickpop"
            }), x = $("<div/>", {
                "class": "colorPanel"
            }), L = $("<input/>", {
                "class": "color-input",
                type: "text",
                value: k[c],
                maxlength: 7,
                tabindex: -1
            }), q, K = 0; K < k.length; K++) q = $("<div/>", {
            "class": "colorBox",
            css: {
                background: k[K]
            }
        }), q.click(G(K)), x.append(q);
        L.change(function() {
            C(L.val())
        });
        A.click(cancelEvent).html(x.append(L));
        f.css("background-color", k[c]).click(function(c) {
            cancelEvent(c);
            if ("none" === A.css("display")) {
                var k = f.offset();
                c = k.left + f.width();
                k = $w.width() - k.left;
                A.toggleClass("left-align", k > c);
                A.show();
                Y.click(J)
            } else J()
        }).html(A)
    }

    function aa(f, c, k, g) {
        c = c ? 1 : "";
        var J = $(".gen-anon").prop("checked") && !c ? 1 : "",
            C = $(".gen-private").prop("checked") && !c ? 1 : "";
        if (mm.useCanvas) {
            var G = mm.currentMeme(),
                A = mm.ctx(),
                x = mm.canv(),
                L = mm.getText();
            signCanvas(A, x.width, x.height, 67600);
            A = x.toDataURL("image/jpeg");
            k && ea(A, !0);
            for (var x = mm.memeData(), q, K = 0; K < x.boxes.length; K++)
                if (q = x.boxes[K], "image" === q.type && .5 < q.w / G.w && .5 < q.h / G.h) {
                    x.template = 0;
                    break
                }
            $.extend(x, {
                imgData: A.substr(A.search(",") + 1),
                meme: G.name,
                text: L,
                type: "jpeg",
                anon: J,
                "private": C,
                isReply: c,
                stream_name: g
            });
            $.ajax({
                url: "/ajax_meme_done_canvas",
                type: "post",
                data: x,
                dataType: "json",
                success: function(c) {
                    "s3" === c.error ? f(c, !0) : c.error ? (loading(!1), error_dialog(c.error)) : f(c, C);
                    _gaq.push(["_trackEvent", "memedoneCanvas " + (c.error ? "Failure" : "Success"),
                        G.id + " - " + G.name, I.user.user || "anon"
                    ])
                }
            })
        } else c = $.extend(mm.memeData(), {
            anon: J,
            "private": C,
            isReply: c,
            stream_name: g
        }), loading("Generating Meme..."), $.ajax({
            url: "/ajax_meme_done",
            type: "post",
            data: c,
            dataType: "json",
            success: function(c) {
                loading(!1);
                c.error ? error_dialog(c.error) : (k && ea(), f(c, C));
                _gaq.push(["_trackEvent", "memedoneAjax " + (c.error ? "Failure" : "Success"), "derp", I.user.user || "anon"])
            }
        })
    }

    function ua(f, c) {
        fa(f, c, "meme", function() {
            mm.reset();
            imgDoneBox.hide();
            ga()
        }, mm.currentMeme().name || "Untitled")
    }

    function ha() {
        ia || (ia = !0, $.getScript("//s.po.st/static/v3/post-widget.js"))
    }

    function ga() {
        var f = $(".head"),
            c = f.find(".ad");
        if (c[0]) {
            var k = c.data("slot");
            k && (c.remove(), f.prepend(adsenseCode(k)), f = f.position().top, $w.scrollTop() > f && g.scrollTo(0, f))
        }
    }

    function ea(f, c) {
        ha();
        g.scrollTo(0, 0);
        g.imgDoneBox = new Box({
            html: '<div id="done"><img id="doneImage"' + (f ? ' src="' + f + '"' : "") + '/><div><div id="doneShare"></div><div id="doneUrl">' + (c ? '<img src="//s.imgflip.com/preloader.gif"/>' : "") + '</div></div><div id="doneLinks"></div></div>',
            bg: "transparent",
            top: 20,
            hideX: !0,
            noMaskClick: !0
        })
    }

    function fa(f, c, k, Z, J) {
        _gaq.push("_trackPageview");
        var C = {
                meme: "jpg",
                gif: "gif",
                pie: "png",
                demotivational: "jpg"
            }[k],
            G = parseInt(f.iid).toString(36),
            A = ("gif" === C ? "/gif/" : "/i/") + G,
            x = !0,
            L = $("#doneImage"),
            q = $("#doneUrl");
        if (!L.attr("src")) L.attr("src", (c ? "//i2.imgflip.com/" : IMAGE_DOMAIN) + G + "." + C);
        else if (!c) {
            var K = new Image;
            $(K).load(function() {
                L.attr("src", $(this).attr("src"))
            });
            K.src = IMAGE_DOMAIN + G + "." + C
        }
        Y.on("contextmenu", "#doneImage", function() {
            x = !1
        });
        q.html(embedCodes(G, C, c, !c && "gif" !== k, k)).find(".img-code").click(function() {
            $(this).select();
            x = !1
        }).on("focus", function() {
            x = !1
        });
        c || I.user.id ? !c && 0 < I.user.subsLeft && (q.append('<div class="done-msg">You have ' + I.user.subsLeft + " remaining submission" + (1 != I.user.subsLeft ? "s" : "") + ' today. <span id="done-submit" class="done-link a">Submit this image</span></div>'), $("#done-submit").click(function() {
            x = !1;
            submitImg(f.iid)
        })) : (k = '<div class="done-msg">You are not logged in! If you want to claim or delete this image, ',
            k += '<a class="done-link" target="_blank" href="/login?claim_iid=' + f.iid + '">Login and claim it</a>', k += ' or <a class="done-link" target="_blank" href="/signup?claim_iid=' + f.iid + '">Signup and claim it</a>', k += "</div>", q.append(k));
        k = $('<div class="l but">&larr; Change settings</div>').click(function() {
            x && !g.doneshare && $.get("/ajax_delete_creation?iid=" + f.iid);
            g.doneshare = !1;
            imgDoneBox.hide();
            ga()
        });
        Z = $('<div class="l but">Make another</div>').click(Z);
        q = $("#doneLinks");
        q.html(k);
        c ? (J = "This image is private. It will only be stored on imgflip servers long enough for you to download it.",
            "s3" === f.error && (J = '<span style="color:red">Whoops! Temporary error while uploading to clouds. You can download your image directly, or reload and try again.</span>'), $("#doneShare").html(J)) : (c = $("<a class='l but' href='" + A + "'>Go to image page</a>"), c.click(function() {
            x = !1
        }), q.append(c), insertShares("#doneShare", G, C, J));
        q.append(Z)
    }
    var Ca = g.File && g.FileReader && g.FileList;
    MemeMaker = function(f, c) {
        function k(a) {
            return 0 === a.id ? H ? H.src : "" : a.url_name ? "/s/meme/" + a.url_name + ".jpg" : "https://i.imgflip.com/" +
                a.id.toString(36) + ".jpg?a" + Math.round(+new Date / 1E3 / 3600) + ("imgflip.com" !== g.location.hostname ? "&j" : "")
        }

        function Z(a, b) {
            return Math.min(a, Math.max(500, a / b * 500))
        }

        function J() {
            var a = p();
            a.w += a.h;
            a.h = a.w - a.h;
            a.w -= a.h;
            a.rotation = 270 === a.rotation ? 0 : ~~a.rotation + 90;
            h.select(ja)
        }

        function C(a) {
            a ? O.removeClass("no-events").find(".cropBox").removeClass("off") : O.addClass("no-events").find(".cropBox").addClass("off");
            y.find(".mm-toggle-drag").prop("checked", a)
        }

        function G() {
            Da = new Box({
                html: '<form id="mm-upload" action="/memeAdd" method="post" enctype="multipart/form-data"><div id="mm-upload-file-btn" class="l but">Upload image from your device<input id="mm-upload-file" name="template_file" type="file" class="hidden-file-input"/></div><div id="mm-upload-or">OR</div><input id="mm-upload-url" type="url" name="template_url" placeholder="Paste an image URL here"/><div id="mm-upload-img-preview-wrap"><img id="mm-upload-img-preview"/></div><div id="mm-upload-public-wrap"><label><input id="mm-upload-public" type="checkbox"/> Allow this template to be shared publicly</label></div><p id="mm-upload-name-wrap">Name: <input name="template_name" type="text"/></p><input id="mm-upload-btn" class="l but" type="submit" value="Upload"/></form>',
                w: 360
            });
            $("#mm-upload-public").click(function() {
                $("#mm-upload-name-wrap").toggle($(this).prop("checked"))
            });
            $("#mm-upload").on("submit", function() {
                var a = !$(this).find("#mm-upload-public").prop("checked");
                if ("url" === va) {
                    var b = $("#mm-upload-img-preview").attr("src");
                    if (!b) return MSG("No URL selected", "red"), !1;
                    if (a) return x(b), !1
                } else {
                    if (!$("#mm-upload-file").val()) return MSG("No file selected", "red"), !1;
                    if (a) return A(), !1
                }
            });
            $("#mm-upload-file").change(function() {
                var a = $(this)[0].files[0];
                if (-1 ===
                    a.type.search(/^image/)) MSG("File is not an image", "red");
                else {
                    $("#mm-upload-img-preview-wrap").show();
                    var b = new FileReader;
                    b.onload = function(a) {
                        $("#mm-upload-img-preview").attr("src", a.target.result);
                        va = "upload"
                    };
                    b.readAsDataURL(a)
                }
            });
            $("#mm-upload-url").on("keyup change", function() {
                $("#mm-upload-img-preview-wrap").show();
                $("#mm-upload-img-preview").attr("src", $(this).val());
                va = "url"
            })
        }

        function A() {
            if (Ca) {
                var a = $("#mm-upload-file")[0].files[0];
                if (-1 === a.type.search(/^image/)) MSG("File is not an image",
                    "red");
                else {
                    loading("Uploading Image...");
                    var b = new FileReader;
                    b.onload = function(b) {
                        K(b.target.result, a.name)
                    };
                    b.readAsDataURL(a)
                }
            } else alert("To use a fully private template, your browser needs to support the HTML5 File API. All modern browsers support the File API. If you cannot upgrade your browser right away, you can still create your meme if you set the template as public.")
        }

        function x(a) {
            loading("Uploading Image...");
            L(a, function(b) {
                K(b, a)
            })
        }

        function L(a, b) {
            if (!ba) return q(a, b);
            var c = new Image;
            c.setAttribute("crossorigin", "anonymous");
            $(c).load(function() {
                var e = V.createElement("canvas");
                e.width = this.naturalWidth;
                e.height = this.naturalHeight;
                e.getContext("2d").drawImage(this, 0, 0);
                try {
                    b(e.toDataURL("image/png"))
                } catch (c) {
                    q(a, b)
                }
            }).on("error", function() {
                q(a, b)
            });
            c.src = a
        }

        function q(a, b) {
            $.ajax({
                url: "/ajax_get_img_data",
                data: {
                    url: a
                },
                success: function(a) {
                    a.error ? (loading(!1), error_dialog(a.error)) : b(a.img_data)
                }
            })
        }

        function K(a, b) {
            H = new Image;
            $(H).load(function(a) {
                f.custom = {
                    id: 0,
                    name: "Custom Image",
                    w: H.width,
                    h: H.height,
                    template_url: b || ""
                };
                h.select("custom");
                loading(!1)
            });
            H.src = a;
            Da.hide()
        }

        function da(a, b, c) {
            function e() {
                f.updateColors()
            }
            var B = '<div class="text-wrap"><textarea placeholder="' + ("top" === a ? "TOP TEXT" : "bottom" === a ? "BOTTOM TEXT" : "MORE TEXT") + '" class="mm-text"></textarea><div class="fontOps"><div class="picker mm-font-color-picker" title="Change Font Color"></div>';
            na || (B += '<div class="picker mm-outline-color-picker" title="Change Outline Color"></div><input class="ow" type="number" maxlength="1" min="0" max="9" title="Change Outline Width" tabindex="-1"/>');
            B = $(B + "</div></div>");
            y.find(".mm-text-boxes").append(B);
            var f = new aa(B, a, b);
            d.push(f);
            c && f.autoResize(p().w, p().h, !0);
            ma(B.find(".mm-font-color-picker"), 1, oa, e);
            na || ma(B.find(".mm-outline-color-picker"), 0, oa, e);
            2 < d.length && Y(f.$box);
            Ea && Ea(B)
        }

        function Y(a) {
            a.css({
                background: "#fff"
            }).animate({
                opacity: 0
            }, 500, function() {
                $(this).css({
                    background: "none",
                    opacity: 1
                })
            })
        }

        function z() {
            if (ba) {
                P.naturalWidth ? 0 < p().rotation ? (l.translate(t.width / 2, t.height / 2), l.rotate(p().rotation / 180 * Math.PI), 180 === p().rotation ?
                    (l.translate(-t.width / 2, -t.height / 2), l.drawImage(P, 0, 0, t.width, t.height), l.translate(t.width / 2, t.height / 2)) : (l.translate(-t.height / 2, -t.width / 2), l.drawImage(P, 0, 0, t.height, t.width), l.translate(t.height / 2, t.width / 2)), l.rotate(-p().rotation / 180 * Math.PI), l.translate(-t.width / 2, -t.height / 2)) : l.drawImage(P, 0, 0, t.width, t.height) : l.clearRect(0, 0, t.width, t.height);
                Fa && Fa(l, t);
                l.shadowBlur = 0;
                M && l.drawImage(M, 0, 0);
                for (var a = 0; a < d.length; a++) "image" !== d[a].type || d[a].hidden || d[a].draw();
                for (a = 0; a < d.length; a++) "text" !==
                    d[a].type || d[a].hidden || d[a].draw()
            } else
                for (a = 0; a < d.length; a++) d[a].hidden || d[a].draw()
        }

        function aa(a, b, c) {
            if (ba) return new ea(a, b, c);
            c = c || {};
            var e = this,
                B;
            e.type = "text";
            e.align = b;
            e.size = c.maxFontSize || y.find(".mm-size").val() >> 0 || Ga;
            e.outline_width = 2;
            e.text = "";
            e.font_color = "#ffffff";
            e.outline_color = "#000000";
            e.font = (y.find(".mm-font").val() || "impact") + ",impac";
            e.$text_wrap = a;
            var d = e.$box = $("<div/>", {
                    "class": "box cropBox off"
                }),
                f = a.find(".mm-text");
            d.hover(function() {
                    clearTimeout(R);
                    $(".cropBox").removeClass("off")
                },
                function() {
                    R = setTimeout(function() {
                        $(".cropBox").addClass("off")
                    }, 10)
                });
            y.find(".mm-font").change(function() {
                h($(this).val())
            });
            y.find(".mm-size").change(function() {
                e.size = B = $(this).val() >> 0;
                e.draw()
            }).keyup(function() {
                e.size = B = $(this).val() >> 0;
                e.draw()
            });
            a.find(".ow").change(function() {
                e.outline_width = $(this).val() >> 0;
                4 < e.outline_width && (e.outline_width = 4);
                e.draw()
            }).keyup(function() {
                e.outline_width = $(this).val() >> 0;
                4 < e.outline_width && (e.outline_width = 4);
                e.draw()
            }).val(e.outline_width);
            b = e.setText =
                function() {
                    e.text = ca ? f.val().toUpperCase() : f.val();
                    e.draw()
                };
            var h = e.setFont = function(a) {
                e.font = (a || "impact") + ",impac";
                e.draw()
            };
            e.getFont = function() {
                return e.font.split(",")[0]
            };
            e.updateColors = function() {
                e.font_color = a.find(".mm-font-color-picker .color-input").val();
                e.outline_color = a.find(".mm-outline-color-picker .color-input").val();
                e.draw()
            };
            e.getVals = function() {
                var a = k.getVals();
                return [a.x / n >> 0, a.y / n >> 0, a.w / n >> 0, a.h / n >> 0, B / 1.32 / n >> 0]
            };
            e.setVals = function(a, e, b, c) {
                k.setVals(a * n >> 0, e * n >> 0, b * n >>
                    0, c * n >> 0)
            };
            e.setAlign = function(a) {
                e.align = a
            };
            e.autoResize = function(a, b) {
                var c = a * n - 10,
                    d = b * n / 4,
                    B = 5;
                "bottom" === e.align ? B = 3 * d - 15 : "middle" === e.align && (B = 1.5 * d - 2);
                k.setVals(5, B, c, d)
            };
            e.draw = function() {
                var a = k.getVals(),
                    b = e.text,
                    c = b.length,
                    f = 2 + c / 30 >> 0,
                    F = b.split(" ").length,
                    v = Math.sqrt(c * a.h / a.w / 2.8) + .5 >> 0;
                v || (v = 1);
                v > F && (v = F);
                for (var h = c / v, N = [], F = [], w = -1; w <= v; w++) F[w] = {};
                var r = 0,
                    r = 0,
                    l = (1.32 * e.size >> 0) + 2; - 6 > B - l && (l = B + 6);
                var u, w = $("#testline");
                do {
                    l -= 2;
                    u = 1.21 * l / 1.32 >> 0;
                    for (var g = 0; g <= v; g++) g == v ? N[g] = c : (r = (h *
                        g >> 0) - f, 0 > r && (r = 0), r = g ? b.indexOf(" ", r) : 0, N[g] = -1 == r ? c : r), g && (F[g - 1].text = b.substr(N[g - 1], N[g] - N[g - 1]));
                    for (var r = 4 + .1 * l / 1.32, n = 0, Q = r * (v - 1), g = 0; g < v; g++) w.css({
                        font: "400 " + l + "px/" + u + "px " + e.font,
                        height: u
                    }).text(F[g].text), F[g].w = w.width(), F[g].h = u, F[g].w > n && (n = F[g].w), Q += u
                } while (!(n <= a.w && Q <= a.h));
                B = l;
                w = a.h - Q;
                "top" === e.align && (w = 0);
                "middle" === e.align && (w /= 2);
                F[-1].h = 0;
                for (var h = w, g = "", Ha, p = e.outline_width, w = 0; w < v; w++)
                    for (b = F[w].w, c = F[w].h, f = (a.w - b) / 2, h = h + F[w - 1].h + (w ? r : 0), N = F[w].text, n = f - p; n <= f + p; n++)
                        for (Q =
                            h - p; Q <= h + p; Q++) Ha = n == f && Q == h ? "z-index:2;color:" + e.font_color + ";" : "color:" + e.outline_color + ";", g += "<div class='line' style='font:400 " + l + "px/" + u + "px " + e.font + ";" + Ha + "top:" + Q + "px;left:" + n + "px;width:" + b + "px;height:" + c + "px;'>" + N + "</div>";
                d.find(".line").remove();
                d.append(g)
            };
            var k = new Dragger(d, O, e.draw);
            f.change(b).keyup(b);
            pa.after(d)
        }

        function ea(a, b, c) {
            c = c || {};
            var e = this,
                d, f = !na && y.find(".mm-use-shadow").prop("checked");
            e.type = "text";
            e.align = b;
            e.size = c.maxFontSize || y.find(".mm-size").val() >> 0 || Ga;
            e.outline_width = f ? 5 : 1;
            e.text = "";
            e.font_color = "#ffffff";
            e.outline_color = "#000000";
            e.font = (y.find(".mm-font").val() || "impact") + ",impac";
            e.$text_wrap = a;
            b = e.$box = $("<div/>", {
                "class": "box cropBox off"
            });
            var g = new Dragger(b, O, z),
                h = a.find(".mm-text");
            b.hover(function() {
                clearTimeout(R);
                $(".cropBox").removeClass("off")
            }, function() {
                R = setTimeout(function() {
                    $(".cropBox").addClass("off")
                }, 10)
            }).on("vmousedown", function() {
                $(".cropBox").removeClass("off")
            });
            y.find(".mm-font").change(function() {
                m($(this).val())
            }).end().find(".mm-size").change(function() {
                e.size =
                    d = $(this).val() >> 0;
                z()
            }).keyup(function() {
                e.size = d = $(this).val() >> 0;
                z()
            }).end().find(".mm-use-shadow").change(function() {
                f = !!$(this).prop("checked");
                a.find(".ow").val(e.outline_width = f ? 5 : 1);
                z()
            });
            a.find(".ow").change(function() {
                e.outline_width = $(this).val() >> 0;
                z()
            }).keyup(function() {
                e.outline_width = $(this).val() >> 0;
                z()
            }).val(e.outline_width);
            var k = e.setText = function() {
                    e.text = ca ? h.val().toUpperCase() : h.val();
                    z()
                },
                m = e.setFont = function(a) {
                    e.font = (a || "impact") + ",impac";
                    z()
                };
            e.getFont = function() {
                return e.font.split(",")[0]
            };
            e.updateColors = function() {
                e.font_color = a.find(".mm-font-color-picker .color-input").val();
                e.outline_color = a.find(".mm-outline-color-picker .color-input").val();
                z()
            };
            e.getVals = function() {
                var a = g.getVals();
                return [a.x / n >> 0, a.y / n >> 0, a.w / n >> 0, a.h / n >> 0, d / 1.32 / n >> 0]
            };
            e.setVals = function(a, e, b, c) {
                g.setVals(a * n >> 0, e * n >> 0, b * n >> 0, c * n >> 0)
            };
            e.setAlign = function(a) {
                e.align = a
            };
            e.autoResize = function(a, b, c) {
                var d;
                if (c) a = a * n - 10, d = b * n / 4, c = b = 5, "bottom" === e.align ? c = 3 * d - 13 : "middle" === e.align && (c = 1.5 * d - 2);
                else {
                    d = D / qa;
                    var f =
                        g.getVals();
                    b = d * f.x;
                    c = d * f.y;
                    a = d * f.w;
                    d *= f.h
                }
                g.setVals(b, c, a, d)
            };
            e.draw = function() {
                var a = g.getVals(),
                    b = E / D,
                    a = {
                        x: Math.round(b * a.x),
                        y: Math.round(b * a.y),
                        w: Math.round(b * a.w),
                        h: Math.round(b * a.h)
                    };
                l.shadowBlur = f ? e.outline_width : 0;
                l.shadowColor = f ? e.outline_color : "";
                var c = e.text,
                    m = c.length,
                    h = 2 + m / 30 >> 0,
                    v = c.split(" ").length;
                (b = Math.sqrt(m * a.h / a.w / 2.8) + .5 >> 0) || (b = 1);
                b > v && (b = v);
                for (var N = m / b, w = [], v = [], r = -1; r <= b; r++) v[r] = {};
                var k = 0,
                    k = 0,
                    r = e.size + 2; - 6 > d - r && (r = d + 6);
                do {
                    r -= 2;
                    l.font = r + "px " + e.font;
                    for (var u = 0; u <= b; u++) u ==
                        b ? w[u] = m : (k = (N * u >> 0) - h, 0 > k && (k = 0), k = u ? c.indexOf(" ", k) : 0, w[u] = -1 == k ? m : k), u && (v[u - 1].text = c.substr(w[u - 1], w[u] - w[u - 1]));
                    for (var k = 4 + .1 * r, n = 0, p = k * (b - 1), u = 0; u < b; u++) v[u].w = l.measureText(v[u].text).width, v[u].h = .85 * r, v[u].w > n && (n = v[u].w), p += .85 * r
                } while (n > a.w || p > a.h);
                d = r;
                c = a.h - p;
                "top" === e.align && (c = 0);
                "middle" === e.align && (c /= 2);
                v[-1].h = 0;
                m = c;
                for (r = 0; r < b; r++)
                    if (c = (a.w - v[r].w) / 2, m += v[r].h, r && (m += k), h = v[r].text, l.fillStyle = e.font_color, f)
                        for (N = 0; 6 > N; N++) l.fillText(h, a.x + c, a.y + m);
                    else l.strokeStyle = e.outline_color,
                        l.lineWidth = e.outline_width, l.fillText(h, a.x + c, a.y + m), na || l.strokeText(h, a.x + c, a.y + m)
            };
            h.change(k).keyup(k);
            S.after(b);
            c.coords && (c = c.coords, g.setVals(c[0], c[1], c[2], c[3]))
        }

        function fa(a) {
            this.type = "image";
            this.element = a;
            var b = this.$box = $("<div/>", {
                    "class": "box cropBox off"
                }),
                c = new Dragger(b, O, z);
            b.hover(function() {
                clearTimeout(R);
                $(".cropBox").removeClass("off")
            }, function() {
                R = setTimeout(function() {
                    $(".cropBox").addClass("off")
                }, 10)
            });
            this.getVals = function() {
                var a = c.getVals();
                return [a.x / n >> 0, a.y /
                    n >> 0, a.w / n >> 0, a.h / n >> 0
                ]
            };
            this.autoResize = function(b, d, f) {
                var h;
                if (f) b = d = Math.min(b * n / 3 >> 0, d * n / 3 >> 0), a.width > a.height ? (f = b, h = a.height / a.width * f) : (h = b, f = a.width / a.height * h);
                else {
                    h = D / qa;
                    var g = c.getVals();
                    b = h * g.x;
                    d = h * g.y;
                    f = h * g.w;
                    h *= g.h
                }
                c.setVals(b, d, f, h)
            };
            this.draw = function() {
                var b = c.getVals(),
                    d = E / D,
                    b = {
                        x: Math.round(d * b.x),
                        y: Math.round(d * b.y),
                        w: Math.round(d * b.w),
                        h: Math.round(d * b.h)
                    };
                l.drawImage(a, ~~b.x, ~~b.y, ~~b.w, ~~b.h)
            };
            S.after(b);
            this.autoResize(p().w, p().h, !0);
            c.lockRatio()
        }

        function ga() {
            var a = T.find(".draw");
            a.hasClass("set") ? (a.removeClass("set"), a.text("Draw"), T.find(".mm-add-img, .add-scumbag, .mm-rotate").show(), T.find(".picker,.erase").hide(), $(".box").show(), S.off("mousedown", ha).off("mousemove", ia), $(V).off("mouseup", la)) : (a.addClass("set"), a.text("Stop Drawing"), T.find(".mm-add-img, .add-scumbag, .mm-rotate").hide(), T.find(".picker,.erase").show(), $(".box").hide(), S.mousedown(ha).mousemove(ia), $(V).mouseup(la))
        }

        function ha(a) {
            a.preventDefault();
            var b = a.clientX - $(this).offset().left + $(g).scrollLeft();
            a = a.clientY - $(this).offset().top + $(g).scrollTop();
            var c = E / D,
                b = Math.round(c * b);
            a = Math.round(c * a);
            U.beginPath();
            l.beginPath();
            U.moveTo(b, a);
            l.moveTo(b, a);
            l.save();
            l.shadowBlur = 0;
            l.strokeStyle = ra;
            U.strokeStyle = ra;
            $("body").addClass("nosel");
            ka = !0
        }

        function ia(a) {
            if (ka) {
                var b = a.clientX - $(this).offset().left + $(g).scrollLeft();
                a = a.clientY - $(this).offset().top + $(g).scrollTop();
                var c = E / D,
                    b = Math.round(c * b);
                a = Math.round(c * a);
                U.lineTo(b, a);
                U.stroke();
                l.lineTo(b, a);
                l.stroke()
            }
        }

        function la() {
            ka && (l.restore(), ka =
                0, $("body").removeClass("nosel"), W = !0)
        }

        function Ia() {
            $("#mygen").hide();
            $("#memewrap").show();
            $(".mm-tab").removeClass("set");
            $("#memetab").addClass("set");
            if (!$("#memewrap").html()) {
                var a = 0,
                    b = "",
                    c = 0,
                    e, d = "//s.imgflip.com/ms" + spriteNum + ".jpg",
                    h;
                for (h in f) f.hasOwnProperty(h) && !isNaN(h) && (a++, e = 'style="background:url(' + d + ") " + -50 * c + 'px 0px;"', c++, b += '<div class="im" ' + e + " onclick=\"mm.changeMeme('" + h + '\')" alt="' + f[h].name + ' Meme Image" title="Make ' + f[h].name + ' Meme"></div>');
                $("#memewrap").append(b +
                    '<a class="y but" id="allTemplates" href="/memetemplates">View All Meme Templates</a>')
            }
            Ja()
        }

        function wa() {
            $("#memewrap").hide();
            $("#mygen").show();
            $(".mm-tab").removeClass("set");
            $("#mytab").addClass("set");
            wa.done || (I.user.id || -1 === g.location.href.search("memegenerator") ? ($.getJSON("/ajax_get_my_generators", function(a) {
                if (a.error) MSG(a.error, "red");
                else {
                    $.extend(f, a);
                    a = 0;
                    var b = "",
                        c, e, d;
                    for (d in f) c = f[d], isNaN(d) && "U" != d && (e = "custom" === d ? H.src : IMAGE_DOMAIN + "2/" + c.id.toString(36) + ".jpg", b += "<img class='im um' src='" +
                        e + "' onclick='mm.changeMeme(\"" + d + "\")' title='" + c.name + "'/>", a++);
                    b ? $("#mygen").append(b) : $("#mygen").append("<div style='line-height:50px;padding-left:10px;'>Upload an image to create your first custom generator!</div>");
                    Ja()
                }
            }), wa.done = !0) : $("#mygen").append("<div style='line-height:50px;padding-left:10px;'><a rel='nofollow' href='/login?redirect=/memegenerator'>Login</a> or <a rel='nofollow' href='/signup?redirect=/memegenerator'>Signup</a> to view any custom templates you upload!"))
        }

        function Ja() {
            $(".im").hover(function() {
                var a =
                    $("#mm-meme-title"),
                    b = $(this).hasClass("um") ? this.title : this.title.substr(5, this.title.length - 10),
                    b = b || "Untitled Template";
                b == p().name ? a.text(b).css({
                    "font-weight": 700
                }) : a.text(b).css({
                    "font-weight": 400
                })
            }, function() {
                $("#mm-meme-title").text(p().name || "Untitled Template").css({
                    "font-weight": 700
                })
            })
        }

        function ua() {
            function a(a) {
                var e = y.val().trim();
                if (!(3 > e.length || !0 !== a && e === F)) {
                    var d = +new Date;
                    E = d;
                    F = e;
                    a = b();
                    var f = e + (a ? "@^" : "");
                    A[f] ? c(A[f]) : $.ajax({
                        url: "/ajax_meme_search",
                        data: {
                            q: e,
                            include_user_memes: a ?
                                1 : 0
                        },
                        dataType: "json",
                        success: function(a) {
                            d === E && (a.error ? error_dialog(a.error) : (A[f] = a.results, c(a.results)))
                        }
                    })
                }
            }

            function b() {
                return q.find(".mm-add-img-show-user-memes").prop("checked")
            }

            function c(a) {
                var d, f;
                d = "" + e("Featured Memes");
                if (a && a.featured)
                    for (f = 0; f < a.featured.length; f++) d += g(a.featured[f]);
                else d += l();
                if (b())
                    if (d += e("User Templates"), a && a.user)
                        for (f = 0; f < a.user.length; f++) d += g(a.user[f]);
                    else d += l();
                if (a && a.my)
                    for (d += e("My Templates"), f = 0; f < a.my.length; f++) d += g(a.my[f]);
                q.find(".mm-search-results").html(d)
            }

            function e(a) {
                return '<tr><td colspan="2" class="mm-search-section-title">' + a + "</td></tr>"
            }

            function g(a) {
                var b;
                b = "" + ('<tr class="mm-search-result" data-id="' + a.id + '">');
                b = b + '<td class="mm-search-result-img-td">' + ('<img class="mm-search-result-img" src="https://i.imgflip.com/2/' + (~~a.id).toString(36) + '.jpg"/>');
                b += "</td>";
                b += '<td class="mm-search-result-text">' + a.name + "</td>";
                return b += "</tr>"
            }

            function l() {
                return '<tr class="mm-search-result"><td colspan="2" class="mm-search-result-text">0 results</td></tr>'
            }

            function n(a, b) {
                loading("Adding Image...");
                q.find(".mm-add-img-type-inside").hasClass("selected") ? t(a) : x(a, b);
                D.hide()
            }

            function t(a) {
                var b = new Image;
                "http" === a.substr(0, 4) && b.setAttribute("crossorigin", "anonymous");
                $(b).load(function() {
                    d.push(new fa(b));
                    z();
                    loading(!1);
                    C(!0)
                });
                b.src = a
            }

            function x(a, b) {
                var c = k(p()),
                    e = new Image,
                    d = new Image;
                "http" === c.substr(0, 4) && e.setAttribute("crossorigin", "anonymous");
                "http" === a.substr(0, 4) && d.setAttribute("crossorigin", "anonymous");
                var m = !1,
                    g = function() {
                        if (m) {
                            var a =
                                Math.min(e.width, d.width),
                                c = a / e.width * e.height,
                                g = a / d.width * d.height,
                                k = V.createElement("canvas");
                            k.width = a;
                            k.height = c + g;
                            var l = k.getContext("2d");
                            l.drawImage(e, 0, 0, e.width, e.height, 0, 0, a, c);
                            l.drawImage(d, 0, 0, d.width, d.height, 0, c, a, g);
                            H = new Image;
                            $(H).load(function() {
                                var a = p().templates || [p().id];
                                a.push(b);
                                f.custom = {
                                    id: 0,
                                    templates: a,
                                    name: "Custom Image",
                                    w: H.width,
                                    h: H.height
                                };
                                h.select("custom");
                                loading(!1)
                            });
                            H.src = k.toDataURL("image/png")
                        } else m = !0
                    };
                $(e).load(g);
                $(d).load(g);
                e.src = c;
                d.src = a
            }
            var m;
            m = '<div class="mm-add-img-popup"><div class="mm-add-img-types">';
            m += '<div class="mm-add-img-type mm-add-img-type-inside selected">';
            m += '<div class="mm-add-img-type-title">Inside Current Image</div>';
            m += '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
            m += "</div>";
            m += '<div class="mm-add-img-type mm-add-img-type-below">';
            m += '<div class="mm-add-img-type-title">Below Current Image</div>';
            m += '<div class="mm-add-img-type-diagram"><div class="mm-add-img-current"></div><div class="mm-add-img-new"></div></div>';
            m += "</div>";
            m += "</div>";
            m += '<div class="mm-add-img-choose-img">';
            m += '<div class="mm-add-img-upload-btn l but">Upload Image<input type="file" class="hidden-file-input"/></div>';
            m += '<div class="mm-add-img-or">OR</div>';
            m += '<input class="mm-add-img-search" type="text" placeholder="Search Memes"/>';
            m += '<label class="mm-add-img-show-user-memes-label"><input class="mm-add-img-show-user-memes" type="checkbox"/> Include User Templates</label>';
            m += '<table class="mm-search-results"></table>';
            m += "</div>";
            m +=
                "</div>";
            var q = $(m),
                y = q.find(".mm-add-img-search"),
                D = new Box({
                    html: q
                }),
                F = "",
                A = {},
                E;
            q.on("vclick", ".mm-add-img-type", function(a) {
                var b = $(this);
                b.parent().find(".mm-add-img-type").removeClass("selected");
                b.addClass("selected");
                return cancelEvent(a)
            });
            q.on("change", ".mm-add-img-show-user-memes", function() {
                $(this).prop("checked") ? confirm("This will allow any user-uploaded meme template to display in the search results, which may contain not-safe-for-work content. Are you sure you want to display user-uploaded memes?") ?
                    a(!0) : $(this).prop("checked", !1) : a(!0)
            });
            q.on("keyup", ".mm-add-img-search", debounce(a, 300));
            q.on("change", ".mm-add-img-search", debounce(a, 300));
            q.on("vclick", ".mm-search-result", function(a) {
                var b = $(this).data("id");
                if (b) return n(k({
                    id: b
                }), b), cancelEvent(a)
            });
            q.on("change", ".mm-add-img-upload-btn input", function() {
                if (Ca) {
                    var a = this.files[0];
                    if (-1 === a.type.search(/^image/)) error_dialog("That file is not an image!");
                    else {
                        var b = new FileReader;
                        b.onload = function(a) {
                            n(a.target.result, 0)
                        };
                        b.readAsDataURL(a)
                    }
                } else error_dialog("Your browser must have HTML5 File support to upload an image. Try upgrading to a modern browser.")
            })
        }
        c = c || {};
        var h = this,
            sa = $(c.$previewOuter || "#mm-preview-outer"),
            O = $(c.$preview || ".mm-preview"),
            S = O.find(".mm-canv"),
            pa = O.find(".mm-img"),
            y = $(c.settingsDiv || "#mm-settings"),
            xa = $("#mm-search"),
            E, X, D = sa.width(),
            qa = D,
            La = c.noDraw,
            ya = c.numTexts >> 0,
            Ga = c.fontSize || 50,
            ca = c.forceCaps !== Ba ? !!c.forceCaps : !0,
            na = c.disableOutline,
            za = !1,
            oa = "#000000 #ffffff #995555 #ff3333 #ff8800 #eeee00 #22ee22 #3333ff #00bff3 #dd00cc".split(" "),
            Aa = c.scumbagPath || "/img_util/scumbag_hat2.png",
            W = !1,
            n = 1,
            Ea = c.textAdded,
            Fa = c.preDraw,
            l, M, U, Ka, ra, P, d, R, ka, ja, H, t = S[0],
            T, ba = h.useCanvas = t.getContext && t.toDataURL && (l = t.getContext("2d")) && -1 === navigator.userAgent.search("Android 2.");
        h.hideBox = function(a) {
            d[a].hidden = !0;
            z()
        };
        h.showBox = function(a) {
            d[a].hidden = !1;
            z()
        };
        h.setWidth = function(a) {
            qa = D || a;
            D = a;
            n = Math.min(1, D / p().w);
            for (a = 0; a < d.length; a++) d[a].autoResize(p().w, p().h, !1)
        };
        h.previewWidth = function() {
            return D
        };
        h.canvasWidth = function() {
            return E
        };
        h.setCanvasWidth = function(a) {
            var b = p();
            E = Math.min(b.w, a);
            X = Math.round(b.h / b.w * E);
            S.attr({
                width: E,
                height: X
            });
            M && ($(M).attr({
                width: E,
                height: X
            }), W = !1);
            h.setWidth(Math.min(E, Math.min(b.w, sa.width())))
        };
        h.setFont = function(a) {
            for (var b = 0; b < d.length; b++) "text" === d[b].type && d[b].setFont(a)
        };
        h.ctx = function() {
            return l
        };
        h.canv = function() {
            return t
        };
        var p = h.currentMeme = function() {
            return f[ja]
        };
        h.text = h.getText = function(a) {
            if (a !== Ba) return d[a] ? (d[a].text || "").trim() : "";
            a = "";
            for (var b = 0; b < d.length; b++) d[b].text && (a += (a ? " " : "") + d[b].text.trim());
            return a
        };
        h.boxCount = function(a) {
            for (var b = 0, c = d.length - 1; 0 <=
                c; c--) a && d[c].type !== a || b++;
            return b
        };
        h.hasDrawing = function() {
            return W
        };
        h.isEmpty = function() {
            return !h.getText() && !h.boxCount("image") && !h.hasDrawing()
        };
        h.memeData = function(a, b) {
            var c = 0,
                e = [],
                f, h = 0,
                g = 0;
            a = a || 1;
            b = b || 1;
            for (var k = 0; k < d.length; k++) f = d[k].getVals(), e.push({
                type: d[k].type,
                x: a * f[0] >> 0,
                y: b * f[1] >> 0,
                w: a * f[2] >> 0,
                h: b * f[3] >> 0
            }), "text" === d[k].type ? ($.extend(e[k], {
                    color: d[k].font_color,
                    outline_width: d[k].outline_width,
                    outline_color: d[k].outline_color,
                    text: ca ? d[k].text.toUpperCase() : d[k].text
                }), f[4] >
                c && (c = f[4])) : "image" === d[k].type && (h++, -1 !== d[k].element.src.search(Aa) && g++);
            return {
                boxes: e,
                size: c * b >> 0,
                template: 100 < p().id ? p().id : "",
                template_url: p().template_url || "",
                templates: p().templates,
                font: d[0].getFont(),
                force_caps: ca ? 1 : 0,
                num_imgs: h,
                num_scumbag_hats: g,
                has_drawing: W ? 1 : 0
            }
        };
        h.ajaxSetPositions = function() {
            for (var a = [], b = 0; b < d.length; b++) "text" === d[b].type && a.push(d[b].getVals());
            loading("Setting Meme Positions");
            $.ajax({
                url: "/ajax_set_meme_positions",
                data: {
                    meme_id: p().id,
                    positions: a
                },
                success: function() {
                    loading(!1)
                }
            })
        };
        h.reset = function() {
            $(".mm-text").val("");
            $(".gen-anon, .gen-private").attr("checked", !1);
            for (var a = d.length - 1; 0 <= a; a--) 2 > a ? d[a].text = "" : h.removeBox(a);
            $("#mm-preview-outer .draw").hasClass("set") && ga();
            ba && (M.width = M.width, W = !1);
            z()
        };
        h.removeBox = function(a) {
            d[a].$box.remove();
            d[a].$text_wrap && d[a].$text_wrap.remove();
            d.splice(a, 1)
        };
        h.select = function(a) {
            ja = a;
            var b = f[a],
                c = b.w,
                e = b.h;
            za ? (E = b.w, X = b.h) : (E = Z(b.w, b.h), X = b.h / b.w * E);
            qa = D;
            D = Math.min(E, Math.min(b.w, sa.width()));
            n = Math.min(1, D / b.w);
            $("#mm-meme-title").text(b.name ||
                "Untitled Template");
            var g;
            for (a = d.length - 1; 0 <= a; a--) "text" !== d[a].type && h.removeBox(a);
            var p = Math.min(2, d.length);
            if (b.positions) {
                g = JSON.parse(b.positions);
                for (a = d.length; a < d.length + g.length - h.boxCount("text"); a++) h.addText("middle");
                p = g.length
            } else 1 < d.length && (d[0].setAlign("top"), d[1].setAlign("bottom"));
            for (a = d.length - 1; a >= p; a--) h.removeBox(a);
            for (a = 0; a < d.length; a++) d[a].autoResize(c, e, !0), g && g[a] && (d[a].setAlign("middle"), d[a].setVals(g[a][0], g[a][1], g[a][2], g[a][3]));
            c > D && (e = D / c * e >> 0, c = D);
            ba ? (g = k(b), S.attr({
                width: E,
                height: X
            }), M && ($(M).attr({
                width: E,
                height: X
            }), U.lineWidth = 2, U.shadowBlur = 0, W = !1), l.lineWidth = 2, a = $(P).attr("src"), g !== a && ($(P).load(z), g && ("http" === g.substr(0, 4) ? P.setAttribute("crossorigin", "anonymous") : P.removeAttribute("crossorigin"), $(P).attr("src", g)))) : pa.css({
                width: c,
                height: e
            }).attr("src", 0 === b.id ? H ? H.src : "" : IMAGE_DOMAIN + b.id.toString(36) + ".jpg");
            z();
            $("#mm-meme-title").css({
                "font-weight": 700
            })
        };
        h.changeMeme = function(a) {
            a != ja && h.select(a)
        };
        h.addTextAuto = function() {
            da(1 <
                d.length ? "middle" : "top", {}, !0);
            C(!0)
        };
        h.init = function() {
            d = [];
            ja = R = ka = 0;
            var a;
            if (ba) {
                if (P = pa[0], a = S, !La) {
                    $("#drawPanel,.draw-panel").remove();
                    T = $('<div class="draw-panel clearfix">');
                    var b = $('<div class="erase l but sml" title="erase all drawing">erase</div>'),
                        c = $('<div class="draw l but sml">Draw</div>'),
                        e = $('<div title="Change Line Color"></div>'),
                        k = $('<div class="add-scumbag l but sml"><img alt="Add scumbag hat to meme" src="' + Aa + '"/> Add Scumbag Hat</div>'),
                        l = $('<div class="mm-add-img l but sml">Add Image</div>'),
                        n = $('<div class="mm-rotate l but sml" title="Rotate image"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50px" height="50px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve"><path d="M41.038,24.1l-7.152,9.342L26.734,24.1H31.4c-0.452-4.397-4.179-7.842-8.696-7.842c-4.82,0-8.742,3.922-8.742,8.742 s3.922,8.742,8.742,8.742c1.381,0,2.5,1.119,2.5,2.5s-1.119,2.5-2.5,2.5c-7.576,0-13.742-6.165-13.742-13.742 s6.166-13.742,13.742-13.742c7.274,0,13.23,5.686,13.697,12.842H41.038z"/></svg></div>');
                    T.append(b).append(c).append(e).append(l).append(k).append(n);
                    M = $("<canvas/>")[0];
                    U = M.getContext("2d");
                    Ka = $("<img/>", {
                        width: 210,
                        height: 220,
                        src: Aa
                    })[0];
                    c.click(ga);
                    b.click(function() {
                        M.width = M.width;
                        W = !1;
                        z()
                    });
                    k.click(function() {
                        d.push(new fa(Ka));
                        z();
                        C(!0)
                    });
                    n.click(J);
                    l.click(ua);
                    O.before(T);
                    ra = oa[3];
                    ma(e, 3, oa, function(a) {
                        ra = a
                    })
                }
            } else a = pa;
            1 < ya && da("top");
            0 < ya && da("bottom");
            for (b = 2; b < ya; b++) da("middle");
            var q = $("#memewrap");
            xa.keyup(function(a) {
                for (var b = q.find(".im"), c = xa.val(), e = c.toLowerCase(),
                        d = 0, k, l = -1; f[d];) k = -1 !== f[d].name.toLowerCase().search(e) || -1 !== (f[d].altNames || "").toLowerCase().search(e), b.eq(d).css("display", k ? "inline-block" : "none"), k && -1 === l && (l = d), d++;
                13 === a.which && (-1 !== l ? h.changeMeme(l) : (a = GET().stream, g.location = "/memesearch?q=" + c + (a ? "&stream=" + a : "")))
            });
            y.on("click", "#allTemplates", function() {
                var a = xa.val();
                a && $(this).attr("href", "/memesearch?q=" + encodeURIComponent(a))
            });
            a.hover(function() {
                clearTimeout(R);
                O.find(".cropBox").removeClass("off")
            }, function() {
                R = setTimeout(function() {
                        O.find(".cropBox").addClass("off")
                    },
                    10)
            }).click(function(a) {
                a.preventDefault()
            }).show();
            y.find(".mm-add-text").click(h.addTextAuto);
            y.find(".mm-all-caps").click(function() {
                ca = !ca;
                for (var a = 0; a < d.length; a++) "text" === d[a].type && d[a].setText()
            });
            y.find(".mm-reset").click(h.reset);
            y.find(".mm-toggle-drag").change(function() {
                C($(this).prop("checked"))
            });
            y.find(".gen-no-watermark").change(z);
            y.find(".mm-output-original-resolution").click(function() {
                if (h.hasDrawing() && !confirm("Changing this option will remove drawings. Are you sure you wish to continue?")) return !1;
                za = $(this).prop("checked");
                var a = p();
                h.setCanvasWidth(za ? a.w : Z(a.w, a.h));
                z()
            });
            var t = ta.width();
            700 > t && C(!1);
            $("#mm-show-upload").click(G);
            $("form").keydown(function(a) {
                if (13 == a.which) return !1
            });
            $("#genSubmit").attr("checked", !1);
            y.find(".mm-toggle-opts").click(function() {
                var a = y.find(".mm-opts"),
                    b = $(this);
                "none" === a.css("display") ? (a.slideDown(200), b.text("Hide Options \u25b2")) : (a.slideUp(200), b.text("More Options \u25bc"))
            });
            ta.resize(debounce(function() {
                var a = ta.width();
                a !== t && (t = a, h.setWidth(Math.min(p().w,
                    sa.width())))
            }))
        };
        h.initPopMemes = function() {
            $("#memetab").click(Ia);
            $("#mytab").click(wa);
            Ia()
        };
        var Da, va;
        h.addText = da;
        h.preview = z
    };
    g.ColorPicker = ma;
    g.generate = aa;
    var ia = !1;
    g.preloadShareScript = ha;
    g.imgDonePopup = ea;
    g.imgDone = fa;
    memeInit = function() {
        $(".mm-generate").click(function() {
            var f = GET().stream;
            if (f)
                if (!I.user.id) showLogin(), MSG("You must be logged in to post to a stream!");
                else {
                    if (!mm.isEmpty() || confirm("Your meme is empty. Are you sure you want to post an empty meme?")) loading("Generating Meme..."),
                        aa(function() {
                            g.location = "/m/" + f
                        }, !1, !1, f)
                }
            else aa(ua, !1, !0)
        });
        $("#shareGen").click(function() {
            $(this).select()
        });
        $(".draw").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "draw", mm.currentMeme().name])
        });
        $(".mm-add-img").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "add image", mm.currentMeme().name])
        });
        $(".add-scumbag").click(function() {
            _gaq.push(["_trackEvent", "draw panel", "add scumbag", mm.currentMeme().name])
        });
        $(".mm-rotate").click(function() {
            _gaq.push(["_trackEvent", "draw panel",
                "rotate", mm.currentMeme().name
            ])
        });
        Y.on("click", ".mm-set-positions", function() {
            mm.ajaxSetPositions()
        })
    };
    showGenerator = function(f) {
        I.user.id ? 1E3 > I.user.points ? error_dialog("You must earn 1,000 points to use meme comments!") : f.data("meme-iid") ? MSG("You already have a meme attached to this comment!", "red") : (getMemes(), Y.off("click", ".mm-generate").on("click", ".mm-generate", function() {
            mm.isEmpty() ? alert("Your meme is empty! Add something to it or click Cancel") : (loading("Generating Meme..."), aa(function(c) {
                f.data("meme-iid",
                    c.iid).addClass("has-pending-img").prepend('<img class="c-pending-img" src="//i.imgflip.com/' + c.iid.toString(36) + '.jpg"/>');
                loading(!1);
                BOX.hide()
            }, !0))
        }).off("click", ".mm-cancel").on("click", ".mm-cancel", function() {
            BOX.hide()
        })) : showLogin()
    };
    var la = g.requestAnimationFrame || g.mozRequestAnimationFrame || g.webkitRequestAnimationFrame || g.msRequestAnimationFrame;
    g.lzs = function(f) {
        var c = function() {
            var c = V.createElement("link");
            c.rel = "stylesheet";
            c.href = f;
            var g = V.getElementsByTagName("head")[0];
            g.parentNode.insertBefore(c,
                g)
        };
        la ? la(c) : g.addEventListener ? g.addEventListener("load", c) : c()
    };
    getMemes = function() {
        loading("Materializing Meme Generator...");
        $.ajax({
            dataType: "json",
            url: "/ajax_get_meme_list",
            success: function(f) {
                loading(!1);
                f.error ? error_dialog(f.error) : (BOX.show({
                    html: f.html,
                    bg: "transparent",
                    noMaskClick: !0
                }), mm = new MemeMaker(f.memes, {
                    numTexts: 2
                }), mm.init(), mm.initPopMemes(), mm.select(0))
            }
        })
    }
})(window, document, $(window), $(document));