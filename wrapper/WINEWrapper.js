const Crawler = require('crawler');
var Wine = require('./models/Wine');

module.exports = function(url){
    var crawler = new Crawler({
        rateLimit: 2000,
        maxConnections: 1,
        callback: function(error, res, done) {
            if(error) {
                console.log(error);
            } else {
    
                console.log("--WINE--");
                var $ = res.$;
                var productName = $('#boxProduto h1').first().text();
                var conteudo = $('.fichaTecnica ul li').children().eq(1).text();
                var classificacao = $('.fichaTecnica ul li').children().eq(5).text();
                var uva = $('.fichaTecnica ul li').children().eq(7).text();
                var teor = $('.fichaTecnica ul li').children().eq(9).text();
                //console.log($('.fichaTecnica ul').first().text());
                console.log('nome: ' + productName.trim());
                console.log('conteudo: ' + conteudo.trim());
                console.log('classificacao: ' + classificacao);
                console.log('uva: ' + uva);
                console.log('teor: ' + teor);
    
                console.log("--WINE FIM--\n");
                //console.log($('.fichaTecnica ul li').children().text());
                var wine = new Wine({
                    titulo: productName.trim(),
                    volume: conteudo.trim(),
                    uva: uva,
                    teorAlcoolico: teor,
                    classificacao: classificacao, 
                    URL: url
                });
                wine.save(function (err) {
                    if (err){
                        done();
                    }
                    console.log(productName + " SAVED SUCCESS");
                })
            }
            done();
        }
    });

    crawler.queue(url);
};

