#!/usr/bin/env bash

cd /usr/app/backend
virtualenv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download zh_core_web_sm  # Chinese
python -m spacy download da_core_news_sm # Danish
python -m spacy download nl_core_news_sm # Dutch
python -m spacy download en_core_web_sm  # English
python -m spacy download fr_core_news_sm # French
python -m spacy download de_core_news_sm # German
python -m spacy download el_core_news_sm # Greek
python -m spacy download it_core_news_sm # Italian
python -m spacy download ja_core_news_sm # Japanese
python -m spacy download lt_core_news_sm # Lithuanian
python -m spacy download xx_ent_wiki_sm  # Multi-language
python -m spacy download nb_core_news_sm # Norwegian Bokmål
python -m spacy download pl_core_news_sm # Polish
python -m spacy download pt_core_news_sm # Portuguese
python -m spacy download ro_core_news_sm # Romanian
python -m spacy download es_core_news_sm # Spanish
GOOGLE_APPLICATION_CREDENTIALS=/usr/app/.GOOGLE_APPLICATION_CREDENTIALS.json python app.py
