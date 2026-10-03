const fs=require('fs');const path=require('path');
const ledger=JSON.parse(fs.readFileSync(path.join(__dirname,'../saravoia-research/Saravoia-Source-Ledger.json'),'utf8').replace(/^\uFEFF/,''));
const find=t=>{const r=ledger.records.find(r=>r.exact_term===t);if(!r)throw Error(t);return r};
const safeRecord=r=>({id:r.id,title:r.exact_term,text:r.claim,layer:r.evidence_layer,status:r.status,refs:r.evidence.filter(e=>!['D','R'].includes(e.source_id)).map(e=>({source:e.source_id,start:e.line_start,end:e.line_end,quote:e.exact_text})),secondary:r.secondary_source});
const placeSpecs=[
['Witchtown / 68632','Witchtown','Residential quarter','Black iron and gold vines mark the entrance. Broad walks pass apple trees, rose bushes and modest houses in varied colours.','A residential quarter within the Cetatea, with an open public square and roads meeting at Cauldron Fret.'],
['Cauldron Fret / 68939','Cauldron Fret','The residential crossroads','Four named roads meet among rows of small houses with varied construction.','The room signs name Bauble Terrace, Rosethorn Boulevard, Fluvial Court and Ashbeast Park. The written help directions and observed route differ for two roads.'],
['Witchfort','Witchfort','Fortified approach','Blackened metal, crystalline finishes, circular towers and a broad portcullis define the keep’s entrance.','The gatehouse continues in steel and granite, with torch recesses behind tempered glass, a ribbed vault and cold-iron stairs.'],
['Tetra / Beyond the Witchfort','The Tetra','Bailey and central court','A five-sided bailey paved in white granite with black-brick trim. Towers rise to either side.','The eastern tower has a copper door bearing a rod entwined with serpents; the western tower is described as black and fortified.'],
['The Saravyn Gate','The Saravyn Gate','Cavernous gatehouse','A massive iron gate has a dark, gritty finish of crystal fragments beneath heavy torches.','The gatehouse forms part of the captured approach from the foothills toward the Witchfort.'],
['Albedo Plaza / Vitrae','Albedo Plaza & Vitrae','Library, apothecary, medical','A white tower has a crystalline coating and copper treatments around its doors and windows.','The sign reads “Vitrae. Library, Apothecary, Medical.” Its relationship to the name Tor\'Vitrae awaits clarification.'],
['Ruganala Square','Ruganala Square','Caravan crossroads','An expansive square accommodates caravans and trade traffic.','An unnamed shieldmaiden in black armour is described mounted on a black dire bat.'],
['Rugalana Road','Rugalana Road','Storage and residential approach','A white road branches toward granaries and silos, with the Witchtown arch visible beyond hedges.','Rugalana Road and Ruganala Square are preserved as their separately captured spellings.'],
['Cabotsaria','Cabotsaria','First settlement','The Chronicle identifies Cabotsaria as Saravoia’s first settlement.','Land acquisition and construction are separately dated in the County account.'],
['Atralanzari, Palace of the Black Sun / Grand Hall 15244 / Grand Court of the Saravyn 66600','Palace of the Black Sun','Palace and court','The palace, Grand Hall and Grand Court are identified in the earlier Travel Guide summary.','The original guide and room descriptions are still needed before reconstructing the palace or Saravyn Throne.']
];
const places=placeSpecs.map(([term,name,kicker,summary,body])=>({...safeRecord(find(term)),name,kicker,summary,body}));
const peopleSpecs=[
['Nezaya Visindi','Nezaya Visindi','Countess of Saravoia','County Chronicle author; the handoff designates Nezaya as the reviewer for this archive.'],
['Gaelyn of Hashan / Gaelyn of Saravoia','Gaelyn of Saravoia','Viscount · Lord Protector','The Chronicle records the title Vynren and later appointment as Viscount and Lord Protector.'],
['Kirsi Moliuvia','Kirsi Moliuvia','Vynlada','The Chronicle records Kirsi becoming Saravyn and receiving the title Vynlada in 988 AF.'],
['Neugierig Stormsong','Neugierig Stormsong','Court Musician · Emissary','Named in the Chronicle’s adventurer settlement entry and later public festival planning.'],
['Shieldmaiden Althira','Althira','Shieldmaiden','Described on the cliffside road in black armour, carrying a red shield.'],
['Shieldmaiden Veliyah','Veliyah','Shieldmaiden','Named within the torch-lit Witchfort gatehouse.'],
['Ser Aerek','Aerek','Diplomacy and Chronicle records','Named in border proclamations, diplomatic exchanges, public statements and battle reports.'],
['Urdu, Crone of Reckoning','Urdu','Crone of Reckoning','The Chronicle attributes advice concerning the end of the battle to Urdu.']
];
const people=peopleSpecs.map(([term,name,kicker,summary])=>({...safeRecord(find(term)),name,kicker,summary}));
const timeline=ledger.records.filter(r=>r.category==='history/chronology').map(safeRecord);
const books=ledger.book_catalogue.map(b=>({id:b.object_id,title:b.title_column_exact,author:b.author_column_exact,relevance:b.relevance,line:b.line}));
const extraTerms=['Saravyn Navy / SNS','SNS Shadow Witch','SNS Auric Lance','SNS Scarlet Dancer','CLHELP SAMPLES / Saravyn Sample Scouting, for you carpenters.','The Visindi Collection','Moonlit Menagerie of Art','Moonlit Mirror','Gules, a bat displayed Or.','Saravic','Asa-thi lienakhar','Chaire Trisagia!','Vynlada / Vynren / Saravyn','The Vaiquinar / Vaiquin / Vaiquinar','Handoff material direction','Lord Vastar','Lord Scarlatti','Order of the Sky / Emissary of Whiirh','Code of Sarave, vol I','Saravoia Chronicle','Saravyn Oaths / Vynlada Oaths / Oath of Office','Travel Guide / CLHELP TRAVELGUIDE / CLTHELP TRAVELGUIDE / LANDMARKS','1018 Asterian Festival'];
const extra=extraTerms.map(t=>safeRecord(find(t)));
const data={places,people,timeline,books,extra,sources:ledger.sources.filter(s=>!['D','R','P'].includes(s.id)).map(s=>({id:s.id,name:s.name,kind:s.kind})),updated:'3 October 2026'};
fs.writeFileSync(path.join(__dirname,'dist/data.js'),'window.SARAVOIA='+JSON.stringify(data)+';\n');
console.log(`Prepared ${places.length} places, ${people.length} people, ${timeline.length} events and ${books.length} catalogue entries.`);
