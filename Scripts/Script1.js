$(document).ready(function() {
    //100 kutunun oluşumu   
    KutulariOlustur();

    //Açılış Animasyon
    // $("#divKutular>p").animate({ "border-radius": "5px" }, 3000);

    //kutuların id leri ve fazla kutuları gizleme
    Kutuİdleri();

    //kutulara numara verme, kılavuz kutuları belirleme, sayacı artırma, kutuları pasif aktif yapma
    KutularinClikEventi();

});

// saat fonksiyonu
var saniye = 0,
    dakika = 0,
    saat = 0;

function Saat() {
    if (saniye < 59) saniye = saniye + 1;
    else {
        saniye = 0;
        if (dakika < 59) dakika = dakika + 1;
        else {
            dakika = 0;
            saat = saat + 1;
        }
    }
    $("#divSaat").text(saat + " : " + dakika + " : " + saniye);
}

//Kutuları oluşturan Fonksiyon(dinamik)
function KutulariOlustur() {
    for (var i = 1; i < 197; i++) {
        $("<p>").appendTo("#divKutular").css({
            "float": "left",
            "height": "40px",
            "width": "40px",
            "margin": "0px",
            "background-color": "salmon",
            "font-family": "Arial",
            "font-size": "30px",
            "text-align": "center",
            "background-image": "url(Images/kare2.png)",
            "background-repeat": "no-repeat",
            "background-size": "40px"
        });
    }
}

//Kutulara id veren fonksiyon
function Kutuİdleri() {
    $("#divKutular p").each(function(i) {
        $(this).attr("id", i);

        // fazlalık kutuları görünmez yapar ve textlerine 1 verir.
        if (i >= 0 && i <= 27 || i >= 168 && i <= 195 || i % 14 == 0 || i % 14 == 1 || i % 14 == 12 || i % 14 == 13) { $(this).css({ "visibility": "hidden" }).text("1") };

    });
}

//Kutuların Click Event i=kutulara numara verme, kılavuz kutuları belirleme, sayacı artırma, kutuları pasif aktif yapma

var sayac = 1; // kutuları her tıkta bir artırır.
var sayacOyunSonu = 0; // hale yapacak kutu kalmayınca oyunu bitirmek için
var rekorsure; // oyun sonunda rekor sureyi alır
var skor = 0;

function KutularinClikEventi() {

    $("#divKutular").on("click", "p", function() {
        // ilk tıklama ile saay fonksiyonu çalışmaya başlar + divSaat e ve divSkor a ilk text lerini verir
        if (sayac == 1) {
            setInterval(Saat, 1000);
            $("#divSaat").text("0 : 0 : 0");
            $("#divSkor").text("0");
        }

        //tıklanan kutunun id sini alır
        var k = $(this).attr("id");

        //kutulara sayı koyar
        if ($(this).text() == "") {
            $(this).text(sayac);
            sayac++;
        }

        $("#divKutular p").each(function(i) {
            $(this).attr("id", i);

            //hamle yapılabilecek kutuları belirler (kılavuz kutular)
            if ($(this).text() == "" && (i == parseInt(k) + 3 || i == k - 3 || i == parseInt(k) + 42 || i == k - 42 || i == k - 26 || i == k - 30 || i == parseInt(k) + 30 || i == parseInt(k) + 26)) {
                $(this).css({ "background": "lightblue", "cursor": "pointer" });
                $(this).prop("disabled", false);
                sayacOyunSonu++;
            }
            //tıklanan kutuyu mavili kutu yapar
            else if (i == k) {
                $(this).css({
                    "background-image": "url(Images/kare.png)",
                    "background-repeat": "no-repeat",
                    "background-size": "40px",
                    "background-color": "salmon"
                });
            }
            // hamle yapılamayan kutuları pasif yapar
            else {
                $(this).css({
                    "background-image": "url(Images/kare2.png)",
                    "background-repeat": "no-repeat",
                    "background-size": "40px",
                    "background-color": "salmon"
                });
                $(this).prop("disabled", true);
                $(this).css({ "cursor": "default" });
            }
        });
        skor = skor + sayac - 1;
        $("#divSkor").text(skor);

        //hamle yapacak kutu kalmayınca divSaat alta divSaat üste geçer ve zaman durmuş gibi gözükür. son süreyi divSure ye yazdırır
        if (sayacOyunSonu == 0) {
            $("#divSaat2").text($("#divSaat").text());
            $("#divSaat").css({ "visibility": "hidden" });
            $("#divSaat2").css({ "visibility": "visible" });
            $("#divSure").text($("#divSaat").text());
        }
        sayacOyunSonu = 0;

    });


}