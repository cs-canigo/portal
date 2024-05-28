const uncss = require('uncss');

const files   = [ 
    __dirname+'/../../public/index.html', __dirname+'/../../public/arquitectura/principis/principis_arq/index.html',
    __dirname+'/../../public/arquitectura/index.html',__dirname+'/../../public/noticies/2024-04-10-SIC-Deprecat-SIC-2.0/index.html',
    __dirname+'/../../public/noticies/index.html', __dirname + '/../../public/cercador/?q=principis',
    __dirname+'/../../public/noticies/2022-11-19-sic-act_versio_nexus/index.html', __dirname+'/../../public/blog/2023/11/ArquitecturaTISostenible/index.html',
    __dirname+'/../../public/blog/index.html', 
];
    
const options = {
    stylesheets  : ['/css/styles.css'],
    ignore       : ['.NG-header__icon2', '.js-search-menu', 
                        '.NG-search--expand','.NG-Modal_Backdrop', '.ais-hits', '#hits','llistat_destacat_text_cont',
                        'ul.ais-pagination>li', '#pagination','ul.ais-pagination--item','ul.ais-pagination--item--page','ul.ais-pagination--item--previous',
                        '.destacat_text_cont','.column paginacio','.pd-15', '#stats', '.block-with-text', '#left-column', '.list-group', '.col-xs-12', '.col-md-8', 
                        '.col-xs-12','.col-md-3', '.destacat_text', '.list-group-item', 
                        /.*slide.*/g, /.*\.carousel.*/g, /\.NG-search.*/g, /\.NG-navbar.*/g, /.*search.*/g, /.*::hover/g, 
                        /.*fpca_diapositives.*/g, /\.NG-Modal_.*/g, /\.ais.*/g, /.*::after/g, /.*active/g, /.*next.*/g, /.*prev.*/g
    ],
};

uncss(files, options, function (error, output) {
    //console.log(error)

    let lines = output.split('\n');
    lines.shift(); 
    output = lines.join('');
    output = output.replace(/(\r\n|\n|\r|\t|\s{2,})/g, '');

    console.log(output);


});