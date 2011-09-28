M3b server
==========

Namjenjen je testiranju prenosa podataka na mobilni uređaj.

Rad sa serverom
---------------

### Podešenje node.js

* [instalacija node.js](http://redmine.bring.out.ba/issues/24469) -- pogledaj aktivnost instalacije node.js na MacOSX

### Podešenje baze

U M3b direktoriju pokrećemo komandu:

	sqlite3 m3b-test-db.sqlite

Ova komanda će napraviti 'm3b-test-db' bazu ako ne postoji, output izgleda ovako:

  	bringouts-MacBook:M3b bringout$ sqlite3 m3-test-db.sqlite
	SQLite version 3.6.12
	Enter ".help" for instructions
	Enter SQL statements terminated with a ";"
	sqlite> 

Ok, sada ćemo koristiti predefinisani fajl 'create_test_db.sql' da bi automatski dodali sve neophodne tabele za rad.
To ćemo uraditi na sljedeći način:

	sqlite>.read ./create_test_db.sql

Nakon toga možemo testirati da li su tabele napravljene, ako pokrenemo komandu '.tables' na sljedeći način

	sqlite> .tables
	articles   customers  params     users 

Izlazimo sa komandom '.exit'

	sqlite> .exit
	bringouts-MacBook:M3b bringout$

### Dostupne metode

Od dostupnih metoda na raspolaganju su nam:

* /articles : dobijamo JSON listu artikala
* /article_images/:article_id : dobijamo sliku artikla po zadatom article_id
* ...

### Pokretanje i testiranje servera

Server pokrećemo na sljedeći način:

	bringouts-MacBook:M3b bringout$ node m3b_server.js

Da bi provjerili da li server radi pokrenimo sljedeću komandu:

	bringouts-MacBook:~ bringout$ curl http://localhost:8080/users

kao output na konzoli dobijamo:
	
	[{"id":1,"name":"vsasa","pwd":"11"},
	 {"id":2,"name":"bjasko","pwd":"22"},
	 {"id":3,"name":"hernad","pwd":"33"},
	 {"id":4,"name":"semir","pwd":"44"}]

na server konzoli dobijamo:

	28 Sep 09:03:14 -  get all users...

Znači da server fercera :)


