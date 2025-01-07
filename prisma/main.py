import json
import random
import faker
import sqlite3

fake = faker.Faker()
faker.Faker.seed(4321)
conn = sqlite3.connect('./prisma/dev.db')
c = conn.cursor()
c.execute('Delete from User')

for i in range(1, 21):
    c.execute("INSERT INTO User VALUES (?,?,?,?,?,?)", (i, fake.email(), fake.first_name(), fake.last_name(), fake.password(), 0))

conn.commit()