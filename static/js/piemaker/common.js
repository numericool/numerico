$w = $(window);
$d = $(document);
(function(d, B, h, x, Y) {
    function Z(a, b, c, g) {
        b = b || 100;
        var e, d, k, q, n, p, h = function() {
            var m = +new Date;
            m - q < b && (!g || m - n < g) ? e = setTimeout(h, b - (m - q)) : (e = null, c || (p = a.apply(k, d), k = d = null))
        };
        return function() {
            k = this;
            d = arguments;
            q = +new Date;
            n || (n = +new Date);
            var g = c && !e;
            e || (e = setTimeout(h, b));
            g && (p = a.apply(k, d), k = d = null);
            return p
        }
    }

    function S(a, b) {
        b = b || 150;
        return Z(a, b, !1, b)
    }

    function aa(a) {
        a = a || d.event;
        a.cancelBubble = !0;
        a.stopPropagation && a.stopPropagation()
    }

    function v(a) {
        a = a || d.event;
        a.stopPropagation && a.stopPropagation();
        a.preventDefault && a.preventDefault();
        a.cancelBubble = !0;
        a.cancel = !0;
        return a.returnValue = !1
    }

    function ba() {
        var a = {};
        d.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(b, c, g) {
            a[c] = g
        });
        return a
    }

    function ca(a) {
        var b = a.fixed,
            c = a.pad || 0,
            g = a.w ? Math.min(a.w, h.width() - 2 * c) : "auto",
            e = a.h || "auto",
            d = a.top || 0,
            k = a.opacity || 60,
            q = a.iframe,
            n = !!a.full,
            p = a.img,
            u = $(".BOX").length;
        n && (b = !0, g = e = "100%");
        var m = $("<div/>", {
                "class": "mask-back",
                css: {
                    opacity: k / 100,
                    "z-index": 5999 + u
                }
            }),
            f = $("<div/>", {
                "class": "BOX ",
                css: {
                    width: g,
                    height: q ? e + 10 : e,
                    background: a.bg || "#fff",
                    position: b ? "fixed" : "absolute",
                    top: d,
                    padding: c,
                    "z-index": 6E3 + u
                }
            });
        n && f.css("left", 0);
        var r = function() {
                f.css("margin-left", -f.width() / 2 - c)
            },
            t = function() {
                n || (r(), b ? f.css({
                    top: "50%",
                    "margin-top": -f.height() / 2
                }) : d || f.css({
                    top: h.scrollTop() + Math.max(h.height() / 2 - f.height() / 2, 10)
                }))
            },
            v = function(a) {
                27 === a.which && w()
            },
            w = this.hide = function() {
                if (a.onclose) a.onclose();
                m.remove();
                f.remove();
                h.off("resize", r);
                x.off("keyup", v)
            };
        this.size = function(a, b, c) {
            f.width(g = a).height(e =
                b);
            c && t()
        };
        q = q ? "<iframe width=" + g + " height=" + e + ' frameborder=0 src="' + q + '"></iframe>' : "";
        p && (p = $('<img style="vertical-align:top;" src="' + p + '"/>'), k = function() {
            t();
            f.show();
            var a = p[0].height / p[0].width;
            g = "auto" === g ? Math.min(p[0].width, h.width() - 2 * c) : g;
            e = g * a;
            p.css({
                width: g,
                height: e
            })
        }, p.load(k), p[0].complete && k());
        f.html(p || q || a.html);
        a.hideX || f.append($('<div class="x">&times</div>').click(w));
        a.noMaskClick || (m.click(w), x.on("keyup", v));
        $("body").append(m).append(f);
        p || (t(), f.show());
        a.onopen && a.onopen();
        h.on("resize", r)
    }

    function C() {
        return I.user && I.user.id
    }

    function da() {
        u("Logging in...");
        $.ajax({
            url: "/ajax_login",
            type: "post",
            dataType: "json",
            data: {
                email: $("#email").val(),
                pass: $("#pass").val(),
                stayLogged: $("#stayLogged").prop("checked") ? 1 : 0
            },
            success: function(a) {
                a.error ? (u(!1), error_dialog(a.error)) : d.location.reload()
            }
        })
    }

    function ka() {
        u("Logging out...");
        var a = $.get("/ajax_logout");
        d.google_login_callback = function(b) {
            console.log(b);
            b.error ? $.when(a).done(function() {
                d.location.reload()
            }) : d.gapi.auth.signOut()
        };
        $("body").append('<div id="google-login-button" style="display:none"></div>');
        $.getScript("https://apis.google.com/js/client:platform.js?onload=render_google_login_button")
    }

    function ea() {
        var a = $("#suser").val(),
            b = $("#semail").val(),
            c = $("#pass1").val(),
            g = $("#pass2").val(),
            e = "";
        if ("" === a || "" === b || "" === c || "" === g) e += "<li>Fill in all fields!</li>";
        c !== g && (e += "<li>Password Mismatch, try again</li>"); - 1 !== a.search(" ") && (e += "<li>Username cannot contain spaces! Try dash or underscore.</li>");
        0 !== b.search(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i) &&
            (e += "<li>Type a valid email</li>");
        $(".g-recaptcha-response").val() || (e += "<li>Please verify you are not a robot</li>");
        return e ? ($("#signupMessage").html(e), !1) : !0
    }

    function H() {
        var a = '<div id="loginFrame"><div class="clear"></div><div class="loginBox"><h2>Login</h2><div id="loginMessage"></div><div id="google-login-button" class="but lrg">Login with Google</div><div class="login-or">- OR -</div><form id="lForm" method="post"><div>Email or Username</div><input id="email" name="email" type="text" autocomplete="email" value="' +
            decodeURIComponent((B.cookie.split("rootemail=")[1] || "").split(";")[0]) + '"/><div>Password <span><a href="/forgot" tabindex="-1">forgot?</a></span></div><input id="pass" name="pass" type="password"/></form><label class="stay"><input type="checkbox" id="stayLogged" name="stayLogged" checked="checked" value="1"/> Stay Logged In</label><div id="login-button" class="b but lrg loginButton">Login</div></div><div class="loginBox"><h2>Signup</h2><div id="signupMessage"></div><form id="sForm" method="post" action="/signup?redirect=' +
            d.location.href + '"><div>Email</div><input id="semail" name="email" type="email" autocomplete="email"/><div>Username</div><input id="suser" name="user" type="text"/><div>Password</div><input id="pass1" name="pass" type="password"/><div>Pass again</div><input id="pass2" type="password"/><label class="stay"><input type="checkbox" id="stay2" name="stayLogged" checked="checked" value="1"/> Stay Logged In</label><div class="g-recaptcha" data-sitekey="6Lf0rggTAAAAAAwrUfoyjuhbdFumfFFF3fgmUa8D"></div><input type="submit" class="y but lrg loginButton" value="Signup"/></form></div></div>';
        BOX.show({
            html: a,
            bg: "transparent",
            pad: 10,
            top: 50
        });
        $.getScript("https://apis.google.com/js/client:platform.js?onload=render_google_login_button");
        $.getScript("https://www.google.com/recaptcha/api.js");
        $("#lForm input").keydown(function(a) {
            13 == a.which && da()
        });
        $("#email").val() ? $("#pass").focus() : $("#semail").focus()
    }

    function V() {
        $("#miniNots").hide().find(".new").removeClass("new");
        $("#numNots").text(0).removeClass("has-nots");
        x.off("click", V)
    }

    function la(a) {
        v(a);
        var b = $("#miniNots");
        "none" === b.css("display") ?
            (b.show(), "" === b.html() && (b.html('<img class="load" src="//s.imgflip.com/preloader.gif"/>'), $.ajax({
                url: "/getNots?len=5",
                success: function(a) {
                    b.html("<div class='notifs'><a class='notif all' href='/notifications'>View All Notifications</a></div>").find(".notifs").prepend(a)
                }
            }), b.click(aa)), x.on("click", V)) : V()
    }

    function ma() {
        var a = $(this).closest(".com").attr("id").substr(3);
        confirm("Delete comment?") && $.ajax({
            url: "/ajax_com_delete",
            data: "cid=" + a,
            success: function(a) {
                !a >> 0 ? alert(a) : $("#com" + a).slideUp(function() {
                    $(this).remove()
                })
            }
        })
    }

    function na() {
        var a = $(this),
            b = a.closest(".com").attr("id").substr(3);
        confirm("Are you sure you want to flag this comment for violating the Imgflip Terms of Use? If you disagree with someone but they are not breaking the rules, use the downvote button!") && (u("Flagging comment..."), $.ajax({
            url: "/ajax_com_flag",
            data: {
                cid: b
            },
            dataType: "json",
            success: function(b) {
                u(!1);
                b.error ? error_dialog(b.error) : (MSG("Flag submitted successfully!", "green"), a.remove())
            }
        }))
    }

    function oa() {
        if (C())
            if (I.user.email_verified ||
                I.user.pro) {
                var a = $(this).closest(".com"),
                    b = a.find(".c-new-wrap");
                b[0] ? b.find(".c-new-text").val() || b.remove() : (b = $("#c-new-main").clone(), b.attr("id", ""), a.append(b), b.find(".c-new-text").focus())
            } else W();
        else H()
    }

    function W() {
        DLG("Email Verification Required", 'To leave a comment, your email address must be verified (Pro accounts and Google Login are auto-verified). If you are a new user, just check your email and find the "Verify your Imgflip email" message. Otherwise, you can either login with Google, subscribe to Imgflip Pro, or re-send the verification email using the button in your <a href="/settings">Imgflip settings</a>.')
    }

    function D(a) {
        $(a).each(function() {
            var a = $(this);
            a.data("dimImage") || (a.data("dimImage", !0), a.click(function() {
                BOX.show({
                    img: a.attr("src")
                });
                a.hasClass("ctx-gif") ? $(".BOX img").addClass("ctx-gif") : $(".BOX img").removeClass("ctx-gif")
            }))
        })
    }

    function T(a) {
        h[!1 === a ? "off" : "on"]("keydown", pa)
    }

    function pa(a) {
        if (!(a.metaKey || a.ctrlKey || a.altKey)) switch (a.which) {
            case 83:
            case 72:
                O(img.id, 0, ".img-vote-wrap");
                break;
            case 87:
            case 76:
                O(img.id, 1, ".img-vote-wrap");
                break;
            case 68:
                fa();
                break;
            case 74:
            case 39:
                $("#img-next").click();
                break;
            case 75:
            case 37:
                $("#img-prev").click();
                break;
            case 65:
                d.history.back()
        }
    }

    function fa() {
        var a, b = $(this).attr("id") || "hotkey",
            c = function() {
                a ? d.location = a : setTimeout(c, 10)
            };
        _gaq.push(["_set", "hitCallback", c]);
        _gaq.push(["_trackEvent", "Flip Nav", b, location.href]);
        $.get("/ajax_img_flip?current_iid=" + (d.img ? d.img.id >> 0 : 0), function(b) {
            a = b;
            27 === I.user.id && c()
        })
    }

    function O(a, b, c) {
        if (I.done)
            if (!C()) H();
            else if (a) {
            var g = $(c);
            c = g.find(".img-up");
            var g = g.find(".img-down"),
                e = c.hasClass("set"),
                d = g.hasClass("set"),
                k = -1;
            c.add(g).removeClass("set");
            b || d ? b && !e && (c.addClass("set"), k = 1) : (g.addClass("set"), k = 0);
            $.ajax({
                url: "/ajax_vote",
                dataType: "json",
                data: {
                    new_vote: k,
                    iid: a
                },
                success: function(a) {
                    a.error && error_dialog(a.error)
                }
            })
        }
    }

    function qa() {
        if (I.done)
            if (C()) {
                var a = $(this),
                    b = a.closest(".com").attr("id").substr(3) >> 0,
                    c = "#com" + b,
                    g = a.hasClass("set"),
                    e = a.hasClass("c-up"),
                    d = 0;
                e ? d = g ? -1 : 1 : !g && $(c + " .c-up").hasClass("set") && (d = -1);
                c = $(c + " .points").first();
                d = parseInt(c.text()) + d;
                c.text(d + (1 === d ? " up" : " ups"));
                a.parent().find(".set").removeClass("set");
                g || a.addClass("set");
                $.ajax({
                    url: "/ajax_comment_vote",
                    data: {
                        new_vote: g ? -1 : e ? 1 : 0,
                        cid: b
                    },
                    success: function(a) {
                        a && alert(a)
                    }
                })
            } else H()
    }

    function ga(a, b) {
        if (!a || submitting) return !1;
        submitting = !0;
        var c = b.data("meme-iid") >> 0,
            g = b.find(".c-new-text").val() || "",
            d = b.closest(".com"),
            R = (d.attr("id") || "").substr(3) || 0,
            k = "";
        c || g != Y && "" != g || (k += "<li>Enter some text</li>");
        "" !== k ? (error_dialog(k), submitting = !1) : (u("Adding comment..."), $.ajax({
            url: "/ajax_add_comment",
            type: "post",
            dataType: "json",
            data: {
                text: g,
                iid: a,
                comImage: c,
                parent_id: R,
                level: R ? ~~d.data("l") + 1 : 0
            },
            success: function(a) {
                if (a.error) error_dialog(a.error);
                else {
                    a = $(a.com_html);
                    if (R) b.remove(), d.after(a);
                    else {
                        b.find(".c-new-text").val("");
                        c && b.removeClass("has-pending-img").data("meme-iid", null).find(".c-pending-img").remove();
                        var g = $("#comments");
                        g.append(a);
                        g = g.offset().top + g.innerHeight() - (h.scrollTop() + h.height());
                        0 < g && $("html,body").animate({
                            scrollTop: "+=" + (g + 150)
                        })
                    }
                    D(".c-text img");
                    ha(a)
                }
            },
            complete: function() {
                u(!1);
                submitting = !1
            }
        }))
    }

    function ha(a) {
        var b =
            I.user,
            c, g, d;
        $(a || ".com").quickEach(function() {
            c = this.attr("id").substr(3);
            I.com_votes[c] && (g = "1" === I.com_votes[c] ? ".c-up" : ".c-down", this.find(g).addClass("set"));
            var a = this.data("uid");
            (4 < b.priv || b.id == a || b.id === img.stream_owner_uid) && !this.find(".c-delete")[0] && this.find(".comTitle").before('<div class="c-delete a">delete</div>');
            d = this.find(".c-text");
            d.is(":empty") && !d.data("text") || this.find(".comTitle").before('<div class="c-flag a">flag</div>')
        })
    }

    function u(a) {
        !1 === a ? (F && F.remove(), U = F = !1) :
            (F || (F = $('<div id="site-loading"><div id="site-loading-inner"><div id="site-loading-msg"></div><div id="site-loading-bar"><div id="site-loading-progress"></div></div></div></div>'), $("body").append(F)), $("#site-loading-msg").html(a || "Loading..."))
    }

    function ra() {
        var a = '<div class="img-flag-popup" data-iid="' + $(this).data("iid") + '"><div class="img-flag-title">Flag Image</div><div class="img-flag-label">Reason:</div><select class="img-flag-select"><option value></option>' + (5 <= I.user.priv ? '<option value="img-sfw">SFW</option>' :
            "") + '<option value="img-nsfw">NSFW (adult/mature content)</option><option value="img-spam">Spam (advertising, website spam, etc)</option><option value="img-abuse">Abuse (anything breaching our Terms of Service)</option></select><div class="img-flag-label">Additional Comments [optional]</div><textarea class="img-flag-text" maxlength="200"></textarea><div class="img-flag-submit b but">Submit</div><div class="img-flag-cancel l but">Cancel</div></div>';
        BOX.show({
            html: a
        })
    }

    function sa() {
        BOX.hide()
    }

    function ta() {
        var a =
            $(this).closest(".img-flag-popup"),
            b = a.data("iid"),
            c = a.find(".img-flag-select").val(),
            a = a.find(".img-flag-text").val();
        c ? (u(), $.ajax({
            url: "/ajax_flag",
            type: "post",
            dataType: "json",
            data: {
                iid: b,
                type: c,
                text: a
            },
            success: function(a) {
                u(!1);
                BOX.hide();
                $('.img-flag[data-iid="' + b + '"]').remove();
                a.error ? MSG(a.error, "red") : MSG(a.message, "green")
            }
        })) : MSG("Select a reason", "red")
    }

    function ia(a) {
        u();
        $.get("/ajax_submit_popup", {
            iid: a,
            subsLeft: I.user.subsLeft
        }, function(b) {
            u(!1);
            BOX.show({
                html: b,
                bg: "transparent"
            });
            $("#submit-submit").click(function() {
                ua(a)
            });
            $("#submit-cancel").click(function() {
                BOX.hide()
            })
        })
    }

    function ua(a) {
        BOX.hide();
        u("Submitting image...");
        $.get("/ajax_submit_creation?iid=" + a, function(a) {
            u(!1);
            a ? error_dialog(a) : BOX.show({
                html: "<h2>Image submitted successfully!</h2><p>Sharing your image will make it more likely to reach the homepage.</p>",
                w: 400,
                pad: 20
            })
        })
    }

    function ja(a, b) {
        var c = "/pro?from=" + b;
        a = a.replace(/Imgflip Pro/, '<a href="' + c + '">Imgflip Pro</a>');
        BOX.show({
            html: '<div class="pro-msg">' +
                a + '</div><a class="b but pro-learn-more" href="' + c + '">Learn More &rsaquo;</a>',
            w: 500,
            pad: 20
        })
    }

    function va() {
        var a = navigator.userAgent || navigator.vendor || d.opera;
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,
            4))
    }
    I = d.I || {
        user: {}
    };
    d._gaq = d._gaq || [];
    d.console || (console = {});
    console.log || (console.log = function() {});
    $.ajaxSetup({
        cache: !0
    });
    $(B).ajaxError(function(a, b, c, d) {
        "/" === c.url[0] && "/ajax_get_le_data" !== c.url && (_gaq.push(["_trackEvent", "ajaxError", c.url, (b.status || "") + "|" + (b.responseText || "").substr(0, 100) + "|" + d]), c.error || (u(!1), error_dialog("Request error. Try again in a minute. If this keeps happening, and other websites (e.g. google.com) still load fine, let us know with the Feedback button!")))
    });
    var X = h.width();
    $.fn.quickEach = function() {
        var a = jQuery([1]);
        return function(b) {
            var c = -1,
                d, e = this.length;
            try {
                for (; ++c < e && (d = a[0] = this[c]) && !1 !== b.call(a, c, d););
            } catch (h) {
                throw delete a[0], h;
            }
            delete a[0];
            return this
        }
    }();
    d.debounce = Z;
    d.throttle = S;
    d.stopProp = aa;
    d.cancelEvent = v;
    $.fn.fieldFill = function(a, b) {
        var c = $(this).val();
        b == Y && (b = "#666");
        "" != c && c != a || $(this).val(a).css("color", b);
        $(this).focus(function() {
            $(this).val() == a && $(this).val("").css("color", "#000")
        });
        $(this).blur(function() {
            "" == $(this).val() &&
                $(this).val(a).css("color", b)
        });
        return this
    };
    d.GET = ba;
    Array.indexOf || (Array.prototype.indexOf = function(a, b) {
        for (var c = b || 0; c < this.length; c++)
            if (this[c] == a) return c;
        return -1
    });
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    });
    webkitWarn = function(a) {
        var b = navigator.userAgent,
            c = ""; - 1 === b.search(/webkit|firefox/i) && (c += "Please note: the " + a + ' performs best in a modern web browser such as <a href="https://www.google.com/chrome">Chrome</a> or <a href="http://www.mozilla.org/firefox">Firefox</a>', -1 !== b.search(/MSIE [6-9]/) && (c += ' <p style="color:#f44">Internet Explorer versions 6-9 tend to be very error prone</p>'));
        c && $("#generator-qa").prepend("<h2>" + c + "</h2>")
    };
    var J;
    d.Box = ca;
    d.BOX = {
        show: function(a) {
            J = new ca(a)
        },
        hide: function() {
            J && J.hide()
        },
        size: function() {
            J && J.size()
        }
    };
    DLG = function(a, b) {
        BOX.show({
            html: "<p><b>" + a + "</b></p><p>" + b + "</p>",
            w: 400,
            pad: 20
        })
    };
    error_dialog = function(a) {
        DLG("Error", a)
    };
    MSG = function() {
        var a, b;
        return function(c, d, e) {
            !1 === c && a ? a.hide() : (d = d || "white", e = e || 5E3, a || (a =
                $('<div id="quick-msg">').appendTo("body")), a.html(c).css({
                "margin-left": -a.outerWidth() / 2,
                top: 10
            }).attr("class", d).stop().fadeIn(200), clearTimeout(b), b = setTimeout(function() {
                a.fadeOut(1E3)
            }, e))
        }
    }();
    d.Dragger = function(a, b, c, d) {
        function e(a, b, K, d, L) {
            m = a;
            f = b;
            r = K;
            t = d;
            c && c(m, f, r, t);
            L && p.css({
                transform: "scale3d(0,0,0)"
            });
            p.css({
                left: ~~m - 1,
                top: ~~f - 1,
                width: ~~r,
                height: ~~t
            });
            L && (p.css({
                transition: "1s",
                transform: "scale3d(1,1,1)"
            }), setTimeout(function() {
                p.css({
                    transition: ""
                })
            }, 1500))
        }

        function h(a) {
            v(a);
            K = u.width();
            z = u.height();
            G = r;
            Q = t;
            w = m;
            N = f;
            L = a.clientX;
            M = a.clientY;
            $("body").addClass("nosel");
            x.on("vmousemove", k).on("vmouseup", q)
        }

        function k(a) {
            if (l) {
                y = a.clientX - L;
                E = a.clientY - M;
                if (P)
                    if (6 === l || 8 === l) y = Math.round(P * E);
                    else if (7 === l || 9 === l) y = -Math.round(P * E);
                1 === l && (m = w + y, f = N + E, 0 > m ? m = 0 : m + r > K && (m = K - r), 0 > f ? f = 0 : f + t > z && (f = z - t));
                if (2 == l || 6 == l || 7 == l) f = N + E, t = Q - E, 0 > f ? (f = 0, t = Q + N) : t < n && (t = n, f = N + Q - n);
                else if (4 == l || 8 == l || 9 == l) t = Q + E, f + t > z ? t = z - f : t < n && (t = n);
                if (5 == l || 6 == l || 9 == l) m = w + y, r = G - y, 0 > m ? (m = 0, r = G + w) : r < n && (r = n, m = w + G - n);
                else if (3 == l || 7 == l || 8 == l) r = G + y, m + r > K ? r = K - m : r < n && (r = n);
                e(m, f, r, t)
            }
        }

        function q() {
            l = 0;
            P && (P = r / t);
            $("body").removeClass("nosel");
            x.off("vmouseup", q)
        }
        d = d || {};
        var n = d.minWidth || 20,
            p = $(a),
            u = $(b),
            m = 0,
            f = 0,
            r = n,
            t = n,
            P, w, N, G, Q, l, y, E, K, z, L, M, A = "N E S W NW NE SE SW".split(" ");
        a = "";
        for (b = 0; b < A.length; b++) a = 4 > b ? a + ('<div class="wrap' + A[b] + '"><div class="resize ' + A[b] + '" data-dir="' + A[b] + '"></div></div>') : a + ('<div class="resize ' + A[b] + '" data-dir="' + A[b] + '"></div>');
        this.getVals = function() {
            return {
                x: m,
                y: f,
                w: r,
                h: t
            }
        };
        this.setVals = e;
        this.lockRatio = function() {
            P = r / t
        };
        p.on("vmousedown", function(a) {
            l = 1;
            h(a)
        }).on("vmousedown", ".resize", function(a) {
            l = A.indexOf($(this).attr("data-dir")) + 2;
            h(a)
        });
        p.html(a)
    };
    d.hoverGifs = function(a) {
        $(a).find("a img").each(function() {
            var a = $(this)[0];
            $(this).hover(function() {
                a.src = a.src.replace(/\/2\/([a-z0-9]+)\.jpg/, "/$1.gif")
            }, function() {
                a.src = a.src.replace(/\/([a-z0-9]+)\.gif/, "/2/$1.jpg")
            })
        })
    };
    applyTips = function(a) {
        (a && a.jquery ? a.find(".tip") : "string" === typeof a ? $(a + " .tip") : $(".tip")).each(function() {
            var a,
                c = $(this);
            c.parent().hover(function(d) {
                a = setTimeout(function() {
                    var a = c.text().length,
                        b = d.clientX,
                        k = d.clientY,
                        q = h.width(),
                        n = h.height(),
                        a = Math.min(260 + a / 5 >> 0, Math.max(q - b, b) - 40);
                    c.width(a);
                    k = k > n / 2 ? k - c.height() - 20 : k + 20;
                    c.css({
                        top: k,
                        left: b > n / 2 ? b - a - 20 : b + 20
                    }).fadeIn(200)
                }, c.attr("data-delay") || 400)
            }, function() {
                clearTimeout(a);
                c.fadeOut(200)
            }).click(function() {
                clearTimeout(a)
            })
        })
    };
    d.checkSignup = ea;
    d.showLogin = H;
    d.render_google_login_button = function() {
        gapi.signin.render("google-login-button", {
            callback: "google_login_callback",
            clientid: "16163237658-20l9nkv7bci04f890j3rocd67cpdbmu0.apps.googleusercontent.com",
            cookiepolicy: "single_host_origin",
            scope: "profile email",
            redirecturi: "postmessage",
            accesstype: "offline"
        })
    };
    d.google_login_callback = function(a) {
        if (a.code)
            if ("AUTO" === a.status.method) gapi.auth.signOut();
            else {
                u("Logging in...");
                var b = ba();
                $.ajax({
                    type: "POST",
                    url: "/ajax_google_login",
                    data: {
                        code: a.code,
                        claim_iid: b.claim_iid
                    },
                    dataType: "json",
                    success: function(a) {
                        a.error ? (u(!1), error_dialog(a.error)) : b.claim_iid ? d.location =
                            "/i/" + (~~b.claim_iid).toString(36) + "?herp=" + +new Date : d.location.reload()
                    }
                })
            }
        else a.error ? console.log("There was an error: " + a.error) : console.log("wtf?!")
    };
    d.dimImage = D;
    d.navKeys = T;
    d.vote = O;
    d.comment = ga;
    var F;
    d.loading = u;
    var U;
    d.progress = function(a) {
        U || ($("#site-loading-bar").show(), U = $("#site-loading-progress"));
        U.width(100 * a + "%")
    };
    d.submitImg = ia;
    d.signCanvas = function(a, b, c, d) {
        d = d || 4E4;
        if (!(I.user.pro && !0 === $(".gen-no-watermark").prop("checked") || b * c <= d)) {
            a.save();
            a.font = "10px Arial";
            a.fillStyle =
                "#ddd";
            a.shadowBlur = 2;
            a.shadowColor = "#000";
            for (b = 0; 7 > b; b++) a.fillText("imgflip.com", 3, c - 4);
            a.restore()
        }
    };
    d.upgradeBox = ja;
    (function(a) {
        function b(b) {
            $(".main-tag").change(function() {
                var d = "",
                    c = [];
                c[0] = $("#show-other")[0];
                c[1] = $("#show-memes")[0];
                c[2] = $("#show-gifs")[0];
                for (var M = 0; 3 > M; M++) d = c[M].checked ? d + "1" : d + "0";
                _gaq.push(["_trackEvent", "main_tags", (C() ? "logged-in: " : "") + d, a.location.href]);
                $.ajax({
                    url: "/ajax_main_tags",
                    data: "cookie_tags=" + d,
                    success: b
                })
            });
            x.on("click", "#safe-button", function(a) {
                if (!I.done) return v(a);
                var d = $(this).parent().hasClass("safe-status-SFW") ? "NSFW" : "SFW",
                    c = "SFW" === d ? "NSFW" : "SFW";
                _gaq.push(["_trackEvent", "SFW Button", c + " --\x3e " + d, (C() ? "" : "not ") + "logged in"]);
                if (!C()) return v(a), H();
                $(this).parent().removeClass("safe-status-" + c).addClass("safe-status-" + d);
                $.ajax({
                    url: "/ajax_safemode",
                    data: "safe=" + d,
                    success: b
                })
            })
        }

        function d(a) {
            a && (location.href = location.href.replace(/\/\?tgz=([10]{3}|memes|gifs)/, ""))
        }

        function g(a) {
            a && $("#flip-notify").html("Your next flip will reflect your new settings").fadeIn()
        }

        function e() {
            x.on("contextmenu", ".ctx-gif", function(a) {
                var b = $(this).data("src") || $(this).attr("src");
                if (b = /\/([a-z0-9]+)\.gif/.exec(b)) return _gaq.push(["_trackEvent", "gif contextmenu", location.pathname, b[1]]), b = '<div class="img-code-menu">' + q(b[1], "gif") + "</div>", BOX.show({
                    html: b,
                    w: 360
                }), v(a)
            }).on("click", ".img-code", function() {
                $(this).select()
            }).on("click", "#img-download,.img-code", function() {
                _gaq.push(["_trackEvent", $(this).attr("class"), location.pathname, $(this).attr("href")])
            })
        }

        function R() {
            x.on("vclick",
                ".pause-gif",
                function(a) {
                    var b = $(this),
                        d = b.find("img"),
                        c = d.attr("src");
                    c && (d.attr("src", c.replace("/2/", "/").replace(".jpg", ".gif")), b.removeClass("pause-gif"));
                    return v(a)
                })
        }

        function k() {
            $(".img-embed-codes").each(function() {
                var a = $(this);
                a.html() || a.html(q(img.id.toString(36), img.type, !1, !0, img.generator));
                a.toggle()
            })
        }

        function q(a, b, d, c, g) {
            var e, f;
            switch (g) {
                case "gif":
                    e = "GIF Maker";
                    f = "gifgenerator";
                    break;
                case "meme":
                    e = "Meme Generator";
                    f = "memegenerator";
                    break;
                case "pie":
                    e = "Pie Chart Maker", f = "piemaker"
            }
            var l =
                a + "." + b,
                k = "https://i.imgflip.com/" + l,
                m = "https://imgflip.com/" + ("gif" === b ? "gif/" : "i/") + a,
                h = "";
            d || (h += '<div class="img-code-wrap"><div class="img-code-label">Image Link:</div><input type="text" class="img-code link" value="' + m + '"/></div><div class="img-code-wrap"><div class="img-code-label">BBCode (forums):</div><input type="text" class="img-code forum" value="' + ("[url=" + m + "][img]" + k + "[/img][/url]" + (e ? "[url=https://imgflip.com/" + f + "]via Imgflip " + e + "[/url]" : "")) + '"/></div><div class="img-code-wrap"><div class="img-code-label">Image HTML:</div><input type="text" class="img-code html" value=\'' +
                ('<a href="' + m + '"><img src="' + k + '"' + (g ? ' title="made at imgflip.com"' : "") + "/></a>") + "'/></div>");
            c || (c = "", "undefined" != typeof B.createElement("a").download ? (a = d ? "https://i2.imgflip.com/" + l : k, c = ' download="' + l + '"') : a = "/download_image?idsmall=" + a + "&ext=" + b, h += '<div class="img-code-wrap"><a target="_blank" id="img-download" class="img-download l but" href="' + a + '"' + c + ">Download Image</a></div>");
            return h
        }

        function n(a, b, d, c) {
            c = c.replace(/"/g, "&quot;");
            var e = "https://imgflip.com/" + ("gif" === d ? "gif/" : "i/") +
                b;
            b = "http://i.imgflip.com/" + b + "." + d;
            $(a).html('<div class="pw-widget pw-size-large" pw:image="' + b + '" pw:url="' + e + '"' + (c ? ' pw:title="' + c + '"' : "") + ' pw:twitter-via="imgflip"><a class="pw-button-facebook"></a><a class="pw-button-twitter"></a><a class="pw-button-reddit"></a><a class="pw-button-tumblr"></a><a class="pw-button-pinterest"></a><a class="pw-button-post"></a></div>');
            p()
        }

        function p() {
            a.post_init ? post_init() : setTimeout(p, 50)
        }

        function F(a, b, d, c) {
            if (I.user.pro) return "";
            var e = "display:inline-block;vertical-align:top;";
            b && d && (e += "width:" + b + "px;height:" + d + "px;");
            b = b && d ? "" : " imgflip-banner-top";
            $.getScript("//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
            return '<div class="ad" data-slot="' + a + '"><ins class="adsbygoogle' + b + '" style="' + e + '" data-ad-client="ca-pub-2078578220372194" data-ad-slot="' + a + '"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});\x3c/script>' + (c ? '<div class="ad-pro-callout">tip: <a href="/pro?from=side_ad">Pro users don\'t see ads</a></div>' : "") + "</div>"
        }

        function m(b, d) {
            var c =
                B.createElement("script");
            c.id = "rc_" + Math.floor(1E3 * Math.random());
            c.type = "text/javascript";
            c.src = "https://trends.revcontent.com/serve.js.php?w=" + b + "&t=" + c.id + "&c=" + (new Date).getTime() + "&width=" + (a.outerWidth || B.documentElement.clientWidth);
            c.async = !0;
            B.getElementById(d).appendChild(c)
        }

        function f() {
            $.ajax({
                url: "/ajax_change_table",
                data: "toImages=" + img.id,
                success: function(a) {
                    a ? alert(a) : $("#toImages").fadeOut()
                }
            })
        }

        function r() {
            $.ajax({
                url: "/ajax_moderate",
                type: "post",
                data: "action=approve&live=1&iid=" +
                    img.id,
                success: function() {
                    $("#img-approve").fadeOut()
                }
            })
        }

        function t() {
            $.ajax({
                url: "/ajax_moderate",
                type: "post",
                data: "action=disapprove&iid=" + img.id,
                success: function() {
                    $("#img-disapprove").fadeOut()
                }
            })
        }

        function P() {
            confirm("Permanently delete this image?") && (u("Deleting Image..."), $.ajax({
                url: "/ajax_img_delete",
                data: "iid=" + img.id,
                success: function(b) {
                    b ? (u(!1), MSG(b, "red")) : a.location = "/creations"
                }
            }))
        }

        function w() {
            $("#img-update").replaceWith("<p>Updating...</p>");
            $.ajax({
                url: "/ajax_img_update",
                data: {
                    iid: img.id,
                    title: $("#img-title-edit").val(),
                    tags: $("#img-tags-edit").val(),
                    desc: $("#img-desc-edit").val(),
                    main_tag: $('input[name="img-main-tag-edit"]:checked').val()
                },
                success: function(b) {
                    b ? alert(b) : a.location = a.location.href.replace(/\?lerp=[0-9]+/, "") + "?lerp=" + +new Date
                }
            })
        }

        function N() {
            N.done || (N.done = !0, $(this).removeClass("l but sml").html("Loading..."), G())
        }

        function G() {
            $.ajax({
                url: "/ajax_img_admin",
                data: {
                    iid: img.id
                },
                success: function(a) {
                    $("#img-edit-btn").remove();
                    $("#img-admin").append(a)
                }
            })
        }

        function Q(a) {
            va() &&
                $(a).each(function() {
                    var a = $(this),
                        b = !0;
                    a.parent().parent().addClass("pause-gif");
                    a.on("vclick", function(d) {
                        a.parent().parent().removeClass("pause-gif");
                        a[0].play();
                        if (b) return b = !1, v(d)
                    })
                })
        }

        function l() {
            var a = I.user,
                b = a.cookie_tags,
                d = ["other", "memes", "gifs"];
            if (a.id) {
                if (a.id === img.uid || a.id === img.stream_owner_uid || 4 < a.priv) {
                    var c = "",
                        c = img.submitted ? img.featured ? "<span class='my-label-featured'>Featured</span>" : "<span class='my-label-submitted'>Submitted</span>" : "<span class='my-submit-btn l but sml' data-iid='" +
                        img.id + "'>Submit Image</span>",
                        c = '<div id="img-admin" class="fPane clearfix"><div class="my-submit-status">' + c + "</div>" + (img.featured ? "" : '<div id="img-edit-btn" class="l but sml">Edit Image</div>') + '<div id="img-delete" class="l but sml">Delete Image</div></div>';
                    $("#fNav").after(c);
                    x.on("click", "#img-edit-btn", N).on("click", "#img-delete", P).on("click", "#img-update", w).on("click", "#img-approve", r).on("click", "#img-disapprove", t).on("click", "#toImages", f);
                    4 < a.priv && G()
                }
                "1" === I.vote && $(".img-up").addClass("set");
                "0" === I.vote && $(".img-down").addClass("set");
                ha()
            }
            a = 0 < a.flags ? "NSFW" : "SFW";
            $(".main-tags").append('<label class="safe-status-' + a + '"><input id="safe-button" type="checkbox"' + ("NSFW" === a ? " checked" : "") + " /> NSFW</label>");
            for (a = 0; 3 > a; a++) "1" === b.charAt(a) && $("#show-" + d[a]).prop("checked", !0);
            I.can_claim && $("#img-panel").before('<div class="ibox img-claim-msg">You created this image, but you were not logged in. You\'ll only be able to claim it for up to an hour after you created it. <a href="/login?claim_iid=' +
                img.id + '">Login to claim or delete it</a></div>')
        }

        function y(a) {
            v(a);
            $(this).closest(".menu-wrap").find(".menu").toggle()
        }

        function E() {
            var b = I.user,
                c, d;
            b.id ? ($(".gen-anon-wrap").show(), b.pro && ($("#logo").after('<div id="pro-logo">pro</div>'), $(".pro-callout").remove()), c = '<a href="/user/' + b.user + '">Profile</a><a href="/creations">My Images</a><a href="/notifications" id="menu-nots">Notifications</a><a href="/settings">Settings</a><a id="aLogout" href="javascript:void(0)">Logout</a>', d = '<span id="u-user">' +
                b.user + '</span> <small>(<span id="u-points">' + b.points + "</span>)</small> ", $("#userTitle").after('<div id="numNots"' + (b.nots ? ' class="has-nots"' : "") + ">" + b.nots + "</div>")) : ($(".gen-login-wrap").show(), $("#u-anon").show(), c = '<a href="javascript:void(0)" class="show-login">Login</a><a href="/signup">Signup</a>', d = "Login ");
            $("#userMenu").html(c);
            $("#u-long").html(d);
            switch (a.location.pathname.split("/")[1]) {
                case "memegenerator":
                    !b.pro && a.sfw && $(".head").prepend(F("2970038127"));
                    b.pro && $(".gen-no-watermark-wrap").show();
                    8 < b.priv && $(".gen-wrap").append('<div class="mm-set-positions l but">[]</div>');
                    break;
                case "gifgenerator":
                case "images-to-gif":
                    b.pro || $(".head").prepend(F("9016571729"));
                    break;
                case "i":
                case "gif":
                    l();
                    990 <= X && !b.pro && !img.author_pro && img.featured && !a.disable_rc && 2 <= $(".com").length && ($(".img-hotkeys").after('<div class="img-sidebar-ad"><div id="rcjsload_18e3c6"></div></div>'), m(24852, "rcjsload_18e3c6"));
                    break;
                case "":
                case "meme":
                    if (b.pro || 0 === a.sfw || a.disable_rc) break;
                    1086 <= X && 3 <= a.num_images && ($("#base-right").append('<div class="base-ad"><div id="rcjsload_e74494"></div></div>'),
                        m(23680, "rcjsload_e74494"));
                    if (5 < a.num_images) {
                        var e = h.height(),
                            g = x.height(),
                            f = !1;
                        h.scroll(S(function() {
                            !f && h.scrollTop() + e > g / 2 && (f = !0, $("#base-left").find(".pager").after('<div class="pager-ad"><div id="rcjsload_f6f896"></div></div>'), m(24849, "rcjsload_f6f896"))
                        }))
                    }
            }
        }
        a.embedCodes = q;
        a.insertShares = n;
        a.adsenseCode = F;
        a.form_values = function(a) {
            var b = {};
            a.find("input,textarea,select").each(function() {
                var a = $(this);
                switch (a.attr("type")) {
                    case "checkbox":
                        b[a.attr("name")] = a.prop("checked") ? 1 : 0;
                        break;
                    case "submit":
                        break;
                    default:
                        b[a.attr("name")] = a.val()
                }
            });
            return b
        };
        I.done && E();
        $(function() {
            nt = nt_off = nt_on = 0;
            $(".menu-wrap").each(function() {
                var a = $(this),
                    b = a.find(".menu");
                a.hover(function() {
                    b.show()
                }, function() {
                    b.hide()
                })
            });
            x.on("vclick", ".my-submit-btn", function() {
                ia($(this).attr("data-iid"))
            }).on("click", ".img-flag-cancel", sa).on("click", ".img-flag-submit", ta).on("click", ".img-flag", ra).on("vclick", ".img-flip", fa).on("submit", "#sForm", ea).on("click", "#login-button", da).on("vclick", ".menu-btn", y).on("click", ".show-login",
                H).on("vclick", "#numNots", la).on("vclick", "#aLogout", ka).on("click", ".gen-no-watermark", function(a) {
                if (!I.done) return !1;
                if (!I.user.pro) return ja("You can remove our watermark and get a bunch of other cool upgrades with Imgflip Pro!", ({
                    "/gifgenerator": "vgif",
                    "/images-to-gif": "igif"
                }[location.pathname] || location.pathname) + "_watermark"), v(a)
            });
            1120 < X && "/m/" !== a.location.pathname.substr(0, 3) && $("body").append('<a rel="nofollow" target="_blank" href="/feedback?url=' + a.location.href + '"><div class="feedback">Feedback</div></a>');
            applyTips();
            e();
            R()
        });
        a.initHome = function() {
            var e = $(".base-unit").eq(5),
                g = S(function() {
                    100 > e.offset().top - h.height() - h.scrollTop() && ($("div.base-img").quickEach(function() {
                        this.replaceWith('<img class="' + this.attr("class") + '" src="' + this.data("src") + '" alt="' + this.data("alt") + '"/>')
                    }), h.off("scroll", g))
                });
            e[0] && (h.on("scroll", g), g());
            p();
            x.on("vclick", ".base-toggle-main-tags", function(a) {
                $(".main-tags").toggleClass("force-show");
                return v(a)
            }).on("vclick", ".base-toggle-leaderboard", function(a) {
                $("#base-right,#leaderboard").toggleClass("force-show");
                return v(a)
            }).on("vclick", ".base-img-more-btn", function(b) {
                var c = $(this),
                    d = c.closest(".base-img-wrap-wrap"),
                    e = c.data("prev_height");
                e && a.scrollTo(0, $(a).scrollTop() - d.outerHeight() + e);
                c.data("prev_height", e ? !1 : d.height());
                d.toggleClass("base-img-showing-more", !e);
                c.text(e ? "Show More" : "Show Less");
                return v(b)
            });
            Q("video.base-img");
            b(d)
        };
        a.initFlip = function() {
            if (a.img) {
                fetching = submitting = 0;
                hasComs = !0;
                lastCom = 0;
                b(g);
                D("#im");
                $("#c-new-main").find(".c-new-text").focus(function() {
                    I.done && !C() ? H() : !I.done ||
                        I.user.email_verified || I.user.pro || W()
                });
                $("#img-prev,#img-next").click(function(b) {
                    var c = $(this).attr("href");
                    _gaq.push(["_set", "hitCallback", function() {
                        a.location = c
                    }]);
                    _gaq.push(["_trackEvent", "Flip Nav", $(this).attr("id"), location.href]);
                    27 === I.user.id && (a.location = c);
                    v(b)
                });
                $(".img-down").click(function() {
                    O(img.id, 0, this.parentNode)
                });
                $(".img-up").click(function() {
                    O(img.id, 1, this.parentNode)
                });
                D(".c-text img");
                n("#fShare", img.id.toString(36), img.type, B.title.split(" - Imgflip")[0].split(/ Meme$/)[0]);
                $("#img-embed-codes-btn").click(k);
                T();
                x.on("focus", "input,textarea", function() {
                    T(!1)
                }).on("blur", "input,textarea", T).on("click", ".bad-com", function() {
                    var a = $(this),
                        b = a.closest(".com"),
                        c = b.find(".c-text");
                    c.append('<div class="c-textonly">' + c.data("text") + "</div>");
                    b.removeClass("hidden");
                    for (b = b.next(); b.hasClass("child-of-bad");) b.removeClass("child-of-bad"), b = b.next();
                    a.remove()
                }).on("click", ".c-up,.c-down", qa).on("click", ".c-delete", ma).on("click", ".c-reply", oa).on("click", ".c-flag", na).on("click",
                    ".c-add-btn",
                    function() {
                        ga(img.id, $(this).closest(".c-new-wrap"))
                    }).on("click", ".c-meme-btn", function() {
                    I.done && !C() ? H() : !I.done || I.user.email_verified || I.user.pro ? I.done && C() && showGenerator($(this).closest(".c-new-wrap")) : W()
                }).on("click", ".comRight", function(a) {
                    if (-1 !== ["com", "comRight", "c-text", "comStats"].indexOf($(a.target).attr("class"))) {
                        a = $(this).closest(".com");
                        for (var b = ~~a.data("l"), c = a.next(), d = a.hasClass("collapsed"), e = !1; ~~c.data("l") > b;) d ? c.show() : c.hide(), c = c.next(), e = !0;
                        e && a.toggleClass("collapsed", !d)
                    }
                }).on("click", ".c-img-link", function() {
                    var a = $(this);
                    a.data("shown") ? (a.next(".c-img").hide(), a.data("shown", !1)) : (a.after('<img class="c-img" src="//' + a.text().split(" ")[0] + '"/>'), D(a.next()), a.data("shown", !0))
                });
                var c = $(".com").eq(7),
                    d = S(function() {
                        100 > c.offset().top - h.height() - h.scrollTop() && ($(".c-lazy-img").quickEach(function() {
                            this.replaceWith('<img src="' + this.data("src") + '" alt="' + this.attr("alt") + '"/>')
                        }), h.off("scroll", d), D(".c-text img"))
                    });
                c[0] && (h.on("scroll", d), d());
                "gif" === img.type &&
                    Q("video#vid")
            }
        };
        a.initData = E
    })(d);
    (function(a, b, c, d) {
        function e(a) {
            for (; a && "undefined" !== typeof a.originalEvent;) a = a.originalEvent;
            return a
        }

        function h(b) {
            for (var c = {}, d, e; b;) {
                d = a.data(b, w);
                for (e in d) d[e] && (c[e] = c.hasVirtualBinding = !0);
                b = b.parentNode
            }
            return c
        }

        function k() {
            y && (clearTimeout(y), y = 0);
            y = setTimeout(function() {
                D = y = 0;
                L.length = 0;
                M = !1;
                A = !0
            }, a.vmouse.resetTimerDuration)
        }

        function q(b, c, f) {
            var h, l;
            if (!(l = f && f[b])) {
                if (f = !f) a: for (f = c.target; f;) {
                    if ((l = a.data(f, w)) && (!b || l[b])) break a;
                    f = f.parentNode
                }
                l =
                    f
            }
            if (l) {
                h = c;
                f = h.type;
                var k, m;
                h = a.Event(h);
                h.type = b;
                b = h.originalEvent;
                l = a.event.props; - 1 < f.search(/^(mouse|click)/) && (l = F);
                if (b)
                    for (m = l.length, k; m;) k = l[--m], h[k] = b[k]; - 1 < f.search(/mouse(down|up)|click/) && !h.which && (h.which = 1);
                if (-1 !== f.search(/^touch/) && (k = e(b), f = k.touches, k = k.changedTouches, b = f && f.length ? f[0] : k && k.length ? k[0] : d))
                    for (f = 0, l = G.length; f < l; f++) k = G[f], h[k] = b[k];
                a(c.target).trigger(h)
            }
            return h
        }

        function n(b) {
            var c = a.data(b.target, x);
            M || D && D === c || !(c = q("v" + b.type, b)) || (c.isDefaultPrevented() &&
                b.preventDefault(), c.isPropagationStopped() && b.stopPropagation(), c.isImmediatePropagationStopped() && b.stopImmediatePropagation())
        }

        function p(b) {
            var c = e(b).touches,
                d;
            c && 1 === c.length && (d = b.target, c = h(d), c.hasVirtualBinding && (D = H++, a.data(d, x, D), y && (clearTimeout(y), y = 0), z = A = !1, d = e(b).touches[0], E = d.pageX, K = d.pageY, q("vmouseover", b, c), q("vmousedown", b, c)))
        }

        function u(a) {
            A || (z || q("vmousecancel", a, h(a.target)), z = !0, k())
        }

        function m(b) {
            if (!A) {
                var c = e(b).touches[0],
                    d = z,
                    f = a.vmouse.moveDistanceThreshold,
                    g = h(b.target);
                (z = z || Math.abs(c.pageX - E) > f || Math.abs(c.pageY - K) > f) && !d && q("vmousecancel", b, g);
                q("vmousemove", b, g);
                k()
            }
        }

        function f(a) {
            if (!A) {
                A = !0;
                var b = h(a.target),
                    c;
                q("vmouseup", a, b);
                !z && (c = q("vclick", a, b)) && c.isDefaultPrevented() && (c = e(a).changedTouches[0], L.push({
                    touchID: D,
                    x: c.clientX,
                    y: c.clientY
                }), M = !0);
                q("vmouseout", a, b);
                z = !1;
                k()
            }
        }

        function r(b) {
            b = a.data(b, w);
            var c;
            if (b)
                for (c in b)
                    if (b[c]) return !0;
            return !1
        }

        function t() {}

        function v(b) {
            var c = b.substr(1);
            return {
                setup: function() {
                    r(this) || a.data(this, w, {});
                    a.data(this,
                        w)[b] = !0;
                    l[b] = (l[b] || 0) + 1;
                    1 === l[b] && B.bind(c, n);
                    a(this).bind(c, t);
                    C && (l.touchstart = (l.touchstart || 0) + 1, 1 === l.touchstart && B.bind("touchstart", p).bind("touchend", f).bind("touchmove", m).bind("scroll", u))
                },
                teardown: function() {
                    --l[b];
                    l[b] || B.unbind(c, n);
                    C && (--l.touchstart, l.touchstart || B.unbind("touchstart", p).unbind("touchmove", m).unbind("touchend", f).unbind("scroll", u));
                    var d = a(this),
                        e = a.data(this, w);
                    e && (e[b] = !1);
                    d.unbind(c, t);
                    r(this) || d.removeData(w)
                }
            }
        }
        var w = "virtualMouseBindings",
            x = "virtualTouchID";
        b = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" ");
        var G = "clientX clientY pageX pageY screenX screenY".split(" "),
            F = a.event.props.concat(a.event.mouseHooks ? a.event.mouseHooks.props : []),
            l = {},
            y = 0,
            E = 0,
            K = 0,
            z = !1,
            L = [],
            M = !1,
            A = !1,
            C = "addEventListener" in c,
            B = a(c),
            H = 1,
            D = 0,
            O;
        a.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        };
        for (var J = 0; J < b.length; J++) a.event.special[b[J]] = v(b[J]);
        C && c.addEventListener("click", function(b) {
            var c = L.length,
                d =
                b.target,
                e, f, g, h, k;
            if (c)
                for (e = b.clientX, f = b.clientY, O = a.vmouse.clickDistanceThreshold, g = d; g;) {
                    for (h = 0; h < c; h++)
                        if (k = L[h], g === d && Math.abs(k.x - e) < O && Math.abs(k.y - f) < O || a.data(g, x) === k.touchID) {
                            b.preventDefault();
                            b.stopPropagation();
                            return
                        }
                    g = g.parentNode
                }
        }, !0)
    })(jQuery, d, B)
})(window, document, $w, $d);