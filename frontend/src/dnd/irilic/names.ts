import React from 'react';
import { copyFile } from 'fs';

// https://www.babynames.net/all/gaelic 
// copy(JSON.stringify([...document.getElementsByClassName("names-container")[0].getElementsByTagName("li")].filter(elem => elem.className !== "list-ad").map(elem => {
//     const gender = elem.getElementsByClassName("result-gender")[0].className.substr(14)
//     const name = elem.getElementsByClassName("result-name")[0].textContent
//     return {gender, name}
// })))

const names = [
    [{ "gender": "boy", "name": "Adair" }, { "gender": "girl", "name": "Afton" }, { "gender": "boy", "name": "Ahearn" }, { "gender": "boygirl", "name": "Aidan" }, { "gender": "boygirl", "name": "Ailbhe" }, { "gender": "boy", "name": "Ailpein" }, { "gender": "girl", "name": "Ailsa" }, { "gender": "girl", "name": "Aine" }, { "gender": "girl", "name": "Aisling" }, { "gender": "boy", "name": "Alan" }],
    [{ "gender": "boy", "name": "Alby" }, { "gender": "boy", "name": "Alpin" }, { "gender": "boy", "name": "Angus" }, { "gender": "girl", "name": "Ansley" }, { "gender": "girl", "name": "Aoibheann" }, { "gender": "boy", "name": "Argyle" }, { "gender": "girl", "name": "Arin" }, { "gender": "boy", "name": "Arlen" }, { "gender": "girl", "name": "Arlene" }, { "gender": "boygirl", "name": "Arlie" }],
    [{ "gender": "boy", "name": "Arlo" }, { "gender": "boy", "name": "Artair" }, { "gender": "boy", "name": "Arthur" }, { "gender": "boy", "name": "Artturi" }, { "gender": "boy", "name": "Arturo" }, { "gender": "boygirl", "name": "Athol" }, { "gender": "boy", "name": "Bain" }, { "gender": "boy", "name": "Baines" }, { "gender": "boy", "name": "Baird" }, { "gender": "boy", "name": "Balfour" }],
    [{ "gender": "boy", "name": "Barris" }, { "gender": "boy", "name": "Barry" }, { "gender": "girl", "name": "Beathag" }, { "gender": "boy", "name": "Beathan" }, { "gender": "boy", "name": "Blaine" }, { "gender": "boygirl", "name": "Blair" }, { "gender": "boy", "name": "Bowie" }, { "gender": "boy", "name": "Boyd" }, { "gender": "boy", "name": "Brady" }, { "gender": "boy", "name": "Brannon" }],
    [{ "gender": "boy", "name": "Brawley" }, { "gender": "boy", "name": "Brayan" }, { "gender": "boy", "name": "Brendan" }, { "gender": "boy", "name": "Brennan" }, { "gender": "boy", "name": "Broderick" }, { "gender": "boy", "name": "Brody" }, { "gender": "boygirl", "name": "Brogan" }, { "gender": "boygirl", "name": "Bronte" }, { "gender": "boy", "name": "Bryant" }, { "gender": "boy", "name": "Bryden" }],
    [{ "gender": "boy", "name": "Buchanan" }, { "gender": "boy", "name": "Caden" }, { "gender": "boy", "name": "Cadman" }, { "gender": "boy", "name": "Caedmon" }, { "gender": "boy", "name": "Cael" }, { "gender": "boygirl", "name": "Caelan" }, { "gender": "boy", "name": "Cairbre" }, { "gender": "boy", "name": "Calahan" }, { "gender": "boy", "name": "Calder" }, { "gender": "boy", "name": "Cale" }],
    [{ "gender": "boy", "name": "Callan" }, { "gender": "boygirl", "name": "Cameron" }, { "gender": "boy", "name": "Campbell" }, { "gender": "girl", "name": "Caoimhe" }, { "gender": "boy", "name": "Carberry" }, { "gender": "boygirl", "name": "Carey" }, { "gender": "boy", "name": "Carlin" }, { "gender": "boy", "name": "Carrick" }, { "gender": "boy", "name": "Carroll" }, { "gender": "boy", "name": "Carson" }],
    [{ "gender": "boygirl", "name": "Casey" }, { "gender": "boy", "name": "Cathal" }, { "gender": "boy", "name": "Cayden" }, { "gender": "boy", "name": "Caz" }, { "gender": "boy", "name": "Cearney" }, { "gender": "boy", "name": "Cian" }, { "gender": "boy", "name": "Clancy" }, { "gender": "boy", "name": "Cleary" }, { "gender": "boy", "name": "Cleland" }, { "gender": "boy", "name": "Clooney" }],
    [{ "gender": "boy", "name": "Clyde" }, { "gender": "boy", "name": "Cody" }, { "gender": "boy", "name": "Coleman" }, { "gender": "boy", "name": "Collens" }, { "gender": "boy", "name": "Collin" }, { "gender": "boy", "name": "Colvin" }, { "gender": "boy", "name": "Conall" }, { "gender": "boy", "name": "Conan" }, { "gender": "boy", "name": "Conn" }, { "gender": "boy", "name": "Connolly" }],
    [{ "gender": "boy", "name": "Connor" }, { "gender": "boy", "name": "Connors" }, { "gender": "boy", "name": "Corbin" }, { "gender": "boy", "name": "Cormac" }, { "gender": "boy", "name": "Cormag" }, { "gender": "boy", "name": "Corridon" }, { "gender": "boy", "name": "Corrigan" }, { "gender": "boy", "name": "Corrin" }, { "gender": "boy", "name": "Coulter" }, { "gender": "boy", "name": "Cowan" }],
    [{ "gender": "boy", "name": "Craig" }, { "gender": "boy", "name": "Cray" }, { "gender": "boy", "name": "Cullen" }, { "gender": "boy", "name": "Currie" }, { "gender": "boy", "name": "Dacey" }, { "gender": "boy", "name": "Daire" }, { "gender": "boy", "name": "Daley" }, { "gender": "girl", "name": "Damhnait" }, { "gender": "boy", "name": "Darragh" }, { "gender": "girl", "name": "Deirbhile" }],
    [{ "gender": "girl", "name": "Deirdre" }, { "gender": "girl", "name": "Delaney" }, { "gender": "girl", "name": "Delma" }, { "gender": "boy", "name": "Dempsey" }, { "gender": "girl", "name": "Deoiridh" }, { "gender": "girl", "name": "Derval" }, { "gender": "girl", "name": "Dervila" }, { "gender": "boy", "name": "Desmond" }, { "gender": "boy", "name": "Devaughn" }, { "gender": "boygirl", "name": "Devin" }],
    [{ "gender": "boy", "name": "Devlin" }, { "gender": "girl", "name": "Devnet" }, { "gender": "boygirl", "name": "Devon" }, { "gender": "boy", "name": "Devonte" }, { "gender": "boy", "name": "Dolan" }, { "gender": "boy", "name": "Domnall" }, { "gender": "boy", "name": "Don" }, { "gender": "boy", "name": "Donald" }, { "gender": "girl", "name": "Donalda" }, { "gender": "girl", "name": "Donaldina" }],
    [{ "gender": "girl", "name": "Donella" }, { "gender": "boy", "name": "Donnagan" }, { "gender": "boy", "name": "Donnchad" }, { "gender": "boy", "name": "Donnell" }, { "gender": "boy", "name": "Donnelly" }, { "gender": "boy", "name": "Donnie" }, { "gender": "boy", "name": "Donovan" }, { "gender": "boy", "name": "Dougal" }, { "gender": "boy", "name": "Douglas" }, { "gender": "boy", "name": "Doyle" }],
    [{ "gender": "boy", "name": "Driscoll" }, { "gender": "boy", "name": "Drystan" }, { "gender": "girl", "name": "Duana" }, { "gender": "boy", "name": "Duane" }, { "gender": "boy", "name": "Duffy" }, { "gender": "boy", "name": "Dugald" }, { "gender": "boy", "name": "Dugan" }, { "gender": "boy", "name": "Duncan" }, { "gender": "girl", "name": "Dymphna" }, { "gender": "boy", "name": "Eachann" }],
    [{ "gender": "girl", "name": "Eavan" }, { "gender": "boy", "name": "Edan" }, { "gender": "girl", "name": "Edna" }, { "gender": "boy", "name": "Egan" }, { "gender": "boy", "name": "Egon" }, { "gender": "girl", "name": "Eimear" }, { "gender": "girl", "name": "Eimhir" }, { "gender": "girl", "name": "Eithne" }, { "gender": "girl", "name": "Elva" }, { "gender": "girl", "name": "Emer" }],
    [{ "gender": "girl", "name": "Enya" }, { "gender": "girl", "name": "Erin" }, { "gender": "boy", "name": "Erskine" }, { "gender": "girl", "name": "Etna" }, { "gender": "boy", "name": "Evander" }, { "gender": "boy", "name": "Evin" }, { "gender": "boy", "name": "Ewan" }, { "gender": "boy", "name": "Ewen" }, { "gender": "boy", "name": "Ewing" }, { "gender": "boy", "name": "Faolan" }],
    [{ "gender": "boy", "name": "Farrell" }, { "gender": "boygirl", "name": "Fergie" }, { "gender": "boy", "name": "Fergus" }, { "gender": "boy", "name": "Ferguson" }, { "gender": "boy", "name": "Ferris" }, { "gender": "girl", "name": "Fidelma" }, { "gender": "boy", "name": "Fife" }, { "gender": "boy", "name": "Fingal" }, { "gender": "boy", "name": "Finian" }, { "gender": "boygirl", "name": "Finley" }],
    [{ "gender": "boy", "name": "Finn" }, { "gender": "boy", "name": "Finnegan" }, { "gender": "boy", "name": "Finnian" }, { "gender": "boy", "name": "Flannacan" }, { "gender": "boy", "name": "Flynn" }, { "gender": "boy", "name": "Forbes" }, { "gender": "boy", "name": "Gainor" }, { "gender": "boy", "name": "Gallagher" }, { "gender": "boy", "name": "Galloway" }, { "gender": "boy", "name": "Galvin" }],
    [{ "gender": "boy", "name": "Gannon" }, { "gender": "boy", "name": "Garvey" }, { "gender": "boy", "name": "Gillean" }, { "gender": "boy", "name": "Gillespie" }, { "gender": "boy", "name": "Gillies" }, { "gender": "boy", "name": "Gilligan" }, { "gender": "boy", "name": "Gilmore" }, { "gender": "boy", "name": "Glenn" }, { "gender": "girl", "name": "Glenna" }, { "gender": "boy", "name": "Glenwood" }],
    [{ "gender": "boy", "name": "Glynn" }, { "gender": "boy", "name": "Gordon" }, { "gender": "boy", "name": "Graden" }, { "gender": "boy", "name": "Grady" }, { "gender": "girl", "name": "Grainne" }, { "gender": "boy", "name": "Gus" }, { "gender": "boy", "name": "Guthrie" }, { "gender": "boy", "name": "Hagan" }, { "gender": "boy", "name": "Hines" }, { "gender": "boy", "name": "Hogan" }],
    [{ "gender": "girl", "name": "Imogen" }, { "gender": "girl", "name": "Ireland" }, { "gender": "boy", "name": "Jakodi" }, { "gender": "boy", "name": "Kaden" }, { "gender": "boy", "name": "Kael" }, { "gender": "boygirl", "name": "Kaelan" }, { "gender": "boy", "name": "Kagan" }, { "gender": "girl", "name": "Kaley" }, { "gender": "boy", "name": "Kallen" }, { "gender": "boy", "name": "Karsen" }],
    [{ "gender": "boygirl", "name": "Kasey" }, { "gender": "boy", "name": "Kavon" }, { "gender": "boy", "name": "Kayl" }, { "gender": "boy", "name": "Kean" }, { "gender": "boy", "name": "Keane" }, { "gender": "boy", "name": "Kearney" }, { "gender": "girl", "name": "Keavy" }, { "gender": "boy", "name": "Keegan" }, { "gender": "boygirl", "name": "Keelan" }, { "gender": "girl", "name": "Keely" }],
    [{ "gender": "boy", "name": "Keenan" }, { "gender": "girl", "name": "Keeva" }, { "gender": "boy", "name": "Keir" }, { "gender": "boy", "name": "Keiran" }, { "gender": "girl", "name": "Keitha" }, { "gender": "boy", "name": "Kelan" }, { "gender": "boy", "name": "Kellagh" }, { "gender": "boy", "name": "Kelland" }, { "gender": "boy", "name": "Kellen" }, { "gender": "boy", "name": "Keller" }],
    [{ "gender": "boy", "name": "Kenan" }, { "gender": "boy", "name": "Kendrick" }, { "gender": "girl", "name": "Kenina" }, { "gender": "girl", "name": "Kenisha" }, { "gender": "boy", "name": "Kenley" }, { "gender": "girl", "name": "Kenna" }, { "gender": "boy", "name": "Kenneally" }, { "gender": "boygirl", "name": "Kennedy" }, { "gender": "boy", "name": "Kennet" }, { "gender": "boy", "name": "Kenneth" }],
    [{ "gender": "boy", "name": "Kensley" }, { "gender": "boy", "name": "Kent" }, { "gender": "boygirl", "name": "Kenzie" }, { "gender": "boy", "name": "Kermit" }, { "gender": "boygirl", "name": "Kerry" }, { "gender": "boy", "name": "Kevin" }, { "gender": "boy", "name": "Kiel" }, { "gender": "boy", "name": "Kier" }, { "gender": "boy", "name": "Kieran" }, { "gender": "boy", "name": "Kiernan" }],
    [{ "gender": "boy", "name": "Kieron" }, { "gender": "boy", "name": "Killean" }, { "gender": "boy", "name": "Killian" }, { "gender": "boy", "name": "Kincaid" }, { "gender": "boygirl", "name": "Kinley" }, { "gender": "boy", "name": "Kody" }, { "gender": "boy", "name": "Konnor" }, { "gender": "boy", "name": "Kye" }, { "gender": "boy", "name": "Kyle" }, { "gender": "boygirl", "name": "Kylen" }],
    [{ "gender": "boy", "name": "Kyler" }, { "gender": "boy", "name": "Kylian" }, { "gender": "girl", "name": "Kylie" }, { "gender": "boy", "name": "Kyran" }, { "gender": "boy", "name": "Lachlan" }, { "gender": "boy", "name": "Leannan" }, { "gender": "boy", "name": "Leary" }, { "gender": "boy", "name": "Leith" }, { "gender": "boy", "name": "Lennon" }, { "gender": "boy", "name": "Lennox" }],
    [{ "gender": "boy", "name": "Les" }, { "gender": "boygirl", "name": "Leslie" }, { "gender": "boy", "name": "Linch" }, { "gender": "boy", "name": "Lochlan" }, { "gender": "boygirl", "name": "Logan" }, { "gender": "boy", "name": "Lonan" }, { "gender": "boy", "name": "Loran" }, { "gender": "boy", "name": "Lorcan" }, { "gender": "boy", "name": "Macarthur" }, { "gender": "boy", "name": "Macaulay" }],
    [{ "gender": "boy", "name": "Mack" }, { "gender": "boy", "name": "Mackenna" }, { "gender": "boygirl", "name": "Mackenzie" }, { "gender": "boy", "name": "Mackinley" }, { "gender": "boy", "name": "Mackinney" }, { "gender": "boy", "name": "Madden" }, { "gender": "girl", "name": "Maeve" }, { "gender": "boy", "name": "Maguire" }, { "gender": "girl", "name": "Makenna" }, { "gender": "boy", "name": "Malcolm" }],
    [{ "gender": "girl", "name": "Malina" }, { "gender": "boy", "name": "Maloney" }, { "gender": "girl", "name": "Malvina" }, { "gender": "boy", "name": "Manning" }, { "gender": "boy", "name": "Mannix" }, { "gender": "boy", "name": "Marmaduke" }, { "gender": "boy", "name": "Maxwell" }, { "gender": "boy", "name": "Mckay" }, { "gender": "boygirl", "name": "Mckenna" }, { "gender": "boygirl", "name": "Mckenzie" }],
    [{ "gender": "boy", "name": "Mckinley" }, { "gender": "boygirl", "name": "Merle" }, { "gender": "girl", "name": "Merletta" }, { "gender": "girl", "name": "Merna" }, { "gender": "boy", "name": "Merrill" }, { "gender": "girl", "name": "Meryl" }, { "gender": "boy", "name": "Monroe" }, { "gender": "boy", "name": "Moray" }, { "gender": "girl", "name": "Morna" }, { "gender": "girl", "name": "Muirne" }],
    [{ "gender": "boy", "name": "Munro" }, { "gender": "boy", "name": "Murdoch" }, { "gender": "girl", "name": "Muriel" }, { "gender": "boy", "name": "Murphy" }, { "gender": "boy", "name": "Murray" }, { "gender": "girl", "name": "Myrna" }, { "gender": "boy", "name": "Nealon" }, { "gender": "boy", "name": "Neil" }, { "gender": "girl", "name": "Neilina" }, { "gender": "boy", "name": "Neilson" }],
    [{ "gender": "boy", "name": "Nelson" }, { "gender": "boy", "name": "Nevin" }, { "gender": "boy", "name": "Niall" }, { "gender": "boy", "name": "Nigel" }, { "gender": "girl", "name": "Nigella" }, { "gender": "boy", "name": "Nile" }, { "gender": "boy", "name": "Niles" }, { "gender": "boy", "name": "Nilsson" }, { "gender": "boy", "name": "Nolan" }, { "gender": "boy", "name": "Norm" }],
    [{ "gender": "boy", "name": "Norman" }, { "gender": "boy", "name": "Oisin" }, { "gender": "girl", "name": "Orla" }, { "gender": "boy", "name": "Ormond" }, { "gender": "boy", "name": "Oscar" }, { "gender": "boy", "name": "Oskari" }, { "gender": "boy", "name": "Owen" }, { "gender": "boy", "name": "Quigley" }, { "gender": "boy", "name": "Quill" }, { "gender": "boy", "name": "Quillan" }],
    [{ "gender": "boy", "name": "Quinlan" }, { "gender": "boy", "name": "Redmond" }, { "gender": "boygirl", "name": "Reilly" }, { "gender": "boy", "name": "Rey" }, { "gender": "girl", "name": "Rhona" }, { "gender": "boy", "name": "Riordan" }, { "gender": "boy", "name": "Roan" }, { "gender": "boy", "name": "Roarke" }, { "gender": "boy", "name": "Rodan" }, { "gender": "boy", "name": "Ronin" }],
    [{ "gender": "boygirl", "name": "Rory" }, { "gender": "girl", "name": "Sadb" }, { "gender": "boygirl", "name": "Saoirse" }, { "gender": "boy", "name": "Shanley" }, { "gender": "boygirl", "name": "Shannon" }, { "gender": "girl", "name": "Shavonne" }, { "gender": "girl", "name": "Shawna" }, { "gender": "girl", "name": "Shayla" }, { "gender": "girl", "name": "Shaylee" }, { "gender": "boygirl", "name": "Shea" }],
    [{ "gender": "girl", "name": "Sheena" }, { "gender": "girl", "name": "Sheila" }, { "gender": "boygirl", "name": "Sheridan" }, { "gender": "girl", "name": "Slaine" }, { "gender": "girl", "name": "Sorcha" }, { "gender": "boy", "name": "Sullivan" }, { "gender": "boy", "name": "Tad" }, { "gender": "girl", "name": "Talulla" }, { "gender": "girl", "name": "Tara" }, { "gender": "boygirl", "name": "Teagan" }],
    [{ "gender": "boy", "name": "Teague" }, { "gender": "boy", "name": "Tevin" }, { "gender": "boy", "name": "Tiernan" }, { "gender": "boy", "name": "Tierney" }, { "gender": "boy", "name": "Tighe" }, { "gender": "boy", "name": "Torin" }, { "gender": "boy", "name": "Traynor" }, { "gender": "boy", "name": "Tristan" }, { "gender": "boy", "name": "Tully" }, { "gender": "girl", "name": "Tyne" }],
    [{ "gender": "boy", "name": "Tyree" }, { "gender": "boy", "name": "Tyrone" }, { "gender": "boy", "name": "Winford" }]
].flat()

