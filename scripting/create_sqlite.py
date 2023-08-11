import json
import sqlite3

db_path = '/home/tom/git/sveltekit_intro/my-app/data/monty.db'
json_path = '/home/tom/git/sveltekit_intro/my-app/src/lib/data/chumps.json'

def create_table_if_not_exists():
    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Create the 'chumps' table if it doesn't exist
    c.execute('''
        CREATE TABLE IF NOT EXISTS chumps (
            id TEXT PRIMARY KEY,
            date TEXT,
            date_bout INTEGER,
            date_aus_string TEXT,
            date_year TEXT,
            date_month TEXT,
            date_day TEXT,
            date_year_week INTEGER,
            name TEXT,
            streak INTEGER,
            thanks TEXT,
            image TEXT,
            thumb TEXT,
            url TEXT
        )
    ''')

    conn.commit()
    conn.close()

def insert_data_from_json():
    with open(json_path, 'r') as file:
        data = json.load(file)

    conn = sqlite3.connect(db_path)
    c = conn.cursor()

    # Loop through the JSON data and insert into the 'chumps' table
    for entry in data:
        try:
            c.execute('''
                INSERT INTO chumps (
                    id, date, date_bout, date_aus_string, date_year, date_month,
                    date_day, date_year_week, name, streak, thanks, image, thumb, url
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                entry['id'], entry['date'], entry['date_bout'], entry['date_aus_string'],
                entry['date_year'], entry['date_month'], entry['date_day'], entry['date_year_week'],
                entry['name'], entry['streak'], entry['thanks'], entry['image'],
                entry['thumb'], entry['url']
            ))
        except sqlite3.IntegrityError:
            print(f"Skipping duplicate entry: {entry['id']}")
            exit(1)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_table_if_not_exists()
    insert_data_from_json()
