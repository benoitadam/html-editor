import { ND } from "common/box";
import app from "~src/app";

export const cosmo: ND = {
    cls: 'root col',
    css: `
        .allergens:before { content: '(' }
        .allergens:after { content: ')' }
        .icon { display: flex; flex-direction: column; align-items: center; font-weight: bold; margin-right: 0.5em; height: 2em; width: 2em; }
        .icon svg { flex: 1; width: 100%; }
        .icon b { margin: 0 0 -0.5em 0; font-size: 8px; }
        .icon.veg { color: #017f00; fill: #017f00; }
        .icon.vgn { color: #017f00; fill: #017f00; }
        .icon.bio { color: #0f9a3b; fill: #0f9a3b; }
        .sep { width: 1em; height: 1em; }
        .nav-bar { flex-wrap: wrap; }
        .nav-bar .btn {
            color: #FFF;
            text-align: center;
            background-color: #000;
            margin: 0.5em;
            height: 3.4em;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 1em;
            flex: 1;
        }
        .header {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            border-bottom: 3px solid black;
            flex-wrap: wrap;
            font-size: 1.2em;
        }
        .header-2 { margin-top: 0.5em; border-bottom: 0; font-size: 1.1em; }
        .header h3 { padding-left: 0; }
        .header .price { font-weight: bold; }
        .header .desc { width: 100%; }
        .section { display: flex; flex-direction: column; align-items: stretch; margin: 0.5em; }
        .section-border { border: 2px solid red; border-top: 0; }
        .section-border .product { width: auto; }
        .product { font-size: 0.9em; }
        .product .info b { color: #e2242d; }
        .product .desc, .product .info, .header .desc { font-size: 0.8em; }
        .section .sep { background: #e2242d; margin: 5px auto; }
        .icon { height: 1em; width: 1em; }
        body { background: #FFF; }
        .items-start { align-items: flex-start; }
        .root { margin: auto; background: #FFF; font-family: 'Nunito Sans', sans-serif; justify-content: flex-start; }
        .page { justify-content: flex-start; }
        .sep { width: 30px; height: 2px; }
        .section { flex: 1; align-self: flex-start; display: flex; flex-direction: column; align-items: stretch; margin: 5px 0; }
        .section div { text-align: justify; }
        .section-border { border: 2px solid #e2242d; border-top: 0; }
        .section-border .product { width: auto; }
        .section_header .title:before {
            content: '';
            width: 20px;
            height: 20px;
            display: block;
            background: url('https://www.lecosmo.numericmenu.com/images/fait-maison.svg');
            margin-right: 5px;
        }
        .section_header .title { font-weight: bold; display: flex; align-items: center; }
        .section_header {
            width: 100%;
            border: 2px solid #e2242d;
            border-left: 0;
            border-right: 0;
            padding: 5px;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        .product .info b { color: #e2242d; }
        .section_header .desc { font-size: 0.7em; font-weight: normal; }
        .section .sep { background: #e2242d; margin: 5px auto; }
        .nav-bar .btn {
            color: #FFF;
            text-align: center;
            background-color: #e2242d;
            height: 3.4em;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            font-weight: bold;
            margin: 5px;
            font-size: 0.8em;
            width: 8.4em;
        }
        .footer_icons img { flex:1; max-width: 80px; }
        .suggestion { font-size: 2em; padding: 20px 20px; }
        .suggestion h3 { font-size: 2em; font-weight: bold; }
        .lang { margin: 6px; width: 60px; height: 60px; opacity: 0.8; }
        .lang-active { opacity: 1; width: 80px; }
        .cat { display: flex; align-items: stretch; justify-content: center; flex-direction: column; margin: 0 10px 15px 10px; min-width: 300px; }
        .cat-border { border: 3px solid #e2242d; border-top: 0; }
        .cat-center { align-items: center; }
        .cat .cat { margin: 0 0 15px 0; }
        .cat > .header {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            font-weight: bold;
            align-items: center;
            border-top: 3px solid #e2242d;
            border-bottom: 1px solid #e2242d;
            padding: 4px 0;
        }
        .cat > .header > .title { font-weight: bold; flex: 1; }
        .cat > .header > .desc { font-size: 0.5em; font-weight: normal; }
        .cat.cat_header-center > .header { justify-content: center; text-align: center; }
        .cat.cat_header-center > .header > .title { flex: none; }
        .cat > .header > .desc { font-weight: normal; font-size: .6em; }
        .cat .cat > .header {
            margin-top: -0.5px;
            border-top: 1px dashed #e2242d;
            border-bottom: 1px dashed #e2242d;
            font-size: 1em;
            color: #e2242d;
        }
        .cat .cat .cat > .header {
            margin-top: -0.5px;
            font-size: 0.8em;
            color: #e2242d;
            border-top: 0;
            border-bottom: 0;
        }
        /*.cat > .title:before {
            content: '';
            width: 20px;
            height: 20px;
            display: block;
            background: url('https://www.lecosmo.numericmenu.com/images/fait-maison.svg');
            margin-right: 5px;
        }*/
        .cols { display: flex; flex-direction: row; flex-wrap: wrap; align-items: flex-start; justify-content: stretch; }
        .cols .col { flex: 1; min-width: 300px; }
        .center { text-align: center; }
        .italic { font-style: italic; }
    `,
    fontImport: 'Nunito+Sans:wght@400;700',
    homePage: 'accueil',
    children: [
        {
            t: 'row',
            id: 'header',
            children: [{
                cls: 'logo',
                w: '197px',
                h: '100px',
                bgImg: 'https://www.lecosmo.numericmenu.com/img/logo-cosmo.jpg',
            }, {
                cls: 'flex',
            }, {
                t: 'row',
                w: 'auto',
                cls: 'langs',
                children: [
                    { t: 'lang', lang: 'fr' },
                    { t: 'lang', lang: 'en' },
                    { t: 'lang', lang: 'it' },
                    { t: 'lang', lang: 'de' },
                    { t: 'lang', lang: 'ru' },
                    { t: 'lang', lang: 'nl' },
                    { t: 'img', width: 60, mr: 20, img: 'https://www.lecosmo.numericmenu.com/img/hand_anim_black.gif' },
                ]
            }]
        },
        {
            t: 'row',
            ctn: '2€ du couvert partage',
            justifyContent: 'flex-end'
        },
        {
            cls: 'nav-bar',
            t: 'row',
            children: [
                { t: 'btn', ctn: 'LA CARTE', onClick: [{ fun: 'setPage', args: ['accueil'] }] },
                // { t: 'btn', ctn: 'PLANCHES<br />À PARTAGER', onClick: [{ fun: 'setPage', args: ['partage'] }] },
                // { t: 'btn', ctn: 'FRUITS<br />DE MER', onClick: [{ fun: 'setPage', args: ['mer'] }] },
                { t: 'btn', ctn: 'DESSERTS<br />ET THÉS', onClick: [{ fun: 'setPage', args: ['desserts'] }] },
                { t: 'btn', ctn: 'CARTE<br />NESPRESSO', onClick: [{ fun: 'setPage', args: ['nespresso'] }] },
                { t: 'btn', ctn: 'PETIT<br />DÉJEUNER', onClick: [{ fun: 'setPage', args: ['petit-dejeuner'] }] },
                { t: 'btn', ctn: 'BOISSONS', onClick: [{ fun: 'setPage', args: ['boissons'] }] },
                { t: 'btn', ctn: 'COCKTAILS', onClick: [{ fun: 'setPage', args: ['cocktails'] }] },
                { t: 'btn', ctn: 'CARTE<br />DES VINS', onClick: [{ fun: 'setPage', args: ['vins'] }] },
                { t: 'btn', ctn: 'MENU<br />ENFANT', onClick: [{ fun: 'setPage', args: ['enfant'] }] },
            ]
        },
        {
            t: 'page',
            page: 'accueil',
            title: 'Le Cosmo',
            children: [
                {
                    t: 'row',
                    cls: 'suggestion',
                    children: [
                        { t: 'ctn', m:10, ctn: 'SUGGESTION' },
                        { t: 'col', m:10, flex: 1, fontSize: '0.6em', children: [
                            { t: 'product', title: 'SOLE GRILLÉE OU MEUNIÈRE', desc: 'Légumes Sautés', price: 39.9 },
                            { t: 'product', del: true, title: 'Titre', desc: 'Description', price: 0 },
                            { t: 'product', del: true, title: 'Titre', desc: 'Description', price: 0 },
                        ]}
                    ]
                }, {
                    t: 'row',
                    cls: 'items-start',
                    children: [
                        {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: 'ENTRÉES / SALADES REPAS',
                            children: [
                                { t: 'product', title: 'FRITURE D’EPERLANS', info: 'sauce tartare', price: 14 },
                                { t: 'product', title: 'SALADE NIÇOISE', info: 'mesclun, tomates, radis, anchois, olives, oeuf, poivrons, thon, févettes', price: 17.90 },
                                { t: 'product', title: 'SALADE CHICKEN CEASAR', info: 'et son croustillant de poulet', price: 18.90 },
                                { t: 'product', title: 'SALADE DE CROTTIN DE CHÈVRE AU LAIT CRU ET LARD', info: 'aux herbes de Provence <b>(végétarien)</b>', price: 16.90 },
                                { t: 'product', title: 'SALADE DE BLANC DE POULET MARINÉ AU MIEL ET GINGEMBRE', info: 'parsemé de pousse de soja aromatisée à la menthe-coriandre', price: 19.90 },
                                { t: 'product', title: 'LA SALADE ITALIENNE', info: 'salade , burrata di bufala, jambon de parme, gressin', price: 19.90 },
                                { t: 'product', title: 'FOIE GRAS DE CANARD MI-CUIT FAIT MAISON', info: 'au piment d’Espelette, chutney d’oignons à la grenadine', price: 19.90 },
                                { t: 'product', title: 'MINI-TARTARE DE SAUMON FRAIS', info: 'à la mangue et au gingembre, pignons torréfiés et cébettes', price: 16 },
                                { t: 'product', title: 'SOUPE DE POISSON MAISON', info: 'rouille croûtons et fromage râpé', price: 15 },
                                { t: 'product', title: 'LA SALADE FROMAGÈRE', info: 'salade, dès de roquefort, dès de brebis, pommes, noix, cranberries', price: 18 },
                                { t: 'product', title: 'LA TOMATE COEUR DE BOEUF MOZZARELLA BURRATA', info: 'à l’huile d’olive et basilic frais', price: 18 }
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'Nos planches à partager',
                            children: [
                                { t: 'product', title: 'SARDINES À L’HUILE D’OLIVE MILLÉSIME', desc: '(115gr) << RODEL >>', price: 12 },
                                { t: 'product', title: 'CAMEMBERT RÔTI', desc: 'Piqué à l’ail et au cognac', price: 14 },
                                { t: 'product', title: 'PIZZA À PARTAGER', desc: '(Demandez la carte)', info2: 'à partir de', price: 13 },
                            ]
                        }
                    ]
                }, {
                    t: 'row',
                    cls: 'items-start',
                    children: [
                        {
                            t: 'cat',
                            flex: 1,
                            cls: 'cat_header-center cat-border cat-center',
                            title: 'MENU DU COSMO',
                            children: [
                                { t: 'product', title: 'ENTRÉE + PLAT OU PLAT + DESSERT', price: 29.90 },
                                { t: 'product', title: 'ENTRÉE + PLAT + DESSERT', price: 36.90 },
                                { cls: 'sep' },
                                { t: 'ctn', textAlign: 'center', ctn: `L'ASSIETTE DE L'ECAILLER<br />(3 huîtres, 3 crevettes roses)<br />ou<br />SOUPE DE POISSON MAISON<br />(croûtons, fromage râpé , rouille)<br />ou<br />FOIE GRAS DE CANARD AU PIMENT D'ESPELETTE, CHUTNEY D'OIGNONS` },
                                { cls: 'sep' },
                                { t: 'ctn', textAlign: 'center', ctn: `FILET DE DAURADE ET SES LÉGUMES GRILLÉS<br />ou<br />FAUX-FILET GRILLÉ, FRITES, SALADE` },
                                { cls: 'sep' },
                                { t: 'ctn', textAlign: 'center', ctn: `FONDANT AU CHOCOLAT CRÈME FOUETTÉE<br />ou<br />FRAICHEUR FRAISE-CITRON, COULIS DE FRUITS ROUGE, CHANTILLY<br />ou<br />CRÈME BRULÉE À LA VANILLE DE BOURBON` },
                            ]
                        },
                        {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: "NOS FRUITS DE MER",
                            children: [
                                { t: 'ctn', ctn: 'EN RUPTURE' },
                                { t: 'product', title: 'HUITRES DE MARENNE D’OLERON', del: true },
                                {
                                    t: 'cat',
                                    cls: 'cat_header-center',
                                    title: 'Les Spéciales de chez GEAY',
                                    del: true,
                                    children: [
                                        { t: 'product', title: '• LES 6 HUÎTRES N°3', price: 18 },
                                        { t: 'product', title: '• LES 9 HUÎTRES N°3', price: 27 },
                                        { t: 'product', title: '• LES 12 HUÎTRES N°3', price: 36 },
                                        { t: 'product', title: 'LE BOUQUET DE CREVETTES ROSES', price: 18, desc: '10 pièces' },
                                        { t: 'product', title: '1/2 HOMARD GRILLÉ', price: 25, desc: 'Mayonnaise ou grillé (Accompagnement en supplément)' },
                                        { t: 'product', title: 'HOMARD ENTIER', price: 50, desc: 'Mayonnaise ou grillé (Accompagnement en supplément)' },
                                        { t: 'product', title: 'L’ASSIETTE ROYALE', price: 30, desc: '(5 crevettes +1/2 Homard)' },
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    t: 'row',
                    cls: 'items-start',
                    children: [
                        {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: "VIANDES",
                            desc: '(TOUTES NOS VIANDES GRILLÉES SONT ACCOMPAGNÉES DE FRITES DIPPERS)',
                            children: [
                                { t: 'product', title: 'FAUX-FILET GRILLÉ', desc: 'Frites - (Race française)', price: 22 },
                                { t: 'product', title: 'ENTRECÔTE GRILLÉE', desc: '+/- 350 gr, frites - (Race française)', price: 28.90 },
                                { t: 'product', title: 'BAVETTE D’ALOYAU', desc: 'Frites / Salade', price: 22 },
                                { t: 'product', title: 'ESCALOPE DE VEAU MILANAISE', desc: 'et ses tagliatelles napolitaine', price: 22.90 },
                                { t: 'product', title: 'SOURIS D’AGNEAU BRAISÉE', desc: 'Purée maison', price: 25.90 },
                                { t: 'product', title: 'TARTARE DE BOEUF CHAROLAIS', desc: '(180gr env. Possibilité Aller Retour)', price: 20.90 },
                                { t: 'product', title: 'SAUCE POIVRE OU ROQUEFORT', price: 2 },
                            ]
                        }, {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: 'POISSONS',
                            children: [
                                { t: 'product', title: 'MOULES DE BOUCHOT DE LA BAIE DU MONT ST MICHEL ET SES FRITES', desc: '(Marinières, à la crème ou Provençale)', price: 17.90 },
                                { t: 'product', title: 'TARTARE DE SAUMON FRITES', desc: 'à la mangue et au gingembre, pignons torréfiés et cébettes', price: 25 },
                                { t: 'product', title: 'CÉVICHE DE DAURADE MARINÉ AU CITRON VERT SALADE', desc: 'oignons rouges, gingembre, coriandre, mangue', price: 21 },
                                { t: 'product', title: 'SAUMON GRILLÉ', desc: 'Légumes sautés', price: 25 },
                                { t: 'product', title: 'ENCORNETS À LA PERSILLADE', desc: 'Pommes grenaille', price: 26 },
                                { t: 'product', title: 'DAURADE ENTIÈRE GRILLÉE LÉGUMES', desc: 'environ 500gr', price: 27.90 },
                                { t: 'product', title: 'LOUP ENTIER GRILLÉ LÉGUMES', desc: 'environ 500gr', price: 27.90 },
                            ]
                        }, {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: 'PIZZAS',
                            desc: 'SUR PLACE OU À EMPORTER',
                            children: [
                                { t: 'product', title: 'MARGHERITA', desc: 'Tomates, mozzarella, origan, olives', price: 13 },
                                { t: 'product', title: 'REINE', desc: 'Tomates, mozzarella, champignons, jambon blanc', price: 14.90 },
                                { t: 'product', title: '4 FROMAGES', desc: 'Tomates, assortiment de fromages, origan, olives', price: 14.90 },
                                { t: 'product', title: 'VÉGÉTARIENNE', desc: 'Tomates, mozzarela, légumes suivant arrivage, olives', price: 14.90 },
                                { t: 'product', title: 'PARMA', desc: 'Tomates, mozzarella, roquette, jambon de Parme, copeaux de parmesan', price: 15.90 },
                                { t: 'product', title: 'BURRATA', desc: 'Tomates, mozzarella, roquette, burrata, olives', price: 15.90 },
                                { t: 'product', title: 'À LA TRUFFE', desc: 'Base de crème, mozzarella, copeaux et huile de truffes', price: 25 },
                            ]
                        }
                    ]
                },
                {
                    t: 'row',
                    cls: 'items-start',
                    children: [
                        {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: 'PATES FRAÎCHES / RISOTTO',
                            children: [
                                { t: 'product', title: 'LINGUINI FRAÎCHES NAPOLITAINE', price: 14.90 },
                                { t: 'product', title: 'LINGUINI FRAÎCHES BOLOGNAISE', price: 15.90 },
                                { t: 'product', title: 'LINGUINI FRAÎCHES VÉGÉTARIENNE', price: 15.90 },
                                { t: 'product', title: 'LINGUINI FRAÎCHES AUX GAMBAS', price: 32 },
                                { t: 'product', title: 'LASAGNES MAISON', price: 16.90 },
                                { t: 'product', title: 'RAVIOLI RICOTTA ÉPINARDS', desc: 'à la crème Parmessan', price: 16 },
                                { t: 'product', title: 'RISOTTO AUX GAMBAS', price: 32 },
                            ]
                        }, {
                            t: 'col',
                            flex: 1,
                            children: [
                                {
                                    t: 'cat',
                                    cls: 'cat_header-center',
                                    title: 'BURGERS',
                                    desc: 'PAIN ARTISANAL',
                                    children: [
                                        { t: 'product', title: 'BEEF BURGER (FRITES SALADE)', desc: 'Steak haché frais Charolais, cheddar, tomate, iceberg, galette de pomme de terre, oignons, sauce tartare', price: 21.90 },
                                        { t: 'product', title: 'CHICKEN BURGER (FRITES SALADE)', desc: 'Poulet pané, cheddar, tomate, iceberg, galette de pomme de terre, oignons, sauce tartare', price: 21.90 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    cls: 'cat_header-center',
                                    title: "OMELETTES",
                                    desc: 'SAUF DIMANCHE, JOURS FÉRIÉS ET LE SOIR DU 15 JUIN AU 31 AOÛT',
                                    children: [
                                        { t: 'product', title: 'OMELETTE  NATURE', price: 13.90 },
                                        { t: 'product', title: 'OMELETTE  JAMBON ET FROMAGE', price: 14.90 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'cat',
                            cls: 'cat_header-center',
                            flex: 1,
                            title: "GARNITURES",
                            children: [
                                { t: 'product', title: 'LÉGUMES GRILLÉS', price: 6 },
                                { t: 'product', title: 'POMMES DE TERRE GRENAILLES', price: 4 },
                                { t: 'product', title: 'PURÉE MAISON', price: 4 },
                                { t: 'product', title: 'FRITES DIPPERS', price: 4 },
                                { t: 'product', title: 'RIZ BASMATI', price: 4 },
                                { t: 'product', title: 'SALADE VERTE', price: 4 },
                            ]
                        }
                    ]
                },
            ]
        },
        // {
        //     t: 'page',
        //     page: 'partage',
        //     children: [
        //         {
        //             t: 'cat',
        //             title: 'Nos planches à partager',
        //             children: [
        //                 { t: 'product', title: 'SARDINES À L’HUILE D’OLIVE MILLÉSIME', desc: '(115gr) << RODEL >>', price: 12 },
        //                 { t: 'product', title: 'CAMEMBERT RÔTI', desc: 'Piqué à l’ail et au cognac', price: 14 },
        //                 { t: 'product', title: 'PIZZA À PARTAGER', desc: '(Demandez la carte)', info2: 'à partir de', price: 13 },
        //             ]
        //         },
        //     ]
        // },
        // {
        //     t: 'page',
        //     page: 'mer',
        //     bgImg: 'mer_{{lang}}.jpg',
        //     children: []
        // },
        {
            t: 'page',
            page: 'desserts',
            cls: 'cols',
            children: [
                {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'NOS GOURMANDISES À BASE DE CAFÉ NESPRESSO',
                            price: 6,
                            children: [
                                { t: 'product', title: 'CAFÉ BANANE SPLIT', desc: 'Café Forte associé à du lait froid, de la banane et un biscuit croquant' },
                                { t: 'product', title: 'CHOCO-COOKIES MACCHIATO', desc: 'Mélange gourmand d’un Grand Cru Nespresso, de lait chaud et de mousse de lait chaud agrémenté de sirop choco-cookie' },
                                { t: 'product', title: 'GOURMANDISE SPECULOOS', desc: 'Sirop de Spéculoos et de lait chaud associés à un Grand Cru Nespresso, surmonté de mousse de lait chaud et brisures de Spéculoos' },
                                { t: 'product', title: 'RÊVE EN CHOCOLAT', desc: 'Boule de chocolat glacé entourée d’un savoureux Ristretto et mousse de lait' },
                                { t: 'product', title: 'AFFOGATO AL CAFFÈ', desc: 'Boule de glace vanille associé à un Grand Cru Nespresso' },
                                { t: 'product', title: 'CHOCOLAT VIENNOIS', desc: 'Mélange onctueux de chocolat et lait chaud, surmonté de crème fouettée saupoudré de cacao' },
                                { t: 'product', title: 'CAFÉ VIENNOIS', desc: 'Mélange gourmand d’un Grand Cru Nespresso et de lait chaud, surmonté de crème fouettée saupudré de cacao' },
                            ]
                        }, {
                            t: 'cat',
                            title: 'NOS COUPES GLACÉES COMPOSÉES',
                            price: 11,
                            children: [
                                { t: 'product', title: 'DAME BLANCHE', desc: 'Glace vanille, sauce chocolat, chantilly' },
                                { t: 'product', title: 'CAFÉ LIEGEOIS', desc: 'Glace café-vanille, expresso, chantilly' },
                                { t: 'product', title: 'GRENOBLOISE', desc: 'Glace nougat, praliné, chocolat, morceaux de noix, coulis de caramel, chantilly' },
                                { t: 'product', title: 'CHOCOLAT LIÉGEOIS', desc: 'Glace chocolat noir, sauce chocolat chaud, chantilly' },
                            ]
                        }, {
                            t: 'cat',
                            title: 'NOS COUPES GLACÉES AUX FRUITS',
                            price: 12.9,
                            children: [
                                { t: 'product', title: 'YAOURT MELBA', desc: 'Glace yaourt - fraise, coulis de framboise, fraise fruits, chantilly' },
                                { t: 'product', title: 'FRAISE MELBA', desc: 'Glace fraise-vanille, coulis de framboises, fraises fruits, chantilly' },
                                { t: 'product', title: 'BANANA SPLIT', desc: 'Glace vanille fraise chocolat, banane fruit, sauce chocolat chaud, chantilly' },
                            ]
                        }, {
                            t: 'cat',
                            title: 'NOS COUPES ALCOOLISÉES',
                            price: 13.9,
                            children: [
                                { t: 'product', title: 'COLONEL', desc: 'Sorbet citron, Vodka' },
                                { t: 'product', title: 'AFTER EIGHT', desc: 'Glace menthe choco, framboise, chocolat, Get 27' },
                            ]
                        }, {
                            t: 'cat',
                            title: 'NOS GLACES ARTISANALES (Glaces des Alpes)',
                            children: [
                                { t: 'product', title: '1 parfum', price: 3 },
                                { t: 'product', title: '2 parfums', price: 5.5 },
                                { t: 'product', title: '3 parfums', price: 7.5 },
                                { t: 'product', title: 'Supplément chantilly', price:1.5 },
                                { t: 'ctn', ctn: 'Vanille, café, chocolat, chocolat blanc, praliné, caramel, nougat, yaourt, crème brulée, coco, rhum-raisin, menthe-chocolat, fraise, framboise, citron, cassis' },
                            ]
                        }
                    ]
                }, {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'NOS DESSERTS',
                            desc: 'FABRICATION ARTISANALE',
                            children: [
                                { t: 'product', title: 'MOUSSE AU CHOCOLAT', desc: 'et ses copeaux de chocolat blanc', price: 8.5 },
                                { t: 'product', title: 'CRÊME BRÛLÉE', desc: 'à la vanille de Bourbon', price: 8.5 },
                                { t: 'product', title: 'CRUMBLE AUX POMMES', desc: 'raisin et amandes et glace vanille', price: 8.5 },
                                { t: 'product', title: 'MOELLEUX AU CHOCOLAT', desc: 'et sa boule de framboise', price: 10 },
                                { t: 'product', title: 'LA COUPE DE FRAISES OU DE FRAMBOISES', price: 12 },
                                { t: 'product', title: '1/2 ANANAS FRAIS', price: 8.5 },
                                { t: 'product', title: 'TARTE DES DEMOISELLES TATIN', desc: 'boule vanillée et crème fouettée', price: 8.5 },
                                { t: 'product', title: 'LA PROFITEROLE', desc: 'chou craquelin soufflé à la vanille, chocolat chaud, chantilly (Mof)', price: 8.9 },
                                { t: 'product', title: 'PAVLOVA', desc: 'meringue, fruits rouges mélangés, glace vanille cassis, coulis de fruits rouges, chantilly', price: 12.5 },
                                { t: 'product', title: 'CRÊPES ou GAUFRE AU SUCRE', price: 5 },
                                { t: 'product', title: 'CRÊPES ou GAUFRE AU NUTELLA', price: 6 },
                                { t: 'product', title: 'CRÊPES FLAMBÉES AU GRAND MARNIER', price: 8 },
                                { t: 'product', title: 'CAFÉ GOURMAND', price: 10 },
                                { t: 'product', title: 'THÉ GOURMAND, CAPPUCCINO, CRÈME GOURMAND', price: 12 },
                            ]
                        }, {
                            t: 'cat',
                            title: 'NOS THÉS DAMMANN',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'THÉS NOIRS',
                                    price: 4,
                                    children: [
                                        { t: 'product', title: 'Breakfast', desc: 'tonique parfait pour bien commencer la journée' },
                                        { t: 'product', title: 'Earl Grey', desc: 'légèrement aromatisé à la bergamote' },
                                        { t: 'product', title: 'Ceylan', desc: 'thé noir subtilement parfumé' },
                                    ]
                                }, {
                                    t: 'cat',
                                    title: 'THÉS VERTS',
                                    price: 4.5,
                                    children: [
                                        { t: 'product', title: 'Gunpowder', desc: 'thé vert de Chine désaltérant «perles de thé>>' },
                                        { t: 'product', title: 'Jasmin', desc: 'au parfum de la fleur blanche, bel équilibre' },
                                        { t: 'product', title: 'À la menthe', desc: 'thé vert à la menthe' },
                                    ]
                                }, {
                                    t: 'cat',
                                    title: 'THÉS DÉTHÉINÉS',
                                    price: 4,
                                    children: [
                                        { t: 'product', title: 'Rooibos', desc: 'infusion à faible taux de tanin, exempte de caféine' },
                                    ]
                                }, {
                                    t: 'cat',
                                    title: 'INFUSIONS',
                                    price: 4.5,
                                    children: [
                                        { t: 'product', title: 'Camomille', desc: 'goût doux et fruité avec des notes d’ananas' },
                                        { t: 'product', title: 'Verveine', desc: 'légèrement citronné et de saveur très fruité' },
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            t: 'page',
            page: 'nespresso',
            cls: 'cols',
            children: [
                {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'LES CAFÉS NESPRESSO',
                            children: [
                                { t: 'product', title: 'RISTRETTO', desc: 'Intense et persistant | Intensité 9', price: 2.5 },
                                { t: 'product', title: 'ESPRESSO FORTE', desc: 'Rond et équilibré | Intensité 7', price: 2.5 },
                                { t: 'product', title: 'LUNGO FORTE', desc: 'Élégant et torréfié | Intensité 4', price: 2.5 },
                                { t: 'product', title: 'ESPRESSO DECAFFEINATO', desc: 'Dense et puissant | Intensité 7', price: 2.5 },
                                { t: 'product', title: 'MACCHIATO GLACE À LA FRAMBOISE', price: 6 },
                                { t: 'product', title: 'MACCHIATO GLACE À LA VANILLE', price: 6 },
                                { t: 'product', title: 'MACCHIATO GLACE A LA VIOLETTE', price: 6 },
                            ]
                        }
                    ]
                }, {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'LES RECETTES GOURMANDES NESPRESSO',
                            children: [
                                { t: 'product', title: 'ESPRESSO MACCHIATO', desc: 'Café Nespresso, surmonté d’un nuage de mousse de lait chaud', price: 2.7 },
                                { t: 'product', title: 'LATTE MACCHIATO', desc: 'Somptueux mélange de lait chaud, de mousse de lait chaud onctueuse et d’un Café Nespresso', price: 5 },
                                { t: 'product', title: 'CAPPUCCINO', desc: 'Café Nespresso, surmonté de mousse de lait chaud', price: 4.5 },
                                { t: 'product', title: 'CAFÉ CRÈME', desc: 'Café Nespresso allongé de lait chaud et surmonté d’une onctueuse couche de mousse de lait chaud', price: 4.5 },
                                { t: 'product', title: 'GOURMANDISE DE SPÉCULOOS', desc: 'Sirop spéculoos et lait chaud associés à un Café Nespresso, surmontés de mousse de lait chaud et saupoudrés de brisures de spéculoos', price: 6 },
                                { t: 'product', title: 'ICED MACCHIATO', desc: 'Mélange frappé d’un Café Nespresso et de glace pilée, surmonté d’une mousse de lait froid veloutée', price: 5 },
                                { t: 'product', title: 'CAFÉ VIENNOIS', desc: 'Mélange gourmand d’un Grand Cru Nespresso et de lait chaud, surmonté de crème fouetté et saupoudré de cacao', price: 6 },
                                { t: 'product', title: 'CHOCO-COOKIE MACCHIATO', desc: 'Mélange gourmand d’un café Nespresso, de lait chaud et de mousse de lait chaud agrémenté de sirop choco-cookie', price: 6 },
                                { t: 'product', title: 'CHOCOLAT VIENNOIS', desc: 'Mélange onctueux de chocolat et de lait chaud, surmonté de crème fouettée et saupoudré de cacao', price: 6 },
                                { t: 'product', title: 'GRAND CHOCOLAT CHAUD', desc: 'Chocolat et lait chaud', price: 6 },
                            ]
                        }
                    ]
                }
            ]
        },
        {
            t: 'page',
            page: 'petit-dejeuner',
            cls: 'cols',
            children: [
                { t: 'img', flex:1, img: 'https://www.lecosmo.numericmenu.com/img/menu/fr/pdejeuner-fr-d.jpg' },
                { t: 'img', flex:1, img: 'https://www.lecosmo.numericmenu.com/img/menu/fr/pdejeuner-fr-g.jpg' },
            ]
        },
        {
            t: 'page',
            page: 'boissons',
            cls: 'cols',
            children: [
                {
                    t: 'col',
                    children: [
                        {
                            t: "cat",
                            title: "NOS APERITIFS",
                            children: [
                                {
                                    t: "product",
                                    title: "Bitter (sans alcool)",
                                    price: 4
                                },
                                {
                                    t: "product",
                                    title: "Martini rouge\/blanc",
                                    cl: 4,
                                    price: 5
                                },
                                {
                                    t: "product",
                                    title: "Campari\/Porto",
                                    cl: 4,
                                    price: 5
                                },
                                {
                                    t: "product",
                                    title: "Pastis Ricard",
                                    cl: 3,
                                    price: 4
                                },
                                {
                                    t: "product",
                                    title: "Kir vin blanc",
                                    cl: 10,
                                    price: 5
                                },
                                {
                                    t: "product",
                                    title: "Kir royal",
                                    cl: 10,
                                    price: 12
                                },
                                {
                                    t: "product",
                                    title: "Coupe de Champagne",
                                    cl: 10,
                                    price: 10
                                },
                                {
                                    t: "product",
                                    title: "Americano Maison",
                                    cl: 8,
                                    price: 8
                                }
                            ]
                        }, {
                            t: "cat",
                            title: "SODAS",
                            children: [
                                {
                                    t: "product",
                                    title: "Coca-Cola, Coca Zéro, Fanta, Sprite",
                                    cl: 33,
                                    price: 4.5
                                },
                                {
                                    t: "product",
                                    title: "Orangina, Schweppes",
                                    cl: 25,
                                    price: 4.5
                                },
                                {
                                    t: "product",
                                    title: "Fever Tree Ginger Ale",
                                    cl: 20,
                                    price: 5
                                },
                                {
                                    t: "product",
                                    title: "Jus de fruits",
                                    cl: 25,
                                    desc: "Annanas, abricot, pomme, pamplemousse, tomate, orange, cramberry",
                                    price: 4.5
                                },
                                {
                                    t: "product",
                                    title: "Sirop à l'eau",
                                    price: 3
                                },
                                {
                                    t: "product",
                                    title: "Diabolo",
                                    price: 4.6
                                },
                                {
                                    t: "product",
                                    title: "Granity (menthe, grenadine, citron)",
                                    price: 4
                                },
                                {
                                    t: "product",
                                    title: "Orange \/ Citron pressé",
                                    price: 5
                                },
                                {
                                    t: "product",
                                    title: "Thé glacé Maison",
                                    price: 7
                                }
                            ]
                        }, {
                            t: "cat",
                            title: "LES DIGESTIFS",
                            children: [
                                { t: "product", title: "Limencello, Bailey's, Get 27, Poire Williams, Grappa, Amaretto", price: 7.5 },
                                { t: "product", title: "Armagnac, Cognac, Calvados (VSOP)", price: 9.5 },
                                { t: "product", title: "Cognac XO", price: 18 },
                                { t: "product", title: "IRISH COFFEE", price: 9.5 },
                                { t: "product", title: "FRENCH COFFEE", price: 9.5 },
                                { t: "product", title: "EXPRESSO MARTINI", price: 9.5 },
                            ]
                        }, {
                            t: "cat",
                            title: "LES EAUX PLATES ET PÉTILLANTES",
                            children: [
                                { t: "product", title: "EVIAN, BADOIT", cl: 100, price: 6.5 },
                                { t: "product", title: "EVIAN, BADOIT", cl: 50, price: 4.9 },
                                { t: "product", title: "EVIAN, BADOIT ROUGE", cl: 33, price: 4.5 },
                            ]
                        },
                    ]
                }, {
                    t: 'col',
                    children: [
                        {
                            t: "cat",
                            title: "NOS BIERES",
                            children: [
                                {
                                    t: "cat",
                                    title: "Les bières bouteilles",
                                    children: [
                                        {
                                            t: "cat",
                                            title: "BLONDES",
                                            children: [
                                                {
                                                    t: "product",
                                                    title: "BIÈRE SANS ALCOOL",
                                                    cl: 25,
                                                    price: 4.5
                                                },
                                                {
                                                    t: "product",
                                                    title: "DUVEL",
                                                    cl: 33,
                                                    price: 6
                                                },
                                                {
                                                    t: "product",
                                                    title: "DESPERADOS",
                                                    cl: 33,
                                                    price: 6
                                                },
                                                {
                                                    t: "product",
                                                    title: "HEINEKEN",
                                                    cl: 33,
                                                    price: 6
                                                },
                                                {
                                                    t: "product",
                                                    title: "CORONA",
                                                    cl: 35.5,
                                                    price: 7
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    t: "cat",
                                    title: "Les bières artisanales",
                                    children: [
                                        {
                                            t: "product",
                                            title: "la bière Bacho Ambrée - Yuma",
                                            cl: 33,
                                            price: 6.5
                                        },
                                        {
                                            t: "product",
                                            title: "la bière Bacho Blanche - Wheat Béer",
                                            cl: 33,
                                            price: 6.5
                                        },
                                    ]
                                },
                                {
                                    t: "cat",
                                    title: "Les biéres pressions",
                                    tPrice: "25cl",
                                    tPrice2: "50cl",
                                    tPrice3: "100cl",
                                    children: [
                                        {
                                            t: "product",
                                            title: "Pression Warsteiner Blonde",
                                            price: 4,
                                            price2: 7.5,
                                            price3: 13
                                        },
                                        {
                                            t: "product",
                                            title: "Monaco",
                                            price: 4.1,
                                            price2: 7.6,
                                            price3: 13
                                        },
                                        {
                                            t: "product",
                                            title: "Panaché",
                                            price: 4,
                                            price2: 7.5,
                                            price3: 13
                                        },
                                        {
                                            t: "product",
                                            title: "Pression Grimbergen Brune",
                                            price: 4.1,
                                            price2: 7.6,
                                            price3: 13
                                        },
                                    ]
                                },
                            ]
                        }, {
                            t: "cat",
                            title: "LES SPIRITUEUX",
                            children: [{
                                t: "cat",
                                title: "LES GINS",
                                children: [
                                    {
                                        t: "product",
                                        title: "Gin Gordon's 37,5°",
                                        price: 7.5,
                                        cl: 4
                                    }
                                ]
                            }, {
                                t: "cat",
                                title: "LES VODKAS",
                                children: [
                                    {
                                        t: "product",
                                        title: "Vodka Smirnoff 37,5°",
                                        price: 7.5,
                                        cl: 4
                                    }
                                ]
                            }, {
                                t: "cat",
                                title: "LES RHUMS",
                                children: [
                                    {
                                        t: "product",
                                        title: "Rhum Havana 3 ans",
                                        price: 8,
                                        cl: 4
                                    },
                                    {
                                        t: "product",
                                        title: "Rhum Ti Arrangés de Ced Mangue Passion",
                                        price: 9.5,
                                        cl: 4
                                    },
                                    {
                                        t: "product",
                                        title: "Rhum Ti Arrangés de Ced Victoria Ananas",
                                        price: 9.5,
                                        cl: 4
                                    },
                                    {
                                        t: "product",
                                        title: "Le Diplomatico 40°",
                                        price: 15,
                                        cl: 4
                                    }
                                ]
                            }, {
                                t: "cat",
                                title: "LA CAVE À WHISKY",
                                children: [
                                    {
                                        t: "product",
                                        title: "J&B",
                                        price: 7,
                                        cl: 4
                                    },
                                    {
                                        t: "product",
                                        title: "Jack Daniel's, Chivas, Johnny Walker Black Label",
                                        price: 10,
                                        cl: 4
                                    },
                                    {
                                        t: "product",
                                        title: "Nikka Whisky (Japonais), Cardhu",
                                        price: 12,
                                        cl: 4
                                    }
                                ]
                            }],
                        },
                        { t: 'ctn', textAlign: 'center', height: 30, ctn: 'L’abus d’alcool est dangereux pour la santé' }
                    ]
                }
            ]
        },
        {
            t: 'page',
            page: 'cocktails',
            cls: 'cols',
            children: [
                {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'COCKTAIL SANS ALCOOOL',
                            price: 10,
                            children: [
                                { t: 'product', title: 'PARADISE', info: 'Jus d’orange, ananas, sirop de grenadine, fruits frais' },
                                { t: 'product', title: 'DETOX', info: 'Jus de pomme, concombre frais, menthe, gingembre, citron' },
                                { t: 'product', title: 'VIRGIN MOJITO', info: 'Citron, menthe, sucre de canne, Perrier' },
                                { t: 'product', title: 'VIRGIN PINA COLADA', info: 'Jus d’ananas, glace noix de coco' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'COCKTAIL SIGNATURES AVEC ALCOOL',
                            price: 12.5,
                            children: [
                                { t: 'product', title: 'TI COSMO', info: 'Ti Arrangés de Ced Mangue Pasion, Triple sec, jus de cranberry, citron vert, 1/2 fruit de la passion' },
                                { t: 'product', title: 'EXOTIC PASSION', info: 'Passoa Passion, Vodka, crème de fraise, jus d’ananas et pamplemouse' },
                                { t: 'product', title: 'PINA COSMO', info: 'Glace Coco, Rhum Ti Arrangé de Ced Victoria Ananas, jus d’ananas mixé' },
                                { t: 'product', title: 'CARRABEAN PUCNH', info: 'Rhum, Amaretto, Malibu, jus d’ananas, Citron vert shaké' },
                                { t: 'product', title: 'RASPBERRY COSMO', info: 'Gin, Vodka, sirop de framboises, citron vert, cramberry, perrier' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'LES MOJITOS',
                            children: [
                                { t: 'product', title: 'MOJITO CLASSIQUE', price: 11 },
                                { t: 'product', title: 'MOJITO FRAISES', price: 13.5 },
                                { t: 'product', title: 'MOJITO FRAMBOISES', price: 13.5 },
                                { t: 'product', title: 'MOJITO ROYAL', price: 15 },
                            ]
                        }
                    ]
                }, {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'LES CLASSIQUES',
                            price: 11,
                            children: [
                                { t: 'product', title: 'APEROL SPRITZ' },
                                { t: 'product', title: 'CAIPIRHINA' },
                                { t: 'product', title: 'PINA COLADA' },
                                { t: 'product', title: 'DAIQUIRI' },
                                { t: 'product', title: 'COSMOPOLITAIN' },
                                { t: 'product', title: 'MARGHARITA' },
                                { t: 'product', title: 'BLOODY MARY' },
                                { t: 'product', title: 'GIN FIZZ' },
                                { t: 'product', title: 'CUBA LIBRE' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'LES SOURS',
                            price: 11,
                            children: [
                                { t: 'product', title: 'AU CHOIX', desc: 'Whisky, Rhum, Amaretto, Vodka, Citron, sucre, blanc d’oeuf' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'LES FROZENS',
                            price: 12.5,
                            children: [
                                { t: 'product', title: 'DAIQUIRI FROZEN' },
                                { t: 'product', title: 'DAIQUIRI FROZEN FRAISES' },
                                { t: 'product', title: 'MARGHARITA FROZEN' },
                                { t: 'product', title: 'MARGHARITA FROZEN FRAISES' },
                            ]
                        },
                        { t: 'ctn', textAlign: 'center', height: 30, ctn: 'L’abus d’alcool est dangereux pour la santé' }
                    ]
                }
            ]
        },
        {
            t: 'page',
            page: 'vins',
            cls: 'cols',
            children: [
                {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'VINS ROUGES (75cl)',
                            // cl: 75,
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Vins de Provence',
                                    children: [
                                        { t: 'product', title: 'CHATEAU LEOUBE', info: 'léger et fruité', bio: true, aop: true, price: 48 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vins de Bordeaux',
                                    children: [
                                        { t: 'product', title: 'CHÂTEAU MOULIN DE CANHAUT', info: 'puissant et tannique', desc: 'Médoc', aoc: true, price: 37 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vins de Loire',
                                    children: [
                                        { t: 'product', title: 'DOMAINE DE LA NOBLAIE', info: '(LE TEMPS DE CERISES)', desc: 'Chinon léger et fruité', bio: true, aoc: true, price: 0 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vins du Rhône',
                                    children: [
                                        { t: 'product', title: 'EQUIS - MAXIME GRAILLOT', info: 'puissant et tannique', desc: 'Crozes Hermitage', bio: true, aoc: true, price: 57 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'cat',
                            title: 'VINS BLANCS',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Vins de Provence',
                                    children: [
                                        { t: 'product', title: 'LOVE DE LEOUBE', info: 'frais et léger', bio: true, aoc: true, price: 32 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vins de Loire',
                                    children: [
                                        { t: 'product', title: 'DOMAINE DE LA BRETONNIERE - PRESTIGE', info: 'sec et minéral', desc: 'Muscadet Sèvre et Maine', aop: true, price: 28 },
                                        { t: 'product', title: 'DOMAINE THIBAULT DENIZOT', info: 'puissant et boisé', desc: 'Sancerre', aoc: true, price: 43 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vins de Bourgogne',
                                    children: [
                                        { t: 'product', title: 'DOMAINE GUILLAUME VRIGNAUD', info: 'puissant et boisé', desc: 'Chablis', bio: true, aoc: true, price: 39 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Vin Italien',
                                    desc: 'Vin blanc mousseux',
                                    children: [
                                        { t: 'product', title: 'PROSECCO', info: 'pétillant', aoc: true, price: 28 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'cat',
                            title: 'VINS ROSÉS',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Cotes de Provence',
                                    children: [
                                        { t: 'product', title: 'LOVE DE LEOUBE', info: 'frais et fruité', bio: true, aoc: true, price: 32 },
                                        { t: 'product', title: 'CHÂTEAU MINUTY (CUVÉE PRESTIGE)', info: 'léger et sec AOP', price: 39 },
                                        { t: 'product', title: 'DOMAINES OTT - CHÂTEAU DE SELLE', info: 'léger et sec AOC', price: 70 },
                                        { t: 'product', title: 'LE MAGNUM ROSÉ «< LOVE DE LÉOUBE»', info: 'frais et fruité', price: 70 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'cat',
                            title: 'VIN AU PICHET',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Rouge, rose, blanc (50cl)',
                                    // cl: 50,
                                    children: [
                                        { t: 'product', title: 'PAYS DU VAR IGP MEDITERRANNEE', price: 11 },
                                    ]
                                },
                            ]
                        }
                    ]
                }, {
                    t: 'col',
                    children: [
                        {
                            t: 'cat',
                            title: 'VIN AU VERRE',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Rouge',
                                    children: [
                                        { t: 'product', title: 'PROVENCE', info: 'léger et fruité', aop: true, price: 7.5 },
                                        { t: 'product', title: 'MÉDOC', info: 'puissant et racé', aoc: true, price: 8 },
                                        { t: 'product', title: 'CÔTES DU RHONE', info: 'puissant et fruité', aoc: true, price: 8.5 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Rosé',
                                    children: [
                                        { t: 'product', title: 'LOVE DE LÉOUBE', info: 'frais et fruité', desc: 'Côtes de Provence', aoc: true, price: 7 },
                                        { t: 'product', title: 'MINUTY - CUVÉE PRESIGE', info: 'léger et sec', desc: 'Côtes de Provence', aop: true, price: 9 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Blanc',
                                    children: [
                                        { t: 'product', title: 'PROVENCE', info: 'léger et fruité', aoc: true, price: 8 },
                                        { t: 'product', title: 'SANCERRE', info: 'puissant et boisé', aoc: true, price: 9 },
                                        { t: 'product', title: 'CHARDONNAY', info: 'frais et fruité', aoc: true, price: 7 },
                                        { t: 'product', title: 'MUSCADET', info: 'sec et minéral', bio: true, aop: true, price: 7 },
                                        { t: 'product', title: 'PROSECCO', info: 'pétillant', aoc: true, price: 6 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'ctn',
                            cls: 'center italic',
                            height: 40,
                            ctn: 'TOUS NOS VINS CONTIENNENT DU SULFITE'
                        }, {
                            t: 'cat',
                            title: 'CHAMPAGNES',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'Champagnes',
                                    children: [
                                        { t: 'product', title: 'CHAMPAGNES QUENARDEL', price: 59 },
                                        { t: 'product', title: 'CHAMPAGNES GOSSET - GRANDE RÉSERVE', price: 80 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'Champagnes de prestige',
                                    children: [
                                        { t: 'product', title: 'CHAMPAGNES CRISTAL ROEDERER', price: 399 },
                                    ]
                                },
                            ]
                        }, {
                            t: 'cat',
                            cls: 'cat-border',
                            title: 'NOS BOUTEILLES PRESTIGES',
                            children: [
                                {
                                    t: 'cat',
                                    title: 'BLANCS',
                                    children: [
                                        { t: 'product', title: 'CHÂTEAU YQUEM (VIN MOELLEUX)', info: 'Sauternes - Bordelais - 2011', price: 290 },
                                    ]
                                },
                                {
                                    t: 'cat',
                                    title: 'ROUGES',
                                    children: [
                                        { t: 'product', title: 'CHÂTEAU BATEAILLEYR', info: 'Pauillac - Bordelais - 2005', price: 95 },
                                        { t: 'product', title: 'CHÂTEAU MONTROSE', price: 150 },
                                        { t: 'product', title: 'CHÂTEAU PAVIE', info: 'Saint Emilion Grand Cru - Bordelais - 1997', price: 270 },
                                        { t: 'product', title: 'CHÂTEAU CHEVAL BLANC', info: 'Saint Emilion Grand Cru - Bordelais - 1979', price: 450 },
                                        { t: 'product', title: 'CHÂTEAU NENIN', info: 'Pomerol - Bordelais - 2000', price: 95 },
                                        { t: 'product', title: 'CHÂTEAU DE SALES', info: 'Pomerol - Bordelais - 1999', price: 80 },
                                        { t: 'product', title: 'DOMAINE DUFOULEUR', info: 'Charmes Chambertin Grand Cru - 2006', price: 110 },
                                    ]
                                },
                            ]
                        },
                        { t: 'ctn', textAlign: 'center', height: 30, ctn: 'L’abus d’alcool est dangereux pour la santé' }
                    ]
                }
            ]
        },
        {
            t: 'page',
            page: 'enfant',
            alignItems: 'center',
            fontSize: '1.3em',
            children: [
                {
                    t: 'cat',
                    title: 'Menu Enfant',
                    desc: 'Jusqu’à 11 ans',
                    price: 13,
                    children: [
                        {
                            t: 'cat',
                            title: 'PLATS (AU CHOIX)',
                            children: [
                                { t: 'product', title: 'Steak haché frais pur boeuf «Charolais» - Frites (+1€)' },
                                { t: 'product', title: 'Poulet Pané - Frites' },
                                { t: 'product', title: 'Escalope de Saumon - Frites (+1€)' },
                                { t: 'product', title: 'Beef Burger - Frites (+3€)' },
                                { t: 'product', title: 'La P’Tite Margherita' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'DESSERTS (AU CHOIX)',
                            children: [
                                { t: 'product', title: 'Crêpe au sucre ou nutella' },
                                { t: 'product', title: 'Glace (1 boule) parfums au choix' },
                            ]
                        },
                        {
                            t: 'cat',
                            title: 'BOISSONS (AU CHOIX)',
                            children: [
                                { t: 'product', title: 'jus de fruits' },
                                { t: 'product', title: 'sirop à l’eau' },
                                { t: 'product', title: 'sodas' },
                            ]
                        },
                    ]
                },
            ]
        },
        {
            id: 'footer',
            t: 'row',
            children: [{
                cls: 'col',
                flex: 1,
                children: [
                    { ctn: `<b>ALLERGÈNES:</b><br>1:Gluten, 2:Crustacés, 3:Œufs, 4:Arachides, 5:Poissons, 6:Soja, 7:Lait, 8:Fruit à coque, 9:Céléri, 10:Moutarde, 11:Sésame, 12:Sulfite, 13:Lupin, 14:Mollusque`, mb: 10 },
                    {
                        t: 'row',
                        cls: 'footer_icons',
                        children: [
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-ticket.jpg` },
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-ancv.jpg` },
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-cards.jpg` },
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-especes.jpg` },
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-applepaid.jpg` },
                            { t: 'img', img: `https://www.lecosmo.numericmenu.com/img/icon-ticket.jpg` },
                        ]
                    },
                    { ctn: `PRIX NETS - SERVICE COMPRIS`, textAlign: 'center', fontSize: '0.8em' },
                ]
            }, {
                ctn: ``,
                del: true,
            }, {
                t: 'carousel',
                w: '314px',
                h: '183px',
                anim: 'zoom',
                children: [
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-1.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-2.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-4.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-5.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-6.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-7.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-8.jpg` },
                    { bgImg: `https://www.lecosmo.numericmenu.com/img/plats/plat-9.jpg` },
                ]
            }]
        },
    ]
}

// app.app.cosmo = mainData;

export default cosmo;



// const lang: NodeData = {
//     template: 'lang',
//     props: [
//         { name: 'iso', type: 'string', label: 'iso' },
//     ],
//     t: 'btn',
//     m: 5,
//     w: 80,
//     h: 80,
//     bgPosX: 'center',
//     bgPosY: 'center',
//     bgRepeat: 'no-repeat',
//     bgSize: 'contain',
// };
// const lang: NodeData = {
//     template: 'lang',
//     props: [
//         { name: 'iso', type: 'string', label: 'iso' },
//     ],
//     t: 'btn',
//     m: 5,
//     w: 80,
//     h: 80,
//     bgPosX: 'center',
//     bgPosY: 'center',
//     bgRepeat: 'no-repeat',
//     bgSize: 'contain',
// };

// const title: NodeData = {
//     template: "title",
// };

// const row: NodeData = {
//     template: "row",
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
// };

// const col: NodeData = {
//     template: "col",
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'stretch',
//     justifyContent: 'flex-start',
// };

// const product: NodeData = {
//     template: "product",
//     props: [
//         { name: 'title', type: 'html', label: 'titre' },
//         { name: 'info', type: 'html', label: 'info' },
//         { name: 'info2', type: 'html', label: 'price' },
//         { name: 'price', type: 'price', label: 'price' },
//         { name: 'desc', type: 'html', label: 'desc' },
//     ],
//     //     html: `
//     // <div class="row">
//     //     <div class="title">{{title}}</div>
//     //     <div class="info">{{info}}</div>
//     //     <div class="price">{{price}}</div>
//     // </div>
//     // {{desc}}`,
//     children: [{
//         t: 'row',
//         children: [
//             { html: '{{title}}', fontWeight: 'bold' },
//             { html: '{{info}}' },
//             { flex: 1 },
//             { html: '{{price}}' },
//         ]
//     }, {
//         html: '{{desc}}'
//     }]
// };

app.app.cosmo = cosmo;