const namesSplitGender = names.map(({ gender, name }) => {
    return {
        male: gender.includes("boy"),
        female: gender.includes("girl"),
        name
    }
})

// https://surnames.behindthename.com/submit/names/usage/celtic/4
// copy(JSON.stringify([...document.getElementsByClassName("browsename")].map(elem => elem.getElementsByClassName("listname")[0].getElementsByTagName("a")[0].textContent)))

const lastNames = [
    ["ACHADH NAN LEAC", "ADAIR", "AHEARNA", "ALAN CROM", "AM MAGH FADA", "ANCRUM", "ANDERSON", "ANGLEY", "ANNA", "ÀNSRUTHAIR", "ANWELL", "ANWYL", "ARAN", "ARDIES", "ARGYLE", "ARGYLL", "ARZUR", "BACLAN", "BADRICK", "BAILE PHÙIR", "BAINEBRIDGE", "BALCH", "BARNEWALL", "BARRACH", "BARRENTINE", "BARRINGTON", "BARRY", "BARTER", "BEACOM", "BEDDOE", "BEDDOW", "BEEVER", "BENNION", "BEOLLAN", "BETHEL", "BIDDLE", "BIHAN", "BLACKERBY", "BLACKSMITH", "BLAIN", "BLANEY", "BLEDIG", "BLEUZEN", "BLEVENS", "BLIN", "BLOOD", "BLYTHIN", "BODEN", "BOHANNON", "BOITEUX", "BOLLARD", "BOLLORÉ", "BONAR", "BONNAR", "BOSSER", "BOWDEN", "BOWE", "BOWIE", "BRACKEN", "BRAGG", "BRAIN", "BRANNAN", "BRANNIGAN", "BRANNOCK", "BRAZIL", "BREAN", "BREEZE", "BRESLIN", "BRIAN", "BRICK", "BRIDE", "BRODERICK", "BROPHY", "BROWNLEE", "BROY", "BRUSNIGHAN", "BURK", "BURNEY", "BWYE", "BYCHAN", "BYNES", "CADDICK", "CADOGAN", "CAGNEY", "CAHILL", "CAIMBEUL", "CALE", "CALKIN", "CALLIGAN", "CALLISTER", "CALVEY", "CAMMON", "CAMSHRON", "CANAVAN", "CANDLISH", "CANNAN", "CANNELL", "CANNING", "CANTWELL", "CARBY", "CAREW", "CARLIN", "CARNAHAN", "CARNEY", "CARREY", "CARTAN", "CARTEN", "CARTHY", "CARTIN", "CARTON", "CARVEL", "CARVILLE", "CARWOOD", "CASEMENT", "CASHION", "CASKEY", "CASSEY", "CAULFIELD", "CAWTE", "CHALLONER", "CHIVERS", "CINNAMOND", "CLAINE", "CLANCY", "CLAREY", "CLARY", "CLELAND", "CLELLAND", "CLINGAN", "CLINGANE", "CLINGEN", "CLOONEY", "CLOYD", "CLWYD", "COACH", "COAKLEY", "COCHRAN", "COCHRANE", "CODEY", "COFFEE", "COFFEY", "COILL", "COINEAGAN", "COLES", "COLTRANE", "COMINS", "CONAHAN", "CONDON", "CONE", "CONKLIN", "CONLEY", "CONLIN", "CONLON", "CONNEELY", "CONRAN", "CONROY", "CONWAY", "COOGAN", "COOGLAN", "COOLEY", "CORBETT", "CORKER", "CORKERY", "CORLETT", "CORNISH", "CORNWALL", "CORR", "CORRIN", "COSGROVE", "COSSACK", "COSTELLO", "COTTER", "COULLSON", "COURT", "COVEY", "COY", "COYLE", "CRAGG", "CRANLEY", "CRAVEN", "CRAWLEY", "CREEL", "CREGAN", "CROAN", "CROGHAN", "CRONIN", "CROSSAN", "CROTHERS", "CROWLEY", "CROY", "CUADRO", "CUDAHY", "CUDDIHY", "CULBERT", "CULLAN", "CULVÉRT", "CUMMING", "CUMMINGS", "CUNNIFF", "CUNNINGHAM", "CURLEY", "CURPHEY", "CURRENT", "CURRIE", "CURTIN", "CUSACK", "DADE", "DADY", "DAILEY", "DAILY", "DALAIS", "DALE", "DALL", "DANVERS", "DARRAGH", "DARRAH", "DAVEY", "DAVINE", "DAVYS", "DAW", "DAWES", "DAWLEY", "DAYE", "DAYS", "DEA", "DEADY", "DEANE", "DE BRÚN", "DEE", "DEERE", "DEERY", "DEES", "DEMPSTER", "DENEEN", "DENNEHY", "DENNING", "DERRY", "DEVANEY", "DEVANNEY", "DEVILLY", "DEVITT", "DEVON", "DIAMOND", "DILLION", "DILLON", "DIMOND", "DINEEN", "DISKIN", "DOANE", "DOHEY", "DOLE", "DOLPHIN", "DONAGHY", "DONAHOE", "DONAHUE", "DONAVAN", "DONEGAN", "DONLEAVY", "DONN", "DONNELLAN", "DONNRIN", "DONOUGH", "DOUGAN", "DOW", "DOWDALL", "DOWELL", "DOWLING", "DOWNEY", "DRENNAN", "DRUIMEANACH", "DRURY", "DUBHAGÁINN", "DUCK", "DUFFER", "DUGAN", "DUGGAN", "DULANEY", "DUN", "DUNNE", "DURKAN", "DURKIN", "DWAN", "DWIGGINS", "DWYER", "DYE", "EABARCROMBAIGH", "EARLY", "EDEVANE", "EDMUNDS", "EGAN", "ELIAS", "ELWAY", "EMORY", "ENIS", "ENRIGHT", "ESAU", "ESTES", "FAGAN", "FAHEY", "FAHY"],
    ["FAIN", "FAIR", "FALLON", "FANJOY", "FANNING", "FARADAY", "FARLEY", "FARLING", "FARMER", "FARNAN", "FARRAGUT", "FEE", "FEGAN", "FELDON", "FENNESSEY", "FERRAGINE", "FERREIRE", "FERREIRI", "FERRELL", "FIELD", "FINAN", "FINNEY", "FINNIGAN", "FIRTH", "FITZGIBBON", "FITZHENRY", "FITZWILLIAM", "FLAHERTY", "FLANNERY", "FLOOD", "FLOWER", "FLUELLEN", "FOGARTY", "FOGERTY", "FOLEY", "FOODY", "FORBES", "FORDE", "FOREBACK", "FOY", "FOY", "FROST", "FULLALOVE", "FURLONG", "FURLOW", "FURY", "GABEL", "GADD", "GAINES", "GALBRAITH", "GALE", "GALL", "GALVAN", "GALVIN", "GAMON", "GANLEY", "GANNON", "GARMON", "GARRIGHAN", "GARROOD", "GARTLAND", "GARVEY", "GAUL", "GEANEY", "GEASON", "GEDDES", "GEE", "GEESON", "GEOHAGAN", "GEOHEGAN", "GERAHTY", "GERRITY", "GETTY", "GHORMLEY", "GILLAN", "GILLESPIE", "GILMORE", "GILPATRICK", "GILPIN", "GILROY", "GILSENAN", "GITTENS", "GITTINGS", "GITTINGS", "GLADYS", "GLAS", "GLASS", "GLASSON", "GLEESON", "GLISSEN", "GLYNN", "GORMLEY", "GORRY", "GOUGH", "GOUGH", "GOURCUFF", "GOURKUÑV", "GOWAN", "GRADY", "GRAVENOR", "GRAYDEN", "GRAYSON", "GREENWAY", "GRIBBEN", "GRIFF", "GRIFFETH", "GRIFFIN", "GRUFFUDD", "GUILLOU", "GUIVARC'H", "GURRY", "GUTHRIE", "GUYNES", "GWILLIAM", "GWIN", "GWYTHER", "HADDEN", "HAGAN", "HAGAN", "HAGGERTY", "HAINEY", "HALLINAN", "HAMES", "HAMILL", "HAMNER", "HANAFIN", "HANES", "HANLEY", "HANLON", "HANMER", "HANNA", "HANNON", "HARDISTY", "HARE", "HAROLD", "HARRIS", "HASTINGS", "HAVERFORD", "HAY", "HEAFEY", "HEALY", "HEANEY", "HEBOR", "HENCE", "HENLEY", "HENNELLY", "HENNESSEE", "HENNESSEY", "HENSEN", "HENVILLE", "HEOCHA", "HERLIHY", "HERNAN", "HEWTON", "HEYDON", "HICKMAN", "HICKSON", "HIGGINS", "HINDMAN", "HOLLAND", "HOOD", "HOPLA", "HORAN", "HOUGAN", "HOWELLS", "HOYLE", "HUIGINN", "HUMPHERY", "HUMPHREYS", "HUMPHRIES", "HUON", "HURLEY", "HURRELL", "HUSSEY", "HUSSIE", "HYLANDS", "HYRES", "IDREIUS", "ISAAC", "IWAN", "JAWS", "JENKS", "JOINES", "JOYCE", "KANE", "KARTER", "KEANE", "KEARNS", "KEARNY", "KEARSE", "KEEL", "KEELING", "KEENAN", "KEEVER", "KEHELEY", "KEIRNAN", "KEIRSEY", "KELLEHER", "KENNEALLY", "KENNELLY", "KENNEN", "KENNY", "KENYON", "KEOGH", "KEOUGH", "KERGOAT", "KERHERVÉ", "KERIN", "KERJEAN", "KERLEY", "KERWIN", "KETT", "KIDNEY", "KIDWELL", "KIERAN", "KIERNAN", "KILBRIDE", "KILCOMMON", "KILCOMMONS", "KILEY", "KILLEEN", "KILLIAN", "KILLILEA", "KINGMAN", "KINNELL", "KINSELLA", "KIRWAN", "KNOWLES", "KYNE", "LACKEY", "LAHEY", "LAHIFFE", "LANEY", "LAUGHLIN", "LAVELLE", "LAVEN", "LAVERY", "LAWLER", "LAWLOR", "LEAHY", "LEAMHNACHD", "LEANNE", "LECKEY", "LEE", "LEHAN", "LEHANE", "LEHIGH", "LE HOUÉROU", "LEITCH", "LEMACKS", "LENIHAN", "LE PEN", "LE TALLEC", "LEYDON", "LICET", "LILLIS", "LINN", "LINNANE", "LIVINGSTONE", "LLEWYS", "LOCKARD", "LOFLIN", "LOHAN", "LOMAS", "LOMASNEY", "LONERGAN", "LONIE", "LOONEY", "LOUGHLIN", "LOUGHREY", "LOWERY", "LOZAC’H", "LYCETT", "LYCETTE", "LYNDE", "LYNDEN", "LYNESS", "LYONS", "LYSAGHT", "LYSAIGHT", "LYSAUGHT", "LYSETT", "MABRY", "MAC", "MAC A’ BHÀIRD", "MACADDEN", "MAC A 'GHOBHAINN", "MACALLISTER", "MAC AN AIRCHINNIGH", "MAC AN FHILIDH", "MAC AN TSAOI", "MAC CANANN", "MAC CATHMHAOIL", "MACCAULEY", "MAC CEARBHAILL", "MACCLINGAN", "MAC COINGHEALLAIGH", "MACCONALL", "MAC CONGHAILE", "MAC CON MHAOIL"],
    ["MACCONUISCE", "MACCORMICK", "MACCRACKEN", "MACCREAMHAIN", "MAC CRÍODÁIN", "MACCRUIMEIN", "MAC CUINDLIS", "MAC DHUARCÁIN", "MACDONNELL", "MAC DUBHGHAILL", "MACDUFF", "MAC EACHÁIN", "MAC EACHRÁIN", "MACFAYLE", "MAC FEARGHASA", "MACFHEARGHUIS", "MACFHIONGHAIN", "MAC FHLANNCHAIDH", "MAC GAOITHÍN", "MACGILLEBHRÀTH", "MACGILLEDHEÒRADHA", "MACGILLEFHINNEIN", "MACGILLEMICHEIL", "MACGILLEUIDHIR", "MACGINTY", "MAC GIOLLA CHUDA", "MAC GIOLLA IASACHTA", "MAC GIOLLA ÍOSA", "MACGOBHAINN", "MACGRATH", "MACINNIS", "MACINTOSH", "MACISAAC", "MACK", "MACKEY", "MACKIN", "MACKINAW", "MACLABHRAINN", "MACLACHLAN", "MACLLOYD", "MAC LOCHLAINN", "MACLYSAGHT", "MAC MAICÍN", "MAC MAOLÁIN", "MACMHÌCHEIL", "MACMORROW", "MACMUIRCHEARTAICH", "MACNAMARA", "MAC PÉICE", "MAC PHAAYL", "MAC PHÁIDÍN", "MAC PHÀIL", "MAC PHÓIL", "MACQUAYLE", "MACRITCHIE", "MAC SEÁIN", "MAC SÉAMAIS", "MACSHANE", "MAC SUIBHNE", "MACSYMON", "MACTAGGART", "MAC UIGHILÍN", "MADDIGAN", "MADDOCKS", "MADDUX", "MAGHERY", "MAGNER", "MAGOFFIN", "MAHER", "MAHON", "MAHONY", "MALLOY", "MALOAN", "MALONEY", "MANEELY", "MANGAN", "MANNING", "MANNION", "MANTON", "MARIGAN", "MARRON", "MATTHIAS", "MATTSON", "MAUGHAN", "MAYBERRY", "MAYNE", "MAYO", "MAYOCK", "MCADAM", "MCALEESE", "MCALINDEN", "MCALLISTER", "MCALONEY", "MCANDREW", "MCARTHY", "MCASKIE", "MCATEER", "MCAULAY", "MCAULIFFE", "MCAVOY", "MCCAFFERTY", "MCCAFFERY", "MCCAFFREY", "MCCALL", "MCCALLISTER", "MCCALVEY", "MCCAN", "MCCANDLESS", "MCCANDLISH", "MCCANN", "MCCARD", "MCCAREY", "MCCARL", "MCCARLEY", "MCCARN", "MCCARNEY", "MCCARROLL", "MCCARRON", "MCCARTAN", "MCCARTNEY", "MCCARTY", "MCCARY", "MCCAULIFFE", "MCCAWELL", "MCCLAIN", "MCCLARTY", "MCCLEAN", "MCCLINGEN", "MCCLINTOCK", "MCCLURE", "MCCLUSKE", "MCCOLGAN", "MCCOLLUMN", "MCCONAHAY", "MCCONAUGHEY", "MCCONVILLE", "MCCOOK", "MCCOOL", "MCCORMACK", "MCCORRY", "MCCORSLEY", "MCCOSH", "MCCOSKEY", "MCCOURT", "MCCRAKEN", "MCCRARY", "MCCREA", "MCCULLOUGH", "MCCURDY", "MCCURTAIN", "MCCURTY", "MCDAVITT", "MCDONNELL", "MCDONOUGH", "MCDOWELL", "MCELHANEY", "MCELHENNEY", "MC ELHINNEY", "MCELWEE", "MCELYEA", "MCENTAGGART", "MCEVOY", "MCFADDEN", "MCFALL", "MCGARRETT", "MCGARRIE", "MCGARRY", "MCGARTHWAITE", "MCGEEHAN", "MCGEHEE", "MCGILLAN", "MCGILLICUDDY", "MCGINLEY", "MCGINTY", "MCGLYNN", "MCGOLDRICK", "MCGORRY", "MCGOUGH", "MCGRAITH", "MCGRATH", "MCGRAVES", "MCGRAW", "MCGREW", "MCGROARTY", "MCHALE", "MCHUGH", "MCIAN", "MCILWEE", "MCINNERNEY", "MCINNIS", "MCINTOSH", "MCKEEHAN", "MCKEIRNAN", "MCKEITHEN", "MCKENNIE", "MCKEOWN", "MCKIERNAN", "MCKNIGHT", "MCLAOIDHIGH", "MCLEISH", "M'CLENGEN", "MCLERNON", "MCMANAMAN", "MCMANAMON", "MCMEEKIN", "MCMONAGLE", "MCMORROW", "MCMULLAN", "MCMURRAY", "MCMUTRY", "MCNAIR", "MCNAIR", "MCNAIR", "MCNAMEE", "MCNAUGHTEN", "MCNEAR", "MCNEELY", "MCNEESE", "MCNICHOLAS", "MCPHAIL", "MCPHERSON", "MCQUADE", "MCQUAID", "MCQUILLAN", "MCQUINNELLY", "MCSHANE", "MCSIENE", "MCSPADDEN", "MCSWAIN", "MCSWEENEY", "MCSWIGGAN", "MCSYMON", "MCTEER", "MCWILLIAMS", "MEADOR", "MEANS", "MEATH", "MEE", "MEGLEY", "MEIGHAN", "MEIGHEN", "MÈINNEARACH", "MELINYDD", "MELLEY", "MELLODY", "MELVILLE", "MENARY", "MENEZ", "MEREDITH", "MERICK", "MERRIAM", "MESCAL", "MESCALL", "MÉZEC", "MICK", "MIDNIGHT", "MIGGIN", "MILEY", "MILLEY", "MILLOY", "MINTON", "MOAN", "MOODY", "MOONIE", "MORAN", "MORCEY", "MOREY", "MORGANS", "MORRISSEY", "MORROW", "MORTON", "MOSS", "MOXLEY", "MOYLE", "MOYNIHAN", "MULDOON", "MULDOWNEY", "MULFALL", "MULHOLLAND", "MULKERIN", "MULLARKEY", "MULLEE", "MULLERY", "MULLEY", "MULLIN", "MULVEY", "MULVIHILL", "MULVILLE", "MURLAND", "MURREY", "MURROW", "MURTAGH", "MURTHA", "NARAMOR", "NAUGHTEN", "NAUGHTON", "NEALE", "NEDD", "NEELEY", "NEESON"],
    ["NESBITT", "NESTOR", "NETTERVILLE", "NEWCOMB", "NEWLIN", "NI SHEAN", "NOBLE", "NOCK", "NOCTON", "NOIROT", "NOLAND", "NOONAN", "NUGENT", "OAKES", "OBAR CHROMBAIDH", "OBAR NEITHICH", "Ó BEARGHA", "Ó BRÓITHE", "Ó BUADÁIN", "Ó CANANN", "O'CARROLL", "Ó CATHARNAIGH", "Ó CEARNAIGH", "Ó CÉIRÍN", "Ó CIARÁIN", "Ó CIARDHUBHÁIN", "O'COILL", "O COINGHEALLACH", "Ó COINGHEALLAIGH", "O'COLGAN", "Ó CÓMHANAIGH", "Ó CONNACHAÍN", "Ó CRÓINÍN", "Ó CUILL", "ODANIEL", "O'DEA", "Ó DÉADAIGH", "Ó DEAGHAIDH", "Ó DOMHNALLÁIN", "O'DONOGHUE", "O'DONOVAN", "Ó DRAIGHNEÁIN", "O'DRISCOLL", "Ó DUBHUIDHIR", "O'DUFFY", "Ó DUIBHIDHIR", "O'FARRELL", "O'FEE", "O’FLAHERTY", "Ó FLAITHEARTA", "O'FLYNN", "O'GALVIN", "Ó GAOITHÍN", "Ó GEALBHÁIN", "Ó GNÍMH", "Ó GRADAIGH", "O'GRADY", "Ó GRÍOBHTHA", "O'HALLORAN", "O'HANLON", "O'HARRA", "Ó HARTGHAILE", "ÓHEARCÁIN", "Ó HEARGHAILL", "Ó HEOIN", "Ó HIARFHLATHA", "O'HURLEY", "O'KELLY", "Ó LACHTNÁIN", "O'LAUGHLEN", "O'LAUGHLIN", "O'LENNON", "Ó LIONÁIN", "Ó LOCHLAINN", "O'LONAIN", "O'LONE", "Ó MACÁIN", "O'MAHER", "Ó MAICÍN", "Ó MAOILÉIDIGH", "O'MARA", "O'MARR", "O'MEARA", "Ó MIADHAIGH", "O'MILLIGAN", "Ó MUIMHNEACHÁIN", "O'MULLAWILL", "O'NEIL", "O'PREY", "O'RINGER", "O'RIORDAN", "ORLAIGH", "OROARKE", "O'ROURKE", "Ó RUADHAGÁIN", "Ó RUAIRC", "O'SANDLIN", "Ó SEANACHAIN", "Ó SEARCAIGH", "O'SHAUGHNESSEY", "Ó SÍOCHÁNA", "O' TOLAN", "Ó TORÁIN", "O’TORAN", "O' TUATHALAIN", "O' TWOLAN", "PAIP", "PARHAM", "PARKER-SMITH", "PARTEEN", "PASHBY", "PAYTON", "PEGG", "PEMBROKE", "PENNELL", "PENROSE", "PERDUE", "PEREIRE", "PEREIRI", "PEREIROS", "PERES", "PERESS", "PERKIN", "PEW", "PHILPIN", "PHÓIL", "PIKE", "PILKINGTON", "POGUE", "POLAND", "POLING", "POYNER", "PRATHER", "PREECE", "PRENDERGAST", "PRIOR", "PRIVETT", "PROBYN", "PUMFREY", "PUMPHREY", "QUADE", "QUAID", "QUAIL", "QUAYLE", "QUILL", "QUILLE", "QUILLEN", "QUILTY", "QUINE", "QUINLEY", "QUINLIVAN", "QUINNELLY", "RAFTERY", "RAINEY", "RATIGAN", "RAVELLINO", "REDMAN", "REDMOND", "REITH", "RENEHAN", "REWHORN", "RHINE", "RHODERICK", "RIAN", "RIES", "RIORDAN", "ROANE", "RODDY", "RODERICK", "ROGAN", "RONEY", "ROONEY", "ROURKE", "ROWATT", "RUADHAGIN", "RUSH", "SALAÜN", "SALDRIM", "SANCTI", "SANKEY", "SANTIAIS", "SANTY", "SCANLON", "SCANNELL", "SCARRY", "SCUDDER", "SCURLOCK", "SCURRY", "SETH", "SHADY", "SHANAHAN", "SHARKEY", "SHAY", "SHEEHAN", "SHEENE", "SHEERAN", "SHEIL", "SHELLEY", "SHERLOCK", "SHIEL", "SHINNAN", "SHIVERS", "SIBLEY", "SILK", "SINEATH", "SINNOTT", "SIOBHÁN", "SIONÓID", "SKERRY", "SLATTERY", "SMULLEN", "SNODGRASS", "SOMERVILLE", "SOPWITH", "SPILLANE", "SPLAIN", "ST LEGER", "STOCKARD", "STOHOKE", "STOKES", "STUDDERS", "SUMMERLY", "SWAIN", "SWANEY", "SWEENY", "SYLVERS", "TABBOT", "TALLANT", "TALLON", "THEODULF", "THOMASON", "THULIS", "TIMMS", "TOAL", "TOLAN", "TOLAND", "TONER", "TOOLAN", "TOOLIN", "TOOMEY", "TOOPY", "TORAN", "TORRENCE", "TOTUM", "TRAHAN", "TRAINOR", "TREHARN", "TREVELYAN", "TRILL", "TROY", "TUÍNEÁN", "TULLY", "TULLY", "TURCOTTE", "TURLEY", "TUTTLE", "UNGOED", "UNIACKE", "UNION", "URIE", "VALIANT", "VICTORY", "VILA", "WALCH", "WALDRON", "WALSHE", "WATHERS", "WEALE", "WEIR", "WEIR", "WELSH", "WHALIN", "WHATLING", "WHYTE", "WILDE", "WILIAMS", "WINDHAM", "WOGAN", "WOODLOCK", "WOOSENCRAFT", "WOULFE", "WRINN", "WYND", "WYNN", "YAW", "YEAGER", "YORATH"]
].flat()

const lastNamesNotCaps = lastNames.map(name => name
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
)

JSON.stringify(lastNamesNotCaps)