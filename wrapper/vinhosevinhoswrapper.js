const Crawler = require('crawler');
var mongoose = require('mongoose');
var Wine = require('./models/Wine');

module.exports = function(url){
    var crawler =new Crawler({
    rateLimit: 2000,
    maxConnections: 1,
    callback: function(error, res, done) {
        if(error) {
            console.log(error)
        } else {
            console.log("--VIHNOS E VINHOS--");
            var $ = res.$;
            var productName = $('.product-name').text();
            var conteudo = $('#product-attribute-specs-table').children().eq(7).children().eq(1).text();
            var classificacao = $('#product-attribute-specs-table').children().eq(5).children().eq(1).text();
            var uva = $('#product-attribute-specs-table').children().eq(4).children().eq(1).text();
            var teor = $('.alcool').text();
            //console.log($('.fichaTecnica ul').first().text());
            console.log('nome: ' + productName.trim());
            console.log('conteudo: ' + conteudo.trim());
            console.log('classificacao: ' + classificacao);
            console.log('uva: ' + uva);
            console.log('teor: ' + teor);
            //console.log($('.fichaTecnica ul li').children().text());
        }
        console.log("-- FIM VINHOS E VINHOS--");
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
        done();
    }
});

    crawler.queue(url);

};