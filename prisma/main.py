import sqlite3

import sqlite3
 
conn = sqlite3.connect('./prisma/dev.db')

cursor = conn.cursor()
 
cursor.execute("SELECT * FROM Product")

 
data = cursor.fetchall()
columns = [col[0] for col in cursor.description]
products = [dict(zip(columns, row)) for row in data]


cursor.execute("SELECT * FROM Review")
data = cursor.fetchall()
columns = [col[0] for col in cursor.description]
reviews = [dict(zip(columns, row)) for row in data]

for p in products:
    p['reviewsCount'] = 0
    p['rating'] = 0

for p in products:
    for r in reviews:
        if r['productId'] == p['id']:
            p['reviewsCount'] += 1
            p['rating'] += r['rating']

for p in products:
    if p['reviewsCount'] == 0:
        p['rating'] = 0
    else:
        p['rating'] = p['rating'] / p['reviewsCount']

for p in products:
    cursor.execute("UPDATE Product SET rating = ? WHERE id = ?", (p['rating'], p['id']))
    cursor.execute("UPDATE Product SET reviewsCount = ? WHERE id = ?", (p['reviewsCount'], p['id']))

conn.commit()
