from django.db import connection

def sample_sql_query(params):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM numerico.track limit 1;")
        rows = cursor.fetchall()
    return rows


def get_statistics(params):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM numerico.track limit 1;")
        rows = cursor.fetchall()
    return rows


def get_playlist(params):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM numerico.track limit 1;")
        rows = cursor.fetchall()
    return rows


