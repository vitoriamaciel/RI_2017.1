const Crawler = require('crawler');
var mongoose = require('mongoose');
var Wine = require('./models/Wine');

var wineWrapper = require('./WINEWrapper');
   

var emporioWrapper = require('./emporiowrapper');
 

var vinhosevinhosWrapper = require('./vinhosevinhoswrapper');
   

var links = 
[
    'https://www.wine.com.br/vinhos/fortificado/cVINHOS-atTIPO_FORTIFICADO-p1.html',0,
    'https://www.wine.com.br/vinhos/fortificado/tipo',0,
    'https://www.wine.com.br/vinhos/gonzalez-byass-tio-pepe-jerez-fino-d-o/prod3003.html',1,
    'https://www.wine.com.br/vinhos/jp-d-o-moscatel-de-setubal-2013-com-cartucho/prod16290.html#comentarios',0,
    'https://www.wine.com.br/vinhos/cVINHOS-p1.html',0,
    'https://www.wine.com.br/cervejas/cCERVEJAS-p1.html',0,
    'https://www.wine.com.br/vinhos/marsala-vergine-soleras-dop/prod11984.html',1,
    'https://www.wine.com.br/vinhos/taylors-porto-select-reserva/prod10728.html',1,
    'https://www.wine.com.br/vinhos/gonzalez-byass-solera-1847-jerez-cream-d-o/prod11913.html#comentarios',1,
    'https://www.wine.com.br/acessorios/cACESSORIOS-p1.html',0,
    'https://www.wine.com.br/vinhos/fortificado/cVINHOS-atTIPO_FORTIFICADO-p1.html#',0,
    'https://www.wine.com.br/vinhos/vinho-do-porto-ferreira-branco/prod1677.html#comentarios',0,
    'https://www.wine.com.br/vinhos/taylors-porto-fine-tawny/prod10727.html#comentarios',0,
    'https://www.wine.com.br/vinhos/jp-d-o-moscatel-de-setubal-2013-com-cartucho/prod16290.html',1,
    'https://www.wine.com.br/vinhos/marsala-vergine-soleras-dop/prod11984.html#comentarios',1,
    'https://www.wine.com.br/vinhos/vinho-do-porto-ferreira-branco/prod1677.html',1,
    'https://www.wine.com.br/vinhos/gonzalez-byass-solera-1847-jerez-cream-d-o/prod11913.html',1,
    'https://www.wine.com.br/vinhos/taylors-porto-select-reserva/prod10728.html#comentarios',1,
    'https://www.wine.com.br/gourmet/cGOURMET-p1.html',0,
    'https://www.wine.com.br/vinhos/espumante/cVINHOS-atTIPO_ESPUMANTE-p1.html',0,
    'https://www.wine.com.br/vinhos/taylors-porto-fine-tawny/prod10727.html',1,
    'https://www.wine.com.br/vinhos/vinho-do-porto-ferreira-ruby/prod1678.html#comentarios',1,
    'https://www.wine.com.br/vinhos/frisante/cVINHOS-atTIPO_FRISANTE-p1.html',0,
    'https://www.wine.com.br/vinhos/bacalhoa-moscatel-de-setubal-colheita-d-o-setubal-2014/prod17600.html',1,
    'https://www.wine.com.br/vinhos/tinto/cVINHOS-atTIPO_TINTO-p1.html',0,
    'https://www.wine.com.br/vinhos/branco/cVINHOS-atTIPO_BRANCO-p1.html',0,
    'https://www.wine.com.br/vinhos/vinho-do-porto-ferreira-ruby/prod1678.html',1,
    'https://www.wine.com.br/outras-bebidas/cOUTRAS_BEBIDAS-p1.html',0,
    'https://www.wine.com.br/vinhos/rose/cVINHOS-atTIPO_ROSE-p1.html',0,
    'https://www.wine.com.br/vinhos/bacalhoa-moscatel-de-setubal-colheita-d-o-setubal-2014/prod17600.html#comentarios',1,
    'https://www.wine.com.br/vinhos/gonzalez-byass-tio-pepe-jerez-fino-d-o/prod3003.html#comentarios',1,
    'https://www.wine.com.br/vinhos/espumante-freixenet-carta-nevada-premium-cava-semi-seco-200-ml/prod7048.html#comentarios',1,
    'https://www.wine.com.br/vinhos/ate-40-reais/cVINHOS-prBRL__40-p1.html#',0,
    'https://www.wine.com.br/vinhos/casas-del-toqui-single-estate-sauvignon-blanc-2016-375-ml/prod17529.html',1,
    'https://www.wine.com.br/vinhos/cava-negra-chardonnay-2015-375-ml/prod16014.html',1,
    'https://www.wine.com.br/vinhos/cava-negra-malbec-2015-375ml/prod15523.html#comentarios',1,
    'https://www.wine.com.br/vinhos/altas-cumbres-malbec-2014-375ml/prod15483.html#comentarios',1,
    'https://www.wine.com.br/vinhos/prova-regia-arinto-2014-375ml/prod15171.html',1,
    'https://www.wine.com.br/vinhos/ventisquero-reserva-carmenere-2015-375ml/prod16244.html#comentarios',1,
    'https://www.wine.com.br/vinhos/cava-negra-malbec-2015-375ml/prod15523.html',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-sauvignon-blanc-2016/prod15641.html#comentarios',1,
    'https://www.wine.com.br/vinhos/bodega-amalia-dos-fincas-sauvignon-blanc-2014-375-ml/prod12652.html',1,
    'https://www.wine.com.br/vinhos/bodega-amalia-dos-fincas-sauvignon-blanc-2014-375-ml/prod12652.html#comentarios',1,
    'https://www.wine.com.br/vinhos/toro-loco-tempranillo-2015/prod15536.html#comentarios',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-pinot-grigio-2016/prod15979.html',1,
    'https://www.wine.com.br/vinhos/bodega-amalia-dos-fincas-malbec-2013-375-ml/prod12653.html',1,
    'https://www.wine.com.br/vinhos/espumante-freixenet-carta-nevada-premium-cava-semi-seco-200-ml/prod7048.html',1,
    'https://www.wine.com.br/vinhos/felix-solis-caliza-d-o-la-mancha-branco-2015/prod15603.html',1,
    'https://www.wine.com.br/vinhos/altas-cumbres-malbec-2014-375ml/prod15483.html',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-sauvignon-blanc-2016/prod15641.html',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-chardonnay-2016/prod16011.html#comentarios',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-pinot-grigio-2016/prod15979.html#comentarios',1,
    'https://www.wine.com.br/vinhos/polo-amateur-chardonnay-2015/prod15688.html',1,
    'https://www.wine.com.br/vinhos/ventisquero-classico-syrah-2016/prod17366.html#comentarios',1,
    'https://www.wine.com.br/vinhos/casas-del-toqui-single-estate-sauvignon-blanc-2016-375-ml/prod17529.html#comentarios',1,
    'https://www.wine.com.br/vinhos/portas-da-herdade-branco-2015/prod15639.html',1,
    'https://www.wine.com.br/vinhos/canepa-novisimo-chardonnay-2016/prod16011.html',1,
    'https://www.wine.com.br/vinhos/casas-del-toqui-single-estate-d-o-central-valley-cabernet-sauvignon-2016-375-ml/prod17528.html',1,
    'https://www.wine.com.br/vinhos/cava-negra-chardonnay-2015-375-ml/prod16014.html#comentarios',1,
    'https://www.wine.com.br/vinhos/portas-da-herdade-branco-2015/prod15639.html#comentarios',1,
    'https://www.wine.com.br/vinhos/ventisquero-classico-syrah-2016/prod17366.html',1,
    'https://www.wine.com.br/vinhos/salton-classic-cabernet-franc-2016/prod17573.html#comentarios',1,
    'https://www.wine.com.br/vinhos/bodega-amalia-dos-fincas-malbec-2013-375-ml/prod12653.html#comentarios',1,
    'https://www.wine.com.br/vinhos/santa-rita-120-sauvignon-blanc-2012-375ml/prod8344.html',1,
    'https://www.wine.com.br/vinhos/polo-amateur-chardonnay-2015/prod15688.html#comentarios',1,
    'https://www.wine.com.br/vinhos/prova-regia-arinto-2014-375ml/prod15171.html#comentarios',1,
    'https://www.wine.com.br/vinhos/casas-del-toqui-single-estate-d-o-central-valley-cabernet-sauvignon-2016-375-ml/prod17528.html#comentarios',1,
    'https://www.wine.com.br/vinhos/felix-solis-caliza-d-o-la-mancha-branco-2015/prod15603.html#comentarios',1,
    'https://www.wine.com.br/vinhos/toro-loco-tempranillo-2015/prod15536.html',1,
    'https://www.wine.com.br/vinhos/salton-classic-cabernet-franc-2016/prod17573.html',1,
    'https://www.wine.com.br/vinhos/santa-rita-120-sauvignon-blanc-2012-375ml/prod8344.html#comentarios',1,
    'https://www.wine.com.br/vinhos/ventisquero-reserva-carmenere-2015-375ml/prod16244.html',1,
    'https://www.wine.com.br/vinhos/ate-40-reais/cVINHOS-prBRL__40-p1.html',0,
    'https://www.wine.com.br/vinhos/tannat/cVINHOS-atMENUUVA_TANNAT-p1.html',0,
    'https://www.wine.com.br/vinhos/acima-de-500-reais/cVINHOS-prBRL_500_-p1.html',0,
    'https://www.wine.com.br/vinhos/portugal/cVINHOS-atPAIS_PORTUGAL-p1.html',0,
    'https://www.wine.com.br/vinhos/zinfandel/cVINHOS-atMENUUVA_ZINFANDEL-p1.html',0,
    'https://www.wine.com.br/wineinfo/landing-page/promocao/vinho-misterioso/?posicao=vinho-misterioso-pr-home-banner-rotativo-17052017',0,
    'https://www.wine.com.br/vinhos/tempranillo/cVINHOS-atMENUUVA_TEMPRANILLO-p1.html',0,
    'https://www.wine.com.br/vinhos/libano/cVINHOS-atPAIS_LIBANO-p1.html',0,
    'https://www.wine.com.br/vinhos/branco-doce/cVINHOS-atTIPO_BRANCODOCE-p1.html',0,
    'https://www.wine.com.br/vinhos/torrontes/cVINHOS-atMENUUVA_TORRONTES-p1.html',0,
    'https://www.wine.com.br/vinhos/franca/cVINHOS-atPAIS_FRANCE-p1.html',0,
    'https://www.wine.com.br/vinhos/hungria/cVINHOS-atPAIS_HUNGARY-p1.html',0,
    'https://www.wine.com.br/vinhos/syrah-shiraz/cVINHOS-atMENUUVA_SYRAHSHIRAZ-p1.html',0,
    'https://www.wine.com.br/vinhos/malbec/cVINHOS-atMENUUVA_MALBEC-p1.html',0,
    'https://www.wine.com.br/vinhos/chile/cVINHOS-atPAIS_CHILE-p1.html',0,
    'https://www.wine.com.br/vinhos/merlot/cVINHOS-atMENUUVA_MERLOT-p1.html',0,
    'https://www.wine.com.br/vinhos/pinotage/cVINHOS-atMENUUVA_PINOTAGE-p1.html',0,
    'https://www.wine.com.br/vinhos/africa-do-sul/cVINHOS-atPAIS_SOUTHAFRICA-p1.html',0,
    'https://www.wine.com.br/vinhos/nova-zelandia/cVINHOS-atPAIS_NEWZELAND-p1.html',0,
    'https://www.wine.com.br/vinhos/exclusivos/cVINHOS-atPRODUTO_EXCLUSIVO_WINE_EXCLUSIVOS-p1.html',0,
    'https://www.wine.com.br/vinhos/alemanha/cVINHOS-atPAIS_GERMANY-p1.html',0,
    'https://www.wine.com.br/vinhos/espanha/cVINHOS-atPAIS_SPAIN-p1.html',0,
    'https://www.wine.com.br/vinhos/pinot-noir/cVINHOS-atMENUUVA_PINOTNOIR-p1.html',0,
    'https://www.wine.com.br/w/vinhos-lancamentos?posicao=banner_estatico_central_02_pr_lancamentos',0,
    'https://www.wine.com.br/vinhos/cabernet-sauvignon/cVINHOS-atMENUUVA_CABERNETSAUVIGNON-p1.html',0,
    'https://www.wine.com.br/vinhos/argentina/cVINHOS-atPAIS_ARGENTINA-p1.html',0,
    'https://www.wine.com.br/w/mais-buscados?posicao=banner_estatico_central_04_pr_mais_buscados',0,
    'https://www.wine.com.br/vinhos/italia/cVINHOS-atPAIS_ITALY-p1.html',0,
    'https://www.wine.com.br/vinhos/brasil/cVINHOS-atPAIS_BRASIL-p1.html',0,
    'https://www.wine.com.br/vinhos/estados-unidos/cVINHOS-atPAIS_USA-p1.html',0,
    'https://www.wine.com.br/vinhos/de-100-a-200-reais/cVINHOS-prBRL_100_200-p1.html',0,
    'https://www.wine.com.br/vinhos/de-60-a-100-reais/cVINHOS-prBRL_60_100-p1.html',0,
    'https://www.wine.com.br/vinhos/chardonnay/cVINHOS-atMENUUVA_CHARDONNAY-p1.html',0,
    'https://www.wine.com.br/vinhos/pinot-grigio/cVINHOS-atMENUUVA_PINOTGRIGIO-p1.html',0,
    'https://www.wine.com.br/vinhos/uruguai/cVINHOS-atPAIS_URUGUAY-p1.html',0,
    'https://www.wine.com.br/vinhos/de-40-a-60-reais/cVINHOS-prBRL_40_60-p1.html',0,
    'https://www.wine.com.br/vinhos/porto/cVINHOS-atTIPO_PORTO-p1.html',0,
    'https://www.wine.com.br/vinhos/sauvignon-blanc/cVINHOS-atMENUUVA_SAUVIGNONBLANC-p1.html',0,
    'https://www.wine.com.br/w/vinhos-mais-vendidos?posicao=banner_estatico_central_01_pr_mais_vendidos',0,
    'https://www.wine.com.br/vinhos/lambrusco/cVINHOS-atMENUUVA_LAMBRUSCO-p1.html',0,
    'https://www.wine.com.br/w/vinhos-pontuados?posicao=banner_estatico_central_04_pr_pontuados',0,
    'https://www.wine.com.br/vinhos/carmenere/cVINHOS-atMENUUVA_CARMENERE-p1.html',0,
    'https://www.wine.com.br/vinhos/de-200-a-500-reais/cVINHOS-prBRL_200_500-p1.html',0,
    'https://www.wine.com.br/vinhos/australia/cVINHOS-atPAIS_AUSTRALIA-p1.html',0,

    'http://www.emporio.com/vinhos/vinhos-brancos/Velho Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinho-tinto-frances-chateau-roberperots-bordeaux-2012/p#',1,
    'http://www.emporio.com/vinhos/vinhos-roses/Novo Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/Brasil/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/institucional/perguntas-frequentes',0,
    'http://www.emporio.com/vinhos/Italia/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa/Corpo Leve/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-tintos',0,
    'http://www.emporio.com/vinhos/Portugal/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-brancos/Novo Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/kit-vinhos',0,
    'http://www.emporio.com/vinhos/vinhos-roses/Velho Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/Espanha/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-brancos/Encorpado/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/Alemanha/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos',0,
    'http://www.emporio.com/vinhos/Hungria/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/chateau-roberperots',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/Corpo Leve/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos?O=OrderByTopSaleDESC',0,
    'http://www.emporio.com/vinhos/Chile/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/Uruguai/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/Eslovenia/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-brancos/Corpo Leve/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-roses/Encorpado/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/Argentina/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/Corpo Médio/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/Encorpado/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/Novo Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/Franca/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-roses/Corpo Leve/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa/Velho Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/vinhos-roses',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa/Corpo Médio/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-brancos',0,
    'http://www.emporio.com/vinhos/África do sul/?map=c,specificationFilter_45',0,
    'http://www.emporio.com/vinhos/vinhos-roses/Corpo Médio/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa/Encorpado/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa/Novo Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/vinhos-brancos/Corpo Médio/?map=c,c,specificationFilter_73',0,
    'http://www.emporio.com/vinhos/vinhos-tintos/Velho Mundo?map=c,c,specificationFilter_100',0,
    'http://www.emporio.com/vinhos/espumante-e-sobremesa',0,
    'http://www.emporio.com/vinho-tinto-frances-chateau-roberperots-bordeaux-2012/p',1,
    'http://www.emporio.com/winefor',0,
    'http://www.emporio.com/vinho-tinto-corinto-carmenere-750ml/p',1,
    'http://www.emporio.com/vinho-espumante-cava-espanhol-brut-visiega/p',1,

    'https://www.vinhosevinhos.com/vinhos.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/licores.html',0,
    'https://www.vinhosevinhos.com/vinhos/vinhos-roses.html/',0,
    'https://www.vinhosevinhos.com/suco-de-uva.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/frisantes.html',0,
    'https://www.vinhosevinhos.com/vinhos/vinhos-tintos.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/organicos.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/coolers.html',0,
    'https://www.vinhosevinhos.com/bag-in-box.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/outros-sucos.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/destilados.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/sem-alcool.html',0,
    'https://www.vinhosevinhos.com/vinho-guatambu-rastros-do-pampa-tannat-750ml.html#sm_megamenu_menu591c302105b73',1,
    'https://www.vinhosevinhos.com/vinhos/vinhos-tintos.html/',0,
    'https://www.vinhosevinhos.com/outras-bebidas/filtrado-doce.html',0,
    'https://www.vinhosevinhos.com/espumantes.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/vinagre.html',0,
    'https://www.vinhosevinhos.com/vinho-guatambu-rastros-do-pampa-tannat-750ml.html#',1,
    'https://www.vinhosevinhos.com/vinhos/vinhos-roses.html',0,
    'https://www.vinhosevinhos.com/outras-bebidas/cervejas.html',0,
    'https://www.vinhosevinhos.com/promocao.html',0,
    'https://www.instagram.com/vinhosevinhosoficial/',0,
    'https://www.vinhosevinhos.com/vinhos/vinhos-brancos.html/',0,
    'https://www.vinhosevinhos.com/vinhos/vinhos-brancos.html',0,
    'https://www.vinhosevinhos.com/vinho-casa-perini-merlot-750-ml.html#sm_megamenu_menu591c301fe14c4',1,
    'https://www.vinhosevinhos.com/vinho-casa-perini-merlot-750-ml.html#',1,
    'https://www.vinhosevinhos.com/vinho-casa-perini-merlot-750-ml.html',1,
    'https://www.vinhosevinhos.com/vinho-guatambu-rastros-do-pampa-tannat-750ml.html',1,
    'https://www.vinhosevinhos.com/vinho-aracuri-pinot-noir-750-ml.html',1,
    'https://www.vinhosevinhos.com/vinho-panizzon-di-mallo-merlot-seco-750ml-cx-c-12-unidades.html',1,
    'https://www.vinhosevinhos.com/valmarino-cabernet-franc-xix.html',1,
    'https://www.vinhosevinhos.com/espumante-aurora-moscatel-750ml.html',0,
    'https://www.vinhosevinhos.com/combo-especial-conhecendo-a-vinicola-luiz-porto.html',1,
    'https://www.vinhosevinhos.com/miolo-gamay-nouveau.html',1,
    'https://www.vinhosevinhos.com/espumante-perico-brut-rose.html',0,
    'https://www.vinhosevinhos.com/vinho-luiz-argenta-la-merlot-750-ml.html',1
];

mongoose.connect('mongodb://vitoria:123@ds143241.mlab.com:43241/ri_wine');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected correctly to server");
    for (i = 0; i < links.length; i++) {
        if(i % 2 == 0){
            if(links[i+1] == 1) {
                if(links[i].indexOf('www.wine.com.br') > 0) {
                    wineWrapper(links[i]);
                } else if(links[i].indexOf('www.emporio.com') > 0) {
                    emporioWrapper(links[i]);
                } else if(links[i].indexOf('www.vinhosevinhos.com') > 0) {
                    vinhosevinhosWrapper(links[i]);
                }
            }
        }
    }
});