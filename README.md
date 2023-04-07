# Vizualizér usporiadaného zoznamu

Vizualizér má pomôcť lepšie pochopiť algoritmy pre prácu s upsporiadaným zoznamom  z článku 'Two Simplified Algorithms for Maintaining Order in a List' (https://erikdemaine.org/papers/DietzSleator_ESA2002/paper.pdf).

## Spustenie

Je potrebné stiahnuť si celú zložku z gitlabu, rozbaliť stiahnutý zip/tar a otvoriť v prehliadači súbor js-vis/cytoscape/index.html .

## Ovládanie

Vizualizér ovládame cez horný panel. Naľavo nájdeme riadky Initialize, Insert, Delete a Order pre prácu s usporiadaným zoznamom. V strede máme možnosť vygenerovať náhodný usporiadaný zoznam a zapnúť/vypnúť zobrazenie virtuálneho stromu. Napravo sa nachádza okno, kam vizualizér píše informácie ohĺadom prebiehajúcich operácií.

#### Initialize

Usporiadaný zoznam treba najprv inicializovať: v riadku 'Initialize' vyplníme počiatočnú hodnotu x, vyberieme štruktúru, ktorou chceme usporiadaný zoznam implementovať, a stlačíme '▶'.

#### Insert
Do usporiadaného zoznamu vieme vložiť novú hodnotu: v riadku 'Insert' vyplníme hodnotu x (za ktorú chceme vkladať), hodnotu y (ktorú chceme vložiť) a stlačíme '▶'. Po zahájení operácie sa vieme posúvať po krokoch tlačítkom '▶' alebo dokončiť operáciu instantne tlačítkom '▶▶'.

#### Delete
Z usporiadaného zoznamu môžeme hodnoty odstrániť: v riadku 'Delete' vyplníme hodnotu x, ktorú chceme odstrániť, a stlačíme '▶'. Po zahájení operácie sa vieme posúvať po krokoch tlačítkom '▶' alebo dokončiť operáciu instantne tlačítkom '▶▶'.

#### Order
Usporiadaný zoznam dokáže vyhodnotiť usporiadanie 2 prvkov: v riadku 'Order' vyplníme hodnoty x, y a stlačíme '▶'. Po zahájení operácie sa vieme posúvať po krokoch tlačítkom '▶' alebo dokončiť operáciu instantne tlačítkom '▶▶'.

#### Generate random
Pri generovaní nového neprázdneho usporiadaného zoznamu máme možnosť vybrať si štruktúru, ktorou chceme usporiadaný zoznam implementovať, a hodnoty ktorými bude plnený. Následne stlačíme 'Generate random' a vykreslí sa nám nový usporiadaný zoznam.
