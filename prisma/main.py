import json
import random
import faker
import sqlite3

fake = faker.Faker()
faker.Faker.seed(4321)
conn = sqlite3.connect('./prisma/dev.db')
c = conn.cursor()

c.execute("DELETE FROM User")

with open("./prisma/reviews.json", "r") as f:
    reviews = json.load(f)

j = 1
for i in reviews:
    for _ in range(random.randrange(1,4)):
        c.execute("INSERT INTO Review VALUES (?,?,?,?,?)", (j, random.randrange(1,21), random.randrange(1,211), i['rating'], i['description']))
        j += 1
conn.commit()