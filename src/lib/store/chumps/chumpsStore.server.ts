import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type { Chump } from '$lib/store/chumps/types';

import { Database } from 'sqlite3';

const db = new Database('data/monty.db');

export async function loadChumps(): Promise<Chump[]>{
  return new Promise<Chump[]>((resolve, reject) => {
    db.all(
      `
          SELECT
              id,
              date,
              CAST(
                  CASE
                      WHEN ROW_NUMBER() OVER (ORDER BY id DESC) = 1 THEN CAST(julianday('now') - julianday(date) AS INTEGER)
                      ELSE CAST(julianday(LAG(date) OVER (ORDER BY id DESC)) - julianday(date) AS INTEGER)
                  END
                  AS INTEGER
              ) as streak,
              date_bout,
              date_aus_string,
              date_year,
              date_month,
              date_day,
              date_year_week,
              name,
              thanks,
              image,
              thumb,
              url
          FROM
              chumps
          ORDER BY id DESC;
          `,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  })    
};
