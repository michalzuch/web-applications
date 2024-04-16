# Web Applications Designing

Project built during Web Applications Designing classes at Jagiellonian University

## v1.0.0

The goal of this project is to develop the specification for a simple website and then implement it using the Express framework. You are not permitted to use any advanced tools, as the aim is to assess your knowledge and ability to use basic tools.

The website enables reserving various resources, including a ping-pong table in the G-1 corridor, a table in the A-2 corridor, and a projector available from the Institute of Physics secretariat.

The website has a fixed list of items that cannot be modified, either in the SQL database or the source code. There will be no user accounts. Instead, when creating a reservation, the user must manually enter their name and surname into the form.

Prepare a 1-2 page document that includes:

- A one-paragraph vision for your website
- A description of the website's functionality, including a list of features offered to users
- A description of the structure of the processed data, either in a separate section or integrated into the functional description

Approved tools and packages:

- Node v20 and Express v4.18
- SQLite3 v5.1
- Pug v3.0 (using this library is optional)
- Pre-designed CSS stylesheets to give your pages an appealing appearance

## v2.0.0

The aim of the project is to determine if you can design and implement a REST web API.

The goal of this project is to add code supporting the REST API to the website created in `v1.0.0`. The second required change is to use an object-relational mapping library instead of constructing SQL queries manually. You are not allowed to use any libraries other than those listed below.

Before starting implementation work, a specification must be developed. You need to specify the operations to be performed on items and reservations, as well as the endpoints, methods, and JSON data structures to be used. Since there are only a few operations, the specification document should be concise, not exceeding two A4 pages.

Approved tools and packages:

- Node v20 and Express v4.18
- Sequoia v6 with SQLite3 v5.1 as the database driver
- Pug v3.0 (there is no obligation to use this library)
- Pre-designed CSS stylesheets to give your pages an appealing appearance
