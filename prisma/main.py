import sqlite3

conn = sqlite3.connect('./prisma/dev.db')
c = conn.cursor()

c.execute('Delete from OrderDetail')
conn.commit()