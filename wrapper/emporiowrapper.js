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
                console.log("--EMPORIO--");
                var $ = res.$;
                var productName = $('.productName').first().text();
                var conteudo = $('.value-field.Volume').text();
                var classificacao = $('.value-field.Tipo').text();
                var uva = $('.value-field.Uva').text();
                var teor = $('.value-field.Teor-Alcoolico').text();
                //console.log($('.fichaTecnica ul').first().text());
                console.log('nome: ' + productName.trim());
                console.log('conteudo: ' + conteudo.trim());
                console.log('classificacao: ' + classificacao);
                console.log('uva: ' + uva);
                console.log('teor: ' + teor);
                //console.log($('.fichaTecnica ul li').children().text());
    
                console.log("-- FIM EMPORIO--\N");
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
                });
            }
            done();
        }
    });

    crawler.queue(url);

};