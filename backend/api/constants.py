

# https://developers.google.com/custom-search/docs/xml_results_appendices#countryCodes
_countries = {
    "Afghanistan": "countryAF",
    "Albania": "countryAL",
    "Algeria": "countryDZ",
    "American Samoa": "countryAS",
    "Andorra": "countryAD",
    "Angola": "countryAO",
    "Anguilla": "countryAI",
    "Antarctica": "countryAQ",
    "Antigua and Barbuda": "countryAG",
    "Argentina": "countryAR",
    "Armenia": "countryAM",
    "Aruba": "countryAW",
    "Australia": "countryAU",
    "Austria": "countryAT",
    "Azerbaijan": "countryAZ",
    "Bahamas": "countryBS",
    "Bahrain": "countryBH",
    "Bangladesh": "countryBD",
    "Barbados": "countryBB",
    "Belarus": "countryBY",
    "Belgium": "countryBE",
    "Belize": "countryBZ",
    "Benin": "countryBJ",
    "Bermuda": "countryBM",
    "Bhutan": "countryBT",
    "Bolivia": "countryBO",
    "Bosnia and Herzegovina": "countryBA",
    "Botswana": "countryBW",
    "Bouvet Island": "countryBV",
    "Brazil": "countryBR",
    "British Indian Ocean Territory": "countryIO",
    "Brunei Darussalam": "countryBN",
    "Bulgaria": "countryBG",
    "Burkina Faso": "countryBF",
    "Burundi": "countryBI",
    "Cambodia": "countryKH",
    "Cameroon": "countryCM",
    "Canada": "countryCA",
    "Cape Verde": "countryCV",
    "Cayman Islands": "countryKY",
    "Central African Republic": "countryCF",
    "Chad": "countryTD",
    "Chile": "countryCL",
    "China": "countryCN",
    "Christmas Island": "countryCX",
    "Cocos (Keeling) Islands": "countryCC",
    "Colombia": "countryCO",
    "Comoros": "countryKM",
    "Congo": "countryCG",
    "Congo, the Democratic Republic of the": "countryCD",
    "Cook Islands": "countryCK",
    "Costa Rica": "countryCR",
    "Cote D'ivoire": "countryCI",
    "Croatia (Hrvatska)": "countryHR",
    "Cuba": "countryCU",
    "Cyprus": "countryCY",
    "Czech Republic": "countryCZ",
    "Denmark": "countryDK",
    "Djibouti": "countryDJ",
    "Dominica": "countryDM",
    "Dominican Republic": "countryDO",
    "East Timor": "countryTP",
    "Ecuador": "countryEC",
    "Egypt": "countryEG",
    "El Salvador": "countrySV",
    "Equatorial Guinea": "countryGQ",
    "Eritrea": "countryER",
    "Estonia": "countryEE",
    "Ethiopia": "countryET",
    "European Union": "countryEU",
    "Falkland Islands (Malvinas)": "countryFK",
    "Faroe Islands": "countryFO",
    "Fiji": "countryFJ",
    "Finland": "countryFI",
    "France": "countryFR",
    "France, Metropolitan": "countryFX",
    "French Guiana": "countryGF",
    "French Polynesia": "countryPF",
    "French Southern Territories": "countryTF",
    "Gabon": "countryGA",
    "Gambia": "countryGM",
    "Georgia": "countryGE",
    "Germany": "countryDE",
    "Ghana": "countryGH",
    "Gibraltar": "countryGI",
    "Greece": "countryGR",
    "Greenland": "countryGL",
    "Grenada": "countryGD",
    "Guadeloupe": "countryGP",
    "Guam": "countryGU",
    "Guatemala": "countryGT",
    "Guinea": "countryGN",
    "Guinea-Bissau": "countryGW",
    "Guyana": "countryGY",
    "Haiti": "countryHT",
    "Heard Island and Mcdonald Islands": "countryHM",
    "Holy See (Vatican City State)": "countryVA",
    "Honduras": "countryHN",
    "Hong Kong": "countryHK",
    "Hungary": "countryHU",
    "Iceland": "countryIS",
    "India": "countryIN",
    "Indonesia": "countryID",
    "Iran, Islamic Republic of": "countryIR",
    "Iraq": "countryIQ",
    "Ireland": "countryIE",
    "Israel": "countryIL",
    "Italy": "countryIT",
    "Jamaica": "countryJM",
    "Japan": "countryJP",
    "Jordan": "countryJO",
    "Kazakhstan": "countryKZ",
    "Kenya": "countryKE",
    "Kiribati": "countryKI",
    "Korea, Democratic People's Republic of": "countryKP",
    "Korea, Republic of": "countryKR",
    "Kuwait": "countryKW",
    "Kyrgyzstan": "countryKG",
    "Lao People's Democratic Republic": "countryLA",
    "Latvia": "countryLV",
    "Lebanon": "countryLB",
    "Lesotho": "countryLS",
    "Liberia": "countryLR",
    "Libyan Arab Jamahiriya": "countryLY",
    "Liechtenstein": "countryLI",
    "Lithuania": "countryLT",
    "Luxembourg": "countryLU",
    "Macao": "countryMO",
    "Macedonia, the Former Yugosalv Republic of": "countryMK",
    "Madagascar": "countryMG",
    "Malawi": "countryMW",
    "Malaysia": "countryMY",
    "Maldives": "countryMV",
    "Mali": "countryML",
    "Malta": "countryMT",
    "Marshall Islands": "countryMH",
    "Martinique": "countryMQ",
    "Mauritania": "countryMR",
    "Mauritius": "countryMU",
    "Mayotte": "countryYT",
    "Mexico": "countryMX",
    "Micronesia, Federated States of": "countryFM",
    "Moldova, Republic of": "countryMD",
    "Monaco": "countryMC",
    "Mongolia": "countryMN",
    "Montserrat": "countryMS",
    "Morocco": "countryMA",
    "Mozambique": "countryMZ",
    "Myanmar": "countryMM",
    "Namibia": "countryNA",
    "Nauru": "countryNR",
    "Nepal": "countryNP",
    "Netherlands": "countryNL",
    "Netherlands Antilles": "countryAN",
    "New Caledonia": "countryNC",
    "New Zealand": "countryNZ",
    "Nicaragua": "countryNI",
    "Niger": "countryNE",
    "Nigeria": "countryNG",
    "Niue": "countryNU",
    "Norfolk Island": "countryNF",
    "Northern Mariana Islands": "countryMP",
    "Norway": "countryNO",
    "Oman": "countryOM",
    "Pakistan": "countryPK",
    "Palau": "countryPW",
    "Palestinian Territory": "countryPS",
    "Panama": "countryPA",
    "Papua New Guinea": "countryPG",
    "Paraguay": "countryPY",
    "Peru": "countryPE",
    "Philippines": "countryPH",
    "Pitcairn": "countryPN",
    "Poland": "countryPL",
    "Portugal": "countryPT",
    "Puerto Rico": "countryPR",
    "Qatar": "countryQA",
    "Reunion": "countryRE",
    "Romania": "countryRO",
    "Russian Federation": "countryRU",
    "Rwanda": "countryRW",
    "Saint Helena": "countrySH",
    "Saint Kitts and Nevis": "countryKN",
    "Saint Lucia": "countryLC",
    "Saint Pierre and Miquelon": "countryPM",
    "Saint Vincent and the Grenadines": "countryVC",
    "Samoa": "countryWS",
    "San Marino": "countrySM",
    "Sao Tome and Principe": "countryST",
    "Saudi Arabia": "countrySA",
    "Senegal": "countrySN",
    "Serbia and Montenegro": "countryCS",
    "Seychelles": "countrySC",
    "Sierra Leone": "countrySL",
    "Singapore": "countrySG",
    "Slovakia": "countrySK",
    "Slovenia": "countrySI",
    "Solomon Islands": "countrySB",
    "Somalia": "countrySO",
    "South Africa": "countryZA",
    "South Georgia and the South Sandwich Islands": "countryGS",
    "Spain": "countryES",
    "Sri Lanka": "countryLK",
    "Sudan": "countrySD",
    "Suriname": "countrySR",
    "Svalbard and Jan Mayen": "countrySJ",
    "Swaziland": "countrySZ",
    "Sweden": "countrySE",
    "Switzerland": "countryCH",
    "Syrian Arab Republic": "countrySY",
    "Taiwan, Province of China": "countryTW",
    "Tajikistan": "countryTJ",
    "Tanzania, United Republic of": "countryTZ",
    "Thailand": "countryTH",
    "Togo": "countryTG",
    "Tokelau": "countryTK",
    "Tonga": "countryTO",
    "Trinidad and Tobago": "countryTT",
    "Tunisia": "countryTN",
    "Turkey": "countryTR",
    "Turkmenistan": "countryTM",
    "Turks and Caicos Islands": "countryTC",
    "Tuvalu": "countryTV",
    "Uganda": "countryUG",
    "Ukraine": "countryUA",
    "United Arab Emirates": "countryAE",
    "United Kingdom": "countryUK",
    "United States": "countryUS",
    "United States Minor Outlying Islands": "countryUM",
    "Uruguay": "countryUY",
    "Uzbekistan": "countryUZ",
    "Vanuatu": "countryVU",
    "Venezuela": "countryVE",
    "Vietnam": "countryVN",
    "Virgin Islands, British": "countryVG",
    "Virgin Islands, U.S.": "countryVI",
    "Wallis and Futuna": "countryWF",
    "Western Sahara": "countryEH",
    "Yemen": "countryYE",
    "Yugoslavia": "countryYU",
    "Zambia": "countryZM",
    "Zimbabwe": "countryZW"
}
